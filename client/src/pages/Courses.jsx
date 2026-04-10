import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Courses = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/courses');
                setCourses(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course => 
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEnroll = async (title) => {
        const user = JSON.parse(localStorage.getItem('user')) || { name: 'Guest Student', email: 'guest@example.com' };
        try {
            await axios.post('http://localhost:5000/api/enroll', {
                studentName: user.name,
                studentEmail: user.email,
                programTitle: title,
                programType: 'Course'
            });
            alert('Request sent successfully!');
        } catch (err) {
            alert('Failed to send request');
        }
    };

    return (
        <div className="pt-32 pb-40 bg-slate-50/50 min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <span className="text-primary-main font-black text-xs uppercase tracking-widest bg-primary-main/10 px-6 py-2 rounded-full mb-6 inline-block">Elite Training Catalog</span>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-8">
                        Future-Proof Your <span className="text-transparent bg-hero-gradient bg-clip-text">Professional Career</span>
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto flex items-center bg-white rounded-3xl border border-slate-100 shadow-2xl p-4 mb-24 transition-all">
                    <Search className="w-6 h-6 text-slate-400 ml-4" />
                    <input 
                        type="text" 
                        placeholder="Search live professional training..." 
                        className="flex-grow p-4 text-xl font-medium outline-none bg-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredCourses.map((course) => (
                            <motion.div
                                key={course._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group relative bg-white rounded-[3.5rem] p-12 border border-slate-100 transition-all hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] hover:-translate-y-3 flex flex-col h-full overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-hero-gradient opacity-[0.03] rounded-bl-[100%]" />
                                
                                <div className="mb-10 w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-primary-main group-hover:text-white transition-all">
                                    <Globe className="w-10 h-10 text-primary-main group-hover:text-white" />
                                </div>

                                <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-primary-main">{course.title}</h3>
                                <p className="text-slate-500 font-medium mb-12 text-[10px] leading-relaxed uppercase tracking-widest">{course.category || 'Professional Training Domain'}</p>

                                <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 leading-none">Enroll Price</span>
                                        <span className="text-3xl font-black text-slate-900 leading-none mt-2">₹{course.price}</span>
                                    </div>
                                    <button 
                                        onClick={() => handleEnroll(course.title)}
                                        className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-main transition-all"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {!loading && filteredCourses.length === 0 && (
                    <div className="py-32 text-center text-slate-400 font-bold uppercase tracking-widest text-sm">No live courses available yet. Start adding them as Admin!</div>
                )}
            </div>
        </div>
    );
};

export default Courses;

import { useState, useEffect } from 'react';
import api from '../api';
import { Search, Globe, Zap, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CheckoutModal from '../components/CheckoutModal';

const Internships = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [intRes, courRes] = await Promise.all([
                    api.get('/api/internships'),
                    api.get('/api/courses')
                ]);
                setPrograms([
                    ...intRes.data.map(i => ({...i, docType: 'Internship'})),
                    ...courRes.data.map(c => ({...c, docType: 'Course'}))
                ]);
                setLoading(false);
            } catch (err) {
                console.error('Portfolio Fetch Error:', err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const triggerCheckout = (item) => {
        if (!user) {
            window.location.href = '/login';
            return;
        }
        setSelectedProgram(item);
        setShowCheckout(true);
    };

    const filteredPrograms = programs.filter(p => 
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-40 pb-40 bg-white min-h-screen overflow-hidden relative">
            {/* Background Branding Elements */}
            <div className="absolute top-0 right-0 w-1/4 h-full bg-hero-gradient/5 filter blur-[150px] -z-10 translate-x-1/2" />
            
            <div className="container mx-auto px-6 relative">
                {/* Elite Portal Header */}
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-primary-main font-black text-[10px] uppercase tracking-[0.4em] bg-primary-main/5 px-8 py-3 rounded-full mb-8 inline-block border border-primary-main/10 shadow-sm"
                    >
                        Elite career registry
                    </motion.span>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tightest leading-[0.9] mb-10">
                        Explore <br /><span className="text-transparent bg-hero-gradient bg-clip-text">Premium Catalogs</span>
                    </h1>
                    <p className="text-slate-400 text-2xl font-medium tracking-tight">Industrial opportunities synced in real-time with AASHVI INTERN ecosystem.</p>
                </div>

                {/* Industrial Search Bar */}
                <div className="max-w-3xl mx-auto flex items-center bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm p-6 mb-32 focus-within:ring-8 ring-primary-main/5 transition-all group overflow-hidden">
                    <Search className="w-8 h-8 text-slate-300 ml-4 group-focus-within:text-primary-main transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search programs..." 
                        className="flex-grow p-5 text-2xl font-black outline-none bg-transparent text-slate-800 placeholder:text-slate-300 lowercase"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* High-Fidelity Catalog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    <AnimatePresence mode="popLayout">
                        {filteredPrograms.map((program) => (
                            <motion.div
                                key={program._id}
                                layout
                                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                                className="group bg-white rounded-[4rem] p-16 border border-slate-100/50 transition-all hover:shadow-[0_60px_100px_-20px_rgba(79,70,229,0.15)] hover:-translate-y-4 flex flex-col h-full relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-hero-gradient opacity-[0.02] rounded-bl-[100%] group-hover:scale-125 transition-transform duration-700" />
                                
                                <div className="mb-12 w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center border border-slate-100 group-hover:bg-primary-main group-hover:rotate-6 transition-all shadow-sm">
                                    <Zap className="w-10 h-10 text-primary-main group-hover:text-white" />
                                </div>

                                <div className="mb-4">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${program.docType === 'Internship' ? 'text-primary-main bg-primary-main/5' : 'text-purple-600 bg-purple-50'} px-5 py-2 rounded-full`}>{program.docType}</span>
                                </div>

                                <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight group-hover:text-primary-main transition-colors lowercase first-letter:uppercase">{program.title}</h3>
                                
                                <div className="space-y-4 mb-20 flex-grow">
                                    <div className="flex items-center space-x-3 text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                                        <Clock className="w-4 h-4 text-primary-main" />
                                        <span>{program.duration || 'Full Session'}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                                        <Globe className="w-4 h-4 text-green-500" />
                                        <span>Remote Unit</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-10 border-t border-slate-50">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest mb-1 leading-none">Enroll Price</span>
                                        <span className="text-3xl font-black text-slate-900 leading-none mt-2 tracking-tighter">₹{program.price || 0}</span>
                                    </div>
                                    <button 
                                        onClick={() => triggerCheckout(program)}
                                        className="bg-slate-900 text-white px-10 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-primary-main transition-all shadow-2xl active:scale-95 group/btn flex items-center gap-3"
                                    >
                                        <span>Enroll Now</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Checkout Modal Terminal */}
                <CheckoutModal 
                    isOpen={showCheckout} 
                    onClose={() => setShowCheckout(false)} 
                    program={selectedProgram} 
                    user={user} 
                />

                {!loading && filteredPrograms.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 text-center">
                        <p className="text-slate-300 font-black uppercase tracking-[0.4em] text-xs">Ecosystem Empty. Initializing Professional Catalogs...</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Internships;

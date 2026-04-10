import { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Users, Briefcase, Plus, Search, 
    MoreVertical, Trash2, Edit3, CheckCircle, Clock, 
    ArrowLeft, X, GraduationCap, DollarSign, Globe, Settings, Eye, BookOpen, LogOut,
    CheckCircle2, XCircle, ArrowRight, BarChart3, TrendingUp, ShieldCheck, Mail, ChevronRight, Filter, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('internships');
    const [internships, setInternships] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({});
    const [status, setStatus] = useState({ loading: false, message: '' });

    const fetchData = async () => {
        try {
            const [intRes, courRes, stuRes, enrollRes] = await Promise.all([
                api.get('/api/admin/internships'),
                api.get('/api/admin/courses'),
                api.get('/api/admin/students'),
                api.get('/api/admin/enrollments')
            ]);
            setInternships(intRes.data);
            setCourses(courRes.data);
            setStudents(stuRes.data);
            setEnrollments(enrollRes.data);
        } catch (err) { console.error('Dashboard Fetch Error:', err); }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddItem = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, message: '' });
        try {
            const endpoint = activeTab === 'courses' ? 'courses' : 'internships';
            const url = `/api/admin/${endpoint}${newItem._id ? '/' + newItem._id : ''}`;
            const method = newItem._id ? 'put' : 'post';
            
            const res = await api[method](url, newItem);
            if (activeTab === 'courses') {
                if (newItem._id) setCourses(courses.map(c => c._id === res.data._id ? res.data : c));
                else setCourses([res.data, ...courses]);
            } else {
                if (newItem._id) setInternships(internships.map(i => i._id === res.data._id ? res.data : i));
                else setInternships([res.data, ...internships]);
            }
            setShowModal(false); setNewItem({}); setStatus({ loading: false });
        } catch (err) { setStatus({ loading: false, message: 'Process Failed' }); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this?')) return;
        try {
            const endpoint = activeTab === 'courses' ? 'courses' : 'internships';
            await api.delete(`/api/admin/${endpoint}/${id}`);
            if (activeTab === 'courses') setCourses(courses.filter(c => c._id !== id));
            else setInternships(internships.filter(i => i._id !== id));
        } catch (err) { alert('Delete failed'); }
    };

    const handleApprove = async (id) => {
        try {
            await api.post(`/api/admin/approve/${id}`);
            setEnrollments(enrollments.map(e => e._id === id ? {...e, status: 'Approved'} : e));
            alert('Approved & Offer Sent!');
        } catch (err) { alert('Approval failed'); }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const currentList = activeTab === 'courses' ? courses : activeTab === 'internships' ? internships : [];

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* NO-OVERLAP Sidebar */}
            <div className="w-80 min-h-screen bg-slate-900 text-white flex flex-col p-10 flex-shrink-0 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.3)] sticky top-0 h-screen">
                <div className="flex items-center space-x-4 mb-20 group cursor-pointer" onClick={() => window.location.href = '/'}>
                    <div className="bg-hero-gradient p-3.5 rounded-3xl group-hover:rotate-6 transition-transform shadow-lg shadow-primary-main/20">
                        <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter">AASHVI<span className="text-white/40 ml-1">ADMIN</span></span>
                </div>

                <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    {[
                        { id: 'internships', label: 'Career Jobs', icon: Briefcase },
                        { id: 'courses', label: 'Skill Training', icon: BookOpen },
                        { id: 'students', label: 'User Registry', icon: Users },
                        { id: 'requests', label: 'Action Inbox', icon: Eye }
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center space-x-5 p-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-2xl shadow-white/10 scale-105' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
                            <tab.icon className="w-6 h-6" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="pt-10 border-t border-white/5">
                    <button onClick={handleLogout} className="w-full bg-red-500/10 p-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg flex items-center justify-center space-x-3 group">
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Log Out Center</span>
                    </button>
                </div>
            </div>

            {/* Dynamic Main Workspace */}
            <div className="flex-grow p-20 min-h-screen overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-24">
                        <div>
                            <h2 className="text-7xl font-black text-slate-900 tracking-tightest mb-4 flex items-center gap-8 lowercase first-letter:uppercase">
                                {activeTab === 'internships' ? 'internships' : activeTab === 'courses' ? 'training' : activeTab}
                                <span className="text-[10px] bg-primary-main/10 text-primary-main px-6 py-2.5 rounded-full tracking-widest uppercase">{currentList.length || 0} active launches</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium tracking-tight">Managing real-time professional data streams</p>
                        </div>
                        {['internships', 'courses'].includes(activeTab) && (
                            <button onClick={() => {setNewItem({}); setShowModal(true);}} className="bg-hero-gradient text-white px-12 py-7 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-3xl hover:shadow-primary-main/50 transition-all flex items-center space-x-4 active:scale-95 group">
                                <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform" />
                                <span>Launch {activeTab === 'internships' ? 'Job' : 'Course'}</span>
                            </button>
                        )}
                    </div>

                    {/* Industrial Catalog Surface */}
                    <div className="bg-white rounded-[5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr>
                                    {['internships', 'courses'].includes(activeTab) && (
                                        <>
                                            <th className="p-12 text-[10px] font-black uppercase text-slate-400 tracking-[0.25em]">Launch Title</th>
                                            <th className="p-12 text-[10px] font-black uppercase text-slate-400 tracking-[0.25em]">Registry Price</th>
                                            <th className="p-12 text-[10px] font-black uppercase text-slate-400 tracking-[0.25em] text-center">Settings</th>
                                        </>
                                    )}
                                    {activeTab === 'students' && (
                                        <>
                                            <th className="p-12 text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name</th>
                                            <th className="p-12 text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</th>
                                            <th className="p-12 text-[10px] font-black uppercase text-slate-400 tracking-widest">Registry Date</th>
                                        </>
                                    )}
                                    {activeTab === 'requests' && (
                                        <>
                                            <th className="p-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Student / Program</th>
                                            <th className="p-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                                            <th className="p-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Info</th>
                                            <th className="p-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Hub</th>
                                            <th className="p-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Action Hub</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {['internships', 'courses'].includes(activeTab) && currentList.map(item => (
                                    <tr key={item._id} className="hover:bg-slate-50/80 transition-all group">
                                        <td className="p-12">
                                            <div className="font-black text-slate-900 text-2xl group-hover:text-primary-main transition-colors mb-2 lowercase first-letter:uppercase">{item.title}</div>
                                            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ID: {item._id.slice(-6)}</div>
                                        </td>
                                        <td className="p-12 font-black text-slate-900 text-xl tracking-tighter">₹{item.price || 0}</td>
                                        <td className="p-12 text-center">
                                            <div className="flex items-center justify-center space-x-5 opacity-30 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => {setNewItem(item); setShowModal(true);}} className="p-5 bg-slate-100 rounded-[2rem] hover:bg-primary-main hover:text-white transition-all shadow-sm"><Edit3 className="w-6 h-6" /></button>
                                                <button onClick={() => handleDelete(item._id)} className="p-5 bg-slate-100 rounded-[2rem] hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 className="w-6 h-6" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {activeTab === 'students' && students.map(s => (
                                    <tr key={s._id} className="hover:bg-slate-50 transition-all">
                                        <td className="p-12 font-black text-slate-900 text-xl">{s.name}</td>
                                        <td className="p-12 font-bold text-slate-500">{s.email}</td>
                                        <td className="p-12 font-black text-slate-300 text-[10px] tracking-widest uppercase">{(s.createdAt || '').slice(0, 10)}</td>
                                    </tr>
                                ))}
                                {activeTab === 'requests' && enrollments.map(e => (
                                    <tr key={e._id} className="hover:bg-slate-50 transition-all group">
                                        <td className="p-12 font-black text-slate-900 text-xl">
                                            {e.studentName}
                                            <div className="text-[10px] uppercase font-black text-primary-main opacity-50 tracking-widest mt-1">{e.programTitle}</div>
                                        </td>
                                        <td className="p-12 font-bold text-slate-500 text-sm">{e.studentEmail}</td>
                                        <td className="p-12 font-black text-slate-900 text-xs tracking-tightest">{e.paymentMethod || 'MANUAL'}</td>
                                        <td className="p-12 text-center">
                                            <span className={`px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${e.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td className="p-12 text-center">
                                            {e.status !== 'Approved' && (
                                                <button onClick={() => handleApprove(e._id)} className="p-6 bg-slate-900 text-white rounded-[2.5rem] hover:bg-primary-main transition-all shadow-2xl hover:shadow-primary-main/20 flex items-center justify-center mx-auto"><CheckCircle className="w-7 h-7" /></button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {currentList.length === 0 && (
                            <div className="p-40 text-center text-slate-300 font-black uppercase tracking-[0.4em] text-[10px]">Ecosystem Empty. Initializing Professional Catalog...</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Smart Launch Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/80 backdrop-blur-3xl z-[100] flex items-center justify-center p-8">
                        <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }} className="bg-white w-full max-w-4xl rounded-[5rem] p-24 relative overflow-hidden shadow-2xl">
                             <button onClick={() => setShowModal(false)} className="absolute top-16 right-16 text-slate-300 hover:text-slate-900"><X className="w-10 h-10" /></button>
                             <h3 className="text-4xl font-black mb-16 tracking-tightest">Configure Master Launch</h3>
                             <form onSubmit={handleAddItem} className="space-y-12">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                     <div className="space-y-3">
                                         <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Entry Title</label>
                                         <input required className="w-full bg-slate-50 p-8 rounded-[2.5rem] border-none focus:ring-4 ring-primary-main/10 outline-none font-black text-slate-800 text-xl" 
                                                value={newItem.title || ''} placeholder="e.g., Python Mastery" onChange={(e) => setNewItem({...newItem, title: e.target.value})} />
                                     </div>
                                     <div className="space-y-3">
                                         <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Launch Price (₹)</label>
                                         <input required type="number" className="w-full bg-slate-50 p-8 rounded-[2.5rem] border-none focus:ring-4 ring-primary-main/10 outline-none font-black text-slate-800 text-xl" 
                                                value={newItem.price || ''} placeholder="499" onChange={(e) => setNewItem({...newItem, price: e.target.value})} />
                                     </div>
                                 </div>
                                 <div className="space-y-3">
                                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Domain Description</label>
                                     <textarea rows="4" className="w-full bg-slate-50 p-10 rounded-[3rem] border-none focus:ring-4 ring-primary-main/10 outline-none font-black text-slate-800 text-xl leading-relaxed" 
                                               value={newItem.shortDesc || newItem.domain || ''} placeholder="Describe the industrial impact..." onChange={(e) => setNewItem({...newItem, [activeTab === 'courses' ? 'domain' : 'shortDesc']: e.target.value})} />
                                 </div>
                                 <button disabled={status.loading} className="w-full bg-slate-900 text-white p-10 rounded-[3rem] font-black uppercase tracking-[0.3em] hover:bg-primary-main shadow-3xl transition-all">
                                    {status.loading ? 'Synchronizing Cosmos...' : 'Push Live Now'}
                                 </button>
                             </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    User, Briefcase, GraduationCap, Award, Settings, Bell, 
    Search, Star, Clock, FileText, ChevronRight, CheckCircle, 
    PieChart, Layout, LogOut, ArrowRight, Zap, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [enrollments, setEnrollments] = useState([]);
    const [activeTab, setActiveTab] = useState('applications');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user.email) {
                window.location.href = '/login';
                return;
            }
            try {
                const res = await axios.get(`http://localhost:5000/api/my-enrollments/${user.email}`);
                setEnrollments(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Dashboard Error:', err);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [user.email]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const stats = {
        active: enrollments.filter(e => e.status !== 'Certified').length,
        courses: enrollments.filter(e => e.programType === 'Course').length,
        certified: enrollments.filter(e => e.status === 'Certified').length
    };

    return (
        <div className="pt-32 pb-40 bg-white min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Industrial Sidebar */}
                    <div className="w-full lg:w-80 space-y-10 flex-shrink-0">
                        <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-hero-gradient opacity-10 rounded-bl-[100%] pointer-events-none" />
                            <div className="text-center relative z-10">
                                <div className="relative inline-block mb-10">
                                    <div className="w-32 h-32 rounded-[2.5rem] bg-white/10 p-1 group-hover:rotate-6 transition-transform shadow-2xl">
                                        <img 
                                            src={`https://i.pravatar.cc/150?u=${user.email}`} 
                                            alt="avatar" 
                                            className="w-full h-full rounded-[2.2rem] object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-900 shadow-lg" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 tracking-tight lowercase first-letter:uppercase">{user.name}</h3>
                                <p className="text-white/40 font-black uppercase tracking-widest text-[9px] mb-10">Active Student Unit</p>
                                
                                <button onClick={handleLogout} className="w-full bg-white/5 text-white/60 p-5 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 group">
                                    <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Sign Out
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-[3.5rem] border border-slate-100 flex flex-col space-y-3">
                            {[
                                { id: 'applications', label: 'My Applications', icon: Briefcase },
                                { id: 'courses', label: 'My Courses', icon: GraduationCap },
                                { id: 'certificates', label: 'Certificates', icon: Award },
                                { id: 'analytics', label: 'Analytics', icon: PieChart }
                            ].map(link => (
                                <button 
                                    key={link.id} 
                                    onClick={() => setActiveTab(link.id)}
                                    className={`flex items-center space-x-5 p-6 rounded-3xl transition-all ${
                                        activeTab === link.id ? 'bg-slate-900 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:bg-white font-bold'
                                    }`}
                                >
                                    <link.icon className="w-6 h-6" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{link.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Workspace */}
                    <div className="flex-grow space-y-16">
                        {/* Summary Surface */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {!user.isProfileComplete && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    onClick={() => window.location.href='/complete-profile'}
                                    className="md:col-span-3 bg-red-50 p-12 rounded-[4rem] border border-red-100 shadow-xl shadow-red-100/30 flex items-center justify-between group cursor-pointer hover:bg-slate-900 transition-all duration-700 overflow-hidden relative"
                                >
                                    <div className="absolute top-0 right-0 w-64 h-full bg-hero-gradient opacity-[0.05] -translate-y-1/2 translate-x-1/2 rounded-full" />
                                    <div className="flex items-center gap-10 relative z-10">
                                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-red-500 shadow-2xl group-hover:rotate-12 transition-transform"><User className="w-10 h-10" /></div>
                                        <div>
                                            <h4 className="text-2xl font-black text-slate-900 group-hover:text-white tracking-tighter mb-2">Industrial Identity Incomplete</h4>
                                            <p className="text-slate-400 group-hover:text-white/60 font-bold uppercase tracking-widest text-[10px]">Complete your profile to unlock Master Certifications</p>
                                        </div>
                                    </div>
                                    <button className="bg-red-500 text-white px-10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-2xl group-hover:bg-white group-hover:text-primary-main transition-all flex items-center gap-3">
                                        Finish Registry <ArrowRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}
                            {[
                                { label: 'In Review', value: stats.active, icon: Briefcase, color: 'text-indigo-600 bg-indigo-50' },
                                { label: 'Training Track', value: stats.courses, icon: Target, color: 'text-emerald-600 bg-emerald-50' },
                                { label: 'Elite Awards', value: stats.certified, icon: Award, color: 'text-rose-600 bg-rose-50' }
                            ].map((stat, i) => (
                                <motion.div 
                                    key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm flex items-center gap-8 relative group hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl shadow-slate-200/40"
                                >
                                    <div className={`p-6 rounded-[2rem] transition-transform group-hover:rotate-12 ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 font-black uppercase tracking-widest text-[9px] mb-1">{stat.label}</p>
                                        <p className="text-4xl font-black text-slate-900 tracking-tightest">{stat.value < 10 ? `0${stat.value}` : stat.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Content Tab Logic */}
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                className="bg-white rounded-[4.5rem] border border-slate-100 shadow-sm overflow-hidden"
                            >
                                <div className="p-12 border-b border-slate-50 flex items-center justify-between">
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tightest lowercase first-letter:uppercase">{activeTab === 'applications' ? 'Active applications' : activeTab === 'courses' ? 'education tracks' : activeTab === 'analytics' ? 'performance overview' : 'Master certificates'}</h3>
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-primary-main/5 text-primary-main px-6 py-2 rounded-full border border-primary-main/10 shadow-sm">Real-time sync active</span>
                                </div>

                                <div className="p-0">
                                    {loading ? (
                                        <div className="p-40 text-center animate-pulse text-slate-300 font-black uppercase tracking-widest text-xs">Synchronizing Personal Registry...</div>
                                    ) : enrollments.length === 0 ? (
                                        <div className="p-40 text-center text-slate-300 font-black uppercase tracking-[0.4em] text-xs">Trajectory Empty. Visit the Opportunity Portal to launch your career.</div>
                                    ) : activeTab === 'applications' ? (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-slate-50/50 border-b border-slate-100">
                                                    <tr>
                                                        <th className="p-10 text-[10px] font-black uppercase text-slate-400 tracking-widest">Master Entry</th>
                                                        <th className="p-10 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                                        <th className="p-10 text-[10px] font-black uppercase text-slate-400 tracking-widest">Entry Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    {enrollments.map(e => (
                                                        <tr key={e._id} className="hover:bg-slate-50/50 transition-colors group">
                                                            <td className="p-10">
                                                                <div className="text-2xl font-black text-slate-900 mb-1 group-hover:text-primary-main transition-colors lowercase first-letter:uppercase">{e.programTitle}</div>
                                                                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{e.programType} CATALOG</div>
                                                            </td>
                                                            <td className="p-10">
                                                                <span className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest ${e.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400 font-bold'}`}>
                                                                    {e.status}
                                                                </span>
                                                            </td>
                                                            <td className="p-10 font-black text-slate-300 text-xs tracking-tighter uppercase uppercase">{(e.createdAt || '').slice(0, 10)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : activeTab === 'courses' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-12">
                                            {enrollments.filter(e => e.programType === 'Course').map(c => (
                                                <div key={c._id} className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 group hover:shadow-2xl transition-all duration-700 relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-24 h-24 bg-hero-gradient opacity-[0.03] rounded-bl-[100%]" />
                                                    <h4 className="text-2xl font-black text-slate-900 mb-4 lowercase first-letter:uppercase group-hover:text-primary-main transition-colors">{c.programTitle}</h4>
                                                    <div className="flex items-center space-x-2 text-slate-400 font-bold uppercase tracking-widest text-[9px] mb-8">
                                                        <Clock className="w-4 h-4 text-green-500" /> <span>Real-time Learning Active</span>
                                                    </div>
                                                    <button className="w-full bg-slate-900 text-white p-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-primary-main transition-all group-hover:shadow-primary-main/30 active:scale-95 flex items-center justify-center gap-3">
                                                       <span>Resume Learning</span> <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                                    </button>
                                                </div>
                                            ))}
                                            {enrollments.filter(e => e.programType === 'Course').length === 0 && (
                                              <div className="col-span-2 p-20 text-center text-slate-300 font-black uppercase tracking-widest text-[10px]">No education units active. Launch a skill training track now.</div>
                                            )}
                                        </div>
                                    ) : activeTab === 'certificates' ? (
                                        <div className="p-20 text-center space-y-10 group cursor-pointer" onClick={() => window.location.href='/internships'}>
                                            <div className="w-32 h-32 bg-slate-50 rounded-full mx-auto flex items-center justify-center group-hover:bg-primary-main transition-all group-hover:rotate-12">
                                                <Award className="w-16 h-16 text-slate-200 group-hover:text-white transition-all shadow-sm" />
                                            </div>
                                            <div>
                                                <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tightest">Master Registry Sealed</h4>
                                                <p className="text-slate-400 font-medium max-w-md mx-auto italic mb-10">Certificates are issued instantly upon successful audit of your professional performance. Complete your active tracks to earn your elite award!</p>
                                                <Link to="/internships" className="inline-flex items-center space-x-3 text-primary-main font-black uppercase tracking-widest text-[10px] hover:translate-x-2 transition-transform">Explore More Tracks <ArrowRight className="w-4 h-4"/></Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-24 space-y-16">
                                            <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 flex flex-col items-center">
                                                <PieChart className="w-20 h-20 text-slate-200 mb-10 shadow-sm" />
                                                <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter">Performance Insight Terminal</h4>
                                                <p className="text-slate-400 font-medium text-center max-w-sm italic">Analytics are calculated based on your engagement, technical assessments, and professional milestones. Stay active to unlock industrial metrics!</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

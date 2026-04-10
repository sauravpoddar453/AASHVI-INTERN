import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, GraduationCap, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-6 ${
            scrolled ? 'bg-white/90 backdrop-blur-3xl shadow-xl shadow-slate-200/50 py-4' : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <NavLink to="/" className="flex items-center space-x-2 group">
                        <div className="bg-hero-gradient p-2.5 rounded-2xl group-hover:rotate-6 transition-transform shadow-lg shadow-primary-main/20">
                            <GraduationCap className="text-white w-7 h-7" />
                        </div>
                        <span className="text-2xl font-black bg-hero-gradient bg-clip-text text-transparent tracking-tighter">
                            AASHVI<span className="text-slate-900 ml-1">INTERN</span>
                        </span>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-12">
                        {['Home', 'Internships', 'About', 'Contact'].map((item) => (
                            <Link 
                                key={item} 
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`text-sm font-black uppercase tracking-[0.2em] transition-all relative group ${
                                    (location.pathname === '/' && item === 'Home') || location.pathname.includes(item.toLowerCase()) ? 'text-primary-main' : 'text-slate-500 hover:text-primary-main'
                                }`}
                            >
                                {item}
                                <span className={`absolute -bottom-2 left-0 h-1 bg-hero-gradient transition-all rounded-full ${
                                    (location.pathname === '/' && item === 'Home') || location.pathname.includes(item.toLowerCase()) ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {user ? (
                            <div className="flex items-center space-x-6">
                                {user.role === 'Admin' && (
                                    <Link to="/admin/dashboard" className="flex items-center space-x-2 text-slate-900 font-black uppercase tracking-widest text-[10px] bg-slate-100 px-4 py-2.5 rounded-xl hover:bg-primary-main hover:text-white transition-all shadow-sm">
                                        <LayoutDashboard className="w-4 h-4" />
                                        <span>Control Center</span>
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="text-red-500 font-black uppercase tracking-widest text-[10px] hover:text-red-600 flex items-center space-x-2 bg-red-50 p-2.5 rounded-xl">
                                    <LogOut className="w-4 h-4" />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-xs font-black uppercase tracking-widest text-slate-800 hover:text-primary-main transition-colors">Client Login</Link>
                                <Link to="/signup" className="flex items-center space-x-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-main transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-main/30 group">
                                    <span>Get Started</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-3 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50">
                        {isOpen ? <X className="text-slate-900" /> : <Menu className="text-slate-900" />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 150 }}
                        className="fixed inset-y-0 right-0 w-[85%] bg-white/95 backdrop-blur-2xl z-[150] shadow-[-20px_0_60px_rgba(0,0,0,0.1)] p-12 lg:hidden flex flex-col justify-between"
                    >
                        <div className="space-y-12">
                            <div className="flex justify-between items-center mb-16">
                                <span className="text-2xl font-black bg-hero-gradient bg-clip-text text-transparent tracking-tighter">AASHVI<span className="text-slate-800">INTERN</span></span>
                                <button onClick={() => setIsOpen(false)} className="p-3 bg-slate-50 rounded-2xl"><X className="w-6 h-6 text-slate-400" /></button>
                            </div>
                            <div className="flex flex-col space-y-8">
                                {['Home', 'Internships', 'About', 'Contact'].map((item) => (
                                    <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-4xl font-black text-slate-900 tracking-tighter hover:text-primary-main transition-all active:scale-95">{item}</Link>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            {user ? (
                                <button onClick={handleLogout} className="w-full bg-red-500 text-white p-6 rounded-3xl font-black text-xs uppercase tracking-widest">Sign Out</button>
                            ) : (
                                <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full bg-slate-900 text-white p-7 rounded-3xl font-black text-center text-xs uppercase tracking-widest flex items-center justify-center space-x-3">
                                    <span>Ready to Fly?</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

import { useState } from 'react';
import api from '../api';
import { NavLink } from 'react-router-dom';
import { Mail, Lock, User, Globe, ArrowRight, ShieldCheck, GraduationCap, Eye, EyeOff, Briefcase, GraduationCap as Student } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Student');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });
    try {
      const res = await api.post('/api/auth/signup', { ...formData, role });
      setStatus({ loading: false, message: 'Registry Successful! Redirecting to Portal...', type: 'success' });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      setStatus({ loading: false, message: err.response?.data?.message || 'Signup failed', type: 'error' });
    }
  };

  return (
    <div className="pt-32 pb-48 bg-slate-50 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-hero-gradient/5 rounded-full filter blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-500/5 rounded-full filter blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white p-12 md:p-20 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative group"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-hero-gradient opacity-[0.03] rounded-bl-[100%] pointer-events-none" />
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">Start Your <span className="text-transparent bg-hero-gradient bg-clip-text">Success Story</span></h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12">Take the first step towards your professional dream.</p>
            
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <button 
                onClick={() => setRole('Student')}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                  role === 'Student' ? 'border-primary-main bg-primary-main/5 text-primary-main shadow-lg shadow-primary-main/10 ring-4 ring-primary-main/5' : 'border-slate-100 text-slate-400 hover:bg-slate-50'
                }`}
              >
                <Student className="w-8 h-8" />
                <span className="text-xs font-black uppercase tracking-widest">I'm a Student</span>
              </button>
              <button 
                onClick={() => setRole('Hiring')}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                  role === 'Hiring' ? 'border-primary-main bg-primary-main/5 text-primary-main shadow-lg shadow-primary-main/10 ring-4 ring-primary-main/5' : 'border-slate-100 text-slate-400 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-8 h-8" />
                <span className="text-xs font-black uppercase tracking-widest">I'm Hiring</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {status.message && (
              <div className={`p-6 rounded-2xl font-black text-sm text-center tracking-tight border ${
                status.type === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
              }`}>
                {status.message}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-slate-50 rounded-xl">
                    <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe" 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-main/20 focus:bg-white p-6 pl-20 rounded-2xl outline-none text-lg font-bold transition-all placeholder-slate-300 shadow-inner"
                    />
                </div>
                </div>

                <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-slate-50 rounded-xl">
                    <Mail className="w-5 h-5 text-slate-400" />
                    </div>
                    <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com" 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-main/20 focus:bg-white p-6 pl-20 rounded-2xl outline-none text-lg font-bold transition-all placeholder-slate-300 shadow-inner"
                    />
                </div>
                </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Strong Password</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-slate-50 rounded-xl">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input 
                  required
                  type={showPassword ? 'text' : 'password'} 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Minimum 8 characters" 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-main/20 focus:bg-white p-6 pl-20 rounded-2xl outline-none text-lg font-bold transition-all placeholder-slate-300 shadow-inner"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-primary-main transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 px-2">
                <input required type="checkbox" id="terms" className="w-5 h-5 rounded border-2 border-slate-200 text-primary-main focus:ring-primary-main/10" />
                <label htmlFor="terms" className="text-slate-500 font-medium text-sm">I agree to the <span className="underline font-bold text-slate-700">Terms of Service</span> and <span className="underline font-bold text-slate-700">Privacy Policy</span>.</label>
            </div>

            <button 
              disabled={status.loading}
              className="w-full bg-slate-900 text-white p-8 rounded-[2.5rem] font-black text-xl uppercase tracking-widest hover:bg-primary-main shadow-2xl transition-all active:scale-95 group flex items-center justify-center space-x-4 disabled:bg-slate-300"
            >
              <span>{status.loading ? 'Creating Account...' : 'Register Account'}</span>
              {!status.loading && <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>

          <div className="mt-16 text-center">
            <p className="text-slate-500 font-medium">Already have an account? <NavLink to="/login" className="text-primary-main font-black underline underline-offset-8">Sign In</NavLink></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;

import { useState } from 'react';
import api from '../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Globe, ArrowRight, ShieldCheck, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });
    try {
      const res = await api.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      setStatus({ loading: false, message: 'Login successful!', type: 'success' });
      
      if (res.data.user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setStatus({ loading: false, message: err.response?.data?.message || 'Login failed', type: 'error' });
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
          className="w-full max-w-xl bg-white p-12 md:p-20 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative group"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-hero-gradient opacity-[0.03] rounded-bl-[100%] pointer-events-none" />
          
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-hero-gradient p-5 rounded-3xl mx-auto mb-8 shadow-xl shadow-primary-main/30 group-hover:rotate-12 transition-transform">
              <GraduationCap className="text-white w-full h-full" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">Welcome Back</h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">Continue your professional journey with <span className="text-primary-main font-bold">AASHVI INTERN</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {status.message && (
              <div className={`p-6 rounded-2xl font-black text-sm text-center tracking-tight border ${
                status.type === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
              }`}>
                {status.message}
              </div>
            )}
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

            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-slate-50 rounded-xl">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input 
                  required
                  type={showPassword ? 'text' : 'password'} 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
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
              <div className="text-right">
                <button 
                  type="button" 
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs font-black text-primary-main uppercase tracking-widest hover:translate-x-2 transition-all"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button 
              disabled={status.loading}
              className="w-full bg-slate-900 text-white p-8 rounded-[2.5rem] font-black text-xl uppercase tracking-widest hover:bg-primary-main shadow-2xl transition-all active:scale-95 group flex items-center justify-center space-x-4 disabled:bg-slate-300"
            >
              <span>{status.loading ? 'Verifying...' : 'Enter Portal'}</span>
              {!status.loading && <LogIn className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>

          <div className="mt-16 text-center">
            <p className="text-slate-500 font-bold mb-10 uppercase tracking-widest text-[10px]">Or continue with</p>
            <div className="flex justify-center gap-6">
              {[Globe, Mail].map((Icon, i) => (
                <button key={i} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all active:scale-95 grayscale hover:grayscale-0">
                  <Icon className="w-6 h-6 text-slate-900" />
                </button>
              ))}
            </div>
            <p className="mt-16 text-slate-500 font-medium">New around here? <NavLink to="/signup" className="text-primary-main font-black underline underline-offset-8">Create an Account</NavLink></p>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40 font-bold uppercase tracking-[0.2em] text-[10px] text-slate-500">
           <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Secure Auth</span>
           <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> End-to-End Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

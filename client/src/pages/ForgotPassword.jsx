import { useState } from 'react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldCheck, Key, ArrowRight, Lock, ShieldAlert, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [loading, setLoading] = useState(false);

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/api/auth/forgot-password', { email });
            alert(res.data.message);
            setStep(2);
        } catch (err) {
            alert(err.response?.data?.error || 'SECURITY ERROR: Transaction failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/api/auth/reset-password', { email, otp, newPassword });
            alert(res.data.message);
            window.location.href = '/login';
        } catch (err) {
            alert(err.response?.data?.error || 'VERIFICATION ERROR: Invalid Security Code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-40 pb-52 bg-slate-50 min-h-screen relative overflow-hidden flex items-center justify-center font-sans">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-hero-gradient/5 filter blur-[150px] -z-10 translate-x-1/2" />
            
            <div className="container mx-auto px-6 max-w-xl relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-12 md:p-20 rounded-[4rem] border border-slate-100 shadow-3xl shadow-slate-200/40 relative"
                >
                    <div className="text-center mb-16">
                        <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-8 shadow-sm">
                            {step === 1 ? <ShieldAlert className="w-10 h-10" /> : <Lock className="w-10 h-10" />}
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tightest leading-none mb-4 italic scale-x-95">Security Hub</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Aashvi Intern Credential Recovery Terminal</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.form 
                                key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleRequestOTP} className="space-y-10"
                            >
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Verified Email Registry</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary-main transition-colors" />
                                        <input 
                                            required type="email" placeholder="student@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-slate-50 p-7 pl-16 rounded-3xl border border-slate-100 focus:ring-8 ring-primary-main/5 outline-none font-bold text-sm"
                                        />
                                    </div>
                                </div>
                                <button disabled={loading} className="w-full bg-slate-900 text-white p-7 rounded-[2.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-primary-main shadow-2xl flex items-center justify-center gap-4 transition-all group active:scale-95">
                                    <span>Dispatch Security Code</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
                                </button>
                            </motion.form>
                        ) : (
                            <motion.form 
                                key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleResetPassword} className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">6-Digit Institutional OTP</label>
                                    <div className="relative group">
                                        <Key className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary-main transition-colors" />
                                        <input 
                                            required type="text" placeholder="Check your inbox" value={otp} onChange={(e) => setOtp(e.target.value)}
                                            className="w-full bg-slate-50 p-7 pl-16 rounded-3xl border border-slate-100 focus:ring-8 ring-primary-main/5 outline-none font-black text-xl tracking-widest text-center"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Fresh High-Fidelity Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary-main transition-colors" />
                                        <input 
                                            required type="password" placeholder="Minimum 8 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-slate-50 p-7 pl-16 rounded-3xl border border-slate-100 focus:ring-8 ring-primary-main/5 outline-none font-bold text-sm"
                                        />
                                    </div>
                                </div>
                                <button disabled={loading} className="w-full bg-slate-900 text-white p-7 rounded-[2.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-green-600 shadow-2xl flex items-center justify-center gap-4 transition-all group active:scale-95">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span>Override & Enter Portal</span>
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
                <div className="text-center mt-12">
                    <p className="text-slate-300 font-bold uppercase tracking-widest text-[9px] mb-8">Verified and End-to-End Encrypted</p>
                    <button onClick={() => window.location.href='/login'} className="text-slate-400 font-black uppercase tracking-widest text-[9px] hover:text-primary-main transition-colors">Return to Login Gateway</button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

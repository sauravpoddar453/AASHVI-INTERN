import { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { School, PhoneCall, ArrowRight, ShieldCheck, Zap, User, Camera, Image as ImageIcon } from 'lucide-react';

const CompleteProfile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [phone, setPhone] = useState('');
    const [college, setCollege] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user.email) window.location.href = '/login';
        if (user.isProfileComplete) window.location.href = '/dashboard';
    }, [user.email, user.isProfileComplete]);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                // High-Fidelity Industrial Compression Logic
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const scale = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // Compress to high-quality JPG (0.7) to keep size under 100KB
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                setProfileImage(compressedDataUrl);
                alert('IDENTITY PORTRAIT CAPTURED: Your official identification photo has been optimized for the Master Award!');
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!profileImage) {
            alert('CERTIFICATION REQUIREMENT: Please upload your identification photo.');
            return;
        }
        setLoading(true);
        try {
            const res = await api.post('/api/auth/complete-profile', {
                email: user.email, phone, college, profileImage
            });
            localStorage.setItem('user', JSON.stringify(res.data.user));
            alert('IDENTITY ACTIVATED: Your professional student profile is now 100% complete and Certification Ready!');
            window.location.href = '/dashboard';
        } catch (err) {
            console.error('REGISTRY FAILURE:', err);
            const errMsg = err.response?.status === 404 ? 'Pathway Disconnect: Please restart your server.' : err.response?.data?.error || err.message;
            alert(`REGISTRY ERROR: ${errMsg}`);
            setLoading(false);
        }
    };

    return (
        <div className="pt-40 pb-52 bg-white min-h-screen relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 w-1/4 h-full bg-hero-gradient/5 filter blur-[150px] -z-10 translate-x-1/2" />
            
            <div className="container mx-auto px-6 max-w-2xl">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-12 md:p-20 rounded-[4.5rem] border border-slate-100 shadow-3xl shadow-slate-200/40 relative"
                >
                    <div className="text-center mb-16">
                        <div className="relative inline-block mb-8 group">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden transition-all group-hover:rotate-6">
                                {profileImage ? (
                                    <img src={profileImage} alt="Identity" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-slate-200" />
                                )}
                            </div>
                            <label className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl cursor-pointer hover:bg-primary-main shadow-xl transition-all active:scale-95">
                                <Camera className="w-5 h-5" />
                                <input type="file" className="hidden" onChange={handlePhotoUpload} accept="image/*" />
                            </label>
                            <p className="mt-6 text-[9px] font-black uppercase text-slate-300 tracking-[0.3em]">Certification ID Photo</p>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tightest leading-none mb-3 italic scale-x-95">Finalize Identity</h2>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Mandatory for Industrial Award Authenticity</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="space-y-6">
                            <div className="relative group">
                                <School className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary-main transition-colors" />
                                <input 
                                    required value={college} onChange={(e) => setCollege(e.target.value)}
                                    type="text" placeholder="College / University Name" 
                                    className="w-full bg-slate-50 p-7 pl-16 rounded-3xl border border-slate-100 focus:ring-8 ring-primary-main/5 outline-none font-bold text-sm tracking-tight placeholder:text-slate-300 shadow-inner"
                                />
                            </div>
                            <div className="relative group">
                                <PhoneCall className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary-main transition-colors" />
                                <input 
                                    required value={phone} onChange={(e) => setPhone(e.target.value)}
                                    type="tel" placeholder="Professional Contact Number" 
                                    className="w-full bg-slate-50 p-7 pl-16 rounded-3xl border border-slate-100 focus:ring-8 ring-primary-main/5 outline-none font-bold text-sm tracking-tight placeholder:text-slate-300 shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-green-50 rounded-[2.5rem] flex items-start space-x-6 border border-green-100">
                            <ShieldCheck className="w-8 h-8 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-green-900 font-black uppercase tracking-widest text-[9px] mb-2 flex items-center gap-2">Identification Verification Active <Zap className="w-3 h-3 fill-green-500" /></p>
                                <p className="text-green-700 text-[10px] font-semibold leading-relaxed uppercase tracking-wider">The uploaded portrait is required for generating your ISO-MSME validated certificate upon completion of your career track.</p>
                            </div>
                        </div>

                        <button 
                            disabled={loading}
                            className="w-full bg-slate-900 text-white p-7 rounded-[2.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-primary-main transition-all active:scale-95 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.3)] flex items-center justify-center gap-4 group disabled:opacity-50"
                        >
                            <ImageIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span>Complete Industrial Profile</span>
                        </button>
                    </form>
                </motion.div>
                <div className="mt-12 text-center flex flex-col items-center">
                    <p className="text-slate-300 font-black uppercase tracking-widest text-[9px] mb-4">Certified career path managed by Aashvi Intern</p>
                    <div className="w-1 h-20 bg-slate-100 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default CompleteProfile;

import { useState } from 'react';
import { User, X, Lock, ShieldCheck, CreditCard, Zap, School, PhoneCall, ArrowRight, CheckCircle2, QrCode, Building2, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const CheckoutModal = ({ isOpen, onClose, program, user }) => {
    const [step, setStep] = useState(2); // Start at Payment Selector
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(''); 

    const [enrollmentId, setEnrollmentId] = useState('');

    if (!isOpen || !program) return null;

    const handleFinalEnroll = async () => {
        setIsSubmitting(true);
        try {
            const res = await api.post('/api/enroll', {
                studentName: user?.name || 'Guest Student',
                studentEmail: user?.email || 'guest@example.com',
                programTitle: program.title,
                programType: program.type || 'Internship',
                paymentMethod: paymentMethod,
                price: program.price,
                status: 'Enrolled'
            });

            setEnrollmentId(res.data.enrollment?._id || 'ID-RECOVERING');

            if (paymentMethod === 'UPI') {
                const upiLink = `upi://pay?pa=sauravpoddar97097-8@okaxis&pn=Aashvi%20Intern&am=${program.price}&cu=INR`;
                window.location.href = upiLink;
            }
            setStep(3); // SUCCESS ONLY AFTER PAYMENT CONFIRMATION
        } catch (err) {
            alert('ENROLLMENT ERROR: Registry failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white w-full max-w-2xl rounded-[4rem] shadow-4xl shadow-slate-900/30 overflow-hidden relative"
            >
                {/* Header Terminal */}
                <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-primary-main rounded-3xl flex items-center justify-center text-white shadow-xl">
                            <Zap className="w-8 h-8 fill-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{program.title}</h3>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">Institutional Enrollment Hub</p>
                        </div>
                    </div>
                </div>

                <div className="p-12">
                    <AnimatePresence mode="wait">
                        {step === 2 && (
                            <motion.div key="p2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="mb-10 text-center">
                                    <h4 className="text-3xl font-black text-slate-900 mb-2 italic">Select Payment Type</h4>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Master Industrial Settlement Portal</p>
                                </div>
                                <div className="grid grid-cols-1 gap-4 mb-10">
                                    {[
                                        { id: 'UPI', label: 'UPI Instant Pay', desc: 'Secure settlement via VPA', icon: Smartphone, color: 'text-indigo-600' },
                                        { id: 'QR', label: 'Master QR Scan', desc: 'Scan & Pay through mobile', icon: QrCode, color: 'text-emerald-600' },
                                        { id: 'BANK', label: 'Direct Bank Settlement', desc: 'Institutional IMPS/NEFT Hub', icon: Building2, color: 'text-blue-600' }
                                    ].map((m) => (
                                        <button 
                                            key={m.id} onClick={() => setPaymentMethod(m.id)}
                                            className={`p-10 rounded-[3rem] border-4 transition-all text-left flex items-center justify-between group ${paymentMethod === m.id ? 'border-primary-main bg-primary-main/5' : 'border-slate-50 hover:border-slate-100 bg-slate-50/50'}`}
                                        >
                                            <div className="flex items-center gap-6">
                                                <m.icon className={`w-8 h-8 ${m.color}`} />
                                                <div>
                                                    <h5 className="font-black text-slate-900 tracking-tightest">{m.label}</h5>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.desc}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {paymentMethod && (
                                    <button onClick={handleFinalEnroll} disabled={isSubmitting} className="w-full bg-primary-main text-white p-8 rounded-[3rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-4xl shadow-primary-main/30 flex items-center justify-center gap-4 active:scale-95 transition-all">
                                        <Lock className="w-5 h-5 fill-white" />
                                        <span>Confirm Industrial Payment</span>
                                    </button>
                                )}
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="p3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-500 mx-auto mb-10">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                                <h4 className="text-3xl font-black text-slate-900 mb-6 italic tracking-tightest">Enrollment registered!</h4>

                                <div className="mb-10 p-6 bg-primary-main/5 border border-primary-main/10 rounded-3xl">
                                    <p className="text-primary-main font-black text-[10px] uppercase tracking-widest mb-2">Industrial Receipt ID</p>
                                    <code className="text-sm font-black text-slate-900 bg-white px-6 py-3 rounded-xl border border-slate-100 shadow-sm block w-fit mx-auto select-all">{enrollmentId}</code>
                                    <p className="text-slate-400 text-[9px] font-bold mt-3 uppercase tracking-widest">Copy this ID to verify achievement later</p>
                                </div>

                                <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 text-left mb-10 shadow-inner">
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mb-4">Master Payment Instructions</p>
                                    {paymentMethod === 'UPI' && <p className="font-black text-slate-900 text-xl tracking-tighter">VPA: sauravpoddar97097-8@okaxis</p>}
                                    {paymentMethod === 'QR' && (
                                        <div className="text-center p-6 bg-white rounded-3xl">
                                            <img 
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`upi://pay?pa=sauravpoddar97097-8@okaxis&pn=Aashvi%20Intern&am=${program.price}&cu=INR`)}`}
                                                alt="Master QR" className="w-48 h-48 mx-auto mb-4"
                                            />
                                            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Scan to Complete Settlement</p>
                                        </div>
                                    )}
                                    {paymentMethod === 'BANK' && <p className="text-slate-900 font-bold text-sm tracking-tight leading-relaxed font-mono">BANK: Aashvi Industrial Solutions<br/>A/C: 9876XXXXXXXX<br/>IFSC: AXIS0001234</p>}
                                </div>
                                <button onClick={onClose} className="w-full bg-slate-900 text-white p-8 rounded-[2.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-primary-main transition-all">Return to Dashboard</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default CheckoutModal;

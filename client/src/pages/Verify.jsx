import { useState } from 'react';
import { ShieldCheck, Search, Award, CheckCircle, XCircle, FileSearch, ArrowRight, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const Verify = () => {
  const [certId, setCertId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    setIsVerifying(true);
    setResult(null);

    try {
        const res = await api.get(`/api/verify/${certId}`);
        setResult({ ...res.data, status: res.data.status === 'Approved' ? 'Valid' : 'Pending' });
    } catch (err) {
        setResult({ status: 'Invalid' });
    } finally {
        setIsVerifying(false);
    }
  };

  return (
    <div className="pt-24 pb-32 bg-slate-50/50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-20 text-center">
            <span className="text-primary-main font-black text-sm tracking-widest uppercase mb-4 block animate-pulse">Official Verification</span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-8">
              Verify Your <span className="text-transparent bg-hero-gradient bg-clip-text">Achievement</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              Enter the unique certificate identification number to verify 
              the credentials and authenticity of the program certificate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form Section */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-hero-gradient opacity-[0.03] rounded-bl-[100%] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-10 shadow-sm border border-slate-100">
                  <ShieldCheck className="w-10 h-10 text-primary-main" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Certificate Details</h3>
                
                <div className="space-y-8 mb-12">
                  <div className="space-y-4">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Certificate ID</label>
                    <div className="relative group">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-slate-50 rounded-xl group-focus-within:bg-primary-main/10 transition-colors">
                        <Search className="w-5 h-5 text-slate-400 group-focus-within:text-primary-main transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="e.g., AASHVI-101" 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-main/20 focus:bg-white p-6 pl-20 rounded-2xl outline-none text-xl font-black transition-all placeholder-slate-300 shadow-inner"
                        value={certId}
                        onChange={(e) => setCertId(e.target.value.toUpperCase())}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleVerify}
                  disabled={isVerifying || !certId}
                  className="w-full bg-slate-900 text-white p-6 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-primary-main shadow-2xl transition-all active:scale-95 disabled:bg-slate-200 disabled:shadow-none flex items-center justify-center space-x-4"
                >
                  {isVerifying ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin text-white" />
                      <span>Verifying Trust...</span>
                    </>
                  ) : (
                    <>
                      <span>Validate Now</span>
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Result Section */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {isVerifying && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center"
                  >
                    <div className="w-32 h-32 bg-white/80 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center shadow-inner relative overflow-hidden group">
                      <div className="absolute inset-0 border-4 border-primary-main/20 border-t-primary-main rounded-[2.5rem] animate-spin" />
                      <Loader className="w-12 h-12 text-primary-main animate-pulse" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {result ? (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-12 rounded-[3.5rem] border-2 shadow-2xl transition-all duration-500 min-h-[450px] flex flex-col justify-center ${
                    result.status === 'Valid' 
                    ? 'bg-white border-green-100 shadow-green-500/5' 
                    : result.status === 'Pending'
                    ? 'bg-white border-orange-100 shadow-orange-500/5'
                    : 'bg-white border-red-100 shadow-red-500/5'
                  }`}
                >
                  {result.status === 'Valid' ? (
                    <div className="text-center group">
                      <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-10 group-hover:bg-green-100 transition-colors ring-8 ring-green-50">
                        <CheckCircle className="w-12 h-12 text-green-500 animate-in zoom-in duration-500" />
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Verified Success</h3>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-12">Official Academic Credential</p>
                      
                      <div className="space-y-8 bg-slate-50/80 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner group-hover:border-green-100 transition-colors">
                        <div className="grid grid-cols-2 gap-8 text-left">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                              Recipient Name
                            </p>
                            <p className="text-xl font-black text-slate-800 tracking-tight">{result.name}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                              Issue Date
                            </p>
                            <p className="text-xl font-black text-slate-800 tracking-tight">{result.date}</p>
                          </div>
                        </div>
                        <div className="text-left pt-6 border-t border-slate-200">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Program Pursued</p>
                          <p className="text-2xl font-black text-primary-main tracking-tight">{result.course}</p>
                        </div>
                      </div>
                    </div>
                  ) : result.status === 'Pending' ? (
                    <div className="text-center">
                      <div className="mx-auto w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8 ring-8 ring-orange-50">
                        <Clock className="w-12 h-12 text-orange-500" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-2 mt-4 tracking-tight">Identity Pending</h3>
                      <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
                        Record found for <span className="text-slate-900 font-black">"{result.name}"</span>, but payment verification is still in progress.
                      </p>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest bg-slate-50 p-6 rounded-2xl border border-dotted border-slate-200 italic">
                        Once the admin verifies your settlement, your official status will flip to active.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8 ring-8 ring-red-50">
                        <XCircle className="w-12 h-12 text-red-500" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-2 mt-4 tracking-tight">Verification Failed</h3>
                      <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
                        We couldn't find any record for ID: <span className="text-slate-900 font-black tracking-widest bg-slate-100 px-3 py-1 rounded-lg ml-1">"{certId}"</span>
                      </p>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest bg-slate-50 p-6 rounded-2xl border border-dotted border-slate-200 italic">
                        Please check the ID format or contact support 
                        if you believe this is an error.
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/40 backdrop-blur-sm p-12 rounded-[3.5rem] border-2 border-dashed border-slate-200 min-h-[450px] flex flex-col items-center justify-center text-center group"
                >
                  <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                    <FileSearch className="w-16 h-16 text-slate-300 opacity-50 group-hover:text-primary-main group-hover:opacity-100 transition-all" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-400 mb-4 tracking-tight">Verification Center</h3>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xs uppercase tracking-widest text-[10px] bg-slate-50 px-6 py-2 rounded-full border border-slate-100">
                    Your results will appear here
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Guidelines Section */}
          <div className="mt-32 pt-24 border-t border-slate-100">
            <h4 className="text-center text-slate-400 font-black text-xs uppercase tracking-[0.3em] mb-16">Why Verify with AASHVI INTERN?</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: 'Global Recognition', desc: 'Our certificates are recognized by 500+ top companies across India.', icon: Award },
                { title: 'QR Secured', desc: 'Each certificate comes with a unique ID and QR for instant validation.', icon: ShieldCheck },
                { title: 'Career Uplift', desc: 'Showcase your skills with verified credentials on LinkedIn & Resume.', icon: CheckCircle },
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all border border-slate-50 text-primary-main ring-4 ring-transparent group-hover:ring-primary-main/5">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h5 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{item.title}</h5>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;

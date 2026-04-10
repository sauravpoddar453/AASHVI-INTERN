import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Globe, Globe2, Loader, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    }, 2000);
  };

  return (
    <div className="pt-24 pb-32 bg-slate-50/50 min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-24 text-center">
          <span className="text-primary-main font-black text-sm tracking-[0.3em] uppercase mb-4 block animate-pulse">Get In Touch</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-8">
            How Can We <br /><span className="text-transparent bg-hero-gradient bg-clip-text">Help You?</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-xl font-medium leading-relaxed">
            Have a question about our programs or need career advice? 
            Our team is here to support you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-16">
            <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden group shadow-2xl shadow-slate-900/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary-main opacity-20 filter blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-3xl font-black mb-12 tracking-tight group-hover:translate-x-2 transition-transform">Direct Connect</h3>
              
              <div className="space-y-10">
                {[
                  { icon: Mail, label: 'Email Support', value: 'support@aashviintern.com', color: 'text-indigo-400' },
                  { icon: Phone, label: 'Call Center', value: '+91 98765 43210', color: 'text-emerald-400' },
                  { icon: MapPin, label: 'Patna Office', value: 'Boring Road, Patna, Bihar, India', color: 'text-rose-400' },
                ].map((info, i) => (
                  <div key={i} className="flex items-center space-x-6 group/info">
                    <div className={`p-5 bg-white/5 rounded-2xl border border-white/10 group-hover/info:bg-white/10 transition-all ${info.color}`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white/40 uppercase tracking-[0.2em] mb-1">{info.label}</p>
                      <p className="text-xl font-bold tracking-tight">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-12 border-t border-white/10 flex gap-8 justify-between items-center">
                <p className="text-white/40 font-black text-xs uppercase tracking-widest">Connect Socially</p>
                <div className="flex gap-4">
                  {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                    <button key={i} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-hero-gradient hover:border-transparent hover:scale-110 transition-all group/social active:scale-95">
                      <Icon className="w-5 h-5 text-white/60 group-hover/social:text-white" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl relative group overflow-hidden">
               <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner group-hover:rotate-6 transition-transform">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">Live Chat</h4>
                  <p className="text-slate-500 font-medium">Available Mon - Sat (9AM - 8PM)</p>
                </div>
                <div className="ml-auto">
                    <button className="bg-blue-600 text-white p-4 rounded-2xl font-black hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">Chat Now</button>
                </div>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-12 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-hero-gradient opacity-[0.03] rounded-bl-[100%] pointer-events-none" />
             
             <div className="relative z-10">
                <div className="mb-12">
                  <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Send a Message</h3>
                  <p className="text-slate-500 text-lg font-medium">Expected response time: Under 2 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-main/20 focus:bg-white p-6 rounded-2xl outline-none text-lg font-bold transition-all placeholder-slate-300 shadow-inner"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-main/20 focus:bg-white p-6 rounded-2xl outline-none text-lg font-bold transition-all placeholder-slate-300 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Subject of interest</label>
                    <select className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-main/20 focus:bg-white p-6 rounded-2xl outline-none text-lg font-bold transition-all text-slate-600 shadow-inner appearance-none cursor-pointer">
                      <option>Internship Inquiry</option>
                      <option>Course Enrollment</option>
                      <option>Certificate Issues</option>
                      <option>Business Partnership</option>
                      <option>Other Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Message</label>
                    <textarea 
                      required 
                      rows="5" 
                      placeholder="How can we help make your career better?" 
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-main/20 focus:bg-white p-6 rounded-3xl outline-none text-lg font-bold transition-all placeholder-slate-300 shadow-inner resize-none"
                    />
                  </div>

                  <button 
                    disabled={isSubmitting || isSent}
                    className="w-full bg-slate-900 text-white p-8 rounded-[2.5rem] font-black text-xl uppercase tracking-widest hover:bg-primary-main shadow-2xl transition-all active:scale-95 disabled:bg-slate-200 disabled:shadow-none flex items-center justify-center space-x-4 group"
                  >
                    {isSubmitting ? (
                      <Loader className="w-8 h-8 animate-spin" />
                    ) : isSent ? (
                      <div className="flex items-center space-x-4 animate-in zoom-in duration-300">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                        <span>Message Sent Successfully</span>
                      </div>
                    ) : (
                      <>
                        <span>Submit Proposal</span>
                        <Send className="w-7 h-7 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
             </div>
          </div>
        </div>

        {/* Support Card */}
        <div className="mt-32 p-12 md:p-16 rounded-[4rem] bg-white border border-slate-100 shadow-sm text-center relative group overflow-hidden">
           <div className="absolute top-0 left-0 w-32 h-32 bg-hero-gradient opacity-[0.03] rounded-br-[100%]" />
           <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em] mb-12">Looking for immediate answers?</p>
           <h4 className="text-4xl md:text-5xl font-black text-slate-900 mb-12 tracking-tight">Check Our <span className="text-transparent bg-hero-gradient bg-clip-text">Knowledge Center</span></h4>
           <div className="flex flex-wrap justify-center gap-6">
              {['FAQs', 'Help Center', 'Student Policy', 'Refund Terms'].map(btn => (
                <button key={btn} className="px-10 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-500 hover:bg-primary-main/5 hover:text-primary-main hover:border-primary-main/20 transition-all active:scale-95 flex items-center space-x-2">
                  <Globe2 className="w-4 h-4" />
                  <span>{btn}</span>
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

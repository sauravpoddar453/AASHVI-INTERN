import { Mail, Phone, MapPin, Globe, GraduationCap, ArrowRight, ShieldCheck, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-32 pb-16 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-hero-gradient filter blur-[150px] opacity-[0.05] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-500/10 filter blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-32">
          {/* Brand Side */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center space-x-2 mb-10 group">
              <div className="bg-hero-gradient p-3 rounded-2xl group-hover:rotate-12 transition-transform shadow-2xl shadow-primary-main/30">
                <GraduationCap className="text-white w-8 h-8" />
              </div>
              <span className="text-4xl font-black bg-hero-gradient bg-clip-text text-transparent tracking-tighter">
                AASHVI<span className="text-white ml-1">INTERN</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xl font-medium leading-relaxed mb-12 max-w-md italic">
              India's leading career acceleration platform for students. 
              Bridging the gap with verified internships and industry-standard training.
            </p>
            <div className="flex gap-4">
              {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                <button key={i} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-hero-gradient hover:border-transparent hover:scale-110 transition-all group/social active:scale-95">
                  <Icon className="w-5 h-5 text-white/60 group-hover/social:text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4">Quick Navigation</h4>
            <ul className="space-y-6">
              {['Home', 'Internships', 'Verification', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '')}`} 
                    className="text-slate-400 font-bold hover:text-white transition-all flex items-center group text-lg"
                  >
                    <ArrowRight className="w-0 h-4 mr-0 group-hover:w-4 group-hover:mr-3 transition-all text-primary-light" />
                    <span>{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Policies */}
          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4">Legal Matters</h4>
            <ul className="space-y-6">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookies', 'Disclaimer'].map((link) => (
                <li key={link}>
                  <Link 
                    to="#" 
                    className="text-slate-400 font-bold hover:text-white transition-all flex items-center group text-lg"
                  >
                    <ArrowRight className="w-0 h-4 mr-0 group-hover:w-4 group-hover:mr-3 transition-all text-primary-light" />
                    <span>{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact Side */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4">Support Center</h4>
            <div className="space-y-8 bg-white/5 p-10 rounded-[3rem] border border-white/10">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-primary-main/10 rounded-2xl flex items-center justify-center text-primary-light border border-white/5 shadow-inner">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-1">Email Us</p>
                   <p className="text-white font-bold tracking-tight">hello@aashvi.in</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-primary-main/10 rounded-2xl flex items-center justify-center text-primary-light border border-white/5 shadow-inner">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-1">Call Support</p>
                   <p className="text-white font-bold tracking-tight">+91 9988776655</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">© 2026 AASHVI INTERN. ALL RIGHTS RESERVED. HANDCRAFTED IN INDIA.</p>
          <div className="flex flex-wrap gap-10 opacity-40 hover:opacity-100 transition-opacity">
             <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-[0.2em]"><ShieldCheck className="w-3.5 h-3.5" /> SECURE PAY</div>
             <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-[0.2em]"><Award className="w-3.5 h-3.5" /> ISO 9001:2015</div>
             <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-[0.2em]"><CheckCircle className="w-3.5 h-3.5" /> MSME REGISTERED</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

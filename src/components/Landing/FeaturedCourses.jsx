import { useState, useEffect } from 'react';
import api from '../../api';
import { Clock, CheckCircle, ArrowRight, Star, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CheckoutModal from '../CheckoutModal';

const FeaturedCourses = () => {
  const [activePrograms, setActivePrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const [intRes, courRes] = await Promise.all([
          api.get('/api/internships'),
          api.get('/api/courses')
        ]);
        const merged = [
          ...intRes.data.map(i => ({...i, docType: 'Internship'})),
          ...courRes.data.map(c => ({...c, docType: 'Course'}))
        ].slice(0, 6);
        setActivePrograms(merged);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const triggerEnroll = (item) => {
    if (!user) {
        window.location.href = '/login';
        return;
    }
    setSelectedItem(item);
    setShowCheckout(true);
  };

  if (loading) return null;

  return (
    <section className="py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
            <span className="text-primary-main font-black text-sm tracking-widest uppercase mb-6 block animate-pulse">Live Discoveries</span>
            <h2 className="text-6xl font-black text-slate-900 tracking-tightest leading-tight">
              Premium <span className="text-transparent bg-hero-gradient bg-clip-text">Career Tracks</span>
            </h2>
          </div>
          <Link to="/internships" className="mt-8 md:mt-0 flex items-center space-x-4 text-slate-900 font-black hover:text-primary-main transition-colors group text-xs uppercase tracking-widest bg-slate-50 px-10 py-6 rounded-3xl border border-slate-100 shadow-sm">
            <span>Explore All Tracks</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {activePrograms.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-100/30 hover:shadow-primary-main/10 transition-all duration-700 hover:-translate-y-4"
            >
              <div className="relative overflow-hidden h-72">
                <img 
                  src={item.image || item.thumbnail || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800`} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border border-white/20">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${item.docType === 'Internship' ? 'text-primary-main' : 'text-purple-600'}`}>{item.docType || 'Career'}</span>
                </div>
              </div>

              <div className="p-12">
                <div className="flex items-center space-x-6 mb-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary-main" />
                    <span>{item.duration || 'Flexible'}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-green-500" />
                    <span>Remote Unit</span>
                  </span>
                </div>

                <h3 className="text-3xl font-black text-slate-900 mb-8 group-hover:text-primary-main transition-colors leading-tight lowercase first-letter:uppercase">
                  {item.title}
                </h3>

                <p className="text-slate-400 font-medium italic mb-12 line-clamp-2">
                  {item.shortDesc || item.domain || 'This is a premium career track managed by AASHVI INTERN.'}
                </p>

                <button 
                    onClick={() => triggerEnroll(item)}
                    className="w-full bg-slate-900 text-white p-7 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-primary-main shadow-2xl transition-all duration-500 group flex items-center justify-center gap-4"
                >
                    <span>Pay & Enroll Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <CheckoutModal 
            isOpen={showCheckout} 
            onClose={() => setShowCheckout(false)} 
            program={selectedItem} 
            user={user} 
        />
      </div>
    </section>
  );
};

export default FeaturedCourses;

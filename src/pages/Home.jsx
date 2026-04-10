import { useState, useEffect } from 'react';
import Hero from '../components/Landing/Hero';
import FeaturedCourses from '../components/Landing/FeaturedCourses';
import Categories from '../components/Landing/Categories';
import CheckoutModal from '../components/CheckoutModal';
import { User, Monitor, Award, ShieldCheck, GraduationCap, ChevronRight, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const triggerCheckout = (title, price, type = 'Internship') => {
    if (!user) {
        window.location.href = '/login';
        return;
    }
    setSelectedProgram({ title, price, type });
    setShowCheckout(true);
  };

  return (
    <div className="overflow-hidden">
      <Hero onEnroll={() => triggerCheckout('Master Career Track', 1999)} />
      
      {/* Logos Section */}
      <section className="py-20 bg-white border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-400 font-black text-xs uppercase tracking-[0.3em] mb-12 animate-pulse">Trusted by Industry Leaders & Institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform">
            {['TechNova', 'EduStream', 'BuildUp', 'InnoVent', 'SkyHigh'].map((brand, i) => (
              <span key={i} className="text-3xl md:text-5xl font-black text-slate-300 tracking-tighter hover:text-primary-main transition-colors duration-300 cursor-default">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <FeaturedCourses />
      
      {/* How it Works */}
      <section className="py-32 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-hero-gradient/20 filter blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-500/10 filter blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <span className="text-primary-light font-black text-sm tracking-widest uppercase mb-4 block">Simple Roadmap</span>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Get Started in <span className="text-transparent bg-hero-gradient bg-clip-text">3 Simple Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="absolute top-[30%] left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-main/30 to-transparent hidden lg:block -z-10" />
            
            {[
              { id: '01', title: 'Register & Explore', desc: 'Create your account and find the best match for your career goals from our curated listings.', icon: User },
              { id: '02', title: 'Upskill & Apply', desc: 'Enroll in industry-led courses and apply for premium internships with confidence.', icon: Monitor },
              { id: '03', title: 'Get Certified', desc: 'Complete the program, earn a recognized certificate, and land your dream job.', icon: Award },
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 hover:border-primary-main/30 transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative mb-12">
                  <div className="w-24 h-24 bg-hero-gradient p-5 rounded-[2rem] shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform rotate-3 ring-8 ring-white/5">
                    <step.icon className="text-white w-full h-full" />
                  </div>
                  <span className="absolute -top-4 -right-4 text-7xl font-black text-white/5 italic select-none group-hover:text-primary-main/20 transition-colors">{step.id}</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-6 tracking-tight group-hover:translate-x-2 transition-transform">{step.title}</h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
                  {step.desc}
                </p>
                <button onClick={() => window.location.href='/contact'} className="mt-10 flex items-center space-x-3 text-primary-light font-bold text-lg group/btn active:scale-95 transition-all">
                  <span>Contact Advisor</span>
                  <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Categories />

      {/* Professional Certification Showcase */}
      <section className="py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <span className="text-primary-main font-black text-sm tracking-widest uppercase mb-6 block">Industrial Recognition</span>
              <h2 className="text-6xl font-black text-slate-900 tracking-tightest leading-tight mb-10">
                Earn a <span className="text-transparent bg-hero-gradient bg-clip-text">Prestigious Award</span> for Your Excellence
              </h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed mb-12 italic">
                Our certifications are not just pieces of paper—they are industry-validated credentials recognized by premium tech organizations across India. Every certificate is backed by MSME and ISO standards.
              </p>
              <div className="space-y-6 mb-12">
                {[
                  { title: 'ISO 9001:2015 Certified', desc: 'Standardized quality management systems.' },
                  { title: 'MSME Registered Unit', desc: 'Validating our industrial standing.' },
                  { title: 'AICTE Compliant Standards', desc: 'Ensuring absolute academic integrity.' }
                ].map((point, i) => (
                  <div key={i} className="flex items-start space-x-4 group cursor-default">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500 flex-shrink-0 group-hover:bg-green-500 group-hover:text-white transition-all"><CheckCircle className="w-6 h-6" /></div>
                    <div>
                      <p className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">{point.title}</p>
                      <p className="text-slate-400 font-medium text-sm">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => triggerCheckout('Master Professional Award', 1499)} 
                className="bg-slate-900 text-white px-12 py-6 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary-main shadow-2xl transition-all active:scale-95 text-center flex items-center justify-center gap-4 group"
              >
                <span>Pay & Enroll Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring' }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative group"
            >
              <div className="absolute -inset-10 bg-hero-gradient/20 filter blur-[80px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative bg-white p-6 md:p-10 rounded-[3rem] border border-slate-100 shadow-3xl hover:translate-y-[-20px] transition-transform duration-700 cursor-zoom-in">
                <img 
                  src="/certificate.png" 
                  alt="AASHVI INTERN Sample Certificate" 
                  className="w-full h-auto rounded-2xl shadow-inner border border-slate-50"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md px-10 py-5 rounded-full text-white font-black uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">Preview Master Award</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-primary-main font-black text-sm tracking-widest uppercase mb-4 block">Success Stories</span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-8">
              What Our <span className="text-transparent bg-hero-gradient bg-clip-text">Students Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-hero-gradient opacity-10 rounded-bl-[100%] transition-transform group-hover:scale-150 duration-700" />
                <div className="flex space-x-1.5 mb-8">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 text-yellow-500 fill-yellow-500 group-hover:rotate-12 transition-transform delay-75" />
                  ))}
                </div>
                <p className="text-xl text-slate-600 font-medium italic mb-10 leading-relaxed relative z-10">
                  "The AI course and the subsequent internship at AASHVI INTERN changed my career path. The mentors are industry experts!"
                </p>
                <div className="flex items-center space-x-5 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-200 overflow-hidden ring-4 ring-slate-50 group-hover:ring-primary-main/20 transition-all">
                    <img src={`https://i.pravatar.cc/150?u=${i*10}`} alt="avatar" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900 mb-0.5">Rahul Kumar</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Web Developer, Infotech</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-hero-gradient rounded-[4rem] p-16 md:p-24 text-center text-white relative shadow-2xl shadow-primary-main/20 overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)] opacity-30 animate-pulse-slow" />
            <motion.div 
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <GraduationCap className="w-24 h-24 text-white/20 mx-auto mb-10 group-hover:rotate-12 transition-transform duration-700" />
              <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight leading-tight">Ready to Transform Your <br /> Future with Us?</h2>
              <p className="text-2xl font-medium text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed">
                Join thousands of students who are gaining real-world experience and professional certifications every single day.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <button onClick={() => triggerCheckout('Full Career Access', 2999)} className="bg-white text-primary-main px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 shadow-2xl transition-all hovre:shadow-white/20 uppercase tracking-widest text-[10px]">Get Started Now</button>
                <button onClick={() => window.location.href='/contact'} className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all active:scale-95 uppercase tracking-widest text-[10px]">Support Center</button>
              </div>
              <div className="mt-20 flex flex-wrap justify-center gap-12 pt-12 border-t border-white/20 opacity-70 font-bold uppercase tracking-[0.2em] text-sm">
                <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Secured Payment</span>
                <span className="flex items-center gap-2"><Star className="w-5 h-5" /> 24/7 Mentorship</span>
                <span className="flex items-center gap-2"><Award className="w-5 h-5" /> Global Cert</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        program={selectedProgram} 
        user={user} 
      />
    </div>
  );
};

export default Home;

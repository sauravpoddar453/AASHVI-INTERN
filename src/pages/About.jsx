import { Landmark, GraduationCap, Briefcase, Award, Users, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-24 pb-32 bg-white min-h-screen">
      <div className="container mx-auto px-6 relative">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-hero-gradient filter blur-[150px] opacity-[0.03] -translate-y-1/2 translate-x-1/2" />
        
        {/* Hero Section */}
        <div className="mb-32 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1">
            <span className="text-primary-main font-black text-sm tracking-[0.3em] uppercase mb-6 block animate-pulse">Our Heritage</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-10">
              Empowering India's <span className="text-transparent bg-hero-gradient bg-clip-text">Next-Gen Talent</span>
            </h1>
            <p className="text-slate-600 text-xl md:text-2xl font-medium leading-relaxed mb-12 max-w-2xl italic border-l-4 border-primary-main/20 pl-8">
              "AASHVI INTERN is a premier skill development platform helping students navigate the bridge between college education and industry success."
            </p>
            <div className="flex flex-wrap gap-12 pt-10 border-t border-slate-100">
              <div>
                <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">5,000+</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Active Trainees</p>
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">200+</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Hiring Partners</p>
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">95%</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Placement Rate</p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-8 border-slate-50 rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200" 
                alt="Our Mission" 
                className="w-full h-[500px] object-cover scale-110 hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-16 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-main opacity-20 rounded-bl-[100%] transition-transform group-hover:scale-150 duration-700" />
            <div className="w-20 h-20 bg-hero-gradient rounded-3xl flex items-center justify-center mb-10 shadow-xl shadow-primary-main/30 border border-white/10 group-hover:rotate-6 transition-transform">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-4xl font-black mb-8 tracking-tight group-hover:translate-x-2 transition-transform">Our Noble Mission</h3>
            <p className="text-slate-400 text-xl font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
              Our core mission is to Democratize industry exposure. We aim to bridge 
              the vast gap between student skill sets and industry requirements through 
              relentless training and mentorship.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-16 rounded-[4rem] bg-hero-gradient text-white relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100%] transition-transform group-hover:scale-150 duration-700" />
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-10 border border-white/20 group-hover:rotate-12 transition-transform">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-4xl font-black mb-8 tracking-tight group-hover:translate-x-2 transition-transform">The Vision 2030</h3>
            <p className="text-white/80 text-xl font-medium leading-relaxed group-hover:text-white transition-colors">
              We envision a world where every student in India, regardless of their 
              geography, has instant access to world-class internships and skill-based 
              education at the click of a button.
            </p>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-32">
          <span className="text-primary-main font-black text-sm tracking-[0.3em] uppercase mb-4 block">Meet The Architects</span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-20">The Power Behind <br/><span className="text-transparent bg-hero-gradient bg-clip-text">AASHVI INTERN</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { name: 'Amisha Kumari', role: 'CEO & Founder', image: 'https://i.pravatar.cc/150?u=woman6' },
              { name: 'Priya Verma', role: 'Head of Operations', image: 'https://i.pravatar.cc/150?u=woman2' },
              { name: 'Saurav Kumar', role: 'CTO & Product Dev', image: 'https://i.pravatar.cc/150?u=man3' },
            ].map((member, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative mb-10">
                  <div className="aspect-square rounded-[3.5rem] bg-slate-50 overflow-hidden ring-8 ring-slate-100 group-hover:ring-primary-main/10 transition-all duration-500 scale-95 group-hover:scale-100 shadow-sm group-hover:shadow-[0_45px_100px_-20px_rgba(79,70,229,0.15)] group-hover:rotate-3">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-3 rounded-2xl shadow-xl border border-slate-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity -translate-y-4 group-hover:translate-y-0 duration-500">
                    <p className="text-slate-900 font-black text-sm tracking-tight">{member.name}</p>
                  </div>
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-primary-main transition-colors">{member.name}</h4>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-slate-50 p-16 md:p-24 rounded-[4rem] border border-slate-100 text-center relative overflow-hidden group">
          <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-primary-main opacity-[0.03] rounded-full filter blur-[100px]" />
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-10 tracking-tight leading-tight">Ready to join our family?</h2>
          <p className="text-slate-500 text-xl font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
            Become a part of the fastest growing skill ecosystem in India and take charge of your professional destiny.
          </p>
          <button className="bg-hero-gradient text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 shadow-2xl shadow-primary-main/30 transition-all flex items-center gap-3 mx-auto">
            Get Started Now <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

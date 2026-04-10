import { useNavigate } from 'react-router-dom';
import { PlayCircle, Award, Users, BookOpen, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-hero-gradient/5 rounded-full filter blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-500/5 rounded-full filter blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-primary-main/10 text-primary-main font-bold text-sm mb-10 border border-primary-main/20 shadow-sm animate-bounce hover:animate-none group transition-all">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-main opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-main"></span>
              </span>
              <span>10,000+ Students Already Enrolled</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tighter mb-8">
              Kickstart Your <span className="text-transparent bg-hero-gradient bg-clip-text">Career</span> with AASHVI INTERN
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Unlock your potential with industry-ready internships, 
              certification training, and real-world project experience.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-5 items-center">
              <button 
                onClick={() => navigate('/internships')}
                className="btn-primary flex items-center space-x-3 px-10 py-5 group shadow-2xl shadow-primary-main/30"
              >
                <span className="text-xl">Explore Internships</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/courses')}
                className="btn-secondary flex items-center space-x-3 px-10 py-5 hover:bg-slate-50 border-slate-200"
              >
                <PlayCircle className="w-6 h-6 text-primary-main" />
                <span className="text-xl">Enroll Now</span>
              </button>
            </div>

            <div className="mt-20 flex flex-wrap justify-center lg:justify-start items-center gap-x-12 gap-y-6 pt-10 border-t border-slate-100/50">
              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-indigo-50 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all text-primary-main shadow-sm">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">100%</p>
                  <p className="text-slate-500 font-medium whitespace-nowrap">Job Assistance</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-fuchsia-50 rounded-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all text-fuchsia-600 shadow-sm">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">50+</p>
                  <p className="text-slate-500 font-medium whitespace-nowrap">Direct Courses</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-amber-50 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all text-amber-600 shadow-sm">
                  <Star className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">4.9/5</p>
                  <p className="text-slate-500 font-medium whitespace-nowrap">Average Rating</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            {/* Main Image Plate */}
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(79,70,229,0.2)] border-[8px] border-white/50 backdrop-blur-xl">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600" 
                alt="Students Working" 
                className="w-full h-[650px] object-cover scale-105 hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            </div>

            {/* Float Cards */}
            <div className="absolute -left-12 top-1/4 z-20 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl border border-white/40 animate-bounce-slow">
              <div className="flex items-center space-x-5">
                <div className="bg-hero-gradient p-4 rounded-2xl shadow-lg ring-4 ring-primary-main/10">
                  <Users className="text-white w-7 h-7" />
                </div>
                <div>
                  <p className="text-slate-500 font-bold mb-0.5 tracking-tight">Active Students</p>
                  <p className="text-3xl font-black text-slate-900">12k+</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-8 bottom-1/4 z-20 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl border border-white/40 animate-float-slow">
              <div className="flex items-center space-x-5">
                <div className="bg-green-500 p-4 rounded-2xl shadow-lg ring-4 ring-green-100">
                  <Star className="text-white w-7 h-7" />
                </div>
                <div>
                  <p className="text-slate-500 font-bold mb-0.5 tracking-tight">Success Rate</p>
                  <p className="text-3xl font-black text-slate-900">98%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

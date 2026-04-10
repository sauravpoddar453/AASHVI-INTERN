import { Laptop, Cpu, Building2, HardDrive, Layout, Users2, PieChart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { id: 1, name: 'Web Dev', icon: Laptop, color: 'bg-indigo-50/80 text-indigo-600', count: '15+ Jobs', gradient: 'from-indigo-500/20' },
  { id: 2, name: 'AI / ML', icon: Cpu, color: 'bg-purple-50/80 text-purple-600', count: '8+ Jobs', gradient: 'from-purple-500/20' },
  { id: 3, name: 'Civil', icon: Building2, color: 'bg-amber-50/80 text-amber-600', count: '5+ Jobs', gradient: 'from-amber-500/20' },
  { id: 4, name: 'IT / CS', icon: HardDrive, color: 'bg-blue-50/80 text-blue-600', count: '12+ Jobs', gradient: 'from-blue-500/20' },
  { id: 5, name: 'UI / UX', icon: Layout, color: 'bg-pink-50/80 text-pink-600', count: '10+ Jobs', gradient: 'from-pink-500/20' },
  { id: 6, name: 'HR / PR', icon: Users2, color: 'bg-emerald-50/80 text-emerald-600', count: '4+ Jobs', gradient: 'from-emerald-500/20' },
  { id: 7, name: 'Marketing', icon: PieChart, color: 'bg-orange-50/80 text-orange-600', count: '7+ Jobs', gradient: 'from-orange-500/20' },
  { id: 8, name: 'Management', icon: ShieldCheck, color: 'bg-cyan-50/80 text-cyan-600', count: '6+ Jobs', gradient: 'from-cyan-500/20' },
];

const Categories = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-primary-main font-black text-sm tracking-widest uppercase mb-4 block animate-pulse">Career Domains</span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-8">
            Explore <span className="text-transparent bg-hero-gradient bg-clip-text">Top Categories</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Choose from a wide range of domains and start your professional 
            journey with the right domain expertise.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className={`group relative p-10 rounded-[2.5rem] ${cat.color} border border-transparent hover:border-slate-100 shadow-sm transition-all duration-300 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] cursor-pointer hover:-translate-y-2`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]`} />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="p-6 bg-white rounded-3xl mb-8 group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ring-4 ring-white shadow-xl">
                  <cat.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black mb-2 transition-colors">{cat.name}</h3>
                <p className="text-sm font-bold opacity-70 tracking-widest uppercase">{cat.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

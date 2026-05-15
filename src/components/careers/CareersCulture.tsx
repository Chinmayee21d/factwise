'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users2, Lightbulb, TrendingUp } from 'lucide-react';

const CULTURE_PILLARS = [
  {
    title: "Collaborate",
    desc: "Collaboration is key at FactWise, and regardless of position, each team member is encouraged to voice their perspective.",
    icon: Users2,
    color: "blue"
  },
  {
    title: "Create",
    desc: "We value passion, dedication and adaptability that enables us to create elegant, beautiful solutions for complex challenges for our customers.",
    icon: Lightbulb,
    color: "purple"
  },
  {
    title: "Grow",
    desc: "We strongly believe in striving for excellence, upholding accountability and transparency, and having fun! This allows every team member to grow at their own pace and on their own terms.",
    icon: TrendingUp,
    color: "emerald"
  }
];

export const CareersCulture = () => {
  return (
    <section className="py-32 px-6 md:px-14 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm"
          >
            Our Culture
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter mb-6"
          >
            Built on <span className="text-[#3666ff] font-instrument italic font-medium">Shared Principles</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CULTURE_PILLARS.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className="group relative bg-white border border-slate-200 rounded-[32px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] hover:border-[#3666ff]/20 transition-all duration-500"
            >
              {/* Corner Accent Glow */}
              <div className={`absolute -top-10 -right-10 size-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none 
                ${pillar.color === 'blue' ? 'bg-blue-100' : pillar.color === 'purple' ? 'bg-purple-100' : 'bg-emerald-100'}`} 
              />

              <div className={`size-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 shadow-sm
                ${pillar.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600' : 
                  pillar.color === 'purple' ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600' : 
                  'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600'} 
                group-hover:text-white group-hover:scale-110 group-hover:rotate-[-6deg]`}
              >
                <pillar.icon className="size-8" strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                {pillar.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed text-lg">
                {pillar.desc}
              </p>

              {/* Decorative side accent */}
              <div className={`absolute top-10 left-0 w-1 h-12 rounded-r-full transition-all duration-500 scale-y-0 group-hover:scale-y-100
                ${pillar.color === 'blue' ? 'bg-blue-500' : pillar.color === 'purple' ? 'bg-purple-500' : 'bg-emerald-500'}`} 
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-50/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-purple-50/20 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

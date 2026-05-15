'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Zap, Users, ChevronRight } from 'lucide-react';

const VALUES = [
  {
    num: "01 / Customer",
    title: "Customer first, always.",
    desc: "Aim to create positive impact for organizations and bring sheer delight for every user — big or small.",
    icon: Heart,
    tag: "Principle 01"
  },
  {
    num: "02 / Craft",
    title: "Strive for excellence.",
    desc: "Constantly raise the bar for yourself and others with big-picture thinking and nuanced, robust execution.",
    icon: Star,
    tag: "Principle 02"
  },
  {
    num: "03 / Drive",
    title: "Never settle.",
    desc: "Aspire to deliver extraordinary results while always maintaining accountability and integrity.",
    icon: Zap,
    tag: "Principle 03"
  },
  {
    num: "04 / Together",
    title: "Always think win–win.",
    desc: "Challenge yourself to create win-win solutions for all stakeholders in every situation.",
    icon: Users,
    tag: "Principle 04"
  }
];

export const ValuesGrid = () => {
  return (
    <section className="py-32 px-6 md:px-14 bg-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            Our Values
          </motion.div>
          
          <div className="max-w-4xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.05] tracking-tighter mb-12"
            >
              The Values <span className="font-instrument italic font-medium text-[#3666ff]">That Ship</span> With Every Line Of Code.
            </motion.h2>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {VALUES.map((value, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -12 }}
              className="group relative bg-white border border-slate-200 rounded-[32px] p-8 min-h-[380px] flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] hover:border-[#3666ff]/20 transition-all duration-500"
            >
              {/* Premium Gradient Corner Accent */}
              <div className="absolute top-0 right-0 size-32 bg-gradient-to-bl from-blue-50/50 via-transparent to-transparent rounded-tr-[32px] pointer-events-none" />

              {/* Subtle Corner Glow - Always visible but intensifies on hover */}
              <div className="absolute -top-12 -right-12 size-32 bg-blue-100/30 rounded-full blur-[40px] group-hover:bg-blue-200/40 transition-colors duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="size-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#3666ff] group-hover:text-white group-hover:rotate-[-6deg] group-hover:scale-110 shadow-sm transition-all duration-500">
                  <value.icon className="size-7" strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4 tracking-tight leading-snug">
                  {value.title}
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  {value.desc}
                </p>
              </div>

              <div className="relative z-10 pt-8 mt-auto flex items-center justify-between border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-slate-100 group-hover:bg-[#3666ff] transition-colors duration-500" />
                  <span className="text-[10px] font-bold text-[#3666ff] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                    {value.tag}
                  </span>
                </div>
                {/* Arrow Button Removed */}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

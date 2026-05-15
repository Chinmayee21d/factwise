'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "It's great to be working directly with seniors and have the space to play around and find ways to make the product better. People care about you and not just the work you do.",
    author: "Sahil",
    role: "Software Developer — Backend",
    initials: "SH"
  },
  {
    quote: "The autonomy is real. I've owned end-to-end features from spec to ship in my first quarter, with the kind of mentorship and feedback that genuinely accelerates how you think.",
    author: "Priya",
    role: "Product Manager",
    initials: "PR"
  },
  {
    quote: "It's the kind of place where design is taken seriously and shipped quickly. We argue, we sketch, we prototype on a real codebase — and customers feel it.",
    author: "Aakash",
    role: "Senior Product Designer",
    initials: "AK"
  }
];

export const CareersTestimonials = () => {
  return (
    <section className="py-32 px-6 md:px-14 bg-slate-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm"
            >
              From the Team
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
            >
              What people <span className="text-[#3666ff] font-instrument italic font-medium">actually say</span> about working here.
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white/5 border border-white/10 p-10 rounded-[40px] hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 flex flex-col justify-between min-h-[400px]"
            >
              <div>
                <span className="text-6xl font-instrument text-[#3666ff] opacity-50 block mb-4">"</span>
                <p className="text-white/90 text-xl leading-relaxed font-light">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-8 border-t border-white/10 mt-8">
                <div className="size-12 rounded-full bg-gradient-to-br from-[#3666ff] to-blue-400 flex items-center justify-center text-white font-bold shadow-lg">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{t.author}</h4>
                  <p className="text-white/50 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function MissionStatement() {
  return (
    <section className="relative py-32 md:py-48 bg-white overflow-hidden">
      {/* Soft brand blue background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-50 opacity-40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[40%] h-[40%] bg-blue-100/50 opacity-20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1800px] mx-auto px-[clamp(24px,5vw,80px)] relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600/60 mb-12">
            <span className="w-8 h-[1px] bg-blue-200" /> OUR MISSION
          </span>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-slate-900 leading-[1.2] tracking-tight max-w-5xl mx-auto mb-12">
            Delight users and provide <span className="font-instrument italic text-blue-600">sustainable</span>, positive impact to the organizations we serve.
          </h2>
          
          <p className="text-slate-500 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto">
            Not a tagline. The single sentence we test every roadmap decision against.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

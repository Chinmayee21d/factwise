'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TILES = [
  { id: "01", label: "Builders", color: "bg-[#3666ff]", delay: 0 },
  { id: "02", label: "Operators", color: "bg-slate-900", delay: 0.1 },
  { id: "03", label: "Designers", color: "bg-emerald-500", delay: 0.2 },
  { id: "04", label: "Partners", color: "bg-stone-200", delay: 0.3, textColor: "text-slate-900" }
];

export const CultureSection = () => {
  return (
    <section className="py-24 px-6 md:px-14 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 xl:gap-24 items-center">
          
          {/* Left: Tile Collage */}
          <div className="relative h-[500px] md:h-[600px] w-full">
            {/* Tile A: Large Blue */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 w-[60%] h-[65%] bg-[#3666ff] rounded-[32px] p-8 shadow-2xl z-10"
            >
              <span className="text-sm font-bold text-white/40 uppercase tracking-widest">01</span>
              <div className="absolute bottom-8 left-8 text-3xl font-bold text-white">Builders</div>
            </motion.div>

            {/* Tile B: Deep Slate */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute top-[10%] right-0 w-[45%] h-[45%] bg-slate-900 rounded-[32px] p-8 shadow-2xl z-20"
            >
              <span className="text-sm font-bold text-white/40 uppercase tracking-widest">02</span>
              <div className="absolute bottom-8 left-8 text-2xl font-bold text-white">Operators</div>
            </motion.div>

            {/* Tile C: Emerald */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-0 left-[10%] w-[50%] h-[40%] bg-emerald-500 rounded-[32px] p-8 shadow-2xl z-30"
            >
              <span className="text-sm font-bold text-white/40 uppercase tracking-widest">03</span>
              <div className="absolute bottom-8 left-8 text-2xl font-bold text-white">Designers</div>
            </motion.div>

            {/* Tile D: Stone */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-[5%] right-[5%] w-[40%] h-[35%] bg-stone-200 rounded-[32px] p-8 shadow-2xl z-40"
            >
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">04</span>
              <div className="absolute bottom-8 left-8 text-2xl font-bold text-slate-900">Partners</div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#3666ff]" />
              <span className="text-xs font-bold text-[#3666ff] uppercase tracking-[0.3em]">Culture</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.05] tracking-tighter mb-8">
              High Trust. <br />
              <span className="font-instrument italic font-medium text-[#3666ff]">Low Ego.</span> <br />
              Built To Last.
            </h2>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed max-w-lg">
              <p>
                We're a remote-first team that believes the best work happens when people 
                are trusted with ownership, given context instead of instructions, and 
                surrounded by colleagues who care about craft.
              </p>
              <p>
                We disagree openly, decide quickly, and ship with intention. Every hire 
                raises the average.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 w-fit px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#3666ff] transition-colors duration-300 shadow-xl"
            >
              Join the team
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
};

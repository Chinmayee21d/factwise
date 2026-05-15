'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AboutCounter } from './AboutCounter';

export const Hero = () => {
  return (
    <section className="pt-32 pb-24 px-6 md:px-14 overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2
            }
          }
        }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="text-4xl md:text-[4rem] font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-blue-600 pb-2"
        >
          One Platform. Every Buyer. <br /> Every Supplier. Every Step.
        </motion.h1>
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="text-slate-500 text-base md:text-[1.15rem] max-w-3xl mx-auto leading-relaxed"
        >
          FactWise is the leading source-to-pay cloud platform, bridging the gap between 
          complexity and efficiency for the modern, global procurement ecosystem.
        </motion.p>
      </motion.div>

      {/* Bento Grid Layout with Scroll Reveal & 3D Hover */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-50px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200/50 h-[300px] md:h-[450px] relative group"
      >
        <img 
          src="/group-diverse-people-having-business-meeting.jpg" 
          className="w-full h-full object-cover object-top" 
          alt="FactWise Team Meeting" 
        />
        {/* Black Transparent Overlay */}
        <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/50" />
      </motion.div>
    </section>
  );
};

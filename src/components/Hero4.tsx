'use client';

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

export default function Hero4() {
  return (
    <section className="relative min-h-screen w-full flex items-center bg-white overflow-hidden">
      
      {/* 1. Cinematic Foundation: Light Background Grid & Noise */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.4]" 
          style={{ 
            backgroundImage: `radial-gradient(#cbd5e1 0.5px, transparent 0.5px)`, 
            backgroundSize: '40px 40px' 
          }} 
        />
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
        />
        {/* Soft, Airy Background Orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#3666ff]/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-slate-100 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* 2. Left Column: High-Contrast Typography */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-start">
            {/* Context Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50/50 backdrop-blur-md flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#3666ff] animate-ping" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Next-Gen Sourcing</span>
            </motion.div>

            <h1 className="flex flex-col mb-8 leading-[0.95] tracking-tight">
              <span className="text-[12vw] lg:text-[7vw] font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                <WordsPullUp text="Smarter" />
              </span>
              <span className="text-[12vw] lg:text-[7vw] font-light text-slate-400 italic" style={{ fontFamily: "var(--font-display)" }}>
                <WordsPullUp text="Sourcing." />
              </span>
              <span className="text-[10vw] lg:text-[6vw] font-bold text-[#3666ff] mt-2" style={{ fontFamily: "var(--font-display)" }}>
                <WordsPullUp text="Unified." />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-xl text-slate-600 max-w-[500px] mb-12 leading-relaxed font-medium"
            >
              FactWise unifies your entire procurement ecosystem into one intelligent, 100% visible workflow. Eliminate data silos and optimize every dollar.
            </motion.p>

            {/* 3. Action Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap items-center gap-6"
            >
              <button className="group relative px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 shadow-[0_20px_40px_rgba(15,23,42,0.15)]">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <ArrowRight size={18} />
                </span>
                <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 opacity-10" />
              </button>
              <button className="px-8 py-4 border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all">
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* 4. Right Column: 3D-Perspective Visual Core */}
          <div className="col-span-1 lg:col-span-6 relative flex justify-center items-center h-[500px] lg:h-[700px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 20, x: 50 }}
              animate={{ opacity: 1, scale: 1, rotateY: -15, x: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-square max-w-[540px] perspective-[2000px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Floating Metadata Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 z-30 p-4 rounded-2xl bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#3666ff]/10 flex items-center justify-center text-[#3666ff]">
                  <span className="text-xl font-bold">∑</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Analytics</p>
                  <p className="text-sm font-bold text-slate-900">Live Spend Sync</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-12 z-30 p-4 rounded-2xl bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                  <span className="text-xl font-bold">✓</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Validation</p>
                  <p className="text-sm font-bold text-slate-900">100% Verified</p>
                </div>
              </motion.div>

              {/* Tilted Video Frame */}
              <div className="w-full h-full rounded-[48px] overflow-hidden border border-slate-100 shadow-[0_50px_100px_-20px_rgba(54,102,255,0.12),0_30px_60px_-30px_rgba(0,0,0,0.05)] bg-slate-50 group relative">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="/factwise-hero.mp4"
                />
                {/* Light Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3666ff]/5 via-transparent to-white/20 pointer-events-none" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#3666ff]/10 blur-[80px] rounded-full opacity-60" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ShimmerButton } from '@/components/ui/ShimmerButton';
import { MagicButton } from '@/components/ui/MagicButton';

export default function Hero2() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">

      {/* Background Atmosphere - Softened for Light Theme */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-[5%] w-[800px] h-[800px] bg-[#3666ff]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-[5%] w-[600px] h-[600px] bg-[#00b884]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between px-10 md:px-20 lg:px-24 py-32 gap-16">

        {/* Left Content - High Contrast for Light Theme */}
        <div className="flex-1 flex flex-col items-start text-left max-w-[650px]">
          {/* Badge */}
          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#3666ff]/10 bg-[#3666ff]/5 backdrop-blur-xl"
          >
            <span className="text-[11px] font-bold tracking-[0.15em] text-[#3666ff] uppercase">
              Now Live
            </span>
            <div className="w-px h-3 bg-[#3666ff]/20" />
            <a
              href="#new-version"
              className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 hover:text-[#3666ff] transition-all tracking-wide"
            >
              Smarter Sourcing v2.0
              <ArrowRight size={12} className="text-[#3666ff]/60" />
            </a>
          </motion.aside>

          {/* Headline - Premium Dark Slate */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900"
            style={{
              letterSpacing: '-0.03em'
            }}
          >
            One platform.<br />
            <span className="text-[#3666ff]">Everything</span> synced.
          </motion.h1>

          {/* Subheadline - Soft Slate */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 max-w-[500px] mb-12 leading-relaxed font-medium"
          >
            Unify your entire supply chain with the intelligent source-to-pay ecosystem designed to optimize spend and mitigate risk.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="flex flex-wrap items-center gap-6"
          >
            <MagicButton
              label1="Request Demo"
              label2="Join FactWise"
              className="scale-110 origin-left"
            />
            <ShimmerButton
              variant="secondary"
              className="rounded-2xl text-slate-600 hover:text-slate-900 border border-slate-200 h-[52px] px-8 hover:bg-slate-50 transition-all text-sm font-semibold shadow-sm"
            >
              Explore Ecosystem
            </ShimmerButton>
          </motion.div>
        </div>

        {/* Right Content - Video Section Crystal Clear & Rounded */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[700px] h-full flex items-center justify-center p-1">
            {/* Soft, airy glow */}
            <div className="absolute inset-0 bg-[#3666ff]/5 blur-[120px] rounded-full scale-110 opacity-40" />

            {/* Rounded & Framed Container */}
            <div className="relative z-10 w-full rounded-[48px] overflow-hidden border border-slate-100/80 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.12)]">
              <video
                src="/factwise-hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-contain"
                style={{
                  // Rounded frame logic handled by parent container
                }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

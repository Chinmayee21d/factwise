'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ShimmerButton } from '@/components/ui/ShimmerButton';
import { MagicButton } from '@/components/ui/MagicButton';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0a0a0c] overflow-hidden">

      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#7c5cfc]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#34d399]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between px-10 md:px-20 lg:px-24 py-32 gap-16">

        {/* Left Content - Balanced & Sized Down */}
        <div className="flex-1 flex flex-col items-start text-left max-w-[650px]">
          {/* Badge */}
          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/5 bg-white/[0.05] backdrop-blur-xl"
          >
            <span className="text-[11px] font-bold tracking-[0.15em] text-[#7c5cfc] uppercase">
              Now Live
            </span>
            <div className="w-px h-3 bg-white/10" />
            <a
              href="#new-version"
              className="flex items-center gap-1.5 text-[11px] font-medium text-gray-300 hover:text-white transition-all tracking-wide"
            >
              Smarter Sourcing v2.0
              <ArrowRight size={12} className="text-gray-500" />
            </a>
          </motion.aside>

          {/* Headline - Scaled Down */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight mb-8 leading-[1.1] text-white"
            style={{
              letterSpacing: '-0.02em'
            }}
          >
            One platform.<br />
            <span className="text-[#7c5cfc]">Everything</span> synced.
          </motion.h1>

          {/* Subheadline - Scaled Down */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-gray-400 max-w-[500px] mb-12 leading-relaxed font-light"
          >
            Unify your entire supply chain with the intelligent source-to-pay ecosystem designed to optimize spend and mitigate risk.
          </motion.p>

          {/* CTAs - Scaled Down */}
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
              className="rounded-xl text-gray-400 hover:text-white border border-white/5 h-[52px] px-8 hover:bg-white/[0.02] text-sm"
            >
              Explore Ecosystem
            </ShimmerButton>
          </motion.div>
        </div>

        {/* Right Content - Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[700px] h-full flex items-center justify-center">
            <video
              src="/factwise-hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-contain"
              style={{
                maskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)',
                mixBlendMode: 'screen'
              }}
            />

            {/* Subtle glow behind video */}
            <div className="absolute inset-0 bg-[#7c5cfc]/10 blur-[130px] -z-10 rounded-full scale-90 opacity-40" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

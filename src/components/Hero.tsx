'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ShimmerButton } from '@/components/ui/ShimmerButton';
import { MagicButton } from '@/components/ui/MagicButton';

import { GLOBAL_LAYOUT } from './LayoutConfig';

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >

      {/* ── Atmospheric blobs ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Main right-side atmospheric bloom */}
        <div
          className="absolute"
          style={{
            width: '960px',
            height: '960px',
            top: '50%',
            right: '-8%',
            transform: 'translateY(-52%)',
            background: 'radial-gradient(circle, rgba(74,111,255,0.26) 0%, rgba(108,142,255,0.15) 32%, rgba(160,180,255,0.07) 58%, transparent 74%)',
            filter: 'blur(88px)',
            borderRadius: '50%',
          }}
        />
        {/* Top-left accent — keeps the top corner from feeling flat */}
        <div
          className="absolute -top-40 -left-20"
          style={{
            width: '560px',
            height: '560px',
            background: 'radial-gradient(circle, rgba(74,111,255,0.07) 0%, transparent 65%)',
            filter: 'blur(90px)',
            borderRadius: '50%',
          }}
        />
        {/* Bottom-center warm tint */}
        <div
          className="absolute bottom-0 left-1/3"
          style={{
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(108,142,255,0.08) 0%, transparent 70%)',
            filter: 'blur(70px)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div
        className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-16"
        style={{ ...GLOBAL_LAYOUT.containerStyle, zIndex: 10 }}
      >

        {/* Left — copy */}
        <div className="flex-1 flex flex-col items-start text-left max-w-[600px]">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-9 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.70)',
              border: '1px solid rgba(74,111,255,0.20)',
              boxShadow: '0 2px 16px rgba(74,111,255,0.10)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECC8B] opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2ECC8B]" />
            </span>
            <span
              className="text-[10.5px] font-semibold tracking-[0.16em] uppercase"
              style={{ color: '#4A6FFF', fontFamily: 'var(--font-inter)' }}
            >
              Now Live
            </span>
            <div className="w-px h-3 bg-[#1A1D2E]/10" />
            <span
              className="flex items-center gap-1 text-[10.5px] font-medium"
              style={{ color: '#7B82A8', fontFamily: 'var(--font-inter)' }}
            >
              Smarter Sourcing v2.0
              <ArrowRight size={11} className="opacity-60" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mb-7"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: '#0D0F1C',
            }}
          >
            One platform.<br />
            <span style={{ color: '#4A6FFF' }}>Everything</span> synced.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mb-11 max-w-[460px]"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '17px',
              fontWeight: 400,
              lineHeight: 1.72,
              color: '#7B82A8',
            }}
          >
            Go beyond simple sourcing. FactWise unifies Quote-to-Order,
            Requisition-to-PO and Invoice-to-Pay into one intelligent
            ecosystem—with 100% visibility.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="flex flex-wrap items-center gap-10"
          >
            <MagicButton
              label1="Request Demo"
              label2="Join FactWise"
              className="scale-110 origin-left"
            />
            <ShimmerButton variant="secondary" showArrow>
              Explore Ecosystem
            </ShimmerButton>
          </motion.div>

          {/* Trust micro-line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-[12px] tracking-wide"
            style={{ color: '#B0B5CC', fontFamily: 'var(--font-inter)' }}
          >
            No credit card required · Free 14-day trial · SOC 2 certified
          </motion.p>
        </div>

        {/* Right — video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[680px] flex items-center justify-center">

            {/* Video-specific blob — inner vivid core */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '88%',
                height: '88%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(ellipse at center, rgba(74,111,255,0.50) 0%, rgba(108,142,255,0.32) 30%, rgba(138,160,255,0.14) 55%, transparent 74%)',
                filter: 'blur(40px)',
                borderRadius: '50%',
                zIndex: 1,
              }}
            />
            {/* Mid halo */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '125%',
                height: '125%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(ellipse at center, rgba(74,111,255,0.18) 0%, rgba(108,142,255,0.09) 42%, transparent 72%)',
                filter: 'blur(64px)',
                borderRadius: '50%',
                zIndex: 1,
              }}
            />
            {/* Outer bloom */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '158%',
                height: '158%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(ellipse at center, rgba(100,130,255,0.07) 0%, transparent 68%)',
                filter: 'blur(88px)',
                borderRadius: '50%',
                zIndex: 1,
              }}
            />

            {/* Video */}
            <video
              src="/factwise-hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-contain"
              style={{
                position: 'relative',
                zIndex: 2,
                borderRadius: '20px',
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

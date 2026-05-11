'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

const roadmapData = [
  {
    phase: "01",
    time: "2-8 weeks",
    title: "Go live with support",
    description: "Launch your digital transformation with expert guidance. No heavy lifting.",
    icon: Rocket,
    color: "#4A6FFF", 
    features: ["Expert onboarding", "Data migration", "Team training"]
  },
  {
    phase: "02",
    time: "3-6 months",
    title: "Operational excellence",
    description: "Replace manual processes with FactWise. Experience immediate speed and gains.",
    icon: Zap,
    color: "#4A6FFF", 
    features: ["Automated workflows", "Real-time tracking", "Vendor collaboration"]
  },
  {
    phase: "03",
    time: "6-12 months",
    title: "Measurable savings",
    description: "Realize significant cost reductions and ROI. Scale impact across the enterprise.",
    icon: TrendingUp,
    color: "#4A6FFF", 
    features: ["Cost optimization", "Strategic sourcing", "ROI realization"]
  }
];

export default function ImplementationRoadmap() {
  return (
    <section className="py-12 md:py-24 px-6 relative overflow-hidden w-full font-sans scroll-mt-32">
      {/* Rounded Background Container */}
      <div
        className="absolute inset-0 mx-2 md:mx-10 bg-no-repeat bg-cover bg-center rounded-[2rem] md:rounded-[2rem] overflow-hidden"
        style={{
          backgroundImage: "url('/TexturedGradient.png')",
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div className="section-badge" style={{ marginBottom: 0, fontWeight: 500, letterSpacing: '0.05em' }}>Your Journey with FactWise</div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#1A1D2E',
              margin: 0,
              lineHeight: 1.15
            }}
          >
            From setup to <span className="italic" style={{ color: '#4A6FFF' }}>savings</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '18px',
              fontWeight: 500,
              color: '#7B82A8',
              margin: 0,
              lineHeight: 1.6,
              maxWidth: '720px'
            }}
          >
            A structured path to operational transformation — no surprises, no delays.
          </motion.p>
        </div>

        {/* Roadmap Grid */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 relative">
          {roadmapData.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex-1 min-w-0"
              >
                <div className="h-full bg-white relative w-full overflow-hidden rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(74,111,255,0.12)] hover:-translate-y-2 hover:border-blue-500/20">
                  
                  {/* Subtle Top Gradient Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 via-blue-500 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="p-8 md:p-10 flex flex-col h-full relative z-10">
                    {/* Header Row: Phase & Time */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                          {item.phase}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Phase</span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                        {item.time}
                      </span>
                    </div>

                    {/* Icon Container: Soft & Clean */}
                    <div className="mb-8 relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100/50 flex items-center justify-center text-blue-600 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <item.icon className="w-7 h-7" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <h3 className="text-2xl font-bold text-[#1A1D2E] mb-4 leading-tight font-display tracking-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-[15px] leading-relaxed mb-8 font-sans font-medium">
                      {item.description}
                    </p>

                    {/* Features List: Minimalist */}
                    <div className="mt-auto pt-8 border-t border-slate-50">
                      <ul className="space-y-4">
                        {item.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-3 group/item">
                            <div className="mt-1 size-5 rounded-full flex items-center justify-center bg-blue-50/50 text-blue-600/60 group-hover/item:bg-blue-50 group-hover/item:text-blue-600 transition-colors">
                              <CheckCircle2 className="w-3 h-3" />
                            </div>
                            <span className="text-[14px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Minimal Connector (Desktop only) */}
              {index < roadmapData.length - 1 && (
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-8 h-[1px] bg-slate-100 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-200" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom Scroll/Down Indicator (Decorative) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-12"
        >
          <div className="w-10 h-10 rounded-full border border-[#E2E5F0] flex items-center justify-center text-[#7B82A8]">
            <div className="animate-bounce">↓</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

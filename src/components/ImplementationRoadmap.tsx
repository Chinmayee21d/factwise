'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

const roadmapData = [
  {
    phase: "01",
    time: "2-8 weeks",
    title: "Go live with support",
    description: "Launch your digital transformation with dedicated expert guidance. No heavy IT lifting, no disruption to your existing workflows.",
    icon: Rocket,
    color: "#4ADE80", // Mint Green (matches image structure)
    bgColor: "rgba(74, 222, 128, 0.1)",
    features: ["Expert onboarding", "Data migration", "Team training"]
  },
  {
    phase: "02",
    time: "3-6 months",
    title: "Operational excellence",
    description: "Replace manual, fragmented processes with FactWise. Experience immediate speed, transparency, and vendor collaboration gains across your operations.",
    icon: Zap,
    color: "#4A6FFF", // Primary Blue (Moodboard)
    bgColor: "rgba(74, 111, 255, 0.1)",
    features: ["Automated workflows", "Real-time tracking", "Vendor collaboration"]
  },
  {
    phase: "03",
    time: "6-12 months",
    title: "Measurable savings",
    description: "Realize significant cost reductions and ROI. Scale your impact — from sourcing to payments to analytics — across the entire enterprise.",
    icon: TrendingUp,
    color: "#2ECC8B", // Success Green (Moodboard)
    bgColor: "rgba(46, 204, 139, 0.1)",
    features: ["Cost optimization", "Strategic sourcing", "ROI realization"]
  }
];

export default function ImplementationRoadmap() {
  return (
    <section className="pt-40 pb-32 px-6 relative overflow-hidden bg-white w-full font-sans scroll-mt-32">
      
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
            From setup to <span className="italic" style={{ color: '#2ECC8B' }}>savings</span>
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
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-4 relative">
          {roadmapData.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-1 min-w-0"
              >
                <div className="h-full bg-white rounded-2xl border border-[#E2E5F0] shadow-sm overflow-hidden flex flex-col relative group transition-all duration-300 hover:border-[#4A6FFF]/30 hover:shadow-xl hover:shadow-blue-500/5">
                  {/* Top Accent Bar */}
                  <div 
                    className="h-1.5 w-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  
                  <div className="p-8 md:p-10 flex flex-col h-full">
                    {/* Phase & Time Pill */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-xs font-bold tracking-widest text-[#B0B5CC] uppercase">Phase {item.phase}</span>
                      <span className="px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#F4F5FB] border border-[#E2E5F0]" style={{ color: item.color }}>
                        {item.time}
                      </span>
                    </div>

                    {/* Icon Container */}
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: item.bgColor, color: item.color }}
                    >
                      <item.icon className="w-7 h-7" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-[#1A1D2E] mb-5 leading-tight font-display">{item.title}</h3>
                    <p className="text-[#7B82A8] text-[15px] leading-relaxed mb-10 font-sans">
                      {item.description}
                    </p>

                    {/* Divider */}
                    <div className="mt-auto pt-8 border-t border-[#F0F2F8]">
                      <ul className="space-y-4">
                        {item.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center gap-3 text-[#1A1D2E]">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: item.color }} />
                            <span className="text-sm font-medium font-sans">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Arrow Connector (Desktop) */}
              {index < roadmapData.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-2 opacity-20">
                  <ArrowRight className="w-6 h-6 text-[#1A1D2E]" />
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

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Zap, ChevronRight, TrendingUp, Activity, Clock, ShieldCheck } from 'lucide-react';

const features = [
  {
    id: 0,
    number: "01",
    label: "PHASE ONE",
    time: "2–8 weeks",
    title: "Go live with support",
    description: "Launch your digital transformation with expert guidance. We handle the complexity so your team can focus on what they do best.",
    pill: "Expert onboarding",
    ui: "setup"
  },
  {
    id: 1,
    number: "02",
    label: "PHASE TWO",
    time: "3–6 months",
    title: "Operational excellence",
    description: "Replace slow, manual procurement with automated workflows. Your team gains real-time visibility across the entire supply chain.",
    pill: "24/7 Automation",
    ui: "automation"
  },
  {
    id: 2,
    number: "03",
    label: "PHASE THREE",
    time: "6–12 months",
    title: "Measurable savings",
    description: "Realize significant, auditable cost reductions and ROI. Data-driven insights surface new savings opportunities.",
    pill: "Auditable ROI",
    ui: "analytics"
  }
];

// --- Dashboard Componentry (Optimized Height) ---

const SetupLog = () => (
  <div className="flex flex-col h-full p-6 lg:p-7 pb-10">
    <div className="mb-5 flex items-end justify-between">
      <div>
        <span className="text-[9px] font-bold text-[#3666ff] uppercase tracking-[0.2em] mb-1.5 block">Implementation Feed</span>
        <h4 className="text-xl font-bold text-white">Go-Live Activity</h4>
      </div>
      <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-lg border border-white/10 mb-0.5">
        <span className="text-blue-400 text-[11px] font-semibold">2-8 weeks</span>
        <div className="h-3 w-px bg-white/10" />
        <span className="text-emerald-500 text-[9px] font-bold tracking-[0.15em] uppercase">Expert onboarding</span>
      </div>
    </div>
    <div className="flex-1 space-y-2.5">
      {[
        { label: "Expert onboarding initialized", status: "Done", time: "Day 1" },
        { label: "Legacy data migration", status: "Done", time: "Week 2" },
        { label: "Team training sessions", status: "Active", time: "Week 4" },
        { label: "Final security audit", status: "Pending", time: "Week 8" }
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Done' ? 'bg-emerald-500' : item.status === 'Active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-700'}`} />
            <span className="text-[12px] font-medium text-white/80">{item.label}</span>
          </div>
          <span className="text-[9px] font-bold text-white/20 tracking-widest uppercase">{item.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const AutomationLog = () => (
  <div className="flex flex-col h-full p-6 lg:p-7 pb-10">
    <div className="mb-5 flex items-end justify-between">
      <div>
        <span className="text-[9px] font-bold text-[#3666ff] uppercase tracking-[0.2em] mb-1.5 block">Workflow Engine</span>
        <h4 className="text-xl font-bold text-white">Operational Excellence</h4>
      </div>
      <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-lg border border-white/10 mb-0.5">
        <span className="text-blue-400 text-[11px] font-semibold">3-6 months</span>
        <div className="h-3 w-px bg-white/10" />
        <span className="text-emerald-500 text-[9px] font-bold tracking-[0.15em] uppercase">24/7 Automation</span>
      </div>
    </div>
    <div className="flex-1 space-y-2.5">
      {[
        { label: "PO-9283 Auto-Approved", detail: "24/7" },
        { label: "Manual touchpoints removed", detail: "Sync" },
        { label: "Supply chain visibility", detail: "Live" }
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Zap size={12} />
            </div>
            <span className="text-[12px] font-medium text-white/80">{item.label}</span>
          </div>
          <span className="text-[10px] font-bold text-white/20">{item.detail}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center mb-10">
      <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Efficiency Gain</span>
      <span className="text-blue-400 font-bold text-md">+42%</span>
    </div>
  </div>
);

const AnalyticsLog = () => (
  <div className="flex flex-col h-full p-6 lg:p-7 pb-10">
    <div className="mb-5 flex items-end justify-between">
      <div>
        <span className="text-[9px] font-bold text-[#3666ff] uppercase tracking-[0.2em] mb-1.5 block">ROI Center</span>
        <h4 className="text-xl font-bold text-white">Measurable ROI</h4>
      </div>
      <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-lg border border-white/10 mb-0.5">
        <span className="text-blue-400 text-[11px] font-semibold">6-12 months</span>
        <div className="h-3 w-px bg-white/10" />
        <span className="text-emerald-500 text-[9px] font-bold tracking-[0.15em] uppercase">Auditable ROI</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-5">
      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
        <p className="text-[9px] font-bold text-white/40 uppercase mb-0.5">Savings</p>
        <p className="text-xl font-bold text-white">$1.2M</p>
      </div>
      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
        <p className="text-[9px] font-bold text-white/40 uppercase mb-0.5">ROI</p>
        <p className="text-xl font-bold text-white">4.8x</p>
      </div>
    </div>
    <div className="flex-1 space-y-4">
      <div className="h-20 w-full flex items-end gap-1 px-1">
        {[30, 60, 45, 90, 55, 80, 100, 70, 85].map((h, i) => (
          <motion.div 
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
            className="flex-1 bg-blue-500/20 hover:bg-blue-500 transition-colors rounded-t-sm"
          />
        ))}
      </div>
    </div>
  </div>
);

export default function ImplementationRoadmap() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Sticky scroll tracking for a locked-in experience
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 3 phases mapped across 300vh of scroll
    if (latest < 0.33) setActiveStep(0);
    else if (latest < 0.66) setActiveStep(1);
    else setActiveStep(2);
  });

  return (
    <section ref={sectionRef} className="relative w-full font-sans h-[300vh]">
      {/* Sticky Container - This stays in viewport while user scrolls through journey */}
      <div className="sticky top-0 h-screen flex items-center overflow-visible">
        
        {/* The background stays with the sticky container - Perfectly matched with Testimonials */}
        <div
          className="absolute inset-0 mx-2 md:mx-10 bg-no-repeat bg-cover bg-center rounded-[2rem] md:rounded-[2rem] overflow-hidden"
          style={{
            backgroundImage: "url('/TexturedGradient.png')",
            backgroundAttachment: 'fixed'
          }}
        />
        
        <div className="max-w-[1280px] mx-auto w-full relative z-10 px-4 py-[10vh]">
          <div className="mb-8 lg:mb-8 flex flex-col items-center text-center gap-6">
            <div className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[12px] font-bold uppercase tracking-[0.1em]">
              Implementation Journey
            </div>
            <motion.h2
              className="text-[#1A1D2E] leading-[1.15] font-bold"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: 'clamp(36px, 6vw, 54px)',
                letterSpacing: '-0.02em',
              }}
            >
              From setup to <span className="italic text-[#3666ff]">savings</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[18px] font-medium text-[#7B82A8] leading-relaxed max-w-[720px]"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              A structured path to operational transformation — no surprises, no delays.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* Stepper Column */}
            <div className="lg:col-span-5">
              <div className="relative flex flex-col justify-between min-h-[440px] py-4">
                {/* Animated Progress Line */}
                <div className="absolute left-[31px] top-10 bottom-10 w-[2px] bg-gray-200/50">
                  <motion.div 
                    className="absolute top-0 left-0 w-full bg-[#3666ff] origin-top"
                    style={{ 
                      height: '100%',
                      scaleY: activeStep === 0 ? 0.2 : activeStep === 1 ? 0.6 : 1 
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </div>

                {features.map((step, index) => {
                  const isActive = activeStep === index;
                  return (
                    <motion.div
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`relative flex items-start gap-10 cursor-pointer transition-all duration-700 ${
                        isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      {/* Milestone Number Circle */}
                      <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold border-4 transition-all duration-500 shrink-0 ${
                        isActive 
                          ? 'bg-white border-[#3666ff] text-[#3666ff] shadow-[0_15px_40px_-10px_rgba(54,102,255,0.35)]' 
                          : 'bg-white border-gray-100 text-slate-300'
                      }`}>
                        {step.number}
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 pt-1">
                        <h3 className={`text-[22px] font-bold leading-tight mb-2 transition-colors duration-500 ${
                          isActive ? 'text-[#1A1D2E]' : 'text-slate-400'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-[14px] leading-relaxed transition-all duration-700 ${
                          isActive ? 'text-slate-600 opacity-100' : 'text-slate-400 opacity-60'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Re-expanded Dashboard */}
            <div className="lg:col-span-7 relative flex items-center justify-center scale-[0.95]">
              <div className="relative w-full max-w-[500px] bg-slate-900 rounded-[36px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white/5">
                
                <div className="h-14 bg-white/5 border-b border-white/5 flex items-center justify-between px-8">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity size={14} className="text-white/20" />
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.25em]">
                      {activeStep === 0 ? 'Live Platform Sync' : activeStep === 1 ? 'Workflow Engine' : 'ROI Center'}
                    </span>
                  </div>
                </div>

                <div className="relative h-[360px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="h-full"
                    >
                      {features[activeStep].ui === "setup" && <SetupLog />}
                      {features[activeStep].ui === "automation" && <AutomationLog />}
                      {features[activeStep].ui === "analytics" && <AnalyticsLog />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3666ff]/15 blur-[120px] rounded-full pointer-events-none -z-10" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock, TrendingUp, Zap, BarChart3, ShieldCheck } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  value: string;
}

interface CaseStudy {
  id: string;
  category: string;
  company: string;
  logo: string;
  industry: string;
  title: string;
  metrics: Metric[];
  readTime: string;
  visual: React.ReactNode;
  color: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'tricolite',
    category: 'Manufacturing',
    company: 'Tricolite Electrical',
    logo: 'TE',
    industry: 'Electronics manufacturing',
    title: 'Achieved 14% annual profit increase by automating multi-currency RfQs and sourcing workflows',
    metrics: [
      { label: 'Profit increase', value: '14%' },
      { label: 'Process speed', value: '3x' },
      { label: 'Cost saved', value: '$1.2M' },
    ],
    readTime: '8 min read',
    color: '#000000',
    visual: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'
  },
  {
    id: 'varroc',
    category: 'Automotive',
    company: 'Varroc Engineering',
    logo: 'VE',
    industry: 'Automotive components',
    title: 'Enabled 18x ROI within the first year by automating complex landed cost calculations',
    metrics: [
      { label: 'ROI achieved', value: '18x' },
      { label: 'Accuracy', value: '99.9%' },
    ],
    readTime: '5 min read',
    color: '#000000',
    visual: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80'
  },
  {
    id: 'sahasra',
    category: 'Electronics',
    company: 'Sahasra Electronics',
    logo: 'SE',
    industry: 'Semiconductor manufacturing',
    title: 'Streamlined manual quoting workflows into a high-speed automated multi-currency process',
    metrics: [
      { label: 'Faster quoting', value: '4x' },
      { label: 'Error reduction', value: '95%' },
    ],
    readTime: '6 min read',
    color: '#000000',
    visual: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80'
  },
  {
    id: 'logi-flow',
    category: 'Logistics',
    company: 'LogiFlow Systems',
    logo: 'LS',
    industry: 'Global Supply Chain',
    title: 'Reduced freight procurement cycle time by 60% with automated lane bidding and selection',
    metrics: [
      { label: 'Cycle reduction', value: '60%' },
      { label: 'Freight savings', value: '22%' },
    ],
    readTime: '7 min read',
    color: '#000000',
    visual: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80'
  }
];

const CATEGORIES = ['All', 'Manufacturing', 'Automotive', 'Electronics', 'Logistics'];

export default function ModernCaseStudies() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredStudies = activeTab === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(s => s.category === activeTab);

  return (
    <section className="py-24 md:py-32 overflow-hidden relative" id="case-studies">
      {/* Background Image & Decor */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-40"
        style={{ backgroundImage: 'url("/TexturedGradient.png")' }}
      />
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6"
            >
              <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600" style={{ fontFamily: 'var(--font-inter)' }}>
                Customer Success
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="text-slate-900">Proven Impact.</span><br />
              <span className="text-blue-600">Across Industries.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Discover how industry leaders leverage FactWise to automate complex workflows and drive measurable growth.
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + (i * 0.05) }}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-[11px] font-semibold transition-all border tracking-widest uppercase",
                  activeTab === cat
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "bg-white border-slate-100 text-slate-400 hover:border-blue-200 hover:text-blue-600"
                )}
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
 
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group flex items-center gap-3 p-1.5 pr-5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-900 transition-all duration-500 hover:bg-white hover:border-blue-300 hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.1)] active:scale-95 whitespace-nowrap"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white transition-all duration-500 group-hover:bg-blue-700 group-hover:scale-105 group-hover:rotate-[15deg]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-slate-900 tracking-tight">View all stories</div>
            </div>
          </motion.button>
        </div>
 
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, index) => {
              const isOnly = filteredStudies.length === 1;
              const isLarge = index === 0 && filteredStudies.length > 1;
              const isTall = index === 1 && filteredStudies.length > 1;
 
              return (
                <motion.div
                  key={study.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                    delay: index * 0.05,
                  }}
                  className={cn(
                    "group relative bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col will-change-transform transform-gpu",
                    isOnly ? "md:col-span-3" : isLarge ? "md:col-span-2" : isTall ? "md:row-span-2" : "md:col-span-1"
                  )}
                >
                  <div className={cn(
                    "flex flex-col h-full",
                    (isLarge || isOnly) ? "md:flex-row" : "flex-col"
                  )}>
                    {/* Image Area */}
                    <div className={cn(
                      "relative overflow-hidden shrink-0",
                      (isLarge || isOnly) ? "h-64 md:h-full md:w-1/2" : isTall ? "h-64" : "h-40"
                    )}>
                      <img
                        src={study.visual as string}
                        alt={study.company}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-white/90 border border-white/20 text-blue-600 text-[10px] font-semibold tracking-widest uppercase backdrop-blur-md shadow-xl">
                          {study.category}
                        </span>
                      </div>
                    </div>
 
                    {/* Content Area */}
                    <div className={cn(
                      "flex-1 flex flex-col min-h-0 bg-white",
                      (isLarge || isOnly) ? "p-8 md:p-10" : "p-6 md:p-7"
                    )}>
                      {/* Top Info */}
                      <div className="mb-6">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 font-semibold text-[10px] shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-blue-100 group-hover:bg-blue-50/30">
                            {study.logo}
                          </div>
                          <div>
                            <h4 className="text-slate-900 font-semibold text-[13px] leading-none mb-1.5">{study.company}</h4>
                            <p className="text-slate-400 text-[9px] font-medium uppercase tracking-[0.1em]">{study.industry}</p>
                          </div>
                        </div>
                        <h3 className={cn(
                          "font-semibold text-slate-900 leading-[1.4] transition-colors duration-300 group-hover:text-blue-600",
                          (isLarge || isOnly) ? "text-xl md:text-2xl" : isTall ? "text-[20px]" : "text-[16px] line-clamp-2 md:line-clamp-3"
                        )} style={{ fontFamily: 'var(--font-display)' }}>
                          {study.title}
                        </h3>
                      </div>
                      
                      {/* Metrics & Footer */}
                      <div className="mt-auto pt-6 border-t border-slate-100">
                        {(!isLarge && !isOnly && !isTall) ? (
                          // Compact Cards: No metrics, just the button
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-medium">
                              <Clock className="w-3.5 h-3.5" />
                              {study.readTime}
                            </div>
                            <div className="group/btn flex items-center gap-2 text-blue-600 font-semibold text-[11px] uppercase tracking-wider cursor-pointer">
                              <span>Full Story</span>
                              <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-blue-600 group-hover/btn:border-blue-600">
                                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:text-white" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Feature & Tall Cards: Show metrics and footer
                          <>
                            <div className={cn(
                              "grid gap-6 mb-6",
                              (isLarge || isOnly) ? "grid-cols-3" : "grid-cols-1"
                            )}>
                              {study.metrics.map((m, mIdx) => (
                                <div key={mIdx} className={cn("space-y-1.5", isTall && "p-4 rounded-2xl bg-blue-50/30 border border-blue-100/50 flex items-center justify-between")}>
                                  {isTall ? (
                                    <>
                                      <div className="text-slate-500 text-[9px] font-medium uppercase tracking-[0.1em]">{m.label}</div>
                                      <div className="flex items-center gap-2">
                                        <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                                        <div className="text-[17px] font-semibold text-slate-900 tracking-tight">{m.value}</div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="flex items-center gap-2 mb-1">
                                        <TrendingUp className="w-3.5 h-3.5 text-blue-600 opacity-80" />
                                        <div className="text-base md:text-[17px] font-semibold text-slate-900 tracking-tight">{m.value}</div>
                                      </div>
                                      <div className="text-slate-400 text-[8px] font-medium uppercase tracking-[0.1em] leading-none">{m.label}</div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
 
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-medium">
                                <Clock className="w-3.5 h-3.5" />
                                {study.readTime}
                              </div>
                              <div className="group/btn flex items-center gap-2 text-blue-600 font-semibold text-[11px] uppercase tracking-wider cursor-pointer">
                                <span>Full Story</span>
                                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-blue-600 group-hover/btn:border-blue-600">
                                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:text-white" />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

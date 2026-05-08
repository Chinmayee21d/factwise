"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp, Zap, BarChart3, ShieldCheck } from 'lucide-react';
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
    category: 'MANUFACTURING',
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
    category: 'AUTOMOTIVE',
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
    category: 'SEMICONDUCTORS',
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
  }
];

const CATEGORIES = ['All', 'Manufacturing', 'Automotive', 'Electronics', 'Healthcare'];

export default function ModernCaseStudies() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <section className="bg-[#0B0D17] py-24 md:py-32 overflow-hidden" id="case-studies">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 block" style={{ fontFamily: 'var(--font-inter)' }}>
              CUSTOMER STORIES
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Results that speak for themselves
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl" style={{ fontFamily: 'var(--font-inter)' }}>
              See how teams across industries use our platform to move faster and grow smarter.
            </p>
          </div>
          
          <button className="group flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-800 text-white font-bold text-sm transition-all hover:bg-slate-800 active:scale-95 whitespace-nowrap">
            View all stories
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-bold transition-all border",
                activeTab === cat 
                  ? "bg-slate-800 border-slate-700 text-white" 
                  : "bg-transparent border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
              )}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Large Card (First item) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 group cursor-pointer"
          >
            <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 hover:border-blue-500/50 transition-all duration-500">
              {/* Visual Area */}
              <div className="h-[300px] md:h-[450px] w-full overflow-hidden relative">
                <img 
                  src={CASE_STUDIES[0].visual as string} 
                  alt={CASE_STUDIES[0].company}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] to-transparent opacity-60" />
              </div>
              
              {/* Content Area */}
              <div className="p-8 md:p-12 -mt-20 relative z-10">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className="px-3 py-1 rounded-full bg-blue-600 border border-blue-500/20 text-white text-[10px] font-black tracking-widest uppercase">
                    {CASE_STUDIES[0].category}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[#0B0D17] font-black text-xs shadow-xl">
                      {CASE_STUDIES[0].logo}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-none mb-1">{CASE_STUDIES[0].company}</h4>
                      <p className="text-slate-400 text-xs">{CASE_STUDIES[0].industry}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-white mb-10 leading-tight group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                  {CASE_STUDIES[0].title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pb-10 border-b border-slate-800/50">
                  {CASE_STUDIES[0].metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-3xl font-bold text-blue-400 mb-2">{m.value}</div>
                      <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                    <Clock className="w-4 h-4" />
                    {CASE_STUDIES[0].readTime}
                  </div>
                  <div className="flex items-center gap-2 text-white font-bold text-sm transition-transform group-hover:translate-x-1">
                    Read story
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Cards */}
          {CASE_STUDIES.slice(1).map((study, idx) => (
            <motion.div 
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 hover:border-blue-500/50 transition-all duration-500 h-full flex flex-col">
                {/* Visual Area */}
                <div className="h-[260px] w-full overflow-hidden relative">
                  <img 
                    src={study.visual as string} 
                    alt={study.company}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] to-transparent opacity-60" />
                </div>
                
                {/* Content Area */}
                <div className="p-8 flex flex-col flex-1 -mt-16 relative z-10">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[9px] font-black tracking-widest uppercase">
                      {study.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[#0B0D17] font-black text-[10px] shadow-lg">
                        {study.logo}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-xs leading-none mb-1">{study.company}</h4>
                        <p className="text-slate-400 text-[10px]">{study.industry}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-8 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {study.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-8 pb-8 border-b border-slate-800/50 mt-auto">
                    {study.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-2xl font-bold text-blue-400 mb-1">{m.value}</div>
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {study.readTime}
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold text-xs transition-transform group-hover:translate-x-1">
                      Read story
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

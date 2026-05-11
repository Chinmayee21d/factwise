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
  },
  {
    id: 'logi-flow',
    category: 'LOGISTICS',
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

const CATEGORIES = ['All', 'Manufacturing', 'Automotive', 'Electronics', 'Healthcare'];

export default function ModernCaseStudies() {
  const [activeTab, setActiveTab] = useState('All');

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
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600" style={{ fontFamily: 'var(--font-inter)' }}>
                Customer Success
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-slate-900">Proven Impact.</span><br />
              <span className="text-blue-600">Across Industries.</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl" style={{ fontFamily: 'var(--font-inter)' }}>
              Discover how industry leaders leverage FactWise to automate complex workflows and drive measurable growth.
            </p>
          </div>

          <button className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 font-bold text-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg active:scale-95 whitespace-nowrap">
            View all stories
            <div className="slide-button__icon-wrapper w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-white transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-5 py-2 rounded-lg text-xs font-bold transition-all border tracking-wide uppercase",
                activeTab === cat
                  ? "bg-blue-600 border-blue-500 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
              )}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[400px]">
          {/* Card 1: Large Landscape (Spans 2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/30 hover:shadow-2xl transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden">
                <img
                  src={CASE_STUDIES[0].visual as string}
                  alt={CASE_STUDIES[0].company}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 border border-slate-100 text-blue-600 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
                    {CASE_STUDIES[0].category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 font-black text-xs shadow-sm">
                      {CASE_STUDIES[0].logo}
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-sm leading-none mb-1">{CASE_STUDIES[0].company}</h4>
                      <p className="text-slate-500 text-xs">{CASE_STUDIES[0].industry}</p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                    {CASE_STUDIES[0].title}
                  </h3>
                </div>

                <div>
                  <div className="grid grid-cols-3 gap-6 py-6 border-t border-slate-50">
                    {CASE_STUDIES[0].metrics.map((m, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                          <div className="text-lg font-bold text-slate-900">{m.value}</div>
                        </div>
                        <div className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <Clock className="w-4 h-4" />
                      {CASE_STUDIES[0].readTime}
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-600 font-bold text-sm group/link">
                      <span>Read Story</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Tall Portrait (Spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:row-span-2 group relative overflow-hidden rounded-3xl border border-slate-100 bg-white hover:shadow-2xl transition-all duration-500 flex flex-col"
          >
            <div className="h-64 relative overflow-hidden">
              <img
                src={CASE_STUDIES[1].visual as string}
                alt={CASE_STUDIES[1].company}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-full bg-white/90 border border-slate-100 text-blue-600 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
                  {CASE_STUDIES[1].category}
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 font-black text-xs shadow-sm">
                  {CASE_STUDIES[1].logo}
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm leading-none mb-1">{CASE_STUDIES[1].company}</h4>
                  <p className="text-slate-500 text-xs">{CASE_STUDIES[1].industry}</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8 leading-tight group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                {CASE_STUDIES[1].title}
              </h3>

              <div className="space-y-6 mt-auto">
                <div className="grid grid-cols-1 gap-4 py-6 border-y border-slate-50">
                  {CASE_STUDIES[1].metrics.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50/50 flex items-center justify-between">
                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{m.label}</div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <div className="text-xl font-bold text-slate-900">{m.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <Clock className="w-4 h-4" />
                    {CASE_STUDIES[1].readTime}
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-600 font-bold text-sm group/link">
                    <span>Read Story</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Compact Square (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 group relative overflow-hidden rounded-3xl border border-slate-100 bg-white hover:shadow-2xl transition-all duration-500 flex flex-col"
          >
            <div className="h-32 relative overflow-hidden">
              <img
                src={CASE_STUDIES[2].visual as string}
                alt={CASE_STUDIES[2].company}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-6 flex flex-col h-full flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 font-black text-[10px] shadow-sm">
                    {CASE_STUDIES[2].logo}
                  </div>
                  <h4 className="text-slate-900 font-bold text-xs leading-none">{CASE_STUDIES[2].company}</h4>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[9px] font-bold uppercase tracking-wider">
                  {CASE_STUDIES[2].category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors line-clamp-3" style={{ fontFamily: 'var(--font-display)' }}>
                {CASE_STUDIES[2].title}
              </h3>

              <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-slate-50">
                {CASE_STUDIES[2].metrics.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-lg font-bold text-slate-900">{m.value}</div>
                    <div className="text-slate-500 text-[9px] font-bold uppercase tracking-widest leading-none">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                  <Clock className="w-3 h-3" />
                  {CASE_STUDIES[2].readTime}
                </div>
                <div className="flex items-center gap-1 text-blue-600 font-bold text-xs group/link">
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Compact Square (Bottom Center) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 group relative overflow-hidden rounded-3xl border border-slate-100 bg-white hover:shadow-2xl transition-all duration-500 flex flex-col"
          >
            <div className="h-32 relative overflow-hidden">
              <img
                src={CASE_STUDIES[3].visual as string}
                alt={CASE_STUDIES[3].company}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-6 flex flex-col h-full flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 font-black text-[10px] shadow-sm">
                    {CASE_STUDIES[3].logo}
                  </div>
                  <h4 className="text-slate-900 font-bold text-xs leading-none">{CASE_STUDIES[3].company}</h4>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[9px] font-bold uppercase tracking-wider">
                  {CASE_STUDIES[3].category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors line-clamp-3" style={{ fontFamily: 'var(--font-display)' }}>
                {CASE_STUDIES[3].title}
              </h3>

              <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-slate-50">
                {CASE_STUDIES[3].metrics.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-lg font-bold text-slate-900">{m.value}</div>
                    <div className="text-slate-500 text-[9px] font-bold uppercase tracking-widest leading-none">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                  <Clock className="w-3 h-3" />
                  {CASE_STUDIES[3].readTime}
                </div>
                <div className="flex items-center gap-1 text-blue-600 font-bold text-xs group/link">
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

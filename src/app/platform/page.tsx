'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header } from '@/components/ui/header-2';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import {
  Zap,
  ShieldCheck,
  TrendingDown,
  Layers,
  Search,
  ArrowRight,
  Target,
  Clock,
  Shield,
  Briefcase,
  ChevronRight
} from 'lucide-react';

const PILLARS = [
  { id: 'source', name: 'Strategic Sourcing', icon: Target, color: '#3666ff' },
  { id: 'procure', name: 'Purchase Orders', icon: Briefcase, color: '#4b8bff' },
  { id: 'receive', name: 'Goods Receipt', icon: ShieldCheck, color: '#22d3ee' },
  { id: 'pay', name: 'Invoicing & Payments', icon: TrendingDown, color: '#e8433a' },
  { id: 'analyze', name: 'Intelligence', icon: Search, color: '#facc15' },
];

export default function PlatformHub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="bg-[#f6f9fc] text-[#000000] min-h-screen relative overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center text-center">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#3666ff]/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] mb-8">
            <Zap size={14} className="text-[#3666ff]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#808080]">The FactWise Ecosystem</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-[1.1]">
            One platform for the <br />
            <span className="text-[#808080] font-semibold italic">entire operational lifecycle.</span>
          </h1>
          <p className="text-xl text-[#808080] font-light max-w-2xl mx-auto leading-relaxed">
            From strategic sourcing and automated purchase orders to real-time pricing intelligence
            and 3-way matching. FactWise unifies your entire supply chain.
          </p>
        </motion.div>
      </section>

      {/* Sticky Sub-Nav */}
      <nav className="sticky top-20 z-50 bg-[#f6f9fc]/90 backdrop-blur-xl border-y border-black/[0.06] py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-8 md:gap-16">
          {PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              className="group flex flex-col items-center gap-2 transition-all"
              onClick={() => {
                document.getElementById(pillar.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              <pillar.icon size={18} className="text-[#808080] group-hover:text-[#000000] transition-colors" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#808080] group-hover:text-[#000000] transition-colors">
                {pillar.id}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* PILLAR 1: SOURCING */}
      <section id="source" className="min-h-screen py-32 px-6 border-b border-black/[0.06] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-[#3666ff]/10 rounded-xl border border-[#3666ff]/20 text-[#3666ff]">
                <Target size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#3666ff]">Strategic Sourcing</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Source smarter with <br />
              <span className="text-[#808080] font-semibold italic">multi-round negotiation.</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Dynamic RFQ Events', desc: 'Create complex sourcing events with multi-vendor bidding in minutes.' },
                { title: 'N-Vendor Split Algorithm', desc: 'Automatically calculate the optimal vendor split to maximize savings.' },
                { title: 'BOM-Based Sourcing', desc: 'Import entire Bills of Materials and source components in one flow.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-black/[0.04] flex items-center justify-center text-[#3666ff] group-hover:bg-[#3666ff] group-hover:text-white transition-all">
                    <ChevronRight size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#000000] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#808080] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Placeholder: High-fidelity mockup */}
          <div className="relative aspect-square bg-black/[0.02] border border-black/[0.06] rounded-[40px] p-8 overflow-hidden group">
            {/* Simulating a "Bid Comparison" dashboard */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3666ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="h-full w-full bg-white rounded-3xl border border-black/[0.06] p-8 shadow-2xl relative">
              <div className="flex justify-between items-center mb-8">
                <div className="w-32 h-4 bg-black/[0.04] rounded" />
                <div className="w-16 h-8 bg-[#3666ff] rounded-lg" />
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-black/[0.04]" />
                    <div className="flex-1 space-y-2">
                      <div className="w-2/3 h-3 bg-black/[0.06] rounded" />
                      <div className="w-1/2 h-2 bg-black/[0.04] rounded" />
                    </div>
                    <div className="w-20 h-6 bg-green-500/10 border border-green-500/20 rounded-full" />
                  </div>
                ))}
              </div>
              {/* 3D Wave Decoration */}
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#3666ff]/20 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* PILLAR 2: PURCHASE ORDERS */}
      <section id="procure" className="min-h-screen py-32 px-6 border-b border-black/[0.06] relative bg-[#f6f9fc]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative aspect-square bg-black/[0.02] border border-black/[0.06] rounded-[40px] p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4b8bff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="h-full w-full bg-white rounded-3xl border border-black/[0.06] p-8 shadow-2xl relative">
              {/* Visual: Approval Chain / PO Timeline */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-[#4b8bff]/10 border border-[#4b8bff]/20 flex items-center justify-center">
                  <Briefcase className="text-[#4b8bff]" size={20} />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold">PO #8842-X</div>
                  <div className="text-[10px] text-[#808080] uppercase tracking-widest font-bold">In Approval</div>
                </div>
              </div>
              <div className="space-y-8 pl-6 border-l border-black/[0.08] relative">
                {[
                  { role: 'Requisitioner', status: 'Approved', time: '09:00 AM' },
                  { role: 'Finance Head', status: 'Approved', time: '11:30 AM' },
                  { role: 'VP Operations', status: 'Pending', time: 'Active' }
                ].map((step, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-white ${step.time === 'Active' ? 'bg-[#4b8bff] animate-pulse' : 'bg-green-500'}`} />
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#000000]">{step.role}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${step.time === 'Active' ? 'bg-[#4b8bff]/20 text-[#4b8bff]' : 'bg-green-500/20 text-green-500'}`}>
                        {step.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#4b8bff]/10 blur-[100px] rounded-full" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-[#4b8bff]/10 rounded-xl border border-[#4b8bff]/20 text-[#4b8bff]">
                <Briefcase size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#4b8bff]">Purchase Management</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Seamless execution from <br />
              <span className="text-[#808080] font-semibold italic">requisition to receipt.</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Multi-Level Approvals', desc: 'Custom criteria-based routing for purchase requisitions and orders.' },
                { title: 'PO Groups', desc: 'Batch hundreds of POs into a single group for consolidated processing.' },
                { title: 'Real-Time Tracking', desc: 'Track delivery schedules, confirmations, and amendments in real-time.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-black/[0.04] flex items-center justify-center text-[#4b8bff] group-hover:bg-[#4b8bff] group-hover:text-white transition-all">
                    <ChevronRight size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#000000] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#808080] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PILLAR 3: INVOICING & PAYMENTS */}
      <section id="pay" className="min-h-screen py-32 px-6 border-b border-black/[0.06] relative overflow-hidden bg-[#f6f9fc]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-[#e8433a]/10 rounded-xl border border-[#e8433a]/20 text-[#e8433a]">
                <TrendingDown size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#e8433a]">Finance & Settlement</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Eliminate friction with <br />
              <span className="text-[#808080] font-semibold italic">automated 3-way matching.</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Exception Detection', desc: 'System flags price, tax, and shipping mismatches before payment.' },
                { title: 'Credit Management', desc: 'Auto-generate credits for QC rejections and GR inconsistencies.' },
                { title: 'ERP Synchronization', desc: 'Bi-directional sync with SAP, Oracle, and NetSuite financial modules.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-black/[0.04] flex items-center justify-center text-[#e8433a] group-hover:bg-[#e8433a] group-hover:text-white transition-all">
                    <ChevronRight size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#000000] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#808080] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: Invoicing Dashboard */}
          <div className="relative aspect-square bg-black/[0.02] border border-black/[0.06] rounded-[40px] p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8433a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="h-full w-full bg-white rounded-3xl border border-black/[0.06] p-8 shadow-2xl relative">
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'PO Value', val: '$12,400', color: 'text-[#000000]' },
                  { label: 'GR Value', val: '$12,400', color: 'text-green-500' },
                  { label: 'Invoice', val: '$12,400', color: 'text-[#000000]' }
                ].map((card, i) => (
                  <div key={i} className="p-4 bg-black/[0.04] rounded-2xl border border-black/[0.06] text-center">
                    <div className="text-[8px] text-[#808080] uppercase tracking-widest mb-1">{card.label}</div>
                    <div className={`text-xs font-bold ${card.color}`}>{card.val}</div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-2xl flex items-center justify-center gap-3">
                <Shield size={16} className="text-green-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Match Confirmed: Ready for Payment</span>
              </div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#e8433a]/10 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* PILLAR 4: INTELLIGENCE */}
      <section id="analyze" className="min-h-screen py-32 px-6 relative overflow-hidden bg-[#f6f9fc]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative aspect-square bg-black/[0.02] border border-black/[0.06] rounded-[40px] p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#facc15]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="h-full w-full bg-white rounded-3xl border border-black/[0.06] p-8 shadow-2xl relative">
              {/* Visual: Search / Data Hub */}
              <div className="flex items-center gap-3 p-4 bg-black/[0.04] rounded-2xl border border-black/[0.08] mb-8">
                <Search size={16} className="text-[#808080]" />
                <div className="text-xs text-[#808080]">Search historical prices across contract, bids...</div>
              </div>
              <div className="space-y-4">
                {[
                  { source: 'Contract', price: '$0.82 / unit', date: 'Oct 2023' },
                  { source: 'Digi-Key', price: '$0.94 / unit', date: 'Real-time' },
                  { source: 'Prev. Bid', price: '$0.79 / unit', date: 'Aug 2023' }
                ].map((price, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-black/[0.02] border border-black/[0.06] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#facc15]" />
                      <span className="text-[10px] font-bold text-[#808080]">{price.source}</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#facc15]">{price.price}</div>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#facc15]/10 blur-[100px] rounded-full" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-[#facc15]/10 rounded-xl border border-[#facc15]/20 text-[#facc15]">
                <Search size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#facc15]">Pricing Intelligence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Every price you&apos;ve ever seen. <br />
              <span className="text-[#808080] font-semibold italic">Visible in milliseconds.</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Unified Pricing Repository', desc: 'Aggregates data from contracts, quotes, bids, POs, and distributor feeds.' },
                { title: 'Live Distributor Feeds', desc: 'Real-time API integration with Digi-Key and Mouser for electronic components.' },
                { title: 'Spend Visibility', desc: 'Multi-dimensional analytics for cost, vendor performance, and ROI tracking.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-black/[0.04] flex items-center justify-center text-[#facc15] group-hover:bg-[#facc15] group-hover:text-white transition-all">
                    <ChevronRight size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#000000] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#808080] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-40 text-center border-t border-black/[0.06]">
        <h2 className="text-4xl md:text-6xl font-light text-[#000000] mb-10">Ready to unify your supply chain?</h2>
        <motion.a
          href="/demo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-10 py-5 bg-[#3666ff] rounded-full font-bold text-white shadow-[0_0_30px_rgba(54,102,255,0.25)]"
        >
          Request a Platform Demo
          <ArrowRight size={20} />
        </motion.a>
      </div>

      <FlickeringFooter />
    </main>
  );
}

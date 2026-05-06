'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingDown, Lock, BarChart3, Fingerprint, Zap } from 'lucide-react';
import { GLOBAL_LAYOUT } from './LayoutConfig';

export default function ImpactBento() {
  return (
    <section 
      className="py-24 bg-[#0a0a0c] text-white overflow-hidden"
      style={{ paddingLeft: GLOBAL_LAYOUT.paddingX, paddingRight: GLOBAL_LAYOUT.paddingX }}
    >
      <div style={{ maxWidth: GLOBAL_LAYOUT.maxWidth, margin: '0 auto' }}>
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap size={14} className="text-[#7c5cfc]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Enterprise Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-6">
            Governance, savings & security. <br />
            <span className="text-gray-500 font-semibold">Unified in one platform.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 min-h-[600px]">
          
          {/* Savings & ROI Card (7 cols) */}
          <div className="md:col-span-7 relative group rounded-[24px] bg-[#111116] border border-white/5 overflow-hidden p-8 md:p-10 flex flex-col justify-between shadow-2xl transition-all hover:border-white/10">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2.5 bg-green-500/10 rounded-xl border border-green-500/20">
                      <TrendingDown className="text-green-400" size={24} />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest text-green-400/80">Value Realization</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light mb-4 leading-tight">
                  Projected <span className="font-semibold text-green-400">22% savings</span> <br/>
                  across your entire global spend.
                </h3>
                <p className="text-gray-500 max-w-sm text-base leading-relaxed font-light">
                   Our intelligence engine identifies price anomalies and maverick spend before they impact your bottom line.
                </p>
             </div>
             
             {/* Visual: ROI Chart Component */}
             <div className="mt-8 relative h-48 w-full bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 p-6 overflow-hidden group-hover:bg-black/60 transition-colors">
                <div className="flex items-end gap-3 h-full pb-2">
                   {[40, 60, 45, 85, 65, 100, 90, 110, 95].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }} 
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 0.8, ease: "easeOut" }}
                        className={`flex-1 rounded-t-md transition-all duration-500 ${i === 7 ? 'bg-green-400 shadow-[0_0_30px_rgba(74,222,128,0.3)]' : 'bg-white/5 group-hover:bg-white/10'}`} 
                      />
                   ))}
                </div>
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none opacity-20">
                   {[1,2,3,4].map(i => <div key={i} className="w-full h-px bg-white/20" />)}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent pointer-events-none" />
             </div>
             
             {/* Background Glow */}
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-400/5 blur-[100px] pointer-events-none" />
          </div>

          {/* Governance Card (5 cols) */}
          <div className="md:col-span-5 relative group rounded-[24px] bg-[#111116] border border-white/5 overflow-hidden p-8 md:p-10 flex flex-col shadow-2xl transition-all hover:border-white/10">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2.5 bg-[#7c5cfc]/10 rounded-xl border border-[#7c5cfc]/20">
                      <Lock className="text-[#7c5cfc]" size={24} />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest text-[#7c5cfc]/80">Governance</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light mb-4 leading-tight">
                  Zero-friction <br/>
                  <span className="font-semibold text-white">approvals.</span>
                </h3>
             </div>
             
             <div className="mt-4 space-y-4 relative z-10">
                {[
                  { user: 'Operations', action: 'PR Submitted', status: 'done', time: '10:02 AM' },
                  { user: 'Finance', action: 'Budget Verified', status: 'done', time: '11:14 AM' },
                  { user: 'Director', action: 'Final Approval', status: 'active', time: 'Pending' }
                ].map((step, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-4 p-3 rounded-2xl border transition-all ${
                      step.status === 'active' 
                      ? 'bg-[#7c5cfc]/5 border-[#7c5cfc]/20 shadow-[0_10px_30px_rgba(124,92,252,0.1)]' 
                      : 'bg-white/[0.02] border-white/5 opacity-40'
                    }`}
                  >
                     <div className={`w-2.5 h-2.5 rounded-full ${step.status === 'active' ? 'bg-[#7c5cfc] shadow-[0_0_10px_#7c5cfc]' : 'bg-green-500'}`} />
                     <div className="flex-1">
                        <div className="text-sm font-bold text-white mb-0.5">{step.user}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{step.action}</div>
                     </div>
                     <div className="text-[10px] font-mono text-gray-600">{step.time}</div>
                  </motion.div>
                ))}
             </div>
             
             <p className="mt-auto text-gray-500 text-base leading-relaxed pt-6 font-light">
                Intelligent routing ensures requests reach the right stakeholders instantly, reducing approval cycles from days to minutes.
             </p>

             <div className="absolute top-1/2 -right-20 w-64 h-64 bg-[#7c5cfc]/5 blur-[100px] pointer-events-none" />
          </div>

          {/* Compliance Card (12 cols) */}
          <div className="md:col-span-12 relative group rounded-[24px] bg-gradient-to-br from-[#111116] to-[#0a0a0c] border border-white/5 overflow-hidden p-8 md:p-10 flex flex-col md:flex-row items-center gap-12 shadow-2xl transition-all hover:border-white/10">
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                       <Fingerprint className="text-blue-400" size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400/80">Security</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light mb-4 text-white leading-tight">
                  Bank-grade <span className="font-semibold">enterprise security.</span>
                </h3>
                <p className="text-gray-500 leading-relaxed text-base font-light max-w-xl">
                    With SOC2 Type II compliance, granular RBAC, and multi-factor authentication, FactWise meets the strictest security requirements of the world&apos;s largest organizations.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-10">
                    {['SOC2 Type II', 'GDPR Compliant', 'ISO 27001 Certified', 'Single Sign-On (SSO)'].map((tag) => (
                        <div key={tag} className="text-[10px] font-bold text-white/50 border border-white/10 px-5 py-2 rounded-full uppercase tracking-widest bg-white/[0.02]">
                            {tag}
                        </div>
                    ))}
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-6 w-full relative z-10">
                  <div className="p-6 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center group-hover:bg-black/60 transition-colors">
                      <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1 font-mono">99.9%</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Uptime SLA</div>
                  </div>
                  <div className="p-6 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center group-hover:bg-black/60 transition-colors">
                      <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1 font-mono">256b</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">AES Encryption</div>
                  </div>
              </div>

              {/* Decorative SVG Security Shield in Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                 <ShieldCheck size={400} className="text-blue-400" />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}

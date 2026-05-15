"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, ShieldCheck, Users } from "lucide-react";

const metrics = [
  {
    icon: <Clock className="w-6 h-6" />,
    value: "80%",
    label: "Faster Bid Normalization",
    desc: "Average time saved by procurement managers on complex bid comparisons."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: "12%",
    label: "Direct Cost Reduction",
    desc: "Measured savings from multi-round negotiations and landed cost analysis."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    value: "100%",
    label: "Audit Compliance",
    desc: "Full digital trail of every communication, bid, and award decision."
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "20k+",
    label: "Vendor Network",
    desc: "Access to a global marketplace of pre-vetted, reliable supply partners."
  }
];

export default function ImpactMetrics() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
            <div 
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                style={{ fontFamily: 'var(--font-inter)' }}
            >
                Measurable Value
            </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1A1D2E] mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-display)' }}>Real-World Impact</h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-inter)' }}>
            FactWise isn&apos;t just software; it&apos;s a value-generation engine that transforms your baseline operations into competitive advantages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group flex flex-col items-center text-center"
            >
              <div className="size-16 rounded-2xl bg-slate-50 text-[#3666ff] flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#3666ff] group-hover:text-white transition-all duration-500">
                {m.icon}
              </div>
              <div className="text-5xl font-black text-[#1A1D2E] mb-3 tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>{m.value}</div>
              <div className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-6">{m.label}</div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

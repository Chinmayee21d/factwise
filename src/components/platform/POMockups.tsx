'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, Clock, AlertCircle, ShieldCheck, FileText, Package, Truck, Layers } from 'lucide-react';

const CardHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="p-5 border-b border-white/5 flex flex-col gap-1 bg-[#0d0d14]">
    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4b8bff]">{title}</div>
    {subtitle && <div className="text-[11px] text-gray-500 font-medium">{subtitle}</div>}
  </div>
);

export const POApprovalMockup = () => (
  <div className="w-full h-full flex flex-col bg-[#0d0d14]">
    <CardHeader title="Approval Workflow" subtitle="PO #8842-X: Pending Executive Review" />
    <div className="flex-1 p-8 relative">
      <div className="absolute left-[47px] top-10 bottom-10 w-px bg-gradient-to-b from-[#4b8bff] via-[#4b8bff]/20 to-white/5" />
      
      <div className="space-y-8">
        {[
          { role: 'Sourcing Manager', name: 'Sarah Chen', status: 'Approved', time: '09:12 AM', color: 'bg-green-500' },
          { role: 'Finance Director', name: 'Marcus Bell', status: 'Approved', time: '10:45 AM', color: 'bg-green-500' },
          { role: 'VP Operations', name: 'Elena Rodriguez', status: 'Pending', time: 'Active Now', color: 'bg-[#4b8bff]' }
        ].map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex gap-6 items-center relative z-10"
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#0a0a0c] shadow-xl",
              step.status === 'Approved' ? "bg-green-500 text-white" : "bg-[#4b8bff] text-white animate-pulse"
            )}>
              {step.status === 'Approved' ? <Check size={20} strokeWidth={3} /> : <Clock size={20} strokeWidth={3} />}
            </div>
            <div className="flex-1 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-colors">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-white">{step.role}</span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-gray-500">{step.time}</span>
              </div>
              <div className="text-[11px] text-gray-400">{step.name}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export const DeliveryScheduleMockup = () => (
  <div className="w-full h-full flex flex-col bg-[#0d0d14]">
    <CardHeader title="Fulfillment Tracking" subtitle="Multi-batch Delivery Schedule" />
    <div className="flex-1 p-6 relative">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative space-y-4">
        {[
          { batch: '01', date: 'Oct 12', qty: 500, status: 'Received', color: 'text-green-500', progress: 100 },
          { batch: '02', date: 'Oct 28', qty: 500, status: 'In Transit', color: 'text-[#4b8bff]', progress: 65 },
          { batch: '03', date: 'Nov 15', qty: 1000, status: 'Scheduled', color: 'text-gray-500', progress: 0 }
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 text-[10px] font-bold">
                  B{item.batch}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{item.date}</div>
                  <div className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">{item.qty} units</div>
                </div>
              </div>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest", item.color)}>
                {item.status}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                className={cn("h-full rounded-full", item.color.replace('text-', 'bg-'))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const PORevisionMockup = () => (
  <div className="w-full h-full flex flex-col bg-[#0d0d14]">
    <CardHeader title="Version Control" subtitle="Complete Amendment & Revision Chain" />
    <div className="flex-1 p-6 flex flex-col">
      <div className="space-y-3 flex-1">
        {[
          { v: '03', label: 'Current Version', desc: 'Price amendment accepted', active: true },
          { v: '02', label: 'Revision', desc: 'Quantity adjustment', active: false },
          { v: '01', label: 'Original', desc: 'Initial PO issuance', active: false }
        ].map((rev, i) => (
          <div 
            key={i} 
            className={cn(
              "p-4 rounded-2xl border transition-all duration-300",
              rev.active 
                ? "bg-[#4b8bff]/10 border-[#4b8bff]/30" 
                : "bg-white/[0.01] border-white/5 opacity-50 hover:opacity-80"
            )}
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold",
                  rev.active ? "bg-[#4b8bff] text-white" : "bg-white/10 text-gray-400"
                )}>
                  v{rev.v}
                </div>
                <span className="text-[11px] font-bold text-white">{rev.label}</span>
              </div>
              {rev.active && <div className="w-2 h-2 rounded-full bg-[#4b8bff] animate-pulse" />}
            </div>
            <div className="text-[10px] text-gray-500 ml-7">{rev.desc}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <div className="flex-1 py-3 bg-[#4b8bff]/20 border border-[#4b8bff]/30 text-[#4b8bff] text-[10px] font-bold text-center rounded-xl cursor-pointer hover:bg-[#4b8bff]/30 transition-colors uppercase tracking-widest">
          Compare Versions
        </div>
      </div>
    </div>
  </div>
);

export const BulkPOMockup = () => (
  <div className="w-full h-full flex flex-col bg-[#0d0d14]">
    <CardHeader title="Bulk Processing" subtitle="High-volume PO Generation Engine" />
    <div className="flex-1 p-8 flex flex-col items-center justify-center">
      <div className="grid grid-cols-4 gap-3 mb-8 w-full">
        {[...Array(12)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: (i % 4) * 0.1 + Math.floor(i/4) * 0.1 }}
            className="aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group cursor-default hover:border-[#4b8bff]/50 transition-all"
          >
            <FileText size={16} className="text-white/20 group-hover:text-[#4b8bff] transition-colors" />
          </motion.div>
        ))}
      </div>
      <div className="space-y-4 w-full">
        <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          <span>Batch Processing</span>
          <span>12 of 12</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-green-500"
          />
        </div>
        <div className="flex gap-2 justify-center">
          <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[9px] font-bold rounded-full">
            Ready to Issue
          </div>
        </div>
      </div>
    </div>
  </div>
);

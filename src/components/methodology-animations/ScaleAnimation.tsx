"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  X, 
  ChevronDown, 
  Check, 
  ArrowLeft,
  ChevronRight,
  Info,
  Scale,
  Upload,
  Zap,
  LayoutGrid,
  FileText,
  Clock
} from 'lucide-react';
import { cn } from "@/lib/utils";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

export default function ScaleAnimation() {
  const [step, setStep] = useState(0); // 0: Normal Scale, 1: Bulk Import Modal, 2: Scaling Up, 3: High Scale Success
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isClicking, setIsClicking] = useState(false);
  const [itemCount, setItemCount] = useState(10);
  const [vendorCount, setVendorCount] = useState(5);
  const [setupTime, setSetupTime] = useState("2 hours");
  const [importProgress, setImportProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Helper to get relative coordinates for the cursor
  const getDashboardRelativePos = (xPercent: number, yPercent: number) => {
    return { x: xPercent, y: yPercent };
  };

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Initial state
    tl.set({}, { onComplete: () => {
      setStep(0);
      setItemCount(10);
      setVendorCount(5);
      setSetupTime("2 hours");
      setImportProgress(0);
      setCursorPos({ x: 50, y: 50 });
    }});

    tl.to({}, { duration: 1.5 });

    // 1. Move to Bulk Import Button
    tl.to(cursorPos, {
      x: 35,
      y: 78,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: function() {
        setCursorPos({ x: this.targets()[0].x, y: this.targets()[0].y });
      }
    });

    // 2. Click Bulk Import
    tl.set({}, { onComplete: () => setIsClicking(true) });
    tl.to({}, { duration: 0.15 });
    tl.set({}, { onComplete: () => {
      setIsClicking(false);
      setStep(1);
    }});
    tl.to({}, { duration: 1 });

    // 3. Move to "Select File" and simulate upload
    tl.to(cursorPos, {
      x: 50,
      y: 55,
      duration: 0.8,
      ease: "power2.inOut",
      onUpdate: function() {
        setCursorPos({ x: this.targets()[0].x, y: this.targets()[0].y });
      }
    });
    
    tl.set({}, { onComplete: () => setIsClicking(true) });
    tl.to({}, { duration: 0.15 });
    tl.set({}, { onComplete: () => {
      setIsClicking(false);
      setStep(2);
    }});

    // 4. Progress bar animation
    tl.to({}, {
      duration: 2,
      onUpdate: function() {
        setImportProgress(Math.floor(this.progress() * 100));
      }
    });

    tl.to({}, { duration: 0.5 });

    // 5. Scale up effect
    tl.set({}, { onComplete: () => {
      setStep(3);
      // Roll up numbers
      gsap.to({ val: 10 }, {
        val: 1000,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: function() { setItemCount(Math.floor(this.targets()[0].val)); }
      });
      gsap.to({ val: 5 }, {
        val: 124,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: function() { setVendorCount(Math.floor(this.targets()[0].val)); }
      });
      setSetupTime("48 mins");
    }});

    tl.to({}, { duration: 4 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      
      {/* Background with same texture and gradients as Capability 01 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ChatGPT Image May 15, 2026, 12_40_41 PM.png"
          alt="Background Texture"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/80 to-indigo-50/90" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.08),transparent_50%)]" />
      </div>

      {/* Animated Cursor */}
      <motion.div
        className="absolute z-[100] pointer-events-none"
        animate={{
          left: `${cursorPos.x}%`,
          top: `${cursorPos.y}%`,
        }}
        transition={{ duration: 0, ease: "linear" }}
      >
        <div className="relative">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className={cn("drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform", isClicking && "scale-90")}
          >
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill="white"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {isClicking && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              className="absolute top-0 left-0 w-6 h-6 bg-blue-500/40 rounded-full -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
      </motion.div>

      {/* Main Dashboard Window - Fixed 500px */}
      <div ref={dashboardRef} className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200/50 overflow-hidden flex flex-col h-[500px] z-10 backdrop-blur-sm">
        {/* Browser Top Bar - 28px */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border-b border-slate-200 h-[28px] flex-shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 max-w-md mx-4">
            <div className="h-4 bg-white rounded border border-slate-200 flex items-center px-2 gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
              <div className="text-[7px] text-slate-400 truncate font-mono">factwise.io/rfq/create</div>
            </div>
          </div>
          <div className="w-16" />
        </div>

        <div className="flex-1 flex relative overflow-hidden min-h-0">
          {/* Sidebar - 40px */}
          <div className="w-10 bg-white border-r border-slate-100 flex flex-col items-center py-2 gap-2 flex-shrink-0">
            <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
              <Scale className="w-3 h-3" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-6 h-6 flex items-center justify-center text-slate-300 transition-colors hover:text-blue-500"><LayoutGrid className="w-3 h-3" /></div>
              <div className="w-6 h-6 flex items-center justify-center text-slate-300"><FileText className="w-3 h-3" /></div>
              <div className="w-6 h-6 bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-500/20 flex items-center justify-center"><Plus className="w-3 h-3" /></div>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden min-w-0">
            {/* Page Header - 36px */}
            <div className="px-3 py-1.5 flex items-center justify-between bg-white border-b border-slate-100 h-[36px] flex-shrink-0">
              <div>
                <h2 className="text-[10px] font-bold text-slate-800 leading-tight">RFQ Event Creation</h2>
                <p className="text-[7px] text-slate-400 font-medium uppercase tracking-widest">Scale & Volume</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[7px] font-bold rounded-full border border-blue-100 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                  Live
                </div>
              </div>
            </div>

            {/* Dashboard Stats Cards - 60px */}
            <div className="p-2 grid grid-cols-3 gap-2 flex-shrink-0">
              {[
                { label: 'Items', value: itemCount.toLocaleString(), icon: <LayoutGrid className="w-3 h-3" />, color: 'blue' },
                { label: 'Vendors', value: vendorCount, icon: <Scale className="w-3 h-3" />, color: 'indigo' },
                { label: 'Setup Time', value: setupTime, icon: <Clock className="w-3 h-3" />, color: 'emerald' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className={cn(
                    "w-5 h-5 rounded flex items-center justify-center mb-1",
                    stat.color === 'blue' && "bg-blue-50 text-blue-600",
                    stat.color === 'indigo' && "bg-indigo-50 text-indigo-600",
                    stat.color === 'emerald' && "bg-emerald-50 text-emerald-600"
                  )}>
                    {stat.icon}
                  </div>
                  <div className="text-[13px] font-black text-slate-800 tracking-tight leading-tight">{stat.value}</div>
                  <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Main Visual Grid / Content - Flexible */}
            <div className="px-2 pb-2 flex-1 overflow-hidden flex flex-col min-h-0">
              <div className="flex-1 bg-white rounded-lg border border-slate-200/60 shadow-sm p-3 relative overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-2 flex-shrink-0">
                  <h3 className="text-[9px] font-bold text-slate-700">Line Item Visualization</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[7px] text-slate-400 font-medium">Auto-populating</span>
                    <div className="flex gap-0.5">
                      {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-blue-500/20" />)}
                    </div>
                  </div>
                </div>
                
                {/* Items List View */}
                <div className="flex-1 overflow-auto min-h-0">
                  <div className="space-y-1">
                    {Array.from({ length: Math.min(itemCount, 15) }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-2 p-1.5 bg-white rounded border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all"
                      >
                        <div className="w-5 h-5 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-[7px] font-bold text-emerald-600">#{i + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[8px] font-bold text-slate-700 truncate">
                            {['Steel Pipe', 'Copper Wire', 'Aluminum Sheet', 'Brass Fitting', 'PVC Tube', 'Steel Rod', 'Wire Mesh', 'Metal Bracket', 'Bolt Set', 'Washer Kit', 'Nut Assembly', 'Screw Pack', 'Rivet Set', 'Clamp Unit', 'Hinge Set'][i % 15]}
                          </div>
                          <div className="text-[7px] text-slate-400">SKU: ITM-{1000 + i}</div>
                        </div>
                        <div className="text-[7px] font-bold text-slate-500 whitespace-nowrap">Qty: {Math.floor(Math.random() * 500) + 50}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Automation Badge */}
                <AnimatePresence>
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-700 p-2 rounded-lg shadow-xl shadow-blue-500/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm">
                          <Zap className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="text-white text-[9px] font-bold">40% Faster Processing</div>
                          <div className="text-white/70 text-[7px]">Scale handles 1000+ items instantly</div>
                        </div>
                      </div>
                      <div className="px-2 py-0.5 bg-white text-blue-600 text-[7px] font-black rounded uppercase tracking-widest">
                        Optimized
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Feature Pill Grid - 52px */}
              <div className="mt-2 grid grid-cols-2 gap-2 flex-shrink-0">
                {[
                  { label: 'Bulk Import', icon: <Upload className="w-3 h-3" />, active: step >= 1 },
                  { label: 'Multi-Vendor RFQ', icon: <Scale className="w-3 h-3" />, active: true },
                  { label: 'Auto-Reminders', icon: <Clock className="w-3 h-3" />, active: true },
                  { label: 'BOM Support', icon: <FileText className="w-3 h-3" />, active: step === 3 }
                ].map((feature, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg border transition-all duration-500",
                      feature.active 
                        ? "bg-white border-blue-200 shadow-sm" 
                        : "bg-slate-50/50 border-slate-100 opacity-50"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded flex items-center justify-center transition-colors",
                      feature.active ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-300"
                    )}>
                      {feature.icon}
                    </div>
                    <span className={cn(
                      "text-[8px] font-bold transition-colors",
                      feature.active ? "text-slate-700" : "text-slate-400"
                    )}>{feature.label}</span>
                    {feature.active && (
                      <div className="ml-auto w-1 h-1 rounded-full bg-blue-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Overlay for Bulk Import */}
            <AnimatePresence>
              {(step === 1 || step === 2) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-40 flex items-center justify-center p-4"
                >
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-white to-blue-50/20">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/10">
                          <Upload className="w-3 h-3 text-white" />
                        </div>
                        <h3 className="text-[10px] font-bold text-slate-800">Bulk Import Line Items</h3>
                      </div>
                      <X className="w-3 h-3 text-slate-400" />
                    </div>

                    <div className="p-4">
                      {step === 1 ? (
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 flex items-center justify-center mb-3 transition-colors group-hover:border-blue-400">
                            <Upload className="w-6 h-6 text-blue-500" />
                          </div>
                          <div className="text-[11px] font-bold text-slate-800 mb-1">Upload Your BOM / Spreadsheet</div>
                          <div className="text-[8px] text-slate-400 mb-4">Supports .csv, .xlsx, and complex multi-level BOMs</div>
                          
                          <div className="w-full h-9 bg-blue-600 text-white text-[9px] font-bold rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 cursor-pointer hover:bg-blue-700 transition-all">
                            Select File to Import
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Processing Volume</div>
                            <div className="text-[10px] font-black text-blue-600">{importProgress}%</div>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${importProgress}%` }}
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                            />
                          </div>
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="flex gap-0.5">
                              {[1,2,3].map(i => (
                                <motion.div 
                                  key={i}
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                  className="w-1 h-1 rounded-full bg-blue-500" 
                                />
                              ))}
                            </div>
                            <div className="text-[8px] text-slate-400 font-medium">FactWise AI is analyzing 1,000+ line items...</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner Decorative Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

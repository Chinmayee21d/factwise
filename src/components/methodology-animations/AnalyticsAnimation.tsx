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
  LineChart,
  PieChart,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Target,
  ArrowUpRight
} from 'lucide-react';
import { cn } from "@/lib/utils";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

export default function AnalyticsAnimation() {
  const [step, setStep] = useState(0); // 0: Dashboard, 1: Deep Dive, 2: ChatWise Interaction
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isClicking, setIsClicking] = useState(false);
  const [dataPoints, setDataPoints] = useState([30, 45, 60, 40, 75, 55, 90]);
  const [activeMetric, setActiveMetric] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { label: 'Cost Savings', value: '$2.4M', trend: '+18%', color: 'emerald' },
    { label: 'Vendor Score', value: '94/100', trend: '+12%', color: 'blue' },
    { label: 'Cycle Time', value: '3.2 Days', trend: '-24%', color: 'indigo' },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Initial state
    tl.set({}, { onComplete: () => {
      setStep(0);
      setActiveMetric(0);
      setCursorPos({ x: 50, y: 50 });
    }});

    tl.to({}, { duration: 1.5 });

    // 1. Move to "Cost Savings" Card
    tl.to(cursorPos, {
      x: 35,
      y: 35,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: function() { setCursorPos({ x: this.targets()[0].x, y: this.targets()[0].y }); }
    });
    
    tl.set({}, { onComplete: () => {
      setIsClicking(true);
      setActiveMetric(0);
    }});
    tl.to({}, { duration: 0.15 });
    tl.set({}, { onComplete: () => setIsClicking(false) });
    tl.to({}, { duration: 0.8 });

    // 2. Move to "Vendor Score" Card
    tl.to(cursorPos, {
      x: 50,
      y: 35,
      duration: 0.8,
      onUpdate: function() { setCursorPos({ x: this.targets()[0].x, y: this.targets()[0].y }); }
    });
    tl.set({}, { onComplete: () => {
      setIsClicking(true);
      setActiveMetric(1);
      setDataPoints([50, 40, 70, 85, 60, 95, 80]);
    }});
    tl.to({}, { duration: 0.15 });
    tl.set({}, { onComplete: () => setIsClicking(false) });
    tl.to({}, { duration: 0.8 });

    // 3. Move to ChatWise AI input
    tl.to(cursorPos, {
      x: 50,
      y: 85,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: function() { setCursorPos({ x: this.targets()[0].x, y: this.targets()[0].y }); }
    });
    tl.set({}, { onComplete: () => {
      setIsClicking(true);
      setStep(2);
    }});
    tl.to({}, { duration: 0.15 });
    tl.set({}, { onComplete: () => setIsClicking(false) });

    tl.to({}, { duration: 4 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      
      {/* Background with same texture and gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ChatGPT Image May 15, 2026, 12_40_41 PM.png"
          alt="Background Texture"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/90 via-white/80 to-blue-50/90" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]" />
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
        </div>
      </motion.div>

      {/* Main Dashboard Window - Fixed 500px */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200/50 overflow-hidden flex flex-col h-[500px] z-10 backdrop-blur-sm">
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
              <div className="text-[7px] text-slate-400 truncate font-mono">factwise.io/analytics/overview</div>
            </div>
          </div>
          <div className="w-16" />
        </div>

        <div className="flex-1 flex relative overflow-hidden min-h-0">
          {/* Sidebar - 40px */}
          <div className="w-10 bg-white border-r border-slate-100 flex flex-col items-center py-2 gap-2 flex-shrink-0">
            <div className="w-6 h-6 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
              <BarChart3 className="w-3 h-3" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-6 h-6 flex items-center justify-center text-slate-300"><Target className="w-3 h-3" /></div>
              <div className="w-6 h-6 flex items-center justify-center text-slate-300"><TrendingUp className="w-3 h-3" /></div>
              <div className="w-6 h-6 bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 flex items-center justify-center"><Plus className="w-3 h-3" /></div>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden min-w-0">
            {/* Page Header - 36px */}
            <div className="px-3 py-1.5 flex items-center justify-between bg-white border-b border-slate-100 h-[36px] flex-shrink-0">
              <div>
                <h2 className="text-[10px] font-bold text-slate-800 leading-tight">Intelligence Dashboard</h2>
                <p className="text-[7px] text-slate-400 font-medium uppercase tracking-widest">Real-Time Insights</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-4 h-4 rounded-full border border-white bg-slate-200" />
                  ))}
                </div>
                <div className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">Live</div>
              </div>
            </div>

            {/* Analytics Grid - Flexible */}
            <div className="p-2 space-y-2 flex-1 overflow-hidden flex flex-col min-h-0">
              <div className="grid grid-cols-3 gap-2 flex-shrink-0">
                {metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    animate={{ 
                      scale: activeMetric === i ? 1.02 : 1,
                      borderColor: activeMetric === i ? '#6366f1' : '#e2e8f0',
                      backgroundColor: activeMetric === i ? '#ffffff' : '#f8fafc'
                    }}
                    className="p-2 rounded-lg border-2 shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{m.label}</div>
                      <div className={cn(
                        "text-[7px] font-bold px-1 py-0.5 rounded",
                        m.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : m.trend.startsWith('-') ? "bg-indigo-50 text-indigo-600" : "bg-blue-50 text-blue-600"
                      )}>{m.trend}</div>
                    </div>
                    <div className="text-[13px] font-black text-slate-800 tracking-tight">{m.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Main Chart Area - Flexible */}
              <div className="flex-1 bg-white rounded-lg border border-slate-200/60 shadow-sm p-3 relative flex flex-col overflow-hidden min-h-0">
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="text-[9px] font-bold text-slate-800">
                      {activeMetric === 0 ? 'Cost Savings Trend' : activeMetric === 1 ? 'Vendor Performance' : 'Cycle Time Analysis'}
                    </div>
                    <div className="flex gap-1">
                      <div className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-[7px] font-bold rounded">Weekly</div>
                      <div className="px-1.5 py-0.5 bg-slate-50 text-slate-400 text-[7px] font-bold rounded">Monthly</div>
                    </div>
                  </div>
                  <MoreVertical className="w-3 h-3 text-slate-300" />
                </div>

                {/* SVG Line + Area Chart */}
                <div className="flex-1 relative min-h-0" style={{ minHeight: 120 }}>
                  <svg
                    className="absolute inset-0 w-full h-full overflow-visible"
                    viewBox="0 0 280 120"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={activeMetric === 0 ? '#10b981' : activeMetric === 1 ? '#3b82f6' : '#6366f1'} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={activeMetric === 0 ? '#10b981' : activeMetric === 1 ? '#3b82f6' : '#6366f1'} stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[0, 30, 60, 90, 120].map((y) => (
                      <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="#e2e8f0" strokeWidth="0.5" />
                    ))}

                    {/* Y-axis labels */}
                    {[{ y: 4, label: '100' }, { y: 34, label: '75' }, { y: 64, label: '50' }, { y: 94, label: '25' }, { y: 118, label: '0' }].map(({ y, label }) => (
                      <text key={label} x="0" y={y} fontSize="6" fill="#94a3b8" fontWeight="600">{label}</text>
                    ))}

                    {/* Area fill */}
                    <motion.path
                      key={`fill-${activeMetric}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      d={(() => {
                        const pts = dataPoints;
                        const w = 280, h = 120, pad = 18;
                        const xs = pts.map((_, i) => pad + (i / (pts.length - 1)) * (w - pad * 2));
                        const ys = pts.map(v => h - (v / 100) * (h - 10) - 4);
                        const line = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
                        return `${line} L${xs[xs.length-1].toFixed(1)},${h} L${xs[0].toFixed(1)},${h} Z`;
                      })()}
                      fill="url(#chartFill)"
                    />

                    {/* Line */}
                    <motion.path
                      key={`line-${activeMetric}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      d={(() => {
                        const pts = dataPoints;
                        const w = 280, h = 120, pad = 18;
                        const xs = pts.map((_, i) => pad + (i / (pts.length - 1)) * (w - pad * 2));
                        const ys = pts.map(v => h - (v / 100) * (h - 10) - 4);
                        return xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
                      })()}
                      fill="none"
                      stroke={activeMetric === 0 ? '#10b981' : activeMetric === 1 ? '#3b82f6' : '#6366f1'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {dataPoints.map((v, i) => {
                      const w = 280, h = 120, pad = 18;
                      const x = pad + (i / (dataPoints.length - 1)) * (w - pad * 2);
                      const y = h - (v / 100) * (h - 10) - 4;
                      const color = activeMetric === 0 ? '#10b981' : activeMetric === 1 ? '#3b82f6' : '#6366f1';
                      return (
                        <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 + i * 0.06 }}>
                          <circle cx={x} cy={y} r="3.5" fill="white" stroke={color} strokeWidth="2" />
                          <text x={x} y={y - 7} textAnchor="middle" fontSize="6" fill="#64748b" fontWeight="700">{v}</text>
                        </motion.g>
                      );
                    })}

                    {/* X-axis labels */}
                    {dataPoints.map((_, i) => {
                      const w = 280, pad = 18;
                      const x = pad + (i / (dataPoints.length - 1)) * (w - pad * 2);
                      return (
                        <text key={i} x={x} y={118} textAnchor="middle" fontSize="6" fill="#94a3b8" fontWeight="600">W{i + 1}</text>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* ChatWise AI Bottom Bar - 48px */}
              <div className="relative flex-shrink-0">
                <AnimatePresence>
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full mb-2 right-0 left-0 p-2 bg-slate-900 rounded-lg shadow-2xl z-50 border border-slate-800"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded bg-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="text-indigo-400 text-[7px] font-black uppercase tracking-widest mb-0.5">ChatWise Intelligence</div>
                          <div className="text-white text-[8px] leading-relaxed">
                            Based on historical pricing, I recommend awarding <span className="text-indigo-400 font-bold">Vendor B</span>. Their delivery score is 15% higher than average.
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-white rounded-lg border border-indigo-100 shadow-sm p-2 flex items-center gap-2 group transition-all hover:border-indigo-300">
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                    <MessageSquare className="w-3 h-3" />
                  </div>
                  <div className="flex-1 text-slate-400 text-[8px] font-medium">Ask ChatWise: "Which vendor should I award for this RFQ?"</div>
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                    <div className="w-1 h-1 rounded-full bg-indigo-500/50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

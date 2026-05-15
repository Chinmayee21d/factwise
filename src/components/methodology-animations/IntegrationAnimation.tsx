"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Plus, 
  X, 
  ChevronRight, 
  Info,
  Globe,
  Database,
  Link2,
  Settings2,
  Cpu,
  RefreshCw,
  Server,
  Code2,
  CheckCircle2
} from 'lucide-react';
import { cn } from "@/lib/utils";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

export default function IntegrationAnimation() {
  const [step, setStep] = useState(0); // 0: System Map, 1: Connecting, 2: Connected Success
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isClicking, setIsClicking] = useState(false);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const systems = [
    { name: 'SAP ERP', icon: <Database className="w-5 h-5" />, color: 'blue' },
    { name: 'Oracle', icon: <Server className="w-5 h-5" />, color: 'indigo' },
    { name: 'Distributors', icon: <Globe className="w-5 h-5" />, color: 'purple' },
    { name: 'Legacy Systems', icon: <Cpu className="w-5 h-5" />, color: 'slate' },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Initial state
    tl.set({}, { onComplete: () => {
      setStep(0);
      setActiveNodes([]);
      setCursorPos({ x: 50, y: 50 });
    }});

    tl.to({}, { duration: 1.5 });

    // 1. Move to "Integrate" button
    tl.to(cursorPos, {
      x: 80,
      y: 20,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: function() { setCursorPos({ x: this.targets()[0].x, y: this.targets()[0].y }); }
    });

    // 2. Click to start integration
    tl.set({}, { onComplete: () => {
      setIsClicking(true);
      setStep(1);
    }});
    tl.to({}, { duration: 0.15 });
    tl.set({}, { onComplete: () => setIsClicking(false) });
    
    // 3. Sequential node activation
    systems.forEach((_, i) => {
      tl.to({}, { duration: 0.8 });
      tl.set({}, { onComplete: () => {
        setActiveNodes(prev => [...prev, i]);
        setIsClicking(true);
      }});
      tl.to({}, { duration: 0.1 });
      tl.set({}, { onComplete: () => setIsClicking(false) });
    });

    // 4. Final Success
    tl.to({}, { duration: 1 });
    tl.set({}, { onComplete: () => setStep(2) });

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
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/90 via-white/80 to-blue-50/90" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-violet-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
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
              <div className="text-[7px] text-slate-400 truncate font-mono">factwise.io/integrations/hub</div>
            </div>
          </div>
          <div className="w-16" />
        </div>

        <div className="flex-1 flex relative overflow-hidden min-h-0">
          {/* Sidebar - 40px */}
          <div className="w-10 bg-white border-r border-slate-100 flex flex-col items-center py-2 gap-2 flex-shrink-0">
            <div className="w-6 h-6 bg-violet-50 rounded-lg flex items-center justify-center text-violet-600 shadow-sm border border-violet-100">
              <Zap className="w-3 h-3" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-6 h-6 flex items-center justify-center text-slate-300"><Link2 className="w-3 h-3" /></div>
              <div className="w-6 h-6 flex items-center justify-center text-slate-300"><Settings2 className="w-3 h-3" /></div>
              <div className="w-6 h-6 bg-violet-500 text-white rounded-lg shadow-lg shadow-violet-500/20 flex items-center justify-center"><Plus className="w-3 h-3" /></div>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden min-w-0">
            {/* Page Header - 36px */}
            <div className="px-3 py-1.5 flex items-center justify-between bg-white border-b border-slate-100 h-[36px] flex-shrink-0">
              <div>
                <h2 className="text-[10px] font-bold text-slate-800 leading-tight">Integration Hub</h2>
                <p className="text-[7px] text-slate-400 font-medium uppercase tracking-widest">Open API Ecosystem</p>
              </div>
              <button className="px-2.5 py-1 bg-violet-600 text-white text-[7px] font-black rounded-lg shadow-lg shadow-violet-500/20 uppercase tracking-widest flex items-center gap-1">
                <Plus className="w-2.5 h-2.5" /> New
              </button>
            </div>

            {/* Integration Canvas - Flexible */}
            <div className="p-2 flex-1 overflow-hidden relative min-h-0">
              <div className="bg-white rounded-lg border border-slate-200/60 shadow-sm h-full relative flex items-center justify-center overflow-hidden">
                {/* Connection Lines Background */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Central FactWise Node */}
                <div className="relative z-20">
                  <motion.div
                    animate={{ 
                      scale: step >= 1 ? [1, 1.05, 1] : 1,
                      boxShadow: step >= 1 ? ['0 0 15px rgba(139,92,246,0.2)', '0 0 30px rgba(139,92,246,0.4)', '0 0 15px rgba(139,92,246,0.2)'] : '0 10px 30px rgba(0,0,0,0.05)'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white relative"
                  >
                    <div className="text-[10px] font-black tracking-tight">FactWise</div>
                    {step >= 1 && (
                      <div className="absolute -inset-3 border-2 border-violet-500/20 rounded-[28px] animate-ping" />
                    )}
                  </motion.div>
                </div>

                {/* Satellite System Nodes */}
                <div className="absolute inset-0 z-10">
                  {systems.map((sys, i) => {
                    const angle = (i * 90) * (Math.PI / 180);
                    const radius = 100;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <div 
                        key={i} 
                        className="absolute top-1/2 left-1/2"
                        style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                      >
                        <motion.div
                          animate={{ 
                            opacity: activeNodes.includes(i) ? 1 : 0.3,
                            scale: activeNodes.includes(i) ? 1 : 0.8,
                            borderColor: activeNodes.includes(i) ? '#8b5cf6' : '#e2e8f0'
                          }}
                          className="w-12 h-12 bg-white border-2 rounded-xl flex flex-col items-center justify-center gap-0.5 shadow-sm transition-all"
                        >
                          <div className={cn(
                            "text-slate-400 transition-colors",
                            activeNodes.includes(i) && "text-violet-600"
                          )}>
                            {sys.icon}
                          </div>
                          <span className="text-[6px] font-black uppercase tracking-tighter text-slate-500 text-center px-0.5 leading-none">{sys.name}</span>
                        </motion.div>
                        
                        {/* Connecting Line */}
                        {activeNodes.includes(i) && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: radius - 32 }}
                            className="absolute top-1/2 h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent origin-left"
                            style={{ 
                              left: '50%', 
                              transform: `rotate(${angle + Math.PI}rad) translateY(-50%)`,
                              width: radius - 32
                            }}
                          >
                            <motion.div
                              animate={{ left: ['0%', '100%'] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-violet-500 rounded-full shadow-[0_0_8px_#8b5cf6]"
                            />
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Success Banner */}
                <AnimatePresence>
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute bottom-4 px-3 py-2 bg-white rounded-xl shadow-2xl border border-violet-100 flex items-center gap-2 z-30"
                    >
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-slate-800 text-[9px] font-bold">Live in 2–4 Weeks</div>
                        <div className="text-slate-400 text-[7px] font-medium">Enterprise ecosystem fully synchronized</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Tech Pills - 48px */}
            <div className="px-2 pb-2 grid grid-cols-3 gap-2 flex-shrink-0">
              {[
                { label: 'REST API', icon: <Code2 className="w-3 h-3" /> },
                { label: 'Webhooks', icon: <RefreshCw className="w-3 h-3" /> },
                { label: 'Cloud-Native', icon: <Globe className="w-3 h-3" /> }
              ].map((pill, i) => (
                <div key={i} className="px-2 py-1.5 bg-white rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105">
                  <div className="text-violet-500">{pill.icon}</div>
                  <span className="text-[7px] font-bold text-slate-700 uppercase tracking-tight truncate">{pill.label}</span>
                </div>
              ))}
            </div>

            {/* Corner Decorative Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

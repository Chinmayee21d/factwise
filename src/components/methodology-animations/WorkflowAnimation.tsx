"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Plus, 
  X, 
  ChevronRight, 
  Info,
  ShieldCheck,
  UserCheck,
  Briefcase,
  FileText,
  MousePointer2,
  Lock,
  ArrowRight,
  Zap
} from 'lucide-react';
import { cn } from "@/lib/utils";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

export default function WorkflowAnimation() {
  const [step, setStep] = useState(0); // 0: Dashboard, 1: Workflow Builder, 2: Active Audit Trail
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isClicking, setIsClicking] = useState(false);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const workflowSteps = [
    { label: 'Requisition', icon: <FileText className="w-4 h-4" />, color: 'blue' },
    { label: 'Manager Approval', icon: <UserCheck className="w-4 h-4" />, color: 'amber' },
    { label: 'Finance Review', icon: <ShieldCheck className="w-4 h-4" />, color: 'purple' },
    { label: 'Purchase Order', icon: <CheckCircle2 className="w-4 h-4" />, color: 'emerald' },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Initial state
    tl.set({}, { onComplete: () => {
      setStep(0);
      setActiveWorkflowStep(0);
      setCursorPos({ x: 50, y: 50 });
    }});

    tl.to({}, { duration: 1.5 });

    // 1. Move to "Configure Approvals" button
    tl.to(cursorPos, {
      x: 82,
      y: 20,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: function() {
        setCursorPos({ x: this.targets()[0].x, y: this.targets()[0].y });
      }
    });

    // 2. Click to open builder
    tl.set({}, { onComplete: () => setIsClicking(true) });
    tl.to({}, { duration: 0.15 });
    tl.set({}, { onComplete: () => {
      setIsClicking(false);
      setStep(1);
    }});
    tl.to({}, { duration: 0.8 });

    // 3. Simulate building workflow (sequential activation)
    workflowSteps.forEach((_, i) => {
      tl.to({}, { duration: 0.6 });
      tl.set({}, { onComplete: () => {
        setActiveWorkflowStep(i + 1);
        setIsClicking(true);
      }});
      tl.to({}, { duration: 0.1 });
      tl.set({}, { onComplete: () => setIsClicking(false) });
    });

    tl.to({}, { duration: 1 });

    // 4. Activate Workflow
    tl.to(cursorPos, {
      x: 50,
      y: 85,
      duration: 1,
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
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/90 via-white/80 to-slate-50/90" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.08),transparent_50%)]" />
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
              <div className="text-[7px] text-slate-400 truncate font-mono">factwise.io/workflow/builder</div>
            </div>
          </div>
          <div className="w-16" />
        </div>

        <div className="flex-1 flex relative overflow-hidden min-h-0">
          {/* Sidebar - 40px */}
          <div className="w-10 bg-white border-r border-slate-100 flex flex-col items-center py-2 gap-2 flex-shrink-0">
            <div className="w-6 h-6 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 shadow-sm border border-amber-100">
              <CheckCircle2 className="w-3 h-3" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-6 h-6 flex items-center justify-center text-slate-300"><Briefcase className="w-3 h-3" /></div>
              <div className="w-6 h-6 flex items-center justify-center text-slate-300"><Lock className="w-3 h-3" /></div>
              <div className="w-6 h-6 bg-amber-500 text-white rounded-lg shadow-lg shadow-amber-500/20 flex items-center justify-center"><Plus className="w-3 h-3" /></div>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden min-w-0">
            {/* Page Header - 36px */}
            <div className="px-3 py-1.5 flex items-center justify-between bg-white border-b border-slate-100 h-[36px] flex-shrink-0">
              <div>
                <h2 className="text-[10px] font-bold text-slate-800 leading-tight">Workflow Configurations</h2>
                <p className="text-[7px] text-slate-400 font-medium uppercase tracking-widest">No-Code Approval Engine</p>
              </div>
              <button className="px-2.5 py-1 bg-amber-500 text-white text-[7px] font-black rounded-lg shadow-lg shadow-amber-500/20 uppercase tracking-widest">
                Configure Approvals
              </button>
            </div>

            {/* Workflow Canvas Area - Flexible */}
            <div className="p-2 flex-1 overflow-hidden min-h-0">
              <div className="bg-white rounded-lg border border-slate-200/60 shadow-sm p-3 h-full relative overflow-hidden flex flex-col">
                {/* Canvas Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                  backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }} />

                <div className="relative flex flex-col items-center gap-2 flex-1 justify-center">
                  <AnimatePresence>
                    {step >= 1 && (
                      <div className="flex flex-col items-center gap-2 w-full max-w-xs">
                        {workflowSteps.map((ws, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: activeWorkflowStep >= i + 1 ? 1 : 0.1,
                              y: activeWorkflowStep >= i + 1 ? 0 : 20,
                              scale: activeWorkflowStep >= i + 1 ? 1 : 0.95
                            }}
                            className={cn(
                              "w-full p-2 rounded-lg border-2 flex items-center gap-2 transition-all duration-300",
                              activeWorkflowStep >= i + 1 
                                ? "bg-white border-amber-200 shadow-md" 
                                : "bg-slate-50 border-slate-100"
                            )}
                          >
                            <div className={cn(
                              "w-6 h-6 rounded flex items-center justify-center shadow-sm",
                              ws.color === 'blue' && "bg-blue-50 text-blue-600",
                              ws.color === 'amber' && "bg-amber-50 text-amber-600",
                              ws.color === 'purple' && "bg-purple-50 text-purple-600",
                              ws.color === 'emerald' && "bg-emerald-50 text-emerald-600"
                            )}>
                              {ws.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[9px] font-bold text-slate-800 uppercase tracking-tight truncate">{ws.label}</div>
                              <div className="text-[7px] text-slate-400 font-medium">Auto-Condition Applied</div>
                            </div>
                            {activeWorkflowStep >= i + 1 && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"
                              >
                                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>

                  {step === 0 && (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center mb-2">
                        <Plus className="w-6 h-6 text-slate-300" />
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">Add Workflow Step</div>
                    </div>
                  )}
                </div>

                {/* Audit Trail Badge */}
                <AnimatePresence>
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute bottom-3 right-3 left-3 p-2 bg-slate-900 rounded-lg shadow-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-500/20 rounded flex items-center justify-center">
                          <ShieldCheck className="w-3 h-3 text-green-400" />
                        </div>
                        <div>
                          <div className="text-white text-[9px] font-bold">100% Audit Readiness</div>
                          <div className="text-slate-400 text-[7px]">Immutable logs for every decision</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-green-400 text-[7px] font-black uppercase tracking-widest">Secure</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Info Pills - 48px */}
            <div className="px-2 pb-2 grid grid-cols-3 gap-2 flex-shrink-0">
              {[
                { label: 'No Code Required', icon: <Zap className="w-3 h-3" /> },
                { label: 'Conditional Logic', icon: <MousePointer2 className="w-3 h-3" /> },
                { label: 'Multi-Level BOM', icon: <FileText className="w-3 h-3" /> }
              ].map((pill, i) => (
                <div key={i} className="px-2 py-1.5 bg-white rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-1.5">
                  <div className="text-amber-500">{pill.icon}</div>
                  <span className="text-[7px] font-bold text-slate-700 uppercase tracking-tight truncate">{pill.label}</span>
                </div>
              ))}
            </div>

            {/* Corner Decorative Glows */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

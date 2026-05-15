"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, BarChart3, Zap, Scale, Calculator } from 'lucide-react';
import { cn } from "@/lib/utils";
import ScrollReveal from "./ui/ScrollReveal";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

// Import animations
import CustomFormulaAnimation from './methodology-animations/CustomFormulaAnimation';
import ScaleAnimation from './methodology-animations/ScaleAnimation';
import WorkflowAnimation from './methodology-animations/WorkflowAnimation';
import AnalyticsAnimation from './methodology-animations/AnalyticsAnimation';
import IntegrationAnimation from './methodology-animations/IntegrationAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const pages = [
  {
    id: 1,
    title: "Custom Formula Intelligence",
    description: "Unit price is never the real cost. Duties, freight, insurance, packaging — the cheapest quote on paper is rarely the cheapest purchase in reality. Define your own formula once. FactWise applies it automatically across every event, every vendor, every quote — normalized to your currency, your costs, your rules.",
    details: [
      "Build Once. Calculate Forever.",
      "Buy on true cost. Not just the number on the quote.",
      "Automated normalization across all currencies."
    ],
    icon: <Calculator className="w-6 h-6 text-blue-500" />,
    animation: CustomFormulaAnimation,
    color: '#4A6FFF'
  },
  {
    id: 2,
    title: "More Vendors. More Items. More Scale.",
    description: "Whether you're sourcing 10 items or 1,000 — across direct materials, indirect procurement, or complex multi-level BOMs — FactWise handles it all without breaking a sweat. Automation handles repeatable orders and urgent POs so your team focuses on decisions, not data entry.",
    details: [
      "40% faster. At any scale.",
      "Alternate items per line and bulk imports.",
      "Multi-requisition combining for better pricing."
    ],
    icon: <Scale className="w-6 h-6 text-blue-500" />,
    animation: ScaleAnimation,
    color: '#00b884'
  },
  {
    id: 3,
    title: "Configure Approvals in Minutes.",
    description: "Changing an approval workflow shouldn't require a developer or weeks of waiting. FactWise puts that power directly in the hands of your procurement manager — no code, no IT ticket, no extra cost. Set conditions by amount, vendor type, or item tags independently.",
    details: [
      "Drag. Drop. Done. No developer.",
      "Separate approval chains for REQs, POs, and quotes.",
      "Complete audit trail for every decision, every time."
    ],
    icon: <CheckCircle2 className="w-6 h-6 text-blue-500" />,
    animation: WorkflowAnimation,
    color: '#f59e0b'
  },
  {
    id: 4,
    title: "Data That Tells You What to Do Next.",
    description: "Analytics isn't a dashboard you check once a month. It's what tells you which vendor to award — and at what price. FactWise puts the right data in front of you at every decision point, giving every stakeholder a live pulse on operations.",
    details: [
      "No analyst required.",
      "Real-time bid comparisons and historical pricing.",
      "ChatWise: Ask your data questions in plain language."
    ],
    icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
    animation: AnalyticsAnimation,
    color: '#6366f1'
  },
  {
    id: 5,
    title: "Integrate Everything. Customize Anything.",
    description: "FactWise connects via open APIs to your ERP, distributors, and vendor systems — no middleware, no extra cost. POs, quotes, and records flow back automatically. Every field, formula, and workflow is fully configurable by your team, not IT.",
    details: [
      "Live in 2–4 weeks. Built to last forever.",
      "No IT ticket or developer required for setup.",
      "Tailor the system to match exactly how you operate."
    ],
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    animation: IntegrationAnimation,
    color: '#8b5cf6'
  }
];

export default function MethodologySection() {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const currentPageRef = useRef(1); // Track actual current page

  useGSAP(() => {
    if (!containerRef.current) return;

    console.log('🚀 ScrollTrigger Setup Starting...');
    let lastPage = 1;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${(pages.length + 1) * 100}%`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const direction = self.direction; // 1 = down, -1 = up
        
        // Use hysteresis - different thresholds for up vs down scrolling
        let page;
        
        if (direction === 1) {
          // Scrolling DOWN - use standard thresholds
          if (progress < 0.18) {
            page = 1;
          } else if (progress < 0.38) {
            page = 2;
          } else if (progress < 0.58) {
            page = 3;
          } else if (progress < 0.78) {
            page = 4;
          } else {
            page = 5;
          }
        } else {
          // Scrolling UP - use lower thresholds (easier to go back)
          if (progress < 0.12) {
            page = 1;
          } else if (progress < 0.32) {
            page = 2;
          } else if (progress < 0.52) {
            page = 3;
          } else if (progress < 0.72) {
            page = 4;
          } else {
            page = 5;
          }
        }
        
        console.log('📊 Scroll Update:', {
          progress: progress.toFixed(3),
          direction: direction === 1 ? '⬇️ DOWN' : '⬆️ UP',
          calculatedPage: page,
          lastPage: lastPage,
          currentPage: currentPage,
          scrollY: window.scrollY.toFixed(0),
          triggerStart: self.start.toFixed(0),
          triggerEnd: self.end.toFixed(0)
        });
        
        if (page !== lastPage) {
          console.log('🔄 PAGE CHANGE:', {
            from: lastPage,
            to: page,
            progress: progress.toFixed(3),
            direction: direction === 1 ? '⬇️ DOWN' : '⬆️ UP'
          });
          lastPage = page;
          currentPageRef.current = page;
          setCurrentPage(page);
        }
      },
      onSnapComplete: (self) => {
        console.log('✅ Snap Complete:', {
          progress: self.progress.toFixed(3),
          currentPage: currentPage,
          scrollY: window.scrollY.toFixed(0)
        });
      },
      snap: {
        snapTo: [0, 0.22, 0.44, 0.66, 0.88],
        duration: { min: 0.2, max: 0.5 },
        delay: 0.15,
        ease: "power1.inOut",
        directional: true // Respect scroll direction
      },
      fastScrollEnd: true,
      preventOverlaps: true,
      anticipatePin: 1
    });

    console.log('✅ ScrollTrigger Created:', {
      start: scrollTriggerRef.current.start,
      end: scrollTriggerRef.current.end,
      snapPoints: [0.05, 0.25, 0.45, 0.65, 0.85],
      downThresholds: [0.18, 0.38, 0.58, 0.78],
      upThresholds: [0.12, 0.32, 0.52, 0.72]
    });

    return () => {
      console.log('🗑️ ScrollTrigger Cleanup');
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, { scope: containerRef, dependencies: [pages.length] });

  const handleDotClick = (index: number) => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    
    // Snap points aligned with thresholds: 0, 0.22, 0.44, 0.66, 0.88
    const snapPoints = [0, 0.22, 0.44, 0.66, 0.88];
    const targetProgress = snapPoints[index];
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    
    console.log('🎯 Dot Click:', {
      index,
      targetProgress,
      targetScroll: targetScroll.toFixed(0),
      currentScroll: window.scrollY.toFixed(0),
      currentPage
    });
    
    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 1,
      ease: "power2.inOut",
      onStart: () => console.log('▶️ GSAP scroll animation started'),
      onComplete: () => console.log('✅ GSAP scroll animation completed')
    });
  };

  return (
    <section className="bg-white" id="how-it-works">
      {/* 1. STATIC HEADER */}
      <div className="max-w-7xl mx-auto px-8 lg:px-24 pt-20 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center flex flex-col items-center mb-6"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#4A6FFF] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            HOW WE DO IT
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1]">
            Stop Adapting to Your Software.<br />
            <span className="text-[#3666ff]"> It Should Adapt to You.</span>
          </h2>
          {/* <p className="text-base md:text-lg text-slate-500 max-w-2xl font-medium">
            Four capabilities that separate FactWise from every other platform on the market.
          </p> */}
        </motion.div>
      </div>

      {/* 2. SPLIT SCROLL ADVENTURE */}
      <div ref={containerRef} className="relative overflow-hidden h-screen bg-white">
        {pages.map((page, i) => {
          const idx = i + 1;
          const isActive = currentPage === idx;
          const isBefore = idx < currentPage;
          const isAfter = idx > currentPage;
          
          // Cards before current: positioned above (translateY(-100%))
          // Cards after current: positioned below (translateY(100%))
          // Current card: centered (translateY(0))
          const leftTrans = isActive ? 'translateY(0)' : isBefore ? 'translateY(-100%)' : 'translateY(100%)';
          const rightTrans = isActive ? 'translateY(0)' : isBefore ? 'translateY(100%)' : 'translateY(-100%)';

          const isLeftText = idx % 2 !== 0;

          return (
            <div key={idx} className="absolute inset-0">
              {/* Left Half */}
              <div
                className="absolute top-0 left-0 w-full lg:w-1/2 h-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] z-10"
                style={{ transform: leftTrans }}
              >
                {isLeftText ? (
                  <div className={cn(
                    "w-full h-full flex flex-col justify-center p-8 lg:p-24 border-r",
                    (idx === 2 || idx === 4) ? "bg-[#F8FAFF] border-slate-100" : "bg-white border-slate-50"
                  )}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={cn(
                        "p-2 rounded-lg border",
                        (idx === 2 || idx === 4) ? "bg-blue-50/60 border-blue-100" : "bg-blue-50 border-blue-100"
                      )}>
                        {page.icon}
                      </div>
                      <span className={cn(
                        "text-sm font-bold tracking-widest uppercase",
                        (idx === 2 || idx === 4) ? "text-blue-600" : "text-blue-600"
                      )}>CAPABILITY 0{idx}</span>
                    </div>
                    <h3 className={cn(
                      "text-2xl lg:text-4xl font-bold mb-6 leading-tight",
                      (idx === 2 || idx === 4) ? "text-slate-900" : "text-slate-900"
                    )}>
                      {page.title}
                    </h3>
                    <p className={cn(
                      "text-lg mb-8 leading-relaxed",
                      (idx === 2 || idx === 4) ? "text-slate-600" : "text-slate-600"
                    )}>
                      {page.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {page.details.map((detail, dIdx) => (
                        <li key={dIdx} className={cn(
                          "flex items-start gap-3 text-sm lg:text-base",
                          (idx === 2 || idx === 4) ? "text-slate-700" : "text-slate-700"
                        )}>
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="w-full h-full relative overflow-hidden">
                    {page.animation && <page.animation />}
                  </div>
                )}
              </div>

              {/* Right Half */}
              <div
                className="absolute top-0 right-0 lg:left-1/2 w-full lg:w-1/2 h-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] z-10"
                style={{ transform: rightTrans }}
              >
                {!isLeftText ? (
                  <div className={cn(
                    "w-full h-full flex flex-col justify-center p-8 lg:p-24 border-l",
                    (idx === 2 || idx === 4) ? "bg-[#F8FAFF] border-slate-100" : "bg-slate-50 border-slate-100"
                  )}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={cn(
                        "p-2 rounded-lg border",
                        (idx === 2 || idx === 4) ? "bg-blue-50/60 border-blue-100" : "bg-blue-50 border-blue-100"
                      )}>
                        {page.icon}
                      </div>
                      <span className={cn(
                        "text-sm font-bold tracking-widest uppercase",
                        (idx === 2 || idx === 4) ? "text-blue-600" : "text-blue-600"
                      )}>CAPABILITY 0{idx}</span>
                    </div>
                    <h3 className={cn(
                      "text-2xl lg:text-4xl font-bold mb-6 leading-tight",
                      (idx === 2 || idx === 4) ? "text-slate-900" : "text-slate-900"
                    )}>
                      {page.title}
                    </h3>
                    <p className={cn(
                      "text-lg mb-8 leading-relaxed",
                      (idx === 2 || idx === 4) ? "text-slate-600" : "text-slate-600"
                    )}>
                      {page.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {page.details.map((detail, dIdx) => (
                        <li key={dIdx} className={cn(
                          "flex items-start gap-3 text-sm lg:text-base",
                          (idx === 2 || idx === 4) ? "text-slate-700" : "text-slate-700"
                        )}>
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="w-full h-full relative overflow-hidden">
                    {page.animation && <page.animation />}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Progress Indicator Dots */}
        <div className="absolute bottom-12 right-12 z-30 flex flex-col gap-3">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === i + 1 ? 'bg-blue-600 scale-150' : 'bg-slate-300'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

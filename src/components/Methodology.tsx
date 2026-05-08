"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, BarChart3, Zap, Scale, Calculator } from 'lucide-react';
import Image from 'next/image';

const pages = [
  {
    id: 1,
    title: "No Code. No IT. No Waiting.",
    description: "Every other tool makes you raise a ticket, wait for a consultant, and pay extra just to change a workflow. FactWise is different. Build approval hierarchies, configure custom formulas, set up workflows, and define your own analytics — all without writing a single line of code.",
    details: [
      "Procurement managers do it themselves, in minutes.",
      "No developer required.",
      "No IT ticket. No additional cost. Ever."
    ],
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    image: '/images/nocode-workflow.png',
    color: '#4A6FFF'
  },
  {
    id: 2,
    title: "Built for Real Scale",
    description: "Managing a large BOM across dozens of vendors shouldn't take days of manual work before negotiations have even started. FactWise handles 1,000+ items across 500+ vendors in a single click.",
    details: [
      "Infinite child BOMs and alternate items per line.",
      "Multi-requisition combining for bulk pricing.",
      "Urgent POs up to 40% faster.",
      "Vendors don't need to be registered to receive RFQs."
    ],
    icon: <Scale className="w-6 h-6 text-blue-500" />,
    image: '/images/scale-ui.png',
    color: '#00b884'
  },
  {
    id: 3,
    title: "True Cost, Automatically Calculated",
    description: "Unit price is not your real cost. By the time you add customs duty, freight, insurance, packaging, and clearance — the cheapest quote on paper is often not the cheapest purchase in reality.",
    details: [
      "Define your own landed cost formula once.",
      "Automatic normalization across every currency.",
      "Genuine apples-to-apples comparisons.",
      "Buy on total cost, not just quote numbers."
    ],
    icon: <Calculator className="w-6 h-6 text-blue-500" />,
    image: '/images/cost-ui.png',
    color: '#f59e0b'
  },
  {
    id: 4,
    title: "Analytics at Every Decision Point",
    description: "Analytics isn't a dashboard you check once a month. It's what tells you whether to accept a quote right now. FactWise puts the right data in front of you at every step.",
    details: [
      "Real-time bid comparisons with landed cost breakdowns.",
      "Historical pricing across all past events.",
      "Spend aggregation across multiple entities.",
      "ChatWise: Ask data questions in plain language."
    ],
    icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
    image: '/images/analytics-ui.png',
    color: '#6366f1'
  }
];

export default function MethodologySection() {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = pages.length;
  const animTime = 1000;
  const scrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigateUp = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const navigateDown = () => {
    if (currentPage < numOfPages) setCurrentPage(p => p + 1);
  };

  const handleWheel = (e: WheelEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Check if the section is occupying the screen
    const isSectionVisible = rect.top < window.innerHeight && rect.bottom > 0;
    const isAtTop = Math.abs(rect.top) < 10; // Section is snapped to top

    if (isSectionVisible) {
      const movingDown = e.deltaY > 0;
      const movingUp = e.deltaY < 0;

      if (scrolling.current) {
        e.preventDefault();
        return;
      }

      // We lock the scroll if:
      // - We are moving down and haven't reached the last slide
      // - We are moving up and haven't reached the first slide
      const shouldLock = (movingDown && currentPage < numOfPages) || (movingUp && currentPage > 1);

      if (shouldLock) {
        // Wider threshold: if the section top is anywhere between -200px and 200px, 
        // we consider it "active" and lock it.
        const isLockedArea = rect.top < 200 && rect.bottom > window.innerHeight - 200;

        if (isLockedArea) {
          e.preventDefault();
          scrolling.current = true;
          movingDown ? navigateDown() : navigateUp();
          setTimeout(() => (scrolling.current = false), animTime);
        }
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (scrolling.current) return;
    if (e.key === 'ArrowUp') {
      scrolling.current = true;
      navigateUp();
      setTimeout(() => (scrolling.current = false), animTime);
    } else if (e.key === 'ArrowDown') {
      scrolling.current = true;
      navigateDown();
      setTimeout(() => (scrolling.current = false), animTime);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage]);

  return (
    <section className="bg-white" id="how-it-works">
      {/* 1. STATIC HEADER */}
      <div className="max-w-7xl mx-auto px-8 lg:px-24 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          <div className="section-badge mb-6">HOW WE DO IT</div>
          <h2 style={{
            fontFamily: 'var(--font-display), sans-serif',
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#1A1D2E',
            margin: 0,
            lineHeight: 1.15
          }}>
            Not Just Another Tool. <br />
            <span className="text-blue-600">A Different Way of Working.</span>
          </h2>
          <p className="mt-6 text-slate-500 text-lg max-w-2xl font-medium leading-relaxed">
            Four capabilities that separate FactWise from every other platform on the market.
          </p>
        </motion.div>
      </div>

      {/* 2. SPLIT SCROLL ADVENTURE */}
      <div ref={containerRef} className="relative overflow-hidden h-screen bg-white">
        {pages.map((page, i) => {
          const idx = i + 1;
          const isActive = currentPage === idx;
          const upOff = 'translateY(-100%)';
          const downOff = 'translateY(100%)';

          // Use the logic from the user snippet:
          // Left half moves to 0 or 100% (down)
          // Right half moves to 0 or -100% (up)
          const leftTrans = isActive ? 'translateY(0)' : downOff;
          const rightTrans = isActive ? 'translateY(0)' : upOff;

          const isLeftText = idx % 2 !== 0;

          return (
            <div key={idx} className="absolute inset-0">
              {/* Left Half */}
              <div
                className="absolute top-0 left-0 w-full lg:w-1/2 h-full transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-10"
                style={{ transform: leftTrans }}
              >
                {isLeftText ? (
                  <div className="w-full h-full bg-white flex flex-col justify-center p-8 lg:p-24 border-r border-slate-50">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                        {page.icon}
                      </div>
                      <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">CAPABILITY 0{idx}</span>
                    </div>
                    <h3 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                      {page.title}
                    </h3>
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                      {page.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {page.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-3 text-slate-700 text-sm lg:text-base">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <Image
                      src={page.image}
                      alt={page.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-slate-900/5" />
                  </div>
                )}
              </div>

              {/* Right Half */}
              <div
                className="absolute top-0 right-0 lg:left-1/2 w-full lg:w-1/2 h-full transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-10"
                style={{ transform: rightTrans }}
              >
                {!isLeftText ? (
                  <div className="w-full h-full bg-slate-50 flex flex-col justify-center p-8 lg:p-24 border-l border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                        {page.icon}
                      </div>
                      <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">CAPABILITY 0{idx}</span>
                    </div>
                    <h3 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                      {page.title}
                    </h3>
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                      {page.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {page.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-3 text-slate-700 text-sm lg:text-base">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <Image
                      src={page.image}
                      alt={page.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-slate-900/5" />
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
              onClick={() => setCurrentPage(i + 1)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === i + 1 ? 'bg-blue-600 scale-150' : 'bg-slate-300'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

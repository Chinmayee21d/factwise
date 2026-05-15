"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Rocket, Settings2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const roadmapSections = [
  {
    id: 1,
    phase: "Phase 01",
    title: "Discovery & Setup",
    timeline: "2–8 Weeks",
    description: "Launch your digital transformation with expert guidance. We handle the complexity of legacy data migration and role-based configuration.",
    icon: Rocket,
    imageUrl: "/images/quote-order-premium.png",
    color: "#3666ff",
    items: [
      "Expert onboarding initialized on Day 1",
      "Seamless legacy data migration & validation",
      "Role-based access & platform configuration"
    ]
  },
  {
    id: 2,
    phase: "Phase 02",
    title: "Operational Excellence",
    timeline: "3–6 Months",
    description: "Replace slow, manual procurement with automated workflows. Gain real-time visibility across your entire global supply chain.",
    icon: Settings2,
    imageUrl: "/images/req-po-premium.png",
    color: "#4f46e5",
    reverse: true,
    items: [
      "Full-scale autonomous procurement approvals",
      "Live real-time visibility across supply chains",
      "Advanced vendor performance tracking"
    ]
  },
  {
    id: 3,
    phase: "Phase 03",
    title: "Measurable Savings",
    timeline: "6–12 Months",
    description: "Realize significant, auditable cost reductions. Data-driven insights surface new savings opportunities and strategic value.",
    icon: TrendingUp,
    imageUrl: "/images/invoice-pay-premium.png",
    color: "#0ea5e9",
    items: [
      "Auditable ROI realization & cost savings",
      "Strategic sourcing & predictive forecasting",
      "Consolidated multi-entity reporting"
    ]
  }
];

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./ui/ScrollReveal";

export default function ImplementationRoadmap() {
  return (
    <section id="roadmap" className="relative py-12 px-4 md:px-10" style={{ scrollMarginTop: '100px' }}>
      <div className="relative overflow-hidden rounded-[24px] py-24">
        {/* Restoring legacy hero-gradient as requested */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 noise opacity-40 pointer-events-none mix-blend-overlay" />
        
        {/* Blue Glow on Right - Optimized */}
        <div 
          className="absolute -right-32 -bottom-32 w-[800px] h-[800px] rounded-full pointer-events-none opacity-50"
          style={{ 
            background: 'radial-gradient(circle, rgba(54, 102, 255, 0.25) 0%, rgba(54, 102, 255, 0.1) 30%, transparent 70%)',
          }} 
        />


        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <ScrollReveal delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <Rocket className="w-3 h-3" />
                <span>Implementation Journey</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal type="split-chars" stagger={0.02}>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1]">
                From setup to <span className="italic text-[#3666ff]">measurable savings</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal type="split-words" delay={0.3} stagger={0.01}>
              <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                A structured, high-velocity path to operational transformation — meticulously engineered for enterprise scale.
              </p>
            </ScrollReveal>
          </div>


          {/* Parallax Content Section */}
          <div className="space-y-0">
            {roadmapSections.map((section, index) => (
              <ParallaxSection key={section.id} section={section} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxSection({ section, index }: { section: typeof roadmapSections[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!ref.current || !contentRef.current || !visualRef.current) return;

    // Content parallax
    gsap.fromTo(contentRef.current, 
      { y: 50 },
      { 
        y: -50,
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    // Visual parallax and scale
    gsap.fromTo(visualRef.current,
      { y: 100, scale: 0.9, opacity: 0 },
      {
        y: -100,
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        }
      }
    );

    // Image reveal effect (ClipPath equivalent)
    gsap.fromTo(visualRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.5,
        }
      }
    );

  }, { scope: ref });

  return (
    <div 
      ref={ref} 
      className={cn(
        "min-h-[70vh] flex flex-col items-center justify-center gap-12 lg:gap-24 py-12",
        section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      {/* Content Column */}
      <div 
        ref={contentRef}
        className="flex-1 max-w-xl space-y-8"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-[#3666ff] tracking-[0.3em] uppercase">{section.phase}</span>
            <div className="h-px w-10 bg-blue-100" />
            <span className="text-[11px] font-bold text-slate-400 italic">{section.timeline}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#1A1D2E] tracking-tight">
            {section.title}
          </h3>
          <p className="text-base text-slate-500 font-medium leading-relaxed">
            {section.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {section.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 group hover:border-blue-200 transition-colors">
              <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-bold text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Visual Column */}
      <div 
        ref={visualRef}
        className="flex-1 relative aspect-[16/10] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50"
      >
        {/* Shadow Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        
        {/* Dashboard Image */}
        <img 
          src={section.imageUrl} 
          alt={section.title}
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000"
        />
        
        {/* Floating Accent */}
        <div className="absolute top-6 right-6 z-20 size-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20">
          <section.icon className="size-6 text-[#3666ff]" />
        </div>
      </div>
    </div>
  );
}


'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, ShieldCheck, Handshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    title: "Bring Sheer Delight",
    description: "Always aim to create positive impact for organizations and bring sheer delight for each user, big or small",
    icon: Sparkles,
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-50"
  },
  {
    title: "Strive for Excellence",
    description: "Constantly raise the bar for yourself and others with big picture thinking and nuanced, robust execution",
    icon: Target,
    color: "from-indigo-600 to-blue-500",
    bg: "bg-indigo-50"
  },
  {
    title: "Never Settle",
    description: "Aspire to deliver extraordinary results while always maintaining accountability and integrity",
    icon: ShieldCheck,
    color: "from-slate-800 to-slate-600",
    bg: "bg-slate-50"
  },
  {
    title: "Always Think Win-Win",
    description: "Challenge yourself to create win-win solutions for all stakeholders in all situations",
    icon: Handshake,
    color: "from-blue-700 to-indigo-600",
    bg: "bg-blue-50"
  }
];

export function ValuesCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const pin = triggerRef.current;
    if (!pin) return;

    const scrollWidth = pin.scrollWidth;
    const viewportWidth = window.innerWidth;
    const amountToScroll = scrollWidth - viewportWidth;

    gsap.to(pin, {
      x: -amountToScroll,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${amountToScroll + 500}`, // Added extra scroll room for a smoother finish
        invalidateOnRefresh: true,
      }
    });

    // Added floating effect to cards for a "hovering" feel
    const cards = pin.querySelectorAll('.value-card');
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: i % 2 === 0 ? 15 : -15, // Alternating float
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.5,
          start: "top top",
          end: () => `+=${amountToScroll}`,
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-white">
      <div className="h-screen flex flex-col justify-center">
        <div className="max-w-[1800px] mx-auto px-[clamp(24px,5vw,80px)] mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 tracking-wide uppercase">
              Our Culture
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Guided by <span className="text-blue-600">Core Values</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At FactWise, our values define how we work, how we treat each other, and how we deliver value.
            </p>
          </motion.div>
        </div>

        <div 
          ref={triggerRef}
          className="flex gap-8 px-[clamp(24px,5vw,80px)] w-max"
        >
          {VALUES.map((value, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[85vw] md:w-[450px] value-card"
            >
              <div className={`h-full p-10 rounded-[2.5rem] ${value.bg} border border-slate-100 flex flex-col justify-between group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <value.icon size={120} strokeWidth={1} />
                </div>
                
                <div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg italic">
                    "{value.description}"
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-blue-600/30 group-hover:w-12 transition-all duration-500" />
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                    FactWise Value 0{index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-[1800px] mx-auto px-[clamp(24px,5vw,80px)] mt-12">
          <div className="flex items-center gap-4 text-slate-400">
            <div className="h-[1px] w-12 bg-slate-200" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Keep scrolling to continue
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

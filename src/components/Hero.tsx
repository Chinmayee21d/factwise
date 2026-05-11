'use client';

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- Hero ---------------- */
const navItems = ["Platform", "Solutions", "Methodology", "Case Studies", "Enterprise"];

export default function Hero() {
  return (
    <section className="h-screen w-full relative pt-16 md:pt-0">
      <div className="relative h-full w-full overflow-hidden">
        
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/factwise-hero.mp4"
        />

        {/* Noise overlay */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay" 
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
        />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 sm:px-6 md:px-10 lg:pb-16">
          <div className="grid grid-cols-12 items-end gap-6">
            
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[15vw]"
                style={{ color: "#E1E0CC", fontFamily: "var(--font-display)" }}
              >
                <WordsPullUp text="FactWise" />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-6 pb-4 lg:col-span-4 lg:pb-8">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-[#E1E0CC]/80 sm:text-base md:text-lg max-w-[380px]"
                style={{ lineHeight: 1.4, fontFamily: "var(--font-inter)" }}
              >
                Go beyond simple sourcing. FactWise unifies your entire procurement ecosystem into one intelligent, 100% visible workflow.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4"
              >
                <button
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-[#E1E0CC] py-1.5 pl-6 pr-1.5 text-sm font-bold text-black transition-all hover:gap-4 sm:text-base shadow-lg shadow-black/20"
                >
                  Join Us
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
                    <ArrowRight className="h-5 w-5" style={{ color: "#E1E0CC" }} />
                  </span>
                </button>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Inline style for noise if needed, but using inline style bg-image above */}
      <style jsx>{`
        .noise-overlay {
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
        }
      `}</style>
    </section>
  );
}

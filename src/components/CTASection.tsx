'use client';

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { MagicButton } from '@/components/ui/MagicButton';
import { ArrowRight } from 'lucide-react';

/* ── Antigravity Grid Background ─────────────── */
function AntigravityGrid({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  const gridX = useTransform(mouseX, [0, 1920], [15, -15]);
  const gridY = useTransform(mouseY, [0, 1080], [15, -15]);
  return (
    <motion.div style={{ x: gridX, y: gridY }} className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
      <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
        {[...Array(15)].map((_, i) => (
          <path 
            key={i} 
            d={`M 0 ${50 + i * 50} C 400 ${70 + i * 45} 1000 ${30 + i * 55} 1440 ${50 + i * 50}`} 
            stroke="#7c5cfc" 
            strokeWidth="0.5" 
            strokeOpacity="0.5" 
          />
        ))}
      </svg>
    </motion.div>
  );
}

/* ── Atmospheric Particles ───────────────────── */
function AmbientParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%", 
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: "-10%", 
            opacity: [0, 1, 0],
            x: (Math.random() * 100 - 50) + "%" 
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 20,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const orb1Y  = useTransform(scrollYProgress, [0, 1], [100,  -100]);
  const orb2Y  = useTransform(scrollYProgress, [0, 1], [70,   -70]);
  const textY  = useTransform(scrollYProgress, [0, 1], [40,   -40]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 bg-[#0a0a0c] overflow-hidden"
    >
      <AntigravityGrid mouseX={mouseX} mouseY={mouseY} />
      <AmbientParticles />

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c5cfc]/50 to-transparent z-10" />

      {/* Bokeh orbs */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-[8%] left-[12%] w-[720px] h-[720px] rounded-full bg-radial-gradient blur-[80px] pointer-events-none"
        data-color="violet"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="absolute bottom-[8%] right-[8%] w-[560px] h-[560px] rounded-full bg-radial-gradient blur-[80px] pointer-events-none"
        data-color="pink"
      />

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 max-w-[1400px] mx-auto px-10 text-center"
      >
        <motion.div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-[#7c5cfc]/10 border border-[#7c5cfc]/20 backdrop-blur-xl mb-10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc] animate-pulse" />
            <span className="text-[10px] font-black text-[#7c5cfc] uppercase tracking-[0.3em]">
              Start Today — It&apos;s Free
            </span>
          </div>

          {/* Headline - REDUCED SIZE */}
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-[1.1] mb-2">
            Transform your
          </h2>
          <h2 className="text-4xl md:text-6xl font-light text-white/30 tracking-tight leading-[1.1] mb-10">
            procurement, today.
          </h2>

          <p className="text-lg text-white/30 font-light max-w-lg mx-auto leading-relaxed mb-12">
            Join forward-thinking enterprises eliminating procurement fragmentation with one unified, intelligent platform.
          </p>

          {/* CTAs - UPDATED BUTTON STYLE */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagicButton 
              label1="Start Free Trial" 
              label2="Join FactWise" 
              onClick={() => {}}
            />

            <button
              className="group relative flex items-center gap-3 px-8 py-3.5 rounded-[20px] bg-white/[0.03] border border-white/5 text-white/60 text-[14px] font-medium transition-all hover:bg-white/[0.08] hover:border-white/20 hover:text-white"
            >
              Schedule a Demo
              <ArrowRight size={14} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          <p className="text-[10px] font-mono text-white/10 uppercase tracking-widest mt-16">
            No credit card required &nbsp;·&nbsp; Free forever plan available &nbsp;·&nbsp; Setup in minutes
          </p>
        </motion.div>
      </motion.div>
      
      <style jsx>{`
        .bg-radial-gradient[data-color="violet"] {
          background: radial-gradient(circle, rgba(124,92,252,0.1) 0%, transparent 65%);
        }
        .bg-radial-gradient[data-color="pink"] {
          background: radial-gradient(circle, rgba(255,60,172,0.1) 0%, transparent 65%);
        }
      `}</style>
    </section>
  );
}

'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { GLOBAL_LAYOUT } from './LayoutConfig';


const industriesRow1 = [
  { label: 'Automotive', category: 'Manufacturing', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Pharmaceuticals', category: 'Health & Science', image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Fashion & Apparel', category: 'Retail & Consumer', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Construction Materials', category: 'Infrastructure', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Electronics', category: 'Technology', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop' },
];

const industriesRow2 = [
  { label: 'Food & Beverage', category: 'Consumer Goods', image: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Industrial Machinery', category: 'Heavy Industry', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Industrial Automation', category: 'Technology', image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Logistics & Supply', category: 'Operations', image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Healthcare', category: 'Medical', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop' },
];

export default function IndustryMarquee() {
  const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const orb1Y    = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const orb2Y    = useTransform(scrollYProgress, [0, 1], [70,  -70]);
  const headingY = useTransform(scrollYProgress, [0, 1], [50,  -20]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: '80px 0',
        overflow: 'hidden',
        background: '#0a0a0c',
        borderTop:    '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Parallax bokeh orbs */}
      <motion.div
        style={{
          y: orb1Y,
          position: 'absolute',
          top: '15%',
          left: '-8%',
          width: 640,
          height: 640,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,92,252,0.09) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        style={{
          y: orb2Y,
          position: 'absolute',
          top: '5%',
          right: '-6%',
          width: 540,
          height: 540,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(54,102,255,0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      {/* Left/right edge fades */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #0a0a0c 0%, transparent 10%, transparent 90%, #0a0a0c 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Section heading */}
      <motion.div
        style={{ y: headingY, position: 'relative', zIndex: 20, textAlign: 'center', marginBottom: 40, padding: '0 40px' }}
      >
        <motion.div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 16px',
              borderRadius: 100,
              background: 'rgba(124,92,252,0.1)',
              border: '1px solid rgba(124,92,252,0.2)',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: '#7c5cfc',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}
            >
              Industries We Serve
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(26px,4vw,44px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: '#f4f4f5',
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            Built for every industry.
          </h2>
          <p
            style={{ fontSize: 16, color: '#6b6b7a', maxWidth: 420, margin: '0 auto', lineHeight: 1.6, fontWeight: 400 }}
          >
            From automotive to pharma, FactWise adapts to your sector&apos;s unique sourcing complexity.
          </p>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-center mt-10">
            <div className="p-1 bg-white/5 border border-white/10 rounded-full flex gap-1 shadow-2xl">
              <button 
                onClick={() => setViewMode('marquee')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 ${viewMode === 'marquee' ? 'bg-[#7c5cfc] text-white shadow-[0_0_20px_rgba(124,92,252,0.4)]' : 'text-white/40 hover:text-white'}`}
              >
                MARQUEE
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 ${viewMode === 'grid' ? 'bg-[#7c5cfc] text-white shadow-[0_0_20px_rgba(124,92,252,0.4)]' : 'text-white/40 hover:text-white'}`}
              >
                GRID
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="relative min-h-[500px]" style={{ marginTop: 40 }}>
        <AnimatePresence mode="wait">
          {viewMode === 'marquee' ? (
            <motion.div
              key="marquee"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="group/marquee flex flex-col gap-8"
            >
              {/* Row 1 — left → right */}
              <div
                className="group-hover/marquee:[animation-play-state:paused] transition-opacity duration-500 group-hover/marquee:opacity-50 hover:!opacity-100"
                style={{
                  display: 'flex',
                  width: 'max-content',
                  animation: 'marquee-fw 40s linear infinite',
                }}
              >
                {[0, 1, 2].flatMap((copy) => industriesRow1.map((ind) => ({ ...ind, _key: `r1-${copy}-${ind.label}` }))).map((ind) => (
                  <IndustryCard key={ind._key} ind={ind} isMarquee />
                ))}
              </div>

              {/* Row 2 — right → left */}
              <div
                className="group-hover/marquee:[animation-play-state:paused] transition-opacity duration-500 group-hover/marquee:opacity-50 hover:!opacity-100"
                style={{
                  display: 'flex',
                  width: 'max-content',
                  animation: 'marquee-fw-reverse 50s linear infinite',
                }}
              >
                {[0, 1, 2].flatMap((copy) => industriesRow2.map((ind) => ({ ...ind, _key: `r2-${copy}-${ind.label}` }))).map((ind) => (
                  <IndustryCard key={ind._key} ind={ind} isMarquee />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: GLOBAL_LAYOUT.maxWidth, margin: '0 auto', paddingLeft: GLOBAL_LAYOUT.paddingX, paddingRight: GLOBAL_LAYOUT.paddingX }}
            className="flex flex-col gap-10"
          >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {industriesRow1.map((ind) => (
                  <IndustryCard key={ind.label} ind={ind} />
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {industriesRow2.map((ind) => (
                  <IndustryCard key={ind.label} ind={ind} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

type Industry = {
  label: string;
  category: string;
  image: string;
  _key?: string;
};

function IndustryCard({ ind, isMarquee = false }: { ind: Industry, isMarquee?: boolean }) {
  return (
    <div
      className={`group flex flex-col gap-4 cursor-pointer transition-all duration-500 hover:scale-[1.02] ${isMarquee ? 'w-[280px] md:w-[320px] shrink-0 mx-4' : ''}`}
    >
      <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-[#111116] border border-white/5 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={ind.image} 
          alt={ind.label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      <div className="flex flex-col px-1">
        <span className="text-[16px] font-medium text-[#f4f4f5] tracking-tight mb-1">{ind.label}</span>
        <span className="text-[13px] text-[#6b6b7a]">{ind.category}</span>
      </div>
    </div>
  );
}

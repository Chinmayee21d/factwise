'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { GLOBAL_LAYOUT } from './LayoutConfig';

/* ── Animated counter ─────────────────────────── */
function AnimatedStat({
  value,
  suffix = '%',
  duration = 2.4,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const startTime = performance.now();
    const ms = duration * 1000;
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / ms, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (ref.current) ref.current.textContent = Math.round(eased * value) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, suffix, duration]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

const stats = [
  {
    value: 31,
    suffix: '%',
    label: 'Average savings on goods',
    description:
      'Leverage dynamic pricing insights and historical data to negotiate better deals with every supplier.',
    color: '#34d399',
  },
  {
    value: 80,
    suffix: '%',
    label: 'Increase in preferred spend',
    description:
      'Redirect purchase volume to preferred suppliers by limiting maverick spend with guardrails.',
    color: '#7c5cfc',
  },
  {
    value: 50,
    suffix: '%',
    label: 'Reduction in excess spend',
    description:
      'Automated approval workflows and compliance guardrails eliminate wasteful and unauthorized purchasing.',
    color: '#7c5cfc',
  },
  {
    value: 93,
    suffix: '%',
    label: 'Payment compliance rate',
    description:
      'End-to-end visibility from purchase order to payment with four-way automatic reconciliation.',
    color: '#34d399',
  },
];

function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        padding: '48px 32px',
        borderRadius: 24,
        overflow: 'hidden',
        background: '#111116',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(40px)',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      className="group"
    >
      {/* Animated Top Border Beam */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </div>

      {/* Decorative Glow at the top */}
      <div 
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-24 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: stat.color + '30' }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Big stat number */}
        <div
          style={{
            fontSize: 'clamp(64px, 6vw, 84px)',
            fontWeight: 100,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: 24,
            color: stat.color,
            fontFamily: 'Inter, sans-serif',
            opacity: 0.9,
          }}
        >
          <AnimatedStat value={stat.value} suffix={stat.suffix} />
        </div>

        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#f4f4f5',
            marginBottom: 12,
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
          }}
        >
          {stat.label}
        </h3>
        
        <p style={{ 
          fontSize: 14, 
          color: '#6b6b7a', 
          lineHeight: 1.6, 
          fontWeight: 300,
          marginTop: 'auto'
        }}>
          {stat.description}
        </p>
      </div>

      {/* Subtle bottom gradient glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${stat.color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', width: '100%', padding: '160px 0', overflow: 'hidden', background: '#0a0a0c' }}
    >
      {/* Parallax bokeh orbs */}
      <motion.div
        style={{
          y: orb1Y,
          position: 'absolute',
          top: '5%',
          left: '-8%',
          width: 740,
          height: 740,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,92,252,0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        style={{
          y: orb2Y,
          position: 'absolute',
          bottom: '10%',
          right: '-6%',
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div style={GLOBAL_LAYOUT.containerStyle}>
        <SectionHeader 
          label="Real Results"
          title={<>Measurable impact across<br />your entire procurement stack.</>}
          description="Every metric backed by real customer outcomes. We help enterprises optimize spend, reduce waste, and ensure 100% compliance."
          accentColor="#34d399"
          align="center"
        />

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

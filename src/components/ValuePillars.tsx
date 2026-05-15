'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { GLOBAL_LAYOUT } from './LayoutConfig';

/* ── Data ──────────────────────────────────────── */
const pillars = [
  {
    id: 'savings',
    stat: '31%',
    title: 'Savings',
    headline: 'Save up to 31% on goods purchased across your organization',
    color: '#34d399',
    features: [
      {
        title: 'Negotiate better',
        desc: 'Leverage dynamic and historic insights to negotiate with suppliers using key performance metrics.',
      },
      {
        title: 'Find better suppliers',
        desc: 'Discover new suppliers who offer competitive pricing and are certified to your quality requirements.',
      },
      {
        title: 'Reduce unauthorized spend',
        desc: 'Increase volume to preferred suppliers by 80% by limiting maverick spend and maintaining organization-wide transparency.',
      },
    ],
  },
  {
    id: 'usability',
    stat: '50%',
    title: 'Usability & Governance',
    headline: 'Automated approval requests and intuitive user interface to improve user experience',
    color: '#3666ff',
    features: [
      {
        title: 'Improve compliance',
        desc: 'Automate approval requests and curtail excess spend by up to 50%.',
      },
      {
        title: 'Facilitate ease',
        desc: 'Adopt an intuitive, user-friendly interface that does not require complex trainings.',
      },
      {
        title: 'Increase visibility',
        desc: 'Prevent errors with the help of proactive, customized insights.',
      },
    ],
  },
  {
    id: 'efficiency',
    stat: '20%',
    title: 'Efficiency',
    headline: 'Optimize the end-to-end source-to-pay journey via automation',
    color: '#f59e0b',
    features: [
      {
        title: 'Automate processes',
        desc: 'Achieve 20% increase in productivity with automation by streamlining the ordering process.',
      },
      {
        title: 'Reduce research time',
        desc: 'Enable real-time data throughout the sourcing & operations journey to receive the latest insights.',
      },
      {
        title: 'Reconcile payments automatically',
        desc: 'Automate four-way reconciliation across POs, Invoices, Goods Receipts and Quality Checks.',
      },
    ],
  },
];

/* ── Types ─────────────────────────────────────── */
interface Feature { title: string; desc: string; }
interface Pillar {
  id: string;
  stat: string;
  title: string;
  headline: string;
  color: string;
  features: Feature[];
}
interface PillarProps {
  pillar: Pillar;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

/* ── Left-side animated header ─────────────────── */
const PillarHeader = ({ pillar, index, total, scrollYProgress }: PillarProps) => {
  const start = index / total;
  const end   = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.08), start, end - 0.08, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.08), start, end - 0.08, end],
    [32, 0, 0, -32],
  );

  return (
    <motion.div
      style={{ opacity, y, position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', pointerEvents: 'none' }}
    >
      {/* Giant stat number — mood-board accent */}
      <div
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 'clamp(64px,10vw,108px)',
          fontWeight: 100,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: pillar.color,
          opacity: 0.65,
          marginBottom: 12,
          userSelect: 'none',
        }}
      >
        {pillar.stat}
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 'clamp(22px,3vw,36px)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          color: '#000000',
          marginBottom: 14,
        }}
      >
        {pillar.title}
      </h2>
      <p
        style={{
          fontSize: 16,
          color: '#6b6b7a',
          lineHeight: 1.65,
          maxWidth: 360,
          fontWeight: 400,
        }}
      >
        {pillar.headline}
      </p>
    </motion.div>
  );
};

/* ── Right-side feature card ───────────────────── */
const PillarCard = ({ pillar, index, total, scrollYProgress }: PillarProps) => {
  const start = index / total;
  const end   = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.1), start, end - 0.06, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.2), start, end - 0.06, end],
    [90, 0, 0, -90],
  );
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.2), start, end - 0.06, end],
    [0.91, 1, 1, 0.95],
  );

  return (
    <motion.div
      style={{ opacity, y, scale, position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div
        style={{
          padding: '40px',
          borderRadius: 24,
          background: '#ffffff',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(0,0,0,0.07)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
        }}
      >
        {/* Thick top-border accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${pillar.color}, transparent 70%)`,
          }}
        />
        {/* Corner glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -70,
            right: -70,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: pillar.color,
            filter: 'blur(80px)',
            opacity: 0.12,
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'relative', zIndex: 1 }}>
          {pillar.features.map((feature) => (
            <div key={feature.title} style={{ display: 'flex', gap: 18 }}>
              {/* Dot icon */}
              <div
                style={{
                  marginTop: 4,
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: `${pillar.color}14`,
                  border: `1px solid ${pillar.color}2a`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: pillar.color }} />
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 500, color: '#000000', marginBottom: 6, lineHeight: 1.3 }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: 14, color: '#6b6b7a', lineHeight: 1.7 }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Scroll-progress dot ───────────────────────── */
const ProgressDot = ({
  index,
  total,
  scrollYProgress,
  color,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  color: string;
}) => {
  const start   = index / total;
  const end     = (index + 1) / total;
  // Clamp to ≥ 0 — WAAPI requires all keyframe offsets to be in [0, 1]
  const lo      = Math.max(0, start - 0.05);
  const opacity = useTransform(scrollYProgress, [lo, start, end - 0.05, end], [0.22, 1, 1, 0.22]);
  const scale   = useTransform(scrollYProgress, [lo, start, end - 0.05, end], [0.6, 1.4, 1.4, 0.6]);

  return (
    <motion.div
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: color,
        opacity,
        scale,
      }}
    />
  );
};

/* ── Main export ───────────────────────────────── */
export default function ValuePillars() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* Parallax orbs — different speeds = depth */
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <section ref={containerRef} style={{ position: 'relative', height: '300vh' }}>
      {/* ── Sticky viewport ─── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#f6f9fc' }}>

        {/* ── Parallax bokeh background ─── */}
        <motion.div
          style={{
            y: orb1Y,
            position: 'absolute',
            top: '5%',
            left: '-12%',
            width: 760,
            height: 760,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(54,102,255,0.08) 0%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          style={{
            y: orb2Y,
            position: 'absolute',
            bottom: '-5%',
            right: '-10%',
            width: 640,
            height: 640,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.09) 0%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          style={{
            y: orb3Y,
            position: 'absolute',
            top: '40%',
            right: '15%',
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Content grid ─── */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: GLOBAL_LAYOUT.maxWidth,
            margin: '0 auto',
            padding: `0 ${GLOBAL_LAYOUT.paddingX}`,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 72,
            height: '100%',
            alignItems: 'center',
          }}
        >
          {/* ── Left: stats + animated title ─── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28, position: 'relative', height: '100%', paddingTop: 'clamp(60px, 10vh, 100px)' }}>
            {/* Badge */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 16px',
                  borderRadius: 100,
                  background: 'rgba(54,102,255,0.08)',
                  border: '1px solid rgba(54,102,255,0.2)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#3666ff',
                    animation: 'glow-pulse 2s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#3666ff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                  }}
                >
                  The FactWise Advantage
                </span>
              </div>
            </div>

            {/* Animated pillar headers */}
            <div style={{ position: 'relative', height: 260, flexShrink: 0 }}>
              {pillars.map((pillar, i) => (
                <PillarHeader
                  key={pillar.id}
                  pillar={pillar}
                  index={i}
                  total={pillars.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 10 }}>
              {pillars.map((pillar, i) => (
                <ProgressDot
                  key={pillar.id}
                  index={i}
                  total={pillars.length}
                  scrollYProgress={scrollYProgress}
                  color={pillar.color}
                />
              ))}
            </div>
          </div>

          {/* ── Right: animated feature cards ─── */}
          <div style={{ position: 'relative', height: '62vh', display: 'flex', alignItems: 'center' }}>
            {pillars.map((pillar, i) => (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                index={i}
                total={pillars.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

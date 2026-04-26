'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { GLOBAL_LAYOUT } from '../LayoutConfig';

/* ── Shared layout constants ───────────────────── */
export const SECTION_LAYOUT = {
  maxWidth: GLOBAL_LAYOUT.maxWidth,
  paddingX: GLOBAL_LAYOUT.paddingX,
  paddingY: GLOBAL_LAYOUT.paddingY,
  gap: GLOBAL_LAYOUT.gap,
  get containerStyle() {
    return GLOBAL_LAYOUT.containerStyle;
  }
};

/* ── Shared sub-components ──────────────────────── */
export const BrowserChrome = ({ url }: { url: string }) => (
  <div style={{ background: 'rgba(15, 15, 18, 0.9)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(8px)' }}>
    <div style={{ display: 'flex', gap: 6 }}>
      {['#ff5f57', '#febc2e', '#27c840'].map(c => (
        <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
      ))}
    </div>
    <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, height: 24, marginLeft: 12, display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: '0.02em' }}>{url}</span>
    </div>
  </div>
);

export function ScoreBar({ pct, color, delay, inView }: { pct: number; color: string; delay: number; inView: boolean }) {
  return (
    <div style={{ flex: 1, height: 4, borderRadius: 2, background: '#f0f0f5', overflow: 'hidden' }}>
      <motion.div
        style={{ height: '100%', borderRadius: 2, background: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/* ── Feature Layout Types ────────────────────────── */
export interface FeatureSectionData {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  features: { icon: string; label: string; desc: string }[];
  mockup: ReactNode;
  align: 'left' | 'right';
  orbColor1: string;
  orbColor2: string;
}

/* ── Shared Feature Row Layout ───────────────────── */
export function FeatureLayout({ section }: Readonly<{ section: FeatureSectionData }>) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const isRight = section.align === 'right';

  return (
    <div ref={rowRef} style={{ position: 'relative', width: '100%', padding: `${SECTION_LAYOUT.paddingY} 0`, overflow: 'hidden', backgroundColor: '#0a0a0c' }}>
      {/* Bokeh orbs */}
      <motion.div style={{ y: orb1Y, position: 'absolute', top: '10%', left: isRight ? 'auto' : '-8%', right: isRight ? '-8%' : 'auto', width: 680, height: 680, borderRadius: '50%', background: `radial-gradient(circle, ${section.orbColor1} 0%, transparent 70%)`, filter: 'blur(90px)', opacity: 0.4, pointerEvents: 'none' }} />
      <motion.div style={{ y: orb2Y, position: 'absolute', bottom: '5%', left: isRight ? '10%' : 'auto', right: isRight ? 'auto' : '10%', width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle, ${section.orbColor2} 0%, transparent 70%)`, filter: 'blur(100px)', opacity: 0.3, pointerEvents: 'none' }} />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            ...SECTION_LAYOUT.containerStyle,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: SECTION_LAYOUT.gap,
            alignItems: 'start',
          }}
        >
        {/* ── Text column ── */}
        <motion.div
          style={{ order: isRight ? 2 : 1 }}
        >
          {/* Badge */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 100, background: `${section.badgeColor}15`, border: `1px solid ${section.badgeColor}30` }}>
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: section.badgeColor }}
              />
              <span style={{ fontSize: 11, fontWeight: 500, color: section.badgeColor, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{section.badge}</span>
            </div>
          </div>

          {/* Title */}
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(30px,4vw,50px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#f4f4f5', marginBottom: 18, whiteSpace: 'pre-line' }}>
            {section.title}
          </h2>

          {/* Description */}
          <p style={{ fontSize: 16, color: '#6b6b7a', lineHeight: 1.7, marginBottom: 34, maxWidth: 440 }}>
            {section.description}
          </p>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {section.features.map((f, fi) => (
              <motion.div
                key={f.label}
                style={{ display: 'flex', gap: 13 }}
              >
                <div style={{ flexShrink: 0, marginTop: 2, width: 30, height: 30, borderRadius: '50%', background: `${section.badgeColor}15`, border: `1px solid ${section.badgeColor}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: section.badgeColor, fontWeight: 400 }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f4f4f5', marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 13, color: '#6b6b7a', lineHeight: 1.65 }}>{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Mockup column ── */}
        <div style={{ order: isRight ? 1 : 2 }}>
          {section.mockup}
        </div>
      </div>
    </div>
  );
}

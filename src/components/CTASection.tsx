'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GLOBAL_LAYOUT } from './LayoutConfig';

const TRUST_ITEMS = ['No credit card required', '4-week onboarding', 'SOC 2 Type II'];

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{
        width: '100%',
        background: '#f6f9fc',
        padding: `80px ${GLOBAL_LAYOUT.paddingX}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        ref={ref}
        style={{ maxWidth: GLOBAL_LAYOUT.maxWidth, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0, 0.25, 1] }}
        >
          {/* Card */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 1px rgba(54,102,255,0.10), 0 8px 40px rgba(0,0,0,0.07)',
                '0 0 0 1px rgba(54,102,255,0.22), 0 8px 40px rgba(0,0,0,0.07), 0 0 50px rgba(54,102,255,0.07)',
                '0 0 0 1px rgba(54,102,255,0.10), 0 8px 40px rgba(0,0,0,0.07)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'relative',
              background: '#ffffff',
              borderRadius: 20,
              padding: '52px 56px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 48,
            }}
          >
            {/* ── Decorative background ── */}

            {/* Grid fade in from top-left */}
            <div
              aria-hidden
              style={{
                position: 'absolute', inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
                backgroundSize: '44px 44px',
                maskImage: 'radial-gradient(ellipse 65% 80% at 0% 0%, black, transparent)',
                WebkitMaskImage: 'radial-gradient(ellipse 65% 80% at 0% 0%, black, transparent)',
                pointerEvents: 'none',
              }}
            />

            {/* Violet glow — top-left corner */}
            <div
              aria-hidden
              style={{
                position: 'absolute', top: '-30%', left: '-10%',
                width: 500, height: 400,
                background: 'radial-gradient(ellipse, rgba(54,102,255,0.13) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />

            {/* Mint/teal accent — bottom-right */}
            <div
              aria-hidden
              style={{
                position: 'absolute', bottom: '-20%', right: '5%',
                width: 400, height: 340,
                background: 'radial-gradient(ellipse, rgba(0,184,132,0.10) 0%, rgba(240,251,248,0.6) 50%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Horizontal light streak */}
            <div
              aria-hidden
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent 0%, rgba(54,102,255,0.5) 30%, rgba(54,102,255,0.2) 60%, transparent 100%)',
              }}
            />

            {/* ── Left — text ── */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0, 0.25, 1] }}
              style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}
            >
              {/* Badge */}
              <div
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '5px 14px', borderRadius: 100, marginBottom: 22,
                  background: 'rgba(54,102,255,0.1)',
                  border: '1px solid rgba(54,102,255,0.22)',
                }}
              >
                <Sparkles size={10} color="#3666ff" />
                <span style={{ fontSize: 10, fontWeight: 600, color: '#3666ff', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  Start Today
                </span>
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontSize: 'clamp(24px, 2.6vw, 38px)',
                  fontWeight: 300,
                  color: '#000000',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  marginBottom: 12,
                }}
              >
                Transform your operations.{' '}
                <span style={{ color: '#808080' }}>Today.</span>
              </h2>

              {/* Sub-text */}
              <p
                style={{
                  fontSize: 13,
                  color: '#808080',
                  lineHeight: 1.75,
                  fontWeight: 400,
                  maxWidth: 420,
                  marginBottom: 24,
                }}
              >
                Join enterprises replacing fragmented spreadsheets with one
                connected, intelligent source-to-pay ecosystem.
              </p>

              {/* Trust items */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                {TRUST_ITEMS.map((item, i) => (
                  <span key={item} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {i > 0 && (
                      <span style={{ color: 'rgba(0,0,0,0.18)', margin: '0 10px', fontSize: 12 }}>·</span>
                    )}
                    <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', fontWeight: 400, letterSpacing: '0.05em' }}>
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Vertical divider */}
            <div
              aria-hidden
              style={{
                width: 1, alignSelf: 'stretch',
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.08), transparent)',
                flexShrink: 0,
              }}
            />

            {/* ── Right — buttons ── */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.25, 0, 0.25, 1] }}
              style={{
                display: 'flex', flexDirection: 'column', gap: 10,
                alignItems: 'stretch', flexShrink: 0, minWidth: 180,
                position: 'relative', zIndex: 1,
              }}
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(54,102,255,0.5)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '13px 28px', borderRadius: 100,
                  background: '#3666ff', color: '#fff',
                  fontSize: 13, fontWeight: 500, letterSpacing: '0.03em',
                  textDecoration: 'none',
                  boxShadow: '0 0 28px rgba(54,102,255,0.3)',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                Book a Demo
                <ArrowRight size={13} />
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '13px 28px', borderRadius: 100,
                  border: '1px solid rgba(0,0,0,0.1)',
                  background: 'rgba(0,0,0,0.02)',
                  color: '#808080', fontSize: 13, fontWeight: 400,
                  letterSpacing: '0.03em', textDecoration: 'none',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#808080';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
                  e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                }}
              >
                Talk to Sales
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

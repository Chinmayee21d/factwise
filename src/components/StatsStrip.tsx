'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GLOBAL_LAYOUT } from './LayoutConfig';

const STATS = [
  {
    value: '3x',
    label: 'Faster Sourcing',
    sub: 'Accelerated RFQ-to-award cycles',
  },
  {
    value: '100%',
    label: 'Lifecycle Visibility',
    sub: 'Audit-ready spend and quality data',
  },
  {
    value: '10 Modules',
    label: 'Integrated Suite',
    sub: 'From Requisitions to Payments',
  },
];

export default function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="w-full border-t border-b"
      style={{
        background: '#FFFFFF',
        borderColor: 'rgba(74,111,255,0.08)',
      }}
    >
      <div
        className="mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-0 py-14"
        style={GLOBAL_LAYOUT.containerStyle}
      >

        {/* Left — value prop text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:w-[34%] lg:pr-14 flex-shrink-0"
        >
          <p
            className="max-w-[280px]"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.72,
              color: '#7B82A8',
            }}
          >
            Beyond simple procurement. FactWise unifies strategic sourcing, 
            supply chain operations, and quality management into one 
            connected, intelligent ecosystem.
          </p>
        </motion.div>

        {/* Vertical divider (desktop) */}
        <div
          className="hidden lg:block w-px self-stretch flex-shrink-0"
          style={{ background: 'rgba(74,111,255,0.10)' }}
        />

        {/* Right — 3 stats */}
        <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center divide-y sm:divide-y-0 sm:divide-x w-full"
          style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.1 }}
              className="flex-1 flex flex-col gap-1.5 px-0 sm:px-10 py-6 sm:py-0"
              style={{ borderColor: 'rgba(74,111,255,0.10)' }}
            >
              {/* Big number */}
              <span
                className="leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 4vw, 3.1rem)',
                  fontWeight: 800,
                  color: '#0D0F1C',
                  letterSpacing: '-0.04em',
                }}
              >
                {stat.value}
              </span>
              {/* Primary label */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#1A1D2E',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.label}
              </span>
              {/* Sub descriptor */}
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#B0B5CC',
                  lineHeight: 1.5,
                }}
              >
                {stat.sub}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

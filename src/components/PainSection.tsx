'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GLOBAL_LAYOUT } from './LayoutConfig';

/* ─── Icons (outline, 22px, moodboard spec) ─── */
const IconFragmented = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const IconSlow = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14" />
  </svg>
);

const IconBlind = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const PROBLEMS = [
  {
    Icon: IconFragmented,
    title: 'Fragmented Toolstack',
    description:
      'Requisitions in email. Sourcing in spreadsheets. POs in ERP. Invoices in AP software. Five tools, five data silos, zero coordination between them.',
    featured: false,
  },
  {
    Icon: IconSlow,
    title: 'Weeks to Close an RFQ',
    description:
      'Collecting quotes by email, comparing in Excel, re-entering into ERP. A 3-week cycle that should take 3 days — automated and auditable.',
    featured: true,
  },
  {
    Icon: IconBlind,
    title: 'No Spend Visibility',
    description:
      'Contract prices buried in folders. Live distributor rates, historical bids, and negotiated terms all siloed — decisions made in the dark.',
    featured: false,
  },
];

/* ─── Card ─── */
function ProblemCard({
  problem,
  index,
  inView,
}: {
  problem: (typeof PROBLEMS)[0];
  index: number;
  inView: boolean;
}) {
  const { Icon, title, description, featured } = problem;

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col overflow-hidden"
        style={{
          borderRadius: 20,
          padding: '36px 32px',
          background: 'linear-gradient(145deg, #4A6FFF 0%, #6C8EFF 55%, #97A8FF 100%)',
          boxShadow: '0 20px 60px rgba(74,111,255,0.35)',
        }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            borderRadius: 20,
          }}
        />
        {/* Soft orbs */}
        <div
          className="absolute top-4 right-6 w-24 h-24 rounded-full pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.12)', filter: 'blur(12px)' }}
        />
        <div
          className="absolute bottom-6 left-4 w-16 h-16 rounded-full pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.07)', filter: 'blur(10px)' }}
        />

        {/* Icon */}
        <div
          className="relative mb-8 flex items-center justify-center"
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.20)',
            color: '#ffffff',
          }}
        >
          <Icon />
        </div>

        {/* Title */}
        <h3
          className="relative mb-4 font-bold leading-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            letterSpacing: '-0.02em',
            color: '#ffffff',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="relative leading-[1.65]"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '14.5px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          {description}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
      style={{
        borderRadius: 20,
        padding: '36px 32px',
        background: '#FFFFFF',
        border: '1.5px solid #E2E5F0',
        transition: 'box-shadow 220ms ease, border-color 220ms ease',
      }}
      whileHover={{ y: -4 }}
    >
      {/* Icon */}
      <div
        className="mb-8 flex items-center justify-center transition-all duration-200 group-hover:bg-[#E8ECFF] group-hover:text-[#4A6FFF]"
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: '#F4F5FB',
          color: '#7B82A8',
        }}
      >
        <Icon />
      </div>

      {/* Title */}
      <h3
        className="mb-4 font-bold leading-tight"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          letterSpacing: '-0.02em',
          color: '#1A1D2E',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="leading-[1.65]"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '14.5px',
          fontWeight: 400,
          color: '#7B82A8',
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

/* ─── Section ─── */
export default function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: '#F4F5FB', paddingTop: '100px', paddingBottom: '100px' }}
    >
      {/* Subtle background bloom */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(74,111,255,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div style={GLOBAL_LAYOUT.containerStyle}>

        {/* ── Section header — center aligned ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-full mb-6"
            style={{
              background: '#E8ECFF',
              border: '1px solid rgba(74,111,255,0.20)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#4A6FFF',
              }}
            >
              The Problem
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-bold mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#1A1D2E',
              maxWidth: '640px',
            }}
          >
            The Hidden Cost of{' '}
            <span style={{ color: '#4A6FFF' }}>Fragmented</span> Procurement
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              fontWeight: 400,
              color: '#7B82A8',
              lineHeight: 1.65,
              maxWidth: '520px',
            }}
          >
            Most enterprises stitch together 5+ tools to manage their supply chain.
            Data is siloed. Decisions are blind. Cycles take weeks.
          </p>
        </motion.div>

        {/* ── 3-column cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROBLEMS.map((p, i) => (
            <ProblemCard key={p.title} problem={p} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}

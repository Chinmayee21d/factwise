'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, DollarSign, Truck, Shield, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { GLOBAL_LAYOUT } from './LayoutConfig';

const PERSONAS = [
  {
    id: 'sourcing',
    label: 'Sourcing',
    accent: '#7c5cfc',
    accentAlpha: 'rgba(124,92,252,0.10)',
    accentBorder: 'rgba(124,92,252,0.30)',
    glow: 'rgba(124,92,252,0.14)',
    Icon: ShoppingCart,
    title: 'Strategic sourcing, end to end.',
    description:
      'Run multi-round RFQs, compare landed costs, and award contracts in days — not weeks. Every bid, every vendor, every round tracked.',
    bullets: [
      'Automated bid comparison with landed cost breakdown',
      'Multi-level approval routing with full audit trail',
      'One-click PO creation from awarded bids',
    ],
    stats: [
      { value: '22%', label: 'Avg. savings' },
      { value: '14d', label: 'Award cycle' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    accent: '#4b8bff',
    accentAlpha: 'rgba(75,139,255,0.10)',
    accentBorder: 'rgba(75,139,255,0.30)',
    glow: 'rgba(75,139,255,0.14)',
    Icon: DollarSign,
    title: 'Zero-leakage spend control.',
    description:
      'Automated 3-way matching, real-time payment tracking, and credit management — so every rupee is accounted for before it leaves.',
    bullets: [
      'Auto PO–Invoice–GR 3-way matching at 98% accuracy',
      'Exception hold on 7 mismatch conditions',
      'Prepayments, credits, and netting in one view',
    ],
    stats: [
      { value: '98%', label: 'Match accuracy' },
      { value: '₹84L', label: 'Leakage blocked' },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    accent: '#e8433a',
    accentAlpha: 'rgba(232,67,58,0.10)',
    accentBorder: 'rgba(232,67,58,0.30)',
    glow: 'rgba(232,67,58,0.14)',
    Icon: Truck,
    title: 'Supply chain visibility from day one.',
    description:
      'Track goods receipt, quality checks, and delivery schedules across every facility. Spot disruptions before they hit the line.',
    bullets: [
      'Delivery schedule management with GRN tracking',
      'QC inspection workflows linked to payment release',
      'Real-time supplier alerts across all nodes',
    ],
    stats: [
      { value: '−2.4d', label: 'Lead time saved' },
      { value: '99.8%', label: 'QC pass rate' },
    ],
  },
  {
    id: 'it',
    label: 'IT & Security',
    accent: '#22d3ee',
    accentAlpha: 'rgba(34,211,238,0.10)',
    accentBorder: 'rgba(34,211,238,0.30)',
    glow: 'rgba(34,211,238,0.14)',
    Icon: Shield,
    title: 'Enterprise-grade, API-first.',
    description:
      'Cloud-native architecture that plugs into your ERP, SSO, and existing stack with zero-trust security and sub-15ms latency.',
    bullets: [
      'SSO, RBAC, and field-level access controls',
      'REST API with webhooks for ERP sync',
      'SOC 2 Type II · AES-256 at rest and in transit',
    ],
    stats: [
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '<15ms', label: 'API latency' },
    ],
  },
];

export default function PersonaSection() {
  return (
    <section
      style={{
        width: '100%',
        background: '#0a0a0c',
        padding: `96px ${GLOBAL_LAYOUT.paddingX}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: GLOBAL_LAYOUT.maxWidth, margin: '0 auto' }}>
        <SectionHeader
          label="Built for your team"
          title={
            <>
              One platform.{' '}
              <span style={{ color: '#6b6b7a', fontWeight: 300, fontStyle: 'italic' }}>
                Every stakeholder.
              </span>
            </>
          }
          description="Sourcing, finance, operations, and IT each get purpose-built workflows — all connected in a single source of truth."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
            alignItems: 'stretch',
          }}
        >
          {PERSONAS.map((p, i) => (
            <PersonaCard key={p.id} persona={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonaCard({
  persona: p,
  index,
}: {
  persona: (typeof PERSONAS)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: '#111116',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24,
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'default',
        height: '100%',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        boxShadow: isHovered ? `0 20px 40px -10px ${p.glow}` : 'none',
        borderColor: isHovered ? p.accentBorder : 'rgba(255,255,255,0.08)',
      }}
    >
      {/* Top accent gradient line */}
      <motion.div
        aria-hidden
        animate={{
          opacity: isHovered ? 1 : 0.4,
          scaleX: isHovered ? 1.1 : 1
        }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`,
        }}
      />

      {/* Icon + label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
            background: isHovered ? p.accent : p.accentAlpha
          }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: p.accentAlpha,
            border: `1px solid ${p.accentBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.3s ease'
          }}
        >
          <p.Icon size={20} color={isHovered ? '#fff' : p.accent} />
        </motion.div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: p.accent,
            background: `${p.accent}10`,
            padding: '4px 12px',
            borderRadius: 100,
            border: `1px solid ${p.accent}20`
          }}
        >
          {p.label}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: '#fff',
          lineHeight: 1.3,
          marginBottom: 16,
        }}
      >
        {p.title}
      </h3>

      {/* Description & Bullets (Revealed on Hover) */}
      <div style={{ flex: 1, position: 'relative' }}>
        <p
          style={{
            fontSize: 13,
            color: '#9494a3',
            lineHeight: 1.6,
            fontWeight: 300,
            marginBottom: isHovered ? 20 : 0,
            opacity: isHovered ? 1 : 0.8,
            transition: 'all 0.3s ease'
          }}
        >
          {p.description}
        </p>

        <motion.div
          initial={false}
          animate={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? 0 : -10
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
            {p.bullets.map((b) => (
              <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <CheckCircle2
                  size={14}
                  color={p.accent}
                  style={{ flexShrink: 0, marginTop: 2 }}
                />
                <span style={{ fontSize: 12, color: '#a1a1aa', lineHeight: 1.5, fontWeight: 300 }}>
                  {b}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '16px 0' }} />

      {/* Stats */}
      <div style={{ display: 'flex', gap: 32 }}>
        {p.stats.map((s) => (
          <div key={s.label}>
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
                color: isHovered ? '#fff' : p.accent
              }}
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: p.accent,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {s.value}
            </motion.div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: '#6b6b7a',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginTop: 6,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

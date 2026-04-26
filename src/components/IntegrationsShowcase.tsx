'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RefreshCcw, Lock, Zap } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { GLOBAL_LAYOUT } from './LayoutConfig';

/* ── Constants ──────────────────────────────────── */
const CX = 310;       // SVG center x
const CY = 310;       // SVG center y
const RADIUS = 232;   // spoke length
const NODE = 88;      // node card size
const HALF = NODE / 2;

/* ── Data ───────────────────────────────────────── */
const integrations = [
  { name: 'SAP',      color: '#0FAAFF', category: 'ERP',         angle: -90  }, // top
  { name: 'Oracle',   color: '#F80000', category: 'ERP',         angle: -45  }, // top-right
  { name: 'Dynamics', color: '#0078D4', category: 'ERP',         angle: 0    }, // right
  { name: 'Workday',  color: '#005CB9', category: 'Finance',     angle: 45   }, // bottom-right
  { name: 'NetSuite', color: '#3288C1', category: 'Cloud',       angle: 90   }, // bottom
  { name: 'Coupa',    color: '#E87722', category: 'Procurement', angle: 135  }, // bottom-left
  { name: 'Ariba',    color: '#0070C0', category: 'Sourcing',    angle: 180  }, // left
  { name: 'Infor',    color: '#7B2D8B', category: 'ERP',         angle: -135 }, // top-left
];

const highlights = [
  { 
    icon: <RefreshCcw size={20} />, 
    label: 'Real-time sync', 
    desc: 'Bidirectional data flow with your ERP — zero manual entry.',
    accent: '#7c5cfc'
  },
  { 
    icon: <Lock size={20} />, 
    label: 'Encrypted transfers', 
    desc: 'End-to-end TLS-secured data propagation across every system.',
    accent: '#7c5cfc'
  },
  { 
    icon: <Zap size={20} />, 
    label: 'Sub-second latency', 
    desc: 'Changes reflect instantly across POs, invoices, and receipts.',
    accent: '#7c5cfc'
  },
];

function nodeXY(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    nx: Math.round(CX + RADIUS * Math.cos(rad)),
    ny: Math.round(CY + RADIUS * Math.sin(rad)),
  };
}

/* ── Component ──────────────────────────────────── */
export default function IntegrationsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const orb1Y    = useTransform(scrollYProgress, [0, 1], [120,  -120]);
  const orb2Y    = useTransform(scrollYProgress, [0, 1], [80,   -80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30,   -30]);

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', width: '100%', padding: '160px 0 128px', overflow: 'hidden', background: '#0a0a0c', zIndex: 1 }}
    >
      {/* Bokeh orbs */}
      <motion.div style={{ y: orb1Y, position: 'absolute', top: '0%', left: '-6%', width: 760, height: 760, borderRadius: '50%', background: 'radial-gradient(circle, rgba(54,102,255,0.12) 0%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />
      <motion.div style={{ y: orb2Y, position: 'absolute', bottom: '-8%', right: '-4%', width: 660, height: 660, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,92,252,0.14) 0%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />

      <motion.div style={{ y: contentY, position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Header + Cards */}
          <div className="flex flex-col items-start space-y-12">
            <SectionHeader 
              label="Seamless Integration"
              title={<>Integrate with every system in your stack.</>}
              description="Track goods from source to delivery to payment on a single platform. Connect with leading ERP and accounting systems worldwide."
              accentColor="#7c5cfc"
              align="left"
            />

            <div className="flex flex-col gap-6 w-full max-w-lg">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  whileHover={{ x: 8 }}
                  style={{ 
                    position: 'relative',
                    display: 'flex', 
                    flexDirection: 'row',
                    alignItems: 'flex-start', 
                    gap: 20, 
                    padding: '24px 28px', 
                    borderRadius: 20, 
                    background: '#111116', 
                    border: '1px solid rgba(255,255,255,0.07)', 
                    backdropFilter: 'blur(20px)',
                    textAlign: 'left',
                    overflow: 'hidden',
                  }}
                  className="group"
                >
                  {/* Hover Glow Beam */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7c5cfc]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    <motion.div 
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#7c5cfc]/40 to-transparent"
                    />
                  </div>

                  {/* Top Glow Aura */}
                  <div 
                    className="absolute -top-12 left-1/4 w-32 h-12 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: h.accent + '20' }}
                  />

                  <div style={{ 
                    color: '#7c5cfc', 
                    flexShrink: 0, 
                    marginTop: 4,
                    opacity: 0.9,
                    transition: 'all 0.3s ease'
                  }} className="group-hover:scale-110 group-hover:text-white">
                    {h.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#f4f4f5', marginBottom: 6, letterSpacing: '-0.01em' }}>
                      {h.label}
                    </div>
                    <div style={{ fontSize: 13, color: '#6b6b7a', lineHeight: 1.6, fontWeight: 300 }}>
                      {h.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Hub Diagram - Centered scale origin to prevent misalignment */}
          <div className="relative w-full flex justify-center lg:justify-end pt-24">
            <div 
              className="scale-[0.7] lg:scale-[0.8] origin-center lg:origin-center"
              style={{ position: 'relative', width: 620, height: 620, maxWidth: '100%' }}
            >
              {/* SVG Hub Logic */}
              <svg
                viewBox={`0 0 ${CX * 2} ${CY * 2}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}
              >
                <defs>
                  {integrations.map((intg) => (
                    <filter key={`glow-${intg.name}`} id={`glow-${intg.name}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  ))}
                  {integrations.map((intg) => {
                    const { nx, ny } = nodeXY(intg.angle);
                    const gradId = `grad-${intg.name}`;
                    return (
                      <linearGradient key={gradId} id={gradId} x1={CX} y1={CY} x2={nx} y2={ny} gradientUnits="userSpaceOnUse">
                        <stop offset="0%"   stopColor="#7c5cfc" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0.08" />
                      </linearGradient>
                    );
                  })}
                  {integrations.map((intg) => {
                    const { nx, ny } = nodeXY(intg.angle);
                    return (
                      <path key={`path-${intg.name}`} id={`path-${intg.name}`} d={`M ${CX} ${CY} L ${nx} ${ny}`} />
                    );
                  })}
                </defs>

                <circle cx={CX} cy={CY} r={RADIUS + 34} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <circle cx={CX} cy={CY} r={RADIUS + 66} fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />

                {integrations.map((intg) => {
                  const { nx, ny } = nodeXY(intg.angle);
                  return (
                    <line
                      key={`line-${intg.name}`}
                      x1={CX} y1={CY} x2={nx} y2={ny}
                      stroke={`url(#grad-${intg.name})`}
                      strokeWidth="1"
                    />
                  );
                })}

                {integrations.map((intg, i) => (
                  <circle
                    key={`pkt-${intg.name}`}
                    r="3"
                    fill="#7c5cfc"
                    filter={`url(#glow-${intg.name})`}
                  >
                    <animateMotion
                      dur={`${2.0 + i * 0.28}s`}
                      begin={`${i * 0.42}s`}
                      repeatCount="indefinite"
                    >
                      <mpath href={`#path-${intg.name}`} />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      values="0;0;1;1;0"
                      keyTimes="0;0.1;0.2;0.85;1"
                      dur={`${2.0 + i * 0.28}s`}
                      begin={`${i * 0.42}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
              </svg>

              {/* Center hub */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 138,
                  height: 138,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 40% 35%, rgba(124,92,252,0.22) 0%, #111116 60%)',
                  border: '1px solid rgba(124,92,252,0.32)',
                  backdropFilter: 'blur(24px)',
                  boxShadow: '0 0 130px rgba(124,92,252,0.42), 0 0 50px rgba(124,92,252,0.22), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 500, color: '#f4f4f5', letterSpacing: '-0.025em' }}>
                  fact<span style={{ fontWeight: 300 }}>wise</span>
                </span>
                <div style={{ fontSize: 9, color: '#7c5cfc', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 600 }}>
                  Hub
                </div>
              </div>

              {/* Integration nodes */}
              {integrations.map((intg, i) => {
                const { nx, ny } = nodeXY(intg.angle);
                return (
                  <motion.div
                    key={intg.name}
                    whileHover={{ scale: 1.12, zIndex: 30 }}
                    style={{
                      position: 'absolute',
                      top: ny - HALF,
                      left: nx - HALF,
                      width: NODE,
                      height: NODE,
                      zIndex: 10,
                      borderRadius: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.02) 0%, #111116 68%)`,
                      border: `1px solid rgba(255,255,255,0.08)`,
                      backdropFilter: 'blur(20px)',
                      boxShadow: `0 8px 32px rgba(0,0,0,0.55)`,
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: intg.color,
                        marginBottom: 7,
                        boxShadow: `0 0 10px ${intg.color}80`,
                      }}
                    />
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#f4f4f5', letterSpacing: '0.01em' }}>
                      {intg.name}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}

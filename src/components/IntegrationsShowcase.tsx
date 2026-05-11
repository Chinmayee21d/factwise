'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Lock, Zap } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { GLOBAL_LAYOUT } from './LayoutConfig';

/* ── Constants ──────────────────────────────────── */
const CX = 310;       // SVG center x
const CY = 310;       // SVG center y
const RADIUS = 232;   // spoke length
const NODE = 92;      // slightly larger node card size
const HALF = NODE / 2;

/* ── Data ───────────────────────────────────────── */
const integrations = [
  { name: 'SAP',      color: '#0FAAFF', category: 'ERP',         angle: -90  }, // top
  { name: 'Oracle',   color: '#F80000', category: 'ERP',         angle: -45  }, // top-right
  { name: 'Dynamics', color: '#0078D4', category: 'ERP',         angle: 0    }, // right
  { name: 'Workday',  color: '#005CB9', category: 'Finance',     angle: 45   }, // bottom-right
  { name: 'NetSuite', color: '#3288C1', category: 'Cloud',       angle: 90   }, // bottom
  { name: 'Coupa',    color: '#E87722', category: 'Sourcing', angle: 135  }, // bottom-left
  { name: 'Ariba',    color: '#0070C0', category: 'Sourcing',    angle: 180  }, // left
  { name: 'Infor',    color: '#7B2D8B', category: 'ERP',         angle: -135 }, // top-left
];

const highlights = [
  { 
    icon: <RefreshCcw size={20} />, 
    label: 'Real-time sync', 
    desc: 'Bidirectional data flow with your ERP — zero manual entry.',
    accent: '#3666ff'
  },
  { 
    icon: <Lock size={20} />, 
    label: 'Encrypted transfers', 
    desc: 'End-to-end TLS-secured data propagation across every system.',
    accent: '#3666ff'
  },
  { 
    icon: <Zap size={20} />, 
    label: 'Sub-second latency', 
    desc: 'Changes reflect instantly across POs, invoices, and receipts.',
    accent: '#3666ff'
  },
];

function nodeXY(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    nx: Math.round(CX + RADIUS * Math.cos(rad)),
    ny: Math.round(CY + RADIUS * Math.sin(rad)),
  };
}

export default function IntegrationsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const orb1Y    = useTransform(scrollYProgress, [0, 1], [120,  -120]);
  const orb2Y    = useTransform(scrollYProgress, [0, 1], [80,   -80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30,   -30]);

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', width: '100%', padding: '160px 0 128px', overflow: 'hidden', background: '#ffffff', zIndex: 1 }}
    >
      {/* Bokeh orbs */}
      <motion.div style={{ y: orb1Y, position: 'absolute', top: '0%', left: '-6%', width: 760, height: 760, borderRadius: '50%', background: 'radial-gradient(circle, rgba(54,102,255,0.10) 0%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />
      <motion.div style={{ y: orb2Y, position: 'absolute', bottom: '-8%', right: '-4%', width: 660, height: 660, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,184,132,0.12) 0%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />

      <motion.div style={{ y: contentY, position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Header + Cards */}
          <div className="flex flex-col items-start space-y-12">
            <SectionHeader 
              label="Seamless Integration"
              title={<>Integrate with every system in your stack.</>}
              description="Track goods from source to delivery to payment on a single platform. Connect with leading ERP and accounting systems worldwide."
              accentColor="#3666ff"
              align="left"
            />

            <div className="flex flex-col gap-6 w-full max-w-lg">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  style={{ 
                    position: 'relative',
                    display: 'flex', 
                    flexDirection: 'row',
                    alignItems: 'flex-start', 
                    gap: 20, 
                    padding: '24px 28px', 
                    borderRadius: 20, 
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    backdropFilter: 'blur(20px)',
                    textAlign: 'left',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px -2px rgba(0,0,0,0.03)',
                  }}
                  className="group"
                >
                  {/* Hover Glow Beam */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3666ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    <motion.div 
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#3666ff]/40 to-transparent"
                    />
                  </div>

                  <div style={{ 
                    color: '#3666ff',
                    flexShrink: 0, 
                    marginTop: 4,
                    opacity: 0.9,
                    transition: 'all 0.3s ease'
                  }} className="group-hover:scale-110">
                    {h.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#000000', marginBottom: 6, letterSpacing: '-0.01em' }}>
                      {h.label}
                    </div>
                    <div style={{ fontSize: 13, color: '#808080', lineHeight: 1.6, fontWeight: 300 }}>
                      {h.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Hub Diagram */}
          <div className="relative w-full flex justify-center lg:justify-end pt-24">
            <div 
              className="scale-[0.7] lg:scale-[0.8] origin-center lg:origin-center"
              style={{ position: 'relative', width: 620, height: 620, maxWidth: '100%' }}
            >
              {/* Static Back Glow for Hub */}
              <div
                style={{
                  position: 'absolute',
                  top: CY - 120,
                  left: CX - 120,
                  width: 240,
                  height: 240,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(54,102,255,0.12) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />

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
                        <stop offset="0%"   stopColor="#3666ff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3666ff" stopOpacity="0.05" />
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

                <circle cx={CX} cy={CY} r={RADIUS + 34} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                <circle cx={CX} cy={CY} r={RADIUS + 66} fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />

                {integrations.map((intg) => {
                  const { nx, ny } = nodeXY(intg.angle);
                  return (
                    <g key={`line-group-${intg.name}`}>
                      {/* Static Base Line */}
                      <line
                        x1={CX} y1={CY} x2={nx} y2={ny}
                        stroke={`url(#grad-${intg.name})`}
                        strokeWidth="1.5"
                        opacity="0.6"
                      />
                      {/* Flowing Energy Line */}
                      <motion.line
                        x1={CX} y1={CY} x2={nx} y2={ny}
                        stroke="#3666ff"
                        strokeWidth="1.5"
                        strokeDasharray="4 12"
                        animate={{ strokeDashoffset: [-100, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        opacity="0.3"
                      />
                    </g>
                  );
                })}

                {integrations.map((intg, i) => (
                  <circle
                    key={`pkt-${intg.name}`}
                    r="3.5"
                    fill="#3666ff"
                    filter={`url(#glow-${intg.name})`}
                  >
                    <animateMotion
                      dur={`${2.2 + i * 0.3}s`}
                      begin={`${i * 0.4}s`}
                      repeatCount="indefinite"
                    >
                      <mpath href={`#path-${intg.name}`} />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      values="0;0;1;1;0"
                      keyTimes="0;0.1;0.2;0.8;1"
                      dur={`${2.2 + i * 0.3}s`}
                      begin={`${i * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
              </svg>

              {/* Center hub - Constant and Stable */}
              <motion.div
                initial={{ opacity: 0, x: '-50%', y: '-50%' }}
                whileInView={{ opacity: 1, x: '-50%', y: '-50%' }}
                transition={{ duration: 0.8 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  zIndex: 25,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 146,
                  height: 146,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #f8faff 100%)',
                  border: '1px solid rgba(54,102,255,0.25)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 60px rgba(54,102,255,0.12), 0 10px 30px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ 
                  position: 'absolute', 
                  inset: -1, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
                  pointerEvents: 'none'
                }} />
                
                <span style={{ fontSize: 18, fontWeight: 500, color: '#000000', letterSpacing: '-0.025em', position: 'relative' }}>
                  fact<span style={{ fontWeight: 300 }}>wise</span>
                </span>
                <div style={{ fontSize: 10, color: '#3666ff', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, position: 'relative', opacity: 0.8 }}>
                  Hub
                </div>
              </motion.div>

              {/* Integration nodes */}
              {integrations.map((intg, i) => {
                const { nx, ny } = nodeXY(intg.angle);
                return (
                  <motion.div
                    key={intg.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      opacity: { delay: i * 0.08 },
                      scale: { delay: i * 0.08 },
                      y: {
                        duration: 3.5 + i * 0.25,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    whileHover={{ 
                      scale: 1.08, 
                      zIndex: 40,
                      boxShadow: `0 25px 50px -12px rgba(0,0,0,0.08), 0 0 20px -2px ${intg.color}15`,
                      borderColor: `${intg.color}40`,
                    }}
                    style={{
                      position: 'absolute',
                      top: ny - HALF,
                      left: nx - HALF,
                      width: NODE,
                      height: NODE,
                      zIndex: 10,
                      borderRadius: 24,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `#ffffff`,
                      border: `1px solid rgba(0,0,0,0.05)`,
                      backdropFilter: 'blur(20px)',
                      boxShadow: `0 12px 30px -10px rgba(0,0,0,0.05), 0 4px 10px -2px rgba(0,0,0,0.02)`,
                      cursor: 'pointer',
                      transition: 'border-color 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  >
                    <motion.div
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2.5 + i * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: intg.color,
                        marginBottom: 10,
                        boxShadow: `0 0 15px ${intg.color}60`,
                      }}
                    />
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#000000', letterSpacing: '-0.01em' }}>
                      {intg.name}
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 500, color: '#999', marginTop: 3, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                      {intg.category}
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


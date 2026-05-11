'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, animate } from 'framer-motion';
import { RefreshCcw, Lock, Zap, ArrowRight, Link as LinkIcon } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { GLOBAL_LAYOUT } from './LayoutConfig';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ── Constants ──────────────────────────────────── */
const CX = 360;       // Center
const CY = 360;       // Center
const RADIUS = 280;   // spoke length
const NODE = 92;      // node size
const HALF = NODE / 2;

/* ── Data ───────────────────────────────────────── */
const integrations = [
  { 
    id: 1, name: 'SAP', color: '#0FAAFF', category: 'ERP', angle: -90,
    content: 'Unified enterprise resource planning with real-time financial tracking and inventory management.',
    status: 'active', energy: 96, relatedIds: [4, 7]
  },
  { 
    id: 2, name: 'Oracle', color: '#F80000', category: 'ERP', angle: -45,
    content: 'Cloud-based business applications providing deep insights into global procurement and spend.',
    status: 'active', energy: 88, relatedIds: [5, 8]
  },
  { 
    id: 3, name: 'Dynamics', color: '#0078D4', category: 'ERP', angle: 0,
    content: 'Microsoft-integrated business logic for seamless cross-departmental data synchronization.',
    status: 'active', energy: 92, relatedIds: [1, 2]
  },
  { 
    id: 4, name: 'Workday', color: '#005CB9', category: 'Finance', angle: 45,
    content: 'Connect procurement spend with human capital and financial planning. Optimize headcount and resource allocation.',
    status: 'active', energy: 75, relatedIds: [2, 7]
  },
  { 
    id: 5, name: 'NetSuite', color: '#3288C1', category: 'Cloud', angle: 90,
    content: 'Comprehensive cloud ERP for mid-market businesses seeking total visibility into their supply chain.',
    status: 'active', energy: 94, relatedIds: [4, 6]
  },
  { 
    id: 6, name: 'Coupa', color: '#E87722', category: 'Sourcing', angle: 135,
    content: 'Business spend management platform focused on operational efficiency and sustainable sourcing.',
    status: 'active', energy: 82, relatedIds: [7, 8]
  },
  { 
    id: 7, name: 'Ariba', color: '#0070C0', category: 'Sourcing', angle: 180,
    content: 'Strategic sourcing and network integration for high-volume enterprise procurement workflows.',
    status: 'active', energy: 90, relatedIds: [1, 4]
  },
  { 
    id: 8, name: 'Infor', color: '#7B2D8B', category: 'ERP', angle: -135,
    content: 'Industry-specific business applications designed for complex manufacturing and distribution.',
    status: 'active', energy: 85, relatedIds: [2, 3]
  },
];

const highlights = [
  { icon: <RefreshCcw size={20} />, label: 'Real-time sync', desc: 'Bidirectional data flow with your ERP — zero manual entry.' },
  { icon: <Lock size={20} />, label: 'Encrypted transfers', desc: 'End-to-end TLS-secured data propagation across every system.' },
  { icon: <Zap size={20} />, label: 'Sub-second latency', desc: 'Changes reflect instantly across POs, invoices, and receipts.' },
];

export default function IntegrationsShowcase() {
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  
  // Rotation Motion Values
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 45, damping: 20, mass: 1 });
  
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const orb1Y    = useTransform(scrollYProgress, [0, 1], [120,  -120]);
  const orb2Y    = useTransform(scrollYProgress, [0, 1], [80,   -80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30,   -30]);

  // Benefit-to-Integration Mapping
  const highlightMappings = [
    [1, 2, 3], // Real-time sync -> ERPs (SAP, Oracle, Dynamics)
    [4, 5],    // Encrypted transfers -> Finance/Cloud (Workday, NetSuite)
    [6, 7, 8], // Sub-second latency -> Sourcing/ERP (Coupa, Ariba, Infor)
  ];

  // Auto-rotation controller
  useEffect(() => {
    let controls;
    if (autoRotate) {
      controls = animate(rotation, rotation.get() + 360, {
        duration: 90,
        repeat: Infinity,
        ease: "linear"
      });
    }
    return () => controls?.stop();
  }, [autoRotate, rotation]);

  const handleNodeClick = (id: number, angle: number) => {
    setActiveHighlightIndex(null); // Clear benefit filter on node click
    if (activeNodeId === id) {
      setActiveNodeId(null);
      setAutoRotate(true);
    } else {
      setActiveNodeId(id);
      setAutoRotate(false);
      rotation.set(rotation.get() % 360); 
      const target = -90 - angle;
      animate(rotation, target, { 
        type: "spring", 
        stiffness: 50, 
        damping: 18 
      });
    }
  };

  const handleHighlightClick = (index: number) => {
    if (activeHighlightIndex === index) {
      setActiveHighlightIndex(null);
    } else {
      setActiveHighlightIndex(index);
      setActiveNodeId(null); // Close any open cards
    }
  };

  const handleBackgroundClick = () => {
    setActiveNodeId(null);
    setActiveHighlightIndex(null);
    setAutoRotate(true);
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleBackgroundClick}
      className="relative w-full overflow-hidden bg-white z-10"
      style={{ padding: '120px 0 128px' }}
    >
      {/* Bokeh orbs */}
      <motion.div style={{ y: orb1Y }} className="absolute top-0 -left-[6%] w-[760px] h-[760px] rounded-full bg-[radial-gradient(circle,rgba(54,102,255,0.1)0%,transparent70%)] blur-[90px] pointer-events-none" />
      <motion.div style={{ y: orb2Y }} className="absolute -bottom-[8%] -right-[4%] w-[660px] h-[660px] rounded-full bg-[radial-gradient(circle,rgba(0,184,132,0.12)0%,transparent70%)] blur-[90px] pointer-events-none" />

      <motion.div style={{ y: contentY }} className="max-w-[1440px] mx-auto px-10 relative z-10 flex flex-col items-center">
        
        {/* Centered Header */}
        <div className="w-full max-w-3xl mb-12 text-center">
          <SectionHeader 
            label="Seamless Integration"
            title="Integrate with every system in your stack."
            description="Track goods from source to delivery to payment on a single platform. Connect with leading ERP and accounting systems worldwide."
            accentColor="#3666ff"
            align="center"
          />
        </div>
        
        {/* Row Layout: Cards on Left, Hub on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
          
          {/* Left Column: Stacked Cards (5/12 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full max-w-md mx-auto lg:mx-0 lg:translate-x-16">
            {highlights.map((h, i) => {
              const isActive = activeHighlightIndex === i;
              return (
                <motion.div
                  key={h.label}
                  onClick={(e) => { e.stopPropagation(); handleHighlightClick(i); }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10, scale: 1.01 }}
                  className={`group relative flex items-start gap-6 p-7 rounded-[32px] cursor-pointer transition-all duration-500 border overflow-hidden
                    ${isActive 
                      ? 'bg-white border-[#3666ff]/40 shadow-[0_20px_50px_-15px_rgba(54,102,255,0.15)] ring-1 ring-[#3666ff]/10' 
                      : 'bg-[#F8FAFF]/50 border-gray-100 shadow-sm hover:shadow-xl hover:bg-white hover:border-[#3666ff]/20'
                    }
                  `}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(54,102,255,0.08),transparent_70%)] transition-opacity duration-500 
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `} />

                  <div className={`relative z-10 text-[#3666ff] w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 
                    ${isActive ? 'bg-[#3666ff] text-white scale-110 shadow-lg' : 'bg-white text-[#3666ff] shadow-sm border border-gray-100 group-hover:scale-110 group-hover:rotate-3 group-hover:border-[#3666ff]/30'}
                  `}>
                    {h.icon}
                  </div>
                  <div className="relative z-10 flex flex-col pt-1">
                    <span className={`text-[16px] font-bold mb-2 transition-colors duration-300 ${isActive ? 'text-[#3666ff]' : 'text-[#1A1D2E]'}`}>{h.label}</span>
                    <span className="text-[13px] text-[#7B82A8] leading-relaxed font-medium">{h.desc}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Orbital Hub (7/12 cols) */}
          <div className="lg:col-span-7 relative w-full flex justify-center items-center min-h-[540px]">
            <div className="scale-[0.65] lg:scale-[0.75] xl:scale-[0.85] origin-center relative w-[720px] h-[720px]">
              
              {/* Central hub - STATIC */}
              <motion.div 
                animate={{ 
                  opacity: activeNodeId ? 0.05 : (activeHighlightIndex !== null ? 0.4 : 1),
                  filter: activeNodeId ? 'blur(8px)' : 'blur(0px)',
                  scale: activeNodeId ? 0.9 : 1
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center w-[154px] h-[154px] rounded-full bg-white border border-[#3666ff]/20 shadow-[0_0_60px_rgba(54,102,255,0.08),0_20px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-baseline">
                  <span className="text-[20px] font-bold text-[#1A1D2E] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Fact</span>
                  <span className="text-[20px] font-light text-[#1A1D2E] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Wise</span>
                </div>
                <div className="mt-2 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100/50">
                  <span className="text-[8px] text-[#3666ff] uppercase tracking-[0.25em] font-black">Hub</span>
                </div>
              </motion.div>

                {/* ROTATING CONTAINER */}
                <motion.div 
                  style={{ rotate: smoothRotation }} 
                  className="absolute inset-0 w-full h-full flex items-center justify-center z-40"
                >
                  {/* SVG Lines & Flow */}
                  <svg viewBox="0 0 720 720" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                    <defs>
                      <marker id="arrow-out" markerWidth="8" markerHeight="8" refX="15" refY="4" orient="auto">
                        <path d="M0,0 L8,4 L0,8" fill="#3666ff" fillOpacity="0.8" />
                      </marker>
                      <marker id="arrow-in" markerWidth="8" markerHeight="8" refX="-7" refY="4" orient="auto">
                        <path d="M8,0 L0,4 L8,8" fill="#3666ff" fillOpacity="0.4" />
                      </marker>
                      <filter id="packet-glow">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {integrations.map((intg, i) => {
                      const rad = (intg.angle * Math.PI) / 180;
                      const activeRadius = activeNodeId ? 280 : 232;
                      
                      const isBenefitRelated = activeHighlightIndex !== null && highlightMappings[activeHighlightIndex].includes(intg.id);
                      const isDimmed = (activeHighlightIndex !== null && !isBenefitRelated) || (activeNodeId !== null && activeNodeId !== intg.id);

                      const targetX = CX + activeRadius * Math.cos(rad);
                      const targetY = CY + activeRadius * Math.sin(rad);

                      return (
                        <g key={intg.id}>
                          {/* 1. Background Spoke Line */}
                          <motion.line 
                            initial={false}
                            animate={{ 
                              x2: targetX,
                              y2: targetY,
                              opacity: isDimmed ? 0.05 : 0.1
                            }}
                            x1={CX} y1={CY} 
                            stroke="#3666ff" strokeWidth="1"
                          />
                          
                          {/* 2. OUTGOING STREAMING ARROWS (Hub -> Node) */}
                          {!isDimmed && (
                            <motion.line 
                              initial={false}
                              animate={{ 
                                x2: targetX,
                                y2: targetY,
                                opacity: isBenefitRelated ? 0.8 : 0.4,
                                strokeDashoffset: [0, -40] 
                              }}
                              x1={CX} y1={CY} 
                              stroke="#3666ff" 
                              strokeWidth="2.5" 
                              strokeDasharray="4 12" 
                              markerEnd="url(#arrow-out)"
                              transition={{ 
                                strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" },
                                x2: { type: "spring", damping: 25, stiffness: 120 },
                                y2: { type: "spring", damping: 25, stiffness: 120 }
                              }} 
                            />
                          )}

                          {/* 3. INCOMING STREAMING ARROWS (Node -> Hub) */}
                          {!isDimmed && (
                            <motion.line 
                              initial={false}
                              animate={{ 
                                x2: targetX,
                                y2: targetY,
                                opacity: isBenefitRelated ? 0.6 : 0.2,
                                strokeDashoffset: [0, 40] 
                              }}
                              x1={CX} y1={CY} 
                              stroke="#3666ff" 
                              strokeWidth="1.5" 
                              strokeDasharray="3 15" 
                              markerStart="url(#arrow-in)"
                              transition={{ 
                                strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
                                x2: { type: "spring", damping: 25, stiffness: 120 },
                                y2: { type: "spring", damping: 25, stiffness: 120 }
                              }} 
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                {/* Nodes */}
                {integrations.map((intg) => {
                  const rad = (intg.angle * Math.PI) / 180;
                  const isExpanded = activeNodeId === intg.id;
                  const activeRadius = activeNodeId ? 280 : 232; // Dynamic Radius
                  
                  const isBenefitRelated = activeHighlightIndex !== null && highlightMappings[activeHighlightIndex].includes(intg.id);
                  const isDimmed = (activeHighlightIndex !== null && !isBenefitRelated) || (activeNodeId !== null && !isExpanded);

                  return (
                    <motion.div
                      key={intg.id}
                      onClick={(e) => { e.stopPropagation(); handleNodeClick(intg.id, intg.angle); }}
                      initial={false}
                      animate={{ 
                        left: CX + activeRadius * Math.cos(rad) - HALF,
                        top: CY + activeRadius * Math.sin(rad) - HALF,
                        opacity: isDimmed ? 0.8 : 1,
                        scale: isBenefitRelated ? [1, 1.05, 1] : (isExpanded ? 1.05 : 1),
                        boxShadow: isBenefitRelated ? '0 0 30px rgba(54,102,255,0.3)' : (isExpanded ? '0 15px 30px rgba(0,0,0,0.08)' : '0 1px 2px rgba(0,0,0,0.05)')
                      }}
                      transition={{ 
                        left: { type: "spring", damping: 25, stiffness: 120 },
                        top: { type: "spring", damping: 25, stiffness: 120 },
                        scale: isBenefitRelated ? { duration: 2, repeat: Infinity } : { duration: 0.3 }
                      }}
                      style={{ 
                        rotate: useTransform(smoothRotation, (v) => -v),
                        borderColor: isExpanded || isBenefitRelated ? intg.color : 'rgba(0,0,0,0.05)'
                      }}
                      className={`absolute w-[92px] h-[92px] rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-colors
                        ${isExpanded ? 'bg-white border-2 z-50 shadow-xl' : 'bg-white border z-20 hover:border-[#3666ff]/30 hover:shadow-lg'}
                        ${isBenefitRelated ? 'border-2' : ''}
                      `}
                    >
                      <motion.div 
                        animate={{ 
                          scale: isBenefitRelated ? [1, 1.4, 1] : [1, 1.2, 1], 
                          opacity: isBenefitRelated ? [0.8, 1, 0.8] : [0.7, 1, 0.7] 
                        }} 
                        transition={{ duration: isBenefitRelated ? 1.5 : 2.5, repeat: Infinity }} 
                        style={{ background: intg.color }} 
                        className="w-2.5 h-2.5 rounded-full mb-2.5" 
                      />
                      <span className="text-[13px] font-semibold text-black tracking-tight">{intg.name}</span>
                      <span className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wider font-medium">{intg.category}</span>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Central Expanded Card Overlay - More Compact for better reach */}
              <AnimatePresence>
                {activeNodeId && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
                    animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                    exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="absolute top-1/2 left-1/2 z-[100] pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(() => {
                      const intg = integrations.find(i => i.id === activeNodeId);
                      if (!intg) return null;
                      return (
                        <Card className="w-[280px] bg-white/98 backdrop-blur-2xl border-gray-200/60 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] rounded-[32px] overflow-hidden">
                          <CardHeader className="pb-2 pt-6 px-6">
                            <div className="flex justify-between items-center mb-3">
                              <Badge style={{ background: `${intg.color}10`, color: intg.color }} className="px-2 py-0.5 text-[9px] font-bold rounded-full uppercase border-none">{intg.status}</Badge>
                              <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Core</span>
                            </div>
                            <CardTitle className="text-lg font-bold text-gray-900">{intg.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="px-6 pb-8">
                            <p className="text-[12px] text-gray-600 leading-relaxed opacity-90 mb-6">{intg.content}</p>
                            
                            <div className="space-y-5">
                              <div className="pt-5 border-t border-gray-100">
                                <div className="flex justify-between items-center text-[9px] mb-2 font-bold text-gray-400 uppercase tracking-widest">
                                  <span className="flex items-center"><Zap size={10} className="mr-2" style={{ color: intg.color }} />Strength</span>
                                  <span style={{ color: intg.color }} className="font-mono text-xs">{intg.energy}%</span>
                                </div>
                                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                  <motion.div initial={{ width: 0 }} animate={{ width: `${intg.energy}%` }} transition={{ duration: 1.2, ease: "circOut" }} className="h-full" style={{ background: intg.color }} />
                                </div>
                              </div>

                              <div className="pt-5 border-t border-gray-100">
                                <div className="flex items-center mb-3">
                                  <LinkIcon size={10} className="text-gray-400 mr-2" />
                                  <h4 className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Related</h4>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {intg.relatedIds.slice(0, 2).map((relId) => {
                                    const related = integrations.find(ri => ri.id === relId);
                                    return (
                                      <Button 
                                        key={relId} 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => {
                                          const relatedAngle = related?.angle ?? 0;
                                          handleNodeClick(relId, relatedAngle);
                                        }}
                                        className="h-7 px-3 text-[10px] font-semibold rounded-full border-gray-100 bg-gray-50/50 hover:bg-white transition-all flex items-center shadow-sm"
                                      >
                                        {related?.name} <ArrowRight size={8} className="ml-1.5 opacity-40" />
                                      </Button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

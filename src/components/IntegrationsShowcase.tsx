'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeader from './SectionHeader';

export default function IntegrationsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Staggered node entrance
  useEffect(() => {
    const nodes = sectionRef.current?.querySelectorAll(".anim-node");
    nodes?.forEach((n, i) => {
      const el = n as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      el.style.transition = `opacity 0.6s ${i * 0.06}s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s ${i * 0.06}s cubic-bezier(0.22, 1, 0.36, 1)`;
      
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  }, []);

  const PATHS = [
    { d: "M 192,64  H 736",               dur: 3.8, begin: 0,    begin2: 1.9 },
    { d: "M 334,64  V 150",               dur: 1.0, begin: 0.3 },
    { d: "M 730,64  V 150",               dur: 1.0, begin: 0.7 },
    { d: "M 334,186 V 270 H 468",         dur: 2.0, begin: 0.5 },
    { d: "M 730,186 V 270 H 594",         dur: 2.0, begin: 0.9 },
    { d: "M 392,270 H 468",               dur: 1.4, begin: 0.6 },
    { d: "M 594,270 H 670",               dur: 1.1, begin: 0.2 },
    { d: "M 832,270 H 876",               dur: 0.8, begin: 1.4 },
    { d: "M 530,308 V 352",               dur: 1.0, begin: 0.8 },
    { d: "M 530,388 V 418 H 444 V 438",   dur: 1.3, begin: 0.4 },
    { d: "M 530,388 V 438",               dur: 1.0, begin: 0.8 },
    { d: "M 530,388 V 418 H 616 V 438",   dur: 1.3, begin: 1.1 },
  ];

  // Pill node helper
  const Pill = ({ x, y, w, h = 36, label, rx = 9, large = false }: { x: number, y: number, w: number, h?: number, label: string, rx?: number, large?: boolean }) => {
    const defaultFill = large ? "#3666ff" : "#FFFFFF";
    const defaultStroke = large ? "none" : "#E2E8F0";
    const defaultText = large ? "#FFFFFF" : "#475569";
    const fontSize = large ? 19 : 13;
    const fontWeight = large ? "800" : "600";

    return (
      <g className="anim-node" style={{ cursor: "default" }}>
        {large && (
          <>
            {/* Soft pulsing glow behind main hub */}
            <rect x={x - 22} y={y - h / 2 - 22} width={w + 44} height={h + 44} rx={22}
              fill="#3666ff" opacity={0.06} />
            <rect x={x - 12} y={y - h / 2 - 12} width={w + 24} height={h + 24} rx={18}
              fill="#3666ff" opacity={0.1} />
          </>
        )}
        <rect
          x={x} y={y - h / 2} width={w} height={h} rx={rx}
          fill={defaultFill}
          stroke={defaultStroke}
          strokeWidth={large ? 0 : 1.5}
          style={{ transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
          onMouseEnter={e => {
            if (!large) {
              e.currentTarget.style.stroke = "#3666ff";
              e.currentTarget.style.fill = "#F8FAFF";
              const txt = e.currentTarget.parentElement?.querySelector("text");
              if (txt) {
                txt.style.fill = "#3666ff";
                txt.style.fontWeight = "700";
              }
            } else {
              e.currentTarget.style.filter = "brightness(1.08) saturate(1.05)";
            }
          }}
          onMouseLeave={e => {
            if (!large) {
              e.currentTarget.style.stroke = defaultStroke;
              e.currentTarget.style.fill = defaultFill;
              const txt = e.currentTarget.parentElement?.querySelector("text");
              if (txt) {
                txt.style.fill = defaultText;
                txt.style.fontWeight = "600";
              }
            } else {
              e.currentTarget.style.filter = "none";
            }
          }}
        />
        {large && (
          <rect x={x + 1} y={y - h / 2 + 1} width={w - 2} height={h * 0.35} rx={rx}
            fill="rgba(255,255,255,0.12)" pointerEvents="none" />
        )}
        <text
          x={x + w / 2} y={y}
          dominantBaseline="central" textAnchor="middle"
          fill={defaultText} fontSize={fontSize}
          fontFamily="Inter, sans-serif" fontWeight={fontWeight}
          letterSpacing="-0.015em"
          style={{ transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)", pointerEvents: "none" }}
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 bg-white overflow-hidden"
    >
      {/* Background Glows & Noise */}
      <div 
        className="absolute -right-32 -bottom-32 w-[800px] h-[800px] rounded-full pointer-events-none opacity-40"
        style={{ 
          background: 'radial-gradient(circle, rgba(54, 102, 255, 0.2) 0%, rgba(54, 102, 255, 0.05) 30%, transparent 70%)',
          willChange: 'opacity'
        }} 
      />
      <div 
        className="absolute -left-32 -top-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
        style={{ 
          background: 'radial-gradient(circle, rgba(54, 102, 255, 0.15) 0%, transparent 70%)',
        }} 
      />
      <div className="absolute inset-0 noise opacity-20 pointer-events-none" />

      <motion.div 
        style={{ y: contentY }}
        className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10"
      >
        <div className="mb-24">
          <SectionHeader 
            label="Integrations"
            title={
              <>
                Connect to existing systems. <span className="text-[#3666ff]">Orchestrate workflows across multiple agents.</span>
              </>
            }
            description="FactWise bridges every data source and every tool — one protocol, zero rewiring. Orchestrate workflows across multiple agents, build custom pipelines, and connect to third parties using APIs, partner apps or pre-built integrations."
            align="center"
          />
        </div>

        <div
          ref={sectionRef}
          className="relative w-full"
        >
          {/* Dot grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.4]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(54, 102, 255, 0.12) 1.5px, transparent 1.5px)",
              backgroundSize: "26px 26px",
            }}
          />

          <div className="relative z-10">
            <svg
              viewBox="0 0 945 530"
              className="w-full max-w-[945px] mx-auto overflow-visible block"
              xmlns="http://www.w3.org/2000/svg"
            >
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes flipCard3D {
                  0%, 35% {
                    transform: rotateY(0deg);
                  }
                  45%, 85% {
                    transform: rotateY(180deg);
                  }
                  95%, 100% {
                    transform: rotateY(360deg);
                  }
                }
                .flip-container {
                  perspective: 1000px;
                  width: 48px;
                  height: 48px;
                }
                .flip-card-inner {
                  position: relative;
                  width: 100%;
                  height: 100%;
                  text-align: center;
                  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                  transform-style: preserve-3d;
                  animation: flipCard3D 6s infinite ease-in-out;
                }
                .flip-card-front, .flip-card-back {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  backface-visibility: hidden;
                  border-radius: 10px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                }
                .flip-card-front {
                  transform: rotateY(0deg);
                }
                .flip-card-back {
                  transform: rotateY(180deg);
                }
              `}} />

              {/* ── Dashed connection paths ── */}
              <g fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.48">
                <path d="M 192,64  H 736" />
                <path d="M 334,64  V 150" />
                <path d="M 730,64  V 150" />
                <path d="M 334,186 V 270 H 468" />
                <path d="M 730,186 V 270 H 594" />
                <path d="M 132,270 H 234" />
                <path d="M 392,270 H 468" />
                <path d="M 594,270 H 670" />
                <path d="M 832,270 H 876" />
                <path d="M 530,308 V 352" />
                <path d="M 530,388 V 418 H 444 V 438" />
                <path d="M 530,388 V 438" />
                <path d="M 530,388 V 418 H 616 V 438" />
              </g>

              {/* ── Junction dots ── */}
              <circle cx="334" cy="64"  r="4" fill="#3666ff" />
              <circle cx="730" cy="64"  r="4" fill="#3666ff" />
              <circle cx="530" cy="388" r="4" fill="#3666ff" />

              {/* ── Animated traveling dots ── */}
              {PATHS.map(({ d, dur, begin, begin2 }, i) => (
                <g key={i}>
                  <circle r="3.5" fill="#3666ff" opacity="0">
                    <animateMotion path={d} dur={`${dur}s`} repeatCount="indefinite" begin={`${begin}s`} />
                    <animate attributeName="opacity" values="0;1;1;0"
                      keyTimes="0;0.07;0.93;1" dur={`${dur}s`}
                      repeatCount="indefinite" begin={`${begin}s`} />
                  </circle>
                  {begin2 !== undefined && (
                    <circle r="3.5" fill="#3666ff" opacity="0">
                      <animateMotion path={d} dur={`${dur}s`} repeatCount="indefinite" begin={`${begin2}s`} />
                      <animate attributeName="opacity" values="0;1;1;0"
                        keyTimes="0;0.07;0.93;1" dur={`${dur}s`}
                        repeatCount="indefinite" begin={`${begin2}s`} />
                    </circle>
                  )}
                </g>
              ))}

              {/* ── App icon grid (far left) ── */}
              <rect x="5" y="217" width="123" height="110" rx="14"
                fill="none" stroke="#3666ff" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.25" />
              {[
                {
                  x: 12,
                  y: 222,
                  front: { bg: "#312E81", label: "X", tc: "#a5b4fc", fs: 20, fw: "400" },
                  back: { bg: "#0052CC", label: "JR", tc: "#ffffff", fs: 16, fw: "700" },
                  delay: "0s"
                },
                {
                  x: 68,
                  y: 222,
                  front: { bg: "#065F46", label: "↑", tc: "#6EE7B7", fs: 22, fw: "400" },
                  back: { bg: "#FF7A59", label: "HS", tc: "#ffffff", fs: 16, fw: "700" },
                  delay: "0.3s"
                },
                {
                  x: 12,
                  y: 278,
                  front: { bg: "#991B1B", label: "RC", tc: "#FCA5A5", fs: 13, fw: "700" },
                  back: { bg: "#4A154B", label: "SL", tc: "#ffffff", fs: 16, fw: "700" },
                  delay: "0.6s"
                },
                {
                  x: 68,
                  y: 278,
                  front: { bg: "#5B21B6", label: "▶", tc: "#DDD6FE", fs: 18, fw: "400" },
                  back: { bg: "#635BFF", label: "ST", tc: "#ffffff", fs: 16, fw: "700" },
                  delay: "0.9s"
                }
              ].map(({ x, y, front, back, delay }, i) => (
                <foreignObject key={i} x={x} y={y} width="48" height="48" className="anim-node">
                  <div className="flip-container select-none">
                    <div className="flip-card-inner" style={{ animationDelay: delay }}>
                      {/* Front Face */}
                      <div className="flip-card-front" style={{ backgroundColor: front.bg }}>
                        <span 
                          style={{ 
                            color: front.tc, 
                            fontSize: `${front.fs}px`, 
                            fontWeight: front.fw,
                            fontFamily: "Inter, sans-serif"
                          }}
                        >
                          {front.label}
                        </span>
                      </div>
                      {/* Back Face */}
                      <div className="flip-card-back" style={{ backgroundColor: back.bg }}>
                        <span 
                          style={{ 
                            color: back.tc, 
                            fontSize: `${back.fs}px`, 
                            fontWeight: back.fw,
                            fontFamily: "Inter, sans-serif"
                          }}
                        >
                          {back.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </foreignObject>
              ))}

              {/* ── TOP ROW (cy=64) ── */}
              <Pill x={158} y={64} w={68}  label="ERP" />
              <Pill x={248} y={64} w={72}  label="CRM" />
              <Pill x={338} y={64} w={128} label="Subscriptions" />
              <Pill x={490} y={64} w={130} label="Legacy billing" />
              <Pill x={648} y={64} w={152} label="Booking system" />

              {/* ── MIDDLE ROW (cy=168) ── */}
              <Pill x={296}  y={168} w={76}  label="SDK" />
              <Pill x={636}  y={168} w={188} label="Event Destinations" />

              {/* ── MAIN ROW (cy=270) ── */}
              <Pill x={234}  y={270} w={158} label="App Marketplace ↗" />

              {/* CENTER HUB — FactWise */}
              <Pill x={456} y={270} w={148} h={76} rx={18} label="FactWise" large />

              <Pill x={670}  y={270} w={162} label="Data Pipeline" />

              {/* Snowflake-style icon */}
              <g className="anim-node" style={{ cursor: "default" }}>
                <rect x={876} y={248} width={60} height={44} rx={11}
                  fill="#FFFFFF" stroke="#E2E8F0" strokeWidth={1.5}
                  style={{ transition: "stroke 0.3s ease, fill 0.3s ease" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.stroke = "#3666ff";
                    e.currentTarget.style.fill = "#F8FAFF";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.stroke = "#E2E8F0";
                    e.currentTarget.style.fill = "#FFFFFF";
                  }}
                />
                <line x1={906} y1={256} x2={906} y2={284} stroke="#3666ff" strokeWidth={2.5} strokeLinecap="round" pointerEvents="none" />
                <line x1={894} y1={263} x2={918} y2={277} stroke="#3666ff" strokeWidth={2.5} strokeLinecap="round" pointerEvents="none" />
                <line x1={918} y1={263} x2={894} y2={277} stroke="#3666ff" strokeWidth={2.5} strokeLinecap="round" pointerEvents="none" />
                <circle cx={906} cy={270} r={3.5} fill="#3666ff" pointerEvents="none" />
              </g>

              {/* ── ORCHESTRATION (cy=370) ── */}
              <Pill x={468} y={370} w={124} label="Orchestration" />

              {/* ── PSP × 3 (cy=456) ── */}
              <Pill x={410} y={456} w={68} label="PSP" />
              <Pill x={496} y={456} w={68} label="PSP" />
              <Pill x={582} y={456} w={68} label="PSP" />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

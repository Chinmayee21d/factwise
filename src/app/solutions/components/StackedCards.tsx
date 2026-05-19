"use client";

import React, { useRef, useLayoutEffect, useCallback } from "react";
import {
  Brain,
  BarChart3,
  GitMerge,
  ShieldCheck,
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";

/* ─── Card data ─────────────────────────────────────────────────── */
const CARDS = [
  {
    index: 1,
    badge: "Sourcing Intelligence",
    headline: "Turn raw bids into clear decisions — in seconds.",
    body: "FactWise's AI engine normalises every quote, flags anomalies, and surfaces the best-value vendor before your team has finished their coffee.",
    icon: Brain,
    accent: "#3666ff",
    accentLight: "rgba(54,102,255,0.07)",
    accentBorder: "rgba(54,102,255,0.16)",
    stat: { value: "60%", label: "Faster sourcing cycles" },
    bullets: [
      "Automated bid normalisation across 1,000+ line items",
      "Real-time anomaly detection on vendor pricing",
      "AI-generated award recommendations with confidence scores",
    ],
    bg: "#ffffff",
  },
  {
    index: 2,
    badge: "Approval Automation",
    headline: "Zero bottlenecks. Every approval on autopilot.",
    body: "Dynamic routing sends every request to the right approver the moment it lands — no inbox chains, no missed escalations, full audit trail.",
    icon: GitMerge,
    accent: "#7c3aed",
    accentLight: "rgba(124,58,237,0.07)",
    accentBorder: "rgba(124,58,237,0.16)",
    stat: { value: "4×", label: "Faster approval cycles" },
    bullets: [
      "Multi-level conditional approval chains",
      "Org-hierarchy aware escalation logic",
      "Parallel and sequential routing modes",
    ],
    bg: "#fafbff",
  },
  {
    index: 3,
    badge: "Spend Analytics",
    headline: "See every dollar. Optimise every category.",
    body: "Live dashboards aggregate spend across every factory, supplier, and category — so you can spot savings opportunities the moment they appear.",
    icon: BarChart3,
    accent: "#0891b2",
    accentLight: "rgba(8,145,178,0.07)",
    accentBorder: "rgba(8,145,178,0.16)",
    stat: { value: "$2.4M", label: "Avg. annual savings surfaced" },
    bullets: [
      "Real-time spend visibility across all categories",
      "Historical pricing benchmarks per SKU",
      "ChatWise: ask the data anything in plain English",
    ],
    bg: "#f8fbff",
  },
  {
    index: 4,
    badge: "Compliance & Control",
    headline: "Audit-ready from day one. No extra work.",
    body: "3-way matching, SOW version control, and automated exception handling mean your AP team closes the month without surprises.",
    icon: ShieldCheck,
    accent: "#059669",
    accentLight: "rgba(5,150,105,0.07)",
    accentBorder: "rgba(5,150,105,0.16)",
    stat: { value: "100%", label: "PO–GRN–Invoice match rate" },
    bullets: [
      "Automated 3-way matching with 7 exception types",
      "Real-time ASN & GRN tracking",
      "Native ERP sync for payment execution",
    ],
    bg: "#f8fffc",
  },
];

const NUM_CARDS = CARDS.length;

/* ─── Animation config (mirrors ScrollStack props) ─────────────── */
const ITEM_DISTANCE    = 100;   // marginBottom between cards (px)
const ITEM_SCALE       = 0.03;  // scale increment per card depth
const ITEM_STACK_DIST  = 30;    // vertical offset between stacked cards (px)
const STACK_POSITION   = "20%"; // viewport % where cards pin
const SCALE_END_POS    = "10%"; // viewport % where scale finishes
const BASE_SCALE       = 0.85;  // minimum scale for the bottom card

/* ─── Section ───────────────────────────────────────────────────── */
export default function StackedCards() {
  const sectionRef   = useRef<HTMLElement>(null);
  const cardsRef     = useRef<HTMLElement[]>([]);
  const rafRef       = useRef<number | null>(null);
  const lastTxRef    = useRef<Map<number, { translateY: number; scale: number }>>(new Map());
  const isUpdatingRef = useRef(false);

  /* helpers ─────────────────────────────────────────────────────── */
  const parsePercentage = useCallback((value: string | number, containerH: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerH;
    }
    return parseFloat(value as string);
  }, []);

  const calcProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end)   return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  /* main update loop ─────────────────────────────────────────────── */
  const update = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const scrollTop      = window.scrollY;
    const containerH     = window.innerHeight;
    const stackPosPx     = parsePercentage(STACK_POSITION, containerH);
    const scaleEndPosPx  = parsePercentage(SCALE_END_POS,  containerH);

    const endEl = sectionRef.current?.querySelector<HTMLElement>(".sc-stack-end");
    const endElTop = endEl
      ? endEl.getBoundingClientRect().top + window.scrollY
      : 0;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop     = card.getBoundingClientRect().top + window.scrollY;
      const triggerStart = cardTop - stackPosPx  - ITEM_STACK_DIST * i;
      const triggerEnd   = cardTop - scaleEndPosPx;
      const pinStart     = cardTop - stackPosPx  - ITEM_STACK_DIST * i;
      const pinEnd       = endElTop - containerH / 2;

      const scaleProgress = calcProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale   = BASE_SCALE + i * ITEM_SCALE;
      const scale         = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPosPx + ITEM_STACK_DIST * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPosPx + ITEM_STACK_DIST * i;
      }

      const next = {
        translateY: Math.round(translateY * 100) / 100,
        scale:      Math.round(scale      * 1000) / 1000,
      };
      const last = lastTxRef.current.get(i);

      const changed =
        !last ||
        Math.abs(last.translateY - next.translateY) > 0.1 ||
        Math.abs(last.scale      - next.scale)      > 0.001;

      if (changed) {
        card.style.transform = `translate3d(0, ${next.translateY}px, 0) scale(${next.scale})`;
        lastTxRef.current.set(i, next);
      }
    });

    isUpdatingRef.current = false;
  }, [parsePercentage, calcProgress]);

  /* scroll listener ─────────────────────────────────────────────── */
  const onScroll = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(update);
  }, [update]);

  /* setup ────────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cardEls = Array.from(
      section.querySelectorAll<HTMLElement>(".sc-stack-card")
    );
    cardsRef.current = cardEls;

    cardEls.forEach((card, i) => {
      // spacing between cards
      if (i < cardEls.length - 1) {
        card.style.marginBottom = `${ITEM_DISTANCE}px`;
      }
      card.style.willChange        = "transform";
      card.style.transformOrigin   = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform         = "translateZ(0)";
    });

    // run once to set initial positions
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      cardsRef.current = [];
      lastTxRef.current.clear();
    };
  }, [update, onScroll]);

  return (
    <section ref={sectionRef} style={{ background: "#f1f5f9", paddingTop: 80 }}>

      {/* ── Section header ── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 72px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 16px", borderRadius: 999,
          background: "rgba(54,102,255,0.07)", border: "1px solid rgba(54,102,255,0.18)",
          marginBottom: 20,
        }}>
          <Zap size={12} color="#3666ff" />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3666ff" }}>
            Platform Capabilities
          </span>
        </div>

        <h2 style={{
          margin: "0 0 16px",
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#0b1322",
        }}>
          Everything you need.{" "}
          <span style={{ color: "#3666ff" }}>Nothing you don't.</span>
        </h2>

        <p style={{ margin: "0 auto", fontSize: 17, lineHeight: 1.7, color: "#64748b", maxWidth: 520 }}>
          Scroll through the four pillars that make FactWise the last procurement platform you'll ever need.
        </p>
      </div>

      {/* ── Cards container ── */}
      {/*
        Mirrors ScrollStack structure:
          .sc-stack-inner  → padding + min-height, holds all cards
          .sc-stack-card   → each card, gets translateY + scale applied
          .sc-stack-end    → sentinel that marks where pins release
      */}
      <div style={{ padding: "20vh 24px 0", minHeight: "100vh", maxWidth: 960, margin: "0 auto" }}>

        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.index}
              className="sc-stack-card"
              style={{
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 60px -20px rgba(0,0,0,0.14)",
                border: "1px solid rgba(15,23,42,0.07)",
                background: card.bg,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                position: "relative",
                zIndex: card.index,
              }}
            >
              {/* Left — text */}
              <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", gap: 22 }}>

                {/* Badge */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "5px 14px", borderRadius: 999,
                  background: card.accentLight, border: `1px solid ${card.accentBorder}`,
                  width: "fit-content",
                }}>
                  <Icon size={12} color={card.accent} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: card.accent }}>
                    {card.badge}
                  </span>
                </div>

                {/* Headline */}
                <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em", color: "#0b1322" }}>
                  {card.headline}
                </h3>

                {/* Body */}
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: "#475569" }}>
                  {card.body}
                </p>

                {/* Bullets */}
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                  {card.bullets.map((b, bi) => (
                    <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                      <CheckCircle2 size={14} color={card.accent} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: "#334155", lineHeight: 1.5 }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a href="/contact" style={{
                  display: "inline-flex", alignItems: "center", gap: 7, marginTop: 2,
                  fontSize: 13, fontWeight: 700, color: card.accent, textDecoration: "none", width: "fit-content",
                }}>
                  Learn more <ArrowRight size={13} />
                </a>
              </div>

              {/* Right — stat + icon */}
              <div style={{
                background: `linear-gradient(135deg, ${card.accentLight} 0%, rgba(255,255,255,0) 100%)`,
                borderLeft: `1px solid ${card.accentBorder}`,
                padding: "44px 40px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 60, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: card.accent }}>
                    {card.stat.value}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 600, color: "#64748b", letterSpacing: "0.02em" }}>
                    {card.stat.label}
                  </div>
                </div>

                <div style={{
                  width: 76, height: 76, borderRadius: "50%",
                  background: card.accentLight, border: `1px solid ${card.accentBorder}`,
                  display: "grid", placeItems: "center",
                }}>
                  <Icon size={30} color={card.accent} />
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {String(card.index).padStart(2, "0")} / {String(NUM_CARDS).padStart(2, "0")}
                </div>
              </div>
            </div>
          );
        })}

        {/* Sentinel — marks where all pins release */}
        <div className="sc-stack-end" style={{ width: "100%", height: 1 }} />
      </div>

      {/* Bottom breathing room */}
      <div style={{ height: "30vh" }} />
    </section>
  );
}

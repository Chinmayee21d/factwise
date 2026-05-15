import { useEffect, useRef } from "react";

export default function FactWiseDiagram() {
  const sectionRef = useRef(null);

  // Staggered node entrance
  useEffect(() => {
    const nodes = sectionRef.current?.querySelectorAll(".anim-node");
    nodes?.forEach((n, i) => {
      n.style.opacity = "0";
      n.style.transform = "translateY(8px)";
      n.style.transition = `opacity 0.45s ${i * 0.055}s ease, transform 0.45s ${i * 0.055}s ease`;
      requestAnimationFrame(() => {
        n.style.opacity = "1";
        n.style.transform = "translateY(0)";
      });
    });
  }, []);

  /*
    ViewBox: 0 0 1160 530
    ─────────────────────────────────
    TOP ROW   cy=64  : ERP(192) CRM(284) Subscriptions(402) Legacy billing(565) Booking system(736)
    MID ROW   cy=168 : SDK(334) EventDest(730)
    MAIN ROW  cy=270 : IconGrid(left) AppMkt(313) CENTER(530) DataPipeline(751) SnowIcon(906)
    BOTTOM    cy=370 : Orchestration(530)
    DEEP      cy=456 : PSP(444) PSP(530) PSP(616)

    Manhattan paths:
      Top bar      : M 192,64  H 736
      Top→SDK      : M 334,64  V 150
      Top→EventDest: M 730,64  V 150
      SDK→Center   : M 334,186 V 270 H 468
      EVT→Center   : M 730,186 V 270 H 594
      Icon→AppMkt  : M 132,270 H 234
      AppMkt→Center: M 392,270 H 468
      Center→Data  : M 594,270 H 670
      Data→Snow    : M 832,270 H 876
      Center→Orch  : M 530,308 V 352
      Orch→PSP1    : M 530,388 V 418 H 444 V 438
      Orch→PSP2    : M 530,388 V 438
      Orch→PSP3    : M 530,388 V 418 H 616 V 438
  */

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
  const Pill = ({ x, y, w, h = 36, label, rx = 9, large = false }) => {
    const fill = large ? "#4F46E5" : "#4338CA";
    const textColor = "white";
    const fontSize = large ? 17 : 13;
    const fontWeight = large ? "700" : "500";
    return (
      <g className="anim-node" style={{ cursor: "default" }}>
        {large && (
          <>
            <rect x={x - 18} y={y - h / 2 - 20} width={w + 36} height={h + 40} rx={22}
              fill="#4338CA" opacity={0.08} />
            <rect x={x - 10} y={y - h / 2 - 12} width={w + 20} height={h + 24} rx={18}
              fill="#4338CA" opacity={0.1} />
          </>
        )}
        <rect
          x={x} y={y - h / 2} width={w} height={h} rx={rx}
          fill={fill}
          style={{ transition: "filter 0.2s ease" }}
          onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.18) saturate(1.1)")}
          onMouseLeave={e => (e.currentTarget.style.filter = "none")}
        />
        {large && (
          <rect x={x + 1} y={y - h / 2 + 1} width={w - 2} height={h * 0.38} rx={rx}
            fill="rgba(255,255,255,0.08)" pointerEvents="none" />
        )}
        <text
          x={x + w / 2} y={y}
          dominantBaseline="central" textAnchor="middle"
          fill={textColor} fontSize={fontSize}
          fontFamily="Inter, sans-serif" fontWeight={fontWeight}
          letterSpacing="-0.015em"
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <div
      ref={sectionRef}
      style={{
        width: "100%",
        maxWidth: 1240,
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: 24,
        padding: "52px 48px 68px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05), 0 16px 48px rgba(0,0,0,0.07)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(99,102,241,0.22) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          borderRadius: 24,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 2, marginBottom: 44 }}>
        <p style={{ fontSize: "clamp(18px,2.2vw,28px)", fontWeight: 600, color: "#111827",
          letterSpacing: "-0.022em", lineHeight: 1.35, marginBottom: 10 }}>
          Connect to existing systems.{" "}
          <span style={{ color: "#4F46E5" }}>
            Orchestrate workflows across multiple agents, build custom pipelines,
            and connect to third parties using APIs, partner apps or pre-built integrations.
          </span>
        </p>
        <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7 }}>
          FactWise bridges every data source and every tool — one protocol, zero rewiring.
        </p>
      </div>

      {/* SVG Diagram */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <svg
          viewBox="0 0 1160 530"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible", display: "block" }}
        >
          {/* ── Dashed connection paths ── */}
          <g fill="none" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.72">
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
          <circle cx="334" cy="64"  r="4" fill="#6366F1" />
          <circle cx="730" cy="64"  r="4" fill="#6366F1" />
          <circle cx="530" cy="388" r="4" fill="#6366F1" />

          {/* ── Animated traveling dots ── */}
          {PATHS.map(({ d, dur, begin, begin2 }, i) => (
            <g key={i}>
              <circle r="3.5" fill="#6366F1" opacity="0">
                <animateMotion path={d} dur={`${dur}s`} repeatCount="indefinite" begin={`${begin}s`} />
                <animate attributeName="opacity" values="0;1;1;0"
                  keyTimes="0;0.07;0.93;1" dur={`${dur}s`}
                  repeatCount="indefinite" begin={`${begin}s`} />
              </circle>
              {begin2 !== undefined && (
                <circle r="3.5" fill="#6366F1" opacity="0">
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
            fill="none" stroke="#818CF8" strokeWidth="1" strokeDasharray="5 4" opacity="0.4" />
          {[
            { x: 12, y: 222, bg: "#312E81", label: "X",  tc: "#a5b4fc", fs: 20 },
            { x: 68, y: 222, bg: "#065F46", label: "↑",  tc: "#6EE7B7", fs: 22 },
            { x: 12, y: 278, bg: "#991B1B", label: "RC", tc: "#FCA5A5", fs: 13, fw: "700" },
            { x: 68, y: 278, bg: "#5B21B6", label: "▶",  tc: "#DDD6FE", fs: 18 },
          ].map(({ x, y, bg, label, tc, fs, fw = "400" }, i) => (
            <g key={i} className="anim-node" style={{ cursor: "default" }}>
              <rect x={x} y={y} width={48} height={48} rx={10} fill={bg} />
              <text x={x + 24} y={y + 24} dominantBaseline="central" textAnchor="middle"
                fill={tc} fontSize={fs} fontFamily="Inter, sans-serif" fontWeight={fw}>
                {label}
              </text>
            </g>
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
          <Pill x={468} y={270} w={124} h={52} label="FactWise" rx={14} large />

          <Pill x={670}  y={270} w={162} label="Data Pipeline" />

          {/* Snowflake-style icon */}
          <g className="anim-node">
            <rect x={876} y={248} width={60} height={44} rx={11}
              fill="#EFF6FF" stroke="#BFDBFE" strokeWidth={1.5} />
            <line x1={906} y1={256} x2={906} y2={284} stroke="#3B82F6" strokeWidth={2.5} strokeLinecap="round" />
            <line x1={894} y1={263} x2={918} y2={277} stroke="#3B82F6" strokeWidth={2.5} strokeLinecap="round" />
            <line x1={918} y1={263} x2={894} y2={277} stroke="#3B82F6" strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={906} cy={270} r={3.5} fill="#60A5FA" />
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
  );
}

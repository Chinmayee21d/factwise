'use client';

import React, { useState, useEffect, useRef } from 'react';

/* ============ ICONS ============ */
const QGI = {
  FileText: ({ s = 12 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="14" y2="13"/>
      <line x1="8" y1="17" x2="14" y2="17"/>
    </svg>
  ),
  Trophy: ({ s = 11 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/>
      <path d="M7 4H4v3a3 3 0 0 0 3 3"/>
      <path d="M17 4h3v3a3 3 0 0 1-3 3"/>
    </svg>
  ),
  Sparkle: ({ s = 13 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
      <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"/>
    </svg>
  ),
  Send: ({ s = 11 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Pie: ({ s = 11 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
      <path d="M22 12A10 10 0 0 0 12 2v10z"/>
    </svg>
  ),
  TrendDn: ({ s = 11 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
      <polyline points="17 18 23 18 23 12"/>
    </svg>
  ),
  Alert: ({ s = 11 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12" y2="17"/>
    </svg>
  ),
  BarChart: ({ s = 11 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  Play: ({ s = 11 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  Pause: ({ s = 11 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
      <rect x="6" y="4" width="4" height="16"/>
      <rect x="14" y="4" width="4" height="16"/>
    </svg>
  ),
};

/* ============ DATA ============ */
const QG_SOURCES = [
  { id: 'S1', label: 'EVT-7741', vendor: 'Vendor A',  color: '#3666ff', items: ['Pump Body', 'O-ring kit'], sub: 304000 },
  { id: 'S2', label: 'EVT-7740', vendor: 'Vendor B',    color: '#00b884', items: ['Shaft Assy', 'Bearings'],            sub: 154000 },
];

const QG_ROWS = [
  { src: 'S1', name: 'Pump Body',           qty: 200, price: 1240, color: '#3666ff' },
  { src: 'S1', name: 'O-ring Kit',          qty: 200, price:  280, color: '#3666ff' },
  { src: 'S2', name: 'Shaft Assembly',      qty: 200, price:  450, color: '#00b884' },
  { src: 'S2', name: 'Bearings · NSK 6204', qty: 800, price:   80, color: '#00b884' },
];

const QG_CATS = [
  { name: 'Mechanical',  pct: 54, color: '#00b884', amount: '₹3,14,518' },
  { name: 'Electrical',  pct: 34, color: '#3666ff', amount: '₹1,98,030' },
  { name: 'Duty + Tax',  pct: 12, color: '#f59e0b', amount: '₹69,892' },
];

const QG_VOLUME = [
  { q:  100, p: 4520 },
  { q:  200, p: 4180 },
  { q:  500, p: 3780 },
  { q: 1000, p: 3490 },
  { q: 2500, p: 3210 },
];

/* ============ SUB-COMPONENTS ============ */
function KPI({ label, v, trend, good }: { label: string; v: string; trend: string; good?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4,
    }}>
      <span style={{ fontSize: 10, color: '#64748b' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontWeight: 700, fontSize: 11.5, color: '#1A1D2E' }}>{v}</span>
        <span style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 8.5, color: good ? '#00b884' : '#94a3b8' }}>{trend}</span>
      </div>
    </div>
  );
}

/* Animated donut chart for category breakdown */
function DonutChart({ animate }: { animate: boolean }) {
  const size = 72;
  const cx = size / 2, cy = size / 2, r = 26;
  const circ = 2 * Math.PI * r;

  // Each segment: offset = sum of previous pcts * circ
  const segments = [
    { pct: 0.54, color: '#00b884', label: 'Mech' },
    { pct: 0.34, color: '#3666ff', label: 'Elec' },
    { pct: 0.12, color: '#f59e0b', label: 'Duty' },
  ];

  let cumulative = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {segments.map((seg, i) => {
        const dash = seg.pct * circ;
        const gap = circ - dash;
        const offset = -cumulative * circ;
        cumulative += seg.pct;
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={10}
            strokeDasharray={`${animate ? dash : 0} ${gap}`}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            style={{
              transition: animate ? `stroke-dasharray 0.8s cubic-bezier(.22,1,.36,1) ${i * 160}ms` : 'none',
            }}
          />
        );
      })}
      {/* Inner white circle */}
      <circle cx={cx} cy={cy} r={18} fill="white"/>
    </svg>
  );
}

function VolumeChart({ compact = false }: { compact?: boolean }) {
  const w = compact ? 140 : 180, h = compact ? 48 : 56, pad = 6;
  const pts = QG_VOLUME;
  const xs = pts.map((_, i) => pad + (i / (pts.length - 1)) * (w - pad * 2));
  const minP = Math.min(...pts.map(p => p.p));
  const maxP = Math.max(...pts.map(p => p.p));
  const ys = pts.map(p => pad + ((maxP - p.p) / (maxP - minP)) * (h - pad * 2));
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${ys[i]}`).join(' ');
  const area = d + ` L ${xs[xs.length - 1]} ${h - pad} L ${xs[0]} ${h - pad} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="qg-vol-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3666ff" stopOpacity={0.28}/>
            <stop offset="100%" stopColor="#3666ff" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <path d={area} fill="url(#qg-vol-grad)"/>
        <path d={d} fill="none" stroke="#3666ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        {xs.map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={ys[i]} r={i === 1 ? 3 : 2} fill="#fff" stroke="#3666ff" strokeWidth="1.4"/>
            {i === 1 && (
              <g>
                <rect x={x - 16} y={ys[i] - 18} width="32" height="13" rx="3" fill="#0b1322"/>
                <text x={x} y={ys[i] - 9} textAnchor="middle" fontSize="8" fill="#fff" fontFamily="JetBrains Mono, monospace">200</text>
              </g>
            )}
          </g>
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between',
                    fontSize: '8.5px', color: '#94a3b8', marginTop: 2, padding: '0 4px',
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
        <span>100</span><span>200</span><span>500</span><span>1k</span><span>2.5k</span>
      </div>
    </div>
  );
}

/* ============ MAIN COMPONENT ============ */
interface QuoteGenAnimationProps {
  speed?: number;
  isAuto?: boolean;
  controlledPhase?: number | null;
  activeMenuStep?: number | null;
  onPhaseChange?: (phase: number) => void;
  onToggleAuto?: () => void;
}

export default function QuoteGenAnimation({ 
  speed = 1,
  isAuto = true,
  controlledPhase = null,
  activeMenuStep = null,
  onPhaseChange,
  onToggleAuto
}: QuoteGenAnimationProps) {
  const [localPhase, setLocalPhase]               = useState(0);
  const [localSourcesShown, setLocalSourcesShown] = useState(0);
  const [localRowsBuilt, setLocalRowsBuilt]       = useState(0);
  const [localActiveSrc, setLocalActiveSrc]       = useState<string | null>(null);
  const [localTotals, setLocalTotals]             = useState<{ sub: number; markup: number; freight: number; total: number } | null>(null);
  const [localShowAnalytics, setLocalShowAnalytics] = useState(false);
  const [localShowVolume, setLocalShowVolume]     = useState(false);
  const [localCatsAnimated, setLocalCatsAnimated] = useState(false);
  const [localSendPulse, setLocalSendPulse]       = useState(false);

  const cancelRef = useRef(false);

  useEffect(() => {
    if (!isAuto) return;
    cancelRef.current = false;
    const mul = Math.max(0.3, Number(speed) || 1);
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms / mul));

    async function run() {
      while (!cancelRef.current) {
        // Reset all
        setLocalPhase(0); setLocalSourcesShown(0); setLocalRowsBuilt(0); setLocalActiveSrc(null);
        setLocalTotals(null); setLocalShowAnalytics(false); setLocalShowVolume(false);
        setLocalCatsAnimated(false); setLocalSendPulse(false);
        onPhaseChange?.(0);
        await sleep(600);

        // Step 1: Aggregate bids - sources appear
        if (cancelRef.current) return;
        setLocalPhase(1);
        onPhaseChange?.(1);
        for (let i = 1; i <= QG_SOURCES.length; i++) {
          if (cancelRef.current) return;
          setLocalSourcesShown(i);
          await sleep(280);
        }
        await sleep(600);

        // Cursor glides to the Generate Quote button, then clicks
        if (cancelRef.current) return;
        setLocalPhase(2); onPhaseChange?.(2); await sleep(950);
        if (cancelRef.current) return;
        setLocalPhase(3); onPhaseChange?.(3); await sleep(620);

        // Step 2: Apply landed costs — rows build up
        if (cancelRef.current) return;
        setLocalPhase(4);
        onPhaseChange?.(4);
        for (let i = 0; i < QG_ROWS.length; i++) {
          if (cancelRef.current) return;
          setLocalActiveSrc(QG_ROWS[i].src);
          await sleep(180);
          setLocalRowsBuilt(i + 1);
          await sleep(260);
        }
        setLocalActiveSrc(null);
        await sleep(400);

        // Totals appear
        if (cancelRef.current) return;
        setLocalPhase(5);
        onPhaseChange?.(5);
        const sub = QG_ROWS.reduce((s, r) => s + r.qty * r.price, 0);
        const markup = Math.round(sub * 0.18);
        const freight = 42000;
        setLocalTotals({ sub, markup, freight, total: sub + markup + freight });
        await sleep(1200);

        // Step 3: Analyze by category — panel slides in, donut animates
        if (cancelRef.current) return;
        setLocalShowAnalytics(true);
        setLocalPhase(6);
        onPhaseChange?.(6);
        await sleep(200);
        setLocalCatsAnimated(true);
        await sleep(2600);

        // Step 4: Volume pricing — volume panel slides in alongside category
        if (cancelRef.current) return;
        setLocalShowVolume(true);
        setLocalPhase(7);
        onPhaseChange?.(7);
        await sleep(2400);

        // Send pulse
        if (cancelRef.current) return;
        setLocalSendPulse(true);
        setLocalPhase(8);
        onPhaseChange?.(8);
        await sleep(2000);

        await sleep(800);
      }
    }

    run();
    return () => { cancelRef.current = true; };
  }, [speed, isAuto]);

  // Resolve displayed values — manual override when not auto
  let phase = localPhase;
  let sourcesShown = localSourcesShown;
  let rowsBuilt = localRowsBuilt;
  let activeSrc = localActiveSrc;
  let totals = localTotals;
  let showAnalytics = localShowAnalytics;
  let showVolume = localShowVolume;
  let catsAnimated = localCatsAnimated;
  let sendPulse = localSendPulse;

  if (!isAuto && controlledPhase !== null) {
    const sub = QG_ROWS.reduce((s, r) => s + r.qty * r.price, 0);
    const computedTotals = { sub, markup: Math.round(sub * 0.18), freight: 42000, total: sub + Math.round(sub * 0.18) + 42000 };

    if (controlledPhase === 1) {
      // Step 1: Aggregate bids — sources visible, no rows yet
      phase = 1; sourcesShown = 2; rowsBuilt = 0; totals = null;
      showAnalytics = false; showVolume = false; catsAnimated = false; sendPulse = false;
    } else if (controlledPhase === 2) {
      // Step 2: Apply landed costs — rows + totals visible
      phase = 5; sourcesShown = 2; rowsBuilt = 4;
      totals = computedTotals;
      showAnalytics = false; showVolume = false; catsAnimated = false; sendPulse = false;
    } else if (controlledPhase === 3) {
      // Step 3: Analyze by category — categories panel visible, donut animated
      phase = 6; sourcesShown = 2; rowsBuilt = 4;
      totals = computedTotals;
      showAnalytics = true; showVolume = false; catsAnimated = true; sendPulse = false;
    } else if (controlledPhase === 4) {
      // Step 4: Volume pricing — BOTH category AND volume panels visible on same screen
      phase = 7; sourcesShown = 2; rowsBuilt = 4;
      totals = computedTotals;
      showAnalytics = true; showVolume = true; catsAnimated = true; sendPulse = true;
    }
  }

  // Derive which menu step is "active" for narrative text
  const getActiveMenuStep = (): number => {
    if (!isAuto && activeMenuStep !== null) return activeMenuStep;
    if (phase >= 1 && phase <= 4) return 1;
    if (phase === 5) return 2;
    if (phase === 6) return 3;
    if (phase >= 7) return 4;
    return 0;
  };

  const step = getActiveMenuStep();

  // Top section (sources + quote doc) is hidden when analytics take over
  const hideTop = step >= 3;

  const getNarrativeText = (): string => {
    switch (step) {
      case 1:
        return 'Select the best bids and FactWise generates your customer quote in one click — every line item priced, every BOM rolled up. No manual calculation, no margin errors.';
      case 2:
        return 'Landed costs auto-applied — duty, freight, insurance, markup — so every line is priced at true total cost. No spreadsheet, no formula babysitting.';
      case 3:
        return 'Ask our AI anything about your quote — where the biggest expenses are hiding, which categories drive spend, where add-on charges are stacking up. Instant answers, no analyst.';
      case 4:
        return 'Model how costs shift across order volumes — see if bulk discounts offset added logistics so you can sharpen the quote and send it before anyone else does.';
      default:
        return 'Generating your customer quote — aggregating best bids, calculating landed costs, and analyzing category spend.';
    }
  };

  const watermark =
      phase <= 1 ? 'BEST · BIDS'
    : phase < 4  ? 'ONE · CLICK'
    : phase === 4 ? 'ROLL · UP'
    : !showAnalytics ? 'TOTALS'
    : !showVolume ? 'CATEGORIES'
    : sendPulse ? 'SEND' : 'ANALYTICS';

  /* ---- inline styles ---- */
  const s = {
    root: {
      position: 'relative' as const,
      width: '100%',
      height: '490px',
      minHeight: '490px',
      maxHeight: '490px',
      fontFamily: "'Inter', system-ui, sans-serif",
      color: '#1A1D2E',
      background: 'white',
      borderRadius: 22,
      overflow: 'hidden',
      border: '1px solid #e9eef5',
      boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 30px 60px -28px rgba(15,23,42,0.18)',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    chrome: {
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
      background: '#f9fafc', borderBottom: '1px solid #eef1f6', flexShrink: 0,
    },
    dot: (bg: string) => ({ width: 10, height: 10, borderRadius: '50%', background: bg }),
    url: {
      marginLeft: 6, padding: '4px 10px', background: 'white', border: '1px solid #e8edf3',
      borderRadius: 6, fontSize: 11, fontWeight: 500, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6,
    },
    sendBtn: (state: string) => ({
      marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '5px 11px', borderRadius: 6, fontSize: '9.5px', fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase' as const,
      transition: 'all .35s ease',
      ...(state === 'glow'
        ? { background: '#f59e0b', borderColor: '#d97706', color: 'white', border: '1px solid #d97706',
            animation: 'qgGlow 1.6s ease-in-out infinite' }
        : state === 'armed'
        ? { background: '#fef6e7', border: '1px solid #fde3ad', color: '#b45309' }
        : { background: '#f8fafc', border: '1px solid #e8edf3', color: '#94a3b8' }),
    }),
    body: {
      position: 'relative' as const, padding: 14,
      display: 'flex', flexDirection: 'column' as const, gap: 12,
      flex: 1,
      minHeight: 0,
      overflow: 'hidden',
      paddingBottom: 80,
    },
    top: { 
      display: 'grid', gridTemplateColumns: '0.85fr 1.5fr', gap: 12,
    },
    srcCol: { display: 'flex', flexDirection: 'column' as const, gap: 6, position: 'relative' as const },
    srcHd: {
      display: 'flex', alignItems: 'center', gap: 4,
      fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em',
      textTransform: 'uppercase' as const, color: '#94a3b8',
    },
    src: (shown: boolean, isActive: boolean, color: string) => ({
      position: 'relative' as const, background: isActive ? `rgba(54,102,255,0.04)` : 'white',
      border: `1px solid ${isActive ? color : '#e8edf3'}`,
      borderRadius: 9, padding: '8px 10px',
      opacity: shown ? 1 : 0,
      transform: shown ? (isActive ? 'scale(1.02)' : 'scale(1)') : 'scale(0.92)',
      boxShadow: isActive ? `0 0 0 2px ${color}33, 0 8px 16px -6px rgba(15,23,42,0.18)` : 'none',
      transition: 'opacity .4s ease, transform .35s ease, box-shadow .35s ease, background .35s ease, border-color .35s ease',
    }),
    genBtn: { marginTop: 'auto', paddingTop: 6 },
    genBtnEl: (phase: number) => ({
      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      padding: '9px 12px', borderRadius: 9, border: 'none', fontWeight: 700, fontSize: 12,
      fontFamily: 'inherit', cursor: 'default',
      transition: 'all .35s ease',
      ...(phase >= 4
        ? { background: '#1d4ed8', color: 'white', boxShadow: '0 6px 16px -4px rgba(29,78,216,0.4)' }
        : phase >= 2
        ? { background: '#3666ff', color: 'white', boxShadow: '0 6px 16px -4px rgba(54,102,255,0.45), 0 0 0 4px rgba(54,102,255,0.14)' }
        : { background: '#f1f5f9', color: '#94a3b8' }),
    }),
    doc: {
      position: 'relative' as const, background: 'white', border: '1px solid #e8edf3',
      borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, minHeight: 0,
    },
    docHd: {
      padding: '8px 12px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0,
    },
    docBody: { padding: '8px 10px', flex: 1, overflow: 'hidden' },
    rowHd: {
      display: 'grid', gridTemplateColumns: '1.8fr 0.5fr 0.6fr 0.6fr', alignItems: 'center',
      fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
      color: '#94a3b8', padding: '0 4px 4px', borderBottom: '1px solid #f1f5f9',
    },
    panel: { background: 'white', border: '1px solid #e8edf3', borderRadius: 9, padding: '8px 10px' },
    panelHd: {
      display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8,
      fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#64748b',
    },
    watermark: {
      position: 'absolute' as const, right: 18, bottom: 12,
      fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10,
      color: '#cbd5e1', letterSpacing: '0.12em', pointerEvents: 'none' as const,
    },
  };

  const sendState = sendPulse ? 'glow' : phase >= 4 ? 'armed' : 'idle';

  return (
    <>
      <style>{`
        @keyframes qgPop    { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes qgFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes qgSlideR { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes qgSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes qgGrow   { from { width: 0 !important; } }
        @keyframes qgGlow   { 0%,100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.5); } 50% { box-shadow: 0 0 0 6px rgba(245,158,11,0); } }
        @keyframes qgBarGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes qgCountUp { from { opacity: 0; transform: translateY(6px) scale(0.94); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .qg-row-anim { animation: qgSlideR .42s cubic-bezier(.22,1,.36,1) both; }
        .qg-totals-anim { animation: qgFadeIn .4s ease both; }
        .qg-cat-fill { 
          transform-origin: left center;
          animation: qgBarGrow .75s cubic-bezier(.22,1,.36,1) both; 
        }
        .qg-src-anim { animation: qgPop .4s cubic-bezier(.34,1.56,.64,1) both; }
        .qg-panel-in { animation: qgSlideUp .5s cubic-bezier(.22,1,.36,1) both; }
        .qg-cat-amount { animation: qgCountUp .55s cubic-bezier(.22,1,.36,1) both; }

        .qg-top-section {
          max-height: 340px;
          opacity: 1;
          transition: max-height 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease, margin 0.6s ease;
          overflow: hidden;
        }
        .qg-top-section.hidden {
          max-height: 0px;
          opacity: 0;
          margin-bottom: -12px;
        }

        /* Analytics area: two-column layout when volume is also shown */
        .qg-analytics-area {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          animation: qgFadeIn .4s ease both;
        }
        .qg-analytics-row {
          display: grid;
          gap: 10px;
          flex: 1;
        }
        .qg-analytics-row.single { grid-template-columns: 1fr; }
        .qg-analytics-row.dual   { grid-template-columns: 1fr 1fr; }

        .qg-volume-panel-in {
          animation: qgSlideR .52s cubic-bezier(.22,1,.36,1) both;
        }
        
        .qg-narrative {
          position: absolute; left: 14px; right: 14px; bottom: 14px;
          display: flex; align-items: flex-start; gap: 11px;
          padding: 11px 15px;
          background: white;
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          z-index: 20;
          animation: qgFadeIn .5s cubic-bezier(.22,1,.36,1) both;
        }
        .qg-pulsingDot { width: 6px; height: 6px; border-radius: 50%; background: #3666ff; margin-top: 5px; flex-shrink: 0; animation: qgPulse 1.6s ease-in-out infinite; }
        .qg-narrativeText { font-size: 11px; font-weight: 500; color: #64748b; line-height: 1.55; text-align: left; }

        /* ── Generate Quote one-click cursor animation ── */
        .qg-genBtn-wrap { position: relative; }
        .qg-genBtn { position: relative; z-index: 2; transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s ease; }
        .qg-genBtn.targeted {
          box-shadow: 0 6px 16px -4px rgba(54,102,255,0.45), 0 0 0 4px rgba(54,102,255,0.22) !important;
        }
        .qg-genBtn.pressed { transform: scale(0.94); }
        .qg-click-ring {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          width: 36px; height: 36px; border-radius: 999px;
          border: 2px solid #3666ff; opacity: 0; pointer-events: none;
          z-index: 3;
        }
        .qg-click-ring.on { animation: qg-clickRing 0.6s cubic-bezier(.22,1,.36,1) forwards; }
        @keyframes qg-clickRing {
          0%   { width: 12px; height: 12px; opacity: 0.85; border-width: 3px; }
          100% { width: 110px; height: 110px; opacity: 0; border-width: 1px; }
        }
        .qg-cursor {
          position: absolute; z-index: 6; pointer-events: none;
          filter: drop-shadow(0 4px 10px rgba(15,23,42,0.25));
          transition: left 0.85s cubic-bezier(.22,1,.36,1), top 0.85s cubic-bezier(.22,1,.36,1), transform 0.25s cubic-bezier(.22,1,.36,1), opacity 0.4s ease;
        }
        /* phase 0: cursor off-screen above-right, hidden */
        .qg-cursor-p0 { left: 90%; top: -8%; opacity: 0; transform: scale(0.85); }
        /* phase 1: cursor enters at top-right of source column, idle */
        .qg-cursor-p1 { left: 78%; top: 14%; opacity: 1; transform: scale(0.95); }
        /* phase 2: cursor glides down to the Generate Quote button */
        .qg-cursor-p2 { left: 52%; top: 88%; opacity: 1; transform: scale(1); }
        /* phase 3: cursor "presses" — small downward + scale-down nudge */
        .qg-cursor-p3 { left: 52%; top: 90%; opacity: 1; transform: scale(0.82); }
        /* phase 4+: cursor fades out as the quote auto-generates */
        .qg-cursor-p4 { left: 52%; top: 90%; opacity: 0; transform: scale(0.92); }

        .qg-cursor-label {
          position: absolute; left: 26px; top: 18px; white-space: nowrap;
          padding: 3px 7px; border-radius: 5px;
          background: #0b1322; color: white;
          font-size: 9px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          opacity: 0; transform: translateY(2px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .qg-cursor-label.on { opacity: 1; transform: translateY(0); }
        .qg-cursor-label::before {
          content: ''; position: absolute; left: 8px; top: -3px;
          width: 6px; height: 6px; background: #0b1322; transform: rotate(45deg);
        }
        @keyframes qgPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } }
      `}</style>

      <div style={s.root}>
        {/* Chrome bar */}
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between" style={{ padding: '12px 14px', background: '#fafbfc' }}>
          <div className="flex items-center gap-2 text-left">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[12px] font-bold text-slate-800 tracking-tight shrink-0">FactWise Engine</span>
              <span className="text-slate-300 text-[10px]">/</span>
              <span className="text-[11px] font-medium text-slate-500 truncate">Customer Quote · Q-2026-184</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full cursor-pointer" onClick={onToggleAuto}>
            <span className={'size-1.5 rounded-full ' + (isAuto ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500')} />
            <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              {isAuto ? 'Auto-Pilot' : 'Manual'}
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={s.body}>

          {/* TOP SECTION: sources + quote doc — collapses when analytics shown */}
          <div style={s.top} className={`qg-top-section ${hideTop ? 'hidden' : ''}`}>

            {/* Sources column */}
            <div style={s.srcCol}>
              <div style={s.srcHd}><QGI.Trophy s={11}/>&nbsp;Best Bids From Events</div>
              {QG_SOURCES.map((src, i) => {
                const isActive = activeSrc === src.id;
                const shown = i < sourcesShown;
                return (
                  <div key={src.id}
                       className={shown ? 'qg-src-anim' : ''}
                       style={{ ...s.src(shown, isActive, src.color), animationDelay: `${i * 60}ms` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: src.color, display: 'inline-block' }}/>
                      <span style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 9, color: '#94a3b8' }}>{src.label}</span>
                      <span style={{ marginLeft: 'auto', fontSize: '8.5px', fontWeight: 700, color: '#047857', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Won</span>
                    </div>
                    <div style={{ fontSize: '10.5px', fontWeight: 600, color: '#1A1D2E', lineHeight: 1.2 }}>{src.vendor}</div>
                    <div style={{ marginTop: 3, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {src.items.map(it => (
                        <span key={it} style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: '8.5px', background: '#f8fafc', border: '1px solid #f1f5f9', color: '#64748b', padding: '1px 5px', borderRadius: 3 }}>{it}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: 3, fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: '10.5px', fontWeight: 700, color: '#475569' }}>₹{src.sub.toLocaleString('en-IN')}</div>
                    {isActive && (
                      <div style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', width: 8, height: 8, borderRadius: '50%', background: src.color, boxShadow: `0 0 0 4px ${src.color}33` }}/>
                    )}
                  </div>
                );
              })}

              {/* Generate button */}
              <div style={s.genBtn} className="qg-genBtn-wrap">
                <button style={s.genBtnEl(phase)} className={`qg-genBtn ${phase === 3 ? 'pressed' : ''} ${phase >= 2 && phase <= 3 ? 'targeted' : ''}`}>
                  <QGI.Sparkle s={12}/>
                  Generate Quote
                </button>
                {/* Click ripple — pulses outward on phase 3 */}
                <div className={`qg-click-ring ${phase === 3 ? 'on' : ''}`} aria-hidden />
                <div style={{ marginTop: 4, textAlign: 'center', fontSize: 9, color: '#94a3b8', fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
                  One click · all events rolled up
                </div>
              </div>

              {/* ── Mouse cursor — slides to button + clicks, then auto-generates ── */}
              <div className={`qg-cursor qg-cursor-p${Math.min(phase, 4)}`} aria-hidden>
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M5 3 L5 19 L9 15 L11.5 21 L14 20 L11.5 14 L17 14 Z" fill="#0b1322" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
                <span className={`qg-cursor-label ${phase === 3 ? 'on' : ''}`}>One click</span>
              </div>
            </div>

            {/* Quote document */}
            <div style={s.doc}>
              <div style={s.docHd}>
                <div>
                  <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Customer Quote · Q-2026-184</div>
                  <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 9, color: '#94a3b8', marginTop: 1 }}>Acme Hydraulics · 200 units · INCO-FOB</div>
                </div>
                {totals && (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8' }}>Total</div>
                    <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 13, fontWeight: 700, color: '#0b1322' }}>₹{totals.total.toLocaleString('en-IN')}</div>
                  </div>
                )}
              </div>
              <div style={s.docBody}>
                {rowsBuilt === 0 ? (
                  <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: '#cbd5e1', textAlign: 'center' }}>
                    <div>
                      <QGI.FileText s={32}/>
                      <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: '9.5px', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 6 }}>Quote Awaiting Generation</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={s.rowHd}>
                      <div style={{ textAlign: 'left' }}>Item</div>
                      <div style={{ textAlign: 'right' }}>Qty</div>
                      <div style={{ textAlign: 'right' }}>Unit</div>
                      <div style={{ textAlign: 'right' }}>Amount</div>
                    </div>
                    {QG_ROWS.slice(0, rowsBuilt).map((r, i) => (
                      <div key={i} className="qg-row-anim" style={{ display: 'grid', gridTemplateColumns: '1.8fr 0.5fr 0.6fr 0.6fr', alignItems: 'center', padding: 4, borderBottom: '1px solid #f8fafc', fontSize: 11, animationDelay: `${i * 20}ms` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0, color: '#475569' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: r.color, flexShrink: 0, display: 'inline-block' }}/>
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</span>
                        </div>
                        <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", textAlign: 'right', color: '#64748b' }}>{r.qty}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", textAlign: 'right', color: '#64748b' }}>₹{r.price.toLocaleString('en-IN')}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", textAlign: 'right', fontWeight: 600, color: '#1A1D2E' }}>₹{(r.qty * r.price).toLocaleString('en-IN')}</div>
                      </div>
                    ))}

                    {totals && (
                      <div className="qg-totals-anim" style={{ marginTop: 6 }}>
                        {[
                          { label: 'Subtotal', v: `₹${totals.sub.toLocaleString('en-IN')}`, muted: false },
                          { label: 'Markup · 18%', v: `₹${totals.markup.toLocaleString('en-IN')}`, muted: true },
                          { label: 'Freight · landed', v: `₹${totals.freight.toLocaleString('en-IN')}`, muted: true },
                        ].map((t, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10.5px', padding: '1px 4px' }}>
                            <span style={{ color: t.muted ? '#94a3b8' : '#64748b' }}>{t.label}</span>
                            <span style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: t.muted ? '#94a3b8' : '#475569', fontWeight: 500 }}>{t.v}</span>
                          </div>
                        ))}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10.5px', padding: '6px 4px 1px', borderTop: '2px solid rgba(11,19,34,0.18)', marginTop: 4 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1A1D2E' }}>Customer Total</span>
                          <span style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 13, fontWeight: 800, color: '#0b1322' }}>₹{totals.total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ====== ANALYTICS AREA: steps 3 & 4 ====== */}
          {showAnalytics && (
            <div className="qg-analytics-area">

              {/* Summary strip — always visible in analytics mode */}
              <div className="qg-panel-in" style={{ ...s.panel, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>Quote Q-2026-184</span>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#cbd5e1', display: 'inline-block' }}/>
                  <span style={{ fontSize: 9, color: '#64748b' }}>Acme Hydraulics · 200 units</span>
                </div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Landed Total</div>
                    <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 13, fontWeight: 800, color: '#0b1322' }}>₹5,82,440</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Gross Margin</div>
                    <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 13, fontWeight: 800, color: '#00b884' }}>21.4%</div>
                  </div>
                </div>
              </div>

              {/* Main panels row */}
              <div className={`qg-analytics-row ${showVolume ? 'dual' : 'single'}`}>

                {/* CATEGORY PANEL — always shown from step 3 onwards */}
                <div className="qg-panel-in" style={{ ...s.panel, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={s.panelHd}><QGI.Pie s={10}/>&nbsp;Spend By Category</div>

                  {/* Donut + legend side by side */}
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ flexShrink: 0 }}>
                      <DonutChart animate={catsAnimated} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {QG_CATS.map((c, i) => (
                        <div key={c.name} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                              <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.color, flexShrink: 0, display: 'inline-block' }}/>
                              <span style={{ fontSize: 10, color: '#475569', fontWeight: 600 }}>{c.name}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
                              <span className={catsAnimated ? 'qg-cat-amount' : ''} style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, fontWeight: 700, color: '#1A1D2E', animationDelay: `${i * 120 + 400}ms` }}>
                                {c.amount}
                              </span>
                              <span style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 9, color: c.color, fontWeight: 700 }}>{c.pct}%</span>
                            </div>
                          </div>
                          <div style={{ height: 4, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                            <div
                              className={catsAnimated ? 'qg-cat-fill' : ''}
                              style={{
                                background: c.color, width: `${c.pct}%`, height: '100%', borderRadius: 99,
                                animationDelay: `${i * 120}ms`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cost insight tag */}
                  {catsAnimated && (
                    <div style={{ background: 'rgba(0,184,132,0.06)', border: '1px solid rgba(0,184,132,0.2)', borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00b884', display: 'inline-block', flexShrink: 0 }}/>
                      <span style={{ fontSize: '9.5px', color: '#065f46', fontWeight: 600 }}>
                        Mechanical dominates at 54% — negotiate Pump Body pricing first.
                      </span>
                    </div>
                  )}
                </div>

                {/* VOLUME PANEL — slides in on step 4 */}
                {showVolume && (
                  <div className="qg-volume-panel-in" style={{ ...s.panel, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={s.panelHd}><QGI.TrendDn s={10}/>&nbsp;Price Across Volumes</div>
                    <VolumeChart compact />

                    {/* KPI rows */}
                    <div style={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <KPI label="Gross margin"  v="21.4%" trend="+1.8 pts"    good/>
                      <KPI label="Add-ons stack" v="₹124k"  trend="freight+duty"/>
                      <KPI label="Send before"   v="3 days" trend="competitor SLA"/>
                    </div>

                    {/* Volume insight */}
                    <div style={{ background: 'rgba(54,102,255,0.04)', border: '1px solid rgba(54,102,255,0.15)', borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3666ff', display: 'inline-block', flexShrink: 0 }}/>
                      <span style={{ fontSize: '9.5px', color: '#1e3a8a', fontWeight: 600 }}>
                        500+ units saves ₹400/unit vs. 200 — pitch volume to Acme.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={s.watermark}>{watermark}</div>

          {/* Narrative Card */}
          {step > 0 && (
            <div className="qg-narrative" key={step}>
              <div className="qg-pulsingDot" />
              <div className="qg-narrativeText">
                {getNarrativeText()}
              </div>
            </div>
          )}
        </div>

        {/* Control Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 mt-2" style={{ padding: '12px 14px 14px', background: 'white' }}>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleAuto}
              className="size-5 rounded-md hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer text-slate-500"
              style={{ background: 'transparent', border: 'none', padding: 0 }}
              title={isAuto ? "Pause Autoplay" : "Resume Autoplay"}
            >
              {isAuto ? <QGI.Pause s={12} /> : <QGI.Play s={12} />}
            </button>
            <span className="font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
              {isAuto ? "Autopilot Active (Cycling 15s lifecycle)" : "Paused (Select phases on the right guide)"}
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#3666ff] font-bold">
            FactWise Engine
          </span>
        </div>
      </div>
    </>
  );
}
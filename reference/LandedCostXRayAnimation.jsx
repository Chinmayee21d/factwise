/* ============================================================
 * LandedCostXRayAnimation.jsx
 * FactWise — SECTION 3.3 · "See True Landed Cost. Award with Confidence."
 *
 * STORY (loops ~20s, cursor-driven):
 *   ACT 1 · NAIVE (0–4s)
 *     Bid grid loads — 4 vendors × 3 line items. Vendor B (China) looks
 *     cheapest on raw quote. A "Lowest quote · ₹2.49M" tag pins on it.
 *   ACT 2 · FORMULA (4–8s)
 *     Cursor moves up to a "Apply landed-cost formula" toggle. Click.
 *     A scan-line sweeps the grid (the X-ray effect).
 *   ACT 3 · LAYERS REVEAL (8–14s)
 *     Each cell stacks 3 hidden layers from the bottom up:
 *       Duty (yellow) → Freight (purple) → Insurance (cyan)
 *     totals reflow row-by-row. Currency chips flip USD→INR / EUR→INR.
 *   ACT 4 · FLIP (14–17s)
 *     Vendor A's column slides up; B's slides down; trophy lands on A.
 *     A pulses with "TRUE LOW" badge.
 *   ACT 5 · AI AWARD (17–20s)
 *     Right-rail "FW Recommended Analytics" panel renders confidence
 *     score 94%, reasoning bullets type out, "Award" CTA glows amber.
 * ============================================================ */

const { useState: lcUseState, useEffect: lcUseEffect } = React;

const LCI = {
  Cursor:(p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="currentColor"><path d="M3 2l5 16 2.5-6 6-2L3 2z"/></svg>,
  Check: (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Trophy:(p)=> <svg viewBox="0 0 24 24" width={p.s||12} height={p.s||12} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 4H4v3a3 3 0 0 0 3 3"/><path d="M17 4h3v3a3 3 0 0 1-3 3"/></svg>,
  Spark: (p)=> <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="currentColor"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"/></svg>,
  Lock:  (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Calc:  (p)=> <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><circle cx="8" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="16" cy="12" r="1"/><line x1="8" y1="18" x2="16" y2="18"/></svg>,
  Scan:  (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M3 12h18"/></svg>,
};

/* ============ DATA ============ */
// 3 items, 4 vendors. Each cell: q=quote, d=duty, f=freight, i=insurance (per-unit INR after FX).
const LC_ITEMS = [
  { id: 'I1', name: 'Pump Body',      qty: 200 },
  { id: 'I2', name: 'Stator Winding', qty: 200 },
  { id: 'I3', name: 'O-ring Kit',     qty: 200 },
];
const LC_VENDORS = [
  { id: 'A', name: 'Sahasra',     loc: 'IN', fx: 'INR', tone: '#3666ff' },
  { id: 'B', name: 'Pearl River', loc: 'CN', fx: 'USD', tone: '#0d9488' },
  { id: 'C', name: 'EuroDrive',   loc: 'DE', fx: 'EUR', tone: '#7c3aed' },
  { id: 'D', name: 'Polaris',     loc: 'US', fx: 'USD', tone: '#f59e0b' },
];
const LC_BIDS = {
  A: { I1:{q:1240,d:0,  f:60, i:18}, I2:{q:920, d:0,  f:45, i:14}, I3:{q:280,d:0, f:20,i:8 } },
  B: { I1:{q:1180,d:142,f:185,i:42}, I2:{q:880, d:106,f:140,i:34}, I3:{q:260,d:32,f:60,i:14} },
  C: { I1:{q:1290,d:64, f:120,i:28}, I2:{q:960, d:48, f:95, i:22}, I3:{q:295,d:14,f:38,i:10} },
  D: { I1:{q:1330,d:0,  f:150,i:36}, I2:{q:990, d:0,  f:118,i:28}, I3:{q:305,d:0, f:48,i:14} },
};
const LC_LAYERS = [
  { k: 'q', name: 'Quote',     tone: '#475569', bg: '#e2e8f0' },
  { k: 'd', name: 'Duty',      tone: '#b45309', bg: '#fde68a' },
  { k: 'f', name: 'Freight',   tone: '#6d28d9', bg: '#ddd5ff' },
  { k: 'i', name: 'Insurance', tone: '#0e7490', bg: '#a5f3fc' },
];

const lcSum = (vid, items, keys) => items.reduce((s, it) =>
  s + keys.reduce((ss, k) => ss + LC_BIDS[vid][it.id][k], 0) * (it.qty), 0);

const lcInr = (n) => '₹' + n.toLocaleString('en-IN');
const lcL = (n) => '₹' + (n/100000).toFixed(2) + 'L';

/* ============ CURSOR SCRIPT ============ */
const LC_CURSOR_STEPS = [
  { x: 38, y: 22, hold: 1100, label: 'Raw quotes' },
  { x: 53, y: 47, hold: 900,  label: 'Vendor B · lowest?' },
  { x: 82, y: 16, hold: 1100, label: 'Landed-cost' },
  { x: 82, y: 19, hold: 700,  label: 'Toggle on', click: true },
  { x: 40, y: 55, hold: 1300, label: 'Hidden costs' },
  { x: 56, y: 56, hold: 1100, label: 'Duty · freight' },
  { x: 70, y: 56, hold: 1100, label: 'Currency normalised' },
  { x: 32, y: 86, hold: 1200, label: 'Sahasra · TRUE LOW' },
  { x: 88, y: 60, hold: 1200, label: 'FW analytics' },
  { x: 88, y: 88, hold: 1100, label: 'Award', click: true },
];

/* ============ STYLE ============ */
const LC_STYLE = `
.lc-root { position: relative; width: 100%; height: 580px; font-family: 'Inter', system-ui, sans-serif;
  color: #0b1322; background:
    radial-gradient(900px 500px at 0% 0%, rgba(54,102,255,0.05), transparent 55%),
    radial-gradient(700px 500px at 100% 100%, rgba(245,158,11,0.05), transparent 55%),
    #fafbff;
  border-radius: 22px; overflow: hidden; border: 1px solid #e9eef5;
  box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 30px 60px -28px rgba(15,23,42,0.18);
  display: flex; flex-direction: column; min-width: 0; }

.lc-chrome { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: white; border-bottom: 1px solid #eef1f6; }
.lc-dot { width: 9px; height: 9px; border-radius: 50%; }
.lc-url { margin-left: 8px; padding: 4px 10px; background: #f6f8fc; border: 1px solid #e8edf3;
  border-radius: 6px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10.5px; color: #64748b; display: flex; align-items: center; gap: 6px; }

.lc-toggleWrap { margin-left: auto; display: flex; align-items: center; gap: 6px; }
.lc-toggle { display: inline-flex; align-items: center; gap: 7px; padding: 4px 10px;
  background: white; border: 1.5px solid #e9eef5; border-radius: 99px;
  font-size: 11px; font-weight: 700; color: #64748b; transition: all .3s; }
.lc-toggle.act { border-color: #3666ff; color: #1e3a8a; background: #eff4ff;
  box-shadow: 0 0 0 4px rgba(54,102,255,0.1); }
.lc-toggle .sw { width: 22px; height: 12px; border-radius: 99px; background: #e2e8f0;
  position: relative; transition: background .3s; }
.lc-toggle .sw::after { content: ""; position: absolute; left: 2px; top: 2px;
  width: 8px; height: 8px; border-radius: 50%; background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2); transition: transform .3s; }
.lc-toggle.act .sw { background: #3666ff; }
.lc-toggle.act .sw::after { transform: translateX(10px); }

/* main */
.lc-main { position: relative; flex: 1; min-height: 0; padding: 14px; display: grid;
  grid-template-columns: 1fr 240px; gap: 14px; min-width: 0; }
.lc-grid-wrap { position: relative; background: white; border: 1px solid #e9eef5;
  border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 8px;
  min-height: 0; min-width: 0; box-shadow: 0 8px 24px -12px rgba(15,23,42,0.06);
  overflow: hidden; }
.lc-grid-hd { display: flex; align-items: center; gap: 7px; }
.lc-grid-hd .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9.5px;
  font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #94a3b8; }
.lc-grid-hd .mode { margin-left: auto; padding: 2px 8px; border-radius: 99px;
  background: #f4f6fa; border: 1px solid #e2e8f0;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; font-weight: 800;
  color: #64748b; letter-spacing: 0.06em; transition: all .3s; }
.lc-grid-hd .mode.act { background: #eff4ff; border-color: #d8e2ff; color: #1e3a8a; }

/* table grid */
.lc-tbl { display: grid; grid-template-columns: 110px repeat(4, 1fr); gap: 4px;
  align-content: start; }
.lc-hcell { padding: 6px 8px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
  color: #94a3b8; display: flex; align-items: center; gap: 4px; }
.lc-vhead { padding: 6px 8px; display: flex; align-items: center; gap: 5px;
  background: #fbfcfe; border: 1px solid #eef1f6; border-radius: 7px; transition: all .35s; }
.lc-vhead .av { width: 18px; height: 18px; border-radius: 5px; color: white;
  display: grid; place-items: center; font-size: 8.5px; font-weight: 800; flex-shrink: 0; }
.lc-vhead .info { min-width: 0; flex: 1; }
.lc-vhead .info .n { font-size: 10px; font-weight: 700; color: #0b1322; line-height: 1.1;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.lc-vhead .info .fx { font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8px; color: #94a3b8; letter-spacing: 0.06em; }
.lc-vhead .info .fx.flip { color: #047857; }

.lc-icell { padding: 6px 8px; font-size: 10.5px; font-weight: 600; color: #475569;
  display: flex; flex-direction: column; justify-content: center; gap: 2px;
  background: #fbfcfe; border: 1px solid #eef1f6; border-radius: 7px; }
.lc-icell .qty { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  color: #94a3b8; letter-spacing: 0.04em; }

/* data cell: stacked layer fills */
.lc-cell { position: relative; height: 38px; border-radius: 7px; overflow: hidden;
  background: white; border: 1px solid #eef1f6; }
.lc-cell .stack { position: absolute; left: 0; right: 0; bottom: 0; display: flex;
  flex-direction: column-reverse; transition: opacity .4s; }
.lc-cell .layer { width: 100%; transition: height .55s cubic-bezier(0.4,0,0.2,1); }
.lc-cell .num { position: absolute; right: 6px; top: 5px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; font-weight: 800;
  color: #0b1322; transition: color .3s; z-index: 2; }
.lc-cell .num .delta { font-size: 8.5px; color: #94a3b8; font-weight: 700; margin-left: 2px; }
.lc-cell.win { box-shadow: inset 0 0 0 1.5px #3666ff;
  background: linear-gradient(180deg, #eff4ff 0%, white 100%); }

/* totals row */
.lc-tot { background: #0b1322; color: white; border-radius: 7px; padding: 8px 9px;
  display: flex; flex-direction: column; gap: 2px; align-items: flex-end;
  transition: transform .55s cubic-bezier(0.4,0,0.2,1), background .35s; }
.lc-tot.up    { transform: translateY(-3px); background: linear-gradient(135deg, #1F3FB8 0%, #3666ff 100%);
  box-shadow: 0 10px 22px -8px rgba(54,102,255,0.5); }
.lc-tot.down  { transform: translateY(3px); opacity: 0.85; }
.lc-tot .l    { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px;
  letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.5); }
.lc-tot .v    { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px;
  font-weight: 900; }
.lc-tot .d    { display: inline-flex; align-items: center; gap: 3px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; font-weight: 800;
  color: #00d196; }
.lc-tot .d.bad { color: #f87171; }

/* scan line */
.lc-scan { position: absolute; left: 0; right: 0; height: 60px;
  background: linear-gradient(180deg, transparent 0%, rgba(54,102,255,0.18) 50%, transparent 100%);
  pointer-events: none; opacity: 0; z-index: 3;
  border-top: 1.5px solid rgba(54,102,255,0.5); border-bottom: 1.5px solid rgba(54,102,255,0.5);
  box-shadow: 0 0 24px rgba(54,102,255,0.45); }
.lc-scan.on { animation: lc-scan 1.4s ease-in-out forwards; }
@keyframes lc-scan {
  0% { top: 0%; opacity: 0.9; }
  100% { top: 100%; opacity: 0; }
}

/* lowest-quote pin */
.lc-pin { position: absolute; top: -10px; right: -8px; padding: 3px 7px;
  background: white; border: 1.5px solid #fde68a; color: #b45309;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 800;
  border-radius: 99px; box-shadow: 0 4px 10px -3px rgba(180,83,9,0.25);
  letter-spacing: 0.06em; opacity: 0; transform: scale(0.7);
  transition: opacity .35s, transform .35s; }
.lc-pin.show { opacity: 1; transform: scale(1); }
.lc-pin.dead { opacity: 0.35; text-decoration: line-through; color: #94a3b8;
  border-color: #e2e8f0; }
.lc-trophy { position: absolute; top: -12px; left: -4px; padding: 4px 7px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 900;
  border-radius: 99px; display: inline-flex; align-items: center; gap: 4px;
  box-shadow: 0 6px 14px -3px rgba(217,119,6,0.5);
  opacity: 0; transform: translateY(-4px) scale(0.7);
  transition: opacity .4s, transform .4s; }
.lc-trophy.show { opacity: 1; transform: translateY(0) scale(1); }

/* legend */
.lc-legend { display: flex; gap: 9px; padding-top: 4px;
  border-top: 1px dashed #eef1f6; }
.lc-legend .it { display: inline-flex; align-items: center; gap: 5px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  font-weight: 700; color: #64748b; letter-spacing: 0.04em; }
.lc-legend .sw { width: 9px; height: 9px; border-radius: 2.5px; }

/* right rail: FW analytics */
.lc-rail { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.lc-card { background: white; border: 1px solid #e9eef5; border-radius: 12px;
  padding: 11px 12px; box-shadow: 0 8px 22px -12px rgba(15,23,42,0.08); }
.lc-rec-hd { display: flex; align-items: center; gap: 7px; margin-bottom: 8px; }
.lc-rec-hd .b { width: 22px; height: 22px; border-radius: 6px;
  background: linear-gradient(135deg, #0b1322 0%, #1f2a5e 100%); color: #00d196;
  display: grid; place-items: center; box-shadow: 0 0 0 3px rgba(0,209,150,0.15); }
.lc-rec-hd .ttl { font-size: 11px; font-weight: 700; color: #0b1322; }
.lc-rec-hd .ttl span { color: #00b884; }

.lc-conf { display: flex; align-items: center; gap: 9px;
  padding: 9px 10px; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 1px solid #a7f3d0; border-radius: 9px; }
.lc-conf .num { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 24px;
  font-weight: 900; color: #047857; line-height: 1; transition: opacity .4s; }
.lc-conf .lbl { font-size: 10px; color: #047857; font-weight: 600; line-height: 1.3; }
.lc-conf .lbl strong { font-weight: 800; color: #064e3b; }
.lc-conf .ring { width: 36px; height: 36px; }
.lc-conf.dim .num, .lc-conf.dim .ring { opacity: 0.25; }

.lc-reasons { margin-top: 9px; display: flex; flex-direction: column; gap: 4px; }
.lc-reason { font-size: 10px; color: #334155; display: flex; align-items: flex-start; gap: 5px;
  opacity: 0; transform: translateX(-4px);
  transition: opacity .35s, transform .35s; line-height: 1.4; }
.lc-reason.in { opacity: 1; transform: translateX(0); }
.lc-reason .ck { width: 12px; height: 12px; border-radius: 50%; background: #d1fae5; color: #047857;
  display: grid; place-items: center; flex-shrink: 0; margin-top: 1px; }
.lc-reason b { color: #0b1322; font-weight: 700; }

.lc-award { margin-top: 10px; padding: 9px 12px; border-radius: 9px;
  background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%); color: white;
  font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 7px;
  box-shadow: 0 8px 18px -6px rgba(245,158,11,0.55);
  transition: transform .25s, opacity .35s; opacity: 0.4; }
.lc-award.glow { opacity: 1; box-shadow: 0 12px 30px -6px rgba(245,158,11,0.75),
  inset 0 1px 0 rgba(255,255,255,0.4); animation: lc-pulseBtn 1.4s ease-in-out infinite; }
@keyframes lc-pulseBtn { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
.lc-award.click { transform: scale(0.96); }

/* small KPIs row */
.lc-kpis { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.lc-kpi { padding: 7px 9px; background: #fbfcfe; border: 1px solid #eef1f6;
  border-radius: 8px; }
.lc-kpi .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px;
  letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; font-weight: 700; }
.lc-kpi .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px;
  font-weight: 800; color: #0b1322; margin-top: 1px; }
.lc-kpi .v.good { color: #047857; }
.lc-kpi .v.bad  { color: #b91c1c; }
`;

function LandedCostXRayAnimation(props) {
  const speed = props.speed || 1;
  const [step, setStep] = lcUseState(0);
  const [tick, setTick] = lcUseState(0);

  lcUseEffect(() => {
    if (!document.getElementById('lc-style')) {
      const s = document.createElement('style');
      s.id = 'lc-style'; s.textContent = LC_STYLE;
      document.head.appendChild(s);
    }
  }, []);

  lcUseEffect(() => {
    const hold = (LC_CURSOR_STEPS[step].hold || 1200) / speed;
    const t = setTimeout(() => {
      const next = (step + 1) % LC_CURSOR_STEPS.length;
      setStep(next);
      if (next === 0) setTick((x) => x + 1);
    }, hold);
    return () => clearTimeout(t);
  }, [step, speed]);

  // Phase derivations
  // 0,1: naive view — pin on B
  // 2: cursor near toggle
  // 3: toggle clicked, scan line runs
  // 4: layers reveal (duty)
  // 5: layers reveal (freight)
  // 6: layers reveal (insurance) + FX flip
  // 7: trophy on A, ranking flip
  // 8-9: AI rail reveals confidence + reasons + award
  const naive       = step <= 2;
  const toggleOn    = step >= 3;
  const scanRun     = step === 3;
  const showDuty    = step >= 4;
  const showFreight = step >= 5;
  const showInsur   = step >= 6;
  const fxFlip      = step >= 6;
  const winnerOn    = step >= 7;
  const aiReveal    = step >= 8;
  const awardGlow   = step >= 9;

  // active layer keys per phase
  const visibleKeys = ['q'];
  if (showDuty) visibleKeys.push('d');
  if (showFreight) visibleKeys.push('f');
  if (showInsur) visibleKeys.push('i');

  // total per vendor
  const vendorTotal = (vid) => lcSum(vid, LC_ITEMS, visibleKeys);
  const totals = Object.fromEntries(LC_VENDORS.map(v => [v.id, vendorTotal(v.id)]));
  const ordered = LC_VENDORS.map(v => v.id).sort((a, b) => totals[a] - totals[b]);
  const winnerId = ordered[0];

  // For each cell, compute stack as % of max possible cell height
  const allCellMax = (() => {
    let m = 0;
    LC_VENDORS.forEach(v => LC_ITEMS.forEach(it => {
      const c = LC_BIDS[v.id][it.id];
      m = Math.max(m, c.q + c.d + c.f + c.i);
    }));
    return m;
  })();

  return (
    <div className="lc-root">
      <div className="lc-chrome">
        <span className="lc-dot" style={{background:'#ff6058'}}/>
        <span className="lc-dot" style={{background:'#ffbd2e'}}/>
        <span className="lc-dot" style={{background:'#28c941'}}/>
        <div className="lc-url"><LCI.Lock s={10}/>app.factwise.io / award / RFQ-208</div>
        <div className="lc-toggleWrap">
          <div className={`lc-toggle ${toggleOn ? 'act' : ''}`}>
            <LCI.Calc s={11}/>
            Apply landed-cost formula
            <span className="sw"/>
          </div>
        </div>
      </div>

      <div className="lc-main">
        {/* LEFT — grid */}
        <div className="lc-grid-wrap">
          <div className="lc-grid-hd">
            <LCI.Scan s={11}/>
            <span className="l">Bid comparison · per-unit</span>
            <span className={`mode ${toggleOn ? 'act' : ''}`}>
              {toggleOn ? 'LANDED COST · INR' : 'RAW QUOTE'}
            </span>
          </div>

          {/* table */}
          <div className="lc-tbl">
            {/* header row */}
            <div/>
            {LC_VENDORS.map(v => (
              <div key={v.id} className="lc-vhead">
                <div className="av" style={{background: v.tone}}>{v.id}</div>
                <div className="info">
                  <div className="n">{v.name}</div>
                  <div className={`fx ${fxFlip && v.fx !== 'INR' ? 'flip' : ''}`}>
                    {v.loc} · {fxFlip && v.fx !== 'INR' ? `${v.fx}→INR` : v.fx}
                  </div>
                </div>
              </div>
            ))}

            {/* item rows */}
            {LC_ITEMS.map((it) => (
              <React.Fragment key={it.id}>
                <div className="lc-icell">
                  <span style={{fontWeight:700, color:'#0b1322'}}>{it.name}</span>
                  <span className="qty">qty {it.qty}</span>
                </div>
                {LC_VENDORS.map((v) => {
                  const c = LC_BIDS[v.id][it.id];
                  const totalCell = visibleKeys.reduce((s,k)=>s+c[k], 0);
                  const sumRange = c.q + c.d + c.f + c.i;
                  return (
                    <div key={v.id+it.id} className={`lc-cell ${winnerOn && v.id === winnerId ? 'win' : ''}`}>
                      <span className="num">
                        {lcInr(totalCell)}
                        {toggleOn && c.d+c.f+c.i > 0 && (
                          <span className="delta"> +{lcInr(totalCell - c.q)}</span>
                        )}
                      </span>
                      <div className="stack">
                        {LC_LAYERS.map((L) => {
                          if (L.k !== 'q' && !visibleKeys.includes(L.k)) {
                            return <div key={L.k} className="layer" style={{height:0, background:L.bg}}/>;
                          }
                          // Each layer height proportional to its value relative to allCellMax
                          const pct = (c[L.k] / allCellMax) * 100;
                          return <div key={L.k} className="layer"
                            style={{height: `${pct}%`, background: L.bg, opacity: 0.7}}/>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}

            {/* total row */}
            <div className="lc-icell" style={{background:'transparent', border:'none', padding:'8px 4px'}}>
              <span style={{fontWeight:800, color:'#0b1322', fontSize:11}}>Total · 200 units</span>
              <span className="qty">3 items rolled up</span>
            </div>
            {LC_VENDORS.map((v) => {
              const isWin = winnerOn && v.id === winnerId;
              const isB   = v.id === 'B';
              return (
                <div key={v.id} className={`lc-tot ${isWin ? 'up' : (winnerOn && isB ? 'down' : '')}`}
                     style={{position:'relative'}}>
                  <span className="l">{v.name}</span>
                  <span className="v">{lcL(totals[v.id])}</span>
                  <span className={`d ${(toggleOn && isB) ? 'bad' : ''}`}>
                    {isWin ? '★ TRUE LOW' : isB && naive ? '★ LOWEST' : isB && toggleOn ? '↑ +18% hidden' : ''}
                  </span>
                  {/* pin: lowest-quote on B during naive */}
                  {v.id === 'B' && (
                    <span className={`lc-pin ${naive ? 'show' : (toggleOn ? 'show dead' : '')}`}>
                      Lowest quote
                    </span>
                  )}
                  {isWin && (
                    <span className="lc-trophy show"><LCI.Trophy s={10}/> AWARD</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* legend */}
          <div className="lc-legend" style={{marginTop: 'auto'}}>
            {LC_LAYERS.map(L => (
              <span key={L.k} className="it">
                <span className="sw" style={{background:L.bg, opacity:0.85}}/>{L.name}
              </span>
            ))}
            <span className="it" style={{marginLeft:'auto', color:'#0b1322'}}>
              FX → INR · auto
            </span>
          </div>

          {/* scan line */}
          {scanRun && <div className="lc-scan on"/>}
        </div>

        {/* RIGHT — AI analytics */}
        <div className="lc-rail">
          <div className="lc-card">
            <div className="lc-rec-hd">
              <div className="b"><LCI.Spark s={12}/></div>
              <div className="ttl">FW <span>Recommended</span></div>
            </div>
            <div className={`lc-conf ${aiReveal ? '' : 'dim'}`}>
              <svg viewBox="0 0 36 36" className="ring">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#a7f3d0" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15" fill="none" stroke="#047857" strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={`${2*Math.PI*15}`}
                  strokeDashoffset={`${2*Math.PI*15 * (aiReveal ? (1 - 0.94) : 1)}`}
                  style={{transition:'stroke-dashoffset 1s ease', transform:'rotate(-90deg)', transformOrigin:'center'}}
                />
              </svg>
              <div>
                <div className="num">{aiReveal ? '94%' : '—'}</div>
                <div className="lbl"><strong>Confidence · Award {winnerId}</strong><br/>per your criteria</div>
              </div>
            </div>
            <div className="lc-reasons">
              {[
                <React.Fragment><b>True low cost</b> after duty + freight</React.Fragment>,
                <React.Fragment><b>0 excluded bids</b> · 4 competitive</React.Fragment>,
                <React.Fragment><b>Lead time A+</b> · domestic · 7 days</React.Fragment>,
                <React.Fragment><b>Risk score A</b> · 14 prior POs</React.Fragment>,
              ].map((r, i) => (
                <div key={i} className={`lc-reason ${aiReveal ? 'in' : ''}`}
                     style={{transitionDelay: `${0.15 + i*0.12}s`}}>
                  <span className="ck"><LCI.Check s={7}/></span>{r}
                </div>
              ))}
            </div>
            <div className={`lc-award ${awardGlow ? 'glow' : ''}`}>
              <LCI.Trophy s={12}/> Award · Sahasra · ₹{(totals.A/100000).toFixed(2)}L
            </div>
          </div>

          <div className="lc-card" style={{padding:'10px 11px'}}>
            <div className="lc-rec-hd" style={{marginBottom:6}}>
              <div className="b" style={{background:'#eff4ff', color:'#3666ff'}}>
                <LCI.Calc s={11}/>
              </div>
              <div className="ttl">Award analytics</div>
            </div>
            <div className="lc-kpis">
              <div className="lc-kpi"><div className="l">Competitive</div><div className="v good">4</div></div>
              <div className="lc-kpi"><div className="l">Excluded</div><div className="v bad">0</div></div>
              <div className="lc-kpi"><div className="l">Savings</div><div className="v good">−{((1 - totals[winnerId]/totals.B)*100).toFixed(1)}%</div></div>
              <div className="lc-kpi"><div className="l">Cycle</div><div className="v">3 d</div></div>
            </div>
          </div>
        </div>

        {/* Cursor */}
        {window.ScriptedCursor && (
          <window.ScriptedCursor steps={LC_CURSOR_STEPS} tick={tick} tone="#3666ff"/>
        )}
      </div>
    </div>
  );
}

window.LandedCostXRayAnimation = LandedCostXRayAnimation;

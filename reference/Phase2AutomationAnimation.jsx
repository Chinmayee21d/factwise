/* ============================================================
 * Phase2AutomationAnimation.jsx — v2 (clean)
 * "Replace Manual Work. Gain Speed." — Months 3–6
 *
 * Story (loops ~20s):
 *  1. DRAFT     — an RFQ card draws itself
 *  2. FAN-OUT   — 5 vendor cards land + animated email pings
 *  3. SCHEDULE  — auto follow-up timeline ticks through D0/D2/D4/D5
 *  4. QUOTES IN — 5 quote rows stream back, best highlighted
 *  5. APPROVAL  — 3-stage chain fills sequentially
 *  6. FINALE    — "3 days → 4 hours · 10× faster"
 *
 * Design language: single blue accent, success green only on done
 * moments, monochrome vendor logos, no chrome, no sidebar rail.
 * ============================================================ */

const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

const P2I = {
  Send:     (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Mail:     (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Bolt:     (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Check:    (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Repeat:   (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  Shield:   (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Arrow:    (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
};

const P2_STYLE = `
.p2-root { position: relative; aspect-ratio: 1 / 1.04; max-width: 600px; width: 100%;
  font-family: 'Inter', system-ui, sans-serif; color: #0b1322; }
.p2-dash { position: relative; width: 100%; height: 100%; background: white;
  border-radius: 20px; overflow: hidden; display: flex; flex-direction: column;
  box-shadow: 0 30px 80px -30px rgba(15,23,42,0.22), 0 8px 20px -8px rgba(15,23,42,0.06);
  border: 1px solid rgba(15,23,42,0.05); }

/* ===== TOP BAR ===== */
.p2-bar { display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px 14px;
  border-bottom: 1px solid rgba(15,23,42,0.05); }
.p2-bar-l { display: flex; align-items: center; gap: 10px; min-width: 0; }
.p2-bar-mark { width: 26px; height: 26px; border-radius: 7px;
  background: linear-gradient(135deg, #1F3FB8 0%, #3666ff 100%);
  color: white; display: grid; place-items: center;
  box-shadow: 0 4px 10px rgba(54,102,255,0.3); flex-shrink: 0; }
.p2-bar-crumbs { display: flex; align-items: center; gap: 8px; min-width: 0; }
.p2-bar-mod { font-size: 13.5px; font-weight: 700; color: #0b1322; letter-spacing: -0.01em; }
.p2-bar-sep { color: #cbd5e1; font-size: 11px; }
.p2-bar-page { font-size: 12.5px; font-weight: 500; color: #64748b;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.p2-bar-r { display: flex; align-items: center; gap: 6px;
  font-family: 'JetBrains Mono', monospace; font-size: 10.5px; font-weight: 700;
  color: #3666ff; }
.p2-bar-r .dot { width: 6px; height: 6px; border-radius: 50%; background: #3666ff;
  box-shadow: 0 0 0 3px rgba(54,102,255,0.18);
  animation: p2-pulse 1.6s ease-in-out infinite; }
@keyframes p2-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }

/* ===== STEP DOTS ===== */
.p2-steps { display: flex; align-items: center; gap: 6px;
  padding: 12px 20px 0; }
.p2-steps .pd { height: 4px; background: #e2e8f0; border-radius: 99px;
  flex: 1; transition: all .35s ease; }
.p2-steps .pd.on { background: #3666ff; }
.p2-steps .pd.done { background: #cbd5e1; }
.p2-stepLbl { padding: 8px 20px 0; display: flex; align-items: baseline; gap: 8px; }
.p2-stepLbl .t { font-size: 12.5px; font-weight: 700; color: #0b1322; letter-spacing: -0.005em; }
.p2-stepLbl .s { font-family: 'JetBrains Mono', monospace; font-size: 10px;
  font-weight: 600; color: #94a3b8; letter-spacing: 0.06em; }

/* ===== STAGE ===== */
.p2-stage { flex: 1; margin: 12px 18px 18px;
  background: #fbfcfe; border: 1px solid rgba(15,23,42,0.06);
  border-radius: 14px; padding: 16px;
  position: relative; overflow: hidden; min-height: 0; }

.p2-cap { position: absolute; left: 16px; bottom: 14px; right: 16px;
  font-size: 11px; color: #64748b; line-height: 1.4;
  display: flex; align-items: center; gap: 8px;
  transition: opacity .35s ease; opacity: 0; pointer-events: none; }
.p2-cap.on { opacity: 1; }
.p2-cap .cd { width: 5px; height: 5px; border-radius: 50%;
  background: #3666ff; flex-shrink: 0;
  animation: p2-pulse 1.6s ease-in-out infinite; }

.p2-scene { position: absolute; inset: 16px; bottom: 38px;
  opacity: 0; transition: opacity .4s ease; pointer-events: none; }
.p2-scene.on { opacity: 1; }

/* ===== SCENES 1 & 2 — RFQ + FAN ===== */
.p2-stageFan { position: absolute; inset: 0; }
.p2-rfq { position: absolute; left: 50%; top: 8px;
  width: 188px; padding: 11px 14px;
  background: white;
  border: 1px solid rgba(54,102,255,0.25);
  border-radius: 12px; transform: translateX(-50%) scale(0.85); opacity: 0;
  box-shadow: 0 10px 22px -8px rgba(54,102,255,0.2);
  transition: all .55s cubic-bezier(.22,.61,.36,1); z-index: 4; }
.p2-rfq.in { transform: translateX(-50%) scale(1); opacity: 1; }
.p2-rfq::after { content: ""; position: absolute; inset: -4px; border-radius: 16px;
  border: 1.5px solid rgba(54,102,255,0.2);
  animation: p2-ring 2.4s ease-out infinite; opacity: 0; pointer-events: none; }
.p2-rfq.in::after { opacity: 1; }
@keyframes p2-ring { 0% { transform: scale(0.94); opacity: 0.7; } 100% { transform: scale(1.12); opacity: 0; } }
.p2-rfq .rh { display: flex; justify-content: space-between; align-items: center; }
.p2-rfq .rh .tag { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 800;
  color: #3666ff; letter-spacing: 0.06em; }
.p2-rfq .rh .live { font-size: 9px; font-weight: 700; color: #00b884;
  display: flex; align-items: center; gap: 4px; }
.p2-rfq .rh .live::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: #00b884; }
.p2-rfq .rtitle { font-size: 12px; font-weight: 800; color: #0b1322; margin-top: 6px;
  letter-spacing: -0.015em; line-height: 1.2; }
.p2-rfq .rmeta { font-size: 10px; color: #64748b; margin-top: 3px; display: flex; gap: 12px;
  font-variant-numeric: tabular-nums; }
.p2-rfq .rmeta b { color: #0b1322; font-weight: 700; }

.p2-vendor { position: absolute; width: 124px; padding: 8px 11px;
  background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 10px;
  transform: scale(0.7); opacity: 0;
  transition: all .55s cubic-bezier(.22,.61,.36,1); z-index: 3; }
.p2-vendor.in { transform: scale(1); opacity: 1; }
.p2-vendor.delivered { border-color: rgba(0,184,132,0.3); background: #f6fcf9; }
.p2-vendor .vh { display: flex; align-items: center; gap: 7px; }
.p2-vendor .vlogo { width: 22px; height: 22px; border-radius: 5px; display: grid; place-items: center;
  background: linear-gradient(135deg, #475569, #64748b);
  color: white; font-size: 9.5px; font-weight: 800; flex-shrink: 0; }
.p2-vendor .vname { font-size: 10.5px; font-weight: 700; color: #0b1322;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.p2-vendor .vmeta { font-size: 9px; color: #94a3b8; margin-top: 5px;
  display: flex; align-items: center; gap: 5px;
  font-family: 'JetBrains Mono', monospace; font-weight: 600;
  letter-spacing: 0.04em; }
.p2-vendor .vdot { width: 5px; height: 5px; border-radius: 50%; background: #cbd5e1; transition: all .3s ease; }
.p2-vendor.delivered .vmeta { color: #00b884; }
.p2-vendor.delivered .vdot { background: #00b884; }

.p2-fanEdges { position: absolute; inset: 0; pointer-events: none; }
.p2-fanEdges svg { width: 100%; height: 100%; overflow: visible; }
.p2-fanEdges path { fill: none; stroke: #3666ff; stroke-width: 1.2;
  stroke-opacity: 0.4;
  stroke-dasharray: 4 4; stroke-dashoffset: 200; transition: stroke-dashoffset .6s ease, stroke .3s ease; }
.p2-fanEdges path.in { stroke-dashoffset: 0; animation: p2-flow 1.2s linear infinite; }
@keyframes p2-flow { to { stroke-dashoffset: -16; } }
.p2-fanEdges path.delivered { stroke: #00b884; stroke-opacity: 0.55; }

/* ===== SCENE 3 — SCHEDULE ===== */
.p2-sched { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 12px; }
.p2-schedTrack { position: relative;
  background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 12px;
  padding: 22px 18px 18px; }
.p2-schedLine { position: absolute; left: 32px; right: 32px; top: 46px; height: 2px;
  background: #e2e8f0; border-radius: 2px; }
.p2-schedLine::after { content: ""; position: absolute; left: 0; top: 0;
  height: 100%; width: var(--p, 0%);
  background: #3666ff;
  border-radius: 2px; transition: width .8s ease; }
.p2-schedStops { position: relative; display: flex; justify-content: space-between;
  margin: 0 8px; }
.p2-schedStop { display: flex; flex-direction: column; align-items: center; gap: 7px;
  position: relative; z-index: 2; }
.p2-schedDot { width: 16px; height: 16px; border-radius: 50%;
  background: white; border: 2px solid #cbd5e1;
  display: grid; place-items: center;
  transition: all .35s cubic-bezier(.34,1.56,.64,1); }
.p2-schedDot.fired { background: #3666ff; border-color: #3666ff;
  box-shadow: 0 0 0 4px rgba(54,102,255,0.15); }
.p2-schedDot.fired svg { color: white; }
.p2-schedDot.done { background: #00b884; border-color: #00b884;
  box-shadow: 0 0 0 4px rgba(0,184,132,0.15); }
.p2-schedLbl { font-size: 10px; font-weight: 800; color: #94a3b8; letter-spacing: 0.04em;
  font-family: 'JetBrains Mono', monospace; }
.p2-schedSub { font-size: 9.5px; color: #64748b; text-align: center; max-width: 80px; line-height: 1.3; }
.p2-schedStop.fired .p2-schedLbl { color: #3666ff; }
.p2-schedStop.done  .p2-schedLbl { color: #00b884; }

.p2-schedLog { display: flex; flex-direction: column; gap: 6px; flex: 1; min-height: 0; }
.p2-logRow { display: flex; align-items: center; gap: 10px;
  padding: 9px 12px;
  background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 9px;
  font-size: 10.5px; color: #475569;
  opacity: 0; transform: translateY(6px);
  transition: all .35s ease; }
.p2-logRow.in { opacity: 1; transform: translateY(0); }
.p2-logRow .lic { width: 22px; height: 22px; border-radius: 6px;
  background: rgba(54,102,255,0.1); color: #3666ff;
  display: grid; place-items: center; flex-shrink: 0; }
.p2-logRow .lt { flex: 1; }
.p2-logRow .lt b { color: #0b1322; font-weight: 700; }
.p2-logRow .lm { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; color: #94a3b8;
  font-variant-numeric: tabular-nums; }

/* ===== SCENE 4 — QUOTES ===== */
.p2-quotes { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 6px; }
.p2-qhead { display: grid; grid-template-columns: 1.4fr 0.7fr 0.5fr 0.5fr; gap: 8px;
  font-size: 8.5px; font-weight: 800; color: #94a3b8;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 4px 12px 8px; border-bottom: 1px solid rgba(15,23,42,0.05); }
.p2-qrow { display: grid; grid-template-columns: 1.4fr 0.7fr 0.5fr 0.5fr; gap: 8px;
  padding: 9px 12px; align-items: center;
  background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 9px;
  opacity: 0; transform: translateX(-10px);
  transition: all .45s cubic-bezier(.22,.61,.36,1); }
.p2-qrow.in { opacity: 1; transform: translateX(0); }
.p2-qrow.best { border-color: rgba(0,184,132,0.35);
  background: #f6fcf9; }
.p2-qrow .qv { display: flex; align-items: center; gap: 8px; min-width: 0; }
.p2-qrow .qvlogo { width: 22px; height: 22px; border-radius: 5px;
  display: grid; place-items: center;
  background: linear-gradient(135deg, #475569, #64748b);
  color: white;
  font-size: 9.5px; font-weight: 800; flex-shrink: 0; }
.p2-qrow .qvname { font-size: 10.5px; font-weight: 700; color: #0b1322;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.p2-qrow .qprice { font-family: 'JetBrains Mono', monospace; font-size: 11.5px;
  font-weight: 800; color: #0b1322; font-variant-numeric: tabular-nums; }
.p2-qrow.best .qprice { color: #00b884; }
.p2-qrow .qlead { font-size: 10px; color: #64748b;
  font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
.p2-qrow .qbadge { font-size: 8.5px; font-weight: 800; padding: 3px 7px; border-radius: 4px;
  background: #f1f5f9; color: #64748b; letter-spacing: 0.04em; text-align: center; }
.p2-qrow.best .qbadge { background: #00b884; color: white; }

/* ===== SCENE 5 — APPROVAL ===== */
.p2-approve { position: absolute; inset: 0; padding: 8px 0;
  display: flex; flex-direction: column; gap: 16px; }
.p2-approveTitle { font-size: 11px; font-weight: 700; color: #475569;
  display: flex; align-items: center; justify-content: space-between; }
.p2-approveTitle .ar { font-family: 'JetBrains Mono', monospace; font-size: 10px;
  color: #00b884; font-weight: 700; letter-spacing: 0.04em;
  opacity: 0; transition: opacity .4s ease; }
.p2-approveTitle.in .ar { opacity: 1; }
.p2-approveSteps { display: flex; gap: 11px; }
.p2-approveStep { flex: 1; background: white; border: 1px solid rgba(15,23,42,0.08);
  border-radius: 11px; padding: 12px 13px; position: relative;
  transition: all .5s cubic-bezier(.22,.61,.36,1); }
.p2-approveStep .as { display: flex; align-items: center; gap: 9px; }
.p2-approveStep .ai { width: 30px; height: 30px; border-radius: 8px;
  background: rgba(148,163,184,0.15); color: #94a3b8;
  display: grid; place-items: center;
  transition: all .35s ease; flex-shrink: 0; }
.p2-approveStep .at { font-size: 11.5px; font-weight: 800; color: #0b1322;
  letter-spacing: -0.01em; }
.p2-approveStep .ad { font-size: 9.5px; color: #94a3b8; margin-top: 2px;
  font-family: 'JetBrains Mono', monospace; letter-spacing: 0.04em; }
.p2-approveStep .au { font-size: 9.5px; color: #64748b; margin-top: 8px; padding-top: 8px;
  border-top: 1px dashed rgba(15,23,42,0.08); display: flex; align-items: center; gap: 7px; }
.p2-approveStep .av { width: 20px; height: 20px; border-radius: 50%;
  display: grid; place-items: center;
  background: linear-gradient(135deg, #475569, #64748b);
  color: white;
  font-size: 8px; font-weight: 800; flex-shrink: 0; }
.p2-approveStep.active { border-color: rgba(54,102,255,0.35);
  box-shadow: 0 6px 14px -8px rgba(54,102,255,0.25); }
.p2-approveStep.active .ai { background: rgba(54,102,255,0.12); color: #3666ff; }
.p2-approveStep.done { border-color: rgba(0,184,132,0.3); background: #f6fcf9; }
.p2-approveStep.done .ai { background: rgba(0,184,132,0.12); color: #00b884; }
.p2-approveStep.done .ad { color: #00b884; }
.p2-approveBars { display: flex; gap: 11px; }
.p2-approveBar { flex: 1; height: 4px; background: #e2e8f0; border-radius: 99px; overflow: hidden; }
.p2-approveBar::after { content: ""; display: block; height: 100%; width: 0;
  background: #3666ff;
  transition: width .8s cubic-bezier(.22,.61,.36,1); border-radius: 99px; }
.p2-approveBar.fill::after { width: 100%; background: #00b884; }

/* ===== SCENE 6 — FINALE ===== */
.p2-finale { position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 14px; padding: 0 14px; }
.p2-compare { display: flex; gap: 18px; align-items: center;
  background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 12px;
  padding: 14px 22px; }
.p2-compare .col { text-align: center; }
.p2-compare .col .v { font-size: 24px; font-weight: 800; font-variant-numeric: tabular-nums; letter-spacing: -0.025em; line-height: 1; }
.p2-compare .col .l { font-size: 9px; font-weight: 700; color: #94a3b8;
  margin-top: 5px; letter-spacing: 0.1em; text-transform: uppercase; }
.p2-compare .col.before .v { color: #94a3b8; text-decoration: line-through; }
.p2-compare .col.after  .v { color: #00b884; }
.p2-compare .arrow { color: #3666ff; }
.p2-fbig { font-size: 44px; font-weight: 800; letter-spacing: -0.04em;
  color: #0b1322; line-height: 1; margin-top: 2px; }
.p2-fbig .em { color: #3666ff; }
.p2-fsub { font-size: 11px; font-weight: 700; color: #94a3b8;
  letter-spacing: 0.1em; text-transform: uppercase; }
.p2-fchips { display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap; justify-content: center; }
.p2-fchip { display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px;
  background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 999px;
  font-size: 10px; font-weight: 600; color: #475569;
  opacity: 0; transform: translateY(4px); transition: all .4s ease; }
.p2-fchip.in { opacity: 1; transform: translateY(0); }
.p2-fchip .ic { color: #00b884; }
`;

/* ============ DATA ============ */
const VENDORS = [
  { id: "v1", name: "Vertex Mfg",     code: "VM", x: 10, y: 38 },
  { id: "v2", name: "PrimeForge Co.",  code: "PF", x: 10, y: 80 },
  { id: "v3", name: "TitanSupply",     code: "TS", x: 50, y: 92 },
  { id: "v4", name: "Apex Industrial", code: "AI", x: 90, y: 80 },
  { id: "v5", name: "BoltWorks Inc.",  code: "BW", x: 90, y: 38 },
];
const RFQ_X = 50, RFQ_Y = 14;

const SCHEDULE = [
  { d: "Day 0", lbl: "RFQ sent",         ic: "Send" },
  { d: "Day 2", lbl: "Auto reminder",    ic: "Mail" },
  { d: "Day 4", lbl: "Auto escalation",  ic: "Repeat" },
  { d: "Day 5", lbl: "Quotes received",  ic: "Check" },
];

const QUOTES = [
  { code: "PF", name: "PrimeForge Co.",   price: 18.42, lead: "12 d" },
  { code: "VM", name: "Vertex Mfg",       price: 19.10, lead: "10 d" },
  { code: "AI", name: "Apex Industrial",  price: 19.85, lead: "14 d" },
  { code: "BW", name: "BoltWorks Inc.",    price: 20.40, lead: "9 d"  },
  { code: "TS", name: "TitanSupply",      price: 21.20, lead: "11 d" },
];

const APPROVAL_STEPS = [
  { name: "Buyer",   who: "Priya S.",  role: "Procurement",   code: "PS" },
  { name: "Manager", who: "Vikram K.", role: "Category Lead", code: "VK" },
  { name: "Finance", who: "Tara S.",   role: "CFO Sign-off",  code: "TS" },
];

/* ============ MAIN COMPONENT ============ */
function Phase2AutomationAnimation({ speed = 1 } = {}) {
  useEffect2(() => {
    if (document.getElementById("p2-style")) return;
    const s = document.createElement("style");
    s.id = "p2-style"; s.textContent = P2_STYLE;
    document.head.appendChild(s);
  }, []);

  const [phase, setPhase] = useState2(0);
  const [rfqIn, setRfqIn] = useState2(false);
  const [vendorN, setVendorN] = useState2(0);
  const [pingsIn, setPingsIn] = useState2(false);
  const [delivered, setDelivered] = useState2(false);
  const [schedN, setSchedN] = useState2(0);
  const [schedLog, setSchedLog] = useState2(0);
  const [quoteN, setQuoteN] = useState2(0);
  const [approveN, setApproveN] = useState2(0);
  const [chipsN, setChipsN] = useState2(0);

  const cancelRef = useRef2(false);
  const speedMul = Math.max(0.3, Number(speed) || 1);

  useEffect2(() => {
    cancelRef.current = false;
    const sleep = (ms) => new Promise(r => setTimeout(r, ms / speedMul));

    async function loop() {
      while (!cancelRef.current) {
        setPhase(0); setRfqIn(false); setVendorN(0); setPingsIn(false);
        setDelivered(false); setSchedN(0); setSchedLog(0); setQuoteN(0);
        setApproveN(0); setChipsN(0);
        await sleep(400);

        setPhase(1);
        setRfqIn(true);
        await sleep(1400);

        setPhase(2);
        for (let i = 1; i <= VENDORS.length; i++) {
          if (cancelRef.current) return;
          setVendorN(i);
          await sleep(140);
        }
        await sleep(200);
        setPingsIn(true);
        await sleep(1100);
        setDelivered(true);
        await sleep(1100);

        setPhase(3);
        await sleep(500);
        for (let i = 1; i <= SCHEDULE.length; i++) {
          if (cancelRef.current) return;
          setSchedN(i);
          await sleep(140);
          setSchedLog(Math.min(i, 3));
          await sleep(450);
        }
        await sleep(800);

        setPhase(4);
        await sleep(400);
        for (let i = 1; i <= QUOTES.length; i++) {
          if (cancelRef.current) return;
          setQuoteN(i);
          await sleep(220);
        }
        await sleep(1400);

        setPhase(5);
        await sleep(500);
        for (let i = 1; i <= APPROVAL_STEPS.length; i++) {
          if (cancelRef.current) return;
          setApproveN(i);
          await sleep(540);
        }
        await sleep(900);

        setPhase(6);
        for (let i = 1; i <= 4; i++) {
          if (cancelRef.current) return;
          setChipsN(i);
          await sleep(140);
        }
        await sleep(3000);
      }
    }
    loop();
    return () => { cancelRef.current = true; };
  }, [speedMul]);

  const captions = {
    0: "",
    1: "RFQ drafted in seconds — items, qty, deadline.",
    2: "Fan-out to every approved vendor. Automatically.",
    3: "Auto follow-ups & escalations. Zero chasing.",
    4: "All quotes streamed back. Sorted, compared, ready.",
    5: "Approvals flow without manual chasing.",
    6: "3 days of manual work → 4 hours of decisions.",
  };

  const stageTitle =
    phase === 0 || phase === 1 ? "RFQ Draft" :
    phase === 2 ? "Multi-Vendor RFQ" :
    phase === 3 ? "Auto Follow-up Schedule" :
    phase === 4 ? "Quote Comparison" :
    phase === 5 ? "Approval Flow" :
    phase === 6 ? "Optimized" : "RFQ";

  const stageTag =
    phase === 1 ? "DRAFT" :
    phase === 2 ? "SENT" :
    phase === 3 ? "SCHEDULED" :
    phase === 4 ? "5 / 5" :
    phase === 5 ? "AUTO-ROUTED" :
    phase === 6 ? "CLOSED" : "";

  const edgeOf = (v) => `M ${RFQ_X} ${RFQ_Y + 6} Q ${(RFQ_X + v.x) / 2} ${(RFQ_Y + v.y) / 2 - 6}, ${v.x} ${v.y}`;

  return (
    <div className="p2-root">
      <div className="p2-dash">
        {/* TOP BAR */}
        <div className="p2-bar">
          <div className="p2-bar-l">
            <div className="p2-bar-mark"><P2I.Bolt s={14}/></div>
            <div className="p2-bar-crumbs">
              <span className="p2-bar-mod">Sourcing</span>
              <span className="p2-bar-sep">/</span>
              <span className="p2-bar-page">RFQ-2024-0871 · Steel Bracket M8</span>
            </div>
          </div>
          <div className="p2-bar-r">
            <span className="dot"/>
            AUTO-PILOT
          </div>
        </div>

        {/* STEP BARS */}
        <div className="p2-steps">
          {[1,2,3,4,5,6].map(i =>
            <div key={i} className={"pd " + (phase === i ? "on" : phase > i ? "done" : "")}/>
          )}
        </div>
        <div className="p2-stepLbl">
          <span className="t">{stageTitle}</span>
          {stageTag && <span className="s">· {stageTag}</span>}
        </div>

        {/* STAGE */}
        <div className="p2-stage">
          {/* SCENES 1+2 — RFQ + FAN */}
          <div className={"p2-scene " + ((phase === 1 || phase === 2) ? "on" : "")}>
            <div className="p2-stageFan">
              <div className={"p2-rfq " + (rfqIn ? "in" : "")}>
                <div className="rh">
                  <span className="tag">RFQ-2024-0871</span>
                  <span className="live">Live</span>
                </div>
                <div className="rtitle">Steel Bracket M8 · 304</div>
                <div className="rmeta">
                  <span>Qty <b>1,200</b></span>
                  <span>Due <b>Sep 15</b></span>
                </div>
              </div>
              <div className="p2-fanEdges">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                  {VENDORS.map((v, i) => (
                    <path key={v.id}
                          d={edgeOf(v)}
                          className={(vendorN > i && pingsIn ? "in " : "") + (delivered ? "delivered" : "")}
                          pathLength={200}/>
                  ))}
                </svg>
              </div>
              {VENDORS.map((v, i) => (
                <div key={v.id}
                     className={"p2-vendor " + (vendorN > i ? "in " : "") + (delivered ? "delivered" : "")}
                     style={{
                       left: `calc(${v.x}% - 62px)`,
                       top: `calc(${v.y}% - 20px)`,
                     }}>
                  <div className="vh">
                    <div className="vlogo">{v.code}</div>
                    <div className="vname">{v.name}</div>
                  </div>
                  <div className="vmeta">
                    <span className="vdot"/>
                    <span>{delivered ? "DELIVERED" : pingsIn ? "SENDING…" : "QUEUED"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SCENE 3 — SCHEDULE */}
          <div className={"p2-scene " + (phase === 3 ? "on" : "")}>
            <div className="p2-sched">
              <div className="p2-schedTrack">
                <div className="p2-schedLine" style={{"--p": `${Math.min(100, (schedN/SCHEDULE.length)*100)}%`}}/>
                <div className="p2-schedStops">
                  {SCHEDULE.map((st, i) => {
                    const Ic = P2I[st.ic] || P2I.Mail;
                    const fired = schedN > i;
                    const done = schedN > i + 1 || (i === SCHEDULE.length - 1 && schedN >= SCHEDULE.length);
                    const cls = "p2-schedStop" + (fired ? " fired" : "") + (done ? " done" : "");
                    return (
                      <div key={st.d} className={cls}>
                        <div className={"p2-schedDot " + (fired ? "fired " : "") + (done ? "done" : "")}>
                          {fired && <Ic s={8}/>}
                        </div>
                        <div className="p2-schedLbl">{st.d}</div>
                        <div className="p2-schedSub">{st.lbl}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="p2-schedLog">
                {[
                  { ic: P2I.Send, t: <><b>RFQ-2024-0871</b> sent to 5 vendors</>, m: "T+0" },
                  { ic: P2I.Mail, t: <>Auto-reminder fired to <b>2 non-responders</b></>, m: "T+48h" },
                  { ic: P2I.Check, t: <><b>5 of 5</b> quotes received</>, m: "T+5d" },
                ].slice(0, schedLog).map((row, i) => (
                  <div key={i} className={"p2-logRow in"}>
                    <div className="lic"><row.ic s={11}/></div>
                    <div className="lt">{row.t}</div>
                    <div className="lm">{row.m}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SCENE 4 — QUOTES */}
          <div className={"p2-scene " + (phase === 4 ? "on" : "")}>
            <div className="p2-quotes">
              <div className="p2-qhead">
                <div>Vendor</div>
                <div>Unit Price</div>
                <div>Lead</div>
                <div style={{textAlign:"right"}}>Rank</div>
              </div>
              {QUOTES.map((q, i) => (
                <div key={q.code} className={"p2-qrow " + (quoteN > i ? "in " : "") + (i === 0 && quoteN >= QUOTES.length ? "best" : "")}>
                  <div className="qv">
                    <div className="qvlogo">{q.code}</div>
                    <div className="qvname">{q.name}</div>
                  </div>
                  <div className="qprice">${q.price.toFixed(2)}</div>
                  <div className="qlead">{q.lead}</div>
                  <div className="qbadge">{i === 0 && quoteN >= QUOTES.length ? "BEST" : `#${i+1}`}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SCENE 5 — APPROVAL */}
          <div className={"p2-scene " + (phase === 5 ? "on" : "")}>
            <div className="p2-approve">
              <div className={"p2-approveTitle " + (approveN >= 3 ? "in" : "")}>
                <span>Approval chain · Auto-routed</span>
                <span className="ar">APPROVED · {approveN} / 3</span>
              </div>
              <div className="p2-approveSteps">
                {APPROVAL_STEPS.map((s, i) => {
                  const isAct = approveN === i;
                  const isDone = approveN > i;
                  const cls = "p2-approveStep" + (isDone ? " done" : isAct ? " active" : "");
                  return (
                    <div key={s.name} className={cls}>
                      <div className="as">
                        <div className="ai">{isDone ? <P2I.Check s={15}/> : <P2I.Shield s={15}/>}</div>
                        <div>
                          <div className="at">{s.name}</div>
                          <div className="ad">{isDone ? "APPROVED" : isAct ? "REVIEWING" : "PENDING"}</div>
                        </div>
                      </div>
                      <div className="au">
                        <div className="av">{s.code}</div>
                        <span>{s.who}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p2-approveBars">
                {APPROVAL_STEPS.map((_, i) => (
                  <div key={i} className={"p2-approveBar " + (approveN > i ? "fill" : "")}/>
                ))}
              </div>
            </div>
          </div>

          {/* SCENE 6 — FINALE */}
          <div className={"p2-scene " + (phase === 6 ? "on" : "")}>
            <div className="p2-finale">
              <div className="p2-compare">
                <div className="col before"><div className="v">3 days</div><div className="l">Manual RFQ</div></div>
                <div className="arrow"><P2I.Arrow s={16}/></div>
                <div className="col after"><div className="v">4 hours</div><div className="l">FactWise</div></div>
              </div>
              <div className="p2-fbig"><span className="em">10×</span> faster</div>
              <div className="p2-fsub">From RFQ to PO</div>
              <div className="p2-fchips">
                <div className={"p2-fchip " + (chipsN >= 1 ? "in" : "")}><span className="ic"><P2I.Check s={11}/></span>Auto fan-out</div>
                <div className={"p2-fchip " + (chipsN >= 2 ? "in" : "")}><span className="ic"><P2I.Check s={11}/></span>Auto follow-ups</div>
                <div className={"p2-fchip " + (chipsN >= 3 ? "in" : "")}><span className="ic"><P2I.Check s={11}/></span>Auto-routed approvals</div>
                <div className={"p2-fchip " + (chipsN >= 4 ? "in" : "")}><span className="ic"><P2I.Check s={11}/></span>Zero manual chasing</div>
              </div>
            </div>
          </div>

          <div className={"p2-cap " + (captions[phase] ? "on" : "")}>
            <span className="cd"/>
            {captions[phase] || ""}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Phase2AutomationAnimation = Phase2AutomationAnimation;

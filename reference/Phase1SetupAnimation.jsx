/* ============================================================
 * Phase1SetupAnimation.jsx — v2 (clean)
 * "Go Live. With Full Support." — Weeks 2–8
 *
 * Story (loops ~18s):
 *  1. PLAN     — 4 milestones appear as quiet chips
 *  2. CATALOG  — CSV migrates, counter ticks 0→2,847
 *  3. WORKFLOW — 4 workflow nodes connect with arrows
 *  4. APPROVAL — assignees land on each node
 *  5. TRAINING — 6 user cards earn TRAINED tags
 *  6. GO LIVE  — single ready state
 *
 * Design language:
 *  - Single accent: #3666ff. Success: #00b884 (only for done states).
 *  - No mac chrome, no sidebar rail, no rainbow avatars.
 *  - One step indicator (4 milestone chips). No redundant headers.
 * ============================================================ */

const { useState: useState1, useEffect: useEffect1, useRef: useRef1 } = React;

const P1I = {
  Catalog: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Workflow: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 6h6"/><path d="M9 18H6"/><path d="M18 9v6"/></svg>,
  Users: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Shield: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Check: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Rocket: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  Plus: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  Settings: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6"/><path d="M4.22 4.22l4.24 4.24m7.07 7.07l4.25 4.25"/><path d="M1 12h6m10 0h6"/><path d="M4.22 19.78l4.24-4.24m7.07-7.07l4.25-4.25"/></svg>,
};

const P1_STYLE = `
.p1-root { position: relative; aspect-ratio: 1 / 1.04; max-width: 600px; width: 100%;
  font-family: 'Inter', system-ui, sans-serif; color: #0b1322; }
.p1-dash { position: relative; width: 100%; height: 100%; background: white;
  border-radius: 20px; overflow: hidden; display: flex; flex-direction: column;
  box-shadow: 0 30px 80px -30px rgba(15,23,42,0.22), 0 8px 20px -8px rgba(15,23,42,0.06);
  border: 1px solid rgba(15,23,42,0.05); }

/* ===== TOP BAR (replaces chrome + header) ===== */
.p1-bar { display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px 14px;
  border-bottom: 1px solid rgba(15,23,42,0.05); }
.p1-bar-l { display: flex; align-items: center; gap: 10px; min-width: 0; }
.p1-bar-mark { width: 26px; height: 26px; border-radius: 7px;
  background: linear-gradient(135deg, #1F3FB8 0%, #3666ff 100%);
  color: white; display: grid; place-items: center;
  box-shadow: 0 4px 10px rgba(54,102,255,0.3); flex-shrink: 0; }
.p1-bar-crumbs { display: flex; align-items: center; gap: 8px; min-width: 0; }
.p1-bar-mod { font-size: 13.5px; font-weight: 700; color: #0b1322; letter-spacing: -0.01em; }
.p1-bar-sep { color: #cbd5e1; font-size: 11px; }
.p1-bar-page { font-size: 12.5px; font-weight: 500; color: #64748b;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.p1-bar-r { display: flex; align-items: center; gap: 6px;
  font-family: 'JetBrains Mono', monospace; font-size: 10.5px; font-weight: 700;
  color: #3666ff; }
.p1-bar-r .dot { width: 6px; height: 6px; border-radius: 50%; background: #3666ff;
  box-shadow: 0 0 0 3px rgba(54,102,255,0.18);
  animation: p1-pulse 1.6s ease-in-out infinite; }
@keyframes p1-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }

/* ===== MILESTONE CHIPS ===== */
.p1-milestones { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
  padding: 14px 18px 0; }
.p1-ms { display: flex; align-items: center; gap: 8px;
  padding: 9px 12px;
  background: #fbfcfe; border: 1px solid rgba(15,23,42,0.06);
  border-radius: 9px;
  transition: all .4s cubic-bezier(.22,.61,.36,1); }
.p1-ms .ic { width: 18px; height: 18px; border-radius: 5px;
  background: rgba(148,163,184,0.15); color: #94a3b8;
  display: grid; place-items: center; flex-shrink: 0;
  transition: all .35s ease; }
.p1-ms .nm { font-size: 11px; font-weight: 700; color: #475569; letter-spacing: -0.01em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.p1-ms.act { background: white; border-color: rgba(54,102,255,0.3);
  box-shadow: 0 4px 12px -6px rgba(54,102,255,0.25); }
.p1-ms.act .ic { background: rgba(54,102,255,0.12); color: #3666ff; }
.p1-ms.act .nm { color: #0b1322; }
.p1-ms.done { background: white; border-color: rgba(0,184,132,0.3); }
.p1-ms.done .ic { background: rgba(0,184,132,0.12); color: #00b884; }
.p1-ms.done .nm { color: #0b1322; }

/* ===== STAGE ===== */
.p1-stage { flex: 1; margin: 14px 18px 18px;
  background: #fbfcfe; border: 1px solid rgba(15,23,42,0.06);
  border-radius: 14px; padding: 16px 16px 14px;
  position: relative; overflow: hidden; min-height: 0; }
.p1-stageHead { display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 12px; }
.p1-stageHead .t { font-size: 12.5px; font-weight: 700; color: #0b1322; letter-spacing: -0.005em; }
.p1-stageHead .s { font-family: 'JetBrains Mono', monospace; font-size: 10px;
  font-weight: 600; color: #94a3b8; letter-spacing: 0.04em; }

.p1-cap { position: absolute; left: 16px; bottom: 14px; right: 16px;
  font-size: 11px; color: #64748b; line-height: 1.4;
  display: flex; align-items: center; gap: 8px;
  transition: opacity .35s ease; opacity: 0; pointer-events: none; }
.p1-cap.on { opacity: 1; }
.p1-cap .cd { width: 5px; height: 5px; border-radius: 50%;
  background: #3666ff; flex-shrink: 0;
  animation: p1-pulse 1.6s ease-in-out infinite; }

.p1-scene { position: absolute; inset: 16px; top: 46px; bottom: 38px;
  opacity: 0; transition: opacity .4s ease; pointer-events: none; }
.p1-scene.on { opacity: 1; }

/* ===== SCENE 0 — PLAN ===== */
.p1-plan { position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 18px; padding: 0 18px; }
.p1-planBig { font-size: 15px; font-weight: 700; color: #0b1322; text-align: center;
  letter-spacing: -0.015em; line-height: 1.35; max-width: 340px; }
.p1-planRow { display: flex; gap: 12px; }
.p1-planChip { display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 12px 16px 14px;
  background: white; border: 1px solid rgba(15,23,42,0.06);
  border-radius: 12px;
  min-width: 92px;
  opacity: 0; transform: translateY(8px);
  transition: all .5s cubic-bezier(.22,.61,.36,1); }
.p1-planChip.in { opacity: 1; transform: translateY(0); }
.p1-planChip .pic { width: 30px; height: 30px; border-radius: 8px; display: grid;
  place-items: center; background: rgba(54,102,255,0.1); color: #3666ff; }
.p1-planChip .plbl { font-size: 10.5px; font-weight: 700; color: #475569; }

/* ===== SCENE 1 — CATALOG ===== */
.p1-cat { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; }
.p1-catTop { display: flex; align-items: center; justify-content: space-between;
  background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 10px;
  padding: 10px 14px; }
.p1-catFile { display: flex; align-items: center; gap: 10px; }
.p1-catFile .fi { width: 26px; height: 30px; border-radius: 5px;
  background: linear-gradient(135deg, #4A6FFF 0%, #2f59ff 100%); color: white;
  display: grid; place-items: center; position: relative;
  font-size: 8px; font-weight: 800; font-family: 'JetBrains Mono', monospace; }
.p1-catFile .fi::after { content: ""; position: absolute; top: 0; right: 0; width: 7px; height: 7px;
  background: white; clip-path: polygon(0 0, 100% 0, 100% 100%); }
.p1-catFile .fn { font-size: 11.5px; font-weight: 700; color: #0b1322; }
.p1-catFile .fs { font-size: 10px; color: #94a3b8; margin-top: 1px; }
.p1-catCount { text-align: right; }
.p1-catCount .v { font-size: 20px; font-weight: 800; color: #3666ff;
  font-variant-numeric: tabular-nums; line-height: 1; letter-spacing: -0.02em; }
.p1-catCount .l { font-size: 8.5px; font-weight: 700; color: #94a3b8;
  letter-spacing: 0.1em; text-transform: uppercase; margin-top: 3px; }
.p1-catBar { height: 4px; background: #eef2f7; border-radius: 99px; overflow: hidden; }
.p1-catBar::after { content: ""; display: block; height: 100%;
  background: #3666ff;
  width: var(--p, 0%); transition: width .6s ease; border-radius: 99px; }
.p1-catTable { background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 10px;
  flex: 1; overflow: hidden; display: flex; flex-direction: column; }
.p1-catTH { display: grid; grid-template-columns: 1fr 1.6fr 0.7fr 0.7fr;
  font-size: 8.5px; font-weight: 800; color: #94a3b8;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 8px 14px; border-bottom: 1px solid rgba(15,23,42,0.05); background: #fbfcfe; }
.p1-catRow { display: grid; grid-template-columns: 1fr 1.6fr 0.7fr 0.7fr;
  font-size: 10.5px; padding: 7px 14px; border-bottom: 1px solid rgba(15,23,42,0.04);
  align-items: center;
  opacity: 0; transform: translateY(6px);
  transition: all .35s ease; }
.p1-catRow.in { opacity: 1; transform: translateY(0); }
.p1-catRow .sku { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; color: #64748b; font-weight: 700; }
.p1-catRow .nm { font-weight: 600; color: #0b1322;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.p1-catRow .qt { color: #94a3b8; font-variant-numeric: tabular-nums;
  font-family: 'JetBrains Mono', monospace; font-size: 9.5px; }
.p1-catRow .ok { color: #00b884; display: flex; justify-content: flex-end; align-items: center; }

/* ===== SCENE 2/3 — WORKFLOW + APPROVAL ===== */
.p1-wf { position: absolute; inset: 0; padding: 4px 0; }
.p1-wfRow { position: relative; display: flex; align-items: center; justify-content: space-between;
  height: 100%; gap: 4px; }
.p1-wfNode { position: relative; z-index: 2; flex: 1; max-width: 118px;
  background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 11px;
  padding: 11px 8px 9px; text-align: center;
  opacity: 0; transform: scale(0.85) translateY(8px);
  transition: all .5s cubic-bezier(.22,.61,.36,1); }
.p1-wfNode.in { opacity: 1; transform: scale(1) translateY(0); }
.p1-wfNode.act { border-color: rgba(54,102,255,0.4);
  background: white;
  box-shadow: 0 8px 18px -10px rgba(54,102,255,0.3); }
.p1-wfNode .wi { width: 28px; height: 28px; border-radius: 8px; margin: 0 auto 7px;
  display: grid; place-items: center;
  background: rgba(54,102,255,0.1); color: #3666ff; }
.p1-wfNode .wn { font-size: 10.5px; font-weight: 800; color: #0b1322; letter-spacing: -0.01em; }
.p1-wfNode .ws { font-family: 'JetBrains Mono', monospace; font-size: 8px;
  font-weight: 700; color: #94a3b8; margin-top: 3px; letter-spacing: 0.04em; }
.p1-wfNode .wa { margin-top: 8px; padding-top: 7px; border-top: 1px dashed rgba(15,23,42,0.08);
  display: flex; gap: 3px; justify-content: center;
  opacity: 0; transition: opacity .4s ease; }
.p1-wfNode .wa.in { opacity: 1; }
.p1-wfNode .av { width: 18px; height: 18px; border-radius: 50%;
  display: grid; place-items: center;
  background: linear-gradient(135deg, #475569, #64748b);
  color: white; font-size: 8px; font-weight: 800;
  border: 1.5px solid white; box-shadow: 0 1px 3px rgba(15,23,42,0.15); }
.p1-wfNode .av + .av { margin-left: -7px; }
.p1-wfEdges { position: absolute; inset: 0; pointer-events: none; }
.p1-wfEdges svg { width: 100%; height: 100%; overflow: visible; }
.p1-wfEdges path { fill: none; stroke: #cbd5e1; stroke-width: 1.5;
  stroke-dasharray: 200; stroke-dashoffset: 200;
  transition: stroke-dashoffset .55s ease, stroke .3s ease; }
.p1-wfEdges path.in { stroke-dashoffset: 0; stroke: #3666ff; stroke-opacity: 0.6; }
.p1-wfEdges path.done { stroke: #00b884; stroke-opacity: 0.7; }

/* ===== SCENE 4 — TRAINING ===== */
.p1-tr { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; }
.p1-trHead { display: flex; align-items: center; justify-content: space-between; padding: 0 2px; }
.p1-trHead .tt { font-size: 11px; font-weight: 700; color: #475569; }
.p1-trHead .tn { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; font-weight: 700;
  color: #00b884; font-variant-numeric: tabular-nums; }
.p1-trGrid { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr; gap: 9px; }
.p1-trCard { background: white; border: 1px solid rgba(15,23,42,0.06);
  border-radius: 10px; padding: 9px 11px; display: flex; align-items: center; gap: 10px;
  position: relative; overflow: hidden;
  transition: all .45s cubic-bezier(.22,.61,.36,1); }
.p1-trAv { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center;
  background: linear-gradient(135deg, #1F3FB8, #3666ff);
  color: white; font-size: 11px; font-weight: 800;
  box-shadow: 0 2px 4px rgba(15,23,42,0.12); flex-shrink: 0; }
.p1-trInfo { min-width: 0; flex: 1; }
.p1-trName { font-size: 10.5px; font-weight: 700; color: #0b1322;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.p1-trRole { font-size: 9px; color: #94a3b8; margin-top: 1px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.p1-trBadge { position: absolute; top: 7px; right: 7px;
  font-size: 8.5px; font-weight: 800;
  color: #00b884;
  display: flex; align-items: center;
  opacity: 0; transform: scale(0.6); transition: all .35s cubic-bezier(.34,1.56,.64,1); }
.p1-trCard.done { border-color: rgba(0,184,132,0.3); background: #f6fcf9; }
.p1-trCard.done .p1-trBadge { opacity: 1; transform: scale(1); }

/* ===== SCENE 5 — GO LIVE ===== */
.p1-go { position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 16px; padding: 0 16px; }
.p1-goRocket { width: 86px; height: 86px; border-radius: 24px;
  background: linear-gradient(135deg, #3666ff 0%, #5e8aff 100%);
  display: grid; place-items: center; color: white;
  box-shadow: 0 20px 30px -10px rgba(54,102,255,0.45);
  animation: p1-rocket 2.4s cubic-bezier(.22,.61,.36,1) infinite;
  position: relative; }
@keyframes p1-rocket {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.p1-goTitle { font-size: 24px; font-weight: 800; letter-spacing: -0.025em;
  color: #0b1322; line-height: 1; }
.p1-goSub { font-size: 11px; font-weight: 700; color: #94a3b8;
  letter-spacing: 0.1em; text-transform: uppercase; margin-top: -4px; }
.p1-goCard { display: flex; gap: 14px;
  padding: 12px 20px;
  background: white; border: 1px solid rgba(0,184,132,0.2); border-radius: 12px;
  margin-top: 6px; }
.p1-goCard .gc { display: flex; align-items: center; gap: 7px; }
.p1-goCard .gc .ic { width: 16px; height: 16px; border-radius: 5px;
  background: rgba(0,184,132,0.12); color: #00b884;
  display: grid; place-items: center; }
.p1-goCard .gc .lb { font-size: 10.5px; font-weight: 700; color: #1e293b; }
`;

/* ============ HOOKS ============ */
function useCountP1(target, active, dur = 1000) {
  const [v, setV] = useState1(0);
  const fromRef = useRef1(0);
  useEffect1(() => {
    if (!active) { setV(0); fromRef.current = 0; return; }
    const start = performance.now();
    const from = fromRef.current;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(from + (target - from) * eased);
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick); else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, dur]);
  return v;
}

/* ============ DATA ============ */
const CATALOG_ROWS = [
  { sku: "STL-0421", nm: "Steel Bracket M8 · 304" },
  { sku: "PCB-1098", nm: "Control Board · Rev D" },
  { sku: "BRG-2210", nm: "Roller Bearing 32mm" },
  { sku: "WIR-0044", nm: "Wire Harness · 1.5m" },
  { sku: "RES-0817", nm: "Epoxy Resin · 5kg drum" },
  { sku: "ENC-3501", nm: "Aluminium Enclosure" },
  { sku: "GSK-0913", nm: "Silicone Gasket · 40mm" },
];

const WF_NODES = [
  { id: "req", name: "Request",   sku: "STEP 01", icon: "Plus",     av: ["AR"] },
  { id: "rev", name: "Review",    sku: "STEP 02", icon: "Settings", av: ["PS"] },
  { id: "app", name: "Approval",  sku: "STEP 03", icon: "Shield",   av: ["TS"] },
  { id: "po",  name: "Issue PO",  sku: "STEP 04", icon: "Catalog",  av: ["VK"] },
];

const TEAM = [
  { ini: "AR", nm: "Aarav R.",   role: "Procurement Lead"   },
  { ini: "PS", nm: "Priya S.",   role: "Buyer · Direct"     },
  { ini: "VK", nm: "Vikram K.",  role: "Category Manager"   },
  { ini: "MN", nm: "Meera N.",   role: "Finance · AP"       },
  { ini: "RG", nm: "Rohan G.",   role: "Plant Manager"      },
  { ini: "TS", nm: "Tara S.",    role: "CFO"                },
];

const MILESTONES = [
  { key: "catalog",   name: "Catalogue",  icon: P1I.Catalog  },
  { key: "workflow",  name: "Workflows",  icon: P1I.Workflow },
  { key: "approvals", name: "Approvals",  icon: P1I.Shield   },
  { key: "training",  name: "Training",   icon: P1I.Users    },
];

/* ============ MAIN COMPONENT ============ */
function Phase1SetupAnimation({ speed = 1 } = {}) {
  useEffect1(() => {
    if (document.getElementById("p1-style")) return;
    const s = document.createElement("style");
    s.id = "p1-style"; s.textContent = P1_STYLE;
    document.head.appendChild(s);
  }, []);

  const [phase, setPhase] = useState1(0);
  const [planChips, setPlanChips] = useState1(0);
  const [catN, setCatN] = useState1(0);
  const [catTarget, setCatTarget] = useState1(0);
  const [wfNodeN, setWfNodeN] = useState1(0);
  const [wfEdgeN, setWfEdgeN] = useState1(0);
  const [wfAvIn, setWfAvIn] = useState1(false);
  const [trainN, setTrainN] = useState1(0);
  const [doneTasks, setDoneTasks] = useState1({});

  const cancelRef = useRef1(false);
  const speedMul = Math.max(0.3, Number(speed) || 1);

  useEffect1(() => {
    cancelRef.current = false;
    const sleep = (ms) => new Promise(r => setTimeout(r, ms / speedMul));

    async function loop() {
      while (!cancelRef.current) {
        setPhase(0); setPlanChips(0); setCatN(0); setCatTarget(0);
        setWfNodeN(0); setWfEdgeN(0); setWfAvIn(false);
        setTrainN(0); setDoneTasks({});
        await sleep(400);

        setPhase(0);
        for (let i = 1; i <= MILESTONES.length; i++) {
          if (cancelRef.current) return;
          setPlanChips(i);
          await sleep(180);
        }
        await sleep(1100);

        setPhase(1);
        await sleep(450);
        setCatTarget(2847);
        for (let i = 1; i <= CATALOG_ROWS.length; i++) {
          if (cancelRef.current) return;
          setCatN(i);
          await sleep(180);
        }
        await sleep(700);
        setDoneTasks(t => ({ ...t, catalog: true }));
        await sleep(400);

        setPhase(2);
        await sleep(350);
        for (let i = 1; i <= WF_NODES.length; i++) {
          if (cancelRef.current) return;
          setWfNodeN(i);
          await sleep(260);
          if (i < WF_NODES.length) setWfEdgeN(i);
          await sleep(150);
        }
        await sleep(550);
        setDoneTasks(t => ({ ...t, workflow: true }));
        await sleep(400);

        setPhase(3);
        setWfAvIn(true);
        await sleep(1500);
        setDoneTasks(t => ({ ...t, approvals: true }));
        await sleep(400);

        setPhase(4);
        await sleep(400);
        for (let i = 1; i <= TEAM.length; i++) {
          if (cancelRef.current) return;
          setTrainN(i);
          await sleep(230);
        }
        await sleep(700);
        setDoneTasks(t => ({ ...t, training: true }));
        await sleep(400);

        setPhase(5);
        await sleep(3200);
      }
    }
    loop();
    return () => { cancelRef.current = true; };
  }, [speedMul]);

  const activeTask =
    phase === 1 ? "catalog"   :
    phase === 2 ? "workflow"  :
    phase === 3 ? "approvals" :
    phase === 4 ? "training"  : null;

  const catCount = useCountP1(catTarget, true, 1400);

  const captions = {
    0: "Your dedicated implementation team — four milestones to go-live.",
    1: "Migrate your full item catalogue. Cleaned, mapped, validated.",
    2: "Configure approval workflows the way your business runs.",
    3: "Assign approvers and roles to every step.",
    4: "Train every user on the platform — hands-on, role-based.",
    5: "Ready to launch. FactWise is live.",
  };

  const stageTitle =
    phase === 0 ? "Implementation Plan" :
    phase === 1 ? "Catalogue Migration" :
    phase === 2 ? "Workflow Builder" :
    phase === 3 ? "Approval Chain" :
    phase === 4 ? "Team Training" :
    phase === 5 ? "Go Live" : "";

  const stageStep =
    phase === 0 ? "WEEK 01" :
    phase === 1 ? "WEEK 02" :
    phase === 2 ? "WEEK 04" :
    phase === 3 ? "WEEK 05" :
    phase === 4 ? "WEEK 07" :
    phase === 5 ? "WEEK 08" : "";

  return (
    <div className="p1-root">
      <div className="p1-dash">
        {/* TOP BAR */}
        <div className="p1-bar">
          <div className="p1-bar-l">
            <div className="p1-bar-mark">
              <P1I.Rocket s={14}/>
            </div>
            <div className="p1-bar-crumbs">
              <span className="p1-bar-mod">Onboarding</span>
              <span className="p1-bar-sep">/</span>
              <span className="p1-bar-page">{stageTitle}</span>
            </div>
          </div>
          <div className="p1-bar-r">
            <span className="dot"/>
            {stageStep}
          </div>
        </div>

        {/* MILESTONES */}
        <div className="p1-milestones">
          {MILESTONES.map(m => {
            const isDone = !!doneTasks[m.key];
            const isAct = activeTask === m.key;
            const cls = "p1-ms" + (isDone ? " done" : isAct ? " act" : "");
            return (
              <div key={m.key} className={cls}>
                <div className="ic">{isDone ? <P1I.Check s={11}/> : <m.icon s={11}/>}</div>
                <div className="nm">{m.name}</div>
              </div>
            );
          })}
        </div>

        {/* STAGE */}
        <div className="p1-stage">
          <div className="p1-stageHead">
            <div className="t">{stageTitle}</div>
            <div className="s">{phase >= 1 && phase <= 4 ? `${phase} / 4` : phase === 5 ? "COMPLETE" : "PLAN"}</div>
          </div>

          {/* SCENE 0 — PLAN */}
          <div className={"p1-scene " + (phase === 0 ? "on" : "")}>
            <div className="p1-plan">
              <div className="p1-planBig">A 4-step rollout. Our team works alongside yours, every week.</div>
              <div className="p1-planRow">
                {MILESTONES.map((m, i) => (
                  <div key={m.key} className={"p1-planChip " + (planChips > i ? "in" : "")}
                       style={{transitionDelay: `${i * 60}ms`}}>
                    <div className="pic"><m.icon s={14}/></div>
                    <div className="plbl">{m.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SCENE 1 — CATALOG */}
          <div className={"p1-scene " + (phase === 1 ? "on" : "")}>
            <div className="p1-cat">
              <div className="p1-catTop">
                <div className="p1-catFile">
                  <div className="fi">CSV</div>
                  <div>
                    <div className="fn">items_master_v3.csv</div>
                    <div className="fs">12.4 MB · 2,847 lines</div>
                  </div>
                </div>
                <div className="p1-catCount">
                  <div className="v">{catCount.toLocaleString()}</div>
                  <div className="l">imported</div>
                </div>
              </div>
              <div className="p1-catBar" style={{"--p": `${Math.min(100, (catCount/2847)*100).toFixed(0)}%`}}/>
              <div className="p1-catTable">
                <div className="p1-catTH">
                  <div>SKU</div>
                  <div>Item</div>
                  <div style={{textAlign:"center"}}>UoM</div>
                  <div style={{textAlign:"right"}}>OK</div>
                </div>
                {CATALOG_ROWS.map((r, i) => (
                  <div key={r.sku} className={"p1-catRow " + (catN > i ? "in" : "")}
                       style={{transitionDelay: `${i * 30}ms`}}>
                    <div className="sku">{r.sku}</div>
                    <div className="nm">{r.nm}</div>
                    <div className="qt" style={{textAlign:"center"}}>EA</div>
                    <div className="ok"><P1I.Check s={11}/></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SCENE 2/3 — WORKFLOW + APPROVAL */}
          <div className={"p1-scene " + (phase === 2 || phase === 3 ? "on" : "")}>
            <div className="p1-wf">
              <div className="p1-wfRow">
                <div className="p1-wfEdges">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    {[0,1,2].map(i => {
                      const x1 = 12.5 + i * 25, x2 = 12.5 + (i+1) * 25;
                      const cls = wfEdgeN > i ? (phase === 3 ? "in done" : "in") : "";
                      return <path key={i} d={`M ${x1+9} 50 L ${x2-9} 50`} className={cls} pathLength={200}/>;
                    })}
                  </svg>
                </div>
                {WF_NODES.map((n, i) => {
                  const Ic = P1I[n.icon] || P1I.Settings;
                  const shown = wfNodeN > i;
                  return (
                    <div key={n.id}
                         className={"p1-wfNode " + (shown ? "in" : "") + (phase === 3 && shown ? " act" : "")}>
                      <div className="wi"><Ic s={15}/></div>
                      <div className="wn">{n.name}</div>
                      <div className="ws">{n.sku}</div>
                      <div className={"wa " + (wfAvIn && phase >= 3 ? "in" : "")}>
                        {n.av.map((c, j) => (
                          <div key={j} className="av">{c}</div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SCENE 4 — TRAINING */}
          <div className={"p1-scene " + (phase === 4 ? "on" : "")}>
            <div className="p1-tr">
              <div className="p1-trHead">
                <div className="tt">Hands-on, role-based training</div>
                <div className="tn">{Math.min(trainN, TEAM.length)} / {TEAM.length} trained</div>
              </div>
              <div className="p1-trGrid">
                {TEAM.map((u, i) => (
                  <div key={u.ini} className={"p1-trCard " + (trainN > i ? "done" : "")}>
                    <div className="p1-trAv">{u.ini}</div>
                    <div className="p1-trInfo">
                      <div className="p1-trName">{u.nm}</div>
                      <div className="p1-trRole">{u.role}</div>
                    </div>
                    <div className="p1-trBadge"><P1I.Check s={11}/></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SCENE 5 — GO LIVE */}
          <div className={"p1-scene " + (phase === 5 ? "on" : "")}>
            <div className="p1-go">
              <div className="p1-goRocket"><P1I.Rocket s={38}/></div>
              <div className="p1-goTitle">You're Live.</div>
              <div className="p1-goSub">Week 08 · Ready to procure</div>
              <div className="p1-goCard">
                <div className="gc"><div className="ic"><P1I.Check s={11}/></div><div className="lb">Catalogue</div></div>
                <div className="gc"><div className="ic"><P1I.Check s={11}/></div><div className="lb">Workflows</div></div>
                <div className="gc"><div className="ic"><P1I.Check s={11}/></div><div className="lb">Approvals</div></div>
                <div className="gc"><div className="ic"><P1I.Check s={11}/></div><div className="lb">Team</div></div>
              </div>
            </div>
          </div>

          <div className={"p1-cap " + (captions[phase] ? "on" : "")}>
            <span className="cd"/>
            {captions[phase] || ""}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Phase1SetupAnimation = Phase1SetupAnimation;

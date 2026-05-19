/* ============================================================
 * IntegrationAnimation.jsx
 * FactWise — "Integrate Everything. Customize Anything. No IT Required."
 *
 * Story (loops ~26s):
 *  1. SILOS    — disconnected systems float apart; "?" connectors blink
 *  2. HUB      — FactWise hub powers on; animated cables draw to each system
 *  3. INBOUND  — Requisitions + Contracts packets travel INTO the hub
 *  4. OUTBOUND — POs + Quotes + Records packets stream OUT to systems
 *  5. FIELDS   — custom field editor: drag a new field into a record schema
 *  6. FORMULA  — drag formula components into a Landed-Cost calculation
 *  7. WORKFLOW — mini node graph of a configurable workflow lights up
 *  8. TIMELINE — "2–4 weeks" timeline with milestone dots tick across
 *  9. FINALE   — "Live in 2–4 weeks. Built to last forever."
 *
 * Usage:
 *   <script type="text/babel" src="IntegrationAnimation.jsx"></script>
 *   <window.IntegrationAnimation speed={1} />
 *
 * To port to Next/TS:
 *   - rename .tsx, replace window.* with export default
 *   - move IN_STYLE into a CSS module / styled-jsx block
 *   - preserve prop signature { speed?: number, onPhaseChange?: (n: number) => void }
 * ============================================================ */

const { useState, useEffect, useRef, useMemo } = React;

/* ============ ICONS ============ */
const II = {
  Link: (p) => <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
  Server: (p) => <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>,
  Cube: (p) => <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
  Chip: (p) => <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M19 9h3M19 15h3M2 9h3M2 15h3" /></svg>,
  Vendor: (p) => <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /></svg>,
  Hub: (p) => <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="3" r="1.5" /><circle cx="12" cy="21" r="1.5" /><circle cx="3" cy="12" r="1.5" /><circle cx="21" cy="12" r="1.5" /><line x1="12" y1="4.5" x2="12" y2="9" /><line x1="12" y1="15" x2="12" y2="19.5" /><line x1="4.5" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="19.5" y2="12" /></svg>,
  Doc: (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
  Stack: (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 22 6 22 2 12 6 2 18 2 22 12" /></svg>,
  PenSq: (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>,
  Fx: (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5a2 2 0 0 1 2-2h2" /><path d="M4 17v2a2 2 0 0 0 2 2h2" /><path d="M16 3h2a2 2 0 0 1 2 2v2" /><path d="M16 21h2a2 2 0 0 0 2-2v-2" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></svg>,
  Workflow: (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="9" width="6" height="6" rx="1" /><rect x="3" y="15" width="6" height="6" rx="1" /><path d="M9 6h3a3 3 0 0 1 3 3v3" /><path d="M9 18h3a3 3 0 0 0 3-3" /></svg>,
  Clock: (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  Plus: (p) => <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>,
  Grid: (p) => <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  Check: (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Settings: (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  Forever: (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.74-8-4.585 0-4.585 8 0 8 5.605 0 7.644-8 12.74-8z" /></svg>,
  User: (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg>,
  Drag: (p) => <svg viewBox="0 0 24 24" width={p.s || 10} height={p.s || 10} fill="currentColor"><circle cx="9" cy="6" r="1.4" /><circle cx="15" cy="6" r="1.4" /><circle cx="9" cy="12" r="1.4" /><circle cx="15" cy="12" r="1.4" /><circle cx="9" cy="18" r="1.4" /><circle cx="15" cy="18" r="1.4" /></svg>
};

/* ============ DATA ============ */
// External systems that orbit the hub. Positions tuned so cables don't overlap.
const SYSTEMS = [
{ id: "erp", name: "SAP S/4", sub: "ERP", icon: "Cube", color: "#0891b2", angle: -135, dist: 95 },
{ id: "ora", name: "Oracle Fusion", sub: "ERP", icon: "Server", color: "#14b8a6", angle: -45, dist: 95 },
{ id: "dig", name: "Digi-Key", sub: "Component Distributor", icon: "Chip", color: "#10b981", angle: 135, dist: 95 },
{ id: "mou", name: "Mouser", sub: "Component Distributor", icon: "Chip", color: "#f59e0b", angle: 45, dist: 95 },
{ id: "ven", name: "Vendor Portals", sub: "Direct vendor APIs", icon: "Vendor", color: "#8b5cf6", angle: 180, dist: 95 },
{ id: "wms", name: "Inhouse WMS", sub: "Warehouse Mgmt", icon: "Server", color: "#06b6d4", angle: 0, dist: 95 }];


// Packets that flow IN (left side) and OUT (right side)
const PACKETS_IN = [
{ label: "Requisition", shortId: "REQ-2417", from: "erp", color: "#0891b2" },
{ label: "Contract", shortId: "CTR-118", from: "ora", color: "#14b8a6" },
{ label: "BOM", shortId: "BOM-9043", from: "wms", color: "#06b6d4" },
{ label: "Catalog feed", shortId: "Δ 312", from: "dig", color: "#10b981" }];

const PACKETS_OUT = [
{ label: "PO", shortId: "PO-8842", to: "erp", color: "#0891b2" },
{ label: "Quote", shortId: "QT-2244", to: "ven", color: "#8b5cf6" },
{ label: "GR Record", shortId: "GRN-771", to: "ora", color: "#14b8a6" },
{ label: "RFQ blast", shortId: "× 18", to: "mou", color: "#f59e0b" }];


// Custom-field editor: existing fields + the one we drag in
const FIELD_SCHEMA = [
{ name: "Item Code", type: "TEXT", existed: true },
{ name: "Qty", type: "NUMBER", existed: true },
{ name: "Vendor", type: "REF", existed: true },
{ name: "Plant Code", type: "SELECT", existed: false } // ← gets dragged in
];

// Formula builder: chips → formula
const FORMULA_CHIPS = [
{ id: "unit", label: "Unit Price", color: "#0891b2" },
{ id: "bcd", label: "BCD 10%", color: "#14b8a6" },
{ id: "fr", label: "Freight", color: "#f59e0b" },
{ id: "ins", label: "Insurance", color: "#8b5cf6" }];


// Mini workflow nodes for scene 7
const WF_NODES = [
{ id: "req", label: "Requisition", x: 16, y: 30, color: "#0891b2" },
{ id: "mgr", label: "Manager", x: 38, y: 70, color: "#14b8a6" },
{ id: "fin", label: "Finance", x: 62, y: 30, color: "#06b6d4" },
{ id: "po", label: "PO Generated", x: 84, y: 70, color: "#10b981" }];


// Timeline milestones
const TIMELINE = [
{ week: "Day 0", label: "Kickoff", icon: "Plus" },
{ week: "Wk 1", label: "API connect", icon: "Link" },
{ week: "Wk 2", label: "Config", icon: "Settings" },
{ week: "Wk 3", label: "UAT", icon: "User" },
{ week: "Wk 4", label: "Go live", icon: "Check" }];


/* ============ STYLE (scoped, class prefix `in-`) ============ */
const IN_STYLE = `
.in-root { position: relative; aspect-ratio: 1 / 1.08; max-width: 600px; width: 100%; font-family: 'Inter', system-ui, sans-serif; color: #0b1322; }
.in-dash { position: relative; width: 100%; height: 100%; background: white; border-radius: 22px;
  box-shadow: 0 30px 80px -30px rgba(15,23,42,0.25), 0 8px 24px -8px rgba(15,23,42,0.08);
  border: 1px solid rgba(15,23,42,0.06); overflow: hidden; display: flex; flex-direction: column; }

.in-chrome { display: flex; align-items: center; gap: 10px; padding: 12px 14px;
  background: #f7faf9; border-bottom: 1px solid rgba(15,23,42,0.05); }
.in-cdots { display: flex; gap: 6px; }
.in-cdot { width: 10px; height: 10px; border-radius: 50%; }
.in-url { flex: 1; max-width: 340px; margin: 0 auto; background: white; border: 1px solid rgba(15,23,42,0.08);
  border-radius: 6px; padding: 4px 10px; font-size: 11px; color: #64748b; display: flex; align-items: center; gap: 6px; }
.in-url::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #0891b2; box-shadow: 0 0 8px #22d3ee; }

.in-body { flex: 1; display: flex; min-height: 0; }
.in-rail { width: 56px; padding: 18px 0; background: #fbfdfc; border-right: 1px solid rgba(15,23,42,0.05);
  display: flex; flex-direction: column; align-items: center; gap: 14px; }
.in-railIcon { width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; color: #64748b; transition: all .3s ease; }
.in-railIcon.active { background: #0891b2; color: white; box-shadow: 0 6px 14px rgba(8,145,178,0.35); }
.in-railIcon.accent { background: rgba(8,145,178,0.1); color: #0891b2; }

.in-main { flex: 1; padding: 20px 22px 18px; display: flex; flex-direction: column; gap: 14px; min-width: 0; }

.in-headStrip { display: flex; align-items: flex-start; justify-content: space-between; }
.in-headStrip h3 { margin: 0; font-size: 16px; font-weight: 800; letter-spacing: -0.01em; }
.in-headStrip .in-sub { margin: 4px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: #94a3b8; text-transform: uppercase; }
.in-livePill { display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 5px 11px; border-radius: 999px;
  font-size: 11px; font-weight: 600; color: #475569; }
.in-livePill::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #14b8a6;
  box-shadow: 0 0 0 3px rgba(20,184,166,0.18); animation: in-pulse 1.6s ease-in-out infinite; }
@keyframes in-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.35); } }

.in-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.in-stat { background: #fbfdfc; border: 1px solid rgba(15,23,42,0.06); border-radius: 12px; padding: 12px 14px; transition: all .45s ease; position: relative; overflow: hidden; }
.in-stat .si { width: 26px; height: 26px; border-radius: 7px; display: grid; place-items: center; margin-bottom: 8px;
  background: rgba(8,145,178,0.12); color: #0891b2; }
.in-stat.teal .si  { background: rgba(20,184,166,0.12); color: #0d9488; }
.in-stat.green .si { background: rgba(16,185,129,0.12); color: #059669; }
.in-stat .n { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; line-height: 1; font-variant-numeric: tabular-nums; }
.in-stat .ll { font-size: 9.5px; font-weight: 700; color: #94a3b8; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 6px; }
.in-stat.active { background: white; border-color: rgba(8,145,178,0.25); box-shadow: 0 6px 20px -8px rgba(8,145,178,0.25); }

.in-stage { background: linear-gradient(180deg, #fbfdfc 0%, #f0fbfb 100%);
  border: 1px solid rgba(15,23,42,0.06); border-radius: 14px; padding: 14px;
  flex: 1; position: relative; overflow: hidden; min-height: 0; }
.in-stageHead { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; position: relative; z-index: 3; }
.in-stageHead h4 { margin: 0; font-size: 12px; font-weight: 700; color: #334155; }
.in-tagPulse { font-size: 10px; font-weight: 600; color: #0891b2; display: inline-flex; align-items: center; gap: 5px; }
.in-tagPulse .p { width: 6px; height: 6px; border-radius: 50%; background: #0891b2; animation: in-pulse 1.6s ease-in-out infinite; }
.in-dots2 { display: flex; gap: 5px; align-items: center; }
.in-pd { width: 6px; height: 6px; border-radius: 50%; background: #e2e8f0; transition: all .3s ease; }
.in-pd.on { background: #0891b2; box-shadow: 0 0 0 3px rgba(8,145,178,0.15); width: 18px; border-radius: 99px; }
.in-pd.done { background: #22d3ee; }

.in-caption { position: absolute; left: 14px; bottom: 12px; right: 14px;
  background: rgba(11,19,34,0.88); color: white; backdrop-filter: blur(12px);
  border-radius: 10px; padding: 9px 13px; font-size: 11.5px; font-weight: 500;
  display: flex; align-items: center; gap: 10px; transition: all .4s ease;
  opacity: 0; transform: translateY(8px); pointer-events: none; z-index: 8; }
.in-caption.on { opacity: 1; transform: translateY(0); }
.in-caption .cd { width: 8px; height: 8px; border-radius: 50%; background: #22d3ee; box-shadow: 0 0 12px #22d3ee; }

.in-scene { position: absolute; inset: 14px; top: 36px; opacity: 0; transition: opacity .4s ease; pointer-events: none; }
.in-scene.on { opacity: 1; }

/* ====== SCENES 1+2+3+4: hub + systems + packets ====== */
.in-hubScene { position: absolute; inset: 0; }
.in-hub { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: 88px; height: 88px; border-radius: 22px;
  background: linear-gradient(135deg, #0891b2 0%, #14b8a6 100%);
  color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
  box-shadow: 0 18px 40px -12px rgba(8,145,178,0.5), inset 0 1px 0 rgba(255,255,255,0.25);
  transition: all .7s cubic-bezier(.22,.61,.36,1);
  opacity: 0; transform: translate(-50%, -50%) scale(0.7);
  z-index: 3; }
.in-hub.in { opacity: 1; transform: translate(-50%, -50%) scale(1); }
.in-hub .hubLabel { font-size: 10px; font-weight: 800; letter-spacing: 0.04em; }
.in-hub .hubSub { font-size: 7.5px; font-weight: 600; opacity: 0.8; letter-spacing: 0.1em; text-transform: uppercase; }
.in-hub::after { content: ""; position: absolute; inset: -8px; border-radius: 28px;
  border: 1.5px solid rgba(8,145,178,0.25); animation: in-hubPulse 2.4s ease-out infinite; opacity: 0; }
.in-hub.in::after { opacity: 1; }
@keyframes in-hubPulse { 0% { transform: scale(0.85); opacity: 0.9; } 100% { transform: scale(1.4); opacity: 0; } }

/* Cables drawn via SVG behind everything */
.in-cables { position: absolute; inset: 0; pointer-events: none; }
.in-cables svg { width: 100%; height: 100%; overflow: visible; }
.in-cable { stroke-width: 1.4; fill: none; stroke-linecap: round;
  stroke-dasharray: 300; stroke-dashoffset: 300; transition: stroke-dashoffset .9s ease, stroke-opacity .4s ease; }
.in-cable.in { stroke-dashoffset: 0; }
.in-cable.broken { stroke-dasharray: 3 4; stroke-dashoffset: 0; opacity: 0.4; }

/* System tiles around the hub */
.in-sys { position: absolute; width: 92px;
  background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 11px;
  padding: 7px 9px; display: flex; flex-direction: column; gap: 3px;
  box-shadow: 0 8px 18px -6px rgba(15,23,42,0.18);
  transition: all .65s cubic-bezier(.22,.61,.36,1);
  z-index: 2;
  font-size: 10px;
  transform: translate(-50%, -50%); }
.in-sysHead { display: flex; align-items: center; gap: 5px; }
.in-sysIc { width: 18px; height: 18px; border-radius: 5px; display: grid; place-items: center; color: white; flex-shrink: 0; }
.in-sysName { font-weight: 700; color: #0b1322; font-size: 10px; line-height: 1.1; }
.in-sysSub  { font-size: 8.5px; color: #94a3b8; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
.in-sysDot  { position: absolute; right: 7px; top: 7px; width: 6px; height: 6px; border-radius: 50%; background: #e2e8f0; transition: all .35s ease; }
.in-sys.connected .in-sysDot { background: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.15); }

/* Floating "?" near systems in scene 1 */
.in-sysQ { position: absolute; font-size: 16px; font-weight: 800; color: #f59e0b;
  transition: opacity .5s ease, transform .5s ease; opacity: 0; }
.in-sysQ.in { opacity: 0.85; animation: in-qBob 2s ease-in-out infinite; }
@keyframes in-qBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

/* Data packets traveling along cables */
.in-packet { position: absolute;
  background: white; border-radius: 99px;
  padding: 4px 9px 4px 5px; font-size: 9.5px; font-weight: 700; color: #0b1322;
  display: flex; align-items: center; gap: 5px;
  box-shadow: 0 6px 14px -4px rgba(15,23,42,0.25);
  transform: translate(-50%, -50%);
  z-index: 5;
  opacity: 0; transition: transform 1.6s cubic-bezier(.45,.05,.45,1), opacity .25s ease; }
.in-packet.in { opacity: 1; }
.in-packet .pkIc { width: 16px; height: 16px; border-radius: 50%; display: grid; place-items: center; color: white; flex-shrink: 0; }
.in-packet .pkId { font-family: 'JetBrains Mono', monospace; font-size: 8.5px; color: #94a3b8; font-weight: 600; margin-left: 2px; }

/* Inbox / outbox legend in flow scenes */
.in-flowKey { position: absolute; left: 8px; top: 4px; display: flex; flex-direction: column; gap: 4px; z-index: 4; }
.in-flowKey.right { left: auto; right: 8px; align-items: flex-end; }
.in-flowKey .lab { font-size: 9px; font-weight: 700; color: #64748b; letter-spacing: 0.08em; text-transform: uppercase; }
.in-flowKey .row { display: flex; align-items: center; gap: 5px; font-size: 9.5px; font-weight: 600; color: #334155;
  opacity: 0; transform: translateX(-6px); transition: all .35s ease; }
.in-flowKey.right .row { transform: translateX(6px); }
.in-flowKey .row.in { opacity: 1; transform: translateX(0); }
.in-flowKey .row .sw { width: 6px; height: 6px; border-radius: 50%; }

/* ====== SCENE 5: CUSTOM FIELDS ====== */
.in-fields { position: absolute; inset: 0; display: flex; gap: 14px; padding: 4px 4px; }
.in-fieldsLeft { width: 130px; background: #fbfdfc; border: 1px solid rgba(15,23,42,0.07);
  border-radius: 10px; padding: 8px; display: flex; flex-direction: column; gap: 5px; }
.in-fieldsTitle { font-size: 9px; font-weight: 700; color: #94a3b8; letter-spacing: 0.08em; text-transform: uppercase; padding: 2px 4px; }
.in-fieldChip { display: flex; align-items: center; gap: 5px; padding: 6px 8px;
  background: white; border: 1px solid rgba(15,23,42,0.07); border-radius: 7px;
  font-size: 9.5px; font-weight: 700; color: #334155; transition: all .3s ease; }
.in-fieldChip .typeBadge { font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #0891b2;
  background: rgba(8,145,178,0.1); padding: 1px 4px; border-radius: 3px; font-weight: 700; margin-left: auto; }
.in-fieldChip.dragging { opacity: 0.35; transform: scale(0.94); }

.in-fieldsRight { flex: 1; background: white; border: 1px solid rgba(15,23,42,0.08);
  border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 4px; position: relative; min-width: 0; }
.in-fieldsHeader { display: flex; justify-content: space-between; align-items: center; padding-bottom: 6px; border-bottom: 1px dashed rgba(15,23,42,0.08); margin-bottom: 4px; }
.in-fieldsHeader .nm { font-size: 11px; font-weight: 800; color: #0b1322; }
.in-fieldsHeader .ct { font-size: 9px; color: #94a3b8; font-weight: 600; }
.in-fieldRow { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 8px;
  padding: 6px 8px; background: #fbfdfc; border: 1px solid rgba(15,23,42,0.06); border-radius: 7px;
  font-size: 10px;
  opacity: 0; transform: translateY(4px); transition: all .4s cubic-bezier(.22,.61,.36,1); }
.in-fieldRow.in { opacity: 1; transform: translateY(0); }
.in-fieldRow.new { background: linear-gradient(90deg, rgba(20,184,166,0.1) 0%, rgba(20,184,166,0.02) 100%);
  border-color: rgba(20,184,166,0.35); }
.in-fieldRow .nm { font-weight: 700; color: #0b1322; }
.in-fieldRow .ty { font-family: 'JetBrains Mono', monospace; font-size: 8.5px; color: #0891b2;
  background: rgba(8,145,178,0.08); padding: 1px 5px; border-radius: 3px; font-weight: 700; }
.in-fieldRow.new .ty { color: #0d9488; background: rgba(20,184,166,0.15); }
.in-fieldRow .badge { font-size: 8px; font-weight: 800; color: #0d9488;
  background: rgba(20,184,166,0.15); padding: 2px 5px; border-radius: 99px; letter-spacing: 0.06em; }

/* ====== SCENE 6: FORMULA BUILDER ====== */
.in-formula { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 4px 4px; }
.in-formulaTitle { font-size: 11px; font-weight: 700; color: #475569; padding: 2px 4px; }
.in-formulaPalette { display: flex; gap: 6px; flex-wrap: wrap; padding: 2px 4px; }
.in-fxChip { display: flex; align-items: center; gap: 5px; padding: 5px 9px;
  background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 99px;
  font-size: 9.5px; font-weight: 700; color: #334155; transition: all .3s ease; }
.in-fxChip .sw { width: 8px; height: 8px; border-radius: 50%; }
.in-fxChip.dragging { opacity: 0.3; transform: scale(0.9); }

.in-formulaCanvas { flex: 1; background: white; border: 1px dashed rgba(15,23,42,0.15);
  border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 10px; min-height: 0; }
.in-formulaName { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; color: #0b1322; }
.in-formulaName .ic { width: 22px; height: 22px; border-radius: 6px; background: rgba(8,145,178,0.12); color: #0891b2; display: grid; place-items: center; }
.in-formulaExpr { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; min-height: 32px; }
.in-fxToken { display: flex; align-items: center; gap: 5px; padding: 5px 10px;
  background: linear-gradient(180deg, #ffffff 0%, #ecfeff 100%);
  border: 1px solid rgba(8,145,178,0.25); border-radius: 7px;
  font-size: 10px; font-weight: 700; color: #0b1322;
  opacity: 0; transform: scale(0.85); transition: all .45s cubic-bezier(.22,.61,.36,1); }
.in-fxToken.in { opacity: 1; transform: scale(1); }
.in-fxToken .sw { width: 8px; height: 8px; border-radius: 50%; }
.in-fxOp { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 800; color: #94a3b8;
  opacity: 0; transition: opacity .4s ease; }
.in-fxOp.in { opacity: 1; }
.in-formulaResult { display: flex; align-items: center; gap: 8px; padding-top: 8px; border-top: 1px dashed rgba(15,23,42,0.08); }
.in-formulaResult .lab { font-size: 9px; font-weight: 700; color: #94a3b8; letter-spacing: 0.08em; text-transform: uppercase; }
.in-formulaResult .val { font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 800; color: #0d9488; font-variant-numeric: tabular-nums; margin-left: auto; }

/* ====== SCENE 7: WORKFLOW ====== */
.in-wf { position: absolute; inset: 0; padding: 4px 4px; }
.in-wfNode { position: absolute; background: white; border: 1.5px solid rgba(15,23,42,0.08);
  border-radius: 10px; padding: 7px 10px; min-width: 88px;
  font-size: 10px; font-weight: 700; color: #0b1322;
  display: flex; align-items: center; gap: 6px;
  box-shadow: 0 8px 18px -8px rgba(15,23,42,0.2);
  transform: translate(-50%, -50%) scale(0.85); opacity: 0;
  transition: all .5s cubic-bezier(.22,.61,.36,1); }
.in-wfNode.in { transform: translate(-50%, -50%) scale(1); opacity: 1; }
.in-wfNode .sw { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.in-wfNode.lit { border-color: rgba(20,184,166,0.5); background: linear-gradient(180deg, #ffffff 0%, #ecfdfb 100%);
  box-shadow: 0 10px 22px -10px rgba(20,184,166,0.4); }
.in-wfEdge { position: absolute; inset: 0; pointer-events: none; }
.in-wfEdge svg { width: 100%; height: 100%; overflow: visible; }
.in-wfEdgePath { stroke: #cbd5e1; stroke-width: 1.5; stroke-dasharray: 4 4; fill: none;
  stroke-dashoffset: 200; transition: stroke-dashoffset .8s ease, stroke .35s ease; }
.in-wfEdgePath.in { stroke-dashoffset: 0; }
.in-wfEdgePath.live { stroke: #14b8a6; stroke-dasharray: 0; }
.in-wfHint { position: absolute; left: 6px; bottom: 6px;
  font-size: 9.5px; font-weight: 600; color: #64748b; display: inline-flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.85); padding: 4px 8px; border-radius: 7px;
  border: 1px solid rgba(15,23,42,0.06); }
.in-wfHint .ic { color: #0891b2; }

/* ====== SCENE 8: TIMELINE ====== */
.in-tlScene { position: absolute; inset: 0; padding: 16px 8px; display: flex; flex-direction: column; gap: 16px; }
.in-tlHead { font-size: 12px; font-weight: 700; color: #334155; padding: 0 4px; display: flex; justify-content: space-between; align-items: baseline; }
.in-tlHead .small { font-size: 10px; color: #94a3b8; font-weight: 600; }
.in-tlRail { position: relative; height: 6px; background: #f1f5f9; border-radius: 99px; margin: 0 14px; }
.in-tlFill { position: absolute; left: 0; top: 0; height: 100%;
  background: linear-gradient(90deg, #0891b2 0%, #14b8a6 100%);
  border-radius: 99px; width: 0%; transition: width 1.4s cubic-bezier(.45,.05,.45,1);
  box-shadow: 0 0 8px rgba(20,184,166,0.35); }
.in-tlDots { position: absolute; left: 0; right: 0; top: 50%; display: flex; justify-content: space-between; align-items: center; pointer-events: none; }
.in-tlDot { width: 12px; height: 12px; border-radius: 50%; background: white;
  border: 2px solid #cbd5e1; transform: translateY(-50%);
  transition: all .35s ease; position: relative; }
.in-tlDot.on { border-color: #0d9488; background: linear-gradient(135deg, #0891b2 0%, #14b8a6 100%);
  box-shadow: 0 0 0 4px rgba(20,184,166,0.18); }
.in-tlMilestones { display: flex; justify-content: space-between; padding: 0 14px; }
.in-tlMilestone { text-align: center; width: 60px; transform: translateX(-50%); margin-left: 6px; }
.in-tlMilestone:first-child { transform: translateX(0); margin-left: 0; }
.in-tlMilestone:last-child  { transform: translateX(0); margin-left: 0; align-self: flex-end; }
.in-tlIc { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; margin: 0 auto 4px;
  background: #f1f5f9; color: #94a3b8; transition: all .35s ease; }
.in-tlMilestone.on .in-tlIc { background: linear-gradient(135deg, #0891b2 0%, #14b8a6 100%); color: white;
  box-shadow: 0 4px 12px rgba(8,145,178,0.4); }
.in-tlWk { font-size: 9px; font-weight: 800; color: #94a3b8; letter-spacing: 0.06em; text-transform: uppercase; transition: color .35s ease; }
.in-tlMilestone.on .in-tlWk { color: #0d9488; }
.in-tlLab { font-size: 10px; font-weight: 600; color: #475569; margin-top: 2px; }
.in-tlSummary { background: linear-gradient(180deg, #ffffff 0%, #ecfdfb 100%);
  border: 1px solid rgba(20,184,166,0.25); border-radius: 12px; padding: 12px 14px;
  display: flex; align-items: center; gap: 12px; margin: 6px 4px 0;
  box-shadow: 0 10px 22px -10px rgba(20,184,166,0.3); }
.in-tlSummary .sIc { width: 36px; height: 36px; border-radius: 9px; background: linear-gradient(135deg, #0891b2 0%, #14b8a6 100%);
  color: white; display: grid; place-items: center; box-shadow: 0 6px 14px rgba(8,145,178,0.35); }
.in-tlSummary .sBody .t { font-size: 13px; font-weight: 800; color: #0b1322; }
.in-tlSummary .sBody .d { font-size: 10px; color: #475569; margin-top: 1px; }
.in-tlSummary .sStat { margin-left: auto; text-align: right; }
.in-tlSummary .sStat .v { font-size: 16px; font-weight: 800; color: #0d9488; font-variant-numeric: tabular-nums; }
.in-tlSummary .sStat .l { font-size: 9px; font-weight: 700; color: #94a3b8; letter-spacing: 0.06em; text-transform: uppercase; }

/* ====== SCENE 9: FINALE ====== */
.in-finale { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 0 12px; }
.in-finaleA { font-size: 38px; font-weight: 800; letter-spacing: -0.03em; line-height: 1;
  background: linear-gradient(135deg, #0891b2 0%, #14b8a6 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.in-finaleB { font-size: 22px; font-weight: 700; color: #0b1322; display: flex; align-items: center; gap: 8px; }
.in-finaleB .inf { color: #0d9488; }
.in-finaleSub { font-size: 11px; color: #64748b; margin-top: 8px; text-align: center; max-width: 360px; line-height: 1.55; }
.in-finaleChips { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; justify-content: center; }
.in-finaleChip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px;
  background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 999px;
  font-size: 10.5px; font-weight: 600; color: #475569;
  box-shadow: 0 4px 10px -6px rgba(15,23,42,0.15);
  opacity: 0; transform: translateY(4px); transition: all .4s ease; }
.in-finaleChip.in { opacity: 1; transform: translateY(0); }
.in-finaleChip .ic { color: #0891b2; }

/* Feature pills */
.in-pills { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.in-pill { display: flex; align-items: center; gap: 10px; padding: 11px 13px; background: white;
  border: 1px solid rgba(15,23,42,0.07); border-radius: 11px; font-size: 12px; font-weight: 600; color: #334155;
  transition: all .4s ease; }
.in-pill .pi { width: 26px; height: 26px; border-radius: 7px; background: rgba(8,145,178,0.08); color: #0891b2;
  display: grid; place-items: center; flex-shrink: 0; }
.in-pill .pd { width: 8px; height: 8px; border-radius: 50%; background: #e2e8f0; margin-left: auto; transition: all .4s ease; }
.in-pill.lit { border-color: rgba(8,145,178,0.4); background: linear-gradient(180deg, #ffffff 0%, #e6fafa 100%);
  box-shadow: 0 8px 22px -8px rgba(8,145,178,0.3); }
.in-pill.lit .pd { background: #0d9488; box-shadow: 0 0 0 4px rgba(20,184,166,0.18); }
.in-pill.lit .pi { background: rgba(8,145,178,0.15); color: #0e7490; }
`;

/* ============ HOOKS ============ */
function useCount(target, active, dur = 1000) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) {setV(0);return;}
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, dur]);
  return v;
}

/* ============ MAIN COMPONENT ============ */
function IntegrationAnimation({ speed = 1, onPhaseChange }) {
  useEffect(() => {
    if (document.getElementById("in-style")) return;
    const s = document.createElement("style");
    s.id = "in-style";s.textContent = IN_STYLE;
    document.head.appendChild(s);
  }, []);

  // Phases:
  // 1 SILOS | 2 HUB+CABLES | 3 INBOUND | 4 OUTBOUND |
  // 5 FIELDS | 6 FORMULA | 7 WORKFLOW | 8 TIMELINE | 9 FINALE
  const [phase, setPhase] = useState(0);
  const [hubIn, setHubIn] = useState(false);
  const [connected, setConnected] = useState(new Set());
  const [packetTick, setPacketTick] = useState(0); // remount packets to retrigger animation
  const [fieldRows, setFieldRows] = useState(0);
  const [fieldDragging, setFieldDragging] = useState(false);
  const [fxTokens, setFxTokens] = useState(0);
  const [fxResultIn, setFxResultIn] = useState(false);
  const [wfNodes, setWfNodes] = useState(0);
  const [wfStep, setWfStep] = useState(-1); // -1 = none, 0..3 = lit through nodes
  const [tlStep, setTlStep] = useState(0); // 0..5
  const [finaleChips, setFinaleChips] = useState(0);
  const [lit, setLit] = useState({ api: false, custom: false, formula: false, fast: false });

  const cancelRef = useRef(false);
  useEffect(() => {
    cancelRef.current = false;
    const speedMul = Math.max(0.3, Number(speed) || 1);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms / speedMul));

    async function loop() {
      while (!cancelRef.current) {
        // reset
        setPhase(0);setHubIn(false);setConnected(new Set());
        setPacketTick(0);
        setFieldRows(0);setFieldDragging(false);
        setFxTokens(0);setFxResultIn(false);
        setWfNodes(0);setWfStep(-1);
        setTlStep(0);setFinaleChips(0);
        setLit({ api: false, custom: false, formula: false, fast: false });
        onPhaseChange?.(0);
        await sleep(400);

        // 1 SILOS
        setPhase(1);onPhaseChange?.(1);
        await sleep(2600);

        // 2 HUB + CABLES
        setPhase(2);onPhaseChange?.(2);
        setLit((s) => ({ ...s, api: true }));
        setHubIn(true);
        await sleep(400);
        for (let i = 0; i < SYSTEMS.length; i++) {
          if (cancelRef.current) return;
          setConnected((prev) => {
            const next = new Set(prev);
            next.add(SYSTEMS[i].id);
            return next;
          });
          await sleep(220);
        }
        await sleep(800);

        // 3 INBOUND
        setPhase(3);onPhaseChange?.(3);
        // remount packets — each packet animates start -> hub
        setPacketTick((t) => t + 1);
        await sleep(2400);

        // 4 OUTBOUND
        setPhase(4);onPhaseChange?.(4);
        setPacketTick((t) => t + 1);
        await sleep(2400);

        // 5 FIELDS
        setPhase(5);onPhaseChange?.(5);
        setLit((s) => ({ ...s, custom: true }));
        // animate first 3 (existing) rows in fast
        for (let i = 1; i <= 3; i++) {setFieldRows(i);await sleep(160);}
        await sleep(550);
        // drag the new field in
        setFieldDragging(true);
        await sleep(450);
        setFieldDragging(false);
        setFieldRows(4);
        await sleep(1700);

        // 6 FORMULA
        setPhase(6);onPhaseChange?.(6);
        setLit((s) => ({ ...s, formula: true }));
        for (let i = 1; i <= FORMULA_CHIPS.length; i++) {
          if (cancelRef.current) return;
          setFxTokens(i);
          await sleep(380);
        }
        await sleep(250);
        setFxResultIn(true);
        await sleep(1500);

        // 7 WORKFLOW
        setPhase(7);onPhaseChange?.(7);
        for (let i = 1; i <= WF_NODES.length; i++) {setWfNodes(i);await sleep(220);}
        await sleep(400);
        for (let i = 0; i < WF_NODES.length; i++) {
          if (cancelRef.current) return;
          setWfStep(i);
          await sleep(430);
        }
        await sleep(900);

        // 8 TIMELINE
        setPhase(8);onPhaseChange?.(8);
        setLit((s) => ({ ...s, fast: true }));
        for (let i = 1; i <= TIMELINE.length; i++) {
          if (cancelRef.current) return;
          setTlStep(i);
          await sleep(560);
        }
        await sleep(1500);

        // 9 FINALE
        setPhase(9);onPhaseChange?.(9);
        for (let i = 1; i <= 4; i++) {setFinaleChips(i);await sleep(120);}
        await sleep(3600);
      }
    }
    loop();
    return () => {cancelRef.current = true;};
  }, [speed]);

  /* ===== Geometry for the hub scene =====
   * stage is the .in-scene box; we model positions in percentage of that box.
   * Hub sits at center (50,50). Systems sit on a roughly elliptical orbit.
   */
  const sysPositions = useMemo(() => SYSTEMS.map((s) => {
    const rad = s.angle * Math.PI / 180;
    // Different radii x vs y to fit aspect
    const rx = 38,ry = 32;
    return {
      ...s,
      xPct: 50 + Math.cos(rad) * rx,
      yPct: 50 + Math.sin(rad) * ry
    };
  }), []);

  /* ===== Stat counters ===== */
  const apisT = phase >= 2 ? 6 : 0;
  const objsT = phase >= 4 ? 12 : phase >= 3 ? 6 : 0;
  const wksT = phase >= 8 ? 2 : 0;
  const apisV = useCount(apisT, true, 600);
  const objsV = useCount(objsT, true, 700);
  const wksV = useCount(wksT, true, 600);

  /* ===== Captions ===== */
  const captions = {
    1: "ERP, distributors, vendor portals, WMS — all islands. Nothing talks.",
    2: "FactWise connects via open APIs. No middleware. No extra cost.",
    3: "Requisitions, contracts, BOMs flow into FactWise — automatically.",
    4: "POs, quotes, GR records flow back out — to every system that needs them.",
    5: "Add custom fields without IT. Drag, drop, deploy.",
    6: "Build your own formulas. Match exactly how your business operates.",
    7: "Configure workflows by your team — not a developer.",
    8: "Live in 2–4 weeks. Not 6 months.",
    9: "Built to last forever."
  };

  /* ===== Render ===== */
  return (
    <div className="in-root">
      <div className="in-dash">
        {/* Browser chrome */}
        <div className="in-chrome">
          <div className="in-cdots">
            <div className="in-cdot" style={{ background: "#ff5f56" }} />
            <div className="in-cdot" style={{ background: "#ffbd2e" }} />
            <div className="in-cdot" style={{ background: "#27c93f" }} />
          </div>
          <div className="in-url">factwise.io/integrations/hub</div>
          <div style={{ width: 46 }} />
        </div>

        <div className="in-body">
          <div className="in-rail">
            <div className="in-railIcon active"><II.Hub s={16} /></div>
            <div className="in-railIcon"><II.Grid s={16} /></div>
            <div className="in-railIcon"><II.Settings s={16} /></div>
            <div className="in-railIcon accent"><II.Plus s={16} /></div>
          </div>

          <div className="in-main">
            <div className="in-headStrip">
              <div>
                <h3>Integration Hub</h3>
                <div className="in-sub">Open APIs · No middleware</div>
              </div>
              <div className="in-livePill">Streaming</div>
            </div>

            {/* Stats */}
            <div className="in-stats">
              <Stat icon={<II.Link s={14} />} num={apisV} label="APIs live" active={phase >= 2} />
              <Stat icon={<II.Stack s={14} />} num={objsV} label="Sync objects" active={phase >= 3} tone="teal" />
              <Stat icon={<II.Clock s={14} />} num={`${wksV}-4 wk`} label="Go-live" active={phase >= 8} tone="green" />
            </div>

            {/* Stage */}
            <div className="in-stage" style={{ height: "26px" }}>
              <div className="in-stageHead">
                <h4>{
                  phase === 1 ? "Disconnected Systems" :
                  phase === 2 ? "API Connections" :
                  phase === 3 ? "Inbound Sync" :
                  phase === 4 ? "Outbound Sync" :
                  phase === 5 ? "Custom Fields" :
                  phase === 6 ? "Formula Builder" :
                  phase === 7 ? "Configurable Workflow" :
                  phase === 8 ? "Time to Go-Live" :
                  phase === 9 ? "Built to Last" :
                  "Hub"
                  }</h4>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div className="in-dots2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) =>
                    <div key={i} className={"in-pd " + (phase === i ? "on" : phase > i ? "done" : "")} />
                    )}
                  </div>
                  <div className="in-tagPulse"><span className="p" />Auto-syncing</div>
                </div>
              </div>

              {/* ===== SCENES 1-4: HUB + CABLES + PACKETS ===== */}
              <div className={"in-scene " + (phase >= 1 && phase <= 4 ? "on" : "")}>
                <div className="in-hubScene">

                  {/* Cables drawn under everything */}
                  <div className="in-cables">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      {sysPositions.map((s, i) => {
                        const isConnected = connected.has(s.id);
                        // gently curve toward hub
                        const cx1 = (s.xPct + 50) / 2 + (s.xPct < 50 ? -4 : 4);
                        const cy1 = (s.yPct + 50) / 2 + (s.yPct < 50 ? -4 : 4);
                        const d = `M ${s.xPct} ${s.yPct} Q ${cx1} ${cy1} 50 50`;
                        return (
                          <path key={s.id}
                          className={"in-cable " + (phase === 1 ? "broken" : isConnected ? "in" : "")}
                          d={d}
                          stroke={isConnected ? s.color : "#cbd5e1"}
                          strokeOpacity={phase === 1 ? 0.5 : isConnected ? 0.9 : 0.3} />);


                      })}
                    </svg>
                  </div>

                  {/* Hub */}
                  <div className={"in-hub " + (hubIn ? "in" : "")}>
                    <II.Hub s={20} />
                    <div className="hubLabel">FactWise</div>
                    <div className="hubSub">Hub</div>
                  </div>

                  {/* External systems */}
                  {sysPositions.map((s) => {
                    const Ic = II[s.icon];
                    const isConnected = connected.has(s.id);
                    return (
                      <div key={s.id}
                      className={"in-sys " + (isConnected ? "connected" : "")}
                      style={{ left: s.xPct + "%", top: s.yPct + "%" }}>
                        <div className="in-sysHead">
                          <div className="in-sysIc" style={{ background: s.color }}><Ic s={11} /></div>
                          <div className="in-sysName">{s.name}</div>
                        </div>
                        <div className="in-sysSub">{s.sub}</div>
                        <div className="in-sysDot" />
                        {/* Question mark in scene 1 only */}
                        <div className={"in-sysQ " + (phase === 1 ? "in" : "")}
                        style={{ right: -10, top: -16 }}>?</div>
                      </div>);

                  })}

                  {/* INBOUND packets — emitted during scene 3 */}
                  {phase === 3 && PACKETS_IN.map((p, i) => {
                    const src = sysPositions.find((s) => s.id === p.from);
                    if (!src) return null;
                    return (
                      <Packet key={`in-${packetTick}-${i}`}
                      delay={i * 320}
                      from={{ x: src.xPct, y: src.yPct }}
                      to={{ x: 50, y: 50 }}
                      color={p.color}
                      label={p.label}
                      sub={p.shortId} />);

                  })}
                  {/* OUTBOUND packets */}
                  {phase === 4 && PACKETS_OUT.map((p, i) => {
                    const dst = sysPositions.find((s) => s.id === p.to);
                    if (!dst) return null;
                    return (
                      <Packet key={`out-${packetTick}-${i}`}
                      delay={i * 320}
                      from={{ x: 50, y: 50 }}
                      to={{ x: dst.xPct, y: dst.yPct }}
                      color={p.color}
                      label={p.label}
                      sub={p.shortId} />);

                  })}

                  {/* Flow legends */}
                  {phase === 3 &&
                  <div className="in-flowKey">
                      <div className="lab">Inbound</div>
                      {PACKETS_IN.map((p, i) =>
                    <div key={p.label} className={"row " + (i < 4 ? "in" : "")}>
                          <span className="sw" style={{ background: p.color }} />{p.label}
                        </div>
                    )}
                    </div>
                  }
                  {phase === 4 &&
                  <div className="in-flowKey right">
                      <div className="lab">Outbound</div>
                      {PACKETS_OUT.map((p, i) =>
                    <div key={p.label} className={"row " + (i < 4 ? "in" : "")}>
                          <span className="sw" style={{ background: p.color }} />{p.label}
                        </div>
                    )}
                    </div>
                  }
                </div>
              </div>

              {/* ===== SCENE 5: CUSTOM FIELDS ===== */}
              <div className={"in-scene " + (phase === 5 ? "on" : "")}>
                <div className="in-fields">
                  <div className="in-fieldsLeft">
                    <div className="in-fieldsTitle">Field types</div>
                    <div className="in-fieldChip"><II.Drag s={9} /> Text<span className="typeBadge">TEXT</span></div>
                    <div className="in-fieldChip"><II.Drag s={9} /> Number<span className="typeBadge">NUM</span></div>
                    <div className={"in-fieldChip " + (fieldDragging ? "dragging" : "")}>
                      <II.Drag s={9} /> Select<span className="typeBadge">SEL</span>
                    </div>
                    <div className="in-fieldChip"><II.Drag s={9} /> Reference<span className="typeBadge">REF</span></div>
                    <div className="in-fieldChip"><II.Drag s={9} /> Date<span className="typeBadge">DATE</span></div>
                    <div className="in-fieldChip"><II.Drag s={9} /> Formula<span className="typeBadge">FX</span></div>
                  </div>
                  <div className="in-fieldsRight">
                    <div className="in-fieldsHeader">
                      <span className="nm">Schema · PO Line Item</span>
                      <span className="ct">{Math.min(fieldRows, FIELD_SCHEMA.length)} fields</span>
                    </div>
                    {FIELD_SCHEMA.map((f, i) =>
                    <div key={f.name}
                    className={"in-fieldRow " + (fieldRows > i ? "in " : "") + (!f.existed ? "new" : "")}>
                        <span className="nm">{f.name}</span>
                        <span className="ty">{f.type}</span>
                        {!f.existed && <span className="badge">NEW</span>}
                        {f.existed && <span style={{ width: 36 }} />}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ===== SCENE 6: FORMULA ===== */}
              <div className={"in-scene " + (phase === 6 ? "on" : "")}>
                <div className="in-formula">
                  <div className="in-formulaTitle">Custom formula · Landed Cost</div>
                  <div className="in-formulaPalette">
                    {FORMULA_CHIPS.map((c, i) =>
                    <div key={c.id} className={"in-fxChip " + (fxTokens === i ? "dragging" : "")}>
                        <span className="sw" style={{ background: c.color }} />{c.label}
                      </div>
                    )}
                  </div>
                  <div className="in-formulaCanvas">
                    <div className="in-formulaName">
                      <span className="ic"><II.Fx s={12} /></span>
                      <span>landed_cost =</span>
                    </div>
                    <div className="in-formulaExpr">
                      {FORMULA_CHIPS.map((c, i) =>
                      <React.Fragment key={c.id}>
                          {i > 0 && <span className={"in-fxOp " + (fxTokens > i ? "in" : "")}>+</span>}
                          <span className={"in-fxToken " + (fxTokens > i ? "in" : "")}>
                            <span className="sw" style={{ background: c.color }} />{c.label}
                          </span>
                        </React.Fragment>
                      )}
                    </div>
                    <div className="in-formulaResult">
                      <span className="lab">Auto-applied to all vendors</span>
                      <span className="val" style={{ opacity: fxResultIn ? 1 : 0, transition: "opacity .5s ease" }}>
                        $124.4K
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== SCENE 7: WORKFLOW ===== */}
              <div className={"in-scene " + (phase === 7 ? "on" : "")}>
                <div className="in-wf">
                  <div className="in-wfEdge">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Edges between consecutive nodes */}
                      {WF_NODES.slice(0, -1).map((n, i) => {
                        const n2 = WF_NODES[i + 1];
                        const isIn = wfNodes > i + 1;
                        const isLive = wfStep >= i + 1;
                        const d = `M ${n.x} ${n.y} C ${n.x + 6} ${n.y + (n2.y - n.y) / 2}, ${n2.x - 6} ${n.y + (n2.y - n.y) / 2}, ${n2.x} ${n2.y}`;
                        return (
                          <path key={i} className={"in-wfEdgePath " + (isIn ? "in " : "") + (isLive ? "live" : "")}
                          d={d} />);

                      })}
                    </svg>
                  </div>
                  {WF_NODES.map((n, i) =>
                  <div key={n.id}
                  className={"in-wfNode " + (wfNodes > i ? "in " : "") + (wfStep >= i ? "lit" : "")}
                  style={{ left: n.x + "%", top: n.y + "%" }}>
                      <span className="sw" style={{ background: n.color }} />{n.label}
                    </div>
                  )}
                  <div className="in-wfHint">
                    <span className="ic"><II.PenSq s={11} /></span>
                    Edit any step · No code
                  </div>
                </div>
              </div>

              {/* ===== SCENE 8: TIMELINE ===== */}
              <div className={"in-scene " + (phase === 8 ? "on" : "")}>
                <div className="in-tlScene">
                  <div className="in-tlHead">
                    <span>From kickoff to go-live</span>
                    <span className="small">5 milestones</span>
                  </div>
                  <div style={{ position: "relative" }}>
                    <div className="in-tlRail">
                      <div className="in-tlFill" style={{ width: `${tlStep / TIMELINE.length * 100}%` }} />
                    </div>
                    <div className="in-tlDots">
                      {TIMELINE.map((_, i) =>
                      <div key={i} className={"in-tlDot " + (tlStep > i ? "on" : "")} />
                      )}
                    </div>
                  </div>
                  <div className="in-tlMilestones">
                    {TIMELINE.map((m, i) => {
                      const Ic = II[m.icon];
                      return (
                        <div key={i} className={"in-tlMilestone " + (tlStep > i ? "on" : "")}>
                          <div className="in-tlIc"><Ic s={13} /></div>
                          <div className="in-tlWk">{m.week}</div>
                          <div className="in-tlLab">{m.label}</div>
                        </div>);

                    })}
                  </div>
                  <div className="in-tlSummary">
                    <div className="sIc"><II.Check s={18} /></div>
                    <div className="sBody">
                      <div className="t">Live in 2–4 weeks</div>
                      <div className="d">Open APIs · No middleware · No IT ticket</div>
                    </div>
                    <div className="sStat">
                      <div className="v">8×</div>
                      <div className="l">vs. legacy</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== SCENE 9: FINALE ===== */}
              <div className={"in-scene " + (phase === 9 ? "on" : "")}>
                <div className="in-finale">
                  <div className="in-finaleA">Live in 2–4 weeks.</div>
                  <div className="in-finaleB">
                    Built to last <span className="inf"><II.Forever s={22} /></span>
                  </div>
                  <div className="in-finaleSub">
                    Open APIs to every ERP, distributor, and vendor system. Every field, every formula, every workflow — configurable by your team, not IT.
                  </div>
                  <div className="in-finaleChips">
                    <div className={"in-finaleChip " + (finaleChips > 0 ? "in" : "")}><span className="ic"><II.Link s={11} /></span>Open APIs</div>
                    <div className={"in-finaleChip " + (finaleChips > 1 ? "in" : "")}><span className="ic"><II.Fx s={11} /></span>Custom formulas</div>
                    <div className={"in-finaleChip " + (finaleChips > 2 ? "in" : "")}><span className="ic"><II.PenSq s={11} /></span>Custom fields</div>
                    <div className={"in-finaleChip " + (finaleChips > 3 ? "in" : "")}><span className="ic"><II.Workflow s={11} /></span>Configurable workflows</div>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className={"in-caption " + (captions[phase] ? "on" : "")}>
                <span className="cd" />
                {captions[phase] || ""}
              </div>
            </div>

            {/* Feature pills */}
            <div className="in-pills">
              <Pill icon={<II.Link s={14} />} label="Open APIs" lit={lit.api} />
              <Pill icon={<II.PenSq s={14} />} label="Custom Fields" lit={lit.custom} />
              <Pill icon={<II.Fx s={14} />} label="Custom Formulas" lit={lit.formula} />
              <Pill icon={<II.Clock s={14} />} label="Live in 2–4 Weeks" lit={lit.fast} />
            </div>
          </div>
        </div>
      </div>
    </div>);

}

/* ============ HELPERS ============ */

/** Packet that travels between two points in percentage coords. Uses
 *  the CSS transition on `transform` from the .in-packet base class, but
 *  toggles the destination on a delayed timeout so it animates smoothly. */
function Packet({ from, to, color, label, sub, delay = 0 }) {
  const [at, setAt] = useState(from);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => {setAt(from);setVisible(true);}, delay);
    const t2 = setTimeout(() => {setAt(to);}, delay + 60);
    const t3 = setTimeout(() => {setVisible(false);}, delay + 1700);
    return () => {clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  }, []);
  return (
    <div className={"in-packet " + (visible ? "in" : "")}
    style={{ left: at.x + "%", top: at.y + "%" }}>
      <span className="pkIc" style={{ background: color }}><II.Doc s={9} /></span>
      <span>{label}</span>
      <span className="pkId">{sub}</span>
    </div>);

}

function Stat({ icon, num, label, active, tone }) {
  return (
    <div className={"in-stat" + (tone ? " " + tone : "") + (active ? " active" : "")}>
      <div className="si">{icon}</div>
      <div className="n">{num}</div>
      <div className="ll">{label}</div>
    </div>);

}
function Pill({ icon, label, lit }) {
  return (
    <div className={"in-pill" + (lit ? " lit" : "")}>
      <div className="pi">{icon}</div>
      <span>{label}</span>
      <div className="pd" />
    </div>);

}

window.IntegrationAnimation = IntegrationAnimation;
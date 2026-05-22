/* ============================================================
 * SourceAINegotiateAnimation.jsx
 * FactWise — SECTION 3.2 · "Source in Minutes. Negotiate Using AI."
 *
 * STORY (loops ~22s, cursor-driven):
 *   ACT 1 · SETUP (0–5s)
 *     - Empty RFQ canvas; cursor clicks Category dropdown → "Electronics – PCB"
 *     - Template auto-fills: target ₹4.60L, 12 line items, 5 vendor suggestions
 *     - 3 warning chips flash (price floor, missing field, lead time risk)
 *   ACT 2 · LAUNCH (5–9s)
 *     - Cursor hits "Send Event" → an "Email" channel icon is X'd out;
 *       "On-platform" channel lights up. Auto-reminder badge pulses.
 *   ACT 3 · AI NEGOTIATE (9–18s)
 *     - Centre stage becomes a chat split: FW Autobot vs Vendor.
 *     - Round 1 → Round 2 → Round 3 counter-offers stream; price ticker
 *       on the right tick-tick-ticks downward with an animated curve.
 *     - "Custom criteria" mini-panel toggles items (Quality A, Lead ≤14d, Net30).
 *   ACT 4 · DONE (18–22s)
 *     - "Locked at ₹4.39L · saved 4.6%" stamp; vendor marked WON.
 * ============================================================ */

const { useState: snUseState, useEffect: snUseEffect } = React;

/* ============ ICONS ============ */
const SNI = {
  Chevron: (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  Bot:     (p)=> <svg viewBox="0 0 24 24" width={p.s||13} height={p.s||13} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"/><circle cx="9" cy="14" r="1.4" fill="currentColor"/><circle cx="15" cy="14" r="1.4" fill="currentColor"/><path d="M12 4v4M8 2v2M16 2v2"/></svg>,
  Check:   (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X:       (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Warn:    (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>,
  Mail:    (p)=> <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>,
  Bell:    (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Spark:   (p)=> <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="currentColor"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"/></svg>,
  Lock:    (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Globe:   (p)=> <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/></svg>,
  Send:    (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
};

/* ============ CURSOR SCRIPT ============ */
// Coordinates are % of dashboard. Total cycle ~22s.
const SN_CURSOR_STEPS = [
  { x: 22, y: 22, hold: 900,  label: 'Category' },
  { x: 22, y: 32, hold: 700,  label: 'PCB · SMT', click: true },
  { x: 56, y: 21, hold: 1400, label: 'Auto-filled' },
  { x: 72, y: 38, hold: 1100, label: 'Vendors picked' },
  { x: 76, y: 91, hold: 900,  label: 'Send Event', click: true },
  { x: 18, y: 58, hold: 1200, label: 'Live · on platform' },
  { x: 50, y: 65, hold: 1300, label: 'Autobot R1' },
  { x: 78, y: 64, hold: 1300, label: 'Vendor counter' },
  { x: 50, y: 70, hold: 1400, label: 'Autobot R2' },
  { x: 78, y: 71, hold: 1400, label: 'Vendor counter' },
  { x: 88, y: 50, hold: 1100, label: '−4.6% locked' },
];

/* ============ DATA ============ */
const SN_VENDORS = [
  { id: 'V1', name: 'Shenzhen MotorCo', tag: 'PCB·SMT',  score: 94, region: 'CN', tone: '#3666ff' },
  { id: 'V2', name: 'Tata Precision',   tag: 'Electronics', score: 91, region: 'IN', tone: '#0d9488' },
  { id: 'V3', name: 'EuroDrive GmbH',   tag: 'Motors',   score: 88, region: 'DE', tone: '#7b68ee' },
  { id: 'V4', name: 'Polaris Indl.',    tag: 'Tier-2',   score: 82, region: 'US', tone: '#f59e0b' },
  { id: 'V5', name: 'BharatForge',      tag: 'Forging',  score: 79, region: 'IN', tone: '#06b6d4' },
];

// price track for the curve (₹L)
const SN_CURVE = [4.60, 4.55, 4.50, 4.46, 4.42, 4.39];
// chat sequence
const SN_CHAT = [
  { who: 'bot',    round: 'R1', text: 'Target landed ₹4.60L. Match or counter?' },
  { who: 'vendor', round: 'R1', text: 'Counter at ₹4.55L · FOB Mumbai' },
  { who: 'bot',    round: 'R2', text: 'Quality A · Lead ≤14d locked. Push to ₹4.46L?' },
  { who: 'vendor', round: 'R2', text: 'Counter at ₹4.50L if Net-30' },
  { who: 'bot',    round: 'R3', text: 'Net-30 accepted. Final ₹4.39L?' },
  { who: 'vendor', round: 'R3', text: 'Accepted. Locked.' },
];

/* ============ STYLE ============ */
const SN_STYLE = `
.sn-root { position: relative; width: 100%; height: 580px; font-family: 'Inter', system-ui, sans-serif;
  color: #0b1322; background: radial-gradient(800px 500px at 100% 0%, rgba(124,58,237,0.06), transparent 55%),
    radial-gradient(700px 500px at 0% 100%, rgba(0,184,132,0.06), transparent 60%), #fafbff;
  border-radius: 22px; overflow: hidden; border: 1px solid #e9eef5;
  box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 30px 60px -28px rgba(15,23,42,0.18);
  display: flex; flex-direction: column; min-width: 0; }

/* chrome */
.sn-chrome { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: white; border-bottom: 1px solid #eef1f6; }
.sn-dot { width: 9px; height: 9px; border-radius: 50%; }
.sn-url { margin-left: 8px; padding: 4px 10px; background: #f6f8fc; border: 1px solid #e8edf3;
  border-radius: 6px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10.5px; color: #64748b; display: flex; align-items: center; gap: 6px; }
.sn-pill { margin-left: auto; display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 9px; background: #f0ebff; border: 1px solid #ddd5ff; border-radius: 99px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; font-weight: 700;
  color: #6d28d9; letter-spacing: 0.16em; text-transform: uppercase; }
.sn-pill .d { width: 5px; height: 5px; border-radius: 50%; background: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124,58,237,0.2); animation: sn-pulse 1.4s ease-in-out infinite; }
@keyframes sn-pulse { 0%,100% { transform: scale(1); opacity: 1;} 50% { transform: scale(1.5); opacity: 0.55;} }

/* main grid */
.sn-grid { position: relative; display: grid; grid-template-columns: 1fr 1.05fr;
  flex: 1; min-height: 0; }
.sn-left { padding: 12px 12px 12px 14px; display: flex; flex-direction: column; gap: 10px;
  border-right: 1px solid #eef1f6; min-width: 0; }
.sn-right { padding: 12px 14px 12px 12px; display: flex; flex-direction: column; gap: 10px; min-width: 0; }

/* section card */
.sn-card { background: white; border: 1px solid #e9eef5; border-radius: 11px;
  padding: 10px 11px; transition: border-color .4s, box-shadow .4s; }
.sn-card.glow { border-color: rgba(124,58,237,0.4);
  box-shadow: 0 12px 28px -14px rgba(124,58,237,0.45); }
.sn-card-hd { display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 7px; }
.sn-card-hd .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px;
  font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #94a3b8; }
.sn-card-hd .v { font-size: 11px; font-weight: 700; color: #0b1322; }

/* category dropdown */
.sn-dd { position: relative; display: flex; align-items: center; gap: 6px;
  padding: 7px 9px; background: white; border: 1.5px solid #e9eef5; border-radius: 8px;
  font-size: 11.5px; font-weight: 600; color: #0b1322; transition: all .3s; }
.sn-dd.act { border-color: #7c3aed; box-shadow: 0 0 0 4px rgba(124,58,237,0.1); }
.sn-dd.chosen .placeholder { display: none; }
.sn-dd .placeholder { color: #94a3b8; font-weight: 500; }
.sn-dd .chev { margin-left: auto; color: #94a3b8; transition: transform .3s; }
.sn-dd.act .chev { transform: rotate(180deg); color: #7c3aed; }
.sn-dd-menu { position: absolute; left: 0; right: 0; top: calc(100% + 4px);
  background: white; border: 1px solid #e9eef5; border-radius: 8px;
  box-shadow: 0 12px 24px -8px rgba(15,23,42,0.15); padding: 4px;
  opacity: 0; transform: translateY(-4px); pointer-events: none;
  transition: opacity .2s, transform .2s; z-index: 3; }
.sn-dd-menu.show { opacity: 1; transform: translateY(0); }
.sn-dd-item { padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: 500;
  color: #475569; display: flex; align-items: center; justify-content: space-between; }
.sn-dd-item.hov { background: #f3f0ff; color: #6d28d9; }
.sn-dd-item .key { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; color: #94a3b8; }

/* auto-filled tiles */
.sn-tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.sn-tile { background: #fafbff; border: 1px dashed #d8e2ff; border-radius: 9px;
  padding: 8px 10px; opacity: 0; transform: translateY(6px);
  transition: opacity .4s, transform .4s, border-color .4s, background .4s; }
.sn-tile.in { opacity: 1; transform: translateY(0); }
.sn-tile.in.filled { background: rgba(124,58,237,0.06); border-style: solid;
  border-color: rgba(124,58,237,0.3); }
.sn-tile .k { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; }
.sn-tile.filled .k { color: #7c3aed; }
.sn-tile .v { margin-top: 3px; font-size: 13px; font-weight: 800; color: #0b1322;
  font-variant-numeric: tabular-nums; }
.sn-tile .s { margin-top: 1px; font-size: 9px; color: #94a3b8; }

/* warnings */
.sn-warns { display: flex; flex-wrap: wrap; gap: 5px; }
.sn-warn { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px;
  background: #fef3c7; border: 1px solid #fde68a; border-radius: 99px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; font-weight: 700;
  color: #b45309; opacity: 0; transform: translateY(-3px);
  transition: opacity .4s, transform .4s; }
.sn-warn.in { opacity: 1; transform: translateY(0); }

/* vendor strip */
.sn-vlist { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.sn-vrow { display: flex; align-items: center; gap: 7px; padding: 6px 8px;
  background: white; border: 1px solid #e9eef5; border-radius: 8px;
  opacity: 0; transform: translateX(-6px);
  transition: opacity .4s, transform .4s, border-color .4s, box-shadow .4s; }
.sn-vrow.in { opacity: 1; transform: translateX(0); }
.sn-vrow.picked { border-color: rgba(54,102,255,0.35);
  box-shadow: 0 6px 14px -8px rgba(54,102,255,0.35); }
.sn-vrow .av { width: 20px; height: 20px; border-radius: 5px; color: white;
  display: grid; place-items: center; font-size: 8.5px; font-weight: 800; flex-shrink: 0; }
.sn-vrow .info { min-width: 0; flex: 1; }
.sn-vrow .info .n { font-size: 10px; font-weight: 700; color: #0b1322; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis; }
.sn-vrow .info .t { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }
.sn-vrow .score { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px;
  font-weight: 800; color: #00b884; flex-shrink: 0; }

/* send button */
.sn-send { display: flex; align-items: center; gap: 8px; justify-content: center;
  padding: 10px 14px; background: linear-gradient(180deg, #8a7dee 0%, #7c3aed 100%);
  color: white; border-radius: 10px; font-size: 12px; font-weight: 700;
  box-shadow: 0 8px 18px -6px rgba(124,58,237,0.5);
  transition: transform .25s; cursor: pointer; }
.sn-send.pressed { transform: scale(0.97); }

/* channel — email cancelled, on-platform on */
.sn-chans { display: flex; gap: 8px; }
.sn-chan { flex: 1; position: relative; padding: 7px 9px; border-radius: 8px;
  background: white; border: 1px solid #e9eef5; display: flex; align-items: center; gap: 7px;
  font-size: 10.5px; font-weight: 600; color: #475569;
  transition: all .4s; }
.sn-chan.dead { color: #cbd5e1; background: #fafbff; }
.sn-chan.dead::before { content: ""; position: absolute; left: 9px; right: 9px; top: 50%;
  height: 1.5px; background: #ef4444; transform: scaleX(0); transform-origin: left;
  transition: transform .55s ease; }
.sn-chan.dead.cut::before { transform: scaleX(1); }
.sn-chan.live { background: #ecfdf5; border-color: #a7f3d0; color: #047857; }
.sn-chan .ico { display: grid; place-items: center; width: 18px; height: 18px;
  border-radius: 5px; background: #f4f6fa; color: inherit; }
.sn-chan.live .ico { background: #d1fae5; }
.sn-chan .badge { margin-left: auto; padding: 1px 6px; border-radius: 99px;
  background: #d1fae5; color: #047857; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8.5px; font-weight: 800; opacity: 0; transition: opacity .4s; }
.sn-chan.live .badge { opacity: 1; }

/* right: AI negotiate */
.sn-stage { background: white; border: 1px solid #e9eef5; border-radius: 12px; padding: 11px 12px;
  display: flex; flex-direction: column; gap: 8px; flex: 1; min-height: 0;
  box-shadow: 0 8px 24px -10px rgba(15,23,42,0.08); }
.sn-stage-hd { display: flex; align-items: center; gap: 8px; }
.sn-stage-hd .b { width: 24px; height: 24px; border-radius: 6px;
  background: linear-gradient(135deg, #0b1322 0%, #1f2a5e 100%); color: #00d196;
  display: grid; place-items: center; box-shadow: 0 0 0 3px rgba(0,209,150,0.15); }
.sn-stage-hd .ttl { font-size: 11.5px; font-weight: 700; color: #0b1322; }
.sn-stage-hd .ttl span { color: #7c3aed; }
.sn-stage-hd .rnd { margin-left: auto; padding: 2px 8px; border-radius: 99px;
  background: #f3f0ff; color: #6d28d9; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9px; font-weight: 800; letter-spacing: 0.08em; }

/* split: chat vs ticker */
.sn-split { display: grid; grid-template-columns: 1.05fr 0.85fr; gap: 10px;
  flex: 1; min-height: 0; }
.sn-chat { display: flex; flex-direction: column; gap: 5px; padding-right: 4px;
  overflow: hidden; min-height: 0; min-width: 0; }
.sn-msg { display: flex; gap: 6px; opacity: 0; transform: translateY(4px);
  transition: opacity .35s, transform .35s; }
.sn-msg.in { opacity: 1; transform: translateY(0); }
.sn-msg .bub { padding: 6px 9px; border-radius: 10px; font-size: 10px; line-height: 1.35;
  max-width: 85%; font-weight: 500; }
.sn-msg.bot .av { width: 18px; height: 18px; border-radius: 50%; background: #0b1322;
  display: grid; place-items: center; color: #00d196; flex-shrink: 0; }
.sn-msg.bot .bub { background: #f3f0ff; color: #4c1d95; border-bottom-left-radius: 3px; }
.sn-msg.vendor { justify-content: flex-end; }
.sn-msg.vendor .bub { background: #f6f8fc; color: #1A1D2E; border: 1px solid #e9eef5;
  border-bottom-right-radius: 3px; }
.sn-msg.vendor .av { order: 2; width: 18px; height: 18px; border-radius: 50%;
  background: #3666ff; color: white; display: grid; place-items: center;
  font-size: 8px; font-weight: 800; flex-shrink: 0; }
.sn-msg .bub .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 800; }
.sn-msg .bub .tag { display: inline-block; margin-right: 4px; padding: 1px 5px;
  background: #ddd5ff; color: #6d28d9; border-radius: 4px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 800;
  letter-spacing: 0.04em; }
.sn-msg.vendor .bub .tag { background: #dbeafe; color: #1d4ed8; }

/* ticker side */
.sn-ticker { background: #0b1322; border-radius: 10px; padding: 11px 11px; display: flex;
  flex-direction: column; gap: 7px; color: white; min-width: 0; }
.sn-ticker .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  letter-spacing: 0.18em; text-transform: uppercase; color: #94a3b8; }
.sn-ticker .price { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 22px;
  font-weight: 900; color: #00d196; line-height: 1; transition: color .3s; }
.sn-ticker .delta { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px;
  font-weight: 800; color: #00d196; }
.sn-svgWrap { background: rgba(255,255,255,0.04); border-radius: 8px; padding: 4px;
  flex: 1; min-height: 70px; position: relative; overflow: hidden; }
.sn-svgWrap svg { width: 100%; height: 100%; }

/* custom criteria */
.sn-crit { display: flex; flex-wrap: wrap; gap: 5px; padding-top: 5px; }
.sn-crit .chip { padding: 2px 7px; border-radius: 99px; background: rgba(255,255,255,0.05);
  color: #cbd5e1; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  font-weight: 700; letter-spacing: 0.04em; display: inline-flex; align-items: center; gap: 3px;
  transition: all .3s; border: 1px solid rgba(255,255,255,0.08); }
.sn-crit .chip.act { background: rgba(0,209,150,0.18); color: #00d196;
  border-color: rgba(0,209,150,0.4); }

/* footer */
.sn-foot { padding: 9px 14px 11px; background: #fafbff; border-top: 1px solid #eef1f6;
  display: flex; align-items: center; gap: 12px; }
.sn-foot .seal { display: flex; align-items: center; gap: 6px; padding: 4px 9px;
  background: white; border: 1px solid #e9eef5; border-radius: 99px;
  font-size: 10.5px; font-weight: 600; color: #475569; }
.sn-foot .stamp { margin-left: auto; padding: 5px 10px; border-radius: 8px;
  background: #ecfdf5; border: 1.5px solid #a7f3d0; color: #047857;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; font-weight: 900;
  letter-spacing: 0.06em; display: flex; align-items: center; gap: 6px;
  opacity: 0; transform: scale(0.92); transition: opacity .35s, transform .35s; }
.sn-foot .stamp.in { opacity: 1; transform: scale(1); }
`;

/* ============ COMPONENT ============ */
function SourceAINegotiateAnimation(props) {
  const speed = props.speed || 1;
  // 11 cursor steps drive ~22s; we map each to a phase index for the visuals.
  const [step, setStep] = snUseState(0);
  const [tick, setTick] = snUseState(0);

  snUseEffect(() => {
    if (!document.getElementById('sn-style')) {
      const s = document.createElement('style');
      s.id = 'sn-style'; s.textContent = SN_STYLE;
      document.head.appendChild(s);
    }
  }, []);

  // Use a single timer that advances `step` in sync with cursor `hold` array.
  snUseEffect(() => {
    const hold = (SN_CURSOR_STEPS[step].hold || 1200) / speed;
    const t = setTimeout(() => {
      const next = (step + 1) % SN_CURSOR_STEPS.length;
      setStep(next);
      if (next === 0) setTick((x) => x + 1);
    }, hold);
    return () => clearTimeout(t);
  }, [step, speed]);

  // === phase mapping ===
  // 0: dd open, 1: dd choose+click, 2: tiles fill, 3: vendors picked, 4: send click,
  // 5: channel switch, 6: bot msg 1, 7: vendor msg 1, 8: bot msg 2, 9: vendor msg 2,
  // 10: final lock
  const ddOpen     = step === 0 || step === 1;
  const categoryChosen = step >= 1;
  const tilesIn    = step >= 2;
  const tilesFilled= step >= 2;
  const vendorsIn  = step >= 2;
  const vendorsPicked = step >= 3;
  const sendPressed = step === 4;
  const channelCut = step >= 5;
  const chatVisible = step >= 6;
  const messagesShown = Math.max(0, step - 5); // step 6→1, 7→2, ...
  const round = step < 7 ? 'R1' : step < 9 ? 'R2' : 'R3';
  const priceIdx = Math.min(SN_CURVE.length - 1, Math.max(0, step - 5));
  const currentPrice = SN_CURVE[priceIdx];
  const lockedIn = step === 10;
  const critActive = step >= 7;

  // SVG path for the curve so far
  const W = 100, H = 100;
  const visibleCurve = SN_CURVE.slice(0, priceIdx + 1);
  const max = SN_CURVE[0], min = SN_CURVE[SN_CURVE.length-1];
  const pts = visibleCurve.map((p, i) => {
    const x = (i / (SN_CURVE.length - 1)) * (W - 6) + 3;
    const y = H - 8 - ((p - min) / (max - min || 1)) * (H - 18);
    return `${x},${y}`;
  });
  const pathD = pts.length ? 'M ' + pts.join(' L ') : '';
  const fillD = pts.length > 1 ? `${pathD} L ${pts[pts.length-1].split(',')[0]},${H-4} L ${pts[0].split(',')[0]},${H-4} Z` : '';

  return (
    <div className="sn-root">
      {/* chrome */}
      <div className="sn-chrome">
        <span className="sn-dot" style={{background:'#ff6058'}}/>
        <span className="sn-dot" style={{background:'#ffbd2e'}}/>
        <span className="sn-dot" style={{background:'#28c941'}}/>
        <div className="sn-url"><SNI.Lock s={10}/>app.factwise.io / sourcing / new-event</div>
        <div className="sn-pill"><span className="d"/>FW Autobot · AI Negotiating</div>
      </div>

      {/* grid */}
      <div className="sn-grid">
        {/* LEFT — event setup */}
        <div className="sn-left">
          {/* Category dropdown */}
          <div className={`sn-card ${categoryChosen ? 'glow' : ''}`}>
            <div className="sn-card-hd">
              <span className="l">01 · Category</span>
              <span className="v" style={{color: categoryChosen ? '#7c3aed' : '#94a3b8'}}>
                {categoryChosen ? 'Templates loaded' : 'Choose template'}
              </span>
            </div>
            <div className={`sn-dd ${ddOpen ? 'act' : ''} ${categoryChosen ? 'chosen' : ''}`}>
              <span className="placeholder">Select category…</span>
              {categoryChosen && <span>Electronics · PCB · SMT</span>}
              <span className="chev"><SNI.Chevron s={11}/></span>
              <div className={`sn-dd-menu ${ddOpen ? 'show' : ''}`}>
                <div className={`sn-dd-item ${step === 1 ? 'hov' : ''}`}>
                  <span>Electronics · PCB · SMT</span><span className="key">12 items</span>
                </div>
                <div className="sn-dd-item">
                  <span>Mechanical · Forging</span><span className="key">8 items</span>
                </div>
                <div className="sn-dd-item">
                  <span>Logistics · 3PL</span><span className="key">4 items</span>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-filled tiles */}
          <div className="sn-card">
            <div className="sn-card-hd">
              <span className="l">02 · Auto-filled</span>
              <span className="v" style={{color: tilesFilled ? '#7c3aed' : '#94a3b8'}}>
                <SNI.Spark s={10}/> from history
              </span>
            </div>
            <div className="sn-tiles">
              {[
                { k: 'Target price', v: '₹4.60L',  s: 'last 6m avg' },
                { k: 'Line items',   v: '12',      s: 'BOM pulled' },
                { k: 'Closes in',    v: '48h',     s: 'auto reminders' },
              ].map((t, i) => (
                <div key={i} className={`sn-tile ${tilesIn ? 'in' : ''} ${tilesFilled ? 'filled' : ''}`}
                     style={{transitionDelay: `${i*0.08}s`}}>
                  <div className="k">{t.k}</div>
                  <div className="v">{t.v}</div>
                  <div className="s">{t.s}</div>
                </div>
              ))}
            </div>
            <div className="sn-warns" style={{marginTop:7}}>
              {[
                'Price floor: −8% historic',
                'Lead time risk: V4 holiday',
                'Currency: 3 FX needed',
              ].map((w, i) => (
                <div key={i} className={`sn-warn ${tilesFilled ? 'in' : ''}`}
                     style={{transitionDelay: `${0.35 + i*0.08}s`}}>
                  <SNI.Warn s={9}/>{w}
                </div>
              ))}
            </div>
          </div>

          {/* Vendor auto-pick */}
          <div className="sn-card">
            <div className="sn-card-hd">
              <span className="l">03 · Vendors auto-picked</span>
              <span className="v" style={{color: vendorsPicked ? '#3666ff' : '#94a3b8'}}>
                by tag + history
              </span>
            </div>
            <div className="sn-vlist">
              {SN_VENDORS.map((v, i) => (
                <div key={v.id} className={`sn-vrow ${vendorsIn ? 'in' : ''} ${vendorsPicked ? 'picked' : ''}`}
                     style={{transitionDelay: `${0.5 + i*0.07}s`, borderColor: vendorsPicked ? `${v.tone}66` : '#e9eef5'}}>
                  <div className="av" style={{background:v.tone}}>{v.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
                  <div className="info">
                    <div className="n">{v.name}</div>
                    <div className="t">{v.tag} · {v.region}</div>
                  </div>
                  <div className="score">{v.score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Send button */}
          <div className={`sn-send ${sendPressed ? 'pressed' : ''}`}>
            <SNI.Send s={11}/>Send Event · invite 5 vendors
          </div>
        </div>

        {/* RIGHT — channels + AI negotiation */}
        <div className="sn-right">
          {/* Channels */}
          <div className="sn-card" style={{padding:'9px 11px'}}>
            <div className="sn-card-hd">
              <span className="l">04 · Channel</span>
              <span className="v" style={{color: channelCut ? '#047857' : '#94a3b8'}}>
                <SNI.Bell s={9}/> Auto-reminders on
              </span>
            </div>
            <div className="sn-chans">
              <div className={`sn-chan dead ${channelCut ? 'cut' : ''}`}>
                <span className="ico"><SNI.Mail s={11}/></span>
                Email back-and-forth
              </div>
              <div className={`sn-chan ${channelCut ? 'live' : ''}`}>
                <span className="ico"><SNI.Globe s={11}/></span>
                On-platform reply
                <span className="badge">LIVE</span>
              </div>
            </div>
          </div>

          {/* AI Stage */}
          <div className="sn-stage">
            <div className="sn-stage-hd">
              <div className="b"><SNI.Bot s={13}/></div>
              <div className="ttl">FW Autobot <span>· auto-negotiating</span></div>
              <div className="rnd">{round}</div>
            </div>

            <div className="sn-split">
              {/* Chat */}
              <div className="sn-chat">
                {SN_CHAT.map((m, i) => (
                  <div key={i} className={`sn-msg ${m.who} ${i < messagesShown ? 'in' : ''}`}
                       style={{transitionDelay: `${i*0.04}s`}}>
                    {m.who === 'bot' && <div className="av"><SNI.Bot s={10}/></div>}
                    <div className="bub">
                      <span className="tag">{m.round}</span>
                      {m.text.split(/(₹[\d.]+L?)/).map((part, j) => /₹/.test(part)
                        ? <span key={j} className="mono">{part}</span>
                        : <React.Fragment key={j}>{part}</React.Fragment>)}
                    </div>
                    {m.who === 'vendor' && <div className="av">A</div>}
                  </div>
                ))}
              </div>

              {/* Ticker */}
              <div className="sn-ticker">
                <div className="l">Landed cost · live</div>
                <div className="price" style={{color: lockedIn ? '#00d196' : '#fff'}}>
                  ₹{currentPrice.toFixed(2)}L
                </div>
                <div className="delta">
                  {priceIdx === 0 ? '— start' : `▼ ₹${(SN_CURVE[0] - currentPrice).toFixed(2)}L · ${((1 - currentPrice/SN_CURVE[0])*100).toFixed(1)}%`}
                </div>
                <div className="sn-svgWrap">
                  <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sn-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#00d196" stopOpacity="0.5"/>
                        <stop offset="100%" stopColor="#00d196" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    {fillD && <path d={fillD} fill="url(#sn-fill)"/>}
                    {pathD && <path d={pathD} fill="none" stroke="#00d196" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round"/>}
                    {pts.map((pt, i) => {
                      const [x,y] = pt.split(',').map(Number);
                      return <circle key={i} cx={x} cy={y} r="1.4" fill="#00d196"/>;
                    })}
                  </svg>
                </div>
                <div className="sn-crit">
                  <span className={`sn-crit-i chip ${critActive ? 'act' : ''}`}>
                    {critActive ? <SNI.Check s={8}/> : ''} Quality A
                  </span>
                  <span className={`chip ${critActive ? 'act' : ''}`}>
                    {critActive ? <SNI.Check s={8}/> : ''} Lead ≤14d
                  </span>
                  <span className={`chip ${step >= 9 ? 'act' : ''}`}>
                    {step >= 9 ? <SNI.Check s={8}/> : ''} Net-30
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cursor */}
        {window.ScriptedCursor && (
          <window.ScriptedCursor steps={SN_CURSOR_STEPS} tick={tick} tone="#7c3aed"/>
        )}
      </div>

      {/* Footer */}
      <div className="sn-foot">
        <div className="seal"><SNI.Bot s={11}/> Negotiation · 3 rounds · 47s</div>
        <div className={`stamp ${lockedIn ? 'in' : ''}`}>
          <SNI.Check s={10}/> LOCKED · ₹4.39L · saved 4.6%
        </div>
      </div>
    </div>
  );
}

window.SourceAINegotiateAnimation = SourceAINegotiateAnimation;

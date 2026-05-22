/* ============================================================
 * QuoteAIInsightAnimation.jsx
 * FactWise — SECTION 3.4 · "Automate Quote Generation. Win Every Time."
 *
 * STORY (loops ~22s, cursor-driven):
 *   ACT 1 · PICK BEST BIDS (0–4s)
 *     Three "best bid" source cards on the left. Cursor ticks each
 *     checkbox in sequence → each lights up.
 *   ACT 2 · CLICK GENERATE (4–7s)
 *     Cursor hits a glowing "Generate quote" CTA → magic-wand burst,
 *     particles fly from each source card into a quote doc on the right.
 *   ACT 3 · DOCUMENT BUILDS (7–11s)
 *     Quote doc rows appear in order — each row tagged with its source.
 *     Subtotal, landed cost, markup, customer total tick up.
 *   ACT 4 · AI CHAT (11–18s)
 *     Bottom-right AI panel slides in: "Ask anything about your quote."
 *     A typed prompt appears: "Where is my biggest expense?"
 *     AI replies with a category donut chart + insight bullets.
 *   ACT 5 · SEND (18–22s)
 *     Cursor moves to "Send to customer" → button glows, paper-plane
 *     animation flies. "Sent · 14m faster than last quote" stamp.
 * ============================================================ */

const { useState: qaUseState, useEffect: qaUseEffect } = React;

const QAI = {
  Check: (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Bot:   (p)=> <svg viewBox="0 0 24 24" width={p.s||13} height={p.s||13} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"/><circle cx="9" cy="14" r="1.4" fill="currentColor"/><circle cx="15" cy="14" r="1.4" fill="currentColor"/><path d="M12 4v4M8 2v2M16 2v2"/></svg>,
  Spark: (p)=> <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="currentColor"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"/></svg>,
  Wand:  (p)=> <svg viewBox="0 0 24 24" width={p.s||13} height={p.s||13} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4l5 5L8 21H3v-5L15 4z"/><path d="M18 1l1.5 3L23 5.5 19.5 7 18 10l-1.5-3L13 5.5 16.5 4z" fill="currentColor" stroke="none"/></svg>,
  Send:  (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Lock:  (p)=> <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  File:  (p)=> <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
};

/* ============ DATA ============ */
const QA_SOURCES = [
  { id: 'S1', label: 'EVT-7741', name: 'Sahasra · pumps',  tone: '#3666ff',
    items: ['Pump Body', 'Stator Winding', 'O-ring Kit'], sub: 488000, color: '#3666ff' },
  { id: 'S2', label: 'EVT-7740', name: 'Tata · drive',     tone: '#0d9488',
    items: ['Shaft Assy', 'Bearings 6204'],                sub: 142000, color: '#0d9488' },
  { id: 'S3', label: 'EVT-7738', name: 'EuroDrive · ctrl', tone: '#7c3aed',
    items: ['Control Board', 'MCU + Caps'],                sub: 196000, color: '#7c3aed' },
];

const QA_ROWS = [
  { src: 'S1', name: 'Pump Body',           qty: 200, price: 1240 },
  { src: 'S1', name: 'Stator Winding',      qty: 200, price:  920 },
  { src: 'S1', name: 'O-ring Kit',          qty: 200, price:  280 },
  { src: 'S2', name: 'Shaft Assembly',      qty: 200, price:  450 },
  { src: 'S2', name: 'Bearings · NSK 6204', qty: 800, price:   80 },
  { src: 'S3', name: 'Control Board v3',    qty: 200, price:  890 },
  { src: 'S3', name: 'MCU + Caps',          qty: 200, price:   90 },
];

const QA_CATS = [
  { name: 'Electrical', pct: 41, color: '#7c3aed' },
  { name: 'Mechanical', pct: 33, color: '#3666ff' },
  { name: 'Logistics',  pct: 14, color: '#0d9488' },
  { name: 'Duty + Tax', pct: 12, color: '#f59e0b' },
];

/* ============ CURSOR ============ */
const QA_CURSOR_STEPS = [
  { x: 10, y: 23, hold: 700,  label: 'EVT-7741', click: true },
  { x: 10, y: 41, hold: 700,  label: 'EVT-7740', click: true },
  { x: 10, y: 59, hold: 700,  label: 'EVT-7738', click: true },
  { x: 22, y: 86, hold: 800,  label: 'Generate quote', click: true },
  { x: 60, y: 38, hold: 900,  label: 'Rolled up' },
  { x: 78, y: 47, hold: 900,  label: 'Totals tick' },
  { x: 78, y: 84, hold: 800,  label: 'Ask AI' },
  { x: 64, y: 84, hold: 700,  label: 'Typing…' },
  { x: 60, y: 68, hold: 1300, label: 'AI insight' },
  { x: 90, y: 91, hold: 900,  label: 'Send quote', click: true },
];

/* ============ STYLE ============ */
const QA_STYLE = `
.qa-root { position: relative; width: 100%; height: 580px; font-family: 'Inter', system-ui, sans-serif;
  color: #0b1322; background:
    radial-gradient(900px 500px at 100% 0%, rgba(54,102,255,0.06), transparent 55%),
    radial-gradient(700px 500px at 0% 100%, rgba(124,58,237,0.05), transparent 55%),
    #fafbff;
  border-radius: 22px; overflow: hidden; border: 1px solid #e9eef5;
  box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 30px 60px -28px rgba(15,23,42,0.18);
  display: flex; flex-direction: column; min-width: 0; }

.qa-chrome { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: white; border-bottom: 1px solid #eef1f6; }
.qa-dot { width: 9px; height: 9px; border-radius: 50%; }
.qa-url { margin-left: 8px; padding: 4px 10px; background: #f6f8fc; border: 1px solid #e8edf3;
  border-radius: 6px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10.5px; color: #64748b; display: flex; align-items: center; gap: 6px; }
.qa-pill { margin-left: auto; padding: 3px 9px; background: #f0ebff;
  border: 1px solid #ddd5ff; border-radius: 99px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; font-weight: 700;
  color: #6d28d9; letter-spacing: 0.16em; text-transform: uppercase;
  display: inline-flex; align-items: center; gap: 5px; }
.qa-pill .d { width: 5px; height: 5px; border-radius: 50%; background: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124,58,237,0.2); animation: qa-pulse 1.4s ease-in-out infinite; }
@keyframes qa-pulse { 0%,100% { transform: scale(1); opacity: 1;} 50% { transform: scale(1.5); opacity: 0.55;} }

/* grid */
.qa-grid { position: relative; display: grid; grid-template-columns: 235px 1fr 250px;
  flex: 1; min-height: 0; min-width: 0; }
.qa-col { padding: 12px; min-width: 0; display: flex; flex-direction: column; gap: 10px;
  min-height: 0; }
.qa-col.l { border-right: 1px solid #eef1f6; }
.qa-col.r { border-left: 1px solid #eef1f6; background: #fafbff; }

/* heading line */
.qa-h { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px;
  letter-spacing: 0.14em; text-transform: uppercase; color: #94a3b8; font-weight: 800;
  display: flex; align-items: center; gap: 5px; }
.qa-h .n { background: #0b1322; color: white; padding: 1px 6px; border-radius: 99px;
  font-size: 8.5px; }

/* source cards */
.qa-src { position: relative; background: white; border: 1.5px solid #e9eef5;
  border-radius: 9px; padding: 9px 10px; transition: all .4s; cursor: pointer; }
.qa-src.on { border-color: var(--tone); background: linear-gradient(135deg, #fafbff 0%, white 100%);
  box-shadow: 0 8px 18px -8px var(--tone-shadow); }
.qa-src .top { display: flex; align-items: center; gap: 7px; }
.qa-src .ck { width: 16px; height: 16px; border-radius: 4.5px; border: 1.5px solid #cbd5e1;
  display: grid; place-items: center; color: white; background: white; flex-shrink: 0;
  transition: all .3s; }
.qa-src.on .ck { background: var(--tone); border-color: var(--tone); }
.qa-src .lbl { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px;
  font-weight: 800; color: #94a3b8; letter-spacing: 0.06em; }
.qa-src.on .lbl { color: var(--tone); }
.qa-src .nm { font-size: 11px; font-weight: 700; color: #0b1322; margin-top: 3px; line-height: 1.2; }
.qa-src .items { margin-top: 4px; display: flex; flex-wrap: wrap; gap: 3px; }
.qa-src .item { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  padding: 1px 6px; border-radius: 99px; background: #f4f6fa; color: #64748b;
  letter-spacing: 0.02em; }
.qa-src.on .item { background: rgba(var(--tone-rgb), 0.1); color: var(--tone); }
.qa-src .sub { margin-top: 6px; display: flex; align-items: center; justify-content: space-between;
  padding-top: 5px; border-top: 1px dashed #eef1f6; }
.qa-src .sub .l { font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8px; letter-spacing: 0.08em; color: #94a3b8; text-transform: uppercase; font-weight: 700; }
.qa-src .sub .v { font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px; font-weight: 800; color: #0b1322; }

/* generate button */
.qa-gen { margin-top: auto; padding: 11px 12px; border-radius: 10px;
  background: linear-gradient(180deg, #4A6FFF 0%, #2f59ff 100%); color: white;
  font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 7px;
  box-shadow: 0 10px 24px -8px rgba(54,102,255,0.5),
              inset 0 1px 0 rgba(255,255,255,0.3);
  transition: all .3s; opacity: 0.55; }
.qa-gen.ready { opacity: 1; }
.qa-gen.glow { animation: qa-genGlow 1.4s ease-in-out infinite; }
@keyframes qa-genGlow {
  0%,100% { transform: scale(1); box-shadow: 0 10px 24px -8px rgba(54,102,255,0.5); }
  50% { transform: scale(1.03); box-shadow: 0 14px 30px -6px rgba(54,102,255,0.75); }
}
.qa-gen.pressed { transform: scale(0.96); }

/* doc */
.qa-doc { background: white; border: 1px solid #e9eef5; border-radius: 12px;
  padding: 12px 13px; box-shadow: 0 14px 32px -16px rgba(15,23,42,0.12);
  flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 8px; }
.qa-doc-hd { display: flex; align-items: center; gap: 8px; padding-bottom: 8px;
  border-bottom: 1.5px solid #f1f5f9; }
.qa-doc-hd .ic { width: 22px; height: 22px; border-radius: 6px;
  background: #eff4ff; color: #3666ff; display: grid; place-items: center; }
.qa-doc-hd .t { font-size: 11.5px; font-weight: 800; color: #0b1322; }
.qa-doc-hd .id { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9.5px;
  color: #94a3b8; }
.qa-doc-hd .mark { margin-left: auto; padding: 3px 9px; border-radius: 99px;
  background: #f3f0ff; color: #6d28d9; border: 1px solid #ddd5ff;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; font-weight: 800;
  letter-spacing: 0.06em; }

.qa-rows { display: flex; flex-direction: column; gap: 2px; flex: 1; overflow: hidden; }
.qa-row { display: grid; grid-template-columns: 5px 1fr 38px 60px; gap: 7px; align-items: center;
  padding: 4px 6px; border-radius: 5px; font-size: 10px;
  opacity: 0; transform: translateX(-4px);
  transition: opacity .4s, transform .4s, background .3s; }
.qa-row.in { opacity: 1; transform: translateX(0); }
.qa-row .bar { width: 4px; height: 22px; border-radius: 2px; background: #cbd5e1; }
.qa-row .nm { color: #0b1322; font-weight: 600; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis; }
.qa-row .qty { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px;
  color: #94a3b8; text-align: right; }
.qa-row .px { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px;
  font-weight: 700; color: #0b1322; text-align: right; }
.qa-row.pulse { background: rgba(54,102,255,0.08); }

/* totals */
.qa-tots { display: flex; flex-direction: column; gap: 3px; padding-top: 7px;
  border-top: 1.5px dashed #e9eef5; }
.qa-tot-r { display: grid; grid-template-columns: 1fr auto; align-items: center;
  font-size: 10.5px; color: #475569; }
.qa-tot-r .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px;
  letter-spacing: 0.06em; text-transform: uppercase; color: #94a3b8; font-weight: 700; }
.qa-tot-r .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px;
  font-weight: 800; color: #0b1322; transition: opacity .3s; }
.qa-tot-r.final { padding: 6px 9px; margin-top: 4px; background: #0b1322; color: white;
  border-radius: 7px; }
.qa-tot-r.final .l { color: #94a3b8; }
.qa-tot-r.final .v { color: white; font-size: 14px; }

/* particles */
.qa-particle { position: absolute; width: 8px; height: 8px; border-radius: 50%;
  background: var(--p-color, #3666ff); box-shadow: 0 0 12px var(--p-color, #3666ff);
  pointer-events: none; z-index: 6; }
.qa-particle.go { animation: qa-fly 1s cubic-bezier(0.4,0,0.2,1) forwards; }
@keyframes qa-fly {
  0% { opacity: 0; }
  10% { opacity: 1; }
  100% { left: var(--end-x); top: var(--end-y); opacity: 0; transform: scale(0.4); }
}

/* AI ASK panel */
.qa-ai { background: #0b1322; color: white; border-radius: 12px;
  padding: 11px 12px; display: flex; flex-direction: column; gap: 8px;
  min-height: 0; flex: 1; box-shadow: 0 14px 32px -14px rgba(11,19,34,0.45); }
.qa-ai-hd { display: flex; align-items: center; gap: 7px; }
.qa-ai-hd .b { width: 22px; height: 22px; border-radius: 6px;
  background: rgba(0,209,150,0.18); color: #00d196; display: grid; place-items: center; }
.qa-ai-hd .t { font-size: 11px; font-weight: 800; }
.qa-ai-hd .t span { color: #00d196; }
.qa-ai-hd .badge { margin-left: auto; padding: 1px 7px; border-radius: 99px;
  background: rgba(0,209,150,0.18); color: #00d196;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 800;
  letter-spacing: 0.08em; }

.qa-prompt { display: flex; align-items: center; gap: 7px; padding: 7px 9px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; font-size: 10px; color: #cbd5e1; }
.qa-prompt .cur { display: inline-block; width: 1.5px; height: 11px; background: #00d196;
  animation: qa-blink 0.9s steps(2) infinite; vertical-align: middle; margin-left: 1px; }
@keyframes qa-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }

/* AI answer */
.qa-answer { display: flex; gap: 7px; align-items: flex-start;
  opacity: 0; transform: translateY(4px);
  transition: opacity .4s, transform .4s; }
.qa-answer.in { opacity: 1; transform: translateY(0); }
.qa-answer .av { width: 20px; height: 20px; border-radius: 50%;
  background: rgba(0,209,150,0.18); color: #00d196;
  display: grid; place-items: center; flex-shrink: 0; }
.qa-answer .body { flex: 1; min-width: 0; }
.qa-answer .body .head { font-size: 10px; font-weight: 600; color: white; margin-bottom: 5px; }
.qa-answer .body .head b { color: #ffd166; }

/* donut + bars */
.qa-chartRow { display: flex; gap: 10px; align-items: center; }
.qa-donut { width: 60px; height: 60px; position: relative; flex-shrink: 0; }
.qa-donut .mid { position: absolute; inset: 0; display: grid; place-items: center;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; font-weight: 800;
  color: #ffd166; line-height: 1; }
.qa-bars { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
.qa-bar { display: grid; grid-template-columns: 64px 1fr 30px; gap: 6px; align-items: center;
  font-size: 9.5px; color: #cbd5e1; }
.qa-bar .nm { font-weight: 600; color: white; white-space: nowrap; overflow: hidden;
  text-overflow: ellipsis; }
.qa-bar .track { height: 6px; background: rgba(255,255,255,0.06); border-radius: 99px;
  position: relative; overflow: hidden; }
.qa-bar .fill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 99px;
  width: 0%; transition: width .9s cubic-bezier(0.4,0,0.2,1); }
.qa-bar .pct { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 800;
  text-align: right; color: white; }

/* insight line */
.qa-insight { display: flex; gap: 6px; align-items: flex-start;
  padding: 6px 8px; background: rgba(0,209,150,0.08);
  border: 1px solid rgba(0,209,150,0.18); border-radius: 7px;
  font-size: 10px; color: #d1fae5; line-height: 1.35;
  opacity: 0; transform: translateY(3px); transition: opacity .4s .3s, transform .4s .3s; }
.qa-insight.in { opacity: 1; transform: translateY(0); }
.qa-insight b { color: #ffd166; font-weight: 800; }

/* send CTA */
.qa-send-wrap { display: flex; align-items: center; gap: 8px; padding-top: 6px;
  border-top: 1px dashed rgba(255,255,255,0.1); }
.qa-stat { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px;
  color: #94a3b8; letter-spacing: 0.04em; }
.qa-stat strong { color: #00d196; font-weight: 800; }
.qa-send { margin-left: auto; padding: 6px 10px; border-radius: 7px;
  background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%); color: white;
  font-size: 10.5px; font-weight: 800; display: inline-flex; align-items: center; gap: 5px;
  box-shadow: 0 6px 14px -4px rgba(245,158,11,0.55);
  transition: transform .25s; }
.qa-send.glow { animation: qa-sendGlow 1.4s ease-in-out infinite; }
@keyframes qa-sendGlow {
  0%,100% { transform: scale(1); box-shadow: 0 6px 14px -4px rgba(245,158,11,0.55); }
  50% { transform: scale(1.06); box-shadow: 0 12px 24px -4px rgba(245,158,11,0.85); }
}
.qa-send.click { transform: scale(0.92); }
`;

function QuoteAIInsightAnimation(props) {
  const speed = props.speed || 1;
  const [step, setStep] = qaUseState(0);
  const [tick, setTick] = qaUseState(0);
  const [particles, setParticles] = qaUseState([]);

  qaUseEffect(() => {
    if (!document.getElementById('qa-style')) {
      const s = document.createElement('style');
      s.id = 'qa-style'; s.textContent = QA_STYLE;
      document.head.appendChild(s);
    }
  }, []);

  qaUseEffect(() => {
    const hold = (QA_CURSOR_STEPS[step].hold || 1200) / speed;
    const t = setTimeout(() => {
      const next = (step + 1) % QA_CURSOR_STEPS.length;
      setStep(next);
      if (next === 0) setTick((x) => x + 1);
    }, hold);
    return () => clearTimeout(t);
  }, [step, speed]);

  // Burst particles when generate is clicked
  qaUseEffect(() => {
    if (step !== 3) return;
    const bursts = [];
    for (let i = 0; i < 12; i++) {
      bursts.push({
        id: Date.now() + i,
        startX: 18 + (i % 3) * 2,
        startY: 20 + (i % 3) * 18,
        endX: 50 + (i % 4) * 6,
        endY: 35 + (i % 4) * 8,
        color: QA_SOURCES[i % 3].tone,
        delay: i * 50,
      });
    }
    setParticles(bursts);
    const cleanup = setTimeout(() => setParticles([]), 1400);
    return () => clearTimeout(cleanup);
  }, [step]);

  // Step → state mapping
  const s1On = step >= 0;
  const s2On = step >= 1;
  const s3On = step >= 2;
  const allPicked = step >= 2;
  const genGlow = step === 3 || step === 2;
  const genPressed = step === 3;
  const rowsVisible = step >= 4 ? Math.min(QA_ROWS.length, (step - 3) * 4) : 0;
  const rowsAll = step >= 4 ? QA_ROWS.length : 0; // simplified — show all after click
  const showAllRows = step >= 4;
  const totalsIn = step >= 5;
  const askActive = step >= 6;
  const typing = step === 7;
  const answerIn = step >= 8;
  const insightIn = step >= 8;
  const sendGlow = step === 9;
  const sendClick = step === 9;

  // Compute totals
  const subtotal = QA_ROWS.reduce((s, r) => s + r.qty * r.price, 0);
  const landed   = Math.round(subtotal * 0.085);
  const markup   = Math.round(subtotal * 0.18);
  const total    = subtotal + landed + markup;

  // typed prompt (animates by step)
  const promptFull = 'Where is my biggest expense?';
  const promptLen = askActive
    ? (typing ? Math.floor(promptFull.length * 0.6)
              : (step >= 8 ? promptFull.length : Math.floor(promptFull.length * 0.3)))
    : 0;
  const promptText = promptFull.slice(0, promptLen);

  return (
    <div className="qa-root">
      <div className="qa-chrome">
        <span className="qa-dot" style={{background:'#ff6058'}}/>
        <span className="qa-dot" style={{background:'#ffbd2e'}}/>
        <span className="qa-dot" style={{background:'#28c941'}}/>
        <div className="qa-url"><QAI.Lock s={10}/>app.factwise.io / quote / build</div>
        <div className="qa-pill"><span className="d"/>FW Insight · AI assist</div>
      </div>

      <div className="qa-grid">
        {/* LEFT — sources */}
        <div className="qa-col l">
          <div className="qa-h"><span className="n">01</span>Select best bids</div>

          {QA_SOURCES.map((s, i) => {
            const on = (i === 0 && s1On) || (i === 1 && s2On) || (i === 2 && s3On);
            const rgb = s.tone === '#3666ff' ? '54,102,255'
                      : s.tone === '#0d9488' ? '13,148,136'
                      : '124,58,237';
            return (
              <div key={s.id} className={`qa-src ${on ? 'on' : ''}`}
                   style={{'--tone': s.tone, '--tone-rgb': rgb, '--tone-shadow': `${s.tone}44`}}>
                <div className="top">
                  <div className="ck">{on && <QAI.Check s={8}/>}</div>
                  <span className="lbl">{s.label}</span>
                </div>
                <div className="nm">{s.name}</div>
                <div className="items">
                  {s.items.map((it, j) => <span key={j} className="item">{it}</span>)}
                </div>
                <div className="sub">
                  <span className="l">Best bid · sub</span>
                  <span className="v">₹{(s.sub/1000).toFixed(0)}K</span>
                </div>
              </div>
            );
          })}

          <div className={`qa-gen ${allPicked ? 'ready' : ''} ${genGlow ? 'glow' : ''} ${genPressed ? 'pressed' : ''}`}>
            <QAI.Wand s={12}/> Generate quote
          </div>
        </div>

        {/* CENTRE — doc */}
        <div className="qa-col" style={{padding: '12px'}}>
          <div className="qa-doc">
            <div className="qa-doc-hd">
              <div className="ic"><QAI.File s={13}/></div>
              <div>
                <div className="t">Customer quote</div>
                <div className="id">QT-1109 · Acme Robotics · 200 units</div>
              </div>
              <div className="mark">Auto-rolled</div>
            </div>

            <div className="qa-rows">
              {QA_ROWS.map((r, i) => {
                const src = QA_SOURCES.find(s => s.id === r.src);
                const rowIn = showAllRows;
                return (
                  <div key={i} className={`qa-row ${rowIn ? 'in' : ''} ${step === 4 ? 'pulse' : ''}`}
                       style={{transitionDelay: `${0.1 + i*0.09}s`}}>
                    <div className="bar" style={{background: src.tone}}/>
                    <span className="nm">{r.name}</span>
                    <span className="qty">×{r.qty}</span>
                    <span className="px">₹{(r.qty * r.price).toLocaleString('en-IN')}</span>
                  </div>
                );
              })}
            </div>

            <div className="qa-tots">
              <div className="qa-tot-r">
                <span className="l">Subtotal</span>
                <span className="v" style={{opacity: totalsIn ? 1 : 0.3}}>
                  ₹{(totalsIn ? subtotal : 0).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="qa-tot-r">
                <span className="l">Landed cost · auto</span>
                <span className="v" style={{opacity: totalsIn ? 1 : 0.3}}>
                  +₹{(totalsIn ? landed : 0).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="qa-tot-r">
                <span className="l">Markup · 18%</span>
                <span className="v" style={{opacity: totalsIn ? 1 : 0.3}}>
                  +₹{(totalsIn ? markup : 0).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="qa-tot-r final">
                <span className="l">Customer total</span>
                <span className="v">₹{(totalsIn ? total : 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — AI ask */}
        <div className="qa-col r">
          <div className="qa-h"><span className="n">02</span>Ask AI · your quote</div>
          <div className="qa-ai">
            <div className="qa-ai-hd">
              <div className="b"><QAI.Bot s={12}/></div>
              <div className="t">FW Insight <span>· ask anything</span></div>
              <div className="badge">AI</div>
            </div>

            <div className="qa-prompt">
              <QAI.Spark s={10}/>
              <span>{promptText}</span>
              {askActive && <span className="cur"/>}
            </div>

            <div className={`qa-answer ${answerIn ? 'in' : ''}`}>
              <div className="av"><QAI.Bot s={11}/></div>
              <div className="body">
                <div className="head">
                  <b>Electrical</b> is your top spend — pricing pressure here moves the quote most.
                </div>
                <div className="qa-chartRow">
                  {/* donut */}
                  <svg className="qa-donut" viewBox="0 0 36 36">
                    {(() => {
                      let acc = 0;
                      return QA_CATS.map((c, i) => {
                        const len = (c.pct / 100) * 100;
                        const dash = `${answerIn ? len : 0} ${100 - len + 0.001}`;
                        const off  = -acc;
                        acc += len;
                        return (
                          <circle key={i} cx="18" cy="18" r="15.9" fill="none"
                            stroke={c.color} strokeWidth="4"
                            strokeDasharray={dash} strokeDashoffset={off}
                            pathLength="100"
                            style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)',
                                     transformOrigin: 'center', transform: 'rotate(-90deg)' }}/>
                        );
                      });
                    })()}
                    <foreignObject x="0" y="0" width="36" height="36">
                      <div className="mid">{answerIn ? '41%' : ''}</div>
                    </foreignObject>
                  </svg>
                  <div className="qa-bars">
                    {QA_CATS.map((c, i) => (
                      <div key={i} className="qa-bar">
                        <span className="nm">{c.name}</span>
                        <span className="track">
                          <span className="fill"
                            style={{ width: answerIn ? `${c.pct * 2.4}%` : 0,
                                     background: c.color,
                                     transitionDelay: `${0.15 + i*0.1}s` }}/>
                        </span>
                        <span className="pct">{answerIn ? `${c.pct}%` : '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={`qa-insight ${insightIn ? 'in' : ''}`}>
              <QAI.Spark s={10}/>
              <span>
                <b>Tip:</b> at 1000 units, your unit cost drops <b>13%</b> — bid tighter on volume to win this RFQ.
              </span>
            </div>

            <div className="qa-send-wrap" style={{marginTop:'auto'}}>
              <span className="qa-stat">
                Built in <strong>4m 22s</strong> · normally 1h+
              </span>
              <div className={`qa-send ${sendGlow ? 'glow' : ''} ${sendClick ? 'click' : ''}`}>
                <QAI.Send s={10}/> Send
              </div>
            </div>
          </div>
        </div>

        {/* Particles burst */}
        {particles.map((p) => (
          <div key={p.id} className="qa-particle go"
               style={{
                 left: `${p.startX}%`, top: `${p.startY}%`,
                 '--p-color': p.color,
                 '--end-x': `${p.endX}%`, '--end-y': `${p.endY}%`,
                 animationDelay: `${p.delay}ms`,
               }}/>
        ))}

        {/* Cursor */}
        {window.ScriptedCursor && (
          <window.ScriptedCursor steps={QA_CURSOR_STEPS} tick={tick} tone="#3666ff"/>
        )}
      </div>
    </div>
  );
}

window.QuoteAIInsightAnimation = QuoteAIInsightAnimation;

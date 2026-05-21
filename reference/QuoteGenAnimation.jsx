/* ============================================================
 * QuoteGenAnimation.jsx  (browser-preview version)
 * FactWise — Quote-to-Order · Phase 4: "Quote Generation & Analytics"
 *
 * Story (loops ~19s):
 *   1. SOURCES   — three "best bid" cards fade in on the left,
 *                  each with the line items it won.
 *   2. CLICK     — "Generate Quote" button glows; click pulse.
 *   3. ROLLUP    — quote document on the right builds row by row;
 *                  source card flashes as each row lands.
 *   4. TOTALS    — subtotal / markup / freight / customer total tick up.
 *   5. ANALYTICS — panel slides in below: spend-by-category bars,
 *                  volume-curve chart, margin-guard KPIs.
 *   6. SEND      — "Send Quote" CTA glows amber.
 *
 * Usage:
 *   <script type="text/babel" src="QuoteGenAnimation.jsx"></script>
 *   ReactDOM.createRoot(el).render(<QuoteGenAnimation speed={1} />)
 *
 * Port to .tsx: rename, named React imports, `'use client'`,
 *   replace `window.QuoteGenAnimation = …` with `export default …`.
 * ============================================================ */

const { useState: qgUseState, useEffect: qgUseEffect, useRef: qgUseRef } = React;

/* ============ ICONS ============ */
const QGI = {
  FileText: (p) => <svg viewBox="0 0 24 24" width={p.s||12} height={p.s||12} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="14" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></svg>,
  Trophy:   (p) => <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 4H4v3a3 3 0 0 0 3 3"/><path d="M17 4h3v3a3 3 0 0 1-3 3"/></svg>,
  Sparkle:  (p) => <svg viewBox="0 0 24 24" width={p.s||13} height={p.s||13} fill="currentColor"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"/></svg>,
  Send:     (p) => <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Pie:      (p) => <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
  TrendDn:  (p) => <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  Alert:    (p) => <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>,
};

/* ============ DATA ============ */
const QG_SOURCES = [
  { id: 'S1', label: 'EVT-7741', vendor: 'Sahasra (Mumbai)',  color: '#3666ff', items: ['Pump Body', 'Stator', 'O-ring kit'], sub: 488000 },
  { id: 'S2', label: 'EVT-7740', vendor: 'Tata Precision',    color: '#00b884', items: ['Shaft Assy', 'Bearings'],            sub: 142000 },
  { id: 'S3', label: 'EVT-7738', vendor: 'EuroDrive GmbH',    color: '#7b68ee', items: ['Control Board', 'MCU + caps'],      sub: 196000 },
];

const QG_ROWS = [
  { src: 'S1', name: 'Pump Body',           qty: 200, price: 1240, color: '#3666ff' },
  { src: 'S1', name: 'Stator Winding',      qty: 200, price:  920, color: '#3666ff' },
  { src: 'S1', name: 'O-ring Kit',          qty: 200, price:  280, color: '#3666ff' },
  { src: 'S2', name: 'Shaft Assembly',      qty: 200, price:  450, color: '#00b884' },
  { src: 'S2', name: 'Bearings · NSK 6204', qty: 800, price:   80, color: '#00b884' },
  { src: 'S3', name: 'Control Board v3',    qty: 200, price:  890, color: '#7b68ee' },
  { src: 'S3', name: 'MCU + Caps',          qty: 200, price:   90, color: '#7b68ee' },
];

const QG_CATS = [
  { name: 'Electrical',  pct: 41, color: '#3666ff' },
  { name: 'Mechanical',  pct: 33, color: '#00b884' },
  { name: 'Logistics',   pct: 14, color: '#7b68ee' },
  { name: 'Duty + Tax',  pct: 12, color: '#f59e0b' },
];

const QG_VOLUME = [
  { q:  100, p: 4520 },
  { q:  200, p: 4180 },
  { q:  500, p: 3780 },
  { q: 1000, p: 3490 },
  { q: 2500, p: 3210 },
];

/* ============ STYLE (prefix `qg-`) ============ */
const QG_STYLE = `
.qg-root { position: relative; width: 100%; height: 100%; font-family: 'Inter', system-ui, sans-serif;
  color: #1A1D2E; background: white; border-radius: 22px; overflow: hidden;
  border: 1px solid #e9eef5;
  box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 30px 60px -28px rgba(15,23,42,0.18); }

/* Chrome */
.qg-chrome { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: #f9fafc; border-bottom: 1px solid #eef1f6; }
.qg-dot { width: 10px; height: 10px; border-radius: 50%; }
.qg-url { margin-left: 6px; padding: 4px 10px; background: white; border: 1px solid #e8edf3;
  border-radius: 6px; font-size: 11px; font-weight: 500; color: #64748b; display: flex; align-items: center; gap: 6px; }
.qg-url .muted { color: #94a3b8; }
.qg-sendBtn { margin-left: auto; display: inline-flex; align-items: center; gap: 5px; padding: 5px 11px;
  border-radius: 6px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  background: #f8fafc; border: 1px solid #e8edf3; color: #94a3b8; transition: all .35s ease; }
.qg-sendBtn.armed { background: #fef6e7; border-color: #fde3ad; color: #b45309; }
.qg-sendBtn.glow  { background: #f59e0b; border-color: #d97706; color: white;
  box-shadow: 0 0 0 0 rgba(245,158,11,0.5);
  animation: qg-glow 1.6s ease-in-out infinite; }
@keyframes qg-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.5); } 50% { box-shadow: 0 0 0 6px rgba(245,158,11,0); } }

/* Body */
.qg-body { position: relative; padding: 14px; height: calc(100% - 46px); overflow: hidden;
  display: grid; gap: 12px; grid-template-rows: 1fr;
  transition: grid-template-rows 700ms cubic-bezier(.22,1,.36,1); }
.qg-body.analytics { grid-template-rows: 1fr 0.8fr; }

.qg-top { display: grid; gap: 12px; grid-template-columns: 0.85fr 1.5fr; min-height: 0; }

/* Sources column */
.qg-srcCol { display: flex; flex-direction: column; gap: 6px; position: relative; }
.qg-srcHd  { display: flex; align-items: center; gap: 4px;
  font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; }
.qg-src { position: relative; background: white; border: 1px solid #e8edf3; border-radius: 9px;
  padding: 8px 10px; opacity: 0;
  transition: opacity .4s ease, transform .35s ease, box-shadow .35s ease, background .35s ease, border-color .35s ease; }
.qg-src.in { opacity: 1; animation: qg-pop .4s cubic-bezier(.34,1.56,.64,1) both; }
.qg-src.active { transform: scale(1.02); box-shadow: 0 0 0 2px var(--c, #3666ff)33, 0 8px 16px -6px rgba(15,23,42,0.18); border-color: var(--c, #3666ff); background: rgba(54,102,255,0.04); }
.qg-srcMeta { display: flex; align-items: center; gap: 4px; margin-bottom: 3px; }
.qg-srcMeta .d { width: 6px; height: 6px; border-radius: 50%; }
.qg-srcMeta .id { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; color: #94a3b8; }
.qg-srcMeta .won { margin-left: auto; font-size: 8.5px; font-weight: 700; color: #047857;
  letter-spacing: 0.06em; text-transform: uppercase; }
.qg-srcName { font-size: 10.5px; font-weight: 600; color: #1A1D2E; line-height: 1.2; }
.qg-srcItems { margin-top: 3px; display: flex; flex-wrap: wrap; gap: 3px; }
.qg-srcItems span { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  background: #f8fafc; border: 1px solid #f1f5f9; color: #64748b;
  padding: 1px 5px; border-radius: 3px; }
.qg-srcSub { margin-top: 3px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10.5px; font-weight: 700; color: #475569; }
.qg-srcConnector { position: absolute; right: -8px; top: 50%; transform: translateY(-50%);
  width: 8px; height: 8px; border-radius: 50%; }

.qg-genBtn { margin-top: auto; padding-top: 6px; }
.qg-genBtn button { width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 9px 12px; border-radius: 9px; border: none; font-weight: 700; font-size: 12px;
  background: #f1f5f9; color: #94a3b8; transition: all .35s ease;
  font-family: inherit; cursor: default; }
.qg-genBtn button.arm   { background: #3666ff; color: white;
  box-shadow: 0 6px 16px -4px rgba(54,102,255,0.45), 0 0 0 4px rgba(54,102,255,0.14); }
.qg-genBtn button.done  { background: #1d4ed8; color: white;
  box-shadow: 0 6px 16px -4px rgba(29,78,216,0.4); }
.qg-genBtn .hint { margin-top: 4px; text-align: center; font-size: 9px; color: #94a3b8;
  font-family: 'JetBrains Mono', ui-monospace, monospace; }

/* Quote doc */
.qg-doc { position: relative; background: white; border: 1px solid #e8edf3; border-radius: 12px; overflow: hidden;
  display: flex; flex-direction: column; min-height: 0; }
.qg-docHd { padding: 8px 12px; background: #f8fafc; border-bottom: 1px solid #f1f5f9;
  display: flex; align-items: flex-start; justify-content: space-between; }
.qg-docHdL .lbl { font-size: 9.5px; font-weight: 700; color: #64748b; letter-spacing: 0.08em; text-transform: uppercase; }
.qg-docHdL .sub { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; color: #94a3b8; margin-top: 1px; }
.qg-docHdR { text-align: right; }
.qg-docHdR .lbl { font-size: 9px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; }
.qg-docHdR .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; font-weight: 700; color: #0b1322; }
.qg-docBody { padding: 8px 10px; flex: 1; overflow: hidden; }
.qg-docEmpty { display: grid; place-items: center; height: 100%; color: #cbd5e1; text-align: center; }
.qg-docEmpty .em { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9.5px;
  letter-spacing: 0.08em; text-transform: uppercase; margin-top: 6px; }

.qg-rowHd { display: grid; grid-template-columns: 1.8fr 0.5fr 0.6fr 0.6fr; align-items: center;
  font-size: 8.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8;
  padding: 0 4px 4px; border-bottom: 1px solid #f1f5f9; }
.qg-rowHd > div { text-align: right; }
.qg-rowHd > div:first-child { text-align: left; }

.qg-row { display: grid; grid-template-columns: 1.8fr 0.5fr 0.6fr 0.6fr; align-items: center;
  padding: 4px; border-bottom: 1px solid #f8fafc; font-size: 11px;
  animation: qg-slideR .42s cubic-bezier(.22,1,.36,1) both; }
.qg-row .nm { display: flex; align-items: center; gap: 6px; min-width: 0; color: #475569; }
.qg-row .nm .d { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.qg-row .nm .t { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.qg-row .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums;
  text-align: right; color: #64748b; }
.qg-row .amt { font-weight: 600; color: #1A1D2E; }

.qg-totals { margin-top: 6px; animation: qg-fadeIn .4s ease both; }
.qg-totLine { display: flex; align-items: center; justify-content: space-between;
  font-size: 10.5px; padding: 1px 4px; }
.qg-totLine .lbl { color: #64748b; }
.qg-totLine .lbl.muted { color: #94a3b8; }
.qg-totLine .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums;
  color: #475569; font-weight: 500; }
.qg-totLine.muted .v { color: #94a3b8; }
.qg-totLine.final { margin-top: 4px; padding-top: 6px; border-top: 2px solid rgba(11,19,34,0.18); }
.qg-totLine.final .lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #1A1D2E; }
.qg-totLine.final .v { font-size: 13px; font-weight: 800; color: #0b1322; }

/* Analytics panels */
.qg-anal { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
  animation: qg-fadeIn .4s ease both; min-height: 0; }
.qg-panel { background: white; border: 1px solid #e8edf3; border-radius: 9px; padding: 8px 10px; }
.qg-panelHd { display: flex; align-items: center; gap: 5px; margin-bottom: 6px;
  font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
.qg-panelHd svg { color: #94a3b8; }
.qg-catRow { display: flex; align-items: center; gap: 6px; font-size: 10px; margin-bottom: 3px; }
.qg-catRow .d { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.qg-catRow .nm { color: #475569; width: 70px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.qg-catRow .track { flex: 1; height: 5px; background: #f1f5f9; border-radius: 99px; overflow: hidden; }
.qg-catRow .fill  { height: 100%; border-radius: 99px;
  animation: qg-grow .7s cubic-bezier(.22,1,.36,1) both; }
.qg-catRow .pct { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px;
  font-weight: 600; color: #475569; width: 28px; text-align: right; }

.qg-kpi { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 4px; }
.qg-kpi .lbl { font-size: 10px; color: #64748b; }
.qg-kpi .right { display: flex; align-items: baseline; gap: 6px; }
.qg-kpi .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 700;
  font-size: 11.5px; color: #1A1D2E; }
.qg-kpi .tr { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; color: #94a3b8; }
.qg-kpi .tr.good { color: #00b884; }

/* Watermark */
.qg-watermark { position: absolute; right: 18px; bottom: 12px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px;
  color: #cbd5e1; letter-spacing: 0.12em; pointer-events: none; }

/* Animations */
@keyframes qg-pop    { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
@keyframes qg-fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
@keyframes qg-slideR { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
@keyframes qg-grow   { from { width: 0 !important; } }
`;

/* ============ COMPONENT ============ */
function QuoteGenAnimation({ speed = 1, onPhaseChange } = {}) {
  qgUseEffect(() => {
    if (document.getElementById('qg-style')) return;
    const s = document.createElement('style');
    s.id = 'qg-style';
    s.textContent = QG_STYLE;
    document.head.appendChild(s);
  }, []);

  // 0 idle | 1 sources | 2 cursor approach | 3 click | 4 rows building
  // 5 totals | 6 analytics | 7 send
  const [phase, setPhase]                 = qgUseState(0);
  const [sourcesShown, setSourcesShown]   = qgUseState(0);
  const [rowsBuilt, setRowsBuilt]         = qgUseState(0);
  const [activeSrc, setActiveSrc]         = qgUseState(null);
  const [totals, setTotals]               = qgUseState(null);
  const [showAnalytics, setShowAnalytics] = qgUseState(false);
  const [sendPulse, setSendPulse]         = qgUseState(false);

  const cancelRef = qgUseRef(false);
  qgUseEffect(() => {
    cancelRef.current = false;
    const mul = Math.max(0.3, Number(speed) || 1);
    const sleep = (ms) => new Promise(r => setTimeout(r, ms / mul));

    async function run() {
      while (!cancelRef.current) {
        setPhase(0); setSourcesShown(0); setRowsBuilt(0); setActiveSrc(null);
        setTotals(null); setShowAnalytics(false); setSendPulse(false);
        onPhaseChange?.(0);
        await sleep(600);

        // 1 sources
        setPhase(1); onPhaseChange?.(1);
        for (let i = 1; i <= QG_SOURCES.length; i++) {
          if (cancelRef.current) return;
          setSourcesShown(i);
          await sleep(220);
        }
        await sleep(500);

        // 2 cursor / 3 click
        setPhase(2); onPhaseChange?.(2); await sleep(700);
        setPhase(3); onPhaseChange?.(3); await sleep(380);

        // 4 build rows
        setPhase(4); onPhaseChange?.(4);
        for (let i = 0; i < QG_ROWS.length; i++) {
          if (cancelRef.current) return;
          setActiveSrc(QG_ROWS[i].src);
          await sleep(180);
          setRowsBuilt(i + 1);
          await sleep(220);
        }
        setActiveSrc(null);
        await sleep(400);

        // 5 totals
        setPhase(5); onPhaseChange?.(5);
        const sub = QG_ROWS.reduce((s, r) => s + r.qty * r.price, 0);
        const markup = Math.round(sub * 0.18);
        const freight = 42000;
        setTotals({ sub, markup, freight, total: sub + markup + freight });
        await sleep(1100);

        // 6 analytics
        setShowAnalytics(true);
        setPhase(6);
        onPhaseChange?.(6);
        await sleep(2400);

        // 7 send pulse
        setSendPulse(true);
        setPhase(7);
        onPhaseChange?.(7);
        await sleep(2200);

        await sleep(800);
      }
    }
    run();
    return () => { cancelRef.current = true; };
  }, [speed]);

  const watermark =
      phase <= 1 ? 'BEST · BIDS'
    : phase < 4  ? 'ONE · CLICK'
    : phase === 4 ? 'ROLL · UP'
    : !showAnalytics ? 'TOTALS'
    : sendPulse ? 'SEND' : 'ANALYTICS';

  return (
    <div className="qg-root">
      {/* Chrome */}
      <div className="qg-chrome">
        <div className="qg-dot" style={{ background: '#ff5f56' }}/>
        <div className="qg-dot" style={{ background: '#ffbd2e' }}/>
        <div className="qg-dot" style={{ background: '#27c93f' }}/>
        <div className="qg-url">
          <span style={{ color: '#f59e0b', display: 'inline-flex' }}><QGI.FileText s={11}/></span>
          factwise.io · Customer Quote · <span className="muted">Q-2026-184</span>
        </div>
        <div className={'qg-sendBtn ' + (sendPulse ? 'glow' : phase >= 4 ? 'armed' : '')}>
          <QGI.Send s={10}/>
          Send Quote
        </div>
      </div>

      {/* Body */}
      <div className={'qg-body ' + (showAnalytics ? 'analytics' : '')}>

        {/* TOP: sources + quote doc */}
        <div className="qg-top">

          {/* Sources */}
          <div className="qg-srcCol">
            <div className="qg-srcHd"><QGI.Trophy s={11}/> Best bids from events</div>
            {QG_SOURCES.map((s, i) => {
              const isActive = activeSrc === s.id;
              const shown = i < sourcesShown;
              return (
                <div key={s.id}
                     className={'qg-src ' + (shown ? 'in ' : '') + (isActive ? 'active' : '')}
                     style={{ '--c': s.color, animationDelay: `${i * 60}ms` }}>
                  <div className="qg-srcMeta">
                    <span className="d" style={{ background: s.color }}/>
                    <span className="id">{s.label}</span>
                    <span className="won">Won</span>
                  </div>
                  <div className="qg-srcName">{s.vendor}</div>
                  <div className="qg-srcItems">
                    {s.items.map((it) => <span key={it}>{it}</span>)}
                  </div>
                  <div className="qg-srcSub">₹{s.sub.toLocaleString('en-IN')}</div>
                  {isActive && (
                    <div className="qg-srcConnector"
                         style={{ background: s.color, boxShadow: `0 0 0 4px ${s.color}33` }}/>
                  )}
                </div>
              );
            })}

            {/* Generate button */}
            <div className="qg-genBtn">
              <button className={phase >= 4 ? 'done' : phase >= 2 ? 'arm' : ''}>
                <QGI.Sparkle s={12}/>
                Generate Quote
              </button>
              <div className="hint">One click · all events rolled up</div>
            </div>
          </div>

          {/* Quote document */}
          <div className="qg-doc">
            <div className="qg-docHd">
              <div className="qg-docHdL">
                <div className="lbl">Customer Quote · Q-2026-184</div>
                <div className="sub">Acme Hydraulics · 200 units · INCO-FOB</div>
              </div>
              {totals && (
                <div className="qg-docHdR">
                  <div className="lbl">Total</div>
                  <div className="v">₹{totals.total.toLocaleString('en-IN')}</div>
                </div>
              )}
            </div>
            <div className="qg-docBody">
              {rowsBuilt === 0 ? (
                <div className="qg-docEmpty">
                  <QGI.FileText s={32}/>
                  <div className="em">Quote awaiting generation</div>
                </div>
              ) : (
                <>
                  <div className="qg-rowHd">
                    <div>Item</div>
                    <div>Qty</div>
                    <div>Unit</div>
                    <div>Amount</div>
                  </div>
                  {QG_ROWS.slice(0, rowsBuilt).map((r, i) => (
                    <div key={i} className="qg-row" style={{ animationDelay: `${i * 20}ms` }}>
                      <div className="nm">
                        <span className="d" style={{ background: r.color }}/>
                        <span className="t">{r.name}</span>
                      </div>
                      <div className="v">{r.qty}</div>
                      <div className="v">₹{r.price.toLocaleString('en-IN')}</div>
                      <div className="v amt">₹{(r.qty * r.price).toLocaleString('en-IN')}</div>
                    </div>
                  ))}

                  {totals && (
                    <div className="qg-totals">
                      <div className="qg-totLine"><span className="lbl">Subtotal</span><span className="v">₹{totals.sub.toLocaleString('en-IN')}</span></div>
                      <div className="qg-totLine muted"><span className="lbl muted">Markup · 18%</span><span className="v">₹{totals.markup.toLocaleString('en-IN')}</span></div>
                      <div className="qg-totLine muted"><span className="lbl muted">Freight · landed</span><span className="v">₹{totals.freight.toLocaleString('en-IN')}</span></div>
                      <div className="qg-totLine final"><span className="lbl">Customer Total</span><span className="v">₹{totals.total.toLocaleString('en-IN')}</span></div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM: analytics */}
        {showAnalytics && (
          <div className="qg-anal">
            {/* Categories */}
            <div className="qg-panel">
              <div className="qg-panelHd"><QGI.Pie s={10}/> Spend by category</div>
              {QG_CATS.map((c, i) => (
                <div key={c.name} className="qg-catRow">
                  <span className="d" style={{ background: c.color }}/>
                  <span className="nm">{c.name}</span>
                  <div className="track">
                    <div className="fill" style={{ background: c.color, width: `${c.pct}%`, animationDelay: `${i * 100}ms` }}/>
                  </div>
                  <span className="pct">{c.pct}%</span>
                </div>
              ))}
            </div>

            {/* Volume curve */}
            <div className="qg-panel">
              <div className="qg-panelHd"><QGI.TrendDn s={10}/> Price across volumes</div>
              <VolumeChart/>
            </div>

            {/* Margin guard */}
            <div className="qg-panel">
              <div className="qg-panelHd"><QGI.Alert s={10}/> Margin guard</div>
              <KPI label="Gross margin"  v="22.4%" trend="+1.8 pts"    good/>
              <KPI label="Add-ons stack" v="₹86k"  trend="freight+duty"/>
              <KPI label="Send before"   v="3 days" trend="competitor SLA"/>
            </div>
          </div>
        )}

        <div className="qg-watermark">{watermark}</div>
      </div>
    </div>
  );
}

function KPI({ label, v, trend, good }) {
  return (
    <div className="qg-kpi">
      <span className="lbl">{label}</span>
      <div className="right">
        <span className="v">{v}</span>
        <span className={'tr ' + (good ? 'good' : '')}>{trend}</span>
      </div>
    </div>
  );
}

function VolumeChart() {
  const w = 180, h = 56, pad = 6;
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
            <stop offset="0%" stopColor="#3666ff" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#3666ff" stopOpacity="0"/>
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

window.QuoteGenAnimation = QuoteGenAnimation;

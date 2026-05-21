/* ============================================================
 * RfqAnalyticsAnimation.jsx  (browser-preview version)
 * FactWise — Quote-to-Order · Phase 3: "RFQ Analytics — Landed Cost"
 *
 * Story (loops ~17s):
 *   1. GRID      — 4 vendors × 3 line items populates row-by-row.
 *   2. NAIVE     — quote-only view; cheapest-on-quote (Vendor B) gets a
 *                  "Lowest quote" tag. Looks like the winner.
 *   3. FORMULA   — landed-cost formula chip activates in chrome.
 *   4. LAYERS    — duty → freight → insurance reveal as stacked cells.
 *                  Currency normalizes to INR.
 *   5. FLIP      — Vendor A becomes true winner; trophy + scorecards appear.
 *   6. HOLD      — short pause, then loop.
 *
 * Usage:
 *   <script type="text/babel" src="RfqAnalyticsAnimation.jsx"></script>
 *   ReactDOM.createRoot(el).render(<RfqAnalyticsAnimation speed={1} />)
 *
 * Port to .tsx:
 *   - 'use client', named React imports.
 *   - Replace `window.RfqAnalyticsAnimation = …` with `export default …`.
 * ============================================================ */

const { useState: raUseState, useEffect: raUseEffect, useRef: raUseRef } = React;

/* ============ ICONS ============ */
const RAI = {
  BarChart:  (p) => <svg viewBox="0 0 24 24" width={p.s||12} height={p.s||12} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  Calculator:(p) => <svg viewBox="0 0 24 24" width={p.s||12} height={p.s||12} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="18" x2="16" y2="18"/></svg>,
  Refresh:   (p) => <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>,
  Trophy:    (p) => <svg viewBox="0 0 24 24" width={p.s||11} height={p.s||11} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 4H4v3a3 3 0 0 0 3 3"/><path d="M17 4h3v3a3 3 0 0 1-3 3"/></svg>,
  Check:     (p) => <svg viewBox="0 0 24 24" width={p.s||10} height={p.s||10} fill="none" stroke="currentColor" strokeWidth="3"   strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Sparkle:   (p) => <svg viewBox="0 0 24 24" width={p.s||13} height={p.s||13} fill="currentColor"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"/></svg>,
};

/* ============ DATA ============ */
const RA_LI = [
  { id: 'L1', name: 'Pump Body',      qty: 200 },
  { id: 'L2', name: 'Stator Winding', qty: 200 },
  { id: 'L3', name: 'O-ring Kit',     qty: 200 },
];

// q = quote, d = duty, f = freight, i = insurance — all per-unit INR after FX.
const RA_BIDS = {
  A: { fx: 'INR', flag: 'IN', name: 'Sahasra (Mumbai)',
       L1: { q: 1240, d:   0, f:  60, i: 18 },
       L2: { q:  920, d:   0, f:  45, i: 14 },
       L3: { q:  280, d:   0, f:  20, i:  8 } },
  B: { fx: 'USD', flag: 'CN', name: 'Pearl River Mfg',
       L1: { q: 1180, d: 142, f: 185, i: 42 },
       L2: { q:  880, d: 106, f: 140, i: 34 },
       L3: { q:  260, d:  32, f:  60, i: 14 } },
  C: { fx: 'EUR', flag: 'DE', name: 'EuroDrive GmbH',
       L1: { q: 1290, d:  64, f: 120, i: 28 },
       L2: { q:  960, d:  48, f:  95, i: 22 },
       L3: { q:  295, d:  14, f:  38, i: 10 } },
  D: { fx: 'USD', flag: 'US', name: 'Polaris Industrial',
       L1: { q: 1330, d:   0, f: 150, i: 36 },
       L2: { q:  990, d:   0, f: 118, i: 28 },
       L3: { q:  305, d:   0, f:  48, i: 14 } },
};

const RA_KEYS = ['A', 'B', 'C', 'D'];

const raSumQuote  = (k) => RA_LI.reduce((s, li) => s + RA_BIDS[k][li.id].q, 0);
const raSumLanded = (k) => RA_LI.reduce((s, li) => {
  const c = RA_BIDS[k][li.id]; return s + c.q + c.d + c.f + c.i;
}, 0);
const raInr = (n) => '₹' + n.toLocaleString('en-IN');

/* ============ STYLE (prefix `ra-`) ============ */
const RA_STYLE = `
.ra-root { position: relative; width: 100%; height: 100%; font-family: 'Inter', system-ui, sans-serif;
  color: #1A1D2E; background: white; border-radius: 22px; overflow: hidden;
  border: 1px solid #e9eef5;
  box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 30px 60px -28px rgba(15,23,42,0.18); }

/* Chrome */
.ra-chrome { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: #f9fafc; border-bottom: 1px solid #eef1f6; }
.ra-dot { width: 10px; height: 10px; border-radius: 50%; }
.ra-url { margin-left: 6px; padding: 4px 10px; background: white; border: 1px solid #e8edf3;
  border-radius: 6px; font-size: 11px; font-weight: 500; color: #64748b; display: flex; align-items: center; gap: 6px; }
.ra-url .muted { color: #94a3b8; }
.ra-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }
.ra-formulaChip { display: inline-flex; align-items: center; gap: 5px; padding: 4px 8px;
  border-radius: 6px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  background: #f8fafc; border: 1px solid #e8edf3; color: #94a3b8; transition: all .35s ease; }
.ra-formulaChip.on { background: #f3f0ff; border-color: #ddd5ff; color: #6d28d9;
  box-shadow: 0 4px 12px -4px rgba(123,104,238,0.3); }
.ra-formulaChip .lp { width: 5px; height: 5px; border-radius: 50%; background: #7b68ee;
  animation: ra-pulse 1.4s ease-in-out infinite; }
@keyframes ra-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
.ra-mode { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; color: #94a3b8; }

/* Body */
.ra-body { position: relative; padding: 14px 20px; height: calc(100% - 46px); overflow: hidden;
  display: flex; flex-direction: column; gap: 10px; }

/* Breadcrumb */
.ra-crumb { display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10.5px; color: #94a3b8;
  animation: ra-fadeIn .42s ease both; }
.ra-tok { padding: 2px 6px; border-radius: 4px; font-weight: 600; border: 1px solid transparent;
  background: #f8fafc; color: #cbd5e1; transition: all .3s ease; }
.ra-tok.on.slate  { background: #f1f5f9; color: #334155; border-color: #cbd5e1; }
.ra-tok.on.amber  { background: #fef6e7; color: #b45309; border-color: #fde3ad; }
.ra-tok.on.violet { background: #f3f0ff; color: #6d28d9; border-color: #ddd5ff; }
.ra-tok.on.cyan   { background: #ecfeff; color: #0e7490; border-color: #a5f3fc; }
.ra-crumb .plus { color: #cbd5e1; }
.ra-crumb .norm { margin-left: 4px; font-size: 9.5px; color: #94a3b8; font-family: 'Inter', system-ui, sans-serif; }

/* Grid */
.ra-grid { background: white; border: 1px solid #e8edf3; border-radius: 12px; overflow: hidden; }
.ra-ghead { display: grid; grid-template-columns: 1.4fr repeat(4, 1fr); background: #f8fafc;
  border-bottom: 1px solid #e8edf3;
  font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; }
.ra-ghead > div { padding: 8px; text-align: center; border-left: 1px solid #e8edf3; }
.ra-ghead > div:first-child { text-align: left; border-left: none; }
.ra-ghead .vCol { display: flex; flex-direction: column; gap: 2px; align-items: center; transition: background .35s ease, color .35s ease; }
.ra-ghead .vCol.naive { background: #eff4ff; color: #1e40af; }
.ra-ghead .vCol.true  { background: #ecfdf5; color: #047857; }
.ra-ghead .vCol .vMain { display: flex; align-items: center; gap: 4px; }
.ra-ghead .vCol .vFlag { width: 13px; height: 13px; border-radius: 3px; background: #e2e8f0; color: #64748b;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px;
  display: grid; place-items: center; text-transform: none; font-weight: 600; letter-spacing: 0; }
.ra-ghead .vCol .vFx { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  letter-spacing: 0; text-transform: none; color: #94a3b8; font-weight: 500; }

.ra-grow { display: grid; grid-template-columns: 1.4fr repeat(4, 1fr); border-bottom: 1px solid #f1f5f9; }
.ra-grow.in { animation: ra-rowIn .42s cubic-bezier(.22,1,.36,1) both; }
.ra-liCell { padding: 8px 12px; display: flex; align-items: center; gap: 8px; }
.ra-liCell .leaf { width: 6px; height: 6px; border-radius: 50%; background: #cbd5e1; }
.ra-liCell .liName { font-size: 11px; font-weight: 600; color: #475569; line-height: 1.2; }
.ra-liCell .liQty  { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; color: #94a3b8; }

.ra-bid { padding: 6px 8px; border-left: 1px solid #f1f5f9;
  display: flex; flex-direction: column; gap: 1px; align-items: flex-end;
  transition: background .35s ease; }
.ra-bid.naive { background: #eff4ff66; }
.ra-bid.true  { background: #ecfdf566; }
.ra-bid .line { display: inline-flex; align-items: center; gap: 4px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums;
  animation: ra-pop .38s cubic-bezier(.34,1.56,.64,1) both; }
.ra-bid .line.base { font-size: 11px; font-weight: 600; color: #475569; }
.ra-bid .line.duty { font-size: 9.5px; color: #b45309; }
.ra-bid .line.frt  { font-size: 9.5px; color: #6d28d9; }
.ra-bid .line.ins  { font-size: 9.5px; color: #0e7490; }
.ra-bid .line .lbl { opacity: 0.6; }
.ra-bid .tot { margin-top: 2px; padding-top: 2px; border-top: 1px dashed #cbd5e1;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 700; font-size: 10.5px;
  color: #1A1D2E; width: 100%; text-align: right; }
.ra-bid.naive .tot { color: #1e40af; }
.ra-bid.true  .tot { color: #047857; }

.ra-totalRow { display: grid; grid-template-columns: 1.4fr repeat(4, 1fr); background: #f8fafc;
  animation: ra-fadeIn .4s ease both; }
.ra-totalRow .lbl { padding: 10px 12px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b;
  display: flex; align-items: center; gap: 6px; }
.ra-totalRow .lbl svg { color: #94a3b8; }
.ra-totalCell { padding: 10px 8px; text-align: right; border-left: 1px solid #e8edf3;
  display: flex; flex-direction: column; align-items: center; transition: background .35s ease; }
.ra-totalCell.naive { background: #dbe5ff; }
.ra-totalCell.true  { background: #bbf2db; }
.ra-totalCell .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 700; font-size: 12.5px;
  color: #475569; }
.ra-totalCell.naive .v { color: #1e3a8a; }
.ra-totalCell.true  .v { color: #047857; }
.ra-totalCell .winTag { margin-top: 2px; font-size: 8.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  display: inline-flex; align-items: center; gap: 4px;
  animation: ra-pop .35s cubic-bezier(.34,1.56,.64,1) both; }
.ra-totalCell.naive .winTag { color: #1e40af; }
.ra-totalCell.true  .winTag { color: #047857; }

/* Scorecards */
.ra-scoreGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;
  animation: ra-fadeIn .4s ease both; }
.ra-score { background: white; border: 1px solid #e8edf3; border-radius: 8px; padding: 6px 8px; }
.ra-score.win { background: #ecfdf5; border-color: #6ee7b7; }
.ra-scoreHd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;
  font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
.ra-score.win .ra-scoreHd { color: #047857; }
.ra-scoreBars { display: flex; flex-direction: column; gap: 2px; }
.ra-scoreBar { display: flex; align-items: center; gap: 4px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; color: #94a3b8; }
.ra-scoreBar .lbl { width: 30px; }
.ra-scoreBar .track { flex: 1; height: 3px; background: #f1f5f9; border-radius: 99px; overflow: hidden; }
.ra-scoreBar .fill { height: 100%; border-radius: 99px; transition: width .7s ease; }
.ra-scoreBar .v { font-variant-numeric: tabular-nums; color: #64748b; width: 10px; text-align: right; }

/* Currency callout */
.ra-callout { position: absolute; top: 56px; right: 20px; max-width: 220px;
  background: white; border: 1px solid #e8edf3; border-radius: 12px;
  box-shadow: 0 12px 28px -10px rgba(15,23,42,0.18); padding: 10px 12px;
  animation: ra-pop .42s cubic-bezier(.34,1.56,.64,1) both; }
.ra-callout .hd { display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 700; color: #1A1D2E; margin-bottom: 2px; }
.ra-callout .hd svg { color: #7b68ee; }
.ra-callout .body { font-size: 10px; color: #64748b; line-height: 1.4; }

/* Watermark */
.ra-watermark { position: absolute; right: 18px; bottom: 12px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px;
  color: #cbd5e1; letter-spacing: 0.12em; }

/* Anims */
@keyframes ra-fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ra-rowIn  { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ra-pop    { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
`;

/* ============ COMPONENT ============ */
function RfqAnalyticsAnimation({ speed = 1, onPhaseChange } = {}) {
  raUseEffect(() => {
    if (document.getElementById('ra-style')) return;
    const s = document.createElement('style');
    s.id = 'ra-style';
    s.textContent = RA_STYLE;
    document.head.appendChild(s);
  }, []);

  // 0 idle | 1 grid filling | 2 naive winner | 3 formula activated
  // 4 duty layer | 5 freight | 6 insurance | 7 true cost | 8 winner flip + scorecards
  const [phase, setPhase]         = raUseState(0);
  const [populated, setPopulated] = raUseState(0);
  const [layers, setLayers]       = raUseState(0);    // 0..3
  const [showTrue, setShowTrue]   = raUseState(false);
  const [winner, setWinner]       = raUseState(null); // 'B' (naive) | 'A' (true)

  const cancelRef = raUseRef(false);
  raUseEffect(() => {
    cancelRef.current = false;
    const mul = Math.max(0.3, Number(speed) || 1);
    const sleep = (ms) => new Promise(r => setTimeout(r, ms / mul));

    async function run() {
      while (!cancelRef.current) {
        setPhase(0); setPopulated(0); setLayers(0); setShowTrue(false); setWinner(null);
        onPhaseChange?.(0);
        await sleep(700);

        // 1 rows populate
        setPhase(1); onPhaseChange?.(1);
        for (let i = 1; i <= RA_LI.length; i++) {
          if (cancelRef.current) return;
          setPopulated(i);
          await sleep(280);
        }
        await sleep(400);

        // 2 naive winner
        setPhase(2); setWinner('B'); onPhaseChange?.(2);
        await sleep(1700);

        // 3 formula activates
        setPhase(3); onPhaseChange?.(3);
        await sleep(700);

        // 4..6 layers
        for (let l = 1; l <= 3; l++) {
          if (cancelRef.current) return;
          setLayers(l);
          setPhase(3 + l);
          onPhaseChange?.(3 + l);
          await sleep(700);
        }

        // 7 true cost
        setShowTrue(true);
        setPhase(7);
        onPhaseChange?.(7);
        await sleep(1100);

        // 8 winner flip + scorecards
        setWinner('A');
        setPhase(8);
        onPhaseChange?.(8);
        await sleep(2800);

        await sleep(900);
      }
    }
    run();
    return () => { cancelRef.current = true; };
  }, [speed]);

  const totalAtLayer = (k) => {
    let t = raSumQuote(k);
    if (layers >= 1) t += RA_LI.reduce((s, li) => s + RA_BIDS[k][li.id].d, 0);
    if (layers >= 2) t += RA_LI.reduce((s, li) => s + RA_BIDS[k][li.id].f, 0);
    if (layers >= 3) t += RA_LI.reduce((s, li) => s + RA_BIDS[k][li.id].i, 0);
    return t;
  };

  const watermark =
      phase < 3 ? 'QUOTE · ONLY'
    : !showTrue ? 'APPLY · FORMULA'
    : winner === 'A' ? 'TRUE · WINNER'
    : 'NORMALIZE';

  return (
    <div className="ra-root">
      {/* Chrome */}
      <div className="ra-chrome">
        <div className="ra-dot" style={{ background: '#ff5f56' }}/>
        <div className="ra-dot" style={{ background: '#ffbd2e' }}/>
        <div className="ra-dot" style={{ background: '#27c93f' }}/>
        <div className="ra-url">
          <span style={{ color: '#7b68ee', display: 'inline-flex' }}><RAI.BarChart s={11}/></span>
          factwise.io · Bid Analytics · <span className="muted">EVT-7741</span>
        </div>
        <div className="ra-right">
          <div className={'ra-formulaChip ' + (phase >= 3 ? 'on' : '')}>
            <RAI.Calculator s={11}/>
            Landed Cost
            {phase >= 3 && <span className="lp"/>}
          </div>
          <div className="ra-mode">{showTrue ? 'TRUE · COST · INR' : 'QUOTE · MIXED'}</div>
        </div>
      </div>

      {/* Body */}
      <div className="ra-body">
        {/* Formula breadcrumb */}
        {phase >= 3 && (
          <div className="ra-crumb">
            <span>Landed =</span>
            <span className="ra-tok on slate">Quote</span>
            <span className="plus">+</span>
            <span className={'ra-tok ' + (layers >= 1 ? 'on amber'  : '')}>Duty</span>
            <span className="plus">+</span>
            <span className={'ra-tok ' + (layers >= 2 ? 'on violet' : '')}>Freight</span>
            <span className="plus">+</span>
            <span className={'ra-tok ' + (layers >= 3 ? 'on cyan'   : '')}>Insurance</span>
            <span className="norm">· normalized → INR</span>
          </div>
        )}

        {/* Grid */}
        <div className="ra-grid">
          {/* Header */}
          <div className="ra-ghead">
            <div>Line item</div>
            {RA_KEYS.map(k => {
              const cls = winner === k ? (winner === 'A' ? 'true' : 'naive') : '';
              return (
                <div key={k} className={'vCol ' + cls}>
                  <div className="vMain">
                    <span className="vFlag">{RA_BIDS[k].flag}</span>
                    <span>V·{k}</span>
                  </div>
                  <span className="vFx">{RA_BIDS[k].fx}</span>
                </div>
              );
            })}
          </div>

          {/* Line item rows */}
          {RA_LI.map((li, idx) => {
            const visible = idx < populated;
            if (!visible) return null;
            return (
              <div key={li.id} className="ra-grow in" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="ra-liCell">
                  <span className="leaf"/>
                  <div>
                    <div className="liName">{li.name}</div>
                    <div className="liQty">{li.qty} EA</div>
                  </div>
                </div>
                {RA_KEYS.map(k => {
                  const c = RA_BIDS[k][li.id];
                  const isWin = winner === k;
                  const cls = isWin ? (winner === 'A' ? 'true' : 'naive') : '';
                  const tot = c.q + (layers >= 1 ? c.d : 0) + (layers >= 2 ? c.f : 0) + (layers >= 3 ? c.i : 0);
                  return (
                    <div key={k} className={'ra-bid ' + cls}>
                      <span className="line base">{raInr(c.q)}</span>
                      {layers >= 1 && c.d > 0 && (
                        <span className="line duty"><span className="lbl">+D</span>{raInr(c.d)}</span>
                      )}
                      {layers >= 2 && (
                        <span className="line frt"><span className="lbl">+F</span>{raInr(c.f)}</span>
                      )}
                      {layers >= 3 && (
                        <span className="line ins"><span className="lbl">+I</span>{raInr(c.i)}</span>
                      )}
                      {layers > 0 && <div className="tot">{raInr(tot)}</div>}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Totals row */}
          {populated >= RA_LI.length && (
            <div className="ra-totalRow">
              <div className="lbl">
                <RAI.Refresh s={11}/>
                {showTrue ? 'True landed · qty 200' : 'Quote total · qty 200'}
              </div>
              {RA_KEYS.map(k => {
                const isWin = winner === k;
                const cls = isWin ? (winner === 'A' ? 'true' : 'naive') : '';
                const t = totalAtLayer(k);
                return (
                  <div key={k} className={'ra-totalCell ' + cls}>
                    <div className="v">{raInr(t * 200)}</div>
                    {isWin && (
                      <div className="winTag">
                        {winner === 'A' ? <><RAI.Trophy s={9}/> True winner</> : 'Lowest quote'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Scorecards — appear after flip */}
        {phase >= 8 && (
          <div className="ra-scoreGrid">
            {RA_KEYS.map(k => {
              const isWin = k === 'A';
              return (
                <div key={k} className={'ra-score ' + (isWin ? 'win' : '')}>
                  <div className="ra-scoreHd">
                    <span>V·{k}</span>
                    {isWin && <RAI.Check s={10}/>}
                  </div>
                  <Scorebars vendorKey={k} winner={isWin}/>
                </div>
              );
            })}
          </div>
        )}

        {/* Currency-norm callout — appears at phase 7 (before flip) */}
        {phase === 7 && (
          <div className="ra-callout">
            <div className="hd"><RAI.Sparkle s={12}/> Normalized to INR</div>
            <div className="body">FX, duty, freight, insurance applied per your formula — every cell now true cost.</div>
          </div>
        )}

        <div className="ra-watermark">{watermark}</div>
      </div>
    </div>
  );
}

function Scorebars({ vendorKey, winner }) {
  const DATA = {
    A: { c: 3, n: 0, e: 0 },
    B: { c: 1, n: 2, e: 0 },
    C: { c: 2, n: 1, e: 0 },
    D: { c: 0, n: 2, e: 1 },
  }[vendorKey];
  const total = DATA.c + DATA.n + DATA.e || 1;
  return (
    <div className="ra-scoreBars">
      <Bar label="Comp"  v={DATA.c} total={total} color={winner ? '#00b884' : '#3666ff'}/>
      <Bar label="N-cmp" v={DATA.n} total={total} color="#cbd5e1"/>
      <Bar label="Excl"  v={DATA.e} total={total} color="#fda4af"/>
    </div>
  );
}
function Bar({ label, v, total, color }) {
  return (
    <div className="ra-scoreBar">
      <span className="lbl">{label}</span>
      <div className="track"><div className="fill" style={{ background: color, width: `${(v / total) * 100}%` }}/></div>
      <span className="v">{v}</span>
    </div>
  );
}

window.RfqAnalyticsAnimation = RfqAnalyticsAnimation;

/* ============================================================
 * BomCostAnimation.jsx  (browser-preview version)
 * FactWise — Quote-to-Order · Phase 1: "BOM & Cost Intelligence"
 *
 * Story (loops ~16s):
 *   1. INTAKE   — BOM.xlsx file drops into the editor; parser runs.
 *   2. TREE     — multi-level BOM tree builds row-by-row with ALT badges.
 *   3. COST     — cost-intel columns slide in one at a time:
 *                 Distributor → Past PO → Quote → Contract.
 *   4. SHOULD   — line-level should-cost lights up + rolled-up total.
 *   5. REVISION — v1 → v2 badge pops in the chrome.
 *   6. DIFF     — changed rows show old → new arrows + delta deltas.
 *   7. HOLD     — short pause, then loop.
 *
 * Usage in HTML preview:
 *   <script type="text/babel" src="BomCostAnimation.jsx"></script>
 *   ReactDOM.createRoot(el).render(<BomCostAnimation speed={1} />)
 *
 * Port to Next.js / TypeScript:
 *   1. Rename file to .tsx.
 *   2. Replace `const { useState, useEffect } = React` with named imports
 *      and add `'use client'` at the top.
 *   3. Replace `window.BomCostAnimation = …` at the bottom with
 *      `export default BomCostAnimation`.
 *   4. Add `interface BomCostAnimationProps { speed?: number; onPhaseChange?: (p:number)=>void }`.
 *   5. CSS already scoped under `bc-*` — keep the injection block as-is,
 *      or move BC_STYLE into a .module.css and drop the inject effect.
 * ============================================================ */

const { useState: bcUseState, useEffect: bcUseEffect, useRef: bcUseRef } = React;

/* ============ ICONS (inline SVG, no deps) ============ */
const BCI = {
  FileText: (p) => <svg viewBox="0 0 24 24" width={p.s || 16} height={p.s || 16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="14" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></svg>,
  Layers:   (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Check:    (p) => <svg viewBox="0 0 24 24" width={p.s || 12} height={p.s || 12} fill="none" stroke="currentColor" strokeWidth="3"   strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Box:      (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  GitBranch:(p) => <svg viewBox="0 0 24 24" width={p.s || 12} height={p.s || 12} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  ChevR:    (p) => <svg viewBox="0 0 24 24" width={p.s || 12} height={p.s || 12} fill="none" stroke="currentColor" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>,
  Sparkle:  (p) => <svg viewBox="0 0 24 24" width={p.s || 14} height={p.s || 14} fill="currentColor"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"/><path d="M19 14l.7 1.7L21.5 16.4l-1.8.7L19 19l-.7-1.9-1.7-.7 1.7-.7L19 14z"/></svg>,
};

/* ============ BOM DATA ============ */
const BC_TREE = [
  { id: 'A',   level: 0, name: 'Smart Pump Assembly',  qty: 1, uom: 'EA', hint: 'FG-1041' },
  { id: 'A1',  level: 1, name: 'Motor Housing',        qty: 1, uom: 'EA', hint: 'MH-204',   alt: true },
  { id: 'A2',  level: 1, name: 'Control Board v3',     qty: 1, uom: 'EA', hint: 'PCB-3021' },
  { id: 'A2a', level: 2, name: '— MCU STM32F4',        qty: 1, uom: 'EA', hint: 'IC-MCU-12', alt: true },
  { id: 'A2b', level: 2, name: '— Capacitor 100µF',    qty: 8, uom: 'EA', hint: 'CAP-100u' },
  { id: 'A3',  level: 1, name: 'Stainless Impeller',   qty: 1, uom: 'EA', hint: 'IMP-77' },
];

const BC_COST = {
  A:   { should: 4820, dist: '—',    po:  '—',    quote: '—',    contract: '—'    },
  A1:  { should: 1240, dist: '1310', po: '1180',  quote: '1250', contract: '1190' },
  A2:  { should: 1890, dist: '2040', po: '1820',  quote: '1960', contract: '—'    },
  A2a: { should:  720, dist:  '745', po:  '690',  quote:  '730', contract:  '710' },
  A2b: { should:  120, dist:  '128', po:  '115',  quote:  '124', contract:  '118' },
  A3:  { should:  850, dist:  '910', po:  '820',  quote:  '880', contract:  '—'   },
};

const BC_DIFF = {
  A2:  { from: 'Control Board v2', to: 'Control Board v3', delta: '+₹240' },
  A2b: { from: '6 EA',              to: '8 EA',              delta: '+₹16'  },
  A3:  { from: 'Brass Impeller',    to: 'Stainless Impeller', delta: '+₹140' },
};

/* ============ STYLE (scoped, class prefix `bc-`) ============ */
const BC_STYLE = `
.bc-root { position: relative; width: 100%; height: 100%; font-family: 'Inter', system-ui, sans-serif;
  color: #1A1D2E; background: white; border-radius: 22px; overflow: hidden;
  border: 1px solid #e9eef5;
  box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 30px 60px -28px rgba(15,23,42,0.18); }

/* Chrome bar */
.bc-chrome { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: #f9fafc; border-bottom: 1px solid #eef1f6; }
.bc-dot   { width: 10px; height: 10px; border-radius: 50%; }
.bc-url   { margin-left: 6px; padding: 4px 10px; background: white; border: 1px solid #e8edf3;
  border-radius: 6px; font-size: 11px; font-weight: 500; color: #64748b; display: flex; align-items: center; gap: 6px; }
.bc-url .muted { color: #94a3b8; }
.bc-chromeRight { margin-left: auto; display: flex; align-items: center; gap: 8px; }
.bc-revBadge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px;
  background: #ecfdf5; border: 1px solid #bbf2db; color: #047857;
  border-radius: 6px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  animation: bc-pop .38s cubic-bezier(.34,1.56,.64,1) both; }
.bc-counts { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; color: #94a3b8; }

/* Body */
.bc-body { position: relative; padding: 16px 20px; height: calc(100% - 46px); overflow: hidden; }

/* Drop / parsing overlay */
.bc-drop { position: absolute; inset: 16px 20px;
  border: 2px dashed #c6d4ff; background: rgba(239,244,255,0.45);
  border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; }
.bc-dropFile { position: relative; }
.bc-dropFile .ico { width: 56px; height: 56px; border-radius: 14px; background: white;
  border: 1px solid #e8edf3; box-shadow: 0 8px 18px -6px rgba(15,23,42,0.18);
  display: grid; place-items: center; color: #3666ff; }
.bc-dropFile .ok { position: absolute; right: -4px; bottom: -4px; width: 20px; height: 20px;
  border-radius: 50%; background: #00b884; color: white; display: grid; place-items: center;
  box-shadow: 0 2px 6px rgba(0,184,132,0.4); }
.bc-dropTitle { font-size: 12px; font-weight: 600; color: #334155; }
.bc-dropHint  { font-size: 10px; color: #94a3b8; }
.bc-progress  { width: 160px; height: 4px; background: rgba(54,102,255,0.12); border-radius: 99px; overflow: hidden; }
.bc-progress .fill { height: 100%; width: 30%; background: #3666ff; border-radius: 99px;
  animation: bc-progress 1.1s linear infinite alternate; }
@keyframes bc-progress { from { transform: translateX(-100%); } to { transform: translateX(380%); } }
@keyframes bc-bounce  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.bc-bounce { animation: bc-bounce 1.2s ease-in-out infinite; }

/* Table */
.bc-table { display: grid; gap: 6px; animation: bc-fadeIn 0.4s ease both; }
.bc-thead { display: grid; align-items: center; padding-bottom: 6px; border-bottom: 1px solid #eef1f6;
  font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; color: #94a3b8; text-transform: uppercase;
  grid-template-columns: 1.6fr 0.45fr 0.55fr 0.55fr 0.55fr 0.55fr 0.55fr; }
.bc-thead > div { padding-right: 8px; text-align: right; transition: opacity .35s ease; }
.bc-thead > div:nth-child(1) { padding-left: 4px; text-align: left; }
.bc-thead > div.dim { opacity: 0.3; }

.bc-row { display: grid; align-items: center; font-size: 12px; padding: 6px 4px; border-radius: 6px;
  grid-template-columns: 1.6fr 0.45fr 0.55fr 0.55fr 0.55fr 0.55fr 0.55fr;
  animation: bc-rowIn .42s cubic-bezier(.22,1,.36,1) both; }
.bc-row.parent { background: #eff4ff; font-weight: 600; color: #1e3a8a; }
.bc-row .partCol { display: flex; align-items: center; gap: 6px; min-width: 0; }
.bc-row .partCol .nm { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bc-row .partCol .hint { margin-left: 4px; font-size: 9px; color: #94a3b8; font-family: 'JetBrains Mono', ui-monospace, monospace; }
.bc-row .partCol .leaf { width: 4px; height: 4px; border-radius: 50%; background: #94a3b8; flex-shrink: 0; }
.bc-row .partCol .leafIco { color: #3666ff; flex-shrink: 0; }
.bc-row .qty  { text-align: right; padding-right: 8px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px; color: #64748b; }
.bc-row .cell { text-align: right; padding-right: 8px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px; transition: color .3s ease; }
.bc-row .cell.empty { color: #cbd5e1; }
.bc-row .cell.dim   { color: #e2e8f0; }
.bc-row .cell.normal{ color: #475569; }
.bc-row .cell.should{ color: #3666ff; font-weight: 700; }
.bc-row .cell.last  { padding-right: 4px; }

.bc-altChip { margin-left: 4px; padding: 1px 6px; border-radius: 4px;
  font-size: 8.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  background: #f3f0ff; color: #6d28d9; border: 1px solid #ddd5ff; }
.bc-chgChip { margin-left: 4px; padding: 1px 6px; border-radius: 4px;
  font-size: 8.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  background: #fef6e7; color: #b45309; border: 1px solid #fde3ad;
  animation: bc-slideR .45s cubic-bezier(.22,1,.36,1) both; }

.bc-diffRow { display: grid; align-items: center; padding: 2px 4px;
  grid-template-columns: 1.6fr 0.45fr 2.75fr; font-size: 10.5px;
  animation: bc-slideR .5s cubic-bezier(.22,1,.36,1) both; }
.bc-diffRow .from { display: flex; align-items: center; gap: 6px; }
.bc-diffRow .from .old { color: #94a3b8; text-decoration: line-through; }
.bc-diffRow .from .new { color: #047857; font-weight: 600; }
.bc-diffRow .delta { text-align: right; padding-right: 4px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-weight: 700; color: #b45309; font-size: 10.5px; }

.bc-totalRow { display: flex; align-items: center; justify-content: space-between;
  margin-top: 8px; padding-top: 10px; border-top: 1px dashed #cbd5e1; }
.bc-totalLbl { font-size: 11px; color: #64748b; font-weight: 500; }
.bc-totalLbl .muted { color: #94a3b8; }
.bc-totalRight { display: flex; align-items: center; gap: 8px; }
.bc-totalVal { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 700; color: #1A1D2E; font-size: 14px; }
.bc-totalTag { font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 4px;
  background: #ecfdf5; color: #047857; border: 1px solid #bbf2db; }
.bc-totalTag.diff { background: #fef6e7; color: #b45309; border-color: #fde3ad; }

/* Floating hint when cost columns reveal */
.bc-hint { position: absolute; top: 56px; right: 20px; max-width: 220px;
  background: white; border: 1px solid #e8edf3; border-radius: 12px;
  box-shadow: 0 12px 28px -10px rgba(15,23,42,0.18); padding: 10px 12px;
  display: flex; align-items: center; gap: 10px;
  animation: bc-pop .42s cubic-bezier(.34,1.56,.64,1) both; }
.bc-hintIco { width: 30px; height: 30px; border-radius: 8px; background: #eff4ff; color: #3666ff;
  display: grid; place-items: center; flex-shrink: 0; }
.bc-hintTitle { font-size: 11px; font-weight: 700; color: #1A1D2E; }
.bc-hintBody  { font-size: 10px; color: #64748b; line-height: 1.35; }

/* Watermark */
.bc-watermark { position: absolute; right: 18px; bottom: 12px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px;
  color: #cbd5e1; letter-spacing: 0.12em; }

/* Animations */
@keyframes bc-fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bc-rowIn  { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bc-pop    { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
@keyframes bc-slideR { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: translateX(0); } }
`;

/* ============ COMPONENT ============ */
function BomCostAnimation({ speed = 1, onPhaseChange } = {}) {
  // Inject scoped styles once
  bcUseEffect(() => {
    if (document.getElementById('bc-style')) return;
    const s = document.createElement('style');
    s.id = 'bc-style';
    s.textContent = BC_STYLE;
    document.head.appendChild(s);
  }, []);

  // Phases
  //   0 idle | 1 file dropping | 2 parsing | 3 tree | 4 cost cols | 5 should-cost
  //   6 revision badge | 7 diff arrows | 8 hold
  const [phase, setPhase]         = bcUseState(0);
  const [treeShown, setTreeShown] = bcUseState(0);
  const [costStep, setCostStep]   = bcUseState(0); // 0..4 columns revealed
  const [revBadge, setRevBadge]   = bcUseState(false);
  const [diffShown, setDiffShown] = bcUseState(false);

  const cancelRef = bcUseRef(false);
  bcUseEffect(() => {
    cancelRef.current = false;
    const mul = Math.max(0.3, Number(speed) || 1);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms / mul));

    async function run() {
      while (!cancelRef.current) {
        // Reset
        setPhase(0); setTreeShown(0); setCostStep(0); setRevBadge(false); setDiffShown(false);
        onPhaseChange?.(0);
        await sleep(800);

        // 1 file drops
        setPhase(1); onPhaseChange?.(1);
        await sleep(900);

        // 2 parsing
        setPhase(2); onPhaseChange?.(2);
        await sleep(1100);

        // 3 tree builds
        setPhase(3); onPhaseChange?.(3);
        for (let i = 1; i <= BC_TREE.length; i++) {
          if (cancelRef.current) return;
          setTreeShown(i);
          await sleep(260);
        }
        await sleep(500);

        // 4 cost columns
        setPhase(4); onPhaseChange?.(4);
        for (let i = 1; i <= 4; i++) {
          if (cancelRef.current) return;
          setCostStep(i);
          await sleep(550);
        }
        await sleep(700);

        // 5 should-cost
        setPhase(5); onPhaseChange?.(5);
        await sleep(1400);

        // 6 revision badge
        setRevBadge(true); setPhase(6); onPhaseChange?.(6);
        await sleep(900);

        // 7 diff arrows
        setDiffShown(true); setPhase(7); onPhaseChange?.(7);
        await sleep(2600);

        // 8 hold
        await sleep(1000);
      }
    }
    run();
    return () => { cancelRef.current = true; };
  }, [speed]);

  const showDist     = costStep >= 1;
  const showPo       = costStep >= 2;
  const showQuote    = costStep >= 3;
  const showContract = costStep >= 4;
  const showShould   = phase >= 5;

  const watermark =
    phase < 3 ? 'INTAKE'
    : phase === 3 ? 'TREE'
    : phase < 6 ? 'COST · INTEL'
    : 'REV · DIFF';

  return (
    <div className="bc-root">
      {/* Chrome */}
      <div className="bc-chrome">
        <div className="bc-dot" style={{ background: '#ff5f56' }}/>
        <div className="bc-dot" style={{ background: '#ffbd2e' }}/>
        <div className="bc-dot" style={{ background: '#27c93f' }}/>
        <div className="bc-url">
          <BCI.Layers s={12}/>
          factwise.io · BOM Editor · <span className="muted">FG-1041</span>
        </div>
        <div className="bc-chromeRight">
          {revBadge && (
            <div className="bc-revBadge"><BCI.GitBranch s={11}/> v1 → v2</div>
          )}
          <div className="bc-counts">{phase >= 3 ? '6 lines · 2 alts' : '—'}</div>
        </div>
      </div>

      {/* Body */}
      <div className="bc-body">

        {/* Drop / parse overlay */}
        {phase < 3 && (
          <div className="bc-drop">
            <div className={'bc-dropFile ' + (phase === 1 ? 'bc-bounce' : '')}>
              <div className="ico"><BCI.FileText s={28}/></div>
              <div className="ok"><BCI.Check s={11}/></div>
            </div>
            <div className="bc-dropTitle">
              {phase < 2 ? 'BOM.xlsx — Smart Pump Assembly' : 'Parsing multi-level BOM…'}
            </div>
            {phase === 2 && (
              <div className="bc-progress"><div className="fill"/></div>
            )}
            <div className="bc-dropHint">Drag any BOM. Alternates, sub-assemblies, revisions — all handled.</div>
          </div>
        )}

        {/* Table */}
        {phase >= 3 && (
          <div className="bc-table">
            <div className="bc-thead">
              <div>Part</div>
              <div>Qty</div>
              <div className={showShould   ? '' : 'dim'}>Should</div>
              <div className={showDist     ? '' : 'dim'}>Distrib.</div>
              <div className={showPo       ? '' : 'dim'}>Past PO</div>
              <div className={showQuote    ? '' : 'dim'}>Quote</div>
              <div className={showContract ? '' : 'dim'}>Contract</div>
            </div>

            {BC_TREE.slice(0, treeShown).map((row, i) => {
              const cost = BC_COST[row.id];
              const diff = BC_DIFF[row.id];
              const isParent = row.level === 0;
              return (
                <div key={row.id}>
                  <div
                    className={'bc-row ' + (isParent ? 'parent' : '')}
                    style={{ animationDelay: `${i * 30}ms`, paddingLeft: `${4 + row.level * 16}px` }}
                  >
                    <div className="partCol">
                      {isParent ? <BCI.Box s={13} className="leafIco"/> : <span className="leaf"/>}
                      <span className="nm">{row.name}</span>
                      {row.alt && <span className="bc-altChip">+2 ALT</span>}
                      {diff && diffShown && <span className="bc-chgChip">CHG</span>}
                      <span className="hint">{row.hint}</span>
                    </div>
                    <div className="qty">{row.qty} {row.uom}</div>

                    <BCCell value={cost.should} show={showShould}   highlight={!isParent} prefix="₹" tone="should"/>
                    <BCCell value={cost.dist}   show={showDist}     prefix={cost.dist === '—' ? '' : '₹'}    tone="normal"/>
                    <BCCell value={cost.po}     show={showPo}       prefix={cost.po === '—' ? '' : '₹'}      tone="normal"/>
                    <BCCell value={cost.quote}  show={showQuote}    prefix={cost.quote === '—' ? '' : '₹'}   tone="normal"/>
                    <BCCell value={cost.contract} show={showContract} prefix={cost.contract === '—' ? '' : '₹'} tone="normal" last/>
                  </div>

                  {diff && diffShown && (
                    <div className="bc-diffRow" style={{ paddingLeft: `${20 + row.level * 16}px` }}>
                      <div className="from">
                        <span className="old">{diff.from}</span>
                        <BCI.ChevR s={11}/>
                        <span className="new">{diff.to}</span>
                      </div>
                      <div></div>
                      <div className="delta">{diff.delta}</div>
                    </div>
                  )}
                </div>
              );
            })}

            {showShould && (
              <div className="bc-totalRow">
                <span className="bc-totalLbl">
                  Rolled-up should-cost <span className="muted">· before sourcing</span>
                </span>
                <div className="bc-totalRight">
                  <span className="bc-totalVal">₹4,820</span>
                  <span className={'bc-totalTag ' + (diffShown ? 'diff' : '')}>
                    {diffShown ? '+₹396 vs v1' : 'baseline'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Floating hint while cost cols are revealing */}
        {phase === 4 && costStep < 4 && (
          <div className="bc-hint">
            <div className="bc-hintIco"><BCI.Sparkle s={14}/></div>
            <div>
              <div className="bc-hintTitle">Cost intelligence</div>
              <div className="bc-hintBody">Distributors, past POs, quotes, contracts — auto-matched at line level.</div>
            </div>
          </div>
        )}

        <div className="bc-watermark">{watermark}</div>
      </div>
    </div>
  );
}

function BCCell({ value, show, highlight, prefix = '', last = false, tone = 'normal' }) {
  if (!show) {
    return <div className={'cell empty' + (last ? ' last' : '')}>—</div>;
  }
  const v = String(value);
  if (v === '—') {
    return <div className={'cell dim' + (last ? ' last' : '')}>—</div>;
  }
  const t = (tone === 'should' && highlight) ? 'should' : 'normal';
  return (
    <div className={'cell ' + t + (last ? ' last' : '')}
         style={{ animation: 'bc-pop .38s cubic-bezier(.34,1.56,.64,1) both' }}>
      {prefix}{value}
    </div>
  );
}

/* ============ EXPORT ============ */
window.BomCostAnimation = BomCostAnimation;

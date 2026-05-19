/* ============================================================
 * Phase3SavingsAnimation.jsx — v2 (clean)
 * "Unlock Savings. Compound Intelligence." — Months 6–12
 *
 * Story (loops ~22s):
 *  1. EMPTY      — empty chart for "Steel Bracket M8"
 *  2. HISTORY    — 8 monthly price dots fill in
 *  3. FAIR BAND  — "Fair Price" line draws across with ±5% band
 *  4. NEW QUOTE  — new quote dot lands HIGH ($21.50)
 *  5. INSIGHT    — FactWise flags it, suggests counter
 *  6. WIN        — quote drops to $19.40, saved chip
 *  7. COMPOUND   — 4 category savings rows light up
 *  8. FINALE     — "$1.24M saved YTD"
 *
 * Design language: single blue + green accent, monochrome rows,
 * no chrome, no rail.
 * ============================================================ */

const { useState: useState3, useEffect: useEffect3, useRef: useRef3 } = React;

const P3I = {
  Trend:     (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Check:     (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Alert:     (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Box:       (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
};

const P3_STYLE = `
.p3-root { position: relative; aspect-ratio: 1 / 1.04; max-width: 600px; width: 100%;
  font-family: 'Inter', system-ui, sans-serif; color: #0b1322; }
.p3-dash { position: relative; width: 100%; height: 100%; background: white;
  border-radius: 20px; overflow: hidden; display: flex; flex-direction: column;
  box-shadow: 0 30px 80px -30px rgba(15,23,42,0.22), 0 8px 20px -8px rgba(15,23,42,0.06);
  border: 1px solid rgba(15,23,42,0.05); }

/* ===== TOP BAR ===== */
.p3-bar { display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px 14px;
  border-bottom: 1px solid rgba(15,23,42,0.05); }
.p3-bar-l { display: flex; align-items: center; gap: 10px; min-width: 0; }
.p3-bar-mark { width: 26px; height: 26px; border-radius: 7px;
  background: linear-gradient(135deg, #1F3FB8 0%, #3666ff 100%);
  color: white; display: grid; place-items: center;
  box-shadow: 0 4px 10px rgba(54,102,255,0.3); flex-shrink: 0; }
.p3-bar-crumbs { display: flex; align-items: center; gap: 8px; min-width: 0; }
.p3-bar-mod { font-size: 13.5px; font-weight: 700; color: #0b1322; letter-spacing: -0.01em; }
.p3-bar-sep { color: #cbd5e1; font-size: 11px; }
.p3-bar-page { font-size: 12.5px; font-weight: 500; color: #64748b;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.p3-bar-r { display: flex; align-items: center; gap: 6px;
  font-family: 'JetBrains Mono', monospace; font-size: 10.5px; font-weight: 700;
  color: #00b884; }
.p3-bar-r .dot { width: 6px; height: 6px; border-radius: 50%; background: #00b884;
  box-shadow: 0 0 0 3px rgba(0,184,132,0.18);
  animation: p3-pulse 1.6s ease-in-out infinite; }
@keyframes p3-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }

/* ===== STEP BARS ===== */
.p3-steps { display: flex; align-items: center; gap: 5px;
  padding: 12px 20px 0; }
.p3-steps .pd { height: 4px; background: #e2e8f0; border-radius: 99px;
  flex: 1; transition: all .35s ease; }
.p3-steps .pd.on { background: #3666ff; }
.p3-steps .pd.done { background: #cbd5e1; }
.p3-stepLbl { padding: 8px 20px 0; display: flex; align-items: baseline; gap: 8px; }
.p3-stepLbl .t { font-size: 12.5px; font-weight: 700; color: #0b1322; letter-spacing: -0.005em; }
.p3-stepLbl .s { font-family: 'JetBrains Mono', monospace; font-size: 10px;
  font-weight: 600; color: #94a3b8; letter-spacing: 0.06em; }

/* ===== STAGE ===== */
.p3-stage { flex: 1; margin: 12px 18px 18px;
  background: #fbfcfe; border: 1px solid rgba(15,23,42,0.06);
  border-radius: 14px; padding: 14px;
  position: relative; overflow: hidden; min-height: 0; }

.p3-cap { position: absolute; left: 16px; bottom: 14px; right: 16px;
  font-size: 11px; color: #64748b; line-height: 1.4;
  display: flex; align-items: center; gap: 8px;
  transition: opacity .35s ease; opacity: 0; pointer-events: none; }
.p3-cap.on { opacity: 1; }
.p3-cap .cd { width: 5px; height: 5px; border-radius: 50%;
  background: #3666ff; flex-shrink: 0;
  animation: p3-pulse 1.6s ease-in-out infinite; }

.p3-scene { position: absolute; inset: 14px; bottom: 38px;
  opacity: 0; transition: opacity .4s ease; pointer-events: none; }
.p3-scene.on { opacity: 1; }

/* ===== CHART (Scenes 1-6) ===== */
.p3-chart { position: absolute; inset: 0;
  background: white; border: 1px solid rgba(15,23,42,0.05); border-radius: 12px;
  padding: 14px 16px 10px; display: flex; flex-direction: column; gap: 6px;
  overflow: hidden; }
.p3-chartHd { display: flex; justify-content: space-between; align-items: flex-end; }
.p3-chartHd .sku { font-family: 'JetBrains Mono', monospace; font-size: 9px;
  font-weight: 700; color: #3666ff; letter-spacing: 0.06em; }
.p3-chartHd .nm { font-size: 12.5px; font-weight: 800; color: #0b1322; margin-top: 3px;
  letter-spacing: -0.01em; }
.p3-chartHd .meta { font-size: 10px; color: #94a3b8; margin-top: 2px; }
.p3-chartHd .right { text-align: right; }
.p3-chartHd .right .v { font-size: 17px; font-weight: 800; font-variant-numeric: tabular-nums;
  color: #00b884; line-height: 1; letter-spacing: -0.02em; }
.p3-chartHd .right .l { font-size: 8.5px; font-weight: 700; color: #94a3b8;
  letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; }

.p3-chartCanvas { position: relative; flex: 1; }
.p3-chartCanvas svg { width: 100%; height: 100%; overflow: visible; }
.p3-gridLine { stroke: #eef2f7; stroke-width: 0.5; }
.p3-axisLbl { font-family: 'JetBrains Mono', monospace; font-size: 6.5px;
  font-weight: 700; fill: #cbd5e1; }
.p3-trendLine { fill: none; stroke: #cbd5e1; stroke-width: 1.2;
  stroke-linecap: round; stroke-dasharray: 1000; stroke-dashoffset: 1000;
  transition: stroke-dashoffset 1.2s ease; }
.p3-trendLine.in { stroke-dashoffset: 0; }
.p3-trendArea { fill: rgba(54,102,255,0.06); opacity: 0; transition: opacity .8s ease; }
.p3-trendArea.in { opacity: 1; }

.p3-fairBand { fill: rgba(0,184,132,0.06); opacity: 0;
  transition: opacity .6s ease; }
.p3-fairBand.in { opacity: 1; }
.p3-fairLine { stroke: #00b884; stroke-width: 1.2; stroke-dasharray: 4 3;
  stroke-dashoffset: 100; opacity: 0;
  transition: stroke-dashoffset .6s ease, opacity .4s ease; }
.p3-fairLine.in { stroke-dashoffset: 0; opacity: 1; }
.p3-fairLbl { font-size: 7px; font-weight: 800; fill: #00b884;
  font-family: 'JetBrains Mono', monospace;
  opacity: 0; transition: opacity .4s ease; letter-spacing: 0.04em; }
.p3-fairLbl.in { opacity: 1; }

.p3-dot { transform-origin: center; transform-box: fill-box;
  transform: scale(0); opacity: 0;
  transition: transform .4s cubic-bezier(.34,1.56,.64,1), opacity .3s ease,
    cx .9s cubic-bezier(.22,.61,.36,1), cy .9s cubic-bezier(.22,.61,.36,1),
    fill .5s ease, stroke .5s ease; }
.p3-dot.in { transform: scale(1); opacity: 1; }
.p3-dot.flash { animation: p3-flash 1.4s ease-in-out infinite; }
@keyframes p3-flash {
  0%, 100% { filter: drop-shadow(0 0 0 rgba(239,68,68,0)); }
  50% { filter: drop-shadow(0 0 5px rgba(239,68,68,0.7)); }
}

.p3-insight { position: absolute; left: 14px; top: 48px;
  width: 192px; padding: 10px 12px;
  background: white; border: 1px solid #fcd34d;
  border-left: 3px solid #f59e0b;
  border-radius: 8px;
  box-shadow: 0 10px 18px -8px rgba(245,158,11,0.2);
  opacity: 0; transform: translateX(-8px);
  transition: all .5s cubic-bezier(.22,.61,.36,1); z-index: 4; }
.p3-insight.in { opacity: 1; transform: translateX(0); }
.p3-insight .ih { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
.p3-insight .ih .ai { width: 20px; height: 20px; border-radius: 6px;
  background: rgba(245,158,11,0.15); color: #d97706;
  display: grid; place-items: center; }
.p3-insight .ih .at { font-size: 9.5px; font-weight: 800; color: #92400e; letter-spacing: 0.06em; }
.p3-insight .ib { font-size: 10.5px; color: #475569; line-height: 1.4; }
.p3-insight .ib b { color: #0b1322; font-weight: 700; }
.p3-insight .ic { margin-top: 7px; padding: 6px 9px;
  background: #fef3c7; border-radius: 5px;
  font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; color: #92400e;
  letter-spacing: 0.02em; }
.p3-savedChip { position: absolute; right: 14px; bottom: 14px;
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px;
  background: #00b884;
  color: white; border-radius: 999px;
  font-size: 11px; font-weight: 800;
  letter-spacing: 0.02em;
  box-shadow: 0 6px 14px -6px rgba(0,184,132,0.4);
  opacity: 0; transform: scale(0.85);
  transition: all .45s cubic-bezier(.34,1.56,.64,1); z-index: 5; }
.p3-savedChip.in { opacity: 1; transform: scale(1); }

/* ===== SCENE 7 — COMPOUND ===== */
.p3-compound { position: absolute; inset: 0;
  display: flex; flex-direction: column; gap: 9px; }
.p3-compHead { padding: 0 2px;
  display: flex; align-items: center; justify-content: space-between; }
.p3-compHead .tt { font-size: 11px; font-weight: 700; color: #475569; }
.p3-compHead .tg { font-family: 'JetBrains Mono', monospace; font-size: 10px;
  font-weight: 700; color: #00b884;
  letter-spacing: 0.06em; }
.p3-compRow { display: grid; grid-template-columns: 30px 1fr 100px 90px;
  gap: 10px; align-items: center;
  padding: 10px 14px; background: white;
  border: 1px solid rgba(15,23,42,0.06); border-radius: 10px;
  opacity: 0; transform: translateY(6px);
  transition: all .45s cubic-bezier(.22,.61,.36,1); }
.p3-compRow.in { opacity: 1; transform: translateY(0); }
.p3-compRow.done { border-color: rgba(0,184,132,0.3); background: #f6fcf9; }
.p3-compIc { width: 28px; height: 28px; border-radius: 7px;
  display: grid; place-items: center;
  background: rgba(54,102,255,0.1); color: #3666ff; }
.p3-compRow.done .p3-compIc { background: rgba(0,184,132,0.12); color: #00b884; }
.p3-compNm { font-size: 11.5px; font-weight: 700; color: #0b1322; letter-spacing: -0.005em; }
.p3-compSub { font-size: 9.5px; color: #94a3b8; margin-top: 2px;
  font-family: 'JetBrains Mono', monospace; letter-spacing: 0.02em; }
.p3-compBar { height: 5px; background: #eef2f7; border-radius: 99px; overflow: hidden; }
.p3-compBar::after { content: ""; display: block; height: 100%; width: 0;
  background: #00b884;
  border-radius: 99px; transition: width .8s cubic-bezier(.22,.61,.36,1); }
.p3-compRow.done .p3-compBar::after { width: var(--p, 0%); }
.p3-compDelta { text-align: right; }
.p3-compDelta .v { font-family: 'JetBrains Mono', monospace; font-size: 13px;
  font-weight: 800; color: #94a3b8; font-variant-numeric: tabular-nums; transition: color .35s ease; }
.p3-compRow.done .p3-compDelta .v { color: #00b884; }
.p3-compDelta .l { font-size: 8px; font-weight: 700; color: #94a3b8;
  letter-spacing: 0.06em; text-transform: uppercase; margin-top: 3px; }

/* ===== SCENE 8 — FINALE ===== */
.p3-finale { position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 14px; padding: 0 14px; }
.p3-fbig { font-size: 52px; font-weight: 800; letter-spacing: -0.045em;
  color: #00b884;
  line-height: 1; font-variant-numeric: tabular-nums; }
.p3-fsub { font-size: 11px; font-weight: 700; color: #94a3b8;
  letter-spacing: 0.1em; text-transform: uppercase; }
.p3-marginCard { display: flex; gap: 20px; background: white;
  border: 1px solid rgba(15,23,42,0.08); border-radius: 12px;
  padding: 12px 22px; margin-top: 4px; }
.p3-marginCard .mc { text-align: center; }
.p3-marginCard .mc .v { font-size: 20px; font-weight: 800; font-variant-numeric: tabular-nums; letter-spacing: -0.025em; line-height: 1; color: #0b1322; }
.p3-marginCard .mc .l { font-size: 9px; font-weight: 700; color: #94a3b8;
  letter-spacing: 0.1em; text-transform: uppercase; margin-top: 5px; }
.p3-marginCard .sep { width: 1px; background: rgba(15,23,42,0.08); }
.p3-fchips { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; justify-content: center; }
.p3-fchip { display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px;
  background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 999px;
  font-size: 10px; font-weight: 600; color: #475569;
  opacity: 0; transform: translateY(4px); transition: all .4s ease; }
.p3-fchip.in { opacity: 1; transform: translateY(0); }
.p3-fchip .ic { color: #00b884; }
`;

/* ============ HOOKS ============ */
function useCountP3(target, active, dur = 1000) {
  const [v, setV] = useState3(0);
  const fromRef = useRef3(0);
  useEffect3(() => {
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
const HISTORY = [
  { m: "Jan", p: 19.40 },
  { m: "Feb", p: 19.10 },
  { m: "Mar", p: 18.90 },
  { m: "Apr", p: 19.30 },
  { m: "May", p: 18.80 },
  { m: "Jun", p: 19.20 },
  { m: "Jul", p: 19.00 },
  { m: "Aug", p: 19.20 },
];
const FAIR_PRICE = 19.10;
const FAIR_BAND_PCT = 0.05;
const NEW_QUOTE_HIGH = 21.50;
const NEW_QUOTE_LOW  = 19.40;

const CHART_X0 = 8,  CHART_X1 = 95;
const CHART_Y0 = 6,  CHART_Y1 = 84;
const Y_MIN = 18.0, Y_MAX = 22.5;
function xAt(i, total) { return CHART_X0 + (i / (total)) * (CHART_X1 - CHART_X0); }
function yAt(p) {
  const t = (p - Y_MIN) / (Y_MAX - Y_MIN);
  return CHART_Y1 - t * (CHART_Y1 - CHART_Y0);
}

const CATEGORIES = [
  { name: "Steel & Fasteners",      sku: "168 SKUs", saved: 412000, p: 92 },
  { name: "Resins & Polymers",      sku: "94 SKUs",  saved: 308000, p: 76 },
  { name: "Cable & Harness",        sku: "211 SKUs", saved: 286000, p: 70 },
  { name: "Bearings & Mechanical",  sku: "57 SKUs",  saved: 234000, p: 58 },
];

/* ============ MAIN COMPONENT ============ */
function Phase3SavingsAnimation({ speed = 1 } = {}) {
  useEffect3(() => {
    if (document.getElementById("p3-style")) return;
    const s = document.createElement("style");
    s.id = "p3-style"; s.textContent = P3_STYLE;
    document.head.appendChild(s);
  }, []);

  const [phase, setPhase] = useState3(0);
  const [histN, setHistN] = useState3(0);
  const [trendLine, setTrendLine] = useState3(false);
  const [fairIn, setFairIn] = useState3(false);
  const [newQuoteIn, setNewQuoteIn] = useState3(false);
  const [insightIn, setInsightIn] = useState3(false);
  const [quoteDown, setQuoteDown] = useState3(false);
  const [savedChipIn, setSavedChipIn] = useState3(false);
  const [compN, setCompN] = useState3(0);
  const [compDone, setCompDone] = useState3(0);
  const [chipsN, setChipsN] = useState3(0);

  const cancelRef = useRef3(false);
  const speedMul = Math.max(0.3, Number(speed) || 1);

  useEffect3(() => {
    cancelRef.current = false;
    const sleep = (ms) => new Promise(r => setTimeout(r, ms / speedMul));

    async function loop() {
      while (!cancelRef.current) {
        setPhase(0); setHistN(0); setTrendLine(false); setFairIn(false);
        setNewQuoteIn(false); setInsightIn(false); setQuoteDown(false);
        setSavedChipIn(false); setCompN(0); setCompDone(0); setChipsN(0);
        await sleep(400);

        setPhase(1);
        await sleep(900);

        setPhase(2);
        for (let i = 1; i <= HISTORY.length; i++) {
          if (cancelRef.current) return;
          setHistN(i);
          await sleep(180);
        }
        await sleep(200);
        setTrendLine(true);
        await sleep(900);

        setPhase(3);
        setFairIn(true);
        await sleep(1500);

        setPhase(4);
        setNewQuoteIn(true);
        await sleep(1500);

        setPhase(5);
        setInsightIn(true);
        await sleep(2000);

        setPhase(6);
        setQuoteDown(true);
        await sleep(700);
        setSavedChipIn(true);
        await sleep(1500);

        setPhase(7);
        await sleep(300);
        for (let i = 1; i <= CATEGORIES.length; i++) {
          if (cancelRef.current) return;
          setCompN(i);
          await sleep(180);
        }
        await sleep(220);
        for (let i = 1; i <= CATEGORIES.length; i++) {
          if (cancelRef.current) return;
          setCompDone(i);
          await sleep(280);
        }
        await sleep(800);

        setPhase(8);
        for (let i = 1; i <= 3; i++) {
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
    1: "Item-level price history — every SKU, every vendor.",
    2: "8 months of paid prices, stored and benchmarked.",
    3: "Fair market price emerges. ±5% confidence band.",
    4: "New quote arrives. 11.5% above your fair price.",
    5: "FactWise flags it. Counter-offer suggested.",
    6: "Negotiation won. $2,520 saved on one line.",
    7: "Compound it across every category, every quarter.",
    8: "$1.24M saved YTD. Margins up. Intelligence wins.",
  };

  const stageTitle =
    phase <= 1 ? "Price Intelligence" :
    phase === 2 ? "Price History" :
    phase === 3 ? "Fair Market Benchmark" :
    phase === 4 ? "New Quote · Anomaly" :
    phase === 5 ? "AI Insight" :
    phase === 6 ? "Negotiation Won" :
    phase === 7 ? "Savings · By Category" :
    phase === 8 ? "Compounding" : "";

  const stageTag =
    phase >= 2 && phase <= 6 ? "STL-0421 · 8 MONTHS" :
    phase === 7 ? "YTD · ALL PLANTS" :
    phase === 8 ? "FY24" : "";

  const newQuoteY = quoteDown ? yAt(NEW_QUOTE_LOW) : yAt(NEW_QUOTE_HIGH);
  const newQuoteFill = quoteDown ? "#00b884" : "#ef4444";
  const newQuoteX = xAt(HISTORY.length + 0.6, HISTORY.length + 1);

  return (
    <div className="p3-root">
      <div className="p3-dash">
        {/* TOP BAR */}
        <div className="p3-bar">
          <div className="p3-bar-l">
            <div className="p3-bar-mark"><P3I.Trend s={14}/></div>
            <div className="p3-bar-crumbs">
              <span className="p3-bar-mod">Spend Intelligence</span>
              <span className="p3-bar-sep">/</span>
              <span className="p3-bar-page">FY24 · Direct Materials</span>
            </div>
          </div>
          <div className="p3-bar-r">
            <span className="dot"/>
            COMPOUNDING
          </div>
        </div>

        {/* STEP BARS */}
        <div className="p3-steps">
          {[1,2,3,4,5,6,7,8].map(i =>
            <div key={i} className={"pd " + (phase === i ? "on" : phase > i ? "done" : "")}/>
          )}
        </div>
        <div className="p3-stepLbl">
          <span className="t">{stageTitle}</span>
          {stageTag && <span className="s">· {stageTag}</span>}
        </div>

        {/* STAGE */}
        <div className="p3-stage">
          {/* SCENES 1-6 — CHART */}
          <div className={"p3-scene " + (phase >= 1 && phase <= 6 ? "on" : "")}>
            <div className="p3-chart">
              <div className="p3-chartHd">
                <div>
                  <div className="sku">STL-0421</div>
                  <div className="nm">Steel Bracket M8 · 304</div>
                  <div className="meta">Direct material · 1,200 units / month</div>
                </div>
                <div className="right">
                  <div className="v">${FAIR_PRICE.toFixed(2)}</div>
                  <div className="l">Fair / unit</div>
                </div>
              </div>
              <div className="p3-chartCanvas">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[20, 40, 60, 80].map(y => (
                    <line key={y} className="p3-gridLine" x1={CHART_X0} y1={y} x2={CHART_X1} y2={y}/>
                  ))}
                  {[18, 19, 20, 21, 22].map(v => (
                    <text key={v} className="p3-axisLbl"
                          x={CHART_X0 - 1} y={yAt(v) + 1.5} textAnchor="end">
                      ${v}
                    </text>
                  ))}
                  {HISTORY.map((h, i) => (
                    <text key={h.m} className="p3-axisLbl"
                          x={xAt(i, HISTORY.length - 1)} y={CHART_Y1 + 6} textAnchor="middle">
                      {h.m}
                    </text>
                  ))}
                  <path className={"p3-trendArea " + (trendLine ? "in" : "")}
                        d={
                          "M " + xAt(0, HISTORY.length - 1) + " " + yAt(HISTORY[0].p) +
                          HISTORY.slice(1).map((h, i) => " L " + xAt(i+1, HISTORY.length - 1) + " " + yAt(h.p)).join("") +
                          " L " + xAt(HISTORY.length-1, HISTORY.length - 1) + " " + CHART_Y1 +
                          " L " + xAt(0, HISTORY.length - 1) + " " + CHART_Y1 + " Z"
                        }/>
                  <path className={"p3-trendLine " + (trendLine ? "in" : "")}
                        d={
                          "M " + xAt(0, HISTORY.length - 1) + " " + yAt(HISTORY[0].p) +
                          HISTORY.slice(1).map((h, i) => " L " + xAt(i+1, HISTORY.length - 1) + " " + yAt(h.p)).join("")
                        }
                        pathLength={1000}/>
                  <rect className={"p3-fairBand " + (fairIn ? "in" : "")}
                        x={CHART_X0}
                        y={yAt(FAIR_PRICE * (1 + FAIR_BAND_PCT))}
                        width={CHART_X1 - CHART_X0}
                        height={yAt(FAIR_PRICE * (1 - FAIR_BAND_PCT)) - yAt(FAIR_PRICE * (1 + FAIR_BAND_PCT))}/>
                  <line className={"p3-fairLine " + (fairIn ? "in" : "")}
                        x1={CHART_X0} y1={yAt(FAIR_PRICE)}
                        x2={CHART_X1} y2={yAt(FAIR_PRICE)}
                        pathLength={100}/>
                  <text className={"p3-fairLbl " + (fairIn ? "in" : "")}
                        x={CHART_X1 - 1} y={yAt(FAIR_PRICE) - 1.5} textAnchor="end">
                    FAIR ${FAIR_PRICE.toFixed(2)}
                  </text>
                  {HISTORY.map((h, i) => (
                    <circle key={h.m} className={"p3-dot " + (histN > i ? "in" : "")}
                            cx={xAt(i, HISTORY.length - 1)} cy={yAt(h.p)} r={1.6}
                            fill="#3666ff" stroke="white" strokeWidth={0.6}/>
                  ))}
                  <circle className={"p3-dot " + (newQuoteIn ? "in " : "") + (newQuoteIn && !quoteDown ? "flash" : "")}
                          cx={newQuoteX}
                          cy={newQuoteY}
                          r={2.4}
                          fill={newQuoteFill} stroke="white" strokeWidth={0.8}/>
                  {newQuoteIn && (
                    <text x={newQuoteX} y={newQuoteY - 3} textAnchor="middle"
                          fontSize="6.5" fontWeight="800"
                          fill={quoteDown ? "#00b884" : "#ef4444"}
                          fontFamily="JetBrains Mono, monospace">
                      ${(quoteDown ? NEW_QUOTE_LOW : NEW_QUOTE_HIGH).toFixed(2)}
                    </text>
                  )}
                </svg>

                <div className={"p3-insight " + (insightIn && !quoteDown ? "in" : "")}>
                  <div className="ih">
                    <div className="ai"><P3I.Alert s={11}/></div>
                    <div className="at">OVERPRICED</div>
                  </div>
                  <div className="ib">
                    Quote <b>${NEW_QUOTE_HIGH}</b> is <b>+11.5%</b> above fair price.
                    Counter at <b>${NEW_QUOTE_LOW}</b>?
                  </div>
                  <div className="ic">→ Suggest ${NEW_QUOTE_LOW} · save $2,520</div>
                </div>

                <div className={"p3-savedChip " + (savedChipIn ? "in" : "")}>
                  <P3I.Check s={12}/> SAVED $2,520
                </div>
              </div>
            </div>
          </div>

          {/* SCENE 7 — COMPOUND */}
          <div className={"p3-scene " + (phase === 7 ? "on" : "")}>
            <div className="p3-compound">
              <div className="p3-compHead">
                <div className="tt">Same play. Every category.</div>
                <div className="tg">YTD</div>
              </div>
              {CATEGORIES.map((c, i) => {
                const shown = compN > i;
                const done  = compDone > i;
                return (
                  <div key={c.name}
                       className={"p3-compRow " + (shown ? "in " : "") + (done ? "done" : "")}
                       style={{"--p": `${c.p}%`}}>
                    <div className="p3-compIc"><P3I.Box s={14}/></div>
                    <div>
                      <div className="p3-compNm">{c.name}</div>
                      <div className="p3-compSub">{c.sku}</div>
                    </div>
                    <div className="p3-compBar"/>
                    <div className="p3-compDelta">
                      <div className="v">−${(c.saved/1000).toFixed(0)}k</div>
                      <div className="l">{done ? "SAVED" : "OPTIMIZING"}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SCENE 8 — FINALE */}
          <div className={"p3-scene " + (phase === 8 ? "on" : "")}>
            <div className="p3-finale">
              <div className="p3-fbig">$1.24M</div>
              <div className="p3-fsub">Saved · FY24 YTD</div>
              <div className="p3-marginCard">
                <div className="mc"><div className="v">+3.4 pts</div><div className="l">Gross Margin</div></div>
                <div className="sep"/>
                <div className="mc"><div className="v">−8.2%</div><div className="l">Unit Cost</div></div>
                <div className="sep"/>
                <div className="mc"><div className="v">38</div><div className="l">Wins / Year</div></div>
              </div>
              <div className="p3-fchips">
                <div className={"p3-fchip " + (chipsN >= 1 ? "in" : "")}><span className="ic"><P3I.Check s={11}/></span>Fair-price benchmarks</div>
                <div className={"p3-fchip " + (chipsN >= 2 ? "in" : "")}><span className="ic"><P3I.Check s={11}/></span>Negotiation prompts</div>
                <div className={"p3-fchip " + (chipsN >= 3 ? "in" : "")}><span className="ic"><P3I.Check s={11}/></span>Compounding savings</div>
              </div>
            </div>
          </div>

          <div className={"p3-cap " + (captions[phase] ? "on" : "")}>
            <span className="cd"/>
            {captions[phase] || ""}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Phase3SavingsAnimation = Phase3SavingsAnimation;

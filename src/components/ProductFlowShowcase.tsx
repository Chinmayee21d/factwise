'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import './ProductFlowShowcase.css';

/* ─── Node layout ───────────────────────────────────────────────────
   Each node is centred at (x%, y%) of the canvas.
   HX / HY are the half-dimensions in SVG viewBox units (0-100).
   CSS: node width  = 2*HX% of canvas  → must equal  width: 16%
        node height ≈ 2*HY% of canvas  → must equal  min-height: 10%
   With canvas aspect-ratio 4/3 this is always exact.               */
const HX = 8;   // half-width  (node CSS width  = 16%)
const HY = 5;   // half-height (node CSS height ≈ 10%)

interface NodeDef { id: string; label: string; x: number; y: number }

const NODES: NodeDef[] = [
  { id: 'item-cat',   label: 'Item Catalogue',              x: 6,  y: 8  },
  { id: 'proj-crea',  label: 'Project Creation',            x: 6,  y: 22 },
  { id: 'req',        label: 'Requisition',                 x: 6,  y: 36 },
  { id: 'item-ana',   label: 'Item Analytics',              x: 6,  y: 50 },
  { id: 'rfq',        label: 'RfQ Creation + Approvals',   x: 28, y: 36 },
  { id: 'neg',        label: 'Negotiations',                x: 48, y: 36 },
  { id: 'bid-ana',    label: 'Bid Analysis & Shortlisting', x: 68, y: 36 },
  { id: 'quote-calc', label: 'Quote Calculator',            x: 68, y: 55 },
  // Contracts: standalone reference node — no connections
  { id: 'contracts',  label: 'Contracts',                   x: 88, y: 14 },
  { id: 'po-crea',    label: 'PO Creation',                 x: 88, y: 30 },
  { id: 'inv-crea',   label: 'Seller Invoice Creation',     x: 88, y: 46 },
  { id: 'gr',         label: 'Goods Receipt',               x: 88, y: 62 },
  { id: 'qc',         label: 'Quality Check',               x: 88, y: 78 },
  { id: 'pay',        label: 'Payments',                    x: 88, y: 93 },
];

/* Paths start/end at the node edge.  With refX="10" the marker tip
   lands flush on the edge — no overshoot into the node box.         */
const E = (cx: number) => cx + HX;   // right edge
const W = (cx: number) => cx - HX;   // left  edge
const S = (cy: number) => cy + HY;   // bottom edge
const N = (cy: number) => cy - HY;   // top   edge

const CONN_PATHS: Record<string, string> = {
  // Left column → RfQ (gather vertical at x = 17)
  'item-cat:rfq':       `M ${E(6)} 8  L 17 8  L 17 36 L ${W(28)} 36`,
  'proj-crea:rfq':      `M ${E(6)} 22 L 17 22 L 17 36 L ${W(28)} 36`,
  'req:rfq':            `M ${E(6)} 36 L ${W(28)} 36`,
  'item-ana:rfq':       `M ${E(6)} 50 L 17 50 L 17 36 L ${W(28)} 36`,
  // Centre horizontal chain
  'rfq:neg':            `M ${E(28)} 36 L ${W(48)} 36`,
  'neg:bid-ana':        `M ${E(48)} 36 L ${W(68)} 36`,
  // bid-ana branches
  'bid-ana:po-crea':    `M ${E(68)} 36 L 78 36 L 78 30 L ${W(88)} 30`,
  'bid-ana:quote-calc': `M 68 ${S(36)} L 68 ${N(55)}`,
  // Right column — main vertical chain (no arrow from Contracts)
  'po-crea:inv-crea':   `M 88 ${S(30)} L 88 ${N(46)}`,
  'inv-crea:gr':        `M 88 ${S(46)} L 88 ${N(62)}`,
  'gr:qc':              `M 88 ${S(62)} L 88 ${N(78)}`,
  'qc:pay':             `M 88 ${S(78)} L 88 ${N(93)}`,
  // Left-side bypass paths for Invoice to Pay alternate routes
  'inv-crea:qc':  `M ${W(88)} 46 L 76.5 46 L 76.5 78 L ${W(88)} 78`,
  'gr:pay':       `M ${W(88)} 62 L 74   62 L 74   93 L ${W(88)} 93`,
};

const BYPASS_KEYS = new Set(['inv-crea:qc', 'gr:pay']);

/* ─── Flows ──────────────────────────────────────────────────────────
   Each flow has one or more "runs" (animated paths).
   Invoice to Pay cycles through 3 alternate sub-paths.              */

interface FlowDef {
  id: string;
  name: string;
  color: string;
  description: string;
  highlights: string[];
  dimmed: string[];
  runs: string[][];
  runLabels?: string[];
}

const FLOWS: FlowDef[] = [
  {
    id: 'q2o',
    name: 'Quote to Order',
    color: '#3666ff',
    description:
      'From project creation to final quote — structure procurement with competitive bidding, multi-round negotiations, and data-driven shortlisting.',
    highlights: [
      'Multi-vendor RfQ with structured approvals',
      'Real-time negotiation tracking per line item',
      'Automated bid comparison and scoring engine',
    ],
    dimmed: [
      'Quote calculator with landed cost analysis',
      'Project-level spend visibility dashboard',
    ],
    runs: [['proj-crea', 'rfq', 'neg', 'bid-ana', 'quote-calc']],
  },
  {
    id: 'r2po',
    name: 'Requisition to PO',
    color: '#4b8bff',
    description:
      'From internal demand to approved purchase order — capture requisitions, source competitively, and convert winning bids into compliant POs.',
    highlights: [
      'Department-level requisition capture',
      'Competitive sourcing with structured RfQ',
      'One-click PO generation from winning bid',
    ],
    dimmed: [
      'Budget validation and approval workflows',
      'Supplier performance benchmarking',
    ],
    runs: [['req', 'rfq', 'neg', 'bid-ana', 'po-crea']],
  },
  {
    id: 'i2p',
    name: 'Invoice to Pay',
    color: '#10b981',
    description:
      'From purchase order to final payment — choose the right verification path based on your supplier trust level and order criticality.',
    highlights: [
      'Three-way matching: PO, GR, and Invoice',
      'Flexible bypass routes for trusted suppliers',
      'Automated payment release after approvals',
    ],
    dimmed: [
      'Real-time payment status tracking',
      'Early payment discount capture',
    ],
    runs: [
      ['inv-crea', 'gr',  'qc',  'pay'],  // full path
      ['inv-crea', 'qc',  'pay'],          // skip GR
      ['inv-crea', 'gr',  'pay'],          // skip QC
    ],
    runLabels: [
      'Full path — Invoice → GR → QC → Pay',
      'Express — Invoice → QC → Pay (skip GR)',
      'Direct — Invoice → GR → Pay (skip QC)',
    ],
  },
];

/* ─── Component ─────────────────────────────────────────────────────── */

export default function ProductFlowShowcase() {
  const [flowIdx, setFlowIdx]       = useState(0);
  const [runIdx,  setRunIdx]        = useState(0);
  const [revealed, setRevealed]     = useState(1);
  const [revealedMax, setRevealedMax] = useState(1);
  const [drawLine, setDrawLine]     = useState(-1);
  const epochRef = useRef(0);

  /* Track the high-water mark so i2p highlights don't reset between runs */
  useEffect(() => {
    setRevealedMax(m => Math.max(m, revealed));
  }, [revealed]);

  const flow   = FLOWS[flowIdx];
  const steps  = flow.runs[runIdx];
  const n      = steps.length;
  const isLastRun = runIdx >= flow.runs.length - 1;
  const animEpoch = epochRef.current;

  /* Sequencer — drives the step-by-step animation */
  useEffect(() => {
    if (drawLine !== -1) return;

    const delay = revealed < n
      ? 900                           // pause before drawing next connector
      : isLastRun ? 3500 : 1600;     // pause at end (longer for last run)

    const t = setTimeout(() => {
      if (revealed < n) {
        setDrawLine(revealed - 1);
      } else if (!isLastRun) {
        epochRef.current++;
        setRunIdx(p => p + 1);
        setRevealed(1);
        setDrawLine(-1);
      } else {
        epochRef.current++;
        setFlowIdx(p => (p + 1) % FLOWS.length);
        setRunIdx(0);
        setRevealed(1);
        setRevealedMax(1);
        setDrawLine(-1);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [revealed, drawLine, n, isLastRun]);

  const selectFlow = (idx: number) => {
    epochRef.current++;
    setFlowIdx(idx);
    setRunIdx(0);
    setRevealed(1);
    setRevealedMax(1);
    setDrawLine(-1);
  };

  const flowSet   = new Set(steps);
  const visited   = new Set(steps.slice(0, revealed));
  const currentId = steps[revealed - 1];

  const animFromId = drawLine >= 0 ? steps[drawLine]     : null;
  const animToId   = drawLine >= 0 ? steps[drawLine + 1] : null;
  const animPath   = animFromId && animToId
    ? CONN_PATHS[`${animFromId}:${animToId}`] : null;

  /* Only light the edges actually traversed in this run — prevents bypass
     arrows from glowing in flow 1 just because both endpoint nodes happen
     to be visited.                                                        */
  const traversedEdges = new Set(
    Array.from({ length: Math.max(0, revealed - 1) }, (_, i) => `${steps[i]}:${steps[i + 1]}`)
  );
  const isLit = (fromId: string, toId: string) =>
    traversedEdges.has(`${fromId}:${toId}`);

  /* Multi-run flows: use high-water mark so highlights persist across runs */
  const sidebarRevealed = flow.runs.length > 1 ? revealedMax : revealed;

  return (
    <section className="pf-section" id="product-flow">
      <div className="pf-wrap">
        <SectionHeader
          label="Platform"
          title="One Platform. Every Workflow."
          description="An intelligent, end-to-end platform connecting every team, workflow, and supplier relationship — from the first request to the final payment."
          accentColor="#3666ff"
        />

        {/* ── Tabs ── */}
        <div className="pf-tabs">
          {FLOWS.map((f, i) => (
            <button
              key={f.id}
              className={`pf-tab${flowIdx === i ? ' is-on' : ''}`}
              style={flowIdx === i
                ? { background: f.color, borderColor: f.color, boxShadow: `0 0 24px ${f.color}55` }
                : {}}
              onClick={() => selectFlow(i)}
            >
              <span className="pf-tab-n">{i + 1}</span>
              {f.name}
            </button>
          ))}
        </div>

        {/* ── Board ── */}
        <div className="pf-board">
          <div className="pf-board-body">

            {/* ════ LEFT — flowchart ════ */}
            <div className="pf-left">

              {/* Top-left badge */}
              <div className="pf-badge-row">
                <AnimatePresence mode="wait">
                  <motion.div key={flowIdx} className="pf-flow-badge"
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.25 }}>
                    <span className="pf-badge-dot" style={{ background: flow.color }} />
                    <span className="pf-badge-text">{flow.name.toUpperCase()}</span>
                  </motion.div>
                </AnimatePresence>

                {/* Run label for multi-run flows */}
                {flow.runs.length > 1 && flow.runLabels && (
                  <AnimatePresence mode="wait">
                    <motion.span key={`${flowIdx}-${runIdx}`} className="pf-run-label"
                      initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.2 }}>
                      {flow.runLabels[runIdx]}
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>

              {/* Flowchart canvas */}
              <div className="pf-canvas">
                <svg className="pf-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    {/* refX="10" → tip at path endpoint; body stays outside node */}
                    <marker id="arr-dim" viewBox="0 0 10 10" refX="10" refY="5"
                      markerWidth="2.5" markerHeight="2"
                      markerUnits="userSpaceOnUse" orient="auto">
                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="rgba(0,0,0,0.25)" />
                    </marker>
                    {FLOWS.map(f => (
                      <marker key={f.id} id={`arr-${f.id}`}
                        viewBox="0 0 10 10" refX="10" refY="5"
                        markerWidth="3" markerHeight="2.4"
                        markerUnits="userSpaceOnUse" orient="auto">
                        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={f.color} />
                      </marker>
                    ))}
                  </defs>

                  {/* dim background (all connections always visible) */}
                  {Object.entries(CONN_PATHS).map(([key, d]) => (
                    <path key={key} d={d}
                      className={`pf-bg-conn${BYPASS_KEYS.has(key) ? ' is-bypass' : ''}`}
                      markerEnd="url(#arr-dim)"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}

                  {/* completed lit paths for the current run */}
                  {Object.entries(CONN_PATHS).map(([key, d]) => {
                    const [fromId, toId] = key.split(':');
                    if (!isLit(fromId, toId)) return null;
                    if (fromId === animFromId && toId === animToId) return null;
                    return (
                      <path key={`lit-${key}`} d={d}
                        stroke={flow.color} strokeWidth="2" fill="none" opacity="0.9"
                        markerEnd={`url(#arr-${flow.id})`}
                        vectorEffect="non-scaling-stroke"
                      />
                    );
                  })}

                  {/* currently animating connector */}
                  {animPath && (
                    <motion.path
                      key={`ap-${flowIdx}-${runIdx}-${drawLine}`}
                      d={animPath}
                      stroke={flow.color} strokeWidth="2.5" fill="none"
                      strokeLinecap="round" vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.65, ease: 'easeInOut' }}
                      onAnimationComplete={() => {
                        if (epochRef.current === animEpoch) {
                          setDrawLine(-1);
                          setRevealed(p => p + 1);
                        }
                      }}
                    />
                  )}
                </svg>

                {/* Node cards */}
                {NODES.map(node => {
                  const inFlow    = flowSet.has(node.id);
                  const isVisited = visited.has(node.id);
                  const isCurrent = node.id === currentId && isVisited;

                  let cls = 'pf-node';
                  if (isCurrent)      cls += ' is-current';
                  else if (isVisited) cls += ' is-done';
                  else if (inFlow)    cls += ' in-flow';

                  return (
                    <div key={node.id} className={cls}
                      style={{
                        left: `${node.x}%`,
                        top:  `${node.y}%`,
                        '--nc': flow.color,
                        '--ng': `${flow.color}2e`,
                      } as React.CSSProperties}
                    >
                      {node.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ════ RIGHT — content sidebar ════ */}
            <div className="pf-sidebar">
              <AnimatePresence mode="wait">
                <motion.div key={flowIdx} className="pf-sidebar-inner"
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>

                  <div className="pf-sidebar-top">
                    <span className="pf-sidebar-eyebrow">Active Flow</span>
                    <h3 className="pf-sidebar-title">{flow.name}</h3>
                    <p className="pf-sidebar-desc">{flow.description}</p>

                    <ul className="pf-sidebar-list">
                      {/* Highlights — appear one by one as arrows are drawn */}
                      <AnimatePresence>
                        {flow.highlights.map((h, i) => {
                          if (sidebarRevealed < Math.min(i + 2, n)) return null;
                          return (
                            <motion.li key={`h-${flowIdx}-${i}`}
                              className="pf-feature pf-feature--lit"
                              style={{ '--nc': flow.color } as React.CSSProperties}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.35 }}>
                              <span className="pf-check-icon">
                                <svg viewBox="0 0 12 12" width="11" height="11" fill="none">
                                  <polyline points="2,6 5,9.5 10,2.5"
                                    stroke="white" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                              <span>{h}</span>
                            </motion.li>
                          );
                        })}
                      </AnimatePresence>

                      {/* Always visible — same style as highlights */}
                      {flow.dimmed.map((d, i) => (
                        <li key={`d-${flowIdx}-${i}`}
                          className="pf-feature pf-feature--lit"
                          style={{ '--nc': flow.color } as React.CSSProperties}>
                          <span className="pf-check-icon">
                            <svg viewBox="0 0 12 12" width="11" height="11" fill="none">
                              <polyline points="2,6 5,9.5 10,2.5"
                                stroke="white" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pf-sidebar-footer">
                    {/* Run dots for multi-run flows */}
                    {flow.runs.length > 1 ? (
                      <div className="pf-run-nav">
                        <span className="pf-flows-label">Path</span>
                        <div className="pf-flows-dots">
                          {flow.runs.map((_, i) => (
                            <button key={i}
                              className={`pf-flows-dot${runIdx === i ? ' is-on' : ''}`}
                              style={runIdx === i ? { background: flow.color } : {}}
                              aria-label={`Run ${i + 1}`}
                            />
                          ))}
                        </div>
                        <span className="pf-flows-label">
                          {runIdx + 1}&thinsp;/&thinsp;{flow.runs.length}
                        </span>
                      </div>
                    ) : (
                      <div className="pf-run-nav">
                        <span className="pf-flows-label">Flows</span>
                        <div className="pf-flows-dots">
                          {FLOWS.map((f, i) => (
                            <button key={i}
                              className={`pf-flows-dot${flowIdx === i ? ' is-on' : ''}`}
                              style={flowIdx === i ? { background: flow.color } : {}}
                              onClick={() => selectFlow(i)}
                              aria-label={f.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

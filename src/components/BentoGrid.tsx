'use client';

import { motion } from 'framer-motion';
import { GLOBAL_LAYOUT } from './LayoutConfig';
import SectionHeader from './SectionHeader';

/* ── Mini mockup components ──────────────────── */

const BrowserFrame = ({ url, children }: { url: string; children: React.ReactNode }) => (
  <div style={{ background: '#0a0a0c', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
    <div style={{ padding: '10px 16px', background: '#111116', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', opacity: 0.8 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', opacity: 0.8 }} />
      </div>
      <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 6, padding: '4px 12px', fontSize: 10, color: '#6b6b7a', fontFamily: 'monospace' }}>
        {url}
      </div>
    </div>
    {children}
  </div>
);

function SupplierScoringMockup() {
  const suppliers = [
    { name: 'Alpha Inc', tag: 'Recommended', price: '$4.20', lead: '5 days', qty: 100, score: 94, color: '#34d399' },
    { name: 'Unicorn Resale', tag: 'Alt', price: '$4.85', lead: '7 days', qty: 50, score: 81, color: '#7c5cfc' },
    { name: 'Stermone Ltd', tag: 'New', price: '$5.10', lead: '10 days', qty: 200, score: 72, color: '#fbbf24' },
  ];
  return (
    <BrowserFrame url="factwise.io/sourcing/events/rfq-2024-011">
      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#f4f4f5', marginBottom: 4 }}>Select Winners</div>
          <div style={{ fontSize: 12, color: '#6b6b7a' }}>RFQ-2024-011 · Office Supplies Q4</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 500, color: '#f4f4f5', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, cursor: 'pointer' }}>Compare</div>
          <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 600, color: '#fff', background: '#7c5cfc', borderRadius: 6, cursor: 'pointer' }}>Award</div>
        </div>
      </div>
      {/* Table header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 12, padding: '10px 16px', background: '#111116', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {['SUPPLIER', 'UNIT PRICE', 'LEAD TIME', 'MIN QTY', 'SCORE'].map(h => (
          <div key={h} style={{ fontSize: 9, fontWeight: 600, color: '#6b6b7a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
        ))}
      </div>
      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {suppliers.map((s, i) => (
          <motion.div key={i}
            style={{
              display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 12, padding: '12px 16px',
              borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', alignItems: 'center',
              background: i === 0 ? 'rgba(52,211,153,0.05)' : 'transparent',
              borderLeft: i === 0 ? '3px solid #34d399' : '3px solid transparent',
              marginLeft: i === 0 ? 0 : 3,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{s.name[0]}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#f4f4f5' }}>{s.name}</div>
                <div style={{ fontSize: 9, color: s.color, background: `${s.color}15`, padding: '2px 6px', borderRadius: 4, alignSelf: 'flex-start', fontWeight: 600 }}>{s.tag}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f4f4f5' }}>{s.price}</div>
            <div style={{ fontSize: 12, color: '#a1a1aa' }}>{s.lead}</div>
            <div style={{ fontSize: 12, color: '#a1a1aa' }}>{s.qty}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 4, background: '#27272a', borderRadius: 2 }}>
                <motion.div style={{ width: `${s.score}%`, height: '100%', background: s.color, borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{s.score}</div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#18181b' }}>
        <div style={{ fontSize: 11, color: '#71717a' }}>3 suppliers · Responses closed</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 500, color: '#f4f4f5', border: '1px solid #3f3f46', borderRadius: 6, cursor: 'pointer' }}>Export</div>
          <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 600, color: '#fff', background: '#10b981', borderRadius: 6, cursor: 'pointer' }}>Award Alpha Inc →</div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function SourcingPipelineMockup() {
  const steps = [
    { label: 'PR Submitted', sub: 'Sarah K. · 9:14 AM', status: 'done' },
    { label: 'Budget Review', sub: 'Finance Team · 10:02 AM', status: 'done' },
    { label: 'Manager Approval', sub: 'John M. · Pending', status: 'active' },
    { label: 'CFO Sign-off', sub: 'Linda R. · —', status: 'pending' },
  ];
  return (
    <BrowserFrame url="factwise.io/approvals/queue">
      <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#f4f4f5' }}>Approval Queue</div>
      </div>
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, position: 'relative' }}>
            {i < steps.length - 1 && (
              <div style={{ position: 'absolute', left: 11, top: 24, bottom: -20, width: 2, background: s.status === 'done' ? '#34d399' : 'rgba(255,255,255,0.04)' }} />
            )}
            <div style={{
              width: 24, height: 24, borderRadius: '50%', border: `2px solid ${s.status === 'done' ? '#34d399' : s.status === 'active' ? '#7c5cfc' : '#3f3f46'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c', zIndex: 1
            }}>
              {s.status === 'done' && <span style={{ fontSize: 10, color: '#34d399' }}>✓</span>}
              {s.status === 'active' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c5cfc' }} />}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: s.status === 'pending' ? '#a1a1aa' : '#f4f4f5' }}>{s.label}</div>
                {s.status === 'active' && <div style={{ fontSize: 9, fontWeight: 600, color: '#7c5cfc', background: '#7c5cfc20', padding: '2px 6px', borderRadius: 4 }}>IN PROGRESS</div>}
              </div>
              <div style={{ fontSize: 11, color: '#71717a', marginTop: 2 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 16px 16px', padding: '12px', background: '#7c5cfc10', border: '1px solid #7c5cfc20', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: '#7c5cfc', fontWeight: 500 }}>PO-2024-0387 awaiting your review</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 500, color: '#a1a1aa', border: '1px solid #3f3f46', borderRadius: 6, cursor: 'pointer', background: '#18181b' }}>Reject</div>
          <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 600, color: '#fff', background: '#7c5cfc', borderRadius: 6, cursor: 'pointer' }}>Approve</div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function NLPMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ color: '#7c5cfc', fontSize: 13 }}>⌘</span>
        <span style={{ fontSize: 12, color: '#6b6b7a', fontStyle: 'italic' }}>
          What is our total spend on steel?
        </span>
        <span style={{ marginLeft: 'auto', width: 8, height: 16, background: '#7c5cfc', borderRadius: 2, animation: 'blink-cursor 1s steps(2, start) infinite' }} />
      </div>
      {/* Bar chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 48, padding: '0 4px' }}>
        {[40, 65, 85, 100, 75, 90, 60].map((h, i) => (
          <motion.div key={i}
            style={{
              flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0',
              background: i === 3 ? '#7c5cfc' : 'rgba(124,92,252,0.15)',
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#34d399', background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.1)', padding: '6px 10px', borderRadius: 8 }}>
        ↑ $2.4M spend analyzed
      </div>
    </div>
  );
}

function BYOKMockup() {
  return (
    <BrowserFrame url="factwise.io/payments/reconciliation">
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#f4f4f5' }}>4-Way Reconciliation</div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#34d399', background: '#34d39915', padding: '4px 10px', borderRadius: 6 }}>Auto-matched</div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 16px 16px' }}>
        {[
          { label: 'PURCHASE ORDER', val: 'PO-2024-0387' },
          { label: 'INVOICE', val: 'INV-9921-B' },
          { label: 'GOODS RECEIPT', val: 'GR-4412' },
          { label: 'QUALITY CHECK', val: 'QC-881' },
        ].map((item, i) => (
          <motion.div key={i}
            style={{ padding: '12px 16px', background: '#34d39908', border: '1px solid #34d39930', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#a1a1aa', letterSpacing: '0.05em', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#f4f4f5' }}>{item.val}</div>
            </div>
            <div style={{ fontSize: 14, color: '#34d399' }}>✓</div>
          </motion.div>
        ))}
      </div>

      <div style={{ padding: '16px', margin: '0 16px 16px', background: '#111116', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 32 }}>
          <div>
            <div style={{ fontSize: 11, color: '#6b6b7a', marginBottom: 4 }}>Total Amount</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f4f4f5' }}>$12,480.00</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#6b6b7a', marginBottom: 4 }}>Variance</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#34d399' }}>$0.00</div>
          </div>
        </div>
        <div style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#fff', background: '#f59e0b', borderRadius: 8, cursor: 'pointer' }}>
          Release Payment →
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ── Feature cards data ──────────────────────── */
const features = [
  {
    badge: { label: 'AI Risk', cls: 'pv' },
    title: 'Supplier Intelligence',
    description: 'Score suppliers based on multi-dimensional data points: lead time, financial risk, and ESG compliance.',
    colSpan: 'md:col-span-2',
    MockupComponent: SupplierScoringMockup,
    delay: 0.08,
    accent: '#7c5cfc',
  },
  {
    badge: { label: 'Workflows', cls: 'pb' },
    title: 'Approval Workflows',
    description: 'Manage RFX cycles and contract lifecycle with a node-based visual workflow builder.',
    colSpan: 'md:col-span-1',
    MockupComponent: SourcingPipelineMockup,
    delay: 0.16,
    accent: '#7c5cfc',
  },
  {
    badge: { label: 'Insights', cls: 'pv' },
    title: 'Conversational Analytics',
    description: 'Query spend data in plain English. Get real-time performance charts and saving opportunities.',
    colSpan: 'md:col-span-1',
    MockupComponent: NLPMockup,
    delay: 0.24,
    accent: '#7c5cfc',
  },
  {
    badge: { label: 'Finance', cls: 'pr' },
    title: 'Automated Reconciliation',
    description: 'Automatically perform 4-way matching between POs, Invoices, Goods Receipts, and Quality Checks.',
    colSpan: 'md:col-span-2',
    MockupComponent: BYOKMockup,
    delay: 0.32,
    accent: '#f59e0b',
  },
];

export default function BentoGrid() {
  return (
    <section id="product" style={{ ...GLOBAL_LAYOUT.sectionStyle, ...GLOBAL_LAYOUT.containerStyle, zIndex: 20 }}>

      <SectionHeader 
        label="Capabilities"
        title="Modern Source-to-Pay."
        description="A holistic suite of tools designed to optimize direct material spend and mitigate supply chain risk."
        accentColor="#7c5cfc"
      />

      {/* Bento grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="grid-cols-1 md:grid-cols-3">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            className={f.colSpan}
            style={{
              position: 'relative',
              background: '#0a0a0c',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              padding: '32px',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = `${f.accent}40`;
              el.style.boxShadow = `0 10px 40px ${f.accent}12, inset 0 0 20px ${f.accent}05`;
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(255,255,255,0.07)';
              el.style.boxShadow = 'none';
              el.style.transform = 'translateY(0)';
            }}
          >
            {/* Mockup visual */}
            <div style={{ marginBottom: 28 }}>
              <f.MockupComponent />
            </div>

            {/* Card text */}
            <div>
              <span className={`pill ${f.badge.cls}`} style={{ marginBottom: 12 }}>{f.badge.label}</span>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: '#f4f4f5', marginBottom: 8, lineHeight: 1.3 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6b6b7a', lineHeight: 1.6, fontWeight: 400 }}>{f.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Browser Chrome ─── */
const BrowserChrome = ({ url }) => (
  <div style={{ background: '#f3f4f6', borderBottom: '1px solid #e5e7eb', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
    <div style={{ display: 'flex', gap: 5 }}>
      {['#ff5f57', '#febc2e', '#27c840'].map(c => (
        <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
      ))}
    </div>
    <div style={{ flex: 1, background: '#e5e7eb', borderRadius: 4, height: 18, marginLeft: 8, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
      <span style={{ fontSize: 9, color: '#9ca3af', fontFamily: 'monospace' }}>{url}</span>
    </div>
  </div>
);

const ScoreBar = ({ pct, color }) => (
  <div style={{ flex: 1, height: 4, borderRadius: 2, background: '#f0f0f5', overflow: 'hidden' }}>
    <div style={{ height: '100%', width: `${pct}%`, borderRadius: 2, background: color }} />
  </div>
);

/* ─── Dashboard 1 ─── */
const SelectWinnersDash = () => {
  const rows = [
    { name: 'Alpha Inc', init: 'A', tag: 'Recommended', price: '$4.20', lead: '5 days', min: '100', score: 94, color: '#22c55e', tagBg: '#dcfce7', tagColor: '#15803d', selected: true },
    { name: 'Unicorn Resale', init: 'U', tag: 'Alt', price: '$4.85', lead: '7 days', min: '50', score: 81, color: '#7c5cfc', tagBg: '#ede9fe', tagColor: '#6d28d9', selected: false },
    { name: 'Stermone Ltd', init: 'S', tag: 'New', price: '$5.10', lead: '10 days', min: '200', score: 72, color: '#f59e0b', tagBg: '#fef3c7', tagColor: '#b45309', selected: false },
  ];
  return (
    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', fontFamily: 'Inter,system-ui,sans-serif' }}>
      <BrowserChrome url="factwise.io/sourcing/rfq-2024-011" />
      <div style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>Select Winners</div>
          <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 1 }}>RFQ-2024-011 · Office Supplies Q4</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ padding: '4px 10px', borderRadius: 5, background: '#f3f4f6', fontSize: 9, fontWeight: 600, color: '#6b7280' }}>Compare</div>
          <div style={{ padding: '4px 10px', borderRadius: 5, background: '#7c5cfc', fontSize: 9, fontWeight: 600, color: '#fff' }}>Award</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 0.9fr 0.9fr 0.7fr 1fr', background: '#f9fafb', borderBottom: '1px solid #f3f4f6', padding: '6px 16px', gap: 8 }}>
        {['Supplier', 'Unit Price', 'Lead Time', 'Min Qty', 'Score'].map(h => (
          <div key={h} style={{ fontSize: 8, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</div>
        ))}
      </div>
      {rows.map((row) => (
        <div key={row.name} style={{
          display: 'grid', gridTemplateColumns: '1.8fr 0.9fr 0.9fr 0.7fr 1fr',
          padding: '9px 16px', gap: 8, alignItems: 'center',
          borderBottom: '1px solid #f9fafb',
          background: row.selected ? '#f0fdf4' : '#fff',
          borderLeft: row.selected ? '3px solid #22c55e' : '3px solid transparent',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: `${row.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: row.color, flexShrink: 0 }}>{row.init}</div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#111827' }}>{row.name}</div>
              <div style={{ display: 'inline-flex', padding: '1px 4px', borderRadius: 3, background: row.tagBg, fontSize: 7, fontWeight: 700, color: row.tagColor, marginTop: 1 }}>{row.tag}</div>
            </div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>{row.price}</div>
          <div style={{ fontSize: 10, color: '#6b7280' }}>{row.lead}</div>
          <div style={{ fontSize: 10, color: '#6b7280' }}>{row.min}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <ScoreBar pct={row.score} color={row.color} />
            <span style={{ fontSize: 9, fontWeight: 700, color: row.color, minWidth: 20, textAlign: 'right' }}>{row.score}</span>
          </div>
        </div>
      ))}
      <div style={{ padding: '8px 16px', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9, color: '#9ca3af' }}>3 suppliers · Responses closed</span>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ padding: '4px 9px', borderRadius: 5, background: '#fff', border: '1px solid #e5e7eb', fontSize: 9, fontWeight: 500, color: '#6b7280' }}>Export</div>
          <div style={{ padding: '4px 9px', borderRadius: 5, background: '#22c55e', fontSize: 9, fontWeight: 600, color: '#fff' }}>Award Alpha Inc →</div>
        </div>
      </div>
    </div>
  );
};

/* ─── Dashboard 2 ─── */
const ApprovalWorkflowDash = () => {
  const steps = [
    { label: 'PR Submitted', by: 'Sarah K.', time: '9:14 AM', status: 'done', color: '#22c55e' },
    { label: 'Budget Review', by: 'Finance Team', time: '10:02 AM', status: 'done', color: '#22c55e' },
    { label: 'Manager Approval', by: 'John M.', time: 'Pending', status: 'active', color: '#7c5cfc' },
    { label: 'CFO Sign-off', by: 'Linda R.', time: '—', status: 'pending', color: '#d1d5db' },
  ];
  return (
    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', fontFamily: 'Inter,system-ui,sans-serif' }}>
      <BrowserChrome url="factwise.io/approvals/queue" />
      <div style={{ padding: '14px 18px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Approval Queue</div>
        {steps.map((step, i) => (
          <div key={step.label} style={{ display: 'flex', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                background: `${step.color}18`, border: `2px solid ${step.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {step.status === 'done' && <span style={{ fontSize: 10, color: step.color, fontWeight: 700 }}>✓</span>}
                {step.status === 'active' && <div style={{ width: 7, height: 7, borderRadius: '50%', background: step.color }} />}
                {step.status === 'pending' && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#d1d5db' }} />}
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 2, height: 26, background: i < 1 ? '#22c55e' : '#f3f4f6', margin: '3px 0' }} />
              )}
            </div>
            <div style={{ paddingTop: 3, paddingBottom: i < steps.length - 1 ? 18 : 0 }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#111827' }}>{step.label}</span>
                {step.status === 'active' && (
                  <span style={{ fontSize: 7, fontWeight: 700, color: '#7c5cfc', background: '#ede9fe', padding: '1px 5px', borderRadius: 3 }}>IN PROGRESS</span>
                )}
              </div>
              <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 2 }}>{step.by} · {step.time}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 12, padding: '9px 12px', borderRadius: 8, background: '#faf5ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, color: '#7c5cfc', fontWeight: 500 }}>PO-2024-0387 awaiting your review</span>
          <div style={{ display: 'flex', gap: 5 }}>
            <div style={{ padding: '4px 10px', borderRadius: 5, border: '1px solid #e5e7eb', fontSize: 9, fontWeight: 500, color: '#6b7280', background: '#fff' }}>Reject</div>
            <div style={{ padding: '4px 10px', borderRadius: 5, background: '#7c5cfc', fontSize: 9, fontWeight: 600, color: '#fff' }}>Approve</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Dashboard 3 ─── */
const ReconciliationDash = () => {
  const cards = [
    { label: 'Purchase Order', ref_: 'PO-2024-0387' },
    { label: 'Invoice', ref_: 'INV-9921-B' },
    { label: 'Goods Receipt', ref_: 'GR-4412' },
    { label: 'Quality Check', ref_: 'QC-881' },
  ];
  return (
    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', fontFamily: 'Inter,system-ui,sans-serif' }}>
      <BrowserChrome url="factwise.io/payments/reconciliation" />
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>4-Way Reconciliation</div>
          <div style={{ fontSize: 9, fontWeight: 600, color: '#15803d', background: '#dcfce7', padding: '2px 8px', borderRadius: 4 }}>Auto-matched</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 10 }}>
          {cards.map((card) => (
            <div key={card.label} style={{ padding: '9px 10px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 8, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.label}</span>
                <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>✓</span>
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#111827', marginTop: 3 }}>{card.ref_}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 8, background: '#f9fafb', border: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 9, color: '#9ca3af' }}>Total Amount</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginTop: 1 }}>$12,480.00</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: '#9ca3af' }}>Variance</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#22c55e', marginTop: 1 }}>$0.00</div>
          </div>
          <div style={{ padding: '7px 12px', borderRadius: 7, background: '#f59e0b', fontSize: 10, fontWeight: 600, color: '#fff' }}>Release Payment →</div>
        </div>
      </div>
    </div>
  );
};

/* ─── Section config ─── */
// dashSide = which half the dashboard lives in for this section
// text automatically goes on the OPPOSITE half
const SECTIONS = [
  {
    id: 'savings',
    badge: 'Save up to 31%',
    badgeColor: '#34d399',
    badgeBg: 'rgba(52,211,153,0.10)',
    badgeBorder: 'rgba(52,211,153,0.25)',
    orbColor: 'rgba(52,211,153,0.09)',
    title: 'Negotiate smarter,\nspend less.',
    desc: 'Leverage dynamic and historic supplier insights to drive competitive pricing. Discover certified suppliers, cut maverick spend, and channel volume to preferred partners.',
    features: [
      { icon: '↓', label: 'Better negotiations', desc: 'Use live market benchmarks to push suppliers on pricing, terms, and lead times — every cycle.' },
      { icon: '⊕', label: 'Smarter sourcing', desc: 'Discover new suppliers who meet your quality certifications and pricing requirements instantly.' },
      { icon: '⊘', label: 'Eliminate maverick spend', desc: 'Increase preferred supplier volume by 80% with automated enforcement and spend transparency.' },
    ],
    Dashboard: SelectWinnersDash,
    dashSide: 'right',
  },
  {
    id: 'usability',
    badge: 'Cut excess spend 50%',
    badgeColor: '#7c5cfc',
    badgeBg: 'rgba(124,92,252,0.10)',
    badgeBorder: 'rgba(124,92,252,0.25)',
    orbColor: 'rgba(124,92,252,0.09)',
    title: 'Governance without\nfriction.',
    desc: 'Automated approval workflows route requests to the right people instantly. An intuitive interface means zero training time — your team gets compliant on day one.',
    features: [
      { icon: '✓', label: 'Auto-routing approvals', desc: 'Define multi-tier approval rules once. Every purchase request flows through the right reviewers automatically.' },
      { icon: '◎', label: 'Zero-training UI', desc: 'An interface so intuitive your team adopts it without workshops or change-management overhead.' },
      { icon: '◈', label: 'Proactive visibility', desc: 'Customized insights surface anomalies before they become budget overruns.' },
    ],
    Dashboard: ApprovalWorkflowDash,
    dashSide: 'left',   // ← dashboard moves to LEFT, text goes RIGHT
  },
  {
    id: 'efficiency',
    badge: '20% productivity boost',
    badgeColor: '#f59e0b',
    badgeBg: 'rgba(245,158,11,0.10)',
    badgeBorder: 'rgba(245,158,11,0.25)',
    orbColor: 'rgba(245,158,11,0.08)',
    title: 'End-to-end\nautomation.',
    desc: 'Streamline the entire source-to-pay journey. Real-time data flows through every touchpoint while four-way reconciliation closes invoices without manual intervention.',
    features: [
      { icon: '⚡', label: 'Automated ordering', desc: 'Convert approved RFQs to POs in one click. No re-entry, no errors, no delays.' },
      { icon: '◷', label: 'Real-time data', desc: 'Every stakeholder sees the same live numbers — inventory, budget, delivery status — always.' },
      { icon: '⇌', label: 'Four-way reconciliation', desc: 'POs, invoices, goods receipts, and quality checks matched automatically. Payment released on match.' },
    ],
    Dashboard: ReconciliationDash,
    dashSide: 'right',  // ← back to right
  },
];

/* ─── Main Export ─── */
export default function FeatureSections() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = SECTIONS.map((_, idx) => {
      const el = sectionRefs.current[idx];
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(idx);
        },
        { threshold: 0.45 }
      );
      observer.observe(el);
      return observer;
    }).filter(Boolean);

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const active = SECTIONS[activeIdx];

  return (
    <section style={{ position: 'relative', background: '#0a0a0c' }}>
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)' }} />

      {SECTIONS.map((section, idx) => {
        const isLeft = section.dashSide === 'left';
        // Text is always on the side OPPOSITE the dashboard
        // dashSide right → text left column | dashSide left → text right column
        return (
          <div
            key={section.id}
            ref={el => (sectionRefs.current[idx] = el)}
            style={{
              position: 'relative',
              minHeight: '100vh',
              display: 'grid',
              // Two equal columns
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
            }}
          >
            {/* ── Orb ── */}
            <div style={{
              position: 'absolute',
              width: 700, height: 700,
              borderRadius: '50%',
              top: '50%', transform: 'translateY(-50%)',
              left: isLeft ? '-20%' : 'auto',
              right: isLeft ? 'auto' : '-20%',
              background: `radial-gradient(circle,${section.orbColor} 0%,transparent 70%)`,
              filter: 'blur(90px)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            {/* ── Dashboard column ── */}
            {/* Always rendered in its correct grid column via order */}
            <div style={{
              order: isLeft ? 1 : 2,       // left col = order 1, right col = order 2
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 32px 80px 48px',
              minHeight: '100vh',
            }}>
              {/*
                Only render the dashboard visually for the ACTIVE section.
                For inactive sections we render an invisible placeholder so the grid column is held.
                The "floating" animated card is handled by the sticky overlay below.
              */}
              <div style={{
                width: '100%',
                maxWidth: 460,
                // Invisible placeholder — the real card is in the sticky overlay
                visibility: 'hidden',
                pointerEvents: 'none',
              }}>
                <section.Dashboard />
              </div>
            </div>

            {/* ── Text column ── */}
            <div style={{
              order: isLeft ? 2 : 1,
              position: 'relative',
              zIndex: 2,
              padding: isLeft ? '80px 48px 80px 32px' : '80px 32px 80px 48px',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
            }}>
              <div style={{ maxWidth: 480 }}>
                {/* Badge */}
                <div style={{ marginBottom: 22 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '5px 14px', borderRadius: 100,
                    background: section.badgeBg, border: `1px solid ${section.badgeBorder}`,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: section.badgeColor }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: section.badgeColor, textTransform: 'uppercase', letterSpacing: '0.13em' }}>
                      {section.badge}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 style={{
                  fontFamily: 'Inter,system-ui,sans-serif',
                  fontSize: 'clamp(28px,3.2vw,46px)',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.12,
                  color: '#f4f4f5',
                  marginBottom: 16,
                  whiteSpace: 'pre-line',
                }}>
                  {section.title}
                </h2>

                {/* Description */}
                <p style={{ fontSize: 15, color: '#6b6b7a', lineHeight: 1.75, marginBottom: 34, maxWidth: 430 }}>
                  {section.desc}
                </p>

                {/* Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {section.features.map((f) => (
                    <div key={f.label} style={{ display: 'flex', gap: 13 }}>
                      <div style={{
                        flexShrink: 0, marginTop: 2,
                        width: 30, height: 30, borderRadius: '50%',
                        background: section.badgeBg, border: `1px solid ${section.badgeBorder}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, color: section.badgeColor,
                      }}>
                        {f.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#f4f4f5', marginBottom: 3 }}>{f.label}</div>
                        <div style={{ fontSize: 13, color: '#6b6b7a', lineHeight: 1.65 }}>{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Sticky floating dashboard card overlay ── */}
      {/* This is the real visible card. It tracks the active section's column position. */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          // Shift the inner card based on dashSide using a grid identical to the sections
        }}
      >
        {/* Mirror the same 2-col grid */}
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}>
          {/* Left slot */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 32px 0 48px',
          }}>
            <div style={{
              width: '100%',
              maxWidth: 460,
              // Show only when active section has dashSide='left'
              opacity: active.dashSide === 'left' ? 1 : 0,
              transform: active.dashSide === 'left'
                ? 'translateX(0) scale(1)'
                : 'translateX(-40px) scale(0.97)',
              transition: 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)',
              pointerEvents: active.dashSide === 'left' ? 'auto' : 'none',
              boxShadow: '0 32px 90px rgba(0,0,0,0.7)',
              borderRadius: 14,
              position: 'relative',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', inset: -50, borderRadius: '50%',
                background: `radial-gradient(circle,${active.badgeColor}20 0%,transparent 70%)`,
                filter: 'blur(40px)', pointerEvents: 'none', zIndex: -1,
                transition: 'background 0.65s ease',
              }} />
              {/* Crossfade all 3 dashboards in left slot */}
              {SECTIONS.map((s, i) => {
                const isActive = activeIdx === i && s.dashSide === 'left';
                return (
                  <div key={s.id} style={{
                    position: i === 0 ? 'relative' : 'absolute',
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scale(1)' : 'scale(0.97)',
                    transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)',
                    pointerEvents: 'none',
                    borderRadius: 14,
                    overflow: 'hidden',
                  }}>
                    <s.Dashboard />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right slot */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 48px 0 32px',
          }}>
            <div style={{
              width: '100%',
              maxWidth: 460,
              // Show only when active section has dashSide='right'
              opacity: active.dashSide === 'right' ? 1 : 0,
              transform: active.dashSide === 'right'
                ? 'translateX(0) scale(1)'
                : 'translateX(40px) scale(0.97)',
              transition: 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)',
              pointerEvents: active.dashSide === 'right' ? 'auto' : 'none',
              boxShadow: '0 32px 90px rgba(0,0,0,0.7)',
              borderRadius: 14,
              position: 'relative',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', inset: -50, borderRadius: '50%',
                background: `radial-gradient(circle,${active.badgeColor}20 0%,transparent 70%)`,
                filter: 'blur(40px)', pointerEvents: 'none', zIndex: -1,
                transition: 'background 0.65s ease',
              }} />
              {/* Crossfade all 3 dashboards in right slot */}
              {SECTIONS.map((s, i) => {
                const isActive = activeIdx === i && s.dashSide === 'right';
                return (
                  <div key={s.id} style={{
                    position: i === 0 ? 'relative' : 'absolute',
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scale(1)' : 'scale(0.97)',
                    transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)',
                    pointerEvents: 'none',
                    borderRadius: 14,
                    overflow: 'hidden',
                  }}>
                    <s.Dashboard />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)' }} />
    </section>
  );
}

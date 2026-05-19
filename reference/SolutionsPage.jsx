'use client';

import ScrollStack, { ScrollStackItem } from './ScrollStack';

const problems = [
  {
    number: '01',
    label: 'PROBLEM 1',
    title: 'BOM Complexity',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="9" height="9" rx="1" /><rect x="13" y="2" width="9" height="9" rx="1" />
        <rect x="2" y="13" width="9" height="9" rx="1" /><path d="M18 13v8M14 17h8" />
      </svg>
    ),
    description:
      'Building a BOM shouldn\'t take days. Multi-level BOMs with hundreds of components, alternate parts, and multiple finished goods — built manually, line by line, with no version control and no price visibility. By the time it\'s ready, the opportunity may already be gone.',
  },
  {
    number: '02',
    label: 'PROBLEM 2',
    title: 'Pricing Guesswork',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    description:
      'No one knows what anything should cost. Without visibility into past PO prices, contract rates, and market prices, every target price is a guess. And a wrong target means a wrong quote — either you overprice and lose the deal, or underprice and lose the margin.',
  },
  {
    number: '03',
    label: 'PROBLEM 3',
    title: 'Vendor Communication',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    description:
      'Sourcing runs on emails nobody tracks. RFQs sent over email, responses in different formats, follow-ups buried in threads — by the time the deadline has passed and half the data is missing.',
  },
  {
    number: '04',
    label: 'PROBLEM 4',
    title: 'Hidden Costs',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
    description:
      'The cheapest bid is rarely the cheapest purchase. Unit price comparisons miss duties, freight, insurance, and packaging. Without true landed cost visibility, teams award on the wrong number — and the margin gap shows up only after the PO is issued.',
  },
  {
    number: '05',
    label: 'PROBLEM 5',
    title: 'Manual Quoting',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
    description:
      'Customer quotes built on gut feel. Pulling numbers from emails, applying markups in spreadsheets, rolling up BOM costs manually — one error and the margin is gone. One delay and the deal is gone.',
  },
];

export default function SolutionsPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #f8fafc; font-family: 'Helvetica Neue', Arial, sans-serif; }

        .solutions-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100vh;
          overflow: hidden;
        }

        /* LEFT PANEL — sticky hero text */
        .solutions-left {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 60px 60px 80px;
          background: #f8fafc;
          border-right: 1px solid rgba(0,0,0,0.06);
        }

        .solutions-badge {
          display: inline-block;
          background: rgba(239,68,68,0.1);
          color: #dc2626;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 28px;
          border: 1px solid rgba(239,68,68,0.15);
          width: fit-content;
        }

        .solutions-headline {
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 900;
          line-height: 1.08;
          color: #0f172a;
          letter-spacing: -1.5px;
          font-family: Georgia, serif;
          margin-bottom: 24px;
        }

        .solutions-headline span {
          color: #2563eb;
        }

        .solutions-subtext {
          font-size: 15px;
          line-height: 1.75;
          color: #64748b;
          max-width: 360px;
        }

        /* RIGHT PANEL — scroll stack */
        .solutions-right {
          height: 100vh;
          overflow: hidden; /* ScrollStack manages its own scroll */
          position: relative;
        }

        /* Override ScrollStack inner padding to fit our layout */
        .solutions-right .scroll-stack-scroller {
          height: 100vh;
        }

        .solutions-right .scroll-stack-inner {
          padding: 15vh 3rem 60rem 3rem;
        }

        /* Card styles */
        .solutions-right .scroll-stack-card {
          background: white;
          border-radius: 20px !important;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04) !important;
          height: auto !important;
          min-height: 280px;
          padding: 40px !important;
        }

        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .card-icon-wrap {
          width: 56px;
          height: 56px;
          background: rgba(37,99,235,0.08);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .card-big-num {
          font-size: 52px;
          font-weight: 800;
          color: rgba(0,0,0,0.05);
          line-height: 1;
          font-family: Georgia, serif;
          letter-spacing: -2px;
          user-select: none;
        }

        .card-label-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .card-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2563eb;
          flex-shrink: 0;
        }

        .card-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #2563eb;
          text-transform: uppercase;
        }

        .card-title {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 14px;
          line-height: 1.15;
          letter-spacing: -0.5px;
          font-family: Georgia, serif;
        }

        .card-desc {
          font-size: 14.5px;
          line-height: 1.75;
          color: #64748b;
        }
      `}</style>

      <div className="solutions-layout">
        {/* LEFT — static hero */}
        <div className="solutions-left">
          <div className="solutions-badge">The Industry Challenge</div>
          <h1 className="solutions-headline">
            Where Most<br />
            Manufacturers<br />
            Lose <span>Time — and<br />Money.</span>
          </h1>
          <p className="solutions-subtext">
            From broken quoting processes to hidden supply chain costs, discover
            the critical blind spots draining your margins and how to eliminate them.
          </p>
        </div>

        {/* RIGHT — ScrollStack */}
        <div className="solutions-right">
          <ScrollStack
            itemDistance={120}
            itemScale={0.04}
            itemStackDistance={25}
            stackPosition="15%"
            scaleEndPosition="8%"
            baseScale={0.82}
          >
            {problems.map((p) => (
              <ScrollStackItem key={p.number}>
                <div className="card-top-row">
                  <div className="card-icon-wrap">{p.icon}</div>
                  <span className="card-big-num">{p.number}</span>
                </div>
                <div className="card-label-row">
                  <span className="card-dot" />
                  <span className="card-label">{p.label}</span>
                </div>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-desc">{p.description}</p>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </>
  );
}

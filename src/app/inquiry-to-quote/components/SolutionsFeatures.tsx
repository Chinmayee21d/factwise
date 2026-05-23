'use client';

import React from 'react';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

const problems = [
  {
    number: '01',
    dotColor: '#ef4444', // Red dot 🔴
    label: 'BOM COMPLEXITY',
    title: "Building a BOM shouldn't take days.",
    description: 'Multi-level BOMs with hundreds of components, alternate parts, and multiple finished goods — built manually, line by line, with no version control and no price visibility. By the time it\'s ready, the opportunity may already be gone.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3666ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="9" height="9" rx="1" /><rect x="13" y="2" width="9" height="9" rx="1" />
        <rect x="2" y="13" width="9" height="9" rx="1" /><path d="M18 13v8M14 17h8" />
      </svg>
    ),
  },
  {
    number: '02',
    dotColor: '#f97316', // Orange dot 🟠
    label: 'PRICING GUESSWORK',
    title: 'No one knows what anything should cost.',
    description: 'Without visibility into past PO prices, contract rates, and market prices, every target price is a guess. And a wrong target means a wrong quote — either you overprice and lose the deal, or underprice and lose the margin.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3666ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    number: '03',
    dotColor: '#eab308', // Yellow dot 🟡
    label: 'VENDOR COMMUNICATION',
    title: 'Sourcing runs on emails nobody tracks.',
    description: 'RFQs sent over email, follow-ups that go unanswered, responses scattered across inboxes — by the time all vendor bids are in, days have passed and half the data is missing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3666ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    number: '04',
    dotColor: '#3b82f6', // Blue dot 🔵
    label: 'HIDDEN COSTS',
    title: 'The cheapest bid is rarely the cheapest purchase.',
    description: 'Unit price comparisons miss duties, freight, insurance, and packaging. Without true landed cost visibility, teams award on the wrong number — and the margin gap shows up only after the PO is issued.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3666ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
  },
  {
    number: '05',
    dotColor: '#64748b', // Gray/White dot ⚪
    label: 'MANUAL QUOTING',
    title: 'Customer quotes built on gut feel.',
    description: 'Pulling numbers from emails, applying markups in spreadsheets, rolling up BOM costs manually — one error and the margin is gone. One delay and the deal is gone.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3666ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
];

export default function SolutionsFeatures() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '100vh',
        overflow: 'hidden',
        background: '#f8fafc',
        fontFamily: 'var(--font-inter), sans-serif',
      }}
    >
      {/* ── LEFT — static sticky hero ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 60px 60px 80px',
          background: '#f8fafc',
          borderRight: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        {/* Badge */}
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(54,102,255,0.08)',
            color: '#3666ff',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            padding: '6px 14px',
            borderRadius: '20px',
            marginBottom: '28px',
            border: '1px solid rgba(54,102,255,0.15)',
            width: 'fit-content',
          }}
        >
          The Industry Challenge
        </span>

        {/* Headline */}
        <h2
          style={{
            fontSize: 'clamp(32px, 3.5vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.08,
            color: '#0f172a',
            letterSpacing: '-1.5px',
            fontFamily: 'var(--font-display), Georgia, serif',
            marginBottom: '24px',
          }}
        >
          Where Most<br />
          Manufacturers<br />
          Lose{' '}
          <span style={{ color: '#3666ff' }}>
            Time — and<br />Money.
          </span>
        </h2>

        {/* Sub-text */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.75,
            color: '#64748b',
            maxWidth: '360px',
          }}
        >
          From broken quoting processes to hidden supply chain costs, discover
          the critical blind spots draining your margins and how to eliminate them.
        </p>
      </div>

      {/* ── RIGHT — ScrollStack ── */}
      <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
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
              {/* Card */}
              <div
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
                  minHeight: '280px',
                  padding: '40px',
                }}
              >
                {/* Top row: icon + big number */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(54,102,255,0.08)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {p.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '52px',
                      fontWeight: 800,
                      color: 'rgba(0,0,0,0.05)',
                      lineHeight: 1,
                      fontFamily: 'var(--font-display), Georgia, serif',
                      letterSpacing: '-2px',
                      userSelect: 'none',
                    }}
                  >
                    {p.number}
                  </span>
                </div>

                {/* Label row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: p.dotColor,
                      flexShrink: 0,
                      display: 'inline-block',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      color: '#3666ff',
                      textTransform: 'uppercase',
                    }}
                  >
                    {p.label}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '26px',
                    fontWeight: 800,
                    color: '#1A1D2E',
                    margin: '0 0 14px',
                    lineHeight: 1.15,
                    letterSpacing: '-0.5px',
                    fontFamily: 'var(--font-display), Georgia, serif',
                  }}
                >
                  {p.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#64748b' }}>
                  {p.description}
                </p>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}

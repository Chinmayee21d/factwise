'use client';

import { motion } from 'framer-motion';
import { GLOBAL_LAYOUT } from './LayoutConfig';
import SectionHeader from './SectionHeader';

const problems = [
  {
    title: '5+ disconnected tools',
    description: 'Requisitions in email, sourcing in spreadsheets, POs in ERP, invoices in AP tool, spend data in BI — all fragmented, all out of sync.',
    solution: 'One unified platform',
    accentColor: '#7c5cfc',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: 'No pricing visibility',
    description: 'Your best contract price is buried in a folder no one can find. Live distributor feeds, historical bids, and contract rates are all siloed.',
    solution: 'Every price in one repository',
    accentColor: '#34d399',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Weeks to close a sourcing event',
    description: 'Collecting quotes by email, comparing in Excel, re-entering into ERP — a 3-week cycle that should take 3 days with automated workflows.',
    solution: 'Source and award in days',
    accentColor: '#ff5f56',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

function ProblemCard({ problem, index }: { problem: typeof problems[0], index: number }) {
  return (
    <motion.div
      style={{
        position: 'relative',
        padding: '32px',
        borderRadius: 24,
        background: '#111116',
        border: '1px solid rgba(255,255,255,0.07)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
      className="group"
    >
      {/* Animated Top Border Beam */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
        />
      </div>

      {/* Decorative Glow at the top */}
      <div 
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-12 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: problem.accentColor + '40' }}
      />

      <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b6b7a', marginBottom: 32, transition: 'all 0.3s ease' }} className="group-hover:text-white group-hover:bg-white/5">
        {problem.icon}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ 
          fontSize: 10, 
          fontWeight: 600, 
          color: '#ff5f56', 
          textTransform: 'uppercase', 
          background: 'rgba(255,95,86,0.1)', 
          border: '1px solid rgba(255,95,86,0.2)', 
          padding: '4px 10px', 
          borderRadius: 8,
          letterSpacing: '0.05em'
        }}>
          Current State
        </span>
      </div>

      <h3 style={{ fontSize: 22, fontWeight: 500, color: '#f4f4f5', marginBottom: 16, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
        {problem.title}
      </h3>

      <p style={{ color: '#6b6b7a', fontSize: 16, lineHeight: 1.6, marginBottom: 32, fontWeight: 300 }}>
        {problem.description}
      </p>

      <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 500, color: '#34d399' }}>
            {problem.solution}
          </span>
        </div>
        <div style={{ color: '#6b6b7a', transition: 'all 0.3s ease' }} className="group-hover:text-white group-hover:translate-x-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function PainSection() {
  return (
    <section className="relative w-full py-32 bg-[#0a0a0c] overflow-hidden">
      <div style={GLOBAL_LAYOUT.containerStyle}>
        <SectionHeader 
          label="The Procurement Problem"
          title={
            <>
              Your procurement is scattered <br />
              <span style={{ color: '#6b6b7a', fontWeight: 300 }}>across a dozen tools</span>
            </>
          }
          description="Most enterprises stitch together 5+ tools to manage buying. Data is siloed. Decisions are blind. Cycles take weeks. FactWise unifies it all."
          accentColor="#ff5f56"
        />

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {problems.map((p, i) => (
            <ProblemCard key={i} problem={p} index={i} />
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7c5cfc]/[0.02] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ff5f56]/[0.02] blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}

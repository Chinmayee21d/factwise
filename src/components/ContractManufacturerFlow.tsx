'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Trophy, 
  CheckCircle2, 
  RefreshCcw, 
  Target,
  ChevronRight,
  TrendingUp,
  Clock,
  Zap,
  Layers,
  ClipboardList,
  Send,
  MessageCircle,
  Tag,
  FileCheck,
  PackageCheck,
  ArrowRight,
  ShieldCheck,
  Activity
} from 'lucide-react';
import './ContractManufacturerFlow.css';

interface FlowStep {
  id: number;
  title: string;
  description: string;
  visualTitle: string;
  icon: React.ReactNode;
  color: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: 0,
    title: 'Customer order',
    description: 'A customer sends an RfQ asking for a manufacturing price. The sales team logs the request in FactWise, uploads the BOM, and opens a quote project — all in one place.',
    visualTitle: 'Incoming Request Management',
    icon: <ClipboardList size={18} />,
    color: '#06b6d4'
  },
  {
    id: 1,
    title: 'RfQ to vendors',
    description: 'Operations float RfQs to all relevant vendors for every Class A and B component in one click. Class C prices auto-fill from existing contracts. No manual chasing — FactWise follows up automatically.',
    visualTitle: 'Smart Sourcing Distribution',
    icon: <Send size={18} />,
    color: '#06b6d4'
  },
  {
    id: 2,
    title: 'Negotiate',
    description: 'Vendors respond with prices. Operations negotiate using real-time market data, spend aggregation, and price anchoring — always from a position of data, not gut feel.',
    visualTitle: 'Real-time Bid Analysis',
    icon: <MessageCircle size={18} />,
    color: '#06b6d4'
  },
  {
    id: 3,
    title: 'PO prices',
    description: 'Negotiations close. FactWise identifies the cheapest vendor for every item using full landed cost — BCD, SWS, NRE, clearance, freight — not just unit price. These prices feed directly into the quote.',
    visualTitle: 'Landed Cost Finalization',
    icon: <Tag size={18} />,
    color: '#06b6d4'
  },
  {
    id: 4,
    title: 'Quote',
    description: 'FactWise auto-builds the customer quote from the sourced vendor prices. Value-added, NRE, and engineering costs are layered on using custom formulas. A fully accurate multi-currency quote — generated automatically.',
    visualTitle: 'Customer Quote Generation',
    icon: <FileCheck size={18} />,
    color: '#06b6d4'
  },
  {
    id: 5,
    title: 'Decision',
    description: 'The final quote is sent to the customer from FactWise. They make their award decision — won or lost — and the project status updates instantly. If won, the system triggers operational execution immediately.',
    visualTitle: 'Award Decision Tracking',
    icon: <CheckCircle2 size={18} />,
    color: '#10b981'
  },
  {
    id: 6,
    title: 'Vendor POs',
    description: 'POs are issued to all shortlisted vendors in 2 clicks directly from the won quote. Requisitions are auto-created, BOMs sync to SAP, and the standard operational flow begins immediately.',
    visualTitle: 'Automated PO Execution',
    icon: <PackageCheck size={18} />,
    color: '#06b6d4'
  },
];

/* ── UI Components ── */

const DashboardHeader = ({ title }: { title: string }) => (
  <div className="cmf-visual-header">
    <div className="cmf-window-controls">
      <motion.div className="cmf-dot red" whileHover={{ scale: 1.2 }}></motion.div>
      <motion.div className="cmf-dot yellow" whileHover={{ scale: 1.2 }}></motion.div>
      <motion.div className="cmf-dot green" whileHover={{ scale: 1.2 }}></motion.div>
    </div>
    <div className="cmf-breadcrumb">
      <span className="cmf-breadcrumb-item">FactWise CMS</span>
      <ChevronRight size={10} className="cmf-breadcrumb-sep" />
      <span className="cmf-breadcrumb-item active">{title}</span>
    </div>
    <div className="cmf-user-avatar">
      <motion.div 
        className="cmf-dot cyan-pulse"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      ></motion.div>
      <Activity size={12} className="text-cyan" />
    </div>
  </div>
);

const StatsRow = ({ stats }: { stats: { label: string; val: string; trend?: string }[] }) => (
  <div className="cmf-stats-row">
    {stats.map((stat, i) => (
      <motion.div 
        key={i} 
        className="cmf-stat-card"
        whileHover={{ y: -4, borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(255, 255, 255, 0.04)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        <div className="cmf-stat-info">
          <div className="cmf-label">{stat.label}</div>
          <div className="cmf-val">{stat.val}</div>
        </div>
        {stat.trend && (
          <div className="cmf-stat-trend positive">
            <TrendingUp size={10} />
            <span>{stat.trend}</span>
          </div>
        )}
      </motion.div>
    ))}
  </div>
);

/* ── Mockup Step Components ── */

const CustomerOrderMockup = () => (
  <div className="cmf-dashboard-layout">
    <StatsRow stats={[
      { label: 'Active Projects', val: '12', trend: '+14%' },
      { label: 'Pending Quotes', val: '08' },
      { label: 'Avg BOM Size', val: '2.4k' },
      { label: 'Sales Velocity', val: '+24%', trend: 'High' }
    ]} />
    <div className="cmf-main-grid">
      <motion.div 
        className="cmf-panel"
        whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.4)' }}
      >
        <div className="cmf-panel-header">
          <span className="cmf-tag-cyan">NEW INQUIRY</span>
          <MessageSquare size={14} className="text-cyan" />
        </div>
        <h4 className="cmf-panel-title">Continental AG - EMS Project</h4>
        <div className="cmf-panel-list">
          <div className="cmf-mockup-item"><span>Customer</span> <span className="text-white">Continental AG</span></div>
          <div className="cmf-mockup-item"><span>Priority</span> <span className="text-cyan">High</span></div>
          <div className="cmf-mockup-item"><span>BOM Type</span> <span className="text-white">Complex PCBA</span></div>
        </div>
      </motion.div>
      <motion.div 
        className="cmf-panel"
        whileHover={{ y: -5, borderColor: 'rgba(16, 185, 129, 0.4)' }}
      >
        <div className="cmf-panel-header">
          <span className="cmf-tag-green">BOM UPLOADED</span>
          <RefreshCcw size={14} className="text-green-500 animate-spin-slow" />
        </div>
        <div className="cmf-bom-visual">
          <div className="cmf-bom-progress">
            <motion.div 
              className="cmf-progress-bar"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

          </div>
          <span className="cmf-bom-stats">3,240 items identified</span>
        </div>
        <div className="cmf-mini-sync">
          <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ShieldCheck size={10} className="text-green-500" />
          </motion.div>
          <span>Hierarchy mapping active...</span>
        </div>
      </motion.div>
    </div>
  </div>
);

const RfQVendorsMockup = () => (
  <div className="cmf-dashboard-layout">
    <StatsRow stats={[
      { label: 'Vendors Reached', val: '48', trend: 'Auto' },
      { label: 'Auto-fill Rate', val: '64%' },
      { label: 'Sourcing Events', val: '05' },
      { label: 'Time Saved', val: '18h', trend: 'Saved' }
    ]} />
    <div className="cmf-main-grid">
      <motion.div 
        className="cmf-panel"
        whileHover={{ scale: 1.02 }}
      >
        <div className="cmf-panel-header">
          <span className="cmf-tag-cyan">DISTRIBUTION</span>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Zap size={14} className="text-cyan fill-cyan" />
          </motion.div>
        </div>
        <div className="cmf-panel-list">
          {[
            { cat: 'Class A (Critical)', count: '12 Vendors', status: 'SENT' },
            { cat: 'Class B (Strategic)', count: '24 Vendors', status: 'SENT' },
            { cat: 'Class C (Standard)', count: 'Direct Link', status: 'AUTO' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              className="cmf-mockup-item"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="po-details">
                <span className="po-id">{item.cat}</span>
                <span className="po-vendor">{item.count}</span>
              </div>
              <span className="text-cyan font-bold">{item.status}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div 
        className="cmf-panel"
        whileHover={{ scale: 1.02 }}
      >
        <div className="cmf-panel-header">
          <span className="cmf-tag-accent">SMART FOLLOW-UPS</span>
          <Clock size={14} className="text-amber-500" />
        </div>
        <div className="cmf-mini-stats">
          <div className="cmf-mini-stat">
            <span className="label">Sent</span>
            <span className="val">48</span>
          </div>
          <div className="cmf-mini-stat">
            <span className="label">Open</span>
            <span className="val">32</span>
          </div>
        </div>
        <div className="cmf-mini-sync">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
            <RefreshCcw size={10} />
          </motion.div>
          <span>4 auto-reminders active</span>
        </div>
      </motion.div>
    </div>
  </div>
);

const NegotiateMockup = () => (
  <div className="cmf-dashboard-layout">
    <StatsRow stats={[
      { label: 'Bid Variance', val: '18%', trend: 'Decr.' },
      { label: 'Negotiation Rd', val: '02' },
      { label: 'Aggregated Vol', val: '1.2M' },
      { label: 'Target Price', val: '$4.20', trend: 'Locked' }
    ]} />
    <div className="cmf-main-grid">
      <motion.div 
        className="cmf-panel col-span-2"
        whileHover={{ borderColor: 'rgba(6, 182, 212, 0.4)' }}
      >
        <div className="cmf-panel-header">
          <span className="cmf-tag-cyan">REAL-TIME BID ANALYSIS</span>
          <Target size={14} className="text-cyan" />
        </div>
        <div className="cmf-chart-container">
          {[40, 65, 30, 85, 55, 95, 70, 45].map((h, i) => (
            <div key={i} className="cmf-chart-bar-wrapper">
              <motion.div 
                className={`cmf-chart-bar ${i === 5 ? 'active' : ''}`}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                whileHover={{ scaleX: 1.1 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: "backOut" }}
              />
              <span className="cmf-chart-label">V{i+1}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

const POPricesMockup = () => (
  <div className="cmf-dashboard-layout">
    <StatsRow stats={[
      { label: 'Landed Savings', val: '$42k', trend: 'Actual' },
      { label: 'Freight Est.', val: '$5.2k' },
      { label: 'Duty Impact', val: '12.4%' },
      { label: 'Final Margin', val: '18.2%', trend: '+4.2%' }
    ]} />
    <div className="cmf-main-grid">
      <motion.div className="cmf-panel" whileHover={{ x: 5 }}>
        <div className="cmf-panel-header">
          <span className="cmf-tag-cyan">COST BREAKDOWN</span>
        </div>
        <div className="cmf-panel-list">
          <div className="cmf-mockup-item"><span>Base Price</span> <span className="text-white">$142.00</span></div>
          <div className="cmf-mockup-item"><span>BCD + SWS</span> <span className="text-accent">+$12.40</span></div>
          <div className="cmf-mockup-item"><span>Freight & Clear.</span> <span className="text-accent">+$5.20</span></div>
          <motion.div 
            className="cmf-mockup-item border-t border-white/5 pt-2 mt-2"
            animate={{ background: ['rgba(6, 182, 212, 0)', 'rgba(6, 182, 212, 0.05)', 'rgba(6, 182, 212, 0)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="font-bold text-white">Final Landed</span>
            <span className="font-bold text-cyan">$159.60</span>
          </motion.div>
        </div>
      </motion.div>
      <motion.div 
        className="cmf-panel"
        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
      >
        <div className="cmf-panel-header">
          <span className="cmf-tag-green">BEST VENDOR</span>
        </div>
        <div className="flex flex-col items-center justify-center h-full py-4">
          <motion.div 
            className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy size={24} />
          </motion.div>
          <span className="font-bold text-white text-lg">Delta Dynamics</span>
          <span className="text-xs text-gray-500 mt-1">94% Fit Score • Optimized</span>
        </div>
      </motion.div>
    </div>
  </div>
);

const QuoteMockup = () => (
  <div className="cmf-dashboard-layout">
    <StatsRow stats={[
      { label: 'Quotes Issued', val: '142', trend: '+12' },
      { label: 'Win Rate', val: '32%' },
      { label: 'Avg Turnaround', val: '4.2h' },
      { label: 'Quote Value', val: '$478k', trend: 'Projected' }
    ]} />
    <div className="cmf-main-grid">
      <motion.div 
        className="cmf-panel col-span-2 quote-sheet"
        whileHover={{ y: -5, rotateX: 2, rotateY: -1 }}
        style={{ perspective: 1000 }}
      >
        <div className="cmf-panel-header">
          <span className="cmf-tag-cyan">CUSTOMER PROPOSAL</span>
        </div>
        <div className="quote-content">
          <div className="quote-header">
            <div className="quote-id">#FW-2024-001</div>
            <div className="quote-title text-black">Continental AG Proposal</div>
          </div>
          <div className="quote-items">
            <div className="cmf-mockup-item text-gray-600"><span>Materials Cost</span> <span>$442,000.00</span></div>
            <div className="cmf-mockup-item text-gray-600"><span>Value Added (VA)</span> <span>$24,500.00</span></div>
            <div className="cmf-mockup-item text-gray-600"><span>Engineering NRE</span> <span>$12,000.00</span></div>
          </div>
          <motion.div 
            className="quote-total text-black"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            <span>TOTAL QUOTE</span>
            <span className="text-cyan">$478,500.00</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
);

const DecisionMockup = () => (
  <div className="cmf-dashboard-layout">
    <div className="cmf-main-grid h-full">
      <motion.div 
        className="cmf-panel col-span-2 flex items-center justify-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex flex-col items-center text-center max-w-sm">
          <motion.div 
            className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-8 shadow-[0_0_40px_rgba(34,197,94,0.15)]"
            animate={{ 
              scale: [1, 1.1, 1], 
              rotate: [0, 5, -5, 0],
              boxShadow: [
                '0 0 20px rgba(34,197,94,0.1)',
                '0 0 50px rgba(34,197,94,0.3)',
                '0 0 20px rgba(34,197,94,0.1)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <CheckCircle2 size={48} />
          </motion.div>
          <motion.h4 
            className="text-3xl font-bold text-white mb-3"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Project Awarded
          </motion.h4>
          <p className="text-gray-400 text-sm mb-10 leading-relaxed">
            Continental AG has officially awarded the EMS Project-2024. All contract terms verified and synced.
          </p>
          <motion.div 
            className="bg-cyan-500/10 text-cyan px-8 py-4 rounded-2xl border border-cyan-500/20 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3"
            whileHover={{ scale: 1.05, background: 'rgba(6, 182, 212, 0.2)' }}
          >
            <Zap size={14} className="fill-cyan" />
            Triggering Execution Flow
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
);

const VendorPOMockup = () => (
  <div className="cmf-dashboard-layout">
    <StatsRow stats={[
      { label: 'POs Issued', val: '42', trend: 'Auto' },
      { label: 'Vendor Accepts', val: '38' },
      { label: 'SAP Sync', val: 'Active' },
      { label: 'Avg Lead Time', val: '14d', trend: 'Stable' }
    ]} />
    <div className="cmf-main-grid">
      <motion.div className="cmf-panel" whileHover={{ y: -5 }}>
        <div className="cmf-panel-header">
          <span className="cmf-tag-cyan">AUTOMATED POs</span>
        </div>
        <div className="cmf-panel-list">
          {[
            { id: 'PO #9012', vendor: 'Delta Dyn.', status: 'SENT' },
            { id: 'PO #9013', vendor: 'Global Cir.', status: 'SENT' },
            { id: 'PO #9014', vendor: 'Apex Ind.', status: 'SENT' },
          ].map((po, i) => (
            <motion.div 
              key={i} 
              className="cmf-mockup-item"
              whileHover={{ x: 5, color: '#fff' }}
            >
              <div className="po-details">
                <span className="po-id">{po.id}</span>
                <span className="po-vendor">{po.vendor}</span>
              </div>
              <span className="text-green-500 font-bold">SENT</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div 
        className="cmf-panel"
        whileHover={{ y: -5 }}
      >
        <div className="cmf-panel-header">
          <span className="cmf-tag-green">ERP SYNC</span>
        </div>
        <div className="flex flex-col items-center justify-center h-full py-4">
          <motion.div 
            className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <RefreshCcw size={28} />
          </motion.div>
          <span className="font-bold text-white text-lg">SAP S/4HANA</span>
          <span className="text-xs text-gray-500 mt-1">BOM Hierarchy & Price Sync Active</span>
        </div>
      </motion.div>
    </div>
  </div>
);

const MOCKUPS = [
  <CustomerOrderMockup />,
  <RfQVendorsMockup />,
  <NegotiateMockup />,
  <POPricesMockup />,
  <QuoteMockup />,
  <DecisionMockup />,
  <VendorPOMockup />
];

const ContractManufacturerFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="cmf-section" ref={sectionRef}>
      <div className="cmf-container">
        <div className="cmf-header reveal">
          <span className="cmf-eyebrow">Contract manufacturer flow</span>
          <h2 className="cmf-heading">
            From customer order to vendor POs — <strong>automated</strong>
          </h2>
          <p className="cmf-subheading">
            FactWise connects your selling and buying in one platform. Vendor prices build your customer quote automatically — no Excel, no manual transfer, no errors.
          </p>
        </div>

        <div className="cmf-dashboard-wrapper reveal">
          <div className="cmf-step-navigator">
            {FLOW_STEPS.map((step, i) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={`cmf-step-btn ${activeStep === i ? 'active' : ''}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="cmf-btn-icon"
                  animate={activeStep === i ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {step.icon}
                </motion.div>
                <div className="cmf-btn-content">
                  <span className="cmf-btn-title">{step.title}</span>
                </div>
                {activeStep === i && (
                  <motion.div 
                    layoutId="cmf-active-indicator"
                    className="cmf-active-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="cmf-full-dashboard">
            <motion.div 
              className="cmf-dashboard-frame"
              layout
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <DashboardHeader title={FLOW_STEPS[activeStep].visualTitle} />
              
              <div className="cmf-dashboard-body">
                <div className="cmf-dashboard-sidebar">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeStep}
                      className="cmf-sidebar-section"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="cmf-sidebar-label" style={{ color: FLOW_STEPS[activeStep].color }}>Process Step</span>
                      <h3 className="cmf-sidebar-title">{FLOW_STEPS[activeStep].title}</h3>
                      <p className="cmf-sidebar-desc">{FLOW_STEPS[activeStep].description}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="cmf-sidebar-footer">
                    <motion.div 
                      className="cmf-engine-status"
                      animate={{ background: activeStep === 5 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(6, 182, 212, 0.05)', color: activeStep === 5 ? '#10b981' : '#06b6d4' }}
                    >
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap size={12} className="fill-current" />
                      </motion.div>
                      <span>CMS ENGINE ACTIVE</span>
                    </motion.div>
                  </div>
                </div>

                <div className="cmf-dashboard-main">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      {MOCKUPS[activeStep]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Dynamic Glow sync with active step color */}
            <motion.div 
              className="cmf-dashboard-glow"
              animate={{ 
                background: `radial-gradient(circle, ${activeStep === 5 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(6, 182, 212, 0.1)'} 0%, transparent 70%)`
              }}
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractManufacturerFlow;

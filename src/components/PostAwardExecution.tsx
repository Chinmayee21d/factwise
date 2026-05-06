'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, ShoppingBag, Activity, CreditCard, CheckCircle2, ShieldCheck, ArrowUpRight, Users } from 'lucide-react';
import './PostAwardExecution.css';

const PostAwardExecution: React.FC = () => {
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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section className="pae-section" ref={sectionRef}>
      <div className="pae-container">
        {/* Header Row */}
        <div className="pae-header-grid">
          <div className="reveal">
            <span className="pae-eyebrow">Post-award execution flow</span>
            <h2 className="pae-heading">
              From won quote to payment — <strong>without the chaos</strong>
            </h2>
          </div>
          <div className="reveal pae-subheading-container">
            <p className="pae-subheading">
              Once a quote is won, FactWise takes over. POs are issued, goods are tracked, 
              invoices are validated, and payments are released — all in one connected flow.
            </p>
          </div>
        </div>

        {/* Unified Dashboard Visual */}
        <div className="pae-visual-wrapper reveal">
          <div className="pae-visual-header">
            <div className="pae-window-controls">
              <div className="pae-dot red"></div>
              <div className="pae-dot yellow"></div>
              <div className="pae-dot green"></div>
            </div>
            <span className="pae-visual-title">FACTWISE EXECUTION ENGINE</span>
            <div className="pae-user-avatar">
              <div className="pae-dot green-pulse"></div>
              <Users size={12} />
            </div>
          </div>
          
          <div className="pae-dashboard-content">
            {/* Top Stats Bar */}
            <motion.div 
              className="pae-stats-row"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { label: 'Active Orders', val: '74' },
                { label: 'Total Spend', val: '$2.4M' },
                { label: 'Vendor Perf.', val: '94%' },
                { label: 'Automation', val: '88%' }
              ].map((stat, i) => (
                <motion.div key={i} className="pae-stat-card" variants={itemVariants}>
                  <div className="pae-label">{stat.label}</div>
                  <div className="pae-val">{stat.val}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Grid Panels */}
            <motion.div 
              className="pae-dashboard-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Left: Won Quote Panel */}
              <motion.div className="pae-panel won-quote" variants={itemVariants}>
                <div className="pae-panel-header">
                  <span className="pae-tag-green">WON QUOTE</span>
                  <ShieldCheck size={14} className="text-accent" />
                </div>
                <h4 className="pae-panel-title">RFQ #2941 - Server Hardware</h4>
                <div className="pae-panel-list">
                  <div className="pae-list-item"><span>Status</span> <span className="text-green">Awarded</span></div>
                  <div className="pae-list-item"><span>Vendor</span> <span>Delta Dynamics</span></div>
                  <div className="pae-list-item"><span>Items</span> <span>12 BOM Items</span></div>
                </div>
                <div className="pae-mini-sync">
                  <div className="pae-dot green-pulse"></div>
                  <span>Syncing to SAP...</span>
                </div>
              </motion.div>

              {/* Middle: PO Queue Panel */}
              <motion.div className="pae-panel po-queue" variants={itemVariants}>
                <div className="pae-panel-header">
                  <span className="pae-tag-accent">AUTOMATED POs</span>
                </div>
                <div className="pae-panel-list">
                  {[
                    { id: 'PO #5012', vendor: 'Sentinel Inc.', status: 'SENT' },
                    { id: 'PO #5013', vendor: 'Apex Corp.', status: 'SENT' },
                    { id: 'PO #5014', vendor: 'Global Tech', status: 'PENDING' },
                  ].map((po, i) => (
                    <div key={i} className="pae-list-item po-item">
                      <div className="po-details">
                        <span className="po-id">{po.id}</span>
                        <span className="po-vendor">{po.vendor}</span>
                      </div>
                      <span className={`po-status ${po.status === 'SENT' ? 'text-green' : 'text-accent'}`}>
                        {po.status === 'SENT' ? '✓' : '●'}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Payment/Success Panel */}
              <motion.div className="pae-panel success-panel" variants={itemVariants}>
                <motion.div 
                  className="pae-success-circle"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle2 size={24} />
                </motion.div>
                <h4 className="pae-panel-title" style={{ textAlign: 'center', marginTop: '12px' }}>Payment Successful</h4>
                <div className="pae-panel-list" style={{ marginTop: '16px' }}>
                  <div className="pae-list-item"><span>Inv #8839</span> <span className="text-white">$41,200.00</span></div>
                  <div className="pae-list-item"><span>4-Way Match</span> <span className="text-green">Verified</span></div>
                </div>
                <button className="pae-panel-btn group">
                  View Audit Trail 
                  <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Feature Grid (Static) */}
        <div className="pae-feature-grid reveal">
          {[
            { icon: Zap, title: 'Award to Execution', desc: 'Project status updates instantly. BOMs finalize and requisitions are auto-created with SAP sync.' },
            { icon: ShoppingBag, title: '2-Click PO Issuance', desc: 'Generate vendor POs across the entire BOM directly from the won quote. Vendors accept in-app.' },
            { icon: Activity, title: '4-Way Match Ops', desc: 'Quadruple validation across GR, QC, Invoice, and PO. Auto-hold on any mismatches.' },
            { icon: CreditCard, title: 'Flexible Payments', desc: 'Release partial or combined payments with full audit trails. Dual notifications enabled.' }
          ].map((item, i) => (
            <div key={i} className="pae-feature-card hover-lift">
              <div className="pae-icon-header">
                <item.icon className="pae-icon" size={18} />
                <h3 className="pae-feature-title">{item.title}</h3>
              </div>
              <p className="pae-feature-text">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostAwardExecution;

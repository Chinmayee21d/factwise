'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BrowserChrome, FeatureLayout, FeatureSectionData } from './Shared';
import { Package, Truck, ShieldCheck, AlertCircle, Search } from 'lucide-react';

const GoodsReceiptMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const receipts = [
    { id: 'GR-4412', po: 'PO-0387', vendor: 'Global Tech', items: 5, status: 'Received', color: '#34d399' },
    { id: 'GR-4413', po: 'PO-0412', vendor: 'Zenith Sys', items: 12, status: 'Inspecting', color: '#7c5cfc' },
    { id: 'GR-4414', po: 'PO-0299', vendor: 'OfficeMax', items: 24, status: 'Shortage', color: '#f59e0b' },
  ];

  return (
    <div style={{ paddingTop: '100px', perspective: '1200px' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 180, scale: 0.95, rotateY: -10, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 1.4, ease: [0.32, 0.72, 0, 1], x: { type: 'spring', stiffness: 40, damping: 12 } }}
        style={{
          background: 'linear-gradient(145deg, #0a0a0c 0%, #111116 100%)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          boxShadow: '0 50px 140px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.05)',
          fontFamily: 'Inter, sans-serif',
          transformStyle: 'preserve-3d',
        }}
      >
        <BrowserChrome url="factwise.io/receiving/dashboard" />

        <div style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(52,211,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={20} color="#34d399" />
              </div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#f4f4f5' }}>Goods Receiving</h4>
                <p style={{ fontSize: 12, color: '#6b6b7a', marginTop: 2 }}>3 shipments arriving today</p>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#3f3f46' }} size={14} />
              <input 
                type="text" 
                placeholder="Search PO or Vendor..." 
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '6px 12px 6px 32px', fontSize: 12, color: '#f4f4f5', width: 200 }}
                readOnly
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {receipts.map((gr, i) => (
              <motion.div
                key={gr.id}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.05)', 
                  borderRadius: 12, 
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#f4f4f5' }}>{gr.id}</div>
                  <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.05)' }} />
                  <div>
                    <div style={{ fontSize: 12, color: '#f4f4f5' }}>{gr.vendor}</div>
                    <div style={{ fontSize: 10, color: '#6b6b7a' }}>{gr.po} · {gr.items} items</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                   <div style={{ fontSize: 11, color: gr.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em', background: `${gr.color}15`, padding: '3px 10px', borderRadius: 6 }}>
                     {gr.status}
                   </div>
                   <div style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b6b7a' }}>
                     <Search size={14} />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Inspection Detail Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.32, 0.72, 0, 1] }}
            style={{ 
              marginTop: 24, 
              background: '#0a0a0c', 
              border: '1px solid rgba(124,92,252,0.3)', 
              borderRadius: 16, 
              padding: '20px',
              boxShadow: '0 20px 40px rgba(124,92,252,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <ShieldCheck size={18} color="#34d399" />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#f4f4f5' }}>Quality Inspection Result</span>
              </div>
              <span style={{ fontSize: 12, color: '#34d399', fontWeight: 600 }}>PASSED</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 10 }}>
                <div style={{ fontSize: 9, color: '#6b6b7a', marginBottom: 2 }}>ACCEPTED</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f4f4f5' }}>4,980</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 10 }}>
                <div style={{ fontSize: 9, color: '#6b6b7a', marginBottom: 2 }}>REJECTED</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f4f4f5' }}>20</div>
              </div>
              <div style={{ background: 'rgba(245,158,11,0.05)', padding: '10px', borderRadius: 10, border: '1px solid rgba(245,158,11,0.2)' }}>
                <div style={{ fontSize: 9, color: '#f59e0b', marginBottom: 2 }}>DAMAGED</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>3</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const GOODS_RECEIPT_DATA: FeatureSectionData = {
  id: 'receiving',
  badge: 'Module 06: Goods Receipt',
  badgeColor: '#34d399',
  title: 'Receiving and\ninspection.',
  description: 'Close the loop on your procurement cycle. Verify shipments, perform quality inspections, and trigger automatic payments — all from a single interface.',
  features: [
    { icon: '📦', label: 'Real-time receiving', desc: 'Scan items as they arrive and verify against the original PO instantly. Flag shortages or damages with one tap.' },
    { icon: '🛡️', label: 'Quality control', desc: 'Embedded inspection workflows ensure that only items meeting your quality standards are accepted into inventory.' },
    { icon: '💸', label: 'Payment triggering', desc: 'A successful goods receipt automatically updates the invoice status and triggers the 4-way match for payment.' },
  ],
  mockup: <GoodsReceiptMockup />,
  align: 'right',
  orbColor1: 'rgba(52,211,153,0.12)',
  orbColor2: 'rgba(124,92,252,0.08)',
};

export default function GoodsReceiptSection() {
  return <FeatureLayout section={GOODS_RECEIPT_DATA} />;
}

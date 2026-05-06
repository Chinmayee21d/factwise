'use client';

import React from 'react';
import PlatformTemplate from '@/components/platform/PlatformTemplate';
import { 
  POApprovalMockup, 
  DeliveryScheduleMockup, 
  PORevisionMockup, 
  BulkPOMockup 
} from '@/components/platform/POMockups';
import { Briefcase, FileText, LayoutGrid, RotateCcw, Truck, Layers, Zap } from 'lucide-react';

export default function PurchaseOrdersPage() {
  return (
    <PlatformTemplate
      hero={{
        h1: "Manage every purchase order with full control",
        subheadline: "From sourcing award to vendor acceptance, delivery tracking, and amendments — every PO has a complete history, approval chain, and audit trail.",
        primaryCTA: { text: "Request Demo", href: "/demo" },
        secondaryCTA: { text: "See Platform Overview", href: "/platform" },
        visual: (
          <div className="p-10 w-full h-full flex flex-col gap-8 bg-[#0d0d14] relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#4b8bff]/20 flex items-center justify-center border border-[#4b8bff]/30">
                  <Briefcase className="text-[#4b8bff]" size={24} />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">PO #8842-X</div>
                  <div className="text-[10px] text-[#4b8bff] uppercase tracking-[0.2em] font-black">In Approval Chain</div>
                </div>
              </div>
              <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-[#4b8bff]" />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {[
                { label: 'Total Value', val: '$124,500.00', color: 'text-white' },
                { label: 'Vendor', val: 'Global Micro Corp', color: 'text-[#4b8bff]' },
                { label: 'Expected Date', val: 'Nov 12, 2024', color: 'text-white/60' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.label}</span>
                  <span className={`text-sm font-bold ${item.color}`}>{item.val}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto flex gap-4 relative z-10">
              <div className="flex-1 py-4 rounded-2xl bg-[#4b8bff] text-white text-center font-bold text-sm shadow-[0_0_30px_rgba(75,139,255,0.3)] hover:scale-[1.02] transition-transform cursor-pointer">
                Approve PO
              </div>
              <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-colors cursor-pointer">
                Revise
              </div>
            </div>
          </div>
        )
      }}
      comparison={{
        old: [
          "POs created manually in ERP, emailed as static PDFs",
          "Amendments tracked by version number in filenames",
          "Delivery dates tracked in separate disconnected sheets",
          "Opaque approval status requiring constant follow-ups"
        ],
        new: [
          "Auto-generated from RFQ awards with one click",
          "Full version chain; every revision linked and auditable",
          "Granular delivery schedules per line item with tracking",
          "Real-time visual approval routes with automated triggers"
        ]
      }}
      capabilities={{
        title: "Precision at scale",
        description: "Standardize your purchasing operations with automated workflows and enterprise-grade visibility that eliminates manual errors.",
        cards: [
          {
            title: "Auto-PO from Awards",
            description: "When you award an RFQ, POs are created automatically — pre-filled with all negotiated terms and conditions.",
            visual: (
              <div className="flex items-center justify-center h-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent" />
                <Zap size={64} className="text-green-400 opacity-50 animate-pulse" />
              </div>
            )
          },
          {
            title: "Multi-Level Approval",
            description: "Route POs through configurable approval chains based on value thresholds, department rules, and risk levels.",
            visual: <POApprovalMockup />
          },
          {
            title: "PO Revision / Amendment",
            description: "Revise issued POs with full version tracking. All versions linked and preserved for audit and historical review.",
            visual: <PORevisionMockup />
          },
          {
            title: "Delivery Schedules",
            description: "Per-delivery-date line items on every PO with real-time fulfillment tracking and vendor-portal confirmations.",
            visual: <DeliveryScheduleMockup />
          },
          {
            title: "Bulk PO Operations",
            description: "Consolidated batch processing and bulk creation from file upload (CSV/Excel) for recurring operations.",
            visual: <BulkPOMockup />
          },
          {
            title: "Direct PO issuance",
            description: "Create POs directly for repeat purchases or catalogue items with the same tracking and approval capabilities.",
            visual: (
              <div className="flex items-center justify-center h-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#4b8bff]/10 to-transparent" />
                <FileText size={64} className="text-[#4b8bff] opacity-50" />
              </div>
            )
          }
        ]
      }}
      workflow={{
        title: "The PO Lifecycle",
        steps: [
          { title: "Auto-Create", description: "PO generated instantly from RFQ award with all terms pre-filled." },
          { title: "Approval", description: "Criteria-based multi-level sign-off triggered across the organization." },
          { title: "Issuance", description: "Digital PO sent to vendor portal; track acceptance or negotiation." },
          { title: "Fulfillment", description: "Track delivery schedules, line-item receipts, and quality checks." },
          { title: "Archive", description: "Invoicing matched and full audit trail archived for compliance." }
        ]
      }}
      features={[
        "Granular hold and termination workflows",
        "15+ PO statuses for end-to-end visibility",
        "Automated prepayment invoice generation",
        "Quantity reversion on rescinded or failed POs",
        "PO grouping for consolidated staging & logistics",
        "In-line collaborative comments for teams",
        "Encrypted Barcode and QR code generation",
        "Enterprise-ready Export to Excel & PDF"
      ]}
      personas={{
        title: "Control for every team",
        items: [
          { 
            role: "Operations Manager", 
            quote: "I finally have real-time visibility into our incoming materials. We can plan production schedules with confidence knowing exactly when POs will arrive." 
          },
          { 
            role: "Finance Controller", 
            quote: "The multi-level approval chain and revision history are critical for our audit compliance. Every dollar spent is tracked and justified." 
          }
        ]
      }}
      relatedModules={[
        { name: "Strategic Sourcing", href: "/platform/sourcing" },
        { name: "Invoicing & Payments", href: "/platform/invoicing-payments" },
        { name: "Goods Receipt & Quality", href: "/platform/goods-receipt-quality" },
        { name: "Supplier Management", href: "/platform/supplier-management" }
      ]}
      ctaBanner={{
        text: "See automated PO creation in action",
        btnText: "Request Demo",
        btnHref: "/demo"
      }}
    />
  );
}

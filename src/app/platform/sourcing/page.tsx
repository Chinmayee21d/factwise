'use client';

import React from 'react';
import PlatformTemplate from '@/components/platform/PlatformTemplate';
import { 
  MultiRoundMockup, 
  LandedCostMockup, 
  BOMMockup, 
  SplitMockup 
} from '@/components/platform/SourcingMockups';
import { ShieldCheck, Bell } from 'lucide-react';

export default function StrategicSourcingPage() {
  return (
    <PlatformTemplate
      hero={{
        h1: "Find the best suppliers at the best price",
        subheadline: "Run structured sourcing events, collect competitive bids, and award — all in one unified ecosystem with full revision history.",
        primaryCTA: { text: "Request Demo", href: "/demo" },
        secondaryCTA: { text: "Learn More", href: "#capabilities" },
        visual: (
          <div className="p-10 w-full h-full flex flex-col gap-8 bg-[#0d0d14] relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-10" />
            <div className="flex justify-between items-center relative z-10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 rounded-full text-[9px] font-bold uppercase tracking-widest">Active RFQ</div>
            </div>
            
            <div className="space-y-4 relative z-10">
              {[
                { name: 'Supplier A', bid: '$12,400', status: 'Leading', color: 'text-[#7c5cfc]' },
                { name: 'Supplier B', bid: '$13,100', status: 'Competitive', color: 'text-gray-500' }
              ].map((s, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center group">
                  <div>
                    <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-1">{s.name}</div>
                    <div className="text-xl font-mono font-bold text-white/90">{s.bid}</div>
                  </div>
                  <div className={`text-[9px] uppercase tracking-[0.2em] font-bold ${s.color}`}>
                    {s.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-white/5">
              <div className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-center font-bold text-xs uppercase tracking-widest">
                Compare Proposals
              </div>
            </div>
          </div>
        )
      }}
      comparison={{
        old: [
          "RFQs sent via fragmented email chains",
          "Quotes collected in disconnected Excel files",
          "Manual comparison prone to data errors",
          "Lack of digital audit trails for negotiation"
        ],
        new: [
          "Centralized platform for all vendor interactions",
          "Real-time side-by-side bid comparison",
          "Automated landed cost modeling for true TCO",
          "Complete version-controlled audit history"
        ]
      }}
      capabilities={{
        title: "Sourcing Excellence",
        description: "Transform your supply chain lifecycle with a structured, competitive process designed for precision and speed.",
        cards: [
          {
            title: "Multi-Round Bidding",
            description: "Preserve the complete negotiation chain with structured counter-offers and live bid updates.",
            visual: <MultiRoundMockup />
          },
          {
            title: "BOM Roll-up",
            description: "Source entire bills of materials with complex sub-assemblies and automated cost aggregation.",
            visual: <BOMMockup />
          },
          {
            title: "Landed Costing",
            description: "Model logistics, duties, and insurance to identify the true total cost of ownership.",
            visual: <LandedCostMockup />
          },
          {
            title: "N-Vendor Split",
            description: "Optimize for risk and cost with algorithmic order allocation across your supplier base.",
            visual: <SplitMockup />
          },
          {
            title: "Sealed Bidding",
            description: "Ensure transparency and fairness with secure proxy and blind bidding capabilities.",
            visual: (
              <div className="flex items-center justify-center h-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#7c5cfc]/5 to-transparent" />
                <ShieldCheck size={48} className="text-[#7c5cfc] opacity-30" />
              </div>
            )
          },
          {
            title: "Smart Reminders",
            description: "Automate supplier follow-ups with configurable intervals to ensure timely submissions.",
            visual: (
              <div className="flex items-center justify-center h-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent" />
                <Bell size={48} className="text-white/20" />
              </div>
            )
          }
        ]
      }}
      workflow={{
        title: "The Sourcing Lifecycle",
        steps: [
          { title: "Configuration", description: "Define items, quantities, and specific delivery timelines." },
          { title: "Invitation", description: "Directly invite suppliers to the portal for real-time access." },
          { title: "Comparison", description: "Evaluate bids using landed cost data and split logic." },
          { title: "Negotiation", description: "Execute counteroffers with full historical context." },
          { title: "Awarding", description: "Select winning vendors and auto-generate Purchase Orders." }
        ]
      }}
      features={[
        "Pre-qualification scoring",
        "RFP timeline milestones",
        "Multi-currency support",
        "15+ granular event states",
        "Permissioned access control",
        "Approval workflow triggers",
        "BOM version cloning",
        "Offline quote entry"
      ]}
      personas={{
        title: "Stakeholder Perspectives",
        items: [
          { 
            role: "Head of Sourcing", 
            quote: "FactWise provides the visibility we need to drive global savings without compromising on quality." 
          },
          { 
            role: "Sourcing Specialist", 
            quote: "Automating the BOM roll-up has saved us hundreds of manual hours in comparison work." 
          }
        ]
      }}
      relatedModules={[
        { name: "Purchase Orders", href: "/platform/purchase-orders" },
        { name: "Intelligence", href: "/platform/pricing-intelligence" },
        { name: "Suppliers", href: "/platform/supplier-management" }
      ]}
      ctaBanner={{
        text: "Experience the platform in action",
        btnText: "Schedule Demo",
        btnHref: "/demo"
      }}
    />
  );
}

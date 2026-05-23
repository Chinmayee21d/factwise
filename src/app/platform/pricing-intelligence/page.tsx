'use client';

import React from 'react';
import PlatformTemplate from '@/components/platform/PlatformTemplate';
import { 
  PriceSearchMockup, 
  TrendsMockup, 
  LandedCostAnalysisMockup 
} from '@/components/platform/IntelligenceMockups';
import { Search, Globe, Database, TrendingUp, Target, Coins, Activity } from 'lucide-react';

export default function PricingIntelligencePage() {
  return (
    <PlatformTemplate
      hero={{
        h1: "Every price. Every source. One unified search.",
        subheadline: "A comprehensive pricing repository that aggregates data from every RFQ, contract, and live market feed — so you always negotiate from a position of strength.",
        primaryCTA: { text: "Request Demo", href: "/demo" },
        secondaryCTA: { text: "Explore Strategic Sourcing", href: "/platform/sourcing" },
        visual: (
          <div className="p-10 w-full h-full flex flex-col gap-8 bg-[#0d0d14] relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="flex items-center gap-5 p-5 bg-white/[0.03] border border-white/10 rounded-[32px] relative z-10 group">
              <Search className="text-[#7c5cfc] group-hover:scale-110 transition-transform" size={24} />
              <div className="flex-1 h-4 bg-white/5 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7c5cfc]/20 to-transparent animate-shimmer" />
                <span className="absolute left-0 top-0 text-xs text-gray-500 font-medium px-2">XC7Z020-1CLG400C</span>
              </div>
            </div>
            
            <div className="space-y-4 relative z-10">
              {[
                { label: 'Market Rate (Live)', val: '$0.924', trend: '+2.1%', color: 'text-orange-500' },
                { label: 'Factwise Last Price', val: '$0.840', trend: '-1.4%', color: 'text-[#7c5cfc]' },
                { label: 'Target Savings', val: '$0.795', trend: 'Goal', color: 'text-green-500' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-6 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.label}</span>
                    <span className={`text-[10px] font-bold ${item.trend.includes('+') ? 'text-red-500' : 'text-green-500'} mt-1`}>{item.trend}</span>
                  </div>
                  <span className={`text-2xl font-mono font-bold ${item.color}`}>{item.val}</span>
                </div>
              ))}
            </div>

            <div className="h-24 w-full flex items-end gap-1.5 px-4 relative z-10">
              {[30, 50, 40, 60, 80, 55, 70, 90, 65, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-[#7c5cfc]/20 rounded-t-lg hover:bg-[#7c5cfc]/40 transition-colors" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        )
      }}
      comparison={{
        old: [
          "Historical prices buried in fragmented legacy emails",
          "Market benchmark discovery takes days of manual research",
          "No visibility into real-time global market fluctuations",
          "Inability to compare 'landed' vs 'unit' costs accurately"
        ],
        new: [
          "Aggregated automatically from every transaction and quote",
          "Search any component and see all internal/external sources",
          "Live distributor feeds (Digi-Key, Mouser) integrated via API",
          "Integrated landed cost modeling for true TCO analysis"
        ]
      }}
      capabilities={{
        title: "Never negotiate blind again",
        description: "Surface the market intelligence you need to validate supplier claims and drive massive structural savings across your spend categories.",
        cards: [
          {
            title: "Multi-Source Aggregation",
            description: "Aggregate prices from RFQ bids, signed contracts, direct POs, and internal calculator tools in one repository.",
            visual: <PriceSearchMockup />
          },
          {
            title: "Live Market Intelligence",
            description: "For electronics, pull live pricing and lead times from Digi-Key and Mouser alongside your historical data.",
            visual: (
              <div className="flex items-center justify-center h-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#7c5cfc]/10 to-transparent" />
                <Globe size={64} className="text-[#7c5cfc] opacity-50 animate-pulse-slow" />
              </div>
            )
          },
          {
            title: "Deep Historical Trends",
            description: "Visualize how prices move over time for any item. Spot seasonality, inflation, and opportunistic saving windows.",
            visual: <TrendsMockup />
          },
          {
            title: "Landed Cost Comparison",
            description: "Compare prices not just at unit value — add complex logistics, insurance, and duties for true comparison.",
            visual: <LandedCostAnalysisMockup />
          },
          {
            title: "Target Price Benchmarking",
            description: "Establish should-cost targets per item and track whether incoming bids beat your strategic goals.",
            visual: (
              <div className="flex items-center justify-center h-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />
                <Target size={64} className="text-blue-400 opacity-50" />
              </div>
            )
          },
          {
            title: "Real-time Volatility Tracking",
            description: "Monitor price and lead-time stability across global regions to mitigate supply chain risk proactively.",
            visual: (
              <div className="flex items-center justify-center h-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent" />
                <Activity size={64} className="text-green-400 opacity-50" />
              </div>
            )
          }
        ]
      }}
      workflow={{
        title: "How Intelligence Works",
        steps: [
          { title: "Ingest", description: "Data is indexed automatically from every sourcing event and PO." },
          { title: "Connect", description: "Seamlessly link to live APIs for real-time market context and benchmarks." },
          { title: "Normalize", description: "Adjust for multi-currency, landed costs, and logistics variances." },
          { title: "Analyze", description: "Surface spend patterns, savings opportunities, and price anomalies." },
          { title: "Negotiate", description: "Deploy data-backed should-cost targets to maximize enterprise ROI." }
        ]
      }}
      features={[
        "Granular MPN, CPN, and manufacturer level tracking",
        "Volume-tier contract pricing synchronization",
        "Automated price variance and anomaly alerts",
        "Dynamic exchange rate management with history",
        "Cross-vendor pricing heatmaps for global sourcing",
        "Exportable high-fidelity spend analytics reports",
        "Integrated quote calculator for 'What-if' scenarios",
        "Enterprise-grade manufacturer price benchmarking"
      ]}
      personas={{
        title: "Intelligence for Strategy",
        items: [
          { 
            role: "Category Manager", 
            quote: "I can finally compare my current contract rates with live market data. It gives me the leverage I need during annual price negotiations." 
          },
          { 
            role: "Financial Analyst", 
            quote: "Budgeting for next year is no longer a guessing game. We use the historical price trends to build highly accurate spend forecasts." 
          }
        ]
      }}
      relatedModules={[
        { name: "Strategic Sourcing", href: "/platform/sourcing" },
        { name: "Supplier Management", href: "/platform/supplier-management" },
        { name: "Inquiry to Quote", href: "/inquiry-to-quote" },
        { name: "Contracts", href: "/platform/contracts" }
      ]}
      ctaBanner={{
        text: "Search your global pricing history instantly",
        btnText: "Request Demo",
        btnHref: "/demo"
      }}
    />
  );
}

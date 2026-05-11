"use client";

import React from "react";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline";
import { 
  Database, 
  Cpu, 
  Globe, 
  Shield, 
  Zap, 
  Workflow, 
  Layers, 
  Box,
  RefreshCcw,
  Lock,
  ChevronRight
} from "lucide-react";
import SectionHeader from "./SectionHeader";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  color?: string; // Brand color
}

const integrationsData: TimelineItem[] = [
  {
    id: 1,
    title: "SAP S/4HANA",
    date: "ERP Core",
    content: "Full bidirectional sync for purchase orders, invoices, and material master data. Seamlessly propagate FactWise intelligence into your SAP environment.",
    category: "ERP",
    icon: Database,
    relatedIds: [2, 3, 8],
    status: "completed" as const,
    energy: 95,
    color: "#008FD3", // SAP Blue
  },
  {
    id: 2,
    title: "Oracle NetSuite",
    date: "Cloud ERP",
    content: "Cloud-native integration for mid-market and enterprise organizations. Automate procurement workflows and financial reconciliations instantly.",
    category: "Cloud",
    icon: Globe,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 88,
    color: "#F80000", // Oracle Red
  },
  {
    id: 3,
    title: "MS Dynamics",
    date: "Business App",
    content: "Native connectivity with Dynamics 365. Synchronize supplier performance metrics and supply chain risks directly into your Power BI dashboards.",
    category: "ERP",
    icon: Cpu,
    relatedIds: [1, 6],
    status: "completed" as const,
    energy: 92,
    color: "#00A4EF", // Microsoft Blue
  },
  {
    id: 4,
    title: "Workday",
    date: "Financials",
    content: "Connect procurement spend with human capital and financial planning. Optimize headcount and resource allocation based on real-time procurement data.",
    category: "Finance",
    icon: Zap,
    relatedIds: [2, 7],
    status: "in-progress" as const,
    energy: 75,
    color: "#E28225", // Workday Orange
  },
  {
    id: 5,
    title: "Infor",
    date: "Industry ERP",
    content: "Specialized manufacturing and distribution integration. Track complex bill-of-materials and warehouse movements with sub-second latency.",
    category: "ERP",
    icon: Layers,
    relatedIds: [1, 2],
    status: "completed" as const,
    energy: 84,
    color: "#E1251B", // Infor Red
  },
  {
    id: 6,
    title: "Coupa",
    date: "Spend Mgmt",
    content: "Evolve your spend management with FactWise precision. Enhance Coupa's sourcing capabilities with deep supply chain risk intelligence.",
    category: "Sourcing",
    icon: Workflow,
    relatedIds: [3, 7],
    status: "completed" as const,
    energy: 90,
    color: "#002D72", // Coupa Blue
  },
  {
    id: 7,
    title: "SAP Ariba",
    date: "Network",
    content: "Extend the power of the Ariba network. Leverage FactWise's automated sourcing to identify better suppliers and lower total cost of ownership.",
    category: "Sourcing",
    icon: RefreshCcw,
    relatedIds: [4, 6],
    status: "in-progress" as const,
    energy: 68,
    color: "#008FD3", // Ariba/SAP Blue
  },
  {
    id: 8,
    title: "Legacy APIs",
    date: "Custom API",
    content: "Bridge the gap with legacy infrastructure. FactWise's robust API layer ensures even on-premise custom systems stay in perfect sync.",
    category: "Custom",
    icon: Box,
    relatedIds: [1, 5],
    status: "pending" as const,
    energy: 45,
    color: "#4A6FFF", // FactWise Blue
  },
];

export default function RadialIntegrations() {
  return (
    <section className="relative w-full py-24 bg-white overflow-hidden">
      {/* Background Orbs for white theme */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#3666ff]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4A6FFF]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Top Header - Centered */}
        <div className="flex flex-col items-center text-center">
          <SectionHeader
            label="Ecosystem Connectivity"
            title={<>Integrate with every <span className="text-[#3666ff]">system in your stack.</span></>}
            description="Track goods from source to delivery to payment on a single platform. Connect with leading ERP and accounting systems worldwide with zero friction."
            accentColor="#3666ff"
            align="center"
            marginBottom={24}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: 3 Highlights */}
          <div className="flex flex-col gap-6 w-full max-w-lg">
            {[
              {
                icon: RefreshCcw,
                label: "Real-time sync",
                desc: "Bidirectional data flow with your ERP — zero manual entry.",
              },
              {
                icon: Lock,
                label: "Encrypted transfers",
                desc: "End-to-end TLS-secured data propagation across every system.",
              },
              {
                icon: Zap,
                label: "Sub-second latency",
                desc: "Changes reflect instantly across POs, invoices, and receipts.",
              }
            ].map((h, i) => (
              <div
                key={h.label}
                className="group relative flex flex-row items-start gap-5 p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#3666ff]/20 transition-all duration-500 hover:shadow-xl hover:shadow-[#3666ff]/5 overflow-hidden"
              >
                {/* Hover Glow Beam */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3666ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#3666ff]/40 to-transparent animate-beam" />
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#3666ff]/5 flex items-center justify-center text-[#3666ff] group-hover:scale-110 transition-transform duration-300">
                  <h.icon size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-gray-900 mb-1 text-base tracking-tight">{h.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: The Radial Timeline aligned in the row */}
          <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center scale-[0.85] lg:scale-[0.95] origin-center lg:origin-center">
             <RadialOrbitalTimeline timelineData={integrationsData} />
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes beam {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-beam {
          animation: beam 3s linear infinite;
        }
      `}</style>
    </section>
  );
}

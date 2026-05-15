"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { motion } from "framer-motion";
import { 
    Brain, 
    GitMerge, 
    Hammer, 
    BookOpen, 
    ShieldCheck, 
    Zap, 
    TrendingUp, 
    Settings2 
} from "lucide-react";

export default function QuoteToOrderFeatures() {
  const cards = data.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 mb-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
        >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-bold uppercase tracking-[0.2em]">
                Enterprise Features
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A1D2E] tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Deep capabilities. <br />
                <span className="text-[#3666ff]">Simplified workflows.</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                FactWise provides the most comprehensive feature set for complex enterprise procurement.
            </p>
        </motion.div>
      </div>
      <Carousel items={cards} />
    </div>
  );
}

const FeatureContent = ({ title, description, details }: { title: string, description: string, details: string[] }) => {
  return (
    <div className="bg-slate-50 p-8 md:p-14 rounded-[40px] mb-4 border border-slate-100">
      <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mb-12 leading-relaxed">
        <span className="font-bold text-[#1A1D2E]">
          {title}
        </span>{" "}
        {description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#1A1D2E]">Key Capabilities:</h4>
            <ul className="space-y-4">
                {details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-600 text-lg">
                        <div className="size-2 rounded-full bg-[#3666ff] mt-2.5 shrink-0" />
                        {detail}
                    </li>
                ))}
            </ul>
        </div>
        <div className="rounded-[32px] bg-white p-8 shadow-xl border border-slate-100 flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="size-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
                    <TrendingUp className="size-10 text-[#3666ff]" />
                </div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Performance Metric</div>
                <div className="text-5xl font-bold text-[#1A1D2E]">60%</div>
                <div className="text-slate-500 font-medium italic">Avg. Sourcing Time Reduction</div>
            </div>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    category: "Strategic Sourcing",
    title: "AI Request Assistance",
    description: "Input what you need like you'd tell a coworker. The system translates it into a compliant request, then guides you through the next steps in minutes.",
    icon: <Brain className="size-10" />,
    content: (
      <FeatureContent 
        title="Intelligent RFQ Generation"
        description="FactWise uses natural language processing to convert informal purchase requests into structured, audit-ready RFQ events instantly."
        details={[
            "Multi-factory requisition sync",
            "AI-powered requirement mapping",
            "1000+ item event scalability",
            "Automated sequential event IDs"
        ]}
      />
    ),
  },
  {
    category: "Automation",
    title: "Automated Routing",
    description: "Stop routing requests through inbox chains and handoffs. Direct each submission to the right team at the moment of intake automatically.",
    icon: <GitMerge className="size-10" />,
    content: (
      <FeatureContent 
        title="Approval Flow Intelligence"
        description="Dynamic routing ensures that every request, quote, and PO reaches the designated approvers based on value, category, and department."
        details={[
            "Multi-level conditional approval chains",
            "Org-hierarchy aware escalation logic",
            "Parallel and sequential routing modes",
            "Audit-ready approval logs for every step"
        ]}
      />
    ),
  },
  {
    category: "Direct Spend",
    title: "SOW Builder",
    description: "Prevent vague service requests from turning into scope gaps and renegotiations. Convert a few sentences into a structured SOW with deliverables.",
    icon: <Hammer className="size-10" />,
    content: (
      <FeatureContent 
        title="Structured Scope Definition"
        description="Our SOW builder guides users to define clear deliverables, milestones, and pricing models, ensuring vendors bid on exactly what you need."
        details={[
            "Milestone-based payment scheduling",
            "Deliverable-level acceptance criteria",
            "Native integration with project budgets",
            "Version control for scope amendments"
        ]}
      />
    ),
  },
  {
    category: "Supply Chain",
    title: "Price Books + Punchouts",
    description: "Let teams order from familiar supplier sites while FactWise remains the system of record. Catalog integrations surface the right item at the right price.",
    icon: <BookOpen className="size-10" />,
    content: (
      <FeatureContent 
        title="Unified Catalog Management"
        description="Aggregate pricing from contracts, prior bids, and live distributor APIs (Digi-Key, Mouser) into a single, sub-millisecond searchable database."
        details={[
            "Live API distributor pricing sync",
            "Contract volume tier enforcement",
            "Punchout integration for enterprise vendors",
            "Unified pricing intelligence repository"
        ]}
      />
    ),
  },
  {
    category: "Compliance",
    title: "3-Way Matching",
    description: "Automated payment verification that catches mismatches before they become disputes. Synchronize PO, GRN, and Invoices with 100% precision.",
    icon: <ShieldCheck className="size-10" />,
    content: (
      <FeatureContent 
        title="Exception-Free AP Workflows"
        description="Our matching engine flags 7 types of exceptions automatically, ensuring you only pay for what was ordered and received."
        details={[
            "Real-time ASN & GRN tracking",
            "Multi-stage quality check integration",
            "Automated credit note generation",
            "Native ERP sync for payment execution"
        ]}
      />
    ),
  },
];

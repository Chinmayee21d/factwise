"use client";

import React from "react";
import { Check, ArrowRight, ShieldCheck, ZapIcon, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const modules = [
  {
    tag: "SOURCE TO CONTRACT",
    title: "Quote to Order",
    description: "Streamline the transition from supplier quotes to purchase orders. Automate bid comparison and award logic.",
    imageUrl: "/images/quote-order.png",
    features: [
      "Smart Bid Comparison",
      "Auto-Award Logic",
      "Vendor Performance",
      "Negotiation History"
    ],
    href: "/solutions/quote-to-order",
    icon: BarChart3
  },
  {
    tag: "PROCURE TO PAY",
    title: "Requisition to PO",
    description: "Simplify internal approvals. Convert approved requisitions into POs instantly with full budget tracking.",
    imageUrl: "/images/req-po.png",
    features: [
      "Budget Tracking",
      "Multi-Level Approvals",
      "Compliance Checks",
      "Instant PO Generation"
    ],
    href: "/solutions/requisition-to-po",
    icon: ShieldCheck
  },
  {
    tag: "INVOICE AUTOMATION",
    title: "Invoice to Pay",
    description: "Close the loop with automated 3-way matching. Ensure compliance and timely payments with integrated AP.",
    imageUrl: "/images/invoice-pay.png",
    features: [
      "AP Automation",
      "Compliance Verification",
      "Digital Archiving",
      "Payment Scheduling"
    ],
    href: "/solutions/invoice-to-pay",
    icon: ZapIcon
  },
];

function Card({ module, index }: { module: typeof modules[0], index: number }) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-white relative group/card border-slate-200 w-auto sm:w-[22rem] h-auto rounded-[2rem] p-7 border shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-15px_rgba(54,102,255,0.12)] transition-all duration-500">
        <CardItem
          translateZ="50"
          className="flex items-center gap-3 mb-4"
        >
          <div className="p-3 rounded-2xl border bg-slate-50 border-slate-100 text-slate-400 group-hover/card:bg-blue-50 group-hover/card:border-blue-100 group-hover/card:text-[#3666ff] transition-all duration-500">
            <module.icon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 group-hover/card:text-[#3666ff] transition-colors">
            {module.tag}
          </span>
        </CardItem>
        
        <CardItem
          translateZ="60"
          className="text-xl font-bold text-[#1A1D2E] mb-2 tracking-tight group-hover/card:text-[#3666ff] transition-colors"
        >
          {module.title}
        </CardItem>
        
        <CardItem
          as="p"
          translateZ="50"
          className="text-slate-500 text-[13px] font-medium leading-relaxed mb-6"
        >
          {module.description}
        </CardItem>
        
        <CardItem translateZ="100" className="w-full mb-6">
          <img
            src={module.imageUrl}
            height="600"
            width="600"
            className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl border border-slate-100"
            alt={module.title}
          />
        </CardItem>

        <CardItem translateZ="40" className="space-y-2.5 mb-8">
           {module.features.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#3666ff]">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </div>
              <span className="text-[12px] font-bold text-slate-600">
                {feature}
              </span>
            </div>
          ))}
        </CardItem>

        <div className="mt-auto">
          <CardItem
            translateZ={40}
            as="button"
            className="w-full px-6 py-3 rounded-xl bg-slate-50 text-slate-600 border border-slate-100 text-[11px] font-black uppercase tracking-widest hover:bg-[#3666ff] hover:text-white hover:border-[#3666ff] transition-all duration-300 shadow-sm hover:shadow-blue-500/25"
            onClick={() => {
              if (index === 0) {
                window.location.href = "/solutions";
                return;
              }
              const targetId = index === 1 ? "roadmap" : "case-studies";
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore Solution
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

import ScrollReveal from "./ui/ScrollReveal";

export default function ProcurementModules() {
  return (
    <section className="py-20 relative bg-white overflow-hidden" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
      <div className="max-w-7xl px-6 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#4A6FFF] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Platform Modules
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1]">
            Modular <span className="text-[#3666ff]">Procurement</span> Intelligence
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Scalable, enterprise-ready modules designed to automate every friction point in your procurement lifecycle.
          </p>
        </motion.div>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch" stagger={0.15} delay={0.3}>
          {modules.map((module, index) => (
            <Card key={index} module={module} index={index} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}


'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Calculator, FileCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
    {
        title: "Automate Sourcing at Scale",
        description: "Run multi-round bidding events with 1000+ items and 500+ vendors in one click. FW Autobot auto-negotiates on your behalf, reducing cycle time by 50% while preserving full history.",
        icon: Zap,
        color: "blue",
        label: "Strategic Sourcing"
    },
    {
        title: "Identify True Cost (TCO)",
        description: "Go beyond unit price. Automatically calculate fully landed costs including duties, taxes, and freight to identify the cheapest vendor with 100% precision.",
        icon: Calculator,
        color: "indigo",
        label: "Pricing Intelligence"
    },
    {
        title: "1-Click Order Execution",
        description: "Generate POs across multiple vendors instantly from awarded bids. Track every amendment, delivery schedule, and invoice with a complete digital audit trail.",
        icon: FileCheck,
        color: "blue",
        label: "PO Management"
    }
];

export default function SolutionsFeatures() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 hero-gradient" />
            
            {/* Noise Overlay */}
            <div className="absolute inset-0 noise opacity-[0.03]" />

            {/* Background elements to match landing page feel */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header section matching landing page typography */}
                <div className="max-w-3xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div
                            className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            Quote-to-Order Solution
                        </div>
                        <h2
                            className="text-3xl md:text-5xl font-bold tracking-tight text-[#1A1D2E] mb-6 leading-[1.1]"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Master your entire <span className="text-[#3666ff]">Quote-to-Order</span> lifecycle
                        </h2>
                        <p
                            className="text-lg text-slate-500 font-medium max-w-2xl"
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            While many teams focus on unit price, the true value is lost in the friction between quoting and ordering.
                            Unify your data, automate your negotiations, and execute with absolute precision.
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {FEATURES_LIST.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group relative flex flex-col h-full"
                        >
                            {/* Card Body */}
                            <div className="relative h-full bg-white border border-slate-200 rounded-[32px] p-8 md:p-10 transition-all duration-500 flex flex-col shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_40px_-12px_rgba(54,102,255,0.15)] group-hover:border-blue-100 overflow-hidden">
                                
                                {/* Hover Textured Background */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30" />
                                    <div className="absolute inset-0 noise opacity-[0.02]" />
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="size-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-blue-200">
                                        <feature.icon className="size-6 text-blue-600 group-hover:text-white transition-colors duration-500" />
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>{feature.label}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#1A1D2E] mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                                        {feature.title}
                                    </h3>

                                    <p className="text-slate-500 leading-relaxed mb-8 flex-grow" style={{ fontFamily: 'var(--font-inter)' }}>
                                        {feature.description}
                                    </p>

                                    <div className="mt-auto">
                                        <Link href="/platform" className="inline-flex items-center gap-2 text-sm font-bold text-[#1A1D2E] hover:text-blue-600 transition-colors group/link" style={{ fontFamily: 'var(--font-inter)' }}>
                                            Explore Module
                                            <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const FEATURES_LIST = [
    {
        title: "Unify Your Quoting Intelligence",
        description: "Eliminate fragmented data silos. Ensure every vendor negotiation and quote normalization follows an intelligent, automated workflow that captures institutional knowledge.",
        icon: Zap,
        label: "Quoting Logic"
    },
    {
        title: "Accelerate the Award-to-Order Cycle",
        description: "Eliminate the manual drag of follow-ups. Synchronize multi-round bidding with instant order execution to ensure material availability without derailing production timelines.",
        icon: Calculator,
        label: "Velocity"
    },
    {
        title: "100% Visibility and Audit Readiness",
        description: "Manage complex assemblies and multi-entity RFQs with structured templates, automated landed-cost comparisons, and a complete digital history of every decision.",
        icon: FileCheck,
        label: "Governance"
    }
];

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    MessageSquare,
    BarChart3,
    FileCheck,
    CheckCircle2,
    Plus,
    MousePointer2,
    Package,
    CircleDollarSign,
    Check,
    FileText
} from 'lucide-react';

export default function QuoteToOrderFlow() {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Sophisticated Light Blue Gradient Background */}
            <div className="absolute inset-0 hero-gradient opacity-80" />

            {/* Noise Overlay */}
            <div className="absolute inset-0 noise opacity-[0.02] pointer-events-none" />

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-50 -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] opacity-50 -z-10" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Unified Main Header */}
                <div className="mb-24">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                        The FactWise Ecosystem
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1A1D2E] mb-6 tracking-tight leading-[1.1] max-w-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                        Three capabilities that <br />
                        <span className="text-[#3666ff]">change everything</span> about procurement.
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                        Built specifically for complex manufacturing and high-volume direct spend.
                        A complete end-to-end lifecycle that replaces fragmented silos with intelligent automation.
                    </p>
                </div>

                {/* Sub-section 1: Intake & RFQ (Text Left, Dashboard Right) */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#00b884] text-[10px] font-bold uppercase tracking-[0.2em]">
                            Phase 1: Intelligent Intake
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold text-[#1A1D2E] tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            Stop manual data entry <br />
                            <span className="text-[#00b884]">before it starts.</span>
                        </h3>
                        <p className="text-slate-500 text-base leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Consolidate thousands of line items across requisitions into structured RFQ events instantly.
                            FW Assist auto-fills requirements based on historical patterns, while n-level sub-BOMs are handled with absolute precision.
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                'Multi-factory requisition sync',
                                'AI-powered requirement mapping',
                                '1000+ item event scalability',
                                'Custom sequential event IDs'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                    <CheckCircle2 className="size-4 text-[#00b884]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl bg-white border border-slate-200 p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden group"
                    >
                        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
                            <div className="flex gap-1">
                                <div className="size-2 rounded-full bg-slate-200" />
                                <div className="size-2 rounded-full bg-slate-200" />
                                <div className="size-2 rounded-full bg-slate-200" />
                            </div>
                            <div className="h-3 w-32 bg-slate-200 rounded-full animate-pulse" />
                        </div>
                        <div className="p-8 space-y-6 bg-white relative">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300 group/item"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-emerald-50 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                            <Zap className="size-5 text-[#00b884]" />
                                        </div>
                                        <div>
                                            <div className="h-3 w-24 bg-slate-200 rounded-full mb-2" />
                                            <div className="h-2 w-16 bg-slate-100 rounded-full" />
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="px-3 py-1 rounded-md bg-emerald-100 text-[#00b884] text-[10px] font-bold tracking-wider"
                                    >
                                        ACTIVE
                                    </motion.div>
                                </motion.div>
                            ))}

                            {/* Floating Micro-Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/2 right-10 p-3 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center gap-3 z-20 pointer-events-none"
                            >
                                <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                    <Plus className="size-4 text-blue-600" />
                                </div>
                                <div className="text-[10px] font-bold text-slate-700">NEW REQUISITION</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Sub-section 2: Negotiation (Dashboard Left, Text Right) */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-2 lg:order-1 relative rounded-3xl bg-white border border-slate-200 p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
                    >
                        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <div className="h-3 w-32 bg-slate-200 rounded-full" />
                            <div className="flex gap-2">
                                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} className="size-4 rounded bg-blue-100" />
                                <div className="size-4 rounded bg-indigo-100" />
                            </div>
                        </div>
                        <div className="p-8 bg-white relative">
                            <div className="space-y-8">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-2">
                                        <div className="h-4 w-40 bg-slate-100 rounded-full" />
                                        <div className="h-3 w-24 bg-slate-50 rounded-full" />
                                    </div>
                                    <motion.div
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="text-[#3666ff] text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
                                    >
                                        <span className="size-1.5 rounded-full bg-blue-500" />
                                        FW Autobot
                                    </motion.div>
                                </div>
                                <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '85%' }}
                                        transition={{ duration: 2.5, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-blue-400 to-[#3666ff] relative"
                                    >
                                        <motion.div
                                            animate={{ x: ['-100%', '200%'] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        />
                                    </motion.div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="p-4 rounded-xl bg-blue-50 border border-blue-100 transition-all shadow-sm hover:shadow-md"
                                    >
                                        <div className="text-[10px] text-[#3666ff] font-bold mb-1 uppercase tracking-widest">Savings</div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            className="text-xl font-bold text-[#1A1D2E]"
                                        >
                                            12.4%
                                        </motion.div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 transition-all shadow-sm hover:shadow-md"
                                    >
                                        <div className="text-[10px] text-indigo-600 font-bold mb-1 uppercase tracking-widest">Rounds</div>
                                        <div className="text-xl font-bold text-[#1A1D2E]">4 / 5</div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-1 lg:order-2 space-y-8"
                    >
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em]">
                            Phase 2: AI Negotiation
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold text-[#1A1D2E] tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            Negotiate smarter in <br />
                            <span className="text-[#3666ff]">half the time.</span>
                        </h3>
                        <p className="text-slate-500 text-base leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Leverage FW Autobot to handle multi-round bidding on your behalf.
                            Our engine uses real-time commodity data and price anchoring to ensure you always secure the best market rate without manual overhead.
                        </p>
                        <ul className="grid grid-cols-1 gap-4">
                            {[
                                'Automated price anchoring & targets',
                                'Real-time commodity index integration',
                                'Audit-ready dual-side negotiation logs',
                                '50% reduction in total cycle time'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                    <CheckCircle2 className="size-4 text-[#3666ff]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Sub-section 3: Award & Execution (Text Left, Dashboard Right) */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-[#7b68ee] text-[10px] font-bold uppercase tracking-[0.2em]">
                            Phase 3: Award & Execution
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold text-[#1A1D2E] tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            Award with confidence. <br />
                            <span className="text-[#7b68ee]">Execute in one click.</span>
                        </h3>
                        <p className="text-slate-500 text-base leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Analyze Total Cost of Ownership (TCO) including BCD, SWS, freight, and landed costs.
                            Award bids across multiple vendors and generate all Purchase Orders instantly through native ERP integrations.
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                '3-way invoice matching',
                                'ASN & GRN real-time tracking',
                                '1-click multi-vendor PO issuance',
                                'Ready-made ERP integrations',
                                'Maker-Checker approval hierarchy',
                                'Total Cost of Ownership analysis'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                    <CheckCircle2 className="size-4 text-[#7b68ee]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Main Invoice Dashboard */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
                            {/* Dashboard Header */}
                            <div className="p-6 border-b border-slate-100">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 rounded-md bg-gradient-to-br from-orange-400 to-red-500" />
                                        <span className="font-bold text-slate-800 tracking-tight">FactWise</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-2 w-12 bg-slate-100 rounded-full" />
                                        <div className="h-2 w-12 bg-slate-100 rounded-full" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-blue-500 w-fit pb-1">
                                    Invoices
                                </div>
                            </div>

                            {/* Dashboard Table Mockup */}
                            <div className="p-6">
                                <div className="grid grid-cols-5 gap-4 mb-4 pb-2 border-b border-slate-50">
                                    {['Invoice No.', 'Date', 'PO Number', 'Amount', 'Status'].map((h) => (
                                        <div key={h} className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{h}</div>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { no: 'IN-13414', amt: '$ 30,000', status: 'MATCHED' },
                                        { no: 'IN-12354', amt: '$ 24,000', status: 'PENDING' },
                                        { no: 'IN-67824', amt: '$ 20,000', status: 'MATCHED' },
                                        { no: 'IN-67824', amt: '$ 20,000', status: 'MATCHED' }
                                    ].map((row, i) => (
                                        <div key={i} className="grid grid-cols-5 gap-4 items-center">
                                            <div className="text-[10px] font-bold text-blue-600">{row.no}</div>
                                            <div className="h-2 w-12 bg-slate-100 rounded-full" />
                                            <div className="h-2 w-12 bg-slate-100 rounded-full" />
                                            <div className="text-[10px] font-bold text-slate-700">{row.amt}</div>
                                            <div className={`text-[8px] font-bold px-2 py-0.5 rounded-full w-fit ${row.status === 'MATCHED' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                                {row.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Floating "Create Invoice" Button */}
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 bg-[#3666ff] text-white px-6 py-3 rounded-xl shadow-[0_20px_40px_rgba(54,102,255,0.3)] flex items-center gap-3 z-30"
                        >
                            <Plus className="size-5" />
                            <span className="font-bold text-sm tracking-tight">Create Invoice</span>
                            <div className="absolute -bottom-2 -right-2">
                                <MousePointer2 className="size-6 text-slate-800 fill-white drop-shadow-lg" />
                            </div>
                        </motion.div>

                        {/* Floating "3-way matching" Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-2xl z-20 max-w-[320px]"
                        >
                            <div className="text-center mb-6 text-sm font-bold text-slate-800">3-way matching</div>
                            <div className="relative flex justify-between items-center px-2">
                                <div className="absolute left-0 right-0 h-0.5 bg-slate-100 top-1/2 -translate-y-1/2 z-0" />
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '66%' }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="absolute left-0 h-0.5 bg-blue-500 top-1/2 -translate-y-1/2 z-0"
                                />
                                {[
                                    { icon: <FileText className="size-4" />, label: 'PO' },
                                    { icon: <Package className="size-4" />, label: 'GRN' },
                                    { icon: <CircleDollarSign className="size-4" />, label: 'INVOICE' }
                                ].map((step, i) => (
                                    <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                                        <div className={`size-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${i <= 1 ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                                            {i <= 1 ? <Check className="size-4 stroke-[3]" /> : step.icon}
                                        </div>
                                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{step.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Floating "Track invoices" Pill */}
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-20 -right-10 bg-white border border-slate-100 p-3 rounded-xl shadow-xl flex items-center gap-3 z-10"
                        >
                            <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                <BarChart3 className="size-4" />
                            </div>
                            <div className="text-[11px] font-bold text-slate-700 pr-2">Track invoices, ASN, GRN</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

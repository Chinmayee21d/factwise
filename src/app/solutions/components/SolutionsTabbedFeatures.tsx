'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';

interface Feature {
    id: number;
    icon: React.ElementType;
    title: string;
    description: string;
    image: string;
    label: string;
}

const FEATURES: Feature[] = [
    {
        id: 1,
        icon: Zap,
        label: "RFX BUILDER",
        title: "AI-Powered Event Creation",
        description: "Generate complex sourcing events in seconds. Our AI-driven builder understands your material requirements and crafts precise vendor questionnaires automatically.",
        image: ""
    },
    {
        id: 2,
        icon: BarChart3,
        label: "ANALYSIS",
        title: "Real-Time Bid Normalization",
        description: "Consolidate and compare vendor responses instantly. Factor in freight, duties, and payment terms for a true apples-to-apples comparison sheet.",
        image: ""
    },
    {
        id: 3,
        icon: ShieldCheck,
        label: "AWARDING",
        title: "Autonomous Decision Support",
        description: "Speed up awarding with auto-generated comparison sheets and intelligent recommendations based on historical performance and market data.",
        image: ""
    }
];

export default function SolutionsTabbedFeatures() {
    const [currentFeature, setCurrentFeature] = useState(0);

    const handleFeatureClick = (index: number) => {
        setCurrentFeature(index);
    };

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6 relative z-20">
                <div className="grid lg:grid-cols-12 gap-20 items-center">

                    {/* Left Side - Content (Enlarged to 7/12) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="mb-8">
                            <div 
                                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                Strategic Workflow
                            </div>
                            <h2 
                                className="text-2xl md:text-4xl font-bold tracking-tight text-[#1A1D2E] leading-[1.2] mb-6"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                Sourcing that <span className="text-[#3666ff]">works for you</span>
                            </h2>
                            <p 
                                className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl"
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                Handle volatility with automated logic and instant comparisons. 
                                Execute events, negotiate in real-time, and award with confidence.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {FEATURES.map((feature, index) => {
                                const Icon = feature.icon;
                                const isActive = currentFeature === index;

                                return (
                                    <div
                                        key={feature.id}
                                        className={`relative cursor-pointer group p-5 rounded-2xl transition-all duration-500 ${isActive ? 'bg-white shadow-[0_10px_25px_rgba(0,0,0,0.03)] ring-1 ring-slate-100' : 'hover:bg-white/40'
                                            }`}
                                        onClick={() => handleFeatureClick(index)}
                                    >
                                        <div className="flex items-start gap-5">
                                            <div className={`mt-1 p-2 rounded-xl transition-all duration-500 ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'
                                                }`}>
                                                <Icon size={16} />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className={`text-base font-bold transition-colors duration-500 ${isActive ? 'text-[#1A1D2E]' : 'text-slate-400 group-hover:text-slate-600'
                                                    }`} style={{ fontFamily: 'var(--font-display)' }}>
                                                    {feature.title}
                                                </h3>

                                                <AnimatePresence mode="wait">
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="text-sm text-slate-500 mt-3 leading-relaxed font-medium">
                                                                {feature.description}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side - Dashboard Mockup (Reduced to 5/12) */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative aspect-[1.1/1] w-full bg-white rounded-[28px] p-6 md:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                            {/* Subtle Background elements */}
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-transparent" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentFeature}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative h-full w-full"
                                >
                                    {/* Main Request for Quote Card */}
                                    <div className="absolute top-0 right-0 w-[85%] bg-white rounded-2xl shadow-xl border border-slate-100 p-6 z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="size-3 bg-blue-100 rounded-sm" />
                                                <span className="text-[12px] font-bold text-slate-800 uppercase tracking-wide">Request for Quote</span>
                                            </div>
                                            <div className="px-4 py-2 bg-blue-600 text-white text-[10px] font-bold rounded-full shadow-lg shadow-blue-200">
                                                Create RFX
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-2 w-3/4 bg-slate-50 rounded-full" />
                                            <div className="h-2 w-1/2 bg-slate-50 rounded-full" />
                                            <div className="h-2 w-2/3 bg-slate-50 rounded-full" />
                                        </div>
                                    </div>

                                    {/* RFx Survey Builder - Floating Card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="absolute top-1/4 left-0 w-[60%] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-20"
                                    >
                                        <div className="text-[9px] font-bold text-slate-400 mb-3 uppercase tracking-[0.2em]">RFx Builder</div>
                                        <div className="text-sm font-bold text-[#1A1D2E] mb-5">What are you buying?</div>
                                        <button className="w-full group relative overflow-hidden flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold transition-all hover:bg-blue-700 shadow-[0_10px_25px_rgba(37,99,235,0.2)]">
                                            <Zap size={14} className="group-hover:scale-125 transition-transform" />
                                            Generate with AI
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                animate={{ x: ['-100%', '200%'] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            />
                                        </button>
                                    </motion.div>

                                    {/* Quote Comparison Sheet - Bottom Card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-30"
                                    >
                                        <div className="flex items-center justify-between mb-5 border-b border-slate-50 pb-4">
                                            <div className="text-[10px] font-bold text-[#1A1D2E] uppercase tracking-wide">Quote Comparison Sheet</div>
                                            <div className="flex gap-2 items-center">
                                                <div className="size-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">Auto Award</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-orange-50/30 rounded-2xl border border-orange-100 transition-all hover:scale-[1.02]">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="text-[9px] font-bold text-orange-700">Acme Enterprise</div>
                                                    <div className="text-[10px] font-black text-orange-900">$ 900</div>
                                                </div>
                                                <div className="h-1.5 w-full bg-orange-200/40 rounded-full" />
                                            </div>
                                            <div className="p-4 bg-blue-50/30 rounded-2xl border border-blue-100 transition-all hover:scale-[1.02]">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="text-[9px] font-bold text-blue-700">Globex Corp</div>
                                                    <div className="text-[10px] font-black text-blue-900">$ 1,500</div>
                                                </div>
                                                <div className="h-1.5 w-full bg-blue-200/40 rounded-full" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Floating Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}

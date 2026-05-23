'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RfqAnalyticsAnimation from './RfqAnalyticsAnimation';
import { Check } from 'lucide-react';

export default function RfqAnalyticsSection() {
    const [analyticsPhase, setAnalyticsPhase] = useState<number>(0);
    const [isAnalyticsAuto, setIsAnalyticsAuto] = useState<boolean>(true);
    const [analyticsMenuStep, setAnalyticsMenuStep] = useState<number | null>(null);

    const setAnalyticsManual = (menuPhase: number) => {
        setIsAnalyticsAuto(false);
        setAnalyticsMenuStep(menuPhase);
        if (menuPhase === 1) setAnalyticsPhase(1);
        else if (menuPhase === 2) setAnalyticsPhase(7);
        else if (menuPhase === 3) setAnalyticsPhase(8);
        else if (menuPhase === 4) setAnalyticsPhase(9);
    };

    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleGoToStep = (e: Event) => {
            const step = (e as CustomEvent).detail.step;
            if (step === 3) setAnalyticsManual(1);
        };
        window.addEventListener('go-to-solution-step', handleGoToStep);
        return () => window.removeEventListener('go-to-solution-step', handleGoToStep);
    }, []);

    // Maps internal animation phases (0-9) to the 4 left-menu items
    const isMenuStepActive = (itemPhase: number) => {
        if (!isAnalyticsAuto && analyticsMenuStep !== null) {
            return analyticsMenuStep === itemPhase;
        }
        if (itemPhase === 1) return analyticsPhase >= 1 && analyticsPhase <= 2;
        if (itemPhase === 2) return analyticsPhase >= 3 && analyticsPhase <= 7;
        if (itemPhase === 3) return analyticsPhase === 8;
        if (itemPhase === 4) return analyticsPhase >= 9;
        return false;
    };

    const isMenuStepDone = (itemPhase: number) => {
        if (!isAnalyticsAuto && analyticsMenuStep !== null) {
            return itemPhase < analyticsMenuStep;
        }
        if (itemPhase === 1) return analyticsPhase > 2;
        if (itemPhase === 2) return analyticsPhase > 7;
        if (itemPhase === 3) return analyticsPhase > 8;
        if (itemPhase === 4) return analyticsPhase > 9;
        return false;
    };

    return (
        <div id="section-3-3" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-40 scroll-mt-24">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 space-y-6 text-left"
            >
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff]" />
                    RFQ Analytics
                </div>
                <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    See True Landed Cost. <br />
                    <span className="text-[#3666ff]">Award with Confidence.</span>
                </h3>
                <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                    FactWise auto-applies your custom landed cost formula across every bid — duty, insurance, packaging, all normalized to your currency. Every comparison reflects true cost, not unit price.
                </p>
                <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                    See competitive, non-competitive, and excluded bids at a glance, line-by-line or all-vendors. FactWise Recommended Analytics highlights the best bid per item — every award backed by intelligence, not instinct.
                </p>

                <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                    {[
                        { phase: 1, title: "Vendor Bids Arrive" },
                        { phase: 2, title: "Apply Landed Cost Formula" },
                        { phase: 3, title: "Categorize Vendor Performance" },
                        { phase: 4, title: "AI Recommended Best Bid" }
                    ].map((item) => (
                        <div
                            key={item.phase}
                            onClick={() => setAnalyticsManual(item.phase)}
                            className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${
                                isMenuStepActive(item.phase)
                                    ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                                    : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                            }`}
                        >
                            {isMenuStepActive(item.phase) && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
                            )}
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${
                                    isMenuStepActive(item.phase)
                                        ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                        : isMenuStepDone(item.phase)
                                        ? 'border-[#00b884] bg-[#00b884] text-white'
                                        : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50 group-hover:text-[#3666ff]'
                                }`}>
                                    <Check className="size-3.5" strokeWidth={3} />
                                </div>
                                <span className={`text-[13.5px] font-bold tracking-tight ${
                                    isMenuStepActive(item.phase) ? 'text-[#3666ff]' : isMenuStepDone(item.phase) ? 'text-slate-700' : 'text-slate-500'
                                }`}>
                                    {item.title}
                                </span>
                            </div>
                            {isMenuStepActive(item.phase) && (
                                <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Active
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="lg:col-span-6 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <RfqAnalyticsAnimation
                        isAuto={isAnalyticsAuto}
                        controlledPhase={analyticsPhase}
                        activeMenuStep={!isAnalyticsAuto ? analyticsMenuStep : null}
                        onPhaseChange={(p) => setAnalyticsPhase(p)}
                        onToggleAuto={() => { setIsAnalyticsAuto(prev => { if (!prev) setAnalyticsMenuStep(null); return !prev; }); }}
                    />
                </motion.div>
            </div>
        </div>
    );
}

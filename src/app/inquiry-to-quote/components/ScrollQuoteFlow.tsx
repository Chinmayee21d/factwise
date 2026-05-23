'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BomCostAnimation from './BomCostAnimation';
import SourcingPanel from './SourcingPanel';
import RfqAnalyticsAnimation from './RfqAnalyticsAnimation';
import QuoteGenAnimation from './QuoteGenAnimation';
import { Check, ChevronDown } from 'lucide-react';

// ─── Panel 1: BOM & Cost Intelligence ──────────────────────────────────────
function BomPanel() {
    const [isBomAuto, setIsBomAuto] = useState(true);
    const [bomMenuStep, setBomMenuStep] = useState<number | null>(null);
    const [bomPhase, setBomPhase] = useState(1);

    const setBomManual = (n: number) => { setIsBomAuto(false); setBomMenuStep(n); };
    const isBomStepActive = (n: number) => bomPhase === n;
    const isBomStepDone = (n: number) => bomPhase > n;

    return (
        <div className="w-full h-full flex items-center">
            <div className="mx-auto w-full max-w-[1240px] xl:max-w-[1360px] px-6">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    {/* Text Left */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-ping" />
                            BOM & Cost Intelligence
                        </div>
                        <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                            You can't price what you <br />
                            <span className="text-[#3666ff]">don't fully understand.</span>
                        </h3>
                        <p className="text-slate-500 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                            Multi-level BOMs take days to build by hand. Alternates, revisions, should-cost — most teams chase all of it across spreadsheets, with no version control and no price visibility.
                        </p>
                        <p className="text-slate-500 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                            Upload a complex multi-level BOM in one import — alternates per line included. The moment it's live, every part shows its true cost: <span className="font-semibold text-slate-700">distributor, past PO, quote, and contract</span> — at the line level, before a single RFQ goes out.
                        </p>
                        <div className="flex flex-col gap-2 mt-8 text-left">
                            {[
                                { step: 1, title: "BOM Upload & Auto-Parse" },
                                { step: 2, title: "Multi-Level BOM with Alternates" },
                                { step: 3, title: "Line-Level Cost Intelligence" },
                                { step: 4, title: "Revision Tracking & Diff View" },
                            ].map((item) => (
                                <div
                                    key={item.step}
                                    onClick={() => setBomManual(item.step)}
                                    className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${
                                        isBomStepActive(item.step)
                                            ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                                            : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                                    }`}
                                >
                                    {isBomStepActive(item.step) && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
                                    )}
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${
                                            isBomStepActive(item.step)
                                                ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                                : isBomStepDone(item.step)
                                                ? 'border-[#00b884] bg-[#00b884] text-white'
                                                : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50 group-hover:text-[#3666ff]'
                                        }`}>
                                            <Check className="size-3.5" strokeWidth={3} />
                                        </div>
                                        <span className={`text-[13.5px] font-bold tracking-tight ${
                                            isBomStepActive(item.step) ? 'text-[#3666ff]'
                                            : isBomStepDone(item.step) ? 'text-slate-700'
                                            : 'text-slate-500'
                                        }`}>
                                            {item.title}
                                        </span>
                                    </div>
                                    {isBomStepActive(item.step) && (
                                        <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Active
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Graphic Right */}
                    <div className="lg:col-span-6 relative flex items-center justify-center self-stretch">
                        <div className="w-full">
                            <BomCostAnimation
                                speed={1}
                                isAuto={isBomAuto}
                                controlledPhase={bomMenuStep}
                                activeMenuStep={!isBomAuto ? bomMenuStep : null}
                                onPhaseChange={(p) => setBomPhase(p)}
                                onToggleAuto={() => {
                                    setIsBomAuto(prev => {
                                        if (!prev) setBomMenuStep(null);
                                        return !prev;
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Panel 3: RFQ Analytics ─────────────────────────────────────────────────
function AnalyticsPanel() {
    const [analyticsPhase, setAnalyticsPhase] = useState(0);
    const [isAnalyticsAuto, setIsAnalyticsAuto] = useState(true);
    const [analyticsMenuStep, setAnalyticsMenuStep] = useState<number | null>(null);

    const setAnalyticsManual = (mp: number) => {
        setIsAnalyticsAuto(false);
        setAnalyticsMenuStep(mp);
        if (mp === 1) setAnalyticsPhase(1);
        else if (mp === 2) setAnalyticsPhase(3);
        else if (mp === 3) setAnalyticsPhase(4);
        else if (mp === 4) setAnalyticsPhase(8);
    };

    const isMenuStepActive = (ip: number) => {
        if (!isAnalyticsAuto && analyticsMenuStep !== null) return analyticsMenuStep === ip;
        if (ip === 1) return analyticsPhase >= 1 && analyticsPhase <= 2;
        if (ip === 2) return analyticsPhase === 3;
        if (ip === 3) return analyticsPhase >= 4 && analyticsPhase <= 6;
        if (ip === 4) return analyticsPhase >= 7 && analyticsPhase <= 8;
        return false;
    };

    const isMenuStepDone = (ip: number) => {
        if (!isAnalyticsAuto && analyticsMenuStep !== null) return ip < analyticsMenuStep;
        if (ip === 1) return analyticsPhase > 2;
        if (ip === 2) return analyticsPhase > 3;
        if (ip === 3) return analyticsPhase > 6;
        if (ip === 4) return analyticsPhase > 8;
        return false;
    };

    return (
        <div className="w-full h-full flex items-center">
            <div className="mx-auto w-full max-w-[1240px] xl:max-w-[1360px] px-6">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    {/* Text Left */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff]" />
                            RFQ Analytics
                        </div>
                        <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                            The Cheapest Bid On Paper Is Rarely The{' '}
                            <span className="text-[#3666ff]">Cheapest Purchase In Reality.</span>
                        </h3>
                        <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                            Most teams award on unit price alone — missing duties, freight, insurance, and packaging that quietly erode margin. FactWise applies your landed cost formulas across every bid automatically, so every comparison reflects true cost, normalized to your currency.
                        </p>
                        <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                            See the best price per line item across all vendors in one view. Drill into competitive, non-competitive, and excluded bids per supplier — then award with complete confidence.
                        </p>
                        <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                            {[
                                { phase: 1, title: "Supplier Bids Arrive" },
                                { phase: 2, title: "Normalize to One Currency" },
                                { phase: 3, title: "Logistics Costs Applied" },
                                { phase: 4, title: "Lock Optimal Bid" }
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
                    </div>

                    {/* Graphic Right */}
                    <div className="lg:col-span-6 relative">
                        <RfqAnalyticsAnimation
                            isAuto={isAnalyticsAuto}
                            controlledPhase={analyticsPhase}
                            activeMenuStep={!isAnalyticsAuto ? analyticsMenuStep : null}
                            onPhaseChange={(p) => setAnalyticsPhase(p)}
                            onToggleAuto={() => { setIsAnalyticsAuto(prev => { if (!prev) setAnalyticsMenuStep(null); return !prev; }); }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Panel 4: Quote Generation ───────────────────────────────────────────────
function QuotePanel() {
    const [quotePhaseAnim, setQuotePhaseAnim] = useState(0);
    const [isQuoteAuto, setIsQuoteAuto] = useState(true);
    const [quoteMenuStep, setQuoteMenuStep] = useState<number | null>(null);

    const setQuoteManual = (mp: number) => {
        setIsQuoteAuto(false);
        setQuoteMenuStep(mp);
        if (mp === 1) setQuotePhaseAnim(1);
        else if (mp === 2) setQuotePhaseAnim(5);
        else if (mp === 3) setQuotePhaseAnim(6);
        else if (mp === 4) setQuotePhaseAnim(7);
    };

    const isQuoteMenuStepActive = (ip: number) => {
        if (!isQuoteAuto && quoteMenuStep !== null) return quoteMenuStep === ip;
        if (ip === 1) return quotePhaseAnim >= 1 && quotePhaseAnim <= 4;
        if (ip === 2) return quotePhaseAnim === 5;
        if (ip === 3) return quotePhaseAnim === 6;
        if (ip === 4) return quotePhaseAnim >= 7;
        return false;
    };

    const isQuoteMenuStepDone = (ip: number) => {
        if (!isQuoteAuto && quoteMenuStep !== null) return ip < quoteMenuStep;
        if (ip === 1) return quotePhaseAnim > 4;
        if (ip === 2) return quotePhaseAnim > 5;
        if (ip === 3) return quotePhaseAnim > 6;
        return false;
    };

    return (
        <div className="w-full h-full flex items-center">
            <div className="mx-auto w-full max-w-[1240px] xl:max-w-[1360px] px-6">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    {/* Graphic Left */}
                    <div className="lg:col-span-6 order-2 lg:order-1 relative">
                        <QuoteGenAnimation
                            speed={1}
                            isAuto={isQuoteAuto}
                            controlledPhase={quoteMenuStep}
                            activeMenuStep={!isQuoteAuto ? quoteMenuStep : null}
                            onPhaseChange={(p) => setQuotePhaseAnim(p)}
                            onToggleAuto={() => { setIsQuoteAuto(prev => { if (!prev) setQuoteMenuStep(null); return !prev; }); }}
                        />
                    </div>

                    {/* Text Right */}
                    <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff]" />
                            Quote Generation & Analytics
                        </div>
                        <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                            A Quote Built On Gut Feel Is <br />
                            <span className="text-[#3666ff]">A Margin You're Giving Away.</span>
                        </h3>
                        <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                            Manual spreadsheets cause margin errors and lost deals. FactWise generates one-click customer quotes directly from your best bids — automatically rolling up BOMs, applying landed costs, and pricing every line item.
                        </p>
                        <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                            Gain instant visibility into your margins. Analyze category spend, uncover hidden costs, and model volume pricing — empowering you to send sharper quotes faster than the competition.
                        </p>
                        <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                            {[
                                { phase: 1, title: "Aggregate Supplier Bids" },
                                { phase: 2, title: "Apply Landed Costs" },
                                { phase: 3, title: "Analyze by Category" },
                                { phase: 4, title: "Volume Pricing Analysis" }
                            ].map((item) => (
                                <div
                                    key={item.phase}
                                    onClick={() => setQuoteManual(item.phase)}
                                    className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${
                                        isQuoteMenuStepActive(item.phase)
                                            ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                                            : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                                    }`}
                                >
                                    {isQuoteMenuStepActive(item.phase) && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
                                    )}
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${
                                            isQuoteMenuStepActive(item.phase)
                                                ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                                : isQuoteMenuStepDone(item.phase)
                                                ? 'border-[#00b884] bg-[#00b884] text-white'
                                                : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50 group-hover:text-[#3666ff]'
                                        }`}>
                                            <Check className="size-3.5" strokeWidth={3} />
                                        </div>
                                        <span className={`text-[13.5px] font-bold tracking-tight ${
                                            isQuoteMenuStepActive(item.phase) ? 'text-[#3666ff]' : isQuoteMenuStepDone(item.phase) ? 'text-slate-700' : 'text-slate-500'
                                        }`}>
                                            {item.title}
                                        </span>
                                    </div>
                                    {isQuoteMenuStepActive(item.phase) && (
                                        <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Active
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Panel navigation dots ────────────────────────────────────────────────────
const PANEL_LABELS = ['BOM & Cost', 'Sourcing', 'RFQ Analytics', 'Quote Generation'];

function PanelDots({ active }: { active: number }) {
    return (
        <div style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: 10, zIndex: 20,
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(15,23,42,0.07)',
            borderRadius: 999, padding: '8px 18px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}>
            {PANEL_LABELS.map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{
                        width: i === active ? 22 : 7,
                        height: 7,
                        borderRadius: 999,
                        background: i === active ? '#3666ff' : i < active ? '#00b884' : '#cbd5e1',
                        transition: 'all 0.35s cubic-bezier(.22,.61,.36,1)',
                    }} />
                    {i === active && (
                        <span style={{
                            fontSize: 9, fontWeight: 800, color: '#3666ff',
                            fontFamily: "'JetBrains Mono', monospace",
                            letterSpacing: '0.06em', textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                        }}>
                            {label}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}

// ─── Panel number badge ───────────────────────────────────────────────────────
function PanelBadge({ num, label }: { num: number; label: string }) {
    return (
        <div style={{
            position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: 8, zIndex: 20,
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(54,102,255,0.12)',
            borderRadius: 999, padding: '5px 14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
            <span style={{
                width: 18, height: 18, borderRadius: '50%',
                background: '#3666ff', color: 'white',
                display: 'grid', placeItems: 'center',
                fontSize: 9, fontWeight: 800, flexShrink: 0,
            }}>{num}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', letterSpacing: '-0.01em' }}>
                {label}
            </span>
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ScrollQuoteFlow() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePanelIdx, setActivePanelIdx] = useState(-1); // -1 = header, 0-3 = feature panels

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        if (!container) return;

        const panels = Array.from(
            container.querySelectorAll<HTMLElement>('[data-swipe-panel]')
        );
        if (panels.length === 0) return;

        gsap.set(panels.slice(1), { xPercent: 100 });
        gsap.set(panels, { zIndex: (i: number) => i });

        let currentIndex = -1;
        let animating = false;
        let intentObserver: ReturnType<typeof ScrollTrigger.observe>;

        function gotoPanel(index: number, isScrollingDown: boolean) {
            animating = true;

            if (
                (index === panels.length && isScrollingDown) ||
                (index === -1 && !isScrollingDown)
            ) {
                animating = false;
                intentObserver?.disable();
                setActivePanelIdx(-1);
                return;
            }

            setActivePanelIdx(index - 1);

            const target = isScrollingDown ? panels[index] : panels[currentIndex];
            gsap.to(target, {
                xPercent: isScrollingDown ? 0 : 100,
                duration: 0.75,
                ease: 'power2.inOut',
                onComplete: () => { animating = false; }
            });
            currentIndex = index;
        }

        intentObserver = ScrollTrigger.observe({
            type: 'wheel,touch',
            wheelSpeed: -1,
            tolerance: 10,
            preventDefault: true,
            onUp: () => !animating && gotoPanel(currentIndex + 1, true),
            onDown: () => !animating && gotoPanel(currentIndex - 1, false),
            onPress: (self: any) => {
                ScrollTrigger.isTouch && self.event.preventDefault();
            }
        });
        intentObserver.disable();

        const st = ScrollTrigger.create({
            trigger: container,
            pin: true,
            start: 'top top',
            end: '+=1',
            onEnter: () => {
                intentObserver.enable();
                gotoPanel(currentIndex + 1, true);
            },
            onEnterBack: () => {
                intentObserver.enable();
                gotoPanel(currentIndex - 1, false);
            }
        });

        ScrollTrigger.refresh();

        return () => {
            intentObserver?.kill();
            st?.kill();
            gsap.killTweensOf(panels);
        };
    }, []);

    const progressWidth = activePanelIdx < 0 ? '0%' : `${((activePanelIdx + 1) / 4) * 100}%`;

    return (
        <section className="relative bg-white">
            {/* Top progress bar — updates as panels advance */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#f1f5f9', zIndex: 100 }}>
                <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #3666ff, #00b884)',
                    width: progressWidth,
                    transition: 'width 0.75s ease',
                }} />
            </div>

            {/* ── Swipe container (100vh, pinned by GSAP) ───────────────────── */}
            <div
                ref={containerRef}
                style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}
            >
                {/* ── Panel 0: Header (always visible, z-index 0) ─────────────── */}
                <div
                    data-swipe-panel
                    style={{ position: 'absolute', inset: 0, background: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <div className="mx-auto w-full max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                            The FactWise Ecosystem
                        </div>
                        <h2 className="text-[36px] md:text-[48px] font-semibold text-[#0D1117] mb-6 tracking-[-0.03em] leading-[1.1] max-w-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                            Four core capabilities that <br />
                            <span className="text-[#3666ff]">change everything</span> about procurement.
                        </h2>
                        <p className="text-[17px] md:text-[18px] text-slate-400 font-normal max-w-2xl leading-[1.65] mb-10" style={{ fontFamily: 'var(--font-inter)' }}>
                            Built specifically for complex manufacturing and high-volume direct spend.
                            Scroll through the complete end-to-end lifecycle.
                        </p>

                        {/* Step dots + scroll hint */}
                        <div className="flex items-center gap-4">
                            <div style={{ display: 'flex', gap: 6 }}>
                                {PANEL_LABELS.map((label, i) => (
                                    <div
                                        key={i}
                                        title={label}
                                        style={{
                                            width: 8, height: 8, borderRadius: '50%',
                                            background: '#e2e8f0',
                                            transition: 'all 0.35s ease',
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <ChevronDown className="size-4 animate-bounce" />
                                <span className="text-[13px] font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                                    Scroll to explore 4 features
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Panel 1: BOM & Cost Intelligence ──────────────────────────── */}
                <div
                    data-swipe-panel
                    style={{ position: 'absolute', inset: 0, background: '#ffffff', overflow: 'hidden', transform: 'translateX(100%)' }}
                >
                    <PanelBadge num={1} label="BOM & Cost Intelligence" />
                    <BomPanel />
                    <PanelDots active={0} />
                </div>

                {/* ── Panel 2: Intelligent Sourcing ──────────────────────────────── */}
                <div
                    data-swipe-panel
                    style={{ position: 'absolute', inset: 0, background: '#f8faff', overflow: 'hidden', transform: 'translateX(100%)' }}
                >
                    <PanelBadge num={2} label="Intelligent Sourcing" />
                    <div className="w-full h-full flex items-center">
                        <div className="mx-auto w-full max-w-[1240px] xl:max-w-[1360px] px-6">
                            <SourcingPanel />
                        </div>
                    </div>
                    <PanelDots active={1} />
                </div>

                {/* ── Panel 3: RFQ Analytics ─────────────────────────────────────── */}
                <div
                    data-swipe-panel
                    style={{ position: 'absolute', inset: 0, background: '#ffffff', overflow: 'hidden', transform: 'translateX(100%)' }}
                >
                    <PanelBadge num={3} label="RFQ Analytics" />
                    <AnalyticsPanel />
                    <PanelDots active={2} />
                </div>

                {/* ── Panel 4: Quote Generation ──────────────────────────────────── */}
                <div
                    data-swipe-panel
                    style={{ position: 'absolute', inset: 0, background: '#f8faff', overflow: 'hidden', transform: 'translateX(100%)' }}
                >
                    <PanelBadge num={4} label="Quote Generation" />
                    <QuotePanel />
                    <PanelDots active={3} />
                </div>
            </div>
        </section>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RfqAnalyticsAnimation from './RfqAnalyticsAnimation';
import QuoteGenAnimation from './QuoteGenAnimation';
import {
    Zap,
    BarChart3,
    CheckCircle2,
    Plus,
    MousePointer2,
    Package,
    CircleDollarSign,
    Check,
    FileText,
    TrendingUp,
    RefreshCw,
    Search,
    ChevronRight,
    Users,
    Sparkles,
    Sliders,
    ArrowRight,
    Bell,
    Mail,
    Clock,
    Play,
    Pause,
    Send,
    Shield
} from 'lucide-react';

// Sourcing lifecycle animation constants
const VENDORS = [
    { id: 'v1', name: 'Sahasra Sourcing', code: 'SS', x: 10, y: 32 },
    { id: 'v2', name: 'Kaynes Technology', code: 'KT', x: 15, y: 62 },
    { id: 'v3', name: 'Global Circuits', code: 'GC', x: 50, y: 72 },
    { id: 'v4', name: 'PrimeForge Co.', code: 'PF', x: 85, y: 62 },
    { id: 'v5', name: 'Vertex Mfg', code: 'VM', x: 90, y: 32 }
];

const SCHEDULE = [
    { d: 'Day 0', lbl: 'RFQ sent', ic: Send },
    { d: 'Day 2', lbl: 'Auto reminder', ic: Mail },
    { d: 'Day 4', lbl: 'Auto escalation', ic: RefreshCw },
    { d: 'Day 5', lbl: 'Quotes received', ic: Check }
];

const QUOTES = [
    { code: 'PF', name: 'PrimeForge Co.', price: 18.42, lead: '12 d' },
    { code: 'VM', name: 'Vertex Mfg', price: 19.10, lead: '10 d' },
    { code: 'AI', name: 'Apex Industrial', price: 19.85, lead: '14 d' },
    { code: 'BW', name: 'BoltWorks Inc.', price: 20.40, lead: '9 d' },
    { code: 'TS', name: 'TitanSupply', price: 21.20, lead: '11 d' }
];

const APPROVAL_STEPS = [
    { name: 'Buyer', who: 'Priya S.', role: 'Procurement', code: 'PS' },
    { name: 'Manager', who: 'Vikram K.', role: 'Category Lead', code: 'VK' },
    { name: 'Finance', who: 'Tara S.', role: 'CFO Sign-off', code: 'TS' }
];

export default function QuoteToOrderFlow() {
    // Section 3.1 states
    const [activeRevision, setActiveRevision] = useState<'v2.1' | 'v1.2'>('v2.1');

    // Section 3.2 Sourcing Animation States (based on Phase2AutomationAnimation)
    const [sourcingPhase, setSourcingPhase] = useState<number>(1);
    const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
    const [rfqIn, setRfqIn] = useState<boolean>(false);
    const [vendorN, setVendorN] = useState<number>(0);
    const [pingsIn, setPingsIn] = useState<boolean>(false);
    const [delivered, setDelivered] = useState<boolean>(false);
    const [schedN, setSchedN] = useState<number>(0);
    const [schedLog, setSchedLog] = useState<number>(0);
    const [quoteN, setQuoteN] = useState<number>(0);
    const [approveN, setApproveN] = useState<number>(0);
    const [chipsN, setChipsN] = useState<number>(0);

    // Section 3.2 Auto-cycling timeline effect
    React.useEffect(() => {
        if (!isAutoCycling) return;

        let cancel = false;
        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

        async function runTimeline() {
            while (!cancel && isAutoCycling) {
                // Reset states
                setSourcingPhase(1);
                setRfqIn(false);
                setVendorN(0);
                setPingsIn(false);
                setDelivered(false);
                setSchedN(0);
                setSchedLog(0);
                setQuoteN(0);
                setApproveN(0);
                setChipsN(0);
                await sleep(400);

                // Phase 1: Intelligent RFQ Creation
                if (cancel) return;
                setRfqIn(true);
                await sleep(2200);

                // Phase 2: Auto-Routed Digital Approvals (flowchart)
                if (cancel) return;
                setSourcingPhase(2);
                setVendorN(5); setPingsIn(true); setDelivered(true);
                setSchedN(4); setSchedLog(3); setQuoteN(5);
                await sleep(500);
                for (let i = 1; i <= 3; i++) {
                    if (cancel) return;
                    setApproveN(i);
                    await sleep(700);
                }
                await sleep(2500);

                // Phase 3: Automated Supplier Fan-Out
                if (cancel) return;
                setSourcingPhase(3);
                setApproveN(0);
                setVendorN(0); setPingsIn(false); setDelivered(false);
                setSchedN(0); setSchedLog(0); setQuoteN(0);
                for (let i = 1; i <= 5; i++) {
                    if (cancel) return;
                    setVendorN(i);
                    await sleep(150);
                }
                await sleep(200);
                if (cancel) return;
                setPingsIn(true);
                await sleep(1200);
                if (cancel) return;
                setDelivered(true);
                await sleep(1800);

                // Phase 4: Inbox-Decoupled Auto Follow-Ups
                if (cancel) return;
                setSourcingPhase(4);
                await sleep(500);
                for (let i = 1; i <= 4; i++) {
                    if (cancel) return;
                    setSchedN(i);
                    await sleep(150);
                    setSchedLog(Math.min(i, 3));
                    await sleep(500);
                }
                await sleep(2000);
            }
        }

        runTimeline();

        return () => {
            cancel = true;
        };
    }, [isAutoCycling]);

    // Manual phase change helper that fills the completed states for that phase
    const setPhaseManual = (targetPhase: number) => {
        setIsAutoCycling(false);
        setSourcingPhase(targetPhase);
        
        if (targetPhase === 1) {
            // Intelligent RFQ Creation
            setRfqIn(true);
            setVendorN(0);
            setPingsIn(false);
            setDelivered(false);
            setSchedN(0);
            setSchedLog(0);
            setQuoteN(0);
            setApproveN(0);
            setChipsN(0);
        } else if (targetPhase === 2) {
            // Auto-Routed Digital Approvals
            setRfqIn(true);
            setVendorN(5);
            setPingsIn(true);
            setDelivered(true);
            setSchedN(4);
            setSchedLog(3);
            setQuoteN(5);
            setApproveN(3);
            setChipsN(0);
        } else if (targetPhase === 3) {
            // Automated Supplier Fan-Out
            setRfqIn(true);
            setVendorN(5);
            setPingsIn(true);
            setDelivered(true);
            setSchedN(0);
            setSchedLog(0);
            setQuoteN(0);
            setApproveN(0);
            setChipsN(0);
        } else if (targetPhase === 4) {
            // Inbox-Decoupled Auto Follow-Ups
            setRfqIn(true);
            setVendorN(5);
            setPingsIn(true);
            setDelivered(true);
            setSchedN(4);
            setSchedLog(3);
            setQuoteN(0);
            setApproveN(0);
            setChipsN(0);
        }
    };


    // Section 3.3 states
    const [analyticsPhase, setAnalyticsPhase] = useState<number>(0);
    const [isAnalyticsAuto, setIsAnalyticsAuto] = useState<boolean>(true);
    // Tracks which menu item was explicitly clicked (null = driven by auto animation)
    const [analyticsMenuStep, setAnalyticsMenuStep] = useState<number | null>(null);

    const setAnalyticsManual = (menuPhase: number) => {
        setIsAnalyticsAuto(false);
        setAnalyticsMenuStep(menuPhase);
        if (menuPhase === 1) setAnalyticsPhase(1);
        else if (menuPhase === 2) setAnalyticsPhase(4);
        else if (menuPhase === 3) setAnalyticsPhase(7);
        else if (menuPhase === 4) setAnalyticsPhase(8);
    };

    // Maps internal animation phases (0-8) to the 4 left-menu items
    // Phase 0        → nothing active
    // Phase 1-2      → menu item 1 "Supplier Bids Arrive"
    // Phase 3-6      → menu item 2 "Logistics Costs Applied"
    // Phase 7        → menu item 3 "Normalize to One Currency"
    // Phase 8        → menu item 4 "Lock Optimal Bid"
    const isMenuStepActive = (itemPhase: number) => {
        // In manual mode, use the explicitly selected menu step
        if (!isAnalyticsAuto && analyticsMenuStep !== null) {
            return analyticsMenuStep === itemPhase;
        }
        // In auto mode, derive from animation phase
        if (itemPhase === 1) return analyticsPhase >= 1 && analyticsPhase <= 2;
        if (itemPhase === 2) return analyticsPhase >= 3 && analyticsPhase <= 6;
        if (itemPhase === 3) return analyticsPhase === 7;
        if (itemPhase === 4) return analyticsPhase === 8;
        return false;
    };

    const isMenuStepDone = (itemPhase: number) => {
        // In manual mode, steps before the selected one are "done"
        if (!isAnalyticsAuto && analyticsMenuStep !== null) {
            return itemPhase < analyticsMenuStep;
        }
        // In auto mode, derive from animation phase
        if (itemPhase === 1) return analyticsPhase > 2;
        if (itemPhase === 2) return analyticsPhase > 6;
        if (itemPhase === 3) return analyticsPhase > 7;
        if (itemPhase === 4) return analyticsPhase > 8;
        return false;
    };

    // Section 3.4 states
    const [quotePhaseAnim, setQuotePhaseAnim] = useState<number>(0);
    const [isQuoteAuto, setIsQuoteAuto] = useState<boolean>(true);
    const [quoteMenuStep, setQuoteMenuStep] = useState<number | null>(null);

    const setQuoteManual = (menuPhase: number) => {
        setIsQuoteAuto(false);
        setQuoteMenuStep(menuPhase);
        // We also manually advance the animation phase just for visual sync
        if (menuPhase === 1) setQuotePhaseAnim(1);
        else if (menuPhase === 2) setQuotePhaseAnim(5);
        else if (menuPhase === 3) setQuotePhaseAnim(6);
        else if (menuPhase === 4) setQuotePhaseAnim(7);
    };

    const isQuoteMenuStepActive = (itemPhase: number) => {
        if (!isQuoteAuto && quoteMenuStep !== null) {
            return quoteMenuStep === itemPhase;
        }
        if (itemPhase === 1) return quotePhaseAnim >= 1 && quotePhaseAnim <= 4;
        if (itemPhase === 2) return quotePhaseAnim === 5;
        if (itemPhase === 3) return quotePhaseAnim === 6;
        if (itemPhase === 4) return quotePhaseAnim >= 7;
        return false;
    };

    return (
        <section className="py-24 relative overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Unified Main Header */}
                <div className="mb-24">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                        The FactWise Ecosystem
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1A1D2E] mb-6 tracking-tight leading-[1.1] max-w-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                        Four core capabilities that <br />
                        <span className="text-[#3666ff]">change everything</span> about procurement.
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                        Built specifically for complex manufacturing and high-volume direct spend.
                        A complete end-to-end lifecycle that replaces fragmented silos with intelligent automation.
                    </p>
                </div>

                {/* ============================================================================== */}
                {/* SECTION 3.1 — BOM & Cost Intelligence (Text Left, Graphic Right) */}
                {/* ============================================================================== */}
                <div id="section-3-1" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-40 scroll-mt-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 space-y-6 text-left"
                    >
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-ping" />
                            Section 3.1 — BOM & Cost Intelligence
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1D2E] tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            You can't price what you <br />
                            <span className="text-[#3666ff]">don't fully understand.</span>
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Building a multi-level BOM manually takes days. Tracking alternate parts, managing revisions, understanding what each component should cost — most teams are doing this across spreadsheets with no version control and no price visibility.
                        </p>
                        <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            FactWise lets you upload complex multi-level BOMs across multiple finished goods — with alternates per line — in a single import. The moment your BOM is live, see exactly what each part should cost — distributor prices, past PO rates, historical quotes, and contract prices — all at the line item level before a single RFQ goes out.
                        </p>
                        <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            As your BOM evolves, every revision is tracked. Compare versions side by side to see exactly what changed, what it costs, and why. Walk into every sourcing event knowing your numbers — not guessing them.
                        </p>
                    </motion.div>

                    {/* Graphic Right */}
                    <div className="lg:col-span-6 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-3xl bg-white border border-slate-200 p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden group"
                        >
                            {/* Browser bar */}
                            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    <div className="size-2.5 rounded-full bg-slate-200" />
                                    <div className="size-2.5 rounded-full bg-slate-200" />
                                    <div className="size-2.5 rounded-full bg-slate-200" />
                                </div>
                                <div className="text-[9px] font-mono text-slate-400 bg-white border border-slate-100 rounded px-4 py-0.5 shadow-xs">
                                    factwise.io / bom / controller-v2.1
                                </div>
                                <div className="h-3.5 w-12 bg-slate-100 rounded" />
                            </div>

                            {/* Core Workspace */}
                            <div className="p-5 space-y-4 bg-white text-left">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Active Workspace</span>
                                        <h4 className="text-xs font-bold text-slate-800">Industrial Controller PCB</h4>
                                    </div>
                                    <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
                                        <button
                                            onClick={() => setActiveRevision('v2.1')}
                                            className={`px-2 py-1 text-[8.5px] font-black rounded transition-all cursor-pointer ${activeRevision === 'v2.1' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400'}`}
                                        >
                                            v2.1 (Active)
                                        </button>
                                        <button
                                            onClick={() => setActiveRevision('v1.2')}
                                            className={`px-2 py-1 text-[8.5px] font-black rounded transition-all cursor-pointer ${activeRevision === 'v1.2' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400'}`}
                                        >
                                            v1.2
                                        </button>
                                    </div>
                                </div>

                                {/* BOM List */}
                                <div className="border border-slate-100 rounded-xl overflow-hidden shadow-xs">
                                    <div className="grid grid-cols-12 bg-slate-50/50 p-2.5 text-[8.5px] font-bold text-slate-400 uppercase border-b border-slate-100 font-mono tracking-wider">
                                        <div className="col-span-5">Component</div>
                                        <div className="col-span-3 text-right">Alternate Parts</div>
                                        <div className="col-span-4 text-right">Target Should-Cost</div>
                                    </div>
                                    <div className="divide-y divide-slate-100 text-[10px]">
                                        {/* Line 1 */}
                                        <div className="grid grid-cols-12 p-3 items-center hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-5 flex flex-col">
                                                <span className="font-bold text-slate-800">STM32F407VGT6 · MCU</span>
                                                <span className="text-[8px] text-slate-400 font-mono">STM · LQFP-100</span>
                                            </div>
                                            <div className="col-span-3 text-right">
                                                <span className="inline-flex items-center px-1.5 py-0.2 bg-blue-50 border border-blue-100 rounded text-blue-600 text-[8px] font-bold uppercase">
                                                    GD32, STM32F405
                                                </span>
                                            </div>
                                            <div className="col-span-4 text-right">
                                                <span className="font-bold text-slate-800 font-mono">$7.85</span>
                                                <span className="text-[7.5px] text-slate-400 block -mt-0.5">Feeds: Contract / Dist</span>
                                            </div>
                                        </div>

                                        {/* Line 2 */}
                                        <div className="grid grid-cols-12 p-3 items-center hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-5 flex flex-col">
                                                <span className="font-bold text-slate-800">PCB Multi-layer Board</span>
                                                <span className="text-[8px] text-slate-400 font-mono">100x80mm · FR4</span>
                                            </div>
                                            <div className="col-span-3 text-right">
                                                <span className="text-slate-400 italic text-[9px]">None</span>
                                            </div>
                                            <div className="col-span-4 text-right">
                                                <span className="font-bold text-slate-800 font-mono">$2.92</span>
                                                <span className="text-[7.5px] text-slate-400 block -mt-0.5">Feeds: Historical PO</span>
                                            </div>
                                        </div>

                                        {/* Line 3 */}
                                        <div className="grid grid-cols-12 p-3 items-center hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-5 flex flex-col">
                                                <span className="font-bold text-slate-800">Capacitor Array 10uF</span>
                                                <span className="text-[8px] text-slate-400 font-mono">SMD-0805 · Samsung</span>
                                            </div>
                                            <div className="col-span-3 text-right">
                                                <span className="inline-flex items-center px-1.5 py-0.2 bg-blue-50 border border-blue-100 rounded text-blue-600 text-[8px] font-bold uppercase">
                                                    Murata, Yageo
                                                </span>
                                            </div>
                                            <div className="col-span-4 text-right">
                                                <span className="font-bold text-slate-800 font-mono">$0.45</span>
                                                <span className="text-[7.5px] text-slate-400 block -mt-0.5">Feeds: Market Rate</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating intelligence alert */}
                                <div className="bg-[#E6F5EC] border border-[#C9E8D7] rounded-xl p-3 flex justify-between items-center text-[10px] text-emerald-800 font-medium">
                                    <div className="flex gap-2 items-center">
                                        <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                                        <span><b>AI Cost Check:</b> Target Should-Cost calculated from 4 contract sources.</span>
                                    </div>
                                    <span className="font-bold text-emerald-700 shrink-0 ml-2">99.8% accurate</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Side decoration log */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-8 -right-6 bg-white border border-slate-200/80 p-3 rounded-2xl shadow-xl z-20 hidden sm:flex items-center gap-3 max-w-[200px] text-left"
                        >
                            <div className="size-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                <TrendingUp className="size-4 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-[9px] font-bold text-slate-800">Cost Savings v1 vs v2</div>
                                <div className="text-[11px] font-black text-emerald-600 font-mono mt-0.5">- $3.71 / PCB unit</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ============================================================================== */}
                {/* SECTION 3.2 — Intelligent Sourcing & Vendor Communication (Graphic Left, Text Right) */}
                {/* ============================================================================== */}
                <div id="section-3-2" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-40 scroll-mt-24">
                    <style dangerouslySetInnerHTML={{ __html: `
                    .p2-stage {
                      flex: 1;
                      background: #fbfcfe;
                      border: 1px solid rgba(15,23,42,0.06);
                      border-radius: 16px;
                      padding: 18px;
                      position: relative;
                      overflow: hidden;
                      min-height: 440px;
                    }
                    .p2-scene {
                      position: absolute;
                      inset: 18px;
                      opacity: 0;
                      transition: opacity .4s ease;
                      pointer-events: none;
                    }
                    .p2-scene.on {
                      opacity: 1;
                      pointer-events: auto;
                    }
                    .p2-steps {
                      display: flex;
                      align-items: center;
                      gap: 6px;
                      padding: 14px 20px 0;
                    }
                    .p2-steps .pd {
                      height: 4px;
                      background: #e2e8f0;
                      border-radius: 99px;
                      flex: 1;
                      transition: all .35s ease;
                    }
                    .p2-steps .pd.on {
                      background: #3666ff;
                    }
                    .p2-steps .pd.done {
                      background: #cbd5e1;
                    }
                    .p2-stepLbl {
                      padding: 10px 20px 0;
                      display: flex;
                      align-items: baseline;
                      gap: 8px;
                    }
                    .p2-stepLbl .t {
                      font-size: 13px;
                      font-weight: 700;
                      color: #0b1322;
                      letter-spacing: -0.005em;
                    }
                    .p2-stepLbl .s {
                      font-family: 'JetBrains Mono', monospace;
                      font-size: 10px;
                      font-weight: 600;
                      color: #94a3b8;
                      letter-spacing: 0.06em;
                    }
                    .p2-stageFan {
                      position: absolute;
                      inset: 0;
                    }
                    .p2-rfq {
                      position: absolute;
                      left: 50%;
                      top: 8px;
                      width: 200px;
                      padding: 12px 14px;
                      background: white;
                      border: 1px solid rgba(54,102,255,0.25);
                      border-radius: 12px;
                      transform: translateX(-50%) scale(0.85);
                      opacity: 0;
                      box-shadow: 0 10px 25px -8px rgba(54,102,255,0.25);
                      transition: all .55s cubic-bezier(.22,.61,.36,1);
                      z-index: 4;
                    }
                    .p2-rfq.in {
                      transform: translateX(-50%) scale(1);
                      opacity: 1;
                    }
                    .p2-rfq::after {
                      content: "";
                      position: absolute;
                      inset: -4px;
                      border-radius: 16px;
                      border: 1.5px solid rgba(54,102,255,0.2);
                      animation: p2-ring 2.4s ease-out infinite;
                      opacity: 0;
                      pointer-events: none;
                    }
                    .p2-rfq.in::after {
                      opacity: 1;
                    }
                    @keyframes p2-ring {
                      0% { transform: scale(0.94); opacity: 0.7; }
                      100% { transform: scale(1.12); opacity: 0; }
                    }
                    .p2-rfq .rh {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    }
                    .p2-rfq .rh .tag {
                      font-family: 'JetBrains Mono', monospace;
                      font-size: 9px;
                      font-weight: 800;
                      color: #3666ff;
                      letter-spacing: 0.06em;
                    }
                    .p2-rfq .rh .live {
                      font-size: 9px;
                      font-weight: 700;
                      color: #00b884;
                      display: flex;
                      align-items: center;
                      gap: 4px;
                    }
                    .p2-rfq .rh .live::before {
                      content: "";
                      width: 5px;
                      height: 5px;
                      border-radius: 50%;
                      background: #00b884;
                    }
                    .p2-rfq .rtitle {
                      font-size: 12px;
                      font-weight: 800;
                      color: #0b1322;
                      margin-top: 6px;
                      letter-spacing: -0.015em;
                      line-height: 1.2;
                    }
                    .p2-rfq .rmeta {
                      font-size: 10px;
                      color: #64748b;
                      margin-top: 3px;
                      display: flex;
                      gap: 12px;
                    }
                    .p2-rfq .rmeta b {
                      color: #0b1322;
                      font-weight: 700;
                    }
                    .p2-vendor {
                      position: absolute;
                      width: 130px;
                      padding: 10px 12px;
                      background: white;
                      border: 1px solid rgba(15,23,42,0.08);
                      border-radius: 12px;
                      transform: scale(0.7);
                      opacity: 0;
                      transition: all .55s cubic-bezier(.22,.61,.36,1);
                      z-index: 3;
                    }
                    .p2-vendor.in {
                      transform: scale(1);
                      opacity: 1;
                    }
                    .p2-vendor.delivered {
                      border-color: rgba(0,184,132,0.3);
                      background: #f6fcf9;
                    }
                    .p2-vendor .vh {
                      display: flex;
                      align-items: center;
                      gap: 7px;
                    }
                    .p2-vendor .vlogo {
                      width: 24px;
                      height: 24px;
                      border-radius: 6px;
                      display: grid;
                      place-items: center;
                      background: linear-gradient(135deg, #475569, #64748b);
                      color: white;
                      font-size: 10px;
                      font-weight: 800;
                      flex-shrink: 0;
                    }
                    .p2-vendor .vname {
                      font-size: 11px;
                      font-weight: 700;
                      color: #0b1322;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                    .p2-vendor .vmeta {
                      font-size: 9.5px;
                      color: #94a3b8;
                      margin-top: 6px;
                      display: flex;
                      align-items: center;
                      gap: 5px;
                      font-family: 'JetBrains Mono', monospace;
                      font-weight: 600;
                    }
                    .p2-vendor .vdot {
                      width: 5px;
                      height: 5px;
                      border-radius: 50%;
                      background: #cbd5e1;
                      transition: all .3s ease;
                    }
                    .p2-vendor.delivered .vmeta {
                      color: #00b884;
                    }
                    .p2-vendor.delivered .vdot {
                      background: #00b884;
                    }
                    .p2-fanEdges {
                      position: absolute;
                      inset: 0;
                      pointer-events: none;
                    }
                    .p2-fanEdges svg {
                      width: 100%;
                      height: 100%;
                      overflow: visible;
                    }
                    .p2-fanEdges path {
                      fill: none;
                      stroke: #3666ff;
                      stroke-width: 1.2;
                      stroke-opacity: 0.4;
                      stroke-dasharray: 4 4;
                      stroke-dashoffset: 200;
                      transition: stroke-dashoffset .6s ease, stroke .3s ease;
                    }
                    .p2-fanEdges path.in {
                      stroke-dashoffset: 0;
                      animation: p2-flow 1.2s linear infinite;
                    }
                    @keyframes p2-flow {
                      to { stroke-dashoffset: -16; }
                    }
                    .p2-fanEdges path.delivered {
                      stroke: #00b884;
                      stroke-opacity: 0.55;
                    }
                    .p2-sched {
                      position: absolute;
                      inset: 0;
                      display: flex;
                      flex-direction: column;
                      gap: 14px;
                    }
                    .p2-schedTrack {
                      position: relative;
                      background: white;
                      border: 1px solid rgba(15,23,42,0.06);
                      border-radius: 14px;
                      padding: 24px 20px 20px;
                    }
                    .p2-schedLine {
                      position: absolute;
                      left: 36px;
                      right: 36px;
                      top: 48px;
                      height: 2px;
                      background: #e2e8f0;
                      border-radius: 2px;
                    }
                    .p2-schedLine::after {
                      content: "";
                      position: absolute;
                      left: 0;
                      top: 0;
                      height: 100%;
                      width: var(--p, 0%);
                      background: #3666ff;
                      border-radius: 2px;
                      transition: width .8s ease;
                    }
                    .p2-schedStops {
                      position: relative;
                      display: flex;
                      justify-content: space-between;
                      margin: 0 8px;
                    }
                    .p2-schedStop {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      gap: 7px;
                      position: relative;
                      z-index: 2;
                    }
                    .p2-schedDot {
                      width: 18px;
                      height: 18px;
                      border-radius: 50%;
                      background: white;
                      border: 2px solid #cbd5e1;
                      display: grid;
                      place-items: center;
                      transition: all .35s cubic-bezier(.34,1.56,.64,1);
                    }
                    .p2-schedDot.fired {
                      background: #3666ff;
                      border-color: #3666ff;
                      box-shadow: 0 0 0 4px rgba(54,102,255,0.15);
                    }
                    .p2-schedDot.fired svg {
                      color: white;
                    }
                    .p2-schedDot.done {
                      background: #00b884;
                      border-color: #00b884;
                      box-shadow: 0 0 0 4px rgba(0,184,132,0.15);
                    }
                    .p2-schedLbl {
                      font-size: 10px;
                      font-weight: 800;
                      color: #94a3b8;
                      letter-spacing: 0.04em;
                      font-family: 'JetBrains Mono', monospace;
                    }
                    .p2-schedSub {
                      font-size: 10px;
                      color: #64748b;
                      text-align: center;
                      max-width: 80px;
                      line-height: 1.3;
                    }
                    .p2-schedStop.fired .p2-schedLbl {
                      color: #3666ff;
                    }
                    .p2-schedStop.done .p2-schedLbl {
                      color: #00b884;
                    }
                    .p2-schedLog {
                      display: flex;
                      flex-direction: column;
                      gap: 8px;
                      flex: 1;
                      min-height: 0;
                    }
                    .p2-logRow {
                      display: flex;
                      align-items: center;
                      gap: 12px;
                      padding: 10px 14px;
                      background: white;
                      border: 1px solid rgba(15,23,42,0.06);
                      border-radius: 10px;
                      font-size: 11px;
                      color: #475569;
                      opacity: 0;
                      transform: translateY(6px);
                      transition: all .35s ease;
                    }
                    .p2-logRow.in {
                      opacity: 1;
                      transform: translateY(0);
                    }
                    .p2-logRow .lic {
                      width: 24px;
                      height: 24px;
                      border-radius: 6px;
                      background: rgba(54,102,255,0.1);
                      color: #3666ff;
                      display: grid;
                      place-items: center;
                      flex-shrink: 0;
                    }
                    .p2-logRow .lt {
                      flex: 1;
                    }
                    .p2-logRow .lt b {
                      color: #0b1322;
                      font-weight: 700;
                    }
                    .p2-logRow .lm {
                      font-family: 'JetBrains Mono', monospace;
                      font-size: 10px;
                      color: #94a3b8;
                    }
                    .p2-quotes {
                      position: absolute;
                      inset: 0;
                      display: flex;
                      flex-direction: column;
                      gap: 8px;
                    }
                    .p2-qhead {
                      display: grid;
                      grid-template-columns: 1.4fr 0.7fr 0.5fr 0.5fr;
                      gap: 8px;
                      font-size: 9px;
                      font-weight: 800;
                      color: #94a3b8;
                      letter-spacing: 0.08em;
                      text-transform: uppercase;
                      padding: 4px 12px 10px;
                      border-bottom: 1px solid rgba(15,23,42,0.05);
                    }
                    .p2-qrow {
                      display: grid;
                      grid-template-columns: 1.4fr 0.7fr 0.5fr 0.5fr;
                      gap: 8px;
                      padding: 10px 12px;
                      align-items: center;
                      background: white;
                      border: 1px solid rgba(15,23,42,0.06);
                      border-radius: 10px;
                      opacity: 0;
                      transform: translateX(-10px);
                      transition: all .45s cubic-bezier(.22,.61,.36,1);
                    }
                    .p2-qrow.in {
                      opacity: 1;
                      transform: translateX(0);
                    }
                    .p2-qrow.best {
                      border-color: rgba(0,184,132,0.35);
                      background: #f6fcf9;
                    }
                    .p2-qrow .qv {
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      min-width: 0;
                    }
                    .p2-qrow .qvlogo {
                      width: 24px;
                      height: 24px;
                      border-radius: 6px;
                      display: grid;
                      place-items: center;
                      background: linear-gradient(135deg, #475569, #64748b);
                      color: white;
                      font-size: 10px;
                      font-weight: 800;
                      flex-shrink: 0;
                    }
                    .p2-qrow .qvname {
                      font-size: 11px;
                      font-weight: 700;
                      color: #0b1322;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                    .p2-qrow .qprice {
                      font-family: 'JetBrains Mono', monospace;
                      font-size: 12px;
                      font-weight: 800;
                      color: #0b1322;
                    }
                    .p2-qrow.best .qprice {
                      color: #00b884;
                    }
                    .p2-qrow .qlead {
                      font-size: 10.5px;
                      color: #64748b;
                      font-family: 'JetBrains Mono', monospace;
                    }
                    .p2-qrow .qbadge {
                      font-size: 9px;
                      font-weight: 800;
                      padding: 4px 8px;
                      border-radius: 5px;
                      background: #f1f5f9;
                      color: #64748b;
                      letter-spacing: 0.04em;
                      text-align: center;
                    }
                    .p2-qrow.best .qbadge {
                      background: #00b884;
                      color: white;
                    }
                    /* === Approval Inbox Styles === */
                     .p2-approve {
                      position: absolute;
                      inset: 0;
                      display: flex;
                      flex-direction: column;
                      gap: 10px;
                    }
                     .p2-approveHeader {
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      padding-bottom: 8px;
                      border-bottom: 1px solid rgba(15,23,42,0.06);
                    }
                     .p2-approveHeader .ah-left {
                      display: flex;
                      align-items: center;
                      gap: 8px;
                    }
                     .p2-approveHeader .ah-dot {
                      width: 7px;
                      height: 7px;
                      border-radius: 50%;
                      background: #3666ff;
                      animation: p2-pulse 1.6s ease-in-out infinite;
                    }
                     .p2-approveHeader .ah-title {
                      font-size: 11px;
                      font-weight: 700;
                      color: #475569;
                    }
                     .p2-approveHeader .ah-badge {
                      font-family: 'JetBrains Mono', monospace;
                      font-size: 10px;
                      font-weight: 700;
                      color: #00b884;
                      opacity: 0;
                      transition: opacity .4s ease;
                    }
                     .p2-approveHeader .ah-badge.in {
                      opacity: 1;
                    }
                     /* Approval card */
                     .p2-acard {
                      background: white;
                      border: 1px solid rgba(15,23,42,0.08);
                      border-radius: 12px;
                      padding: 11px 13px;
                      display: flex;
                      align-items: center;
                      gap: 11px;
                      opacity: 0;
                      transform: translateY(8px);
                      transition: all .45s cubic-bezier(.22,.61,.36,1);
                      position: relative;
                      overflow: hidden;
                    }
                     .p2-acard.in {
                      opacity: 1;
                      transform: translateY(0);
                    }
                     .p2-acard.done {
                      border-color: rgba(0,184,132,0.3);
                      background: linear-gradient(to right, #f6fcf9, white);
                    }
                     .p2-acard .ac-av {
                      width: 32px;
                      height: 32px;
                      border-radius: 50%;
                      display: grid;
                      place-items: center;
                      font-size: 9px;
                      font-weight: 800;
                      color: white;
                      flex-shrink: 0;
                    }
                     .p2-acard .ac-body {
                      flex: 1;
                      min-width: 0;
                    }
                     .p2-acard .ac-name {
                      font-size: 11px;
                      font-weight: 800;
                      color: #0b1322;
                      letter-spacing: -0.01em;
                    }
                     .p2-acard .ac-role {
                      font-size: 9.5px;
                      color: #94a3b8;
                      font-family: 'JetBrains Mono', monospace;
                      letter-spacing: 0.04em;
                      margin-top: 1px;
                    }
                     .p2-acard .ac-amt {
                      font-family: 'JetBrains Mono', monospace;
                      font-size: 11px;
                      font-weight: 800;
                      color: #0b1322;
                      white-space: nowrap;
                    }
                     .p2-acard .ac-stamp {
                      display: flex;
                      align-items: center;
                      gap: 5px;
                      font-size: 9px;
                      font-weight: 800;
                      letter-spacing: 0.06em;
                      text-transform: uppercase;
                      padding: 4px 9px;
                      border-radius: 6px;
                      flex-shrink: 0;
                      transition: all .4s ease;
                    }
                     .p2-acard .ac-stamp.pending {
                      background: #f1f5f9;
                      color: #94a3b8;
                    }
                     .p2-acard .ac-stamp.approved {
                      background: rgba(0,184,132,0.12);
                      color: #00b884;
                    }
                     /* Shimmer sweep on approve */
                     .p2-acard::after {
                      content: "";
                      position: absolute;
                      inset: 0;
                      background: linear-gradient(90deg, transparent, rgba(0,184,132,0.06), transparent);
                      transform: translateX(-100%);
                      transition: transform 0s;
                    }
                     .p2-acard.done::after {
                      transform: translateX(100%);
                      transition: transform .6s ease;
                    }
                    .p2-finale {
                      position: absolute;
                      inset: 0;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      gap: 14px;
                      padding: 0 14px;
                    }
                    .p2-compare {
                      display: flex;
                      gap: 20px;
                      align-items: center;
                      background: white;
                      border: 1px solid rgba(15,23,42,0.08);
                      border-radius: 14px;
                      padding: 14px 24px;
                    }
                    .p2-compare .col {
                      text-align: center;
                    }
                    .p2-compare .col .v {
                      font-size: 24px;
                      font-weight: 800;
                      letter-spacing: -0.025em;
                      line-height: 1;
                    }
                    .p2-compare .col .l {
                      font-size: 9px;
                      font-weight: 700;
                      color: #94a3b8;
                      margin-top: 5px;
                      letter-spacing: 0.1em;
                      text-transform: uppercase;
                    }
                    .p2-compare .col.before .v {
                      color: #94a3b8;
                      text-decoration: line-through;
                    }
                    .p2-compare .col.after  .v {
                      color: #00b884;
                    }
                    .p2-compare .arrow {
                      color: #3666ff;
                    }
                    .p2-fbig {
                      font-size: 44px;
                      font-weight: 800;
                      letter-spacing: -0.04em;
                      color: #0b1322;
                      line-height: 1;
                      margin-top: 2px;
                    }
                    .p2-fbig .em {
                      color: #3666ff;
                    }
                    .p2-fsub {
                      font-size: 11px;
                      font-weight: 700;
                      color: #94a3b8;
                      letter-spacing: 0.1em;
                      text-transform: uppercase;
                    }
                    .p2-fchips {
                      display: flex;
                      gap: 6px;
                      margin-top: 6px;
                      flex-wrap: wrap;
                      justify-content: center;
                    }
                    .p2-fchip {
                      display: inline-flex;
                      align-items: center;
                      gap: 6px;
                      padding: 6px 12px;
                      background: white;
                      border: 1px solid rgba(15,23,42,0.08);
                      border-radius: 999px;
                      font-size: 10.5px;
                      font-weight: 600;
                      color: #475569;
                      opacity: 0;
                      transform: translateY(4px);
                      transition: all .4s ease;
                    }
                    .p2-fchip.in {
                      opacity: 1;
                      transform: translateY(0);
                    }
                    .p2-fchip .ic {
                      color: #00b884;
                    }
                    .p2-cap {
                      position: absolute;
                      left: 18px;
                      bottom: 14px;
                      right: 18px;
                      font-size: 12px;
                      font-weight: 600;
                      color: #64748b;
                      line-height: 1.5;
                      display: flex;
                      align-items: center;
                      gap: 12px;
                      padding: 12px 16px;
                      background: white;
                      border: 1px solid rgba(15,23,42,0.08);
                      border-radius: 12px;
                      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                      transition: opacity .35s ease, transform .35s ease;
                      opacity: 0;
                      transform: translateY(10px);
                      pointer-events: none;
                    }
                    .p2-cap.on {
                      opacity: 1;
                      transform: translateY(0);
                    }
                    .p2-cap .cd {
                      width: 5px;
                      height: 5px;
                      border-radius: 50%;
                      background: #3666ff;
                      flex-shrink: 0;
                      animation: p2-pulse 1.6s ease-in-out infinite;
                    }
                    @keyframes p2-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }
                    ` }} />

                    {/* Graphic Left */}
                    <div className="lg:col-span-6 order-2 lg:order-1 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-3xl bg-white border border-slate-200/80 p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col justify-between select-none" style={{ height: '578px', minHeight: '578px', maxHeight: '578px' }}
                        >
                            {/* TOP BAR */}
                            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="size-6 rounded-lg bg-gradient-to-br from-blue-700 to-[#3666ff] text-white flex items-center justify-center shadow-[0_4px_10px_rgba(54,102,255,0.3)] shrink-0">
                                        <Zap className="size-3.5" />
                                    </div>
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <span className="text-[12px] font-bold text-slate-800 tracking-tight shrink-0">Sourcing Hub</span>
                                        <span className="text-slate-300 text-[10px]">/</span>
                                        <span className="text-[11px] font-medium text-slate-500 truncate">RFQ-2026-0871 · Steel Bracket M8</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">
                                    <span className={`size-1.5 rounded-full ${isAutoCycling ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                    <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                                        {isAutoCycling ? 'Auto-Pilot' : 'Manual'}
                                    </span>
                                </div>
                            </div>

                            {/* STAGE SCREEN */}
                            <div className="p2-stage">
                                {/* SCENE 1 & 3: RFQ + FAN (phases 1 and 3) */}
                                <div className={"p2-scene " + ((sourcingPhase === 1 || sourcingPhase === 3) ? "on" : "")}>
                                    <div className="p2-stageFan">
                                        <div className={"p2-rfq " + (rfqIn ? "in" : "")}>
                                            <div className="rh">
                                                <span className="tag">RFQ-2026-0871</span>
                                                <span className="live">Live</span>
                                            </div>
                                            <div className="rtitle">Steel Bracket M8 · 304</div>
                                            <div className="rmeta">
                                                <span>Qty <b>1,200</b></span>
                                                <span>Due <b>Sep 15</b></span>
                                            </div>
                                        </div>
                                        <div className="p2-fanEdges">
                                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                                                {VENDORS.map((v, i) => (
                                                    <path key={v.id}
                                                          d={`M 50 20 Q ${(50 + v.x) / 2} ${(14 + v.y) / 2 - 6}, ${v.x} ${v.y}`}
                                                          className={(vendorN > i && pingsIn ? "in " : "") + (delivered ? "delivered" : "")}
                                                          pathLength={200} />
                                                ))}
                                            </svg>
                                        </div>
                                        {VENDORS.map((v, i) => (
                                            <div key={v.id}
                                                 className={"p2-vendor " + (vendorN > i ? "in " : "") + (delivered ? "delivered" : "")}
                                                 style={{
                                                     left: `calc(${v.x}% - 65px)`,
                                                     top: `calc(${v.y}% - 22px)`,
                                                 }}>
                                                <div className="vh">
                                                    <div className="vlogo">{v.code}</div>
                                                    <div className="vname">{v.name}</div>
                                                </div>
                                                <div className="vmeta">
                                                    <span className="vdot" />
                                                    <span className="text-[8px] font-bold tracking-wide">
                                                        {delivered ? "DELIVERED" : pingsIn ? "SENDING…" : "QUEUED"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* SCENE 4: SCHEDULE (inbox follow-ups) */}
                                <div className={"p2-scene " + (sourcingPhase === 4 ? "on" : "")}>
                                    <div className="p2-sched">
                                        <div className="p2-schedTrack">
                                            <div className="p2-schedLine" style={{ "--p": `${Math.min(100, (schedN / SCHEDULE.length) * 100)}%` } as React.CSSProperties} />
                                            <div className="p2-schedStops">
                                                {SCHEDULE.map((st, i) => {
                                                    const Ic = st.ic;
                                                    const fired = schedN > i;
                                                    const done = schedN > i + 1 || (i === SCHEDULE.length - 1 && schedN >= SCHEDULE.length);
                                                    const cls = "p2-schedStop" + (fired ? " fired" : "") + (done ? " done" : "");
                                                    return (
                                                        <div key={st.d} className={cls}>
                                                            <div className={"p2-schedDot " + (fired ? "fired " : "") + (done ? "done" : "")}>
                                                                {fired && <Ic size={8} />}
                                                            </div>
                                                            <div className="p2-schedLbl">{st.d}</div>
                                                            <div className="p2-schedSub">{st.lbl}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="p2-schedLog">
                                            {[
                                                { ic: Send, t: <><b>RFQ-2026-0871</b> sent to 5 vendors</>, m: "T+0" },
                                                { ic: Mail, t: <>Auto-reminder fired to <b>2 non-responders</b></>, m: "T+48h" },
                                                { ic: Check, t: <><b>5 of 5</b> quotes received</>, m: "T+5d" },
                                            ].slice(0, schedLog).map((row, i) => (
                                                <div key={i} className={"p2-logRow in"}>
                                                    <div className="lic"><row.ic size={11} /></div>
                                                    <div className="lt">{row.t}</div>
                                                    <div className="lm">{row.m}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* (SCENE 4 / QUOTES removed — was Landed Cost, no longer used) */}

                                {/* SCENE 2: APPROVAL INBOX ANIMATION */}
                                <div className={"p2-scene " + (sourcingPhase === 2 ? "on" : "")}>
                                    <div className="p2-approve">
                                        {/* Header */}
                                        <div className="p2-approveHeader">
                                            <div className="ah-left">
                                                <div className="ah-dot" />
                                                <span className="ah-title">Approval Queue · Auto-routed</span>
                                            </div>
                                            <span className={"ah-badge " + (approveN >= 3 ? "in" : "")}>
                                                ✓ {approveN}/3 Approved
                                            </span>
                                        </div>

                                        {/* RFQ context pill */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(54,102,255,0.06)', border: '1px solid rgba(54,102,255,0.12)', borderRadius: 10, padding: '7px 12px' }}>
                                            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(54,102,255,0.12)', display: 'grid', placeItems: 'center', color: '#3666ff', flexShrink: 0 }}>
                                                <Zap size={11} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 10, fontWeight: 800, color: '#1e3a8a', letterSpacing: '-0.01em' }}>RFQ-2026-0871 · PrimeForge Co. selected</div>
                                                <div style={{ fontSize: 9, color: '#3666ff', fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.04em', marginTop: 1 }}>$18.42/unit · 1,200 pcs · $22,104 total</div>
                                            </div>
                                            <div style={{ fontSize: 9, fontWeight: 700, color: '#3666ff', background: 'rgba(54,102,255,0.1)', borderRadius: 5, padding: '3px 7px', fontFamily: "'JetBrains Mono',monospace" }}>AUTO</div>
                                        </div>

                                        {/* Approval cards */}
                                        {([
                                            { step: 0, name: 'Priya S.', role: 'BUYER · PROCUREMENT', color: '#6366f1', code: 'PS', limit: '$25K' },
                                            { step: 1, name: 'Vikram K.', role: 'MANAGER · CATEGORY LEAD', color: '#0ea5e9', code: 'VK', limit: '$100K' },
                                            { step: 2, name: 'Tara S.', role: 'CFO · FINANCE', color: '#8b5cf6', code: 'TS', limit: 'FINAL' },
                                        ] as const).map(({ step, name, role, color, code, limit }) => {
                                            const isIn = approveN >= step;   // card visible
                                            const isDone = approveN > step;  // stamped approved
                                            return (
                                                <div key={code} className={"p2-acard " + (isIn ? "in " : "") + (isDone ? "done" : "")} style={{ transitionDelay: `${step * 0.1}s` }}>
                                                    <div className="ac-av" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>{code}</div>
                                                    <div className="ac-body">
                                                        <div className="ac-name">{name}</div>
                                                        <div className="ac-role">{role}</div>
                                                    </div>
                                                    <div className="ac-amt">{limit}</div>
                                                    <div className={"ac-stamp " + (isDone ? "approved" : "pending")}>
                                                        {isDone ? <><Check size={9} /> Approved</> : <><Clock size={9} /> Pending</>}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Final PO issued row */}
                                        <div className={"p2-acard " + (approveN >= 3 ? "in done" : "")} style={{ transitionDelay: '0.3s', marginTop: 2 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(0,184,132,0.15)', color: '#00b884', flexShrink: 0 }}>
                                                <Check size={15} />
                                            </div>
                                            <div className="ac-body">
                                                <div className="ac-name" style={{ color: '#065f46' }}>PO Issued · Compliance Logged</div>
                                                <div className="ac-role" style={{ color: '#00b884' }}>FULLY APPROVED · AUDIT TRAIL SAVED</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* NARRATIVE FOOTER */}
                                <div className={"p2-cap " + (sourcingPhase > 0 ? "on" : "")}>
                                    <span className="cd" />
                                    <span>
                                        {sourcingPhase === 1 ? "Quick digital setup in minutes with pre-filled category templates. FactWise automatically pulls historical PO rates at the line item level, flagging any should-cost anomalies before launch." :
                                         sourcingPhase === 2 ? "Once a bid is selected, approvals flow down the hierarchy automatically — Buyer → Manager → Finance. Leaders sign off on the platform, auto-generating a full compliance audit trail." :
                                         sourcingPhase === 3 ? "Skip manual emails. FactWise scans supplier profiles and parts history to match qualified vendors, instantly dispatching RFQs concurrently via secure portal access." :
                                         sourcingPhase === 4 ? "Emails disappear entirely. FactWise's scheduler manages automatic reminder follow-ups and escalations hands-free, logging supplier bids directly to the platform." : ""}
                                    </span>
                                </div>
                            </div>

                            {/* Control Footer */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 mt-2">
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => setIsAutoCycling(!isAutoCycling)}
                                        className="size-5 rounded-md hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer text-slate-500"
                                        title={isAutoCycling ? "Pause Autoplay" : "Resume Autoplay"}
                                    >
                                        {isAutoCycling ? <Pause className="size-3" /> : <Play className="size-3" />}
                                    </button>
                                    <span className="font-medium">
                                        {isAutoCycling ? "Autopilot Active (Cycling 15s lifecycle)" : "Paused (Select phases on the right guide)"}
                                    </span>
                                </div>
                                <span className="font-mono text-[9px] uppercase tracking-wider text-[#3666ff] font-bold">
                                    FactWise Engine
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Text Right - 6-Phase Interactive Guide Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left"
                    >
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-pulse" />
                            Intelligent Sourcing & Vendor Communication
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1D2E] tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            Your team shouldn't be <br />
                            <span className="text-[#3666ff]">chasing vendors over email.</span>
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Setting up a sourcing event manually means building vendor lists from scratch, writing emails, following up repeatedly, and re-entering responses into a spreadsheet. FactWise automates routine tasks, combined requisitions, and bid analysis so your team focuses on decisions, not data entry.
                        </p>

                        {/* Interactive Phases Grid */}
                        <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                            {[
                                { phase: 1, title: "Intelligent RFQ Creation" },
                                { phase: 2, title: "Auto-Routed Digital Approvals" },
                                { phase: 3, title: "Automated Supplier Fan-Out" },
                                { phase: 4, title: "Inbox-Decoupled Auto Follow-Ups" }
                            ].map((item, index) => (
                                <div
                                    key={item.phase}
                                    onClick={() => setPhaseManual(item.phase)}
                                    className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${
                                        sourcingPhase === item.phase 
                                            ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10' 
                                            : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                                    }`}
                                >
                                    {sourcingPhase === item.phase && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
                                    )}

                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${
                                            sourcingPhase === item.phase
                                                ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                                : sourcingPhase > item.phase 
                                                ? 'border-[#00b884] bg-[#00b884] text-white'
                                                : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50 group-hover:text-[#3666ff]'
                                        }`}>
                                            <Check className="size-3.5" strokeWidth={3} />
                                        </div>
                                        <span className={`text-[13.5px] font-bold tracking-tight ${
                                            sourcingPhase === item.phase ? 'text-[#3666ff]' : sourcingPhase > item.phase ? 'text-slate-700' : 'text-slate-500'
                                        }`}>
                                            {item.title}
                                        </span>
                                    </div>

                                    {sourcingPhase === item.phase && (
                                        <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Active
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                    </motion.div>
                </div>

                {/* ============================================================================== */}
                {/* SECTION 3.3 — RFQ Analytics (Text Left, Graphic Right) */}
                {/* ============================================================================== */}
                <div id="section-3-3" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-40 scroll-mt-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 space-y-6 text-left"
                    >
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff]" />
                            Section 3.3 — RFQ Analytics
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1D2E] tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            The cheapest quote on paper is rarely the <span className="text-[#3666ff]">cheapest purchase in reality.</span>
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Most teams award on unit price alone — missing duties, freight, insurance, and packaging that quietly erode margin. FactWise applies your landed cost formulas across every bid automatically, so every comparison reflects true cost, normalized to your currency.
                        </p>
                        <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            See the best price per line item across all vendors in one view. Drill into competitive, non-competitive, and excluded bids per supplier — then award with complete confidence.
                        </p>

                        {/* Interactive Phases Grid */}
                        <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                            {[
                                { phase: 1, title: "Supplier Bids Arrive" },
                                { phase: 2, title: "Logistics Costs Applied" },
                                { phase: 3, title: "Normalize to One Currency" },
                                { phase: 4, title: "Lock Optimal Bid" }
                            ].map((item, index) => (
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

                    {/* Graphic Right */}
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

                            {/* Floating recommendation box - maps to phase 9 (Auto-recommendation) */}
                            <AnimatePresence>
                                {analyticsPhase === 9 && (
                                    <motion.div
                                        key="rec-box"
                                        initial={{ opacity: 0, y: 16, scale: 0.92 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                                        className="absolute -bottom-10 -left-6 bg-[#0B0F14] text-white p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-20 max-w-[230px] text-left"
                                    >
                                        <div className="flex gap-2 items-center mb-1.5">
                                            <Sparkles className="size-3 text-amber-400 animate-pulse" />
                                            <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest font-mono">Best Award Rec</span>
                                        </div>
                                        <p className="text-[10px] text-slate-200 leading-snug">
                                            Split order <b className="text-white">60/40</b> to <b className="text-emerald-400">Sahasra</b> + <b className="text-amber-400">Varroc</b>. De-risks single-supplier dependency.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* ============================================================================== */}
                {/* SECTION 3.4 — Quote Generation & Analytics (Graphic Left, Text Right) */}
                {/* ============================================================================== */}
                <div id="section-3-4" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
                    {/* Graphic Left — QuoteGenAnimation */}
                    <div className="lg:col-span-6 order-2 lg:order-1 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <QuoteGenAnimation 
                                speed={1}
                                isAuto={isQuoteAuto}
                                controlledPhase={quoteMenuStep}
                                activeMenuStep={!isQuoteAuto ? quoteMenuStep : null}
                                onPhaseChange={(p) => setQuotePhaseAnim(p)}
                                onToggleAuto={() => { setIsQuoteAuto(prev => { if (!prev) setQuoteMenuStep(null); return !prev; }); }}
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 space-y-6 text-left"
                    >
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff]" />
                            Section 3.4 — Quote Generation & Analytics
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1D2E] tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            A Quote Built On Gut Feel Is <br />
                            <span className="text-[#3666ff]">A Margin You're Giving Away.</span>
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Manual spreadsheets cause margin errors and lost deals. FactWise generates one-click customer quotes directly from your best bids—automatically rolling up BOMs, applying landed costs, and pricing every line item.
                        </p>
                        <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Gain instant visibility into your margins. Analyze category spend, uncover hidden costs, and model volume pricing—empowering you to send sharper quotes faster than the competition.
                        </p>

                        {/* Interactive Phases Grid */}
                        <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                            {[
                                { phase: 1, title: "Aggregate Supplier Bids" },
                                { phase: 2, title: "Apply Landed Costs" },
                                { phase: 3, title: "Analyze by Category" },
                                { phase: 4, title: "Volume Pricing Analysis" }
                            ].map((item, index) => (
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
                                                : (!isQuoteAuto && quoteMenuStep !== null && quoteMenuStep > item.phase) || (isQuoteAuto && item.phase < (isQuoteMenuStepActive(1)?1:isQuoteMenuStepActive(2)?2:isQuoteMenuStepActive(3)?3:isQuoteMenuStepActive(4)?4:0))
                                                ? 'border-[#00b884] bg-[#00b884] text-white'
                                                : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50 group-hover:text-[#3666ff]'
                                        }`}>
                                            <Check className="size-3.5" strokeWidth={3} />
                                        </div>
                                        <span className={`text-[13.5px] font-bold tracking-tight ${
                                            isQuoteMenuStepActive(item.phase) ? 'text-[#3666ff]' : (!isQuoteAuto && quoteMenuStep !== null && quoteMenuStep > item.phase) || (isQuoteAuto && item.phase < (isQuoteMenuStepActive(1)?1:isQuoteMenuStepActive(2)?2:isQuoteMenuStepActive(3)?3:isQuoteMenuStepActive(4)?4:0)) ? 'text-slate-700' : 'text-slate-500'
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
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

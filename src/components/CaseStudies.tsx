'use client';

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────── */
export type FocusRailItem = {
    id: string | number;
    title: string;
    description?: string;
    imageSrc: string;
    href?: string;
    meta?: string;
};

interface FocusRailProps {
    items: FocusRailItem[];
    initialIndex?: number;
    loop?: boolean;
    autoPlay?: boolean;
    interval?: number;
    className?: string;
}

/* ── Helper Functions ──────────────────────────── */
function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
};

const TAP_SPRING = {
    type: "spring",
    stiffness: 450,
    damping: 18,
    mass: 1,
};

/* ── Data ────────────────────────────────────────── */
const caseStudies: FocusRailItem[] = [
    {
        id: "tricolite",
        meta: "Electronics Manufacturing",
        title: "Tricolite",
        description: "Achieved 14% annual profit increase by automating multi-currency RfQs and complex turnkey sourcing workflows.",
        imageSrc: "/electronics_ems_factory_1778230909138.png",
        href: "#"
    },
    {
        id: "varroc",
        meta: "Automotive Components",
        title: "Varroc Engineering",
        description: "Enabled 15x–20x ROI within the first year by automating landed cost calculations and improving compliance across ₹1,000 Cr spend.",
        imageSrc: "/automotive_engineering_varroc_1778230925155.png",
        href: "#"
    },
    {
        id: "bkt",
        meta: "Tyre Manufacturing",
        title: "BKT (Balkrishna Tyres)",
        description: "Eliminated value leakage across global markets by standardizing best practices and integrating real-time commodity price intelligence.",
        imageSrc: "/tyre_manufacturing_bkt_1778230941928.png",
        href: "#"
    },
    {
        id: "sahasra",
        meta: "Semiconductors",
        title: "Sahasra",
        description: "Streamlined previously manual, error-prone quoting workflows into a high-speed, automated multi-currency process.",
        imageSrc: "/semiconductor_cleanroom_sahasra_1778230959517.png",
        href: "#"
    }
];

/* ── Main Component ────────────────────────────── */
export function FocusRail({
    items,
    initialIndex = 0,
    loop = true,
    autoPlay = false,
    interval = 4000,
    className,
}: FocusRailProps) {
    const [active, setActive] = React.useState(initialIndex);
    const [isHovering, setIsHovering] = React.useState(false);
    const lastWheelTime = React.useRef<number>(0);

    const count = items.length;
    const activeIndex = wrap(0, count, active);
    const activeItem = items[activeIndex];

    const handlePrev = React.useCallback(() => {
        if (!loop && active === 0) return;
        setActive((p) => p - 1);
    }, [loop, active]);

    const handleNext = React.useCallback(() => {
        if (!loop && active === count - 1) return;
        setActive((p) => p + 1);
    }, [loop, active, count]);

    const onWheel = React.useCallback(
        (e: React.WheelEvent) => {
            const now = Date.now();
            if (now - lastWheelTime.current < 400) return;

            const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            const delta = isHorizontal ? e.deltaX : e.deltaY;

            if (Math.abs(delta) > 20) {
                if (delta > 0) {
                    handleNext();
                } else {
                    handlePrev();
                }
                lastWheelTime.current = now;
            }
        },
        [handleNext, handlePrev]
    );

    React.useEffect(() => {
        if (!autoPlay || isHovering) return;

        const timer = setInterval(() => {
            setActive((p) => {
                if (!loop && p >= count - 1) return p;
                return p + 1;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, isHovering, interval, loop, count]);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            handleNext();
        } else if (swipe > swipeConfidenceThreshold) {
            handlePrev();
        }
    };

    const visibleIndices = [-2, -1, 0, 1, 2];

    return (
        <div
            className={cn(
                "group relative flex min-h-[720px] w-full flex-col overflow-hidden bg-white text-[#1A1D2E] outline-none select-none overflow-x-hidden pb-12",
                className
            )}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onWheel={onWheel}
        >
            {/* Clean White Background */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-white">
                {/* Subtle base gradient for minimal depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/50 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
                <div className="relative mx-auto w-full max-w-6xl h-[400px] flex items-center justify-center">
                    {/* Navigation Arrows - Sides */}
                    <button
                        onClick={handlePrev}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="absolute left-0 z-30 rounded-full p-4 text-[#7B82A8] transition-all hover:bg-white/80 hover:text-[#1A1D2E] hover:shadow-lg active:scale-95 backdrop-blur-sm border border-slate-100 hidden md:flex"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={handleNext}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="absolute right-0 z-30 rounded-full p-4 text-[#7B82A8] transition-all hover:bg-white/80 hover:text-[#1A1D2E] hover:shadow-lg active:scale-95 backdrop-blur-sm border border-slate-100 hidden md:flex"
                        aria-label="Next"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    <motion.div
                        className="relative flex h-[320px] w-full items-center justify-center perspective-1200 cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={onDragEnd}
                    >
                        {visibleIndices.map((offset) => {
                            const absIndex = active + offset;
                            const index = wrap(0, count, absIndex);
                            const item = items[index];

                            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

                            const isCenter = offset === 0;
                            const dist = Math.abs(offset);

                            const xOffset = offset * 320;
                            const zOffset = -dist * 180;
                            const scale = isCenter ? 1 : 0.85;
                            const rotateY = offset * -20;

                            const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
                            const blur = isCenter ? 0 : dist * 2; // Reduced blur for light theme
                            const brightness = isCenter ? 1 : 0.85; // Less darkening for light theme

                            return (
                                <motion.div
                                    key={absIndex}
                                    className={cn(
                                        "absolute aspect-[3/4] w-[220px] md:w-[260px] rounded-2xl border border-slate-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-shadow duration-300 preserve-3d",
                                        isCenter ? "z-20 shadow-blue-500/10 border-blue-500/10" : "z-10"
                                    )}
                                    initial={false}
                                    animate={{
                                        x: xOffset,
                                        z: zOffset,
                                        scale: scale,
                                        rotateY: rotateY,
                                        opacity: opacity,
                                        filter: `blur(${blur}px) brightness(${brightness})`,
                                    }}
                                    transition={{
                                        ...BASE_SPRING,
                                        scale: TAP_SPRING,
                                    }}
                                    style={{
                                        transformStyle: "preserve-3d",
                                    }}
                                    onClick={() => {
                                        if (offset !== 0) setActive((p) => p + offset);
                                    }}
                                >
                                    <img
                                        src={item.imageSrc}
                                        alt={item.title}
                                        className="h-full w-full rounded-2xl object-cover pointer-events-none"
                                    />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-black/5 pointer-events-none" />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Info & Controls - Reference Matching Layout */}
                <div className="relative mx-auto mt-10 flex w-full max-w-6xl flex-col md:flex-row items-center justify-between gap-12 pointer-events-auto">
                    {/* Left Side: Text Content */}
                    <div className="flex flex-col items-start text-left max-w-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeItem.id}
                                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                                className="space-y-3"
                            >
                                {activeItem.meta && (
                                    <span 
                                        className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00b884]"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        {activeItem.meta.replace(' ', ' • ')}
                                    </span>
                                )}
                                <h2 
                                    className="text-4xl font-bold tracking-tight text-[#1A1D2E]"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {activeItem.title}
                                </h2>
                                {activeItem.description && (
                                    <p 
                                        className="text-[#7B82A8] text-lg font-medium leading-relaxed max-w-lg"
                                        style={{ fontFamily: 'var(--font-inter)' }}
                                    >
                                        {activeItem.description}
                                    </p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Side: CTA */}
                    <div className="flex items-center gap-4 shrink-0">
                        {/* CTA Button with Slide Animation */}
                        {activeItem.href && (
                            <Link
                                href={activeItem.href}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                className="slide-button"
                                style={{ 
                                    '--clr': '#4A6FFF',
                                    backgroundColor: '#4A6FFF',
                                    padding: '0.8rem 1.75rem',
                                    paddingLeft: '1.25rem',
                                    fontSize: '13px'
                                } as React.CSSProperties}
                            >
                                <span className="slide-button__icon-wrapper" style={{ color: '#4A6FFF', width: '24px', height: '24px' }}>
                                    <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="slide-button__icon-svg" width={12}>
                                        <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                                    </svg>
                                    <svg viewBox="0 0 14 15" fill="none" width={12} xmlns="http://www.w3.org/2000/svg" className="slide-button__icon-svg slide-button__icon-svg--copy">
                                        <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                                    </svg>
                                </span>
                                <span className="font-bold tracking-tight">View Case Study</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CaseStudies() {
    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden" id="case-studies">
            <div className="mx-auto max-w-7xl px-6">
                <div style={{ textAlign: 'center', marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div className="section-badge" style={{ marginBottom: 0, fontWeight: 500, letterSpacing: '0.05em' }}>Case Studies</div>
                    <h2
                        style={{
                            fontFamily: 'var(--font-display), sans-serif',
                            fontSize: 'clamp(32px, 5vw, 54px)',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            color: '#1A1D2E',
                            margin: 0,
                            lineHeight: 1.15
                        }}
                    >
                        Built for Complexity. <span style={{ color: '#4A6FFF' }}>Proven at Scale.</span>
                    </h2>
                    <p
                        style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: '18px',
                            fontWeight: 500,
                            color: '#7B82A8',
                            margin: 0,
                            lineHeight: 1.6,
                            maxWidth: '720px'
                        }}
                    >
                        Discover how businesses with the most demanding operations achieved measurable results with FactWise.
                    </p>
                </div>

                <FocusRail items={caseStudies} autoPlay interval={5000} />
            </div>
        </section>
    );
}

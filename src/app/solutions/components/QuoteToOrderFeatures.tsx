"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import {
  CircleDollarSign,
  Bell,
  Sparkles,
  MessageSquare,
  Share2,
  Lock,
  ArrowUpRight,
} from "lucide-react";

/* ─── Feature data ─── */
const features = [
  {
    icon: CircleDollarSign,
    title: "Custom Currency Conversions",
    description:
      "Quote in any currency. Buy in yours. Custom exchange rates applied automatically across every vendor, every item, every event.",
    href: "#",
  },
  {
    icon: Bell,
    title: "Automated Reminders",
    description:
      "Never chase a vendor again. Set reminder schedules once — FactWise follows up automatically until every response is in.",
    href: "#",
  },
  {
    icon: Sparkles,
    title: "FactWise Recommended",
    description:
      "Not sure which bid to shortlist? FactWise analyses every bid against your criteria and recommends the best option — so every award decision is backed by data, not instinct.",
    href: "#",
  },
  {
    icon: MessageSquare,
    title: "Event Chat",
    description:
      "Every conversation tied to the event it belongs to. Message vendors, loop in teammates, and keep every discussion in context — right where the decision is being made.",
    href: "#",
  },
  {
    icon: Share2,
    title: "Instant Sharing",
    description:
      "Share events, quotes, and analytics with anyone — internally or externally — in one click. No downloads, no attachments, no back and forth.",
    href: "#",
  },
  {
    icon: Lock,
    title: "Customizable Permissions",
    description:
      "Control exactly who sees what. Set permissions by role, entity, or workflow — so every user has access to what they need and nothing they don't.",
    href: "#",
    comingSoon: false,
  },
];

/* ─── Single card with mouse-tracking glow & micro-interactions ─── */
function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  comingSoon,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw mouse position (relative to card)
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Smoothed for buttery glow
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const glowBackground = useMotionTemplate`radial-gradient(420px circle at ${smoothX}px ${smoothY}px, rgba(54,102,255,0.04), transparent 60%)`;
  const borderGlow = useMotionTemplate`radial-gradient(220px circle at ${smoothX}px ${smoothY}px, rgba(54,102,255,0.25), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-200);
    mouseY.set(-200);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col bg-white p-8 lg:p-9 overflow-hidden isolate transition-colors duration-300"
    >
      {/* Animated border glow — sits on the card edge using a mask */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: borderGlow,
          maskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Soft radial glow that follows cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glowBackground }}
      />

      {/* Top accent line — sweeps in on hover */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3666ff] to-transparent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[600ms] ease-out"
      />

      {/* Top row: numbered prefix + icon */}
      <div className="relative z-10 mb-7 flex items-start justify-between">
        <motion.div
          whileHover={{ scale: 1.05, rotate: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="relative"
        >
          <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 text-[#3666ff] ring-1 ring-blue-100 group-hover:ring-[#3666ff]/30 transition-all duration-300 overflow-hidden">
            {/* Sweep highlight on hover */}
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-[900ms] ease-out"
            />
            <Icon
              className="size-[22px] relative z-10 transition-transform duration-500 group-hover:scale-110"
              strokeWidth={1.7}
            />
          </div>
          {/* Subtle dashed orbit ring on hover */}
          <span
            aria-hidden
            className="absolute -inset-1.5 rounded-2xl border border-dashed border-[#3666ff]/25 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500"
          />
        </motion.div>

        <span
          className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-[#3666ff] tracking-[0.2em] transition-colors duration-300"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Title with hover-expand underline */}
      <h3
        className="relative z-10 text-[17px] font-bold text-[#1A1D2E] mb-3 leading-snug tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span className="relative inline">
          {title}
          <span
            aria-hidden
            className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-[#3666ff]/70 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
          />
        </span>
      </h3>

      <p
        className="relative z-10 text-sm text-slate-500 leading-relaxed flex-1 group-hover:text-slate-600 transition-colors duration-300"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {description}
      </p>

      {/* Footer */}
      <div className="relative z-10 mt-8">
        {comingSoon ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-slate-300 opacity-75 animate-ping" />
              <span className="relative inline-flex size-1.5 rounded-full bg-slate-400" />
            </span>
            Coming soon
          </span>
        ) : (
          <Link
            href={href}
            className="group/link inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#3666ff] transition-all duration-300"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span className="relative">
              Learn more
              <span
                aria-hidden
                className="absolute left-0 -bottom-0.5 h-px w-full bg-[#3666ff] origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"
              />
            </span>
            <span className="relative inline-flex items-center justify-center size-5 rounded-full bg-[#3666ff]/0 group-hover/link:bg-[#3666ff] transition-all duration-300 overflow-hidden">
              <ArrowUpRight
                className="size-3 text-[#3666ff] group-hover/link:text-white absolute transition-all duration-300 group-hover/link:translate-x-3 group-hover/link:-translate-y-3 opacity-100 group-hover/link:opacity-0"
                strokeWidth={2.5}
              />
              <ArrowUpRight
                className="size-3 text-white absolute -translate-x-3 translate-y-3 opacity-0 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100 transition-all duration-300"
                strokeWidth={2.5}
              />
            </span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main section ─── */
export default function QuoteToOrderFeatures() {
  return (
    <section className="relative w-full bg-[#fafbfc] py-28 overflow-hidden">
      {/* Decorative dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,23,42,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)",
        }}
      />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_1px_2px_rgba(54,102,255,0.08)]"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#3666ff] opacity-75 animate-ping" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#3666ff]" />
              </span>
              Enterprise Features
            </motion.div>

            <h2
              className="text-3xl md:text-5xl font-bold text-[#1A1D2E] mb-5 tracking-tight leading-[1.1] max-w-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Powerful Features.{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#3666ff] to-[#6b8cff] bg-clip-text text-transparent">
                  Right Where You Need Them.
                </span>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 bottom-1 md:bottom-2 h-[6px] md:h-[8px] w-full bg-[#3666ff]/10 origin-left rounded-sm"
                />
              </span>
            </h2>

            <p
              className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Every tool your team needs to move faster and decide smarter —
              built into the flow, not bolted on.
            </p>
          </div>

          {/* Right-side meta count */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-3 shrink-0"
          >
            <div className="flex flex-col items-end">
              <span
                className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.18em]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {String(features.length).padStart(2, "0")} capabilities
              </span>
              <span
                className="text-[10px] font-mono text-slate-300 tracking-wider mt-0.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                · scroll to explore ·
              </span>
            </div>
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Grid — bordered cards with shared borders */}
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200/70 border border-slate-200/70 rounded-2xl overflow-hidden shadow-[0_4px_40px_-12px_rgba(15,23,42,0.08)]"
        >
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </motion.div>

        {/* Subtle bottom hint line */}
        <div
          aria-hidden
          className="mt-10 flex items-center justify-center gap-3 text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span className="h-px w-12 bg-slate-200" />
          <span>Built for procurement teams</span>
          <span className="h-px w-12 bg-slate-200" />
        </div>
      </div>
    </section>
  );
}

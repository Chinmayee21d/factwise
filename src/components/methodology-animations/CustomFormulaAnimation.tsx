"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  X, 
  ChevronDown, 
  Check, 
  ChevronRight,
  Info,
  Edit2,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { cn } from "@/lib/utils";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Formula {
  name: string;
  formula: string;
  type: string;
  links: number;
  status: "active" | "draft";
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FORMULAS: Formula[] = [
  { name: "Total Landed Cost",    formula: "{Unit Price} + {Freight} + {Duty}",  type: "Cost",       links: 12, status: "active" },
  { name: "Net Material Cost",    formula: "{Base Cost} - {Discount} + {Fee}",   type: "Pricing",    links: 8,  status: "active" },
  { name: "Effective Unit Price", formula: "{Quote} × (1 - {Disc%}/100)",        type: "Pricing",    links: 15, status: "active" },
  { name: "Total Order Value",    formula: "{Qty} × {Unit Price} + {Ship}",      type: "Cost",       links: 20, status: "active" },
  { name: "Assessable Value",     formula: "{CIF Value} + {Landing Charges}",    type: "Compliance", links: 6,  status: "draft"  },
];

const TYPE_COLORS: Record<string, string> = {
  Cost:       "bg-purple-50 text-purple-600 border-purple-200",
  Pricing:    "bg-blue-50   text-blue-600   border-blue-200",
  Compliance: "bg-amber-50  text-amber-600  border-amber-200",
};

const TYPE_DOT: Record<string, string> = {
  Cost:       "bg-purple-500",
  Pricing:    "bg-blue-500",
  Compliance: "bg-amber-500",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function CustomFormulaAnimation() {
  const [step, setStep]                       = useState(0);
  const [cursorPos, setCursorPos]             = useState({ x: 50, y: 50 });
  const [isClicking, setIsClicking]           = useState(false);
  const [typedName, setTypedName]             = useState("");
  const [selectedEntity, setSelectedEntity]   = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [typedFormula, setTypedFormula]       = useState("");
  const [showDropdown, setShowDropdown]       = useState(false);

  const containerRef  = useRef<HTMLDivElement>(null);
  const dashboardRef  = useRef<HTMLDivElement>(null);

  // Clamp cursor inside dashboard bounds
  const clampToDashboard = (px: number, py: number) => {
    if (!dashboardRef.current || !containerRef.current) return { x: px, y: py };
    const db = dashboardRef.current.getBoundingClientRect();
    const ct = containerRef.current.getBoundingClientRect();
    const left   = ((db.left   - ct.left)  / ct.width)  * 100;
    const right  = ((db.right  - ct.left)  / ct.width)  * 100;
    const top    = ((db.top    - ct.top)   / ct.height) * 100;
    const bottom = ((db.bottom - ct.top)   / ct.height) * 100;
    return {
      x: Math.max(left + 1, Math.min(px, right  - 1)),
      y: Math.max(top  + 1, Math.min(py, bottom - 1)),
    };
  };

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    const pos = { x: 50, y: 50 };

    const moveTo = (x: number, y: number, dur = 0.9) =>
      tl.to(pos, {
        x, y, duration: dur, ease: "power2.inOut",
        onUpdate() { setCursorPos(clampToDashboard(pos.x, pos.y)); },
      });

    const click = (cb: () => void) => {
      tl.set({}, { onComplete: () => setIsClicking(true) });
      tl.to({}, { duration: 0.15 });
      tl.set({}, { onComplete: () => { setIsClicking(false); cb(); } });
    };

    const pause = (d: number) => tl.to({}, { duration: d });

    // Reset
    tl.set({}, { onComplete: () => {
      setStep(0); setTypedName(""); setSelectedEntity("");
      setSelectedModules([]); setTypedFormula(""); setShowDropdown(false);
      setCursorPos({ x: 50, y: 50 });
    }});
    pause(1);

    // Move to "Add" button
    moveTo(88, 14);
    click(() => setStep(1));
    pause(0.6);

    // Type formula name
    moveTo(50, 38);
    "Actual Material Cost".split("").forEach(ch =>
      tl.to({}, { duration: 0.055, onComplete: () => setTypedName(p => p + ch) })
    );
    pause(0.4);

    // Select entity
    moveTo(50, 52);
    click(() => setSelectedEntity("FactWise Demo"));
    pause(0.4);

    // Open modules dropdown
    moveTo(50, 65);
    click(() => setShowDropdown(true));
    pause(0.3);

    // Pick modules
    moveTo(45, 70);
    click(() => setSelectedModules(["Contract Lifecycle", "Purchase Order"]));
    pause(0.3);
    moveTo(60, 65);
    click(() => setShowDropdown(false));
    pause(0.5);

    // Click Continue
    moveTo(72, 80);
    click(() => setStep(2));
    pause(0.8);

    // Type formula expression
    moveTo(50, 42);
    "{Unit Price} + {Freight} + {Tax}".split("").forEach(ch =>
      tl.to({}, { duration: 0.065, onComplete: () => setTypedFormula(p => p + ch) })
    );
    pause(1.2);

    // Click Save
    moveTo(72, 82);
    click(() => setStep(3));
    pause(3);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ChatGPT Image May 15, 2026, 12_40_41 PM.png"
          alt="bg"
          fill
          className="object-cover opacity-25"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-br from-blue-50/90 via-white/80 to-indigo-50/90" />
      </div>

      {/* ── Cursor ── */}
      <motion.div
        className="absolute z-200 pointer-events-none"
        animate={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
        transition={{ duration: 0 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          className={cn("drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-transform duration-75", isClicking && "scale-75")}
        >
          <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
            fill="white" stroke="#1e293b" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        {isClicking && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute top-0 left-0 w-5 h-5 bg-blue-400/50 rounded-full -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </motion.div>

      {/* ── Dashboard Window (500 × 100%) ── */}
      <div
        ref={dashboardRef}
        className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200/60 overflow-hidden z-10"
        style={{ height: 480 }}
      >

        {/* ── Browser chrome (28px) ── */}
        <div className="flex items-center gap-3 px-3 bg-slate-50 border-b border-slate-200" style={{ height: 28 }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 max-w-xs mx-auto">
            <div className="h-4 bg-white rounded border border-slate-200 flex items-center px-2 gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[7px] text-slate-400 font-mono">factwise.io/formulas</span>
            </div>
          </div>
        </div>

        {/* ── Body (452px) ── */}
        <div className="flex" style={{ height: 452 }}>

          {/* Sidebar (44px wide) */}
          <div className="flex flex-col items-center py-3 gap-3 bg-white border-r border-slate-100 shrink-0" style={{ width: 44 }}>
            <div className="w-7 h-7 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow">
              <Calculator className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex flex-col gap-2 mt-1">
              {[Search, Filter, Plus].map((Icon, i) => (
                <div key={i} className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors",
                  i === 2 ? "bg-blue-50 text-blue-500 border border-blue-100" : "text-slate-300 hover:text-slate-500"
                )}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Main panel */}
          <div className="flex-1 flex flex-col min-w-0 bg-linear-to-br from-slate-50/40 via-white to-blue-50/20">

            {/* Header (44px) */}
            <div className="flex items-center justify-between px-4 border-b border-slate-100 bg-white/95 shrink-0" style={{ height: 44 }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
                  <Calculator className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-800 leading-none">Formula Manager</p>
                  <p className="text-[8px] text-slate-400 mt-0.5">24 total · 5 active</p>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-linear-to-r from-blue-500 to-indigo-600 text-white text-[9px] font-bold rounded-lg shadow-md shadow-blue-500/20">
                <Plus className="w-3 h-3" />
                Add Formula
              </button>
            </div>

            {/* Search bar (32px) */}
            <div className="flex items-center gap-2 px-4 border-b border-slate-100 bg-white/80 shrink-0" style={{ height: 32 }}>
              <Search className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="text-[9px] text-slate-400">Search formulas…</span>
              <div className="ml-auto flex items-center gap-1">
                <div className="px-2 py-0.5 bg-slate-100 rounded text-[8px] text-slate-500 flex items-center gap-1">
                  <Filter className="w-2.5 h-2.5" /> Filter
                </div>
              </div>
            </div>

            {/* Table (fills remaining: 452 - 44 - 32 - 32 = 344px) */}
            <div className="flex-1 overflow-auto min-h-0">
              <table className="w-full border-collapse text-left">
                <thead className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-sm">
                  <tr className="border-b border-slate-200">
                    {["Name", "Formula Expression", "Type", "Links", ""].map((h, i) => (
                      <th key={i} className={cn(
                        "px-3 py-2 text-[8px] font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap",
                        i === 3 && "text-center",
                        i === 4 && "w-12"
                      )}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FORMULAS.map((f, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-blue-50/20 transition-colors group">
                      {/* Name */}
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-6 h-6 rounded-md flex items-center justify-center shrink-0",
                            f.status === "active"
                              ? "bg-blue-100 border border-blue-200"
                              : "bg-slate-100 border border-slate-200"
                          )}>
                            <Calculator className={cn("w-3 h-3", f.status === "active" ? "text-blue-600" : "text-slate-400")} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-semibold text-slate-800 truncate max-w-[110px]">{f.name}</p>
                            <p className="text-[7px] text-slate-400">#{1000 + i}</p>
                          </div>
                        </div>
                      </td>
                      {/* Formula */}
                      <td className="px-3 py-2">
                        <code className="px-2 py-0.5 bg-slate-100 text-blue-700 text-[8px] font-mono rounded border border-slate-200 inline-block max-w-[160px] truncate">
                          {f.formula}
                        </code>
                      </td>
                      {/* Type */}
                      <td className="px-3 py-2">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 text-[8px] font-semibold rounded border whitespace-nowrap",
                          TYPE_COLORS[f.type]
                        )}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", TYPE_DOT[f.type])} />
                          {f.type}
                        </span>
                      </td>
                      {/* Links */}
                      <td className="px-3 py-2 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-linear-to-br from-blue-500 to-indigo-600 rounded-md text-[8px] font-bold text-white shadow-sm">
                          {f.links}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Edit2 className="w-2.5 h-2.5" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination (32px) */}
            <div className="flex items-center justify-between px-4 border-t border-slate-100 bg-white/90 shrink-0" style={{ height: 32 }}>
              <span className="text-[8px] text-slate-400">Showing 1–5 of 24 formulas</span>
              <div className="flex items-center gap-1">
                {["‹", "1", "2", "3", "›"].map((p, i) => (
                  <button key={i} className={cn(
                    "w-5 h-5 flex items-center justify-center rounded text-[8px] font-medium transition-colors",
                    p === "1" ? "bg-blue-500 text-white" : "text-slate-500 hover:bg-slate-100"
                  )}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Modal Overlay (absolute over entire dashboard) ── */}
        <AnimatePresence>
          {(step === 1 || step === 2) && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
                style={{ maxHeight: 400 }}
              >

                {/* ── Step 1: Define ── */}
                {step === 1 && (
                  <>
                    {/* Modal header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-linear-to-r from-white to-blue-50/30 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
                          <Calculator className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-800">New Formula</p>
                          <p className="text-[8px] text-slate-400">Step 1 of 2 — Basic Info</p>
                        </div>
                      </div>
                      <X className="w-4 h-4 text-slate-400 cursor-pointer" />
                    </div>

                    {/* Modal body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                      {/* Field: Name */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1.5 text-[8px] font-bold text-slate-500 uppercase tracking-wider">
                          <span className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold shrink-0">1</span>
                          Formula Name
                        </label>
                        <div className="flex items-center h-9 px-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-[11px] text-slate-700 focus-within:border-blue-400 transition-colors">
                          <span>{typedName}</span>
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.9 }}
                            className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5"
                          />
                        </div>
                      </div>

                      {/* Field: Entity */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1.5 text-[8px] font-bold text-slate-500 uppercase tracking-wider">
                          <span className="w-4 h-4 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold shrink-0">2</span>
                          Entity Type
                        </label>
                        <div className="relative flex items-center h-9 px-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-[11px] cursor-pointer">
                          <span className={selectedEntity ? "text-slate-700 font-medium" : "text-slate-400"}>
                            {selectedEntity || "Select entity…"}
                          </span>
                          <ChevronDown className="absolute right-3 w-3.5 h-3.5 text-slate-400" />
                        </div>
                      </div>

                      {/* Field: Modules */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1.5 text-[8px] font-bold text-slate-500 uppercase tracking-wider">
                          <span className="w-4 h-4 bg-purple-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold shrink-0">3</span>
                          Apply to Modules
                        </label>
                        <div className="relative">
                          <div className="min-h-[36px] px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg flex flex-wrap gap-1 items-center cursor-pointer">
                            {selectedModules.length === 0 && (
                              <span className="text-[11px] text-slate-400">Select modules…</span>
                            )}
                            {selectedModules.map((m, i) => (
                              <span key={i} className="flex items-center gap-1 px-2 py-0.5 bg-blue-500 text-white text-[8px] font-semibold rounded-full">
                                <Check className="w-2.5 h-2.5" />
                                {m}
                              </span>
                            ))}
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          </div>
                          {showDropdown && (
                            <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
                              {["Contract Lifecycle", "Purchase Order", "RfQ Analytics", "Project", "Cart"].map((opt, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-2 hover:bg-blue-50 cursor-pointer">
                                  <div className={cn(
                                    "w-3.5 h-3.5 rounded border-2 flex items-center justify-center",
                                    selectedModules.includes(opt) ? "bg-blue-500 border-blue-500" : "border-slate-300"
                                  )}>
                                    {selectedModules.includes(opt) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                                  </div>
                                  <span className="text-[9px] text-slate-700">{opt}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-[7px] text-slate-400 flex items-center gap-1">
                          <Info className="w-2.5 h-2.5" />
                          {selectedModules.length} module{selectedModules.length !== 1 ? "s" : ""} selected
                        </p>
                      </div>
                    </div>

                    {/* Modal footer */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50 shrink-0">
                      <button className="text-[9px] font-semibold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
                      <button className={cn(
                        "flex items-center gap-1.5 px-4 py-1.5 text-[9px] font-bold rounded-lg transition-all",
                        typedName && selectedEntity && selectedModules.length > 0
                          ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      )}>
                        Continue <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}

                {/* ── Step 2: Build Formula ── */}
                {step === 2 && (
                  <>
                    {/* Modal header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-linear-to-r from-white to-blue-50/30 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
                          <Calculator className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-800">Build Formula</p>
                          <p className="text-[8px] text-slate-400">Step 2 of 2 — Expression</p>
                        </div>
                      </div>
                      <X className="w-4 h-4 text-slate-400 cursor-pointer" />
                    </div>

                    {/* Modal body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                      {/* Name badge */}
                      <div className="flex items-center gap-2 p-2.5 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center shrink-0">
                          <Calculator className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="text-[7px] font-bold text-blue-500 uppercase tracking-widest">Custom Field</p>
                          <p className="text-[10px] font-bold text-slate-800">{typedName || "Actual Material Cost"}</p>
                        </div>
                      </div>

                      {/* Formula expression */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[8px] font-bold text-slate-500 uppercase tracking-wider">
                          <span className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold shrink-0">1</span>
                          Formula Expression
                        </label>
                        <div className="min-h-[44px] px-3 py-2 bg-slate-50 border-2 border-blue-200 rounded-lg font-mono text-[10px] flex flex-wrap items-center gap-px shadow-inner">
                          {typedFormula.split("").map((ch, i) => {
                            const before = typedFormula.slice(0, i);
                            const lastOpen  = before.lastIndexOf("{");
                            const lastClose = before.lastIndexOf("}");
                            const insideBracket = lastOpen > lastClose;
                            const isBracket  = ch === "{" || ch === "}";
                            const isOperator = ["+", "-", "*", "/"].includes(ch);
                            return (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={cn(
                                  "inline-block",
                                  isBracket                                    && "text-blue-500 font-bold",
                                  insideBracket && !isBracket                  && "text-blue-700 font-semibold bg-blue-100 px-0.5 rounded",
                                  isOperator                                   && "text-orange-500 font-bold mx-0.5",
                                  !isBracket && !insideBracket && !isOperator  && "text-slate-600"
                                )}
                              >{ch}</motion.span>
                            );
                          })}
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.9 }}
                            className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5"
                          />
                        </div>
                        <div className="flex items-start gap-1.5 p-2 bg-blue-50/60 rounded-lg border border-blue-100">
                          <Info className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                          <p className="text-[8px] text-blue-600 leading-relaxed">
                            Use <code className="px-1 bg-white rounded font-mono text-blue-700">{"{Field}"}</code> to reference fields and{" "}
                            <code className="px-1 bg-white rounded font-mono text-orange-600">+ − × ÷</code> for operations.
                          </p>
                        </div>
                      </div>

                      {/* Modules summary */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1.5 text-[8px] font-bold text-slate-500 uppercase tracking-wider">
                          <span className="w-4 h-4 bg-purple-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold shrink-0">2</span>
                          Applied Modules
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {(selectedModules.length > 0 ? selectedModules : ["Contract Lifecycle", "Purchase Order"]).map((m, i) => (
                            <span key={i} className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-semibold rounded-full border border-indigo-200">
                              <Check className="w-2.5 h-2.5" />
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Modal footer */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50 shrink-0">
                      <button className="text-[9px] font-semibold text-slate-400 hover:text-slate-600 transition-colors">Back</button>
                      <button className="flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-blue-500 to-indigo-600 text-white text-[9px] font-bold rounded-lg shadow-md shadow-blue-500/20">
                        Save Formula <Check className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Step 3: Success toast ── */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-2xl border border-green-200"
            >
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-800">Formula Saved!</p>
                <p className="text-[8px] text-slate-500">Actual Material Cost is now active</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>{/* end dashboard */}
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkIcon } from '@/components/ui/link';
import { CheckIcon } from '@/components/ui/check';
import { SettingsIcon } from '@/components/ui/settings';
import { ClockIcon } from '@/components/ui/clock';
import { PlusIcon } from '@/components/ui/plus';
import { FileTextIcon } from '@/components/ui/file-text';
import { CpuIcon } from '@/components/ui/cpu';
import { GitBranchIcon } from '@/components/ui/git-branch';
import { PenToolIcon } from '@/components/ui/pen-tool';
import { UserIcon } from '@/components/ui/user';

/* ============ TYPES ============ */
interface IconProps {
  s?: number;
}

interface PacketProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  label: string;
  sub: string;
  delay?: number;
}

interface StatProps {
  icon: React.ReactNode;
  num: number | string;
  label: string;
  active: boolean;
  tone?: string;
}

interface PillProps {
  icon: React.ReactNode;
  label: string;
  lit: boolean;
}

interface IntegrationAnimationProps {
  speed?: number;
  onPhaseChange?: (phase: number) => void;
}

interface SystemInfo {
  id: string;
  name: string;
  sub: string;
  icon: string;
  color: string;
  angle: number;
  dist: number;
}

interface SystemPosition extends SystemInfo {
  xPct: number;
  yPct: number;
}

/* ============ ICONS ============ */
const II: Record<string, React.FC<IconProps>> = {
  Link: ({ s = 16 }) => (
    <LinkIcon size={s} className="inline-block text-current" />
  ),
  Server: ({ s = 16 }) => (
    <motion.svg 
      viewBox="0 0 24 24" 
      width={s} 
      height={s} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial="normal"
      whileHover="animate"
      className="overflow-visible"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <motion.line 
        x1="6" 
        y1="6" 
        x2="6.01" 
        y2="6" 
        variants={{
          normal: { opacity: 1, scale: 1 },
          animate: { opacity: [1, 0.3, 1], transition: { repeat: Infinity, duration: 0.8 } }
        }}
      />
      <motion.line 
        x1="6" 
        y1="18" 
        x2="6.01" 
        y2="18" 
        variants={{
          normal: { opacity: 1, scale: 1 },
          animate: { opacity: [1, 0.3, 1], transition: { repeat: Infinity, duration: 0.8, delay: 0.25 } }
        }}
      />
      <motion.line 
        x1="10" 
        y1="6" 
        x2="18" 
        y2="6" 
        variants={{
          normal: { pathLength: 1 },
          animate: { pathLength: [1, 0.5, 1], transition: { duration: 1 } }
        }}
      />
      <motion.line 
        x1="10" 
        y1="18" 
        x2="18" 
        y2="18" 
        variants={{
          normal: { pathLength: 1 },
          animate: { pathLength: [1, 0.5, 1], transition: { duration: 1, delay: 0.2 } }
        }}
      />
    </motion.svg>
  ),
  Cube: ({ s = 16 }) => (
    <motion.svg 
      viewBox="0 0 24 24" 
      width={s} 
      height={s} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial="normal"
      whileHover="animate"
      className="overflow-visible"
    >
      <motion.path 
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" 
        variants={{
          normal: { rotate: 0 },
          animate: { rotate: 360, transition: { duration: 2, ease: "linear", repeat: Infinity } }
        }}
      />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </motion.svg>
  ),
  Chip: ({ s = 16 }) => (
    <CpuIcon size={s} className="inline-block text-current" />
  ),
  Vendor: ({ s = 16 }) => (
    <motion.svg 
      viewBox="0 0 24 24" 
      width={s} 
      height={s} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial="normal"
      whileHover="animate"
      className="overflow-visible"
    >
      <motion.path 
        d="M3 21h18" 
        variants={{
          normal: { scaleX: 1 },
          animate: { scaleX: [1, 1.05, 1], transition: { duration: 0.5 } }
        }}
      />
      <motion.path 
        d="M5 21V7l8-4v18" 
        variants={{
          normal: { scaleY: 1 },
          animate: { scaleY: [1, 1.05, 1], transition: { duration: 0.6 } }
        }}
      />
      <motion.path 
        d="M19 21V11l-6-4" 
        variants={{
          normal: { pathLength: 1 },
          animate: { pathLength: [0, 1], transition: { duration: 0.8 } }
        }}
      />
    </motion.svg>
  ),
  Hub: ({ s = 16 }) => (
    <GitBranchIcon size={s} className="inline-block text-current" />
  ),
  Doc: ({ s = 14 }) => (
    <FileTextIcon size={s} className="inline-block text-current" />
  ),
  Stack: ({ s = 14 }) => (
    <motion.svg 
      viewBox="0 0 24 24" 
      width={s} 
      height={s} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial="normal"
      whileHover="animate"
      className="overflow-visible"
    >
      <motion.path 
        d="M12 2L2 7l10 5 10-5-10-5Z"
        variants={{
          normal: { translateY: 0 },
          animate: { translateY: -2.5, transition: { duration: 0.3 } }
        }}
      />
      <motion.path 
        d="M2 17l10 5 10-5"
        variants={{
          normal: { translateY: 0 },
          animate: { translateY: 2.5, transition: { duration: 0.3, delay: 0.1 } }
        }}
      />
      <motion.path 
        d="M2 12l10 5 10-5"
        variants={{
          normal: { scaleY: 1 },
          animate: { scaleY: [1, 1.15, 1], transition: { duration: 0.4 } }
        }}
      />
    </motion.svg>
  ),
  PenSq: ({ s = 14 }) => (
    <PenToolIcon size={s} className="inline-block text-current" />
  ),
  Fx: ({ s = 14 }) => (
    <motion.svg 
      viewBox="0 0 24 24" 
      width={s} 
      height={s} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial="normal"
      whileHover="animate"
      className="overflow-visible"
    >
      <motion.path 
        d="M4 7V5a2 2 0 0 1 2-2h2" 
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: -1.5, y: -1.5, transition: { duration: 0.3 } }
        }}
      />
      <motion.path 
        d="M4 17v2a2 2 0 0 0 2 2h2" 
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: -1.5, y: 1.5, transition: { duration: 0.3 } }
        }}
      />
      <motion.path 
        d="M16 3h2a2 2 0 0 1 2 2v2" 
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: 1.5, y: -1.5, transition: { duration: 0.3 } }
        }}
      />
      <motion.path 
        d="M16 21h2a2 2 0 0 0 2-2v-2" 
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: 1.5, y: 1.5, transition: { duration: 0.3 } }
        }}
      />
      <motion.line 
        x1="9" 
        y1="9" 
        x2="15" 
        y2="15" 
        variants={{
          normal: { scale: 1 },
          animate: { scale: [1, 1.2, 1], transition: { duration: 0.5 } }
        }}
      />
      <motion.line 
        x1="15" 
        y1="9" 
        x2="9" 
        y2="15" 
        variants={{
          normal: { scale: 1 },
          animate: { scale: [1, 1.2, 1], transition: { duration: 0.5 } }
        }}
      />
    </motion.svg>
  ),
  Workflow: ({ s = 14 }) => (
    <motion.svg 
      viewBox="0 0 24 24" 
      width={s} 
      height={s} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial="normal"
      whileHover="animate"
      className="overflow-visible"
    >
      <motion.rect 
        x="3" 
        y="3" 
        width="6" 
        height="6" 
        rx="1" 
        variants={{
          normal: { scale: 1 },
          animate: { scale: [1, 1.15, 1], transition: { duration: 0.4 } }
        }}
      />
      <motion.rect 
        x="15" 
        y="9" 
        width="6" 
        height="6" 
        rx="1" 
        variants={{
          normal: { scale: 1 },
          animate: { scale: [1, 1.15, 1], transition: { duration: 0.4, delay: 0.15 } }
        }}
      />
      <motion.rect 
        x="3" 
        y="15" 
        width="6" 
        height="6" 
        rx="1" 
        variants={{
          normal: { scale: 1 },
          animate: { scale: [1, 1.15, 1], transition: { duration: 0.4, delay: 0.3 } }
        }}
      />
      <motion.path 
        d="M9 6h3a3 3 0 0 1 3 3v3" 
        variants={{
          normal: { pathLength: 1 },
          animate: { pathLength: [0, 1], transition: { duration: 0.6 } }
        }}
      />
      <motion.path 
        d="M9 18h3a3 3 0 0 0 3-3" 
        variants={{
          normal: { pathLength: 1 },
          animate: { pathLength: [0, 1], transition: { duration: 0.6, delay: 0.2 } }
        }}
      />
    </motion.svg>
  ),
  Clock: ({ s = 14 }) => (
    <ClockIcon size={s} className="inline-block text-current" />
  ),
  Plus: ({ s = 16 }) => (
    <PlusIcon size={s} className="inline-block text-current" />
  ),
  Grid: ({ s = 16 }) => (
    <motion.svg 
      viewBox="0 0 24 24" 
      width={s} 
      height={s} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial="normal"
      whileHover="animate"
      className="overflow-visible"
    >
      <motion.rect 
        x="3" 
        y="3" 
        width="7" 
        height="7" 
        variants={{
          normal: { scale: 1 },
          animate: { scale: [1, 1.1, 1], transition: { duration: 0.4 } }
        }}
      />
      <motion.rect 
        x="14" 
        y="3" 
        width="7" 
        height="7" 
        variants={{
          normal: { scale: 1 },
          animate: { scale: [1, 1.1, 1], transition: { duration: 0.4, delay: 0.1 } }
        }}
      />
      <motion.rect 
        x="14" 
        y="14" 
        width="7" 
        height="7" 
        variants={{
          normal: { scale: 1 },
          animate: { scale: [1, 1.1, 1], transition: { duration: 0.4, delay: 0.2 } }
        }}
      />
      <motion.rect 
        x="3" 
        y="14" 
        width="7" 
        height="7" 
        variants={{
          normal: { scale: 1 },
          animate: { scale: [1, 1.1, 1], transition: { duration: 0.4, delay: 0.3 } }
        }}
      />
    </motion.svg>
  ),
  Check: ({ s = 14 }) => (
    <CheckIcon size={s} className="inline-block text-current" />
  ),
  Settings: ({ s = 14 }) => (
    <SettingsIcon size={s} className="inline-block text-current" />
  ),
  Forever: ({ s = 14 }) => (
    <motion.svg 
      viewBox="0 0 24 24" 
      width={s} 
      height={s} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial="normal"
      whileHover="animate"
      className="overflow-visible"
    >
      <motion.path 
        d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.74-8-4.585 0-4.585 8 0 8 5.605 0 7.644-8 12.74-8z" 
        variants={{
          normal: { pathLength: 1 },
          animate: { pathLength: [1, 0, 1], transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity } }
        }}
      />
    </motion.svg>
  ),
  User: ({ s = 14 }) => (
    <UserIcon size={s} className="inline-block text-current" />
  ),
  Drag: ({ s = 10 }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
      <circle cx="9" cy="6" r="1.4" />
      <circle cx="15" cy="6" r="1.4" />
      <circle cx="9" cy="12" r="1.4" />
      <circle cx="15" cy="12" r="1.4" />
      <circle cx="9" cy="18" r="1.4" />
      <circle cx="15" cy="18" r="1.4" />
    </svg>
  )
};

/* ============ DATA ============ */
const SYSTEMS: SystemInfo[] = [
  { id: "erp", name: "SAP S/4",       sub: "ERP",                    icon: "Cube",   color: "#0891b2", angle: -135, dist: 95 },
  { id: "dig", name: "electronic",    sub: "Component Distributor",  icon: "Chip",   color: "#10b981", angle: 135,  dist: 95 },
  { id: "ven", name: "Vendor Portals",sub: "Direct vendor APIs",     icon: "Vendor", color: "#8b5cf6", angle: 180,  dist: 95 },
  { id: "wms", name: "Inhouse WMS",   sub: "Warehouse Mgmt",         icon: "Server", color: "#06b6d4", angle: 0,    dist: 95 }
];

const PACKETS_IN = [
  { label: "Requisition", shortId: "REQ-2417", from: "erp", color: "#0891b2" },
  { label: "BOM",         shortId: "BOM-9043", from: "wms", color: "#06b6d4" },
  { label: "Catalog feed",shortId: "Δ 312",    from: "dig", color: "#10b981" },
  { label: "Vendor bid",  shortId: "BID-441",  from: "ven", color: "#8b5cf6" }
];

const PACKETS_OUT = [
  { label: "PO",       shortId: "PO-8842",  to: "erp", color: "#0891b2" },
  { label: "GR Record",shortId: "GRN-771",  to: "wms", color: "#06b6d4" },
  { label: "RFQ blast",shortId: "× 18",     to: "ven", color: "#8b5cf6" },
  { label: "Quote",    shortId: "QT-2244",  to: "dig", color: "#10b981" }
];

const FIELD_SCHEMA = [
  { name: "Item Code", type: "TEXT", existed: true },
  { name: "Qty", type: "NUMBER", existed: true },
  { name: "Vendor", type: "REF", existed: true },
  { name: "Plant Code", type: "SELECT", existed: false }
];

const FORMULA_CHIPS = [
  { id: "unit", label: "Unit Price", color: "#0891b2" },
  { id: "bcd", label: "BCD 10%", color: "#14b8a6" },
  { id: "fr", label: "Freight", color: "#f59e0b" },
  { id: "ins", label: "Insurance", color: "#8b5cf6" }
];

const WF_NODES = [
  { id: "req", label: "Requisition", x: 16, y: 30, color: "#0891b2" },
  { id: "mgr", label: "Manager", x: 38, y: 70, color: "#14b8a6" },
  { id: "fin", label: "Finance", x: 62, y: 30, color: "#06b6d4" },
  { id: "po", label: "PO Generated", x: 84, y: 70, color: "#10b981" }
];

const TIMELINE = [
  { week: "Day 0", label: "Kickoff", icon: "Plus" },
  { week: "Wk 1", label: "API connect", icon: "Link" },
  { week: "Wk 2", label: "Config", icon: "Settings" },
  { week: "Wk 3", label: "UAT", icon: "User" },
  { week: "Wk 4", label: "Go live", icon: "Check" }
];/* ============ CSS STYLING (Scoped Dashboard Tokens) ============ */
const IN_STYLE = `
.in-dash { 
  position: relative; 
  width: 100%; 
  height: 100%; 
  background: transparent; 
  display: flex; 
  flex-direction: column; 
  font-family: "Inter", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.in-chrome { display: flex; align-items: center; gap: 8px; padding: 0 16px; border-bottom: 1px solid rgba(15,23,42,0.06); }
.in-cdots { display: flex; gap: 6px; }
.in-cdot { width: 10px; height: 10px; border-radius: 50%; }
.in-url { flex: 1; max-width: 240px; margin: 0 auto; bg-white/80 backdrop-blur-md rounded border border-slate-200/60;
  border-radius: 6px; padding: 3px 8px; font-size: 10px; color: #94a3b8; display: flex; align-items: center; gap: 6px; }
.in-url::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: #6366f1; box-shadow: 0 0 6px #818cf8; }

.in-body { flex: 1; display: flex; min-height: 0; }
.in-rail { width: 56px; padding: 16px 0; background: rgba(248,250,252,0.6); border-right: 1px solid rgba(15,23,42,0.05);
  display: flex; flex-direction: column; align-items: center; gap: 12px; }
.in-railIcon { width: 32px; height: 32px; border-radius: 10px; display: grid; place-items: center; color: #94a3b8; transition: all .3s ease; }
.in-railIcon.active { background: #6366f1; color: white; box-shadow: 0 6px 14px rgba(99,102,241,0.3); }
.in-railIcon.accent { background: rgba(99,102,241,0.08); color: #6366f1; }

.in-main { flex: 1; padding: 18px 20px; display: flex; flex-direction: column; gap: 12px; min-width: 0; }

.in-headStrip { display: flex; align-items: flex-start; justify-content: space-between; }
.in-headStrip h3 { margin: 0; font-size: 14px; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; }
.in-headStrip .in-sub { margin: 3px 0 0; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; color: #94a3b8; text-transform: uppercase; }
.in-livePill { display: inline-flex; align-items: center; gap: 5px; background: #f1f5f9; padding: 4px 9px; border-radius: 99px;
  font-size: 9px; font-weight: 700; color: #475569; letter-spacing: 0.08em; text-transform: uppercase; }
.in-livePill::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: #10b981;
  box-shadow: 0 0 0 3px rgba(16,185,129,0.15); animation: in-pulse 1.8s ease-in-out infinite; }
@keyframes in-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.4); } }

.in-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.in-stat { background: rgba(248,250,252,0.6); border: 1px solid rgba(15,23,42,0.05); border-radius: 12px; padding: 10px 12px; transition: all .4s ease; position: relative; overflow: hidden; }
.in-stat .si { width: 22px; height: 22px; border-radius: 6px; display: grid; place-items: center; margin-bottom: 6px;
  background: rgba(99,102,241,0.1); color: #6366f1; }
.in-stat.teal .si  { background: rgba(20,184,166,0.1); color: #0d9488; }
.in-stat.green .si { background: rgba(16,185,129,0.1); color: #059669; }
.in-stat .n { font-family: "JetBrains Mono", "Fira Code", monospace; font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; line-height: 1; font-variant-numeric: tabular-nums; }
.in-stat .ll { font-size: 8.5px; font-weight: 700; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 5px; }
.in-stat.active { background: white; border-color: rgba(99,102,241,0.2); box-shadow: 0 6px 16px -8px rgba(99,102,241,0.2); }

.in-stage { background: linear-gradient(180deg, rgba(248,250,252,0.8) 0%, rgba(239,246,252,0.4) 100%);
  border: 1px solid rgba(15,23,42,0.05); border-radius: 14px; padding: 12px;
  flex: 1; position: relative; overflow: hidden; min-height: 0; display: flex; flex-direction: column; }
.in-stageHead { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; position: relative; z-index: 3; flex-shrink: 0; }
.in-stageHead h4 { margin: 0; font-size: 11px; font-weight: 800; color: #334155; letter-spacing: -0.02em; }
.in-tagPulse { font-size: 9px; font-weight: 700; color: #6366f1; display: inline-flex; align-items: center; gap: 4px; letter-spacing: 0.08em; text-transform: uppercase; }
.in-tagPulse .p { width: 5px; height: 5px; border-radius: 50%; background: #6366f1; animation: in-pulse 1.8s ease-in-out infinite; }
.in-dots2 { display: flex; gap: 4px; align-items: center; }
.in-pd { width: 5px; height: 5px; border-radius: 50%; background: #e2e8f0; transition: all .3s ease; }
.in-pd.on { background: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); width: 14px; border-radius: 99px; }
.in-pd.done { background: #818cf8; }

.in-caption { position: absolute; left: 12px; bottom: 10px; right: 12px;
  background: rgba(11,19,34,0.88); color: white; backdrop-filter: blur(12px);
  border-radius: 9px; padding: 8px 12px; font-size: 10.5px; font-weight: 500; line-height: 1.4;
  display: flex; align-items: center; gap: 9px;
  transition: opacity .4s ease, transform .4s ease;
  opacity: 0; transform: translateY(6px); pointer-events: none; z-index: 8; }
.in-caption.on { opacity: 1; transform: translateY(0); }
.in-caption .cd { width: 7px; height: 7px; border-radius: 50%; background: #22d3ee;
  box-shadow: 0 0 10px #22d3ee; flex-shrink: 0; }

.in-caption-bar { display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  background: rgba(248,250,255,0.95); color: #475569; border: 1px solid rgba(99,102,241,0.18);
  border-radius: 12px; padding: 11px 15px; font-size: 12px; font-weight: 600; line-height: 1.4;
  box-shadow: 0 2px 16px -4px rgba(99,102,241,0.14), 0 1px 3px rgba(15,23,42,0.05);
  transition: opacity .4s ease, transform .4s ease;
  opacity: 0; transform: translateY(4px); pointer-events: none; }
.in-caption-bar.on { opacity: 1; transform: translateY(0); }
.in-caption-dot { width: 6px; height: 6px; border-radius: 50%; background: #6366f1;
  box-shadow: 0 0 6px #818cf8; flex-shrink: 0; animation: in-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
@keyframes in-pulse { 50% { opacity: 0.5; } }

.in-scene { position: absolute; inset: 12px; top: 32px; opacity: 0; transition: opacity .4s ease; pointer-events: none; will-change: opacity; }
.in-scene.on { opacity: 1; pointer-events: auto; }

.in-hubScene { position: absolute; inset: 0; }
.in-hub { position: absolute; left: 50%; top: 50%;
  width: 76px; height: 76px; border-radius: 20px;
  background: linear-gradient(135deg, #6366f1 0%, #14b8a6 100%);
  color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px;
  box-shadow: 0 12px 28px -8px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
  transition: opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1);
  opacity: 0; transform: translate(-50%, -50%) scale(0.7);
  z-index: 3; }
.in-hub.in { opacity: 1; transform: translate(-50%, -50%) scale(1); }
.in-hub .hubLabel { font-size: 9px; font-weight: 800; letter-spacing: -0.01em; }
.in-hub .hubSub { font-size: 7px; font-weight: 600; opacity: 0.85; letter-spacing: 0.1em; text-transform: uppercase; }
.in-hub::after { content: ""; position: absolute; inset: -6px; border-radius: 26px;
  border: 1.5px solid rgba(99,102,241,0.2); animation: in-hubPulse 2.4s ease-out infinite; opacity: 0; }
.in-hub.in::after { opacity: 1; }
@keyframes in-hubPulse { 0% { transform: scale(0.85); opacity: 0.9; } 100% { transform: scale(1.35); opacity: 0; } }

.in-cables { position: absolute; inset: 0; pointer-events: none; }
.in-cables svg { width: 100%; height: 100%; overflow: visible; }
.in-cable { stroke-width: 1.5; fill: none; stroke-linecap: round;
  stroke-dasharray: 300; stroke-dashoffset: 300; transition: stroke-dashoffset .9s ease, stroke-opacity .4s ease; }
.in-cable.in { stroke-dashoffset: 0; }
.in-cable.broken { stroke-dasharray: 3 4; stroke-dashoffset: 0; opacity: 0.35; }

.in-sys { position: absolute; width: 78px;
  background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 8px;
  padding: 5px 6px; display: flex; flex-direction: column; gap: 1px;
  box-shadow: 0 4px 10px -3px rgba(15,23,42,0.1);
  transition: all .65s cubic-bezier(.22,.61,.36,1);
  z-index: 2;
  font-size: 8.5px;
  transform: translate(-50%, -50%); }
.in-sysHead { display: flex; align-items: center; gap: 4px; }
.in-sysIc { width: 16px; height: 16px; border-radius: 5px; display: grid; place-items: center; color: white; flex-shrink: 0; }
.in-sysName { font-weight: 800; color: #0f172a; font-size: 8.5px; line-height: 1.1; letter-spacing: -0.01em; }
.in-sysSub  { font-size: 7.5px; color: #94a3b8; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.in-sysDot  { position: absolute; right: 6px; top: 6px; width: 5px; height: 5px; border-radius: 50%; background: #e2e8f0; transition: all .35s ease; }
.in-sys.connected .in-sysDot { background: #10b981; box-shadow: 0 0 0 2.5px rgba(16,185,129,0.15); }

.in-sysQ { position: absolute; font-size: 13px; font-weight: 800; color: #f59e0b;
  transition: opacity .5s ease, transform .5s ease; opacity: 0; }
.in-sysQ.in { opacity: 0.9; animation: in-qBob 2s ease-in-out infinite; }
@keyframes in-qBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }

.in-packet { position: absolute;
  background: white; border-radius: 99px;
  padding: 3px 8px 3px 4px; font-size: 8.5px; font-weight: 700; color: #1e293b;
  display: flex; align-items: center; gap: 4px;
  box-shadow: 0 4px 10px -2px rgba(15,23,42,0.18);
  transform: translate(-50%, -50%);
  z-index: 5;
  opacity: 0; transition: left 1.6s cubic-bezier(.45,.05,.45,1), top 1.6s cubic-bezier(.45,.05,.45,1), opacity .25s ease; }
.in-packet.in { opacity: 1; }
.in-packet .pkIc { width: 14px; height: 14px; border-radius: 50%; display: grid; place-items: center; color: white; flex-shrink: 0; }
.in-packet .pkId { font-family: "JetBrains Mono", "Fira Code", monospace; font-size: 7.5px; color: #94a3b8; font-weight: 600; margin-left: 1px; font-variant-numeric: tabular-nums; }

.in-flowKey { position: absolute; left: 4px; top: 0; display: flex; flex-direction: column; gap: 3px; z-index: 4; }
.in-flowKey.right { left: auto; right: 4px; align-items: flex-end; }
.in-flowKey .lab { font-size: 8px; font-weight: 800; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase; }
.in-flowKey .row { display: flex; align-items: center; gap: 4px; font-size: 8.5px; font-weight: 700; color: #475569;
  opacity: 0; transform: translateX(-4px); transition: all .35s ease; }
.in-flowKey.right .row { transform: translateX(4px); }
.in-flowKey .row.in { opacity: 1; transform: translateX(0); }
.in-flowKey .row .sw { width: 5px; height: 5px; border-radius: 50%; }

.in-fields { position: absolute; inset: 0; display: flex; gap: 12px; padding: 2px; }
.in-fieldsLeft { width: 120px; background: rgba(248,250,252,0.7); border: 1px solid rgba(15,23,42,0.05);
  border-radius: 10px; padding: 6px; display: flex; flex-direction: column; gap: 4px; }
.in-fieldsTitle { font-size: 8px; font-weight: 800; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase; padding: 1px 2px; }
.in-fieldChip { display: flex; align-items: center; gap: 4px; padding: 4px 6px;
  background: white; border: 1px solid rgba(15,23,42,0.05); border-radius: 6px;
  font-size: 8.5px; font-weight: 700; color: #475569; transition: all .3s ease; }
.in-fieldChip .typeBadge { font-family: "JetBrains Mono", "Fira Code", monospace; font-size: 7px; color: #6366f1;
  background: rgba(99,102,241,0.08); padding: 1px 3px; border-radius: 3px; font-weight: 800; margin-left: auto; }
.in-fieldChip.dragging { opacity: 0.3; transform: scale(0.92); }

.in-fieldsRight { flex: 1; background: white; border: 1px solid rgba(15,23,42,0.06);
  border-radius: 10px; padding: 8px; display: flex; flex-direction: column; gap: 3.5px; position: relative; min-width: 0; }
.in-fieldsHeader { display: flex; justify-content: space-between; align-items: center; padding-bottom: 4px; border-bottom: 1px dashed rgba(15,23,42,0.06); margin-bottom: 2px; }
.in-fieldsHeader .nm { font-size: 9.5px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em; }
.in-fieldsHeader .ct { font-size: 8px; color: #94a3b8; font-weight: 700; }
.in-fieldRow { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 6px;
  padding: 4px 6px; background: rgba(248,250,252,0.5); border: 1px solid rgba(15,23,42,0.04); border-radius: 6px;
  font-size: 9px;
  opacity: 0; transform: translateY(3px); transition: all .4s cubic-bezier(.22,.61,.36,1); }
.in-fieldRow.in { opacity: 1; transform: translateY(0); }
.in-fieldRow.new { background: linear-gradient(90deg, rgba(20,184,166,0.08) 0%, rgba(20,184,166,0.01) 100%);
  border-color: rgba(20,184,166,0.25); }
.in-fieldRow .nm { font-weight: 700; color: #1e293b; }
.in-fieldRow .ty { font-family: "JetBrains Mono", "Fira Code", monospace; font-size: 7.5px; color: #6366f1;
  background: rgba(99,102,241,0.06); padding: 1px 4px; border-radius: 3px; font-weight: 800; font-variant-numeric: tabular-nums; }
.in-fieldRow.new .ty { color: #0d9488; background: rgba(20,184,166,0.12); }
.in-fieldRow .badge { font-size: 7.5px; font-weight: 800; color: #0d9488;
  background: rgba(20,184,166,0.12); padding: 1px 4px; border-radius: 4px; letter-spacing: 0.08em; text-transform: uppercase; }

.in-formula { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 6px; padding: 2px; }
.in-formulaTitle { font-size: 9.5px; font-weight: 800; color: #475569; letter-spacing: -0.01em; }
.in-formulaPalette { display: flex; gap: 5px; flex-wrap: wrap; padding: 1px 2px; }
.in-fxChip { display: flex; align-items: center; gap: 4px; padding: 4px 8px;
  background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 99px;
  font-size: 8.5px; font-weight: 700; color: #475569; transition: all .3s ease; }
.in-fxChip .sw { width: 6px; height: 6px; border-radius: 50%; }
.in-fxChip.dragging { opacity: 0.35; transform: scale(0.9); }

.in-formulaCanvas { flex: 1; background: white; border: 1px dashed rgba(15,23,42,0.12);
  border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 8px; min-height: 0; }
.in-formulaName { display: flex; align-items: center; gap: 6px; font-size: 9.5px; font-weight: 800; color: #0f172a; }
.in-formulaName .ic { width: 18px; height: 18px; border-radius: 5px; background: rgba(99,102,241,0.08); color: #6366f1; display: grid; place-items: center; }
.in-formulaExpr { display: flex; flex-wrap: wrap; gap: 5px; align-items: center; min-height: 28px; }
.in-fxToken { display: flex; align-items: center; gap: 4px; padding: 4px 8px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%);
  border: 1px solid rgba(99,102,241,0.18); border-radius: 6px;
  font-size: 8.5px; font-weight: 700; color: #1e293b;
  opacity: 0; transform: scale(0.88); transition: all .45s cubic-bezier(.22,.61,.36,1); }
.in-fxToken.in { opacity: 1; transform: scale(1); }
.in-fxToken .sw { width: 6px; height: 6px; border-radius: 50%; }
.in-fxOp { font-family: "JetBrains Mono", "Fira Code", monospace; font-size: 11px; font-weight: 800; color: #cbd5e1;
  opacity: 0; transition: opacity .4s ease; }
.in-fxOp.in { opacity: 1; }
.in-formulaResult { display: flex; align-items: center; gap: 6px; padding-top: 6px; border-top: 1px dashed rgba(15,23,42,0.06); }
.in-formulaResult .lab { font-size: 8px; font-weight: 800; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase; }
.in-formulaResult .val { font-family: "JetBrains Mono", "Fira Code", monospace; font-size: 12.5px; font-weight: 800; color: #0d9488; font-variant-numeric: tabular-nums; margin-left: auto; }

.in-wf { position: absolute; inset: 0; padding: 2px; }
.in-wfNode { position: absolute; background: white; border: 1px solid rgba(15,23,42,0.06);
  border-radius: 8px; padding: 5px 8px; min-width: 80px;
  font-size: 8.5px; font-weight: 700; color: #1e293b;
  display: flex; align-items: center; gap: 4px;
  box-shadow: 0 6px 14px -6px rgba(15,23,42,0.15);
  transform: translate(-50%, -50%) scale(0.88); opacity: 0;
  transition: all .5s cubic-bezier(.22,.61,.36,1); }
.in-wfNode.in { transform: translate(-50%, -50%) scale(1); opacity: 1; }
.in-wfNode .sw { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.in-wfNode.lit { border-color: rgba(20,184,166,0.35); background: linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%);
  box-shadow: 0 8px 18px -8px rgba(20,184,166,0.3); }
.in-wfEdge { position: absolute; inset: 0; pointer-events: none; }
.in-wfEdge svg { width: 100%; height: 100%; overflow: visible; }
.in-wfEdgePath { stroke: #cbd5e1; stroke-width: 1.5; stroke-dasharray: 4 4; fill: none;
  stroke-dashoffset: 200; transition: stroke-dashoffset .8s ease, stroke .35s ease; }
.in-wfEdgePath.in { stroke-dashoffset: 0; }
.in-wfEdgePath.live { stroke: #14b8a6; stroke-dasharray: 0; }
.in-wfHint { position: absolute; left: 4px; bottom: 0;
  font-size: 8.5px; font-weight: 700; color: #64748b; display: inline-flex; align-items: center; gap: 4px;
  background: rgba(255,255,255,0.85); padding: 3px 6px; border-radius: 6px;
  border: 1px solid rgba(15,23,42,0.05); }
.in-wfHint .ic { color: #6366f1; }

.in-tlScene { position: absolute; inset: 0; padding: 12px 6px; display: flex; flex-direction: column; gap: 12px; }
.in-tlHead { font-size: 10.5px; font-weight: 800; color: #334155; padding: 0 2px; display: flex; justify-content: space-between; align-items: baseline; letter-spacing: -0.01em; }
.in-tlHead .small { font-size: 8.5px; color: #94a3b8; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.in-tlRail { position: relative; height: 5px; background: #e2e8f0; border-radius: 99px; margin: 0 12px; }
.in-tlFill { position: absolute; left: 0; top: 0; height: 100%;
  background: linear-gradient(90deg, #6366f1 0%, #14b8a6 100%);
  border-radius: 99px; width: 0%; transition: width 1.4s cubic-bezier(.45,.05,.45,1);
  box-shadow: 0 0 6px rgba(20,184,166,0.3); }
.in-tlDots { position: absolute; left: 0; right: 0; top: 50%; display: flex; justify-content: space-between; align-items: center; pointer-events: none; }
.in-tlDot { width: 10px; height: 10px; border-radius: 50%; background: white;
  border: 2.5px solid #cbd5e1; transform: translateY(-50%);
  transition: all .35s ease; position: relative; }
.in-tlDot.on { border-color: #0d9488; background: linear-gradient(135deg, #6366f1 0%, #14b8a6 100%);
  box-shadow: 0 0 0 3px rgba(20,184,166,0.15); }
.in-tlMilestones { display: flex; justify-content: space-between; padding: 0 12px; }
.in-tlMilestone { text-align: center; width: 52px; transform: translateX(-50%); margin-left: 5px; }
.in-tlMilestone:first-child { transform: translateX(0); margin-left: 0; }
.in-tlMilestone:last-child  { transform: translateX(0); margin-left: 0; align-self: flex-end; }
.in-tlIc { width: 24px; height: 24px; border-radius: 7px; display: grid; place-items: center; margin: 0 auto 3px;
  background: #f1f5f9; color: #94a3b8; transition: all .35s ease; }
.in-tlMilestone.on .in-tlIc { background: linear-gradient(135deg, #6366f1 0%, #14b8a6 100%); color: white;
  box-shadow: 0 4px 10px rgba(99,102,241,0.35); }
.in-tlWk { font-family: "JetBrains Mono", "Fira Code", monospace; font-size: 8px; font-weight: 800; color: #94a3b8; letter-spacing: 0.08em; text-transform: uppercase; transition: color .35s ease; font-variant-numeric: tabular-nums; }
.in-tlMilestone.on .in-tlWk { color: #0d9488; }
.in-tlLab { font-size: 9px; font-weight: 700; color: #475569; margin-top: 1px; }
.in-tlSummary { background: linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%);
  border: 1px solid rgba(20,184,166,0.18); border-radius: 10px; padding: 8px 10px;
  display: flex; align-items: center; gap: 10px; margin: 4px 2px 0;
  box-shadow: 0 8px 18px -8px rgba(20,184,166,0.25); }
.in-tlSummary .sIc { width: 30px; height: 30px; border-radius: 8px; background: linear-gradient(135deg, #6366f1 0%, #14b8a6 100%);
  color: white; display: grid; place-items: center; box-shadow: 0 4px 10px rgba(99,102,241,0.25); }
.in-tlSummary .sBody .t { font-size: 11px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em; }
.in-tlSummary .sBody .d { font-size: 8.5px; color: #475569; margin-top: 1px; }
.in-tlSummary .sStat { margin-left: auto; text-align: right; }
.in-tlSummary .sStat .v { font-family: "JetBrains Mono", "Fira Code", monospace; font-size: 14.5px; font-weight: 800; color: #0d9488; font-variant-numeric: tabular-nums; }
.in-tlSummary .sStat .l { font-size: 8px; font-weight: 800; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase; }

/* ===== PROCUREMENT LOOP SCENE ===== */
.in-procWrap { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 4px 2px; }
.in-procFlow { display: flex; align-items: stretch; justify-content: center; gap: 0; flex: 0 0 auto; }
.in-procCard { display: flex; flex-direction: column; align-items: center; gap: 3px; text-align: center;
  background: white; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 8px 10px;
  width: 72px; min-height: 80px;
  box-shadow: 0 2px 8px -2px rgba(15,23,42,0.08);
  transition: all 0.45s cubic-bezier(.22,.61,.36,1);
  opacity: 0; transform: translateY(6px); flex-shrink: 0; }
.in-procCard.in { opacity: 1; transform: translateY(0); }
.in-procCard.active { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12), 0 4px 12px -4px rgba(99,102,241,0.2); }
.in-procCard.done { border-color: #a5b4fc; background: #fafafe; }
.in-procCard.hub { background: linear-gradient(145deg, #6366f1, #4f46e5); border-color: #4f46e5; color: white;
  box-shadow: 0 6px 20px -4px rgba(99,102,241,0.4); }
.in-procCard.hub.active { box-shadow: 0 0 0 4px rgba(99,102,241,0.2), 0 8px 24px -4px rgba(99,102,241,0.45); }
.in-procCardIc { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; color: white; flex-shrink: 0; }
.in-procCardName { font-size: 9px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; line-height: 1.2; }
.in-procCard.hub .in-procCardName { color: white; }
.in-procCardSub { font-size: 7px; font-weight: 700; color: #94a3b8; letter-spacing: 0.06em; text-transform: uppercase; }
.in-procCard.hub .in-procCardSub { color: rgba(255,255,255,0.65); }
.in-procCardStatus { font-size: 7px; font-weight: 800; padding: 2px 6px; border-radius: 99px; margin-top: auto;
  opacity: 0; transform: scale(0.85); transition: all 0.3s ease; white-space: nowrap; }
.in-procCardStatus.in { opacity: 1; transform: scale(1); }

/* Arrow connector between cards */
.in-procArrow { display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 3px; flex: 1; min-width: 20px; max-width: 38px; padding: 0 3px;
  padding-bottom: 18px; /* offset down to align with card icon row */ }
.in-procArrowTrack { position: relative; height: 2px; width: 100%; background: #e2e8f0; border-radius: 99px; overflow: visible; }
.in-procArrowFill { position: absolute; left: 0; top: 0; height: 100%; border-radius: 99px;
  background: #6366f1; width: 0%; transition: width 0.65s cubic-bezier(.45,.05,.45,1); }
.in-procArrowHead { position: absolute; right: -5px; top: 50%; transform: translateY(-50%);
  width: 0; height: 0; border-top: 4px solid transparent; border-bottom: 4px solid transparent;
  border-left: 6px solid #e2e8f0; transition: border-left-color 0.3s ease; }
.in-procArrowHead.active { border-left-color: #6366f1; }
.in-procArrowLabel { font-size: 7px; font-weight: 800; color: #94a3b8; letter-spacing: 0.06em;
  text-transform: uppercase; white-space: nowrap; transition: color 0.3s ease; }
.in-procArrowLabel.active { color: #6366f1; }

/* Return arc row */
.in-procReturn { display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 5px 10px; background: rgba(99,102,241,0.04); border: 1px dashed rgba(99,102,241,0.22);
  border-radius: 8px; flex-shrink: 0;
  opacity: 0; transform: translateY(4px); transition: all 0.5s ease; }
.in-procReturn.in { opacity: 1; transform: translateY(0); }
.in-procReturnDot { width: 5px; height: 5px; border-radius: 50%; background: #6366f1; flex-shrink: 0; animation: in-pulse 1.8s ease-in-out infinite; }
.in-procReturnText { font-size: 8px; font-weight: 700; color: #6366f1; }

/* Step log */
.in-procStepLog { display: flex; flex-direction: column; gap: 3px; flex: 1; min-height: 0; justify-content: flex-end; }
.in-procStepRow { display: flex; align-items: center; gap: 6px; padding: 5px 8px;
  background: white; border: 1px solid #f1f5f9; border-radius: 7px;
  font-size: 8px; font-weight: 600; color: #64748b;
  opacity: 0; transform: translateY(3px); transition: all 0.4s cubic-bezier(.22,.61,.36,1); }
.in-procStepRow.in { opacity: 1; transform: translateY(0); }
.in-procStepRow.done { color: #4f46e5; border-color: rgba(99,102,241,0.15); background: rgba(99,102,241,0.03); }
.in-procStepRow .sdot { width: 5px; height: 5px; border-radius: 50%; background: #6366f1; flex-shrink: 0; }
.in-procStepRow .stag { font-family: "JetBrains Mono", monospace; font-size: 6.5px; font-weight: 800;
  padding: 1px 5px; border-radius: 3px; margin-left: auto; white-space: nowrap;
  background: rgba(99,102,241,0.08); color: #4f46e5; }

.in-finale { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 0 10px; }
.in-finaleA { font-size: 28px; font-weight: 900; letter-spacing: -0.04em; line-height: 1;
  background: linear-gradient(135deg, #6366f1 0%, #14b8a6 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.in-finaleB { font-size: 18px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 6px; letter-spacing: -0.02em; }
.in-finaleB .inf { color: #0d9488; }
.in-finaleSub { font-size: 10px; color: #64748b; margin-top: 4px; text-align: center; max-width: 320px; line-height: 1.5; }
.in-finaleChips { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; justify-content: center; }
.in-finaleChip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px;
  background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 99px;
  font-size: 9px; font-weight: 700; color: #475569;
  box-shadow: 0 3px 8px -4px rgba(15,23,42,0.12);
  opacity: 0; transform: translateY(3px); transition: all .4s ease; }
.in-finaleChip.in { opacity: 1; transform: translateY(0); }
.in-finaleChip .ic { color: #6366f1; }

.in-pills { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.in-pill { display: flex; align-items: center; gap: 8px; padding: 9px 12px; background: white;
  border: 1px solid rgba(15,23,42,0.05); border-radius: 11px; font-size: 11px; font-weight: 700; color: #475569;
  transition: all .4s ease; }
.in-pill .pi { width: 22px; height: 22px; border-radius: 6px; background: rgba(99,102,241,0.06); color: #6366f1;
  display: grid; place-items: center; flex-shrink: 0; }
.in-pill .pd { width: 6px; height: 6px; border-radius: 50%; background: #e2e8f0; margin-left: auto; transition: all .4s ease; }
.in-pill.lit { border-color: rgba(99,102,241,0.3); background: linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%);
  box-shadow: 0 6px 18px -6px rgba(99,102,241,0.25); }
.in-pill.lit .pd { background: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.15); }
.in-pill.lit .pi { background: rgba(99,102,241,0.12); color: #4f46e5; }
`;

/* ============ CAPTIONS ============ */
const CAPTIONS: Record<number, string> = {
  1: "FactWise connects via open APIs. No middleware. No extra cost.",
  2: "Requisitions, contracts, BOMs flow into FactWise — automatically.",
  3: "POs, quotes, GR records flow back out — to every system that needs them.",
  4: "Add custom fields without IT. Drag, drop, deploy.",
  5: "SAP raises a requisition → FactWise processes it → Draft PO written back to SAP. Closed loop.",
  6: "Built to last forever."
};

/* ============ HELPERS ============ */
function useCount(target: number, active: boolean, dur = 1000) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) {
      setV(0);
      return;
    }
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, dur]);
  return v;
}

function Packet({ from, to, color, label, sub, delay = 0 }: PacketProps) {
  const [pos, setPos] = useState(from);
  const [visible, setVisible] = useState(false);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let raf: number;

    // Reset
    setPos(from);
    setVisible(false);
    setArrived(false);

    t1 = setTimeout(() => {
      setPos(from);
      setVisible(true);
      // Wait two animation frames so the browser paints the initial position
      // before we change pos to `to` (which triggers the CSS transition)
      raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setArrived(true);
          setPos(to);
        });
      });
    }, delay);

    t2 = setTimeout(() => {
      setVisible(false);
    }, delay + 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(raf);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, from.x, from.y, to.x, to.y]);

  return (
    <div
      className={`in-packet ${visible ? "in" : ""}`}
      style={{ left: pos.x + "%", top: pos.y + "%" }}
    >
      <span className="pkIc" style={{ background: color }}>
        <II.Doc s={8} />
      </span>
      <span>{label}</span>
      <span className="pkId">{sub}</span>
    </div>
  );
}

function Stat({ icon, num, label, active, tone }: StatProps) {
  return (
    <div className={`in-stat${tone ? " " + tone : ""}${active ? " active" : ""}`}>
      <div className="si">{icon}</div>
      <div className="n">{num}</div>
      <div className="ll">{label}</div>
    </div>
  );
}

function Pill({ icon, label, lit }: PillProps) {
  return (
    <div className={`in-pill${lit ? " lit" : ""}`}>
      <div className="pi">{icon}</div>
      <span>{label}</span>
      <div className="pd" />
    </div>
  );
}

/* ============ PROCUREMENT LOOP COMPONENT ============ */
function ProcurementLoop({ procStep }: { procStep: number }) {
  // Pure SVG layout matching the reference diagram:
  // SAP (top-center), REQ (bottom-left), FactWise (center), PO (bottom-right)
  // Rounded-corner orthogonal paths, single indigo palette, animated draw-on

  // SVG coordinate system: 400 × 290
  // Node boxes (cx, cy, w, h):
  const SAP = { x: 200, y: 55,  w: 124, h: 54 };
  const FW  = { x: 200, y: 155, w: 124, h: 50 };
  const REQ = { x: 65,  y: 230, w: 110, h: 54 };
  const PO  = { x: 335, y: 230, w: 110, h: 54 };

  // Box edges
  const sapL = SAP.x - SAP.w/2, sapR = SAP.x + SAP.w/2, sapT = SAP.y - SAP.h/2, sapB = SAP.y + SAP.h/2;
  const fwL  = FW.x  - FW.w/2,  fwR  = FW.x  + FW.w/2,  fwT  = FW.y  - FW.h/2,  fwB  = FW.y  + FW.h/2;
  const reqL = REQ.x - REQ.w/2, reqR = REQ.x + REQ.w/2, reqT = REQ.y - REQ.h/2, reqB = REQ.y + REQ.h/2;
  const poL  = PO.x  - PO.w/2,  poR  = PO.x  + PO.w/2,  poT  = PO.y  - PO.h/2,  poB  = PO.y  + PO.h/2;

  const R = 12; // corner radius for paths

  // Path 1: SAP left → left → down → REQ top
  const p1 = `M ${sapL} ${SAP.y} L ${REQ.x + R} ${SAP.y} Q ${REQ.x} ${SAP.y} ${REQ.x} ${SAP.y + R} L ${REQ.x} ${reqT}`;
  const p1Len = 280;

  // Path 2: REQ right → right → up → FactWise bottom-left
  const p2 = `M ${reqR} ${REQ.y} L ${160 - R} ${REQ.y} Q 160 ${REQ.y} 160 ${REQ.y - R} L 160 ${fwB}`;
  const p2Len = 120;

  // Path 3: FactWise bottom-right → down → right → PO left
  const p3 = `M 240 ${fwB} L 240 ${REQ.y - R} Q 240 ${REQ.y} ${240 + R} ${REQ.y} L ${poL} ${REQ.y}`;
  const p3Len = 120;

  // Path 4: PO top → up → left → SAP right
  const p4 = `M ${PO.x} ${poT} L ${PO.x} ${SAP.y + R} Q ${PO.x} ${SAP.y} ${PO.x - R} ${SAP.y} L ${sapR} ${SAP.y}`;
  const p4Len = 280;

  const INDIGO = "#6366f1";
  const INDIGO_DIM = "#e0e7ff";

  // Animated path: draws from 0 to full length
  const AnimPath = ({ d, len, active, dashed = false }: { d: string; len: number; active: boolean; dashed?: boolean }) => (
    <path
      d={d}
      fill="none"
      stroke={active ? INDIGO : INDIGO_DIM}
      strokeWidth={active ? 1.5 : 1}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "5 4" : `${len}`}
      strokeDashoffset={active ? 0 : len}
      style={{
        transition: `stroke-dashoffset 0.75s cubic-bezier(.45,.05,.45,1), stroke 0.3s ease, stroke-width 0.3s ease`,
      }}
    />
  );

  // Arrowhead marker at path end
  const Arrow = ({ cx, cy, dir, active }: { cx: number; cy: number; dir: "up"|"left"|"right"|"down"; active: boolean }) => {
    const c = active ? INDIGO : INDIGO_DIM;
    const pts: Record<string, string> = {
      up:    `${cx},${cy} ${cx-4},${cy+7} ${cx+4},${cy+7}`,
      down:  `${cx},${cy} ${cx-4},${cy-7} ${cx+4},${cy-7}`,
      left:  `${cx},${cy} ${cx+7},${cy-4} ${cx+7},${cy+4}`,
      right: `${cx},${cy} ${cx-7},${cy-4} ${cx-7},${cy+4}`,
    };
    return <polygon points={pts[dir]} fill={c} style={{ transition: "fill 0.3s ease" }} />;
  };

  // Node card rendered in SVG
  const Node = ({
    cx, cy, w, h, label, sub, badge, badgeVisible, isHub, active, visible
  }: {
    cx: number; cy: number; w: number; h: number;
    label: string; sub: string; badge?: string; badgeVisible?: boolean;
    isHub?: boolean; active?: boolean; visible?: boolean;
  }) => {
    const x = cx - w/2, y = cy - h/2;
    const bg = isHub ? INDIGO : "white";
    const border = active ? INDIGO : isHub ? "#4f46e5" : "#cbd5e1";
    const bw = active ? 2 : 1.5;
    
    // Shift text up if there's a badge space
    const hasBadge = badge !== undefined;
    const textYOffset = hasBadge ? -4 : 0;

    return (
      <g style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.88)",
        transformOrigin: `${cx}px ${cy}px`,
        transition: "opacity 0.45s cubic-bezier(.22,.61,.36,1), transform 0.45s cubic-bezier(.22,.61,.36,1)"
      }}>
        {/* Drop shadow */}
        <rect x={x+1} y={y+2} width={w} height={h} rx={9} fill="rgba(15,23,42,0.07)" />
        {/* Card */}
        <rect x={x} y={y} width={w} height={h} rx={9}
          fill={bg}
          stroke={border}
          strokeWidth={bw}
        />
        {/* Active glow ring */}
        {active && !isHub && (
          <rect x={x-1} y={y-1} width={w+2} height={h+2} rx={10}
            fill="none" stroke={INDIGO} strokeWidth={1} opacity={0.25} />
        )}
        {/* Icon circle */}
        <circle cx={cx - w/2 + 20} cy={cy + textYOffset} r={12}
          fill={isHub ? "rgba(255,255,255,0.18)" : "rgba(99,102,241,0.1)"} />
        <text x={cx - w/2 + 20} y={cy + textYOffset + 1} textAnchor="middle" dominantBaseline="middle"
          fill={isHub ? "white" : INDIGO} fontSize={10} fontWeight={800}>
          {label[0]}
        </text>
        {/* Label */}
        <text x={cx - w/2 + 38} y={cy - 4 + textYOffset} fill={isHub ? "white" : "#0f172a"}
          fontSize={9.5} fontWeight={800} letterSpacing={-0.3}>{label}</text>
        <text x={cx - w/2 + 38} y={cy + 8 + textYOffset} fill={isHub ? "rgba(255,255,255,0.65)" : "#64748b"}
          fontSize={7.5} fontWeight={700} letterSpacing={0.5}>{sub}</text>
        {/* Badge */}
        {hasBadge && (
          <g style={{ opacity: badgeVisible ? 1 : 0, transition: "opacity 0.3s ease" }}>
            <rect x={cx - w/2 + 38} y={cy + 13} width={w - 46} height={14} rx={4}
              fill={isHub ? "rgba(255,255,255,0.15)" : "rgba(99,102,241,0.08)"} />
            <text x={cx - w/2 + 38 + (w - 46)/2} y={cy + 20}
              textAnchor="middle" dominantBaseline="middle"
              fill={isHub ? "white" : INDIGO} fontSize={7} fontWeight={800}>{badge}</text>
          </g>
        )}
      </g>
    );
  };

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", gap: 5, padding: "8px 0", alignItems: "center", justifyContent: "center" }}>

      {/* ── SVG diagram ── */}
      <div style={{ flex: "1 1 auto", width: "100%", position: "relative", minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 400 290" style={{ width: "100%", height: "100%", maxWidth: 500, overflow: "visible" }}>

          {/* ── Paths (drawn behind nodes) ── */}
          <AnimPath d={p1} len={p1Len} active={procStep >= 2} />
          <AnimPath d={p2} len={p2Len} active={procStep >= 3} />
          <AnimPath d={p3} len={p3Len} active={procStep >= 5} />
          <AnimPath d={p4} len={p4Len} active={procStep >= 6} dashed />

          {/* ── Arrowheads ── */}
          {/* p1 ends at REQ top-center */}
          <Arrow cx={REQ.x} cy={reqT} dir="down" active={procStep >= 2} />
          {/* p2 ends at FW bottom left (160, fwB) */}
          <Arrow cx={160} cy={fwB} dir="up" active={procStep >= 3} />
          {/* p3 ends at PO left-center */}
          <Arrow cx={poL} cy={REQ.y} dir="right" active={procStep >= 5} />
          {/* p4 ends at SAP right-center */}
          <Arrow cx={sapR} cy={SAP.y} dir="left" active={procStep >= 6} />

          {/* ── Edge labels ── */}
          {procStep >= 2 && (
            <text x={REQ.x + 8} y={SAP.y + (reqT - SAP.y)/2} fill="#4f46e5" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={700} letterSpacing={0.5}>REQ-2417</text>
          )}
          {procStep >= 3 && (
            <text x={reqR + 8} y={REQ.y - 8} fill="#4f46e5" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={700} letterSpacing={0.5}>INBOUND</text>
          )}
          {procStep >= 5 && (
            <text x={240 + 8} y={REQ.y - 8} fill="#4f46e5" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={700} letterSpacing={0.5}>DRAFT PO</text>
          )}
          {procStep >= 6 && (
            <text x={PO.x - 60} y={SAP.y - 8} fill="#4f46e5" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={700} letterSpacing={0.5}>PO BACK</text>
          )}

          {/* ── Nodes (drawn on top) ── */}
          <Node cx={SAP.x} cy={SAP.y} w={SAP.w} h={SAP.h}
            label="SAP S/4" sub="3RD PARTY ERP"
            badge="✓ PO Received" badgeVisible={procStep >= 7}
            active={procStep >= 1 && procStep < 3 || procStep >= 6}
            visible={procStep >= 1} />

          <Node cx={REQ.x} cy={REQ.y} w={REQ.w} h={REQ.h}
            label="REQ-2417" sub="REQUISITION"
            badge="→ FactWise" badgeVisible={procStep >= 4}
            active={procStep === 2 || procStep === 3}
            visible={procStep >= 2} />

          <Node cx={FW.x} cy={FW.y} w={FW.w} h={FW.h}
            label="FactWise" sub={procStep >= 4 && procStep < 6 ? "PROCESSING…" : "HUB"}
            isHub active={procStep >= 3 && procStep < 6}
            visible={procStep >= 1} />

          <Node cx={PO.x} cy={PO.y} w={PO.w} h={PO.h}
            label="Draft PO" sub="PO-8842"
            badge="→ SAP" badgeVisible={procStep >= 6}
            active={procStep === 5 || procStep === 6}
            visible={procStep >= 5} />

        </svg>
      </div>
    </div>
  );
}

/* ============ MAIN PORTED COMPONENT ============ */
export default function IntegrationAnimation({ speed = 0.5, onPhaseChange }: IntegrationAnimationProps) {
  const [phase, setPhase] = useState(0);
  const [hubIn, setHubIn] = useState(false);
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [packetTick, setPacketTick] = useState(0);
  const [fieldRows, setFieldRows] = useState(0);
  const [fieldDragging, setFieldDragging] = useState(false);
  const [wfNodes, setWfNodes] = useState(0);
  const [wfStep, setWfStep] = useState(-1);
  const [tlStep, setTlStep] = useState(0);
  const [procStep, setProcStep] = useState(0); // 0=idle 1=sap-lit 2=req-arrow 3=fw-lit 4=fw-processing 5=po-arrow 6=return-arrow 7=done
  const [finaleChips, setFinaleChips] = useState(0);
  const [lit, setLit] = useState({ api: false, custom: false, formula: false, fast: false });

  const cancelRef = useRef(false);
  const onPhaseChangeRef = useRef(onPhaseChange);
  useEffect(() => { onPhaseChangeRef.current = onPhaseChange; }, [onPhaseChange]);

  useEffect(() => {
    cancelRef.current = false;
    const speedMul = Math.max(0.3, Number(speed) || 1);
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms / speedMul));

    async function loop() {
      while (!cancelRef.current) {
        // Reset state values
        setPhase(0);
        setHubIn(false);
        setConnected(new Set());
        setPacketTick(0);
        setFieldRows(0);
        setFieldDragging(false);
        setWfNodes(0);
        setWfStep(-1);
        setTlStep(0);
        setProcStep(0);
        setFinaleChips(0);
        setLit({ api: false, custom: false, formula: false, fast: false });
        onPhaseChangeRef.current?.(0);
        await sleep(400);

        // 1. HUB + CABLES
        if (cancelRef.current) return;
        setPhase(1);
        onPhaseChangeRef.current?.(1);
        setLit((s) => ({ ...s, api: true }));
        setHubIn(true);
        await sleep(400);
        for (let i = 0; i < SYSTEMS.length; i++) {
          if (cancelRef.current) return;
          setConnected((prev) => {
            const next = new Set(prev);
            next.add(SYSTEMS[i].id);
            return next;
          });
          await sleep(220);
        }
        await sleep(800);

        // 2. INBOUND
        if (cancelRef.current) return;
        setPhase(2);
        onPhaseChangeRef.current?.(2);
        setPacketTick((t) => t + 1);
        await sleep(2400);

        // 3. OUTBOUND
        if (cancelRef.current) return;
        setPhase(3);
        onPhaseChangeRef.current?.(3);
        setPacketTick((t) => t + 1);
        await sleep(2400);

        // 4. FIELDS
        if (cancelRef.current) return;
        setPhase(4);
        onPhaseChangeRef.current?.(4);
        setLit((s) => ({ ...s, custom: true }));
        for (let i = 1; i <= 3; i++) {
          if (cancelRef.current) return;
          setFieldRows(i);
          await sleep(160);
        }
        await sleep(550);
        setFieldDragging(true);
        await sleep(450);
        setFieldDragging(false);
        setFieldRows(4);
        await sleep(1700);

        // 5. PROCUREMENT LOOP
        if (cancelRef.current) return;
        setPhase(5);
        onPhaseChangeRef.current?.(5);
        setLit((s) => ({ ...s, fast: true }));
        // Step through the procurement loop
        setProcStep(1); await sleep(600);  // SAP lights up
        setProcStep(2); await sleep(700);  // REQ arrow animates
        setProcStep(3); await sleep(600);  // FactWise lights up
        setProcStep(4); await sleep(900);  // FactWise processing
        setProcStep(5); await sleep(700);  // Draft PO arrow animates
        setProcStep(6); await sleep(700);  // Return arrow to SAP
        setProcStep(7); await sleep(1800); // Done — all lit

        // 6. FINALE
        if (cancelRef.current) return;
        setPhase(6);
        onPhaseChangeRef.current?.(6);
        for (let i = 1; i <= 4; i++) {
          if (cancelRef.current) return;
          setFinaleChips(i);
          await sleep(120);
        }
        await sleep(3600);
      }
    }

    loop();
    return () => {
      cancelRef.current = true;
    };
  }, [speed]);

  /* ===== Position Calculations for Orbit ===== */
  const sysPositions = useMemo<SystemPosition[]>(() => {
    // 4 systems placed at the four diagonal corners, evenly spaced around the hub
    const positions: Record<string, { xPct: number; yPct: number }> = {
      erp: { xPct: 22, yPct: 20 },  // top-left
      wms: { xPct: 78, yPct: 20 },  // top-right
      ven: { xPct: 22, yPct: 80 },  // bottom-left
      dig: { xPct: 78, yPct: 80 },  // bottom-right
    };
    return SYSTEMS.map((s) => ({
      ...s,
      xPct: positions[s.id]?.xPct ?? 50,
      yPct: positions[s.id]?.yPct ?? 50,
    }));
  }, []);

  /* ===== Smooth Stats Counters ===== */
  const apisTarget = phase >= 1 ? 6 : 0;
  const objsTarget = phase >= 3 ? 12 : phase >= 2 ? 6 : 0;
  const wksTarget = phase >= 6 ? 2 : 0;

  const apisVal = useCount(apisTarget, true, 600);
  const objsVal = useCount(objsTarget, true, 700);
  const wksVal = useCount(wksTarget, true, 600);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden bg-linear-to-br from-white via-slate-50 to-indigo-50/40">
      
      {/* Dynamic Inject Style element */}
      <style dangerouslySetInnerHTML={{ __html: IN_STYLE }} />

      {/* Visual background grid pattern */}
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-200/20 blur-3xl pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-200/10 blur-3xl pointer-events-none animate-pulse duration-[10s]" />

      {/* Main Standard Mockup Frame - 10% Width reduced */}
      <div className="relative w-full max-w-[691px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-slate-200/70 z-10 overflow-hidden flex flex-col" style={{ height: 577 }}>
        
        {/* Browser Chrome Header */}
        <div className="flex items-center justify-between px-4 bg-slate-50/90 backdrop-blur-md border-b border-slate-100 shrink-0" style={{ height: 32 }}>
          <div className="flex gap-1.5">
            {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full shadow-xs transition-transform hover:scale-110" style={{ background: c }} />
            ))}
          </div>
          <div className="flex-1 max-w-xs mx-auto">
            <div className="h-5 bg-white/80 backdrop-blur-md rounded-md border border-slate-200/60 flex items-center px-3 gap-1.5 shadow-2xs">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[7.5px] text-slate-400 font-mono select-none tracking-tight">factwise.io/integrations/hub</span>
            </div>
          </div>
          <div className="w-10 shrink-0" />
        </div>

        {/* Dashboard Content */}
        <div className="in-dash">
          <div className="in-body">
            
            {/* Side rail navigation */}
            <div className="in-rail">
              <div className="in-railIcon active">
                <II.Hub s={15} />
              </div>
              <div className="in-railIcon">
                <II.Grid s={15} />
              </div>
              <div className="in-railIcon">
                <II.Settings s={15} />
              </div>
              <div className="in-railIcon accent">
                <II.Plus s={15} />
              </div>
            </div>

            {/* Main Application area */}
            <div className="in-main">
              <div className="in-headStrip">
                <div>
                  <h3>Integration Hub</h3>
                  <div className="in-sub">Open APIs · No middleware</div>
                </div>
                <div className="in-livePill">Streaming</div>
              </div>

              {/* Stat tiles removed as requested */}

              {/* Animation Stage canvas */}
              <div className="in-stage">
                <div className="in-stageHead">
                  <h4>
                    {phase === 1 && "API Connections"}
                    {phase === 2 && "Inbound Sync"}
                    {phase === 3 && "Outbound Sync"}
                    {phase === 4 && "Custom Fields"}
                    {phase === 5 && "SAP ↔ FactWise ↔ SAP Loop"}
                    {phase === 6 && "Built to Last"}
                    {phase === 0 && "Initializing..."}
                  </h4>
                  <div className="flex gap-4 items-center">
                    <div className="in-dots2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className={`in-pd ${phase === i ? "on" : phase > i ? "done" : ""}`} />
                      ))}
                    </div>
                    <div className="in-tagPulse">
                      <span className="p" />
                      Auto-syncing
                    </div>
                  </div>
                </div>

                {/* ===== SCENES 1-3: ORBIT SYSTEM MAP + PACKETS ===== */}
                <div className={`in-scene ${phase >= 1 && phase <= 3 ? "on" : ""}`}>
                  <div className="in-hubScene">
                    
                    {/* SVG connecting cables background */}
                    <div className="in-cables">
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                        {sysPositions.map((s) => {
                          const isConnected = connected.has(s.id);
                          const cx1 = (s.xPct + 50) / 2 + (s.xPct < 50 ? -4 : 4);
                          const cy1 = (s.yPct + 50) / 2 + (s.yPct < 50 ? -4 : 4);
                          const d = `M ${s.xPct} ${s.yPct} Q ${cx1} ${cy1} 50 50`;
                          return (
                            <path
                              key={s.id}
                              className={`in-cable ${isConnected ? "in" : ""}`}
                              d={d}
                              stroke={isConnected ? s.color : "#cbd5e1"}
                              strokeOpacity={isConnected ? 0.8 : 0.2}
                            />
                          );
                        })}
                      </svg>
                    </div>

                    {/* Central FactWise Hub */}
                    <div className={`in-hub ${hubIn ? "in" : ""}`}>
                      <II.Hub s={18} />
                      <div className="hubLabel">FactWise</div>
                      <div className="hubSub">Hub</div>
                    </div>

                    {/* Surrounding systems */}
                    {sysPositions.map((s) => {
                      const IconComponent = II[s.icon];
                      const isConnected = connected.has(s.id);
                      return (
                        <div
                          key={s.id}
                          className={`in-sys ${isConnected ? "connected" : ""}`}
                          style={{ left: s.xPct + "%", top: s.yPct + "%" }}
                        >
                          <div className="in-sysHead">
                            <div className="in-sysIc" style={{ background: s.color }}>
                              {IconComponent && <IconComponent s={10} />}
                            </div>
                            <div className="in-sysName">{s.name}</div>
                          </div>
                          <div className="in-sysSub">{s.sub}</div>
                          <div className="in-sysDot" />
                        </div>
                      );
                    })}

                    {/* INBOUND packets flow (Scene 2) */}
                    {phase === 2 &&
                      PACKETS_IN.map((p, i) => {
                        const src = sysPositions.find((s) => s.id === p.from);
                        if (!src) return null;
                        return (
                          <Packet
                            key={`in-${packetTick}-${i}`}
                            delay={i * 320}
                            from={{ x: src.xPct, y: src.yPct }}
                            to={{ x: 50, y: 50 }}
                            color={p.color}
                            label={p.label}
                            sub={p.shortId}
                          />
                        );
                      })}

                    {/* OUTBOUND packets flow (Scene 3) */}
                    {phase === 3 &&
                      PACKETS_OUT.map((p, i) => {
                        const dst = sysPositions.find((s) => s.id === p.to);
                        if (!dst) return null;
                        return (
                          <Packet
                            key={`out-${packetTick}-${i}`}
                            delay={i * 320}
                            from={{ x: 50, y: 50 }}
                            to={{ x: dst.xPct, y: dst.yPct }}
                            color={p.color}
                            label={p.label}
                            sub={p.shortId}
                          />
                        );
                      })}

                    {/* Flow legends */}
                    {phase === 2 && (
                      <div className="in-flowKey">
                        <div className="lab">Inbound</div>
                        {PACKETS_IN.map((p) => (
                          <div key={p.label} className="row in">
                            <span className="sw" style={{ background: p.color }} />
                            {p.label}
                          </div>
                        ))}
                      </div>
                    )}
                    {phase === 3 && (
                      <div className="in-flowKey right">
                        <div className="lab">Outbound</div>
                        {PACKETS_OUT.map((p) => (
                          <div key={p.label} className="row in">
                            <span className="sw" style={{ background: p.color }} />
                            {p.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ===== SCENE 4: CUSTOM FIELDS SCHEMAS ===== */}
                <div className={`in-scene ${phase === 4 ? "on" : ""}`}>
                  <div className="in-fields">
                    <div className="in-fieldsLeft">
                      <div className="in-fieldsTitle">Field types</div>
                      <div className="in-fieldChip"><II.Drag s={8} /> Text<span className="typeBadge">TEXT</span></div>
                      <div className="in-fieldChip"><II.Drag s={8} /> Number<span className="typeBadge">NUM</span></div>
                      <div className={`in-fieldChip ${fieldDragging ? "dragging" : ""}`}>
                        <II.Drag s={8} /> Select<span className="typeBadge">SEL</span>
                      </div>
                      <div className="in-fieldChip"><II.Drag s={8} /> Reference<span className="typeBadge">REF</span></div>
                      <div className="in-fieldChip"><II.Drag s={8} /> Date<span className="typeBadge">DATE</span></div>
                    </div>
                    <div className="in-fieldsRight">
                      <div className="in-fieldsHeader">
                        <span className="nm">Schema · PO Line Item</span>
                        <span className="ct">{Math.min(fieldRows, FIELD_SCHEMA.length)} fields</span>
                      </div>
                      {FIELD_SCHEMA.map((f, i) => (
                        <div
                          key={f.name}
                          className={`in-fieldRow ${fieldRows > i ? "in " : ""}${!f.existed ? "new" : ""}`}
                        >
                          <span className="nm">{f.name}</span>
                          <span className="ty">{f.type}</span>
                          {!f.existed && <span className="badge">NEW</span>}
                          {f.existed && <span style={{ width: 30 }} />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ===== SCENE 5: PROCUREMENT LOOP ===== */}
                <div className={`in-scene ${phase === 5 ? "on" : ""}`}>
                  <ProcurementLoop procStep={procStep} />
                </div>

                {/* ===== SCENE 6: FINALE CAPABILITIES ===== */}
                <div className={`in-scene ${phase === 6 ? "on" : ""}`}>
                  <div className="in-finale">
                    <div className="in-finaleA">Live in 2–4 weeks.</div>
                    <div className="in-finaleB">
                      Built to last{" "}
                      <span className="inf">
                        <II.Forever s={20} />
                      </span>
                    </div>
                    <div className="in-finaleSub">
                      Open APIs to every ERP, distributor, and vendor system. Every field, every formula, every workflow — configurable by your team, not IT.
                    </div>
                    <div className="in-finaleChips">
                      <div className={`in-finaleChip ${finaleChips > 0 ? "in" : ""}`}>
                        <span className="ic">
                          <II.Link s={10} />
                        </span>
                        Open APIs
                      </div>
                      <div className={`in-finaleChip ${finaleChips > 1 ? "in" : ""}`}>
                        <span className="ic">
                          <II.PenSq s={10} />
                        </span>
                        Custom fields
                      </div>
                      <div className={`in-finaleChip ${finaleChips > 2 ? "in" : ""}`}>
                        <span className="ic">
                          <II.Workflow s={10} />
                        </span>
                        Configurable workflows
                      </div>
                      <div className={`in-finaleChip ${finaleChips > 3 ? "in" : ""}`}>
                        <span className="ic">
                          <II.Link s={10} />
                        </span>
                        Closed-Loop PO
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Caption bar — between stage and pills */}
              <div className={`in-caption-bar ${CAPTIONS[phase] ? "on" : ""}`}>
                <span className="in-caption-dot" />
                {CAPTIONS[phase] ?? ""}
              </div>


            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { useReveal, Tick, AG_KEYFRAMES } from './SharedItems'

/* ─────────────────────────────────────────
   BENCH FLOW DIAGRAM — Interactive 3-step story
   v2: Tighter viewBox, stronger visual hierarchy, no dead space
───────────────────────────────────────── */

const CANDIDATES = [
    { id: 'PS', color: '#3470F0', initials: 'PS', name: 'Priya S.', role: 'Backend Eng' },
    { id: 'RV', color: '#8a33e0', initials: 'RV', name: 'Rahul V.', role: 'Designer' },
    { id: 'AM', color: '#18B87A', initials: 'AM', name: 'Aarav M.', role: 'DevOps Eng' },
]

const CLIENTS = [
    { name: 'TechCorp', role: 'Backend Lead' },
    { name: 'Razorpay', role: 'Platform Eng' },
    { name: 'Swiggy', role: 'SRE Lead' },
]

const STEPS = [
    {
        id: 1,
        label: 'Candidates join',
        caption: 'OTP verify → resume parse → consent. Candidates own their profile.',
        highlight: 'left',
    },
    {
        id: 2,
        label: 'Bench is yours',
        caption: 'Isolated. No client ever sees it. No competing agency can touch it.',
        highlight: 'center',
    },
    {
        id: 3,
        label: 'You submit',
        caption: 'Multi-client in one action. Each submission is an independent record.',
        highlight: 'right',
    },
]

function FlowDot({
    pathId, color, delay, duration, active,
}: {
    pathId: string; color: string; delay: number; duration: number; active: boolean
}) {
    return active ? (
        <circle r={4.5} fill={color} opacity={0.95}>
            <animateMotion
                dur={`${duration}s`}
                repeatCount="indefinite"
                begin={`${delay}s`}
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
            >
                <mpath href={`#${pathId}`} />
            </animateMotion>
        </circle>
    ) : null
}

function BenchFlowDiagram({ visible }: { visible: boolean }) {
    const [ready, setReady] = useState(false)
    const [activeStep, setActiveStep] = useState(1)
    const [autoPlay, setAutoPlay] = useState(true)

    useEffect(() => {
        if (!visible) return
        const t = setTimeout(() => setReady(true), 400)
        return () => clearTimeout(t)
    }, [visible])

    useEffect(() => {
        if (!ready || !autoPlay) return
        const iv = setInterval(() => {
            setActiveStep(s => s === 3 ? 1 : s + 1)
        }, 3600)
        return () => clearInterval(iv)
    }, [ready, autoPlay])

    const showLeft = activeStep === 1
    const showCenter = activeStep === 2
    const showRight = activeStep === 3

    // Improved opacities — less aggressive dimming so context remains readable
    const leftOpacity = showLeft ? 1 : activeStep === 2 ? 0.45 : 0.28
    const centerOpacity = showCenter ? 1 : 0.7
    const rightOpacity = showRight ? 1 : activeStep === 2 ? 0.45 : 0.28

    return (
        <div style={{
            background: 'var(--navy2)',
            border: '1px solid rgba(255,255,255,.09)',
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 24px 56px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.04)',
            opacity: ready ? 1 : 0,
            transform: ready ? 'none' : 'translateY(14px)',
            transition: 'opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1)',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Titlebar */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,.06)',
                background: 'rgba(0,0,0,.2)',
            }}>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['#FF5F57', '#FFBD2E', '#28C840'].map(c => (
                        <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                    ))}
                </div>
                <span style={{ fontSize: 10.5, color: 'var(--text3)', fontFamily: "'Geist',sans-serif", letterSpacing: .3 }}>
                    Bench Ownership — Data Flow
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#18B87A', animation: 'agPulse 2s ease-in-out infinite' }} />
                    <span style={{ fontSize: 9.5, color: '#18B87A', fontFamily: "'Geist',sans-serif" }}>Live</span>
                </div>
            </div>

            {/* Step tabs */}
            <div style={{
                display: 'flex',
                borderBottom: '1px solid rgba(255,255,255,.05)',
                background: 'rgba(0,0,0,.12)',
            }}>
                {STEPS.map((step) => (
                    <button
                        key={step.id}
                        onClick={() => { setActiveStep(step.id); setAutoPlay(false) }}
                        style={{
                            flex: 1, padding: '10px 12px',
                            background: 'none', border: 'none',
                            borderBottom: activeStep === step.id
                                ? '2px solid rgba(196,154,60,.85)'
                                : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all .22s ease',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                            <div style={{
                                width: 20, height: 20, borderRadius: '50%',
                                background: activeStep === step.id
                                    ? 'rgba(196,154,60,.9)'
                                    : 'rgba(255,255,255,.08)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 9.5, fontWeight: 700,
                                color: activeStep === step.id ? '#1a0e00' : 'rgba(255,255,255,.3)',
                                fontFamily: "'Geist',sans-serif",
                                transition: 'all .22s',
                                flexShrink: 0,
                            }}>
                                {step.id}
                            </div>
                            <span style={{
                                fontSize: 12, fontWeight: 600,
                                fontFamily: "'Geist',sans-serif",
                                color: activeStep === step.id
                                    ? 'rgba(196,154,60,.95)'
                                    : 'rgba(255,255,255,.3)',
                                transition: 'color .22s',
                                letterSpacing: .2,
                            }}>
                                {step.label}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {/*
              ──────────────────────────────────────────────────────
              SVG diagram
              KEY FIX: viewBox reduced from 720×420 → 660×330
              Candidates: cx=80, cy=78/158/238  (100px apart, r=32)
              Bench: cx=330, cy=158, r=44
              Clients: cx=490, width=120, cy centres 78/158/238
              Column headers: y=20/32
              Everything fits in 330px tall. No dead space at bottom.
              ──────────────────────────────────────────────────────
            */}
            <div style={{ padding: '16px 16px 10px', position: 'relative', flex: 1 }}>
                <svg viewBox="0 0 660 310" width="100%" style={{ display: 'block', overflow: 'visible' }}>
                    <defs>
                        {/* Inbound paths: candidates cx=80 → bench entry cx=284 */}
                        {/* Candidate Y: 78, 158, 238. Bench entry fanned: 144, 158, 172 */}
                        <path id="cand1" d="M 112 78  C 190 78  240 130 284 144" fill="none" />
                        <path id="cand2" d="M 112 158 C 190 158 240 158 284 158" fill="none" />
                        <path id="cand3" d="M 112 238 C 190 238 240 186 284 172" fill="none" />
                        {/* Outbound paths: bench exit cx=376 → clients cx=490 */}
                        {/* Client Y centres: 78, 158, 238 */}
                        <path id="cl1" d="M 376 144 C 420 120 455 98  490 86" fill="none" />
                        <path id="cl2" d="M 376 158 C 420 158 455 158 490 158" fill="none" />
                        <path id="cl3" d="M 376 172 C 420 196 455 218 490 230" fill="none" />

                        <radialGradient id="benchGlow2" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(196,154,60,.28)" />
                            <stop offset="100%" stopColor="rgba(196,154,60,0)" />
                        </radialGradient>
                        <radialGradient id="leftGlow2" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(52,112,240,.22)" />
                            <stop offset="100%" stopColor="rgba(52,112,240,0)" />
                        </radialGradient>
                    </defs>

                    {/* Background grid */}
                    <pattern id="bfGrid2" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M24 0L0 0 0 24" fill="none" stroke="rgba(255,255,255,.022)" strokeWidth="0.5" />
                    </pattern>
                    <rect width="660" height="310" fill="url(#bfGrid2)" />

                    {/* ── Column headers ── */}
                    <text x="80" y="20" textAnchor="middle" fontSize="9" fontWeight="700"
                        letterSpacing="2" fontFamily="'Geist',sans-serif"
                        fill={leftOpacity > 0.5 ? 'rgba(255,255,255,.48)' : 'rgba(255,255,255,.2)'}>
                        CANDIDATES
                    </text>
                    <text x="80" y="34" textAnchor="middle" fontSize="7.5" fontFamily="'Geist',sans-serif"
                        fill={leftOpacity > 0.5 ? 'rgba(255,255,255,.28)' : 'rgba(255,255,255,.12)'}>
                        via portal
                    </text>

                    <text x="330" y="20" textAnchor="middle" fontSize="9" fontWeight="700"
                        letterSpacing="2" fontFamily="'Geist',sans-serif"
                        fill="rgba(196,154,60,.85)">
                        YOUR BENCH
                    </text>
                    <text x="330" y="34" textAnchor="middle" fontSize="7.5" fontFamily="'Geist',sans-serif"
                        fill="rgba(196,154,60,.5)">
                        agency-owned · isolated
                    </text>

                    <text x="553" y="20" textAnchor="middle" fontSize="9" fontWeight="700"
                        letterSpacing="2" fontFamily="'Geist',sans-serif"
                        fill={rightOpacity > 0.5 ? 'rgba(255,255,255,.48)' : 'rgba(255,255,255,.2)'}>
                        CLIENTS
                    </text>
                    <text x="553" y="34" textAnchor="middle" fontSize="7.5" fontFamily="'Geist',sans-serif"
                        fill={rightOpacity > 0.5 ? 'rgba(255,255,255,.28)' : 'rgba(255,255,255,.12)'}>
                        no cross-visibility
                    </text>

                    {/* Divider */}
                    <line x1="16" y1="44" x2="644" y2="44" stroke="rgba(255,255,255,.04)" strokeWidth="1" />

                    {/* Left glow */}
                    {showLeft && (
                        <circle cx="80" cy="158" r="90" fill="url(#leftGlow2)" style={{ transition: 'opacity .4s' }} />
                    )}

                    {/* ── Connector lines ── */}
                    {/* Inbound */}
                    {([
                        'M 112 78  C 190 78  240 130 284 144',
                        'M 112 158 C 190 158 240 158 284 158',
                        'M 112 238 C 190 238 240 186 284 172',
                    ] as string[]).map((d, i) => (
                        <path key={i} d={d} fill="none"
                            stroke={showLeft ? 'rgba(52,112,240,.36)' : 'rgba(255,255,255,.07)'}
                            strokeWidth={showLeft ? 1.5 : 1} strokeDasharray="5 4"
                            style={{ transition: 'stroke .4s, stroke-width .4s' }} />
                    ))}
                    {/* Outbound */}
                    {([
                        'M 376 144 C 420 120 455 98  490 86',
                        'M 376 158 C 420 158 455 158 490 158',
                        'M 376 172 C 420 196 455 218 490 230',
                    ] as string[]).map((d, i) => (
                        <path key={i} d={d} fill="none"
                            stroke={showRight ? 'rgba(196,154,60,.45)' : 'rgba(196,154,60,.12)'}
                            strokeWidth={showRight ? 1.6 : 1} strokeDasharray="5 4"
                            style={{ transition: 'stroke .4s, stroke-width .4s' }} />
                    ))}

                    {/* Mid-path direction labels */}
                    <text x="198" y="116" textAnchor="middle" fontSize="8.5" fontFamily="'Geist',sans-serif"
                        fill={showLeft ? 'rgba(52,112,240,.75)' : 'rgba(255,255,255,.1)'}
                        style={{ transition: 'fill .3s' }}>join your bench →</text>
                    <text x="438" y="110" textAnchor="middle" fontSize="8.5" fontFamily="'Geist',sans-serif"
                        fill={showRight ? 'rgba(196,154,60,.75)' : 'rgba(255,255,255,.1)'}
                        style={{ transition: 'fill .3s' }}>you submit →</text>

                    {/* ── CANDIDATE NODES — cx=80, cy 78/158/238, r=30 ── */}
                    {CANDIDATES.map((c, i) => {
                        const cy = 78 + i * 80
                        return (
                            <g key={c.id} style={{ opacity: leftOpacity, transition: 'opacity .4s' }}>
                                {/* Avatar circle */}
                                <circle cx={80} cy={cy} r={30}
                                    fill={`${c.color}18`}
                                    stroke={c.color}
                                    strokeWidth={showLeft ? 1.5 : 1}
                                    style={{ transition: 'stroke-width .3s' }} />
                                {/* Initials */}
                                <text x={80} y={cy - 4} textAnchor="middle" fontSize="10" fontWeight="700"
                                    fill={c.color} fontFamily="'Geist',sans-serif">{c.initials}</text>
                                <text x={80} y={cy + 8} textAnchor="middle" fontSize="7.5"
                                    fill="rgba(255,255,255,.5)" fontFamily="'Geist',sans-serif">{c.role}</text>
                                {/* Name below */}
                                <text x={80} y={cy + 40} textAnchor="middle" fontSize="8.5" fontWeight="600"
                                    fill="rgba(255,255,255,.6)" fontFamily="'Geist',sans-serif">{c.name}</text>
                            </g>
                        )
                    })}

                    {/* ── BENCH NODE — cx=330, cy=158, r=44 ── */}
                    <circle cx="330" cy="158" r="62" fill="url(#benchGlow2)" />
                    {/* Pulse rings */}
                    <circle cx="330" cy="158" r="46"
                        fill="none"
                        stroke={showCenter ? 'rgba(196,154,60,.5)' : 'rgba(196,154,60,.2)'}
                        strokeWidth="1"
                        style={{ animation: 'bfRingA 2.2s ease-out infinite', transition: 'stroke .4s' }} />
                    <circle cx="330" cy="158" r="46"
                        fill="none" stroke="rgba(196,154,60,.12)" strokeWidth="1"
                        style={{ animation: 'bfRingA 2.2s ease-out infinite', animationDelay: '1.1s' }} />
                    {/* Main circle */}
                    <circle cx="330" cy="158" r="40"
                        fill={showCenter ? 'rgba(196,154,60,.14)' : 'rgba(196,154,60,.07)'}
                        stroke="rgba(196,154,60,.5)" strokeWidth={showCenter ? 2 : 1.5}
                        style={{ transition: 'fill .4s, stroke-width .3s' }} />
                    {/* Lock body */}
                    <rect x="318" y="152" width="24" height="16" rx="3.5"
                        fill="none" stroke="var(--gold)" strokeWidth="2" />
                    {/* Lock shackle */}
                    <path d="M321 152 L321 148 C321 143 339 143 339 148 L339 152"
                        fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
                    {/* Lock keyhole */}
                    <circle cx="330" cy="160" r="2.5" fill="var(--gold)" />

                    {/* Count badge — step 2 only */}
                    {/* Circle bottom edge = cy(158) + r(40) = 198. Badge starts at y=206 → clear below */}
                    {showCenter && (
                        <g style={{ animation: 'bsBadgeIn .35s cubic-bezier(.16,1,.3,1) both' }}>
                            <rect x="292" y="206" width="76" height="18" rx="9"
                                fill="rgba(196,154,60,.22)" stroke="rgba(196,154,60,.4)" strokeWidth="1" />
                            <text x="330" y="218" textAnchor="middle" fontSize="9" fontWeight="700"
                                fill="var(--gold)" fontFamily="'Geist',sans-serif">127 candidates</text>
                        </g>
                    )}
                    {/* "Your Bench" label — pushed down to clear badge */}
                    <text x="330" y="238" textAnchor="middle" fontSize="11" fontWeight="700"
                        fill="var(--gold)" fontFamily="'Geist',sans-serif">Your Bench</text>

                    {/* ── CLIENT NODES — cx=490, width=116, cy centres 78/158/238 ── */}
                    {CLIENTS.map((cl, i) => {
                        const cy = 78 + i * 80
                        return (
                            <g key={cl.name} style={{ opacity: rightOpacity, transition: 'opacity .4s' }}>
                                <rect x="490" y={cy - 22} width="120" height="44" rx="10"
                                    fill={showRight ? 'rgba(196,154,60,.08)' : 'rgba(255,255,255,.04)'}
                                    stroke={showRight ? 'rgba(196,154,60,.3)' : 'rgba(255,255,255,.09)'}
                                    strokeWidth="1"
                                    style={{ transition: 'all .4s' }} />
                                <text x="550" y={cy - 4} textAnchor="middle" fontSize="11" fontWeight="600"
                                    fill="rgba(255,255,255,.88)" fontFamily="'Geist',sans-serif">{cl.name}</text>
                                <text x="550" y={cy + 10} textAnchor="middle" fontSize="9"
                                    fill="rgba(255,255,255,.4)" fontFamily="'Geist',sans-serif">{cl.role}</text>
                            </g>
                        )
                    })}

                    {/* Animated flow dots */}
                    {ready && showLeft && <>
                        <FlowDot pathId="cand1" color="#3470F0" delay={0} duration={1.8} active />
                        <FlowDot pathId="cand2" color="#8a33e0" delay={0.65} duration={1.8} active />
                        <FlowDot pathId="cand3" color="#18B87A" delay={1.3} duration={1.8} active />
                    </>}
                    {ready && showRight && <>
                        <FlowDot pathId="cl1" color="rgba(196,154,60,.95)" delay={0} duration={1.6} active />
                        <FlowDot pathId="cl2" color="rgba(196,154,60,.95)" delay={0.55} duration={1.6} active />
                        <FlowDot pathId="cl3" color="rgba(196,154,60,.95)" delay={1.1} duration={1.6} active />
                    </>}

                    {/* NO ACCESS barrier — x=482, between bench right edge ~374 and client left 490 */}
                    <rect x="481" y="136" width="2" height="44" rx="1"
                        fill="rgba(224,56,79,.45)" />
                    <text x="481" y="130" textAnchor="middle" fontSize="7" fontWeight="700"
                        fill="rgba(224,56,79,.6)" fontFamily="'Geist',sans-serif"
                        letterSpacing="0.5">NO ACCESS</text>

                </svg>

                {/* Step caption — tighter, more visible */}
                <div style={{
                    textAlign: 'center', padding: '4px 16px 8px',
                    fontSize: 12, color: 'rgba(255,255,255,.45)',
                    fontFamily: "'Geist',sans-serif", lineHeight: 1.5,
                    minHeight: 32,
                    transition: 'opacity .3s',
                }}>
                    {STEPS[activeStep - 1].caption}
                </div>
            </div>

            <style suppressHydrationWarning>{`
                @keyframes bfRingA {
                    0%   { r: 46; opacity: .55; }
                    100% { r: 64; opacity: 0; }
                }
                @keyframes bsBadgeIn {
                    from { opacity: 0; transform: scale(.85); }
                    to   { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    )
}

/* ─────────────────────────────────────────
   TIER TOGGLE
───────────────────────────────────────── */

const BASIC_FEATURES = [
    { text: 'Private talent bench', note: 'Unlimited candidates · your IP' },
    { text: 'Self-onboarding portal', note: 'OTP verify + resume parse' },
    { text: '2-signal ML matching', note: 'Skills + experience' },
    { text: 'Multi-client submission', note: 'One action · independent records' },
    { text: 'Commission tracking', note: 'Auto-calc · immutable records' },
    { text: '3 active internal jobs', note: 'Per workspace' },
]

const PRO_FEATURES = [
    { text: 'Everything in Basic', note: 'Full bench stack included' },
    { text: '7-signal ML matching', note: 'History · velocity · availability' },
    { text: 'Portfolio matrix + NL query', note: 'Full candidate × job grid' },
    { text: 'Agreement builder', note: 'Tiered rates · auto-calc' },
    { text: 'White-label client portal', note: 'Your branding throughout' },
    { text: 'Candidate edit review queue', note: 'Field-level rollback · audit log' },
]

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */

export default function S2_BenchSection() {
    const { ref, visible } = useReveal()
    const cardRef = useRef<HTMLDivElement>(null)
    const [activeTier, setActiveTier] = useState<'basic' | 'pro'>('basic')

    /* 3D tilt on card */
    useEffect(() => {
        const el = cardRef.current
        if (!el) return
        const spot = el.querySelector<HTMLElement>('.bs-spot')
        const mv = (e: MouseEvent) => {
            const r = el.getBoundingClientRect()
            const x = e.clientX - r.left
            const y = e.clientY - r.top
            const rx = ((y - r.height / 2) / r.height) * -4
            const ry = ((x - r.width / 2) / r.width) * 4
            el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`
            if (spot) {
                spot.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(196,154,60,.1) 0%, transparent 65%)`
                spot.style.opacity = '1'
            }
        }
        const lv = () => {
            el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
            if (spot) spot.style.opacity = '0'
        }
        el.addEventListener('mousemove', mv)
        el.addEventListener('mouseleave', lv)
        return () => { el.removeEventListener('mousemove', mv); el.removeEventListener('mouseleave', lv) }
    }, [])

    const features = activeTier === 'basic' ? BASIC_FEATURES : PRO_FEATURES

    return (
        <>
            <style suppressHydrationWarning>{`
                ${AG_KEYFRAMES}

                /* ══ BENCH SECTION ══════════════════════════════════════ */
                .bs-section {
                    background: var(--cream);
                    position: relative;
                    overflow: hidden;
                }
                .bs-section .wrap {
                    padding-top: 56px !important;
                    padding-bottom: 64px !important;
                }

                .bs-reveal { opacity: 0; transform: translateY(20px); transition: opacity .7s ease, transform .7s ease; }
                .bs-reveal.bs-vis { opacity: 1; transform: none; }

                /* ── Header ─────────────────────────────────────────── */
                .bs-header {
                    text-align: center;
                    max-width: 640px;
                    margin: 0 auto 40px;
                }
                .bs-eyebrow {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-size: 10.5px; font-weight: 600; color: #8B6414;
                    text-transform: uppercase; letter-spacing: 2.8px;
                    margin-bottom: 16px;
                }
                .bs-ey-line { width: 18px; height: 1px; background: currentColor; }

                .bs-h2 {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(30px, 3.6vw, 48px);
                    font-weight: 400; line-height: 1.08;
                    letter-spacing: -1.2px; color: var(--ink);
                    margin-bottom: 14px;
                }
                .bs-h2 em {
                    font-style: italic; font-weight: 300;
                    color: #0A2D80;
                }
                .bs-lead {
                    font-size: clamp(14px, 1vw, 15.5px);
                    color: var(--ink3); line-height: 1.7;
                    font-weight: 300; max-width: 500px; margin: 0 auto;
                }

                /* ── Two-column layout ──────────────────────────────── */
                .bs-body {
                    display: grid;
                    grid-template-columns: 1.35fr 1fr;
                    gap: 28px;
                    max-width: 1180px;
                    margin: 0 auto;
                    align-items: stretch;
                }

                .bs-anim-wrap {
                    display: flex;
                    flex-direction: column;
                }
                .bs-anim-label {
                    font-size: 9.5px; font-weight: 700; letter-spacing: 1.8px;
                    text-transform: uppercase; color: rgba(139,100,20,.55);
                    margin-bottom: 10px; text-align: center;
                    flex-shrink: 0;
                }

                /* ── Right panel ────────────────────────────────────── */
                .bs-right {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    position: sticky;
                    top: 24px;
                    /* anim-label (~9.5px text + 10px margin-bottom) + diagram top padding (16px)
                       = ~36px. Pad the right col so toggle row aligns with dashboard titlebar. */
                    padding-top: 36px;
                }

                /* ── Tier toggle ─────────────────────────────────────── */
                .bs-tier-toggle {
                    display: flex;
                    background: rgba(12,24,40,.06);
                    border: 1px solid rgba(12,24,40,.1);
                    border-radius: 11px;
                    padding: 4px;
                    gap: 4px;
                }
                .bs-tier-btn {
                    flex: 1; padding: 9px 12px;
                    border: none; border-radius: 8px;
                    font-size: 12.5px; font-weight: 600;
                    cursor: pointer;
                    transition: all .22s cubic-bezier(.16,1,.3,1);
                    font-family: 'Geist', sans-serif;
                    letter-spacing: .2px;
                }
                .bs-tier-btn-inactive {
                    background: none;
                    color: var(--ink3);
                }
                .bs-tier-btn-inactive:hover {
                    background: rgba(12,24,40,.05);
                    color: var(--ink2);
                }
                .bs-tier-btn-basic {
                    background: var(--navy2);
                    color: rgba(255,255,255,.9);
                    box-shadow: 0 2px 8px rgba(12,24,40,.18);
                }
                .bs-tier-btn-pro {
                    background: linear-gradient(135deg, rgba(196,154,60,.9), rgba(180,138,40,.95));
                    color: #1a0e00;
                    box-shadow: 0 2px 12px rgba(196,154,60,.3);
                }

                /* ── Feature card ───────────────────────────────────── */
                .bs-card {
                    background: #fffef8;
                    border: 1.5px solid rgba(196,154,60,.26);
                    border-radius: 18px;
                    padding: 22px 22px 18px;
                    position: relative; overflow: hidden;
                    cursor: default;
                    transform-style: preserve-3d; will-change: transform;
                    transition: transform .14s cubic-bezier(.16,1,.3,1), box-shadow .3s ease;
                    box-shadow: 0 4px 24px rgba(196,154,60,.09), 0 1px 4px rgba(196,154,60,.06);
                }
                .bs-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(196,154,60,.72), transparent);
                    z-index: 3;
                }
                .bs-card:hover {
                    box-shadow: 0 20px 56px rgba(196,154,60,.13), 0 0 0 1.5px rgba(196,154,60,.32);
                }
                .bs-card-orb {
                    position: absolute; top: -40px; right: -40px;
                    width: 160px; height: 160px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(196,154,60,.18) 0%, transparent 70%);
                    filter: blur(32px); pointer-events: none; z-index: 0; opacity: .5;
                }
                .bs-spot {
                    position: absolute; inset: 0; border-radius: 18px;
                    pointer-events: none; z-index: 0;
                    opacity: 0; transition: opacity .3s;
                }
                .bs-card-inner { position: relative; z-index: 2; }

                .bs-card-head {
                    margin-bottom: 14px; padding-bottom: 12px;
                    border-bottom: 1px solid rgba(196,154,60,.14);
                }
                .bs-card-label {
                    font-size: 9px; font-weight: 700;
                    letter-spacing: 2.2px; text-transform: uppercase;
                    color: #8B6414; margin-bottom: 5px;
                }
                .bs-card-title {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(15px, 1.2vw, 19px);
                    font-weight: 400; line-height: 1.2;
                    letter-spacing: -.25px; color: var(--ink); margin-bottom: 4px;
                }
                .bs-card-desc {
                    font-size: clamp(12px, .8vw, 13px);
                    color: var(--ink3); line-height: 1.6; font-weight: 300;
                }

                /* ── Features grid — IMPROVED ───────────────────────── */
                /*
                 * FIX: Switched from equal 1fr 1fr to slightly unequal columns.
                 * Increased row padding for breathing room.
                 * Text bumped to 12px (was 11–12.5px clamp).
                 */
                .bs-feats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0;
                }
                .bs-feat {
                    display: flex; align-items: flex-start; gap: 9px;
                    padding: 9px 6px 9px 0;
                    border-bottom: 1px solid rgba(196,154,60,.1);
                    animation: bsFeatIn .28s cubic-bezier(.16,1,.3,1) both;
                }
                @keyframes bsFeatIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to   { opacity: 1; transform: none; }
                }
                .bs-feat:nth-child(1) { animation-delay: .02s }
                .bs-feat:nth-child(2) { animation-delay: .05s }
                .bs-feat:nth-child(3) { animation-delay: .08s }
                .bs-feat:nth-child(4) { animation-delay: .11s }
                .bs-feat:nth-child(5) { animation-delay: .14s }
                .bs-feat:nth-child(6) { animation-delay: .17s }
                .bs-feat:nth-last-child(-n+2) { border-bottom: none; }
                .bs-feat:last-child:nth-child(odd) { grid-column: span 2; }

                .bs-feat-dot {
                    width: 16px; height: 16px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0; margin-top: 1px;
                    background: rgba(196,154,60,.11); border: 1px solid rgba(196,154,60,.28);
                    transition: transform .22s cubic-bezier(.16,1,.3,1);
                }
                .bs-feat:hover .bs-feat-dot { transform: scale(1.2); }

                .bs-feat-label {
                    font-size: 12px;      /* FIX: was 11px–12.5px clamp, now solid 12px */
                    font-weight: 500; line-height: 1.3;
                    color: var(--ink2);
                }
                .bs-feat-note {
                    font-size: 10px;      /* FIX: was 9.5px — just enough to be readable */
                    margin-top: 1px; line-height: 1.35;
                    color: rgba(139,100,20,.6);
                }

                /* ── Ownership callout ──────────────────────────────── */
                .bs-callout {
                    display: flex; align-items: flex-start; gap: 12px;
                    padding: 12px 14px;
                    background: rgba(196,154,60,.06);
                    border: 1px solid rgba(196,154,60,.18);
                    border-radius: 12px;
                }
                .bs-callout-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: var(--gold); flex-shrink: 0; margin-top: 5px;
                    animation: agPulse 2s ease-in-out infinite;
                }
                .bs-callout-text {
                    font-size: clamp(11.5px, .76vw, 12.5px);
                    color: var(--ink3); line-height: 1.6; font-weight: 300;
                }
                .bs-callout-text strong { font-weight: 600; color: #8B6414; }

                /* ══ RESPONSIVE ════════════════════════════════════════ */
                @media (max-width: 860px) {
                    .bs-body { grid-template-columns: 1fr; max-width: 580px; align-items: start; }
                    .bs-anim-wrap { display: flex; flex-direction: column; }
                    .bs-right { position: static; padding-top: 0; }
                    .bs-tier-toggle { margin-top: 0; }
                    .bs-card { max-width: 480px; margin: 0 auto; width: 100%; }
                    .bs-callout { max-width: 480px; margin: 0 auto; width: 100%; }
                    .bs-feats { grid-template-columns: 1fr; }
                    .bs-feat:nth-last-child(-n+2) { border-bottom: 1px solid rgba(196,154,60,.1); }
                    .bs-feat:last-child { border-bottom: none !important; }
                    .bs-feat:last-child:nth-child(odd) { grid-column: span 1; }
                }
                @media (max-width: 700px) {
                    .bs-section .wrap { padding-top: 40px !important; padding-bottom: 40px !important; }
                    .bs-header { margin-bottom: 30px; }
                    .bs-h2 { font-size: clamp(26px, 7vw, 36px); }
                    .bs-card { padding: 18px 16px; max-width: 100%; }
                    .bs-callout { max-width: 100%; }
                    .bs-body { max-width: 100%; }
                }
                @media (max-width: 480px) {
                    .bs-h2 { font-size: clamp(22px, 8vw, 30px); }
                }
            `}</style>

            <section id="bench" className="bs-section">
                <div className="wrap">
                    <div ref={ref} className={`bs-reveal${visible ? ' bs-vis' : ''}`}>

                        {/* ── Header ── */}
                        <div className="bs-header">
                            <div className="bs-eyebrow">
                                <span className="bs-ey-line" />
                                Your bench. Your IP.
                            </div>
                            <h2 className="bs-h2">
                                Your bench is a moat.{' '}
                                <em>Don't let anyone else hold the keys.</em>
                            </h2>
                            <p className="bs-lead">
                                Every candidate you've sourced, every relationship you've built — it's yours unconditionally.
                                Not visible to clients. Not accessible to competing agencies. Not gone the day a client churns.
                            </p>
                        </div>

                        {/* ── Two-column body ── */}
                        <div className="bs-body">

                            {/* LEFT: animated diagram */}
                            <div className="bs-anim-wrap">
                                <div className="bs-anim-label">How data flows — and what it can't do</div>
                                <BenchFlowDiagram visible={visible} />
                            </div>

                            {/* RIGHT: tier toggle + features */}
                            <div className="bs-right">

                                {/* Tier toggle */}
                                <div className="bs-tier-toggle">
                                    <button
                                        className={`bs-tier-btn ${activeTier === 'basic' ? 'bs-tier-btn-basic' : 'bs-tier-btn-inactive'}`}
                                        onClick={() => setActiveTier('basic')}
                                    >
                                        Agency Basic
                                    </button>
                                    <button
                                        className={`bs-tier-btn ${activeTier === 'pro' ? 'bs-tier-btn-pro' : 'bs-tier-btn-inactive'}`}
                                        onClick={() => setActiveTier('pro')}
                                    >
                                        ★ Agency Pro
                                    </button>
                                </div>

                                {/* Feature card */}
                                <div className="bs-card" ref={cardRef}>
                                    <div className="bs-card-orb" />
                                    <div className="bs-spot" />
                                    <div className="bs-card-inner">
                                        <div className="bs-card-head">
                                            <div className="bs-card-label">
                                                When you own your workspace — {activeTier === 'basic' ? 'Basic' : 'Pro'}
                                            </div>
                                            <div className="bs-card-title">
                                                {activeTier === 'basic'
                                                    ? 'Full bench. Every client. All yours.'
                                                    : 'Full intelligence, all clients.'}
                                            </div>
                                            <p className="bs-card-desc">
                                                {activeTier === 'basic'
                                                    ? 'Your candidates never touch a client\'s scope. No client can ever access this. Ever.'
                                                    : '7-signal ML, portfolio matrix, white-label portal, and full compliance tooling.'}
                                            </p>
                                        </div>

                                        <div className="bs-feats" key={activeTier}>
                                            {features.map((f, i) => (
                                                <div key={i} className="bs-feat">
                                                    <div className="bs-feat-dot">
                                                        <Tick c="#8B6414" />
                                                    </div>
                                                    <div>
                                                        <div className="bs-feat-label">{f.text}</div>
                                                        <div className="bs-feat-note">{f.note}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Ownership callout */}
                                <div className="bs-callout">
                                    <div className="bs-callout-dot" />
                                    <p className="bs-callout-text">
                                        <strong>Unconditional ownership:</strong> If you cancel, your bench exports.
                                        If a client churns, your sourcing stays intact. Yours from day one.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
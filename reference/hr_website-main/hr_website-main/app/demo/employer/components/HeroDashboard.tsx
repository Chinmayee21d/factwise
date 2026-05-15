'use client'

import { useEffect, useState, useRef } from 'react'


/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PIPELINE_CANDIDATES = [
    { init: 'PS', bg: '#3470F0', name: 'Priya S.', role: 'Sr. Backend Eng.', stage: 0, score: 92, verdict: 'PROCEED', vc: '#18B87A' },
    { init: 'RV', bg: '#8a33e0', name: 'Rahul V.', role: 'Backend Eng.', stage: 1, score: 71, verdict: 'MAYBE', vc: '#F79009' },
    { init: 'AM', bg: '#18B87A', name: 'Aarav M.', role: 'Junior Eng.', stage: 0, score: 44, verdict: 'DECLINE', vc: '#E0384F' },
    { init: 'SK', bg: '#C49A3C', name: 'Sneha K.', role: 'Product Designer', stage: 1, score: 88, verdict: 'PROCEED', vc: '#18B87A' },
    { init: 'RI', bg: '#E0384F', name: 'Rohan I.', role: 'Frontend Eng.', stage: 2, score: 89, verdict: 'PROCEED', vc: '#18B87A' },
]

const SCREENING_QUEUE = [
    {
        init: 'PS', bg: '#3470F0', name: 'Priya Sharma', meta: 'Sr. Backend Engineer · 6 yrs',
        bars: [
            { label: 'JD Match', pct: 92, color: '#C49A3C' },
            { label: 'Skills fit', pct: 95, color: '#3470F0' },
            { label: 'Confidence', pct: 87, color: '#18B87A' },
        ],
        verdict: 'PROCEED', vc: '#18B87A', vbg: 'rgba(24,184,122,.1)', vborder: 'rgba(24,184,122,.3)',
        reason: '6 yrs Go + Postgres · Kubernetes · Clear leadership signals',
    },
    {
        init: 'SK', bg: '#C49A3C', name: 'Sneha Kulkarni', meta: 'Product Designer · 4 yrs',
        bars: [
            { label: 'JD Match', pct: 88, color: '#C49A3C' },
            { label: 'Skills fit', pct: 84, color: '#3470F0' },
            { label: 'Confidence', pct: 91, color: '#18B87A' },
        ],
        verdict: 'PROCEED', vc: '#18B87A', vbg: 'rgba(24,184,122,.1)', vborder: 'rgba(24,184,122,.3)',
        reason: 'Figma + user research · SaaS portfolio · Design system exp.',
    },
    {
        init: 'RV', bg: '#8a33e0', name: 'Rahul Verma', meta: 'Backend Engineer · 4 yrs',
        bars: [
            { label: 'JD Match', pct: 71, color: '#C49A3C' },
            { label: 'Skills fit', pct: 68, color: '#3470F0' },
            { label: 'Confidence', pct: 74, color: '#F79009' },
        ],
        verdict: 'MAYBE', vc: '#F79009', vbg: 'rgba(247,144,9,.08)', vborder: 'rgba(247,144,9,.32)',
        reason: 'Node.js not in JD · Strong portfolio · Worth a quick call',
    },
]

const ACTIVITY_EVENTS = [
    { icon: '●', color: '#C49A3C', label: 'AI screening complete', sub: 'Priya S. · Score 92 · PROCEED', time: '0s ago' },
    { icon: '●', color: '#3470F0', label: 'Interview scheduled', sub: 'Sneha K. · Tomorrow 2 PM', time: '1m ago' },
    { icon: '●', color: '#18B87A', label: 'Offer stage reached', sub: 'Rohan I. · Sr. Frontend Eng.', time: '4m ago' },
    { icon: '₹', color: '#18B87A', label: 'Commission calculated', sub: 'TalentHub · ₹1,20,000 due', time: '6m ago' },
    { icon: '●', color: '#8a33e0', label: 'Magic link sent', sub: 'Rahul V. · Assessment link', time: '9m ago' },
    { icon: '✓', color: '#18B87A', label: 'Offer confirmed', sub: 'Ananya R. · CTC ₹28,00,000', time: '12m ago' },
]

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

/* Animated score bar */
function ScoreBar({ label, pct, color, active, delay = 0 }: {
    label: string; pct: number; color: string; active: boolean; delay?: number
}) {
    const [w, setW] = useState(0)
    useEffect(() => {
        if (!active) { setW(0); return }
        const t = setTimeout(() => setW(pct), 400 + delay)
        return () => clearTimeout(t)
    }, [active, pct, delay])

    return (
        <div style={{ marginBottom: 9 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,.45)' }}>{label}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color, transition: 'color .3s' }}>{pct}%</span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,.07)', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{
                    height: '100%', borderRadius: 100,
                    width: `${w}%`, background: color,
                    transition: 'width 1s cubic-bezier(.16,1,.3,1)',
                    boxShadow: `0 0 6px ${color}66`,
                }} />
            </div>
        </div>
    )
}

/* Typing text animation */
function TypingText({ text, active }: { text: string; active: boolean }) {
    const [displayed, setDisplayed] = useState('')
    const [done, setDone] = useState(false)
    useEffect(() => {
        if (!active) { setDisplayed(''); setDone(false); return }
        let i = 0
        setDisplayed('')
        setDone(false)
        const iv = setInterval(() => {
            i++
            setDisplayed(text.slice(0, i))
            if (i >= text.length) { clearInterval(iv); setDone(true) }
        }, 28)
        return () => clearInterval(iv)
    }, [active, text])

    return (
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,.65)', lineHeight: 1.55 }}>
            {displayed}
            {active && !done && (
                <span style={{ display: 'inline-block', width: 1.5, height: 11, background: '#C49A3C', marginLeft: 1, verticalAlign: 'middle', animation: 'heroPulse .8s ease-in-out infinite' }} />
            )}
        </span>
    )
}

/* ── Panel A: AI Screening ── */
function PanelScreening({ ready }: { ready: boolean }) {
    const [idx, setIdx] = useState(0)
    const [phase, setPhase] = useState<'entering' | 'scanning' | 'done'>('entering')
    const [fading, setFading] = useState(false)
    const c = SCREENING_QUEUE[idx]

    useEffect(() => {
        if (!ready) return
        // Phase timeline per candidate
        const t1 = setTimeout(() => setPhase('scanning'), 600)
        const t2 = setTimeout(() => setPhase('done'), 2200)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [ready, idx])

    useEffect(() => {
        if (!ready) return
        const iv = setInterval(() => {
            setFading(true)
            setPhase('entering')
            setTimeout(() => {
                setIdx(i => (i + 1) % SCREENING_QUEUE.length)
                setFading(false)
            }, 300)
        }, 5500)
        return () => clearInterval(iv)
    }, [ready])

    const scanning = phase === 'scanning' || phase === 'done'
    const done = phase === 'done'

    return (
        <div style={{
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(6px)' : 'none',
            transition: 'opacity .28s, transform .28s',
        }}>
            {/* Candidate header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 34, height: 34, borderRadius: 9,
                        background: c.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
                    }}>{c.init}</div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 1 }}>{c.name}</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.42)' }}>{c.meta}</div>
                    </div>
                </div>
                <div style={{
                    background: done ? c.vbg : 'rgba(255,255,255,.05)',
                    border: `1px solid ${done ? c.vborder : 'rgba(255,255,255,.1)'}`,
                    borderRadius: 7, padding: '4px 11px',
                    fontSize: 10, fontWeight: 800,
                    color: done ? c.vc : 'rgba(255,255,255,.3)',
                    letterSpacing: '1px',
                    transition: 'all .4s ease',
                }}>
                    {done ? c.verdict : '···'}
                </div>
            </div>

            {/* Bars */}
            {c.bars.map((b, i) => (
                <ScoreBar key={b.label + c.init} label={b.label} pct={b.pct} color={b.color} active={scanning} delay={i * 120} />
            ))}

            {/* AI reasoning — typing */}
            <div style={{
                marginTop: 12, padding: '9px 11px',
                background: 'rgba(196,154,60,.06)',
                border: '1px solid rgba(196,154,60,.14)',
                borderRadius: 8,
                minHeight: 50,
            }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.8, color: 'rgba(196,154,60,.6)', textTransform: 'uppercase', marginBottom: 5 }}>AI Reasoning</div>
                <TypingText text={c.reason} active={scanning} />
            </div>

            {/* Action row */}
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                <div style={{
                    flex: 1, padding: '7px 0', borderRadius: 7,
                    background: done ? 'rgba(24,184,122,.1)' : 'rgba(255,255,255,.03)',
                    border: `1px solid ${done ? 'rgba(24,184,122,.28)' : 'rgba(255,255,255,.07)'}`,
                    color: done ? '#18B87A' : 'rgba(255,255,255,.25)',
                    fontSize: 11, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    transition: 'all .45s ease',
                }}>
                    {done ? '✓' : ''} Accept verdict
                </div>
                <div style={{
                    flex: 1, padding: '7px 0', borderRadius: 7,
                    background: 'rgba(255,255,255,.03)',
                    border: '1px solid rgba(255,255,255,.07)',
                    color: 'rgba(255,255,255,.3)',
                    fontSize: 11, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    Override
                </div>
            </div>
        </div>
    )
}

/* ── Panel B: Pipeline Kanban ── */
const STAGES = ['Screened', 'Interview', 'Offer']
const STAGE_COLORS = ['rgba(52,112,240,.18)', 'rgba(196,154,60,.14)', 'rgba(24,184,122,.14)']
const STAGE_LABEL_COLORS = ['#3470F0', '#C49A3C', '#18B87A']

function PanelPipeline({ ready }: { ready: boolean }) {
    // Each candidate has a current stage index; we animate them forward
    const [positions, setPositions] = useState([0, 1, 0, 1, 2])
    const [highlight, setHighlight] = useState<number | null>(null)
    const [newCard, setNewCard] = useState(false)

    useEffect(() => {
        if (!ready) return
        const timings = [
            { idx: 2, toStage: 1, at: 2800 },   // Aarav advances (despite decline — showing movement)
            { idx: 0, toStage: 1, at: 4500 },   // Priya advances to interview
            { idx: 3, toStage: 2, at: 6200 },   // Sneha reaches offer
            { idx: 1, toStage: 2, at: 8000 },   // Rahul reaches offer
        ]
        const ts = timings.map(({ idx, toStage, at }) =>
            setTimeout(() => {
                setHighlight(idx)
                setTimeout(() => {
                    setPositions(p => p.map((s, i) => i === idx ? toStage : s))
                    setHighlight(null)
                }, 400)
            }, at)
        )
        // New card drops in
        const tnew = setTimeout(() => setNewCard(true), 3600)
        return () => { ts.forEach(clearTimeout); clearTimeout(tnew) }
    }, [ready])

    const grouped = STAGES.map((_, si) =>
        PIPELINE_CANDIDATES
            .map((c, i) => ({ ...c, origIdx: i }))
            .filter((_, i) => positions[i] === si)
    )

    return (
        <div style={{ display: 'flex', gap: 6, height: '100%' }}>
            {STAGES.map((stage, si) => (
                <div key={stage} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {/* Column header */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        marginBottom: 4,
                    }}>
                        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: STAGE_LABEL_COLORS[si] }}>
                            {stage}
                        </span>
                        <span style={{
                            fontSize: 9, fontWeight: 700,
                            background: STAGE_COLORS[si],
                            color: STAGE_LABEL_COLORS[si],
                            borderRadius: 4, padding: '1px 6px',
                        }}>
                            {grouped[si].length + (si === 0 && newCard ? 1 : 0)}
                        </span>
                    </div>

                    {/* Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {grouped[si].map(c => (
                            <div key={c.origIdx} style={{
                                padding: '7px 8px',
                                background: highlight === c.origIdx
                                    ? `${STAGE_COLORS[si]}`
                                    : 'rgba(255,255,255,.04)',
                                border: `1px solid ${highlight === c.origIdx ? STAGE_LABEL_COLORS[si] + '55' : 'rgba(255,255,255,.07)'}`,
                                borderRadius: 8,
                                transition: 'all .4s cubic-bezier(.34,1.56,.64,1)',
                                transform: highlight === c.origIdx ? 'scale(1.03)' : 'scale(1)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                    <div style={{ width: 18, height: 18, borderRadius: 5, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.init}</div>
                                    <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.82)' }}>{c.name}</span>
                                </div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)', marginBottom: 4 }}>{c.role}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: 9, fontWeight: 700, color: c.vc }}>{c.verdict}</span>
                                    <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,.5)' }}>{c.score}%</span>
                                </div>
                            </div>
                        ))}

                        {/* New card appearing in Screened */}
                        {si === 0 && (
                            <div style={{
                                padding: '7px 8px',
                                background: newCard ? 'rgba(52,112,240,.07)' : 'transparent',
                                border: `1px solid ${newCard ? 'rgba(52,112,240,.35)' : 'transparent'}`,
                                borderRadius: 8,
                                opacity: newCard ? 1 : 0,
                                transform: newCard ? 'translateY(0)' : 'translateY(-10px)',
                                transition: 'all .5s cubic-bezier(.16,1,.3,1)',
                                maxHeight: newCard ? 80 : 0,
                                overflow: 'hidden',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                    <div style={{ width: 18, height: 18, borderRadius: 5, background: '#E0384F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#fff', flexShrink: 0 }}>NK</div>
                                    <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.82)' }}>Nikhil K.</span>
                                </div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)', marginBottom: 4 }}>ML Engineer</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#3470F0', animation: 'heroPulse 1s ease-in-out infinite' }} />
                                    <span style={{ fontSize: 9, color: '#3470F0' }}>Scanning…</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

/* ── Panel C: Live Activity Feed ── */
function PanelFeed({ ready }: { ready: boolean }) {
    const [visible, setVisible] = useState(0)

    useEffect(() => {
        if (!ready) return
        // Stagger events appearing
        ACTIVITY_EVENTS.forEach((_, i) => {
            setTimeout(() => setVisible(v => Math.max(v, i + 1)), 300 + i * 700)
        })
    }, [ready])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {ACTIVITY_EVENTS.map((ev, i) => (
                <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: '7px 10px',
                    background: i === 0 ? 'rgba(196,154,60,.06)' : 'rgba(255,255,255,.025)',
                    border: `1px solid ${i === 0 ? 'rgba(196,154,60,.18)' : 'rgba(255,255,255,.05)'}`,
                    borderRadius: 8,
                    opacity: visible > i ? 1 : 0,
                    transform: visible > i ? 'translateY(0)' : 'translateY(-8px)',
                    transition: `opacity .4s ease, transform .4s ease`,
                }}>
                    {/* Icon */}
                    <div style={{
                        width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                        background: `${ev.color}18`,
                        border: `1px solid ${ev.color}33`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11,
                    }}>
                        {ev.icon}
                    </div>
                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,.82)', marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.label}</div>
                        <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,.38)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.sub}</div>
                    </div>
                    {/* Time */}
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,.25)', flexShrink: 0 }}>{ev.time}</span>
                    {/* Pulse for newest */}
                    {i === 0 && (
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: ev.color, flexShrink: 0, animation: 'heroPulse 2s ease-in-out infinite' }} />
                    )}
                </div>
            ))}
        </div>
    )
}

/* ─────────────────────────────────────────────
   ANIMATED CURSOR
───────────────────────────────────────────── */
function DashCursor({ x, y, visible: show, clicking }: {
    x: number; y: number; visible: boolean; clicking: boolean
}) {
    return (
        <div style={{
            position: 'absolute',
            left: x, top: y,
            pointerEvents: 'none',
            zIndex: 100,
            transition: 'left 0.7s cubic-bezier(.16,1,.3,1), top 0.7s cubic-bezier(.16,1,.3,1), opacity 0.3s ease',
            opacity: show ? 1 : 0,
            transform: `scale(${clicking ? 0.82 : 1})`,
            transformOrigin: 'top left',
            transitionProperty: 'left, top, opacity, transform',
            transitionDuration: clicking ? '0.1s, 0.1s, 0.3s, 0.1s' : '0.7s, 0.7s, 0.3s, 0.2s',
        }}>
            {/* click ripple */}
            {clicking && (
                <div style={{
                    position: 'absolute', top: -8, left: -8,
                    width: 24, height: 24, borderRadius: '50%',
                    border: '1.5px solid rgba(196,154,60,.8)',
                    animation: 'dashCursorRipple 0.5s ease-out forwards',
                    pointerEvents: 'none',
                }} />
            )}
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path d="M1 1L6 15L8.5 10L14 8L1 1Z" fill="white" stroke="rgba(0,0,0,.4)" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

/* ─────────────────────────────────────────────
   MAIN DASHBOARD SHELL
───────────────────────────────────────────── */
export function HeroDashboard({ ready }: { ready: boolean }) {
    const [tab, setTab] = useState<'pipeline' | 'activity'>('pipeline')
    const [cursorX, setCursorX] = useState(0)
    const [cursorY, setCursorY] = useState(0)
    const [cursorVisible, setCursorVisible] = useState(false)
    const [cursorClicking, setCursorClicking] = useState(false)
    const tabStripRef = useRef<HTMLDivElement>(null)
    const wrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ready) return
        let cancelled = false

        const runLoop = () => {
            if (cancelled) return
            // Start cursor off-screen bottom-right of the dashboard
            setCursorX(260)
            setCursorY(180)
            setCursorVisible(false)
            setCursorClicking(false)

            // After 3s: fade cursor in near pipeline tab
            const t1 = setTimeout(() => {
                if (cancelled) return
                setCursorVisible(true)
                setCursorX(180)
                setCursorY(62)
            }, 3000)

            // Move toward Activity tab
            const t2 = setTimeout(() => {
                if (cancelled) return
                // Activity tab is roughly right half of tab strip
                setCursorX(248)
                setCursorY(62)
            }, 3800)

            // Click!
            const t3 = setTimeout(() => {
                if (cancelled) return
                setCursorClicking(true)
            }, 4500)

            const t4 = setTimeout(() => {
                if (cancelled) return
                setCursorClicking(false)
                setTab('activity')
            }, 4650)

            // Fade out cursor
            const t5 = setTimeout(() => {
                if (cancelled) return
                setCursorVisible(false)
            }, 5400)

            // Switch back to pipeline after showing activity
            const t6 = setTimeout(() => {
                if (cancelled) return
                setTab('pipeline')
                runLoop()
            }, 9500)

            return () => {
                clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
                clearTimeout(t4); clearTimeout(t5); clearTimeout(t6)
            }
        }

        const cleanup = runLoop()
        return () => {
            cancelled = true
            cleanup?.()
        }
    }, [ready])

    return (
        <div ref={wrapRef} style={{
            background: 'var(--navy2)',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.03)',
            width: '100%',
            fontFamily: "'Geist', sans-serif",
            position: 'relative',
        }}>
            <DashCursor x={cursorX} y={cursorY} visible={cursorVisible} clicking={cursorClicking} />
            {/* ── Titlebar ── */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '11px 16px',
                borderBottom: '1px solid rgba(255,255,255,.06)',
                background: 'rgba(0,0,0,.2)',
            }}>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['#FF5F57', '#FFBD2E', '#28C840'].map(col => (
                        <div key={col} style={{ width: 9, height: 9, borderRadius: '50%', background: col }} />
                    ))}
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>HR Ops — Live Dashboard</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#18B87A', animation: 'heroPulse 2s ease-in-out infinite' }} />
                    <span style={{ fontSize: 10, color: '#18B87A', fontWeight: 600 }}>Live</span>
                </div>
            </div>

            {/* ── Stats strip ── */}
            <div style={{
                display: 'flex', borderBottom: '1px solid rgba(255,255,255,.05)',
                background: 'rgba(0,0,0,.1)',
            }}>
                {[
                    { label: 'Applications', value: '347', delta: '+12 today', dc: '#18B87A' },
                    { label: 'AI Screened', value: '341', delta: '98.3% auto', dc: '#C49A3C' },
                    { label: 'In Pipeline', value: '28', delta: '5 at offer', dc: '#3470F0' },
                ].map((s, i) => (
                    <div key={s.label} style={{
                        flex: 1, padding: '10px 14px',
                        borderRight: i < 2 ? '1px solid rgba(255,255,255,.05)' : 'none',
                    }}>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,.35)', marginBottom: 3, letterSpacing: .5 }}>{s.label}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: 2 }}>{s.value}</div>
                        <div style={{ fontSize: 9, color: s.dc, fontWeight: 600 }}>{s.delta}</div>
                    </div>
                ))}
            </div>

            {/* ── Two-column body ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', minHeight: 260 }}>

                {/* LEFT — AI Screening */}
                <div style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C49A3C', animation: 'heroPulse 1.5s ease-in-out infinite' }} />
                            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>AI Screening</span>
                        </div>
                        <span style={{ fontSize: 9, color: 'rgba(255,255,255,.25)', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 5, padding: '2px 7px' }}>6 queued</span>
                    </div>
                    <PanelScreening ready={ready} />
                </div>

                {/* Divider */}
                <div style={{ background: 'rgba(255,255,255,.05)' }} />

                {/* RIGHT — tab toggle: Pipeline / Activity */}
                <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column' }}>
                    {/* Tab switcher */}
                    <div style={{ display: 'flex', gap: 2, marginBottom: 12, background: 'rgba(255,255,255,.04)', borderRadius: 8, padding: 3 }}>
                        {(['pipeline', 'activity'] as const).map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                style={{
                                    flex: 1, padding: '5px 0', borderRadius: 6, border: 'none', cursor: 'pointer',
                                    fontFamily: "'Geist', sans-serif",
                                    fontSize: 10, fontWeight: 700, letterSpacing: .8, textTransform: 'capitalize',
                                    background: tab === t ? 'rgba(255,255,255,.09)' : 'transparent',
                                    color: tab === t ? '#fff' : 'rgba(255,255,255,.35)',
                                    transition: 'all .2s ease',
                                }}
                            >
                                {t === 'pipeline' ? 'Pipeline' : 'Activity'}
                            </button>
                        ))}
                    </div>

                    <div style={{ flex: 1 }}>
                        {tab === 'pipeline'
                            ? <PanelPipeline ready={ready} />
                            : <PanelFeed ready={ready} />
                        }
                    </div>
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 16px',
                borderTop: '1px solid rgba(255,255,255,.05)',
                background: 'rgba(0,0,0,.15)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {[
                        { label: 'NL Query', icon: '⌕', c: '#3470F0' },
                        { label: 'Pipeline Builder', icon: '◆', c: '#C49A3C' },
                        { label: 'Analytics', icon: '◎', c: '#18B87A' },
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', background: `${item.c}12`, border: `1px solid ${item.c}28`, borderRadius: 6 }}>
                            <span style={{ fontSize: 9 }}>{item.icon}</span>
                            <span style={{ fontSize: 9, fontWeight: 600, color: item.c }}>{item.label}</span>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#18B87A', animation: 'heroPulse 2s ease-in-out infinite' }} />
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,.3)' }}>All systems nominal</span>
                </div>
            </div>
            <style suppressHydrationWarning>{`
                @keyframes dashCursorRipple {
                    from { transform: scale(0.4); opacity: 1; }
                    to   { transform: scale(2.6); opacity: 0; }
                }
            `}</style>
        </div>
    )
}
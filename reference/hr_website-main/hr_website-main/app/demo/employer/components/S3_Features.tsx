'use client'

import { useState, useEffect, useRef } from 'react'

function useReveal(threshold = 0.08) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current; if (!el) return
        setVisible(false)
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, visible }
}

function Tick({ c = '#C49A3C' }: { c?: string }) {
    return (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" stroke={c}>
            <polyline points="1.5,4.5 3.5,6.5 7.5,2.5" />
        </svg>
    )
}

function DashBar({ title, badge, badgeColor = '#18B87A' }: { title: string; badge?: string; badgeColor?: string }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,.07)',
            background: 'rgba(0,0,0,.2)', flexShrink: 0
        }}>
            <div style={{ display: 'flex', gap: 6 }}>
                {['#FF5F57', '#FFBD2E', '#28C840'].map(c => (
                    <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                ))}
            </div>
            <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 500 }}>{title}</span>
            {badge ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: badgeColor }} />
                    <span style={{ fontSize: 10, color: badgeColor, fontWeight: 600 }}>{badge}</span>
                </div>
            ) : <div style={{ width: 46 }} />}
        </div>
    )
}

function Cursor({ x, y, label, visible: show }: { x: number; y: number; label?: string; visible: boolean }) {
    return (
        <div style={{
            position: 'absolute', left: x, top: y,
            transition: 'left 1.1s cubic-bezier(.4,0,.2,1), top 1.1s cubic-bezier(.4,0,.2,1), opacity .25s',
            pointerEvents: 'none', zIndex: 20, opacity: show ? 1 : 0,
        }}>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                <path d="M1 1l5 13 2.5-4.5L13 7z" fill="white" stroke="rgba(0,0,0,.5)" strokeWidth="1.2" />
            </svg>
            {label && (
                <div style={{
                    position: 'absolute', top: 16, left: 4,
                    background: 'rgba(11,22,40,.92)', border: '1px solid rgba(196,154,60,.5)',
                    borderRadius: 6, padding: '3px 8px',
                    fontSize: 9, fontWeight: 700, color: '#C49A3C', whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(0,0,0,.4)'
                }}>{label}</div>
            )}
        </div>
    )
}

const CAND = {
    init: 'PS', name: 'Priya Sharma', role: 'Sr. Backend Engineer',
    color: '#3470F0', verdict: 'PROCEED', vc: '#18B87A',
    vb: 'rgba(24,184,122,.13)', score: 92,
}
const QUEUE_OTHERS = [
    { init: 'RV', name: 'Rahul Verma', color: '#8a33e0', status: 'Waiting' },
    { init: 'AM', name: 'Aarav Menon', color: '#F79009', status: 'Waiting' },
    { init: 'SK', name: 'Sneha Kulkarni', color: '#18B87A', status: 'Waiting' },
]
const BARS = [
    { label: 'Experience', note: '6 yrs · exact req.', pct: 95, color: '#18B87A' },
    { label: 'Skills', note: 'Go, K8s, Postgres', pct: 88, color: '#3470F0' },
    { label: 'JD Match', note: 'Senior-level fit', pct: 92, color: '#C49A3C' },
]
const RS = [
    { label: 'EXPERIENCE', rows: ['Senior Eng · Razorpay · 6 yrs', 'Go · Postgres · Docker · K8s', 'Led 8-person infra team'], hi: true },
    { label: 'SKILLS', rows: ['Go · Postgres · Redis · gRPC', 'Kubernetes · AWS · Terraform'], hi: true },
    { label: 'EDUCATION', rows: ['B.Tech CS · BITS Pilani · 2018'], hi: false },
]

function AIScreeningDash({ playing }: { playing: boolean }) {
    const [phase, setPhase] = useState(0)
    const [barW, setBarW] = useState([0, 0, 0])
    const [cx, setCx] = useState(50); const [cy, setCy] = useState(80)
    const [showCursor, setShowCursor] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [showButtons, setShowButtons] = useState(false)

    useEffect(() => {
        if (!playing) {
            setPhase(0); setBarW([0, 0, 0]); setShowCursor(false)
            setShowToast(false); setShowButtons(false)
            setCx(50); setCy(80); return
        }
        const ts: ReturnType<typeof setTimeout>[] = []
        const run = () => {
            setPhase(0); setBarW([0, 0, 0]); setShowToast(false); setShowButtons(false)
            ts.push(setTimeout(() => { setShowCursor(true); setCx(50); setCy(80); setPhase(1) }, 300))
            ts.push(setTimeout(() => { setPhase(2); setCx(52); setCy(80) }, 700))
            ts.push(setTimeout(() => { setCx(240); setCy(70) }, 1100))
            ts.push(setTimeout(() => { setPhase(3); setShowCursor(false) }, 1500))
            ts.push(setTimeout(() => setPhase(4), 1800))
            ts.push(setTimeout(() => { setPhase(5); setBarW([95, 88, 92]) }, 3100))
            ts.push(setTimeout(() => setPhase(6), 4200))
            ts.push(setTimeout(() => setShowToast(true), 4800))
            ts.push(setTimeout(() => setShowButtons(true), 5000))
            ts.push(setTimeout(() => {
                setShowToast(false); setShowButtons(false)
                setPhase(0); setBarW([0, 0, 0]); setShowCursor(false)
                setTimeout(run, 600)
            }, 7500))
        }
        setTimeout(run, 200)
        return () => ts.forEach(clearTimeout)
    }, [playing])

    return (
        <div className="s3-dash" style={{ position: 'relative' }}>
            <DashBar title="AI Screening Engine" badge="Live" badgeColor="#18B87A" />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
                <div style={{ width: 118, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,.06)', padding: '10px 8px', background: 'rgba(0,0,0,.14)' }}>
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.4, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>Queue · 4</div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 7, padding: '7px 8px',
                        borderRadius: 8, marginBottom: 5,
                        background: phase >= 1 ? 'rgba(196,154,60,.1)' : 'rgba(255,255,255,.04)',
                        border: `1px solid ${phase >= 1 ? 'rgba(196,154,60,.4)' : 'rgba(255,255,255,.07)'}`,
                        opacity: phase === 2 ? 0.25 : 1,
                        transform: phase === 2 ? 'translateX(6px) scale(.96)' : 'none',
                        transition: 'all .3s ease',
                    }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: CAND.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{CAND.init}</div>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: phase >= 1 ? '#C49A3C' : 'var(--text2)', lineHeight: 1.2 }}>Priya S.</div>
                            <div style={{ fontSize: 8, color: 'var(--text3)' }}>{phase === 2 ? '↗ Dragging...' : phase >= 3 ? `${CAND.score}% · ${CAND.verdict}` : 'Up next'}</div>
                        </div>
                        {phase >= 6 && <div style={{ width: 7, height: 7, borderRadius: '50%', background: CAND.vc, flexShrink: 0, boxShadow: `0 0 5px ${CAND.vc}` }} />}
                    </div>
                    {QUEUE_OTHERS.map((c, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 8px', borderRadius: 8, marginBottom: 5, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#fff', flexShrink: 0, opacity: .7 }}>{c.init}</div>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', lineHeight: 1.2 }}>{c.name.split(' ')[0]}</div>
                                <div style={{ fontSize: 8, color: 'rgba(255,255,255,.2)' }}>Waiting</div>
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: 10, padding: '7px 8px', background: 'rgba(52,112,240,.07)', border: '1px solid rgba(52,112,240,.2)', borderRadius: 7 }}>
                        <div style={{ fontSize: 8, color: 'var(--text3)', marginBottom: 2 }}>Model</div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: '#3470F0' }}>Gemini 2.0 Flash</div>
                        <div style={{ fontSize: 8, color: 'var(--text3)', marginTop: 2 }}>BYOK · Auto-route</div>
                    </div>
                </div>
                <div style={{ width: 148, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,.06)', padding: '10px 9px', background: 'rgba(0,0,0,.07)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.4, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>Resume</div>
                    <div style={{
                        position: 'absolute', inset: '34px 8px 8px',
                        border: `1.5px dashed ${phase === 2 ? 'rgba(196,154,60,.7)' : 'rgba(255,255,255,.07)'}`,
                        borderRadius: 9, transition: 'border-color .3s',
                        display: phase >= 3 ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center',
                        pointerEvents: 'none',
                    }}>
                        <div style={{ textAlign: 'center', fontSize: 9, color: phase === 2 ? 'rgba(196,154,60,.8)' : 'rgba(255,255,255,.18)', fontWeight: phase === 2 ? 700 : 400, lineHeight: 1.5 }}>
                            {phase === 2 ? 'Release\nto scan' : 'Drop\nresume'}
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,.052)', border: '1px solid rgba(255,255,255,.11)',
                        borderRadius: 8, padding: '9px 9px',
                        opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'none' : 'translateY(10px) scale(.96)',
                        transition: 'opacity .4s, transform .4s', position: 'relative', overflow: 'hidden',
                    }}>
                        <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C49A3C,rgba(196,154,60,.5),transparent)', boxShadow: '0 0 14px rgba(196,154,60,.9)', top: phase === 4 ? '108%' : '-4px', transition: phase === 4 ? 'top 1.35s linear' : 'none', opacity: phase === 4 ? 1 : 0, zIndex: 4 }} />
                        <div style={{ fontSize: 10, fontWeight: 800, color: CAND.vc, marginBottom: 1 }}>{CAND.name}</div>
                        <div style={{ fontSize: 7.5, color: 'var(--text3)', marginBottom: 8 }}>{CAND.role} · Bangalore</div>
                        {RS.map((sec, si) => (
                            <div key={si} style={{ marginBottom: 8 }}>
                                <div style={{ fontSize: 7, fontWeight: 800, letterSpacing: '.9px', textTransform: 'uppercase', marginBottom: 3, color: phase >= 5 && sec.hi ? '#C49A3C' : 'rgba(255,255,255,.28)', transition: 'color .5s ease' }}>{sec.label}</div>
                                {sec.rows.map((row, ri) => (
                                    <div key={ri} style={{ fontSize: ri === 0 ? 8 : 7, color: phase >= 5 && sec.hi ? 'rgba(255,255,255,.65)' : 'rgba(255,255,255,.22)', lineHeight: 1.5, transition: `color .5s ease ${ri * 0.08}s`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 5, fontSize: 8, textAlign: 'center', fontWeight: 600, opacity: phase >= 3 ? 1 : 0, transition: 'opacity .3s', color: phase === 4 ? '#C49A3C' : phase >= 5 ? '#18B87A' : 'var(--text3)' }}>
                        {phase === 3 ? 'Received' : phase === 4 ? 'Scanning…' : phase >= 5 ? '✓ Parsed' : ''}
                    </div>
                </div>
                <div style={{ flex: 1, padding: '10px 11px', display: 'flex', flexDirection: 'column', gap: 0, minWidth: 0 }}>
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.4, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>AI Analysis</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, opacity: phase >= 5 ? 1 : 0, transition: 'opacity .4s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <div style={{ width: 26, height: 26, borderRadius: 8, background: CAND.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{CAND.init}</div>
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)' }}>{CAND.name}</div>
                                <div style={{ fontSize: 8, color: 'var(--text3)' }}>{CAND.role}</div>
                            </div>
                        </div>
                        <div style={{ background: phase >= 6 ? CAND.vb : 'transparent', border: `1px solid ${phase >= 6 ? CAND.vc + '55' : 'transparent'}`, borderRadius: 6, padding: '4px 10px', fontSize: 9, fontWeight: 800, color: phase >= 6 ? CAND.vc : 'transparent', letterSpacing: '1px', transform: phase >= 6 ? 'scale(1)' : 'scale(.75)', transition: 'all .5s cubic-bezier(.34,1.56,.64,1)' }}>{CAND.verdict}</div>
                    </div>
                    {BARS.map((b, i) => (
                        <div key={b.label} style={{ marginBottom: 10, opacity: phase >= 5 ? 1 : 0, transition: `opacity .4s ease ${i * 0.14}s` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                <span style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--text2)' }}>{b.label}</span>
                                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                    <span style={{ fontSize: 8, color: 'var(--text3)' }}>{b.note}</span>
                                    <span style={{ fontSize: 10, fontWeight: 800, color: b.color }}>{b.pct}%</span>
                                </div>
                            </div>
                            <div style={{ height: 4, background: 'rgba(255,255,255,.07)', borderRadius: 100, overflow: 'hidden' }}>
                                <div style={{ height: '100%', borderRadius: 100, background: b.color, width: `${barW[i]}%`, boxShadow: `0 0 8px ${b.color}66`, transition: `width 1s cubic-bezier(.16,1,.3,1) ${0.1 + i * 0.15}s` }} />
                            </div>
                        </div>
                    ))}
                    <div style={{ padding: '9px 11px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 9, flex: 1, opacity: phase >= 6 ? 1 : 0, transform: phase >= 6 ? 'none' : 'translateY(5px)', transition: 'opacity .4s ease .2s, transform .4s ease .2s' }}>
                        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.6, color: 'rgba(196,154,60,.65)', textTransform: 'uppercase', marginBottom: 5 }}>AI Reasoning</div>
                        <div style={{ fontSize: 10, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 10 }}>
                            6 yrs Go + Postgres — exact JD match. K8s confirmed. Strong leadership signals in team-lead history.
                        </div>
                        {showButtons && (
                            <div style={{ display: 'flex', gap: 7, animation: 'fadeUp .35s ease both' }}>
                                <button style={{ flex: 1, padding: '7px 0', borderRadius: 7, background: 'rgba(24,184,122,.12)', border: '1px solid rgba(24,184,122,.32)', color: '#18B87A', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: "'Geist',sans-serif" }}>✓ Accept</button>
                                <button style={{ flex: 1, padding: '7px 0', borderRadius: 7, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', color: 'var(--text3)', fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: "'Geist',sans-serif" }}>Override</button>
                            </div>
                        )}
                    </div>
                </div>
                <Cursor x={cx} y={cy} label={phase === 2 ? CAND.name : undefined} visible={showCursor} />
            </div>
            <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, background: 'rgba(8,20,40,.98)', border: '1px solid rgba(24,184,122,.45)', borderRadius: 10, padding: '10px 13px', boxShadow: '0 8px 32px rgba(0,0,0,.65), 0 0 20px rgba(24,184,122,.08)', transform: showToast ? 'translateY(0)' : 'translateY(64px)', opacity: showToast ? 1 : 0, transition: 'transform .5s cubic-bezier(.34,1.56,.64,1), opacity .3s ease', zIndex: 30, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(24,184,122,.15)', border: '1px solid rgba(24,184,122,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#18B87A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,6.5 5,9.5 11,3.5" /></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#18B87A', marginBottom: 2 }}>Screening complete — {CAND.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)' }}>Verdict: <span style={{ color: CAND.vc, fontWeight: 700 }}>{CAND.verdict}</span> · Score {CAND.score}% · Ready for HR review</div>
                </div>
                <div style={{ fontSize: 9, color: 'var(--text3)', flexShrink: 0, background: 'rgba(255,255,255,.05)', padding: '2px 7px', borderRadius: 5 }}>now</div>
            </div>
        </div>
    )
}
/* ══════════════════════════════════════════════
   PIPELINE BUILDER DASHBOARD — FIXED
   
   Key fixes vs original:
   • Nodes in a horizontal row (not overlapping diagonal)
   • NODE_W=108, NODE_GAP=40 → STRIDE=148px per node
   • 5 nodes total width: 700px — canvas scrolls horizontally  
   • Wires are correct horizontal beziers (x increases left→right)
   • Wire length = NODE_GAP (40px) — easy to animate with dashoffset
   • Sidebar: active = currently wiring, fades after placed (not instantly)
   • Banner clears the node row cleanly
   • HeadhunterNode shown as a special entry connected to AI Screen
   • No emojis — SVG icons throughout
══════════════════════════════════════════════ */

const PIPE_STAGES_NEW = [
    { id: 'portal', label: 'Public Portal', sub: 'Candidate intake', color: '#3470F0', count: 24 },
    { id: 'ai', label: 'AI Screen', sub: 'Auto-score CVs', color: '#C49A3C', count: 18 },
    { id: 'hr', label: 'HR Round', sub: 'Hiring manager', color: '#8a33e0', count: 7 },
    { id: 'technical', label: 'Technical', sub: 'Panel interview', color: '#3470F0', count: 4 },
    { id: 'offer', label: 'Offer', sub: 'CTC + agreement', color: '#18B87A', count: 2 },
]

// Candidates visible once pipeline is live
const PN_CANDIDATES = [
    { init: 'PS', name: 'Priya Sharma', stage: 1, color: '#3470F0' },  // AI Screen
    { init: 'RV', name: 'Rahul Verma', stage: 2, color: '#8a33e0' },  // HR Round
    { init: 'AM', name: 'Aarav Menon', stage: 3, color: '#3470F0' },  // Technical
]

// Recent activity feed items
const PN_EVENTS = [
    { icon: 'proceed', text: 'Priya Sharma → AI Screen', time: '2m ago', color: '#18B87A' },
    { icon: 'moved', text: 'Rahul Verma → HR Round', time: '14m ago', color: '#8a33e0' },
    { icon: 'added', text: 'TalentHub submitted 3 CVs', time: '1h ago', color: '#C49A3C' },
    { icon: 'offer', text: 'Sneha K. reached Offer', time: '2h ago', color: '#18B87A' },
]

// Static desktop constants (used as max values)
const PN_W_MAX = 108
const PN_H_MAX = 52
const PN_GAP_MAX = 40
const PN_STEP = 820

// Dynamic path builder — takes live dimensions
function pnPath(i: number, w: number, gap: number, cy: number): string {
    const stride = w + gap
    const x1 = i * stride + w
    const x2 = (i + 1) * stride
    const mx = (x1 + x2) / 2
    return `M ${x1} ${cy} C ${mx} ${cy} ${mx} ${cy} ${x2} ${cy}`
}

function pnRgb(c: string): string {
    return ({ '#3470F0': '52,112,240', '#C49A3C': '196,154,60', '#8a33e0': '138,51,224', '#18B87A': '24,184,122' } as Record<string, string>)[c] ?? '255,255,255'
}

function StageIcon({ id, size = 10, color }: { id: string; size?: number; color: string }) {
    const props = { width: size, height: size, viewBox: '0 0 12 12', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
    if (id === 'portal') return <svg {...props}><circle cx="6" cy="6" r="4.5" /><line x1="6" y1="1.5" x2="6" y2="10.5" /><path d="M1.5 6h9" /></svg>
    if (id === 'ai') return <svg {...props}><rect x="2" y="2" width="8" height="8" rx="1.5" /><path d="M4 5h4M4 7h2" /></svg>
    if (id === 'hr') return <svg {...props}><circle cx="6" cy="4.5" r="2" /><path d="M2 10.5c0-2.2 1.8-4 4-4s4 1.8 4 4" /></svg>
    if (id === 'technical') return <svg {...props}><path d="M4 2L2 6l2 4M8 2l2 4-2 4M5 9l2-6" /></svg>
    if (id === 'offer') return <svg {...props}><polyline points="2,6 5,9 10,3" /></svg>
    return null
}

function PipelineDash({ playing }: { playing: boolean }) {
    const [step, setStep] = useState<number>(-1)
    const [showBanner, setShowBanner] = useState(false)
    const [showCandidates, setShowCandidates] = useState(false)
    const [showFeed, setShowFeed] = useState(false)
    const [feedCount, setFeedCount] = useState(0)
    const canvasRef = useRef<HTMLDivElement>(null)
    const [canvasW, setCanvasW] = useState(500)
    const [isMobile, setIsMobile] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Measure canvas width, recompute on resize, detect mobile
    useEffect(() => {
        setMounted(true)
        const measure = () => {
            if (canvasRef.current) {
                const w = canvasRef.current.offsetWidth
                setCanvasW(w)
                setIsMobile(w < 600)
            }
        }
        measure()
        const ro = new ResizeObserver(measure)
        if (canvasRef.current) ro.observe(canvasRef.current)
        return () => ro.disconnect()
    }, [])

    // Compute node dimensions to fit all 5 nodes in available width
    // 5 nodes + 4 gaps = 5w + 4g, where g = 0.37w (wire proportion)
    // So: canvasW = 5w + 4*(0.37w) = 6.48w → w = canvasW/6.48
    const PN_W = Math.min(PN_W_MAX, Math.floor((canvasW - 16) / 6.48))
    const PN_GAP = Math.floor(PN_W * 0.37)
    const PN_H = Math.min(PN_H_MAX, Math.floor(PN_W * 0.48))
    const PN_STRIDE = PN_W + PN_GAP
    const PN_CY = PN_H / 2
    const PN_WLEN = PN_GAP

    useEffect(() => {
        if (!playing) {
            setStep(-1); setShowBanner(false)
            setShowCandidates(false); setShowFeed(false); setFeedCount(0)
            return
        }
        const ts: ReturnType<typeof setTimeout>[] = []
        ts.push(setTimeout(() => setStep(0), 400))
        ts.push(setTimeout(() => setStep(1), 400 + PN_STEP))
        ts.push(setTimeout(() => setStep(2), 400 + PN_STEP * 2))
        ts.push(setTimeout(() => setStep(3), 400 + PN_STEP * 3))
        ts.push(setTimeout(() => { setStep(4); setShowBanner(true) }, 400 + PN_STEP * 4))
        // After banner: show candidates flowing through stages
        ts.push(setTimeout(() => setShowCandidates(true), 400 + PN_STEP * 4 + 400))
        // Then feed items trickle in one by one
        ts.push(setTimeout(() => { setShowFeed(true); setFeedCount(1) }, 400 + PN_STEP * 4 + 900))
        ts.push(setTimeout(() => setFeedCount(2), 400 + PN_STEP * 4 + 1300))
        ts.push(setTimeout(() => setFeedCount(3), 400 + PN_STEP * 4 + 1700))
        ts.push(setTimeout(() => setFeedCount(4), 400 + PN_STEP * 4 + 2100))
        ts.push(setTimeout(() => {
            setStep(-1); setShowBanner(false)
            setShowCandidates(false); setShowFeed(false); setFeedCount(0)
        }, 400 + PN_STEP * 4 + 3200))
        return () => ts.forEach(clearTimeout)
    }, [playing])

    return (
        <div className="s3-dash">
            <DashBar title="Pipeline Builder" badge="No-code" badgeColor="#C49A3C" />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0, height: 0 }}>

                {/* ── Sidebar ── */}
                <div className="pipe-sidebar" style={{
                    width: 106, flexShrink: 0,
                    borderRight: '1px solid rgba(255,255,255,.06)',
                    padding: '10px 7px',
                    background: 'rgba(0,0,0,.14)',
                    flexDirection: 'column', overflow: 'hidden',
                }}>
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.4, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>
                        Stage Library
                    </div>

                    {PIPE_STAGES_NEW.map((s, i) => {
                        const isActive = step === i
                        // Only fade after the NEXT stage is being wired (not immediately)
                        const isDone = step > i + 1 || step === 4
                        return (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 7,
                                padding: '6px 7px', borderRadius: 7, marginBottom: 4,
                                background: isActive ? `rgba(${pnRgb(s.color)},.12)` : 'rgba(255,255,255,.035)',
                                border: `1px solid ${isActive ? s.color + '55' : 'rgba(255,255,255,.07)'}`,
                                opacity: isDone ? 0.35 : 1,
                                transition: 'all .4s ease',
                            }}>
                                {/* drag handle dots */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
                                    {[0, 1, 2].map(d => (
                                        <div key={d} style={{ width: 2.5, height: 2.5, borderRadius: 1, background: isActive ? s.color : 'rgba(255,255,255,.2)', transition: 'background .3s' }} />
                                    ))}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 9, fontWeight: 600, color: isActive ? s.color : isDone ? '#18B87A' : 'var(--text2)', lineHeight: 1.2, transition: 'color .3s' }}>
                                        {s.label}
                                    </div>
                                    <div style={{ fontSize: 7, color: 'var(--text3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.sub}</div>
                                </div>
                                {isDone && (
                                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#18B87A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                        <polyline points="1.5,4.5 3.5,6.5 7.5,2.5" />
                                    </svg>
                                )}
                            </div>
                        )
                    })}

                    {/* HeadhunterNode special entry */}
                    <div style={{
                        marginTop: 'auto', padding: '7px 8px',
                        background: 'rgba(196,154,60,.07)',
                        border: '1px solid rgba(196,154,60,.25)',
                        borderRadius: 7,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#C49A3C" strokeWidth="1.8" strokeLinecap="round">
                                <path d="M6 1v10M1 6h10" />
                            </svg>
                            <div style={{ fontSize: 8, fontWeight: 700, color: '#C49A3C' }}>HeadhunterNode</div>
                        </div>
                        <div style={{ fontSize: 7, color: 'var(--text3)', lineHeight: 1.4 }}>Agency portal · always active</div>
                    </div>
                </div>

                {/* ── Canvas ── */}
                <div ref={canvasRef} className="pipe-canvas" style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 0 0 10px' }}>
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.4, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 12, flexShrink: 0 }}>
                        Sr. Backend Eng · Pipeline
                    </div>

                    {/* ── MOBILE layout: static stage list only, no animated flow ── */}
                    {mounted && isMobile ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1, overflowY: 'auto', paddingRight: 8, paddingBottom: 8, scrollbarWidth: 'none' as const }}>
                            {PIPE_STAGES_NEW.map((s, i) => {
                                const isLast = i === PIPE_STAGES_NEW.length - 1
                                const col = s.color
                                return (
                                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        {/* Static node row */}
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: 10,
                                            width: '100%', padding: '8px 10px', borderRadius: 10,
                                            background: `rgba(${pnRgb(col)},.07)`,
                                            border: `1.5px solid ${col}28`,
                                        }}>
                                            <div style={{
                                                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                                                background: `rgba(${pnRgb(col)},.12)`,
                                                border: `1px solid ${col}33`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <StageIcon id={s.id} size={13} color={col} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{s.label}</div>
                                                <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 1 }}>{s.sub}</div>
                                            </div>
                                            <div style={{ fontSize: 9, fontWeight: 700, color: col, background: `rgba(${pnRgb(col)},.13)`, borderRadius: 4, padding: '2px 7px', flexShrink: 0 }}>{s.count}</div>
                                        </div>
                                        {/* Static vertical connector between nodes */}
                                        {!isLast && (
                                            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 23, height: 20, flexShrink: 0 }}>
                                                <div style={{ position: 'relative', width: 2, height: 20 }}>
                                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,.12)', borderRadius: 1 }} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        /* ── HORIZONTAL layout for desktop/tablet ── */
                        <div className="pipe-scroll" style={{ overflowX: 'auto', overflowY: 'hidden', flexShrink: 0, paddingBottom: 8, scrollbarWidth: 'none' }}>
                            <div className="pipe-node-row" style={{ position: 'relative', width: 5 * PN_W + 4 * PN_GAP + 8, height: PN_H, flexShrink: 0, minWidth: 0 }}>

                                {/* SVG wires layer */}
                                <svg style={{
                                    position: 'absolute', top: 0, left: 0,
                                    width: '100%', height: PN_H + 4,
                                    overflow: 'visible', pointerEvents: 'none', zIndex: 1,
                                }}>
                                    {[0, 1, 2, 3].map(i => {
                                        const wDone = step > i || step === 4
                                        const wActive = step === i
                                        const col = PIPE_STAGES_NEW[i].color
                                        const path = pnPath(i, PN_W, PN_GAP, PN_CY)
                                        return (
                                            <g key={i}>
                                                <path d={path} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" strokeDasharray="4 3" />
                                                {(wActive || wDone) && (
                                                    <path
                                                        key={`w${i}-${wActive ? 'a' : 'd'}`}
                                                        d={path} fill="none"
                                                        stroke={col} strokeWidth="2.5" strokeLinecap="round"
                                                        strokeDasharray={PN_WLEN + 4}
                                                        strokeDashoffset={wDone ? 0 : PN_WLEN + 4}
                                                        style={{
                                                            transition: wActive ? `stroke-dashoffset ${PN_STEP * 0.7}ms cubic-bezier(.25,.46,.45,.94)` : 'none',
                                                            filter: wActive ? `drop-shadow(0 0 4px ${col})` : `drop-shadow(0 0 2px ${col}66)`,
                                                        }}
                                                    />
                                                )}
                                                {(wActive || wDone) && (() => {
                                                    const x2 = (i + 1) * PN_STRIDE
                                                    return (
                                                        <polygon
                                                            points={`${x2 - 1},${PN_CY - 4} ${x2 + 5},${PN_CY} ${x2 - 1},${PN_CY + 4}`}
                                                            fill={wDone ? col : 'transparent'}
                                                            style={{ transition: 'fill .3s ease .1s' }}
                                                        />
                                                    )
                                                })()}
                                            </g>
                                        )
                                    })}
                                </svg>

                                {/* Node cards */}
                                {PIPE_STAGES_NEW.map((s, i) => {
                                    const isActive = step === i || (step === i + 1 && i > 0)
                                    const isDone = step > i + 1 || step === 4

                                    return (
                                        <div key={i} style={{
                                            position: 'absolute',
                                            left: i * PN_STRIDE,
                                            top: 0,
                                            width: PN_W, height: PN_H,
                                            background: (step >= i || step === 4)
                                                ? `rgba(${pnRgb(s.color)},.14)`
                                                : `rgba(${pnRgb(s.color)},.04)`,
                                            border: `1.5px solid ${(step >= i || step === 4) ? s.color + '60' : s.color + '20'}`,
                                            borderRadius: 10, padding: '8px 10px',
                                            transition: 'background .45s, border-color .45s, box-shadow .45s',
                                            boxShadow: isActive
                                                ? `0 0 20px ${s.color}55, 0 4px 14px rgba(0,0,0,.3)`
                                                : (step >= i || step === 4)
                                                    ? `0 2px 8px ${s.color}22`
                                                    : 'none',
                                            zIndex: isActive ? 5 : 1,
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                                <div style={{
                                                    width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                                                    background: (step >= i || step === 4) ? `rgba(${pnRgb(s.color)},.22)` : `rgba(${pnRgb(s.color)},.1)`,
                                                    border: `1px solid ${s.color}${(step >= i || step === 4) ? '55' : '22'}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    transition: 'all .3s',
                                                }}>
                                                    <StageIcon id={s.id} size={9} color={s.color} />
                                                </div>
                                                <div style={{ fontSize: 9.5, fontWeight: 700, color: (step >= i || step === 4) ? 'var(--text)' : 'var(--text3)', transition: 'color .3s', lineHeight: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {s.label}
                                                </div>
                                                <div style={{
                                                    marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                                                    background: (step === 4 || isDone) ? '#18B87A' : (step >= i) ? s.color : 'rgba(255,255,255,.15)',
                                                    opacity: (step >= i || step === 4) ? 1 : 0.3,
                                                    boxShadow: isActive ? `0 0 7px ${s.color}` : (step === 4 || isDone) ? '0 0 5px #18B87A' : 'none',
                                                    transition: 'all .4s',
                                                }} />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ fontSize: 7.5, color: (step >= i || step === 4) ? 'var(--text2)' : 'var(--text3)', lineHeight: 1.3, transition: 'color .3s' }}>
                                                    {s.sub}
                                                </div>
                                                {(step === 4) && (
                                                    <div style={{
                                                        fontSize: 8, fontWeight: 800, color: s.color,
                                                        background: `rgba(${pnRgb(s.color)},.15)`,
                                                        borderRadius: 4, padding: '1px 5px',
                                                        animation: 'fadeUp .4s ease both',
                                                    }}>{s.count}</div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Candidate avatar strip, banner, feed — desktop only */}
                    {mounted && !isMobile && <><div className="pipe-lower-section" style={{
                        marginTop: 10, marginRight: 10,
                        opacity: showCandidates ? 1 : 0,
                        transform: showCandidates ? 'none' : 'translateY(6px)',
                        transition: 'opacity .4s ease, transform .4s ease',
                    }}>
                        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.2, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 6 }}>
                            Active candidates
                        </div>
                        <div className="pipe-cand-strip" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {PN_CANDIDATES.map((c, i) => (
                                <div key={i} style={{
                                    flex: '1 1 80px', display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '6px 8px', borderRadius: 8,
                                    background: `rgba(${pnRgb(c.color)},.08)`,
                                    border: `1px solid ${c.color}30`,
                                    opacity: showCandidates ? 1 : 0,
                                    transition: `opacity .35s ease ${i * 0.1}s`,
                                }}>
                                    <div style={{
                                        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                                        background: c.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 7, fontWeight: 800, color: '#fff',
                                    }}>{c.init}</div>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontSize: 8.5, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {c.name.split(' ')[0]}
                                        </div>
                                        <div style={{ fontSize: 7, color: 'var(--text3)' }}>
                                            {PIPE_STAGES_NEW[c.stage].label}
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: PIPE_STAGES_NEW[c.stage].color, flexShrink: 0, boxShadow: `0 0 5px ${PIPE_STAGES_NEW[c.stage].color}` }} />
                                </div>
                            ))}
                        </div>
                    </div>

                        {/* Pipeline live banner */}
                        <div style={{
                            margin: '10px 10px 0 0',
                            padding: '8px 10px',
                            background: 'rgba(196,154,60,.06)',
                            border: '1px solid rgba(196,154,60,.22)',
                            borderRadius: 9,
                            opacity: showBanner ? 1 : 0,
                            transform: showBanner ? 'translateY(0)' : 'translateY(8px)',
                            transition: 'opacity .45s ease, transform .45s ease',
                            display: 'flex', alignItems: 'center', gap: 10,
                        }}>
                            <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, background: 'rgba(196,154,60,.15)', border: '1px solid rgba(196,154,60,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#C49A3C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 1v10M1 6h10" /></svg>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 10, fontWeight: 800, color: '#C49A3C', marginBottom: 2 }}>Pipeline live — 5 stages connected</div>
                                <div style={{ fontSize: 9, color: 'var(--text3)' }}>HeadhunterNode active · TalentHub submits → AI Screen</div>
                            </div>
                            <div style={{ fontSize: 9, fontWeight: 700, color: '#18B87A', background: 'rgba(24,184,122,.1)', border: '1px solid rgba(24,184,122,.25)', borderRadius: 5, padding: '2px 7px', flexShrink: 0 }}>Live</div>
                        </div>

                        {/* Activity feed — trickles in after banner */}
                        <div style={{
                            margin: '8px 10px 0 0',
                            opacity: showFeed ? 1 : 0,
                            transform: showFeed ? 'none' : 'translateY(6px)',
                            transition: 'opacity .4s ease, transform .4s ease',
                        }}>
                            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.2, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 6 }}>
                                Recent activity
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {PN_EVENTS.slice(0, feedCount).map((ev, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        padding: '5px 8px', borderRadius: 7,
                                        background: 'rgba(255,255,255,.03)',
                                        border: '1px solid rgba(255,255,255,.06)',
                                        animation: 'fadeUp .3s ease both',
                                    }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: ev.color, flexShrink: 0, boxShadow: `0 0 5px ${ev.color}88` }} />
                                        <span style={{ fontSize: 9.5, color: 'var(--text2)', flex: 1 }}>{ev.text}</span>
                                        <span style={{ fontSize: 8, color: 'var(--text3)', flexShrink: 0 }}>{ev.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}

function InterviewDash({ playing, loopProgress }: { playing: boolean; loopProgress: number }) {
    const [scores, setScores] = useState<number[][]>([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]])
    const [typing, setTyping] = useState(-1)
    const [showFlag, setShowFlag] = useState(false)
    const [showVerdict, setShowVerdict] = useState(false)

    const INTERVIEWERS = [
        { name: 'Nikhil R.', role: 'Eng Manager', color: '#3470F0', avatar: 'NR' },
        { name: 'Deepa S.', role: 'Tech Lead', color: '#8a33e0', avatar: 'DS' },
        { name: 'Arjun M.', role: 'HR Partner', color: '#C49A3C', avatar: 'AM' },
    ]
    const CRITERIA = ['Technical depth', 'Problem solving', 'Communication', 'Culture fit', 'Leadership']
    const FINAL_SCORES = [
        [4, 5, 4, 5, 4],
        [2, 4, 5, 4, 5],
        [4, 4, 5, 5, 4],
    ]

    useEffect(() => {
        if (!playing) {
            setScores([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]])
            setTyping(-1); setShowFlag(false); setShowVerdict(false); return
        }
        const ts: ReturnType<typeof setTimeout>[] = []
        let t = 300
        INTERVIEWERS.forEach((_, iv) => {
            ts.push(setTimeout(() => setTyping(iv), t)); t += 200
            CRITERIA.forEach((_, ci) => {
                ts.push(setTimeout(() => {
                    setScores(prev => {
                        const n = prev.map(r => [...r])
                        n[iv][ci] = FINAL_SCORES[iv][ci]
                        return n
                    })
                }, t))
                t += 340
            })
            ts.push(setTimeout(() => setTyping(-1), t)); t += 200
        })
        ts.push(setTimeout(() => setShowFlag(true), t)); t += 600
        ts.push(setTimeout(() => setShowVerdict(true), t))
        return () => ts.forEach(clearTimeout)
    }, [playing])

    const barColor = (s: number) => s >= 4 ? '#18B87A' : s === 3 ? '#C49A3C' : '#E0384F'
    const avgScore = (ci: number) => {
        const filled = scores.map(r => r[ci]).filter(s => s > 0)
        return filled.length ? filled.reduce((a, b) => a + b, 0) / filled.length : 0
    }

    return (
        <div className="s3-dash" style={{ position: 'relative' }}>
            <DashBar title="Structured Interviews" badge="Panel · Live" badgeColor="#3470F0" />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <div style={{ width: 120, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,.06)', padding: '10px 8px', background: 'rgba(0,0,0,.12)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.4, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 4 }}>Panel · 3</div>
                    {INTERVIEWERS.map((iv, i) => {
                        const isTyping = typing === i
                        const done = scores[i].every(s => s > 0)
                        const avg = scores[i].filter(s => s > 0).length ? (scores[i].reduce((a, b) => a + b, 0) / CRITERIA.length).toFixed(1) : null
                        return (
                            <div key={i} style={{ padding: '8px 8px', borderRadius: 9, background: isTyping ? `${iv.color}12` : done ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.03)', border: `1px solid ${isTyping ? iv.color + '45' : done ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.05)'}`, transition: 'all .3s' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                                    <div style={{ width: 26, height: 26, borderRadius: 8, background: iv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8.5, fontWeight: 800, color: '#fff', flexShrink: 0, position: 'relative' }}>
                                        {iv.avatar}
                                        {isTyping && <div style={{ position: 'absolute', bottom: -3, right: -3, width: 8, height: 8, borderRadius: '50%', background: iv.color, border: '2px solid var(--navy2)', animation: 'heroPulse 1s ease-in-out infinite' }} />}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 700, color: isTyping ? 'var(--text)' : 'var(--text2)', transition: 'color .2s' }}>{iv.name}</div>
                                        <div style={{ fontSize: 7.5, color: 'var(--text3)' }}>{iv.role}</div>
                                    </div>
                                </div>
                                {isTyping ? (
                                    <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 14 }}>
                                        {[0, 1, 2].map(d => <div key={d} style={{ width: 4, height: 4, borderRadius: '50%', background: iv.color, animation: `typingDot 1.2s ${d * 0.2}s ease-in-out infinite` }} />)}
                                        <span style={{ fontSize: 8, color: 'var(--text3)', marginLeft: 4 }}>scoring…</span>
                                    </div>
                                ) : avg ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: iv.color }}>{avg}</div>
                                        <div style={{ fontSize: 8, color: 'var(--text3)' }}>/ 5 avg</div>
                                        <div style={{ marginLeft: 'auto', fontSize: 8, color: '#18B87A' }}>✓ Done</div>
                                    </div>
                                ) : (
                                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,.2)' }}>Waiting…</div>
                                )}
                            </div>
                        )
                    })}
                </div>
                <div style={{ flex: 1, padding: '10px 11px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#3470F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#fff' }}>PS</div>
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)' }}>Priya Sharma</div>
                                <div style={{ fontSize: 8, color: 'var(--text3)' }}>Panel Round · {CRITERIA.length} criteria</div>
                            </div>
                        </div>
                        <div style={{ fontSize: 8, color: '#3470F0', background: 'rgba(52,112,240,.1)', border: '1px solid rgba(52,112,240,.22)', borderRadius: 100, padding: '3px 9px', fontWeight: 700 }}>Structured guide</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {CRITERIA.map((c, ci) => {
                            const avg = avgScore(ci)
                            const avgPct = (avg / 5) * 100
                            const isVariance = ci === 0 && showFlag
                            return (
                                <div key={ci}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span style={{ fontSize: 10, fontWeight: 600, color: isVariance ? '#F79009' : 'var(--text2)', transition: 'color .3s' }}>{c}</span>
                                            {isVariance && <span style={{ fontSize: 8, color: '#F79009', background: 'rgba(247,144,9,.1)', border: '1px solid rgba(247,144,9,.3)', padding: '1px 6px', borderRadius: 4, fontWeight: 700, animation: 'fadeUp .4s ease both' }}>Variance</span>}
                                        </div>
                                        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                                            {INTERVIEWERS.map((iv, ii) => {
                                                const s = scores[ii][ci]
                                                return s > 0 ? (
                                                    <div key={ii} style={{ width: 18, height: 18, borderRadius: 5, background: `${iv.color}22`, border: `1px solid ${iv.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8.5, fontWeight: 800, color: iv.color, transition: 'all .3s' }}>{s}</div>
                                                ) : <div key={ii} style={{ width: 18, height: 18, borderRadius: 5, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)' }} />
                                            })}
                                            {avg > 0 && <span style={{ fontSize: 10, fontWeight: 800, color: barColor(avg), minWidth: 24, textAlign: 'right' }}>{avg.toFixed(1)}</span>}
                                        </div>
                                    </div>
                                    <div style={{ height: 4, background: 'rgba(255,255,255,.07)', borderRadius: 100, overflow: 'hidden' }}>
                                        <div style={{ height: '100%', borderRadius: 100, background: isVariance ? '#F79009' : barColor(avg), width: `${avgPct}%`, transition: 'width .7s cubic-bezier(.16,1,.3,1), background .3s' }} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div style={{ marginTop: 10, padding: '9px 11px', background: showVerdict ? 'rgba(24,184,122,.07)' : 'rgba(255,255,255,.03)', border: `1px solid ${showVerdict ? 'rgba(24,184,122,.28)' : 'rgba(255,255,255,.06)'}`, borderRadius: 9, opacity: showVerdict ? 1 : 0.4, transform: showVerdict ? 'translateY(0)' : 'translateY(6px)', transition: 'all .5s cubic-bezier(.16,1,.3,1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: showVerdict ? '#18B87A' : 'var(--text3)' }}>Panel consensus</span>
                            <span style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 600, color: showVerdict ? '#18B87A' : 'var(--text3)' }}>{showVerdict ? '3.9 / 5' : '—'}</span>
                        </div>
                        <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 2 }}>
                            {showVerdict ? 'Strong hire · proceed to offer · resolve Technical variance first' : 'Collecting panel scores…'}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: 2, background: 'rgba(255,255,255,.06)', flexShrink: 0 }}>
                <div style={{ height: '100%', background: '#3470F0', width: `${loopProgress}%`, transition: loopProgress === 0 ? 'none' : 'width .1s linear' }} />
            </div>
            <style suppressHydrationWarning>{`
                @keyframes typingDot { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(-3px);opacity:1} }
                @keyframes fadeUp { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }
                @keyframes heroPulse { 0%,100%{opacity:1} 50%{opacity:.3} }
            `}</style>
        </div>
    )
}

function AnalyticsDash({ playing }: { playing: boolean }) {
    const [step, setStep] = useState(0)
    const [kpiVals, setKpiVals] = useState([0, 0, 0, 0])
    const [funnelW, setFunnelW] = useState([0, 0, 0, 0, 0])
    const [sourceH, setSourceH] = useState([0, 0, 0, 0])
    const [query, setQuery] = useState('')
    const [showInsight, setShowInsight] = useState(false)
    const fullQuery = 'Where are we losing candidates?'

    const FUNNEL = [
        { label: 'Applied', n: 347, color: '#3470F0' },
        { label: 'Screened', n: 89, color: '#3470F0' },
        { label: 'Round 1', n: 42, color: '#C49A3C' },
        { label: 'Panel', n: 18, color: '#C49A3C' },
        { label: 'Offered', n: 6, color: '#18B87A' },
    ]
    const SOURCES = [
        { label: 'LinkedIn', n: 148, color: '#3470F0' },
        { label: 'Referrals', n: 82, color: '#18B87A' },
        { label: 'Direct', n: 67, color: '#C49A3C' },
        { label: 'Job boards', n: 50, color: '#8a33e0' },
    ]
    const KPIS = [
        { label: 'Applications', val: 347, suffix: '', color: '#3470F0' },
        { label: 'Screened by AI', val: 89, suffix: '', color: '#C49A3C' },
        { label: 'Days to hire', val: 18, suffix: 'd', color: '#18B87A' },
        { label: 'AI accuracy', val: 91, suffix: '%', color: '#18B87A' },
    ]

    useEffect(() => {
        if (!playing) {
            setStep(0); setKpiVals([0, 0, 0, 0]); setFunnelW([0, 0, 0, 0, 0])
            setSourceH([0, 0, 0, 0]); setQuery(''); setShowInsight(false); return
        }
        const ts: ReturnType<typeof setTimeout>[] = []
        ts.push(setTimeout(() => { setStep(1); setFunnelW([100, 26, 12, 5, 1.7]) }, 300))
        ts.push(setTimeout(() => { setStep(2); setSourceH([100, 55, 45, 34]) }, 900))
        ts.push(setTimeout(() => { setStep(3); setKpiVals([347, 89, 18, 91]) }, 1500))
        let charIdx = 0
        ts.push(setTimeout(() => {
            setStep(4)
            const iv = setInterval(() => {
                charIdx++; setQuery(fullQuery.slice(0, charIdx))
                if (charIdx >= fullQuery.length) clearInterval(iv)
            }, 48)
        }, 2400))
        ts.push(setTimeout(() => { setStep(5); setShowInsight(true) }, 4000))
        return () => ts.forEach(clearTimeout)
    }, [playing])

    return (
        <div className="s3-dash">
            <DashBar title="Hiring Analytics" badge="Real-time" badgeColor="#18B87A" />
            <div className="ana-body" style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1, overflow: 'hidden' }}>
                <div className="ana-kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 7 }}>
                    {KPIS.map((k, i) => (
                        <div key={k.label} style={{ background: 'rgba(255,255,255,.035)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 8, padding: '7px 8px', opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? 'none' : 'translateY(5px)', transition: `opacity .4s ease ${i * 0.08}s, transform .4s ease ${i * 0.08}s` }}>
                            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 600, color: k.color, lineHeight: 1, marginBottom: 3 }}>{kpiVals[i]}{k.suffix}</div>
                            <div style={{ fontSize: 8, color: 'var(--text3)', fontWeight: 600, lineHeight: 1.3 }}>{k.label}</div>
                        </div>
                    ))}
                </div>
                <div className="ana-mid-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, flex: 1 }}>
                    <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 9, padding: '9px 10px' }}>
                        <div style={{ fontSize: 8, fontWeight: 700, color: 'var(--text3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Hiring Funnel</div>
                        {FUNNEL.map((f, i) => (
                            <div key={f.label} style={{ marginBottom: 7 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                    <span style={{ fontSize: 9, color: 'var(--text2)', fontWeight: 500 }}>{f.label}</span>
                                    <span style={{ fontSize: 9, fontWeight: 700, color: f.color }}>{f.n}</span>
                                </div>
                                <div style={{ height: 5, background: 'rgba(255,255,255,.06)', borderRadius: 99, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', borderRadius: 99, background: f.color, width: step >= 1 ? `${funnelW[i]}%` : '0%', boxShadow: `0 0 6px ${f.color}55`, transition: `width .9s cubic-bezier(.16,1,.3,1) ${i * 0.1}s` }} />
                                </div>
                                {i < FUNNEL.length - 1 && <div style={{ fontSize: 8, color: '#E0384F', marginTop: 2, opacity: step >= 1 ? 1 : 0, transition: 'opacity .5s ease .8s' }}>↓ {Math.round((1 - FUNNEL[i + 1].n / f.n) * 100)}% drop</div>}
                            </div>
                        ))}
                    </div>
                    <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 9, padding: '9px 10px' }}>
                        <div style={{ fontSize: 8, fontWeight: 700, color: 'var(--text3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Source Breakdown</div>
                        {SOURCES.map((s, i) => (
                            <div key={s.label} style={{ marginBottom: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                    <span style={{ fontSize: 9, color: 'var(--text2)', fontWeight: 500 }}>{s.label}</span>
                                    <span style={{ fontSize: 9, fontWeight: 700, color: s.color }}>{s.n}</span>
                                </div>
                                <div style={{ height: 5, background: 'rgba(255,255,255,.06)', borderRadius: 99, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', borderRadius: 99, background: s.color, width: step >= 2 ? `${sourceH[i]}%` : '0%', boxShadow: `0 0 6px ${s.color}55`, transition: `width .85s cubic-bezier(.16,1,.3,1) ${i * 0.12}s` }} />
                                </div>
                            </div>
                        ))}
                        <div style={{ marginTop: 4, padding: '5px 8px', background: 'rgba(24,184,122,.07)', border: '1px solid rgba(24,184,122,.2)', borderRadius: 7, opacity: step >= 2 ? 1 : 0, transition: 'opacity .5s ease .9s' }}>
                            <div style={{ fontSize: 8.5, color: '#18B87A', fontWeight: 600 }}>↑ Referrals hire 2.4× better</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ background: 'rgba(52,112,240,.08)', border: '1px solid rgba(52,112,240,.22)', borderRadius: 8, padding: '7px 10px', marginBottom: 6, opacity: step >= 4 ? 1 : 0.3, transition: 'opacity .4s', display: 'flex', alignItems: 'center', gap: 7 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(52,112,240,.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                        <span style={{ fontSize: 11, color: 'var(--text2)' }}>
                            {query || <span style={{ color: 'var(--text3)', fontStyle: 'italic' }}>Ask your hiring data…</span>}
                            {step === 4 && query.length < fullQuery.length && <span style={{ display: 'inline-block', width: 1, height: 11, background: '#C49A3C', marginLeft: 1, animation: 'blink .7s step-end infinite', verticalAlign: 'middle' }} />}
                        </span>
                    </div>
                    <div style={{ opacity: showInsight ? 1 : 0, transform: showInsight ? 'none' : 'translateY(4px)', transition: 'all .5s' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, padding: '8px 10px', background: 'rgba(24,184,122,.06)', border: '1px solid rgba(24,184,122,.2)', borderRadius: 8 }}>
                            <div style={{ width: 18, height: 18, borderRadius: 5, background: 'rgba(24,184,122,.15)', border: '1px solid rgba(24,184,122,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10 }}>✦</div>
                            <div>
                                <div style={{ fontSize: 10, color: '#18B87A', fontWeight: 700, marginBottom: 3 }}>Round 1 is your biggest drop — 53% fall-off</div>
                                <div style={{ fontSize: 9.5, color: 'var(--text3)', lineHeight: 1.5 }}>AI screening is passing too many candidates. Tighten JD match threshold from 60% → 75%. Estimated Round 1 drop → 28%.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LOOP_MS = 9000

const features = [
    {
        tag: 'AI Screening',
        title: 'Proceed / Maybe / Decline.',
        subtitle: 'A full briefing before you open a single resume.',
        accent: '#18B87A',
        bullets: [
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="5" /><polyline points="4,6 5.5,7.5 8,4.5" /></svg>, label: 'Scored before you arrive', desc: 'Recommendation + confidence score + written reasoning — every application, every time.' },
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v3l2 1" /><path d="M2.5 7.5A4.5 4.5 0 1 0 6 1.5" /><path d="M1 6l1.5 1.5L4 6" /></svg>, label: 'HR always overrides', desc: 'AI informs. You decide. Every override feeds the learning loop and sharpens future screens.' },
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="4" height="6" rx="1" /><rect x="7" y="1" width="4" height="10" rx="1" /></svg>, label: 'Multi-model routing', desc: 'Gemini, Groq, or OpenAI — fastest by default. Bring your own key per task type.' },
        ],
        basic: 'BYOK — bring your own OpenAI / Gemini key',
        pro: 'BYOK + FactWise proprietary screening models',
    },
    {
        tag: 'Pipeline Builder',
        title: 'Every role, its own pipeline.',
        subtitle: 'Configured in minutes. No code ever.',
        accent: '#C49A3C',
        bullets: [
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="1" width="4" height="4" rx="1" /><rect x="7" y="1" width="4" height="4" rx="1" /><rect x="1" y="7" width="4" height="4" rx="1" /><path d="M7 9h4M9 7v4" /></svg>, label: 'Node-based graph editor', desc: 'Drag stages from the library. Draw connections. Pan, zoom, snap-to-grid.' },
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2" /><path d="M6 1v2M6 9v2M1 6h2M9 6h2" /></svg>, label: 'HeadhunterNode built in', desc: 'Agencies submit candidates directly into any stage. Commission tracked automatically.' },
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6h8M7 3l3 3-3 3" /></svg>, label: 'Clone across roles', desc: 'Save any pipeline as a template. Reuse and diverge independently per role.' },
        ],
        basic: 'Full pipeline builder — any topology, any entry point',
        pro: 'Same pipeline builder + advanced conditional branching',
    },
    {
        tag: 'Structured Interviews',
        title: 'Every interviewer aligned.',
        subtitle: 'Every candidate evaluated the same way.',
        accent: '#3470F0',
        bullets: [
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4h10M1 8h6" /><rect x="1" y="1" width="10" height="10" rx="1.5" /></svg>, label: 'Guided scoring rubrics', desc: 'Every interviewer scores the same criteria in the same order. No blank feedback forms.' },
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 1v5M3 9.5a4 4 0 0 1 0-7M9 9.5a4 4 0 0 0 0-7" /></svg>, label: 'Panel variance flags', desc: 'When interviewers disagree significantly, a flag is raised before any decision is made.' },
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8.5V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4.5" /><path d="M1 8.5h10" /><path d="M5 11h2" /><path d="M6 8.5V7" /></svg>, label: 'Magic Link — no account needed', desc: 'Send assessments via a scoped link. Candidates submit without creating an account.' },
        ],
        basic: 'Structured interview forms with shared evaluation criteria',
        pro: 'Structured forms + advanced rubrics, panel comparison, and consolidated interview insights',
    },
    {
        tag: 'Hiring Analytics',
        title: 'See inside your hiring.',
        subtitle: 'Real-time metrics. Ask it anything.',
        accent: '#C49A3C',
        bullets: [
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="5" r="3.5" /><path d="M8 8l2.5 2.5" /></svg>, label: 'Natural language queries', desc: 'Type a question. Get a chart. No SQL, no BI tool, no waiting.' },
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 10l3-4 2.5 2 2.5-4L11 7" /></svg>, label: 'Funnel & bottleneck view', desc: 'See exactly where candidates drop off and how long each stage takes.' },
            { svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 1l1.5 3.1L11 4.6 8.5 7l.6 3.5L6 9 2.9 10.5 3.5 7 1 4.6l3.5-.5z" /></svg>, label: 'AI-generated insights', desc: "Proactive observations you didn't know to ask for — surfaced automatically." },
        ],
        basic: 'Core hiring metrics and pipeline performance insights',
        pro: 'Advanced analytics including panel variance, hiring funnel diagnostics, and AI-generated insights',
    },
]

export default function FeaturesSection() {
    const { ref, visible } = useReveal()
    const [active, setActive] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [loopProgress, setLoopProgress] = useState(0)
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        if (!visible) return
        setPlaying(false); setLoopProgress(0)
        const t = setTimeout(() => setPlaying(true), 300)
        return () => clearTimeout(t)
    }, [active, visible])

    useEffect(() => {
        if (!playing) { setLoopProgress(0); return }
        setLoopProgress(0)
        const start = Date.now()
        progressRef.current = setInterval(() => {
            const pct = Math.min(((Date.now() - start) / LOOP_MS) * 100, 100)
            setLoopProgress(pct)
            if (pct >= 100) {
                clearInterval(progressRef.current!)
                setTimeout(() => {
                    setPlaying(false)
                    setTimeout(() => { setLoopProgress(0); setPlaying(true) }, 150)
                }, 100)
            }
        }, 50)
        return () => { if (progressRef.current) clearInterval(progressRef.current) }
    }, [playing])

    const f = features[active]

    const dashboards = [
        <AIScreeningDash key="ai" playing={active === 0 && playing} />,
        <PipelineDash key="pipe" playing={active === 1 && playing} />,
        <InterviewDash key="int" playing={active === 2 && playing} loopProgress={active === 2 ? loopProgress : 0} />,
        <AnalyticsDash key="ana" playing={active === 3 && playing} />,
    ]

    return (
        <section style={{ background: 'var(--cream)' }}>
            <div className="wrap" style={{ paddingTop: 'clamp(40px,5vw,60px)', paddingBottom: 'clamp(40px,5vw,60px)' }}>
                <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: 'opacity .7s ease, transform .7s ease' }}>
                    <div style={{ maxWidth: 600, margin: '0 auto clamp(20px,3vw,36px)', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 18 }}>
                            <div style={{ width: 22, height: 1, background: 'var(--ink)' }} />
                            What you can do
                            <div style={{ width: 22, height: 1, background: 'var(--ink)' }} />
                        </div>
                        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px,3.5vw,50px)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-1.2px', color: 'var(--ink)', marginBottom: 16 }}>
                            Four pillars that make<br />
                            <em style={{ fontStyle: 'italic', color: '#C49A3C' }}>your hiring team unstoppable.</em>
                        </h2>
                        <p style={{ fontSize: 'clamp(14px,1.05vw,16px)', color: 'var(--ink3)', lineHeight: 1.75 }}>
                            All four ship on day one. Basic and Pro differ in depth — not in kind.
                        </p>
                    </div>

                    <div className="s3-tabs">
                        {features.map((feat, i) => (
                            <button key={i} onClick={() => { setActive(i); setPlaying(false) }} className={`s3-tab ${active === i ? 's3-tab-active' : ''}`}>
                                {feat.tag}
                                {active === i && <span className="s3-tab-progress" style={{ width: `${loopProgress}%` }} />}
                            </button>
                        ))}
                    </div>

                    <div className="s3-body">
                        <div className="s3-text-col">
                            <h3 className="s3-feature-title">{f.title}</h3>
                            <p className="s3-feature-subtitle" style={{ color: f.accent }}>{f.subtitle}</p>
                            <div className="s3-bullets">
                                {f.bullets.map((b, i) => (
                                    <div key={i} className="s3-bullet">
                                        <div className="s3-bullet-icon" style={{ color: f.accent, background: `${f.accent}12`, borderColor: `${f.accent}28` }}>{b.svg}</div>
                                        <div>
                                            <div className="s3-bullet-label">{b.label}</div>
                                            <div className="s3-bullet-desc">{b.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="s3-tiers">
                                {[{ tier: 'Basic', val: f.basic, gold: false }, { tier: 'Pro', val: f.pro, gold: true }].map(t => (
                                    <div key={t.tier} className={`s3-tier ${t.gold ? 's3-tier-pro' : ''}`}>
                                        <div className="s3-tier-dot"><Tick c={t.gold ? '#C49A3C' : '#3470F0'} /></div>
                                        <div>
                                            <span className="s3-tier-label">{t.tier}</span>
                                            <span className="s3-tier-val">{t.val}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="s3-dash-col">{dashboards[active]}</div>
                    </div>
                </div>
            </div>

            <style suppressHydrationWarning>{`
                .s3-tabs { display:flex; gap:8px; justify-content:center; flex-wrap:nowrap; overflow-x:auto; margin-bottom:44px; -webkit-overflow-scrolling:touch; scrollbar-width:none; padding-bottom:2px; }
                .s3-tabs::-webkit-scrollbar { display:none; }
                .s3-tab { display:inline-flex; align-items:center; gap:6px; padding:9px 18px; border-radius:100px; font-family:'Geist',sans-serif; font-size:13px; font-weight:600; cursor:pointer; transition:all .22s; border:1.5px solid rgba(12,24,40,.12); background:rgba(12,24,40,.04); color:var(--ink3); white-space:nowrap; position:relative; overflow:hidden; flex-shrink:0; }
                .s3-tab:hover { border-color:rgba(12,24,40,.22); color:var(--ink2); background:rgba(12,24,40,.08); }
                .s3-tab-active { border-color:rgba(196,154,60,.55)!important; background:rgba(196,154,60,.1)!important; color:#C49A3C!important; }
                .s3-tab-progress { position:absolute; bottom:0; left:0; height:2px; background:#C49A3C; border-radius:0 0 100px 100px; transition:width .1s linear; pointer-events:none; }
                .pipe-sidebar { display:flex; }
                .s3-body { display:grid; grid-template-columns:36fr 64fr; gap:clamp(24px,3.5vw,48px); align-items:stretch; }
                .s3-text-col { display:flex; flex-direction:column; }
                .s3-dash-col { display:flex; flex-direction:column; }
                .s3-dash { background:var(--navy2); border:1px solid rgba(255,255,255,.09); border-radius:16px; overflow:hidden; box-shadow:0 28px 70px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.04); display:flex; flex-direction:column; flex:1; min-height:420px; font-family:'Geist',sans-serif; }
                .s3-feature-title { font-family:'Fraunces',serif; font-size:clamp(20px,1.8vw,28px); font-weight:400; color:var(--ink); line-height:1.12; letter-spacing:-0.5px; margin-bottom:6px; }
                .s3-feature-subtitle { font-size:clamp(12.5px,.85vw,14px); font-weight:500; margin-bottom:18px; line-height:1.5; }
                .s3-bullets { display:flex; flex-direction:column; gap:0; margin-bottom:18px; flex:1; }
                .s3-bullet { display:flex; align-items:flex-start; gap:11px; padding:10px 0; border-bottom:1px solid rgba(12,24,40,.07); }
                .s3-bullet:last-child { border-bottom:none; }
                .s3-bullet-icon { width:26px; height:26px; border-radius:7px; flex-shrink:0; border:1px solid; display:flex; align-items:center; justify-content:center; transition:transform .25s cubic-bezier(.16,1,.3,1), opacity .2s; }
                .s3-bullet:hover .s3-bullet-icon { transform:scale(1.12); }
                .s3-bullet-label { font-size:clamp(12px,.82vw,13px); font-weight:700; color:var(--ink); line-height:1.3; margin-bottom:2px; }
                .s3-bullet-desc { font-size:clamp(11px,.74vw,12px); color:var(--ink3); line-height:1.55; font-weight:300; }
                .s3-tiers { display:flex; flex-direction:column; gap:7px; }
                .s3-tier { display:flex; align-items:center; gap:9px; padding:9px 13px; background:rgba(12,24,40,.03); border:1px solid rgba(12,24,40,.08); border-radius:9px; transition:background .2s, border-color .2s; }
                .s3-tier:hover { background:rgba(12,24,40,.06); border-color:rgba(12,24,40,.13); }
                .s3-tier-pro { background:rgba(196,154,60,.06); border-color:rgba(196,154,60,.22); }
                .s3-tier-pro:hover { background:rgba(196,154,60,.1); border-color:rgba(196,154,60,.35); }
                .s3-tier-dot { width:16px; height:16px; border-radius:50%; flex-shrink:0; background:rgba(52,112,240,.1); border:1px solid rgba(52,112,240,.28); display:flex; align-items:center; justify-content:center; }
                .s3-tier-pro .s3-tier-dot { background:rgba(196,154,60,.14); border-color:rgba(196,154,60,.38); }
                .s3-tier-label { font-size:9px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:var(--ink3); margin-right:7px; }
                .s3-tier-pro .s3-tier-label { color:rgba(196,154,60,.8); }
                .s3-tier-val { font-size:clamp(11px,.74vw,12px); color:var(--ink2); line-height:1.4; }
                @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
                @media (min-width:769px) and (max-width:1100px) {
                    .s3-body { gap:20px; grid-template-columns:38fr 62fr; }
                    .s3-dash { min-height:360px; }
                    .s3-tab { font-size:12px; padding:9px 16px; }
                }

                /* Analytics: hide funnel+source on small screens, show KPIs + NL only */
                @media (max-width:620px) {
                    .ana-mid-grid { display:none !important; }
                    .ana-kpi-grid { grid-template-columns:repeat(2,1fr) !important; }
                    .ana-body { gap:6px; }
                }

                /* Mobile <=768px */
                @media (max-width:768px) {
                    .s3-body { grid-template-columns:1fr; gap:20px; }
                    .s3-dash-col { order:-1; }
                    .s3-dash { min-height:420px; }
                    /* Tabs: wrap to 2 rows — first 3 on row 1, last on row 2 centered */
                    .s3-tabs { justify-content:flex-start; margin-bottom:24px; flex-wrap:wrap; overflow-x:visible; }
                    .s3-tab { font-size:12px; padding:8px 16px; }
                    .s3-tab:last-child { width:auto; flex-basis:auto; flex-grow:0; }
                    .s3-feature-title { font-size:clamp(18px,5.5vw,24px); }
                    .s3-bullet { padding:8px 0; }
                    .s3-tier { padding:8px 11px; }
                    /* Pipeline: hide sidebar on mobile */
                    .pipe-sidebar { display:none !important; }
                    .pipe-canvas { padding:8px 8px 0 8px; }
                    .s3-dash { min-height:440px; }
                    /* Candidate strip: 2-col grid */
                    .pipe-cand-strip { display:grid !important; grid-template-columns:1fr 1fr; gap:5px; }
                }

                /* Small mobile <=480px */
                @media (max-width:480px) {
                    .s3-tab { font-size:10px; padding:7px 12px; }
                    /* Pipeline: give full width to nodes */
                    .pipe-canvas { padding:8px 8px 0 8px; }
                    .pipe-scroll { scrollbar-width:none; -webkit-overflow-scrolling:touch; }
                    .pipe-scroll::-webkit-scrollbar { display:none; }
                    /* Candidate strip: single col */
                    .pipe-cand-strip { grid-template-columns:1fr !important; }
                    /* Lower section (candidates+feed) compresses */
                    .pipe-lower-section { margin-top:4px; }
                    .s3-tiers { gap:5px; }
                    .s3-bullet-icon { width:22px; height:22px; }
                    /* Let dashboard grow for vertical pipeline — no fixed min height */
                    .s3-dash { min-height:360px; }
                    /* Last tab: narrower on very small screens */
                    .s3-tab:last-child { justify-content:flex-start; }
                }

                /* Very small <=360px */
                @media (max-width:360px) {
                    .s3-tab { font-size:10px; padding:6px 10px; }
                    .s3-feature-title { font-size:18px; }
                }
            `}</style>
        </section>
    )
}
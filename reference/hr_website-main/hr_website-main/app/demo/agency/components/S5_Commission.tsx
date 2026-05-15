'use client'

import { useState, useEffect, useRef } from 'react'

function useReveal(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
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

/* ── Animated cursor ── */
function CommCursor({ x, y, visible: show, ring }: { x: number; y: number; visible: boolean; ring?: boolean }) {
    return (
        <div style={{
            position: 'absolute', left: x, top: y,
            pointerEvents: 'none', zIndex: 50,
            transform: 'translate(-2px,-1px)',
            transition: 'left .5s cubic-bezier(.16,1,.3,1), top .5s cubic-bezier(.16,1,.3,1), opacity .2s',
            opacity: show ? 1 : 0,
        }}>
            {ring && (
                <div style={{
                    position: 'absolute', top: -12, left: -12,
                    width: 28, height: 28, borderRadius: '50%',
                    border: '2px solid #C49A3C',
                    animation: 'ccRipple .5s ease-out forwards',
                    pointerEvents: 'none',
                }} />
            )}
            <svg width="15" height="19" viewBox="0 0 18 21" fill="none">
                <path d="M3 2L16 10.5L9 12L6.5 20L3 2Z" fill="white" stroke="#080f1e" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

/* ═══════════════════════════════════════════
   PANEL A — AGREEMENT ON FILE
═══════════════════════════════════════════ */
function PanelAgreement() {
    const [highlightRow, setHighlightRow] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const [cx, setCx] = useState(40)
    const [cy, setCy] = useState(60)
    const [curVis, setCurVis] = useState(false)

    useEffect(() => {
        const ts: ReturnType<typeof setTimeout>[] = []
        ts.push(setTimeout(() => { setCurVis(true); setCx(40); setCy(60) }, 300))
        ts.push(setTimeout(() => { setCx(200); setCy(188) }, 700))
        ts.push(setTimeout(() => setHighlightRow(true), 1200))
        ts.push(setTimeout(() => setShowTooltip(true), 1500))
        ts.push(setTimeout(() => setCurVis(false), 2800))
        return () => ts.forEach(clearTimeout)
    }, [])

    const rows = [
        { l: 'Agreement type', v: 'Percentage of CTC', hi: false, green: false },
        { l: 'Junior (0–3 yrs)', v: '6%', hi: false, green: false },
        { l: 'Mid (3–6 yrs)', v: '8%  ← active', hi: true, green: false },
        { l: 'Senior (6+ yrs)', v: '10%', hi: false, green: false },
        { l: 'Replacement guarantee', v: '60 days', hi: false, green: false },
        { l: 'First-submission lock', v: 'ON ✓', hi: false, green: true },
    ]

    return (
        <div style={{ position: 'relative', padding: '16px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 10 }}>
                Agreement — TechCorp Pvt. Ltd.
            </div>
            {rows.map((r, i) => (
                <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '7px 10px', marginBottom: 4, borderRadius: 7,
                    background: r.hi && highlightRow ? 'rgba(196,154,60,.08)' : 'rgba(255,255,255,.03)',
                    border: `1px solid ${r.hi && highlightRow ? 'rgba(196,154,60,.28)' : 'rgba(255,255,255,.06)'}`,
                    transition: 'all .4s ease',
                    position: 'relative',
                }}>
                    <span style={{ fontSize: 10.5, color: 'var(--text3)' }}>{r.l}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: r.hi ? 'var(--gold)' : r.green ? '#18B87A' : 'var(--text2)' }}>{r.v}</span>
                    {/* Tooltip on last row */}
                    {i === 5 && showTooltip && (
                        <div style={{
                            position: 'absolute', bottom: '110%', right: 0,
                            background: 'rgba(8,18,36,.96)', border: '1px solid rgba(196,154,60,.3)',
                            borderRadius: 8, padding: '7px 10px', whiteSpace: 'nowrap',
                            fontSize: 9.5, color: 'var(--text2)', lineHeight: 1.5,
                            boxShadow: '0 8px 24px rgba(0,0,0,.5)',
                            animation: 'ccFadeUp .3s ease both',
                            zIndex: 10,
                        }}>
                            <div style={{ fontWeight: 700, color: 'var(--gold)', marginBottom: 2 }}>First-submission lock</div>
                            Timestamp recorded at first CV submit.<br />Locks commission ownership permanently.
                            <div style={{ position: 'absolute', bottom: -5, right: 12, width: 8, height: 8, background: 'rgba(8,18,36,.96)', border: '1px solid rgba(196,154,60,.3)', borderTop: 'none', borderLeft: 'none', transform: 'rotate(45deg)' }} />
                        </div>
                    )}
                </div>
            ))}
            <div style={{ marginTop: 10, padding: '7px 10px', background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)', borderRadius: 7, fontSize: 9.5, color: 'var(--text3)', fontStyle: 'italic' }}>
                Created 14 Oct 2024 · Signed by both parties
            </div>
            <CommCursor x={cx} y={cy} visible={curVis} />
        </div>
    )
}

/* ═══════════════════════════════════════════
   PANEL B — CTC CONFIRMATION + CALC
═══════════════════════════════════════════ */
function PanelConfirm() {
    const [ctcTyped, setCtcTyped] = useState('')
    const [showCalc, setShowCalc] = useState(false)
    const [empConfirmed, setEmpConfirmed] = useState(false)
    const [agencyConfirmed, setAgencyConfirmed] = useState(false)
    const [timerW, setTimerW] = useState(0)
    const [cx, setCx] = useState(60)
    const [cy, setCy] = useState(80)
    const [curVis, setCurVis] = useState(false)
    const [ring, setRing] = useState(false)
    const fullCTC = '₹28,00,000'

    useEffect(() => {
        const ts: ReturnType<typeof setTimeout>[] = []
        ts.push(setTimeout(() => { setCurVis(true); setCx(60); setCy(80) }, 200))
        ts.push(setTimeout(() => { setCx(180); setCy(105) }, 500))
        ts.push(setTimeout(() => {
            let i = 0
            const iv = setInterval(() => {
                i++; setCtcTyped(fullCTC.slice(0, i))
                if (i >= fullCTC.length) clearInterval(iv)
            }, 60)
        }, 800))
        const afterType = 800 + fullCTC.length * 60
        ts.push(setTimeout(() => setShowCalc(true), afterType + 200))
        ts.push(setTimeout(() => { setCx(110); setCy(230); setRing(true) }, afterType + 700))
        ts.push(setTimeout(() => { setRing(false); setEmpConfirmed(true) }, afterType + 750))
        ts.push(setTimeout(() => { setCx(260); setCy(230) }, afterType + 1100))
        ts.push(setTimeout(() => setRing(true), afterType + 1550))
        ts.push(setTimeout(() => { setRing(false); setAgencyConfirmed(true) }, afterType + 1600))
        ts.push(setTimeout(() => { setCurVis(false); setTimerW(100) }, afterType + 1900))
        return () => ts.forEach(clearTimeout)
    }, [])

    return (
        <div style={{ position: 'relative', padding: '16px' }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
                Priya Sharma → TechCorp · Offer Stage
            </div>

            {/* CTC input */}
            <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 9, marginBottom: 10 }}>
                <div style={{ fontSize: 9, color: 'var(--text3)', marginBottom: 5 }}>CTC entered by employer</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, color: 'var(--gold)', lineHeight: 1 }}>
                    {ctcTyped || <span style={{ color: 'rgba(255,255,255,.15)', fontSize: 14 }}>Waiting for employer…</span>}
                    {ctcTyped && ctcTyped.length < fullCTC.length && (
                        <span style={{ display: 'inline-block', width: 2, height: 18, background: 'var(--gold)', verticalAlign: 'middle', marginLeft: 1, animation: 'ccBlink .7s step-end infinite' }} />
                    )}
                </div>
            </div>

            {/* Calc rows */}
            {showCalc && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10, animation: 'ccFadeUp .4s ease both' }}>
                    {[
                        { l: 'Seniority detected', v: 'Mid (6 yrs) → 8% rate', c: 'var(--gold)' },
                        { l: 'Commission preview', v: '₹28,00,000 × 8% = ₹2,24,000', c: '#18B87A' },
                    ].map(r => (
                        <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 7 }}>
                            <span style={{ fontSize: 10, color: 'var(--text3)' }}>{r.l}</span>
                            <span style={{ fontSize: 10, fontWeight: 700, color: r.c }}>{r.v}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Confirm buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                {[
                    { l: 'Employer', sub: 'TechCorp HR', done: empConfirmed, c: '#3470F0', rgb: '52,112,240' },
                    { l: 'Agency', sub: 'Your firm', done: agencyConfirmed, c: '#C49A3C', rgb: '196,154,60' },
                ].map(p => (
                    <div key={p.l} style={{
                        padding: '9px 10px', borderRadius: 9, textAlign: 'center',
                        background: p.done ? `rgba(${p.rgb},.1)` : 'rgba(255,255,255,.03)',
                        border: `1.5px solid ${p.done ? p.c + '55' : 'rgba(255,255,255,.09)'}`,
                        transition: 'all .4s cubic-bezier(.34,1.56,.64,1)',
                        boxShadow: p.done ? `0 0 14px rgba(${p.rgb},.2)` : 'none',
                    }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: p.done ? p.c : 'var(--text3)', transition: 'color .35s' }}>
                            {p.done ? '✓  Confirmed' : 'Awaiting…'}
                        </div>
                        <div style={{ fontSize: 9, color: 'var(--text3)' }}>{p.l} · {p.sub}</div>
                    </div>
                ))}
            </div>

            {/* 48h timer */}
            <div style={{ padding: '8px 11px', borderRadius: 8, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 9, color: 'var(--text3)' }}>48h auto-lock — no dispute window</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: timerW >= 100 ? '#18B87A' : 'var(--gold)', transition: 'color .4s' }}>
                        {timerW >= 100 ? 'Locked' : 'Confirming…'}
                    </span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,.07)', borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 100, background: timerW >= 100 ? '#18B87A' : 'var(--gold)', width: `${timerW}%`, transition: 'width 1.6s ease, background .5s' }} />
                </div>
            </div>
            <CommCursor x={cx} y={cy} visible={curVis} ring={ring} />
        </div>
    )
}

/* ═══════════════════════════════════════════
   PANEL C — IMMUTABLE RECORD
═══════════════════════════════════════════ */
function PanelLocked() {
    const [lockAnim, setLockAnim] = useState(false)
    const [rowsIn, setRowsIn] = useState(false)
    const [cx, setCx] = useState(180)
    const [cy, setCy] = useState(80)
    const [curVis, setCurVis] = useState(false)
    const [ring, setRing] = useState(false)

    useEffect(() => {
        const ts: ReturnType<typeof setTimeout>[] = []
        ts.push(setTimeout(() => { setCurVis(true); setCx(180); setCy(80) }, 200))
        ts.push(setTimeout(() => { setCx(180); setCy(130); setRing(true) }, 600))
        ts.push(setTimeout(() => { setRing(false); setLockAnim(true) }, 650))
        ts.push(setTimeout(() => setRowsIn(true), 1100))
        ts.push(setTimeout(() => setCurVis(false), 1600))
        return () => ts.forEach(clearTimeout)
    }, [])

    return (
        <div style={{ position: 'relative', padding: '16px' }}>
            {/* Lock card */}
            <div style={{
                padding: '16px', marginBottom: 12,
                background: lockAnim ? 'rgba(24,184,122,.07)' : 'rgba(255,255,255,.03)',
                border: `1.5px solid ${lockAnim ? 'rgba(24,184,122,.4)' : 'rgba(255,255,255,.1)'}`,
                borderRadius: 11, textAlign: 'center',
                transition: 'all .55s cubic-bezier(.34,1.56,.64,1)',
                boxShadow: lockAnim ? '0 0 24px rgba(24,184,122,.12)' : 'none',
            }}>
                <div style={{
                    fontSize: 28, marginBottom: 6,
                    display: 'inline-block',
                    transform: lockAnim ? 'scale(1.15) rotate(-8deg)' : 'none',
                    transition: 'transform .5s cubic-bezier(.34,1.56,.64,1)',
                }}>🔒</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#18B87A', marginBottom: 4 }}>LOCKED — IMMUTABLE</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 26, color: 'var(--gold)', lineHeight: 1, marginBottom: 4 }}>₹2,24,000</div>
                <div style={{ fontSize: 9.5, color: 'var(--text3)' }}>Commission record #CR-2024-0091</div>
            </div>

            {/* Timestamp rows */}
            {rowsIn && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, animation: 'ccFadeUp .4s ease both' }}>
                    {[
                        { l: 'First submission', v: '14 Nov 2024, 09:32 AM ✓', c: '#18B87A' },
                        { l: 'Offer confirmed', v: '18 Dec 2024, 02:15 PM ✓', c: '#18B87A' },
                        { l: 'Record created', v: '18 Dec 2024, 02:15 PM', c: 'var(--text2)' },
                    ].map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 7 }}>
                            <span style={{ fontSize: 10, color: 'var(--text3)' }}>{r.l}</span>
                            <span style={{ fontSize: 10, fontWeight: 600, color: r.c }}>{r.v}</span>
                        </div>
                    ))}
                    <div style={{ fontSize: 9.5, color: 'var(--text3)', fontStyle: 'italic', textAlign: 'center', marginTop: 4 }}>
                        This record cannot be edited or deleted.
                    </div>
                </div>
            )}
            <CommCursor x={cx} y={cy} visible={curVis} ring={ring} />
        </div>
    )
}

/* ═══════════════════════════════════════════
   DASHBOARD SHELL
═══════════════════════════════════════════ */
function CommissionDashboard({ activeStep }: { activeStep: number }) {
    const panelKey = `panel-${activeStep}`
    const stepLabels = ['Agreement', 'Confirm', 'Locked']
    const panels = [
        <PanelAgreement key={panelKey} />,
        <PanelConfirm key={panelKey} />,
        <PanelLocked key={panelKey} />,
    ]

    return (
        <div style={{
            background: 'var(--navy2)',
            border: '1px solid rgba(255,255,255,.09)',
            borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.04)',
        }}>
            {/* Titlebar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,.07)', background: 'rgba(0,0,0,.22)' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['#FF5F57', '#FFBD2E', '#28C840'].map(c => (
                        <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                    ))}
                </div>
                <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 500 }}>Commission Engine</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#18B87A', boxShadow: '0 0 5px #18B87A', animation: 'ccPulse 2s ease-in-out infinite' }} />
                    <span style={{ fontSize: 10, color: '#18B87A', fontWeight: 600 }}>Active</span>
                </div>
            </div>

            {/* Candidate strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(196,154,60,.04)' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'rgba(196,154,60,.2)', border: '1.5px solid rgba(196,154,60,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: 'var(--gold)' }}>PS</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Priya Sharma</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)' }}>Sr. Backend Engineer · reached Offer stage</div>
                </div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.8px', color: 'var(--gold)', background: 'rgba(196,154,60,.12)', border: '1px solid rgba(196,154,60,.3)', borderRadius: 6, padding: '3px 9px', flexShrink: 0 }}>OFFER</div>
            </div>

            {/* Step bar */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                {stepLabels.map((l, i) => {
                    const done = i < activeStep; const active = i === activeStep
                    return (
                        <div key={l} style={{ flex: 1, padding: '7px 4px', textAlign: 'center', background: active ? 'rgba(196,154,60,.06)' : 'transparent', borderRight: i < 2 ? '1px solid rgba(255,255,255,.05)' : 'none', transition: 'background .3s' }}>
                            <span style={{ fontSize: active ? 10 : 9, fontWeight: active ? 700 : 400, color: active ? 'var(--gold)' : done ? '#18B87A' : 'var(--text3)', transition: 'all .3s' }}>
                                {done ? `✓ ${l}` : l}
                            </span>
                        </div>
                    )
                })}
            </div>

            {/* Panel */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 260 }}>
                {panels[activeStep]}
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════ */
export default function S5_Commission() {
    const { ref, visible } = useReveal()
    const [activeStep, setActiveStep] = useState(0)
    const [autoPlay, setAutoPlay] = useState(true)

    useEffect(() => {
        if (!autoPlay) return
        const iv = setInterval(() => setActiveStep(prev => (prev + 1) % 3), 4000)
        return () => clearInterval(iv)
    }, [autoPlay])

    const steps = [
        {
            n: '01',
            title: 'Set the agreement once per client',
            body: 'Percentage or flat fee. Tiered by seniority. Replacement guarantee period. Stored per client. Applied to every placement automatically — no manual lookup ever.',
        },
        {
            n: '02',
            title: 'Candidate placed — CTC confirmed by both sides',
            body: 'Employer uploads the signed offer and fills CTC breakdown. Both sides confirm. If no dispute within 48 hours, the record locks automatically.',
        },
        {
            n: '03',
            title: 'Commission calculated and locked — immutable',
            body: 'Calculated from the agreement on file the moment both sides confirm. The commission record is immutable. First-submission timestamp is permanent proof of ownership.',
        },
    ]

    return (
        <section style={{ background: '#102138' }}>
            <div className="wrap" style={{ paddingTop: 'clamp(40px,4vw,52px)', paddingBottom: 'clamp(56px,5vw,72px)' }}>
                <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'opacity .7s ease, transform .7s ease' }}>

                    {/* Section header */}
                    <div style={{ marginBottom: 'clamp(24px,3vw,36px)' }}>
                        <div className="eyebrow" style={{ marginBottom: 8 }}>
                            <div className="ey-line" />Commission + Agreements
                        </div>
                        <h2 className="h2" style={{ marginBottom: 8 }}>
                            Offer uploaded.<br />
                            <em>Commission auto-calculated.</em>
                        </h2>
                        <p className="lead" style={{ maxWidth: 540 }}>
                            No manual spreadsheet. No rounding disputes. Both sides confirm or it locks automatically after 48 hours. The first-submission timestamp is your proof — forever.
                        </p>
                    </div>

                    {/* Two-column grid */}
                    <div className="cc-grid">

                        {/* LEFT — step list */}
                        <div className="cc-steps-col">
                            {steps.map((s, i) => {
                                const isActive = activeStep === i
                                return (
                                    <div key={i} className="cc-step-wrap">
                                        <button
                                            className={`cc-step${isActive ? ' cc-step-active' : ''}`}
                                            onClick={() => { setActiveStep(i); setAutoPlay(false) }}
                                            style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}
                                        >
                                            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                                {/* Number + connector */}
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                                                    <div className={`cc-num${isActive ? ' cc-num-active' : ''}`}>{s.n}</div>
                                                    {i < steps.length - 1 && (
                                                        <div style={{ width: 1, flex: 1, minHeight: 24, margin: '6px 0', background: isActive ? 'rgba(196,154,60,.4)' : 'rgba(255,255,255,.1)', transition: 'background .3s' }} />
                                                    )}
                                                </div>
                                                {/* Content */}
                                                <div style={{ paddingBottom: i < steps.length - 1 ? 24 : 0, paddingTop: 4, flex: 1 }}>
                                                    <div className={`cc-title${isActive ? ' cc-title-active' : ''}`}>{s.title}</div>
                                                    <div style={{ fontSize: 'clamp(13px,.88vw,15px)', color: 'var(--text2)', lineHeight: 1.65, marginTop: 6 }}>
                                                        {s.body}
                                                    </div>
                                                    {/* Auto-play progress bar */}
                                                    {isActive && autoPlay && (
                                                        <div style={{ marginTop: 10, height: 2, background: 'rgba(255,255,255,.08)', borderRadius: 100, overflow: 'hidden' }}>
                                                            <div style={{ height: '100%', background: 'var(--gold)', borderRadius: 100, animation: 'ccProgress 4s linear forwards' }} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>

                                        {/* Mobile inline dashboard */}
                                        <div className={`cc-mobile-dash${isActive ? ' cc-mobile-dash-open' : ''}`}>
                                            <CommissionDashboard activeStep={i} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* RIGHT — desktop dashboard */}
                        <div className="cc-dash-col">
                            <CommissionDashboard activeStep={activeStep} />
                        </div>
                    </div>

                </div>
            </div>

            <style suppressHydrationWarning>{`
                @keyframes ccPulse   { 0%,100%{opacity:1} 50%{opacity:.3} }
                @keyframes ccFadeUp  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
                @keyframes ccBlink   { 0%,100%{opacity:1} 50%{opacity:0} }
                @keyframes ccProgress{ from{width:0%} to{width:100%} }
                @keyframes ccRipple  { from{transform:scale(.4);opacity:1} to{transform:scale(2.4);opacity:0} }

                .cc-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: clamp(24px, 4vw, 48px);
                    align-items: center;
                }
                .cc-steps-col {
                    display: flex; flex-direction: column;
                    justify-content: flex-start;
                    position: static;
                }
                .cc-dash-col { display: flex; flex-direction: column; }

                .cc-step { padding: 12px 14px; border-radius: 12px; text-align: left; }
                .cc-step-active { background: rgba(196,154,60,.06); }

                .cc-num {
                    width: 36px; height: 36px; border-radius: 50%;
                    background: rgba(255,255,255,.05);
                    border: 1.5px solid rgba(255,255,255,.12);
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Geist', sans-serif;
                    font-size: 10px; font-weight: 700; color: var(--text3);
                    transition: all .3s ease; flex-shrink: 0;
                }
                .cc-num-active {
                    background: rgba(196,154,60,.18) !important;
                    border-color: rgba(196,154,60,.5) !important;
                    color: var(--gold) !important;
                    box-shadow: 0 0 16px rgba(196,154,60,.3);
                }
                .cc-title {
                    font-family: 'Geist', sans-serif;
                    font-size: clamp(14px, 1.05vw, 17px);
                    font-weight: 600; color: var(--text2);
                    line-height: 1.35; transition: color .25s ease;
                }
                .cc-title-active { color: var(--text) !important; }

                /* Mobile inline dashboard — hidden by default */
                .cc-mobile-dash { display: none; }

                /* Tablet */
                @media (min-width: 769px) and (max-width: 1100px) {
                    .cc-grid { gap: 24px; }
                    .cc-steps-col { position: static; }
                }

                /* Mobile */
                @media (max-width: 768px) {
                    .cc-grid { grid-template-columns: 1fr; gap: 0; }
                    .cc-dash-col { display: none; }
                    .cc-steps-col { position: static; }
                    .cc-title { font-size: clamp(13px, 4vw, 15px); }
                    .cc-step { padding: 10px 12px; }
                    .cc-num  { width: 32px; height: 32px; }

                    /* Show inline dashboard below active step */
                    .cc-mobile-dash {
                        display: block;
                        max-height: 0; overflow: hidden;
                        opacity: 0; transform: translateY(-8px);
                        transition: max-height .45s cubic-bezier(.16,1,.3,1), opacity .35s ease, transform .35s ease;
                        margin: 0 12px;
                    }
                    .cc-mobile-dash-open {
                        max-height: 600px; opacity: 1;
                        transform: translateY(0); margin-bottom: 8px;
                    }
                }
            `}</style>
        </section>
    )
}
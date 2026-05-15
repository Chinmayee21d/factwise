'use client'

import { useState, useEffect, useRef } from 'react'
import { useReveal, DashBar, Tick } from './SharedItems'

/* ═══════════════════════════════════════════════════════════
   TAB 1 — TALENT BENCH & SELF-ONBOARDING PORTAL
═══════════════════════════════════════════════════════════ */

const EXISTING_BENCH = [
    { init: 'PS', name: 'Priya Sharma', role: 'Sr. Backend Eng', pct: 94, color: '#3470F0' },
    { init: 'RV', name: 'Rahul Verma', role: 'Product Designer', pct: 88, color: '#8a33e0' },
    { init: 'AM', name: 'Aarav Menon', role: 'DevOps Engineer', pct: 76, color: '#18B87A' },
    { init: 'SK', name: 'Sneha Kulkarni', role: 'Frontend Eng', pct: 61, color: '#F79009' },
]

const PARSED_FIELDS = [
    { label: 'Name extracted', val: 'Kiran Trivedi' },
    { label: 'Role detected', val: 'DevOps Engineer' },
    { label: 'Experience parsed', val: '4 years' },
    { label: 'Skills extracted', val: 'Kubernetes · AWS · Terraform' },
    { label: 'Expected CTC', val: '₹20L' },
    { label: 'Availability', val: 'Immediate' },
]

function BenchPortalDash({ playing }: { playing: boolean }) {
    const [phase, setPhase] = useState(0)
    const [fieldCount, setFieldCount] = useState(0)
    const [completeness, setCompleteness] = useState(0)
    const [approved, setApproved] = useState(false)
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        if (!playing) {
            setPhase(0); setFieldCount(0); setCompleteness(0)
            setApproved(false); setShowToast(false)
            return
        }
        const ts: ReturnType<typeof setTimeout>[] = []

        const run = () => {
            setPhase(0); setFieldCount(0); setCompleteness(0)
            setApproved(false); setShowToast(false)

            ts.push(setTimeout(() => setPhase(1), 600))
            ts.push(setTimeout(() => setPhase(2), 1400))
            ts.push(setTimeout(() => setPhase(3), 1900))

            PARSED_FIELDS.forEach((_, i) => {
                ts.push(setTimeout(() => setFieldCount(i + 1), 2200 + i * 340))
            })

            const afterParse = 2200 + PARSED_FIELDS.length * 340
            ts.push(setTimeout(() => setCompleteness(82), afterParse))
            ts.push(setTimeout(() => setPhase(4), afterParse + 300))
            ts.push(setTimeout(() => { setApproved(true); setPhase(5) }, afterParse + 1200))
            ts.push(setTimeout(() => setShowToast(true), afterParse + 1700))
            ts.push(setTimeout(() => {
                setShowToast(false)
                setTimeout(run, 800)
            }, afterParse + 3800))
        }
        run()
        return () => ts.forEach(clearTimeout)
    }, [playing])

    return (
        <div className="s3ag-dash" style={{ position: 'relative' }}>
            <DashBar title="Talent Bench — Live Registration" badge="Live" badgeColor="#18B87A" />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>

                {/* Sidebar — bench list */}
                <div style={{ width: 136, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,.06)', padding: '10px 8px', background: 'rgba(0,0,0,.14)', overflowY: 'auto', scrollbarWidth: 'none' }}>
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.4, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>
                        Bench · {phase >= 2 ? EXISTING_BENCH.length + 1 : EXISTING_BENCH.length}
                    </div>

                    {/* New candidate row animates in */}
                    {phase >= 2 && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '6px 7px', borderRadius: 8, marginBottom: 5,
                            background: approved ? 'rgba(24,184,122,.08)' : 'rgba(196,154,60,.07)',
                            border: `1px solid ${approved ? 'rgba(24,184,122,.35)' : 'rgba(196,154,60,.3)'}`,
                            animation: 'agFadeUp .4s ease both',
                            transition: 'all .4s ease',
                        }}>
                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#C49A3C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7.5, fontWeight: 800, color: '#fff', flexShrink: 0 }}>KT</div>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: 9.5, fontWeight: 700, color: approved ? '#18B87A' : 'var(--gold)', lineHeight: 1.2 }}>Kiran T.</div>
                                <div style={{ fontSize: 7.5, color: 'var(--text3)' }}>{approved ? 'Active ✓' : 'Pending'}</div>
                            </div>
                        </div>
                    )}

                    {/* Existing bench */}
                    {EXISTING_BENCH.map((c, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 7px', borderRadius: 8, marginBottom: 5, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7.5, fontWeight: 800, color: '#fff', flexShrink: 0, opacity: .8 }}>{c.init}</div>
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--text2)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name.split(' ')[0]}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                                    <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,.07)', borderRadius: 100 }}>
                                        <div style={{ height: '100%', width: `${c.pct}%`, background: c.color, borderRadius: 100 }} />
                                    </div>
                                    <span style={{ fontSize: 7, color: 'var(--text3)', flexShrink: 0 }}>{c.pct}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right panel */}
                <div style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                    {/* Idle state */}
                    {phase === 0 && (
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,.15)', animation: 'agPulse 2s ease-in-out infinite' }} />
                            <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic' }}>Waiting for registrations…</div>
                        </div>
                    )}

                    {/* Registration event */}
                    {phase >= 1 && (
                        <div style={{ padding: '10px 12px', borderRadius: 10, marginBottom: 10, background: 'rgba(196,154,60,.08)', border: '1px solid rgba(196,154,60,.28)', animation: 'agFadeUp .4s ease both' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', animation: 'agPulse 1.5s ease-in-out infinite' }} />
                                <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--gold)', letterSpacing: 1, textTransform: 'uppercase' }}>New Self-Registration</span>
                            </div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>Kiran Trivedi · kiran@email.com</div>
                            <div style={{ fontSize: 10, color: 'var(--text3)' }}>Resume uploaded · {phase >= 3 ? 'Parsing…' : 'Received'}</div>
                        </div>
                    )}

                    {/* Parsing fields */}
                    {phase >= 3 && (
                        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.4, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>Resume Parsing</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10 }}>
                                {PARSED_FIELDS.map((f, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: fieldCount > i ? 1 : 0.2, transition: 'opacity .3s ease' }}>
                                        <div style={{
                                            width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                                            background: fieldCount > i ? 'rgba(24,184,122,.15)' : 'rgba(255,255,255,.05)',
                                            border: `1px solid ${fieldCount > i ? 'rgba(24,184,122,.4)' : 'rgba(255,255,255,.1)'}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'all .3s',
                                        }}>
                                            {fieldCount > i && (
                                                <svg width="7" height="7" viewBox="0 0 7 7" fill="none" stroke="#18B87A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="1,3.5 2.8,5.2 6,1.5" />
                                                </svg>
                                            )}
                                        </div>
                                        <span style={{ fontSize: 9.5, color: 'var(--text3)', flex: 1 }}>{f.label}</span>
                                        <span style={{ fontSize: 10, fontWeight: 600, color: fieldCount > i ? 'var(--text2)' : 'rgba(255,255,255,.15)', transition: 'color .3s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>{f.val}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Completeness bar */}
                            {completeness > 0 && (
                                <div style={{ padding: '8px 10px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 8, marginBottom: 8, animation: 'agFadeUp .4s ease both' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <span style={{ fontSize: 9, color: 'var(--text3)' }}>Profile completeness</span>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gold)' }}>{completeness}%</span>
                                    </div>
                                    <div style={{ height: 4, background: 'rgba(255,255,255,.07)', borderRadius: 100, overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${completeness}%`, background: 'var(--gold)', borderRadius: 100, transition: 'width 1s cubic-bezier(.16,1,.3,1)', boxShadow: '0 0 8px rgba(196,154,60,.5)' }} />
                                    </div>
                                    <div style={{ fontSize: 8.5, color: 'var(--text3)', marginTop: 4 }}>3 open roles match · Min threshold: 60%</div>
                                </div>
                            )}

                            {/* Approve button */}
                            {phase >= 4 && !approved && (
                                <div style={{ display: 'flex', gap: 7, animation: 'agFadeUp .35s ease both' }}>
                                    <button style={{ flex: 1, padding: '8px 0', borderRadius: 8, background: 'rgba(24,184,122,.12)', border: '1px solid rgba(24,184,122,.35)', color: '#18B87A', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'Geist',sans-serif", animation: 'agPulse 1.5s ease-in-out infinite' }}>
                                        ✓ Approve & add to bench
                                    </button>
                                    <button style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.09)', color: 'var(--text3)', fontSize: 11, cursor: 'pointer', fontFamily: "'Geist',sans-serif" }}>✗</button>
                                </div>
                            )}

                            {/* Approved state */}
                            {approved && (
                                <div style={{ padding: '8px 12px', background: 'rgba(24,184,122,.08)', border: '1px solid rgba(24,184,122,.3)', borderRadius: 8, animation: 'agFadeUp .4s ease both', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#18B87A', boxShadow: '0 0 7px #18B87A', flexShrink: 0 }} />
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#18B87A' }}>Active in bench · 3 role matches found →</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Success toast */}
            <div style={{
                position: 'absolute', bottom: 10, left: 10, right: 10,
                background: 'rgba(8,20,40,.98)', border: '1px solid rgba(24,184,122,.45)',
                borderRadius: 10, padding: '10px 13px',
                boxShadow: '0 8px 32px rgba(0,0,0,.65)',
                transform: showToast ? 'translateY(0)' : 'translateY(64px)',
                opacity: showToast ? 1 : 0,
                transition: 'transform .5s cubic-bezier(.34,1.56,.64,1), opacity .3s ease',
                zIndex: 30, display: 'flex', alignItems: 'center', gap: 10,
            }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(24,184,122,.15)', border: '1px solid rgba(24,184,122,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#18B87A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1.5,6 4.5,9 10.5,3" /></svg>
                </div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#18B87A', marginBottom: 1 }}>Kiran Trivedi added to bench</div>
                    <div style={{ fontSize: 9.5, color: 'var(--text3)' }}>82% complete · Resume parsed · 3 role matches found</div>
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════
   TAB 2 — ML MATCHING PORTFOLIO MATRIX
═══════════════════════════════════════════════════════════ */

const MATRIX_CANDIDATES = ['Priya S.', 'Rahul V.', 'Aarav M.', 'Sneha K.', 'Rohan I.']
const MATRIX_JOBS = [
    { client: 'TechCorp', role: 'Backend Lead' },
    { client: 'Razorpay', role: 'Platform Eng' },
    { client: 'Swiggy', role: 'SRE Lead' },
    { client: 'Cred', role: 'Frontend' },
]
const MATRIX_SCORES = [
    [94, 87, 61, 45],
    [52, 68, 44, 91],
    [63, 71, 88, 39],
    [79, 55, 66, 83],
    [48, 82, 57, 70],
]
const STRONG_MATCHES = [[0, 0], [0, 1], [1, 3], [2, 2], [3, 3]]

function cellStyle(score: number, glowing: boolean, checked: boolean, submitted: boolean, revealed: boolean) {
    const s = score >= 85 ? { bg: 'rgba(24,184,122,.18)', border: 'rgba(24,184,122,.5)', text: '#18B87A' }
        : score >= 75 ? { bg: 'rgba(24,184,122,.08)', border: 'rgba(24,184,122,.2)', text: 'rgba(24,184,122,.8)' }
            : score >= 60 ? { bg: 'rgba(196,154,60,.1)', border: 'rgba(196,154,60,.25)', text: '#C49A3C' }
                : { bg: 'rgba(255,255,255,.03)', border: 'rgba(255,255,255,.07)', text: 'var(--text3)' }
    return s
}

function MLMatrixDash({ playing }: { playing: boolean }) {
    const [revealed, setRevealed] = useState<boolean[][]>(Array(5).fill(null).map(() => Array(4).fill(false)))
    const [glowing, setGlowing] = useState(false)
    const [showDigest, setShowDigest] = useState(false)
    const [checked, setChecked] = useState<boolean[][]>(Array(5).fill(null).map(() => Array(4).fill(false)))
    const [submitted, setSubmitted] = useState<boolean[][]>(Array(5).fill(null).map(() => Array(4).fill(false)))
    const [showBtn, setShowBtn] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const reset = () => {
        setRevealed(Array(5).fill(null).map(() => Array(4).fill(false)))
        setGlowing(false); setShowDigest(false)
        setChecked(Array(5).fill(null).map(() => Array(4).fill(false)))
        setSubmitted(Array(5).fill(null).map(() => Array(4).fill(false)))
        setShowBtn(false); setShowToast(false)
    }

    useEffect(() => {
        if (!playing) { reset(); return }
        const ts: ReturnType<typeof setTimeout>[] = []

        const run = () => {
            reset()
            // fill scores row by row
            let delay = 300
            for (let r = 0; r < 5; r++) {
                for (let c = 0; c < 4; c++) {
                    const row = r; const col = c
                    ts.push(setTimeout(() => {
                        setRevealed(prev => { const n = prev.map(a => [...a]); n[row][col] = true; return n })
                    }, delay))
                    delay += 80
                }
                delay += 100
            }
            ts.push(setTimeout(() => setGlowing(true), delay + 100))
            ts.push(setTimeout(() => setShowDigest(true), delay + 500))
            // auto-check top 2 strong matches
            STRONG_MATCHES.slice(0, 2).forEach(([r, c], i) => {
                ts.push(setTimeout(() => {
                    setChecked(prev => { const n = prev.map(a => [...a]); n[r][c] = true; return n })
                }, delay + 1100 + i * 200))
            })
            ts.push(setTimeout(() => setShowBtn(true), delay + 1600))
            // submit
            ts.push(setTimeout(() => {
                STRONG_MATCHES.slice(0, 2).forEach(([r, c]) => {
                    setTimeout(() => {
                        setSubmitted(prev => { const n = prev.map(a => [...a]); n[r][c] = true; return n })
                    }, 250)
                })
            }, delay + 2100))
            ts.push(setTimeout(() => setShowToast(true), delay + 2500))
            ts.push(setTimeout(() => { setShowToast(false); setTimeout(run, 800) }, delay + 4300))
        }
        run()
        return () => ts.forEach(clearTimeout)
    }, [playing])

    return (
        <div className="s3ag-dash" style={{ position: 'relative' }}>
            <DashBar title="Portfolio Matrix — ML Matching" badge="7 signals" badgeColor="#C49A3C" />
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 10px 0' }}>

                {/* Column headers */}
                <div style={{ display: 'grid', gridTemplateColumns: '72px repeat(4, 1fr)', gap: 4, marginBottom: 6, flexShrink: 0 }}>
                    <div />
                    {MATRIX_JOBS.map((j, i) => (
                        <div key={i} style={{ padding: '4px 4px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 6, textAlign: 'center' }}>
                            <div style={{ fontSize: 8.5, fontWeight: 700, color: 'var(--text2)', lineHeight: 1.3 }}>{j.client}</div>
                            <div style={{ fontSize: 7.5, color: 'var(--text3)', lineHeight: 1.3 }}>{j.role}</div>
                        </div>
                    ))}
                </div>

                {/* Matrix rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
                    {MATRIX_CANDIDATES.map((cand, r) => (
                        <div key={r} style={{ display: 'grid', gridTemplateColumns: '72px repeat(4, 1fr)', gap: 4, flexShrink: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: 10, fontWeight: 600, color: 'var(--text2)', paddingRight: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cand}</div>
                            {MATRIX_SCORES[r].map((score, c) => {
                                const strong = STRONG_MATCHES.some(([sr, sc]) => sr === r && sc === c) && glowing
                                const col = cellStyle(score, glowing, checked[r][c], submitted[r][c], revealed[r][c])
                                return (
                                    <div key={c} style={{
                                        padding: '6px 4px', borderRadius: 7, textAlign: 'center',
                                        background: submitted[r][c] ? 'rgba(24,184,122,.12)' : col.bg,
                                        border: `1px solid ${submitted[r][c] ? 'rgba(24,184,122,.4)' : strong ? col.border : 'rgba(255,255,255,.06)'}`,
                                        opacity: revealed[r][c] ? 1 : 0,
                                        transition: 'opacity .3s ease, background .4s ease, border-color .4s ease',
                                        boxShadow: strong && !submitted[r][c] ? `0 0 10px ${col.text}33` : 'none',
                                        position: 'relative',
                                    }}>
                                        {submitted[r][c] ? (
                                            <div style={{ fontSize: 9, fontWeight: 800, color: '#18B87A' }}>✓</div>
                                        ) : (
                                            <div style={{ fontSize: 11, fontWeight: 800, color: col.text }}>{score}%</div>
                                        )}
                                        {strong && !submitted[r][c] && (
                                            <div style={{ position: 'absolute', top: 2, right: 2, width: 5, height: 5, borderRadius: '50%', background: col.text, animation: 'agPulse 1.5s ease-in-out infinite' }} />
                                        )}
                                        {checked[r][c] && !submitted[r][c] && (
                                            <div style={{ position: 'absolute', inset: 0, borderRadius: 7, border: '2px solid rgba(196,154,60,.6)', pointerEvents: 'none' }} />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>

                {/* Daily digest */}
                {showDigest && (
                    <div style={{ margin: '8px 0', padding: '9px 11px', background: 'rgba(196,154,60,.07)', border: '1px solid rgba(196,154,60,.25)', borderRadius: 9, animation: 'agFadeUp .4s ease both', flexShrink: 0 }}>
                        <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--gold)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>✦ Daily Digest — 2 unactioned strong matches</div>
                        {[
                            { cand: 'Priya S.', client: 'TechCorp Backend Lead', score: 94 },
                            { cand: 'Aarav M.', client: 'Swiggy SRE Lead', score: 88 },
                        ].map((m, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', borderTop: i > 0 ? '1px solid rgba(196,154,60,.1)' : 'none' }}>
                                <span style={{ flex: 1, fontSize: 10, color: 'var(--text2)' }}>{m.cand} → {m.client}</span>
                                <span style={{ fontSize: 11, fontWeight: 800, color: '#18B87A' }}>{m.score}%</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Submit button */}
                {showBtn && (
                    <div style={{ paddingBottom: 10, flexShrink: 0, animation: 'agFadeUp .35s ease both' }}>
                        <button style={{ width: '100%', padding: '9px', borderRadius: 9, background: 'var(--gold)', border: 'none', color: 'var(--navy)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Geist',sans-serif" }}>
                            Submit selected (2) →
                        </button>
                    </div>
                )}
            </div>

            {/* Toast */}
            <div style={{
                position: 'absolute', bottom: 10, left: 10, right: 10,
                background: 'rgba(8,20,40,.98)', border: '1px solid rgba(24,184,122,.45)',
                borderRadius: 10, padding: '9px 12px',
                transform: showToast ? 'translateY(0)' : 'translateY(64px)',
                opacity: showToast ? 1 : 0,
                transition: 'transform .5s cubic-bezier(.34,1.56,.64,1), opacity .3s',
                zIndex: 30, display: 'flex', alignItems: 'center', gap: 9,
            }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(24,184,122,.15)', border: '1px solid rgba(24,184,122,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#18B87A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1.5,5 3.8,7.5 8.5,2.5" /></svg>
                </div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#18B87A', marginBottom: 1 }}>2 submissions created</div>
                    <div style={{ fontSize: 9, color: 'var(--text3)' }}>Priya S. → TechCorp · Aarav M. → Swiggy · Clients notified</div>
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════
   TAB 3 — MULTI-CLIENT SUBMISSION
═══════════════════════════════════════════════════════════ */

const SUBMIT_JOBS = [
    { client: 'TechCorp', role: 'Backend Lead', score: 94, recommended: true, color: '#18B87A' },
    { client: 'Razorpay', role: 'Platform Eng', score: 87, recommended: true, color: '#18B87A' },
    { client: 'Swiggy', role: 'SRE Lead', score: 79, recommended: false, color: '#C49A3C' },
    { client: 'Cred', role: 'Frontend Eng', score: 61, recommended: false, color: 'var(--text3)' },
]

function MultiSubmitDash({ playing }: { playing: boolean }) {
    const [phase, setPhase] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [scoresIn, setScoresIn] = useState(false)
    const [checked, setChecked] = useState([false, false, false, false])
    const [submitting, setSubmitting] = useState([false, false, false, false])
    const [submitted, setSubmitted] = useState([false, false, false, false])
    const [showCounter, setShowCounter] = useState(false)
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        if (!playing) {
            setPhase(0); setShowModal(false); setScoresIn(false)
            setChecked([false, false, false, false]); setSubmitting([false, false, false, false])
            setSubmitted([false, false, false, false]); setShowCounter(false); setShowToast(false)
            return
        }
        const ts: ReturnType<typeof setTimeout>[] = []

        const run = () => {
            setPhase(0); setShowModal(false); setScoresIn(false)
            setChecked([false, false, false, false]); setSubmitting([false, false, false, false])
            setSubmitted([false, false, false, false]); setShowCounter(false); setShowToast(false)

            ts.push(setTimeout(() => setPhase(1), 500))
            ts.push(setTimeout(() => { setShowModal(true); setPhase(2) }, 1100))
            ts.push(setTimeout(() => setScoresIn(true), 1500))
            // auto-check recommended
            ts.push(setTimeout(() => setChecked(p => { const n = [...p]; n[0] = true; return n }), 2200))
            ts.push(setTimeout(() => setChecked(p => { const n = [...p]; n[1] = true; return n }), 2500))
            // user checks Swiggy
            ts.push(setTimeout(() => setChecked(p => { const n = [...p]; n[2] = true; return n }), 3000))
            ts.push(setTimeout(() => setPhase(3), 3200))
            // submit
            ts.push(setTimeout(() => {
                setSubmitting([true, true, true, false])
                setTimeout(() => setSubmitted(p => { const n = [...p]; n[0] = true; return n }), 300)
                setTimeout(() => setSubmitted(p => { const n = [...p]; n[1] = true; return n }), 600)
                setTimeout(() => setSubmitted(p => { const n = [...p]; n[2] = true; return n }), 900)
            }, 3800))
            ts.push(setTimeout(() => { setShowModal(false); setShowCounter(true) }, 4900))
            ts.push(setTimeout(() => setShowToast(true), 5100))
            ts.push(setTimeout(() => { setShowToast(false); setTimeout(run, 800) }, 7300))
        }
        run()
        return () => ts.forEach(clearTimeout)
    }, [playing])

    const checkedCount = checked.filter(Boolean).length

    return (
        <div className="s3ag-dash" style={{ position: 'relative' }}>
            <DashBar title="Multi-Client Submission" badge="ML ranked" badgeColor="#C49A3C" />
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                {/* Candidate card */}
                <div style={{ width: 136, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,.06)', padding: '12px 10px', background: 'rgba(0,0,0,.12)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.4, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 10 }}>Candidate</div>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#3470F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 8 }}>PS</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Priya Sharma</div>
                    <div style={{ fontSize: 9.5, color: 'var(--text3)', marginBottom: 10 }}>Sr. Backend Eng</div>
                    {[{ l: 'Experience', v: '6 yrs' }, { l: 'CTC', v: '₹24L' }, { l: 'Avg ML', v: '91%' }].map(m => (
                        <div key={m.l} style={{ marginBottom: 6 }}>
                            <div style={{ fontSize: 8, color: 'var(--text3)' }}>{m.l}</div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: m.l === 'Avg ML' ? '#18B87A' : 'var(--text2)' }}>{m.v}</div>
                        </div>
                    ))}
                    <button style={{
                        marginTop: 'auto', padding: '8px 0', borderRadius: 8,
                        background: phase >= 1 ? 'rgba(196,154,60,.15)' : 'rgba(196,154,60,.08)',
                        border: `1px solid ${phase >= 1 ? 'rgba(196,154,60,.5)' : 'rgba(196,154,60,.2)'}`,
                        color: 'var(--gold)', fontSize: 10, fontWeight: 700, cursor: 'pointer',
                        fontFamily: "'Geist',sans-serif",
                        animation: phase === 1 ? 'agPulse 1s ease-in-out infinite' : 'none',
                        transition: 'all .3s',
                    }}>Submit →</button>

                    {/* Active submissions counter */}
                    {showCounter && (
                        <div style={{ marginTop: 8, padding: '7px 9px', background: 'rgba(52,112,240,.08)', border: '1px solid rgba(52,112,240,.22)', borderRadius: 8, animation: 'agFadeUp .4s ease both' }}>
                            <div style={{ fontSize: 8, color: 'var(--text3)', marginBottom: 4 }}>Active submissions</div>
                            {['TechCorp', 'Razorpay', 'Swiggy'].map(c => (
                                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, color: 'var(--text2)', marginBottom: 3 }}>
                                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#18B87A', animation: 'agPulse 2s ease-in-out infinite', flexShrink: 0 }} />
                                    {c}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Modal */}
                {showModal && (
                    <div style={{ flex: 1, padding: '10px 11px', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'agFadeUp .35s ease both' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Submit Priya Sharma to client roles</div>
                        <div style={{ fontSize: 9.5, color: 'var(--text3)', marginBottom: 10 }}>ML-ranked · select roles to submit</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                            {SUBMIT_JOBS.map((j, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 9,
                                    background: submitted[i] ? 'rgba(24,184,122,.07)' : checked[i] ? 'rgba(196,154,60,.07)' : 'rgba(255,255,255,.03)',
                                    border: `1px solid ${submitted[i] ? 'rgba(24,184,122,.3)' : checked[i] ? 'rgba(196,154,60,.3)' : 'rgba(255,255,255,.07)'}`,
                                    opacity: scoresIn ? 1 : 0,
                                    transition: 'all .35s ease',
                                }}>
                                    <div style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, background: checked[i] ? (submitted[i] ? 'rgba(24,184,122,.2)' : 'rgba(196,154,60,.2)') : 'rgba(255,255,255,.05)', border: `1.5px solid ${checked[i] ? (submitted[i] ? '#18B87A' : 'var(--gold)') : 'rgba(255,255,255,.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .3s' }}>
                                        {checked[i] && <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke={submitted[i] ? '#18B87A' : 'var(--gold)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1,4 3,6 7,1.5" /></svg>}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{j.client} · {j.role}</div>
                                        {j.recommended && <div style={{ fontSize: 8, color: 'var(--gold)', fontWeight: 700, marginTop: 1 }}>★ Recommended</div>}
                                    </div>
                                    {submitting[i] && !submitted[i] ? (
                                        <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,.15)', borderTopColor: 'var(--gold)', animation: 'agSpin .7s linear infinite', flexShrink: 0 }} />
                                    ) : submitted[i] ? (
                                        <div style={{ fontSize: 9, fontWeight: 800, color: '#18B87A', flexShrink: 0, animation: 'agFadeUp .3s ease both' }}>✓ Sent</div>
                                    ) : (
                                        <div style={{ fontSize: 11, fontWeight: 800, color: j.color, flexShrink: 0 }}>{j.score}%</div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {phase >= 3 && checkedCount > 0 && !showCounter && (
                            <div style={{ marginTop: 8, flexShrink: 0, animation: 'agFadeUp .3s ease both' }}>
                                <button style={{ width: '100%', padding: '9px', borderRadius: 9, background: 'var(--gold)', border: 'none', color: 'var(--navy)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Geist',sans-serif" }}>
                                    Submit to {checkedCount} role{checkedCount > 1 ? 's' : ''} →
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {!showModal && !showCounter && (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: 11, color: 'var(--text3)', fontStyle: 'italic', textAlign: 'center', padding: '0 16px' }}>Click "Submit" to open multi-client modal</div>
                    </div>
                )}
            </div>

            {/* Toast */}
            <div style={{
                position: 'absolute', bottom: 10, left: 10, right: 10,
                background: 'rgba(8,20,40,.98)', border: '1px solid rgba(24,184,122,.45)',
                borderRadius: 10, padding: '9px 12px',
                transform: showToast ? 'translateY(0)' : 'translateY(64px)',
                opacity: showToast ? 1 : 0,
                transition: 'transform .5s cubic-bezier(.34,1.56,.64,1), opacity .3s',
                zIndex: 30, display: 'flex', alignItems: 'center', gap: 9,
            }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(24,184,122,.15)', border: '1px solid rgba(24,184,122,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#18B87A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1.5,5 3.8,7.5 8.5,2.5" /></svg>
                </div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#18B87A', marginBottom: 1 }}>3 independent submissions created</div>
                    <div style={{ fontSize: 9, color: 'var(--text3)' }}>Clients notified · Auto-close on placement active</div>
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════
   TAB 4 — COMMISSION & AGREEMENT
═══════════════════════════════════════════════════════════ */

function CommissionDash({ playing, loopProgress }: { playing: boolean; loopProgress: number }) {
    const [step, setStep] = useState(0)
    const [ctcTyped, setCtcTyped] = useState('')
    const [empConfirmed, setEmpConfirmed] = useState(false)
    const [agencyConfirmed, setAgencyConfirmed] = useState(false)
    const [commBarW, setCommBarW] = useState(0)
    const [locked, setLocked] = useState(false)
    const [payStep, setPayStep] = useState(0)
    const fullCTC = '₹28,00,000'

    useEffect(() => {
        if (!playing) {
            setStep(0); setCtcTyped(''); setEmpConfirmed(false); setAgencyConfirmed(false)
            setCommBarW(0); setLocked(false); setPayStep(0)
            return
        }
        const ts: ReturnType<typeof setTimeout>[] = []
        ts.push(setTimeout(() => setStep(1), 400))
        // type CTC
        ts.push(setTimeout(() => {
            let i = 0
            const iv = setInterval(() => {
                i++; setCtcTyped(fullCTC.slice(0, i))
                if (i >= fullCTC.length) clearInterval(iv)
            }, 60)
        }, 900))
        const afterType = 900 + fullCTC.length * 60
        ts.push(setTimeout(() => { setStep(2); setCommBarW(100) }, afterType + 200))
        ts.push(setTimeout(() => setEmpConfirmed(true), afterType + 900))
        ts.push(setTimeout(() => setAgencyConfirmed(true), afterType + 1600))
        ts.push(setTimeout(() => { setStep(3); setLocked(true) }, afterType + 2400))
        ts.push(setTimeout(() => setStep(4), afterType + 3300))
        ts.push(setTimeout(() => setPayStep(1), afterType + 3900))
        ts.push(setTimeout(() => setPayStep(2), afterType + 4700))
        return () => ts.forEach(clearTimeout)
    }, [playing])

    return (
        <div className="s3ag-dash" style={{ position: 'relative' }}>
            <DashBar title="Commission Engine" badge="Active" badgeColor="#18B87A" />

            {/* Step tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,.06)', flexShrink: 0 }}>
                {['Agreement', 'CTC Confirm', 'Locked', 'Invoice'].map((l, i) => {
                    const done = step > i + 1; const active = step === i + 1
                    return (
                        <div key={l} style={{ flex: 1, padding: '7px 4px', textAlign: 'center', background: active ? 'rgba(196,154,60,.06)' : 'transparent', borderRight: i < 3 ? '1px solid rgba(255,255,255,.05)' : 'none', transition: 'background .3s' }}>
                            <span style={{ fontSize: active ? 10 : 9, fontWeight: active ? 700 : 400, color: active ? '#C49A3C' : done ? '#18B87A' : 'var(--text3)', transition: 'all .3s' }}>
                                {done ? `✓ ${l}` : l}
                            </span>
                        </div>
                    )
                })}
            </div>

            <div style={{ flex: 1, overflow: 'hidden', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 9 }}>

                {/* Step 0/1 — Agreement on file */}
                {(step === 0 || step === 1) && (
                    <div style={{ animation: 'agFadeUp .4s ease both' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>Agreement — TechCorp Pvt. Ltd.</div>
                        {[
                            { l: 'Agreement type', v: 'Percentage of CTC', hi: false, green: false },
                            { l: 'Junior (0–3 yrs)', v: '6%', hi: false, green: false },
                            { l: 'Mid (3–6 yrs)', v: '8%  ← active', hi: true, green: false },
                            { l: 'Senior (6+ yrs)', v: '10%', hi: false, green: false },
                            { l: 'Replacement guarantee', v: '60 days', hi: false, green: false },
                            { l: 'First-submission lock', v: 'ON ✓', hi: false, green: true },
                        ].map((r, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                                <span style={{ fontSize: 10.5, color: 'var(--text3)' }}>{r.l}</span>
                                <span style={{ fontSize: 10.5, fontWeight: 600, color: r.hi ? 'var(--gold)' : r.green ? '#18B87A' : 'var(--text2)' }}>{r.v}</span>
                            </div>
                        ))}
                        <div style={{ marginTop: 9, padding: '6px 10px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 7, fontSize: 9.5, color: 'var(--text3)', fontStyle: 'italic' }}>
                            Created 14 Oct 2024 · Signed by both parties
                        </div>
                    </div>
                )}

                {/* Step 2 — CTC + commission calc */}
                {step === 2 && (
                    <div style={{ animation: 'agFadeUp .4s ease both', display: 'flex', flexDirection: 'column', gap: 9 }}>
                        <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text)' }}>Priya Sharma → TechCorp · Offer Stage</div>
                        <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 9 }}>
                            <div style={{ fontSize: 9, color: 'var(--text3)', marginBottom: 5 }}>CTC entered by employer</div>
                            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, color: 'var(--gold)', lineHeight: 1 }}>
                                {ctcTyped}
                                <span style={{ display: 'inline-block', width: 2, height: 18, background: 'var(--gold)', verticalAlign: 'middle', marginLeft: 1, animation: 'agBlink .7s step-end infinite' }} />
                            </div>
                        </div>
                        {[
                            { l: 'Seniority detected', v: 'Mid (6 yrs) → 8% rate', c: 'var(--gold)' },
                            { l: 'Commission preview', v: '₹28,00,000 × 8% = ₹2,24,000', c: '#18B87A' },
                        ].map(r => (
                            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 7 }}>
                                <span style={{ fontSize: 10, color: 'var(--text3)' }}>{r.l}</span>
                                <span style={{ fontSize: 10, fontWeight: 700, color: r.c }}>{r.v}</span>
                            </div>
                        ))}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {[
                                { l: 'Employer', sub: 'TechCorp HR', done: empConfirmed, c: '#3470F0', rgb: '52,112,240' },
                                { l: 'Agency', sub: 'Your firm', done: agencyConfirmed, c: '#C49A3C', rgb: '196,154,60' },
                            ].map(p => (
                                <div key={p.l} style={{ padding: '8px 10px', borderRadius: 8, textAlign: 'center', background: p.done ? `rgba(${p.rgb},.1)` : 'rgba(255,255,255,.03)', border: `1.5px solid ${p.done ? p.c + '55' : 'rgba(255,255,255,.09)'}`, transition: 'all .4s cubic-bezier(.34,1.56,.64,1)' }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: p.done ? p.c : 'var(--text3)', transition: 'color .3s' }}>{p.done ? '✓ Confirmed' : 'Awaiting…'}</div>
                                    <div style={{ fontSize: 8.5, color: 'var(--text3)' }}>{p.l} · {p.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3 — Locked */}
                {step === 3 && (
                    <div style={{ animation: 'agFadeUp .4s ease both', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ padding: '14px', background: locked ? 'rgba(24,184,122,.08)' : 'rgba(255,255,255,.03)', border: `1.5px solid ${locked ? 'rgba(24,184,122,.4)' : 'rgba(255,255,255,.1)'}`, borderRadius: 11, textAlign: 'center', transition: 'all .55s cubic-bezier(.34,1.56,.64,1)' }}>
                            <div style={{ fontSize: 26, marginBottom: 6 }}>🔒</div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: '#18B87A', marginBottom: 3 }}>LOCKED — IMMUTABLE</div>
                            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, color: 'var(--gold)', marginBottom: 3 }}>₹2,24,000</div>
                            <div style={{ fontSize: 9.5, color: 'var(--text3)' }}>Commission record #CR-2024-0091</div>
                        </div>
                        {[
                            { l: 'First submission', v: '14 Nov 2024, 09:32 AM ✓', c: '#18B87A' },
                            { l: 'Offer confirmed', v: '18 Dec 2024, 02:15 PM ✓', c: '#18B87A' },
                            { l: 'Record created', v: '18 Dec 2024, 02:15 PM', c: 'var(--text2)' },
                        ].map(r => (
                            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 7 }}>
                                <span style={{ fontSize: 10, color: 'var(--text3)' }}>{r.l}</span>
                                <span style={{ fontSize: 10, fontWeight: 600, color: r.c }}>{r.v}</span>
                            </div>
                        ))}
                        <div style={{ fontSize: 9.5, color: 'var(--text3)', fontStyle: 'italic', textAlign: 'center' }}>This record cannot be edited or deleted.</div>
                    </div>
                )}

                {/* Step 4 — Invoice + payment tracker */}
                {step === 4 && (
                    <div style={{ animation: 'agFadeUp .4s ease both', display: 'flex', flexDirection: 'column', gap: 9 }}>
                        <div style={{ padding: '10px 12px', background: 'rgba(24,184,122,.07)', border: '1px solid rgba(24,184,122,.25)', borderRadius: 10 }}>
                            <div style={{ fontSize: 9, fontWeight: 800, color: '#18B87A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 5 }}>● Commission Payable</div>
                            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 26, color: 'var(--gold)', lineHeight: 1, marginBottom: 3 }}>₹2,24,000</div>
                            <div style={{ fontSize: 10, color: 'var(--text3)' }}>to your agency · for Priya Sharma<br />Due 15 Jan 2025</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 8 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text)' }}>INV-2025-0091.pdf</div>
                                <div style={{ fontSize: 9, color: 'var(--text3)' }}>Auto-generated · sent to both parties</div>
                            </div>
                            <span style={{ fontSize: 9, color: '#18B87A', fontWeight: 700 }}>✓ Sent</span>
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, color: 'var(--text3)', textTransform: 'uppercase' }}>Payment status</div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {['Pending', 'Approved', 'Paid'].map((s, i) => {
                                const done = payStep > i; const active = payStep === i
                                const col = done ? '#18B87A' : active ? '#C49A3C' : 'rgba(255,255,255,.18)'
                                return (
                                    <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: done ? 'rgba(24,184,122,.18)' : active ? 'rgba(196,154,60,.14)' : 'rgba(255,255,255,.04)', border: `2px solid ${col}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: col, transition: 'all .4s cubic-bezier(.34,1.56,.64,1)', boxShadow: done ? '0 0 10px rgba(24,184,122,.4)' : 'none' }}>
                                                {done ? '✓' : i + 1}
                                            </div>
                                            <span style={{ fontSize: 9, color: col, fontWeight: done || active ? 600 : 400, whiteSpace: 'nowrap', transition: 'color .4s' }}>{s}</span>
                                        </div>
                                        {i < 2 && <div style={{ flex: 1, height: 2, marginBottom: 18, marginLeft: 6, marginRight: 6, background: done ? 'rgba(24,184,122,.45)' : 'rgba(255,255,255,.07)', borderRadius: 1, transition: 'background .45s ease' }} />}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Progress bar */}
            <div style={{ height: 2, background: 'rgba(255,255,255,.06)', flexShrink: 0 }}>
                <div style={{ height: '100%', background: 'var(--gold)', width: `${loopProgress}%`, transition: loopProgress === 0 ? 'none' : 'width .1s linear' }} />
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════
   FEATURES SECTION SHELL — TABS + LAYOUT
═══════════════════════════════════════════════════════════ */

const LOOP_MS = 9000

const FEATURES = [
    {
        tag: 'Talent Bench',
        title: 'Candidates join your bench themselves.',
        subtitle: 'Your sourcing stays private. Their data stays current.',
        accent: '#18B87A',
        bullets: [
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="4" r="2.2" /><path d="M2 10.5c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" /><line x1="9" y1="2.5" x2="9" y2="5.5" /><line x1="7.5" y1="4" x2="10.5" y2="4" /></svg>,
                label: 'Self-registration portal',
                desc: 'Candidates visit your branded URL, OTP verify, upload resume, fill profile. You approve — they enter the bench. Zero manual entry ever.',
            },
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="10" height="7" rx="1.5" /><path d="M4 3V2M8 3V2M1 6h10" /></svg>,
                label: 'Resume parsed automatically',
                desc: 'Skills, experience, CTC expectation, availability — all extracted on upload. Profile completeness scored immediately. No data entry.',
            },
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 1v5M3 9.5a4.5 4.5 0 0 1 0-7M9 9.5a4.5 4.5 0 0 0 0-7" /></svg>,
                label: 'Candidates keep their own data current',
                desc: 'Availability changed? New resume? They OTP back in, update their profile. You review before changes apply on Pro.',
            },
        ],
        basic: 'Portal + OTP verify + resume parsing + manual approve',
        pro: 'Everything + auto-approve + candidate edit review queue + full portal branding',
    },
    {
        tag: 'ML Matching',
        title: 'One view. Every candidate. Every role. Every score.',
        subtitle: 'The matrix tells you where to submit before you even ask.',
        accent: '#C49A3C',
        bullets: [
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="1" width="4" height="4" rx=".8" /><rect x="7" y="1" width="4" height="4" rx=".8" /><rect x="1" y="7" width="4" height="4" rx=".8" /><rect x="7" y="7" width="4" height="4" rx=".8" /></svg>,
                label: '7-signal scoring engine',
                desc: 'Skills · Experience · CTC alignment · Location · Historical placement patterns · Role urgency velocity · Candidate availability across other submissions.',
            },
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 10l3-4 2 2 2-3 3 3" /><rect x="1" y="1" width="10" height="9" rx="1" /></svg>,
                label: 'Portfolio matrix — the full picture',
                desc: 'Candidates as rows. Client jobs as columns. Every cell is a live match score. Filter, bulk-select strong matches, submit in one action.',
            },
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 1l1.5 3.1L11 4.6 8.5 7l.6 3.5L6 9 2.9 10.5 3.5 7 1 4.6l3.5-.5z" /></svg>,
                label: 'Daily digest — proactive surfacing',
                desc: 'Every morning, unactioned strong matches (>85%) surface automatically. Never miss a fit because you were too busy.',
            },
        ],
        basic: 'Skills + experience matching · candidate view + job view',
        pro: 'All 7 signals · portfolio matrix · daily digest · bulk submit',
    },
    {
        tag: 'Multi-Submit',
        title: 'One candidate. Three clients. One action.',
        subtitle: 'Each submission is independent. A hire at one closes the others.',
        accent: '#3470F0',
        bullets: [
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="3" cy="6" r="1.5" /><circle cx="9" cy="2" r="1.5" /><circle cx="9" cy="10" r="1.5" /><path d="M4.5 6H7M4.5 5.5L7 3M4.5 6.5L7 9" /></svg>,
                label: 'ML recommends where to submit',
                desc: 'Open the multi-submit modal for any bench candidate. Every active client role is scored and ranked. Top matches pre-highlighted.',
            },
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6h8M7 3l3 3-3 3" /></svg>,
                label: 'Batch submit across clients',
                desc: 'Select multiple roles. One click creates independent candidate records in each client pipeline. Clients only see their own submission — never the others.',
            },
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5" /><circle cx="6" cy="6" r="5" /></svg>,
                label: 'Auto-close on placement',
                desc: 'Hired at one client? All other open submissions close automatically. Remaining clients notified without revealing who hired.',
            },
        ],
        basic: 'Unlimited submissions · up to 3 simultaneous on free tier',
        pro: 'Unlimited simultaneous · AI recommendations · auto-close on hire',
    },
    {
        tag: 'Commission',
        title: 'First submission timestamp. Immutable. Forever.',
        subtitle: 'The record locks itself. You never chase an invoice again.',
        accent: '#C49A3C',
        bullets: [
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v8M8 2v8M2 4h8M2 8h8" /></svg>,
                label: 'Agreement builder per client',
                desc: 'Set % or flat fee. Tiered by seniority. Replacement guarantee period. Stored per client. Applied automatically on every placement.',
            },
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="10" height="7" rx="1.5" /><path d="M4 3V2M8 3V2M4 7h4" /></svg>,
                label: 'Auto-calculation on CTC confirmation',
                desc: 'Employer confirms offer CTC. Commission calculates live from the agreement on file. No spreadsheet. No rounding arguments.',
            },
            {
                svg: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="8" height="6" rx="1.5" /><path d="M4 5V3.5a2 2 0 0 1 4 0V5" /></svg>,
                label: 'Immutable record + auto invoice',
                desc: 'Locks the moment both sides confirm (or 48h auto-lock). Invoice generated and sent to both parties. Payment tracked: pending → approved → paid.',
            },
        ],
        basic: 'Commission tracking · manual agreement entry',
        pro: 'Agreement builder · tiered rates · replacement guarantee · auto-invoice',
    },
]

export default function S3_Features() {
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

    const f = FEATURES[active]

    const dashboards = [
        <BenchPortalDash key="bench" playing={active === 0 && playing} />,
        <MLMatrixDash key="ml" playing={active === 1 && playing} />,
        <MultiSubmitDash key="submit" playing={active === 2 && playing} />,
        <CommissionDash key="comm" playing={active === 3 && playing} loopProgress={active === 3 ? loopProgress : 0} />,
    ]

    return (
        <section style={{ background: '#0f2036' }}>
            <div className="wrap" style={{ paddingTop: 'clamp(40px,4vw,52px)', paddingBottom: 'clamp(56px,5vw,72px)' }}>
                <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: 'opacity .7s ease, transform .7s ease' }}>

                    {/* Header */}
                    <div style={{ maxWidth: 600, margin: '0 auto clamp(16px,2.5vw,28px)', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#C49A3C', marginBottom: 18 }}>
                            <div style={{ width: 22, height: 1, background: '#C49A3C' }} />
                            What you can do
                            <div style={{ width: 22, height: 1, background: '#C49A3C' }} />
                        </div>
                        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px,3.5vw,50px)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-1.2px', color: 'var(--text)', marginBottom: 16 }}>
                            Four systems that make<br />
                            <em style={{ fontStyle: 'italic', color: '#C49A3C' }}>your agency unstoppable.</em>
                        </h2>
                        <p style={{ fontSize: 'clamp(14px,1.05vw,16px)', color: 'var(--text2)', lineHeight: 1.75 }}>
                            Bench. Matching. Submissions. Commission. Each one solves a specific operational failure. All four ship on day one.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="s3ag-tabs">
                        {FEATURES.map((feat, i) => (
                            <button key={i} onClick={() => { setActive(i); setPlaying(false) }} className={`s3ag-tab${active === i ? ' s3ag-tab-active' : ''}`}>
                                {feat.tag}
                                {active === i && <span className="s3ag-tab-progress" style={{ width: `${loopProgress}%` }} />}
                            </button>
                        ))}
                    </div>

                    {/* Body */}
                    <div className="s3ag-body">

                        {/* Text column */}
                        <div className="s3ag-text-col">
                            <h3 className="s3ag-feature-title">{f.title}</h3>
                            <p className="s3ag-feature-subtitle" style={{ color: f.accent }}>{f.subtitle}</p>
                            <div className="s3ag-bullets">
                                {f.bullets.map((b, i) => (
                                    <div key={i} className="s3ag-bullet">
                                        <div className="s3ag-bullet-icon" style={{ color: f.accent, background: `${f.accent}12`, borderColor: `${f.accent}28` }}>{b.svg}</div>
                                        <div>
                                            <div className="s3ag-bullet-label">{b.label}</div>
                                            <div className="s3ag-bullet-desc">{b.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="s3ag-tiers">
                                {[{ tier: 'Basic', val: f.basic, gold: false }, { tier: 'Pro', val: f.pro, gold: true }].map(t => (
                                    <div key={t.tier} className={`s3ag-tier${t.gold ? ' s3ag-tier-pro' : ''}`}>
                                        <div className="s3ag-tier-dot">
                                            <Tick c={t.gold ? '#C49A3C' : '#3470F0'} />
                                        </div>
                                        <div>
                                            <span className="s3ag-tier-label">{t.tier}</span>
                                            <span className="s3ag-tier-val">{t.val}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dashboard column */}
                        <div className="s3ag-dash-col">{dashboards[active]}</div>
                    </div>

                </div>
            </div>

            <style suppressHydrationWarning>{`
                @keyframes agPulse  { 0%,100%{opacity:1} 50%{opacity:.3} }
                @keyframes agFadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
                @keyframes agSpin   { to{transform:rotate(360deg)} }
                @keyframes agBlink  { 0%,100%{opacity:1} 50%{opacity:0} }

                /* ── Tabs ── */
                .s3ag-tabs { display:flex; gap:8px; justify-content:center; flex-wrap:nowrap; overflow-x:auto; margin-bottom:32px; scrollbar-width:none; padding-bottom:2px; }
                .s3ag-tabs::-webkit-scrollbar { display:none; }
                .s3ag-tab { display:inline-flex; align-items:center; gap:6px; padding:9px 18px; border-radius:100px; font-family:'Geist',sans-serif; font-size:13px; font-weight:600; cursor:pointer; transition:all .22s; border:1.5px solid rgba(255,255,255,.09); background:rgba(255,255,255,.04); color:var(--text3); white-space:nowrap; position:relative; overflow:hidden; flex-shrink:0; }
                .s3ag-tab:hover { border-color:rgba(255,255,255,.2); color:var(--text2); background:rgba(255,255,255,.07); }
                .s3ag-tab-active { border-color:rgba(196,154,60,.55)!important; background:rgba(196,154,60,.1)!important; color:#C49A3C!important; }
                .s3ag-tab-progress { position:absolute; bottom:0; left:0; height:2px; background:#C49A3C; border-radius:0 0 100px 100px; transition:width .1s linear; pointer-events:none; }

                /* ── Body layout ── */
                .s3ag-body { display:grid; grid-template-columns:36fr 64fr; gap:clamp(24px,3.5vw,48px); align-items:stretch; }
                .s3ag-text-col { display:flex; flex-direction:column; }
                .s3ag-dash-col { display:flex; flex-direction:column; }

                /* ── Dashboard shell ── */
                .s3ag-dash { background:var(--navy2); border:1px solid rgba(255,255,255,.09); border-radius:16px; overflow:hidden; box-shadow:0 28px 70px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.04); display:flex; flex-direction:column; flex:1; min-height:360px; font-family:'Geist',sans-serif; }

                /* ── Text column ── */
                .s3ag-feature-title { font-family:'Fraunces',serif; font-size:clamp(20px,1.8vw,28px); font-weight:400; color:var(--text); line-height:1.12; letter-spacing:-0.5px; margin-bottom:6px; }
                .s3ag-feature-subtitle { font-size:clamp(12.5px,.85vw,14px); font-weight:500; margin-bottom:18px; line-height:1.5; }
                .s3ag-bullets { display:flex; flex-direction:column; gap:0; margin-bottom:18px; flex:1; }
                .s3ag-bullet { display:flex; align-items:flex-start; gap:11px; padding:10px 0; border-bottom:1px solid rgba(255,255,255,.06); }
                .s3ag-bullet:last-child { border-bottom:none; }
                .s3ag-bullet-icon { width:26px; height:26px; border-radius:7px; flex-shrink:0; border:1px solid; display:flex; align-items:center; justify-content:center; transition:transform .25s cubic-bezier(.16,1,.3,1); }
                .s3ag-bullet:hover .s3ag-bullet-icon { transform:scale(1.12); }
                .s3ag-bullet-label { font-size:clamp(12px,.82vw,13px); font-weight:700; color:var(--text); line-height:1.3; margin-bottom:2px; }
                .s3ag-bullet-desc { font-size:clamp(11px,.74vw,12px); color:var(--text2); line-height:1.55; font-weight:300; }

                /* ── Tiers ── */
                .s3ag-tiers { display:flex; flex-direction:column; gap:7px; }
                .s3ag-tier { display:flex; align-items:center; gap:9px; padding:9px 13px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); border-radius:9px; transition:background .2s, border-color .2s; }
                .s3ag-tier:hover { background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.12); }
                .s3ag-tier-pro { background:rgba(196,154,60,.07); border-color:rgba(196,154,60,.22); }
                .s3ag-tier-pro:hover { background:rgba(196,154,60,.11); border-color:rgba(196,154,60,.35); }
                .s3ag-tier-dot { width:16px; height:16px; border-radius:50%; flex-shrink:0; background:rgba(52,112,240,.14); border:1px solid rgba(52,112,240,.32); display:flex; align-items:center; justify-content:center; }
                .s3ag-tier-pro .s3ag-tier-dot { background:rgba(196,154,60,.16); border-color:rgba(196,154,60,.38); }
                .s3ag-tier-label { font-size:9px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:var(--text3); margin-right:7px; }
                .s3ag-tier-pro .s3ag-tier-label { color:rgba(196,154,60,.8); }
                .s3ag-tier-val { font-size:clamp(11px,.74vw,12px); color:var(--text2); line-height:1.4; }

                /* ── Responsive ── */
                @media (min-width:769px) and (max-width:1100px) {
                    .s3ag-body { gap:20px; grid-template-columns:38fr 62fr; }
                    .s3ag-dash { min-height:340px; }
                    .s3ag-tab  { font-size:12px; padding:9px 16px; }
                }
                @media (max-width:768px) {
                    .s3ag-body { grid-template-columns:1fr; gap:20px; }
                    .s3ag-dash-col { order:-1; }
                    .s3ag-dash { min-height:360px; }
                    .s3ag-tabs { justify-content:flex-start; margin-bottom:24px; }
                    .s3ag-tab  { font-size:12px; padding:8px 14px; }
                    .s3ag-feature-title { font-size:clamp(18px,5.5vw,24px); }
                }
                @media (max-width:480px) {
                    .s3ag-tab  { font-size:11px; padding:7px 12px; }
                    .s3ag-dash { min-height:340px; }
                    .s3ag-bullet { padding:8px 0; }
                    .s3ag-bullet-icon { width:22px; height:22px; }
                    .s3ag-tiers { gap:5px; }
                }
                @media (max-width:360px) {
                    .s3ag-tab { font-size:10px; padding:6px 10px; }
                }
            `}</style>
        </section>
    )
}
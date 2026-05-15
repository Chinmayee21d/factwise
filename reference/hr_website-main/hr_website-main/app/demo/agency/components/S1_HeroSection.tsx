'use client'

import { useEffect, useState } from 'react'
import { AG_KEYFRAMES } from './SharedItems'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const CANDIDATES = [
    {
        init: 'PS', bg: '#3470F0', name: 'Priya Sharma',
        role: 'Sr. Backend Engineer', exp: '6 yrs', ctc: '₹24L', avail: 'Immediate',
        complete: 96,
        status: 'SUBMITTED', sc: '#18B87A', sbg: 'rgba(24,184,122,.12)', sb: 'rgba(24,184,122,.35)',
        matches: [
            { client: 'TechCorp', role: 'Backend Lead', score: 94 },
            { client: 'Razorpay', role: 'Platform Eng', score: 87 },
        ],
        skills: ['Go', 'Postgres', 'K8s', 'gRPC'],
    },
    {
        init: 'RV', bg: '#8a33e0', name: 'Rahul Verma',
        role: 'Product Designer', exp: '4 yrs', ctc: '₹18L', avail: '2 weeks',
        complete: 78,
        status: 'IN REVIEW', sc: '#F79009', sbg: 'rgba(247,144,9,.10)', sb: 'rgba(247,144,9,.35)',
        matches: [
            { client: 'Swiggy', role: 'Lead Designer', score: 91 },
            { client: 'Cred', role: 'Product Design', score: 79 },
        ],
        skills: ['Figma', 'UX Research', 'Prototyping'],
    },
    {
        init: 'AM', bg: '#18B87A', name: 'Aarav Menon',
        role: 'DevOps Engineer', exp: '5 yrs', ctc: '₹22L', avail: '1 month',
        complete: 88,
        status: 'MATCHED', sc: '#C49A3C', sbg: 'rgba(196,154,60,.12)', sb: 'rgba(196,154,60,.35)',
        matches: [
            { client: 'PhonePe', role: 'SRE Lead', score: 88 },
            { client: 'Flipkart', role: 'Infra Eng', score: 74 },
        ],
        skills: ['AWS', 'Terraform', 'Prometheus', 'CI/CD'],
    },
]

const MATRIX = {
    candidates: ['Priya S.', 'Rahul V.', 'Aarav M.', 'Sneha K.'],
    jobs: [
        { client: 'TechCorp', role: 'Backend Lead' },
        { client: 'Swiggy', role: 'Lead Designer' },
        { client: 'PhonePe', role: 'SRE Lead' },
    ],
    scores: [
        [94, 12, 58],
        [18, 91, 22],
        [62, 24, 88],
        [71, 67, 45],
    ],
}

const COMMISSIONS = [
    { candidate: 'Priya Sharma', client: 'TechCorp', amount: '₹1,20,000', status: 'LOCKED', sc: '#18B87A', age: 'Today', invoice: 'INV-2025-0091' },
    { candidate: 'Aarav Menon', client: 'PhonePe', amount: '₹98,000', status: 'APPROVED', sc: '#3470F0', age: '2d ago', invoice: 'INV-2025-0088' },
    { candidate: 'Sneha Kumar', client: 'Cred', amount: '₹1,44,000', status: 'PENDING', sc: '#F79009', age: '5d ago', invoice: 'INV-2025-0084' },
]

/* ─────────────────────────────────────────
   SCORE CELL — animated fill
───────────────────────────────────────── */
function ScoreCell({ score, active }: { score: number; active: boolean }) {
    const [shown, setShown] = useState(false)
    useEffect(() => {
        if (!active) { setShown(false); return }
        const t = setTimeout(() => setShown(true), 200)
        return () => clearTimeout(t)
    }, [active])

    const color = score >= 80 ? '#18B87A' : score >= 60 ? '#C49A3C' : score >= 40 ? '#3470F0' : 'rgba(255,255,255,.18)'
    const bg = score >= 80 ? 'rgba(24,184,122,.12)' : score >= 60 ? 'rgba(196,154,60,.12)' : score >= 40 ? 'rgba(52,112,240,.1)' : 'rgba(255,255,255,.04)'
    const border = score >= 80 ? 'rgba(24,184,122,.3)' : score >= 60 ? 'rgba(196,154,60,.3)' : score >= 40 ? 'rgba(52,112,240,.22)' : 'rgba(255,255,255,.08)'

    return (
        <div style={{
            textAlign: 'center', padding: '6px 4px', borderRadius: 8,
            background: shown ? bg : 'rgba(255,255,255,.03)',
            border: `1px solid ${shown ? border : 'rgba(255,255,255,.06)'}`,
            transition: 'all .6s cubic-bezier(.16,1,.3,1)',
        }}>
            <div style={{
                fontSize: 12, fontWeight: 800, color: shown ? color : 'rgba(255,255,255,.2)',
                transition: 'color .5s ease',
                fontFamily: "'Geist',sans-serif",
            }}>{shown ? score : '—'}</div>
        </div>
    )
}

/* ─────────────────────────────────────────
   MATCH BAR
───────────────────────────────────────── */
function MatchBar({ score, client, role, active }: { score: number; client: string; role: string; active: boolean }) {
    const [w, setW] = useState(0)
    useEffect(() => {
        if (!active) { setW(0); return }
        const t = setTimeout(() => setW(score), 350)
        return () => clearTimeout(t)
    }, [active, score])
    const color = score >= 85 ? '#18B87A' : '#C49A3C'

    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10.5, color: 'var(--text2)', fontWeight: 500 }}>{client} · {role}</span>
                <span style={{ fontSize: 11, fontWeight: 800, color }}>{score}%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,.07)', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{
                    height: '100%', borderRadius: 100, width: `${w}%`, background: color,
                    transition: 'width 1.1s cubic-bezier(.16,1,.3,1)',
                    boxShadow: `0 0 8px ${color}55`,
                }} />
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────
   COMPLETENESS RING
───────────────────────────────────────── */
function Ring({ pct, color }: { pct: number; color: string }) {
    const r = 10; const circ = 2 * Math.PI * r
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" style={{ flexShrink: 0 }}>
            <circle cx="14" cy="14" r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="3" />
            <circle cx="14" cy="14" r={r} fill="none" stroke={color} strokeWidth="3"
                strokeDasharray={`${(pct / 100) * circ} ${circ}`}
                strokeLinecap="round"
                transform="rotate(-90 14 14)"
                style={{ transition: 'stroke-dasharray .9s cubic-bezier(.16,1,.3,1)' }}
            />
            <text x="14" y="18" textAnchor="middle" fontSize="7" fontWeight="700" fill={color}>{pct}</text>
        </svg>
    )
}

/* ─────────────────────────────────────────
   BENCH TAB
───────────────────────────────────────── */
function BenchTab({ ready }: { ready: boolean }) {
    const [idx, setIdx] = useState(0)
    const [fading, setFading] = useState(false)
    const c = CANDIDATES[idx]

    useEffect(() => {
        if (!ready) return
        const iv = setInterval(() => {
            setFading(true)
            setTimeout(() => { setIdx(i => (i + 1) % CANDIDATES.length); setFading(false) }, 240)
        }, 4500)
        return () => clearInterval(iv)
    }, [ready])

    const switchTo = (i: number) => {
        if (i === idx) return
        setFading(true)
        setTimeout(() => { setIdx(i); setFading(false) }, 220)
    }

    return (
        <div>
            {/* Candidate tabs */}
            <div style={{
                display: 'flex', borderBottom: '1px solid rgba(255,255,255,.05)',
                padding: '0 16px', background: 'rgba(0,0,0,.12)',
            }}>
                {CANDIDATES.map((cd, i) => (
                    <button key={i} onClick={() => switchTo(i)} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontFamily: "'Geist',sans-serif",
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '9px 10px', fontSize: 11,
                        color: idx === i ? 'var(--text)' : 'var(--text3)',
                        borderBottom: idx === i ? '2px solid var(--gold)' : '2px solid transparent',
                        transition: 'color .2s', whiteSpace: 'nowrap',
                    }}>
                        <div style={{
                            width: 14, height: 14, borderRadius: 4, background: cd.bg,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 6, fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>{cd.init}</div>
                        {cd.name.split(' ')[0]}
                    </button>
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                    <span style={{
                        fontSize: 9, color: 'var(--text3)',
                        background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.07)',
                        borderRadius: 6, padding: '2px 7px', whiteSpace: 'nowrap',
                    }}>127 in bench</span>
                </div>
            </div>

            {/* Body */}
            <div style={{
                padding: '16px 18px 18px',
                opacity: fading ? 0 : 1,
                transform: fading ? 'translateY(4px)' : 'none',
                transition: 'opacity .24s, transform .24s',
            }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10, background: c.bg,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>{c.init}</div>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', marginBottom: 1 }}>{c.name}</div>
                            <div style={{ fontSize: 10.5, color: 'var(--text3)' }}>{c.role}</div>
                        </div>
                    </div>
                    <div style={{
                        background: c.sbg, border: `1px solid ${c.sb}`, borderRadius: 6,
                        padding: '3px 9px', fontSize: 9.5, fontWeight: 800, color: c.sc,
                        letterSpacing: '.8px', flexShrink: 0,
                    }}>{c.status}</div>
                </div>

                {/* Profile completeness + meta pills */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 9px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 7 }}>
                        <Ring pct={c.complete} color={c.complete >= 90 ? '#18B87A' : '#C49A3C'} />
                        <div>
                            <div style={{ fontSize: 8, color: 'var(--text3)', marginBottom: 1 }}>Profile</div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text2)' }}>{c.complete}%</div>
                        </div>
                    </div>
                    {[{ l: 'Exp', v: c.exp }, { l: 'CTC', v: c.ctc }, { l: 'Avail', v: c.avail }].map(m => (
                        <div key={m.l} style={{ padding: '4px 9px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 7 }}>
                            <div style={{ fontSize: 8, color: 'var(--text3)', marginBottom: 1 }}>{m.l}</div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text2)' }}>{m.v}</div>
                        </div>
                    ))}
                </div>

                {/* Skills */}
                <div style={{ display: 'flex', gap: 5, marginBottom: 12, flexWrap: 'wrap' }}>
                    {c.skills.map(s => (
                        <span key={s} style={{
                            fontSize: 10, fontWeight: 500, color: 'var(--text3)',
                            background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)',
                            borderRadius: 6, padding: '2px 8px',
                        }}>{s}</span>
                    ))}
                </div>

                {/* ML Match scores */}
                <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 1.6, color: 'rgba(196,154,60,.65)', textTransform: 'uppercase', marginBottom: 8 }}>ML Match Scores</div>
                    {c.matches.map((m, i) => (
                        <MatchBar key={`${c.init}-${i}`} {...m} active={!fading && ready} />
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 7 }}>
                    <button style={{
                        flex: 1, padding: '8px 0', borderRadius: 8,
                        background: 'rgba(196,154,60,.1)', border: '1px solid rgba(196,154,60,.28)',
                        color: 'var(--gold)', fontSize: 11.5, fontWeight: 600,
                        cursor: 'pointer', fontFamily: "'Geist',sans-serif",
                        transition: 'background .2s',
                    }}>Submit to client →</button>
                    <button style={{
                        padding: '8px 14px', borderRadius: 8,
                        background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.09)',
                        color: 'var(--text3)', fontSize: 11.5, fontWeight: 600,
                        cursor: 'pointer', fontFamily: "'Geist',sans-serif",
                    }}>Profile</button>
                </div>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────
   MATRIX TAB
───────────────────────────────────────── */
function MatrixTab({ ready }: { ready: boolean }) {
    const [active, setActive] = useState(false)
    useEffect(() => {
        if (!ready) return
        const t = setTimeout(() => setActive(true), 400)
        return () => clearTimeout(t)
    }, [ready])

    return (
        <div style={{ padding: '16px 18px 18px' }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 1.8, color: 'rgba(196,154,60,.65)', textTransform: 'uppercase', marginBottom: 12 }}>
                Portfolio Match Matrix — All Candidates × Open Jobs
            </div>

            {/* Matrix grid */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px' }}>
                    <thead>
                        <tr>
                            <th style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--text3)', textAlign: 'left', padding: '0 4px 6px', whiteSpace: 'nowrap' }}></th>
                            {MATRIX.jobs.map((j, ji) => (
                                <th key={ji} style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--text3)', textAlign: 'center', padding: '0 4px 6px', whiteSpace: 'nowrap' }}>
                                    <div style={{ fontSize: 9, color: 'rgba(196,154,60,.7)', fontWeight: 700 }}>{j.client}</div>
                                    <div style={{ fontSize: 8, color: 'var(--text3)', fontWeight: 400 }}>{j.role}</div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {MATRIX.candidates.map((cand, ci) => (
                            <tr key={ci}>
                                <td style={{ fontSize: 10, color: 'var(--text2)', fontWeight: 500, padding: '0 8px 4px 0', whiteSpace: 'nowrap' }}>{cand}</td>
                                {MATRIX.scores[ci].map((score, ji) => (
                                    <td key={ji} style={{ padding: '0 0 4px' }}>
                                        <ScoreCell score={score} active={active} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
                {[{ c: '#18B87A', l: '80+ Strong' }, { c: '#C49A3C', l: '60–79 Good' }, { c: '#3470F0', l: '40–59 Fair' }].map(item => (
                    <div key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: item.c, opacity: .8 }} />
                        <span style={{ fontSize: 9.5, color: 'var(--text3)' }}>{item.l}</span>
                    </div>
                ))}
            </div>

            {/* Bulk submit nudge */}
            <div style={{ marginTop: 14, padding: '9px 12px', borderRadius: 9, background: 'rgba(196,154,60,.07)', border: '1px solid rgba(196,154,60,.2)', display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C49A3C', animation: 'agPulse 2s ease-in-out infinite', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(196,154,60,.85)' }}>3 strong matches unactioned</div>
                    <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 1 }}>Priya → TechCorp · Rahul → Swiggy · Aarav → PhonePe</div>
                </div>
                <button style={{
                    background: 'var(--gold)', color: 'var(--navy)', border: 'none',
                    fontSize: 10, fontWeight: 700, padding: '5px 10px', borderRadius: 6,
                    cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Geist',sans-serif",
                }}>Bulk Submit</button>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────
   COMMISSION TAB
───────────────────────────────────────── */
function CommissionTab() {
    const [visibleRows, setVisibleRows] = useState(0)
    useEffect(() => {
        const timers = COMMISSIONS.map((_, i) =>
            setTimeout(() => setVisibleRows(v => Math.max(v, i + 1)), 300 + i * 280)
        )
        return () => timers.forEach(clearTimeout)
    }, [])

    const total = '₹3,62,000'

    return (
        <div style={{ padding: '16px 18px 18px' }}>
            {/* Summary bar */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
                {[
                    { label: 'This month', val: total, color: '#C49A3C' },
                    { label: 'Locked', val: '₹1,20,000', color: '#18B87A' },
                    { label: 'Pending', val: '₹1,44,000', color: '#F79009' },
                ].map(s => (
                    <div key={s.label} style={{ padding: '8px 10px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 9 }}>
                        <div style={{ fontSize: 8.5, color: 'var(--text3)', marginBottom: 3 }}>{s.label}</div>
                        <div style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 400, color: s.color, lineHeight: 1 }}>{s.val}</div>
                    </div>
                ))}
            </div>

            {/* Commission rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {COMMISSIONS.map((c, i) => (
                    <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px',
                        background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)',
                        borderRadius: 9,
                        opacity: i < visibleRows ? 1 : 0,
                        transform: i < visibleRows ? 'none' : 'translateY(8px)',
                        transition: 'opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1)',
                    }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'var(--text3)', flexShrink: 0 }}>
                            {c.candidate.split(' ').map(w => w[0]).join('')}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 1 }}>{c.candidate} → {c.client}</div>
                            <div style={{ fontSize: 9, color: 'var(--text3)' }}>{c.invoice} · {c.age}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 13.5, fontWeight: 400, color: c.sc, marginBottom: 2 }}>{c.amount}</div>
                            <div style={{ fontSize: 8.5, fontWeight: 800, color: c.sc, letterSpacing: '.6px', background: `${c.sc}18`, border: `1px solid ${c.sc}40`, borderRadius: 4, padding: '1px 6px', display: 'inline-block' }}>{c.status}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 11, fontSize: 9.5, color: 'var(--text3)', textAlign: 'center' }}>
                Commission auto-calculated · immutable once locked ·{' '}
                <span style={{ color: '#18B87A', fontWeight: 600 }}>Invoice auto-generated</span>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────
   AGENCY DASHBOARD
───────────────────────────────────────── */
const TABS = ['Talent Bench', 'Portfolio Matrix', 'Commissions']

function AgencyDashboard({ ready }: { ready: boolean }) {
    const [tab, setTab] = useState(0)

    // auto-cycle tabs slowly
    useEffect(() => {
        if (!ready) return
        const iv = setInterval(() => setTab(t => (t + 1) % TABS.length), 9000)
        return () => clearInterval(iv)
    }, [ready])

    return (
        <div style={{
            background: 'var(--navy2)',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.03)',
            width: '100%',
        }}>
            {/* Titlebar */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,.06)',
                background: 'rgba(0,0,0,.22)',
            }}>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['#FF5F57', '#FFBD2E', '#28C840'].map(col => (
                        <div key={col} style={{ width: 9, height: 9, borderRadius: '50%', background: col }} />
                    ))}
                </div>
                <span style={{ fontSize: 10.5, color: 'var(--text3)' }}>HR Ops — Agency Workspace</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#18B87A', animation: 'agPulse 2s ease-in-out infinite' }} />
                    <span style={{ fontSize: 9.5, color: '#18B87A' }}>Live · 127 on bench</span>
                </div>
            </div>

            {/* Tab bar */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,.1)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                {TABS.map((t, i) => (
                    <button key={i} onClick={() => setTab(i)} style={{
                        flex: 1, background: 'none', border: 'none', cursor: 'pointer',
                        fontFamily: "'Geist',sans-serif", padding: '9px 4px',
                        fontSize: 10.5, fontWeight: tab === i ? 700 : 400,
                        color: tab === i ? 'var(--gold)' : 'var(--text3)',
                        borderBottom: tab === i ? '2px solid var(--gold)' : '2px solid transparent',
                        transition: 'color .2s',
                    }}>{t}</button>
                ))}
            </div>

            {/* Tab content */}
            <div style={{ minHeight: 280 }}>
                {tab === 0 && <BenchTab ready={ready} />}
                {tab === 1 && <MatrixTab ready={ready} />}
                {tab === 2 && <CommissionTab />}
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────
   FLOATING CARD
───────────────────────────────────────── */
function FloatCard({ delay, floatAnim, style: extra, children }: {
    delay: number; floatAnim: string; style?: React.CSSProperties; children: React.ReactNode
}) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        const t = setTimeout(() => setShow(true), delay)
        return () => clearTimeout(t)
    }, [delay])

    return (
        <div style={{
            position: 'absolute',
            background: 'rgba(13,23,46,.94)', backdropFilter: 'blur(22px)',
            border: '1px solid rgba(255,255,255,.1)', borderRadius: 14,
            boxShadow: '0 16px 44px rgba(0,0,0,.48), 0 0 0 1px rgba(255,255,255,.03)',
            padding: '10px 13px', fontFamily: "'Geist',sans-serif", zIndex: 20,
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)',
            animation: show ? `${floatAnim} ease-in-out infinite` : 'none',
            ...extra,
        }}>
            {children}
        </div>
    )
}

/* ─────────────────────────────────────────
   STAT PILL
───────────────────────────────────────── */
function StatPill({ icon, label, val, delay }: { icon: React.ReactNode; label: string; val: string; delay: number }) {
    const [show, setShow] = useState(false)
    useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t) }, [delay])
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 14px', background: 'rgba(255,255,255,.04)',
            border: '1px solid rgba(255,255,255,.08)', borderRadius: 11,
            opacity: show ? 1 : 0, transform: show ? 'none' : 'translateY(10px)',
            transition: 'opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1)',
        }}>
            <div style={{ color: 'var(--gold)', flexShrink: 0 }}>{icon}</div>
            <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', lineHeight: 1, fontFamily: "'Fraunces',serif" }}>{val}</div>
                <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 1 }}>{label}</div>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────
   HERO EXPORT
───────────────────────────────────────── */
export default function S1_Hero() {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        const t = setTimeout(() => setReady(true), 80)
        return () => clearTimeout(t)
    }, [])

    return (
        <section className="agh-section" style={{ background: 'var(--navy)', position: 'relative', overflow: 'visible' }}>

            {/* ── Background ── */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{
                    position: 'absolute', inset: '-60%',
                    backgroundImage: 'linear-gradient(rgba(196,154,60,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(196,154,60,.055) 1px,transparent 1px)',
                    backgroundSize: '72px 72px',
                    animation: 'agDrift 60s linear infinite',
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 28% 55%, rgba(196,154,60,.06) 0%, transparent 55%), radial-gradient(ellipse at 78% 18%, rgba(52,112,240,.04) 0%, transparent 50%)',
                }} />
                <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', background: 'rgba(196,154,60,.065)', bottom: -140, right: -140, filter: 'blur(80px)', animation: 'agOrbFloat 22s 3s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', background: 'rgba(52,112,240,.18)', top: '40%', left: '55%', filter: 'blur(80px)', animation: 'agOrbFloat 32s 6s ease-in-out infinite' }} />
                <div className="data-line" style={{ top: '18%', width: '42%', left: '-5%', animationDelay: '-2.0s', animationDuration: '9s' }} />
                <div className="data-line" style={{ top: '33%', width: '36%', left: '10%', animationDelay: '-5.5s', animationDuration: '11s' }} />
                <div className="data-line" style={{ top: '48%', width: '52%', left: '-8%', animationDelay: '-1.2s', animationDuration: '8s' }} />
                <div className="data-line" style={{ top: '62%', width: '38%', left: '5%', animationDelay: '-7.0s', animationDuration: '10s' }} />
                <div className="data-line" style={{ top: '75%', width: '44%', left: '-3%', animationDelay: '-3.8s', animationDuration: '12s' }} />
                <div className="data-line" style={{ top: '88%', width: '30%', left: '15%', animationDelay: '-6.0s', animationDuration: '9s' }} />
            </div>

            {/* ── Content ── */}
            <div className="wrap agh-wrap" style={{ position: 'relative', zIndex: 1 }}>
                <div className="agh-grid">

                    {/* ── LEFT ── */}
                    <div className="agh-left" style={{
                        opacity: ready ? 1 : 0,
                        transform: ready ? 'none' : 'translateY(24px)',
                        transition: 'opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)',
                    }}>
                        {/* Badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 7,
                            fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
                            color: 'var(--gold)', background: 'rgba(196,154,60,.1)',
                            border: '1px solid rgba(196,154,60,.28)', borderRadius: 100,
                            padding: '4px 14px', marginBottom: 24,
                        }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', animation: 'agPulse 2s ease-in-out infinite' }} />
                            For Recruitment Agencies
                        </div>

                        {/* Headline */}
                        <h1 style={{
                            fontFamily: "'Fraunces',serif",
                            fontSize: 'clamp(32px,4.2vw,56px)',
                            fontWeight: 400, lineHeight: 1.08, letterSpacing: '-1.4px',
                            color: 'var(--text)', marginBottom: 18,
                        }}>
                            Your bench.<br />
                            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Always matched.</em><br />
                            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,.5)', fontSize: '0.78em' }}>Commission auto-locked.</em>
                        </h1>

                        {/* Subtext */}
                        <p style={{
                            fontSize: 'clamp(13px,1.05vw,16px)', color: 'var(--text2)',
                            lineHeight: 1.72, marginBottom: 28, maxWidth: 420,
                        }}>
                            A private talent bench candidates update themselves. ML matching across every client role simultaneously. Commission calculated and locked the moment a hire confirms.
                        </p>

                        {/* CTAs */}
                        <div className="agh-ctas" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <a href="/demo/agency" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                background: 'var(--gold)', color: 'var(--navy)',
                                fontWeight: 700, fontSize: 13.5, padding: '12px 22px',
                                borderRadius: 12, textDecoration: 'none',
                                transition: 'all .2s', whiteSpace: 'nowrap',
                                boxShadow: '0 6px 24px rgba(196,154,60,.3)',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
                            >
                                View Agency Demo <span style={{ fontSize: 15 }}>→</span>
                            </a>
                            <a href="#bench" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                background: 'rgba(196,154,60,.1)', color: 'var(--gold)',
                                fontWeight: 600, fontSize: 13.5, padding: '12px 22px',
                                borderRadius: 12, textDecoration: 'none',
                                border: '1.5px solid rgba(196,154,60,.3)', transition: 'background .2s',
                                whiteSpace: 'nowrap',
                            }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(196,154,60,.18)'}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(196,154,60,.1)'}
                            >
                                How it works
                            </a>
                        </div>
                    </div>

                    {/* ── RIGHT ── */}
                    <div className="agh-right" style={{
                        position: 'relative',
                        opacity: ready ? 1 : 0,
                        transform: ready ? 'none' : 'translateY(32px)',
                        transition: 'opacity .8s ease .2s, transform .8s cubic-bezier(.16,1,.3,1) .2s',
                        paddingTop: 32, paddingBottom: 44,
                    }}>
                        <AgencyDashboard ready={ready} />

                        {/* Float 1 — new self-registered candidate */}
                        <FloatCard delay={1000} floatAnim="agFloatA 6s 1.5s" style={{ top: 6, right: -12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: 7,
                                    background: 'rgba(196,154,60,.14)', border: '1px solid rgba(196,154,60,.32)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', marginBottom: 1 }}>New bench candidate</div>
                                    <div style={{ fontSize: 9.5, color: 'var(--text3)' }}>Kiran T. · Self-registered via portal</div>
                                </div>
                                <div style={{ marginLeft: 4, width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, animation: 'agPulse 2s ease-in-out infinite' }} />
                            </div>
                        </FloatCard>

                        {/* Float 2 — commission locked */}
                        <FloatCard delay={1800} floatAnim="agFloatB 7s 2s" style={{ bottom: 6, left: -12, minWidth: 220 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.4, color: 'rgba(196,154,60,.75)', textTransform: 'uppercase' }}>Commission Locked</div>
                                <div style={{ fontSize: 8.5, fontWeight: 800, color: '#18B87A', background: 'rgba(24,184,122,.12)', border: '1px solid rgba(24,184,122,.3)', padding: '2px 6px', borderRadius: 5 }}>IMMUTABLE</div>
                            </div>
                            <div style={{ fontSize: 10.5, color: 'var(--text2)', marginBottom: 4 }}>Priya Sharma → TechCorp</div>
                            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 400, color: 'var(--gold)', lineHeight: 1 }}>₹1,20,000</div>
                            <div style={{ fontSize: 8.5, color: 'var(--text3)', marginTop: 4 }}>Invoice auto-generated · sent to both parties</div>
                        </FloatCard>

                        {/* Float 3 — client claimed */}
                        <FloatCard delay={2600} floatAnim="agFloatC 8s 2.5s" style={{ bottom: 6, right: -12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: 7,
                                    background: 'rgba(24,184,122,.12)', border: '1px solid rgba(24,184,122,.3)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#18B87A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', marginBottom: 1 }}>Client claimed account</div>
                                    <div style={{ fontSize: 9.5, color: 'var(--text3)' }}>TechCorp · Slot billing freed</div>
                                </div>
                            </div>
                        </FloatCard>
                    </div>
                </div>
            </div>

            <style suppressHydrationWarning>{`
                ${AG_KEYFRAMES}

                .agh-wrap {
                    padding-top: clamp(110px, 13vw, 160px) !important;
                    padding-bottom: clamp(80px, 10vw, 120px) !important;
                }

                .agh-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: clamp(28px, 4vw, 56px);
                    align-items: center;
                }

                @media (max-width: 900px) {
                    .agh-grid { grid-template-columns: 1fr; }
                    .agh-right { display: none; }
                    .agh-wrap { padding-top: 130px !important; }
                    .agh-left {
                        text-align: center !important;
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                    }
                    .agh-left h1 {
                        font-size: clamp(30px, 8vw, 46px) !important;
                        text-align: center !important;
                    }
                    .agh-left p {
                        text-align: center !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    .agh-ctas { justify-content: center !important; }
                }

                @media (max-width: 480px) {
                    .agh-wrap {
                        padding-top: 100px !important;
                        padding-bottom: 40px !important;
                        padding-left: 20px !important;
                        padding-right: 20px !important;
                    }
                    .agh-left > div:first-child { margin-bottom: 16px !important; }
                    .agh-left h1 {
                        font-size: clamp(22px, 7.5vw, 30px) !important;
                        line-height: 1.2 !important;
                        letter-spacing: -0.4px !important;
                        margin-bottom: 12px !important;
                    }
                    .agh-left p {
                        font-size: 14px !important;
                        line-height: 1.6 !important;
                        margin-bottom: 24px !important;
                    }
                    .agh-ctas { gap: 8px !important; }
                    .agh-ctas a {
                        font-size: 13px !important;
                        padding: 10px 16px !important;
                        border-radius: 10px !important;
                    }
                }
            `}</style>
        </section>
    )
}
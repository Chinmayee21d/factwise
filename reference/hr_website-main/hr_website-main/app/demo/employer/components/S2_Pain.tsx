'use client'

import { useRef, useState, useEffect } from 'react'
import { useReveal } from './SharedItems'

const PAINS = [
    {
        accent: '#1B50D4',
        accentRgb: '27,80,212',
        problem: '347 applications.',
        relief: "You've read 12.",
        detail: "The right person is in there. You just don't have time to find them.",
        fixTitle: 'AI screens every one.',
        fix: 'Proceed / Maybe / Decline with full reasoning — before you open a single resume.',
        stats: [{ label: 'Screen time', was: '2 days', now: '4 mins' }, { label: 'Manual reads', was: '347', now: '0' }],
        icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
    },
    {
        accent: '#C49A3C',
        accentRgb: '196,154,60',
        problem: '6 panel interviews.',
        relief: '3 feedback forms. All say "good culture fit."',
        detail: "You can't decide. You book another round. The candidate drops out.",
        fixTitle: 'Structured rubrics. Variance flagged.',
        fix: 'Every interviewer scores the same criteria. Disagreements surface before any decision is made.',
        stats: [{ label: 'Feedback quality', was: 'vague', now: 'scored' }, { label: 'Decision time', was: '4 rounds', now: '1 round' }],
        icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        accent: '#18B87A',
        accentRgb: '24,184,122',
        problem: 'Agency says they submitted Priya first.',
        relief: "No timestamp. Now there's a dispute.",
        detail: 'Two agencies, one candidate, no record. A win turns into a negotiation.',
        fixTitle: 'Immutable timestamps. Zero disputes.',
        fix: 'Commission auto-calculated the moment the offer is confirmed. First-submission record locked permanently.',
        stats: [{ label: 'Disputes', was: '3/month', now: '0' }, { label: 'Commission calc', was: 'manual', now: 'instant' }],
        icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
]

function PainCard({ pain, index, sectionVisible }: {
    pain: typeof PAINS[0]
    index: number
    sectionVisible: boolean
}) {
    const [flipped, setFlipped] = useState(false)
    const [barW, setBarW] = useState(0)
    const cardRef = useRef<HTMLDivElement>(null)

    // 3D tilt on hover
    useEffect(() => {
        const el = cardRef.current
        if (!el) return
        const mv = (e: MouseEvent) => {
            if (flipped) return
            const r = el.getBoundingClientRect()
            const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -5
            const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 5
            el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`
        }
        const lv = () => {
            el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
        }
        el.addEventListener('mousemove', mv)
        el.addEventListener('mouseleave', lv)
        return () => {
            el.removeEventListener('mousemove', mv)
            el.removeEventListener('mouseleave', lv)
        }
    }, [flipped])

    // animate progress bar when flipped
    useEffect(() => {
        if (flipped) {
            const t = setTimeout(() => setBarW(100), 120)
            return () => clearTimeout(t)
        } else {
            setBarW(0)
        }
    }, [flipped])

    return (
        <div
            ref={cardRef}
            className="pain-card"
            onClick={() => setFlipped(f => !f)}
            style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(36px)',
                transition: `opacity .65s ease ${index * 0.13}s, transform .65s cubic-bezier(.16,1,.3,1) ${index * 0.13}s`,
            }}
        >
            {/* topbar on card shell — clipped by card overflow:hidden, not defeated by perspective */}
            <div className="pain-topbar" style={{ background: `linear-gradient(90deg, rgba(${pain.accentRgb},1), rgba(${pain.accentRgb},.2))` }} />

            {/* ── FRONT ── */}
            <div className={`pain-face pain-front${flipped ? ' pain-hidden' : ''}`}>
                <div className="pain-icon-wrap" style={{ background: `rgba(${pain.accentRgb},.09)`, border: `1px solid rgba(${pain.accentRgb},.2)`, color: pain.accent }}>
                    {pain.icon}
                </div>

                <div className="pain-problem">{pain.problem}</div>
                <div className="pain-relief" style={{ color: pain.accent }}>{pain.relief}</div>
                <p className="pain-detail">{pain.detail}</p>

                <div className="pain-cta" style={{ color: pain.accent, borderColor: `rgba(${pain.accentRgb},.18)` }}>
                    See how HR Ops fixes this
                    <span className="pain-cta-arrow">
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 6h8M7 3l3 3-3 3" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* ── BACK ── */}
            <div
                className={`pain-face pain-back${flipped ? '' : ' pain-hidden'}`}
                style={{ background: `rgba(${pain.accentRgb},.06)`, borderColor: `rgba(${pain.accentRgb},.28)` }}
            >
                {/* solved badge */}
                <div className="pain-solved-row">
                    <div className="pain-solved-dot" style={{ background: `rgba(${pain.accentRgb},.14)`, border: `1px solid rgba(${pain.accentRgb},.32)`, color: pain.accent }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="2,6.5 4.5,9 10,3" />
                        </svg>
                    </div>
                    <span className="pain-solved-label" style={{ color: pain.accent }}>Fixed by HR Ops</span>
                </div>

                {/* fix title */}
                <div className="pain-fix-title" style={{ color: `rgba(${pain.accentRgb},.92)` }}>{pain.fixTitle}</div>

                {/* animated improvement bar */}
                <div className="pain-bar-track" style={{ background: `rgba(${pain.accentRgb},.12)` }}>
                    <div className="pain-bar-fill" style={{
                        background: `rgba(${pain.accentRgb},.7)`,
                        width: `${barW}%`,
                        transition: 'width 1.1s cubic-bezier(.16,1,.3,1)',
                    }} />
                </div>

                {/* fix body */}
                <p className="pain-fix-body">{pain.fix}</p>

                {/* stats */}
                <div className="pain-stats">
                    {pain.stats.map((s, i) => (
                        <div key={i} className="pain-stat" style={{ background: `rgba(${pain.accentRgb},.07)`, border: `1px solid rgba(${pain.accentRgb},.16)` }}>
                            <div className="pain-stat-label" style={{ color: `rgba(${pain.accentRgb},.6)` }}>{s.label}</div>
                            <div className="pain-stat-row">
                                <span className="pain-stat-was">{s.was}</span>
                                <svg width="10" height="8" viewBox="0 0 12 10" fill="none" stroke={pain.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .65, flexShrink: 0 }}>
                                    <path d="M2 5h8M7 2l3 3-3 3" />
                                </svg>
                                <span className="pain-stat-now" style={{ color: pain.accent }}>{s.now}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* back CTA */}
                <div className="pain-cta" style={{ color: `rgba(${pain.accentRgb},.5)`, borderColor: `rgba(${pain.accentRgb},.15)`, marginTop: 14 }}>
                    Back
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 6H2M5 3L2 6l3 3" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default function S2_Pain() {
    const { ref, visible } = useReveal(0.08)

    return (
        <>
            <style suppressHydrationWarning>{`
            .pain-section {
                background: var(--cream);
                position: relative;
                overflow: hidden;
            }
            .pain-section::before {
                content: '';
                position: absolute;
                inset: 0;
                background-image: radial-gradient(circle, rgba(12,24,40,.03) 1px, transparent 1px);
                background-size: 28px 28px;
                pointer-events: none;
            }
            .pain-section .wrap {
                padding-top: 72px !important;
                padding-bottom: 72px !important;
            }

            .pain-header { max-width: 520px; margin-bottom: 48px; }

            .pain-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 18px;
                align-items: stretch;
            }

            /* card shell — stretches to tallest sibling */
            .pain-card {
                position: relative;
                border-radius: 20px;
                cursor: pointer;
                will-change: transform;
                transition: transform .14s cubic-bezier(.16,1,.3,1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            /* face — fills full card height */
            .pain-face {
                border-radius: 20px;
                padding: 24px 24px 20px;
                display: flex;
                flex-direction: column;
                flex: 1;
                background: #ffffff;
                border: 1px solid rgba(12,24,40,.08);
                box-shadow: 0 1px 4px rgba(12,24,40,.05), 0 4px 16px rgba(12,24,40,.04);
                overflow: hidden;
                transition: opacity .3s ease, transform .3s ease, box-shadow .25s ease;
            }

            /* hidden face is absolute so visible face controls height */
            .pain-hidden {
                position: absolute;
                inset: 0;
                opacity: 0;
                pointer-events: none;
                transform: scale(.97) translateY(4px);
            }

            .pain-back { border-width: 1.5px; }

            /* hover lift + glow on front */
            .pain-card:hover .pain-front:not(.pain-hidden) {
                box-shadow: 0 8px 32px rgba(12,24,40,.1), 0 2px 8px rgba(12,24,40,.06);
                transform: translateY(-2px);
            }

            /* top accent bar — on card shell, clipped by card overflow:hidden */
            .pain-topbar {
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 3px;
                z-index: 10;
                pointer-events: none;
            }

            /* icon top right */
            .pain-icon-wrap {
                width: 34px; height: 34px;
                border-radius: 10px;
                display: flex; align-items: center; justify-content: center;
                align-self: flex-end;
                margin-bottom: 18px;
                transition: transform .3s cubic-bezier(.16,1,.3,1);
            }
            .pain-card:hover .pain-icon-wrap { transform: scale(1.12) rotate(-6deg); }

            /* FRONT */
            .pain-problem {
                font-family: 'Fraunces', serif;
                font-size: clamp(20px, 1.6vw, 26px);
                font-weight: 400;
                color: var(--ink);
                line-height: 1.15;
                letter-spacing: -.3px;
                margin-bottom: 5px;
            }
            .pain-relief {
                font-family: 'Fraunces', serif;
                font-size: clamp(13.5px, 1.05vw, 16px);
                font-weight: 300;
                font-style: italic;
                line-height: 1.3;
                margin-bottom: 10px;
            }
            .pain-detail {
                font-size: clamp(12px, .82vw, 13.5px);
                color: var(--ink3);
                line-height: 1.68;
                font-weight: 300;
                margin: 0 0 18px;
                flex: 1;
            }

            /* BACK */
            .pain-solved-row {
                display: flex; align-items: center; gap: 8px;
                margin-bottom: 11px;
            }
            .pain-solved-dot {
                width: 22px; height: 22px; border-radius: 6px;
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0;
            }
            .pain-solved-label {
                font-size: 9.5px; font-weight: 700;
                letter-spacing: 1.5px; text-transform: uppercase;
            }
            .pain-fix-title {
                font-family: 'Fraunces', serif;
                font-size: clamp(16px, 1.25vw, 20px);
                font-weight: 400;
                line-height: 1.18;
                letter-spacing: -.2px;
                margin-bottom: 10px;
            }

            /* animated improvement bar */
            .pain-bar-track {
                height: 3px; border-radius: 100px;
                overflow: hidden; margin-bottom: 12px;
            }
            .pain-bar-fill {
                height: 100%; border-radius: 100px;
                width: 0%;
            }

            .pain-fix-body {
                font-size: clamp(12.5px, .85vw, 14px);
                color: var(--ink2);
                line-height: 1.7;
                font-weight: 400;
                margin: 0 0 14px;
                flex: 1;
            }

            /* stats grid */
            .pain-stats {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
                margin-bottom: 2px;
            }
            .pain-stat {
                border-radius: 9px;
                padding: 8px 10px;
            }
            .pain-stat-label {
                font-size: 9px; font-weight: 700;
                letter-spacing: 1px; text-transform: uppercase;
                margin-bottom: 5px;
            }
            .pain-stat-row {
                display: flex; align-items: center; gap: 5px; flex-wrap: wrap;
            }
            .pain-stat-was {
                font-size: 11px; font-weight: 600;
                color: #dc2626; background: #fef2f2;
                padding: 1px 6px; border-radius: 4px;
                white-space: nowrap;
            }
            .pain-stat-now {
                font-size: 11px; font-weight: 700;
                white-space: nowrap;
            }

            /* shared CTA row */
            .pain-cta {
                display: flex; align-items: center; gap: 6px;
                font-size: 11px; font-weight: 700; letter-spacing: .2px;
                padding-top: 12px;
                border-top: 1px solid;
                transition: gap .2s;
            }
            .pain-card:hover .pain-cta { gap: 9px; }

            /* arrow pulse on front CTA */
            .pain-cta-arrow {
                display: flex; align-items: center;
                animation: painArrow 2s ease-in-out infinite;
            }
            @keyframes painArrow {
                0%,100% { transform: translateX(0); }
                50%      { transform: translateX(3px); }
            }

            /* card entrance animation */
            @keyframes painCardIn {
                from { opacity: 0; transform: translateY(36px); }
                to   { opacity: 1; transform: translateY(0); }
            }

            /* responsive */
            @media (max-width: 960px) {
                .pain-grid { gap: 14px; }
                .pain-problem { font-size: clamp(18px, 2.2vw, 23px); }
            }
            @media (max-width: 760px) {
                .pain-grid { grid-template-columns: 1fr; max-width: 460px; gap: 12px; }
                .pain-header { margin-bottom: 36px; }
            }
            @media (max-width: 600px) {
                .pain-section .wrap { padding-top: 52px !important; padding-bottom: 52px !important; }
                .pain-face { padding: 18px 18px 16px; }
                .pain-problem { font-size: clamp(18px, 5.5vw, 22px); }
                .pain-relief  { font-size: 14px; }
                .pain-stats   { grid-template-columns: 1fr 1fr; }
            }
        `}</style>

            <section className="pain-section">
                <div className="wrap">
                    <div ref={ref}>
                        <div
                            className="pain-header"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'none' : 'translateY(22px)',
                                transition: 'opacity .65s ease, transform .65s ease',
                            }}
                        >
                            <div className="eyebrow eyebrow-dark">
                                <div className="ey-line" />Sound familiar?
                            </div>
                            <h2 className="h2 h2-ink" style={{ marginBottom: 14 }}>
                                Three problems every<br />
                                <em>hiring team hits.</em>
                            </h2>
                            <p className="lead lead-ink">
                                HR Ops was built to solve exactly these. Tap any card to see how.
                            </p>
                        </div>

                        <div className="pain-grid">
                            {PAINS.map((pain, i) => (
                                <PainCard
                                    key={i}
                                    pain={pain}
                                    index={i}
                                    sectionVisible={visible}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

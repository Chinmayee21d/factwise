'use client'

import { useEffect, useRef } from 'react'
import { useReveal } from './SharedItems'

export default function AgencySection() {
    const { ref, visible } = useReveal()

    /* ── Per-card 3D tilt refs ────────────────────────────── */
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        type H = { el: HTMLDivElement; mv: (e: MouseEvent) => void; lv: () => void }
        const hs: H[] = []

        cardRefs.current.forEach((el) => {
            if (!el) return
            const spot = el.querySelector<HTMLElement>('.ag-spot')

            const mv = (e: MouseEvent) => {
                const r = el.getBoundingClientRect()
                const x = e.clientX - r.left
                const y = e.clientY - r.top
                const rx = ((y - r.height / 2) / r.height) * -7
                const ry = ((x - r.width / 2) / r.width) * 7
                el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.015)`
                if (spot) {
                    spot.style.background = `radial-gradient(260px circle at ${x}px ${y}px, rgba(12,24,40,.07) 0%, transparent 65%)`
                    spot.style.opacity = '1'
                }
            }
            const lv = () => {
                el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)'
                if (spot) spot.style.opacity = '0'
            }
            el.addEventListener('mousemove', mv)
            el.addEventListener('mouseleave', lv)
            hs.push({ el, mv, lv })
        })
        return () => hs.forEach(({ el, mv, lv }) => {
            el.removeEventListener('mousemove', mv)
            el.removeEventListener('mouseleave', lv)
        })
    }, [visible]) // re-attach after reveal

    const cards = [
        {
            num: '01',
            title: 'Add agencies to your pipeline',
            body: 'Add any agency via the HeadhunterNode in the pipeline builder. They get a submission portal invite and submit candidates directly into your chosen stage. Each agency sees only their own submissions.',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 2a8 8 0 1 1 0 16A8 8 0 0 1 10 2Z" />
                    <path d="M10 6v5l3 2" />
                </svg>
            ),
            accentRgb: '52,112,240',
            accentHex: '#3470F0',
            shimmer: 'rgba(52,112,240,.5)',
        },
        {
            num: '02',
            title: 'You own all the data, unconditionally',
            body: 'You pay — you own. Agencies get access while the relationship is active. Remove an agency and access is revoked instantly. Every candidate, pipeline record, and commission history stays with you.',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="9" width="12" height="9" rx="2.5" />
                    <path d="M7 9V6.5a3 3 0 0 1 6 0V9" />
                </svg>
            ),
            accentRgb: '196,154,60',
            accentHex: '#C49A3C',
            shimmer: 'rgba(196,154,60,.6)',
        },
        {
            num: '03',
            title: 'Switch agencies with zero friction',
            body: 'Remove Agency A — access revoked immediately. Add Agency B — standard invite. Continue without interruption. Your pipeline, candidates, and commission history are completely untouched.',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h12M13 4l3 3-3 3M16 13H4M7 16l-3-3 3-3" />
                </svg>
            ),
            accentRgb: '24,184,122',
            accentHex: '#18B87A',
            shimmer: 'rgba(24,184,122,.5)',
        },
    ]

    return (
        <>
            <style suppressHydrationWarning>{`
            /* ── Section — override .wrap's 64px padding ── */
            .ag-section { background: #142338; position: relative; overflow: hidden; }
            .ag-section .wrap {
                padding-top: 52px !important;
                padding-bottom: 88px !important;
            }

            /* ── Header ─────────────────────────────────── */
            .ag-header {
                text-align: center;
                max-width: 560px;
                margin: 0 auto 40px;
            }

            /* ── Grid ───────────────────────────────────── */
            .ag-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
            }

            /* ── Card ───────────────────────────────────── */
            .ag-card {
                background: var(--cream);
                border: 1px solid rgba(12,24,40,.08);
                border-radius: 20px;
                padding: 26px 24px 28px;
                position: relative;
                overflow: hidden;
                cursor: default;
                transform-style: preserve-3d;
                will-change: transform;
                transition:
                    transform .14s cubic-bezier(.16,1,.3,1),
                    box-shadow .28s ease,
                    border-color .22s ease;
                box-shadow:
                    0 2px 12px rgba(0,0,0,.12),
                    0 1px 3px rgba(0,0,0,.07);
            }

            /* cursor spotlight */
            .ag-spot {
                position: absolute; inset: 0; border-radius: 20px;
                pointer-events: none; z-index: 0;
                opacity: 0; transition: opacity .3s;
            }

            /* top shimmer line grows on hover */
            .ag-shimmer {
                position: absolute;
                top: 0; left: 0; right: 0; height: 2px;
                border-radius: 20px 20px 0 0;
                transform: scaleX(0); transform-origin: left;
                transition: transform .48s cubic-bezier(.22,1,.36,1);
                z-index: 3; pointer-events: none;
            }
            .ag-card:hover .ag-shimmer { transform: scaleX(1); }

            /* deeper shadow + border lift on hover */
            .ag-card:hover {
                box-shadow:
                    0 22px 52px rgba(0,0,0,.18),
                    0 6px 16px rgba(0,0,0,.10);
                border-color: rgba(12,24,40,.14);
            }

            /* ambient orb bottom-left, fades in on hover */
            .ag-orb {
                position: absolute;
                bottom: -60px; left: -60px;
                width: 200px; height: 200px;
                border-radius: 50%;
                filter: blur(48px);
                pointer-events: none; z-index: 0;
                opacity: 0;
                transition: opacity .45s ease, transform .55s ease;
            }
            .ag-card:hover .ag-orb { opacity: 1; transform: scale(1.2); }

            /* card inner — sits above spotlight/orb */
            .ag-inner { position: relative; z-index: 2; }

            /* icon */
            .ag-icon {
                width: 40px; height: 40px; border-radius: 11px;
                display: flex; align-items: center; justify-content: center;
                margin-bottom: 16px; flex-shrink: 0;
                transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s;
            }
            .ag-card:hover .ag-icon {
                transform: scale(1.12) rotate(-5deg);
            }

            /* number */
            .ag-num {
                font-family: 'Fraunces', serif;
                font-size: 28px; font-weight: 300;
                line-height: 1; margin-bottom: 8px;
                transition: letter-spacing .25s ease;
            }
            .ag-card:hover .ag-num { letter-spacing: 1px; }

            /* accent rule — grows on hover */
            .ag-rule {
                width: 24px; height: 1.5px; border-radius: 2px;
                margin-bottom: 12px;
                transition: width .32s cubic-bezier(.22,1,.36,1);
            }
            .ag-card:hover .ag-rule { width: 44px; }

            .ag-title {
                font-size: clamp(13.5px, 1vw, 15.5px);
                font-weight: 700; color: var(--ink);
                margin-bottom: 9px; line-height: 1.35;
                transition: color .2s;
            }

            .ag-body {
                font-size: clamp(12px, .82vw, 13.5px);
                color: var(--ink3); line-height: 1.72; font-weight: 300;
            }

            /* ── Responsive ──────────────────────────────── */
            @media (max-width: 900px) {
                .ag-section .wrap { padding-top: 44px !important; padding-bottom: 44px !important; }
                .ag-header { margin-bottom: 32px; }
                .ag-grid { gap: 13px; }
                .ag-title { font-size: clamp(13px,.95vw,15px); }
                .ag-body  { font-size: clamp(11.5px,.8vw,13px); }
            }

            @media (max-width: 760px) {
                /* 2-col on tablet */
                .ag-grid { grid-template-columns: 1fr 1fr; }
                /* third card spans full width */
                .ag-card:last-child { grid-column: span 2; max-width: 400px; margin: 0 auto; width: 100%; }
                .ag-header .h2 { font-size: clamp(26px, 6vw, 34px) !important; }
                .ag-header .lead { font-size: clamp(13px, 3.5vw, 15px) !important; }
            }

            @media (max-width: 520px) {
                .ag-section .wrap { padding-top: 36px !important; padding-bottom: 36px !important; }
                .ag-header { margin-bottom: 24px; }
                .ag-header .h2 { font-size: clamp(22px, 7vw, 28px) !important; margin-bottom: 10px; }
                .ag-header .lead { font-size: 13.5px !important; line-height: 1.6; }
                /* single column on mobile */
                .ag-grid { grid-template-columns: 1fr; gap: 10px; }
                .ag-card:last-child { grid-column: span 1; max-width: none; }
                .ag-card { padding: 18px 16px 20px; border-radius: 16px; }
                .ag-icon { width: 34px; height: 34px; border-radius: 9px; margin-bottom: 11px; }
                .ag-icon svg { width: 17px; height: 17px; }
                .ag-num  { font-size: 22px; margin-bottom: 6px; }
                .ag-rule { margin-bottom: 9px; }
                .ag-title { font-size: 13.5px; margin-bottom: 7px; }
                .ag-body  { font-size: 12px; line-height: 1.65; }
            }
        `}</style>

            <section className="ag-section">
                <div className="wrap">
                    <div ref={ref}>

                        {/* Header */}
                        <div className="ag-header" style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'none' : 'translateY(22px)',
                            transition: 'opacity .65s ease, transform .65s ease',
                        }}>
                            <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 16 }}>
                                <div className="ey-line" />Agency relationships
                            </div>
                            <h2 className="h2" style={{ marginBottom: 14 }}>
                                Add any agency. Own all the data.<br /><em>Switch without friction.</em>
                            </h2>
                            <p className="lead" style={{ maxWidth: 460, margin: '0 auto' }}>
                                Whoever pays, owns. You pay — everything is yours, unconditionally.
                            </p>
                        </div>

                        {/* Cards */}
                        <div className="ag-grid">
                            {cards.map((c, i) => (
                                <div
                                    key={i}
                                    className="ag-card"
                                    ref={el => { cardRefs.current[i] = el }}
                                    style={{
                                        opacity: visible ? 1 : 0,
                                        transition: `opacity .65s ease ${i * 0.1}s, transform .14s cubic-bezier(.16,1,.3,1), box-shadow .28s ease, border-color .22s ease`,
                                    }}
                                >
                                    {/* hover orb */}
                                    <div className="ag-orb" style={{ background: `radial-gradient(circle, rgba(${c.accentRgb},.14) 0%, transparent 70%)` }} />

                                    {/* cursor spotlight */}
                                    <div className="ag-spot" />

                                    {/* top shimmer line */}
                                    <div className="ag-shimmer" style={{ background: `linear-gradient(90deg, transparent, ${c.shimmer}, transparent)` }} />

                                    <div className="ag-inner">
                                        {/* icon */}
                                        <div className="ag-icon" style={{
                                            background: `rgba(${c.accentRgb},.1)`,
                                            border: `1px solid rgba(${c.accentRgb},.22)`,
                                            color: c.accentHex,
                                        }}>
                                            {c.icon}
                                        </div>

                                        {/* number */}
                                        <div className="ag-num" style={{ color: `rgba(${c.accentRgb},.2)` }}>
                                            {c.num}
                                        </div>

                                        {/* rule */}
                                        <div className="ag-rule" style={{ background: `rgba(${c.accentRgb},.28)` }} />

                                        <div className="ag-title">{c.title}</div>
                                        <div className="ag-body">{c.body}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
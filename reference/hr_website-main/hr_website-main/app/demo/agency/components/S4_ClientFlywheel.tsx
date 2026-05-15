'use client'

import { useEffect, useRef } from 'react'
import { useReveal } from './SharedItems'

export default function S4_ClientFlywheel() {
    const { ref, visible } = useReveal()
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

    /* ── Per-card 3D tilt ── */
    useEffect(() => {
        type H = { el: HTMLDivElement; mv: (e: MouseEvent) => void; lv: () => void }
        const hs: H[] = []

        cardRefs.current.forEach(el => {
            if (!el) return
            const spot = el.querySelector<HTMLElement>('.cf-spot')
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
    }, [visible])

    const cards = [
        {
            num: '01',
            title: 'Add any client. They get instant read-only access.',
            body: 'Create a managed client profile. Submit candidates. The client receives a magic link — they see their candidate list, pipeline stages, pass/fail actions, and commission calculations immediately. No login required. No setup. They experience a real, functional product from day one.',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="10" cy="10" r="8" />
                    <path d="M10 2C10 2 13 6 13 10s-3 8-3 8" />
                    <path d="M2 10h16" />
                </svg>
            ),
            accentRgb: '52,112,240',
            accentHex: '#3470F0',
            shimmer: 'rgba(52,112,240,.5)',
        },
        {
            num: '02',
            title: 'They claim their account. Your slot cost drops to zero.',
            body: 'A persistent "Claim your account" banner lives in their read-only view. They click, confirm pre-filled company details, set a password — onboarding takes under 3 minutes. They become a paying Standalone Employer. Your per-slot billing for that client drops to zero immediately.',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 2L10.9 6.4H15.5L11.8 9L13.3 13.5L9 11L4.7 13.5L6.2 9L2.5 6.4H7.1L9 2Z" />
                </svg>
            ),
            accentRgb: '196,154,60',
            accentHex: '#C49A3C',
            shimmer: 'rgba(196,154,60,.6)',
        },
        {
            num: '03',
            title: 'Volume scales down as you grow.',
            body: '1–5 clients: full slot rate. 6–15: 15% discount. 16–30: 25% discount. 31+: 35% discount or negotiated. The more clients you bring onto the platform, the cheaper each slot becomes — and every client who converts frees a slot entirely.',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 17l4-6 3 3 3-5 4 8" />
                    <path d="M3 3h14v14" />
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
                /* ══ CLIENT FLYWHEEL SECTION ═══════════════════════════ */
                .cf-section { background: #f4f0eb; position: relative; overflow: hidden; }
                .cf-section .wrap {
                    padding-top: 52px !important;
                    padding-bottom: 52px !important;
                }

                /* ── Header ─────────────────────────────────────────── */
                .cf-header {
                    text-align: center;
                    max-width: 580px;
                    margin: 0 auto 40px;
                }

                /* ── Grid ───────────────────────────────────────────── */
                .cf-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                }

                /* ── Card ───────────────────────────────────────────── */
                .cf-card {
                    background: #ffffff;
                    border: 1px solid rgba(12,24,40,.09);
                    border-radius: 20px;
                    padding: 26px 24px 28px;
                    position: relative; overflow: hidden;
                    cursor: default;
                    transform-style: preserve-3d; will-change: transform;
                    transition:
                        transform .14s cubic-bezier(.16,1,.3,1),
                        box-shadow .28s ease,
                        border-color .22s ease;
                    box-shadow: 0 2px 8px rgba(12,24,40,.05), 0 1px 2px rgba(12,24,40,.03);
                }

                /* cursor spotlight */
                .cf-spot {
                    position: absolute; inset: 0; border-radius: 20px;
                    pointer-events: none; z-index: 0;
                    opacity: 0; transition: opacity .3s;
                }

                /* top shimmer line — grows on hover */
                .cf-shimmer {
                    position: absolute;
                    top: 0; left: 0; right: 0; height: 2px;
                    border-radius: 20px 20px 0 0;
                    transform: scaleX(0); transform-origin: left;
                    transition: transform .48s cubic-bezier(.22,1,.36,1);
                    z-index: 3; pointer-events: none;
                }
                .cf-card:hover .cf-shimmer { transform: scaleX(1); }

                /* hover lift */
                .cf-card:hover {
                    box-shadow: 0 22px 52px rgba(12,24,40,.1), 0 6px 16px rgba(12,24,40,.06);
                    border-color: rgba(12,24,40,.13);
                }

                /* ambient orb bottom-left */
                .cf-orb {
                    position: absolute; bottom: -60px; left: -60px;
                    width: 200px; height: 200px; border-radius: 50%;
                    filter: blur(48px); pointer-events: none; z-index: 0;
                    opacity: 0; transition: opacity .45s ease, transform .55s ease;
                }
                .cf-card:hover .cf-orb { opacity: 1; transform: scale(1.2); }

                /* card inner — above spotlight */
                .cf-inner { position: relative; z-index: 2; }

                /* icon */
                .cf-icon {
                    width: 40px; height: 40px; border-radius: 11px;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 16px; flex-shrink: 0;
                    transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s;
                }
                .cf-card:hover .cf-icon { transform: scale(1.12) rotate(-5deg); }

                /* number */
                .cf-num {
                    font-family: 'Fraunces', serif;
                    font-size: 28px; font-weight: 300;
                    line-height: 1; margin-bottom: 8px;
                    transition: letter-spacing .25s ease;
                }
                .cf-card:hover .cf-num { letter-spacing: 1px; }

                /* accent rule */
                .cf-rule {
                    width: 24px; height: 1.5px; border-radius: 2px;
                    margin-bottom: 12px;
                    transition: width .32s cubic-bezier(.22,1,.36,1);
                }
                .cf-card:hover .cf-rule { width: 44px; }

                .cf-title {
                    font-size: clamp(13.5px, 1vw, 15.5px);
                    font-weight: 700; color: var(--ink);
                    margin-bottom: 9px; line-height: 1.35;
                    transition: color .2s;
                }
                .cf-body {
                    font-size: clamp(12px, .82vw, 13.5px);
                    color: var(--ink3); line-height: 1.72; font-weight: 300;
                }

                /* ══ RESPONSIVE ════════════════════════════════════════ */
                @media (max-width: 900px) {
                    .cf-section .wrap { padding-top: 44px !important; padding-bottom: 44px !important; }
                    .cf-header { margin-bottom: 32px; }
                    .cf-grid { gap: 13px; }
                    .cf-title { font-size: clamp(13px,.95vw,15px); }
                    .cf-body  { font-size: clamp(11.5px,.8vw,13px); }
                }
                @media (max-width: 760px) {
                    .cf-grid { grid-template-columns: 1fr 1fr; }
                    .cf-card:last-child { grid-column: span 2; max-width: 400px; margin: 0 auto; width: 100%; }
                }
                @media (max-width: 520px) {
                    .cf-section .wrap { padding-top: 36px !important; padding-bottom: 36px !important; }
                    .cf-header { margin-bottom: 24px; }
                    .cf-grid { grid-template-columns: 1fr; gap: 10px; }
                    .cf-card:last-child { grid-column: span 1; max-width: none; }
                    .cf-card  { padding: 18px 16px 20px; border-radius: 16px; }
                    .cf-icon  { width: 34px; height: 34px; border-radius: 9px; margin-bottom: 11px; }
                    .cf-icon svg { width: 17px; height: 17px; }
                    .cf-num   { font-size: 22px; margin-bottom: 6px; }
                    .cf-rule  { margin-bottom: 9px; }
                    .cf-title { font-size: 13.5px; margin-bottom: 7px; }
                    .cf-body  { font-size: 12px; line-height: 1.65; }
                }
            `}</style>

            <section className="cf-section">
                <div className="wrap">
                    <div ref={ref}>

                        {/* ── Header ── */}
                        <div
                            className="cf-header"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'none' : 'translateY(22px)',
                                transition: 'opacity .65s ease, transform .65s ease',
                            }}
                        >
                            <div className="eyebrow eyebrow-dark" style={{ justifyContent: 'center', marginBottom: 16 }}>
                                <div className="ey-line" />The client flywheel
                            </div>
                            <h2 className="h2 h2-ink" style={{ marginBottom: 14 }}>
                                Add clients. They experience<br />
                                <em>the product. They convert.</em>
                            </h2>
                            <p className="lead lead-ink" style={{ maxWidth: 480, margin: '0 auto' }}>
                                Every client you add gets a live view of their pipeline — no login required. When they're ready to own their hiring, they claim an account in 3 minutes. Your slot billing drops to zero.
                            </p>
                        </div>

                        {/* ── Cards ── */}
                        <div className="cf-grid">
                            {cards.map((c, i) => (
                                <div
                                    key={i}
                                    className="cf-card"
                                    ref={el => { cardRefs.current[i] = el }}
                                    style={{
                                        opacity: visible ? 1 : 0,
                                        transition: `opacity .65s ease ${i * 0.1}s, transform .14s cubic-bezier(.16,1,.3,1), box-shadow .28s ease, border-color .22s ease`,
                                    }}
                                >
                                    {/* ambient orb */}
                                    <div
                                        className="cf-orb"
                                        style={{ background: `radial-gradient(circle, rgba(${c.accentRgb},.14) 0%, transparent 70%)` }}
                                    />

                                    {/* cursor spotlight */}
                                    <div className="cf-spot" />

                                    {/* shimmer line */}
                                    <div
                                        className="cf-shimmer"
                                        style={{ background: `linear-gradient(90deg, transparent, ${c.shimmer}, transparent)` }}
                                    />

                                    <div className="cf-inner">
                                        {/* icon */}
                                        <div
                                            className="cf-icon"
                                            style={{
                                                background: `rgba(${c.accentRgb},.1)`,
                                                border: `1px solid rgba(${c.accentRgb},.22)`,
                                                color: c.accentHex,
                                            }}
                                        >
                                            {c.icon}
                                        </div>

                                        {/* number */}
                                        <div className="cf-num" style={{ color: `rgba(${c.accentRgb},.2)` }}>
                                            {c.num}
                                        </div>

                                        {/* accent rule */}
                                        <div className="cf-rule" style={{ background: `rgba(${c.accentRgb},.28)` }} />

                                        <div className="cf-title">{c.title}</div>
                                        <div className="cf-body">{c.body}</div>
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
'use client'

import { useEffect, useState } from 'react'
import { HeroDashboard } from './HeroDashboard'

function FloatCard({ delay, floatAnim, style: extra, children }: {
    delay: number; floatAnim: string; style?: React.CSSProperties; children: React.ReactNode
}) {
    const [show, setShow] = useState(false)
    useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t) }, [delay])

    return (
        <div style={{
            position: 'absolute',
            background: 'rgba(13,23,46,.93)',
            backdropFilter: 'blur(22px)',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 14,
            boxShadow: '0 16px 44px rgba(0,0,0,.48), 0 0 0 1px rgba(255,255,255,.03)',
            padding: '11px 14px',
            fontFamily: "'Geist',sans-serif",
            zIndex: 20,
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

export default function S1_Hero() {
    const [ready, setReady] = useState(false)
    useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

    return (
        <section className="emp-hero-section" style={{ background: 'var(--navy)', position: 'relative', overflow: 'visible' }}>

            {/* ── background canvas — mirrors homepage exactly ── */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>

                {/* drifting gold grid — same opacity + size as homepage */}
                <div style={{
                    position: 'absolute', inset: '-60%',
                    backgroundImage: 'linear-gradient(rgba(196,154,60,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(196,154,60,.055) 1px,transparent 1px)',
                    backgroundSize: '72px 72px',
                    animation: 'heroDrift 60s linear infinite',
                }} />

                {/* radial bg tint */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 28% 55%,rgba(196,154,60,.06) 0%,transparent 55%), radial-gradient(ellipse at 78% 18%,rgba(52,112,240,.04) 0%,transparent 50%)',
                }} />

                {/* floating orbs */}
                <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', background: 'rgba(196,154,60,.065)', bottom: -140, right: -140, filter: 'blur(80px)', animation: 'heroOrbFloat 22s 3s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', background: 'rgba(52,112,240,.18)', top: '40%', left: '55%', filter: 'blur(80px)', animation: 'heroOrbFloat 32s 6s ease-in-out infinite' }} />

                {/* golden sweep lines — exact homepage pattern */}
                <div className="data-line" style={{ top: '18%', width: '42%', left: '-5%', animationDelay: '-2.0s', animationDuration: '9s' }} />
                <div className="data-line" style={{ top: '33%', width: '36%', left: '10%', animationDelay: '-5.5s', animationDuration: '11s' }} />
                <div className="data-line" style={{ top: '48%', width: '52%', left: '-8%', animationDelay: '-1.2s', animationDuration: '8s' }} />
                <div className="data-line" style={{ top: '62%', width: '38%', left: '5%', animationDelay: '-7.0s', animationDuration: '10s' }} />
                <div className="data-line" style={{ top: '75%', width: '44%', left: '-3%', animationDelay: '-3.8s', animationDuration: '12s' }} />
                <div className="data-line" style={{ top: '88%', width: '30%', left: '15%', animationDelay: '-6.0s', animationDuration: '9s' }} />
            </div>

            {/* .wrap gives us centred horizontal padding; override its vertical padding */}
            <div className="wrap emp-hero-wrap" style={{ position: 'relative', zIndex: 1 }}>
                <div className="emp-hero-grid">

                    {/* ── LEFT: copy (always visible) ── */}
                    <div className="emp-hero-left" style={{ opacity: ready ? 1 : 0, transform: ready ? 'none' : 'translateY(24px)', transition: 'opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)' }}>

                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue)', background: 'rgba(52,112,240,.1)', border: '1px solid rgba(52,112,240,.28)', borderRadius: 100, padding: '4px 14px', marginBottom: 24 }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue)', animation: 'heroPulse 2s ease-in-out infinite' }} />
                            For Employers
                        </div>

                        <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(34px,4.2vw,58px)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-1.4px', color: 'var(--text)', marginBottom: 20 }}>
                            Stop screening<br />
                            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>resumes yourself.</em>
                        </h1>

                        <p style={{ fontSize: 'clamp(14px,1.1vw,17px)', color: 'var(--text2)', lineHeight: 1.7, marginBottom: 34, maxWidth: 440 }}>
                            AI screens every application before you arrive. Visual pipelines. Panel variance flags. Natural language analytics. Everything your hiring team needs — in one place.
                        </p>

                        <div className="emp-hero-ctas" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 34 }}>
                            <a href="/demo/employer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--gold)', color: 'var(--navy)', fontWeight: 700, fontSize: 14, padding: '12px 22px', borderRadius: 12, textDecoration: 'none', transition: 'all .2s', whiteSpace: 'nowrap', boxShadow: '0 6px 24px rgba(196,154,60,.3)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
                            >View Demo <span style={{ fontSize: 15 }}>→</span></a>

                            <a href="#claim" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(52,112,240,.1)', color: 'var(--blue)', fontWeight: 600, fontSize: 14, padding: '12px 22px', borderRadius: 12, textDecoration: 'none', border: '1.5px solid rgba(52,112,240,.3)', transition: 'background .2s', whiteSpace: 'nowrap' }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(52,112,240,.18)'}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(52,112,240,.1)'}
                            >Claim account</a>
                        </div>

                    </div>

                    {/* ── RIGHT: dashboard — hidden on mobile via CSS class ── */}
                    <div className="emp-hero-right" style={{
                        position: 'relative',
                        opacity: ready ? 1 : 0,
                        transform: ready ? 'none' : 'translateY(32px)',
                        transition: 'opacity .8s ease .2s, transform .8s cubic-bezier(.16,1,.3,1) .2s',
                        paddingTop: 32,
                        paddingBottom: 44,
                    }}>
                        <HeroDashboard ready={ready} />

                        {/* Float 1 — Commission calculated (top-right) */}
                        <FloatCard delay={1800} floatAnim="heroFloatA 6s 2s" style={{ top: 8, right: -12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(24,184,122,.12)', border: '1px solid rgba(24,184,122,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13 }}>₹</div>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Commission locked</div>
                                    <div style={{ fontSize: 10, color: 'var(--green)', fontWeight: 700 }}>₹1,20,000 · TalentHub</div>
                                </div>
                                <div style={{ marginLeft: 4, width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, animation: 'heroPulse 2s ease-in-out infinite' }} />
                            </div>
                        </FloatCard>

                        {/* Float 2 — Panel variance flag (bottom-left) */}
                        <FloatCard delay={2600} floatAnim="heroFloatB 7s 3s" style={{ bottom: 10, left: -12, minWidth: 210 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
                                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: 'rgba(247,144,9,.75)', textTransform: 'uppercase' }}>⚠ Panel Variance</div>
                            </div>
                            <div style={{ fontSize: 10.5, color: 'var(--text2)', marginBottom: 7 }}>Rahul V. · 3 interviewers · 28pt spread</div>
                            <div style={{ display: 'flex', gap: 5 }}>
                                {[{ l: 'A.K.', v: '82', c: '#18B87A' }, { l: 'R.S.', v: '54', c: '#E0384F' }, { l: 'M.P.', v: '71', c: '#F79009' }].map(m => (
                                    <div key={m.l} style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 7, padding: '5px 4px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: m.c }}>{m.v}</div>
                                        <div style={{ fontSize: 9, color: 'var(--text3)' }}>{m.l}</div>
                                    </div>
                                ))}
                            </div>
                        </FloatCard>

                        {/* Float 3 — Offer confirmed (bottom-right) */}
                        <FloatCard delay={3400} floatAnim="heroFloatC 8s 3.5s" style={{ bottom: 10, right: -12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(52,112,240,.12)', border: '1px solid rgba(52,112,240,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Offer confirmed</div>
                                    <div style={{ fontSize: 10, color: 'var(--text3)' }}>Priya S. · CTC ₹24,00,000</div>
                                </div>
                            </div>
                            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue)', animation: 'heroPulse 2s ease-in-out infinite' }} />
                                <span style={{ fontSize: 10, color: 'var(--blue)' }}>Both parties notified</span>
                            </div>
                        </FloatCard>
                    </div>

                </div>
            </div>

            <style suppressHydrationWarning>{`
        /* ── Keyframes ── */
        @keyframes heroPulse  { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes heroDrift  { 0%{transform:translate(0,0)} 100%{transform:translate(72px,72px)} }
        @keyframes heroFloatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)}  }
        @keyframes heroFloatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
        @keyframes heroFloatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)}  }

        /* ── Override .wrap vertical padding for this section only ── */
        .emp-hero-wrap {
          padding-top: clamp(80px, 10vw, 120px) !important;
          padding-bottom: clamp(80px, 10vw, 120px) !important;
        }

        /* ── Orb float keyframe (local, doesn't conflict with globals) ── */
        @keyframes heroOrbFloat {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(20px,-30px); }
        }

        /* ── Desktop: 2-col, never collapses ── */
        .emp-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(28px, 4vw, 56px);
          align-items: center;
        }

        /* ── ≤ 900px: single column, hide dashboard (mirrors landing page) ── */
        @media (max-width: 900px) {
          .emp-hero-grid {
            grid-template-columns: 1fr;
          }
          .emp-hero-right {
            display: none;
          }
          .emp-hero-wrap {
            padding-top: 110px !important;
          }
          .emp-hero-left {
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .emp-hero-left h1 {
            font-size: clamp(34px, 8vw, 50px) !important;
            text-align: center !important;
          }
          .emp-hero-left p {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .emp-hero-ctas { justify-content: center !important; }
        }

        /* ── ≤ 480px: tighten padding and text ── */
        @media (max-width: 480px) {
          .emp-hero-wrap {
            padding-top: 100px !important;
            padding-bottom: 40px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .emp-hero-left > div:first-child { margin-bottom: 16px !important; }
          .emp-hero-left h1 {
            font-size: clamp(26px, 8vw, 34px) !important;
            line-height: 1.15 !important;
            letter-spacing: -0.5px !important;
            margin-bottom: 12px !important;
          }
          .emp-hero-left p {
            font-size: 14px !important;
            line-height: 1.6 !important;
            margin-bottom: 24px !important;
          }
          .emp-hero-ctas { gap: 8px !important; }
          .emp-hero-ctas a {
            font-size: 13px !important;
            padding: 10px 16px !important;
            border-radius: 10px !important;
          }
        }
      `}</style>
        </section>
    )
}
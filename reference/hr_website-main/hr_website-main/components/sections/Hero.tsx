'use client'

import { useEffect, useState } from 'react'

/* ── Floating notification card ── */
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

export default function Hero() {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        const t = setTimeout(() => setReady(true), 80)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        document.querySelectorAll<HTMLElement>('.cu').forEach(el => {
            const t = +(el.dataset.t || 0), dur = 1400, t0 = performance.now()
            const tick = (ts: number) => {
                const p = Math.min((ts - t0) / dur, 1)
                el.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * t))
                if (p < 1) requestAnimationFrame(tick)
            }
            setTimeout(() => requestAnimationFrame(tick), 650)
        })
    }, [])

    return (
        <section className="hn-hero-section" style={{ background: 'var(--navy)', position: 'relative', overflow: 'visible' }}>

            {/* ── Background ── */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{
                    position: 'absolute', inset: '-60%',
                    backgroundImage: 'linear-gradient(rgba(196,154,60,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(196,154,60,.055) 1px,transparent 1px)',
                    backgroundSize: '72px 72px',
                    animation: 'hnDrift 60s linear infinite',
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 28% 55%,rgba(196,154,60,.06) 0%,transparent 55%), radial-gradient(ellipse at 78% 18%,rgba(52,112,240,.04) 0%,transparent 50%)',
                }} />
                <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', background: 'rgba(196,154,60,.065)', bottom: -140, right: -140, filter: 'blur(80px)', animation: 'hnOrbFloat 22s 3s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', background: 'rgba(52,112,240,.18)', top: '40%', left: '55%', filter: 'blur(80px)', animation: 'hnOrbFloat 32s 6s ease-in-out infinite' }} />
                <div className="data-line" style={{ top: '18%', width: '42%', left: '-5%', animationDelay: '-2.0s', animationDuration: '9s' }} />
                <div className="data-line" style={{ top: '33%', width: '36%', left: '10%', animationDelay: '-5.5s', animationDuration: '11s' }} />
                <div className="data-line" style={{ top: '48%', width: '52%', left: '-8%', animationDelay: '-1.2s', animationDuration: '8s' }} />
                <div className="data-line" style={{ top: '62%', width: '38%', left: '5%', animationDelay: '-7.0s', animationDuration: '10s' }} />
                <div className="data-line" style={{ top: '75%', width: '44%', left: '-3%', animationDelay: '-3.8s', animationDuration: '12s' }} />
                <div className="data-line" style={{ top: '88%', width: '30%', left: '15%', animationDelay: '-6.0s', animationDuration: '9s' }} />
            </div>

            {/* ── Content ── */}
            <div className="wrap hn-hero-wrap" style={{ position: 'relative', zIndex: 1 }}>
                <div className="hn-hero-grid">

                    {/* ── LEFT ── */}
                    <div className="hn-hero-left" style={{
                        opacity: ready ? 1 : 0,
                        transform: ready ? 'none' : 'translateY(24px)',
                        transition: 'opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)',
                    }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 7,
                            fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
                            color: 'var(--gold)', background: 'rgba(196,154,60,.1)',
                            border: '1px solid rgba(196,154,60,.28)', borderRadius: 100,
                            padding: '4px 14px', marginBottom: 24,
                        }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', animation: 'hnPulse 2s ease-in-out infinite' }} />
                            Hiring Intelligence · Built for All
                        </div>

                        <h1 style={{
                            fontFamily: "'Fraunces',serif",
                            fontSize: 'clamp(36px,4.5vw,62px)',
                            fontWeight: 400, lineHeight: 1.08, letterSpacing: '-1.5px',
                            color: 'var(--text)', marginBottom: 20,
                        }}>
                            Every other ATS<br />
                            is a filing cabinet.<br />
                            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>HR Ops thinks.</em>
                        </h1>

                        <p style={{
                            fontSize: 'clamp(14px,1.1vw,17px)', color: 'var(--text2)',
                            lineHeight: 1.72, marginBottom: 34, maxWidth: 440, fontWeight: 300,
                        }}>
                            One platform for employers, agencies, and candidates. AI that screens, learns, and automates — so your team makes decisions, not admin.
                        </p>

                        <div className="hn-hero-ctas" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <a href="#pricing" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                background: 'var(--gold)', color: 'var(--navy)',
                                fontWeight: 700, fontSize: 14, padding: '12px 24px',
                                borderRadius: 12, textDecoration: 'none',
                                transition: 'all .2s', whiteSpace: 'nowrap',
                                boxShadow: '0 6px 24px rgba(196,154,60,.3)',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
                            >Start hiring smarter <span style={{ fontSize: 15 }}>→</span></a>

                            <a href="/demo" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                background: 'rgba(255,255,255,.04)', color: 'var(--text)',
                                fontWeight: 500, fontSize: 14, padding: '12px 24px',
                                borderRadius: 12, textDecoration: 'none',
                                border: '1px solid rgba(255,255,255,.15)',
                                transition: 'border-color .2s', whiteSpace: 'nowrap',
                            }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.3)'}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.15)'}
                            >See the intelligence</a>
                        </div>
                    </div>

                    {/* ── RIGHT: original pipeline dashboard ── */}
                    <div className="hn-hero-right" style={{
                        position: 'relative',
                        opacity: ready ? 1 : 0,
                        transform: ready ? 'none' : 'translateY(32px)',
                        transition: 'opacity .8s ease .2s, transform .8s cubic-bezier(.16,1,.3,1) .2s',
                        paddingTop: 32,
                        paddingBottom: 60,
                    }}>

                        {/* ── MAIN PIPELINE CARD ── */}
                        <div style={{
                            background: 'var(--navy2)',
                            border: '1px solid rgba(255,255,255,.08)',
                            borderRadius: 20,
                            overflow: 'hidden',
                            boxShadow: '0 40px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.03)',
                            position: 'relative',
                            zIndex: 5,
                            animation: 'hnFloatMain 7s ease-in-out infinite',
                        }}>
                            {/* titlebar */}
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '10px 16px',
                                borderBottom: '1px solid rgba(255,255,255,.06)',
                                background: 'rgba(0,0,0,.22)',
                            }}>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {['#FF5F57','#FFBD2E','#28C840'].map(c => (
                                        <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                                    ))}
                                </div>
                                <span style={{ fontSize: 10.5, color: 'var(--text3)' }}>HR Ops — Pipeline</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#18B87A', animation: 'hnPulse 2s ease-in-out infinite' }} />
                                    <span style={{ fontSize: 9.5, color: '#18B87A' }}>Live</span>
                                </div>
                            </div>

                            <div style={{ padding: '16px 18px' }}>
                                {/* Job header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Senior Backend Engineer</div>
                                        <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>Day 6 · Active · 347 applicants</div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
                                    {[['347','Applied'],['42','Shortlisted'],['11','Interview']] .map(([n, l]) => (
                                        <div key={l} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                                            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, color: 'var(--text)', lineHeight: 1 }}>{n}</div>
                                            <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 2 }}>{l}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Candidates */}
                                {[
                                    { init: 'PS', bg: '#4B6BFB', name: 'Priya Sharma',   sub: '6 yrs · Bangalore',  chip: 'Proceed', cc: '#18B87A', cbg: 'rgba(24,184,122,.12)' },
                                    { init: 'RV', bg: '#12B76A', name: 'Rahul Verma',    sub: '4 yrs · Mumbai',     chip: 'Round 1', cc: '#3470F0', cbg: 'rgba(52,112,240,.12)' },
                                    { init: 'AM', bg: '#F79009', name: 'Aarav Menon',    sub: '5 yrs · Pune',       chip: 'Maybe',   cc: '#F79009', cbg: 'rgba(247,144,9,.12)'  },
                                    { init: 'SK', bg: '#7C3AED', name: 'Sneha Kulkarni', sub: '7 yrs · Hyderabad',  chip: 'Proceed', cc: '#18B87A', cbg: 'rgba(24,184,122,.12)' },
                                ].map(c => (
                                    <div key={c.init} style={{
                                        display: 'flex', alignItems: 'center', gap: 9,
                                        background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)',
                                        borderRadius: 8, padding: '8px 10px', marginBottom: 5,
                                    }}>
                                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.init}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{c.name}</div>
                                            <div style={{ fontSize: 10, color: 'var(--text3)' }}>{c.sub}</div>
                                        </div>
                                        <div style={{ fontSize: 9.5, fontWeight: 700, color: c.cc, background: c.cbg, border: `1px solid ${c.cc}40`, borderRadius: 100, padding: '2px 9px', flexShrink: 0 }}>{c.chip}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Float 1: AI Screening (top-right) ── */}
                        <FloatCard delay={1800} floatAnim="hnFloatA 6s 2s" style={{ top: 8, right: -14 }}>
                            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 6 }}>AI Screening Result</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 1 }}>Priya Sharma</div>
                            <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 8 }}>Sr. Backend Engineer · 6 yrs</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                                <span style={{ fontSize: 10.5, color: 'var(--text2)' }}>Recommendation</span>
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#18B87A', background: 'rgba(24,184,122,.12)', borderRadius: 100, padding: '1px 8px' }}>Proceed</span>
                            </div>
                            {[['JD Match', '92%', 'var(--gold)', 92], ['Confidence', '87%', 'var(--green)', 87]].map(([l, v, c, w]) => (
                                <div key={l as string} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                    <span style={{ fontSize: 9, color: 'var(--text3)', width: 54, flexShrink: 0 }}>{l as string}</span>
                                    <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,.08)', borderRadius: 100, overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${w}%`, background: c as string, borderRadius: 100 }} />
                                    </div>
                                    <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text2)', width: 22, textAlign: 'right' }}>{v as string}</span>
                                </div>
                            ))}
                        </FloatCard>

                        {/* ── Float 2: Commission (bottom-left) ── */}
                        <FloatCard delay={2600} floatAnim="hnFloatB 7s 3s" style={{ bottom: 10, left: -14, minWidth: 200 }}>
                            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, color: 'rgba(196,154,60,.75)', textTransform: 'uppercase', marginBottom: 4 }}>Commission Triggered</div>
                            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, color: 'var(--gold)', lineHeight: 1, marginBottom: 4 }}>₹1.2L</div>
                            <div style={{ fontSize: 10, color: 'var(--green)', marginBottom: 8 }}>✓ Auto-calculated on hire</div>
                            {[['Agency', 'TalentHub', 'var(--text2)'], ['Invoice', 'Generated', 'var(--green)'], ['ERP entry', 'Synced', 'var(--green)']].map(([k, v, vc]) => (
                                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 3 }}>
                                    <span style={{ color: 'var(--text3)' }}>{k}</span>
                                    <span style={{ color: vc, fontWeight: 600 }}>{v}</span>
                                </div>
                            ))}
                        </FloatCard>

                        {/* ── Float 3: Magic Link (bottom-right) ── */}
                        <FloatCard delay={3400} floatAnim="hnFloatC 8s 3.5s" style={{ bottom: 10, right: -14 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(196,154,60,.12)', border: '1px solid rgba(196,154,60,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)' }}>Magic Link</div>
                                    <div style={{ fontSize: 9.5, color: 'var(--text3)' }}>No app · No account</div>
                                </div>
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--gold)', fontFamily: 'monospace', background: 'rgba(196,154,60,.07)', border: '1px solid rgba(196,154,60,.18)', borderRadius: 6, padding: '4px 8px', marginBottom: 6 }}>hrops.in/apply/jX7k9mP2</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', animation: 'hnPulse 2s ease-in-out infinite' }} />
                                <span style={{ fontSize: 9.5, color: 'var(--green)' }}>Candidate completing now</span>
                            </div>
                        </FloatCard>

                    </div>
                </div>
            </div>

            {/* ── Stats bar ── */}
            <div className="hero-stats-bar" style={{ position: 'relative', zIndex: 10 }}>
                <div className="hsb-item"><div className="hsb-num"><span className="cu" data-t="347">0</span></div><div className="hsb-lbl">Resumes Screened Today</div></div>
                <div className="hsb-item"><div className="hsb-num"><span className="cu" data-t="91">0</span>%</div><div className="hsb-lbl">AI Screening Accuracy</div></div>
                <div className="hsb-item"><div className="hsb-num"><span className="cu" data-t="3">0</span>x</div><div className="hsb-lbl">Faster Time to Hire</div></div>
                <div className="hsb-item hsb-item-desktop"><div className="hsb-num">₹1.2L</div><div className="hsb-lbl">Avg Commission Auto-Calculated</div></div>
                <div className="hsb-item hsb-item-desktop"><div className="hsb-num">&lt;4 min</div><div className="hsb-lbl">Candidate Profile via Magic Link</div></div>
            </div>

            <style suppressHydrationWarning>{`
                @keyframes hnPulse    { 0%,100%{opacity:1} 50%{opacity:.3} }
                @keyframes hnDrift    { 0%{transform:translate(0,0)} 100%{transform:translate(72px,72px)} }
                @keyframes hnFloatMain{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
                @keyframes hnFloatA   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)}  }
                @keyframes hnFloatB   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
                @keyframes hnFloatC   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)}  }
                @keyframes hnOrbFloat { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }

                .hn-hero-wrap {
                    padding-top: clamp(100px, 13vw, 160px) !important;
                    padding-bottom: clamp(80px, 10vw, 120px) !important;
                }

                .hn-hero-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.3fr;
                    gap: clamp(20px, 2.5vw, 40px);
                    align-items: center;
                }

                @media (max-width: 900px) {
                    .hn-hero-grid { grid-template-columns: 1fr; }
                    .hn-hero-right { display: none; }
                    .hn-hero-wrap { padding-top: 130px !important; }
                    .hn-hero-left {
                        text-align: center !important;
                        align-items: center !important;
                        display: flex !important;
                        flex-direction: column !important;
                    }
                    .hn-hero-left h1 { text-align: center !important; }
                    .hn-hero-left p { margin-left: auto !important; margin-right: auto !important; text-align: center !important; }
                    .hn-hero-left > div:first-child { align-self: center; }
                    .hn-hero-ctas { justify-content: center !important; }
                }

                @media (max-width: 480px) {
                    .hn-hero-wrap {
                        padding-top: 100px !important;
                        padding-bottom: 40px !important;
                        padding-left: 20px !important;
                        padding-right: 20px !important;
                    }
                    .hn-hero-left > div:first-child { margin-bottom: 16px !important; }
                    .hn-hero-left h1 {
                        font-size: clamp(26px, 8vw, 34px) !important;
                        line-height: 1.15 !important;
                        letter-spacing: -0.5px !important;
                        margin-bottom: 12px !important;
                    }
                    .hn-hero-left p {
                        font-size: 14px !important;
                        line-height: 1.6 !important;
                        margin-bottom: 24px !important;
                        opacity: 0.9;
                    }
                    .hn-hero-ctas { gap: 8px !important; }
                    .hn-hero-ctas a {
                        font-size: 13px !important;
                        padding: 10px 16px !important;
                        border-radius: 10px !important;
                    }
                }
            `}</style>
        </section>
    )
}

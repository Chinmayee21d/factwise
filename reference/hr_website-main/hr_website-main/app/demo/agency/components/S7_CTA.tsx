'use client'

import { useReveal } from './SharedItems'

export default function S7_CTA() {
    const { ref, visible } = useReveal()

    return (
        <>
            <style suppressHydrationWarning>{`
                /* ══ CTA SECTION ════════════════════════════════════════ */
                .agcta-section { background: var(--cream); padding: 0; }

                /* ── Card ───────────────────────────────────────────── */
                .agcta-card {
                    display: flex; flex-direction: row;
                    align-items: center; justify-content: space-between;
                    gap: 48px; padding: 52px 60px;
                    background: var(--navy2);
                    border-radius: 24px; position: relative; overflow: hidden;
                    border: 1px solid rgba(196,154,60,.2);
                    box-shadow: 0 0 0 1px rgba(196,154,60,.06), 0 24px 64px rgba(11,22,40,.28);
                }

                /* gold shimmer top line */
                .agcta-card::before {
                    content: ''; position: absolute;
                    top: 0; left: 10%; right: 10%; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(196,154,60,.7), transparent);
                    pointer-events: none;
                }

                /* animated gold glow — top right */
                .agcta-glow-tr {
                    position: absolute; top: -120px; right: -80px;
                    width: 340px; height: 340px; border-radius: 50%;
                    background: radial-gradient(circle at 40% 40%,
                        rgba(196,154,60,.14) 0%,
                        rgba(196,154,60,.04) 45%,
                        transparent 68%);
                    filter: blur(32px);
                    animation: agctaDrift 14s ease-in-out infinite;
                    pointer-events: none;
                }

                /* subtle glow — bottom left */
                .agcta-glow-bl {
                    position: absolute; bottom: -100px; left: -60px;
                    width: 260px; height: 260px; border-radius: 50%;
                    background: radial-gradient(circle at 60% 60%,
                        rgba(196,154,60,.08) 0%,
                        transparent 65%);
                    filter: blur(36px);
                    animation: agctaDrift 18s ease-in-out infinite reverse;
                    pointer-events: none;
                }

                @keyframes agctaDrift {
                    0%,100% { transform: translate(0,0) scale(1); }
                    35%     { transform: translate(14px,-16px) scale(1.06); }
                    70%     { transform: translate(-8px,10px) scale(.96); }
                }

                /* dot grid — right side only */
                .agcta-dots {
                    position: absolute; top: 0; right: 0;
                    width: 280px; height: 100%;
                    background-image: radial-gradient(circle, rgba(255,255,255,.045) 1px, transparent 1px);
                    background-size: 20px 20px;
                    pointer-events: none;
                    mask-image: linear-gradient(to left, rgba(0,0,0,.5), transparent);
                    -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,.5), transparent);
                }

                /* ── Left ───────────────────────────────────────────── */
                .agcta-left { flex: 1; min-width: 0; position: relative; z-index: 1; }

                .agcta-eyebrow {
                    display: inline-flex; align-items: center; gap: 9px;
                    font-size: 10.5px; font-weight: 700; letter-spacing: 2px;
                    text-transform: uppercase; color: var(--gold); margin-bottom: 18px;
                }
                .agcta-eyebrow::before, .agcta-eyebrow::after {
                    content: ''; display: block; width: 24px; height: 1px;
                    background: var(--gold); opacity: .6;
                }

                .agcta-h2 {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(28px, 2.6vw, 44px);
                    font-weight: 400; color: var(--text);
                    line-height: 1.08; letter-spacing: -1px; margin: 0 0 12px;
                }
                .agcta-h2 em { font-style: italic; font-weight: 300; color: var(--gold); }

                .agcta-lead {
                    font-size: clamp(13px, .9vw, 15px);
                    color: rgba(143,163,192,.85);
                    line-height: 1.65; margin: 0; max-width: 400px;
                }

                /* ── Right ──────────────────────────────────────────── */
                .agcta-right {
                    display: flex; flex-direction: column; gap: 10px;
                    min-width: 210px; flex-shrink: 0;
                    position: relative; z-index: 1; align-items: stretch;
                }

                /* primary — gold */
                .agcta-btn-primary {
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    background: var(--gold); color: var(--navy);
                    font-weight: 700; font-size: 14px;
                    padding: 14px 24px; border-radius: 12px;
                    text-decoration: none; white-space: nowrap;
                    position: relative; overflow: hidden;
                    transition: background .2s, box-shadow .2s, transform .2s;
                    box-shadow: 0 4px 18px rgba(196,154,60,.32);
                }
                .agcta-btn-primary::before {
                    content: ''; position: absolute;
                    top: 0; left: -80%; width: 50%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
                    transition: left .45s ease;
                }
                .agcta-btn-primary:hover::before { left: 140%; }
                .agcta-btn-primary:hover {
                    background: var(--gold2);
                    box-shadow: 0 8px 28px rgba(196,154,60,.48);
                    transform: translateY(-2px);
                }

                /* secondary — ghost */
                .agcta-btn-secondary {
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    background: rgba(255,255,255,.05); color: rgba(255,255,255,.8);
                    font-weight: 600; font-size: 14px;
                    padding: 14px 24px; border-radius: 12px;
                    text-decoration: none; white-space: nowrap;
                    border: 1.5px solid rgba(255,255,255,.13);
                    transition: background .2s, border-color .2s, transform .2s;
                }
                .agcta-btn-secondary:hover {
                    background: rgba(255,255,255,.09);
                    border-color: rgba(255,255,255,.26);
                    transform: translateY(-1px);
                }

                /* fine print */
                .agcta-fine {
                    margin: 2px 0 0; font-size: 10.5px;
                    color: rgba(255,255,255,.24);
                    text-align: center; letter-spacing: .25px; line-height: 1.65;
                }

                /* ══ RESPONSIVE ════════════════════════════════════════ */
                @media (max-width: 860px) {
                    .agcta-card  { gap: 32px; padding: 44px 40px; }
                    .agcta-right { min-width: 180px; }
                }
                @media (max-width: 640px) {
                    .agcta-card {
                        flex-direction: column; align-items: flex-start;
                        padding: 36px 28px; gap: 28px; border-radius: 20px;
                    }
                    .agcta-left, .agcta-right { width: 100%; }
                    .agcta-right { min-width: unset; }
                    .agcta-lead  { max-width: 100%; }
                    .agcta-btn-primary,
                    .agcta-btn-secondary { width: 100%; box-sizing: border-box; }
                    .agcta-fine { text-align: left; }
                }
                @media (max-width: 380px) {
                    .agcta-card { padding: 28px 20px; }
                }
            `}</style>

            <section className="agcta-section">
                <div className="wrap">
                    <div
                        ref={ref}
                        className="agcta-card"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'none' : 'translateY(24px)',
                            transition: 'opacity .7s ease, transform .7s ease',
                        }}
                    >
                        {/* Decorations */}
                        <div className="agcta-glow-tr" />
                        <div className="agcta-glow-bl" />
                        <div className="agcta-dots" />

                        {/* LEFT */}
                        <div className="agcta-left">
                            <div className="agcta-eyebrow">Ready when you are</div>

                            <h2 className="agcta-h2">
                                Ready to run your<br />
                                <em>agency smarter?</em>
                            </h2>

                            <p className="agcta-lead">
                                Full demo tailored to recruitment firms. Private bench, ML matching, commission automation — all in 30 minutes.
                            </p>
                        </div>

                        {/* RIGHT */}
                        <div className="agcta-right">
                            <a href="/demo/agency" className="agcta-btn-primary">
                                View Agency Demo <span style={{ fontSize: 16 }}>→</span>
                            </a>
                            <a href="mailto:info@hrops.io" className="agcta-btn-secondary">
                                Talk to us
                            </a>
                            <p className="agcta-fine">
                                No credit card required · No sales call<br />DPDP / GDPR compliant
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
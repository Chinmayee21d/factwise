'use client'

import { useReveal } from './SharedItems'

export default function CTASection() {
    const { ref, visible } = useReveal()

    return (
        <>
            <style>{`
            .ctax-section {
                background: var(--cream);
                padding: 0;
            }

            /* ── Card ────────────────────────────────── */
            .ctax-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                gap: 48px;
                padding: 52px 60px;
                background: var(--navy2);
                border-radius: 24px;
                position: relative;
                overflow: hidden;
                border: 1px solid rgba(196,154,60,.2);
                box-shadow:
                    0 0 0 1px rgba(196,154,60,.06),
                    0 24px 64px rgba(11,22,40,.28);
            }

            /* gold shimmer top line */
            .ctax-card::before {
                content: '';
                position: absolute;
                top: 0; left: 10%; right: 10%;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(196,154,60,.7), transparent);
                pointer-events: none;
            }

            /* animated gold glow — top right */
            .ctax-glow-tr {
                position: absolute;
                top: -120px; right: -80px;
                width: 340px; height: 340px;
                border-radius: 50%;
                background: radial-gradient(circle at 40% 40%,
                    rgba(196,154,60,.14) 0%,
                    rgba(196,154,60,.04) 45%,
                    transparent 68%);
                filter: blur(32px);
                animation: ctaxDrift 14s ease-in-out infinite;
                pointer-events: none;
            }

            /* blue glow — bottom left */
            .ctax-glow-bl {
                position: absolute;
                bottom: -100px; left: -60px;
                width: 260px; height: 260px;
                border-radius: 50%;
                background: radial-gradient(circle at 60% 60%,
                    rgba(52,112,240,.12) 0%,
                    transparent 65%);
                filter: blur(36px);
                animation: ctaxDrift 18s ease-in-out infinite reverse;
                pointer-events: none;
            }

            @keyframes ctaxDrift {
                0%,100% { transform: translate(0,0) scale(1); }
                35%     { transform: translate(14px,-16px) scale(1.06); }
                70%     { transform: translate(-8px,10px) scale(.96); }
            }

            /* dot grid — right side only */
            .ctax-dots {
                position: absolute;
                top: 0; right: 0;
                width: 280px; height: 100%;
                background-image: radial-gradient(circle, rgba(255,255,255,.045) 1px, transparent 1px);
                background-size: 20px 20px;
                pointer-events: none;
                mask-image: linear-gradient(to left, rgba(0,0,0,.5), transparent);
                -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,.5), transparent);
            }

            /* ── Left ────────────────────────────────── */
            .ctax-left {
                flex: 1;
                min-width: 0;
                position: relative;
                z-index: 1;
            }

            .ctax-eyebrow {
                display: inline-flex;
                align-items: center;
                gap: 9px;
                font-size: 10.5px;
                font-weight: 700;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: var(--gold);
                margin-bottom: 18px;
            }
            .ctax-eyebrow::before,
            .ctax-eyebrow::after {
                content: '';
                display: block;
                width: 24px; height: 1px;
                background: var(--gold);
                opacity: .6;
            }

            .ctax-h2 {
                font-family: 'Fraunces', serif;
                font-size: clamp(28px, 2.6vw, 44px);
                font-weight: 400;
                color: var(--text);
                line-height: 1.08;
                letter-spacing: -1px;
                margin: 0 0 12px;
            }
            .ctax-h2 em {
                font-style: italic;
                font-weight: 300;
                color: var(--gold);
            }

            .ctax-lead {
                font-size: clamp(13px, .9vw, 15px);
                color: rgba(143,163,192,.85);
                line-height: 1.65;
                margin: 0;
                max-width: 400px;
            }

            /* ── Right ───────────────────────────────── */
            .ctax-right {
                display: flex;
                flex-direction: column;
                gap: 10px;
                min-width: 210px;
                flex-shrink: 0;
                position: relative;
                z-index: 1;
                align-items: stretch;
            }

            /* primary — gold */
            .ctax-btn-primary {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                background: var(--gold);
                color: var(--navy);
                font-weight: 700;
                font-size: 14px;
                padding: 14px 24px;
                border-radius: 12px;
                text-decoration: none;
                white-space: nowrap;
                position: relative;
                overflow: hidden;
                transition: background .2s, box-shadow .2s, transform .2s;
                box-shadow: 0 4px 18px rgba(196,154,60,.32);
            }
            /* sheen */
            .ctax-btn-primary::before {
                content: '';
                position: absolute;
                top: 0; left: -80%; width: 50%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
                transition: left .45s ease;
            }
            .ctax-btn-primary:hover::before { left: 140%; }
            .ctax-btn-primary:hover {
                background: var(--gold2);
                box-shadow: 0 8px 28px rgba(196,154,60,.48);
                transform: translateY(-2px);
            }

            /* secondary — ghost */
            .ctax-btn-secondary {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                background: rgba(255,255,255,.05);
                color: rgba(255,255,255,.8);
                font-weight: 600;
                font-size: 14px;
                padding: 14px 24px;
                border-radius: 12px;
                text-decoration: none;
                white-space: nowrap;
                border: 1.5px solid rgba(255,255,255,.13);
                transition: background .2s, border-color .2s, transform .2s;
            }
            .ctax-btn-secondary:hover {
                background: rgba(255,255,255,.09);
                border-color: rgba(255,255,255,.26);
                transform: translateY(-1px);
            }

            /* fine print */
            .ctax-fine {
                margin: 2px 0 0;
                font-size: 10.5px;
                color: rgba(255,255,255,.24);
                text-align: center;
                letter-spacing: .25px;
                line-height: 1.65;
            }

            /* ── Responsive ──────────────────────────── */
            @media (max-width: 860px) {
                .ctax-card  { gap: 32px; padding: 44px 40px; }
                .ctax-right { min-width: 180px; }
            }
            @media (max-width: 640px) {
                .ctax-card {
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 36px 28px;
                    gap: 28px;
                    border-radius: 20px;
                }
                .ctax-left, .ctax-right { width: 100%; }
                .ctax-right { min-width: unset; }
                .ctax-lead  { max-width: 100%; }
                .ctax-btn-primary,
                .ctax-btn-secondary { width: 100%; box-sizing: border-box; }
                .ctax-fine  { text-align: left; }
            }
            @media (max-width: 380px) {
                .ctax-card { padding: 28px 20px; }
            }
        `}</style>

            <section className="ctax-section">
                <div className="wrap">
                    <div
                        ref={ref}
                        className="ctax-card"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'none' : 'translateY(24px)',
                            transition: 'opacity .7s ease, transform .7s ease',
                        }}
                    >
                        {/* Decorations */}
                        <div className="ctax-glow-tr" />
                        <div className="ctax-glow-bl" />
                        <div className="ctax-dots" />

                        {/* LEFT */}
                        <div className="ctax-left">
                            <div className="ctax-eyebrow">Ready when you are</div>

                            <h2 className="ctax-h2">
                                Ready to hire<br />
                                <em>smarter?</em>
                            </h2>

                            <p className="ctax-lead">
                                See the full product in a guided demo. Takes 60 seconds to register. No credit card. No sales call.
                            </p>
                        </div>

                        {/* RIGHT */}
                        <div className="ctax-right">
                            <a href="/demo/employer" className="ctax-btn-primary">
                                View Employer Demo <span style={{ fontSize: 16 }}>→</span>
                            </a>
                            <a href="mailto:info@hrops.io" className="ctax-btn-secondary">
                                Talk to us
                            </a>
                            <p className="ctax-fine">
                                No credit card required · No sales call<br />DPDP / GDPR compliant
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
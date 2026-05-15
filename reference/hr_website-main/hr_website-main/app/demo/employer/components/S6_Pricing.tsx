'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useReveal, Tick } from './SharedItems'

export default function PricingSection() {
    const { ref, visible } = useReveal()
    const [annual, setAnnual] = useState(false)
    const router = useRouter()

    // ── Employer plans data ─────────────────────────────────────────
    const plans = [
        {
            id: 'basic',
            tier: 'Basic',
            tagline: 'For growing teams.',
            price: { m: '4,999', a: '4,166' },
            annualNote: '₹49,990/yr · save ₹9,998',
            limits: ['3 users', '2 active jobs', 'BYOK AI'],
            features: [
                'AI screening with reasoning',
                'Visual pipeline builder',
                'Magic Link assessments',
                'Agency connections',
                'Basic analytics (90 days)',
            ],
            inherit: null,
            cta: { label: 'Get started', variant: 'outline' },
            isFeatured: false,
            isEnterprise: false,
            tickColor: '#18B87A',
            tickVariant: 'basic',
        },
        {
            id: 'pro',
            tier: 'Pro',
            tagline: 'The full AI advantage.',
            price: { m: '9,999', a: '8,333' },
            annualNote: '₹99,990/yr · save ₹19,998',
            limits: ['10 users', 'Unlimited jobs', 'HR Ops AI'],
            features: [
                'HR Ops AI — no BYOK required',
                'Learning loop',
                'Natural language analytics',
                'Panel variance flags',
                'ERP integration (SAP, Tally, NetSuite)',
            ],
            inherit: 'Everything in Basic',
            cta: { label: 'Get started', variant: 'gold' },
            isFeatured: true,
            isEnterprise: false,
            tickColor: '#C49A3C',
            tickVariant: 'pro',
        },
        {
            id: 'enterprise',
            tier: 'Enterprise',
            tagline: 'Custom infrastructure.',
            price: null,
            annualNote: 'Annual · Volume pricing',
            limits: ['Unlimited everything'],
            features: [
                'SSO — SAML 2.0 / OIDC',
                'DPDP / GDPR / SOC 2',
                'Full API access',
                'Dedicated success manager',
            ],
            inherit: 'Everything in Pro',
            cta: { label: 'Talk to us', variant: 'ent' },
            isFeatured: false,
            isEnterprise: true,
            tickColor: '#3470F0',
            tickVariant: 'ent',
        },
    ]

    return (
        <>
            <style>{`
            /* ── Section ──────────────────────────────── */
            .ep-section {
                background: #142238;
                padding: 0;
            }

            /* ── Header ─────────────────────────────── */
            .ep-header {
                text-align: center;
                max-width: 580px;
                margin: 0 auto 40px;
            }
            .ep-eyebrow {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: rgba(255,255,255,.42);
                margin-bottom: 14px;
            }
            .ep-eyebrow-line {
                width: 24px; height: 1.5px;
                background: rgba(196,154,60,.55);
            }
            .ep-h2 {
                font-family: 'Fraunces', serif;
                font-size: var(--std-h2-size, clamp(32px, 4.5vw, 52px));
                font-weight: 400;
                line-height: 1.06;
                letter-spacing: -1.2px;
                color: #fff;
                margin-bottom: 12px;
            }
            .ep-h2 em {
                font-style: italic;
                font-weight: 300;
                color: rgba(196,154,60,.88);
            }
            .ep-lead {
                font-size: 14px;
                color: rgba(255,255,255,.42);
                font-weight: 300;
                margin-bottom: 24px;
                line-height: 1.6;
            }

            /* ── Toggle ──────────────────────────────── */
            .ep-toggle {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                background: rgba(255,255,255,.05);
                border: 1px solid rgba(255,255,255,.1);
                border-radius: 100px;
                padding: 6px 18px;
            }
            .ep-toggle-lbl {
                font-size: 12px;
                font-family: 'Geist', sans-serif;
                transition: color .2s, font-weight .2s;
            }
            .ep-toggle-track {
                width: 34px; height: 19px;
                border-radius: 100px;
                position: relative; cursor: pointer;
                transition: background .25s;
                flex-shrink: 0;
            }
            .ep-toggle-knob {
                position: absolute; top: 2.5px;
                width: 14px; height: 14px;
                border-radius: 50%; background: white;
                box-shadow: 0 1px 4px rgba(0,0,0,.4);
                transition: left .25s cubic-bezier(.4,0,.2,1);
            }
            .ep-annual-pill {
                font-size: 10px; font-weight: 700;
                border-radius: 100px; padding: 2px 8px;
                white-space: nowrap;
                transition: all .3s;
            }

            /* ── Cards grid ──────────────────────────── */
            .ep-cards {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 16px;
                max-width: 980px;
                margin: 0 auto;
            }
            @media (max-width: 860px) {
                .ep-cards { grid-template-columns: 1fr 1fr; max-width: 620px; }
                .ep-card-ent { grid-column: 1 / -1; max-width: 360px; margin: 0 auto; width: 100%; }
            }
            @media (max-width: 560px) {
                .ep-cards { grid-template-columns: 1fr; max-width: 380px; }
                .ep-card-ent { grid-column: auto; max-width: none; }
            }

            /* ── Card base — light cards on dark bg ──── */
            .ep-card {
                border-radius: 20px;
                padding: 26px 22px 22px;
                position: relative;
                overflow: hidden;
                cursor: default;
                transition:
                    transform .26s cubic-bezier(.16,1,.3,1),
                    box-shadow .26s ease;
            }
            /* sheen sweep */
            .ep-card::before {
                content: '';
                position: absolute;
                top: 0; left: -110%; width: 55%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent);
                transition: left .55s ease;
                pointer-events: none;
                z-index: 0;
            }
            .ep-card:hover::before { left: 160%; }
            .ep-card-inner { position: relative; z-index: 1; }

            /* Basic — white */
            .ep-card-base {
                background: #fff;
                border: 1px solid rgba(255,255,255,.08);
                box-shadow: 0 4px 28px rgba(0,0,0,.32);
            }
            .ep-card-base:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 52px rgba(0,0,0,.42);
            }
            .ep-card-base::after {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; height: 2px;
                background: linear-gradient(90deg, transparent, rgba(52,112,240,.5), transparent);
                transform: scaleX(0); transform-origin: left;
                transition: transform .42s cubic-bezier(.22,1,.36,1);
                pointer-events: none;
            }
            .ep-card-base:hover::after { transform: scaleX(1); }

            /* Pro — warm off-white, featured */
            .ep-card-feat {
                background: #F9F6EF;
                border: 1.5px solid rgba(196,154,60,.32);
                box-shadow: 0 8px 44px rgba(0,0,0,.38), 0 0 0 1px rgba(196,154,60,.07);
            }
            .ep-card-feat:hover {
                transform: translateY(-6px);
                box-shadow: 0 24px 60px rgba(0,0,0,.44), 0 0 36px rgba(196,154,60,.11);
                border-color: rgba(196,154,60,.52);
            }
            .ep-pro-topbar {
                position: absolute;
                top: 0; left: 0; right: 0; height: 2.5px;
                background: linear-gradient(90deg, transparent, rgba(196,154,60,.88), transparent);
                pointer-events: none;
            }

            /* Enterprise — light blue-gray */
            .ep-card-ent {
                background: #EDF1F8;
                border: 1px solid rgba(52,112,240,.14);
                box-shadow: 0 4px 28px rgba(0,0,0,.3);
            }
            .ep-card-ent:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 52px rgba(0,0,0,.38);
                border-color: rgba(52,112,240,.26);
            }

            /* ── Badge ───────────────────────────────── */
            .ep-badge {
                position: absolute; top: 16px; right: 16px;
                display: flex; align-items: center; gap: 4px;
                font-size: 9px; font-weight: 700;
                letter-spacing: .8px; text-transform: uppercase;
                color: #fff;
                background: linear-gradient(135deg, #C49A3C, #A87D25);
                border-radius: 100px; padding: 4px 10px;
                z-index: 2;
                box-shadow: 0 2px 10px rgba(196,154,60,.38);
            }

            /* ── Tier label ──────────────────────────── */
            .ep-tier {
                font-size: 10px; font-weight: 700;
                letter-spacing: 2px; text-transform: uppercase;
                margin-bottom: 2px;
            }
            .ep-card-base .ep-tier  { color: #6B7A90; }
            .ep-card-feat .ep-tier  { color: #9A7220; }
            .ep-card-ent  .ep-tier  { color: #3470F0; }

            .ep-tagline { font-size: 12px; line-height: 1.4; margin-bottom: 14px; }
            .ep-card-base .ep-tagline { color: #6B7A90; }
            .ep-card-feat .ep-tagline { color: #8B7040; }
            .ep-card-ent  .ep-tagline { color: #4A6080; }

            /* ── Price ───────────────────────────────── */
            .ep-price-row { display: flex; align-items: baseline; gap: 2px; margin-bottom: 4px; }
            .ep-cur {
                font-family: 'Fraunces', serif;
                font-size: 16px; font-weight: 400; padding-bottom: 3px;
            }
            .ep-card-base .ep-cur { color: #3A4A60; }
            .ep-card-feat .ep-cur { color: #9A7220; }
            .ep-card-ent  .ep-cur { color: #3470F0; }

            .ep-amt {
                font-family: 'Fraunces', serif;
                font-size: 38px; font-weight: 400;
                line-height: 1; letter-spacing: -1.5px;
                transition: opacity .18s;
            }
            .ep-card-base .ep-amt { color: #0C1828; }
            .ep-card-feat .ep-amt { color: #7A5A18; }
            .ep-card-ent  .ep-amt { color: #1A3060; }

            .ep-custom {
                font-family: 'Fraunces', serif;
                font-size: 36px; font-weight: 400;
                line-height: 1; letter-spacing: -1px;
                color: #1A3060; margin-bottom: 2px;
            }

            .ep-per { font-size: 11px; margin-left: 3px; align-self: flex-end; padding-bottom: 3px; }
            .ep-card-base .ep-per { color: #6B7A90; }
            .ep-card-feat .ep-per { color: #9A8040; }
            .ep-card-ent  .ep-per { color: #4A6080; }

            .ep-annual-note {
                font-size: 11px; margin-bottom: 14px;
                transition: opacity .3s;
                min-height: 16px;
            }
            .ep-card-base .ep-annual-note { color: #6B7A90; }
            .ep-card-feat .ep-annual-note { color: #9A8040; }
            .ep-card-ent  .ep-annual-note { color: #4A6080; }

            /* ── Limits ──────────────────────────────── */
            .ep-limits { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px; }
            .ep-limit { font-size: 10.5px; font-weight: 600; border-radius: 6px; padding: 3px 9px; }
            .ep-card-base .ep-limit {
                background: rgba(52,112,240,.07); border: 1px solid rgba(52,112,240,.15); color: #2A5ABF;
            }
            .ep-card-feat .ep-limit {
                background: rgba(196,154,60,.1); border: 1px solid rgba(196,154,60,.25); color: #8A6A10;
            }
            .ep-card-ent .ep-limit {
                background: rgba(52,112,240,.08); border: 1px solid rgba(52,112,240,.18); color: #2A5ABF;
            }

            /* ── CTA ─────────────────────────────────── */
            .ep-cta {
                display: flex; align-items: center; justify-content: center;
                width: 100%; padding: 11px 0; border-radius: 11px;
                font-size: 13px; font-weight: 700;
                text-decoration: none; letter-spacing: .1px;
                margin-bottom: 16px;
                transition: all .2s ease;
                position: relative; overflow: hidden;
            }
            .ep-cta::before {
                content: '';
                position: absolute; top: 0; left: -80%; width: 50%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
                transition: left .45s ease;
            }
            .ep-cta:hover::before { left: 140%; }

            .ep-cta-outline {
                background: transparent; border: 1.5px solid rgba(12,24,40,.15); color: #3A4A60;
            }
            .ep-cta-outline:hover {
                border-color: rgba(12,24,40,.28); background: rgba(12,24,40,.04); color: #0C1828;
            }
            .ep-cta-gold {
                background: linear-gradient(135deg, #C49A3C, #A87D25);
                color: #fff; border: none;
                box-shadow: 0 3px 14px rgba(196,154,60,.3);
            }
            .ep-cta-gold:hover { box-shadow: 0 7px 24px rgba(196,154,60,.5); transform: translateY(-1px); }
            .ep-cta-ent {
                background: transparent; border: 1.5px solid rgba(52,112,240,.28); color: #3470F0;
            }
            .ep-cta-ent:hover { background: rgba(52,112,240,.06); border-color: rgba(52,112,240,.48); }

            /* ── Divider ─────────────────────────────── */
            .ep-div { height: 1px; margin-bottom: 14px; }
            .ep-card-base .ep-div { background: rgba(12,24,40,.07); }
            .ep-card-feat .ep-div { background: rgba(196,154,60,.18); }
            .ep-card-ent  .ep-div { background: rgba(52,112,240,.12); }

            /* ── Features ────────────────────────────── */
            .ep-feats { display: flex; flex-direction: column; gap: 0; }
            .ep-feat {
                display: flex; align-items: center; gap: 8px;
                padding: 4px 0; transition: padding-left .16s;
            }
            .ep-feat:not(:last-child) { border-bottom: 1px solid transparent; }
            .ep-card-base .ep-feat:not(:last-child) { border-bottom-color: rgba(12,24,40,.05); }
            .ep-card-feat .ep-feat:not(:last-child) { border-bottom-color: rgba(196,154,60,.1); }
            .ep-card-ent  .ep-feat:not(:last-child) { border-bottom-color: rgba(52,112,240,.08); }
            .ep-feat:hover { padding-left: 3px; }

            .ep-tick {
                width: 16px; height: 16px; border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: transform .2s cubic-bezier(.16,1,.3,1);
            }
            .ep-feat:hover .ep-tick { transform: scale(1.18); }
            .ep-tick-basic { background: rgba(24,184,122,.1);   border: 1px solid rgba(24,184,122,.22); }
            .ep-tick-pro   { background: rgba(196,154,60,.12);  border: 1px solid rgba(196,154,60,.28); }
            .ep-tick-ent   { background: rgba(52,112,240,.1);   border: 1px solid rgba(52,112,240,.22); }

            .ep-flbl { font-size: 12.5px; line-height: 1.3; }
            .ep-card-base .ep-flbl { color: #3A4A60; }
            .ep-card-feat .ep-flbl { color: #4A3A20; }
            .ep-card-ent  .ep-flbl { color: #2A3A50; }

            .ep-feat-inherit .ep-flbl { font-weight: 600; }
            .ep-feat-divider { height: 1px; margin: 6px 0 2px; }
            .ep-card-base .ep-feat-divider { background: rgba(12,24,40,.07); }
            .ep-card-feat .ep-feat-divider { background: rgba(196,154,60,.18); }
            .ep-card-ent  .ep-feat-divider { background: rgba(52,112,240,.12); }

            /* ── Footer ──────────────────────────────── */
            .ep-foot { margin-top: 14px; font-size: 10.5px; text-align: center; letter-spacing: .2px; }
            .ep-card-base .ep-foot { color: #8A9AB0; }
            .ep-card-feat .ep-foot { color: #9A8A60; }
            .ep-card-ent  .ep-foot { color: #6A7A90; }

            /* ── Free note ───────────────────────────── */
            .ep-free {
                text-align: center; margin-top: 28px;
                font-size: 12.5px; color: rgba(255,255,255,.35); line-height: 1.7;
            }
            .ep-free strong { color: rgba(255,255,255,.62); font-weight: 600; }
            `}</style>

            <section className="ep-section">
                <div className="wrap" style={{ paddingTop: 'clamp(36px,3.5vw,52px)', paddingBottom: 'clamp(64px,6vw,96px)' }}>
                    <div
                        ref={ref}
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'none' : 'translateY(28px)',
                            transition: 'opacity .7s ease, transform .7s ease',
                        }}
                    >
                        {/* Header */}
                        <div className="ep-header">
                            <div className="ep-eyebrow">
                                <div className="ep-eyebrow-line" />
                                Pricing
                            </div>
                            <h2 className="ep-h2">
                                Transparent pricing.<br /><em>No per-user fees.</em>
                            </h2>
                            <p className="ep-lead">One price per company. Your entire team included.</p>

                            {/* Billing toggle */}
                            <div className="ep-toggle">
                                <span
                                    className="ep-toggle-lbl"
                                    style={{
                                        color: annual ? 'rgba(255,255,255,.32)' : 'rgba(255,255,255,.88)',
                                        fontWeight: annual ? 400 : 600,
                                    }}
                                >
                                    Monthly
                                </span>
                                <div
                                    className="ep-toggle-track"
                                    onClick={() => setAnnual(a => !a)}
                                    style={{ background: annual ? '#C49A3C' : 'rgba(255,255,255,.16)' }}
                                >
                                    <div className="ep-toggle-knob" style={{ left: annual ? 18 : 3 }} />
                                </div>
                                <span
                                    className="ep-toggle-lbl"
                                    style={{
                                        color: annual ? 'rgba(255,255,255,.88)' : 'rgba(255,255,255,.32)',
                                        fontWeight: annual ? 600 : 400,
                                    }}
                                >
                                    Annual
                                </span>
                                <div
                                    className="ep-annual-pill"
                                    style={{
                                        color: annual ? '#C49A3C' : 'rgba(255,255,255,.28)',
                                        background: annual ? 'rgba(196,154,60,.14)' : 'transparent',
                                        border: `1px solid ${annual ? 'rgba(196,154,60,.32)' : 'transparent'}`,
                                    }}
                                >
                                    2 months free
                                </div>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="ep-cards">
                            {plans.map(plan => {
                                const cardClass = plan.isEnterprise
                                    ? 'ep-card ep-card-ent'
                                    : plan.isFeatured
                                        ? 'ep-card ep-card-feat'
                                        : 'ep-card ep-card-base'

                                return (
                                    <div key={plan.id} className={cardClass}>
                                        {plan.isFeatured && <div className="ep-pro-topbar" />}
                                        {plan.isFeatured && (
                                            <div className="ep-badge">
                                                <svg viewBox="0 0 10 10" width="8" height="8" fill="currentColor">
                                                    <path d="M5 0l1.5 3.1L10 3.6 7.5 6l.6 3.5L5 8 1.9 9.5 2.5 6 0 3.6l3.5-.5z" />
                                                </svg>
                                                Most Popular
                                            </div>
                                        )}

                                        <div className="ep-card-inner">
                                            <div className="ep-tier">{plan.tier}</div>
                                            <div className="ep-tagline">{plan.tagline}</div>

                                            {/* Price block */}
                                            {plan.isEnterprise ? (
                                                <>
                                                    <div className="ep-custom">Custom</div>
                                                    <div className="ep-annual-note" style={{ opacity: 1 }}>
                                                        {plan.annualNote}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="ep-price-row">
                                                        <span className="ep-cur">₹</span>
                                                        <span className="ep-amt">
                                                            {annual ? plan.price!.a : plan.price!.m}
                                                        </span>
                                                        <span className="ep-per">/month</span>
                                                    </div>
                                                    <div
                                                        className="ep-annual-note"
                                                        style={{ opacity: annual ? 1 : 0 }}
                                                    >
                                                        {plan.annualNote}
                                                    </div>
                                                </>
                                            )}

                                            {/* Limits */}
                                            <div className="ep-limits">
                                                {plan.limits.map(l => (
                                                    <span key={l} className="ep-limit">{l}</span>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            <button
                                                type="button"
                                                className={`ep-cta ep-cta-${plan.cta.variant}`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => router.push(
                                                    `/get-started?plan=${plan.id}&type=employer&billing=${annual ? 'annual' : 'monthly'}`
                                                )}
                                            >
                                                {plan.cta.label}
                                            </button>

                                            <div className="ep-div" />

                                            {/* Features list */}
                                            <div className="ep-feats">
                                                {plan.inherit && (
                                                    <>
                                                        <div className="ep-feat ep-feat-inherit">
                                                            <div className={`ep-tick ep-tick-${plan.tickVariant}`}>
                                                                <Tick c={plan.tickColor} />
                                                            </div>
                                                            <span className="ep-flbl">{plan.inherit}</span>
                                                        </div>
                                                        <div className="ep-feat-divider" />
                                                    </>
                                                )}
                                                {plan.features.map((f, i) => (
                                                    <div key={i} className="ep-feat">
                                                        <div className={`ep-tick ep-tick-${plan.tickVariant}`}>
                                                            <Tick c={plan.tickColor} />
                                                        </div>
                                                        <span className="ep-flbl">{f}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="ep-foot">
                                                {plan.isEnterprise
                                                    ? 'Custom contract · SLA included'
                                                    : 'No per-user fees · Cancel anytime'}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Free tier note */}
                        <p className="ep-free">
                            Added by an agency? You get a <strong>free managed account</strong> — view candidates, make decisions, upload contracts. No subscription needed.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}
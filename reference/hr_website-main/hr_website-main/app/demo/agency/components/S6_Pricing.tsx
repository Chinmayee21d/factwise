'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useReveal } from './SharedItems'

export default function S6_Pricing() {
    const { ref, visible } = useReveal()
    const [annual, setAnnual] = useState(false)
    const cardsRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    /* Mouse-tracking glow — identical to main Pricing.tsx */
    useEffect(() => {
        const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.pcard')
        if (!cards) return
        const handlers = new Map<HTMLElement, (e: MouseEvent) => void>()
        cards.forEach(card => {
            const fn = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect()
                const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1)
                const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1)
                card.style.setProperty('--mx', x + '%')
                card.style.setProperty('--my', y + '%')
            }
            handlers.set(card, fn)
            card.addEventListener('mousemove', fn)
        })
        return () => { handlers.forEach((fn, card) => card.removeEventListener('mousemove', fn)) }
    }, [])

    /* Price swap with fade */
    const amtStyle = { transition: 'opacity .2s' }

    return (
        <>
            <style suppressHydrationWarning>{`
                /* ── Section ── */
                .pr-section {
                    background: var(--cream);
                    color: var(--ink);
                    position: relative;
                    overflow: hidden;
                }
                .pr-section::before {
                    content: '';
                    position: absolute; inset: 0;
                    background-image: radial-gradient(circle, rgba(11,22,40,.05) 1px, transparent 1px);
                    background-size: 32px 32px;
                    pointer-events: none; z-index: 0;
                }
                .pr-section::after {
                    content: '';
                    position: absolute; top: -200px; left: 50%;
                    transform: translateX(-50%);
                    width: 900px; height: 600px;
                    background: radial-gradient(ellipse, rgba(196,154,60,.08) 0%, transparent 65%);
                    pointer-events: none; z-index: 0;
                }
                .pr-section .wrap { position: relative; z-index: 1; max-width: min(96vw, 1280px); }

                /* ── Header ── */
                .pr-h2 { color: var(--ink); }
                .pr-h2 em { color: var(--gold); font-style: italic; }
                .pr-lead-txt { color: var(--ink3); }

                /* ── Billing toggle ── */
                .pr-billing {
                    display: flex; align-items: center; gap: 12px;
                    justify-content: center; margin-bottom: 32px;
                    width: 100%; text-align: center;
                }
                .pr-bl-lbl { font-size: 13px; color: var(--ink3); font-weight: 400; transition: color .2s; }
                .pr-bl-lbl.on { color: var(--ink); font-weight: 500; }
                .pr-bl-sw {
                    width: 42px; height: 24px; border-radius: 100px;
                    background: rgba(11,22,40,.1); border: 1px solid rgba(12,24,40,.15);
                    position: relative; cursor: pointer; transition: .25s;
                }
                .pr-bl-sw.on { background: var(--gold); }
                .pr-bl-knob {
                    position: absolute; top: 3px; left: 3px;
                    width: 16px; height: 16px; border-radius: 50%; background: #fff;
                    transition: .25s cubic-bezier(.4,0,.2,1);
                    box-shadow: 0 1px 4px rgba(0,0,0,.2);
                }
                .pr-bl-sw.on .pr-bl-knob { transform: translateX(18px); }

                /* ── Cards grid ── */
                .p-cards {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 20px; align-items: stretch;
                }

                /* ── Card base ── */
                .pcard {
                    background: var(--navy2);
                    border: 1px solid rgba(255,255,255,.07);
                    border-radius: 24px; overflow: hidden;
                    position: relative; display: flex; flex-direction: column;
                    transition: transform .35s cubic-bezier(.22,1,.36,1),
                                box-shadow .35s cubic-bezier(.22,1,.36,1),
                                border-color .3s;
                    animation: pricingCardIn .55s cubic-bezier(.22,1,.36,1) both;
                }
                .pcard:nth-child(1) { animation-delay: .05s; }
                .pcard:nth-child(2) { animation-delay: .13s; }
                .pcard:nth-child(3) { animation-delay: .21s; }
                @keyframes pricingCardIn {
                    from { opacity: 0; transform: translateY(28px) scale(.97); }
                    to   { opacity: 1; transform: none; }
                }
                .pcard:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 28px 60px rgba(11,22,40,.28), 0 0 0 1px rgba(255,255,255,.07);
                }
                /* Cursor-following glow */
                .pcard::before {
                    content: ''; position: absolute; inset: 0;
                    background: radial-gradient(500px circle at var(--mx,50%) var(--my,0%), rgba(255,255,255,.055) 0%, transparent 60%);
                    opacity: 0; transition: opacity .4s; pointer-events: none; z-index: 0;
                }
                .pcard:hover::before { opacity: 1; }
                /* Top shimmer line */
                .pcard::after {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
                    transform: scaleX(0); transform-origin: left;
                    transition: transform .55s cubic-bezier(.22,1,.36,1); z-index: 1;
                }
                .pcard:hover::after { transform: scaleX(1); }

                /* Basic */
                .pcard-basic { border-color: rgba(196,154,60,.15); }
                .pcard-basic::after { background: linear-gradient(90deg, transparent, rgba(196,154,60,.2), transparent); }

                /* Enterprise */
                .pcard-enterprise { border-color: rgba(52,112,240,.18); }
                .pcard-enterprise::after { background: linear-gradient(90deg, transparent, rgba(52,112,240,.2), transparent); }

                /* Pro featured */
                .pcard.feat {
                    border-color: var(--gold);
                    box-shadow: 0 0 0 1px rgba(196,154,60,.2), 0 8px 40px rgba(196,154,60,.12);
                    transform: translateY(-4px) scale(1.015);
                }
                .pcard.feat:hover {
                    transform: translateY(-10px) scale(1.015);
                    box-shadow: 0 32px 72px rgba(11,22,40,.28),
                                0 0 0 1px rgba(196,154,60,.45),
                                0 0 60px rgba(196,154,60,.12);
                }
                .pcard-glow {
                    position: absolute; inset: 0;
                    background: radial-gradient(ellipse at 50% -10%, rgba(196,154,60,.1) 0%, transparent 55%);
                    pointer-events: none; z-index: 0;
                }

                /* Featured badge */
                .pcard-feat-lbl {
                    position: absolute; top: 18px; right: 18px;
                    display: flex; align-items: center; gap: 5px;
                    font-size: 9.5px; font-weight: 700; color: var(--navy);
                    background: var(--gold); border-radius: 100px; padding: 5px 12px;
                    text-transform: uppercase; letter-spacing: .6px; z-index: 5;
                    box-shadow: 0 4px 16px rgba(196,154,60,.45);
                    animation: featBadgePulse 3s ease-in-out infinite;
                }
                @keyframes featBadgePulse {
                    0%,100% { box-shadow: 0 4px 16px rgba(196,154,60,.45); }
                    50%     { box-shadow: 0 4px 24px rgba(196,154,60,.7); }
                }

                /* Card top */
                .pcard-top {
                    padding: 28px 24px 20px;
                    border-bottom: 1px solid rgba(255,255,255,.06);
                    position: relative; z-index: 2;
                }
                .pcard-tier-label {
                    font-size: 10px; font-weight: 700; text-transform: uppercase;
                    letter-spacing: 1.2px; color: var(--text3); margin-bottom: 6px;
                }
                .pcard-tier-pro { color: var(--gold); }
                .pcard-tier-ent { color: var(--blue); }
                .pcard-name {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(15px, 1.1vw, 18px); font-weight: 300;
                    color: var(--text2); margin-bottom: 18px;
                    letter-spacing: -.2px; line-height: 1.4;
                }
                .pcard-price-row { display: flex; align-items: baseline; gap: 2px; }
                .pcard-cur { font-size: 18px; font-weight: 300; color: var(--text3); transition: transform .3s; margin-right: 1px; }
                .pcard-cur-gold { color: var(--gold); }
                .pcard:hover .pcard-cur { transform: translateX(-2px); }
                .pcard-amt {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(38px, 3vw, 52px); font-weight: 400;
                    color: var(--text); letter-spacing: -2px; line-height: 1; transition: color .25s;
                }
                .pcard.feat .pcard-amt { color: var(--gold2); }
                .pcard-per { font-size: 12px; color: var(--text3); align-self: flex-end; padding-bottom: 6px; margin-left: 2px; }
                .pcard-custom {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(34px, 2.6vw, 46px); font-weight: 400;
                    color: var(--text); letter-spacing: -2px; line-height: 1; margin-bottom: 4px;
                }
                .pcard-annual { font-size: 11.5px; color: var(--green); margin-top: 6px; transition: opacity .2s; }
                .pcard-ent-sub { font-size: 11.5px; color: var(--text3); margin-top: 6px; }

                /* Card body */
                .pcard-body { padding: 18px 24px 24px; display: flex; flex-direction: column; flex: 1; position: relative; z-index: 2; }
                .pcard-limits { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 16px; }
                .pcard-limit {
                    font-size: 10.5px; color: var(--text3);
                    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07);
                    padding: 3px 9px; border-radius: 6px;
                    transition: border-color .2s, background .2s, color .2s;
                }
                .pcard:hover .pcard-limit { border-color: rgba(255,255,255,.12); background: rgba(255,255,255,.07); color: var(--text2); }
                .pcard-limit-feat { color: rgba(196,154,60,.7); border-color: rgba(196,154,60,.2); background: rgba(196,154,60,.06); }
                .pcard-limit-ent  { color: rgba(52,112,240,.8);  border-color: rgba(52,112,240,.2);  background: rgba(52,112,240,.06); }

                /* Feature rows */
                .pcard-feats { display: flex; flex-direction: column; gap: 0; margin-bottom: 20px; flex: 1; }
                .pcard-divider-feat { height: 1px; background: rgba(255,255,255,.05); margin: 6px 0 4px; }
                .pcard-feat {
                    display: flex; align-items: center; gap: 9px;
                    font-size: 13px; color: var(--text2); line-height: 1.45;
                    padding: 5px 8px; border-radius: 7px;
                    transition: background .2s, color .2s, transform .25s cubic-bezier(.22,1,.36,1);
                }
                .pcard-feat:hover { background: rgba(255,255,255,.05); color: var(--text); transform: translateX(3px); }
                .pcard-feat-inherit { color: var(--text3); font-size: 12px; }
                .pf-ck {
                    width: 17px; height: 17px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                    transition: transform .3s cubic-bezier(.22,1,.36,1);
                }
                .pcard-feat:hover .pf-ck { transform: scale(1.2); }
                .pf-ck svg { width: 7px; height: 7px; stroke: currentColor; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
                .pfck-gold  { background: var(--gold-bg);  color: var(--gold);  }
                .pfck-green { background: var(--green-bg); color: var(--green); }
                .pfck-blue  { background: var(--blue-bg);  color: var(--blue);  }

                /* CTA */
                .pcard-cta {
                    display: block; width: 100%; text-align: center;
                    font-family: 'Geist', sans-serif; font-size: 14px; font-weight: 600;
                    padding: 13px; border-radius: 12px; cursor: pointer; text-decoration: none;
                    border: none; margin-top: auto; position: relative; overflow: hidden;
                    transition: all .25s cubic-bezier(.22,1,.36,1); letter-spacing: .1px;
                }
                .pcard-cta::before {
                    content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent);
                    transition: left .5s;
                }
                .pcard-cta:hover::before { left: 150%; }
                .pcta-gold { background: var(--gold); color: var(--navy); box-shadow: 0 4px 20px rgba(196,154,60,.35); }
                .pcta-gold:hover { background: var(--gold2); box-shadow: 0 8px 32px rgba(196,154,60,.55), 0 0 0 1px rgba(196,154,60,.3); transform: translateY(-2px); }
                .pcard.feat .pcta-gold::after {
                    content: ''; position: absolute; inset: -3px; border-radius: 15px;
                    background: linear-gradient(90deg, var(--gold), var(--gold2), var(--gold)) border-box;
                    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor; mask-composite: exclude;
                    opacity: .55; background-size: 200% 100%;
                    animation: goldRingShimmer 2.4s linear infinite;
                }
                .pcard.feat .pcta-gold:hover::after { opacity: 1; }
                @keyframes goldRingShimmer {
                    0%   { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                .pcta-outline { background: none; border: 1px solid rgba(255,255,255,.14); color: var(--text2); }
                .pcta-outline:hover { border-color: rgba(255,255,255,.28); color: var(--text); background: rgba(255,255,255,.05); transform: translateY(-2px); }
                .pcta-ent { background: rgba(52,112,240,.1); border: 1px solid rgba(52,112,240,.2); color: rgba(52,112,240,.9); }
                .pcta-ent:hover { background: rgba(52,112,240,.18); border-color: rgba(52,112,240,.35); color: #fff; transform: translateY(-2px); }

                /* ── Slot table ── */
                .slot-box {
                    margin-top: 40px; background: var(--navy2);
                    border: 1px solid rgba(255,255,255,.07); border-radius: 18px;
                    overflow: hidden; transition: box-shadow .3s;
                }
                .slot-box:hover { box-shadow: 0 16px 48px rgba(0,0,0,.22); }
                .slot-hd { padding: 20px 26px; background: rgba(255,255,255,.03); border-bottom: 1px solid rgba(255,255,255,.06); }
                .slot-hd-title { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 400; color: var(--text); }
                .slot-hd-sub { font-size: 11px; color: var(--text3); margin-top: 3px; }
                .slot-tiers { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: rgba(255,255,255,.06); }
                .slot-tier {
                    background: var(--navy2); padding: 20px; text-align: center;
                    position: relative; overflow: hidden; transition: background .25s; cursor: default;
                }
                .slot-tier::before {
                    content: ''; position: absolute; inset: 0;
                    background: radial-gradient(circle at 50% 0%, rgba(196,154,60,.07), transparent 70%);
                    opacity: 0; transition: opacity .3s;
                }
                .slot-tier:hover { background: var(--navy3); }
                .slot-tier:hover::before { opacity: 1; }
                .slot-range { font-size: 9.5px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
                .slot-price { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 400; color: var(--text); letter-spacing: -.5px; transition: color .2s; }
                .slot-tier:hover .slot-price { color: var(--gold2); }
                .slot-unit { font-size: 9.5px; color: var(--text3); margin-top: 3px; }
                .slot-disc { display: inline-block; margin-top: 6px; font-size: 9.5px; font-weight: 600; color: var(--green); background: var(--green-bg); border-radius: 100px; padding: 2px 8px; }
                .slot-note { padding: 14px 26px; font-size: 12px; color: var(--text3); border-top: 1px solid rgba(255,255,255,.06); }
                .slot-note strong { color: var(--text); }

                /* ── Responsive ── */
                @media (max-width: 960px) {
                    .p-cards { grid-template-columns: 1fr 1fr; gap: 14px; }
                    .pcard.feat { transform: none; }
                    .pcard.feat:hover { transform: translateY(-6px); }
                    .pcard:nth-child(3) { grid-column: 1/-1; }
                    .slot-tiers { grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 600px) {
                    .p-cards { grid-template-columns: 1fr; max-width: 360px; margin-left: auto; margin-right: auto; }
                    .pcard:nth-child(3) { grid-column: auto; }
                }
            `}</style>

            <section className="pr-section">
                <div className="wrap" style={{ paddingTop: 'clamp(40px,4vw,52px)', paddingBottom: 'clamp(56px,5vw,72px)' }}>
                    <div
                        ref={ref}
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'none' : 'translateY(24px)',
                            transition: 'opacity .7s ease, transform .7s ease',
                        }}
                    >
                        {/* Header */}
                        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
                            <div className="eyebrow eyebrow-dark" style={{ justifyContent: 'center', marginBottom: 12 }}>
                                <div className="ey-line" />Agency Pricing
                            </div>
                            <h2 className="h2 h2-ink pr-h2">
                                One flat fee.<br /><em>Pay only for active clients.</em>
                            </h2>
                            <p className="lead pr-lead-txt">
                                Workspace fee + per-client slots. Volume discounts as you grow.
                            </p>
                        </div>

                        {/* Billing toggle */}
                        <div className="pr-billing">
                            <span className={`pr-bl-lbl${!annual ? ' on' : ''}`}>Monthly</span>
                            <div
                                className={`pr-bl-sw${annual ? ' on' : ''}`}
                                onClick={() => setAnnual(a => !a)}
                            >
                                <div className="pr-bl-knob" />
                            </div>
                            <span className={`pr-bl-lbl${annual ? ' on' : ''}`}>Annual</span>
                        </div>

                        {/* Cards */}
                        <div className="p-cards" ref={cardsRef}>

                            {/* Basic */}
                            <div className="pcard pcard-basic">
                                <div className="pcard-top">
                                    <div className="pcard-tier-label">Agency Basic</div>
                                    <div className="pcard-name">For boutique consultancies.</div>
                                    <div className="pcard-price-row">
                                        <span className="pcard-cur">₹</span>
                                        <span className="pcard-amt" style={amtStyle}>
                                            {annual ? '8,333' : '9,999'}
                                        </span>
                                        <span className="pcard-per">/mo workspace</span>
                                    </div>
                                    <div className="pcard-annual" style={{ opacity: annual ? 1 : 0 }}>
                                        ₹99,990/yr · save ₹19,998
                                    </div>
                                </div>
                                <div className="pcard-body">
                                    <div className="pcard-limits">
                                        <span className="pcard-limit">5 users</span>
                                        <span className="pcard-limit">Unlimited jobs</span>
                                    </div>
                                    <div className="pcard-feats">
                                        {['Magic Link candidate flows', 'AI screening (3 models)', 'Commission tracker', 'Basic agreement builder'].map(f => (
                                            <div key={f} className="pcard-feat">
                                                <div className="pf-ck pfck-gold"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2" /></svg></div>
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="pcard-cta pcta-outline"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => router.push(
                                            `/get-started?plan=basic&type=agency&billing=${annual ? 'annual' : 'monthly'}`
                                        )}
                                    >Get started</button>
                                </div>
                            </div>

                            {/* Pro (featured) */}
                            <div className="pcard feat">
                                <div className="pcard-glow" />
                                <div className="pcard-feat-lbl">
                                    <svg viewBox="0 0 10 10" width="8" height="8" fill="currentColor"><path d="M5 0l1.5 3.1L10 3.6 7.5 6l.6 3.5L5 8 1.9 9.5 2.5 6 0 3.6l3.5-.5z" /></svg>
                                    Most Popular
                                </div>
                                <div className="pcard-top">
                                    <div className="pcard-tier-label pcard-tier-pro">Agency Pro</div>
                                    <div className="pcard-name">Full intelligence, all clients.</div>
                                    <div className="pcard-price-row">
                                        <span className="pcard-cur pcard-cur-gold">₹</span>
                                        <span className="pcard-amt" style={amtStyle}>
                                            {annual ? '16,667' : '20,000'}
                                        </span>
                                        <span className="pcard-per">/mo workspace</span>
                                    </div>
                                    <div className="pcard-annual" style={{ opacity: annual ? 1 : 0 }}>
                                        ₹2,00,000/yr · save ₹40,000
                                    </div>
                                </div>
                                <div className="pcard-body">
                                    <div className="pcard-limits">
                                        <span className="pcard-limit pcard-limit-feat">Unlimited users</span>
                                        <span className="pcard-limit pcard-limit-feat">Unlimited jobs</span>
                                    </div>
                                    <div className="pcard-feats">
                                        <div className="pcard-feat pcard-feat-inherit">
                                            <div className="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2" /></svg></div>
                                            <span>Everything in Basic</span>
                                        </div>
                                        <div className="pcard-divider-feat" />
                                        {['Full 7-signal ML matching', 'Agreement builder + auto-calculation', 'White-label client portal', 'ERP commission payable sync'].map(f => (
                                            <div key={f} className="pcard-feat">
                                                <div className="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2" /></svg></div>
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="pcard-cta pcta-gold"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => router.push(
                                            `/get-started?plan=pro&type=agency&billing=${annual ? 'annual' : 'monthly'}`
                                        )}
                                    >Get started</button>
                                </div>
                            </div>

                            {/* Enterprise */}
                            <div className="pcard pcard-enterprise">
                                <div className="pcard-top">
                                    <div className="pcard-tier-label pcard-tier-ent">Agency Enterprise</div>
                                    <div className="pcard-name">Large staffing firms.</div>
                                    <div className="pcard-custom">Custom</div>
                                    <div className="pcard-ent-sub">Annual · Volume</div>
                                </div>
                                <div className="pcard-body">
                                    <div className="pcard-limits">
                                        <span className="pcard-limit pcard-limit-ent">Unlimited everything</span>
                                    </div>
                                    <div className="pcard-feats">
                                        <div className="pcard-feat pcard-feat-inherit">
                                            <div className="pf-ck pfck-blue"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2" /></svg></div>
                                            <span>Everything in Pro</span>
                                        </div>
                                        <div className="pcard-divider-feat" />
                                        {['Custom ML signals', 'SSO + DPDP / SOC 2', 'Full API + custom integrations'].map(f => (
                                            <div key={f} className="pcard-feat">
                                                <div className="pf-ck pfck-blue"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2" /></svg></div>
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="pcard-cta pcta-ent"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => router.push(
                                            `/get-started?plan=enterprise&type=agency&billing=${annual ? 'annual' : 'monthly'}`
                                        )}
                                    >Talk to us</button>
                                </div>
                            </div>

                        </div>

                        {/* Slot pricing table */}
                        <div className="slot-box">
                            <div className="slot-hd">
                                <div className="slot-hd-title">Per-client slot pricing</div>
                                <div className="slot-hd-sub">Volume discounts applied automatically</div>
                            </div>
                            <div className="slot-tiers">
                                {[
                                    { range: '1–5 clients', price: '₹499', unit: 'per client / month', disc: null },
                                    { range: '6–15 clients', price: '₹399', unit: 'per client / month', disc: 'Save 20%' },
                                    { range: '16–30 clients', price: '₹299', unit: 'per client / month', disc: 'Save 40%' },
                                    { range: '31+ clients', price: '₹199', unit: 'per client / month', disc: 'Save 60%' },
                                ].map(t => (
                                    <div key={t.range} className="slot-tier">
                                        <div className="slot-range">{t.range}</div>
                                        <div className="slot-price">{t.price}</div>
                                        <div className="slot-unit">{t.unit}</div>
                                        {t.disc && <div className="slot-disc">{t.disc}</div>}
                                    </div>
                                ))}
                            </div>
                            <div className="slot-note">
                                Example: Agency Pro + 12 clients = ₹20,000 + (5×₹499) + (7×₹399) = <strong>₹25,288/month</strong>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { submitGetStartedForm } from './actions'

/* ─── Logo ─── */
function Logo({ height = 28 }: { height?: number }) {
    const width = Math.round(height * (370 / 130))
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}
            viewBox="0 0 370 130" aria-label="HR Ops" role="img"
            style={{ display: 'block', flexShrink: 0 }}>
            <text y="105" x="8" fontSize="112"
                fontFamily="'Cormorant Garamond','Garamond','Georgia',serif"
                fontWeight="700" fontStyle="italic">
                <tspan fill="#C6A85E">HR</tspan>
                <tspan fill="#6B7A8D" fontWeight="300" dx="-6">OPS</tspan>
            </text>
        </svg>
    )
}

/* ─── Plan data ─── */
const EMPLOYER_PLANS: Record<string, PlanData> = {
    basic: {
        id: 'basic', type: 'employer', tier: 'Basic', tagline: 'For growing teams.',
        priceMonthly: '4,999', priceAnnual: '4,166', annualNote: '₹49,990/yr · save ₹9,998',
        limits: ['3 users', '2 active jobs', 'BYOK AI'],
        features: ['AI screening with reasoning', 'Visual pipeline builder', 'Magic Link assessments', 'Agency connections', 'Basic analytics (90 days)'],
        inherit: null, accentColor: '#18B87A', accentBg: 'rgba(24,184,122,.1)', accentBorder: 'rgba(24,184,122,.22)', badgeVariant: 'green',
    },
    pro: {
        id: 'pro', type: 'employer', tier: 'Pro', tagline: 'The full AI advantage.',
        priceMonthly: '9,999', priceAnnual: '8,333', annualNote: '₹99,990/yr · save ₹19,998',
        limits: ['10 users', 'Unlimited jobs', 'HR Ops AI'],
        features: ['Everything in Basic', 'HR Ops AI — no BYOK required', 'Learning loop', 'Natural language analytics', 'Panel variance flags', 'ERP integration (SAP, Tally, NetSuite)'],
        inherit: 'Everything in Basic', accentColor: '#C49A3C', accentBg: 'rgba(196,154,60,.12)', accentBorder: 'rgba(196,154,60,.28)', badgeVariant: 'gold', isFeatured: true,
    },
    enterprise: {
        id: 'enterprise', type: 'employer', tier: 'Enterprise', tagline: 'Custom infrastructure for scale.',
        priceMonthly: 'Custom', priceAnnual: 'Custom', annualNote: 'Volume pricing applied',
        limits: ['Unlimited everything', 'Dedicated support', 'Custom AI'],
        features: ['SSO/SAML 2.0', 'DPDP / SOC 2 Compliance', 'Full API Access', 'Custom Workflow integrations'],
        inherit: null, accentColor: '#3470F0', accentBg: 'rgba(52,112,240,.1)', accentBorder: 'rgba(52,112,240,.22)', badgeVariant: 'blue',
    },
}
const AGENCY_PLANS: Record<string, PlanData> = {
    basic: {
        id: 'basic', type: 'agency', tier: 'Agency Basic', tagline: 'For boutique consultancies.',
        priceMonthly: '9,999', priceAnnual: '8,333', annualNote: '₹99,990/yr · save ₹19,998',
        limits: ['5 users', 'Unlimited jobs'],
        features: ['Magic Link candidate flows', 'AI screening (3 models)', 'Commission tracker', 'Basic agreement builder'],
        inherit: null, accentColor: '#C49A3C', accentBg: 'rgba(196,154,60,.1)', accentBorder: 'rgba(196,154,60,.22)', badgeVariant: 'gold',
    },
    pro: {
        id: 'pro', type: 'agency', tier: 'Agency Pro', tagline: 'Full intelligence, all clients.',
        priceMonthly: '20,000', priceAnnual: '16,667', annualNote: '₹2,00,000/yr · save ₹40,000',
        limits: ['Unlimited users', 'Unlimited jobs'],
        features: ['Everything in Basic', 'Full 7-signal ML matching', 'Agreement builder + auto-calculation', 'White-label client portal', 'ERP commission payable sync'],
        inherit: 'Everything in Basic', accentColor: '#C49A3C', accentBg: 'rgba(196,154,60,.12)', accentBorder: 'rgba(196,154,60,.28)', badgeVariant: 'gold', isFeatured: true,
    },
    enterprise: {
        id: 'enterprise', type: 'agency', tier: 'Agency Enterprise', tagline: 'Large staffing firm solutions.',
        priceMonthly: 'Custom', priceAnnual: 'Custom', annualNote: 'Volume pricing applied',
        limits: ['Unlimited everything', 'Custom ML signals', 'SSO Support'],
        features: ['Multi-office orchestration', 'Custom reporting engine', 'White-label candidate experience', 'Dedicated account strategist'],
        inherit: null, accentColor: '#3470F0', accentBg: 'rgba(52,112,240,.1)', accentBorder: 'rgba(52,112,240,.22)', badgeVariant: 'blue',
    },
}

interface PlanData {
    id: string; type: 'employer' | 'agency'; tier: string; tagline: string
    priceMonthly: string; priceAnnual: string; annualNote: string
    limits: string[]; features: string[]; inherit: string | null
    accentColor: string; accentBg: string; accentBorder: string
    badgeVariant: 'gold' | 'green' | 'blue'; isFeatured?: boolean
}

function getPlan(type: string | null, planId: string | null): PlanData | null {
    const map = type === 'agency' ? AGENCY_PLANS : EMPLOYER_PLANS
    return map[planId ?? 'pro'] ?? null
}

function Tick({ color }: { color: string }) {
    return (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none"
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" stroke={color}>
            <polyline points="1.5,4.5 3.5,6.5 7.5,2.5" />
        </svg>
    )
}

/* ─── Main ─── */
export default function GetStartedForm() {
    const params = useSearchParams()
    const planId = params.get('plan')
    const type = params.get('type')
    const billing = params.get('billing') ?? 'monthly'
    const plan = getPlan(type, planId)

    // Use a clearly named state object — avoids any shadowing with "form" HTML element
    const [fields, setFields] = useState({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        teamSize: '',
        message: '',
    })

    // Use refs as a backup to guarantee we always read the latest DOM values on submit
    const nameRef = useRef<HTMLInputElement>(null)
    const companyRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const teamRef = useRef<HTMLSelectElement>(null)
    const messageRef = useRef<HTMLTextAreaElement>(null)

    const [mounted, setMounted] = useState(false)
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [statusMessage, setStatusMessage] = useState('')

    useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])

    if (!plan) {
        return (
            <div style={{ background: '#0B1628', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, fontFamily: 'Geist,sans-serif', color: '#EEF2FF' }}>
                <Logo height={32} />
                <p style={{ color: 'rgba(255,255,255,.35)', fontSize: 14 }}>Plan not found.</p>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: '#C49A3C', textDecoration: 'none', fontSize: 13, background: 'rgba(196,154,60,.08)', border: '1px solid rgba(196,154,60,.2)', borderRadius: 9, padding: '8px 16px', fontWeight: 500 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,2.5 4.5,7 9,11.5" /></svg>
                    Back to home
                </Link>
            </div>
        )
    }

    const p: PlanData = plan
    const price = billing === 'annual' ? p.priceAnnual : p.priceMonthly
    const billingLabel = billing === 'annual' ? 'Annual billing' : 'Monthly billing'
    const ac = p.accentColor
    const isAnnual = billing === 'annual'
    const isGreen = p.badgeVariant === 'green'

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (status === 'submitting') return

        setStatus('submitting')

        // Always read from refs first — guarantees latest DOM values on all browsers
        const v = {
            fullName: nameRef.current?.value || fields.fullName,
            company: companyRef.current?.value || fields.company,
            email: emailRef.current?.value || fields.email,
            phone: phoneRef.current?.value || fields.phone,
            teamSize: teamRef.current?.value || fields.teamSize,
            message: messageRef.current?.value || fields.message,
        }

        const result = await submitGetStartedForm({
            ...v,
            plan: {
                tier: p.tier,
                type: p.type,
                billing: billing,
                price: price
            }
        })

        if (result.success) {
            setStatus('success')
        } else {
            setStatus('error')
            setStatusMessage(result.message || 'Something went wrong.')
        }
    }

    return (
        <>
            <style suppressHydrationWarning>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                /* ── Page ── */
                .gs-page {
                    min-height: 100vh;
                    background: #0B1628;
                    display: flex; flex-direction: column;
                    font-family: 'Geist', sans-serif;
                    color: #EEF2FF;
                    position: relative; overflow-x: hidden;
                }

                /* Ambient bg */
                .gs-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
                .gs-bg-grid {
                    position: absolute; inset: -60%;
                    background-image:
                        linear-gradient(rgba(196,154,60,.024) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(196,154,60,.024) 1px, transparent 1px);
                    background-size: 72px 72px;
                    animation: bgDrift 100s linear infinite;
                }
                @keyframes bgDrift { to { transform: translate(72px,72px); } }
                .gs-bg-glow1 {
                    position: absolute; top: -10%; left: -5%;
                    width: 55vw; height: 55vw; max-width: 600px; max-height: 600px;
                    background: radial-gradient(ellipse, rgba(196,154,60,.04) 0%, transparent 65%);
                }
                .gs-bg-glow2 {
                    position: absolute; bottom: 0; right: 0;
                    width: 40vw; height: 40vw; max-width: 500px; max-height: 500px;
                    background: radial-gradient(ellipse, rgba(52,112,240,.036) 0%, transparent 65%);
                }

                /* ── Navbar ── */
                .gs-nav {
                    position: sticky; top: 0; z-index: 100;
                    height: 60px;
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 0 clamp(16px, 4vw, 56px);
                    background: rgba(11,22,40,.92);
                    backdrop-filter: blur(20px) saturate(1.5);
                    -webkit-backdrop-filter: blur(20px) saturate(1.5);
                    border-bottom: 1px solid rgba(255,255,255,.07);
                    box-shadow: inset 0 1px 0 rgba(196,154,60,.18);
                    flex-shrink: 0;
                }
                .gs-logo-link {
                    display: flex; align-items: center;
                    text-decoration: none; opacity: .9; transition: opacity .2s;
                }
                .gs-logo-link:hover { opacity: 1; }
                .gs-back {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 6px 13px 6px 9px;
                    font-size: 12.5px; font-weight: 500; letter-spacing: .01em;
                    color: rgba(200,215,235,.62);
                    text-decoration: none;
                    border: 1px solid rgba(255,255,255,.1);
                    border-radius: 8px;
                    background: rgba(255,255,255,.04);
                    transition: color .2s, border-color .25s, background .2s, transform .2s;
                    position: relative; overflow: hidden;
                    white-space: nowrap;
                }
                .gs-back::after {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(110deg, transparent 20%, rgba(196,154,60,.08) 50%, transparent 80%);
                    transform: translateX(-120%); transition: transform .45s ease;
                }
                .gs-back:hover { color: rgba(240,248,255,.92); border-color: rgba(196,154,60,.3); background: rgba(196,154,60,.06); transform: translateX(-2px); }
                .gs-back:hover::after { transform: translateX(120%); }
                .gs-back svg { flex-shrink: 0; transition: transform .2s; }
                .gs-back:hover svg { transform: translateX(-2px); }

                /* ── Page wrapper ── */
                .gs-wrap {
                    flex: 1; position: relative; z-index: 1;
                    width: 100%; max-width: 1120px; margin: 0 auto;
                    padding: clamp(28px,4vw,56px) clamp(16px,4vw,48px) clamp(40px,5vw,72px);
                }

                /* ── Hero — full width above grid ── */
                .gs-hero { margin-bottom: 32px; }
                .gs-eyebrow {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-size: 10.5px; font-weight: 700;
                    letter-spacing: 2.2px; text-transform: uppercase;
                    color: ${ac}; opacity: .85; margin-bottom: 14px;
                }
                .gs-eyebrow-dot {
                    width: 5px; height: 5px; border-radius: 50%;
                    background: ${ac}; box-shadow: 0 0 6px ${ac}99;
                    flex-shrink: 0;
                    animation: dotPulse 2.2s ease-in-out infinite;
                }
                @keyframes dotPulse {
                    0%,100% { box-shadow: 0 0 0 0 ${ac}55; }
                    50%      { box-shadow: 0 0 0 5px ${ac}00; }
                }
                .gs-heading {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(26px, 4vw, 46px);
                    font-weight: 400; line-height: 1.06;
                    letter-spacing: -1.1px; color: #EEF2FF; margin-bottom: 12px;
                }
                .gs-heading em { font-style: italic; font-weight: 300; color: ${ac}; }
                .gs-subtext {
                    font-size: 14px; line-height: 1.68;
                    color: rgba(255,255,255,.37); font-weight: 300; max-width: 500px;
                }
                .gs-subtext strong { color: rgba(255,255,255,.58); font-weight: 500; }

                /* ══════════════════════════════════
                   DESKTOP GRID: form | card
                   Both columns align at their tops
                ══════════════════════════════════ */
                .gs-columns {
                    display: grid;
                    grid-template-columns: ${planId === 'enterprise' ? '1fr' : '1fr 385px'};
                    gap: 28px;
                    align-items: start;
                    max-width: ${planId === 'enterprise' ? '680px' : 'none'};
                    margin: ${planId === 'enterprise' ? '0 auto' : '0'};
                }

                /* Form col */
                .gs-form-col {
                    display: flex; flex-direction: column; gap: 18px;
                    opacity: ${mounted ? 1 : 0};
                    transform: ${mounted ? 'none' : 'translateY(18px)'};
                    transition: opacity .5s .04s ease, transform .5s .04s cubic-bezier(.16,1,.3,1);
                }

                /* Card col — sticky on desktop */
                .gs-card-col {
                    position: sticky; top: 76px;
                    opacity: ${mounted ? 1 : 0};
                    transform: ${mounted ? 'none' : 'translateY(18px)'};
                    transition: opacity .5s .1s ease, transform .5s .1s cubic-bezier(.16,1,.3,1);
                }

                /* ── Fields ── */
                .gs-field { display: flex; flex-direction: column; gap: 7px; }
                .gs-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
                .gs-label {
                    font-size: 10.5px; font-weight: 600;
                    letter-spacing: 1px; text-transform: uppercase;
                    color: rgba(255,255,255,.33);
                }
                .gs-req { color: ${ac}; margin-left: 1px; }

                .gs-input, .gs-select, .gs-textarea {
                    width: 100%;
                    background: rgba(255,255,255,.038);
                    border: 1px solid rgba(255,255,255,.085);
                    border-radius: 10px; padding: 11px 14px;
                    font-size: 13.5px; font-family: 'Geist', sans-serif;
                    color: #EEF2FF; outline: none; letter-spacing: .01em;
                    transition: border-color .2s, background .2s, box-shadow .2s;
                }
                .gs-input::placeholder, .gs-textarea::placeholder { color: rgba(255,255,255,.18); }
                .gs-input:hover:not(:focus), .gs-select:hover:not(:focus), .gs-textarea:hover:not(:focus) {
                    border-color: rgba(255,255,255,.13); background: rgba(255,255,255,.05);
                }
                .gs-input:focus, .gs-select:focus, .gs-textarea:focus {
                    border-color: ${ac}55; background: rgba(255,255,255,.055); box-shadow: 0 0 0 3px ${ac}12;
                }
                .gs-select {
                    appearance: none; cursor: pointer;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5l3 3 3-3' stroke='rgba(255,255,255,0.28)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
                    background-repeat: no-repeat; background-position: right 13px center; padding-right: 36px;
                }
                .gs-select option { background: #0E1D34; color: #EEF2FF; }
                .gs-textarea { resize: vertical; min-height: 96px; line-height: 1.58; }

                /* Plan pill */
                .gs-plan-pill {
                    display: flex; align-items: center; gap: 10px;
                    background: ${ac}0d; border: 1px solid ${ac}25;
                    border-radius: 10px; padding: 11px 15px;
                    font-size: 13px; color: rgba(255,255,255,.68);
                    cursor: default; position: relative; overflow: hidden;
                    flex-wrap: wrap;
                }
                .gs-plan-pill::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
                    background: linear-gradient(90deg, transparent, ${ac}44, transparent);
                }
                .gs-plan-dot {
                    width: 7px; height: 7px; border-radius: 50%;
                    background: ${ac}; box-shadow: 0 0 7px ${ac}88; flex-shrink: 0;
                    animation: dotPulse 2.2s ease-in-out infinite;
                }
                .gs-plan-name { font-weight: 600; color: ${ac}; }
                .gs-plan-sep  { color: rgba(255,255,255,.2); }

                /* CTA */
                .gs-cta {
                    padding: 14px 24px; border: none; border-radius: 11px;
                    font-family: 'Geist', sans-serif;
                    font-size: 14px; font-weight: 700; letter-spacing: .2px;
                    color: #fff; cursor: pointer; width: 100%;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    position: relative; overflow: hidden;
                    transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s;
                    background: ${isGreen
                    ? 'linear-gradient(135deg,#18B87A,#12956A)'
                    : 'linear-gradient(135deg,#C49A3C,#A87D25)'};
                    box-shadow: ${isGreen
                    ? '0 4px 22px rgba(24,184,122,.22), inset 0 1px 0 rgba(255,255,255,.1)'
                    : '0 4px 22px rgba(196,154,60,.26), inset 0 1px 0 rgba(255,255,255,.1)'};
                }
                .gs-cta::before {
                    content: ''; position: absolute; top: 0; left: -80%; width: 50%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent);
                    transform: skewX(-18deg); transition: left .5s ease;
                }
                .gs-cta:hover { transform: translateY(-2px); box-shadow: ${isGreen ? '0 8px 32px rgba(24,184,122,.38)' : '0 8px 32px rgba(196,154,60,.44)'}; }
                .gs-cta:hover::before { left: 140%; }
                .gs-cta:active { transform: translateY(0) scale(.99); }
                .gs-cta:disabled { opacity: .7; cursor: not-allowed; filter: grayscale(.3); }

                .gs-cta-note {
                    display: flex; align-items: center; justify-content: center; gap: 5px;
                    font-size: 11.5px; color: rgba(255,255,255,.24); text-align: center; line-height: 1.5;
                }

                /* ── Loading Spinner ── */
                .spinner {
                    width: 16px; height: 16px; border: 2.2px solid rgba(255,255,255,.3);
                    border-top-color: #fff; border-radius: 50%;
                    animation: spin .8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* ── Error Message ── */
                .gs-error-msg {
                    padding: 10px 14px; border-radius: 9px;
                    background: rgba(220,53,69,.08); border: 1px solid rgba(220,53,69,.22);
                    color: #FF7070; font-size: 12.5px; display: flex; align-items: start; gap: 8px;
                }

                /* ── Success UI ── */
                .gs-success {
                    display: flex; flex-direction: column; align-items: center; text-align: center;
                    padding: clamp(64px, 10vh, 120px) 24px;
                    animation: slideIn .6s cubic-bezier(.16,1,.3,1);
                    width: 100%; max-width: 480px; margin: 0 auto;
                }
                @keyframes slideIn { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform:none; } }

                .gs-success-icon {
                    width: 64px; height: 64px; border-radius: 32px;
                    background: ${isGreen ? 'rgba(24,184,122,.1)' : 'rgba(196,154,60,.1)'};
                    border: 1px solid ${isGreen ? 'rgba(24,184,122,.2)' : 'rgba(196,154,60,.2)'};
                    display: flex; align-items: center; justify-content: center;
                    color: ${ac}; margin-bottom: 24px;
                    box-shadow: 0 0 40px ${ac}11;
                }
                .gs-success-heading {
                    font-family: 'Fraunces', serif; font-size: 32px; font-weight: 400;
                    color: #EEF2FF; letter-spacing: -.6px; margin-bottom: 12px;
                }
                .gs-success-text {
                    font-size: 15px; color: rgba(255,255,255,.4); max-width: 360px; line-height: 1.6;
                    margin-bottom: 32px;
                }
                .gs-success-actions { display: flex; gap: 12px; }
                .gs-btn-sec {
                    padding: 12px 24px; border-radius: 11px;
                    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
                    color: rgba(255,255,255,.6); font-size: 14px; text-decoration: none;
                    font-weight: 600; text-align: center;
                    display: flex; align-items: center; justify-content: center;
                    transition: background .2s, border-color .2s, color .2s;
                }
                .gs-btn-sec:hover { background: rgba(255,255,255,.07); border-color: rgba(255,255,255,.15); color: #fff; }

                /* ══════════════════════════════════
                   PLAN CARD
                ══════════════════════════════════ */
                .gs-card {
                    background: #0E1D34; border: 1px solid rgba(255,255,255,.08);
                    border-radius: 20px; overflow: hidden;
                    box-shadow: 0 24px 64px rgba(0,0,0,.42), inset 0 0 0 1px rgba(255,255,255,.03);
                    position: relative;
                }
                .gs-card-topbar {
                    position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
                    background: linear-gradient(90deg, transparent, ${ac}cc 35%, ${ac}cc 65%, transparent);
                }
                .gs-card-header {
                    padding: 22px 22px 18px; border-bottom: 1px solid rgba(255,255,255,.055);
                    position: relative;
                }
                .gs-card-header::after {
                    content: ''; position: absolute; top: -15px; right: -10px;
                    width: 110px; height: 110px; border-radius: 50%;
                    background: ${ac}0a; filter: blur(28px); pointer-events: none;
                }
                .gs-c-eyebrow {
                    font-size: 9.5px; font-weight: 700; letter-spacing: 1.8px;
                    text-transform: uppercase; color: ${ac}; opacity: .75; margin-bottom: 4px;
                }
                .gs-c-tier {
                    font-family: 'Fraunces', serif; font-size: 22px; font-weight: 400;
                    color: #EEF2FF; letter-spacing: -.4px; margin-bottom: 2px;
                }
                .gs-c-tagline { font-size: 12px; color: rgba(255,255,255,.3); font-weight: 300; margin-bottom: 16px; }
                .gs-c-price   { display: flex; align-items: baseline; gap: 2px; margin-bottom: 4px; }
                .gs-c-cur     { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 400; color: ${ac}; opacity: .88; padding-bottom: 3px; }
                .gs-c-amt     { font-family: 'Fraunces', serif; font-size: 40px; font-weight: 400; color: #EEF2FF; letter-spacing: -1.5px; line-height: 1; }
                .gs-c-per     { font-size: 12px; color: rgba(255,255,255,.28); margin-left: 4px; padding-bottom: 3px; }
                .gs-c-annual  { font-size: 11px; color: #18B87A; margin-top: 4px; display: flex; align-items: center; gap: 5px; }
                .gs-c-limits  { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 14px; }
                .gs-c-limit   { font-size: 10.5px; font-weight: 600; border-radius: 7px; padding: 3px 10px; background: ${ac}10; border: 1px solid ${ac}26; color: ${ac}cc; }
                .gs-card-body { padding: 16px 22px 20px; }
                .gs-feats-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,.22); margin-bottom: 10px; }
                .gs-feats { display: flex; flex-direction: column; }
                .gs-feat { display: flex; align-items: center; gap: 9px; padding: 5px 0; font-size: 12.5px; color: rgba(255,255,255,.62); border-bottom: 1px solid rgba(255,255,255,.038); }
                .gs-feat:last-child { border-bottom: none; }
                .gs-feat-tick { width: 17px; height: 17px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: ${p.accentBg}; border: 1px solid ${p.accentBorder}; }
                .gs-feat-inherit { font-weight: 600; font-size: 12px; color: rgba(255,255,255,.38); }
                .gs-feat-div { height: 1px; background: rgba(255,255,255,.045); margin: 3px 0; }
                .gs-card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,.05); gap: 8px; flex-wrap: wrap; }
                .gs-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 500; color: rgba(255,255,255,.3); background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 100px; padding: 3px 9px; letter-spacing: .1px; }
                .gs-badge-green { color: rgba(24,184,122,.65); background: rgba(24,184,122,.06); border-color: rgba(24,184,122,.15); }

                /* ══════════════════════════════════
                   RESPONSIVE
                ══════════════════════════════════ */

                /* Tablet & mobile: single column, card FIRST then form */
                @media (max-width: 860px) {
                    .gs-columns {
                        display: flex;
                        flex-direction: column;
                        gap: 32px;
                    }
                    .gs-form-col { order: 2; width: 100%; }   /* form after */
                    .gs-card-col { order: 1; position: static; width: 100%; }  /* card first */
                    .gs-hero { margin-bottom: 24px; text-align: center; }
                    .gs-eyebrow { justify-content: center; }
                    .gs-subtext { max-width: 100%; margin-left: auto; margin-right: auto; }
                }

                /* Phablet & Phone */
                @media (max-width: 640px) {
                    .gs-heading { letter-spacing: -.7px; }
                    .gs-wrap { padding-top: 24px; padding-bottom: 48px; }
                    .gs-c-amt { font-size: 36px; }
                    .gs-success-actions { flex-direction: column; align-items: stretch; }
                    .gs-success-actions .gs-cta,
                    .gs-success-actions .gs-btn-sec { text-align: center; justify-content: center; }
                    .gs-field-row { gap: 12px; } /* Tighter gap on small screens */
                }

                /* Tiny: hide back-button text */
                @media (max-width: 360px) {
                    .gs-back-text { display: none; }
                    .gs-back { padding: 7px 10px; }
                }
            `}</style>

            <div className="gs-page">
                <div className="gs-bg" aria-hidden="true">
                    <div className="gs-bg-grid" />
                    <div className="gs-bg-glow1" />
                    <div className="gs-bg-glow2" />
                </div>

                {/* Navbar */}
                <nav className="gs-nav">
                    <Link href="/" className="gs-logo-link" aria-label="HR Ops home">
                        <Logo height={28} />
                    </Link>
                    <Link href={type === 'agency' ? '/demo/agency' : '/demo/employer'} className="gs-back">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9,2.5 4.5,7 9,11.5" />
                        </svg>
                        <span className="gs-back-text">Back to pricing</span>
                    </Link>
                </nav>

                <div className="gs-wrap">

                    {/* Hero — full width */}
                    <div className="gs-hero">
                        <div className="gs-eyebrow">
                            <div className="gs-eyebrow-dot" />
                            {type === 'agency' ? 'Agency Plan' : 'Employer Plan'}
                        </div>
                        <h1 className="gs-heading">
                            {planId === 'enterprise' ? (
                                <>Talk to an <em>Enterprise Specialist</em></>
                            ) : (
                                <>Good things start<br />with a <em>first step.</em></>
                            )}
                        </h1>
                        <p className="gs-subtext">
                            {planId === 'enterprise' ? (
                                <>Connect with our solutions team to discuss custom infrastructure, SSO, and high-volume matching for your <strong>{p.type === 'agency' ? 'agency' : 'enterprise'}</strong>.</>
                            ) : (
                                <>
                                    Thanks for connecting with HR Ops. Fill in a few details and hit send —
                                    we'll reach out within one business day to get you set up on the{' '}
                                    <strong>{p.tier}</strong> plan.
                                </>
                            )}
                        </p>
                    </div>

                    {/* Columns */}
                    <div className="gs-columns">

                        {/* ── FORM (order 1 on mobile) ── */}
                        {status === 'success' ? (
                            <div className="gs-success">
                                <div className="gs-success-icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <h2 className="gs-success-heading">We've got it!</h2>
                                <p className="gs-success-text">
                                    Thanks, <strong>{fields.fullName}</strong>. We've received your {planId === 'enterprise' ? 'enterprise inquiry' : `request for the ${p.tier} plan`} and will reach out to you within 24 hours.
                                </p>
                                <div className="gs-success-actions">
                                    <Link href="/" className="gs-cta">
                                        Back to home
                                    </Link>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="gs-btn-sec"
                                    >
                                        Edit details
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form
                                className="gs-form-col"
                                onSubmit={handleSubmit}
                                id="get-started-form"
                                data-analytics-form="get_started"
                                data-analytics-section="get-started"
                            >

                                {/* Selected plan read-only pill */}
                                {planId !== 'enterprise' && (
                                    <div className="gs-field">
                                        <label className="gs-label">Selected plan</label>
                                        <div className="gs-plan-pill">
                                            <div className="gs-plan-dot" />
                                            <span className="gs-plan-name">{p.tier}</span>
                                            <span className="gs-plan-sep">·</span>
                                            <span>₹{price}/mo</span>
                                            <span className="gs-plan-sep">·</span>
                                            <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 12 }}>{billingLabel}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Name + Company */}
                                <div className="gs-field-row">
                                    <div className="gs-field">
                                        <label className="gs-label" htmlFor="gs-fullName">
                                            Your name<span className="gs-req"> *</span>
                                        </label>
                                        <input
                                            ref={nameRef}
                                            id="gs-fullName"
                                            className="gs-input"
                                            type="text"
                                            name="fullName"
                                            placeholder="Your full name"
                                            value={fields.fullName}
                                            onChange={handleChange}
                                            required
                                            autoComplete="name"
                                            disabled={status === 'submitting'}
                                        />
                                    </div>
                                    <div className="gs-field">
                                        <label className="gs-label" htmlFor="gs-company">
                                            Company<span className="gs-req"> *</span>
                                        </label>
                                        <input
                                            ref={companyRef}
                                            id="gs-company"
                                            className="gs-input"
                                            type="text"
                                            name="company"
                                            placeholder="Your company name"
                                            value={fields.company}
                                            onChange={handleChange}
                                            required
                                            autoComplete="organization"
                                            disabled={status === 'submitting'}
                                        />
                                    </div>
                                </div>

                                {/* Email + Phone */}
                                <div className="gs-field-row">
                                    <div className="gs-field">
                                        <label className="gs-label" htmlFor="gs-email">
                                            Work email<span className="gs-req"> *</span>
                                        </label>
                                        <input
                                            ref={emailRef}
                                            id="gs-email"
                                            className="gs-input"
                                            type="email"
                                            name="email"
                                            placeholder="you@company.com"
                                            value={fields.email}
                                            onChange={handleChange}
                                            required
                                            autoComplete="email"
                                            disabled={status === 'submitting'}
                                        />
                                    </div>
                                    <div className="gs-field">
                                        <label className="gs-label" htmlFor="gs-phone">Phone</label>
                                        <input
                                            ref={phoneRef}
                                            id="gs-phone"
                                            className="gs-input"
                                            type="tel"
                                            name="phone"
                                            placeholder="+91 XXXXX XXXXX"
                                            value={fields.phone}
                                            onChange={handleChange}
                                            autoComplete="tel"
                                            disabled={status === 'submitting'}
                                        />
                                    </div>
                                </div>

                                {/* Team size */}
                                <div className="gs-field">
                                    <label className="gs-label" htmlFor="gs-teamSize">
                                        {type === 'agency' ? 'Agency size' : 'Team size'}
                                    </label>
                                    <select
                                        ref={teamRef}
                                        id="gs-teamSize"
                                        className="gs-select"
                                        name="teamSize"
                                        value={fields.teamSize}
                                        onChange={handleChange}
                                        disabled={status === 'submitting'}
                                    >
                                        <option value="">Select size…</option>
                                        {type === 'agency' ? (
                                            <>
                                                <option value="1-5 recruiters">1–5 recruiters</option>
                                                <option value="6-15 recruiters">6–15 recruiters</option>
                                                <option value="16-30 recruiters">16–30 recruiters</option>
                                                <option value="31+ recruiters">31+ recruiters</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="1-10 employees">1–10 employees</option>
                                                <option value="11-50 employees">11–50 employees</option>
                                                <option value="51-200 employees">51–200 employees</option>
                                                <option value="201-500 employees">201–500 employees</option>
                                                <option value="500+ employees">500+ employees</option>
                                            </>
                                        )}
                                    </select>
                                </div>

                                {/* Message */}
                                <div className="gs-field">
                                    <label className="gs-label" htmlFor="gs-message">
                                        Anything else we should know?
                                    </label>
                                    <textarea
                                        ref={messageRef}
                                        id="gs-message"
                                        className="gs-textarea"
                                        name="message"
                                        placeholder="Tell us about your hiring workflow, current tools, or any questions…"
                                        value={fields.message}
                                        onChange={handleChange}
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                {/* Error message if any */}
                                {status === 'error' && (
                                    <div className="gs-error-msg">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        <span>{statusMessage}</span>
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="gs-cta"
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <div className="spinner" />
                                            <span>Sending details…</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M2 7.5h11M8.5 3l5 4.5-5 4.5" />
                                            </svg>
                                            <span>Send to HR Ops team</span>
                                        </>
                                    )}
                                </button>

                                <p className="gs-cta-note">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                                        <rect x="1.5" y="5" width="9" height="6.5" rx="1.5" />
                                        <path d="M3.5 5V3.5a2.5 2.5 0 015 0V5" />
                                    </svg>
                                    Your details will be sent directly to our team — no mail client needed.
                                </p>
                            </form>
                        )}

                        {/* ── CARD (order 2 on mobile) (Hiding for enterprise) ── */}
                        {planId !== 'enterprise' && (
                            <div className="gs-card-col">
                                <div className="gs-card">
                                    <div className="gs-card-topbar" />
                                    <div className="gs-card-header">
                                        <div className="gs-c-eyebrow">
                                            {type === 'agency' ? 'Agency' : 'Employer'} · {billingLabel}
                                        </div>
                                        <div className="gs-c-tier">{p.tier}</div>
                                        <div className="gs-c-tagline">{p.tagline}</div>
                                        <div className="gs-c-price">
                                            <span className="gs-c-cur">₹</span>
                                            <span className="gs-c-amt">{price}</span>
                                            <span className="gs-c-per">/month</span>
                                        </div>
                                        {isAnnual && (
                                            <div className="gs-c-annual">
                                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                                                    stroke="currentColor" strokeWidth="1.5"
                                                    strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="2,5.5 4.5,8 9,3" />
                                                </svg>
                                                {p.annualNote}
                                            </div>
                                        )}
                                        <div className="gs-c-limits">
                                            {p.limits.map(l => (
                                                <span key={l} className="gs-c-limit">{l}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="gs-card-body">
                                        <div className="gs-feats-label">What's included</div>
                                        <div className="gs-feats">
                                            {p.features.map((f, i) => {
                                                const isInherit = f === p.inherit
                                                return (
                                                    <div key={i} className="gs-feat-wrap">
                                                        {isInherit && <div className="gs-feat-div" />}
                                                        <div className={`gs-feat ${isInherit ? 'gs-feat-inherit' : ''}`}>
                                                            <div className="gs-feat-tick">
                                                                <Tick color={ac} />
                                                            </div>
                                                            {f}
                                                        </div>
                                                        {isInherit && <div className="gs-feat-div" />}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="gs-card-footer">
                                            <div className="gs-badge">
                                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                                                    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                                                    <circle cx="5.5" cy="5.5" r="4" />
                                                    <path d="M5.5 3.5v2l1.2 1.2" />
                                                </svg>
                                                No per-user fees · Cancel anytime
                                            </div>
                                            <div className="gs-badge gs-badge-green">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                                    stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                                                    <rect x="1.5" y="4.5" width="7" height="5" rx="1.2" />
                                                    <path d="M3 4.5V3a2 2 0 014 0v1.5" />
                                                </svg>
                                                Secure
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>{/* /gs-columns */}
                </div>{/* /gs-wrap */}
            </div>
        </>
    )
}

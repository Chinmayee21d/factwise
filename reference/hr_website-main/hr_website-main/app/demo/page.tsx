'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const FEATURES = [
  {
    title: 'Live pipeline walkthrough',
    desc: 'See a real hiring flow — agency submission to final offer — in your 30-minute session.',
  },
  {
    title: 'AI screening in action',
    desc: 'Watch three models score a CV live. Transparent reasoning, no black box.',
  },
  {
    title: 'Magic Link & WhatsApp flow',
    desc: 'See how candidates apply from a single URL on their phone. No app, no account.',
  },
  {
    title: 'Scoped access demo',
    desc: 'We show you each persona view — agency, HR, candidate, hiring manager — in one session.',
  },
]

const TEAM_SIZES = ['Just me', '2–10', '11–50', '51–200', '200+']
const ROLES = ['HR Manager', 'Talent Acquisition', 'Founder / CEO', 'Operations', 'Recruiter / Agency', 'Other']
const CHALLENGES = [
  'Too many manual follow-ups',
  'Agency coordination chaos',
  'Slow time-to-hire',
  'No visibility across pipeline',
  'Candidate drop-off',
  'Compliance & documentation',
]

export default function DemoPage() {
  const blob1 = useRef<HTMLDivElement>(null)
  const blob2 = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    teamSize: '', role: '', challenge: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Blob animation
  useEffect(() => {
    let raf: number
    let t = 0
    const tick = () => {
      t += 0.003
      if (blob1.current) {
        blob1.current.style.transform = `translate(${Math.sin(t * 0.7) * 18}px, ${Math.cos(t * 0.5) * 12}px)`
      }
      if (blob2.current) {
        blob2.current.style.transform = `translate(${Math.sin(t * 0.7 + Math.PI) * 14}px, ${Math.cos(t * 0.5 + Math.PI) * 10}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.company.trim()) e.company = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid work email required'
    if (!form.teamSize) e.teamSize = 'Required'
    if (!form.role) e.role = 'Required'
    return e
  }

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --navy: #0B1628; --navy2: #0E1D34; --navy3: #122040;
          --surface: #16284A; --surface2: #1B3057;
          --border: rgba(255,255,255,.07); --border2: rgba(255,255,255,.13);
          --text: #EEF2FF; --text2: #8FA3C0; --text3: #56728F;
          --gold: #C49A3C; --gold2: #DDB84A; --gold-bg: rgba(196,154,60,.1);
          --green: #18B87A; --red: #E0384F;
        }
        html, body { min-height: 100vh; background: var(--navy); color: var(--text);
          font-family: 'Geist', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

        /* ── Background ── */
        .demo-bg { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
        .demo-bg-grid {
          position: absolute; inset: -60%;
          background-image: linear-gradient(rgba(196,154,60,.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(196,154,60,.04) 1px,transparent 1px);
          background-size: 72px 72px;
          animation: gridShift 60s linear infinite;
        }
        .demo-orb1 {
          position: absolute; width: 640px; height: 640px; border-radius: 50%;
          background: radial-gradient(circle,rgba(196,154,60,.08) 0%,transparent 70%);
          top: -200px; right: -100px; animation: orbFloat 20s ease-in-out infinite;
        }
        .demo-orb2 {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle,rgba(52,112,240,.06) 0%,transparent 70%);
          bottom: -150px; left: -100px; animation: orbFloat 26s ease-in-out infinite reverse;
        }
        .demo-sweep {
          position: absolute; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(196,154,60,.35),transparent);
          animation: sweep 9s ease-in-out infinite; opacity: 0;
        }
        .demo-sweep:nth-child(1){ top:20%; width:50%; left:-5%; animation-delay:0s; }
        .demo-sweep:nth-child(2){ top:55%; width:40%; left:8%; animation-delay:3s; animation-duration:11s; }
        .demo-sweep:nth-child(3){ top:80%; width:55%; left:-8%; animation-delay:6s; animation-duration:8.5s; }

        /* ── Nav ── */
        .demo-nav {
          position: relative; z-index: 10; height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(24px,4vw,72px);
          background: rgba(11,22,40,.92); backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,255,255,.055);
        }

        /* Logo */
        .demo-nav-logo {
          display: flex; align-items: center;
          text-decoration: none; user-select: none;
        }

        /* Back button — pill, prominent */
        .demo-nav-back {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 500; color: var(--text2);
          text-decoration: none;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 100px;
          padding: 9px 20px 9px 15px;
          transition: color .2s, background .2s, border-color .2s, transform .2s;
        }
        .demo-nav-back:hover {
          color: var(--text); background: rgba(255,255,255,.09);
          border-color: rgba(255,255,255,.22); transform: translateX(-3px);
        }
        .demo-nav-back:hover .back-arrow { transform: translateX(-2px); }
        .back-arrow { transition: transform .2s; display: flex; align-items: center; }

        /* ── Page ── */
        .demo-page {
          position: relative; z-index: 1;
          min-height: calc(100vh - 68px);
          display: flex; align-items: center; justify-content: center;
          padding: clamp(24px,3vw,40px) clamp(16px,3vw,40px);
        }

        /* ── Main card ── */
        .demo-card {
          width: 100%; max-width: 1060px;
          display: grid; grid-template-columns: 1fr 1fr;
          background: rgba(14,29,52,.92); backdrop-filter: blur(28px);
          border: 1px solid rgba(196,154,60,.22);
          border-radius: 24px;
          box-shadow: 0 0 0 1px rgba(255,255,255,.03), 0 40px 100px rgba(0,0,0,.55),
            0 0 60px rgba(196,154,60,.07);
          overflow: hidden;
          animation: cardIn .6s cubic-bezier(.22,1,.36,1) both;
          position: relative;
        }
        .demo-card::before {
          content: ''; position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(196,154,60,.55),transparent);
        }

        /* ── Left panel ── */
        .demo-left {
          padding: clamp(32px,3.5vw,52px) clamp(28px,3vw,44px);
          border-right: 1px solid rgba(255,255,255,.07);
          display: flex; flex-direction: column;
          background: rgba(12,24,40,.4);
        }
        .demo-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 600; letter-spacing: 2.5px;
          text-transform: uppercase; color: var(--gold); margin-bottom: 14px;
        }
        .demo-eyebrow-line { width: 18px; height: 1px; background: var(--gold); }
        .demo-left-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(26px,2.4vw,38px); font-weight: 400;
          line-height: 1.1; letter-spacing: -.5px; color: var(--text); margin-bottom: 10px;
        }
        .demo-left-title em { font-style: italic; color: var(--gold); font-weight: 300; }
        .demo-left-sub {
          font-size: 14px; color: var(--text3); line-height: 1.65;
          font-weight: 300; margin-bottom: 28px;
        }

        /* Feature list */
        .demo-feats { display: flex; flex-direction: column; gap: 0; flex: 1; }
        .demo-feat {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.06);
          transition: padding-left .25s;
        }
        .demo-feat:last-child { border-bottom: none; }
        .demo-feat:hover { padding-left: 4px; }
        .demo-feat-icon {
          width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
          background: rgba(196,154,60,.1); border: 1px solid rgba(196,154,60,.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); transition: transform .25s, background .25s;
        }
        .demo-feat:hover .demo-feat-icon { transform: scale(1.08) rotate(-3deg); background: rgba(196,154,60,.18); }
        .demo-feat-icon svg { width: 15px; height: 15px; stroke: currentColor; fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
        .demo-feat-title { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
        .demo-feat-desc { font-size: 12px; color: var(--text3); line-height: 1.55; }

        /* Outcome card */
        .demo-outcome {
          margin-top: 24px; padding: 16px 18px;
          background: rgba(196,154,60,.07); border: 1px solid rgba(196,154,60,.2);
          border-radius: 12px;
        }
        .demo-outcome-lbl {
          font-size: 9px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: var(--gold); margin-bottom: 7px;
        }
        .demo-outcome-val {
          font-family: 'Fraunces', serif;
          font-size: clamp(22px,2vw,28px); font-weight: 400;
          color: var(--text); letter-spacing: -.4px; margin-bottom: 3px;
        }
        .demo-outcome-sub { font-size: 11.5px; color: var(--text3); }

        /* ── Right panel ── */
        .demo-right {
          padding: clamp(32px,3.5vw,52px) clamp(28px,3vw,44px);
          display: flex; flex-direction: column;
        }
        .demo-form-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(20px,1.6vw,26px); font-weight: 400;
          color: var(--text); margin-bottom: 6px; letter-spacing: -.2px;
        }
        .demo-form-sub { font-size: 12.5px; color: var(--text3); margin-bottom: 24px; line-height: 1.5; }

        /* Form grid */
        .demo-form { display: flex; flex-direction: column; gap: 0; flex: 1; }
        .demo-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .demo-row-full { margin-bottom: 12px; }
        .demo-field label {
          display: block; font-size: 9.5px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--text3); margin-bottom: 5px;
        }
        .demo-field input, .demo-field select {
          width: 100%; background: rgba(255,255,255,.04); border: 1px solid var(--border2);
          border-radius: 10px; padding: 11px 13px;
          font-family: 'Geist', sans-serif; font-size: 13.5px; color: var(--text);
          outline: none; transition: border-color .2s, background .2s, box-shadow .2s;
          -webkit-appearance: none; appearance: none;
        }
        .demo-field input::placeholder { color: var(--text3); }
        .demo-field input:focus, .demo-field select:focus {
          border-color: rgba(196,154,60,.5); background: rgba(196,154,60,.04);
          box-shadow: 0 0 0 3px rgba(196,154,60,.1);
        }
        .demo-field .demo-sel-wrap { position: relative; }
        .demo-field .demo-sel-wrap::after {
          content: ''; position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent;
          border-top: 5px solid var(--text3); pointer-events: none;
        }
        .demo-field select option { background: var(--navy2); color: var(--text); }
        .demo-field-err { font-size: 10.5px; color: var(--red); margin-top: 4px; }
        .err-inp { border-color: rgba(224,56,79,.45) !important; box-shadow: 0 0 0 3px rgba(224,56,79,.08) !important; }

        /* Submit */
        .demo-submit {
          margin-top: 18px; width: 100%; padding: 14px;
          background: var(--gold); border: none; border-radius: 12px;
          font-family: 'Geist', sans-serif; font-size: 15px; font-weight: 700;
          color: var(--navy); cursor: pointer; position: relative; overflow: hidden;
          transition: background .2s, transform .2s, box-shadow .2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          min-height: 52px;
        }
        .demo-submit::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);
          transition: left .5s;
        }
        .demo-submit:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(196,154,60,.45); }
        .demo-submit:hover::before { left: 150%; }
        .demo-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
        .demo-submit-note { font-size: 11px; color: var(--text3); text-align: center; margin-top: 10px; }

        /* Spinner */
        .demo-spinner {
          width: 18px; height: 18px; border: 2px solid rgba(11,22,40,.3);
          border-top-color: var(--navy); border-radius: 50%; animation: spin .7s linear infinite;
        }

        /* ── Success ── */
        .demo-success {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center; flex: 1; padding: 20px 0;
          animation: cardIn .5s cubic-bezier(.22,1,.36,1) both;
        }
        .demo-success-icon {
          width: 68px; height: 68px; border-radius: 50%;
          background: rgba(24,184,122,.1); border: 1px solid rgba(24,184,122,.3);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px; animation: successPop .5s cubic-bezier(.22,1,.36,1) both;
        }
        .demo-success-title {
          font-family: 'Fraunces', serif; font-size: 24px; font-weight: 400;
          color: var(--text); margin-bottom: 10px; letter-spacing: -.2px;
        }
        .demo-success-sub { font-size: 13.5px; color: var(--text3); line-height: 1.65; max-width: 340px; }
        .demo-progress { margin-top: 28px; width: 100%; height: 3px; background: var(--border); border-radius: 100px; overflow: hidden; }
        .demo-progress-bar { height: 100%; background: var(--gold); border-radius: 100px; animation: progressFill 2.8s linear forwards; }

        /* ── Responsive ── */
        @media (max-width: 820px) {
          .demo-card { grid-template-columns: 1fr; }
          .demo-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,.07); }
          .demo-outcome { display: none; }
        }
        @media (max-width: 560px) {
          .demo-row { grid-template-columns: 1fr; }
          .demo-left-title { font-size: 24px; }
        }

        /* ── Keyframes ── */
        @keyframes gridShift { from{transform:translate(0,0)} to{transform:translate(72px,72px)} }
        @keyframes orbFloat { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
        @keyframes sweep { 0%,100%{opacity:0;transform:translateX(-200%)} 50%{opacity:1;transform:translateX(200%)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(24px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes successPop { 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes progressFill { from{width:0%} to{width:100%} }
      `}</style>

      {/* Background */}
      <div className="demo-bg">
        <div className="demo-bg-grid" />
        <div className="demo-orb1" />
        <div className="demo-orb2" />
        <div className="demo-sweep" />
        <div className="demo-sweep" />
        <div className="demo-sweep" />
        {/* Animated blobs (same as CTA) */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', overflow: 'hidden', width: 300, height: 300, borderRadius: '50%', pointerEvents: 'none' }}>
          <div ref={blob1} style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(196,154,60,.13) 0%,transparent 70%)', filter: 'blur(40px)' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', overflow: 'hidden', width: 300, height: 300, borderRadius: '50%', pointerEvents: 'none' }}>
          <div ref={blob2} style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(196,154,60,.09) 0%,transparent 70%)', filter: 'blur(48px)' }} />
        </div>
      </div>

      {/* Nav */}
      <nav className="demo-nav">
        <Link href="/" className="demo-nav-logo" aria-label="HR Ops home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={Math.round(36 * (370 / 130))}
            height={36}
            viewBox="0 0 370 130"
            aria-hidden="true"
            style={{ display: 'block', flexShrink: 0 }}
          >
            <text y="105" x="8" fontSize="112"
              fontFamily="'Cormorant Garamond','Garamond','Georgia',serif"
              fontWeight="700" fontStyle="italic">
              <tspan fill="#C6A85E">HR</tspan>
              <tspan fill="#6B7A8D" fontWeight="300" dx="-6">OPS</tspan>
            </text>
          </svg>
        </Link>
        <Link href="/" className="demo-nav-back">
          <span className="back-arrow">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 11.5L5.5 7.5l4-4" />
            </svg>
          </span>
          Back to site
        </Link>
      </nav>

      {/* Main */}
      <div className="demo-page">
        <div className="demo-card">

          {/* ── LEFT ── */}
          <div className="demo-left">
            <div className="demo-eyebrow">
              <span className="demo-eyebrow-line" />
              30-Minute Demo
            </div>
            <h1 className="demo-left-title">
              See HR Ops<br /><em>in 30 minutes.</em>
            </h1>
            <p className="demo-left-sub">
              A live walkthrough tailored to your hiring challenges — agency portals, AI screening, Magic Links, and offer flow. All in one session.
            </p>

            <div className="demo-feats">
              {FEATURES.map((f, i) => (
                <div className="demo-feat" key={i}>
                  <div className="demo-feat-icon">
                    {i === 0 && <svg viewBox="0 0 16 16"><path d="M2 8l4 4 8-8" /></svg>}
                    {i === 1 && <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" /><path d="M8 5.5V8l2 2" /></svg>}
                    {i === 2 && <svg viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M2 6h12" /></svg>}
                    {i === 3 && <svg viewBox="0 0 16 16"><path d="M8 2v4M2 8h4M10 8h4M8 10v4" /><circle cx="8" cy="8" r="2" /></svg>}
                  </div>
                  <div>
                    <div className="demo-feat-title">{f.title}</div>
                    <div className="demo-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="demo-outcome">
              <div className="demo-outcome-lbl">Average outcome</div>
              <div className="demo-outcome-val">14-day time-to-hire</div>
              <div className="demo-outcome-sub">Down from 42 days — across mid-market hiring teams in India</div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="demo-right">
            {!submitted ? (
              <>
                <div className="demo-form-title">Book your demo</div>
                <div className="demo-form-sub">We'll confirm within 2 hours and tailor the session to your pipeline.</div>

                <form className="demo-form" onSubmit={submit} noValidate>
                  <div className="demo-row">
                    <div className="demo-field">
                      <label>Full Name *</label>
                      <input
                        type="text" placeholder="Your full name"
                        value={form.name} onChange={e => set('name', e.target.value)}
                        className={errors.name ? 'err-inp' : ''}
                      />
                      {errors.name && <div className="demo-field-err">{errors.name}</div>}
                    </div>
                    <div className="demo-field">
                      <label>Company *</label>
                      <input
                        type="text" placeholder="Your company name"
                        value={form.company} onChange={e => set('company', e.target.value)}
                        className={errors.company ? 'err-inp' : ''}
                      />
                      {errors.company && <div className="demo-field-err">{errors.company}</div>}
                    </div>
                  </div>

                  <div className="demo-row-full demo-field">
                    <label>Work Email *</label>
                    <input
                      type="email" placeholder="you@company.com"
                      value={form.email} onChange={e => set('email', e.target.value)}
                      className={errors.email ? 'err-inp' : ''}
                    />
                    {errors.email && <div className="demo-field-err">{errors.email}</div>}
                  </div>

                  <div className="demo-row-full demo-field">
                    <label>Phone (optional)</label>
                    <input
                      type="tel" placeholder="+91 XXXXX XXXXX"
                      value={form.phone} onChange={e => set('phone', e.target.value)}
                    />
                  </div>

                  <div className="demo-row">
                    <div className="demo-field">
                      <label>Team Size *</label>
                      <div className="demo-sel-wrap">
                        <select
                          value={form.teamSize} onChange={e => set('teamSize', e.target.value)}
                          className={errors.teamSize ? 'err-inp' : ''}
                        >
                          <option value="">Select…</option>
                          {TEAM_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      {errors.teamSize && <div className="demo-field-err">{errors.teamSize}</div>}
                    </div>
                    <div className="demo-field">
                      <label>Your Role *</label>
                      <div className="demo-sel-wrap">
                        <select
                          value={form.role} onChange={e => set('role', e.target.value)}
                          className={errors.role ? 'err-inp' : ''}
                        >
                          <option value="">Select…</option>
                          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                      {errors.role && <div className="demo-field-err">{errors.role}</div>}
                    </div>
                  </div>

                  <div className="demo-row-full demo-field">
                    <label>Biggest hiring challenge</label>
                    <div className="demo-sel-wrap">
                      <select value={form.challenge} onChange={e => set('challenge', e.target.value)}>
                        <option value="">Select…</option>
                        {CHALLENGES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="demo-submit" disabled={loading}>
                    {loading
                      ? <span className="demo-spinner" />
                      : <>Book Demo &amp; Verify Email</>
                    }
                  </button>
                  <div className="demo-submit-note">Secure OTP verification is required before access.</div>
                </form>
              </>
            ) : (
              <div className="demo-success">
                <div className="demo-success-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#18B87A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 14l6 6 12-12" />
                  </svg>
                </div>
                <h2 className="demo-success-title">You're booked in!</h2>
                <p className="demo-success-sub">
                  Check your inbox — a confirmation and OTP are on their way to <strong style={{ color: 'var(--text)' }}>{form.email}</strong>.
                  We'll confirm your slot within 2 hours.
                </p>
                <div className="demo-progress"><div className="demo-progress-bar" /></div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}
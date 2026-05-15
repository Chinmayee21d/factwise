'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './S5_OfferSection.module.css'

function useReveal(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        setVisible(false)
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, visible }
}

/* ── SVG icons (replacing all emojis) ── */
function IconFile({ color = 'var(--green)' }: { color?: string }) {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    )
}
function IconReceipt({ color = 'var(--text2)' }: { color?: string }) {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2V2l-3 2-3-2-3 2-3-2-3 2z" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="16" y2="14" />
        </svg>
    )
}
function IconLocked({ color = '#18B87A' }: { color?: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    )
}
function IconUnlocked({ color = 'var(--text3)' }: { color?: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
    )
}

/* ── Cursor ── */
function OfferCursor({ x, y, visible: show, ring }: { x: number; y: number; visible: boolean; ring?: boolean }) {
    return (
        <div style={{
            position: 'absolute', left: x, top: y,
            pointerEvents: 'none', zIndex: 50,
            transform: 'translate(-2px,-1px)',
            transition: 'left .5s cubic-bezier(.16,1,.3,1), top .5s cubic-bezier(.16,1,.3,1), opacity .2s',
            opacity: show ? 1 : 0,
        }}>
            {ring && (
                <div 
                    className={styles.ocRippleAnim}
                    style={{
                    position: 'absolute', top: -12, left: -12,
                    width: 28, height: 28, borderRadius: '50%',
                    border: '2px solid #C49A3C',
                    pointerEvents: 'none',
                }} />
            )}
            <svg width="15" height="19" viewBox="0 0 18 21" fill="none">
                <path d="M3 2L16 10.5L9 12L6.5 20L3 2Z" fill="white" stroke="#080f1e" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

/* ── Panel 0 — Upload ── */
function PanelUpload() {
    const [uploadPct, setUploadPct] = useState(0)
    const [uploaded, setUploaded] = useState(false)
    const [showCTC, setShowCTC] = useState(false)
    const [notified, setNotified] = useState(false)
    const [cx, setCx] = useState(30); const [cy, setCy] = useState(80)
    const [curVis, setCurVis] = useState(false); const [ring, setRing] = useState(false)

    useEffect(() => {
        const ts: ReturnType<typeof setTimeout>[] = []
        ts.push(setTimeout(() => { setCurVis(true); setCx(30); setCy(80) }, 200))
        ts.push(setTimeout(() => { setCx(200); setCy(104) }, 500))
        ts.push(setTimeout(() => setRing(true), 950))
        ts.push(setTimeout(() => setRing(false), 1000))
        ts.push(setTimeout(() => setUploadPct(30), 1050))
        ts.push(setTimeout(() => setUploadPct(65), 1400))
        ts.push(setTimeout(() => setUploadPct(100), 1800))
        ts.push(setTimeout(() => setUploaded(true), 2050))
        ts.push(setTimeout(() => { setCx(120); setCy(195); setShowCTC(true) }, 2300))
        ts.push(setTimeout(() => setNotified(true), 2800))
        ts.push(setTimeout(() => setCurVis(false), 3100))
        return () => ts.forEach(clearTimeout)
    }, [])

    return (
        <div style={{ position: 'relative', padding: '16px' }}>
            {/* Upload zone */}
            <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.2px', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>Offer Document</div>
                <div style={{
                    padding: '12px 14px', borderRadius: 9,
                    background: uploaded ? 'rgba(24,184,122,.07)' : 'rgba(52,112,240,.06)',
                    border: `1.5px dashed ${uploaded ? 'rgba(24,184,122,.4)' : 'rgba(52,112,240,.35)'}`,
                    transition: 'all .45s ease',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: uploadPct > 0 && !uploaded ? 8 : 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <IconFile color={uploaded ? '#18B87A' : 'var(--text3)'} />
                            <span style={{ fontSize: 10, fontWeight: 600, color: uploaded ? '#18B87A' : 'var(--text3)' }}>
                                {uploaded ? 'Offer_Letter_PriyaSharma.pdf' : uploadPct > 0 ? 'Uploading…' : 'Drop signed offer letter here'}
                            </span>
                        </div>
                        {uploaded && <span style={{ fontSize: 9, color: '#18B87A', fontWeight: 700 }}>Verified</span>}
                    </div>
                    {uploadPct > 0 && !uploaded && (
                        <div style={{ height: 3, background: 'rgba(255,255,255,.08)', borderRadius: 100, overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: 'var(--blue)', borderRadius: 100, width: `${uploadPct}%`, transition: 'width .4s ease' }} />
                        </div>
                    )}
                </div>
            </div>

            {/* CTC Breakdown */}
            <div style={{ marginBottom: 12, opacity: showCTC ? 1 : 0, transform: showCTC ? 'none' : 'translateY(6px)', transition: 'opacity .4s, transform .4s' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.2px', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>CTC Breakdown</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[{ l: 'CTC (Annual)', v: '₹24,00,000' }, { l: 'Variable (12.5%)', v: '₹3,00,000' }, { l: 'Joining bonus', v: '₹1,20,000' }].map((r, i) => (
                        <div key={i} style={{
                            display: 'flex', justifyContent: 'space-between', padding: '6px 10px', borderRadius: 7,
                            background: 'rgba(255,255,255,.035)', border: '1px solid rgba(255,255,255,.06)',
                            opacity: showCTC ? 1 : 0, transition: `opacity .35s ease ${i * 0.08}s`,
                        }}>
                            <span style={{ fontSize: 10, color: 'var(--text3)' }}>{r.l}</span>
                            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text2)' }}>{r.v}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notification pills */}
            <div style={{ display: 'flex', gap: 6, opacity: notified ? 1 : 0, transform: notified ? 'none' : 'translateY(5px)', transition: 'opacity .4s, transform .4s' }}>
                {[{ l: 'Employer notified', c: '#3470F0' }, { l: 'Agency notified', c: '#C49A3C' }].map(p => (
                    <div key={p.l} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, padding: '6px 9px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 7 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.c, flexShrink: 0, boxShadow: `0 0 5px ${p.c}88` }} />
                        <span style={{ fontSize: 9, color: 'var(--text2)', fontWeight: 500 }}>{p.l}</span>
                    </div>
                ))}
            </div>
            <OfferCursor x={cx} y={cy} visible={curVis} ring={ring} />
        </div>
    )
}

/* ── Panel 1 — Confirm ── */
function PanelConfirm() {
    const [empDone, setEmpDone] = useState(false)
    const [agencyDone, setAgencyDone] = useState(false)
    const [timerW, setTimerW] = useState(0)
    const [locked, setLocked] = useState(false)
    const [cx, setCx] = useState(90); const [cy, setCy] = useState(80)
    const [curVis, setCurVis] = useState(false); const [ring, setRing] = useState(false)

    useEffect(() => {
        const ts: ReturnType<typeof setTimeout>[] = []
        ts.push(setTimeout(() => { setCurVis(true); setCx(90); setCy(80) }, 200))
        ts.push(setTimeout(() => { setCx(100); setCy(128) }, 500))
        ts.push(setTimeout(() => setRing(true), 950))
        ts.push(setTimeout(() => { setRing(false); setEmpDone(true) }, 1000))
        ts.push(setTimeout(() => { setCx(240); setCy(128) }, 1400))
        ts.push(setTimeout(() => setRing(true), 1850))
        ts.push(setTimeout(() => { setRing(false); setAgencyDone(true) }, 1900))
        ts.push(setTimeout(() => { setCurVis(false); setTimerW(100) }, 2200))
        ts.push(setTimeout(() => setLocked(true), 3800))
        return () => ts.forEach(clearTimeout)
    }, [])

    return (
        <div style={{ position: 'relative', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, marginBottom: 12, background: 'rgba(24,184,122,.06)', border: '1px solid rgba(24,184,122,.2)' }}>
                <IconFile color="#18B87A" />
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#18B87A' }}>Offer_Letter_PriyaSharma.pdf</div>
                    <div style={{ fontSize: 9, color: 'var(--text3)' }}>CTC ₹24,00,000 · uploaded and verified</div>
                </div>
                <span style={{ fontSize: 9, color: '#18B87A', fontWeight: 700 }}>✓</span>
            </div>

            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.2px', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>Awaiting confirmation</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                {[
                    { label: 'Employer', sub: 'TechCorp HR', done: empDone, c: '#3470F0', bg: 'rgba(52,112,240,' },
                    { label: 'Agency', sub: 'TalentHub', done: agencyDone, c: '#C49A3C', bg: 'rgba(196,154,60,' },
                ].map(p => (
                    <div key={p.label} style={{
                        padding: '10px 12px', borderRadius: 9, textAlign: 'center',
                        background: p.done ? `${p.bg}.1)` : 'rgba(255,255,255,.03)',
                        border: `1.5px solid ${p.done ? `${p.bg}.4)` : 'rgba(255,255,255,.09)'}`,
                        transition: 'all .4s cubic-bezier(.34,1.56,.64,1)',
                        boxShadow: p.done ? `0 0 14px ${p.bg}.2)` : 'none',
                    }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: p.done ? p.c : 'var(--text3)', marginBottom: 2, transition: 'color .35s' }}>{p.done ? '✓  Confirmed' : 'Awaiting…'}</div>
                        <div style={{ fontSize: 9, color: 'var(--text3)' }}>{p.label}</div>
                        <div style={{ fontSize: 8, color: 'var(--text3)', opacity: .7 }}>{p.sub}</div>
                    </div>
                ))}
            </div>

            <div style={{ padding: '8px 11px', borderRadius: 8, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 9, color: 'var(--text3)' }}>48h auto-lock — no dispute window</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: locked ? '#18B87A' : '#C49A3C', transition: 'color .4s' }}>
                        {locked ? 'Locked' : `${Math.round((1 - timerW / 100) * 48)}h left`}
                    </span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,.07)', borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 100, background: locked ? '#18B87A' : '#C49A3C', width: `${timerW}%`, transition: 'width 1.6s ease, background .5s' }} />
                </div>
            </div>
            <OfferCursor x={cx} y={cy} visible={curVis} ring={ring} />
        </div>
    )
}

/* ── Panel 2 — Calculate ── */
function PanelCalc() {
    const [row0, setRow0] = useState(false)
    const [row1, setRow1] = useState(false)
    const [row2, setRow2] = useState(false)
    const [lockAnim, setLockAnim] = useState(false)
    const [cx, setCx] = useState(100); const [cy, setCy] = useState(80)
    const [curVis, setCurVis] = useState(false); const [ring, setRing] = useState(false)

    useEffect(() => {
        const ts: ReturnType<typeof setTimeout>[] = []
        ts.push(setTimeout(() => { setCurVis(true); setCx(100); setCy(80) }, 200))
        ts.push(setTimeout(() => { setCx(280); setCy(115); setRow0(true) }, 700))
        ts.push(setTimeout(() => { setCx(280); setCy(165); setRow1(true) }, 1400))
        ts.push(setTimeout(() => { setCx(280); setCy(215); setRow2(true) }, 2100))
        ts.push(setTimeout(() => { setCx(200); setCy(290); setRing(true) }, 2700))
        ts.push(setTimeout(() => { setRing(false); setLockAnim(true) }, 2750))
        ts.push(setTimeout(() => setCurVis(false), 3000))
        return () => ts.forEach(clearTimeout)
    }, [])

    const rows = [
        { label: 'Base CTC', val: '₹24,00,000', shown: row0, barColor: '#3470F0', barW: '100%', highlight: false },
        { label: 'Agency rate', val: '5%', shown: row1, barColor: '#C49A3C', barW: '50%', highlight: false },
        { label: 'Commission due', val: '₹1,20,000', shown: row2, barColor: '#C49A3C', barW: '100%', highlight: true },
    ]

    return (
        <div style={{ position: 'relative', padding: '16px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.2px', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 12 }}>Commission Calculation</div>

            {rows.map((r, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <span style={{ fontSize: 11, fontWeight: r.highlight ? 700 : 500, color: r.highlight ? '#C49A3C' : 'var(--text2)' }}>{r.label}</span>
                        {/* Agency rate shown as pill, not bar */}
                        {r.label === 'Agency rate' ? (
                            <span style={{
                                fontSize: 11, fontWeight: 700, color: '#C49A3C',
                                background: 'rgba(196,154,60,.12)', border: '1px solid rgba(196,154,60,.28)',
                                borderRadius: 6, padding: '2px 8px',
                                opacity: r.shown ? 1 : 0.15, transition: 'opacity .4s',
                            }}>{r.val}</span>
                        ) : (
                            <span style={{ fontSize: 12, fontWeight: 700, color: r.highlight ? '#C49A3C' : 'var(--text)', fontFamily: r.highlight ? "'Fraunces',serif" : 'inherit', opacity: r.shown ? 1 : 0.2, transition: 'opacity .4s' }}>{r.val}</span>
                        )}
                    </div>
                    {r.label !== 'Agency rate' && (
                        <div style={{ height: r.highlight ? 5 : 4, background: 'rgba(255,255,255,.07)', borderRadius: 100, overflow: 'hidden' }}>
                            <div style={{ height: '100%', borderRadius: 100, background: r.barColor, width: r.shown ? r.barW : '0%', transition: 'width .9s cubic-bezier(.16,1,.3,1)', boxShadow: r.highlight && r.shown ? `0 0 8px ${r.barColor}88` : 'none' }} />
                        </div>
                    )}
                </div>
            ))}

            <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 9,
                background: lockAnim ? 'rgba(24,184,122,.07)' : 'rgba(255,255,255,.025)',
                border: `1.5px solid ${lockAnim ? 'rgba(24,184,122,.35)' : 'rgba(255,255,255,.07)'}`,
                transition: 'all .55s cubic-bezier(.34,1.56,.64,1)',
                boxShadow: lockAnim ? '0 0 20px rgba(24,184,122,.12)' : 'none',
            }}>
                <div style={{ transition: 'transform .5s cubic-bezier(.34,1.56,.64,1)', transform: lockAnim ? 'scale(1.2) rotate(-8deg)' : 'none' }}>
                    {lockAnim ? <IconLocked /> : <IconUnlocked />}
                </div>
                <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: lockAnim ? '#18B87A' : 'var(--text3)', transition: 'color .4s' }}>{lockAnim ? 'Record created — immutable' : 'Pending lock'}</div>
                    <div style={{ fontSize: 9, color: 'var(--text3)' }}>₹1,20,000 to TalentHub · created {lockAnim ? 'now' : '—'}</div>
                </div>
            </div>
            <OfferCursor x={cx} y={cy} visible={curVis} ring={ring} />
        </div>
    )
}

/* ── Panel 3 — Notify ── */
function PanelNotify() {
    const [notifIn, setNotifIn] = useState(false)
    const [invoiceIn, setInvoiceIn] = useState(false)
    const [payStatus, setPayStatus] = useState(0)
    const [cx, setCx] = useState(200); const [cy, setCy] = useState(100)
    const [curVis, setCurVis] = useState(false); const [ring, setRing] = useState(false)

    useEffect(() => {
        const ts: ReturnType<typeof setTimeout>[] = []
        ts.push(setTimeout(() => setNotifIn(true), 300))
        ts.push(setTimeout(() => setInvoiceIn(true), 900))
        ts.push(setTimeout(() => { setCurVis(true); setCx(200); setCy(100) }, 1200))
        ts.push(setTimeout(() => { setCx(180); setCy(295) }, 1600))
        ts.push(setTimeout(() => setRing(true), 2050))
        ts.push(setTimeout(() => { setRing(false); setPayStatus(1) }, 2100))
        ts.push(setTimeout(() => { setCx(290); setCy(295) }, 2550))
        ts.push(setTimeout(() => setRing(true), 3000))
        ts.push(setTimeout(() => { setRing(false); setPayStatus(2) }, 3050))
        ts.push(setTimeout(() => setCurVis(false), 3400))
        return () => ts.forEach(clearTimeout)
    }, [])

    return (
        <div style={{ position: 'relative', padding: '16px' }}>
            <div style={{
                padding: '12px 14px', borderRadius: 10, marginBottom: 10,
                background: 'rgba(24,184,122,.07)', border: '1px solid rgba(24,184,122,.25)',
                transform: notifIn ? 'none' : 'translateY(-8px)', opacity: notifIn ? 1 : 0,
                transition: 'transform .5s cubic-bezier(.34,1.56,.64,1), opacity .4s ease',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#18B87A', boxShadow: '0 0 7px #18B87A' }} />
                    <span style={{ fontSize: 9, fontWeight: 800, color: '#18B87A', letterSpacing: '1px', textTransform: 'uppercase' }}>Commission Payable</span>
                </div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 600, color: '#C49A3C', lineHeight: 1, marginBottom: 3 }}>₹1,20,000</div>
                <div style={{ fontSize: 10, color: 'var(--text3)', lineHeight: 1.5 }}>to TalentHub · for Priya Sharma<br />due 15 Jan 2025 · Invoice attached</div>
            </div>

            <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 7, marginBottom: 12,
                background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)',
                opacity: invoiceIn ? 1 : 0, transform: invoiceIn ? 'none' : 'translateY(5px)', transition: 'opacity .4s, transform .4s',
            }}>
                <IconReceipt color="var(--text2)" />
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text)' }}>INV-2025-0087.pdf</div>
                    <div style={{ fontSize: 9, color: 'var(--text3)' }}>Generated automatically · sent to both parties</div>
                </div>
                <span style={{ fontSize: 9, color: '#18B87A', fontWeight: 700 }}>✓ Sent</span>
            </div>

            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.2px', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 10 }}>Payment status</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {['Pending', 'Approved', 'Paid'].map((s, i) => {
                    const done = payStatus > i; const active = payStatus === i
                    const col = done ? '#18B87A' : active ? '#C49A3C' : 'rgba(255,255,255,.18)'
                    return (
                        <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                <div style={{
                                    width: 22, height: 22, borderRadius: '50%',
                                    background: done ? 'rgba(24,184,122,.18)' : active ? 'rgba(196,154,60,.14)' : 'rgba(255,255,255,.04)',
                                    border: `2px solid ${col}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 9, fontWeight: 800, color: col,
                                    transition: 'all .4s cubic-bezier(.34,1.56,.64,1)',
                                    boxShadow: done ? '0 0 10px rgba(24,184,122,.4)' : active ? '0 0 10px rgba(196,154,60,.4)' : 'none',
                                }}>
                                    {done ? '✓' : i + 1}
                                </div>
                                <span style={{ fontSize: 9, fontWeight: done || active ? 600 : 400, color: col, transition: 'color .4s', whiteSpace: 'nowrap' }}>{s}</span>
                            </div>
                            {i < 2 && <div style={{ flex: 1, height: 2, marginBottom: 18, marginLeft: 6, marginRight: 6, background: done ? 'rgba(24,184,122,.45)' : 'rgba(255,255,255,.07)', borderRadius: 1, transition: 'background .45s ease' }} />}
                        </div>
                    )
                })}
            </div>
            <OfferCursor x={cx} y={cy} visible={curVis} ring={ring} />
        </div>
    )
}

/* ── Dashboard Shell ── */
function OfferDashboard({ activeStep }: { activeStep: number }) {
    const panelKey = `panel-${activeStep}`
    const stepLabels = ['Upload', 'Confirm', 'Calculate', 'Notify']
    const panels = [
        <PanelUpload key={panelKey} />,
        <PanelConfirm key={panelKey} />,
        <PanelCalc key={panelKey} />,
        <PanelNotify key={panelKey} />,
    ]

    return (
        <div style={{
            background: 'var(--navy2)',
            border: '1px solid rgba(255,255,255,.09)',
            borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.04)',
        }}>
            {/* Titlebar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,.07)', background: 'rgba(0,0,0,.22)' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['#FF5F57', '#FFBD2E', '#28C840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
                </div>
                <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 500 }}>Offer & Commission Engine</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div className={styles.ocPulseAnim} style={{ width: 5, height: 5, borderRadius: '50%', background: '#18B87A' }} />
                    <span style={{ fontSize: 10, color: '#18B87A', fontWeight: 600 }}>Active</span>
                </div>
            </div>

            {/* Candidate strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(24,184,122,.04)' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'rgba(24,184,122,.2)', border: '1.5px solid rgba(24,184,122,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#18B87A' }}>PS</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Priya Sharma</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)' }}>Sr. Backend Engineer · reached Offer stage</div>
                </div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.8px', color: '#18B87A', background: 'rgba(24,184,122,.12)', border: '1px solid rgba(24,184,122,.3)', borderRadius: 6, padding: '3px 9px', flexShrink: 0 }}>OFFER</div>
            </div>

            {/* Step bar */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                {stepLabels.map((l, i) => {
                    const done = i < activeStep; const active = i === activeStep
                    return (
                        <div key={l} style={{ flex: 1, padding: '7px 4px', textAlign: 'center', background: active ? 'rgba(196,154,60,.06)' : 'transparent', borderRight: i < 3 ? '1px solid rgba(255,255,255,.05)' : 'none', transition: 'background .3s' }}>
                            <span style={{ fontSize: active ? 10 : 9, fontWeight: active ? 700 : 400, color: active ? '#C49A3C' : done ? '#18B87A' : 'var(--text3)', transition: 'all .3s' }}>
                                {done ? `✓ ${l}` : l}
                            </span>
                        </div>
                    )
                })}
            </div>

            <div style={{ position: 'relative', overflow: 'hidden' }}>
                {panels[activeStep]}
            </div>
        </div>
    )
}

/* ── Main Export ── */
export default function S5_OfferSection() {
    const { ref, visible } = useReveal()
    const [activeStep, setActiveStep] = useState(0)
    const [autoPlay, setAutoPlay] = useState(true)

    useEffect(() => {
        if (!autoPlay) return
        const iv = setInterval(() => setActiveStep(prev => (prev + 1) % 4), 4000)
        return () => clearInterval(iv)
    }, [autoPlay])

    const steps = [
        { n: '01', title: 'Candidate reaches offer stage', body: 'System notifies all permitted parties to upload the signed offer document and fill in the CTC breakdown. Who is permitted is configured by the paying party.' },
        { n: '02', title: 'Both sides confirm — or 48h auto-lock', body: 'Employer confirms CTC breakdown. Agency confirms. If no dispute within 48 hours, the record locks automatically.' },
        { n: '03', title: 'Commission auto-calculated', body: 'Calculated from the uploaded contract or structured agreement. The commission record is immutable the moment it is created.' },
        { n: '04', title: 'Both parties notified simultaneously', body: '"Commission payable: ₹1,20,000 to TalentHub for Priya Sharma. Due by 15 Jan. Invoice attached." Payment tracked: pending → approved → paid.' },
    ]

    return (
        <section style={{ background: 'var(--cream)' }}>
            <div className="wrap" style={{ paddingTop: 'clamp(52px,5vw,72px)', paddingBottom: 'clamp(52px,5vw,72px)' }}>
                <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'opacity .7s ease, transform .7s ease' }}>

                    {/* Section header */}
                    <div style={{ marginBottom: 'clamp(24px,3.5vw,40px)' }}>
                        <div className="eyebrow eyebrow-dark" style={{ marginBottom: 12 }}>
                            <div className="ey-line" />Offer + Commission
                        </div>
                        <h2 className="h2 h2-ink" style={{ marginBottom: 12 }}>
                            Offer uploaded.<br />
                            <em>Commission auto-calculated.</em>
                        </h2>
                        <p className="lead lead-ink" style={{ maxWidth: 540 }}>
                            No manual calculation. No disputes. Both sides confirmed — or it locks automatically after 48 hours.
                        </p>
                    </div>

                    {/* Two-column grid */}
                    <div className={styles.ocGrid}>

                        {/* LEFT — steps */}
                        <div className={styles.ocStepsCol}>
                            {steps.map((s, i) => {
                                const isActive = activeStep === i
                                return (
                                    <div key={i} className={styles.ocStepWrap}>
                                        <button
                                            className={`${styles.ocStep}${isActive ? ` ${styles.ocStepActive}` : ''}`}
                                            onClick={() => { setActiveStep(i); setAutoPlay(false) }}
                                            style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}
                                        >
                                            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                                {/* Number + connector */}
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                                                    <div className={`${styles.ocNum}${isActive ? ` ${styles.ocNumActive}` : ''}`}>{s.n}</div>
                                                    {i < steps.length - 1 && (
                                                        <div style={{ width: 1, flex: 1, minHeight: 16, margin: '4px 0', background: isActive ? 'rgba(196,154,60,.35)' : 'rgba(12,24,40,.1)', transition: 'background .3s' }} />
                                                    )}
                                                </div>
                                                {/* Content */}
                                                <div style={{ paddingBottom: i < steps.length - 1 ? 16 : 0, paddingTop: 4, flex: 1 }}>
                                                    <div className={`${styles.ocTitle}${isActive ? ` ${styles.ocTitleActive}` : ''}`}>{s.title}</div>
                                                    <div style={{ fontSize: 'clamp(13px,.88vw,15px)', color: 'var(--ink3)', lineHeight: 1.65, marginTop: 6 }}>
                                                        {s.body}
                                                    </div>
                                                    {/* Auto-play progress bar */}
                                                    {isActive && autoPlay && (
                                                        <div style={{ marginTop: 10, height: 2, background: 'rgba(12,24,40,.08)', borderRadius: 100, overflow: 'hidden' }}>
                                                            <div style={{ height: '100%', background: 'var(--gold)', borderRadius: 100, animation: 'ocProgress 4s linear forwards' }} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>

                                        {/* Mobile-only inline dashboard — shown below each step when active */}
                                        <div className={`${styles.ocMobileDash}${isActive ? ` ${styles.ocMobileDashOpen}` : ''}`}>
                                            <OfferDashboard activeStep={i} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* RIGHT — dashboard (desktop only) */}
                        <div className={styles.ocDashCol}>
                            <OfferDashboard activeStep={activeStep} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
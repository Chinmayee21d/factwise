'use client'

import { useEffect, useRef, useState } from 'react'

/* ── Intersection-observer reveal hook ── */
export function useReveal(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
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

/* ── Gold checkmark ── */
export function Tick({ c = '#C49A3C' }: { c?: string }) {
    return (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none"
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" stroke={c}>
            <polyline points="1.5,4.5 3.5,6.5 7.5,2.5" />
        </svg>
    )
}

/* ── Red cross ── */
export function Cross() {
    return (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none"
            strokeLinecap="round" strokeWidth="2.2" stroke="#E0384F">
            <line x1="2" y1="2" x2="7" y2="7" />
            <line x1="7" y1="2" x2="2" y2="7" />
        </svg>
    )
}

/* ── Mac-style dashboard titlebar ── */
export function DashBar({
    title, badge, badgeColor = '#18B87A',
}: { title: string; badge?: string; badgeColor?: string }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,.07)',
            background: 'rgba(0,0,0,.2)', flexShrink: 0,
        }}>
            <div style={{ display: 'flex', gap: 6 }}>
                {['#FF5F57', '#FFBD2E', '#28C840'].map(c => (
                    <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                ))}
            </div>
            <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 500 }}>{title}</span>
            {badge ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{
                        width: 5, height: 5, borderRadius: '50%', background: badgeColor,
                        animation: 'agPulse 2s ease-in-out infinite',
                    }} />
                    <span style={{ fontSize: 10, color: badgeColor, fontWeight: 600 }}>{badge}</span>
                </div>
            ) : <div style={{ width: 46 }} />}
        </div>
    )
}

/* ── Shared keyframes string — import and inject in any section ── */
export const AG_KEYFRAMES = `
    @keyframes agPulse    { 0%,100%{opacity:1} 50%{opacity:.3} }
    @keyframes agDrift    { 0%{transform:translate(0,0)} 100%{transform:translate(72px,72px)} }
    @keyframes agFloatA   { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-8px)}  }
    @keyframes agFloatB   { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-11px)} }
    @keyframes agFloatC   { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-7px)}  }
    @keyframes agOrbFloat { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
    @keyframes agFadeUp   { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
    @keyframes agSpin     { to{transform:rotate(360deg)} }
    @keyframes agBlink    { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes agProgress { from{width:0%} to{width:100%} }
    @keyframes agRipple   { from{transform:scale(.4);opacity:1} to{transform:scale(2.4);opacity:0} }
`

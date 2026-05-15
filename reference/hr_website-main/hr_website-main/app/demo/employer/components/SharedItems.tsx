'use client'

import { useEffect, useRef, useState } from 'react'

export function useReveal(threshold = 0.1) {
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

export function Tick({ c = '#3470F0' }: { c?: string }) {
    return (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" stroke={c}>
            <polyline points="1.5,4.5 3.5,6.5 7.5,2.5" />
        </svg>
    )
}

export function Cross() {
    return (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" strokeLinecap="round" strokeWidth="2.2" stroke="#E0384F">
            <line x1="2" y1="2" x2="7" y2="7" /><line x1="7" y1="2" x2="2" y2="7" />
        </svg>
    )
}

export function DashBar({
    title,
    badge,
    badgeColor = '#18B87A',
}: {
    title: string
    badge?: string
    badgeColor?: string
}) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderBottom: '1px solid rgba(255,255,255,.06)',
            flexShrink: 0,
            background: 'rgba(255,255,255,.02)',
        }}>
            {/* Window chrome dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', gap: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,.12)' }} />
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,.12)' }} />
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,.12)' }} />
                </div>
                <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'var(--text2)',
                    fontFamily: "'Geist', sans-serif",
                    letterSpacing: 0.2,
                }}>
                    {title}
                </span>
            </div>

            {/* Badge */}
            {badge && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '3px 8px',
                    borderRadius: 100,
                    background: `${badgeColor}14`,
                    border: `1px solid ${badgeColor}38`,
                }}>
                    <div style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: badgeColor,
                        boxShadow: `0 0 5px ${badgeColor}`,
                        animation: 'agPulse 2s ease-in-out infinite',
                    }} />
                    <span style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: badgeColor,
                        letterSpacing: 0.6,
                        fontFamily: "'Geist', sans-serif",
                    }}>
                        {badge}
                    </span>
                </div>
            )}
        </div>
    )
}
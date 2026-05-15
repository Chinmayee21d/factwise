'use client'
import { useEffect, useState, useRef } from 'react'

const SPARKLE_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 14.74L12 21L10.91 14.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 9.26L12 2Z" fill="#F5A623"/></svg>`

export default function ProductIntro({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0) // 0=circle, 1=bar, 2=typing, 3=response, 4=done
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(false)
  const [visible, setVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          obs.disconnect()
          startAnimation()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function startAnimation() {
    // Stage 0: sparkle circle visible (already default)
    setTimeout(() => setStage(1), 1200)       // morph to bar
    setTimeout(() => setStage(2), 2000)        // start typing
    setTimeout(() => setShowCursor(true), 2000)
  }

  useEffect(() => {
    if (stage !== 2) return
    const text = 'Quote to Order'
    let i = 0
    const interval = setInterval(() => {
      i++
      setTypedText(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setTimeout(() => {
          setShowCursor(false)
          setStage(3) // show response
        }, 400)
        setTimeout(() => {
          setStage(4) // fade out
          setTimeout(() => {
            setVisible(false)
            onComplete()
          }, 800)
        }, 2500)
      }
    }, 90)
    return () => clearInterval(interval)
  }, [stage, onComplete])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 100,
        background: '#0a0a0c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.8s ease',
        opacity: stage === 4 ? 0 : 1,
        pointerEvents: stage === 4 ? 'none' : 'auto',
      }}
    >
      {/* Subtle radial glow behind */}
      <div style={{
        position: 'absolute',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,92,252,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Stage 0-2: Circle / Search Bar */}
      {stage < 3 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: stage >= 1 ? '12px' : '0',
            background: '#111318',
            border: '1.5px solid rgba(255,255,255,0.08)',
            borderRadius: stage >= 1 ? '28px' : '50%',
            width: stage >= 1 ? '520px' : '64px',
            height: '56px',
            padding: stage >= 1 ? '0 8px 0 18px' : '0',
            justifyContent: stage >= 1 ? 'flex-start' : 'center',
            overflow: 'hidden',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: stage >= 1
              ? '0 4px 40px rgba(124,92,252,0.08)'
              : '0 0 30px rgba(245,166,35,0.1)',
          }}
        >
          {/* Sparkle icon */}
          <div
            style={{
              width: '28px', height: '28px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: stage === 0 ? 'sparkle-pulse 2s ease-in-out infinite' : 'none',
            }}
            dangerouslySetInnerHTML={{ __html: SPARKLE_SVG }}
          />

          {/* Input area */}
          {stage >= 1 && (
            <div style={{
              flex: 1, minWidth: 0, fontSize: '15px', fontWeight: 500,
              fontFamily: 'var(--font-inter), sans-serif',
              color: typedText ? '#fff' : '#666',
              opacity: stage >= 1 ? 1 : 0,
              transition: 'opacity 0.4s ease 0.3s',
              display: 'flex', alignItems: 'center',
            }}>
              {typedText || 'What can I help with?'}
              {showCursor && (
                <span style={{
                  display: 'inline-block', width: '2px', height: '18px',
                  background: '#7c5cfc', marginLeft: '1px',
                  animation: 'blink-cursor 0.8s step-end infinite',
                }} />
              )}
            </div>
          )}

          {/* Send button */}
          {stage >= 1 && (
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Stage 3: Response Card */}
      {stage === 3 && (
        <div style={{
          textAlign: 'center',
          animation: 'response-pop 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '16px',
          }}>
            <div
              style={{ width: '20px', height: '20px' }}
              dangerouslySetInnerHTML={{ __html: SPARKLE_SVG }}
            />
            <span style={{
              textTransform: 'uppercase', letterSpacing: '2.5px',
              fontSize: '11px', fontWeight: 700, color: '#7c5cfc',
            }}>
              AI Workflow
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800,
            color: '#fff', margin: '0 0 16px 0',
            lineHeight: 1.1, letterSpacing: '-0.03em',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            Quote to Order
          </h2>
          <p style={{
            color: '#888', fontSize: '17px', lineHeight: 1.6,
            maxWidth: '500px', margin: '0 auto',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            Streamline your entire quoting lifecycle with structured RFQs and intelligent bid evaluation.
          </p>
        </div>
      )}

      <style>{`
        @keyframes sparkle-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes response-pop {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}

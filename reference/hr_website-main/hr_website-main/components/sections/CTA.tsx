'use client'
import { useEffect, useRef } from 'react'

export default function CTA() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width
      const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height
      card.style.transform = `perspective(1200px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`
    }

    const onLeave = () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      className="cta-banner"
      id="cta"
      data-analytics-section="cta"
      data-analytics-label="CTA"
    >
      <div className="cta-card" ref={cardRef}>

        <div className="cta-glow cta-glow-tr" aria-hidden="true" />
        <div className="cta-glow cta-glow-bl" aria-hidden="true" />

        {/* LEFT */}
        <div className="cta-left">
          <div className="cta-eyebrow">Get Started</div>
          <h2 className="cta-h2">
            Ready to hire with<br />
            <em>intelligence?</em>
          </h2>
          <p className="cta-lead">Set up in 15 minutes. No credit card required.</p>
        </div>

        {/* RIGHT */}
        <div className="cta-right">
          <a href="#pricing" className="cta-btn cta-btn-signup">Start hiring smarter</a>
          <a href="/demo" className="cta-btn cta-btn-demo">Request a Demo</a>
          <p className="cta-micro">No setup fees · Cancel anytime</p>
        </div>

      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import styles from './Compliance.module.css'

export default function Compliance() {
  const gridRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const trustBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /* ── 1. Floating card highlight ── */
    const grid = gridRef.current
    const highlight = highlightRef.current
    if (!grid || !highlight) return

    const cards = Array.from(grid.querySelectorAll(`.${styles.complCard}`))
    const BLEED = 8
    let hideTimer: any = null
    let currentCard: Element | null = null

    const moveTo = (card: Element) => {
      const gr = grid.getBoundingClientRect()
      const cr = card.getBoundingClientRect()
      highlight.style.left = (cr.left - gr.left - BLEED) + 'px'
      highlight.style.top = (cr.top - gr.top - BLEED) + 'px'
      highlight.style.width = (cr.width + BLEED * 2) + 'px'
      highlight.style.height = (cr.height + BLEED * 2) + 'px'
      highlight.classList.add(styles.visible)
    }

    const mouseEnterHandler = (e: Event) => {
      clearTimeout(hideTimer)
      const card = e.currentTarget as HTMLElement
      if (currentCard && currentCard !== card) currentCard.classList.remove(styles.hovered)
      currentCard = card
      card.classList.add(styles.hovered)
      moveTo(card)
    }

    const mouseLeaveHandler = (e: Event) => {
      const card = e.currentTarget as HTMLElement
      card.classList.remove(styles.hovered)
      currentCard = null
      hideTimer = setTimeout(() => {
        highlight.classList.remove(styles.visible)
      }, 160)
    }

    const resizeHandler = () => {
      if (currentCard) moveTo(currentCard)
    }

    cards.forEach(card => {
      card.addEventListener('mouseenter', mouseEnterHandler)
      card.addEventListener('mouseleave', mouseLeaveHandler)
    })
    window.addEventListener('resize', resizeHandler)

    /* ── 2. Scroll-reveal (IntersectionObserver) ── */
    // Header Observer
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.revealed)
          headerObserver.unobserve(e.target)
        }
      })
    }, { threshold: 0.2 })
    if (headerRef.current) headerObserver.observe(headerRef.current)

    // Cards Observer
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = cards.indexOf(e.target)
          setTimeout(() => { (e.target as HTMLElement).classList.add(styles.revealed) }, idx * 70)
          cardObserver.unobserve(e.target)
        }
      })
    }, { threshold: 0.15 })
    cards.forEach(c => cardObserver.observe(c))

    // Trust Bar Observer
    const trustBarObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.revealed)
          trustBarObserver.unobserve(e.target)
        }
      })
    }, { threshold: 0.3 })
    if (trustBarRef.current) trustBarObserver.observe(trustBarRef.current)

    return () => {
      // Cleanup
      cards.forEach(card => {
        card.removeEventListener('mouseenter', mouseEnterHandler)
        card.removeEventListener('mouseleave', mouseLeaveHandler)
      })
      window.removeEventListener('resize', resizeHandler)
      headerObserver.disconnect()
      cardObserver.disconnect()
      trustBarObserver.disconnect()
    }
  }, [])

  return (
    <div
      className={styles.complianceSection}
      id="compliance"
      data-analytics-section="compliance"
      data-analytics-label="Compliance"
    >
      <div className="wrap">
        <div className={styles.complianceHeader}>
          <div className={styles.complianceHeaderInner} ref={headerRef}>
            <div className={styles.eyebrow}><div className="ey-line"></div>Compliance + Trust</div>
            <h2 className={styles.h2}>Compliance isn't a feature<em>you turn on.</em></h2>
            <p className={styles.lead}>It's how HR Ops was built. Enterprise procurement, CISOs, and data protection officers can relax.</p>
          </div>
        </div>

        <div className={styles.complianceGrid} ref={gridRef}>
          <div className={styles.complHighlight} ref={highlightRef}></div>

          <div className={styles.complCard}>
            <div className={`${styles.complIcon} ${styles.ciGold}`}>
              <svg viewBox="0 0 16 16"><path d="M8 2L3 4.5v4C3 11.4 5.2 13.8 8 14c2.8-.2 5-2.6 5-5.5v-4L8 2z" strokeWidth="1.6"/><path d="M5.5 8l2 2 3-3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className={styles.complTitle}>DPDP Compliant</div>
            <div className={styles.complDesc}>India's Digital Personal Data Protection Act. Consent tracking, right to erasure, data localisation. Live regulation — handled by design.</div>
            <div className={styles.complBadge}>Active</div>
          </div>

          <div className={styles.complCard}>
            <div className={`${styles.complIcon} ${styles.ciBlue}`}>
              <svg viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="8" rx="1.5" strokeWidth="1.6"/><path d="M5 7V5a3 3 0 016 0v2" strokeWidth="1.6" strokeLinecap="round"/><circle cx="8" cy="11" r="1" fill="currentColor" stroke="none"/></svg>
            </div>
            <div className={styles.complTitle}>SOC 2 Type II</div>
            <div className={styles.complDesc}>The security posture enterprise procurement requires. Without it you can't enter mid-market deals. With it, procurement becomes a product conversation.</div>
            <div className={styles.complBadge}>Certified</div>
          </div>

          <div className={styles.complCard}>
            <div className={`${styles.complIcon} ${styles.ciGreen}`}>
              <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" strokeWidth="1.6"/><path d="M6 8.5c.4.8 1.1 1.5 2 1.5 1.1 0 2-.9 2-2S9.1 6 8 6c-.6 0-1.1.2-1.5.6" strokeWidth="1.6" strokeLinecap="round"/><path d="M5 6.5h1.5V5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className={styles.complTitle}>GDPR Ready</div>
            <div className={styles.complDesc}>For companies hiring internationally or with EU operations. Data processing agreements, consent management, and erasure workflows built in.</div>
            <div className={styles.complBadge}>Compliant</div>
          </div>

          <div className={styles.complCard}>
            <div className={`${styles.complIcon} ${styles.ciGold}`}>
              <svg viewBox="0 0 16 16"><path d="M3 4h10M3 8h10M3 12h6" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12.5" cy="12.5" r="2" strokeWidth="1.6"/><path d="M14 14l1.5 1.5" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </div>
            <div className={styles.complTitle}>Immutable Audit Log</div>
            <div className={styles.complDesc}>Every hire decision, override, commission trigger, and data access — timestamped and locked forever. Finance audit, legal discovery, all answered from one log.</div>
            <div className={styles.complBadge}>Always on</div>
          </div>

          <div className={styles.complCard}>
            <div className={`${styles.complIcon} ${styles.ciBlue}`}>
              <svg viewBox="0 0 16 16"><path d="M4 4h8v8H4z" strokeWidth="1.6" rx="1"/><path d="M7 7h2M7 9h1" strokeWidth="1.6" strokeLinecap="round"/><path d="M10 2v3M6 2v3M2 5h12" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </div>
            <div className={styles.complTitle}>Files Never Touch Our Servers</div>
            <div className={styles.complDesc}>Assessments and documents stay in Drive, OneDrive, or Box. HR Ops generates scoped time-limited links. Data minimisation by architecture, not policy.</div>
            <div className={styles.complBadge}>By design</div>
          </div>

          <div className={styles.complCard}>
            <div className={`${styles.complIcon} ${styles.ciGreen}`}>
              <svg viewBox="0 0 16 16"><path d="M8 2L3 5v3c0 3 2.3 5.7 5 6 2.7-.3 5-3 5-6V5L8 2z" strokeWidth="1.6"/><path d="M6 8.5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </div>
            <div className={styles.complTitle}>Data Sovereignty</div>
            <div className={styles.complDesc}>The buyer always owns the data. When any relationship ends, the non-paying party can export their data cleanly. No data held hostage.</div>
            <div className={styles.complBadge}>Guaranteed</div>
          </div>
        </div>

        <div className={styles.complTrustBar} ref={trustBarRef}>
          <div className={styles.complTrustItem}><div className={styles.complTrustDot}></div>SLA Guaranteed</div>
          <div className={styles.complTrustSep}></div>
          <div className={styles.complTrustItem}><div className={styles.complTrustDot}></div>Penetration Tested</div>
          <div className={styles.complTrustSep}></div>
          <div className={styles.complTrustItem}><div className={styles.complTrustDot}></div>Uptime 99.9%</div>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useEffect } from 'react'

export default function ScrollInit() {
  useEffect(() => {
    // NAV SCROLL
    const handleNavScroll = () => {
      const nav = document.getElementById('main-nav')
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 20)
    }
    window.addEventListener('scroll', handleNavScroll)

    // PARALLAX
    const pxCards = document.querySelectorAll<HTMLElement>('[data-px]')
    const handleParallax = () => {
      pxCards.forEach(c => {
        const px = parseFloat((c.dataset as any).px)
        c.style.transform = `translateY(${window.scrollY * px}px)`
      })
    }
    window.addEventListener('scroll', handleParallax)

    // REVEAL
    const ro = new IntersectionObserver(
      entries => entries.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    )
    document.querySelectorAll('.reveal,.reveal-r,.reveal-l').forEach(el => ro.observe(el))

    // COUNTERS
    const co = new IntersectionObserver(
      entries => entries.forEach(x => {
        if (!x.isIntersecting) return
        const target = x.target as HTMLElement
        const t = parseInt(target.dataset.t || '0')
        let c = 0
        const step = t / 42
        const ti = setInterval(() => {
          c = Math.min(c + step, t)
          target.textContent = Math.floor(c).toLocaleString()
          if (c >= t) clearInterval(ti)
        }, 28)
        co.unobserve(target)
      }),
      { threshold: 0.5 }
    )
    document.querySelectorAll('.cu').forEach(el => co.observe(el))

    // AI TABS
    const aiTabs = document.querySelectorAll<HTMLElement>('.ai-tab')
    const aiPanels = document.querySelectorAll<HTMLElement>('.ai-panel')
    aiTabs.forEach(tab => {
      tab.addEventListener('mouseenter', () => {
        aiTabs.forEach(t => t.classList.remove('active'))
        aiPanels.forEach(p => p.classList.remove('active'))
        tab.classList.add('active')
        const p = document.getElementById('panel-' + (tab.dataset as any).panel)
        if (p) p.classList.add('active')
      })
    })

    // MAGIC LINK STEPS
    const mlSteps = document.querySelectorAll<HTMLElement>('.ml-step')
    mlSteps.forEach(step => {
      step.addEventListener('mouseenter', () => {
        mlSteps.forEach(s => s.classList.remove('active'))
        step.classList.add('active')
        ;[0, 1, 2].forEach(i => {
          const p = document.getElementById('ml-panel-' + i)
          if (p) p.style.display = 'none'
        })
        const panel = document.getElementById('ml-panel-' + (step.dataset as any).mlpanel)
        if (panel) panel.style.display = 'block'
      })
    })

    // PRICING TOGGLES — expose to window for onclick handlers in HTML
    let isAnn = false
    ;(window as any).showEmp = () => {
      const empBlock = document.getElementById('empBlock')
      const agBlock = document.getElementById('agBlock')
      const et = document.getElementById('et')
      const at = document.getElementById('at')
      if (empBlock) empBlock.style.display = 'block'
      if (agBlock) agBlock.classList.remove('active')
      if (et) et.classList.add('active')
      if (at) at.classList.remove('active')
    }
    ;(window as any).showAg = () => {
      const empBlock = document.getElementById('empBlock')
      const agBlock = document.getElementById('agBlock')
      const et = document.getElementById('et')
      const at = document.getElementById('at')
      if (empBlock) empBlock.style.display = 'none'
      if (agBlock) agBlock.classList.add('active')
      if (et) et.classList.remove('active')
      if (at) at.classList.add('active')
    }
    ;(window as any).toggleBill = () => {
      isAnn = !isAnn
      const bs = document.getElementById('bs')
      const ap = document.getElementById('ap')
      const ml2 = document.getElementById('ml2')
      const al2 = document.getElementById('al2')
      if (bs) bs.classList.toggle('on', isAnn)
      if (ap) ap.style.opacity = isAnn ? '1' : '0'
      if (ml2) ml2.classList.toggle('on', !isAnn)
      if (al2) al2.classList.toggle('on', isAnn)
      ;['ba', 'pa', 'aba', 'apa'].forEach(id => {
        const el = document.getElementById(id)
        if (el) el.style.opacity = isAnn ? '1' : '0'
      })
      document.querySelectorAll<HTMLElement>('.pcard-amt').forEach(el => {
        const v = isAnn ? (el.dataset as any).a : (el.dataset as any).m
        if (v) el.textContent = v
      })
    }

    // SVG PATH ANIMATE
    const svgObs = new IntersectionObserver(
      entries => entries.forEach(x => {
        if (!x.isIntersecting) return
        const target = x.target as HTMLElement
        target.querySelectorAll<SVGGeometryElement>('path,line').forEach((p, i) => {
          try {
            const l = p.getTotalLength()
            p.style.strokeDasharray = String(l)
            p.style.strokeDashoffset = String(l)
            p.style.transition = `stroke-dashoffset 1.2s ${i * 0.08}s ease`
            p.style.strokeDashoffset = '0'
          } catch {}
        })
        svgObs.unobserve(target)
      }),
      { threshold: 0.2 }
    )
    document.querySelectorAll('.svg-anim').forEach(el => svgObs.observe(el))

    return () => {
      window.removeEventListener('scroll', handleNavScroll)
      window.removeEventListener('scroll', handleParallax)
      ro.disconnect()
      co.disconnect()
      svgObs.disconnect()
    }
  }, [])

  return null
}

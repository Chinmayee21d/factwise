'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const CONSENT_VERSION = '2026-03-01'
const STORAGE_KEY = `hrops_cookie_consent_${CONSENT_VERSION}`
const CONSENT_REQUIRED = process.env.NEXT_PUBLIC_COOKIE_CONSENT_REQUIRED === 'true'
const SECTION_SELECTOR = '[data-analytics-section], section[id], main[id], [id="workflow-builder"], [id="hub-animation"], [id="platform"], [id="workflow"], [id="pricing"], [id="faq"], [id="personas"], [id="hero"], [id="compliance"], [id="cta"]'

type ConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: string
  version: string
  dnt: boolean
}

type SectionElement = HTMLElement & {
  dataset: DOMStringMap & {
    analyticsSection?: string
    analyticsLabel?: string
  }
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

function hasAnalyticsConsent() {
  if (!CONSENT_REQUIRED) {
    return true
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const consent = JSON.parse(raw) as ConsentState
    return Boolean(consent.analytics)
  } catch {
    return false
  }
}

function pushDataLayer(event: Record<string, unknown>) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    page_path: window.location.pathname,
    page_title: document.title,
    ...event,
  })
}

function normalizeText(value: string | null | undefined) {
  if (!value) return ''
  return value.replace(/\s+/g, ' ').trim().slice(0, 120)
}

function getUrlLabel(target: HTMLElement) {
  if (!(target instanceof HTMLAnchorElement)) return undefined
  const href = target.getAttribute('href') ?? ''
  if (!href) return undefined

  if (href.startsWith('http')) {
    try {
      const url = new URL(href)
      return `${url.origin}${url.pathname}`
    } catch {
      return href
    }
  }

  return href
}

function getElementLabel(target: HTMLElement) {
  return (
    target.getAttribute('aria-label') ||
    target.getAttribute('title') ||
    target.getAttribute('data-analytics-label') ||
    normalizeText(target.textContent) ||
    target.getAttribute('name') ||
    target.id ||
    target.tagName.toLowerCase()
  )
}

function getSectionName(node: Element | null) {
  const section = node?.closest?.(SECTION_SELECTOR) as SectionElement | null
  if (!section) return 'unscoped'
  return section.dataset.analyticsSection || section.id || section.tagName.toLowerCase()
}

function getSectionLabel(section: SectionElement) {
  return section.dataset.analyticsLabel || section.dataset.analyticsSection || section.id || 'section'
}

function getScrollPercent() {
  const doc = document.documentElement
  const maxScroll = doc.scrollHeight - window.innerHeight
  if (maxScroll <= 0) return 100
  return Math.max(0, Math.min(100, Math.round((window.scrollY / maxScroll) * 100)))
}

export default function SiteAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const activeSectionRef = useRef<{ name: string; startedAt: number } | null>(null)
  const seenSectionsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const landingKey = 'hrops_analytics_landing_source'
    let referrerHost = '(direct)'
    if (document.referrer) {
      try {
        referrerHost = new URL(document.referrer).hostname
      } catch {
        referrerHost = document.referrer
      }
    }
    const params = new URLSearchParams(window.location.search)

    pushDataLayer({
      event: 'virtual_page_view',
      page_location: window.location.href,
      referrer_host: referrerHost,
    })

    if (!sessionStorage.getItem(landingKey)) {
      sessionStorage.setItem(landingKey, '1')
      pushDataLayer({
        event: 'landing_source',
        landing_path: window.location.pathname,
        referrer_host: referrerHost,
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_term: params.get('utm_term') || undefined,
        utm_content: params.get('utm_content') || undefined,
      })
    }
  }, [pageKey])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const scrollMilestones = new Set<number>()
    const visibleRatios = new Map<string, number>()

    const flushActiveSection = (reason: string) => {
      const active = activeSectionRef.current
      if (!active) return

      const durationMs = Date.now() - active.startedAt
      if (durationMs >= 1000) {
        pushDataLayer({
          event: 'section_engagement',
          section_name: active.name,
          engagement_ms: durationMs,
          scroll_percent: getScrollPercent(),
          exit_reason: reason,
        })
      }

      activeSectionRef.current = null
    }

    const updateActiveSection = () => {
      let nextName: string | null = null
      let nextRatio = 0

      visibleRatios.forEach((ratio, name) => {
        if (ratio > nextRatio) {
          nextRatio = ratio
          nextName = name
        }
      })

      if (nextRatio < 0.35) {
        if (activeSectionRef.current) {
          flushActiveSection('below_threshold')
        }
        return
      }

      if (activeSectionRef.current?.name === nextName) {
        return
      }

      if (activeSectionRef.current) {
        flushActiveSection('section_changed')
      }

      if (nextName) {
        activeSectionRef.current = { name: nextName, startedAt: Date.now() }
      }
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const section = entry.target as SectionElement
          const sectionName = getSectionLabel(section)
          const ratio = entry.isIntersecting ? entry.intersectionRatio : 0

          visibleRatios.set(sectionName, ratio)

          if (ratio >= 0.35 && !seenSectionsRef.current.has(sectionName)) {
            seenSectionsRef.current.add(sectionName)
            pushDataLayer({
              event: 'section_view',
              section_name: sectionName,
              scroll_percent: getScrollPercent(),
            })
          }
        })

        updateActiveSection()
      },
      { threshold: [0, 0.2, 0.35, 0.5, 0.75] }
    )

    document.querySelectorAll(SECTION_SELECTOR).forEach(node => {
      observer.observe(node)
    })

    const onScroll = () => {
      const scrollPercent = getScrollPercent()
      ;[25, 50, 75, 90].forEach(mark => {
        if (scrollPercent >= mark && !scrollMilestones.has(mark)) {
          scrollMilestones.add(mark)
          pushDataLayer({
            event: 'scroll_depth',
            scroll_percent: mark,
            active_section: activeSectionRef.current?.name || 'unscoped',
          })
        }
      })
    }

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest?.(
        'a, button, [role="button"], input[type="submit"], input[type="button"]'
      ) as HTMLElement | null

      if (!target) return

      pushDataLayer({
        event: 'element_click',
        section_name: getSectionName(target),
        element_label: getElementLabel(target),
        element_type: target.tagName.toLowerCase(),
        link_url: getUrlLabel(target),
      })
    }

    const startedForms = new Set<string>()
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null
      const form = target?.closest?.('form') as HTMLFormElement | null
      if (!form) return

      const formName = form.getAttribute('data-analytics-form') || form.id || window.location.pathname
      if (startedForms.has(formName)) return

      startedForms.add(formName)
      pushDataLayer({
        event: 'form_start',
        form_name: formName,
        section_name: getSectionName(form),
      })
    }

    const onSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement | null
      if (!form) return

      pushDataLayer({
        event: 'form_submit',
        form_name: form.getAttribute('data-analytics-form') || form.id || window.location.pathname,
        section_name: getSectionName(form),
      })
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushActiveSection('tab_hidden')
      }
    }

    const onPageHide = () => {
      flushActiveSection('pagehide')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClick, true)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('submit', onSubmit, true)
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pagehide', onPageHide)

    onScroll()

    return () => {
      flushActiveSection('cleanup')
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('submit', onSubmit, true)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pagehide', onPageHide)
    }
  }, [pageKey])

  return null
}

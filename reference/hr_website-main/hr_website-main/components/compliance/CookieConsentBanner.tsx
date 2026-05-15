'use client'

import { useEffect, useMemo, useState } from 'react'

const CONSENT_VERSION = '2026-03-01'
const STORAGE_KEY = `hrops_cookie_consent_${CONSENT_VERSION}`

type ConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: string
  version: string
  dnt: boolean
}

function isDntEnabled(): boolean {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return false
  }
  const dnt =
    navigator.doNotTrack ||
    (window as Window & { doNotTrack?: string }).doNotTrack ||
    (navigator as Navigator & { msDoNotTrack?: string }).msDoNotTrack
  return dnt === '1' || dnt === 'yes'
}

function saveConsent(consent: Omit<ConsentState, 'timestamp' | 'version'>): ConsentState {
  const payload: ConsentState = {
    ...consent,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  return payload
}

export default function CookieConsentBanner() {
  const [loaded, setLoaded] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showManage, setShowManage] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const dntEnabled = useMemo(() => isDntEnabled(), [])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      setLoaded(true)
      return
    }

    if (dntEnabled) {
      saveConsent({
        necessary: true,
        analytics: false,
        marketing: false,
        dnt: true,
      })
      setLoaded(true)
      return
    }

    setShowBanner(true)
    setLoaded(true)
  }, [dntEnabled])

  useEffect(() => {
    const openPrefs = () => {
      setShowBanner(true)
      setShowManage(true)
    }

    window.addEventListener('open-cookie-preferences', openPrefs)
    return () => window.removeEventListener('open-cookie-preferences', openPrefs)
  }, [])

  function acceptAll() {
    saveConsent({
      necessary: true,
      analytics: !dntEnabled,
      marketing: !dntEnabled,
      dnt: dntEnabled,
    })
    setShowBanner(false)
    setShowManage(false)
  }

  function rejectNonEssential() {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      dnt: dntEnabled,
    })
    setShowBanner(false)
    setShowManage(false)
  }

  function savePreferences() {
    saveConsent({
      necessary: true,
      analytics: dntEnabled ? false : analytics,
      marketing: dntEnabled ? false : marketing,
      dnt: dntEnabled,
    })
    setShowBanner(false)
    setShowManage(false)
  }

  if (!loaded || !showBanner) {
    return null
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-content">
        <p>
          We use cookies to run the website and improve performance. Read our{' '}
          <a href="/legal/cookies">Cookie Policy</a>.
        </p>
        {dntEnabled ? (
          <p className="cookie-note">
            Do Not Track is enabled in your browser. Analytics and marketing cookies stay off.
          </p>
        ) : null}
        <div className="cookie-actions">
          <button type="button" onClick={acceptAll}>
            Accept All
          </button>
          <button type="button" onClick={rejectNonEssential}>
            Reject Non-Essential
          </button>
          <button type="button" onClick={() => setShowManage((v) => !v)}>
            Manage Preferences
          </button>
        </div>
        {showManage ? (
          <div className="cookie-manage">
            <label>
              <input type="checkbox" checked readOnly />
              Strictly Necessary (always on)
            </label>
            <label>
              <input
                type="checkbox"
                checked={dntEnabled ? false : analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                disabled={dntEnabled}
              />
              Analytics
            </label>
            <label>
              <input
                type="checkbox"
                checked={dntEnabled ? false : marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                disabled={dntEnabled}
              />
              Marketing
            </label>
            <button type="button" onClick={savePreferences}>
              Save Preferences
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

'use client'

import { useEffect } from 'react'

const GTM_ID = 'GTM-N7T5482Q'
const GA_ID = 'G-D7DTFSLGRS'
const CONSENT_VERSION = '2026-03-01'
const STORAGE_KEY = `hrops_cookie_consent_${CONSENT_VERSION}`

const CONSENT_REQUIRED = process.env.NEXT_PUBLIC_COOKIE_CONSENT_REQUIRED === 'true'

type ConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: string
  version: string
  dnt: boolean
}

function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ConsentState) : null
  } catch {
    return null
  }
}

function injectGTM() {
  // Avoid double-injection
  if (document.getElementById('gtm-script')) return

  // GTM loader script
  const gtmScript = document.createElement('script')
  gtmScript.id = 'gtm-script'
  gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`
  document.head.appendChild(gtmScript)

  // gtag.js
  const gtagLoad = document.createElement('script')
  gtagLoad.async = true
  gtagLoad.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(gtagLoad)

  const gtagInit = document.createElement('script')
  gtagInit.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`
  document.head.appendChild(gtagInit)

  // GTM noscript iframe
  const noscript = document.createElement('noscript')
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  noscript.appendChild(iframe)
  document.body.insertBefore(noscript, document.body.firstChild)
}

export default function GoogleTagManager() {
  useEffect(() => {
    // Consent NOT required → always inject immediately
    if (!CONSENT_REQUIRED) {
      injectGTM()
      return
    }

    // Consent IS required → check current stored consent
    const consent = getStoredConsent()
    if (consent?.analytics) {
      injectGTM()
      return
    }

    // Not yet consented — listen for storage changes (when user accepts via banner)
    function onStorageChange(e: StorageEvent) {
      if (e.key !== STORAGE_KEY) return
      try {
        const updated: ConsentState = JSON.parse(e.newValue ?? '')
        if (updated?.analytics) {
          injectGTM()
        }
      } catch {
        // ignore parse errors
      }
    }

    window.addEventListener('storage', onStorageChange)
    return () => window.removeEventListener('storage', onStorageChange)
  }, [])

  return null
}

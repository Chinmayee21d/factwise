'use client'
import { useEffect, useRef } from 'react'

interface Props {
  html: string
  initScript?: () => void
}

export default function DangerousSection({ html, initScript }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (!ref.current || initialized.current) return
    initialized.current = true
    if (initScript) {
      // Small delay to ensure DOM is painted
      const t = setTimeout(() => {
        try { initScript() } catch (e) { console.warn('Section init error:', e) }
      }, 50)
      return () => clearTimeout(t)
    }
  }, [initScript])

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
}

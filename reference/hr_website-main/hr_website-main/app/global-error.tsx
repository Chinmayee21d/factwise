'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ padding: '32px', fontFamily: 'Geist, sans-serif' }}>
        <h2>Application error</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
        <button onClick={reset} style={{ marginTop: '12px' }}>
          Try again
        </button>
      </body>
    </html>
  )
}

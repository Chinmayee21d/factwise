import type { Metadata } from 'next'
import { getSiteUrl } from '@/lib/site'
import { AI_TRANSPARENCY_DOC, getLegalDocHtml } from '@/lib/legal-docs'
import LegalHeader from '@/components/sections/LegalHeader'

const siteUrl = getSiteUrl()
const pageUrl = `${siteUrl}/ai-transparency`

export const metadata: Metadata = {
  title: 'AI Transparency Report | HR Ops',
  description: AI_TRANSPARENCY_DOC.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'AI Transparency Report | HR Ops',
    description: AI_TRANSPARENCY_DOC.description,
    url: pageUrl,
    type: 'article',
  },
  robots: { index: true, follow: true },
}

export default async function AiTransparencyPage() {
  const html = await getLegalDocHtml(AI_TRANSPARENCY_DOC)

  return (
    <main className="legal-page">
      <LegalHeader />
      <div className="legal-wrap">
        <article className="legal-article" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  )
}

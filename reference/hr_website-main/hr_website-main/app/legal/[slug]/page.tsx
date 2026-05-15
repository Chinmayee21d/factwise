import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSiteUrl } from '@/lib/site'
import { getLegalDocHtml, LEGAL_DOCS } from '@/lib/legal-docs'
import LegalHeader from '@/components/sections/LegalHeader'

type Params = {
  slug: string
}

export async function generateStaticParams() {
  return Object.keys(LEGAL_DOCS).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const def = LEGAL_DOCS[params.slug]
  if (!def) {
    return {}
  }

  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/legal/${def.slug}`

  return {
    title: `${def.title} | HR Ops`,
    description: def.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${def.title} | HR Ops`,
      description: def.description,
      url: pageUrl,
      type: 'article',
    },
    robots: { index: true, follow: true },
  }
}

export default async function LegalPage({ params }: { params: Params }) {
  const def = LEGAL_DOCS[params.slug]
  if (!def) {
    notFound()
  }

  const html = await getLegalDocHtml(def)

  return (
    <main className="legal-page">
      <LegalHeader />
      <div className="legal-wrap">
        <article className="legal-article" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  )
}

import type { Metadata } from 'next'
import { getSiteUrl } from '@/lib/site'
import { AI_TRANSPARENCY_DOC, LEGAL_DOCS } from '@/lib/legal-docs'
import LegalHeader from '@/components/sections/LegalHeader'

const siteUrl = getSiteUrl()

const orderedDocs = [
  LEGAL_DOCS.privacy,
  LEGAL_DOCS.terms,
  LEGAL_DOCS.dpa,
  LEGAL_DOCS.cookies,
  LEGAL_DOCS['acceptable-use'],
  LEGAL_DOCS.security,
  LEGAL_DOCS.dpdp,
  LEGAL_DOCS['eu-privacy'],
  LEGAL_DOCS['sub-processors'],
]

export const metadata: Metadata = {
  title: 'Legal Center | HR Ops',
  description: 'Master legal index for HR Ops policies, notices, and compliance documents.',
  alternates: { canonical: `${siteUrl}/legal` },
  openGraph: {
    title: 'Legal Center | HR Ops',
    description: 'Master legal index for HR Ops policies, notices, and compliance documents.',
    url: `${siteUrl}/legal`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function LegalIndexPage() {
  return (
    <main className="legal-page">
      <LegalHeader />
      <div className="legal-wrap">
        <article className="legal-article">
          <h1>Legal Center</h1>
          <p>
            This page is the master list of HR Ops legal and compliance documents.
          </p>
          <ul>
            {orderedDocs.map((doc) => (
              <li key={doc.slug}>
                <a href={`/legal/${doc.slug}`}>{doc.title}</a>
                {' - '}
                {doc.description}
              </li>
            ))}
            <li>
              <a href="/ai-transparency">{AI_TRANSPARENCY_DOC.title}</a>
              {' - '}
              {AI_TRANSPARENCY_DOC.description}
            </li>
          </ul>
        </article>
      </div>
    </main>
  )
}

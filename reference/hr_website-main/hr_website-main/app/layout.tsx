import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getSiteUrl } from '@/lib/site'
import CookieConsentBanner from '@/components/compliance/CookieConsentBanner'
import GoogleTagManager from '@/components/analytics/GoogleTagManager'
import SiteAnalytics from '@/components/analytics/SiteAnalytics'
import '../styles/globals.css'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HR Ops - Hiring Intelligence for All',
    template: '%s | hrops.io',
  },
  description:
    'hrops.io is an AI-powered applicant tracking system for modern hiring teams. AI resume screening, no-code pipeline builder, magic-link assessments, and enterprise-grade compliance.',
  keywords: [
    'AI ATS',
    'applicant tracking system',
    'hiring software',
    'recruitment automation',
    'AI resume screening',
    'no-code hiring pipeline builder',
    'compliant ATS',
  ],
  authors: [{ name: 'hrops.io', url: siteUrl }],
  creator: 'hrops.io',
  publisher: 'hrops.io',
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-IN': siteUrl,
      en: siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'hrops.io',
    title: 'HR Ops - Hiring Intelligence for All',
    description:
      'One platform for employers, agencies, and candidates. AI that screens, learns, and automates.',
    images: [
      {
        url: '/hrops-logo-new.svg',
        width: 512,
        height: 512,
        alt: 'hrops.io logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'HR Ops - Hiring Intelligence for All',
    description:
      'AI resume screening, no-code pipelines, magic-link assessments, and compliance by design.',
    images: ['/hrops-logo-new.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [{ url: '/hrops-logo-new.svg', type: 'image/svg+xml' }],
    shortcut: '/hrops-logo-new.svg',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#software`,
      name: 'hrops.io',
      alternateName: 'HR Ops',
      url: siteUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'AI-powered applicant tracking system (ATS) with resume screening, no-code workflows, and magic-link assessments.',
      featureList: [
        'AI resume screening with reasoning',
        'No-code pipeline builder',
        'Magic-link candidate assessments',
        'Agency and employer workflows',
        'Compliance-ready data handling',
      ],
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
      provider: { '@id': `${siteUrl}/#org` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#org`,
      name: 'hrops.io',
      alternateName: 'HR Ops',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/hrops-logo-new.svg`,
      },
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'hrops.io',
      url: siteUrl,
      publisher: { '@id': `${siteUrl}/#org` },
      inLanguage: 'en-IN',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="icon" href="/hrops-logo-new.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/hrops-logo-new.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Geist:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <GoogleTagManager />
        <Suspense fallback={null}>
          <SiteAnalytics />
        </Suspense>
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  )
}

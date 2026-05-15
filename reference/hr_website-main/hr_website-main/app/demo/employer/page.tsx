import type { Metadata } from 'next'
import { getSiteUrl } from '@/lib/site'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'

import Hero from './components/S1_Hero'
// import ClaimSection from './components/S2_ClaimSection'
import PainSection from './components/S2_Pain'
import PipelineAnimation from './components/S2_PipelineAnimation'
import FeaturesSection from './components/S3_Features'
import AgencySection from './components/S4_AgencySection'
import OfferSection from './components/S5_OfferSection'
import PricingSection from './components/S6_Pricing'
import CTASection from './components/S7_CTA'

const siteUrl = getSiteUrl()
const pageUrl = `${siteUrl}/demo/employer`

export const metadata: Metadata = {
  title: 'AI Resume Screening & Hiring Automation Software | HR Ops Employer',
  description: 'How fast can AI screen your candidates? Discover the HR Ops Employer platform. Stop manual screening and start fast hiring with AI-powered decisions, automated resume screening, and visual hiring pipelines.',
  keywords: [
    'AI hiring software',
    'applicant tracking system',
    'resume screening AI',
    'hiring automation',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'AI Resume Screening & Hiring Automation | HR Ops Employer',
    description: 'How fast can AI screen your candidates? Stop manual screening and start fast hiring with AI-powered decisions.',
    url: pageUrl,
    siteName: 'hrops.io',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'HR Ops Employer AI Hiring Platform',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resume Screening & Hiring Automation | HR Ops Employer',
    description: 'How fast can AI screen your candidates? Stop manual screening and start fast hiring with AI-powered decisions.',
    images: [`${siteUrl}/og-image.png`],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HR Ops Employer AI Hiring Platform',
  applicationCategory: 'HumanResourcesApplication',
  operatingSystem: 'All',
  url: pageUrl,
  description: 'AI-powered applicant tracking system (ATS) enabling fast hiring through automated resume screening and AI-driven candidate shortlisting pipelines.',
  featureList: [
    'AI resume screening with reasoning',
    'Automated candidate shortlisting',
    'No-code hiring pipelines',
    'Magic-link assessments',
  ],
  provider: {
    '@type': 'Organization',
    name: 'hrops.io',
    url: siteUrl,
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    price: '0', 
    availability: 'https://schema.org/InStock',
  },
}

export default function EmployerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        {/* <ClaimSection /> */}
        <PainSection />
        <PipelineAnimation />
        <FeaturesSection />
        <AgencySection />
        <OfferSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

import type { Metadata } from 'next'
import { getSiteUrl } from '@/lib/site'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'

import Hero from './components/S1_HeroSection'
import BenchSection from './components/S2_BenchSection'
import FeaturesSection from './components/S3_Features'
import ClientFlywheelSection from './components/S4_ClientFlywheel'
import CommissionSection from './components/S5_Commission'
import PricingSection from './components/S6_Pricing'
import CTASection from './components/S7_CTA'

const siteUrl = getSiteUrl()
const pageUrl = `${siteUrl}/demo/agency`

export const metadata: Metadata = {
  title: 'Recruitment Agency Software & Talent Pipeline Tracking | HR Ops Agency',
  description: 'How do you streamline candidate submissions and foster agency growth? Discover the HR Ops Agency Talent Platform. Grow your recruitment agency with a private talent bench, collaborative workflow tools, and automated commission tracking.',
  keywords: [
    'recruitment agency software',
    'talent management platform',
    'agency hiring tools',
    'candidate submission system',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Recruitment Agency Software & Talent Tracking | HR Ops Agency',
    description: 'Grow your recruitment agency with a private talent bench, collaborative workflow tools, and automated commission tracking.',
    url: pageUrl,
    siteName: 'hrops.io',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'HR Ops Agency Talent Platform',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recruitment Agency Software & Talent Tracking | HR Ops Agency',
    description: 'Grow your recruitment agency with a private talent bench, collaborative workflow tools, and automated commission tracking.',
    images: [`${siteUrl}/og-image.png`],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HR Ops Agency Talent Platform',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  url: pageUrl,
  description: 'A dedicated platform for recruitment agencies mapping out a private talent pipeline to collaborate with client employers and automate commission tracking.',
  featureList: [
    'Talent bench management',
    'Agency-employer collaboration',
    'Commission tracking',
    'Candidate submissions',
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

export default function AgencyProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main aria-label="hrops.io - Agency Platform">
        <Hero />
        <BenchSection />
        <FeaturesSection />
        <ClientFlywheelSection />
        <CommissionSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

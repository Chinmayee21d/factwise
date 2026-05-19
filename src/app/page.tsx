'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';

// Everything below the fold is lazy-loaded so it doesn't block the initial bundle
const ProblemSection       = dynamic(() => import('@/components/ProblemSection'),        { ssr: false });
const MethodologySection   = dynamic(() => import('@/components/Methodology'),            { ssr: false });
const ProductHubAnimation  = dynamic(() => import('@/components/productflow'),            { ssr: false });
const ProcurementModules   = dynamic(() => import('@/components/ProcurementModules'),     { ssr: false });
const ImplementationRoadmap = dynamic(() => import('@/components/ImplementationRoadmap'), { ssr: false });
const IntegrationsShowcase = dynamic(() => import('@/components/IntegrationsShowcase'),   { ssr: false });
const Testimonials         = dynamic(() => import('@/components/testimonials'),           { ssr: false });
const ModernCaseStudies    = dynamic(() => import('@/components/ModernCaseStudies'),      { ssr: false });
const ExpandingIndustrySection = dynamic(
  () => import('@/components/ExpandingIndustryCards').then(m => ({ default: m.ExpandingIndustrySection })),
  { ssr: false }
);
const FlickeringFooter     = dynamic(
  () => import('@/components/ui/flickering-footer').then(m => ({ default: m.FlickeringFooter })),
  { ssr: false }
);

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        overflowX: 'clip',
        background: '#FFFFFF',
        maxWidth: '100%',
        margin: '0',
      }}
    >
      {/* Above fold — loaded eagerly */}
      <Hero />
      <StatsStrip />

      {/* Below fold — lazy loaded */}
      <ProblemSection />
      <MethodologySection />
      <ProductHubAnimation />
      <ProcurementModules />
      <ImplementationRoadmap />
      <IntegrationsShowcase />
      <Testimonials />
      <ModernCaseStudies />
      <ExpandingIndustrySection />
      <FlickeringFooter />
    </main>
  );
}

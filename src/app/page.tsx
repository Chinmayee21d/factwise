'use client';

import { Header } from '@/components/ui/header-2';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import ProblemSection from '@/components/ProblemSection';
// import BentoGrid from '@/components/BentoGrid';

// import PersonaSection from '@/components/PersonaSection';
// import ImpactBento from '@/components/ImpactBento';
import IntegrationsShowcase from '@/components/IntegrationsShowcase';
import IndustryMarquee from '@/components/IndustryMarquee';
import { ExpandingIndustrySection } from '@/components/ExpandingIndustryCards';
import ParallaxMethodology from '@/components/ParallaxMethodology';

import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Testimonials from '@/components/testimonials';
import CaseStudies from '@/components/CaseStudies';
import ModernCaseStudies from '@/components/ModernCaseStudies';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import ProductHubAnimation from '@/components/product copy';
// import ProductFlowShowcase from '@/components/ProductFlowShowcase';
import ImplementationRoadmap from '@/components/ImplementationRoadmap';
import MethodologySection from '@/components/Methodology';
// import ProcurementJourney from '@/components/ProcurementJourney';
// import ContractManufacturerFlow from '@/components/ContractManufacturerFlow';
// import PostAwardExecution from '@/components/PostAwardExecution';

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
      <Header />

      {/* 1: Hero */}
      <Hero />

      {/* 2: Stats Strip */}
      <StatsStrip />

      {/* 3: Problem Section */}
      <ProblemSection />

      {/* 4: Methodology Section */}
      <ParallaxMethodology />
      <MethodologySection/>
      {/* 4: Product Hub Animation */}
      <ProductHubAnimation />
 

      {/* 5: Implementation Roadmap */}
      <ImplementationRoadmap />

      {/* 6: Persona Deep Dive */}
      {/* <PersonaSection />  */}

      {/* 7
      <ImpactBento /> */}

      {/* 8 */}
      <IntegrationsShowcase />
      
      {/* 9: Testimonials */}
      <Testimonials />

      {/* 10: Case Studies */}
      <CaseStudies />
      <ModernCaseStudies />
      {/* 10 */}
      <IndustryMarquee />
      <ExpandingIndustrySection />
      
      <FAQSection />

      <CTASection />
      <FlickeringFooter />
    </main>
  );
}

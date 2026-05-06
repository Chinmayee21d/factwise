'use client';

import { Header } from '@/components/ui/header-2';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import PainSection from '@/components/PainSection';
import ProblemSection from '@/components/ProblemSection';
// import BentoGrid from '@/components/BentoGrid';

// import PersonaSection from '@/components/PersonaSection';
// import ImpactBento from '@/components/ImpactBento';
import IntegrationsShowcase from '@/components/IntegrationsShowcase';
// import IndustryMarquee from '@/components/IndustryMarquee';

import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import ProductHubAnimation from '@/components/product copy';
import ProductFlowShowcase from '@/components/ProductFlowShowcase';
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
        alignItems: 'center',
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

      {/* 4: Product Hub Animation */}
      <ProductHubAnimation />
      <ProductFlowShowcase />
      {/* 4.5: Overview Bento */}
      {/* <BentoGrid /> */}

      {/* 4.6: Operations Journey (7 Steps) */}
      {/* <ProcurementJourney /> */}

      {/* 4.7: Contract Manufacturer Flow */}
      {/* <ContractManufacturerFlow /> */}

      {/* 4.8: Post-award Execution Flow */}
      {/* <PostAwardExecution /> */}

      {/* 6: Persona Deep Dive */}
      {/* <PersonaSection />  */}

      {/* 7
      <ImpactBento /> */}

      {/* 8 */}
      <IntegrationsShowcase />
      {/* 9 */}
      {/*<IndustryMarquee /> */}
      {/* 10 */}
      <FAQSection />

      <CTASection />
      <FlickeringFooter />
    </main>
  );
}

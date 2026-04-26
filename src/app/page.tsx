'use client';

import { Header } from '@/components/ui/header-2';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import PainSection from '@/components/PainSection';
import BentoGrid from '@/components/BentoGrid';
import { FactWiseEcosystem } from '@/components/blocks/features-6';
import StatsSection from '@/components/StatsSection';
import RequisitionsSection from '@/components/features/RequisitionsSection';
import SavingsSection from '@/components/features/SavingsSection';
import GovernanceSection from '@/components/features/GovernanceSection';
import GoodsReceiptSection from '@/components/features/GoodsReceiptSection';
import AutomationSection from '@/components/features/AutomationSection';
import ScrollFeatureSection from '@/components/ScrollFeatureSection';
import IntegrationsShowcase from '@/components/IntegrationsShowcase';
import IndustryMarquee from '@/components/IndustryMarquee';
import CTASection from '@/components/CTASection';
import { FlickeringFooter } from '@/components/ui/flickering-footer';

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
        background: '#0a0a0c',
      }}
    >
      <Header />

      <Hero />
      <TrustBar />
      <PainSection />
      <BentoGrid />
      
      <RequisitionsSection />
      <FactWiseEcosystem />
      <SavingsSection />
      <GovernanceSection />
      <GoodsReceiptSection />
      <AutomationSection />
      
      <ScrollFeatureSection />

      <StatsSection />
      <IntegrationsShowcase />
      <IndustryMarquee />

      <CTASection />

      <FlickeringFooter />
    </main>
  );
}

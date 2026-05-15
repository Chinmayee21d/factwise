import React from 'react';
import { ReactLenis } from 'lenis/react';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { 
  CareersHero,
  CareersCulture,
  CareersOpenings,
  CareersTestimonials,
  CareersBenefits
} from '@/components/careers';

export default function CareersPage() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-white">
        <CareersHero />
        <CareersCulture />
        <CareersOpenings />
        <CareersTestimonials />
        <CareersBenefits />
        <FlickeringFooter />
      </main>
    </ReactLenis>
  );
}

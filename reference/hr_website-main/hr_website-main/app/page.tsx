import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import Personas from '@/components/sections/Personas'
import Compliance from '@/components/sections/Compliance'
import Pricing from '@/components/sections/Pricing'
import CTA from '@/components/sections/CTA'
import FAQ from '@/components/sections/FAQ'
import ScrollInit from '@/components/ui/ScrollInit'
import dynamic from 'next/dynamic'

const Platform = dynamic(() => import('@/components/sections/Platform'), { ssr: false })
const HubAnimation = dynamic(() => import('@/components/sections/HubAnimation'), { ssr: false })
const PipelineBuilder = dynamic(() => import('@/components/sections/PipelineBuilder'), { ssr: false })
const Footer = dynamic(() => import('@/components/sections/Footer'), { ssr: false })

export default function Home() {
  return (
    <>
      <ScrollInit />
      <Nav />
      <main aria-label="hrops.io - AI Hiring Platform">
        <Hero />
        <Platform />
        <HubAnimation />
        <PipelineBuilder />
        <Personas />
        <Compliance />
        <Pricing />

        <CTA />
      </main>
      <Footer />
    </>
  )
}

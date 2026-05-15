import Nav from '@/components/sections/Nav'
import FAQ from '@/components/sections/FAQ'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@/components/sections/Footer'), { ssr: false })

export default function FAQPage() {
    return (
        <>
            <Nav />
            <main>
                <FAQ />
            </main>
            <Footer />
        </>
    )
}
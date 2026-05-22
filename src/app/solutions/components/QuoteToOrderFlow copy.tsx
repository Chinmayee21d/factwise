'use client';

import BomCostSection from './BomCostSection';
import SourcingSection from './SourcingSection';
import RfqAnalyticsSection from './RfqAnalyticsSection';
import QuoteGenSection from './QuoteGenSection';

export default function QuoteToOrderFlow() {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            <div className="mx-auto max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6 relative z-10">
                {/* Unified Main Header */}
                <div className="mb-24">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                        The FactWise Ecosystem
                    </div>
                    <h2 className="text-[36px] md:text-[48px] font-semibold text-[#0D1117] mb-6 tracking-[-0.03em] leading-[1.1] max-w-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                        Four core capabilities that <br />
                        <span className="text-[#3666ff]">change everything</span> about procurement.
                    </h2>
                    <p className="text-[17px] md:text-[18px] text-slate-400 font-normal max-w-2xl leading-[1.65]" style={{ fontFamily: 'var(--font-inter)' }}>
                        Built specifically for complex manufacturing and high-volume direct spend.
                        A complete end-to-end lifecycle that replaces fragmented silos with intelligent automation.
                    </p>
                </div>

                <BomCostSection />
                <SourcingSection />
                <RfqAnalyticsSection />
                <QuoteGenSection />
            </div>
        </section>
    );
}

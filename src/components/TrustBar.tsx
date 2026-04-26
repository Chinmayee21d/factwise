'use client';

import { motion } from 'framer-motion';
import { CUSTOMER_LOGOS } from '@/lib/constants';

export default function TrustBar() {
  return (
    <section className="w-full py-12 md:py-16 border-b border-white/[0.04] bg-[#0a0a0c] overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col items-center gap-10">
          <motion.p
            className="text-[11px] font-medium tracking-[0.18em] text-[#6b6b7a] uppercase text-center"
          >
            Trusted by procurement teams at
          </motion.p>

          <div className="w-full relative flex items-center">
            {/* Edge fades */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

            {/* Marquee row */}
            <div className="flex overflow-hidden group select-none">
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-33.33%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex items-center gap-12 md:gap-20 shrink-0 pr-12 md:pr-20"
              >
                {/* 3 sets for infinite loop */}
                {[0, 1, 2].map((set) => (
                  <div key={set} className="flex items-center gap-12 md:gap-20">
                    {CUSTOMER_LOGOS.map((logo) => (
                      <div
                        key={`${set}-${logo.name}`}
                        className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group/logo"
                      >
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#111116] border border-white/5 flex items-center justify-center font-bold text-[10px] md:text-[11px] text-white/80 group-hover/logo:border-[#7c5cfc]/30 group-hover/logo:shadow-[0_0_20px_rgba(124,92,252,0.1)] transition-all">
                          {logo.initials}
                        </div>
                        <span className="text-[14px] md:text-[16px] font-medium text-white/90 tracking-tight whitespace-nowrap">
                          {logo.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

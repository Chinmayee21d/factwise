'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Header } from '@/components/ui/header-2';
import CTASection from '@/components/CTASection';
import { ArrowRight, Target, Users, Zap, ShieldCheck } from 'lucide-react';

/* ── Antigravity Visual Elements ────────────── */

function AntigravityGrid({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  const gridX = useTransform(mouseX, [0, 1920], [20, -20]);
  const gridY = useTransform(mouseY, [0, 1080], [20, -20]);
  return (
    <motion.div style={{ x: gridX, y: gridY }} className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
      <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
        {[...Array(15)].map((_, i) => (
          <path
            key={i}
            d={`M 0 ${50 + i * 60} C 400 ${70 + i * 55} 1000 ${30 + i * 65} 1440 ${50 + i * 60}`}
            stroke="#3666ff"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
        ))}
      </svg>
    </motion.div>
  );
}

function AmbientParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-black/10"
          initial={{
            x: Math.random() * 100 + "%",
            y: "110%",
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: "-10%",
            opacity: [0, 1, 0],
            x: (Math.random() * 100 - 50) + "%"
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

const BEZIER_EASE = [0.32, 0.72, 0, 1] as const;

/* ── About Hero ──────────────────────────────── */
const AboutHero = () => {
  return (
    <section className="relative w-full pt-48 pb-40 overflow-hidden bg-[#f6f9fc]">
      <div className="relative z-10 max-w-7xl mx-auto px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: BEZIER_EASE }}
        >
          <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-[#3666ff]/10 border border-[#3666ff]/20 backdrop-blur-xl mb-10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3666ff] animate-pulse" />
            <span className="text-[10px] font-black text-[#3666ff] uppercase tracking-[0.3em]">Our Story</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-light text-[#000000] tracking-tight leading-[1] mb-10">
            Reimagining the <br />
            <span className="text-[#000000]/30 italic">Supply chain journey.</span>
          </h1>
          <p className="text-xl text-[#808080] font-light max-w-2xl mx-auto leading-relaxed">
            FactWise was founded on a simple belief: that enterprise operations shouldn&apos;t be fragmented, opaque, or slow. We&apos;re building the intelligent tissue that connects global supply chains.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Mission Section ─────────────────────────── */
const MissionSection = () => {
  return (
    <section className="relative w-full py-40 bg-[#f6f9fc]">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-4xl font-light text-[#000000] mb-10">Our Mission</h2>
            <div className="h-px w-24 bg-[#3666ff]/50 mb-10" />
            <p className="text-3xl md:text-5xl font-light text-[#000000] leading-[1.2]">
              &quot;Delight users and provide sustainable, positive impact to the organizations we serve.&quot;
            </p>
          </div>

          <div
            className="relative aspect-square lg:aspect-video rounded-[40px] overflow-hidden border border-black/[0.06] bg-black/[0.02] flex items-center justify-center group"
          >
            <div className="absolute inset-0 bg-radial-gradient from-[#3666ff]/10 to-transparent blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Floating UI Elements Mockup */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 p-12 text-center"
            >
              <div className="w-24 h-24 rounded-3xl bg-black/[0.03] border border-black/[0.08] backdrop-blur-2xl flex items-center justify-center mb-8 mx-auto shadow-sm">
                <Target size={40} className="text-[#3666ff]" />
              </div>
              <h4 className="text-[#000000] text-lg font-medium mb-2">Ecosystem Integrity</h4>
              <p className="text-[#808080] font-mono text-[10px] tracking-widest uppercase">Verified Node v4.0.1</p>
            </motion.div>

            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3cac]/20 blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#3666ff]/10 blur-[80px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Values Grid ────────────────────────────── */
const VALUES = [
  {
    title: 'Customer First, Always',
    desc: 'Always aim to create positive impact for organizations and bring sheer delight for each user, big or small.',
    icon: <Users size={24} />,
    color: '#3666ff'
  },
  {
    title: 'Strive for Excellence',
    desc: 'Constantly raise the bar for yourself and others with big picture thinking and nuanced, robust execution.',
    icon: <Zap size={24} />,
    color: '#34d399'
  },
  {
    title: 'Never Settle',
    desc: 'Aspire to deliver extraordinary results while always maintaining accountability and integrity.',
    icon: <ShieldCheck size={24} />,
    color: '#ff3cac'
  },
  {
    title: 'Always Think Win-Win',
    desc: 'Challenge yourself to create win-win solutions for all stakeholders in all situations.',
    icon: <Target size={24} />,
    color: '#00d4ff'
  }
];

const ValuesSection = () => {
  return (
    <section className="relative w-full py-40 bg-[#f6f9fc]">
      <div className="max-w-7xl mx-auto px-10">
        <div className="text-center mb-32">
          <h2 className="text-5xl font-light text-[#000000] mb-8">Our Values</h2>
          <p className="text-[#808080] font-light text-xl max-w-2xl mx-auto">The principles that guide every line of code we write and every partnership we build.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="group relative p-10 rounded-[32px] border border-black/[0.06] bg-white overflow-hidden hover:border-[#3666ff]/30 transition-all duration-500"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl pointer-events-none duration-700"
                style={{ background: v.color }}
              />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-black/[0.04] border border-black/[0.08] flex items-center justify-center mb-8 text-[#000000] group-hover:scale-110 group-hover:bg-[#3666ff]/10 group-hover:border-[#3666ff]/30 transition-all duration-500">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-medium text-[#000000] mb-4 group-hover:text-shadow-glow transition-all">
                  {v.title}
                </h3>
                <p className="text-[#808080] font-light leading-relaxed text-lg">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { FlickeringFooter } from '@/components/ui/flickering-footer';

/* ── Main About Page ─────────────────────────── */
export default function AboutPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="min-h-screen bg-[#f6f9fc] selection:bg-[#3666ff]/20 selection:text-[#000000] overflow-x-hidden">
      <Header />

      <div className="fixed inset-0 z-0">
        <AntigravityGrid mouseX={mouseX} mouseY={mouseY} />
        <AmbientParticles />
      </div>

      <div className="relative z-10">
        <AboutHero />
        <MissionSection />
        <ValuesSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent my-10" />

        <CTASection />

        <FlickeringFooter />
      </div>

      <style jsx global>{`
        .bg-radial-gradient {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 65%);
        }
        .text-shadow-glow {
          text-shadow: 0 0 15px rgba(54, 102, 255, 0.4);
        }
      `}</style>
    </main>
  );
}

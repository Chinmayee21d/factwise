"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';

// --- Custom Social Icons (Refined for Premium Fintech look) ---
const SocialIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <path d={d} />
  </svg>
);

const LinkedinIcon = () => <SocialIcon d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2" />;
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);
const FacebookIcon = () => <SocialIcon d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />;

// --- Data ---
const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Source-to-Pay", href: "#" },
      { name: "Strategic Sourcing", href: "#" },
      { name: "Supplier Management", href: "#" },
      { name: "PO Management", href: "#" },
      { name: "Invoicing & Payments", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Manufacturing", href: "#" },
      { name: "Retail & CPG", href: "#" },
      { name: "Chemicals", href: "#" },
      { name: "Logistics", href: "#" },
      { name: "Enterprises", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "#" },
      { name: "Case Studies", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "System Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Sustainability", href: "#" },
    ],
  },
];

const socialPlatforms = [
  { icon: LinkedinIcon, href: "#", name: "LinkedIn" },
  { icon: InstagramIcon, href: "#", name: "Instagram" },
  { icon: YoutubeIcon, href: "#", name: "Youtube" },
  { icon: FacebookIcon, href: "#", name: "Facebook" },
];

const footerVariants = {
  hidden: { filter: 'blur(12px)', y: 40, opacity: 0 },
  visible: (delay: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.8,
      ease: "easeOut"
    }
  })
};

// --- Sub-components ---
const AnimatedContainer = ({ children, delay = 0.1 }: { children: React.ReactNode, delay?: number }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      variants={footerVariants}
      custom={delay}
    >
      {children}
    </motion.div>
  );
};

export function FlickeringFooter() {
  return (
    <footer
      className="relative w-full h-[480px] bg-[#000212] overflow-hidden"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      {/* Sticky Reveal Wrapper */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="fixed bottom-0 left-0 w-full h-[480px] bg-[#000212]"
      >
        <div className="sticky top-[calc(100vh-480px)] h-full w-full flex flex-col justify-between">

          {/* Main Content Area */}
          <div className="relative flex-1 flex items-center border-t border-white/10 py-8">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -translate-y-1/2" />
              <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] translate-y-1/2" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">

                {/* Brand Section */}
                <div className="lg:col-span-4 space-y-6">
                  <AnimatedContainer>
                    <Link href="/" className="flex items-center gap-3 group">
                      <img
                        src="/logowhite.png"
                        alt="FactWise Logo"
                        className="h-8 w-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 rounded-tl-sm rounded-br-sm"
                      />
                      <span className="text-[17px] font-bold tracking-tight text-white">FactWise</span>
                    </Link>
                  </AnimatedContainer>

                  <AnimatedContainer delay={0.2}>
                    <p className="text-slate-400 text-base leading-relaxed font-medium max-w-sm">
                      The next-generation source-to-pay platform. Unifying your entire supply chain in one intelligent, automated ecosystem.
                    </p>
                  </AnimatedContainer>

                  <AnimatedContainer delay={0.3}>
                    <div className="flex gap-3">
                      {socialPlatforms.map((platform, i) => (
                        <Button
                          key={platform.name}
                          variant="outline"
                          size="icon"
                          className="size-10 rounded-xl border-white/10 bg-white/5 text-white hover:bg-[#3666ff] hover:text-white hover:border-blue-500 transition-all duration-300 shadow-sm"
                        >
                          <platform.icon />
                        </Button>
                      ))}
                    </div>
                  </AnimatedContainer>
                </div>

                {/* Navigation Links Grid */}
                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {footerLinks.map((section, idx) => (
                    <AnimatedContainer key={section.title} delay={0.2 + idx * 0.1}>
                      <div className="space-y-6">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
                          {section.title}
                        </h4>
                        <ul className="space-y-4">
                          {section.links.map((link) => (
                            <li key={link.name}>
                              <a
                                href={link.href}
                                className="text-slate-400 hover:text-[#3666ff] text-[14px] font-medium transition-colors inline-flex items-center group/link"
                              >
                                {link.name}
                                <ArrowRight className="w-0 h-3 ml-1.5 opacity-0 -translate-x-2 transition-all group-hover/link:w-3 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-[#3666ff]" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AnimatedContainer>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 py-8 bg-[#000212] relative z-10">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
              <AnimatedContainer delay={0.4}>
                <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest">
                  © 2026 FactWise Technologies. All rights reserved.
                </p>
              </AnimatedContainer>

              <AnimatedContainer delay={0.5}>
                <div className="flex gap-8">
                  {['Privacy Policy', 'Terms of Service', 'Security'].map((item) => (
                    <a key={item} href="#" className="text-slate-500 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors">
                      {item}
                    </a>
                  ))}
                </div>
              </AnimatedContainer>
            </div>
          </div>

        </div>
      </motion.div>
    </footer>
  );
}

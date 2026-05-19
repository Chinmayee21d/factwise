'use client';

import * as React from "react"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header-2'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from 'lucide-react'

export default function SolutionsHero() {
    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-[#020617] text-white">
            <Header theme="dark" />

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[120px]" />
                <div 
                    className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                    style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 md:pt-48 md:pb-32 lg:flex lg:items-center lg:gap-16">
                
                {/* Left Content Column */}
                <div className="flex-1 text-left z-10 max-w-2xl lg:pr-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div 
                            className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-[11px] font-bold text-blue-400 mb-8 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            <ShieldCheck className="size-3.5" />
                            <span>Enterprise Quote-to-Order</span>
                        </div>

                        <h1 
                            className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-8"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            From Customer Inquiry to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500">
                                Winning Quote.
                            </span> <br />
                            Faster Than You Think.
                        </h1>

                        <p 
                            className="text-base md:text-lg text-slate-400 mb-12 leading-relaxed"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            Quoting takes too long and margins are constantly under pressure. FactWise automates the entire inquiry-to-quote journey — helping you move faster, price smarter, and win more business.
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                            <Button
                                asChild
                                size="lg"
                                className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-sm font-bold shadow-[0_20px_50px_rgba(37,99,235,0.2)] transition-all hover:scale-105 active:scale-95"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                <Link href="/demo" className="flex items-center gap-2">
                                    Experience FactWise
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Animated Dashboard Column */}
                <div 
                    className="flex-1 mt-20 lg:mt-0 relative"
                    style={{ perspective: '1000px' }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10"
                    >
                        {/* Main Dashboard Mockup */}
                        <div className="relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/20">
                            <div className="rounded-[24px] overflow-hidden border border-white/5 bg-slate-900 shadow-inner">
                                <img 
                                    src="https://tailark.com/_next/image?url=%2Fdark-card.webp&w=3840&q=75" 
                                    alt="FactWise Dashboard" 
                                    className="w-full h-auto opacity-90"
                                />
                            </div>

                            {/* Floating Animated Elements */}
                            <FloatingCard 
                                delay={0} 
                                className="top-[10%] -left-8 md:-left-16"
                                icon={<FileText className="text-blue-400" />}
                                title="RFQ Generated"
                                subtitle="5 Vendors invited"
                            />
                            
                            <FloatingCard 
                                delay={1.5} 
                                className="bottom-[20%] -right-8 md:-right-12"
                                icon={<CheckCircle2 className="text-green-400" />}
                                title="Quote Normalized"
                                subtitle="Savings: $12,400"
                            />

                            <FloatingCard 
                                delay={3} 
                                className="-bottom-10 left-[20%]"
                                icon={<ShieldCheck className="text-indigo-400" />}
                                title="PO Approved"
                                subtitle="Sent to ERP"
                            />
                        </div>

                        {/* Decorative Glow */}
                        <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full -z-10" />
                    </motion.div>
                </div>
            </div>

        </section>
    )
}

function FloatingCard({ className, icon, title, subtitle, delay }: { className: string, icon: React.ReactNode, title: string, subtitle: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
                opacity: 1, 
                y: [0, -10, 0],
            }}
            transition={{ 
                opacity: { duration: 0.5, delay },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
            }}
            className={cn("absolute z-20 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 min-w-[200px]", className)}
        >
            <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-white">{title}</span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider">{subtitle}</span>
            </div>
        </motion.div>
    )
}

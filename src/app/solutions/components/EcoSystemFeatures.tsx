'use client';

import React from 'react';
import { Cpu, Lock, Sparkles, Zap } from 'lucide-react';

export default function EcoSystemFeatures() {
    return (
        <section className="py-16 md:py-32 bg-white relative overflow-hidden">
            {/* Background elements to match the site's theme */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-50 -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] opacity-50 -z-10" />

            <div className="mx-auto max-w-7xl space-y-12 px-6 relative z-10">
                <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1A1D2E]" style={{ fontFamily: 'var(--font-display)' }}>
                        The FactWise ecosystem <br />
                        <span className="text-[#3666ff]">brings together our models</span>
                    </h2>
                    <p className="max-w-sm sm:ml-auto text-slate-500 font-medium leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                        Empower your team with workflows that adapt to your needs, whether you prefer automated bidding or AI-driven vendor normalization.
                    </p>
                </div>
                
                <div className="relative rounded-[32px] p-4 bg-slate-50/50 border border-slate-100 overflow-hidden group">
                    <div className="aspect-[88/36] relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
                        <div className="bg-gradient-to-t z-20 from-white/20 absolute inset-0 to-transparent pointer-events-none"></div>
                        <img 
                            src="https://tailark.com/_next/image?url=%2Fmail-upper.png&w=3840&q=75" 
                            className="absolute inset-0 z-10 object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000" 
                            alt="Ecosystem illustration" 
                        />
                        {/* Background layers */}
                        <img 
                            src="https://tailark.com/_next/image?url=%2Fmail-back-light.png&w=3840&q=75" 
                            className="absolute inset-0 w-full h-full object-cover" 
                            alt="Ecosystem background" 
                        />
                    </div>
                </div>

                <div className="relative mx-auto grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-8 lg:grid-cols-4 pt-8">
                    <div className="space-y-4 group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50 text-[#3666ff] group-hover:bg-[#3666ff] group-hover:text-white transition-colors duration-300">
                                <Zap className="size-4" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1A1D2E]" style={{ fontFamily: 'var(--font-display)' }}>Velocity</h3>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Built for speed, reducing cycle times by up to 50% through automated event creation and bid leveling.
                        </p>
                    </div>
                    
                    <div className="space-y-4 group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50 text-[#3666ff] group-hover:bg-[#3666ff] group-hover:text-white transition-colors duration-300">
                                <Cpu className="size-4" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1A1D2E]" style={{ fontFamily: 'var(--font-display)' }}>Precision</h3>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Our engine handles complex multi-currency calculations and landed cost analysis with 100% accuracy.
                        </p>
                    </div>
                    
                    <div className="space-y-4 group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50 text-[#3666ff] group-hover:bg-[#3666ff] group-hover:text-white transition-colors duration-300">
                                <Lock className="size-4" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1A1D2E]" style={{ fontFamily: 'var(--font-display)' }}>Security</h3>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Enterprise-grade security with role-based access and full audit logs for every decision made on the platform.
                        </p>
                    </div>
                    
                    <div className="space-y-4 group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50 text-[#3666ff] group-hover:bg-[#3666ff] group-hover:text-white transition-colors duration-300">
                                <Sparkles className="size-4" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1A1D2E]" style={{ fontFamily: 'var(--font-display)' }}>AI Powered</h3>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                            Leverage advanced machine learning to identify savings opportunities and surface vendor risks instantly.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

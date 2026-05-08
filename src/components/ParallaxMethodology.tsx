'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Zap, Scale, Calculator, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils";

export const ParallaxMethodology = () => {
    // Array of section data based on FactWise Capabilities
    const sections = [
        {
            id: 1,
            title: "No Code. No IT. No Waiting.",
            description: "FactWise is built for procurement, by procurement. Build approval hierarchies and configure custom formulas without writing a single line of code.",
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
            reverse: false,
            icon: <Zap className="w-12 h-12 text-blue-500 mb-6" />
        },
        {
            id: 2,
            title: "Built for Real Scale",
            description: "Manage 1,000+ items across 500+ vendors in a single click. Infinite child BOMs and bulk pricing combined in one seamless view.",
            imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
            reverse: true,
            icon: <Scale className="w-12 h-12 text-green-500 mb-6" />
        },
        {
            id: 3,
            title: "True Landed Cost",
            description: "Automatic normalization across every currency. Define your own formula and buy based on total cost, not just quote numbers.",
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
            reverse: false,
            icon: <Calculator className="w-12 h-12 text-orange-500 mb-6" />
        },
        {
            id: 4,
            title: "Decision Intelligence",
            description: "Analytics at every decision point. Ask data questions in plain language and get instant historical pricing across all events.",
            imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80',
            reverse: true,
            icon: <BarChart3 className="w-12 h-12 text-purple-500 mb-6" />
        }
    ]

    // Create refs for each section
    const sectionRefs = sections.map(() => useRef(null));
    
    // We can't call useScroll inside map if it's not a hook loop, but we can do it here
    return (
        <section className="bg-white overflow-hidden" id="parallax-methodology">
            <div className='min-h-[45vh] w-full flex flex-col items-center justify-center text-center px-6 pt-24'>
                <div className="section-badge mb-6" style={{ fontFamily: 'var(--font-inter)' }}>THE FACTWISE METHOD</div>
                <h2 className='text-4xl md:text-6xl font-bold text-[#1A1D2E] max-w-4xl tracking-tight leading-tight' style={{ fontFamily: 'var(--font-display)' }}>
                    A Smarter Way to <span className="text-blue-600">Source and Pay</span>
                </h2>
                <p className='mt-6 text-slate-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed' style={{ fontFamily: 'var(--font-inter)' }}>
                    Experience a platform that adapts to your workflow, scales with your volume, and turns data into your greatest asset.
                </p>

            </div>

            <div className="flex flex-col">
                {sections.map((section, index) => (
                    <ParallaxSection 
                        key={section.id}
                        section={section}
                        isLast={index === sections.length - 1}
                    />
                ))}
            </div>

            <div className='min-h-[30vh] w-full flex flex-col items-center justify-center bg-slate-50 border-t border-slate-100 mt-12 py-20'>
                <h3 className='text-3xl md:text-5xl font-bold text-[#1A1D2E] tracking-tight' style={{ fontFamily: 'var(--font-display)' }}>Ready to transform?</h3>
                <p className="mt-4 text-slate-500 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>Join the leaders in digital procurement.</p>
            </div>
        </section>
    );
};

function ParallaxSection({ section, isLast }: { section: any, isLast: boolean }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [0, 1, 1]);
    const clipPath = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
    const textY = useTransform(scrollYProgress, [0, 1], [80, 0]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

    return (
        <div 
            ref={ref} 
            className={cn(
                "min-h-[85vh] flex items-center justify-center px-6 md:px-20 py-12 relative",
                section.reverse ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row',
                "gap-10 md:gap-24"
            )}
        >
            <motion.div 
                style={{ y: textY, opacity }}
                className="w-full md:w-1/2 flex flex-col items-start z-10"
            >
                {section.icon}
                <h3 className="text-4xl md:text-5xl font-bold text-[#1A1D2E] mb-6 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    {section.title}
                </h3>
                <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl" style={{ fontFamily: 'var(--font-inter)' }}>
                    {section.description}
                </p>
                <div className="mt-8 h-1 w-16 bg-blue-500 rounded-full" />
            </motion.div>

            <div className="w-full md:w-1/2 flex items-center justify-center relative">
                <motion.div 
                    style={{ 
                        opacity,
                        clipPath,
                        scale: imageScale
                    }}
                    className="relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-100 bg-slate-50"
                >
                    <img 
                        src={section.imageUrl} 
                        className="w-full h-full object-cover" 
                        alt={section.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none" />
                </motion.div>
                
                {/* Decorative background element */}
                <div className={cn(
                    "absolute -z-10 w-[120%] h-[120%] rounded-full bg-slate-50/50 blur-3xl",
                    section.reverse ? "-left-1/4" : "-right-1/4"
                )} />
            </div>
        </div>
    );
}

export default ParallaxMethodology;

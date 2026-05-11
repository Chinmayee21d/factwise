import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp } from 'lucide-react';

const testimonials = [
    {
        id: 'syrma-sgs',
        name: "Kapil Maini",
        role: "Chief Procurement Officer",
        company: "Syrma SGS",
        content: "Factwise has significantly improved procurement digitalization and automated quotation processes, enabling faster workflows, enhanced transparency, and data-driven decision-making. We like the platform's efficiency, seamless integration, and actionable insights. The solutions team is always listening to the voice of the customer and adapting the solution to serve their needs.",
        color: "bg-blue-100 text-blue-700"
    },
    {
        id: 'fortune-50-vp',
        name: "VP of Procurement",
        role: "Fortune 50 Company",
        company: "Global Enterprise",
        content: "The Factwise app is a great consolidation of features that provides the ability to send RFx's, assess pricing, allocation, PO & AP processing, etc. all in one app. It's an extremely efficient way to manage the materials buying process all under one application.",
        color: "bg-purple-100 text-purple-700"
    },
    {
        id: 'spark-minda',
        name: "Sunil Kumar Injeti",
        role: "Vice President",
        company: "Spark Minda",
        content: "Factwise streamlines sourcing processes by automating non-value-adding activities, boosting efficiency and productivity. Their customizable GUI and dashboards empower users with tailored insights for smarter decision-making.",
        color: "bg-green-100 text-green-700"
    },
    {
        id: 'driplex',
        name: "Vivek Mehta",
        role: "CEO",
        company: "Driplex",
        content: "Our manufacturing company uses the traditional standard ERP system. With Factwise integrating with our ERP, our purchasing has become informed, organized, and effortless. The intuitive and sleek UI was a standout feature. Factwise has been a game-changing addition for us.",
        color: "bg-orange-100 text-orange-700"
    },
    {
        id: 'gem-corp',
        name: "Kinjal Shah",
        role: "CEO",
        company: "Gem Corp",
        content: "FactWise excels in analytics — their AI innovation transforms analysis into a user-friendly experience. Breaking free from old formats, we've minimized Excel dependency, witnessing a data-driven revolution that elevates our operations and business decisions. The proactive, attentive team ensures seamless implementation — a standout feature in this limitless solution.",
        color: "bg-pink-100 text-pink-700"
    },
    {
        id: 'prasol',
        name: "Pankil Dharia",
        role: "Co-owner",
        company: "Prasol",
        content: "FactWise has enabled us to make data-driven decisions in procurement. This has increased the efficiency and compliance in the team and more importantly led to cost savings which is extremely important in our industry. Their standout analytics throughout the platform and the ability to easily customize the requirements based on our needs are absolutely nothing that we have seen before.",
        color: "bg-cyan-100 text-cyan-700"
    },
    {
        id: 'bpt',
        name: "Avaneesh Krishna",
        role: "Enterprise IT Strategies",
        company: "BPT",
        content: "FactWise streamlined our quoting process, replacing manual tasks with efficient vendor and client interactions. Customizable and adaptable, it tailored to our complex workflow perfectly. Analytics stole the spotlight, offering diverse views for nuanced decision-making. FactWise harnessed transactional data, creating potent historical analytics for enhanced client value. Beyond tools, their attentive team unlocked the product's potential, ensuring personalized support.",
        color: "bg-yellow-100 text-yellow-700"
    },
    {
        id: 'fortune-50-sr-dir',
        name: "Sr. Director of Procurement",
        role: "Fortune 50 Company",
        company: "Global Enterprise",
        content: "FactWise has done a great job at understanding the users. The thoughtfulness in the way it is created is impressive. Even the smallest details have been thought of to make sure the user experience is excellent. Our user adoption and attention to detail are the primary reasons for FactWise's success at our company.",
        color: "bg-teal-100 text-teal-700"
    },
    {
        id: 'amkette',
        name: "Varun Bapna",
        role: "Co-owner",
        company: "Amkette",
        content: "Amkette sought an automated solution for their complex sourcing operation, focusing on procurement and vendor analytics. Initially designed for manufacturing, Factwise adapted swiftly, engaging Amkette's vendors. The platform's ongoing customization, including a built-in chat system, eased China communication challenges.",
        color: "bg-indigo-100 text-indigo-700"
    }
];

export default function Testimonials() {
    const [showMore, setShowMore] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const toggleShowMore = () => {
        if (!showMore) {
            // When opening, change state then scroll
            setShowMore(true);
            setTimeout(() => {
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            // When closing, scroll then change state
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
                setShowMore(false);
            }, 500); // Wait for scroll to complete
        }
    };

    return (
        <section
            ref={sectionRef}
            className="w-full py-12 md:py-20 relative scroll-mt-20"
            id="testimonials"
        >
            {/* Rounded Background Container */}
            <div
                className="absolute inset-0 mx-2 md:mx-10 bg-no-repeat bg-cover bg-center rounded-[2rem] md:rounded-[2rem] overflow-hidden"
                style={{
                    backgroundImage: "url('TexturedGradient.png')",
                    backgroundAttachment: 'fixed'
                }}
            />
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div style={{ textAlign: 'center', marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div className="section-badge" style={{ marginBottom: 0, fontWeight: 500, letterSpacing: '0.05em' }}>Testimonials</div>
                    <h2
                        style={{
                            fontFamily: 'var(--font-display), sans-serif',
                            fontSize: 'clamp(32px, 5vw, 54px)',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            color: '#1A1D2E',
                            margin: 0,
                            lineHeight: 1.15
                        }}
                    >
                        Hear from the <span style={{ color: '#4A6FFF' }}>leaders</span> and operators
                    </h2>
                    <p
                        style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: '18px',
                            fontWeight: 500,
                            color: '#7B82A8',
                            margin: 0,
                            lineHeight: 1.6,
                            maxWidth: '720px'
                        }}
                    >
                        Discover how FactWise is transforming workflows for enterprises worldwide, driving efficiency and strategic growth.
                    </p>
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        {!showMore ? (
                            <motion.div
                                key="bento"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2"
                            >
                                {/* Bento Layout - Initial 4 Cards */}
                                {testimonials.slice(0, 4).map((t, i) => (
                                    <Card
                                        key={t.id}
                                        className={`${i === 0 ? "md:col-span-2 md:row-span-2 p-2 md:p-4" :
                                            i === 1 ? "md:col-span-2 p-2" :
                                                "md:col-span-1 p-2"
                                            } border-slate-100 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(74,111,255,0.25)] hover:border-[#4A6FFF]/30 transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden rounded-xl`}
                                    >
                                        <CardContent className={`h-full flex flex-col justify-between gap-8 pt-6 relative z-10`}>
                                            <div className="space-y-4 relative z-10">
                                                <p
                                                    className={`${i === 0 ? "text-lg md:text-3xl" : i === 1 ? "text-base md:text-xl" : "text-sm md:text-base"} font-medium leading-tight tracking-tight`}
                                                    style={{ fontFamily: 'var(--font-inter)', color: '#1A1D2E' }}
                                                >
                                                    "{t.content}"
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 mt-auto">
                                                <Avatar className={`${i === 0 ? "size-14" : "size-10"} border border-slate-100 ring-2 ring-white shadow-sm transition-all group-hover:ring-blue-50`}>
                                                    <AvatarFallback className={`${t.color} font-bold`}>
                                                        <span className={i === 0 ? "text-base" : "text-sm"}>{t.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <cite
                                                        className="text-sm font-bold not-italic text-[#1A1D2E] group-hover:text-[#4A6FFF] transition-colors block leading-none mb-1"
                                                        style={{ fontFamily: 'var(--font-display)' }}
                                                    >
                                                        {t.name}
                                                    </cite>
                                                    <span
                                                        className="block text-xs font-medium"
                                                        style={{ fontFamily: 'var(--font-inter)', color: '#7B82A8' }}
                                                    >
                                                        {t.role}{t.company ? `, ${t.company}` : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="masonry"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                            >
                                {testimonials.map((t) => (
                                    <motion.div
                                        key={t.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: (testimonials.indexOf(t) % 3) * 0.1 }}
                                        className="mb-4 break-inside-avoid"
                                    >
                                        <Card className="border-slate-100/50 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_-15px_rgba(74,111,255,0.25)] hover:border-[#4A6FFF]/30 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden rounded-xl">
                                            <CardContent className="p-6 space-y-4 relative z-10">
                                                <div className="flex items-center gap-4 relative z-10">
                                                    <Avatar className="size-10 border border-slate-100 ring-2 ring-white shadow-sm transition-all group-hover:ring-blue-50">
                                                        <AvatarFallback className={`${t.color} font-bold`}>
                                                            <span className="text-sm">{t.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h4
                                                            className="text-sm font-bold text-[#1A1D2E] group-hover:text-[#4A6FFF] transition-colors leading-none mb-1"
                                                            style={{ fontFamily: 'var(--font-display)' }}
                                                        >
                                                            {t.name}
                                                        </h4>
                                                        <p
                                                            className="text-xs font-medium"
                                                            style={{ fontFamily: 'var(--font-inter)', color: '#7B82A8' }}
                                                        >
                                                            {t.role}{t.company ? ` @ ${t.company}` : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p
                                                    className="text-base leading-relaxed font-medium"
                                                    style={{ fontFamily: 'var(--font-inter)', color: '#1A1D2E' }}
                                                >
                                                    "{t.content}"
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={toggleShowMore}
                        className="slide-button"
                        style={{ '--clr': '#4A6FFF' } as React.CSSProperties}
                    >
                        <span>{showMore ? "Show Less" : "View More"}</span>
                        <div className="slide-button__icon-wrapper">
                            {showMore ? (
                                <>
                                    <ChevronUp size={16} className="slide-button__icon-svg" />
                                    <ChevronUp size={16} className="slide-button__icon-svg--copy" />
                                </>
                            ) : (
                                <>
                                    <ChevronDown size={16} className="slide-button__icon-svg" />
                                    <ChevronDown size={16} className="slide-button__icon-svg--copy" />
                                </>
                            )}
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}
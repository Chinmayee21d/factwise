"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import {
	Mail,
	Earth,
	MessageCircle,
	Users,
    ArrowRight
} from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}

const socialLinks = [
	{ title: 'Email', href: 'mailto:contact@factwise.com', icon: Mail },
	{ title: 'Website', href: 'https://factwise.com', icon: Earth },
	{ title: 'Community', href: '#', icon: MessageCircle },
	{ title: 'Team', href: '#', icon: Users },
];

const footerLinkGroups: FooterLinkGroup[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Source-to-Pay', href: '#' },
			{ title: 'Strategic Sourcing', href: '#' },
			{ title: 'Supplier Management', href: '#' },
			{ title: 'PO Management', href: '#' },
			{ title: 'Invoicing & Payments', href: '#' },
			{ title: 'Spend Analytics', href: '#' },
			{ title: 'Integrations', href: '#' },
			{ title: 'Pricing', href: '#' },
		],
	},
	{
		label: 'Solutions',
		links: [
			{ title: 'Manufacturing', href: '#' },
			{ title: 'Retail & CPG', href: '#' },
			{ title: 'Chemicals', href: '#' },
			{ title: 'Logistics', href: '#' },
			{ title: 'Technology', href: '#' },
			{ title: 'Enterprises', href: '#' },
			{ title: 'Startups', href: '#' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '#' },
			{ title: 'Case Studies', href: '#' },
			{ title: 'Documentation', href: '#' },
			{ title: 'API Reference', href: '#' },
			{ title: 'Guides & Tutorials', href: '#' },
			{ title: 'System Status', href: '#' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '#' },
			{ title: 'Careers', href: '#' },
			{ title: 'Press', href: '#' },
			{ title: 'Sustainability', href: '#' },
		],
	},
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div {...(props as any)}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', y: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
			viewport={{ once: false, amount: 0.2 }}
			transition={{ delay, duration: 0.8 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}

export function FlickeringFooter({ className, ...props }: React.ComponentProps<'footer'>) {
	return (
		<footer
			className={cn('relative h-[600px] w-full bg-[#0B0D17]', className)}
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
			{...props}
		>
			<div className="fixed bottom-0 h-[600px] w-full bg-[#0B0D17] text-white">
				<div className="h-full overflow-y-auto">
					<div className="relative flex size-full flex-col justify-between gap-5 border-t border-white/5 px-4 py-16 md:px-12">
						{/* Subtle Grid / Radial Effect */}
						<div
							aria-hidden
							className="absolute inset-0 isolate z-0 contain-strict pointer-events-none overflow-hidden"
						>
							<div className="bg-[radial-gradient(circle_at_center,rgba(74,111,255,0.1)_0,transparent_70%)] absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
						</div>
						
						<div className="relative z-10 mt-10 flex flex-col gap-12 md:flex-row xl:mt-0 items-start">
							<AnimatedContainer className="w-full max-w-sm min-w-2xs space-y-6">
								<Link href="/" className="flex items-center gap-3">
                                    <img src="/logowhite.png" alt="FactWise Logo" className="h-8 w-auto rounded-tl-sm rounded-br-sm" />
                                    <span className="text-xl font-bold text-white tracking-tight">FactWise</span>
                                </Link>
								<p className="text-slate-400 mt-8 text-sm md:mt-0 leading-relaxed max-w-[280px]">
									The next-generation source-to-pay platform. 
                                    Unifying your entire supply chain in one intelligent ecosystem.
								</p>
								<div className="flex gap-2">
									{socialLinks.map((link) => (
										<Button key={link.title} size="icon" variant="outline" className="size-9 rounded-none border-white/10 bg-white/5 text-white hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all">
											<link.icon className="size-4" />
										</Button>
									))}
								</div>
							</AnimatedContainer>

							<div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-8">
                                {footerLinkGroups.map((group, index) => (
                                    <AnimatedContainer
                                        key={group.label}
                                        delay={0.1 + index * 0.1}
                                        className="w-full"
                                    >
                                        <div className="mb-10 md:mb-0">
                                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-6">{group.label}</h3>
                                            <ul className="text-slate-400 space-y-4 text-sm font-medium">
                                                {group.links.map((link) => (
                                                    <li key={link.title}>
                                                        <a
                                                            href={link.href}
                                                            className="hover:text-blue-400 inline-flex items-center transition-all duration-300"
                                                        >
                                                            {link.title}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </AnimatedContainer>
                                ))}
                            </div>
						</div>

						<div className="relative z-10 text-slate-500 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-12 text-xs md:flex-row mb-12">
							<p>© 2026 FactWise Technologies. All rights reserved.</p>
							<div className="flex gap-8 font-medium">
                                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                                <a href="#" className="hover:text-white transition-colors">Security</a>
                            </div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

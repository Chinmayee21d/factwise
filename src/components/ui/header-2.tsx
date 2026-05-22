'use client';
import React, { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { ShimmerButton } from '@/components/ui/ShimmerButton';
import { MagicButton } from '@/components/ui/MagicButton';
import { useScroll } from '@/components/ui/use-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Header({ theme: propTheme = 'dark' }: { theme?: 'light' | 'dark' }) {
	const pathname = usePathname();
	// Pages with white/light backgrounds need dark nav text from the start
	const LIGHT_PAGES = ['/about', '/blog', '/pricing', '/platform', '/demo', '/enterprise'];
	const isLightPage = LIGHT_PAGES.some(p => pathname === p || pathname.startsWith(p + '/'));
	const theme = isLightPage ? 'light' : propTheme;
	const [open, setOpen] = React.useState(false);
	const [mounted, setMounted] = React.useState(false);
	const scrolled = useScroll(20);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	const links = [
		{
			label: 'Product',
			href: '/platform',
			subLinks: [
				{ label: 'Inquiry to Quote', href: '/solutions' },
				{ label: 'Requisitions to PO', href: '/requisitions-to-po' },
				{ label: 'Invoice to Pay', href: '/invoice-to-pay' },
			]
		},
		{
			label: 'Pricing',
			href: '/pricing',
		},
		{
			label: 'Blog',
			href: '/blog',
		},
		{
			label: 'About Us',
			href: '/about',
		},
		{
			label: 'Careers',
			href: '/careers',
		},
		{
			label: 'Enterprise',
			href: '/enterprise',
		},
	];

	React.useEffect(() => {
		if (open) {
			// Disable scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Re-enable scroll
			document.body.style.overflow = '';
		}

		// Cleanup when component unmounts (important for Next.js)
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-in-out mx-auto w-full',
				{
					'opacity-0': !mounted,
					'opacity-100': mounted,
					// Initial: Transparent, full width, no border
					'top-0 bg-transparent py-4 md:max-w-[1800px] border border-transparent': !scrolled && !open,
					// Scrolled: White Floating Pill with subtle border
					'top-4 md:top-6 rounded-2xl md:max-w-7xl border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] bg-white/95 backdrop-blur-xl py-1': scrolled && !open,
					// Mobile Open state
					'top-0 w-full h-full bg-white border-transparent': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-6 md:px-12 lg:px-20 transition-all duration-500',
					{
						'md:px-8': scrolled,
					},
				)}
			>
				<a href="/" className="flex items-center gap-3 cursor-pointer">
					<img
						src={(scrolled || open || !mounted || theme === 'light') ? "/logo.png" : "/logowhite.png"}
						alt="FactWise Logo"
						className="h-8 w-auto transition-all duration-500 rounded-tl-sm rounded-br-sm"
					/>
					<span className={cn("text-[17px] font-bold tracking-tight transition-colors duration-500", {
						"text-white": !scrolled && !open && mounted && theme === 'dark',
						"text-black": scrolled || open || !mounted || theme === 'light',
					})}>FactWise</span>
				</a>

				<div className="hidden items-center gap-1 md:flex">
					{links.map((link, i) => (
						<div key={i} className="relative group">
							{link.subLinks ? (
								<button
									className={buttonVariants({
										variant: 'ghost',
										className: cn('transition-colors duration-500 flex items-center gap-1.5 text-[14px] font-medium cursor-pointer', {
											'text-white/80 hover:text-white hover:bg-white/10': !scrolled && !open && theme === 'dark',
											'text-black/60 hover:text-black hover:bg-black/5': scrolled || open || theme === 'light',
										})
									})}
									type="button"
								>
									{link.label}
									<ChevronDown size={14} className="group-hover:rotate-180 transition-transform opacity-50" />
								</button>
							) : (
								<a
									className={buttonVariants({
										variant: 'ghost',
										className: cn('transition-colors duration-500 flex items-center gap-1.5 text-[14px] font-medium', {
											'text-white/80 hover:text-white hover:bg-white/10': !scrolled && !open && theme === 'dark',
											'text-black/60 hover:text-black hover:bg-black/5': scrolled || open || theme === 'light',
										})
									})}
									href={link.href}
								>
									{link.label}
								</a>
							)}

							{(link as any).subLinks && (
								<div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
									<div className="w-64 bg-white border border-black/[0.08] rounded-2xl p-2 shadow-xl backdrop-blur-xl">
										{(link as any).subLinks.map((sub: any, j: number) => (
											<a
												key={j}
												href={sub.href}
												className="block px-4 py-3 rounded-xl hover:bg-black/[0.04] text-sm text-black/60 hover:text-black transition-colors"
											>
												{sub.label}
											</a>
										))}
									</div>
								</div>
							)}
						</div>
					))}
					<div className={cn("w-px h-4 mx-4 transition-colors duration-500", {
						"bg-white/20": !scrolled && !open && theme === 'dark',
						"bg-black/10": scrolled || open || theme === 'light',
					})} />
					<Button
						variant="ghost"
						className={cn("text-[14px] font-medium transition-colors duration-500", {
							"text-white/80 hover:text-white": !scrolled && !open && theme === 'dark',
							"text-black/60 hover:text-black": scrolled || open || theme === 'light',
						})}
					>
						Login
					</Button>
					<MagicButton
						label1="Request Demo"
						label2="Join Us"
						className="scale-[0.85] origin-right ml-2"
						onClick={() => window.location.href = '/demo'}
					/>
				</div>
				<Button size="icon" variant="ghost" onClick={() => setOpen(!open)} className={cn("md:hidden transition-colors duration-500", {
					"text-white hover:bg-white/10": !scrolled && !open && theme === 'dark',
					"text-black hover:bg-black/5": scrolled || open || theme === 'light',
				})}>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>
 
			{/* Mobile Menu */}
			<div
				className={cn(
					'fixed top-16 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden bg-[#f6f9fc]/98 backdrop-blur-xl border-t border-black/[0.08] md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'flex h-full w-full flex-col justify-between gap-y-2 p-6',
					)}
				>
					<div className="grid gap-y-4">
						{links.map((link) => (
							<div key={link.label} className="flex flex-col gap-2">
								{link.subLinks ? (
									<div className="text-2xl font-medium text-[#808080] flex items-center gap-2 py-1 select-none">
										{link.label}
									</div>
								) : (
									<a
										className="text-2xl font-medium text-[#808080] hover:text-[#000000] transition-colors"
										href={link.href}
										onClick={() => setOpen(false)}
									>
										{link.label}
									</a>
								)}
								{(link as any).subLinks && (
									<div className="flex flex-col gap-2 ml-4 mb-4">
										{(link as any).subLinks.map((sub: any) => (
											<a
												key={sub.label}
												href={sub.href}
												className="text-lg text-[#808080] hover:text-[#000000] transition-colors"
												onClick={() => setOpen(false)}
											>
												{sub.label}
											</a>
										))}
									</div>
								)}
							</div>
						))}
					</div>
					<div className="flex flex-col gap-4 pt-10 border-t border-black/[0.07]">
						<Button variant="outline" className="w-full h-12 text-lg border-black/[0.1] hover:bg-black/[0.04]">
							Login
						</Button>
						<MagicButton
							label1="Request Demo"
							label2="Starting Now..."
							className="w-full"
						/>
					</div>
				</div>
			</div>
		</header>
	);
}

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

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{
			label: 'Platform',
			href: '/platform',
			subLinks: [
				{ label: 'Strategic Sourcing', href: '/platform/sourcing' },
				{ label: 'Purchase Orders', href: '/platform/purchase-orders' },
				{ label: 'Pricing Intelligence', href: '/platform/pricing-intelligence' },
			]
		},
		{
			label: 'Pricing',
			href: '/pricing',
		},
		{
			label: 'About Us',
			href: '/about',
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
				'fixed top-0 left-0 right-0 z-50 mx-auto w-full transition-all duration-500 border-b border-black/[0.07] bg-[#ffffff]/80 backdrop-blur-xl md:max-w-[1800px]',
				{
					'md:top-6 md:rounded-2xl md:max-w-7xl md:border md:border-black/[0.08] md:shadow-[0_8px_32px_rgba(0,0,0,0.06)] bg-[#ffffff]/90':
						scrolled && !open,
					'bg-[#ffffff]/98 border-black/[0.08]': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-16 w-full items-center justify-between px-6 md:px-12 lg:px-20 md:h-14 md:transition-all md:ease-out',
					{
						'md:px-4': scrolled,
					},
				)}
			>
				<div className="flex items-center gap-2.5">
					<img
						src="/logo.png"
						alt="FactWise Logo"
						className="h-8 w-auto"
					/>
					<span className="text-[17px] font-semibold tracking-[-0.02em] text-[#000000]">FactWise</span>
				</div>

				<div className="hidden items-center gap-2 md:flex">
					{links.map((link, i) => (
						<div key={i} className="relative group">
							<a
								className={buttonVariants({ variant: 'ghost', className: 'text-[#808080] hover:text-[#000000] flex items-center gap-1.5' })}
								href={link.href}
							>
								{link.label}
								{(link as any).subLinks && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
							</a>

							{(link as any).subLinks && (
								<div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
									<div className="w-64 bg-white border border-black/[0.08] rounded-2xl p-2 shadow-lg backdrop-blur-xl">
										{(link as any).subLinks.map((sub: any, j: number) => (
											<a
												key={j}
												href={sub.href}
												className="block px-4 py-3 rounded-xl hover:bg-black/[0.04] text-sm text-[#808080] hover:text-[#000000] transition-colors"
											>
												{sub.label}
											</a>
										))}
									</div>
								</div>
							)}
						</div>
					))}
					<Button variant="ghost" className="text-[#808080] hover:text-[#000000] ml-2">Login</Button>
					<MagicButton
						label1="Request Demo"
						label2="Join Us"
						className="scale-[0.85] origin-right"
						onClick={() => window.location.href = '/demo'}
					/>
				</div>
				<Button size="icon" variant="ghost" onClick={() => setOpen(!open)} className="md:hidden text-[#000000] hover:bg-black/[0.06]">
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
								<a
									className="text-2xl font-medium text-[#808080] hover:text-[#000000] transition-colors"
									href={link.href}
									onClick={() => setOpen(false)}
								>
									{link.label}
								</a>
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

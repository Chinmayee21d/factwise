'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { ShimmerButton } from '@/components/ui/ShimmerButton';
import { MagicButton } from '@/components/ui/MagicButton';
import { useScroll } from '@/components/ui/use-scroll';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{
			label: 'Product',
			href: '/#product',
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
			href: '#enterprise',
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
				'fixed top-0 left-0 right-0 z-50 mx-auto w-full transition-all duration-500 border-b border-white/[0.05] bg-[#0a0a0c]/40 backdrop-blur-xl md:max-w-[1400px]',
				{
					'md:top-6 md:rounded-2xl md:max-w-5xl md:border md:border-white/10 md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] bg-[#0a0a0c]/60':
						scrolled && !open,
					'bg-[#0a0a0c]/95 border-white/10': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-16 w-full items-center justify-between px-6 md:h-14 md:transition-all md:ease-out',
					{
						'md:px-4': scrolled,
					},
				)}
			>
				<div className="flex items-center gap-2">
           <div className="h-[18px] w-[3px] rounded-sm bg-[#f4f4f5]" />
           <span className="text-[17px] font-semibold tracking-[-0.02em] text-[#f4f4f5]">
             factwise
           </span>
        </div>

				<div className="hidden items-center gap-2 md:flex">
					{links.map((link, i) => (
						<a 
              key={i} 
              className={buttonVariants({ variant: 'ghost', className: 'text-gray-400 hover:text-white' })} 
              href={link.href}
            >
							{link.label}
						</a>
					))}
					<Button variant="ghost" className="text-gray-400 hover:text-white ml-2">Login</Button>
					<MagicButton 
            label1="Request Demo" 
            label2="Join Us" 
            className="scale-[0.85] origin-right" 
          />
				</div>
				<Button size="icon" variant="ghost" onClick={() => setOpen(!open)} className="md:hidden text-white hover:bg-white/10">
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			{/* Mobile Menu */}
			<div
				className={cn(
					'fixed top-16 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/10 md:hidden',
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
							<a
								key={link.label}
								className="text-2xl font-medium text-gray-400 hover:text-white transition-colors"
								href={link.href}
								onClick={() => setOpen(false)}
							>
								{link.label}
							</a>
						))}
					</div>
					<div className="flex flex-col gap-4 pt-10 border-t border-white/5">
						<Button variant="outline" className="w-full h-12 text-lg border-white/10 hover:bg-white/5">
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

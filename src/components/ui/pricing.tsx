'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { CheckCircleIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { motion, Transition } from 'framer-motion';

type FREQUENCY = 'monthly' | 'yearly';
const frequencies: FREQUENCY[] = ['monthly', 'yearly'];

interface Plan {
	name: string;
	info: string;
	price: {
		monthly: number;
		yearly: number;
	};
	features: {
		text: string;
		tooltip?: string;
	}[];
	btn: {
		text: string;
		href: string;
	};
	highlighted?: boolean;
}

interface PricingSectionProps extends React.ComponentProps<'div'> {
	plans: Plan[];
	heading: string;
	description?: string;
}

export function PricingSection({
	plans,
	heading,
	description,
	...props
}: PricingSectionProps) {
	const [frequency, setFrequency] = React.useState<'monthly' | 'yearly'>(
		'monthly',
	);

	return (
		<div
			className={cn(
				'flex w-full flex-col items-center justify-center space-y-8 p-4',
				props.className,
			)}
			{...props}
		>
			<div className="mx-auto max-w-2xl space-y-3">
				<h2 className="text-center text-4xl font-light tracking-tight md:text-5xl lg:text-6xl text-white">
					{heading}
				</h2>
				{description && (
					<p className="text-white/40 text-center text-sm md:text-lg font-light">
						{description}
					</p>
				)}
			</div>
			<PricingFrequencyToggle
				frequency={frequency}
				setFrequency={setFrequency}
			/>
			<div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
				{plans.map((plan) => (
					<PricingCard plan={plan} key={plan.name} frequency={frequency} />
				))}
			</div>
		</div>
	);
}

type PricingFrequencyToggleProps = React.ComponentProps<'div'> & {
	frequency: FREQUENCY;
	setFrequency: React.Dispatch<React.SetStateAction<FREQUENCY>>;
};

export function PricingFrequencyToggle({
	frequency,
	setFrequency,
	...props
}: PricingFrequencyToggleProps) {
	return (
		<div
			className={cn(
				'bg-white/[0.03] mx-auto flex w-fit rounded-full border border-white/10 p-1 backdrop-blur-md',
				props.className,
			)}
			{...props}
		>
			{frequencies.map((freq) => (
				<button
					key={freq}
					onClick={() => setFrequency(freq)}
					className="relative px-6 py-1.5 text-sm capitalize transition-colors duration-300 rounded-full"
					style={{ color: frequency === freq ? '#fff' : 'rgba(255,255,255,0.4)' }}
				>
					<span className="relative z-10">{freq}</span>
					{frequency === freq && (
						<motion.span
							layoutId="frequency"
							transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
							className="absolute inset-0 z-0 rounded-full bg-[#7c5cfc]"
						/>
					)}
				</button>
			))}
		</div>
	);
}

type PricingCardProps = React.ComponentProps<'div'> & {
	plan: Plan;
	frequency?: FREQUENCY;
};

export function PricingCard({
	plan,
	className,
	frequency = frequencies[0],
	...props
}: PricingCardProps) {
	return (
		<div
			key={plan.name}
			className={cn(
				'relative flex w-full flex-col rounded-[32px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl p-8 transition-all duration-500 hover:border-[#7c5cfc]/30 hover:bg-white/[0.03]',
				plan.highlighted && 'border-[#7c5cfc]/20 bg-white/[0.03]',
				className,
			)}
			{...props}
		>
			{plan.highlighted && (
				<BorderTrail
					style={{
						boxShadow:
							'0px 0px 40px 10px rgba(124, 92, 252, 0.5)',
					}}
					size={100}
				/>
			)}
			<div
				className={cn(
					'mb-8',
				)}
			>
				<div className="absolute top-6 right-6 z-10 flex items-center gap-2">
					{plan.highlighted && (
						<p className="bg-[#7c5cfc]/10 text-[#7c5cfc] flex items-center gap-1 rounded-full border border-[#7c5cfc]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
							Popular
						</p>
					)}
					{frequency === 'yearly' && (
						<p className="bg-emerald-500/10 text-emerald-500 flex items-center gap-1 rounded-full border border-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
							{Math.round(
								((plan.price.monthly * 12 - plan.price.yearly) /
									plan.price.monthly /
									12) *
									100,
							)}
							% off
						</p>
					)}
				</div>

				<div className="text-xl font-medium text-white mb-2">{plan.name}</div>
				<p className="text-white/40 text-sm font-light">{plan.info}</p>
				<div className="mt-6 flex items-end gap-1">
					<span className="text-5xl font-light text-white tracking-tight">${plan.price[frequency]}</span>
					<span className="text-white/30 text-sm mb-1">
						{plan.name !== 'Free'
							? '/' + (frequency === 'monthly' ? 'mo' : 'yr')
							: ''}
					</span>
				</div>
			</div>
			<div
				className={cn(
					'space-y-4 mb-10',
				)}
			>
				{plan.features.map((feature, index) => (
					<div key={index} className="flex items-center gap-3">
						<CheckCircleIcon className="text-[#7c5cfc] h-4 w-4" />
						<TooltipProvider>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<p
										className={cn(
											"text-white/40 text-sm font-light",
											feature.tooltip &&
												'cursor-pointer border-b border-dashed border-white/10 hover:text-white transition-colors',
										)}
									>
										{feature.text}
									</p>
								</TooltipTrigger>
								{feature.tooltip && (
									<TooltipContent className="bg-[#111116] border-white/10 text-white">
										<p>{feature.tooltip}</p>
									</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>
				))}
			</div>
			<div
				className={cn(
					'mt-auto w-full',
				)}
			>
				<Button
					className={cn(
						"w-full h-12 rounded-2xl text-[15px] font-medium transition-all duration-300",
						plan.highlighted 
							? "bg-[#7c5cfc] hover:bg-[#6548d9] text-white shadow-[0_0_20px_rgba(124,92,252,0.3)]" 
							: "bg-white/5 hover:bg-white/10 border-white/10 text-white"
					)}
					asChild
				>
					<Link href={plan.btn.href}>{plan.btn.text}</Link>
				</Button>
			</div>
		</div>
	);
}


type BorderTrailProps = {
  className?: string;
  size?: number;
  transition?: Transition;
  delay?: number;
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
};

export function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  onAnimationComplete,
  style,
}: BorderTrailProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: 5,
    ease: 'linear',
  } as const;

  return (
    <div className='pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]'>
      <motion.div
        className={cn('absolute aspect-square bg-zinc-500', className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ['0%', '100%'],
        }}
        transition={{
          ...(transition ?? BASE_TRANSITION),
          delay: delay,
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}

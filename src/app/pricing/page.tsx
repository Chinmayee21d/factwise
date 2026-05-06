'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Header } from '@/components/ui/header-2';
import { PricingSection } from '@/components/ui/pricing';
import CTASection from '@/components/CTASection';
import { FlickeringFooter } from '@/components/ui/flickering-footer';

/* ── Antigravity Visual Elements ────────────── */

function AntigravityGrid({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
	const gridX = useTransform(mouseX, [0, 1920], [15, -15]);
	const gridY = useTransform(mouseY, [0, 1080], [15, -15]);
	return (
		<motion.div style={{ x: gridX, y: gridY }} className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]">
			<svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
				{[...Array(15)].map((_, i) => (
					<path
						key={i}
						d={`M 0 ${50 + i * 50} C 400 ${70 + i * 45} 1000 ${30 + i * 55} 1440 ${50 + i * 50}`}
						stroke="#3666ff"
						strokeWidth="0.5"
						strokeOpacity="0.5"
					/>
				))}
			</svg>
		</motion.div>
	);
}

function AmbientParticles() {
	return (
		<div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
			{[...Array(20)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-1 h-1 rounded-full bg-black/10"
					initial={{
						x: Math.random() * 100 + "%",
						y: "110%",
						opacity: 0,
						scale: Math.random() * 0.5 + 0.5
					}}
					animate={{
						y: "-10%",
						opacity: [0, 1, 0],
						x: (Math.random() * 100 - 50) + "%"
					}}
					transition={{
						duration: Math.random() * 10 + 10,
						repeat: Infinity,
						delay: Math.random() * 20,
						ease: "linear"
					}}
				/>
			))}
		</div>
	);
}

/* ── Plans Data ──────────────────────────────── */
const PLANS = [
	{
		id: 'basic',
		name: 'Starter',
		info: 'Perfect for small teams getting organized.',
		price: {
			monthly: 49,
			yearly: 39,
		},
		features: [
			{ text: 'Up to 5 Users' },
			{ text: 'Basic Spend Analytics' },
			{ text: 'Supplier Directory (100)' },
			{
				text: 'Standard Support',
				tooltip: 'Email support with 24h response time',
			},
			{
				text: 'ERP Integration (1)',
				tooltip: 'Connect one ERP or accounting system',
			},
		],
		btn: {
			text: 'Start Free Trial',
			href: '#',
		},
	},
	{
		highlighted: true,
		id: 'pro',
		name: 'Enterprise',
		info: 'Full power for growing organizations.',
		price: {
			monthly: 199,
			yearly: 159,
		},
		features: [
			{ text: 'Unlimited Users' },
			{ text: 'Advanced AI Insights' },
			{ text: 'Global Supplier Portal' },
			{
				text: 'Custom Workflows',
				tooltip: 'Unlimited multi-tier approval rules',
			},
			{ text: 'Unlimited ERP Sync' },
			{ text: 'Priority Support', tooltip: '24/7 Priority Chat & Phone' },
			{
				text: 'Predictive Savings',
				tooltip: 'AI-powered market benchmark analysis',
			},
		],
		btn: {
			text: 'Get started',
			href: '#',
		},
	},
	{
		name: 'Custom',
		info: 'Tailored for large global enterprises.',
		price: {
			monthly: 899,
			yearly: 749,
		},
		features: [
			{ text: 'Bespoke AI Training' },
			{ text: 'Dedicated Account Manager' },
			{ text: 'White-label Portal' },
			{ text: 'On-premise Options' },
			{
				text: 'SLA Guarantee',
				tooltip: '99.99% uptime and performance SLA',
			},
			{ text: 'Strategic Sourcing' },
			{
				text: 'SSO & Advanced Security',
				tooltip: 'SAML, OKTA, and custom security layers',
			},
		],
		btn: {
			text: 'Contact team',
			href: '#',
		},
	},
];

import { PricingComparison } from '@/components/ui/pricing-comparison';

export default function PricingPage() {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [mouseX, mouseY]);

	return (
		<main className="min-h-screen bg-[#f6f9fc] selection:bg-[#3666ff]/20 selection:text-[#000000] overflow-x-hidden">
			<Header />

			{/* ── Environment ────────────────────────────── */}
			<div className="fixed inset-0 z-0">
				<AntigravityGrid mouseX={mouseX} mouseY={mouseY} />
				<AmbientParticles />
			</div>

			{/* ── Content ────────────────────────────────── */}
			<div className="relative z-10 pt-32">
				<PricingSection
					plans={PLANS}
					heading="Plans that scale with you."
					description="Whether you're just starting out or growing fast, our flexible pricing has you covered — with no hidden costs."
				/>

				<PricingComparison />

				<div className="w-full h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent my-10" />

				<FlickeringFooter />
			</div>

			<style jsx global>{`
        .bg-radial-gradient {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 65%);
        }
      `}</style>
		</main>
	);
}

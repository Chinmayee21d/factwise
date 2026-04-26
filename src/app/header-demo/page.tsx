import React from 'react';
import { Header } from "@/components/ui/header-2";

export default function HeaderDemo() {
	return (
		<div className="w-full bg-[#0a0a0c] text-white">
			<Header />

			<main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-32">
				<div  className="space-y-4 mb-8">
					<div className="bg-white/5 h-12 w-4/6 rounded-xl border border-white/10" />
					<div className="bg-white/5 h-12 w-1/2 rounded-xl border border-white/10" />
				</div>
				<div  className="flex gap-4 mb-12">
					<div className="bg-white/5 h-6 w-24 rounded-full border border-white/10" />
					<div className="bg-white/5 h-6 w-20 rounded-full border border-white/10" />
				</div>

				{Array.from({ length: 7 }).map((_, i) => (
					<div key={i} className="space-y-4 mb-12">
						<div className="bg-white/5 h-6 w-full rounded-lg border border-white/10" />
						<div className="bg-white/5 h-6 w-full rounded-lg border border-white/10" />
						<div className="bg-white/5 h-6 w-full rounded-lg border border-white/10" />
						<div className="bg-white/5 h-6 w-1/2 rounded-lg border border-white/10" />
					</div>
				))}
			</main>
		</div>
	);
}

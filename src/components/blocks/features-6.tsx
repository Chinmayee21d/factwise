import { Cpu, Lock, Sparkles, Zap } from 'lucide-react'

export function FactWiseEcosystem() {
    return (
        <section className="py-16 md:py-32 bg-[#0a0a0c] text-white overflow-hidden">
            <div className="mx-auto max-w-[1400px] space-y-12 px-10">
                <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
                      The FactWise ecosystem <br/> 
                      <span style={{ color: '#6b6b7a' }}>unifies your supply chain</span>
                    </h2>
                    <p className="max-w-sm sm:ml-auto text-[#6b6b7a] leading-relaxed">
                      Empower your procurement team with automated workflows that manage everything from initial requisition to final payment in a single, unified source of truth.
                    </p>
                </div>
                
                {/* Central Visual */}
                <div className="relative rounded-3xl p-3 md:-mx-8 bg-gradient-to-b from-white/5 to-transparent border border-white/5 shadow-2xl overflow-hidden group">
                    <div className="aspect-[88/36] relative rounded-2xl overflow-hidden border border-white/10">
                        {/* Overlay Glows */}
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#7c5cfc]/10 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#34d399]/10 rounded-full blur-[120px] pointer-events-none" />
                        
                        <div className="bg-gradient-to-t z-10 from-[#0a0a0c] absolute inset-0 to-transparent"></div>
                        
                        <img 
                          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000" 
                          className="absolute inset-0 z-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
                          alt="Warehouse and Logistics Ecosystem" 
                        />
                        
                        {/* Interactive UI Overlay (Mockup style) */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
                           <div className="w-full h-full border border-white/10 rounded-xl bg-black/40 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center">
                              <Sparkles className="size-12 text-[#7c5cfc] mb-4 animate-pulse" />
                              <h3 className="text-2xl font-light mb-2">Autonomous Sourcing Engine</h3>
                              <p className="text-[#6b6b7a] max-w-md">FactWise AI automatically scouts, invites, and scores vendors based on your historical performance data and risk profiles.</p>
                           </div>
                        </div>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <div className="space-y-3 p-4 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4 text-[#7c5cfc]" />
                            <h3 className="text-sm font-medium">Agile Sourcing</h3>
                        </div>
                        <p className="text-[#6b6b7a] text-sm">Reduce sourcing cycle times by 50% with automated RFQ events and real-time vendor collaboration.</p>
                    </div>
                    <div className="space-y-2 p-4 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4 text-[#34d399]" />
                            <h3 className="text-sm font-medium">Full Lifecycle</h3>
                        </div>
                        <p className="text-[#6b6b7a] text-sm">Seamlessly transition from requisition to purchase order, goods receipt, and final payment.</p>
                    </div>
                    <div className="space-y-2 p-4 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4 text-[#f59e0b]" />
                            <h3 className="text-sm font-medium">Enterprise Security</h3>
                        </div>
                        <p className="text-[#6b6b7a] text-sm">Bank-grade security with SOC2 compliance and granular role-based access for your entire global team.</p>
                    </div>
                    <div className="space-y-2 p-4 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4 text-[#7c5cfc]" />
                            <h3 className="text-sm font-medium">Procurement AI</h3>
                        </div>
                        <p className="text-[#6b6b7a] text-sm">AI-driven bid scoring and risk assessment helps you award the best deal every single time.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

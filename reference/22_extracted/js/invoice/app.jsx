/* ══════════════════════════════════════════════════════════════════════
   APP — top header bar + chapter flow + closing footer.
══════════════════════════════════════════════════════════════════════ */

function InvHeader(){
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-[1440px] px-8 lg:px-14 h-[72px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-sub">
          <div className="size-7 rounded-md grid place-items-center"
               style={{ background:'linear-gradient(135deg,#4f8bff,#2a6cff)' }}>
            <div style={{ width:10, height:10, background:'white',
                          clipPath:'polygon(0 0,100% 0,100% 40%,40% 40%,40% 100%,0 100%)' }}/>
          </div>
          <span className="font-display font-bold text-[18px] tracking-tight">FactWise</span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-[13.5px] text-slate-600 font-medium">
          <a href="./Requisitions to PO.html" className="hover:text-brand transition-colors">Chapter 1–2 · Requisition → PO</a>
          <a href="#" className="text-brand font-semibold">Chapter 3 · Invoice → Payment</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:inline text-[13.5px] text-slate-600 hover:text-sub">Sign in</a>
          <a href="#" className="text-[13px] font-semibold text-white px-4 py-2 rounded-full bg-sub hover:bg-ink transition">
            Book a demo
          </a>
        </div>
      </div>
    </header>
  );
}

function InvFooter(){
  return (
    <footer className="bg-[#0d1117] text-white py-16">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-10 items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
              End of chapter 03
            </div>
            <h3 className="font-display text-[36px] md:text-[44px] font-semibold mt-4 tracking-[-0.025em] leading-[1.1]">
              Invoice raised at 09:42. <br/>
              <span className="text-emerald-400">Payment cleared at 16:14.</span>
            </h3>
            <p className="text-slate-400 text-[15px] leading-[1.6] mt-4 max-w-md">
              Two days. Five stages. Zero manual matching. Every line, every rupee — tracked.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-3">
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-white text-[13px] font-bold hover:bg-blue-600 transition">
              See it on your own POs <ArrowRight size={13}/>
            </a>
            <a href="./Requisitions to PO.html" className="inline-flex items-center gap-1.5 text-slate-400 text-[12.5px] hover:text-white transition">
              <ChevronLeft size={12}/> Back to Chapter 1–2 · Requisition → PO
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function InvApp(){
  return (
    <main className="min-h-screen bg-white">
      <InvHeader/>
      <InvToPayFlow/>
      <InvFooter/>
    </main>
  );
}

const invRoot = ReactDOM.createRoot(document.getElementById('root'));
invRoot.render(<InvApp/>);

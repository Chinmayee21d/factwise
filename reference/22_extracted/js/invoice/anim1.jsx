/* ══════════════════════════════════════════════════════════════════════
   PANEL 1 — AI-Powered Invoice Processing
   Story phases (5):
     1. PO sits at top · two channels visible (Portal + Upload)
     2. Cursor → Upload zone → click → paper invoice slides in
     3. AI scan + corner brackets on each paper field; structured form on
        the right fills with extracted values + confidence
     4. AI cross-checks vs PO — flags a qty mismatch (bubble pops)
     5. Posted to platform · "Invoice 2 of 2 supported" chip stacks
══════════════════════════════════════════════════════════════════════ */
const { motion: M1, AnimatePresence: AP1 } = window.framerMotion;

function Anim1InvoiceIntake({ phase }){
  /* ── Cursor choreography ─────────────────────────────────────────── */
  // Coordinates are % within the inner panel.
  const cursor = (
    phase===1 ? { x:14, y:28, click:false, label:'Drag · Drop' } :
    phase===2 ? { x:18, y:58, click:true,  label:'Drop invoice.pdf' } :
    phase===3 ? { x:45, y:48, click:false, label:'AI scanning…' } :
    phase===4 ? { x:78, y:62, click:true,  label:'Discrepancy flagged' } :
                { x:84, y:18, click:false, label:'Posted · 2 of 2' }
  );

  /* Extracted-field reveal helper. The reveal cascades by phase. */
  const revealed = (i)=> phase>=3 && (phase>3 || i < Math.min(6, Math.floor((Date.now()/200)%7))); // simple

  /* Field list — the extracted invoice */
  const fields = [
    {k:'Vendor',     v:'Apex Industrial Pvt. Ltd.',  conf:99},
    {k:'Invoice No', v:'INV-AX-9047',                conf:99},
    {k:'Date',       v:'12 May 2026',                conf:98},
    {k:'Against PO', v:'PO-7821',                    conf:97},
    {k:'GST · IGST', v:'18% · ₹14,580',              conf:96},
    {k:'Net Total',  v:'₹95,580',                    conf:99},
  ];

  return (
    <FwPanel
      icon={<Sparkles size={13}/>}
      title="Invoice Inbox"
      subtitle="Vendor portal · AI · Any format"
      right={
        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-[2px] rounded-full"
              style={{background:'rgba(54,102,255,0.08)', color:'#3666ff', border:'1px solid rgba(54,102,255,0.2)'}}>
          {phase>=4 ? 'AI · auto-verified' : 'AI · live'}
        </span>
      }>

      {/* ── PO reference strip (top) ─────────────────────────────── */}
      <div className="absolute left-3 right-3 top-3 px-3 py-2 rounded-xl flex items-center justify-between text-[10px]"
           style={{background:'#fbfcfe', border:'1px solid #eef2f7'}}>
        <div className="flex items-center gap-2">
          <FileText size={12} className="text-slate-400"/>
          <span className="font-mono font-bold text-slate-500">PO-7821</span>
          <span className="text-slate-300">·</span>
          <span className="font-semibold text-sub">Apex Industrial</span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500">Steel Bracket M8 · 400u · ₹240/u</span>
        </div>
        <div className="flex items-center gap-3 text-[8.5px] font-mono text-slate-400">
          <span>NET-45</span><span>DELIVERY 18 MAY</span>
          <span className="px-1.5 py-[1px] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded font-bold">REF</span>
        </div>
      </div>

      {/* ── 2-column stage ───────────────────────────────────────── */}
      <div className="absolute left-3 right-3 top-[58px] bottom-[68px] grid gap-3"
           style={{gridTemplateColumns:'1fr 1fr'}}>

        {/* LEFT — Channels & dropped invoice */}
        <div className="relative rounded-2xl bg-[#fbfcfe] border border-slate-100 p-3 overflow-hidden">
          <div className="text-[8.5px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400 mb-2">Source</div>

          {/* Vendor Portal channel */}
          <M1.div
            initial={false}
            animate={{ opacity: phase===1 ? 1 : 0.4, y:0 }}
            className="relative bg-white rounded-lg border border-slate-200 p-2 mb-2 flex items-center gap-2 shadow-sm">
            <div className="size-7 rounded-md grid place-items-center shrink-0 text-brand"
                 style={{background:'rgba(54,102,255,0.07)', border:'1px solid rgba(54,102,255,0.18)'}}>
              <Users size={13}/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-sub leading-tight">Create on FactWise</div>
              <div className="text-[8.5px] text-slate-400 leading-tight mt-0.5">Vendor portal · against PO</div>
            </div>
            <span className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400">A</span>
          </M1.div>

          {/* Upload zone */}
          <div className="relative rounded-lg p-3 transition-all"
               style={{
                 background: phase>=2 ? 'rgba(54,102,255,0.04)' : '#fff',
                 border: phase>=2 ? '2px dashed rgba(54,102,255,0.4)' : '1px dashed #cbd5e1',
                 minHeight: 56,
               }}>
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-md grid place-items-center shrink-0 text-brand"
                   style={{background:'rgba(54,102,255,0.07)', border:'1px solid rgba(54,102,255,0.18)'}}>
                <Upload size={13}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-sub leading-tight">Upload any format</div>
                <div className="text-[8.5px] text-slate-400 leading-tight mt-0.5">
                  {phase===1 && 'PDF · PNG · JPG · scan · email'}
                  {phase>=2  && 'invoice-apex-9047.pdf · 412 KB'}
                </div>
              </div>
              <span className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400">B</span>
            </div>
          </div>

          {/* The dropped paper invoice — flies in on phase 2 */}
          <AP1>
            {phase>=2 && (
              <M1.div
                key="paper"
                initial={{ opacity:0, y:-30, rotate:-6, scale:0.9 }}
                animate={{ opacity:1, y:0,  rotate:-2, scale:1 }}
                exit={{ opacity:0, scale:0.9 }}
                transition={{ type:'spring', stiffness:140, damping:18 }}
                className="absolute left-3 right-3 bottom-3 rounded-md bg-white shadow-lg overflow-hidden"
                style={{
                  height:178,
                  border:'1px solid #e2e8f0',
                  transformOrigin:'top center',
                }}>
                {/* Paper texture top bar */}
                <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between bg-[#fdfdfb]">
                  <span className="text-[9px] font-mono font-bold text-slate-700 tracking-wide">APEX INDUSTRIAL PVT. LTD.</span>
                  <span className="text-[8px] font-mono text-slate-400">TAX INVOICE</span>
                </div>

                {/* Paper body */}
                <div className="p-2.5 text-[8.5px] text-slate-700 leading-relaxed relative" style={{fontFamily:"'JetBrains Mono', monospace"}}>
                  <div className="flex justify-between mb-1">
                    <FwBracket on={phase>=3} color="#3666ff">
                      <span>Inv No: <span className="font-bold">INV-AX-9047</span></span>
                    </FwBracket>
                    <FwBracket on={phase>=3} color="#3666ff">
                      <span>Date: 12-MAY-26</span>
                    </FwBracket>
                  </div>
                  <div className="mb-1">
                    <FwBracket on={phase>=3} color="#3666ff">
                      <span>Ref PO: PO-7821</span>
                    </FwBracket>
                  </div>
                  <div className="border-t border-dashed border-slate-200 my-1.5"/>
                  <div className="grid grid-cols-3 gap-1 text-[7.5px] uppercase text-slate-400 font-bold tracking-wider mb-0.5">
                    <span>Item</span><span>Qty</span><span>Amount</span>
                  </div>
                  <FwBracket on={phase>=3} color="#3666ff" style={{display:'block'}}>
                    <div className="grid grid-cols-3 gap-1">
                      <span>Steel Bracket M8</span>
                      <span className="font-bold">380</span>
                      <span className="font-bold">₹91,200</span>
                    </div>
                  </FwBracket>
                  <div className="grid grid-cols-3 gap-1 text-slate-400 mt-0.5">
                    <span>GST 18%</span><span/><span>₹4,380</span>
                  </div>
                  <div className="border-t border-slate-200 my-1.5"/>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-500">NET TOTAL</span>
                    <FwBracket on={phase>=3} color="#3666ff">
                      <span className="font-bold text-slate-700 text-[10px]">₹95,580</span>
                    </FwBracket>
                  </div>

                  {/* Scan line over the paper */}
                  <FwScanLine on={phase===3} direction="down" color="#3666ff"/>
                </div>
              </M1.div>
            )}
          </AP1>
        </div>

        {/* RIGHT — Structured invoice on FactWise */}
        <div className="relative rounded-2xl bg-white border border-slate-100 p-3 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[8.5px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400">On FactWise</span>
            <span className="text-[8.5px] font-mono font-bold flex items-center gap-1"
                  style={{color: phase>=4 ? '#10b981' : phase>=3 ? '#3666ff' : '#94a3b8'}}>
              <span className="size-1 rounded-full" style={{background:'currentColor', animation: phase>=3 ? 'fw-pulse 1.2s infinite' : ''}}/>
              {phase>=4 ? 'verified' : phase>=3 ? 'parsing' : 'awaiting'}
            </span>
          </div>

          {/* Invoice card */}
          <div className="rounded-lg border border-slate-200/70 bg-[#fbfcfe] p-2.5 flex-1 relative overflow-hidden">
            {/* card header */}
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
              <span className="text-[10px] font-bold text-sub">Invoice draft</span>
              <span className="text-[7.5px] font-mono font-bold uppercase tracking-wider px-1.5 py-[1px] rounded"
                    style={{background: phase>=4 ? 'rgba(16,185,129,0.1)' : 'rgba(54,102,255,0.1)',
                            color: phase>=4 ? '#059669' : '#3666ff'}}>
                {phase>=4 ? 'matched · 1 flag' : phase>=3 ? 'extracting' : 'empty'}
              </span>
            </div>

            {/* Extracted fields list */}
            <div className="space-y-1">
              {fields.map((f,i)=>{
                const reveal = phase>=3;
                const delay  = 0.05 + i*0.08;
                // flag the qty/total mismatch — Net Total row gets the red flag
                const isFlag = phase>=4 && f.k==='Net Total';
                return (
                  <M1.div
                    key={f.k}
                    initial={{ opacity:0, x:6 }}
                    animate={{ opacity: reveal?1:0, x: reveal?0:6 }}
                    transition={{ delay, duration:0.3 }}
                    className="flex items-center justify-between text-[9.5px] py-1 px-1.5 rounded"
                    style={{background: isFlag ? 'rgba(239,68,68,0.06)' : 'transparent',
                            border: isFlag ? '1px solid rgba(239,68,68,0.25)' : '1px solid transparent'}}>
                    <span className="text-slate-500 font-medium">{f.k}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-sub">{f.v}</span>
                      {/* confidence pill */}
                      <span className="text-[7.5px] font-mono font-bold px-1 rounded"
                            style={{background:'rgba(54,102,255,0.08)', color:'#3666ff'}}>
                        {f.conf}%
                      </span>
                    </div>
                  </M1.div>
                );
              })}
            </div>

            {/* Cross-check footer */}
            <M1.div
              initial={false}
              animate={{ opacity: phase>=4 ? 1 : 0, y: phase>=4 ? 0 : 6 }}
              className="mt-2 pt-2 border-t border-slate-100">
              <div className="text-[7.5px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                AI 3-way check
              </div>
              <div className="space-y-1">
                {[
                  {l:'Vendor matches PO',      ok:true},
                  {l:'GST · format valid',     ok:true},
                  {l:'Qty: PO 400 · INV 380',  ok:false, note:'short 20u'},
                ].map((c,i)=>(
                  <div key={c.l} className="flex items-center justify-between text-[9px]">
                    <span className="flex items-center gap-1.5">
                      {c.ok ? (
                        <span className="size-3 rounded-full grid place-items-center bg-emerald-500 text-white">
                          <Check size={7} sw={4}/>
                        </span>
                      ) : (
                        <span className="size-3 rounded-full grid place-items-center bg-rose-500 text-white text-[8px] font-bold">!</span>
                      )}
                      <span className="text-slate-600">{c.l}</span>
                    </span>
                    {c.note && <span className="font-mono font-bold text-rose-600 text-[8.5px]">{c.note}</span>}
                  </div>
                ))}
              </div>
            </M1.div>

            {/* AI bubble on phase 4 */}
            <FwAiBubble show={phase===4} x={-30} y={84} w={180}>
              <span className="font-bold text-rose-600">Qty short by 20u</span> · auto-flagged before approval. Vendor notified.
            </FwAiBubble>
          </div>
        </div>
      </div>

      {/* ── Multi-invoice stack chip (phase 5) ──────────────────────── */}
      <AP1>
        {phase===5 && (
          <M1.div
            key="multi-stack"
            initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0}}
            className="absolute right-4 top-[70px] z-30">
            {/* stack of mini invoice cards */}
            <div className="relative">
              {[2,1,0].map(i=>(
                <div key={i}
                     className="absolute right-0 bg-white rounded-md border shadow-md"
                     style={{
                       width:120, height:44,
                       top:i*4, right:i*4,
                       borderColor:'rgba(54,102,255,0.25)',
                       zIndex:10-i,
                     }}>
                  {i===0 && (
                    <div className="p-1.5">
                      <div className="text-[8px] font-mono font-bold text-brand">INV-AX-9047 · #{i+1}</div>
                      <div className="text-[8px] text-slate-400 font-mono">Multiple invoices · 1 PO</div>
                      <div className="text-[8px] font-bold text-emerald-600 mt-0.5">✓ Posted</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </M1.div>
        )}
      </AP1>

      {/* The animated cursor */}
      <FwCursor x={cursor.x} y={cursor.y} click={cursor.click} label={cursor.label} labelDir="br"/>

      {/* Caption */}
      <FwCaption text={
        phase===1 ? 'Two channels for every invoice — vendors create directly on FactWise against any PO, or upload any file in any format.' :
        phase===2 ? 'Drop a paper invoice, a scan, a PDF — any format. FactWise picks it up the moment it lands.' :
        phase===3 ? 'AI reads, interprets and extracts every field — with confidence scores at the field level.' :
        phase===4 ? 'AI cross-checks against the PO automatically — discrepancies flagged before approval, not after payment.' :
                    'Multiple invoices per PO supported. Every invoice in, structured, verified — no manual re-entry.'
      }/>
    </FwPanel>
  );
}

Object.assign(window, { Anim1InvoiceIntake });

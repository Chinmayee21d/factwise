/* ══════════════════════════════════════════════════════════════════════
   PANEL 4 — Automate Payments · Pay Only What You Owe
   Story phases (5):
     1. Three Apex invoices listed · cursor hovers consolidate
     2. Cursor checks all · "Consolidate" pill appears with total
     3. Cursor clicks "Approve Payment" · 4 validation orbs spin to life
     4. PO · GR · QC · Contract — each turns green in sequence
     5. Credit applied for rejected qty · Net stamp · "5% recovered"
══════════════════════════════════════════════════════════════════════ */
const { motion: M4, AnimatePresence: AP4 } = window.framerMotion;

function Anim4PaymentValidate({ phase }){
  /* Cursor choreography */
  const cursor = (
    phase===1 ? { x:18, y:32, click:false, label:'Select invoices' } :
    phase===2 ? { x:22, y:62, click:true,  label:'Consolidate · 3' } :
    phase===3 ? { x:70, y:78, click:true,  label:'Approve payment' } :
    phase===4 ? { x:64, y:38, click:false, label:'4 checks running' } :
                { x:64, y:80, click:false, label:'₹1,11,360 paid' }
  );

  /* Invoices for one vendor */
  const invoices = [
    {id:'INV-AX-9047', amt:95580, sel: phase>=2},
    {id:'INV-AX-9051', amt:31200, sel: phase>=2},
    {id:'INV-AX-9056', amt:18420, sel: phase>=2},
  ];
  const total = invoices.reduce((a,b)=>a+b.amt, 0);
  const creditDeduction = 33840; // mock for rejected 20u  + short 100u
  const net = total - creditDeduction;

  /* 4 validation orbs — they orbit around a center hub */
  const orbs = [
    {l:'PO',       sub:'PO-7821',     icon:<FileText size={11}/>,  step:1, ang:-90},
    {l:'GR',       sub:'GR-9241',     icon:<Truck size={11}/>,     step:2, ang:0},
    {l:'QC',       sub:'480 / 500u',  icon:<Shield size={11}/>,    step:3, ang:90},
    {l:'Contract', sub:'NET-45 ✓',    icon:<Lock size={11}/>,      step:4, ang:180},
  ];

  return (
    <FwPanel
      icon={<DollarSign size={13}/>}
      title="Payment Approval"
      subtitle="Quadruple validation · auto"
      right={
        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-[2px] rounded-full"
              style={{background:'rgba(54,102,255,0.08)', color:'#3666ff', border:'1px solid rgba(54,102,255,0.2)'}}>
          Apex Industrial · vendor #VID-204
        </span>
      }>

      {/* 2-column stage */}
      <div className="absolute inset-3 bottom-[68px] grid gap-3" style={{gridTemplateColumns:'0.95fr 1.1fr'}}>

        {/* LEFT — invoices to consolidate */}
        <div className="relative rounded-2xl bg-[#fbfcfe] border border-slate-100 p-3 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[8.5px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400">Open invoices · Apex</span>
            <span className="text-[8.5px] font-mono font-bold"
                  style={{color: phase>=2 ? '#3666ff' : '#94a3b8'}}>
              {phase>=2 ? '3 selected' : '0 selected'}
            </span>
          </div>

          {/* Invoice rows */}
          <div className="space-y-1.5">
            {invoices.map((inv,i)=>(
              <M4.div
                key={inv.id}
                initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{delay:0.05+i*0.07}}
                className="bg-white rounded-lg border p-2 flex items-center gap-2"
                style={{
                  borderColor: inv.sel ? 'rgba(54,102,255,0.4)' : 'rgba(148,163,184,0.25)',
                  background:  inv.sel ? 'rgba(54,102,255,0.04)' : '#fff',
                  transition:'all .35s',
                }}>
                {/* Checkbox */}
                <M4.div
                  initial={false}
                  animate={{
                    background: inv.sel ? '#3666ff' : '#fff',
                    borderColor: inv.sel ? '#3666ff' : '#cbd5e1',
                  }}
                  className="size-4 rounded border-2 grid place-items-center shrink-0">
                  {inv.sel && <Check size={10} sw={4} className="text-white"/>}
                </M4.div>
                <FileText size={12} className="text-slate-400"/>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-sub font-mono">{inv.id}</div>
                  <div className="text-[8.5px] text-slate-400">PO-7821 · NET-45 due in {3+i*2}d</div>
                </div>
                <span className="font-mono text-[11px] font-bold text-sub">
                  ₹{(inv.amt).toLocaleString('en-IN')}
                </span>
              </M4.div>
            ))}
          </div>

          {/* Consolidation banner */}
          <AP4>
            {phase>=2 && (
              <M4.div
                key="consolidation-banner"
                initial={{opacity:0, y:8, scale:0.95}}
                animate={{opacity:1, y:0,  scale:1}}
                exit={{opacity:0, y:8}}
                transition={{type:'spring', stiffness:160, damping:20}}
                className="mt-3 rounded-xl p-2.5 relative overflow-hidden"
                style={{
                  background:'linear-gradient(135deg,#eef3ff,#fff)',
                  border:'1.5px solid rgba(54,102,255,0.35)',
                }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-widest text-brand">
                    <Split size={11}/> Consolidated · 3 → 1
                  </span>
                  <span className="text-[7.5px] font-mono text-slate-400">single transfer</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[7.5px] uppercase font-bold text-slate-400 tracking-wider">Gross</div>
                    <div className="font-mono text-[15px] font-bold text-sub">₹{total.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[7.5px] uppercase font-bold text-slate-400 tracking-wider">Items</div>
                    <div className="font-mono text-[12px] font-bold text-sub">3 inv · 1 PO</div>
                  </div>
                </div>
              </M4.div>
            )}
          </AP4>

          {/* Credit logic strip */}
          <AP4>
            {phase>=4 && (
              <M4.div
                key="credit-strip"
                initial={{opacity:0, x:-8}} animate={{opacity:1, x:0}} exit={{opacity:0}}
                className="mt-2 rounded-lg p-2 text-[9px]"
                style={{background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.25)'}}>
                <div className="flex items-center gap-1 font-bold text-rose-700 mb-1 uppercase tracking-wider text-[8px]">
                  <TrendingDown size={9}/> Auto-credit applied
                </div>
                <div className="space-y-0.5 font-mono">
                  <div className="flex justify-between"><span className="text-slate-500">Short qty · 100u</span><span className="font-bold text-rose-600">−₹24,000</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">QC rejected · 20u</span><span className="font-bold text-rose-600">−₹4,800</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Damaged · 100u</span><span className="font-bold text-rose-600">−₹5,040</span></div>
                </div>
              </M4.div>
            )}
          </AP4>

          {/* Approve Payment button — bottom */}
          <div className="mt-auto pt-3">
            <M4.button
              initial={false}
              animate={{
                opacity: phase>=2 ? 1 : 0.35,
                scale: phase===3 ? 1.04 : 1,
              }}
              className="w-full px-3 py-2.5 rounded-xl text-white text-[12px] font-bold flex items-center justify-center gap-2 shadow-glow"
              style={{
                background:'linear-gradient(135deg,#4f8bff,#2a6cff)',
                pointerEvents:'none',
              }}>
              <Zap size={13}/>
              {phase>=5 ? `Paid · ₹${net.toLocaleString('en-IN')}` : phase>=4 ? 'Validating · 4 checks' : 'Approve payment · 3 invoices'}
            </M4.button>
          </div>
        </div>

        {/* RIGHT — the quadruple validation hub */}
        <div className="relative rounded-2xl bg-white border border-slate-100 p-3 overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[8.5px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400">Quadruple validation</span>
            <span className="text-[8.5px] font-mono font-bold flex items-center gap-1"
                  style={{color: phase>=5 ? '#10b981' : phase>=3 ? '#3666ff' : '#94a3b8'}}>
              <span className="size-1 rounded-full" style={{background:'currentColor', animation: phase>=3 && phase<5 ? 'fw-pulse 1.2s infinite' : ''}}/>
              {phase>=5 ? 'all green' : phase>=3 ? 'running' : 'standby'}
            </span>
          </div>

          {/* Central hub + 4 orbiting orbs */}
          <div className="relative mx-auto" style={{ width:260, height:230 }}>
            {/* Connecting lines */}
            <svg className="absolute inset-0" width="260" height="230" style={{overflow:'visible'}}>
              {orbs.map((o,i)=>{
                const rad = (o.ang) * Math.PI/180;
                const cx=130, cy=115, r=92;
                const ox = cx + Math.cos(rad)*r;
                const oy = cy + Math.sin(rad)*r;
                const isOn = phase>=3 && (phase>=4 || true);
                const isDone = phase>=4 && o.step <= Math.min(4, (phase===4 ? 4 : 4));
                return (
                  <g key={i}>
                    <line x1={cx} y1={cy} x2={ox} y2={oy}
                          stroke={isDone ? '#10b981' : isOn ? '#3666ff' : '#cbd5e1'}
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                          style={{ opacity: phase>=3 ? 1 : 0.4, transition:'all .4s',
                                   animation: phase===3 ? 'fw-dash 1.2s linear infinite' : 'none' }}/>
                  </g>
                );
              })}
            </svg>

            {/* Spinning ring on phase 3 only */}
            {phase===3 && (
              <div className="absolute" style={{
                left:130-72, top:115-72, width:144, height:144,
                borderRadius:'50%',
                border:'2px dashed rgba(54,102,255,0.4)',
                animation:'fw-orbit 3s linear infinite',
                borderRightColor:'transparent', borderBottomColor:'transparent',
              }}/>
            )}

            {/* Center hub */}
            <M4.div
              animate={{
                scale: phase===3 ? [1,1.05,1] : 1,
                boxShadow: phase>=5 ? '0 0 0 12px rgba(16,185,129,0.15)' : phase>=3 ? '0 0 0 8px rgba(54,102,255,0.18)' : '0 0 0 0px transparent',
              }}
              transition={{ scale:{ repeat: phase===3 ? Infinity : 0, duration:1.2 }, boxShadow:{duration:0.4} }}
              className="absolute rounded-2xl grid place-items-center text-white"
              style={{
                left:130-42, top:115-42, width:84, height:84,
                background: phase>=5 ? 'linear-gradient(135deg,#10b981,#059669)'
                          : phase>=3 ? 'linear-gradient(135deg,#2a6cff,#3666ff)'
                          : 'linear-gradient(135deg,#475569,#64748b)',
                transition:'background .4s',
              }}>
              <div className="text-center">
                <DollarSign size={18}/>
                <div className="text-[8px] font-mono font-bold mt-0.5 uppercase tracking-wider">
                  {phase>=5 ? 'Paid' : phase>=3 ? 'Verify' : 'Hold'}
                </div>
              </div>
            </M4.div>

            {/* Orbs */}
            {orbs.map((o,i)=>{
              const rad = (o.ang) * Math.PI/180;
              const cx=130, cy=115, r=92;
              const ox = cx + Math.cos(rad)*r;
              const oy = cy + Math.sin(rad)*r;
              // Sequential green light: at phase 4, orbs go green one by one based on step
              const isGreen = phase>=4 && o.step <= 4; // all go green by phase 4 end
              const isPing  = phase===4 && o.step <= 4;
              return (
                <M4.div key={o.l}
                        initial={false}
                        animate={{
                          opacity: phase>=1 ? 1 : 0.4,
                          scale: phase>=3 ? 1 : 0.9,
                        }}
                        className="absolute"
                        style={{ left:ox-36, top:oy-22, width:72 }}>
                  <div className="rounded-lg border p-1.5 text-center relative bg-white"
                       style={{
                         borderColor: isGreen ? '#10b981' : phase>=3 ? '#3666ff' : '#cbd5e1',
                         background:  isGreen ? 'rgba(16,185,129,0.05)' : '#fff',
                         transition:'all .4s',
                       }}>
                    <div className="flex items-center justify-center gap-0.5 mb-0.5"
                         style={{ color: isGreen ? '#059669' : phase>=3 ? '#3666ff' : '#94a3b8' }}>
                      {o.icon}
                    </div>
                    <div className="text-[9px] font-bold leading-tight"
                         style={{ color: isGreen ? '#059669' : phase>=3 ? '#3666ff' : '#1A1D2E' }}>
                      {o.l}
                    </div>
                    <div className="text-[7px] font-mono text-slate-400 leading-tight">{o.sub}</div>
                    {isGreen && (
                      <M4.div initial={{scale:0}} animate={{scale:1}}
                              transition={{delay:i*0.18}}
                              className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-emerald-500 text-white grid place-items-center">
                        <Check size={9} sw={4}/>
                      </M4.div>
                    )}
                  </div>
                </M4.div>
              );
            })}
          </div>

          {/* Net payment receipt (phase 5) */}
          <AP4>
            {phase>=5 && (
              <M4.div
                key="net-receipt"
                initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0}}
                className="absolute left-3 right-3 bottom-3 rounded-xl p-2.5 flex items-center justify-between"
                style={{
                  background:'linear-gradient(135deg,#0d1117,#1A1D2E)',
                  border:'1px solid rgba(16,185,129,0.4)',
                  color:'#fff',
                }}>
                <div>
                  <div className="text-[7.5px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Net paid · auto</div>
                  <div className="font-mono text-[16px] font-bold leading-none mt-0.5">₹{net.toLocaleString('en-IN')}</div>
                  <div className="text-[8px] text-slate-300 font-mono mt-0.5">3 invoices · 1 transfer · 0 errors</div>
                </div>
                <div className="text-right">
                  <div className="text-[7.5px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Recovered</div>
                  <div className="font-mono text-[14px] font-bold text-emerald-400 leading-none mt-0.5">
                    ₹{creditDeduction.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[8px] text-slate-300 font-mono mt-0.5">~5% saved</div>
                </div>
              </M4.div>
            )}
          </AP4>
        </div>
      </div>

      {/* Cursor */}
      <FwCursor x={cursor.x} y={cursor.y} click={cursor.click} label={cursor.label} labelDir={phase===3||phase===5?'tr':'br'}/>

      {/* Caption */}
      <FwCaption text={
        phase===1 ? 'Pay for a single line, a full invoice — or consolidate multiple invoices from one vendor into a single payment.' :
        phase===2 ? 'Three invoices for Apex selected — FactWise consolidates them into one transfer.' :
        phase===3 ? 'No money moves without quadruple validation: PO, goods receipt, QC, and contract.' :
        phase===4 ? 'All four checks must turn green. Discrepancies block the payment automatically.' :
                    'Credit logic for rejected & damaged qty is automatic — we recover ~5% from errors most teams quietly accept.'
      }/>
    </FwPanel>
  );
}

Object.assign(window, { Anim4PaymentValidate });

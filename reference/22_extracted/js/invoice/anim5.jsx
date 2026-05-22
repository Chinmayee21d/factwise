/* ══════════════════════════════════════════════════════════════════════
   PANEL 5 — Total Visibility · From Invoice to Payment
   Story phases (5):
     1. Macro timeline · scrubber at start, only "Invoice raised" lit
     2. Scrubber glides through GR → QC → Validation · each lights up
     3. Scrubber reaches Payment Made · chain fully green
     4. View flips into line-item mode · 4 parallel mini-timelines
     5. Cursor clicks a flagged event · audit drawer expands
══════════════════════════════════════════════════════════════════════ */
const { motion: M5, AnimatePresence: AP5 } = window.framerMotion;

function Anim5VisibilityTimeline({ phase }){
  /* Macro timeline milestones */
  const milestones = [
    {l:'Invoice raised', sub:'12 May · INV-AX-9047', ic:<FileText size={11}/>,    actor:'Apex Industrial'},
    {l:'GR posted',      sub:'14 May · GR-9241',     ic:<Truck size={11}/>,       actor:'Warehouse · Bay 3'},
    {l:'QC complete',    sub:'14 May · 3 checks',    ic:<Shield size={11}/>,      actor:'QC team'},
    {l:'4-way validated',sub:'15 May · auto',        ic:<Lock size={11}/>,        actor:'FactWise AI'},
    {l:'Payment made',   sub:'16 May · ₹1.11L',      ic:<DollarSign size={11}/>,  actor:'Finance'},
  ];
  /* Scrubber position based on phase. Phase 1 = milestone 0, phase 3 = milestone 4. */
  const scrubX = (
    phase===1 ? 0 :
    phase===2 ? 0.55 :
                1
  );

  /* Line-item view data — 4 lines, each with their own 5-step timeline */
  const lines = [
    {sku:'BRK-M8-304', name:'Steel Bracket M8', states:[1,1,2,1,1], flag:'QC · 20 rej · −₹4,800'},  // 2 = flagged
    {sku:'BRK-M6-201', name:'Steel Bracket M6', states:[1,1,1,1,1], flag:null},
    {sku:'PCK-FX-019', name:'Packaging FX-019', states:[1,1,1,1,1], flag:null},
    {sku:'WS-50-A',    name:'Washer · WS-50',   states:[1,1,2,2,3], flag:'Damaged 100u · pending'}, // 3 = blocked
  ];

  /* Cursor choreography */
  const cursor = (
    phase===1 ? { x:10, y:34, click:false, label:'Invoice raised' } :
    phase===2 ? { x:54, y:34, click:false, label:'QC complete'    } :
    phase===3 ? { x:90, y:34, click:false, label:'Payment made'   } :
    phase===4 ? { x:24, y:64, click:false, label:'Line-item view' } :
                { x:64, y:68, click:true,  label:'Open audit · BRK-M8' }
  );

  const showMacro = phase<=3;
  const showLines = phase>=4;
  const showDrawer = phase===5;

  return (
    <FwPanel
      icon={<Search size={13}/>}
      title="Full visibility · audit"
      subtitle="Invoice → payment · per line"
      right={
        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-[2px] rounded-full"
              style={{background:'rgba(54,102,255,0.08)', color:'#3666ff', border:'1px solid rgba(54,102,255,0.2)'}}>
          {showMacro ? 'Macro view' : showLines ? 'Line · item view' : 'Audit · open'}
        </span>
      }>

      {/* ── MACRO TIMELINE (top) — always visible, with state changes ─ */}
      <div className="absolute left-4 right-4 top-4 rounded-2xl border border-slate-100 bg-[#fbfcfe] p-4"
           style={{
             height: showMacro ? 180 : 80,
             transition:'height .5s cubic-bezier(0.22,1,0.36,1)',
             overflow:'hidden',
           }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[8.5px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400">Invoice INV-AX-9047 · 5-stage journey</span>
          <span className="text-[8.5px] font-mono font-bold flex items-center gap-1"
                style={{color: phase>=3 ? '#10b981' : '#3666ff'}}>
            <span className="size-1 rounded-full" style={{background:'currentColor', animation:'fw-pulse 1.4s infinite'}}/>
            {phase===1 ? 'just raised' : phase===2 ? 'in progress' : 'complete'}
          </span>
        </div>

        {/* The timeline */}
        <div className="relative" style={{ height: showMacro ? 110 : 38 }}>
          {/* Track */}
          <div className="absolute top-[18px] left-3 right-3 h-[3px] rounded-full bg-slate-200 overflow-hidden">
            <M5.div
              initial={false}
              animate={{ width: `${scrubX*100}%` }}
              transition={{ type:'spring', stiffness:60, damping:18 }}
              className="h-full"
              style={{background:'linear-gradient(90deg,#3666ff,#10b981)'}}/>
          </div>

          {/* Milestones */}
          {milestones.map((m,i)=>{
            const xPct = i/(milestones.length-1);
            const reached = scrubX >= xPct - 0.01;
            return (
              <div key={m.l} className="absolute" style={{ left:`calc(${xPct*100}% - 11px + ${(0.5-xPct)*24}px)`, top:0, width:140, marginLeft:i===0?-3:i===4?-127:-65 }}>
                <div className="flex flex-col items-center">
                  {/* Dot */}
                  <M5.div
                    initial={false}
                    animate={{
                      scale: reached ? 1.0 : 0.9,
                      background: reached ? '#10b981' : '#fff',
                      borderColor: reached ? '#10b981' : '#cbd5e1',
                      boxShadow: reached && phase<=3 && i === Math.round(scrubX*4) ? '0 0 0 6px rgba(16,185,129,0.15)' : '0 0 0 0px transparent',
                    }}
                    transition={{ duration:0.4 }}
                    className="size-[22px] rounded-full border-2 grid place-items-center text-white z-10 relative">
                    {reached ? <Check size={11} sw={3.5}/> : <span style={{color:'#94a3b8'}}>{m.ic}</span>}
                  </M5.div>

                  {/* Card (only in macro mode) */}
                  {showMacro && (
                    <M5.div
                      initial={false}
                      animate={{ opacity: reached ? 1 : 0.5, y: reached ? 0 : 4 }}
                      transition={{ delay:0.1 }}
                      className="mt-2 bg-white rounded-md border px-1.5 py-1 text-center"
                      style={{
                        width:120,
                        borderColor: reached ? 'rgba(16,185,129,0.3)' : '#e2e8f0',
                      }}>
                      <div className="text-[9px] font-bold text-sub leading-tight">{m.l}</div>
                      <div className="text-[7.5px] text-slate-400 font-mono leading-tight">{m.sub}</div>
                      <div className="text-[7px] text-slate-400 mt-0.5 leading-tight">{m.actor}</div>
                    </M5.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── LINE-ITEM VIEW (bottom) ───────────────────────────────── */}
      <AP5>
        {showLines && (
          <M5.div
            key="lines"
            initial={{opacity:0, y:14}} animate={{opacity:1, y:0}} exit={{opacity:0}}
            transition={{delay:0.15, duration:0.4}}
            className="absolute left-4 right-4 rounded-2xl border border-slate-100 bg-white p-3"
            style={{ top:120, bottom: showDrawer ? 188 : 68, overflow:'hidden', transition:'bottom .4s cubic-bezier(0.22,1,0.36,1)' }}>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[8.5px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400">
                Drill in · 4 line items
              </span>
              <div className="flex items-center gap-2 text-[8.5px]">
                <span className="flex items-center gap-1 font-mono"><span className="size-1.5 rounded-full bg-emerald-500"/>passed</span>
                <span className="flex items-center gap-1 font-mono"><span className="size-1.5 rounded-full bg-amber-500"/>flagged</span>
                <span className="flex items-center gap-1 font-mono"><span className="size-1.5 rounded-full bg-rose-500"/>blocked</span>
              </div>
            </div>

            {/* Mini timeline grid header */}
            <div className="grid items-center gap-1 px-1 mb-1 text-[7px] uppercase font-bold tracking-wider text-slate-400"
                 style={{gridTemplateColumns:'1.4fr repeat(5, 1fr) 1.2fr'}}>
              <div>Item</div>
              {['Inv','GR','QC','4-way','Pay'].map(h=><div key={h} className="text-center">{h}</div>)}
              <div className="text-right">Flag</div>
            </div>

            <div className="space-y-1.5">
              {lines.map((line,li)=>{
                const isClicked = phase===5 && li===0;
                return (
                  <M5.div
                    key={line.sku}
                    initial={{opacity:0, x:-8}} animate={{opacity:1, x:0}} transition={{delay:0.05+li*0.06}}
                    className="grid items-center gap-1 px-1.5 py-1.5 rounded-lg"
                    style={{
                      gridTemplateColumns:'1.4fr repeat(5, 1fr) 1.2fr',
                      background: isClicked ? 'rgba(54,102,255,0.06)' : '#fbfcfe',
                      border: '1px solid '+ (isClicked ? 'rgba(54,102,255,0.3)' : '#eef2f7'),
                      transition:'all .35s',
                    }}>
                    {/* Item label */}
                    <div className="min-w-0">
                      <div className="text-[9.5px] font-bold text-sub leading-tight truncate">{line.name}</div>
                      <div className="text-[7.5px] text-slate-400 font-mono leading-tight">{line.sku}</div>
                    </div>

                    {/* The 5 status dots with connectors */}
                    {line.states.map((s,si)=>{
                      const color = s===1 ? '#10b981' : s===2 ? '#f59e0b' : s===3 ? '#ef4444' : '#cbd5e1';
                      return (
                        <div key={si} className="relative flex items-center justify-center">
                          {si>0 && (
                            <div className="absolute h-[2px] left-[-50%] right-[50%] top-1/2 -translate-y-1/2"
                                 style={{background: line.states[si-1]>0 ? '#94a3b8' : '#e2e8f0'}}/>
                          )}
                          <M5.div
                            initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2+li*0.05+si*0.06, type:'spring', stiffness:200, damping:18}}
                            className="size-[14px] rounded-full grid place-items-center z-10 border-2 border-white"
                            style={{ background: color, boxShadow: s===2 ? '0 0 0 2px rgba(245,158,11,0.18)' : s===3 ? '0 0 0 2px rgba(239,68,68,0.18)' : 'none' }}>
                            {s===1 && <Check size={8} sw={4} className="text-white"/>}
                            {s===2 && <span className="text-white text-[8px] font-bold leading-none">!</span>}
                            {s===3 && <X size={8} sw={4} className="text-white"/>}
                          </M5.div>
                        </div>
                      );
                    })}

                    {/* Flag column */}
                    <div className="text-right">
                      {line.flag ? (
                        <span className="text-[8px] font-mono font-bold px-1.5 py-[1px] rounded inline-block"
                              style={{
                                background: line.states.includes(3) ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                                color:      line.states.includes(3) ? '#dc2626' : '#b45309',
                              }}>
                          {line.flag}
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono text-emerald-600 font-bold">clean</span>
                      )}
                    </div>
                  </M5.div>
                );
              })}
            </div>
          </M5.div>
        )}
      </AP5>

      {/* ── AUDIT DRAWER (opens on phase 5) ───────────────────────── */}
      <AP5>
        {showDrawer && (
          <M5.div
            key="audit"
            initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:20}}
            transition={{type:'spring', stiffness:140, damping:20}}
            className="absolute left-4 right-4 bottom-[68px] rounded-2xl border bg-white p-3 shadow-card-lg"
            style={{ height:116, borderColor:'rgba(54,102,255,0.3)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-brand flex items-center gap-1">
                <Search size={10}/> Audit · BRK-M8-304 · QC checkpoint
              </span>
              <span className="text-[8px] font-mono text-slate-400">6 events · 4 actors</span>
            </div>

            <div className="grid gap-1.5" style={{gridTemplateColumns:'1fr 1fr 1fr'}}>
              {[
                {t:'14 May 11:02', a:'Priya S. · QC',     d:'Primary check · 8u rejected · photos attached',  c:'#f59e0b'},
                {t:'14 May 14:18', a:'R. Khan · QC',      d:'Secondary check · 12u rejected · spec violation', c:'#f59e0b'},
                {t:'15 May 09:40', a:'FactWise · AI',     d:'Auto-reconciled 20u rejected vs invoice',           c:'#3666ff'},
                {t:'15 May 09:41', a:'FactWise · AI',     d:'Credit ₹4,800 calculated · attached to payment',    c:'#3666ff'},
                {t:'15 May 16:02', a:'Tara S. · Finance', d:'Approved · payment scheduled',                        c:'#10b981'},
                {t:'16 May 07:14', a:'FactWise · Pay',    d:'Transfer ₹1,11,360 to Apex · ref TXN-554817',         c:'#10b981'},
              ].map((e,i)=>(
                <M5.div key={i}
                        initial={{opacity:0, y:4}} animate={{opacity:1, y:0}} transition={{delay:0.05+i*0.04}}
                        className="rounded-lg p-1.5 border bg-[#fbfcfe]"
                        style={{ borderColor: e.c+'33' }}>
                  <div className="flex items-center gap-1 text-[7px] font-mono font-bold uppercase tracking-wider mb-0.5" style={{color:e.c}}>
                    <span className="size-1 rounded-full" style={{background:e.c}}/>
                    {e.t}
                  </div>
                  <div className="text-[8.5px] font-bold text-sub">{e.a}</div>
                  <div className="text-[7.5px] text-slate-500 leading-tight mt-0.5">{e.d}</div>
                </M5.div>
              ))}
            </div>
          </M5.div>
        )}
      </AP5>

      {/* Cursor */}
      <FwCursor x={cursor.x} y={cursor.y} click={cursor.click} label={cursor.label} labelDir={phase>=4?'tr':'br'}/>

      {/* Caption */}
      <FwCaption text={
        phase===1 ? 'Every invoice is born with a journey — five stages from raised to paid, fully tracked.' :
        phase===2 ? 'Watch each stage tick green in real time — GR, QC, validation, all visible to every stakeholder.' :
        phase===3 ? 'From the moment an invoice is raised to the moment payment lands — no questions, no chasing.' :
        phase===4 ? 'Zoom into line-item level — every SKU has its own status across the same five stages.' :
                    'Click any flagged event for the full audit trail — every actor, every action, every rupee accounted for.'
      }/>
    </FwPanel>
  );
}

Object.assign(window, { Anim5VisibilityTimeline });

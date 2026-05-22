/* ══════════════════════════════════════════════════════════════════════
   PANEL 2 — Track Every Delivery · Record Every Discrepancy
   Story phases (5):
     1. Truck pulls up to receiving dock · 5 boxes waiting
     2. Cursor scans box 1 → line-item qty ticks up
     3. Cursor rapid-scans box 2 + 3 (received counter climbs)
     4. Cursor drags box 4 to "Damaged" zone — red flag, line-item updates
     5. AI 3-way match fires (PO · Invoice · GR) — short 20u flagged
══════════════════════════════════════════════════════════════════════ */
const { motion: M2, AnimatePresence: AP2 } = window.framerMotion;

function Anim2GoodsReceipt({ phase }){
  /* Cursor choreography — % within the inner panel */
  const cursor = (
    phase===1 ? { x:24, y:42, click:false, label:'Receiving dock' } :
    phase===2 ? { x:14, y:48, click:true,  label:'Scan · Box 1' } :
    phase===3 ? { x:30, y:48, click:true,  label:'Scan · Box 3' } :
    phase===4 ? { x:36, y:78, click:true,  label:'Mark damaged' } :
                { x:78, y:30, click:false, label:'AI 3-way match' }
  );

  /* The 5 boxes — state derived from phase */
  const boxState = (i)=>{
    if (phase<=1) return 'pending';
    if (phase===2) return i===0 ? 'received' : 'pending';
    if (phase===3) return i<=2 ? 'received' : 'pending';
    if (phase===4) return i<=2 ? 'received' : i===3 ? 'damaged' : 'pending';
    return i<=2 ? 'received' : i===3 ? 'damaged' : 'received';
  };
  const receivedCount = (phase<=1) ? 0 : (phase===2 ? 100 : phase===3 ? 300 : phase===4 ? 300 : 380);
  const damagedCount  = (phase>=4) ? 100 : 0;

  /* Line item state */
  const lines = [
    {sku:'BRK-M8-304', name:'Steel Bracket M8', ordered:400, inv:380, rcvd:receivedCount, dmg:damagedCount, st: phase>=4 ? 'short' : phase>=2 ? 'partial' : 'pending'},
    {sku:'BRK-M6-201', name:'Steel Bracket M6', ordered:200, inv:200, rcvd: phase>=3 ? 200 : phase>=2 ? 80 : 0,  dmg:0, st: phase>=3 ? 'ok' : phase>=2 ? 'partial' : 'pending'},
  ];

  return (
    <FwPanel
      icon={<Truck size={13}/>}
      title="Goods Receipt"
      subtitle="Receiving · scan · cross-check"
      right={
        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-[2px] rounded-full"
              style={{background:'rgba(54,102,255,0.08)', color:'#3666ff', border:'1px solid rgba(54,102,255,0.2)'}}>
          GR-{phase>=5?'9241':'draft'} · INV-AX-9047
        </span>
      }>

      {/* 2-column stage */}
      <div className="absolute inset-3 bottom-[68px] grid gap-3" style={{gridTemplateColumns:'1.05fr 1fr'}}>

        {/* LEFT — Receiving dock with truck + boxes */}
        <div className="relative rounded-2xl bg-[#fbfcfe] border border-slate-100 overflow-hidden">
          <div className="px-3 pt-3 flex items-center justify-between">
            <span className="text-[8.5px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400">Receiving dock · Bay 3</span>
            <span className="text-[8.5px] font-mono font-bold text-slate-500 flex items-center gap-1">
              <Clock size={9}/> 09:42 · today
            </span>
          </div>

          {/* Dock floor */}
          <div className="absolute left-3 right-3 bottom-[88px] top-9 rounded-xl overflow-hidden"
               style={{
                 background:'repeating-linear-gradient(45deg, #f1f5f9 0 8px, #fff 8px 16px)',
                 border:'1px solid #e2e8f0',
               }}>

            {/* Truck silhouette (left side) */}
            <M2.div
              initial={{ x:-60 }}
              animate={{ x: phase>=1 ? 0 : -60 }}
              transition={{ type:'spring', stiffness:80, damping:18 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
                {/* Cab */}
                <rect x="62" y="14" width="26" height="26" rx="3" fill="#1A1D2E"/>
                <rect x="66" y="18" width="18" height="10" rx="1" fill="#a3c5ff"/>
                {/* Container */}
                <rect x="6" y="8" width="58" height="34" rx="2" fill="#fff" stroke="#1A1D2E" strokeWidth="2"/>
                <line x1="20" y1="8" x2="20" y2="42" stroke="#1A1D2E" strokeWidth="1.4"/>
                <line x1="36" y1="8" x2="36" y2="42" stroke="#1A1D2E" strokeWidth="1.4"/>
                <line x1="52" y1="8" x2="52" y2="42" stroke="#1A1D2E" strokeWidth="1.4"/>
                <text x="35" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fontWeight="700" fill="#3666ff">APEX</text>
                {/* Wheels */}
                <circle cx="18" cy="48" r="6" fill="#1A1D2E"/>
                <circle cx="18" cy="48" r="2" fill="#94a3b8"/>
                <circle cx="50" cy="48" r="6" fill="#1A1D2E"/>
                <circle cx="50" cy="48" r="2" fill="#94a3b8"/>
                <circle cx="74" cy="48" r="6" fill="#1A1D2E"/>
                <circle cx="74" cy="48" r="2" fill="#94a3b8"/>
                <circle cx="84" cy="48" r="6" fill="#1A1D2E"/>
                <circle cx="84" cy="48" r="2" fill="#94a3b8"/>
              </svg>
            </M2.div>

            {/* Boxes — laid out in 2 rows */}
            <div className="absolute" style={{ left:120, right:8, top:6, bottom:6 }}>
              <div className="grid grid-cols-5 gap-1.5 h-full content-center">
                {Array.from({length:5}).map((_,i)=>{
                  const st = boxState(i);
                  const isDamaged  = st==='damaged';
                  const isReceived = st==='received';
                  return (
                    <M2.div
                      key={i}
                      initial={{ y:20, opacity:0 }}
                      animate={{ y:0, opacity:1 }}
                      transition={{ delay:0.1+i*0.06 }}
                      className="relative rounded-md border-2 flex flex-col items-center justify-center"
                      style={{
                        background:
                          isDamaged  ? 'rgba(239,68,68,0.08)' :
                          isReceived ? 'rgba(16,185,129,0.08)' :
                          '#fff',
                        borderColor:
                          isDamaged  ? '#ef4444' :
                          isReceived ? '#10b981' :
                          '#cbd5e1',
                        aspectRatio:'1 / 1',
                        transition:'all .4s',
                      }}>
                      {/* Cardboard lines */}
                      <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none"
                           stroke={isDamaged ? '#ef4444' : isReceived ? '#10b981' : '#94a3b8'}
                           strokeWidth="1.8">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <line x1="3.27" y1="6.96" x2="12" y2="12.01"/>
                        <line x1="20.73" y1="6.96" x2="12" y2="12.01"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                      <div className="text-[7.5px] font-mono font-bold mt-0.5"
                           style={{ color: isDamaged ? '#dc2626' : isReceived ? '#059669' : '#64748b' }}>
                        {String.fromCharCode(65+i)}-100u
                      </div>
                      {/* Status badge */}
                      {(isReceived || isDamaged) && (
                        <M2.div
                          initial={{ scale:0 }} animate={{ scale:1 }}
                          className="absolute -top-1.5 -right-1.5 size-4 rounded-full grid place-items-center text-white text-[8px] font-bold"
                          style={{ background: isDamaged ? '#ef4444' : '#10b981' }}>
                          {isDamaged ? '!' : <Check size={8} sw={4}/>}
                        </M2.div>
                      )}
                      {/* Scan ping */}
                      {((phase===2 && i===0) || (phase===3 && (i===1||i===2)) || (phase===4 && i===3)) && (
                        <span className="absolute inset-0 rounded-md border-2"
                              style={{
                                borderColor: phase===4 && i===3 ? '#ef4444' : '#3666ff',
                                animation:'fw-ping .8s ease-out infinite',
                              }}/>
                      )}
                    </M2.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Counters strip below the dock */}
          <div className="absolute left-3 right-3 bottom-3 rounded-xl bg-white border border-slate-200/70 p-2 flex items-center justify-around">
            {[
              {l:'Received',  v: receivedCount,  c:'#10b981'},
              {l:'Damaged',   v: damagedCount,   c:'#ef4444'},
              {l:'Pending',   v: 600 - receivedCount - damagedCount, c:'#94a3b8'},
              {l:'Expected',  v: 600,            c:'#1A1D2E'},
            ].map(s=>(
              <div key={s.l} className="text-center">
                <div className="text-[7.5px] uppercase tracking-wider text-slate-400 font-bold">{s.l}</div>
                <M2.div key={s.v} initial={{y:-4,opacity:0}} animate={{y:0,opacity:1}}
                        className="font-mono text-[14px] font-bold" style={{color:s.c}}>
                  {s.v}
                </M2.div>
              </div>
            ))}
          </div>

          {/* "Damaged zone" droplet — visual on phase 4 */}
          <AP2>
            {phase===4 && (
              <M2.div
                key="dmg-droplet"
                initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0}}
                className="absolute left-[40%] bottom-[92px] rounded-lg px-2 py-1 text-[8.5px] font-bold text-rose-700 z-30"
                style={{background:'rgba(239,68,68,0.1)', border:'1px dashed #ef4444'}}>
                ⚠ Damaged · 100u
              </M2.div>
            )}
          </AP2>
        </div>

        {/* RIGHT — Line item table + AI 3-way match */}
        <div className="relative rounded-2xl bg-white border border-slate-100 p-3 overflow-hidden flex flex-col">
          <div className="text-[8.5px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400 mb-2">Line item · receipt</div>

          {/* Header row */}
          <div className="grid items-center gap-1 px-2 py-1 text-[7.5px] uppercase tracking-[0.08em] text-slate-400 font-bold border-b border-slate-100"
               style={{gridTemplateColumns:'1.4fr 0.6fr 0.6fr 0.6fr 0.7fr'}}>
            <div>Item</div><div>PO</div><div>Inv</div><div>Recv</div><div>Status</div>
          </div>
          {lines.map((l,i)=>(
            <M2.div key={l.sku}
                    initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.08}}
                    className="grid items-center gap-1 px-2 py-2 text-[9.5px] border-b border-slate-50"
                    style={{gridTemplateColumns:'1.4fr 0.6fr 0.6fr 0.6fr 0.7fr'}}>
              <div>
                <div className="font-bold text-sub leading-tight">{l.name}</div>
                <div className="text-[8px] text-slate-400 font-mono">{l.sku}</div>
              </div>
              <div className="font-mono text-slate-500">{l.ordered}</div>
              <div className="font-mono text-slate-500">{l.inv}</div>
              <M2.div key={l.rcvd+'-'+l.dmg} initial={{y:-3,opacity:0}} animate={{y:0,opacity:1}}
                      className="font-mono font-bold"
                      style={{color: l.st==='short' ? '#dc2626' : l.st==='ok' ? '#059669' : '#3666ff'}}>
                {l.rcvd}{l.dmg>0 && (<span className="text-rose-500 text-[8px]"> · −{l.dmg}</span>)}
              </M2.div>
              <div>
                <span className="inline-flex items-center px-1.5 py-[1px] rounded text-[7.5px] font-bold uppercase tracking-wider"
                      style={{
                        background: l.st==='short' ? 'rgba(239,68,68,0.1)' : l.st==='ok' ? 'rgba(16,185,129,0.1)' : 'rgba(54,102,255,0.1)',
                        color: l.st==='short' ? '#dc2626' : l.st==='ok' ? '#059669' : '#3666ff',
                      }}>
                  {l.st==='short' ? 'Short' : l.st==='ok' ? 'OK' : l.st==='partial' ? 'Partial' : 'Pending'}
                </span>
              </div>
            </M2.div>
          ))}

          {/* AI 3-way match — central visual */}
          <div className="mt-3 rounded-xl p-2.5 relative"
               style={{
                 background: phase>=5 ? 'linear-gradient(135deg,#eef3ff 0%, #fff 100%)' : '#fbfcfe',
                 border: phase>=5 ? '1px solid rgba(54,102,255,0.3)' : '1px solid #eef2f7',
               }}>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1 text-[9px] font-bold text-brand uppercase tracking-wider">
                <Sparkles size={10}/> AI · 3-way cross-check
              </span>
              <span className="text-[7.5px] font-mono font-bold"
                    style={{ color: phase>=5 ? '#10b981' : '#94a3b8' }}>
                {phase>=5 ? 'ready' : 'standby'}
              </span>
            </div>

            {/* Three orbs connected */}
            <div className="relative h-[70px]">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 70" fill="none" preserveAspectRatio="none">
                <path d="M 36 35 L 100 35 L 164 35" stroke="#3666ff" strokeWidth="1" strokeDasharray="3 3"
                      style={{opacity: phase>=5 ? 1 : 0.3, transition:'opacity .6s', animation: phase>=5 ? 'fw-dash 1.2s linear infinite' : 'none'}}/>
              </svg>
              {[
                {l:'PO',  v:'400', x:18,  ok:true},
                {l:'INV', v:'380', x:88,  ok:false, note:'−20'},
                {l:'GR',  v:'300', x:164, ok:false, note:'−80'},
              ].map(o=>(
                <div key={o.l} className="absolute top-2" style={{left:o.x, width:36}}>
                  <div className="size-9 rounded-full grid place-items-center text-white text-[10px] font-bold mx-auto"
                       style={{ background: phase>=5 ? (o.ok ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#ef4444,#dc2626)') : '#cbd5e1',
                                transition:'background .4s' }}>
                    {o.l}
                  </div>
                  <div className="text-center mt-0.5">
                    <div className="text-[9px] font-mono font-bold text-sub">{o.v}</div>
                    {o.note && phase>=5 && (
                      <div className="text-[7.5px] font-mono font-bold text-rose-600">{o.note}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI bubble on phase 5 */}
          <FwAiBubble show={phase===5} x={6} y={170} w={210}>
            <span className="font-bold text-rose-600">Short 100u + Damaged 100u.</span> Cross-check vs invoice + PO complete. Vendor + finance auto-notified.
          </FwAiBubble>
        </div>
      </div>

      {/* Cursor */}
      <FwCursor x={cursor.x} y={cursor.y} click={cursor.click} label={cursor.label} labelDir={phase===5?'bl':'br'}/>

      {/* Caption */}
      <FwCaption text={
        phase===1 ? 'Goods receipts can be created against any invoice — or directly against a PO. Bay 3 is ready to receive.' :
        phase===2 ? 'Tap each delivery to receive — quantities go straight into the line-item record, in real time.' :
        phase===3 ? 'Partial deliveries are first-class — every line item carries its own running received total.' :
        phase===4 ? 'Damaged on arrival? Flag it on the spot — rejected items captured at the moment they happen.' :
                    'AI cross-checks every goods receipt against the invoice and PO automatically — mismatches surface instantly.'
      }/>
    </FwPanel>
  );
}

Object.assign(window, { Anim2GoodsReceipt });

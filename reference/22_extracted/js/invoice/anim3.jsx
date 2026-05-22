/* ══════════════════════════════════════════════════════════════════════
   PANEL 3 — Quality Checks on Platform · Nothing Slips Through
   Metaphor: a real conveyor line. Items (dots) flow left → right
   through THREE gates. Some divert down into reject bins per stage.
   Story phases (5):
     1. Lot of 500u staged at the entry · gates idle
     2. Primary QC fires — flock streams · 12u diverted
     3. Secondary QC fires — flock streams · 6u diverted
     4. Production-line QC fires — flock streams · 2u diverted
     5. Final tallies · AI flags rejected qty for credit
══════════════════════════════════════════════════════════════════════ */
const { motion: M3, AnimatePresence: AP3 } = window.framerMotion;

function Anim3QCPipeline({ phase }){
  /* Cursor — moves to whichever gate is firing */
  const cursor = (
    phase===1 ? { x:9,  y:36, click:false, label:'Lot · 500u staged' } :
    phase===2 ? { x:30, y:36, click:true,  label:'Primary QC · 12 rejected' } :
    phase===3 ? { x:52, y:36, click:true,  label:'Secondary QC · 6 rejected' } :
    phase===4 ? { x:74, y:36, click:true,  label:'Production line · 2 rejected' } :
                { x:88, y:62, click:false, label:'AI · 20u credit' }
  );

  /* Stage data — accumulated through phases */
  const stages = [
    {l:'Primary QC',    sub:'Visual + dim.', total: phase>=2 ? 500 : 0,                 rej: phase>=2 ? 12 : 0, x:28},
    {l:'Secondary QC',  sub:'Functional',     total: phase>=3 ? 488 : phase>=2 ? 0 : 0, rej: phase>=3 ? 6  : 0, x:50},
    {l:'Production',    sub:'Inline · live',  total: phase>=4 ? 482 : 0,                rej: phase>=4 ? 2  : 0, x:72},
  ];

  /* Flock of particles flowing between two x-percentages */
  const Flock = ({ from, to, count=10, divertIdx=[], divertY=70, color='#3666ff', show }) => (
    <AP3>
      {show && Array.from({length:count}).map((_,i)=>{
        const divert = divertIdx.includes(i);
        const delay  = i*0.08;
        return (
          <M3.div
            key={i+'-'+from+'-'+to}
            initial={{ left:`${from}%`, top:'36%', opacity:0, scale:0.6 }}
            animate={{
              left: divert ? [`${from}%`, `${(from+to)/2}%`, `${(from+to)/2}%`] : `${to}%`,
              top:  divert ? ['36%',      '36%',              `${divertY}%`]    : '36%',
              opacity:[0,1,1, divert?0.6:1],
              scale:[0.6,1,1, divert?0.85:1],
            }}
            transition={{
              delay,
              duration: divert ? 1.0 : 0.9,
              times: divert ? [0, .3, .7, 1] : [0, .15, .85, 1],
              ease:'easeInOut',
            }}
            className="absolute pointer-events-none rounded-full"
            style={{
              width:8, height:8,
              background: divert ? '#ef4444' : color,
              boxShadow: divert ? '0 0 0 2px rgba(239,68,68,0.18)' : '0 0 0 2px rgba(54,102,255,0.18)',
              zIndex:5,
              marginLeft:-4, marginTop:-4,
            }}/>
        );
      })}
    </AP3>
  );

  return (
    <FwPanel
      icon={<Shield size={13}/>}
      title="Quality Control · Pipeline"
      subtitle="3 checkpoints · platform-recorded"
      right={
        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-[2px] rounded-full"
              style={{background:'rgba(54,102,255,0.08)', color:'#3666ff', border:'1px solid rgba(54,102,255,0.2)'}}>
          GR-9241 · lot 500u
        </span>
      }>

      {/* The conveyor stage — full-width */}
      <div className="absolute left-3 right-3 top-3 bottom-[88px] rounded-2xl border border-slate-100 overflow-hidden"
           style={{background:'linear-gradient(180deg,#fbfcfe 0%, #f6f8fc 100%)'}}>

        {/* Conveyor rails */}
        <div className="absolute left-0 right-0 top-[33%] h-[6%] border-y border-slate-200"
             style={{background:'repeating-linear-gradient(90deg, #fff 0 14px, #f1f5f9 14px 28px)'}}/>

        {/* Stage 0 — lot at the start */}
        <div className="absolute" style={{ left:'2%', top:'18%', width:80 }}>
          <div className="text-[7.5px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">Lot in</div>
          <div className="rounded-md p-1.5 border bg-white"
               style={{ borderColor: phase>=1 ? '#3666ff' : '#cbd5e1' }}>
            <div className="text-[8px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Steel Bracket M8</div>
            <div className="grid grid-cols-5 gap-[2px]">
              {Array.from({length:25}).map((_,i)=>(
                <div key={i} className="aspect-square rounded-[2px]" style={{background: phase>=1 ? '#3666ff' : '#cbd5e1'}}/>
              ))}
            </div>
            <div className="text-[9px] font-mono font-bold text-brand mt-1 text-center">500u</div>
          </div>
        </div>

        {/* The 3 gates */}
        {stages.map((s, gi)=>{
          const isFiring = phase===gi+2;
          const isDone   = phase>gi+2;
          return (
            <div key={gi} className="absolute" style={{ left:`${s.x}%`, top:'5%', width:90, transform:'translateX(-50%)' }}>
              {/* Title */}
              <div className="text-center mb-1">
                <div className="text-[9px] font-bold text-sub leading-tight">{s.l}</div>
                <div className="text-[7.5px] text-slate-400 font-mono">{s.sub}</div>
              </div>

              {/* Gate visual — scanner box */}
              <div className="relative mx-auto"
                   style={{
                     width:72, height:78,
                     border: '2px solid '+ (isDone ? '#10b981' : isFiring ? '#3666ff' : '#cbd5e1'),
                     borderRadius:10,
                     background: 'rgba(255,255,255,0.85)',
                     boxShadow: isFiring ? '0 0 0 4px rgba(54,102,255,0.12)' : 'none',
                     transition: 'all .35s',
                   }}>
                {/* Vertical scanner bar */}
                {isFiring && (
                  <div style={{
                    position:'absolute', top:'10%', bottom:'10%', left:'50%',
                    width:2, marginLeft:-1,
                    background:'linear-gradient(180deg, transparent 0%, #3666ff 50%, transparent 100%)',
                    animation:'fw-pulse .6s ease-in-out infinite',
                  }}/>
                )}
                {/* Gate icon */}
                <div className="absolute inset-0 grid place-items-center text-slate-300"
                     style={{ color: isDone ? '#10b981' : isFiring ? '#3666ff' : '#94a3b8' }}>
                  <Shield size={26} sw={1.6}/>
                </div>

                {/* Status pill */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-1.5 py-[1px] rounded-full text-[7px] font-mono font-bold uppercase tracking-wider whitespace-nowrap"
                     style={{
                       background: isDone ? 'rgba(16,185,129,0.12)' : isFiring ? 'rgba(54,102,255,0.12)' : '#f1f5f9',
                       color:      isDone ? '#059669' : isFiring ? '#3666ff' : '#94a3b8',
                       border:'1px solid currentColor',
                     }}>
                  {isDone ? 'Pass · QC1' : isFiring ? 'Scanning' : 'Idle'}
                </div>
              </div>

              {/* Reject bin (below) */}
              <div className="mt-6 mx-auto rounded-md p-1.5 border text-center"
                   style={{
                     width:72,
                     background: s.rej>0 ? 'rgba(239,68,68,0.06)' : '#fff',
                     borderColor: s.rej>0 ? 'rgba(239,68,68,0.4)' : '#e2e8f0',
                     borderStyle:'dashed', borderWidth:1.5,
                     transition:'all .35s',
                   }}>
                <div className="text-[7px] uppercase font-bold tracking-wider text-slate-400">Rejected</div>
                <M3.div key={s.rej} initial={{y:-3,opacity:0}} animate={{y:0,opacity:1}}
                        className="font-mono text-[12px] font-bold leading-none mt-0.5"
                        style={{ color: s.rej>0 ? '#dc2626' : '#cbd5e1' }}>
                  {s.rej}u
                </M3.div>
                {s.rej>0 && (
                  <div className="text-[6.5px] text-rose-500 mt-0.5 font-mono">attached photos · {s.rej===12?3:s.rej===6?2:1}</div>
                )}
              </div>
            </div>
          );
        })}

        {/* Final stage — accepted lot */}
        <div className="absolute" style={{ right:'2%', top:'18%', width:90 }}>
          <div className="text-[7.5px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">Accepted</div>
          <div className="rounded-md p-1.5 border-2 relative bg-white"
               style={{ borderColor: phase>=5 ? '#10b981' : '#cbd5e1' }}>
            <div className="text-[8px] uppercase font-bold tracking-wider text-slate-400 mb-0.5">Net qty</div>
            <div className="text-[18px] font-mono font-bold text-center leading-none"
                 style={{ color: phase>=5 ? '#059669' : '#94a3b8' }}>
              {phase>=5 ? '480' : phase>=4 ? '480' : phase>=3 ? '482' : phase>=2 ? '488' : '—'}
            </div>
            <div className="text-[8px] text-center text-slate-400 font-mono mt-0.5">of 500u</div>
            {phase>=5 && (
              <M3.div initial={{scale:0}} animate={{scale:1}}
                      className="absolute -top-2 -right-2 size-6 rounded-full bg-emerald-500 text-white grid place-items-center shadow-md">
                <Check size={12} sw={3}/>
              </M3.div>
            )}
          </div>
        </div>

        {/* Particle flocks between gates */}
        <Flock from={9}  to={28} count={12} divertIdx={[3,8]}     divertY={70} show={phase===2}/>
        <Flock from={28} to={50} count={12} divertIdx={[5,10]}    divertY={70} show={phase===3}/>
        <Flock from={50} to={72} count={12} divertIdx={[7]}       divertY={70} show={phase===4}/>
        <Flock from={72} to={92} count={12} divertIdx={[]}        divertY={70} show={phase===5}/>
      </div>

      {/* ── Bottom AI summary strip ──────────────────────────────── */}
      <div className="absolute left-3 right-3 bottom-[6px] rounded-xl border border-slate-200/80 bg-white p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-6 rounded-md grid place-items-center text-white shrink-0"
                style={{background:'linear-gradient(135deg,#2a6cff,#3666ff)'}}>
            <Sparkles size={12}/>
          </span>
          <div>
            <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-brand">AI · Quality reconciliation</div>
            <div className="text-[10px] text-slate-600 font-medium">
              {phase<=1 && 'Standing by — lot ready for inspection.'}
              {phase===2 && 'Primary QC complete — 12u rejected, photos attached at line level.'}
              {phase===3 && 'Secondary QC complete — 6u rejected, evidence attached.'}
              {phase===4 && 'Production-line QC complete — 2u rejected at last gate.'}
              {phase===5 && (<>
                <span className="font-bold text-rose-600">20u rejected total</span> · auto-flagged vs GR — credit will be applied at payment.
              </>)}
            </div>
          </div>
        </div>

        {/* Mini totals */}
        <div className="flex items-center gap-1.5">
          {[
            {l:'Pass', v: phase>=5?'480':phase>=4?'480':phase>=3?'482':phase>=2?'488':'—', c:'#059669'},
            {l:'Rej',  v: phase>=5?'20': phase>=4?'20': phase>=3?'18': phase>=2?'12':'—', c:'#dc2626'},
            {l:'Rate', v: phase>=5?'96.0%':phase>=4?'96.0%':phase>=3?'96.4%':phase>=2?'97.6%':'—', c:'#3666ff'},
          ].map(s=>(
            <div key={s.l} className="rounded-md bg-slate-50 border border-slate-100 px-2 py-1 text-center" style={{minWidth:54}}>
              <div className="text-[7.5px] uppercase tracking-wider text-slate-400 font-bold">{s.l}</div>
              <div className="font-mono text-[11px] font-bold" style={{color:s.c}}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor */}
      <FwCursor x={cursor.x} y={cursor.y} click={cursor.click} label={cursor.label} labelDir={phase===5?'bl':'br'}/>

      {/* Caption — anchored above the AI strip */}
      <div className="absolute left-5 right-5 z-30" style={{bottom:62}}>
        <AP3 mode="wait">
          <M3.div key={phase}
                  initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-6}}
                  className="px-3 py-1.5 rounded-lg flex items-center gap-2 bg-slate-900 text-white shadow-sm w-fit mx-auto">
            <span className="size-1.5 rounded-full bg-emerald-400" style={{animation:'fw-pulse 1.4s infinite'}}/>
            <span className="text-[10.5px] font-medium leading-snug">
              {phase===1 && 'A lot of 500 brackets is staged for inspection — three checkpoints await.'}
              {phase===2 && 'Primary QC — visual + dimensional. Rejected units captured with attachments at the line level.'}
              {phase===3 && 'Secondary QC — functional. Rejected units flow into their own bin, never lost.'}
              {phase===4 && 'Production-line QC — final inline gate. Last rejects caught before assembly.'}
              {phase===5 && 'AI tallies every checkpoint — rejected items are credited automatically; we never pay for what failed QC.'}
            </span>
          </M3.div>
        </AP3>
      </div>
    </FwPanel>
  );
}

Object.assign(window, { Anim3QCPipeline });

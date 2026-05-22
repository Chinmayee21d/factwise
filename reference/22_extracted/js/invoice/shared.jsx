/* ════════════════════════════════════════════════════════════════════════
   SHARED — cursor, phase-cycle hook, dashboard frame, scan-line, ai bubble
   Used by all 5 invoice→payment animations.
═════════════════════════════════════════════════════════════════════════ */
const { motion: MI, AnimatePresence: APIv } = window.framerMotion;

/* ── Cursor ────────────────────────────────────────────────────────────
   Renders a mouse cursor at (xPct, yPct) of the parent — both in %.
   When `click` is true, plays a click ripple.
   Positioning element must be position:relative.
─────────────────────────────────────────────────────────────────────── */
function FwCursor({ x=50, y=50, show=true, click=false, label=null, labelDir='br' }){
  // labelDir: bottom-right (br) or top-left (tl) etc, controls where label hangs
  const labelStyle = {
    position:'absolute',
    whiteSpace:'nowrap',
    fontFamily:"'JetBrains Mono', monospace",
    fontSize:9,
    fontWeight:700,
    color:'#0D1117',
    background:'#fff',
    border:'1px solid rgba(54,102,255,0.25)',
    boxShadow:'0 4px 14px rgba(15,23,42,0.08)',
    padding:'3px 7px',
    borderRadius:6,
    pointerEvents:'none',
  };
  // label positioning
  const lp = {
    br:{ left:18, top:14 },
    bl:{ right:18, top:14 },
    tr:{ left:18, bottom:14 },
    tl:{ right:18, bottom:14 },
  }[labelDir];

  return (
    <MI.div
      animate={{
        left: `${x}%`,
        top:  `${y}%`,
        opacity: show ? 1 : 0,
        scale: click ? 0.9 : 1,
      }}
      transition={{
        left:    { type:'spring', stiffness:140, damping:22, mass:0.6 },
        top:     { type:'spring', stiffness:140, damping:22, mass:0.6 },
        opacity: { duration:0.25 },
        scale:   { duration:0.12 },
      }}
      className={'fw-cursor ' + (click ? 'fw-click' : '')}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M5 3 L5 19 L9 15 L11.5 21 L14 20 L11.5 14 L17 14 Z"
              fill="#0D1117" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
      {label && (
        <span style={{...labelStyle, ...lp}}>{label}</span>
      )}
    </MI.div>
  );
}

/* ── Phase cycle hook ──────────────────────────────────────────────────
   Loops phase 1..maxPhase with per-phase duration array (ms).
   Pauses when the user clicks any step.
─────────────────────────────────────────────────────────────────────── */
function useInvoicePhaseCycle(durationsMs){
  const max = durationsMs.length;
  const [phase, setPhase] = React.useState(1);
  const [auto, setAuto] = React.useState(true);
  React.useEffect(()=>{
    if (!auto) return;
    const id = setTimeout(()=>{
      setPhase(p => p>=max ? 1 : p+1);
    }, durationsMs[phase-1] || 2400);
    return ()=> clearTimeout(id);
  }, [phase, auto, max, durationsMs]);
  const goto = (p)=>{ setAuto(false); setPhase(p); };
  return [phase, goto, auto, setAuto];
}

/* ── Dashboard frame — same chrome as the existing flow_anims panels ─── */
function FwPanel({ icon, title, subtitle, right, children, height=560 }){
  return (
    <div className="relative w-full rounded-3xl bg-white border border-slate-200/80 shadow-card-lg overflow-hidden font-sans"
         style={{height}}>
      <div className="px-3.5 py-2.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-lg grid place-items-center text-white shrink-0 shadow-glow"
               style={{background:'linear-gradient(135deg,#2a6cff,#3666ff)'}}>
            {icon}
          </div>
          <span className="text-[12px] font-bold text-slate-800">{title}</span>
          {subtitle && (<>
            <span className="text-slate-300 text-[10px]">/</span>
            <span className="text-[11px] font-medium text-slate-500">{subtitle}</span>
          </>)}
        </div>
        <div className="flex items-center gap-1.5">
          {right || (
            <div className="bg-slate-50 border border-slate-100 px-2 py-[2px] rounded-full flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" style={{animation:'fw-pulse 1.5s infinite'}}/>
              <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">Live</span>
            </div>
          )}
        </div>
      </div>
      <div className="relative" style={{height:'calc(100% - 41px)'}}>
        {children}
      </div>
    </div>
  );
}

/* ── Caption bar (consistent placement for the running explanation) ──── */
function FwCaption({ text, accent='#3666ff' }){
  return (
    <APIv mode="wait">
      <MI.div
        key={text}
        initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-6}}
        transition={{duration:0.35}}
        className="absolute left-5 right-5 bottom-4 px-3 py-2 rounded-xl flex items-center gap-2 bg-white border border-slate-200/80 shadow-sm z-30">
        <span className="size-1.5 rounded-full shrink-0" style={{background:accent, animation:'fw-pulse 1.4s infinite'}}/>
        <span className="text-[11.5px] text-slate-600 font-medium leading-snug">{text}</span>
      </MI.div>
    </APIv>
  );
}

/* ── AI floating bubble — used when AI flags something ───────────────── */
function FwAiBubble({ show, children, x, y, w=180 }){
  return (
    <APIv>
      {show && (
        <MI.div
          key="ai-bubble"
          initial={{opacity:0, scale:0.9, y:-4}}
          animate={{opacity:1, scale:1, y:0}}
          exit={{opacity:0, scale:0.9}}
          transition={{type:'spring', stiffness:200, damping:22}}
          className="absolute z-40 rounded-xl p-2 shadow-lg pointer-events-none"
          style={{
            left:x, top:y, width:w,
            background:'linear-gradient(135deg,#eef3ff 0%, #ffffff 100%)',
            border:'1px solid rgba(54,102,255,0.35)',
            backdropFilter:'blur(4px)',
          }}>
          <div className="flex items-center gap-1 text-brand font-bold mb-1 text-[9px] uppercase tracking-wider">
            <Sparkles size={10}/> FactWise AI
          </div>
          <div className="text-[10px] text-slate-700 leading-snug">{children}</div>
        </MI.div>
      )}
    </APIv>
  );
}

/* ── Scan line overlay (left→right or top→bottom) ────────────────────── */
function FwScanLine({ on, direction='down', color='#3666ff' }){
  if (!on) return null;
  const isVert = direction==='down' || direction==='up';
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      <div style={{
        position:'absolute',
        left: isVert ? 0 : '-2%',
        right: isVert ? 0 : 'auto',
        top: isVert ? '-2%' : 0,
        bottom: isVert ? 'auto' : 0,
        width: isVert ? '100%' : '40%',
        height: isVert ? '40%' : '100%',
        background: isVert
          ? `linear-gradient(to bottom, transparent 0%, ${color}22 40%, ${color}55 50%, ${color}22 60%, transparent 100%)`
          : `linear-gradient(to right, transparent 0%, ${color}22 40%, ${color}55 50%, ${color}22 60%, transparent 100%)`,
        animation: `fw-scanline 1.8s linear infinite`,
      }}/>
    </div>
  );
}

/* ── OCR field bracket — a tiny corner-bracket frame to "tag" a field ── */
function FwBracket({ on, color='#3666ff', children, style }){
  const s = 6, b = 2;
  return (
    <div className="relative inline-block" style={style}>
      {children}
      <MI.div
        initial={false}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration:0.25 }}
        className="absolute pointer-events-none"
        style={{ inset:-3 }}>
        {/* 4 corner brackets */}
        {[
          {top:0, left:0,    borderTop:`${b}px solid ${color}`, borderLeft:`${b}px solid ${color}`},
          {top:0, right:0,   borderTop:`${b}px solid ${color}`, borderRight:`${b}px solid ${color}`},
          {bottom:0, left:0, borderBottom:`${b}px solid ${color}`, borderLeft:`${b}px solid ${color}`},
          {bottom:0, right:0,borderBottom:`${b}px solid ${color}`, borderRight:`${b}px solid ${color}`},
        ].map((s,i)=>(
          <span key={i} style={{position:'absolute', width:8, height:8, ...s}}/>
        ))}
      </MI.div>
    </div>
  );
}

Object.assign(window, { FwCursor, useInvoicePhaseCycle, FwPanel, FwCaption, FwAiBubble, FwScanLine, FwBracket });

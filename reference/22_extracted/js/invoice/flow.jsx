/* ══════════════════════════════════════════════════════════════════════
   FLOW — text + step list on one side, animated dashboard on the other.
   Forked from the existing flow.jsx pattern but rewired to the new
   useInvoicePhaseCycle hook (per-phase durations).
══════════════════════════════════════════════════════════════════════ */
const { motion: MF, AnimatePresence: APF } = window.framerMotion;

function InvStepListItem({ title, isActive, isDone, onClick }){
  return (
    <div onClick={onClick}
         className={`relative flex items-center justify-between w-full rounded-2xl py-3 px-4 transition-all duration-300 group cursor-pointer overflow-hidden ${isActive
            ? 'bg-white border border-brand/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.015] z-10'
            : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'}`}>
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none"/>
      )}
      <div className="flex items-center gap-3.5 relative z-10 min-w-0">
        <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300 ${isActive
            ? 'border-brand bg-brand text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
            : isDone
                ? 'border-ok bg-ok text-white'
                : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-brand/50 group-hover:text-brand'
        }`}>
          <Check size={13} sw={3}/>
        </div>
        <span className={`text-[13px] font-bold tracking-tight leading-snug ${isActive ? 'text-brand' : isDone ? 'text-slate-700' : 'text-slate-500'}`}>
          {title}
        </span>
      </div>
      {isActive && (
        <span className="relative z-10 text-[9px] font-extrabold text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm shrink-0 ml-2">
          <span className="size-1.5 rounded-full bg-emerald-500" style={{animation:'fw-pulse 1.4s infinite'}}/>
          Live
        </span>
      )}
    </div>
  );
}

function InvFlowRow({ id, idx, eyebrow, titleA, titleB, body, steps, durations, anim:AnimComp, animFirst=false, kicker }){
  const [phase, goto] = useInvoicePhaseCycle(durations);

  const Text = (
    <div className="lg:col-span-6 space-y-5 text-left">
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-brand text-[11px] font-semibold uppercase tracking-[0.12em]">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" style={{animation:'fw-pulse 1.6s infinite'}}/>
        {eyebrow}
      </div>
      <h3 className="font-display text-[26px] md:text-[34px] font-semibold text-ink tracking-[-0.025em] leading-[1.15]">
        {titleA} <br/>
        <span className="text-brand">{titleB}</span>
      </h3>
      <div className="space-y-3">
        {body.map((p,i)=>(
          <p key={i} className="text-slate-500 text-[15px] leading-[1.65]">{p}</p>
        ))}
      </div>
      <div className="flex flex-col gap-1.5 mt-5">
        {steps.map((s,i)=>(
          <InvStepListItem key={i} title={s}
            isActive={phase===i+1} isDone={phase>i+1}
            onClick={()=>goto(i+1)}/>
        ))}
      </div>
      {kicker && (
        <div className="pt-2 text-[14px] font-semibold text-slate-700 italic">{kicker}</div>
      )}
    </div>
  );

  const Anim = (
    <div className="lg:col-span-6 relative">
      <AnimComp phase={phase}/>
    </div>
  );

  return (
    <section id={id} className="relative py-20 md:py-24 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="absolute top-8 right-8 hidden md:flex items-center gap-2 bg-white/80 backdrop-blur border border-slate-200/60 rounded-full px-3 py-1.5 shadow-sm">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand">0{idx} of 05</span>
        </div>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {animFirst ? <>{Anim}{Text}</> : <>{Text}{Anim}</>}
        </div>
      </div>
    </section>
  );
}

/* ── Intro hero for this chapter ─────────────────────────────────── */
function InvFlowIntro(){
  return (
    <section className="bg-white pt-28 pb-6 relative overflow-hidden">
      {/* Subtle grid backdrop */}
      <div className="absolute inset-0 fw-grid-bg pointer-events-none"/>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 relative">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-brand text-[11px] font-semibold uppercase tracking-[0.12em] mb-6">
          Chapter 03 · The Invoice → Payment journey
        </div>
        <h2 className="font-display text-[36px] md:text-[52px] font-semibold text-ink mb-5 tracking-[-0.03em] leading-[1.05] max-w-5xl">
          From the moment an invoice is raised <br/>
          <span className="text-brand">to the moment payment is made.</span>
        </h2>
        <p className="text-[17px] md:text-[18px] text-slate-500 font-normal max-w-2xl leading-[1.6]">
          AI on the inbound. Receipts and QC at the line item. Quadruple validation before a single rupee moves.
          Total visibility for every stakeholder, every step of the way.
        </p>

        {/* Quick nav strip — 5 anchor pills */}
        <div className="flex flex-wrap gap-2 mt-8">
          {[
            {n:'3.1', t:'Invoice processing'},
            {n:'3.2', t:'Goods receipt'},
            {n:'3.3', t:'Quality control'},
            {n:'3.4', t:'Payment validation'},
            {n:'3.5', t:'Full visibility'},
          ].map((p,i)=>(
            <a key={p.n} href={`#inv-${i+1}`}
               className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-brand/50 hover:bg-blue-50/50 transition text-[11.5px]">
              <span className="font-mono font-bold text-brand">{p.n}</span>
              <span className="text-slate-600 group-hover:text-sub">{p.t}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The full chapter ────────────────────────────────────────────── */
function InvToPayFlow(){
  // Per-phase durations (ms) — gives slow phases enough breathing room
  const D5_short = [3000, 3200, 3500, 3500, 3500];
  const D5_med   = [3000, 3200, 3500, 3500, 4000];
  const D5_long  = [3000, 3200, 3200, 3200, 4500];

  return (
    <>
      <InvFlowIntro/>

      <InvFlowRow id="inv-1" idx="01"
        eyebrow="3.1 · AI Invoice Processing"
        titleA="Zero Manual Entry."
        titleB="Every Invoice Structured."
        body={[
          'Vendors can create invoices directly on FactWise against any PO — structured, trackable, and instantly visible to your team. And for vendors who already have their own invoice format, FactWise\u2019s AI does the work.',
          'Scan and upload any invoice in any format — our AI reads, interprets, and creates it on the platform automatically. The moment an invoice lands, FactWise\u2019s AI flags any discrepancies against the PO automatically — so nothing slips through from the very first step.',
        ]}
        steps={[
          'Two channels open · vendor portal & AI upload',
          'Drop any format · AI picks it up the moment it lands',
          'AI extracts every field with confidence scores',
          'Cross-checks against the PO · discrepancies flagged',
          'Multiple invoices per PO supported · all structured',
        ]}
        durations={D5_med}
        kicker="Every invoice in. Instantly processed. Automatically verified."
        anim={Anim1InvoiceIntake}/>

      <InvFlowRow id="inv-2" idx="02"
        eyebrow="3.2 · Goods Receipt"
        titleA="Track Every Delivery."
        titleB="Record Every Discrepancy."
        body={[
          'Against any invoice or directly against a PO, your team can create goods receipts on the platform — uploading attachments, recording received quantities, and flagging rejected items in real time.',
          'Partial deliveries, short shipments, damaged goods — every discrepancy is captured at the line item level the moment it happens. FactWise\u2019s AI cross-checks every goods receipt against the original invoice and PO automatically.',
        ]}
        steps={[
          'Delivery arrives at the dock · ready to receive',
          'Tap each package to scan · qty updates live',
          'Partial deliveries supported at the line level',
          'Damaged on arrival? Flagged on the spot',
          'AI three-way check · PO · Invoice · GR',
        ]}
        durations={D5_short}
        kicker="Receive accurately. Record everything. Miss nothing."
        anim={Anim2GoodsReceipt} animFirst/>

      <InvFlowRow id="inv-3" idx="03"
        eyebrow="3.3 · Quality Control"
        titleA="Quality Checks On Platform."
        titleB="Nothing Slips Through."
        body={[
          'FactWise supports multiple levels of quality checks — primary, secondary, and production line — all done on the platform, against any invoice or goods receipt. Your QC team records accepted and rejected quantities at every stage, with full attachment support.',
          'Quantities are validated at each checkpoint and updated in real time. FactWise\u2019s AI flags any quantity discrepancies between QC outcomes and goods receipts automatically — so rejected items are tracked, actioned, and never paid for.',
        ]}
        steps={[
          'Inspection lot staged · 500u inbound',
          'Primary QC fires · visual & dimensional',
          'Secondary QC · functional pass',
          'Production-line QC · final inline gate',
          'AI reconciles QC vs GR · credits computed',
        ]}
        durations={D5_med}
        kicker="Every item checked. Every outcome tracked. Always."
        anim={Anim3QCPipeline}/>

      <InvFlowRow id="inv-4" idx="04"
        eyebrow="3.4 · Payment Automation"
        titleA="Automate Payments."
        titleB="Pay Only What You Owe."
        body={[
          'FactWise gives your finance team complete flexibility — pay for a single line item, a full invoice, or consolidate multiple invoices from one vendor into a single payment. Credit logic for rejected quantities is built in automatically.',
          'Every payment is backed by quadruple validation — matched automatically against the PO, goods receipt, quality check, and contract terms before a single rupee moves. Teams using FactWise recover up to 5% in costs previously lost to payment errors.',
        ]}
        steps={[
          'Select invoices for the same vendor',
          'Consolidate 3 → 1 transfer · single approval',
          'Click approve · quadruple validation spins up',
          'PO · GR · QC · Contract — all four turn green',
          'Auto-credit for rejected qty · ~5% recovered',
        ]}
        durations={D5_long}
        kicker="Pay for what you buy. Never for what you reject."
        anim={Anim4PaymentValidate} animFirst/>

      <InvFlowRow id="inv-5" idx="05"
        eyebrow="3.5 · Total Visibility"
        titleA="Total Visibility."
        titleB="From Invoice to Payment."
        body={[
          'From the moment an invoice is raised to the moment payment is made, FactWise gives every stakeholder complete visibility into exactly what happened — GR status, QC outcomes, AI-flagged discrepancies, approval records, payment history, and any terminations.',
          'All tracked at the line item level. No more chasing updates. No more wondering where an invoice stands. Every rupee accounted for, every step of the way.',
        ]}
        steps={[
          'Macro view · invoice just raised',
          'Scrubber walks through GR · QC · validation',
          'Reaches Payment Made · chain fully green',
          'Drill into line-item level · 4 parallel tracks',
          'Click a flagged event · full audit drawer opens',
        ]}
        durations={D5_long}
        kicker="Total visibility. From invoice to payment."
        anim={Anim5VisibilityTimeline}/>
    </>
  );
}

window.InvToPayFlow = InvToPayFlow;

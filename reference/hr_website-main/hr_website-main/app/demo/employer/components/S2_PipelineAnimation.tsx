'use client'
import { useEffect } from 'react'

const HTML = `<div style="background:#112036" id="pipe-animation">
  <div class="wrap" style="padding-top:64px;padding-bottom:64px;overflow:visible;"><style>@media(max-width:640px){#pipe-animation .lead{font-size:14px!important;line-height:1.6!important}#pipe-animation .h2{font-size:clamp(26px,7vw,38px)!important}}</style>
    <div class="reveal" style="max-width:980px;margin-bottom:28px;">
      <div class="eyebrow"><div class="ey-line"></div>End-to-End Employer Workflow</div>
      <h2 class="h2">Post a job. Get a hire.<br><em>AI handles everything between.</em></h2>
      <p class="lead" style="max-width:none;margin-bottom:48px">From JD to offer accepted — every stage automated, every decision yours to override.</p>
    </div>
    <div class="pipe-outer">
      <div id="hrops-pipe-root"></div>
    </div>
  </div>
</div>`

const SCRIPT = `(function(){
'use strict';
var __pipeRunId = (window.__hropsPipeRunId || 0) + 1;
window.__hropsPipeRunId = __pipeRunId;

/* --- HR Ops Employer Pipeline Animation ------------------------------------
   Pure vanilla JS. No dependencies. Mounts into #hrops-pipe-root.
   Linear pipeline: JD → AI Screen → HR Review → Interview → Offer → Hired
   Animated dots travel left→right between stage nodes on a canvas overlay.
   Progress dots + metrics rendered below.
---------------------------------------------------------------------------- */

const ROOT = document.getElementById('hrops-pipe-root');
if (!ROOT) { return; }

// -- Colours ------------------------------------------------------------------
const C = {
  navy:    '#0B1628',
  navyMid: '#1A3A6B',
  gold:    '#C49A3C',
  green:   '#18B87A',
  blue:    '#3470F0',
  purple:  '#7C3AED',
  orange:  '#EA580C',
};

// -- Timeline -----------------------------------------------------------------
// Pattern: node_active (card expands, work happens) → dot_travel (candidate moves)
const PHASES = [
  { id:'jd_active',      dur:3200, dot:null },
  { id:'dot_jd_ai',      dur:800,  dot:{ from:'jd',        to:'ai',        color:C.blue   } },
  { id:'ai_active',      dur:3000, dot:null },
  { id:'dot_ai_hr',      dur:800,  dot:{ from:'ai',        to:'hr',        color:C.gold   } },
  { id:'hr_active',      dur:3000, dot:null },
  { id:'dot_hr_int',     dur:800,  dot:{ from:'hr',        to:'interview', color:C.navyMid} },
  { id:'int_active',     dur:3200, dot:null },
  { id:'dot_int_off',    dur:800,  dot:{ from:'interview', to:'offer',     color:C.purple } },
  { id:'offer_active',   dur:2800, dot:null },
  { id:'dot_off_hired',  dur:800,  dot:{ from:'offer',     to:'hired',     color:C.green  } },
  { id:'hired_active',   dur:1600, dot:null },
  { id:'done',           dur:3600, dot:null },
];

let _tAcc = 0;
const TL = PHASES.map(p => { const s = _tAcc; _tAcc += p.dur; return { ...p, start:s, end:_tAcc }; });
const LOOP = _tAcc;

function getPhase(ms) {
  const m = ms % LOOP;
  return TL.find(p => m >= p.start && m < p.end) || TL[0];
}
function phaseIdx(id) { return TL.findIndex(p => p.id === id); }

// -- Stage order for completion tracking --------------------------------------
const STAGE_ORDER = ['jd_active','ai_active','hr_active','int_active','offer_active','hired_active'];

// -- SVG icons ----------------------------------------------------------------
const icon = {
  jd:        c => \`<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 2a1 1 0 0 1 1-1h5l4 4v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2z" stroke="\${c}" stroke-width="1.4"/><path d="M9 1v4h4" stroke="\${c}" stroke-width="1.2" stroke-linecap="round"/><path d="M5 8h6M5 11h4" stroke="\${c}" stroke-width="1.2" stroke-linecap="round"/></svg>\`,
  ai:        c => \`<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="\${c}" stroke-width="1.4"/><path d="M5 6h6M5 8.5h4M5 11h6" stroke="\${c}" stroke-width="1.2" stroke-linecap="round"/></svg>\`,
  hr:        c => \`<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.5" stroke="\${c}" stroke-width="1.4"/><path d="M2.5 14c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" stroke="\${c}" stroke-width="1.4" stroke-linecap="round"/></svg>\`,
  interview: c => \`<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="5" cy="5" r="2" stroke="\${c}" stroke-width="1.3"/><circle cx="11" cy="5" r="2" stroke="\${c}" stroke-width="1.3"/><path d="M1 14c0-2.2 1.8-4 4-4M11 10c2.2 0 4 1.8 4 4" stroke="\${c}" stroke-width="1.3" stroke-linecap="round"/></svg>\`,
  offer:     c => \`<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="\${c}" stroke-width="1.4"/><path d="M1.5 6l6.5 4 6.5-4" stroke="\${c}" stroke-width="1.3" stroke-linecap="round"/></svg>\`,
  hired:     c => \`<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="\${c}" stroke-width="1.4"/><path d="M5 8l2.5 2.5 4-4" stroke="\${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\`,
  tick:      ()=> \`<svg width="6" height="6" viewBox="0 0 8 7" fill="none"><path d="M1 3.5l2 2 4-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>\`,
  tick_md:   ()=> \`<svg width="8" height="8" viewBox="0 0 10 9" fill="none"><path d="M1.5 4.5l2.5 3 4.5-6" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>\`,
  arrow:     c => \`<svg width="10" height="8" viewBox="0 0 12 10" fill="none"><path d="M2 5h8M7 2l3 3-3 3" stroke="\${c}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>\`,
};

// -- Primitive builders -------------------------------------------------------
function progBar(pct, color) {
  return \`<div style="height:3px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden">
    <div style="height:100%;border-radius:3px;background:\${color};width:\${pct}%;transition:width 0.4s linear;box-shadow:0 0 5px \${color}55"></div>
  </div>\`;
}

function checkCircle(done, color) {
  return \`<div style="width:12px;height:12px;border-radius:50%;flex-shrink:0;background:\${done ? color : 'transparent'};border:1.5px solid \${done ? color : 'rgba(255,255,255,0.2)'};display:flex;align-items:center;justify-content:center">
    \${done ? icon.tick() : ''}
  </div>\`;
}

function labelRow(label, value, done, color) {
  return \`<div style="display:flex;align-items:center;gap:7px;opacity:\${done ? 1 : 0.28};transition:opacity 0.35s">
    \${checkCircle(done, color)}
    <span style="font-size:9px;color:rgba(255,255,255,0.45);font-family:'Geist',sans-serif;width:44px;flex-shrink:0">\${label}</span>
    <span style="font-size:9.5px;font-weight:600;color:\${done ? '#fff' : 'rgba(255,255,255,0.2)'};font-family:'JetBrains Mono',monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${value}</span>
  </div>\`;
}

function chip(name, sub, iconSvg, done, dimmed, color) {
  const w = IS_MOBILE ? 'fit-content' : Math.round(CW * 0.875) + 'px';
  const nameSz = IS_MOBILE ? '13px' : '10.5px';
  const subSz  = IS_MOBILE ? '11px' : '8.5px';
  const pad    = IS_MOBILE ? '12px 14px' : '9px 12px';
  const iconSz = IS_MOBILE ? '32px' : '26px';
  const minW   = IS_MOBILE ? 'min-width:200px;' : '';
  const borderCol = done ? C.green + '44' : 'rgba(255,255,255,0.09)';
  return \`<div style="background:#16284A;border-radius:11px;border:1.5px solid \${borderCol};padding:\${pad};display:flex;align-items:center;gap:8px;width:\${w};\${minW}opacity:\${dimmed ? 0.3 : 1};transition:opacity 0.5s">
    <div style="width:\${iconSz};height:\${iconSz};border-radius:7px;flex-shrink:0;background:\${done ? C.green + '14' : 'rgba(255,255,255,0.06)'};display:flex;align-items:center;justify-content:center">\${iconSvg}</div>
    <div style="flex:1;min-width:0">
      <div style="font-size:\${nameSz};font-weight:700;color:\${done ? C.green : '#EEF2FF'};font-family:'Geist',sans-serif;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${name}</div>
      <div style="font-size:\${subSz};color:#8FA3C0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">\${sub}</div>
    </div>
    \${done ? \`<div style="width:16px;height:16px;border-radius:50%;background:\${C.green};flex-shrink:0;display:flex;align-items:center;justify-content:center">\${icon.tick_md()}</div>\` : ''}
  </div>\`;
}

function cardOpen(color, body) {
  const w   = IS_MOBILE ? 'fit-content' : Math.round(CW * 0.908) + 'px';
  const minW = IS_MOBILE ? 'min-width:260px;' : '';
  const pad = IS_MOBILE ? '16px 16px 14px' : '14px 14px 12px';
  return \`<div style="background:#16284A;border-radius:13px;border:1.5px solid \${color}44;box-shadow:0 0 0 3px \${color}0a,0 8px 24px \${color}14;padding:\${pad};position:relative;width:\${w};\${minW}">
    <div style="position:absolute;top:0;left:0;right:0;height:2.5px;background:linear-gradient(90deg,\${color},\${color}77);border-radius:13px 13px 0 0"></div>
    \${body}
  </div>\`;
}

function cardHead(iconSvg, bgColor, name, sub) {
  const nameSz = IS_MOBILE ? '13px' : '10.5px';
  const subSz  = IS_MOBILE ? '11px' : '8.5px';
  const iconSz = IS_MOBILE ? '32px' : '26px';
  return \`<div style="display:flex;align-items:center;gap:8px;margin-bottom:\${IS_MOBILE ? '7px' : '10px'}">
    <div style="width:\${iconSz};height:\${iconSz};border-radius:7px;flex-shrink:0;background:\${bgColor};border:1px solid \${bgColor.replace('0.15','0.3')};display:flex;align-items:center;justify-content:center">\${iconSvg}</div>
    <div>
      <div style="font-size:\${nameSz};font-weight:700;font-family:'Geist',sans-serif;color:#EEF2FF">\${name}</div>
      <div style="font-size:\${subSz};color:#8FA3C0">\${sub}</div>
    </div>
  </div>\`;
}

function mono(text) {
  const sz = IS_MOBILE ? '7px' : '8px';
  return \`<div style="font-size:\${sz};color:rgba(255,255,255,0.3);font-family:'JetBrains Mono',monospace;margin-bottom:7px;letter-spacing:0.4px">\${text}</div>\`;
}

// -- Stage renderers ----------------------------------------------------------

function renderJD(phaseId, ms) {
  const i    = phaseIdx(phaseId);
  const open = phaseId === 'jd_active';
  const done = i > phaseIdx('jd_active');
  const dim  = !open && !done;

  if (!open) return chip('Job Description', 'Sr. Backend Eng', icon.jd(done ? C.green : C.blue), done, dim, C.blue);

  const totalMs = 3000;
  const pct = Math.min(100, (ms / totalMs) * 100);
  const f = [ms > 600, ms > 1200, ms > 1800, ms > 2400];

  return cardOpen(C.blue, \`
    \${cardHead(icon.jd(C.blue), 'rgba(52,112,240,0.18)', 'Ananya Singh', 'Creating JD')}
    <div style="background:#1B3057;border:1px solid rgba(255,255,255,0.07);border-radius:7px;padding:7px 9px;margin-bottom:9px">
      <div style="font-size:9px;font-weight:600;color:#EEF2FF;margin-bottom:3px">JD_SrBackendEng_2026.pdf</div>
      \${progBar(pct, C.blue)}
      <div style="font-size:7.5px;color:#8FA3C0;margin-top:2px">\${pct >= 100 ? 'Published to portal' : 'Building JD...'}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:5px">
      \${labelRow('Role',   'Sr. Backend Eng', f[0], C.blue)}
      \${labelRow('Level',  'IC4 · 5-8 yrs',   f[1], C.blue)}
      \${labelRow('Skills', 'Go, Kafka, AWS',   f[2], C.blue)}
      \${labelRow('Budget', '₹22L–₹28L CTC',    f[3], C.blue)}
    </div>\`);
}

function renderAI(phaseId, ms) {
  const i    = phaseIdx(phaseId);
  const open = phaseId === 'ai_active';
  const done = i > phaseIdx('ai_active');
  const dim  = !open && !done && i < phaseIdx('jd_active');

  if (!open) return chip('AI Screening', '347 applications', icon.ai(done ? C.green : C.gold), done, dim, C.gold);

  const n = Math.min(6, Math.floor(ms / 440) + 1);
  const items = ['JD requirement match','Experience validation','Duplicate detection','Skill gap analysis','Salary range fit','Confidence score'];
  const score = ms > 2600 ? 92 : null;

  return cardOpen(C.gold, \`
    \${cardHead(icon.ai(C.gold), 'rgba(196,154,60,0.18)', 'AI Screening', '347 applications')}
    \${mono('GEMINI 2.0 FLASH · ' + n + '/6 SIGNALS')}
    \${progBar(n / 6 * 100, C.gold)}
    <div style="margin-top:7px;display:flex;flex-direction:column;gap:4px">
      \${items.map((t,i) => \`<div style="display:flex;align-items:center;gap:7px;opacity:\${i<n?1:0.2};transition:opacity 0.3s">\${checkCircle(i<n,C.gold)}<span style="font-size:9px;color:rgba(255,255,255,0.75);flex:1">\${t}</span>\${i<n?\`<span style="font-size:7.5px;color:\${C.gold};font-family:'JetBrains Mono',monospace">Pass</span>\`:''}</div>\`).join('')}
    </div>
    \${score !== null ? \`<div style="margin-top:8px;padding:6px 9px;border-radius:7px;background:\${C.gold}14;border:1px solid \${C.gold}28;display:flex;justify-content:space-between;align-items:center"><span style="font-size:9px;font-weight:600;color:\${C.gold}">Top match score</span><span style="font-size:16px;font-weight:800;color:\${C.gold};font-family:'JetBrains Mono',monospace">\${score}/100</span></div>\` : ''}\`);
}

function renderHR(phaseId, ms) {
  const i    = phaseIdx(phaseId);
  const open = phaseId === 'hr_active';
  const done = i > phaseIdx('hr_active');
  const dim  = !open && !done && i < phaseIdx('jd_active');

  if (!open) return chip('HR Review', 'Ananya Singh', icon.hr(done ? C.green : C.navyMid), done, dim, C.navyMid);

  const r1 = Math.max(0, Math.min(1, (ms - 250) / 700));
  const r2 = Math.max(0, Math.min(1, (ms - 1000) / 700));
  const ap = ms > 2100;
  const cands = [
    { n:'Priya Sharma', e:'6 yrs · Backend',  s:92, c:C.green,  v:'Proceed' },
    { n:'Rahul Mehta',  e:'4 yrs · Backend',   s:64, c:C.gold,   v:'Maybe'   },
  ];

  return cardOpen(C.navyMid, \`
    \${cardHead(icon.hr(C.navyMid), 'rgba(26,58,107,0.25)', 'Ananya Singh', 'Reviewing shortlist')}
    \${mono('AI-SCREENED · 2 OF 18 PROCEED')}
    <div style="display:flex;flex-direction:column;gap:5px">
      \${cands.map((cd, i) => \`
        <div style="background:#1B3057;border:1px solid \${ap && i===0 ? C.green+'44' : 'rgba(255,255,255,0.07)'};border-radius:7px;padding:7px 9px;opacity:\${i===0 ? Math.max(0.18,r1) : Math.max(0.12,r2)};transition:opacity 0.35s,border-color 0.4s">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
            <div><div style="font-size:9.5px;font-weight:700;color:#EEF2FF">\${cd.n}</div><div style="font-size:8px;color:#8FA3C0">\${cd.e}</div></div>
            <div style="text-align:right"><div style="font-size:7.5px;color:#8FA3C0">Score</div><div style="font-size:14px;font-weight:800;color:\${cd.c};font-family:'JetBrains Mono',monospace;line-height:1">\${cd.s}</div></div>
          </div>
          \${progBar((i===0 ? r1 : r2) * cd.s, cd.c)}
          <div style="font-size:7.5px;color:\${cd.c};font-weight:600;margin-top:2px">\${cd.v}</div>
        </div>\`).join('')}
    </div>
    <div style="height:26px;border-radius:7px;margin-top:7px;display:flex;align-items:center;justify-content:center;gap:5px;background:\${ap ? C.green+'14' : C.navyMid};border:1px solid \${ap ? C.green+'30' : 'transparent'};transition:all 0.5s;opacity:\${ms > 1700 ? 1 : 0.1}">
      \${ap
        ? \`<div style="width:12px;height:12px;border-radius:50%;background:\${C.green};display:flex;align-items:center;justify-content:center">\${icon.tick()}</div><span style="font-size:9px;font-weight:600;color:\${C.green}">Priya approved → Interview</span>\`
        : \`<span style="font-size:9px;font-weight:600;color:#fff">Proceed with Priya?</span>\`}
    </div>\`);
}

function renderInterview(phaseId, ms) {
  const i    = phaseIdx(phaseId);
  const open = phaseId === 'int_active';
  const done = i > phaseIdx('int_active');
  const dim  = !open && !done && i < phaseIdx('jd_active');

  if (!open) return chip('Panel Interview', 'Arjun Kapoor', icon.interview(done ? C.green : C.orange), done, dim, C.orange);

  const sf     = [ms > 400, ms > 900, ms > 1400, ms > 2000];
  const scores = [8, 7, 8, 9];
  const labels = ['Technical depth', 'System design', 'Problem solving', 'Communication'];

  return cardOpen(C.orange, \`
    \${cardHead(icon.interview(C.orange), 'rgba(234,88,12,0.15)', 'Arjun Kapoor', 'Technical Interview')}
    \${mono('PANEL FEEDBACK · PRIYA SHARMA')}
    <div style="display:flex;flex-direction:column;gap:7px">
      \${labels.map((l, i) => \`
        <div style="opacity:\${sf[i] ? 1 : 0.15};transition:opacity 0.4s">
          <div style="display:flex;justify-content:space-between;margin-bottom:3px">
            <span style="font-size:9.5px;color:#EEF2FF;font-family:'Geist',sans-serif">\${l}</span>
            <span style="font-size:9.5px;font-weight:700;color:\${C.orange};font-family:'JetBrains Mono',monospace">\${scores[i]}/10</span>
          </div>
          \${progBar(scores[i] * 10, C.orange)}
        </div>\`).join('')}
    </div>
    \${sf[3] ? \`<div style="margin-top:9px;padding:6px 9px;border-radius:7px;background:\${C.orange}0f;border:1px solid \${C.orange}28;display:flex;justify-content:space-between;align-items:center"><span style="font-size:9.5px;font-weight:600;color:\${C.orange}">Strong Hire</span><span style="font-size:14px;font-weight:800;color:\${C.orange};font-family:'JetBrains Mono',monospace">8.0/10</span></div>\` : ''}\`);
}

function renderOffer(phaseId, ms) {
  const i    = phaseIdx(phaseId);
  const open = phaseId === 'offer_active';
  const done = i > phaseIdx('offer_active');
  const dim  = !open && !done && i < phaseIdx('jd_active');

  if (!open) return chip('Offer', 'Magic Link sent', icon.offer(done ? C.green : C.purple), done, dim, C.purple);

  const sh = ms > 300, det = ms > 800, acc = ms > 1900;
  const rows = [['Role','Sr. Backend Eng',true],['CTC','₹24,00,000 p.a.',det],['Joining','1 Apr 2026',det],['Comm.','₹2.16L (9%)',det]];

  return cardOpen(C.purple, \`
    \${cardHead(icon.offer(C.purple), 'rgba(124,58,237,0.15)', 'Priya Sharma', 'Offer via Magic Link')}
    \${mono('OFFER LETTER · NO LOGIN REQUIRED')}
    <div style="background:#1B3057;border:1px solid rgba(255,255,255,0.07);border-radius:7px;padding:8px 10px;margin-bottom:8px;opacity:\${sh ? 1 : 0.1};transition:opacity 0.5s">
      \${rows.map(([l,v,s], i) => \`<div style="display:flex;justify-content:space-between;padding:3px 0;\${i > 0 ? 'border-top:1px solid rgba(255,255,255,0.07)' : ''};opacity:\${s ? 1 : 0.2};transition:opacity 0.4s"><span style="font-size:8.5px;color:#8FA3C0">\${l}</span><span style="font-size:9px;font-weight:600;color:#EEF2FF;font-family:'JetBrains Mono',monospace">\${v}</span></div>\`).join('')}
    </div>
    <div style="height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;gap:5px;background:\${acc ? C.green+'14' : C.purple};border:1px solid \${acc ? C.green+'30' : 'transparent'};transition:all 0.5s;opacity:\${sh ? 1 : 0}">
      \${acc
        ? \`<div style="width:12px;height:12px;border-radius:50%;background:\${C.green};display:flex;align-items:center;justify-content:center">\${icon.tick()}</div><span style="font-size:9px;font-weight:600;color:\${C.green}">Offer Accepted</span>\`
        : \`<span style="font-size:9px;font-weight:600;color:#fff">Accept Offer?</span>\`}
    </div>\`);
}

function renderHired(phaseId, ms) {
  const i    = phaseIdx(phaseId);
  const open = phaseId === 'hired_active';
  const done = phaseId === 'done';
  const dim  = !open && !done && i < phaseIdx('jd_active');

  if (!open && !done) return chip('Hired', 'Awaiting...', icon.hired('rgba(255,255,255,0.2)'), false, dim, C.green);

  const w = IS_MOBILE ? 'fit-content' : Math.round(CW*0.908) + 'px';
  const minW = IS_MOBILE ? 'min-width:260px;' : '';
  return \`<div style="background:\${C.navy};border-radius:13px;border:1.5px solid \${C.green}44;box-shadow:0 0 0 3px \${C.green}0a,0 8px 24px \${C.green}14;padding:14px 14px 12px;position:relative;width:\${w};\${minW}">
    <div style="position:absolute;top:0;left:0;right:0;height:2.5px;background:linear-gradient(90deg,\${C.green},\${C.green}77);border-radius:13px 13px 0 0"></div>
    <div style="padding:8px 10px;border-radius:7px;background:rgba(24,184,122,0.18);border:1px solid rgba(24,184,122,0.35)">
      <div style="font-size:10.5px;font-weight:700;color:#4ade80;margin-bottom:2px">Hired successfully</div>
      <div style="font-size:8px;color:rgba(255,255,255,0.35);font-family:'JetBrains Mono',monospace">₹24L CTC · Priya Sharma · 1 Apr 2026</div>
    </div>
  </div>\`;
}

// -- Canvas dot travel --------------------------------------------------------
function paintDot(canvas, wrapEl, nodes, dot, ms, dur) {
  if (!canvas || !wrapEl || !dot) return;
  const wr  = wrapEl.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = wr.width  * dpr;
  canvas.height = wr.height * dpr;
  canvas.style.width  = wr.width  + 'px';
  canvas.style.height = wr.height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, wr.width, wr.height);
  const fEl = nodes[dot.from], tEl = nodes[dot.to];
  if (!fEl || !tEl) return;
  const fR = fEl.getBoundingClientRect(), tR = tEl.getBoundingClientRect();
  const fx = fR.left + fR.width  / 2 - wr.left;
  const fy = fR.top  + fR.height / 2 - wr.top;
  const tx = tR.left + tR.width  / 2 - wr.left;
  const ty = tR.top  + tR.height / 2 - wr.top;
  const raw = Math.min(1, ms / dur);
  const e   = raw < 0.5 ? 2*raw*raw : 1 - Math.pow(-2*raw+2, 2)/2;
  const cx  = fx + (tx-fx)*e, cy = fy + (ty-fy)*e;
  const op  = raw < 0.1 ? raw/0.1 : raw > 0.9 ? (1-raw)/0.1 : 1;
  const hx  = dot.color.replace('#','');
  const r   = parseInt(hx.slice(0,2),16), g = parseInt(hx.slice(2,4),16), b = parseInt(hx.slice(4,6),16);
  for (let i = 3; i >= 1; i--) {
    const tr = Math.max(0, raw - i*0.06);
    const te = tr < 0.5 ? 2*tr*tr : 1 - Math.pow(-2*tr+2,2)/2;
    ctx.beginPath();
    ctx.arc(fx+(tx-fx)*te, fy+(ty-fy)*te, 3-i*0.5, 0, Math.PI*2);
    ctx.fillStyle = \`rgba(\${r},\${g},\${b},\${op*(0.25-i*0.06)})\`;
    ctx.fill();
  }
  const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,14);
  glow.addColorStop(0, \`rgba(\${r},\${g},\${b},\${op*0.25})\`);
  glow.addColorStop(1, \`rgba(\${r},\${g},\${b},0)\`);
  ctx.beginPath(); ctx.arc(cx,cy,14,0,Math.PI*2); ctx.fillStyle=glow; ctx.fill();
  ctx.beginPath(); ctx.arc(cx,cy,3.5,0,Math.PI*2); ctx.fillStyle=\`rgba(\${r},\${g},\${b},\${op})\`; ctx.fill();
  ctx.beginPath(); ctx.arc(cx,cy,1.5,0,Math.PI*2); ctx.fillStyle=\`rgba(255,255,255,\${op*0.9})\`; ctx.fill();
}

// -- SVG connector lines between pipeline nodes (desktop) --------------------
function drawPipelineLines(nodeIds, wrapId) {
  const svg = document.getElementById('pipe-lines-svg');
  const wrap = document.getElementById(wrapId);
  if (!svg || !wrap) return;
  const wr = wrap.getBoundingClientRect();
  svg.style.width  = wr.width  + 'px';
  svg.style.height = wrap.offsetHeight + 'px';
  svg.setAttribute('viewBox', \`0 0 \${wr.width} \${wrap.offsetHeight}\`);
  svg.setAttribute('width',  wr.width);
  svg.setAttribute('height', wrap.offsetHeight);

  function mid(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width/2 - wr.left, y: r.top + r.height/2 - wr.top };
  }

  let lines = '';
  for (let i = 0; i < nodeIds.length - 1; i++) {
    const elA = document.getElementById(nodeIds[i]);
    const elB = document.getElementById(nodeIds[i+1]);
    if (!elA || !elB) continue;
    const rA = elA.getBoundingClientRect();
    const rB = elB.getBoundingClientRect();
    // Use right edge of card A and left edge of card B (with 4px gap)
    const x1 = rA.right  - wr.left - 4;
    const y1 = rA.top + rA.height / 2 - wr.top;
    const x2 = rB.left   - wr.left + 4;
    const y2 = rB.top + rB.height / 2 - wr.top;
    lines += \`<line x1="\${x1}" y1="\${y1}" x2="\${x2}" y2="\${y2}"
      stroke="#C49A3C" stroke-width="1.5" stroke-dasharray="4 4"
      opacity="0.25" stroke-linecap="round"/>\`;
  }
  svg.innerHTML = lines;
}

// -- Stage progress labels ----------------------------------------------------
const STAGE_LABELS = ['JD Created','AI Screening','HR Review','Interview','Offer Sent','Hired'];
const STAGE_PHASE_MAP = {
  jd_active:0, dot_jd_ai:0,
  ai_active:1, dot_ai_hr:1,
  hr_active:2, dot_hr_int:2,
  int_active:3, dot_int_off:3,
  offer_active:4, dot_off_hired:4,
  hired_active:5, done:5,
};

const METRICS = [
  { l:'Time to screen',  was:'2 days',  now:'4 mins'  },
  { l:'Manual reviews',  was:'347',     now:'0'        },
  { l:'Offer accepted',  was:'52%',     now:'87%'      },
  { l:'Panel alignment', was:'varies',  now:'scored'   },
];

// -- Cell sizing --------------------------------------------------------------
let CW = 200, CH = 160, IS_MOBILE = false, CARD_W = 100;

function updateCellSize() {
  const rootW = ROOT.getBoundingClientRect().width;
  IS_MOBILE = rootW < 640;
  if (IS_MOBILE) {
    // Single column vertical — full width minus padding
    const avail = rootW - 32;
    CARD_W = Math.max(260, Math.min(500, avail));
    CW = CARD_W;
    CH = Math.round(CW * (160/200));
  } else {
    // 6 nodes in a row — need tighter cards
    CW = Math.max(110, Math.min(200, Math.floor(rootW / 6)));
    CH = Math.round(CW * (220/200));
  }
}

// -- Main render loop ---------------------------------------------------------
function render(now) {
  if (window.__hropsPipeRunId !== __pipeRunId) return;
  updateCellSize();

  if (!render.t0) render.t0 = now;
  const elapsed  = now - render.t0;
  const phase    = getPhase(elapsed);
  const phaseId  = phase.id;
  const phaseMs  = (elapsed % LOOP) - phase.start;
  const curStage = STAGE_PHASE_MAP[phaseId] ?? 0;
  const isDone   = phaseId === 'done';

  const cellSt = \`width:\${CW}px;height:\${CH}px;display:flex;align-items:center;justify-content:center;overflow:visible\`;
  const wrapW = IS_MOBILE ? '100%' : CW * 6 + 'px';

  // Progress dots strip
  const dotsHtml = STAGE_LABELS.map((lbl, idx) => {
    const a = idx === curStage, p = idx < curStage;
    const dotSz = IS_MOBILE ? (a?10:7) : (a?8:5);
    const lblSz = IS_MOBILE ? '11px' : '9px';
    return \`<div style="display:flex;flex-direction:column;align-items:center;gap:3px">
      <div style="width:\${dotSz}px;height:\${dotSz}px;border-radius:50%;background:\${a ? C.gold : p ? C.green : 'rgba(255,255,255,0.18)'};box-shadow:\${a ? '0 0 0 3px rgba(196,154,60,0.22)' : 'none'};transition:all 0.4s"></div>
      <div style="font-size:\${lblSz};color:\${a ? C.gold : p ? C.green : 'rgba(255,255,255,0.36)'};font-family:'Geist',sans-serif;font-weight:\${a ? 700 : 500};letter-spacing:0.18px;white-space:nowrap">\${lbl}</div>
    </div>\`;
  }).join('');

  // Metrics row
  const metricsHtml = METRICS.map(m => \`
    <div style="background:#16284A;border:1px solid rgba(255,255,255,0.08);border-radius:9px;padding:11px 12px">
      <div style="font-size:8.5px;font-family:'JetBrains Mono',monospace;color:#8FA3C0;letter-spacing:0.7px;text-transform:uppercase;margin-bottom:6px">\${m.l}</div>
      <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap">
        <span style="font-size:9.5px;color:#dc2626;background:#fef2f2;padding:1px 5px;border-radius:4px;font-weight:600;opacity:0.85">\${m.was}</span>
        \${icon.arrow(C.green)}
        <span style="font-size:10.5px;color:\${C.green};background:rgba(24,184,122,0.15);padding:1px 6px;border-radius:4px;font-weight:700">\${m.now}</span>
      </div>
    </div>\`).join('');

  // Done overlay
  const doneHtml = isDone ? \`
    <div style="position:absolute;top:0;left:0;width:100%;height:100%;min-height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:60;pointer-events:none;animation:pipeFu 0.5s ease both">
      <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#18B87A,#0d9e68);box-shadow:0 0 0 10px rgba(24,184,122,0.1),0 0 0 20px rgba(24,184,122,0.05),0 8px 36px rgba(24,184,122,0.4);display:flex;align-items:center;justify-content:center;animation:pipeScaleIn 0.7s cubic-bezier(0.16,1,0.3,1)">
        <svg width="32" height="26" viewBox="0 0 56 46" fill="none"><path d="M4 24L20 40L52 4" stroke="white" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:90;stroke-dashoffset:0;animation:pipeDash 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both"/></svg>
      </div>
      <div style="margin-top:12px;text-align:center">
        <div style="font-size:13px;font-weight:700;color:\${C.green};font-family:'Geist',sans-serif">Hired &amp; Complete</div>
        <div style="font-size:9px;color:#8FA3C0;font-family:'JetBrains Mono',monospace;margin-top:3px">Priya Sharma · ₹24L · 1 Apr · 8 days total</div>
      </div>
    </div>\` : '';

  // Desktop: 6 nodes in a single horizontal row
  // Mobile: 2 rows of 3 (3-col grid)
  const NODE_IDS = ['pipe-jd','pipe-ai','pipe-hr','pipe-interview','pipe-offer','pipe-hired'];

  const gridHtml = IS_MOBILE ? \`
    <div style="position:relative;width:100%;opacity:\${isDone?0:1};transform:\${isDone?'scale(0.88)':'scale(1)'};transition:opacity 0.65s,transform 0.65s;padding:0 4px;box-sizing:border-box">
      <div style="display:flex;flex-direction:column;align-items:center;width:100%;gap:8px">
        <div id="pipe-jd"        style="display:flex;justify-content:center">\${renderJD(phaseId,phaseMs)}</div>
        <div id="pipe-ai"        style="display:flex;justify-content:center">\${renderAI(phaseId,phaseMs)}</div>
        <div id="pipe-hr"        style="display:flex;justify-content:center">\${renderHR(phaseId,phaseMs)}</div>
        <div id="pipe-interview" style="display:flex;justify-content:center">\${renderInterview(phaseId,phaseMs)}</div>
        <div id="pipe-offer"     style="display:flex;justify-content:center">\${renderOffer(phaseId,phaseMs)}</div>
        <div id="pipe-hired"     style="display:flex;justify-content:center">\${renderHired(phaseId,phaseMs)}</div>
      </div>
    </div>\` : \`
    <div style="position:relative;width:\${CW*6}px;opacity:\${isDone?0:1};transform:\${isDone?'scale(0.88)':'scale(1)'};transition:opacity 0.65s,transform 0.65s">
      <svg id="pipe-lines-svg" style="position:absolute;top:0;left:0;pointer-events:none;z-index:1;overflow:visible;width:100%;height:100%" xmlns="http://www.w3.org/2000/svg"></svg>
      <div style="display:grid;grid-template-columns:repeat(6,\${CW}px);height:\${CH}px;position:relative;z-index:2">
        <div id="pipe-jd"        style="\${cellSt}">\${renderJD(phaseId,phaseMs)}</div>
        <div id="pipe-ai"        style="\${cellSt}">\${renderAI(phaseId,phaseMs)}</div>
        <div id="pipe-hr"        style="\${cellSt}">\${renderHR(phaseId,phaseMs)}</div>
        <div id="pipe-interview" style="\${cellSt}">\${renderInterview(phaseId,phaseMs)}</div>
        <div id="pipe-offer"     style="\${cellSt}">\${renderOffer(phaseId,phaseMs)}</div>
        <div id="pipe-hired"     style="\${cellSt}">\${renderHired(phaseId,phaseMs)}</div>
      </div>
    </div>\`;

  ROOT.innerHTML = \`
    <style>
      @keyframes pipeFu      { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
      @keyframes pipeScaleIn { from{transform:scale(0.4);opacity:0}      to{transform:scale(1);opacity:1} }
      @keyframes pipeDash    { from{stroke-dashoffset:90}                 to{stroke-dashoffset:0} }
      @keyframes pipeRp      { 0%,100%{opacity:0.5;transform:scale(1)}   50%{opacity:0.15;transform:scale(1.05)} }
    </style>
    <div id="pipe-wrap" style="position:relative;overflow:visible;margin:0 auto;width:\${wrapW}">
      <canvas id="pipe-canvas" style="position:absolute;top:0;left:0;pointer-events:none;z-index:40"></canvas>
      \${gridHtml}
      \${doneHtml}
    </div>
    <div style="display:flex;justify-content:center;align-items:flex-start;gap:\${IS_MOBILE?'14px':'16px'};margin:24px auto 0;max-width:\${wrapW};width:100%;flex-wrap:wrap;overflow-x:auto;padding-top:8px;padding-bottom:4px;scrollbar-width:none">\${dotsHtml}</div>
    <div style="max-width:\${wrapW};width:100%;margin:16px auto 0;display:grid;grid-template-columns:\${IS_MOBILE?'repeat(2,1fr)':'repeat(4,1fr)'};gap:9px">\${metricsHtml}</div>\`;

  // Size canvas
  const wrap = document.getElementById('pipe-wrap');
  const cvs  = document.getElementById('pipe-canvas');
  if (wrap && cvs) {
    const wr  = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const canH = wrap.offsetHeight;
    cvs.width  = wr.width  * dpr;
    cvs.height = canH      * dpr;
    cvs.style.width  = wr.width  + 'px';
    cvs.style.height = canH      + 'px';
  }

  // Paint travelling dot
  paintDot(
    document.getElementById('pipe-canvas'),
    document.getElementById('pipe-wrap'),
    {
      jd:        document.getElementById('pipe-jd'),
      ai:        document.getElementById('pipe-ai'),
      hr:        document.getElementById('pipe-hr'),
      interview: document.getElementById('pipe-interview'),
      offer:     document.getElementById('pipe-offer'),
      hired:     document.getElementById('pipe-hired'),
    },
    phase.dot, phaseMs, phase.dur
  );

  // Draw connector lines after DOM settles
  requestAnimationFrame(() => {
    drawPipelineLines(
      ['pipe-jd','pipe-ai','pipe-hr','pipe-interview','pipe-offer','pipe-hired'],
      'pipe-wrap'
    );
  });

  if (!isDone) {
    if (window.__hropsPipeRunId === __pipeRunId) requestAnimationFrame(render);
  } else {
    setTimeout(() => {
      if (window.__hropsPipeRunId !== __pipeRunId) return;
      render.t0 = null;
      requestAnimationFrame(render);
    }, phase.dur);
  }
}

// Start on scroll into view
let started = false;
function startRender() {
  if (window.__hropsPipeRunId !== __pipeRunId) return;
  if (started) return;
  started = true;
  requestAnimationFrame(render);
}
ROOT.style.minHeight = '300px';
const obs = new IntersectionObserver(entries => {
  if (entries[0] && entries[0].isIntersecting) { obs.disconnect(); startRender(); }
}, { threshold: 0.1 });
obs.observe(ROOT);
setTimeout(startRender, 300);

})();`

export default function S2_PipelineAnimation() {
  useEffect(() => {
    let disposed = false
    let script: HTMLScriptElement | null = null

    const init = () => {
      if (disposed) return
      const root = document.getElementById('hrops-pipe-root')
      if (!root) {
        requestAnimationFrame(init)
        return
      }
      script = document.createElement('script')
      script.type = 'text/javascript'
      script.dataset.hrops = 'pipe-animation'
      script.text = SCRIPT
      document.body.appendChild(script)
    }

    init()

    return () => {
      disposed = true
      if (script && script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: HTML }} />
}
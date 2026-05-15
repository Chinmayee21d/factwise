'use client'
import { useEffect } from 'react'

const HTML = `<div class="section-dark" id="hub-animation" style="background-color: #101c38;">
  <div class="wrap" style="padding-top:72px;padding-bottom:64px;overflow:visible;">
    <div class="reveal" style="max-width:980px;margin-bottom:28px;">
      <div class="eyebrow"><div class="ey-line"></div>End-to-End Hiring Intelligence</div>
      <h2 class="h2">One hire. Zero friction.<br><em>HR Ops orchestrates every step.</em></h2>
      <p class="lead" style="max-width:none;margin-bottom:48px">From JD upload to offer accepted - the complete hiring process automated with every stakeholder.</p>
    </div>
    <div class="hub-outer">
      <div id="hrops-hub-root"></div>
    </div>
  </div>
</div>`
const SCRIPT = `(function(){
'use strict';
var __hubRunId = (window.__hropsHubRunId || 0) + 1;
window.__hropsHubRunId = __hubRunId;

/* --- HR Ops Hub Animation --------------------------------------------------
   Pure vanilla JS. No dependencies. Mounts into #hrops-hub-root.
   Cross layout: HR (top), Agency (left), Hub (centre),
                 Panel (right), Candidate (bottom).
   Animated dots travel between nodes on a canvas overlay.
   Progress dots + metrics rendered below the grid.
---------------------------------------------------------------------------- */

const ROOT = document.getElementById('hrops-hub-root');
if (!ROOT) { return; }

// -- Colours ------------------------------------------------------------------
const C = {
  navy:    '#0B1628',
  navyMid: '#1A3A6B',
  gold:    '#C49A3C',
  green:   '#18B87A',
  purple:  '#7C3AED',
  orange:  '#EA580C',
};

// -- Timeline -----------------------------------------------------------------
const PHASES = [
  { id:'hr_jd',        dur:3200, dot:null },
  { id:'dot_hr_hub',   dur:900,  dot:{ from:'hr',    to:'hub',   color:C.navyMid } },
  { id:'hub_parse',    dur:3000, dot:null },
  { id:'dot_hub_ag',   dur:900,  dot:{ from:'hub',   to:'ag',    color:C.gold    } },
  { id:'ag_submit',    dur:3200, dot:null },
  { id:'dot_ag_hub',   dur:900,  dot:{ from:'ag',    to:'hub',   color:C.navyMid } },
  { id:'hub_screen',   dur:3200, dot:null },
  { id:'dot_hub_hr',   dur:900,  dot:{ from:'hub',   to:'hr',    color:C.gold    } },
  { id:'hr_review',    dur:2800, dot:null },
  { id:'dot_hr_hub2',  dur:900,  dot:{ from:'hr',    to:'hub',   color:C.navyMid } },
  { id:'hub_assess',   dur:2000, dot:null },
  { id:'dot_hub_cand', dur:900,  dot:{ from:'hub',   to:'cand',  color:C.purple  } },
  { id:'cand_assess',  dur:3000, dot:null },
  { id:'dot_cand_hub', dur:900,  dot:{ from:'cand',  to:'hub',   color:C.navyMid } },
  { id:'hub_review',   dur:2400, dot:null },
  { id:'dot_hub_pan',  dur:900,  dot:{ from:'hub',   to:'panel', color:C.orange  } },
  { id:'panel_i1',     dur:3000, dot:null },
  { id:'dot_pan_hub',  dur:900,  dot:{ from:'panel', to:'hub',   color:C.navyMid } },
  { id:'hub_offer',    dur:2400, dot:null },
  { id:'dot_hub_cand2',dur:900,  dot:{ from:'hub',   to:'cand',  color:C.green   } },
  { id:'cand_offer',   dur:2400, dot:null },
  { id:'dot_cand_hub2',dur:900,  dot:{ from:'cand',  to:'hub',   color:'#22c55e' } },
  { id:'hub_done',     dur:1600, dot:null },
  { id:'done',         dur:3600, dot:null },
];

let _tAcc = 0;
const TL = PHASES.map(p => { const s = _tAcc; _tAcc += p.dur; return { ...p, start:s, end:_tAcc }; });
const LOOP = _tAcc;

function getPhase(ms) {
  const m = ms % LOOP;
  return TL.find(p => m >= p.start && m < p.end) || TL[0];
}
function phaseIdx(id) { return TL.findIndex(p => p.id === id); }

// -- SVG helpers ---------------------------------------------------------------
const icon = {
  person:   c => \`<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.5" stroke="\${c}" stroke-width="1.4"/><path d="M2.5 14c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" stroke="\${c}" stroke-width="1.4" stroke-linecap="round"/></svg>\`,
  building: c => \`<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1" stroke="\${c}" stroke-width="1.4"/><path d="M5 6h2M9 6h2M5 9h2M9 9h2M7 14v-4h2v4" stroke="\${c}" stroke-width="1.1" stroke-linecap="round"/></svg>\`,
  panel:    c => \`<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="5" cy="5" r="2" stroke="\${c}" stroke-width="1.3"/><circle cx="11" cy="5" r="2" stroke="\${c}" stroke-width="1.3"/><path d="M1 14c0-2.2 1.8-4 4-4M11 10c2.2 0 4 1.8 4 4" stroke="\${c}" stroke-width="1.3" stroke-linecap="round"/></svg>\`,
  star:     ()=> \`<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l1.2 2.3 2.5.37-1.82 1.77.43 2.5L8 7.3 5.67 8.44l.43-2.5L4.28 4.17l2.5-.37L8 1.5z" stroke="#C49A3C" fill="rgba(196,154,60,0.18)" stroke-width="1.3" stroke-linejoin="round"/></svg>\`,
  tick:     ()=> \`<svg width="6" height="6" viewBox="0 0 8 7" fill="none"><path d="M1 3.5l2 2 4-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>\`,
  tick_md:  ()=> \`<svg width="8" height="8" viewBox="0 0 10 9" fill="none"><path d="M1.5 4.5l2.5 3 4.5-6" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>\`,
  arrow:    c => \`<svg width="10" height="8" viewBox="0 0 12 10" fill="none"><path d="M2 5h8M7 2l3 3-3 3" stroke="\${c}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>\`,
};

// -- Primitive HTML builders ---------------------------------------------------
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
    <span style="font-size:9px;color:rgba(255,255,255,0.45);font-family:'Geist',sans-serif;width:40px;flex-shrink:0">\${label}</span>
    <span style="font-size:9.5px;font-weight:600;color:\${done ? '#fff' : 'rgba(255,255,255,0.2)'};font-family:'JetBrains Mono',monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${value}</span>
  </div>\`;
}

// Collapsed chip - shown when a node is waiting or complete
function chip(name, sub, iconSvg, done, dimmed) {
  const w = IS_MOBILE ? CARD_W : Math.round(CW*0.875);
  const nameSz = IS_MOBILE ? '9px' : '10.5px';
  const subSz  = IS_MOBILE ? '7.5px' : '8.5px';
  const pad    = IS_MOBILE ? '7px 9px' : '9px 12px';
  const iconSz = IS_MOBILE ? '22px' : '26px';
  return \`<div style="background:#16284A;border-radius:11px;border:1.5px solid \${done ? C.green + '44' : 'rgba(255,255,255,0.09)'};padding:\${pad};display:flex;align-items:center;gap:8px;width:\${w}px;opacity:\${dimmed ? 0.3 : 1};transition:opacity 0.5s">
    <div style="width:\${iconSz};height:\${iconSz};border-radius:7px;flex-shrink:0;background:\${done ? C.green + '14' : 'rgba(255,255,255,0.06)'};display:flex;align-items:center;justify-content:center">\${iconSvg}</div>
    <div style="flex:1;min-width:0">
      <div style="font-size:\${nameSz};font-weight:700;color:\${done ? C.green : '#EEF2FF'};font-family:'Geist',sans-serif;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${name}</div>
      <div style="font-size:\${subSz};color:#8FA3C0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">\${sub}</div>
    </div>
    \${done ? \`<div style="width:16px;height:16px;border-radius:50%;background:\${C.green};flex-shrink:0;display:flex;align-items:center;justify-content:center">\${icon.tick_md()}</div>\` : ''}
  </div>\`;
}

// Expanded card shell - accent bar + bordered box
function cardOpen(color, body) {
  const w   = IS_MOBILE ? CARD_W : Math.round(CW*0.908);
  const pad = IS_MOBILE ? '10px 10px 9px' : '14px 14px 12px';
  return \`<div style="background:#16284A;border-radius:13px;border:1.5px solid \${color}44;box-shadow:0 0 0 3px \${color}0a,0 8px 24px \${color}14;padding:\${pad};position:relative;width:\${w}px">
    <div style="position:absolute;top:0;left:0;right:0;height:2.5px;background:linear-gradient(90deg,\${color},\${color}77);border-radius:13px 13px 0 0"></div>
    \${body}
  </div>\`;
}

// Card header row (icon + name + subtitle)
function cardHead(iconSvg, bgColor, name, sub) {
  const nameSz = IS_MOBILE ? '9px' : '10.5px';
  const subSz  = IS_MOBILE ? '7.5px' : '8.5px';
  const iconSz = IS_MOBILE ? '22px' : '26px';
  return \`<div style="display:flex;align-items:center;gap:8px;margin-bottom:\${IS_MOBILE?'7px':'10px'}">
    <div style="width:\${iconSz};height:\${iconSz};border-radius:7px;flex-shrink:0;background:\${bgColor};border:1px solid \${bgColor.replace('0.15','0.3')};display:flex;align-items:center;justify-content:center">\${iconSvg}</div>
    <div>
      <div style="font-size:\${nameSz};font-weight:700;font-family:'Geist',sans-serif">\${name}</div>
      <div style="font-size:\${subSz};color:#8FA3C0">\${sub}</div>
    </div>
  </div>\`;
}

function mono(text) {
  const sz = IS_MOBILE ? '7px' : '8px';
  return \`<div style="font-size:\${sz};color:rgba(255,255,255,0.3);font-family:'JetBrains Mono',monospace;margin-bottom:7px;letter-spacing:0.4px">\${text}</div>\`;
}

// -- Card renderers ------------------------------------------------------------

function renderHR(phaseId, ms) {
  const i = phaseIdx(phaseId);
  const isJD  = phaseId === 'hr_jd';
  const isRev = phaseId === 'hr_review';
  const done  = i > phaseIdx('hr_review');
  const dim   = !isJD && !isRev && !done && i < phaseIdx('hr_jd');

  if (!isJD && !isRev) return chip('Ananya Singh', 'HR Manager - TechCorp', icon.person(done ? C.green : C.navyMid), done, dim);

  if (isJD) {
    const f   = [ms > 750, ms > 1500, ms > 2250, ms > 3000];
    const totalTaskMs = 3000;
    const pct = Math.min(100, (ms / totalTaskMs) * 100);
    const jdBarColor = '#4B6BFB';
    return cardOpen(C.navyMid, \`
      \${cardHead(icon.person(C.navyMid), 'rgba(26,58,107,0.25)', 'Ananya Singh', 'Uploading JD')}
      <div style="background:#1B3057;border:1px solid rgba(255,255,255,0.07);border-radius:7px;padding:7px 9px;display:flex;gap:7px;align-items:center;margin-bottom:9px">
        <svg style="flex-shrink:0" width="9" height="11" viewBox="0 0 12 14" fill="none"><path d="M1.5 2a1 1 0 011-1h5l3 3v8a1 1 0 01-1 1H2.5a1 1 0 01-1-1V2z" stroke="\${C.navyMid}" stroke-width="1.2"/><path d="M7.5 1v3h3" stroke="\${C.navyMid}" stroke-width="1.1" stroke-linecap="round"/></svg>
        <div style="flex:1;min-width:0">
          <div style="font-size:9px;font-weight:600;color:#EEF2FF;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">JD_SrEngineer_2026.pdf</div>
          \${progBar(pct, jdBarColor)}
          <div style="font-size:7.5px;color:#8FA3C0;margin-top:2px">\${pct >= 100 ? 'Upload complete' : 'Uploading...'}</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:5px">
        \${labelRow('Role',   'Sr. Backend Eng', f[0], C.navyMid)}
        \${labelRow('Level',  'IC4 - 5-8 yrs',   f[1], C.navyMid)}
        \${labelRow('Skills', 'Go, Kafka, AWS',   f[2], C.navyMid)}
        \${labelRow('Budget', 'Rs22L-Rs28L CTC',   f[3], C.navyMid)}
      </div>\`);
  }

  // hr_review - progressive reveal (sequential)
  const r1 = Math.max(0, Math.min(1, (ms - 250) / 750));
  const r2 = Math.max(0, Math.min(1, (ms - 1050) / 750));
  const ap = ms > 2100;
  const cands = [
    { n:'Priya Sharma', e:'6 yrs - Backend', s:87, c:C.green,  v:'Proceed' },
    { n:'Rahul Mehta',  e:'4 yrs - Backend', s:62, c:C.gold,   v:'Maybe'   },
  ];
  return cardOpen(C.navyMid, \`
    \${cardHead(icon.person(C.navyMid), 'rgba(26,58,107,0.25)', 'Ananya Singh', 'Reviewing shortlist')}
    \${mono('AI-SCREENED - 2 OF 4')}
    <div style="display:flex;flex-direction:column;gap:5px">
      \${cands.map((cd, i) => \`
        <div style="background:#1B3057;border:1px solid \${ap && i===0 ? C.green+'44' : 'rgba(255,255,255,0.07)'};border-radius:7px;padding:7px 9px;opacity:\${i===0 ? Math.max(0.18, r1) : Math.max(0.12, r2)};transition:opacity 0.35s,border-color 0.4s">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
            <div><div style="font-size:9.5px;font-weight:700;color:#EEF2FF">\${cd.n}</div><div style="font-size:8px;color:#8FA3C0">\${cd.e}</div></div>
            <div style="text-align:right"><div style="font-size:7.5px;color:#8FA3C0">Score</div><div style="font-size:14px;font-weight:800;color:\${cd.c};font-family:'JetBrains Mono',monospace;line-height:1">\${cd.s}</div></div>
          </div>
          \${progBar((i===0 ? r1 : r2) * cd.s, cd.c)}
          <div style="font-size:7.5px;color:\${cd.c};font-weight:600;margin-top:2px">\${cd.v}</div>
        </div>\`).join('')}
    </div>
    <div style="height:26px;border-radius:7px;margin-top:7px;display:flex;align-items:center;justify-content:center;gap:5px;background:\${ap ? C.green+'14' : C.navyMid};border:1px solid \${ap ? C.green+'30' : 'transparent'};transition:all 0.5s;opacity:\${ms > 1750 ? 1 : 0.1}">
      \${ap
        ? \`<div style="width:12px;height:12px;border-radius:50%;background:\${C.green};display:flex;align-items:center;justify-content:center">\${icon.tick()}</div><span style="font-size:9px;font-weight:600;color:\${C.green}">Priya approved</span>\`
        : \`<span style="font-size:9px;font-weight:600;color:#fff">Proceed with Priya ?</span>\`}
    </div>\`);
}

function renderAg(phaseId, ms) {
  const i    = phaseIdx(phaseId);
  const open = phaseId === 'ag_submit';
  const done = i > phaseIdx('ag_submit');
  const dim  = !open && !done;

  if (!open) return chip('TalentBridge', 'Recruitment Agency', icon.building(done ? C.green : C.gold), done, dim);

  const c1 = [ms>200, ms>550, ms>900, ms>1250];
  const c2 = [ms>1600, ms>1900, ms>2200, ms>2600];

  function cRow(name, exp, ts, ch) {
    return \`<div style="background:#1B3057;border:1px solid \${ch[3] ? C.gold+'44' : 'rgba(255,255,255,0.07)'};border-radius:7px;padding:7px 9px;margin-bottom:6px;transition:border-color 0.4s">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
        <div style="opacity:\${ch[0] ? 1 : 0.15};transition:opacity 0.35s">
          <div style="font-size:9.5px;font-weight:700;color:#EEF2FF">\${name}</div>
          <div style="font-size:8px;color:#8FA3C0">\${exp}</div>
        </div>
        \${ch[3] ? \`<div style="font-size:7.5px;color:\${C.gold};font-weight:700;background:rgba(196,154,60,0.15);padding:2px 5px;border-radius:3px">? Sent</div>\` : ''}
      </div>
      <div style="display:flex;flex-direction:column;gap:3px">
        \${labelRow('Skills', 'Go, Kafka, AWS', ch[1], C.gold)}
        \${labelRow('Comm.',  '9% of CTC',      ch[2], C.gold)}
        \${labelRow('Time',   ts,                ch[3], C.green)}
      </div>
    </div>\`;
  }

  return cardOpen(C.gold, \`
    \${cardHead(icon.building(C.gold), 'rgba(196,154,60,0.15)', 'TalentBridge', 'Submitting candidates')}
    \${mono('2 PROFILES - TIMESTAMPED')}
    \${cRow('Priya Sharma', 'Sr. Backend - 6 yrs', '14:23:07', c1)}
    \${cRow('Rahul Mehta',  'Backend - 4 yrs',      '14:25:33', c2)}\`);
}

function renderCand(phaseId, ms) {
  const i    = phaseIdx(phaseId);
  const isA  = phaseId === 'cand_assess';
  const isO  = phaseId === 'cand_offer';
  const done = i > phaseIdx('cand_offer');
  const dim  = !isA && !isO && !done && i < phaseIdx('cand_assess');

  if (!isA && !isO) return chip('Priya Sharma', 'Candidate - Magic Link', icon.person(done ? C.green : C.purple), done, dim);

  if (isA) {
    const steps = Math.min(4, Math.floor(ms / 680) + 1);
    const score = ms > 2400 ? 91 : null;
    const items = ['Profile auto-filled from CV', 'Technical questions - 3/3', 'Work samples - Drive', 'CTC expectation confirmed'];
    return cardOpen(C.purple, \`
      \${cardHead(icon.person(C.purple), 'rgba(124,58,237,0.15)', 'Priya Sharma', 'Magic Link - no login')}
      \${mono('ASSESSMENT IN PROGRESS')}
      <div style="display:flex;flex-direction:column;gap:5px">
        \${items.map((t, i) => \`<div style="display:flex;align-items:center;gap:7px;opacity:\${i < steps ? 1 : 0.2};transition:opacity 0.4s">\${checkCircle(i < steps, C.purple)}<span style="font-size:9.5px;color:#EEF2FF;font-family:'Geist',sans-serif">\${t}</span></div>\`).join('')}
      </div>
      \${score !== null ? \`<div style="margin-top:9px;padding:7px 9px;border-radius:7px;background:\${C.purple}14;border:1px solid \${C.purple}28;display:flex;justify-content:space-between;align-items:center"><span style="font-size:9.5px;font-weight:600;color:\${C.purple}">Score</span><span style="font-size:16px;font-weight:800;color:\${C.purple};font-family:'JetBrains Mono',monospace">\${score}/100</span></div>\` : ''}\`);
  }

  // cand_offer
  const sh = ms > 300, det = ms > 800, acc = ms > 1800;
  const rows = [['Role','Sr. Backend Eng',true],['CTC','?24,00,000 p.a.',det],['Joining','1 Apr 2026',det],['Location','Bengaluru Hybrid',det]];
  return cardOpen(C.green, \`
    \${cardHead(icon.person(C.green), 'rgba(24,184,122,0.15)', 'Priya Sharma', 'Offer via Magic Link')}
    \${mono('OFFER LETTER')}
    <div style="background:#1B3057;border:1px solid rgba(255,255,255,0.07);border-radius:7px;padding:8px 10px;margin-bottom:8px;opacity:\${sh ? 1 : 0.1};transition:opacity 0.5s">
      \${rows.map(([l,v,s], i) => \`<div style="display:flex;justify-content:space-between;padding:3px 0;\${i > 0 ? 'border-top:1px solid rgba(255,255,255,0.07)' : ''};opacity:\${s ? 1 : 0.2};transition:opacity 0.4s"><span style="font-size:8.5px;color:#8FA3C0">\${l}</span><span style="font-size:9px;font-weight:600;color:#EEF2FF;font-family:'JetBrains Mono',monospace">\${v}</span></div>\`).join('')}
    </div>
    <div style="height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;gap:5px;background:\${acc ? C.green+'14' : C.green};border:1px solid \${acc ? C.green+'30' : 'transparent'};transition:all 0.5s;opacity:\${sh ? 1 : 0}">
      \${acc
        ? \`<div style="width:12px;height:12px;border-radius:50%;background:\${C.green};display:flex;align-items:center;justify-content:center">\${icon.tick()}</div><span style="font-size:9px;font-weight:600;color:\${C.green}">Offer Accepted ?</span>\`
        : \`<span style="font-size:9px;font-weight:600;color:#fff">Accept Offer ?</span>\`}
    </div>\`);
}

function renderPanel(phaseId, ms) {
  const i    = phaseIdx(phaseId);
  const open = phaseId === 'panel_i1';
  const done = i > phaseIdx('panel_i1');
  const dim  = !open && !done && i < phaseIdx('panel_i1');

  if (!open) return chip('Arjun Kapoor', 'Interviewer - Technical', icon.panel(done ? C.green : C.orange), done, dim);

  const sf     = [ms > 400, ms > 900, ms > 1400, ms > 2000];
  const scores = [8, 7, 8, 9];
  const labels = ['Technical depth', 'System design', 'Problem solving', 'Communication'];

  return cardOpen(C.orange, \`
    \${cardHead(icon.panel(C.orange), 'rgba(234,88,12,0.15)', 'Arjun Kapoor', 'Technical Interview')}
    \${mono('FEEDBACK - PRIYA SHARMA')}
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
    \${sf[3] ? \`<div style="margin-top:9px;padding:6px 9px;border-radius:7px;background:\${C.orange}0f;border:1px solid \${C.orange}28;display:flex;justify-content:space-between;align-items:center"><span style="font-size:9.5px;font-weight:600;color:\${C.orange}">? Strong Hire</span><span style="font-size:14px;font-weight:800;color:\${C.orange};font-family:'JetBrains Mono',monospace">8.0/10</span></div>\` : ''}\`);
}

function renderHub(phaseId, ms) {
  const HUB_OPEN = new Set(['hub_parse','hub_screen','hub_assess','hub_review','hub_offer','hub_done']);
  const open     = HUB_OPEN.has(phaseId);
  const label    = { hub_parse:'PARSING JD', hub_screen:'SCREENING', hub_assess:'CONFIGURING', hub_review:'REVIEWING', hub_offer:'OFFERING', hub_done:'COMPLETE' }[phaseId] || 'READY';

  let inner = '';

  if (phaseId === 'hub_parse') {
    const n = Math.min(4, Math.floor(ms / 660) + 1);
    const items = ['Role & seniority', 'Skills & tech stack', 'Budget range', 'Broadcasting to agencies'];
    inner = \`\${mono('JD PARSED - ' + n + '/4 FIELDS')}
      \${progBar(n / 4 * 100, C.gold)}
      <div style="margin-top:7px;display:flex;flex-direction:column;gap:5px">
        \${items.map((t,i) => \`<div style="display:flex;align-items:center;gap:7px;opacity:\${i<n?1:0.2};transition:opacity 0.35s">\${checkCircle(i<n,C.gold)}<span style="font-size:9px;color:rgba(255,255,255,0.75);flex:1">\${t}</span>\${i<n?\`<span style="font-size:7.5px;color:\${C.gold};font-family:'JetBrains Mono',monospace">?</span>\`:''}</div>\`).join('')}
      </div>\`;

  } else if (phaseId === 'hub_screen') {
    const n = Math.min(6, Math.floor(ms / 490) + 1);
    const items = ['JD requirement match','Experience validation','Duplicate detection','Skill gap analysis','Salary range fit','Agency trust score'];
    inner = \`\${mono('AI SCREENING - ' + n + '/6')}
      \${progBar(n / 6 * 100, C.gold)}
      <div style="margin-top:7px;display:flex;flex-direction:column;gap:4px">
        \${items.map((t,i) => \`<div style="display:flex;align-items:center;gap:7px;opacity:\${i<n?1:0.2};transition:opacity 0.3s">\${checkCircle(i<n,C.gold)}<span style="font-size:9px;color:rgba(255,255,255,0.75);flex:1">\${t}</span>\${i<n?\`<span style="font-size:7.5px;color:\${C.gold};font-family:'JetBrains Mono',monospace">Pass</span>\`:''}</div>\`).join('')}
      </div>\`;

  } else if (phaseId === 'hub_assess') {
    const n = Math.min(3, Math.floor(ms / 580) + 1);
    const items = ['Role-specific tech questions - 3','Work sample prompt attached','Magic Link generated - no login'];
    inner = \`\${mono('ASSESSMENT CONFIGURED')}
      <div style="display:flex;flex-direction:column;gap:7px">
        \${items.map((t,i) => \`<div style="display:flex;align-items:center;gap:7px;opacity:\${i<n?1:0.2};transition:opacity 0.35s">\${checkCircle(i<n,'#a78bfa')}<span style="font-size:9px;color:rgba(255,255,255,0.75)">\${t}</span></div>\`).join('')}
      </div>\`;

  } else if (phaseId === 'hub_review') {
    const n = Math.min(3, Math.floor(ms / 700) + 1);
    inner = \`\${mono('ASSESSMENT REVIEW')}
      <div style="background:rgba(255,255,255,0.05);border-radius:6px;padding:7px 9px;margin-bottom:8px">
        \${[['Candidate','Priya Sharma','#fff'],['Score','91/100',C.purple],['JD Match','87%',C.gold]].map(([l,v,c],i) => \`<div style="display:flex;justify-content:space-between;padding:2.5px 0;\${i>0?'border-top:1px solid rgba(255,255,255,0.06)':''}"><span style="font-size:8.5px;color:rgba(255,255,255,0.38)">\${l}</span><span style="font-size:9px;font-weight:600;color:\${c};font-family:'JetBrains Mono',monospace">\${v}</span></div>\`).join('')}
      </div>
      <div style="display:flex;flex-direction:column;gap:5px">
        \${['Meets technical threshold','Communication: strong','Scheduling interview'].map((t,i) => \`<div style="display:flex;align-items:center;gap:7px;opacity:\${i<n?1:0.2};transition:opacity 0.4s">\${checkCircle(i<n,C.green)}<span style="font-size:9px;color:rgba(255,255,255,0.75)">\${t}</span></div>\`).join('')}
      </div>
      \${n>=3 ? \`<div style="margin-top:7px;padding:4px 8px;border-radius:6px;background:rgba(24,184,122,0.12);border:1px solid rgba(24,184,122,0.28);font-size:8.5px;color:#4ade80;display:flex;align-items:center;gap:6px"><div style="width:5px;height:5px;border-radius:50%;background:\${C.green}"></div>Interview - Arjun Kapoor</div>\` : ''}\`;

  } else if (phaseId === 'hub_offer') {
    const n = Math.min(4, Math.floor(ms / 520) + 1);
    const items = ['Offer drafted - Rs24L CTC','Commission - Rs2.16L (9%)','Notice period confirmed','Sent via Magic Link'];
    inner = \`\${mono('OFFER GENERATION')}
      \${progBar(n / 4 * 100, C.green)}
      <div style="margin-top:7px;display:flex;flex-direction:column;gap:5px">
        \${items.map((t,i) => \`<div style="display:flex;align-items:center;gap:7px;opacity:\${i<n?1:0.2};transition:opacity 0.35s">\${checkCircle(i<n,C.green)}<span style="font-size:9px;color:rgba(255,255,255,0.75)">\${t}</span></div>\`).join('')}
      </div>\`;

  } else if (phaseId === 'hub_done') {
    inner = \`<div style="padding:8px 10px;border-radius:7px;background:rgba(24,184,122,0.18);border:1px solid rgba(24,184,122,0.35)">
      <div style="font-size:10.5px;font-weight:700;color:#4ade80;margin-bottom:2px">Hired successfully</div>
      <div style="font-size:8px;color:rgba(255,255,255,0.35);font-family:'JetBrains Mono',monospace">Rs2.16L commission - TalentBridge</div>
    </div>\`;
  }

  return \`<div style="background:\${C.navy};border-radius:15px;border:1.5px solid rgba(196,154,60,0.35);box-shadow:\${open ? '0 0 0 4px rgba(196,154,60,0.1),0 0 0 8px rgba(196,154,60,0.04),0 14px 44px rgba(11,22,40,0.5)' : '0 4px 20px rgba(11,22,40,0.4)'};padding:\${open ? '15px 16px 13px' : '11px 15px'};transition:all 0.5s cubic-bezier(0.16,1,0.3,1);position:relative;width:\${IS_MOBILE ? CARD_W : (open ? Math.round(CW*0.908) : Math.round(CW*0.783))}px">
    <div style="position:absolute;top:0;left:12px;right:12px;height:2px;background:linear-gradient(90deg,transparent,#C49A3C,transparent)"></div>
    \${open ? \`<div style="position:absolute;inset:-9px;border-radius:24px;border:1.5px solid rgba(196,154,60,0.1);animation:hubRp 2.5s ease-in-out infinite;pointer-events:none"></div>\` : ''}
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:\${open ? 11 : 0}px">
      <div style="width:30px;height:30px;border-radius:8px;background:rgba(196,154,60,0.12);border:1px solid rgba(196,154,60,0.28);display:flex;align-items:center;justify-content:center;flex-shrink:0">\${icon.star()}</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:800;color:#fff;font-family:'Geist',sans-serif">HR Ops</div>
        <div style="font-size:7.5px;color:rgba(255,255,255,0.35);font-family:'JetBrains Mono',monospace;letter-spacing:1px">\${label}</div>
      </div>
      \${phaseId === 'hub_done' ? \`<div style="width:18px;height:18px;border-radius:50%;background:\${C.green};display:flex;align-items:center;justify-content:center;flex-shrink:0;animation:hubScaleIn 0.4s ease">\${icon.tick_md()}</div>\` : ''}
    </div>
    \${inner}
  </div>\`;
}

// -- Canvas dot animation ------------------------------------------------------
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

// -- Stage map -----------------------------------------------------------------
const STAGE_MAP = {
  hr_jd:0, dot_hr_hub:0, hub_parse:1, dot_hub_ag:1, ag_submit:2, dot_ag_hub:2,
  hub_screen:3, dot_hub_hr:3, hr_review:4, dot_hr_hub2:4, hub_assess:5, dot_hub_cand:5,
  cand_assess:6, dot_cand_hub:6, hub_review:7, dot_hub_pan:7, panel_i1:8, dot_pan_hub:8,
  hub_offer:9, dot_hub_cand2:9, cand_offer:10, dot_cand_hub2:10, hub_done:11, done:11,
};
const STAGE_LABELS = ['JD Upload','AI Parse','Agency','Screen','Review','Create Task','Finish Task','Evaluate','Interview','Offer','Accept','Hired'];
const METRICS = [
  { l:'Time to hire',        was:'23 days',  now:'8 days'  },
  { l:'Manual steps',        was:'34 steps', now:'4 steps' },
  { l:'Offer accepted',      was:'52%',      now:'87%'     },
  { l:'Disputes',            was:'3/month',  now:'0'       },
];

// Grid cell size - module-level, updated each render frame
let CW = 240, CH = 176, IS_MOBILE = false, CARD_W = 110;
function updateCellSize() {
  const rootW = ROOT.getBoundingClientRect().width;
  IS_MOBILE = rootW < 560;
  if (IS_MOBILE) {
    // 3 cards + 2 gaps(6px each) + 16px side padding must fit rootW
    const avail = rootW - 16;
    CARD_W = Math.max(90, Math.min(130, Math.floor((avail - 12) / 3)));
    CW = CARD_W;
    CH = Math.round(CW * (178/240));
  } else {
    CW = Math.max(140, Math.min(240, Math.floor(rootW / 3)));
    CH = Math.round(CW * (178/240));
  }
}

// Draw SVG connection lines for mobile radial layout
function drawMobileLines(hubEl, hrEl, agEl, panEl, candEl) {
  const svg = document.getElementById('hub-mobile-lines');
  if (!svg || !hubEl || !hrEl || !agEl || !panEl || !candEl) return;
  const wrap = document.getElementById('hub-wrap');
  if (!wrap) return;
  const wr = wrap.getBoundingClientRect();
  svg.style.width  = wr.width  + 'px';
  svg.style.height = wrap.offsetHeight + 'px';
  svg.setAttribute('viewBox', \`0 0 \${wr.width} \${wrap.offsetHeight}\`);
  svg.setAttribute('width',  wr.width);
  svg.setAttribute('height', wrap.offsetHeight);

  function mid(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width/2 - wr.left, y: r.top + r.height/2 - wr.top };
  }
  const hub  = mid(hubEl);
  const hr   = mid(hrEl);
  const ag   = mid(agEl);
  const pan  = mid(panEl);
  const cand = mid(candEl);

  function line(a, b, color) {
    return \`<line x1="\${a.x}" y1="\${a.y}" x2="\${b.x}" y2="\${b.y}"
      stroke="\${color}" stroke-width="1.5" stroke-dasharray="4 4"
      opacity="0.35" stroke-linecap="round"/>\`;
  }
  svg.innerHTML =
    line(hub, hr,   '#C49A3C') +
    line(hub, ag,   '#C49A3C') +
    line(hub, pan,  '#EA580C') +
    line(hub, cand, '#7C3AED');
}

// -- Main render loop ----------------------------------------------------------
function render(now) {
  if (window.__hropsHubRunId !== __hubRunId) return;
  updateCellSize();
  const cellSt = \`width:\${CW}px;height:\${CH}px;display:flex;align-items:center;justify-content:center;overflow:visible\`;
  if (!render.t0) render.t0 = now;
  const elapsed  = now - render.t0;
  const phase    = getPhase(elapsed);
  const phaseId  = phase.id;
  const phaseMs  = (elapsed % LOOP) - phase.start;
  const curStage = STAGE_MAP[phaseId] ?? 0;
  const stripW = Math.min(ROOT.getBoundingClientRect().width, 1180);
  const isDone   = phaseId === 'done';

  // Progress dots
  const dotsHtml = STAGE_LABELS.map((lbl, idx) => {
    const a = idx === curStage, p = idx < curStage;
    const dotSz = IS_MOBILE ? (a?6:4) : (a?8:5);
    const lblSz = IS_MOBILE ? '7px' : '9px';
    return \`<div style="display:flex;flex-direction:column;align-items:center;gap:3px">
      <div style="width:\${dotSz}px;height:\${dotSz}px;border-radius:50%;background:\${a?C.gold:p?C.green:'rgba(255,255,255,0.18)'};box-shadow:\${a?'0 0 0 3px rgba(196,154,60,0.22)':'none'};transition:all 0.4s"></div>
      <div style="font-size:\${lblSz};color:\${a?C.gold:p?C.green:'rgba(255,255,255,0.36)'};font-family:'Geist',sans-serif;font-weight:\${a?700:500};letter-spacing:0.18px;white-space:nowrap">\${lbl}</div>
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
  const doneOverlayH = IS_MOBILE ? 'auto' : CH*3+'px';
  const doneHtml = isDone ? \`
    <div style="position:absolute;top:0;left:0;width:100%;height:\${doneOverlayH};min-height:180px;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:60;pointer-events:none;animation:hubFu 0.5s ease both">
      <div style="width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,#18B87A,#0d9e68);box-shadow:0 0 0 12px rgba(24,184,122,0.1),0 0 0 24px rgba(24,184,122,0.05),0 10px 44px rgba(24,184,122,0.4);display:flex;align-items:center;justify-content:center;animation:hubScaleIn 0.7s cubic-bezier(0.16,1,0.3,1)">
        <svg width="40" height="33" viewBox="0 0 56 46" fill="none"><path d="M4 24L20 40L52 4" stroke="white" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:90;stroke-dashoffset:0;animation:hubDash 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both"/></svg>
      </div>
      <div style="margin-top:13px;text-align:center">
        <div style="font-size:14px;font-weight:700;color:\${C.green};font-family:'Geist',sans-serif">Hired &amp; Complete</div>
        <div style="font-size:9px;color:#8FA3C0;font-family:'JetBrains Mono',monospace;margin-top:4px">Priya Sharma - Rs24L - 1 Apr - Commission Rs2.16L - TalentBridge</div>
      </div>
    </div>\` : '';

  // Grid: 3-col cross on desktop, radial cross on mobile
  const wrapW = IS_MOBILE ? '100%' : CW*3+'px';

  // Mobile: radial layout — HR top, Ag left, Hub centre, Panel right, Cand bottom
  // Fixed 3-col grid: each col = CARD_W px, so nothing clips
  const mCardW = CARD_W + 'px';
  const mGap   = 6;
  const mTotalW = CARD_W * 3 + mGap * 2;
  const gridHtml = IS_MOBILE ? \`
    <div style="position:relative;width:\${mTotalW}px;margin:0 auto;opacity:\${isDone?0:1};transform:\${isDone?'scale(0.88)':'scale(1)'};transition:opacity 0.65s cubic-bezier(0.16,1,0.3,1),transform 0.65s cubic-bezier(0.16,1,0.3,1)">
      <svg id="hub-mobile-lines" style="position:absolute;top:0;left:0;pointer-events:none;z-index:1;overflow:visible;width:100%;height:100%" xmlns="http://www.w3.org/2000/svg"></svg>
      <div style="display:grid;grid-template-columns:\${CARD_W}px \${CARD_W}px \${CARD_W}px;grid-template-rows:auto auto auto;gap:\${mGap}px;align-items:center;justify-items:center;position:relative;z-index:2">
        <!-- Row 1: empty | HR top | empty -->
        <div></div>
        <div id="hub-hr" style="width:\${mCardW};display:flex;justify-content:center">\${renderHR(phaseId,phaseMs)}</div>
        <div></div>
        <!-- Row 2: Agency left | Hub centre | Panel right -->
        <div id="hub-ag" style="width:\${mCardW};display:flex;justify-content:center">\${renderAg(phaseId,phaseMs)}</div>
        <div id="hub-hub" style="width:\${mCardW};display:flex;justify-content:center">\${renderHub(phaseId,phaseMs)}</div>
        <div id="hub-panel" style="width:\${mCardW};display:flex;justify-content:center">\${renderPanel(phaseId,phaseMs)}</div>
        <!-- Row 3: empty | Candidate bottom | empty -->
        <div></div>
        <div id="hub-cand" style="width:\${mCardW};display:flex;justify-content:center">\${renderCand(phaseId,phaseMs)}</div>
        <div></div>
      </div>
    </div>\` : \`
    <div style="display:grid;grid-template-columns:\${CW}px \${CW}px \${CW}px;grid-template-rows:\${CH}px \${CH}px \${CH}px;width:\${CW*3}px;overflow:visible;opacity:\${isDone?0:1};transform:\${isDone?'scale(0.88)':'scale(1)'};transition:opacity 0.65s cubic-bezier(0.16,1,0.3,1),transform 0.65s cubic-bezier(0.16,1,0.3,1)">
      <div style="\${cellSt}"></div>
      <div id="hub-hr"    style="width:\${CW}px;height:\${CH}px;display:flex;align-items:flex-start;justify-content:center;overflow:visible;padding-top:0;transform:translateY(-18px)">\${renderHR(phaseId,phaseMs)}</div>
      <div style="\${cellSt}"></div>
      <div id="hub-ag"    style="\${cellSt}">\${renderAg(phaseId,phaseMs)}</div>
      <div id="hub-hub"   style="\${cellSt}">\${renderHub(phaseId,phaseMs)}</div>
      <div id="hub-panel" style="\${cellSt}">\${renderPanel(phaseId,phaseMs)}</div>
      <div style="\${cellSt}"></div>
      <div id="hub-cand"  style="\${cellSt}">\${renderCand(phaseId,phaseMs)}</div>
      <div style="\${cellSt}"></div>
    </div>\`;

  ROOT.innerHTML = \`
    <style>
      @keyframes hubFu       { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
      @keyframes hubScaleIn  { from{transform:scale(0.4);opacity:0}      to{transform:scale(1);opacity:1} }
      @keyframes hubDash     { from{stroke-dashoffset:90}                to{stroke-dashoffset:0} }
      @keyframes hubRp       { 0%,100%{opacity:0.5;transform:scale(1)}   50%{opacity:0.15;transform:scale(1.05)} }
      @keyframes hubCard     { from{opacity:0;transform:scale(0.93)}     to{opacity:1;transform:scale(1)} }
    </style>
    <div id="hub-wrap" style="position:relative;overflow:visible;margin:0 auto;width:\${wrapW}">
      <canvas id="hub-canvas" style="position:absolute;top:0;left:0;pointer-events:none;z-index:40"></canvas>
      \${gridHtml}
      \${doneHtml}
    </div>
    <div style="display:flex;justify-content:center;gap:\${IS_MOBILE?'8px':'16px'};margin:24px auto 0;max-width:\${wrapW};width:100%;flex-wrap:wrap">\${dotsHtml}</div>
    <div style="max-width:\${wrapW};width:100%;margin:10px auto 0;display:grid;grid-template-columns:\${IS_MOBILE?'repeat(2,1fr)':'repeat(4,1fr)'};gap:9px">\${metricsHtml}</div>\`;

  // Size canvas to full grid height
  const wrap = document.getElementById('hub-wrap');
  const cvs  = document.getElementById('hub-canvas');
  if (wrap && cvs) {
    const wr  = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const canH = IS_MOBILE ? wrap.offsetHeight : CH * 3;
    cvs.width  = wr.width  * dpr;
    cvs.height = canH      * dpr;
    cvs.style.width  = wr.width  + 'px';
    cvs.style.height = canH      + 'px';
  }

  // Paint travelling dot (both desktop and mobile)
  paintDot(
    document.getElementById('hub-canvas'),
    document.getElementById('hub-wrap'),
    { hr: document.getElementById('hub-hr'), hub: document.getElementById('hub-hub'),
      ag: document.getElementById('hub-ag'), cand: document.getElementById('hub-cand'),
      panel: document.getElementById('hub-panel') },
    phase.dot, phaseMs, phase.dur
  );

  // Draw connecting lines on mobile after DOM update
  if (IS_MOBILE) {
    requestAnimationFrame(() => {
      drawMobileLines(
        document.getElementById('hub-hub'),
        document.getElementById('hub-hr'),
        document.getElementById('hub-ag'),
        document.getElementById('hub-panel'),
        document.getElementById('hub-cand')
      );
    });
  }

  // Stop loop when done so the success overlay animations aren't reset every frame.
  // Restart after the done phase duration so the loop repeats cleanly.
  if (!isDone) {
    if (window.__hropsHubRunId === __hubRunId) requestAnimationFrame(render);
  } else {
    setTimeout(() => {
      if (window.__hropsHubRunId !== __hubRunId) return;
      render.t0 = null;
      requestAnimationFrame(render);
    }, phase.dur);
  }
}

// Trigger on scroll into view, with a safety fallback so the hub always renders.
let started = false;
function startRender() {
  if (window.__hropsHubRunId !== __hubRunId) return;
  if (started) return;
  started = true;
  requestAnimationFrame(render);
}
ROOT.style.minHeight = '400px';
const obs = new IntersectionObserver(entries => {
  if (entries[0] && entries[0].isIntersecting) { obs.disconnect(); startRender(); }
}, { threshold: 0.1 });
obs.observe(ROOT);
setTimeout(startRender, 300);

})();`

export default function HubAnimation() {
  useEffect(() => {
    let disposed = false
    let script: HTMLScriptElement | null = null

    const init = () => {
      if (disposed) return
      const root = document.getElementById('hrops-hub-root')
      if (!root) {
        requestAnimationFrame(init)
        return
      }
      script = document.createElement('script')
      script.type = 'text/javascript'
      script.dataset.hrops = 'hub-animation'
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
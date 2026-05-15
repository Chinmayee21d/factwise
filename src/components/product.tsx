'use client'
import { useEffect } from 'react'

const HTML = `<div id="product-hub-animation" style="background:#0a0a0c;color:#fff;font-family:'Geist',sans-serif;padding:100px 0;overflow:hidden">
  <div style="max-width:1400px;margin:0 auto;padding:0 40px">
    <div style="margin-bottom:64px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <div style="width:24px;height:1px;background:#7c5cfc"></div>
        <span style="text-transform:uppercase;letter-spacing:2.5px;font-size:11px;font-weight:700;color:#7c5cfc">Dynamic Operations</span>
      </div>
      <h2 style="font-size:clamp(32px,5vw,48px);font-weight:800;margin-bottom:20px;line-height:1.1;letter-spacing:-0.03em">One Platform. <span style="color:#666">Every Workflow.</span></h2>
      <p style="color:#888;max-width:650px;font-size:19px;line-height:1.6">Experience high-fidelity automation across every procurement journey. From the first request to the final payment.</p>
    </div>
    <div style="display:flex;gap:16px;margin-bottom:48px;flex-wrap:wrap;justify-content:center">
      <button class="ftab active" data-flow="p2q">Quote to Order</button>
      <button class="ftab" data-flow="r2po">Requisition to PO</button>
      <button class="ftab" data-flow="i2p">Invoice to Pay</button>
    </div>
    <div id="phub-root" style="min-height:200px"></div>
  </div>
  <style>
    .ftab{background:transparent;border:1px solid rgba(255,255,255,0.1);color:#888;padding:12px 28px;border-radius:14px;cursor:pointer;font-weight:700;font-size:14px;font-family:'Inter',sans-serif;transition:all 0.4s}
    .ftab.active{border-color:#7c5cfc;color:#fff;background:rgba(124,92,252,0.08);box-shadow:0 4px 20px rgba(124,92,252,0.2)}
    @keyframes hubPulse{0%,100%{box-shadow:0 0 0 0 rgba(124,92,252,0.3)}50%{box-shadow:0 0 0 6px rgba(124,92,252,0)}}
    @keyframes bulletAppear{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:translateY(0)}}
  </style>
</div>`

const SCRIPT = `(function(){
'use strict';
var __rid=(window.__phubRid||0)+1;window.__phubRid=__rid;
var ROOT=document.getElementById('phub-root');
if(!ROOT)return;

var C={p2q:'#7c5cfc',r2po:'#4b8bff',i2p:'#10b981'};
var FLOWS={
  p2q:{title:'Quote to Order',color:C.p2q,
    desc:'From project scoping to final quote — streamline your entire quoting lifecycle with structured RFQs and intelligent bid evaluation.',
    nodes:['Project','RfQ Creation + Approvals','Negotiations','Bid Analysis & Shortlisting','Quote Calculator'],
    bullets:['Centralize project scope and requirements','Auto-generate RFQs with approval workflows','AI-assisted negotiation tracking','Compare bids side-by-side with smart shortlisting','Calculate best-fit quotes with built-in tools'],
    icons:['proj','rfq','neg','bid','calc']},
  r2po:{title:'Requisition to PO',color:C.r2po,
    desc:'From internal request to purchase order — choose the right approval path based on your procurement policies and order value.',
    nodes:['Requisition','RfQ Creation + Approvals','Negotiations','Bid Analysis & Shortlisting','PO Creation'],
    bullets:['Raise and route requisitions with multi-level approvals','Convert approved reqs directly to RFQs','Structured negotiation rounds with vendors','Bid evaluation with scoring and shortlisting','One-click PO generation post-approval'],
    icons:['req','rfq','neg','bid','po']},
  i2p:{title:'Invoice to Pay',color:C.i2p,
    desc:'From purchase order to final payment — choose the right verification path based on your supplier trust level and order criticality.',
    nodes:['Seller Invoice Creation','Goods Receipt','Quality Check','Payments','Settled'],
    bullets:['Three-way matching: PO, GR, and Invoice','Flexible bypass routes for trusted suppliers','Automated payment release after approvals','Real-time payment status tracking','Early payment discount capture'],
    icons:['inv','gr','qc','pay','done']}
};

var curFlow='p2q';
var TABS=document.querySelectorAll('.ftab');
TABS.forEach(function(t){t.onclick=function(){
  curFlow=t.dataset.flow;render.t0=null;
  TABS.forEach(function(b){var a=b.dataset.flow===curFlow;b.className='ftab'+(a?' active':'');});
}});

var ICO={
  proj:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>'},
  rfq:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'},
  neg:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M17 6H3M21 12H3M15 18H3"/></svg>'},
  bid:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>'},
  calc:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="12" y1="10" x2="12" y2="18"/><line x1="8" y1="14" x2="16" y2="14"/></svg>'},
  req:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>'},
  po:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>'},
  inv:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg>'},
  gr:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>'},
  qc:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>'},
  pay:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>'},
  done:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'}
};

function tk(){return '<svg width="7" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5l2 2 4-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'}
function tkLg(){return '<svg width="10" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5 6.5-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'}

/* Compact chip — fixed width, no expanding */
function chip(name,iconKey,done,dimmed,color){
  var ic=ICO[iconKey](done?'#18B87A':color);
  return '<div style="background:#111318;border-radius:12px;border:1.5px solid '+(done?'rgba(24,184,122,0.3)':'rgba(255,255,255,0.06)')+';padding:14px 16px;display:flex;align-items:center;gap:12px;width:100%;min-height:120px;box-sizing:border-box;opacity:'+(dimmed?0.25:1)+';transition:all 0.5s cubic-bezier(0.16,1,0.3,1)">'+
    '<div style="width:32px;height:32px;border-radius:8px;flex-shrink:0;background:'+(done?'rgba(24,184,122,0.12)':'rgba(255,255,255,0.04)')+';display:flex;align-items:center;justify-content:center">'+ic+'</div>'+
    '<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700;color:'+(done?'#18B87A':'#EEF2FF')+'">'+name+'</div><div style="font-size:9px;color:#8FA3C0;margin-top:2px">'+(done?'Complete':'Pending')+'</div></div>'+
    (done?'<div style="width:16px;height:16px;border-radius:50%;background:#18B87A;flex-shrink:0;display:flex;align-items:center;justify-content:center">'+tk()+'</div>':'')+
  '</div>';
}

/* Active card — same fixed width as chip, slightly taller with bullet */
function cardOpen(name,iconKey,color,bulletText,ms){
  var ic=ICO[iconKey](color);
  return '<div style="background:#111318;border-radius:12px;border:1.5px solid '+color+'55;box-shadow:0 0 0 4px '+color+'0a,0 12px 32px '+color+'18;padding:16px;position:relative;width:100%;min-height:120px;box-sizing:border-box;transition:all 0.5s cubic-bezier(0.16,1,0.3,1)">'+
    '<div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,'+color+','+color+'77);border-radius:12px 12px 0 0"></div>'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">'+
      '<div style="width:32px;height:32px;border-radius:8px;flex-shrink:0;background:'+color+'1a;border:1px solid '+color+'44;display:flex;align-items:center;justify-content:center">'+ic+'</div>'+
      '<div><div style="font-size:12px;font-weight:700;color:#EEF2FF">'+name+'</div><div style="font-size:9px;color:'+color+';margin-top:2px">Processing</div></div>'+
    '</div>'+
    '<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:'+color+'08;border:1px solid '+color+'18;border-radius:8px">'+
      '<div style="width:13px;height:13px;border-radius:50%;flex-shrink:0;background:'+color+';display:flex;align-items:center;justify-content:center;margin-top:1px">'+tk()+'</div>'+
      '<span style="font-size:11px;color:rgba(255,255,255,0.85);line-height:1.45">'+bulletText+'</span>'+
    '</div>'+
  '</div>';
}

function buildInfoCard(flow,visibleCount){
  var bulletsHtml='';
  var count=Math.min(visibleCount||0,flow.bullets.length);
  for(var b=0;b<count;b++){
    var isNewest=b===count-1;
    var animStyle=isNewest?'animation:bulletAppear 0.5s cubic-bezier(0.16,1,0.3,1) both;':'';
    bulletsHtml+=
      '<div style="display:flex;align-items:center;gap:14px;padding:12px 0;'+(b<count-1?'border-bottom:1px solid rgba(255,255,255,0.06);':'')+animStyle+'">'+
        '<div style="width:24px;height:24px;border-radius:50%;background:#18B87A;flex-shrink:0;display:flex;align-items:center;justify-content:center">'+tkLg()+'</div>'+
        '<span style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.92);line-height:1.4">'+flow.bullets[b]+'</span>'+
      '</div>';
  }
  return '<div>'+
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">'+
      '<span style="text-transform:uppercase;letter-spacing:2.5px;font-size:10px;font-weight:700;color:'+flow.color+'">Active Flow</span>'+
    '</div>'+
    '<h3 style="font-size:28px;font-weight:800;color:#fff;margin:0 0 12px 0;line-height:1.15;letter-spacing:-0.02em">'+flow.title+'</h3>'+
    '<p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin:0 0 24px 0">'+flow.desc+'</p>'+
    '<div style="display:flex;flex-direction:column">'+bulletsHtml+'</div>'+
  '</div>';
}

function paintDot(canvas,wrap,nodeEls,from,to,ms,dur,color){
  if(!canvas||!wrap)return;
  var wr=wrap.getBoundingClientRect();
  var dpr=window.devicePixelRatio||1;
  canvas.width=wr.width*dpr;canvas.height=wr.height*dpr;
  canvas.style.width=wr.width+'px';canvas.style.height=wr.height+'px';
  var ctx=canvas.getContext('2d');
  ctx.scale(dpr,dpr);ctx.clearRect(0,0,wr.width,wr.height);
  var fEl=nodeEls[from],tEl=nodeEls[to];
  if(!fEl||!tEl)return;
  var fR=fEl.getBoundingClientRect(),tR=tEl.getBoundingClientRect();
  var fx=fR.left+fR.width/2-wr.left,fy=fR.top+fR.height/2-wr.top;
  var tx=tR.left+tR.width/2-wr.left,ty=tR.top+tR.height/2-wr.top;
  var raw=Math.min(1,ms/dur);
  var e=raw<0.5?2*raw*raw:1-Math.pow(-2*raw+2,2)/2;
  var cx=fx+(tx-fx)*e,cy=fy+(ty-fy)*e;
  var op=raw<0.1?raw/0.1:raw>0.9?(1-raw)/0.1:1;
  var hx=color.replace('#','');
  var r=parseInt(hx.slice(0,2),16),g=parseInt(hx.slice(2,4),16),b=parseInt(hx.slice(4,6),16);
  for(var i=3;i>=1;i--){var tr=Math.max(0,raw-i*0.06);var te=tr<0.5?2*tr*tr:1-Math.pow(-2*tr+2,2)/2;
    ctx.beginPath();ctx.arc(fx+(tx-fx)*te,fy+(ty-fy)*te,3-i*0.5,0,Math.PI*2);
    ctx.fillStyle='rgba('+r+','+g+','+b+','+(op*(0.25-i*0.06))+')';ctx.fill();}
  var glow=ctx.createRadialGradient(cx,cy,0,cx,cy,18);
  glow.addColorStop(0,'rgba('+r+','+g+','+b+','+(op*0.35)+')');glow.addColorStop(1,'rgba('+r+','+g+','+b+',0)');
  ctx.beginPath();ctx.arc(cx,cy,18,0,Math.PI*2);ctx.fillStyle=glow;ctx.fill();
  ctx.beginPath();ctx.arc(cx,cy,4.5,0,Math.PI*2);ctx.fillStyle='rgba('+r+','+g+','+b+','+op+')';ctx.fill();
  ctx.beginPath();ctx.arc(cx,cy,1.8,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,'+(op*0.9)+')';ctx.fill();
}

function buildTL(){
  var f=FLOWS[curFlow];var phases=[];var acc=0;
  for(var i=0;i<f.nodes.length;i++){
    phases.push({type:'node',idx:i,start:acc,end:acc+2000});acc+=2000;
    if(i<f.nodes.length-1){phases.push({type:'dot',from:i,to:i+1,start:acc,end:acc+500});acc+=500;}
  }
  phases.push({type:'pause',start:acc,end:acc+1500});acc+=1500;
  return {phases:phases,total:acc};
}

/* Use a persistent DOM structure so the canvas survives between frames */
var built=false;
var lastFlow='';
var lastBulletCount=-1;

function ensureDOM(){
  if(built&&lastFlow===curFlow)return;
  lastFlow=curFlow;
  lastBulletCount=-1;
  var flow=FLOWS[curFlow];

  ROOT.innerHTML=
    '<div style="display:flex;gap:40px;align-items:center;height:500px">'+
      '<div id="phub-left" style="flex:1;min-width:0;position:relative">'+
        '<canvas id="phub-canvas" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:40"></canvas>'+
        '<div id="phub-nodes" style="display:flex;align-items:center;gap:10px;position:relative;z-index:5"></div>'+
      '</div>'+
      '<div id="phub-info" style="width:360px;flex-shrink:0;align-self:flex-start"></div>'+
    '</div>';
  built=true;
}

function render(now){
  if(window.__phubRid!==__rid)return;
  if(!render.t0)render.t0=now;
  var elapsed=now-render.t0;
  var flow=FLOWS[curFlow];
  var tl=buildTL();
  var cycle=elapsed%tl.total;
  var phase=tl.phases[0];
  for(var pi=0;pi<tl.phases.length;pi++){if(cycle>=tl.phases[pi].start&&cycle<tl.phases[pi].end){phase=tl.phases[pi];break;}}
  var phaseMs=cycle-phase.start;

  ensureDOM();

  var nodesWrap=document.getElementById('phub-nodes');
  var infoWrap=document.getElementById('phub-info');
  if(!nodesWrap||!infoWrap){requestAnimationFrame(render);return;}

  // Build horizontal flow nodes — each gets a fixed-width column
  var nodesHtml='';
  for(var ni=0;ni<flow.nodes.length;ni++){
    var isActive=phase.type==='node'&&phase.idx===ni;
    var isDone=(phase.type==='node'&&ni<phase.idx)||(phase.type==='dot'&&ni<=phase.from)||(phase.type==='pause');
    var dimmed=!isActive&&!isDone;
    nodesHtml+='<div id="pn-'+ni+'" style="flex:1 1 0%;min-width:0;display:flex;flex-direction:column">';
    if(isActive){nodesHtml+=cardOpen(flow.nodes[ni],flow.icons[ni],flow.color,flow.bullets[ni],phaseMs);}
    else{nodesHtml+=chip(flow.nodes[ni],flow.icons[ni],isDone,dimmed,flow.color);}
    nodesHtml+='</div>';
  }
  nodesWrap.innerHTML=nodesHtml;

  // Calculate how many bullets to show based on current phase
  var visibleBullets=0;
  if(phase.type==='node') visibleBullets=phase.idx+1;
  else if(phase.type==='dot') visibleBullets=phase.from+1;
  else if(phase.type==='pause') visibleBullets=flow.nodes.length;

  // Only update info card when bullet count changes (prevents animation restart)
  if(visibleBullets!==lastBulletCount){
    lastBulletCount=visibleBullets;
    infoWrap.innerHTML=buildInfoCard(flow,visibleBullets);
  }

  // Draw dot animation on next frame so layout is settled
  if(phase.type==='dot'){
    requestAnimationFrame(function(){
      var cvs=document.getElementById('phub-canvas');
      var nrow=document.getElementById('phub-nodes');
      if(cvs&&nrow){
        var nels={};for(var k=0;k<flow.nodes.length;k++){nels[k]=document.getElementById('pn-'+k);}
        paintDot(cvs,nrow,nels,phase.from,phase.to,phaseMs,500,flow.color);
      }
    });
  } else {
    // Clear canvas when not in dot phase
    var cvs=document.getElementById('phub-canvas');
    if(cvs){var ctx=cvs.getContext('2d');if(ctx)ctx.clearRect(0,0,cvs.width,cvs.height);}
  }

  requestAnimationFrame(render);
}

var obs=new IntersectionObserver(function(e){if(e[0]&&e[0].isIntersecting){obs.disconnect();requestAnimationFrame(render);}},{threshold:0.1});
obs.observe(ROOT);
setTimeout(function(){if(window.__phubRid===__rid)requestAnimationFrame(render);},500);
})();`

export default function ProductHubAnimation() {
  useEffect(() => {
    let script: HTMLScriptElement | null = null
    let disposed = false
    const init = () => {
      if (disposed) return
      const root = document.getElementById('phub-root')
      if (!root) { requestAnimationFrame(init); return }
      script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = SCRIPT
      document.body.appendChild(script)
    }
    init()
    return () => { disposed = true; if (script && script.parentNode) script.parentNode.removeChild(script) }
  }, [])
  return <div dangerouslySetInnerHTML={{ __html: HTML }} />
}

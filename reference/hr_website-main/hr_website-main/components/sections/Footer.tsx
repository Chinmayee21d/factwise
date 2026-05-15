'use client'
import { useEffect, useRef } from 'react'

const HTML = `
<footer class="site-footer">
  <div class="footer-shimmer-line"></div>

  <div class="footer-main">

    <!-- Brand block: logo + tagline + social all left-aligned -->
    <div class="footer-brand">
      <a href="/" style="display:inline-block;margin-bottom:12px;text-decoration:none;">
        <img src="/hrops-transparent.svg" alt="HR Ops" style="height:28px;width:auto;display:block;" />
      </a>
      <p class="footer-tagline">Hiring intelligence for India.<br/>One platform for employers, agencies, and candidates.</p>
      <div class="footer-social">
        <a href="mailto:info@hrops.io?subject=HR%20Ops%20LinkedIn" class="footer-social-link" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="mailto:info@hrops.io?subject=HR%20Ops%20Twitter" class="footer-social-link" aria-label="Twitter / X">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5.5 4.4 9 4.5-.7-3.1 1.3-6.3 4.3-6.5 1.5-.1 2.7.6 3.7 1z"/></svg>
        </a>
      </div>
    </div>

    <!-- Nav columns: Product | Company | Legal side by side -->
    <div class="footer-nav-cols">

      <div class="footer-col">
        <div class="footer-col-title">Product</div>
        <ul class="footer-col-links">
          <li><a href="#personas">For Employers</a></li>
          <li><a href="#personas">For Agencies</a></li>
          <li><a href="#ai">AI Intelligence</a></li>
          <li><a href="#workflow-builder">Magic Link</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <div class="footer-col-title">Company</div>
        <ul class="footer-col-links">
          <li><a href="/#platform">About</a></li>
          <li><a href="/#faq">Blog</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="mailto:info@hrops.io?subject=Careers%20at%20HR%20Ops">Careers</a></li>
          <li><a href="mailto:info@hrops.io?subject=Contact%20HR%20Ops">Contact</a></li>
        </ul>
      </div>

      <!-- Legal as 3rd column, collapsible on mobile -->
      <div class="footer-col footer-col-legal">
        <div class="footer-col-title" id="legal-col-toggle">
          Legal
          <span class="legal-toggle-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </div>
        <ul class="footer-col-links footer-legal-links" id="footer-legal-list">
          <li><a href="/legal/privacy">Privacy Policy</a></li>
          <li><a href="/legal/terms">Terms of Service</a></li>
          <li><a href="/legal/dpdp">DPDP Compliance</a></li>
          <li><a href="/legal/security">Security</a></li>
          <li><a href="/legal/cookies">Cookie Policy</a></li>
          <li><a href="/legal/acceptable-use">Acceptable Use</a></li>
          <li><a href="/legal/dpa">Data Processing Agreement</a></li>
          <li><a href="/legal/eu-privacy">EU/UK Privacy</a></li>
          <li><a href="/legal/sub-processors">Sub-processors</a></li>
          <li><a href="/ai-transparency">AI Transparency</a></li>
          <li><a href="/legal/cookies" id="cookie-preferences-link">Cookie Preferences</a></li>
        </ul>
      </div>

    </div>
  </div>

  <!-- Bottom bar: copyright left, quick links right -->
  <div class="footer-bottom">
    <span class="footer-copy">&copy; 2026 HR Ops Technologies Pvt. Ltd. &middot; Built for India 🇮🇳</span>
    <div class="footer-bottom-links">
      <a href="/legal/privacy">Privacy</a>
      <span class="footer-dot"></span>
      <a href="/legal/terms">Terms</a>
      <span class="footer-dot"></span>
      <a href="/ai-transparency">AI Transparency</a>
    </div>
  </div>
</footer>

<style>
.site-footer {
  background: var(--navy2);
  border-top: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

/* Animated shimmer line on top */
.footer-shimmer-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(196,154,60,0) 30%, rgba(196,154,60,0.7) 50%, rgba(196,154,60,0) 70%, transparent 100%);
  background-size: 200% 100%;
  background-position: -200% 0;
  transition: background-position 0s;
  pointer-events: none;
}
.site-footer:hover .footer-shimmer-line {
  background-position: 200% 0;
  transition: background-position 1.2s ease;
}

/* ── Main grid: brand (220px) | nav columns (rest) ── */
.footer-main {
  max-width: min(96vw, 1640px);
  margin: 0 auto;
  padding: 52px clamp(20px, 4.8vw, 64px) 36px;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 64px;
  align-items: start;
}

/* ── Brand: all left-aligned, no axis shift ── */
.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

.footer-tagline {
  font-size: 12.5px;
  color: var(--text3);
  line-height: 1.7;
  margin: 0 0 18px;
  max-width: 200px;
}

/* Social icons: bigger, clearer */
.footer-social {
  display: flex;
  gap: 8px;
  align-items: center;
}

.footer-social-link {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text3);
  text-decoration: none;
  transition: color .2s, background .2s, border-color .2s, transform .2s, box-shadow .2s;
}
.footer-social-link svg {
  width: 15px;
  height: 15px;
}
.footer-social-link:hover {
  color: var(--gold);
  background: var(--gold-bg);
  border-color: rgba(196,154,60,0.35);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(196,154,60,0.18);
}

/* ── Nav columns: Product | Company | Legal ── */
.footer-nav-cols {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 32px;
  align-items: start;
}

.footer-col-title {
  font-size: 10px;
  font-weight: 700;
  color: var(--text2);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.legal-toggle-arrow {
  display: none;
  color: var(--text3);
  transition: transform .25s;
}

.footer-col-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Legal links: 2 columns to fit the longer list cleanly */
.footer-legal-links {
  display: grid !important;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
}

.footer-col-links a {
  font-size: 12.5px;
  color: var(--text3);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0;
  transition: color .18s, gap .2s, padding-left .2s;
}
.footer-col-links a::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width .2s ease;
  flex-shrink: 0;
}
.footer-col-links a:hover {
  color: var(--text);
  gap: 6px;
}
.footer-col-links a:hover::before {
  width: 8px;
}

/* ── Bottom bar ── */
.footer-bottom {
  max-width: min(96vw, 1640px);
  margin: 0 auto;
  padding: 18px clamp(20px, 4.8vw, 64px);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-copy {
  font-size: 11.5px;
  color: var(--text3);
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 10px;
}
.footer-bottom-links a {
  font-size: 11.5px;
  color: var(--text3);
  text-decoration: none;
  transition: color .18s;
}
.footer-bottom-links a:hover {
  color: var(--gold);
}
.footer-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text3);
  opacity: 0.4;
  display: inline-block;
}

/* ── Tablet (601–900px) ── */
@media (max-width: 900px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 40px 28px 28px;
  }
  .footer-brand {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 16px;
  }
  .footer-brand > a {
    width: 100%;
    margin-bottom: 0 !important;
  }
  .footer-tagline {
    flex: 1;
    min-width: 180px;
    margin-bottom: 0;
    max-width: none;
  }
  .footer-social {
    flex-direction: row;
    align-self: flex-start;
  }
  .footer-nav-cols {
    grid-template-columns: 1fr 1fr 2fr;
    gap: 20px;
  }
}

/* ── Mobile (≤600px) ── */
@media (max-width: 600px) {
  .footer-main {
    padding: 32px 18px 24px;
    gap: 28px;
  }
  .footer-brand {
    flex-direction: column;
    gap: 10px;
  }
  .footer-brand > a {
    width: auto;
  }
  .footer-tagline {
    max-width: 100%;
    margin-bottom: 0;
  }
  .footer-social {
    flex-direction: row;
  }

  /* Product + Company side by side, Legal full-width below */
  .footer-nav-cols {
    grid-template-columns: 1fr 1fr;
    gap: 20px 16px;
  }
  .footer-col-legal {
    grid-column: 1 / -1;
    border-top: 1px solid var(--border);
    padding-top: 16px;
    margin-top: 4px;
  }
  .footer-col-legal .footer-col-title {
    cursor: pointer;
    user-select: none;
    margin-bottom: 0;
  }
  .legal-toggle-arrow {
    display: flex;
  }
  .footer-col-legal.open .legal-toggle-arrow svg {
    transform: rotate(180deg);
  }
  .footer-legal-links {
    max-height: 0;
    overflow: hidden;
    transition: max-height .35s ease, margin-top .25s;
    margin-top: 0;
    grid-template-columns: 1fr 1fr;
    gap: 6px 12px;
  }
  .footer-col-legal.open .footer-legal-links {
    max-height: 400px;
    margin-top: 12px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 16px 18px;
  }
  .footer-bottom-links {
    flex-wrap: wrap;
    gap: 8px;
  }
}

/* ── Very small (≤400px) ── */
@media (max-width: 400px) {
  .footer-nav-cols {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .footer-col-legal {
    grid-column: auto;
  }
  .footer-legal-links {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
`

const SCRIPT = `
// NAV SCROLL
window.addEventListener('scroll',()=>{
  const nav = document.getElementById('main-nav');
  if(nav) nav.classList.toggle('scrolled',window.scrollY>20);
});

// PARALLAX
const pxCards=document.querySelectorAll('[data-px]');
window.addEventListener('scroll',()=>{pxCards.forEach(c=>{c.style.transform=\`translateY(\${window.scrollY*parseFloat(c.dataset.px)}px)\`;});});

// REVEAL
const ro=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible');});},{threshold:.08,rootMargin:'0px 0px -32px 0px'});
document.querySelectorAll('.reveal,.reveal-r,.reveal-l').forEach(el=>ro.observe(el));

// COUNTERS
const co=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){const t=parseInt(x.target.dataset.t);let c=0;const step=t/42;const ti=setInterval(()=>{c=Math.min(c+step,t);x.target.textContent=Math.floor(c).toLocaleString();if(c>=t)clearInterval(ti);},28);co.unobserve(x.target);}});},{threshold:.5});
document.querySelectorAll('.cu').forEach(el=>co.observe(el));

// AI TABS
const aiTabs=document.querySelectorAll('.ai-tab');
const aiPanels=document.querySelectorAll('.ai-panel');
aiTabs.forEach(tab=>{tab.addEventListener('mouseenter',()=>{aiTabs.forEach(t=>t.classList.remove('active'));aiPanels.forEach(p=>p.classList.remove('active'));tab.classList.add('active');const p=document.getElementById('panel-'+tab.dataset.panel);if(p)p.classList.add('active');});});

// MAGIC LINK STEPS
const mlSteps=document.querySelectorAll('.ml-step');
mlSteps.forEach(step=>{step.addEventListener('mouseenter',()=>{mlSteps.forEach(s=>s.classList.remove('active'));step.classList.add('active');[0,1,2].forEach(i=>{ const p=document.getElementById('ml-panel-'+i); if(p)p.style.display='none'; });const panel=document.getElementById('ml-panel-'+step.dataset.mlpanel);if(panel)panel.style.display='block';});});

// PRICING TOGGLES
let isAnn=false;
function showEmp(){document.getElementById('empBlock').style.display='block';document.getElementById('agBlock').classList.remove('active');document.getElementById('et').classList.add('active');document.getElementById('at').classList.remove('active');}
function showAg(){document.getElementById('empBlock').style.display='none';document.getElementById('agBlock').classList.add('active');document.getElementById('et').classList.remove('active');document.getElementById('at').classList.add('active');}
function toggleBill(){isAnn=!isAnn;document.getElementById('bs').classList.toggle('on',isAnn);document.getElementById('ap').style.opacity=isAnn?'1':'0';document.getElementById('ml2').classList.toggle('on',!isAnn);document.getElementById('al2').classList.toggle('on',isAnn);['ba','pa','aba','apa'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.opacity=isAnn?'1':'0';});document.querySelectorAll('.pcard-amt').forEach(el=>{const v=isAnn?el.dataset.a:el.dataset.m;if(v)el.textContent=v;});}

// SVG PATH ANIMATE
const svgObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){const paths=x.target.querySelectorAll('path,line');paths.forEach((p,i)=>{try{const l=p.getTotalLength();p.style.strokeDasharray=l;p.style.strokeDashoffset=l;p.style.transition=\`stroke-dashoffset 1.2s \${i*0.08}s ease\`;p.style.strokeDashoffset=0;}catch(e){}});x.target.dataset.animated=1;svgObs.unobserve(x.target);}});},{threshold:0.2});
document.querySelectorAll('.svg-anim').forEach(el=>svgObs.observe(el));

// Cookie preferences
const cookiePrefsLink = document.getElementById('cookie-preferences-link');
if (cookiePrefsLink) {
  cookiePrefsLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.dispatchEvent(new Event('open-cookie-preferences'));
  });
}

// Legal accordion (mobile)
const legalToggle = document.getElementById('legal-col-toggle');
const legalCol = legalToggle ? legalToggle.closest('.footer-col-legal') : null;
if (legalToggle && legalCol) {
  legalToggle.addEventListener('click', () => {
    legalCol.classList.toggle('open');
  });
}
`

export default function Footer() {
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true
    const t = setTimeout(() => {
      try {
        new Function(SCRIPT)()
      } catch (e) {
        console.warn(e)
      }
    }, 100)
    return () => clearTimeout(t)
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: HTML }} />
}
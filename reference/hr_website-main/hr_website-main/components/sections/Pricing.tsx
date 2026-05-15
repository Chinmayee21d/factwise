'use client'

import { useEffect } from 'react'

export default function Pricing() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.pcard')
    const handlers = new Map<HTMLElement, (e: MouseEvent) => void>()
    cards.forEach(card => {
      const fn = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1)
        const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1)
        card.style.setProperty('--mx', x + '%')
        card.style.setProperty('--my', y + '%')
      }
      handlers.set(card, fn)
      card.addEventListener('mousemove', fn)
    })
    return () => {
      handlers.forEach((fn, card) => card.removeEventListener('mousemove', fn))
    }
  }, [])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
<div class="pricing-section" id="pricing">
  <div class="wrap">

    <!-- Header -->
    <div class="reveal section-title-center" style="max-width:640px;margin:0 auto 48px;">
      <div class="eyebrow eyebrow-dark"><div class="ey-line"></div>Pricing</div>
      <h2 class="h2 h2-ink">Transparent pricing.<br><em>No per-user fees.</em></h2>
      <p class="lead lead-ink">One price per company. Your entire team included.</p>
    </div>

    <!-- Controls row: toggle + billing in one line -->
    <div class="pricing-controls reveal">
      <div class="ptog">
        <button class="ptog-btn active" id="et" onclick="showEmp()">For Employers</button>
        <button class="ptog-btn" id="at" onclick="showAg()">For Agencies</button>
      </div>
      <div class="pricing-ctrl-divider"></div>
      <div class="billing-row">
        <span class="bl-lbl on" id="ml2">Monthly</span>
        <div class="bl-sw" id="bs" onclick="toggleBill()"><div class="bl-knob"></div></div>
        <span class="bl-lbl" id="al2">Annual</span>
        <span class="annual-pill" id="ap" style="opacity:0">2 months free</span>
      </div>
    </div>

    <!-- EMPLOYER PLANS -->
    <div id="empBlock">
      <div class="p-cards reveal">

        <!-- Basic -->
        <div class="pcard pcard-basic">
          <div class="pcard-top">
            <div class="pcard-tier-label">Basic</div>
            <div class="pcard-name">For growing teams.</div>
            <div class="pcard-price-row">
              <span class="pcard-cur">&#8377;</span>
              <span class="pcard-amt" data-m="4,999" data-a="4,166">4,999</span>
              <span class="pcard-per">/month</span>
            </div>
            <div class="pcard-annual" id="ba" style="opacity:0">&#8377;49,990/yr &middot; save &#8377;9,998</div>
          </div>
          <div class="pcard-body">
            <div class="pcard-limits">
              <span class="pcard-limit">3 users</span>
              <span class="pcard-limit">2 active jobs</span>
              <span class="pcard-limit">BYOK AI</span>
            </div>
            <div class="pcard-feats">
              <div class="pcard-feat"><div class="pf-ck pfck-gold"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>AI screening with reasoning</div>
              <div class="pcard-feat"><div class="pf-ck pfck-gold"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Visual pipeline builder</div>
              <div class="pcard-feat"><div class="pf-ck pfck-gold"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Magic Link assessments</div>
              <div class="pcard-feat"><div class="pf-ck pfck-gold"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Agency connections</div>
              <div class="pcard-feat"><div class="pf-ck pfck-gold"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Basic analytics (90 days)</div>
            </div>
            <a href="#" class="pcard-cta pcta-outline" data-gs-plan="basic" data-gs-type="employer">Get started</a>
          </div>
        </div>

        <!-- Pro (featured) -->
        <div class="pcard feat">
          <div class="pcard-glow"></div>
          <div class="pcard-feat-lbl">
            <svg viewBox="0 0 10 10" width="8" height="8" fill="currentColor"><path d="M5 0l1.5 3.1L10 3.6 7.5 6l.6 3.5L5 8 1.9 9.5 2.5 6 0 3.6l3.5-.5z"/></svg>
            Most Popular
          </div>
          <div class="pcard-top">
            <div class="pcard-tier-label pcard-tier-pro">Pro</div>
            <div class="pcard-name">The full AI advantage.</div>
            <div class="pcard-price-row">
              <span class="pcard-cur pcard-cur-gold">&#8377;</span>
              <span class="pcard-amt" data-m="9,999" data-a="8,333">9,999</span>
              <span class="pcard-per">/month</span>
            </div>
            <div class="pcard-annual" id="pa" style="opacity:0">&#8377;99,990/yr &middot; save &#8377;19,998</div>
          </div>
          <div class="pcard-body">
            <div class="pcard-limits">
              <span class="pcard-limit pcard-limit-feat">10 users</span>
              <span class="pcard-limit pcard-limit-feat">Unlimited jobs</span>
              <span class="pcard-limit pcard-limit-feat">HR Ops AI</span>
            </div>
            <div class="pcard-feats">
              <div class="pcard-feat pcard-feat-inherit"><div class="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div><span>Everything in Basic</span></div>
              <div class="pcard-divider-feat"></div>
              <div class="pcard-feat"><div class="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>HR Ops AI &mdash; no BYOK required</div>
              <div class="pcard-feat"><div class="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Learning loop</div>
              <div class="pcard-feat"><div class="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Natural language analytics</div>
              <div class="pcard-feat"><div class="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Panel variance flags</div>
              <div class="pcard-feat"><div class="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>ERP integration (SAP, Tally, NetSuite)</div>
            </div>
            <a href="#" class="pcard-cta pcta-gold" data-gs-plan="pro" data-gs-type="employer">Get started</a>
          </div>
        </div>

        <!-- Enterprise -->
        <div class="pcard pcard-enterprise">
          <div class="pcard-top">
            <div class="pcard-tier-label pcard-tier-ent">Enterprise</div>
            <div class="pcard-name">Custom infrastructure.</div>
            <div class="pcard-custom">Custom</div>
            <div class="pcard-ent-sub">Annual &middot; Volume pricing</div>
          </div>
          <div class="pcard-body">
            <div class="pcard-limits">
              <span class="pcard-limit pcard-limit-ent">Unlimited everything</span>
            </div>
            <div class="pcard-feats">
              <div class="pcard-feat pcard-feat-inherit"><div class="pf-ck pfck-blue"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div><span>Everything in Pro</span></div>
              <div class="pcard-divider-feat"></div>
              <div class="pcard-feat"><div class="pf-ck pfck-blue"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>SSO &mdash; SAML 2.0 / OIDC</div>
              <div class="pcard-feat"><div class="pf-ck pfck-blue"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>DPDP / GDPR / SOC 2</div>
              <div class="pcard-feat"><div class="pf-ck pfck-blue"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Full API access</div>
              <div class="pcard-feat"><div class="pf-ck pfck-blue"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Dedicated success manager</div>
            </div>
            <a href="#" class="pcard-cta pcta-ent" data-gs-plan="enterprise" data-gs-type="employer">Talk to us</a>
          </div>
        </div>

      </div>

    </div>

    <!-- AGENCY PLANS -->
    <div id="agBlock" class="ag-block">
      <div class="ag-note reveal">
        <svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" stroke-width="1.6"/><path d="M7 6.5v4M7 4.5v.5" stroke-width="1.8" stroke-linecap="round"/></svg>
        <div><strong style="color:var(--text3)">Agency pricing = flat </strong><strong style="color:var(--text4)">workspace fee</strong><strong style="color:var(--text3)"> + </strong><strong style="color:var(--text4)">per-client slot fee</strong>. <strong style="color:var(--text3)">Slots get cheaper as you grow.</strong></div>
      </div>
      <div class="p-cards reveal">

        <div class="pcard pcard-basic">
          <div class="pcard-top">
            <div class="pcard-tier-label">Agency Basic</div>
            <div class="pcard-name">For boutique consultancies.</div>
            <div class="pcard-price-row">
              <span class="pcard-cur">&#8377;</span>
              <span class="pcard-amt" data-m="9,999" data-a="8,333">9,999</span>
              <span class="pcard-per">/mo workspace</span>
            </div>
            <div class="pcard-annual" id="aba" style="opacity:0">&#8377;99,990/yr &middot; save &#8377;19,998</div>
          </div>
          <div class="pcard-body">
            <div class="pcard-limits">
              <span class="pcard-limit">5 users</span>
              <span class="pcard-limit">Unlimited jobs</span>
            </div>
            <div class="pcard-feats">
              <div class="pcard-feat"><div class="pf-ck pfck-gold"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Magic Link candidate flows</div>
              <div class="pcard-feat"><div class="pf-ck pfck-gold"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>AI screening (3 models)</div>
              <div class="pcard-feat"><div class="pf-ck pfck-gold"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Commission tracker</div>
              <div class="pcard-feat"><div class="pf-ck pfck-gold"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Basic agreement builder</div>
            </div>
            <a href="#" class="pcard-cta pcta-outline" data-gs-plan="basic" data-gs-type="agency">Get started</a>
          </div>
        </div>

        <div class="pcard feat">
          <div class="pcard-glow"></div>
          <div class="pcard-feat-lbl">
            <svg viewBox="0 0 10 10" width="8" height="8" fill="currentColor"><path d="M5 0l1.5 3.1L10 3.6 7.5 6l.6 3.5L5 8 1.9 9.5 2.5 6 0 3.6l3.5-.5z"/></svg>
            Most Popular
          </div>
          <div class="pcard-top">
            <div class="pcard-tier-label pcard-tier-pro">Agency Pro</div>
            <div class="pcard-name">Full intelligence, all clients.</div>
            <div class="pcard-price-row">
              <span class="pcard-cur pcard-cur-gold">&#8377;</span>
              <span class="pcard-amt" data-m="20,000" data-a="16,667">20,000</span>
              <span class="pcard-per">/mo workspace</span>
            </div>
            <div class="pcard-annual" id="apa" style="opacity:0">&#8377;2,00,000/yr &middot; save &#8377;40,000</div>
          </div>
          <div class="pcard-body">
            <div class="pcard-limits">
              <span class="pcard-limit pcard-limit-feat">Unlimited users</span>
              <span class="pcard-limit pcard-limit-feat">Unlimited jobs</span>
            </div>
            <div class="pcard-feats">
              <div class="pcard-feat pcard-feat-inherit"><div class="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div><span>Everything in Basic</span></div>
              <div class="pcard-divider-feat"></div>
              <div class="pcard-feat"><div class="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Full 7-signal ML matching</div>
              <div class="pcard-feat"><div class="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Agreement builder + auto-calculation</div>
              <div class="pcard-feat"><div class="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>White-label client portal</div>
              <div class="pcard-feat"><div class="pf-ck pfck-green"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>ERP commission payable sync</div>
            </div>
            <a href="#" class="pcard-cta pcta-gold" data-gs-plan="pro" data-gs-type="agency">Get started</a>
          </div>
        </div>

        <div class="pcard pcard-enterprise">
          <div class="pcard-top">
            <div class="pcard-tier-label pcard-tier-ent">Agency Enterprise</div>
            <div class="pcard-name">Large staffing firms.</div>
            <div class="pcard-custom">Custom</div>
            <div class="pcard-ent-sub">Annual &middot; Volume</div>
          </div>
          <div class="pcard-body">
            <div class="pcard-limits">
              <span class="pcard-limit pcard-limit-ent">Unlimited everything</span>
            </div>
            <div class="pcard-feats">
              <div class="pcard-feat pcard-feat-inherit"><div class="pf-ck pfck-blue"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div><span>Everything in Pro</span></div>
              <div class="pcard-divider-feat"></div>
              <div class="pcard-feat"><div class="pf-ck pfck-blue"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Custom ML signals</div>
              <div class="pcard-feat"><div class="pf-ck pfck-blue"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>SSO + DPDP / SOC 2</div>
              <div class="pcard-feat"><div class="pf-ck pfck-blue"><svg viewBox="0 0 8 8"><polyline points="1.5,4 3,5.5 6.5,2"/></svg></div>Full API + custom integrations</div>
            </div>
            <a href="#" class="pcard-cta pcta-ent" data-gs-plan="enterprise" data-gs-type="agency">Talk to us</a>
          </div>
        </div>

      </div>

      <div class="slot-box reveal">
        <div class="slot-hd">
          <div>
            <div class="slot-hd-title">Per-client slot pricing</div>
            <div class="slot-hd-sub">Volume discounts applied automatically</div>
          </div>
        </div>
        <div class="slot-tiers">
          <div class="slot-tier"><div class="slot-range">1&ndash;5 clients</div><div class="slot-price">&#8377;499</div><div class="slot-unit">per client / month</div></div>
          <div class="slot-tier"><div class="slot-range">6&ndash;15 clients</div><div class="slot-price">&#8377;399</div><div class="slot-unit">per client / month</div><div class="slot-disc">Save 20%</div></div>
          <div class="slot-tier"><div class="slot-range">16&ndash;30 clients</div><div class="slot-price">&#8377;299</div><div class="slot-unit">per client / month</div><div class="slot-disc">Save 40%</div></div>
          <div class="slot-tier"><div class="slot-range">31+ clients</div><div class="slot-price">&#8377;199</div><div class="slot-unit">per client / month</div><div class="slot-disc">Save 60%</div></div>
        </div>
        <div class="slot-note">Example: Agency Pro + 12 clients = &#8377;20,000 + (5&times;&#8377;499) + (7&times;&#8377;399) = <strong>&#8377;25,288/month</strong></div>
      </div>
    </div>

  </div>
</div>

<style>
@media (max-width: 640px) {
  .pricing-controls {
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .pricing-ctrl-divider {
    display: none;
  }
  .billing-row {
    width: 100%;
    justify-content: center;
  }
  .p-cards {
    max-width: 360px;
    margin-left: auto;
    margin-right: auto;
  }
  .pcard:nth-child(3) {
    grid-column: auto;
  }
}

@media (min-width: 641px) {
  .pricing-section .wrap {
    max-width: min(96vw, 1280px);
  }
}
</style>

<script>
(function() {
  var isAnnual = false;

  function initCardGlow() {
    document.querySelectorAll('.pcard').forEach(function(card) {
      if (card.__glowInit) return;
      card.__glowInit = true;
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
        var y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });
  }
  initCardGlow();

  // ── CTA routing: Get started → /get-started form ──────────────
  document.addEventListener('click', function(e) {
    var el = e.target.closest('[data-gs-plan]');
    if (!el) return;
    e.preventDefault();
    var plan = el.getAttribute('data-gs-plan');
    var type = el.getAttribute('data-gs-type');
    var billing = isAnnual ? 'annual' : 'monthly';
    window.location.href = '/get-started?plan=' + plan + '&type=' + type + '&billing=' + billing;
  });

  function reanimateCards() {
    document.querySelectorAll('.pcard').forEach(function(c, i) {
      c.style.animation = 'none';
      void c.offsetHeight;
      c.style.animation = '';
      c.style.animationDelay = (i * 0.08) + 's';
    });
    initCardGlow();
  }

  window.showEmp = function() {
    document.getElementById('empBlock').style.display = '';
    document.getElementById('agBlock').classList.remove('active');
    document.getElementById('et').classList.add('active');
    document.getElementById('at').classList.remove('active');
    reanimateCards();
  };

  window.showAg = function() {
    document.getElementById('empBlock').style.display = 'none';
    document.getElementById('agBlock').classList.add('active');
    document.getElementById('et').classList.remove('active');
    document.getElementById('at').classList.add('active');
    reanimateCards();
  };

  window.toggleBill = function() {
    isAnnual = !isAnnual;
    var sw = document.getElementById('bs');
    var ml = document.getElementById('ml2');
    var al = document.getElementById('al2');
    var ap = document.getElementById('ap');
    sw.classList.toggle('on', isAnnual);
    ml.classList.toggle('on', !isAnnual);
    al.classList.toggle('on', isAnnual);
    if (ap) ap.style.opacity = isAnnual ? '1' : '0';
    document.querySelectorAll('.pcard-amt').forEach(function(el) {
      var m = el.dataset.m, a = el.dataset.a;
      if (!m || !a) return;
      el.style.transition = 'opacity .2s';
      el.style.opacity = '0';
      setTimeout(function() { el.textContent = isAnnual ? a : m; el.style.opacity = '1'; }, 160);
    });
    ['ba','pa','aba','apa'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.style.opacity = isAnnual ? '1' : '0';
    });
  };
})();
</script>
`,
      }}
    />
  )
}
'use client'
import { useEffect } from 'react'
import AIHiringDashboard from './AIHiringDashboard'

const HTML_PART1 = `<div class="section-light" id="platform">
  <div class="wrap">
    <div class="reveal" style="max-width:640px;margin-bottom:20px;">
      <div class="eyebrow eyebrow-dark"><div class="ey-line"></div>One Platform</div>
      <h2 class="h2 h2-ink">Everyone in the hire,<br><em>on the same page.</em></h2>
      <p class="lead lead-ink">Watch the complete hiring journey — from agency submission to final offer approval — all in one connected platform, in real time.</p>
    </div>

    <div class="reveal" style="margin-top:28px;">

      <div class="plat-layout">
        <!-- Feature cards — left column -->
        <div class="plat-fcards">
          <div class="plat-fcard">
            <div class="plat-fcard-glow" style="background:rgba(200,151,58,.3);"></div>
            <div class="plat-fcard-icon pfi-gold"><svg viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="1.5" width="6" height="6" rx="1.2"/><rect x="9.5" y="1.5" width="6" height="6" rx="1.2"/><rect x="1.5" y="9.5" width="6" height="6" rx="1.2"/><path d="M9.5 12.5h7M13 9.5v6"/></svg></div>
            <div class="plat-fcard-ttl">Scoped by role</div>
            <div class="plat-fcard-desc">Agencies never see salary bands. Candidates never see AI scores. Every party sees only what advances the hire.</div>
          </div>
          <div class="plat-fcard">
            <div class="plat-fcard-glow" style="background:rgba(22,179,116,.22);"></div>
            <div class="plat-fcard-icon pfi-grn"><svg viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="8.5" cy="8.5" r="6.5"/><path d="M8.5 5.5v3l2 2"/></svg></div>
            <div class="plat-fcard-ttl">Real-time for everyone</div>
            <div class="plat-fcard-desc">When HR moves a candidate forward, the agency sees it immediately. When a candidate submits via Magic Link, you know in seconds.</div>
          </div>
          <div class="plat-fcard">
            <div class="plat-fcard-glow" style="background:rgba(47,110,240,.25);"></div>
            <div class="plat-fcard-icon pfi-blu"><svg viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 11.5c0 .5-.1 1-.3 1.4-.3.5-.7.9-1.2 1.1-.5.3-1.1.4-2 .4H6.5c-.9 0-1.5-.1-2-.4-.5-.2-.9-.6-1.2-1.1C2.1 12.5 2 12 2 11.5"/><path d="M8.5 2.5v8M5.5 7.5l3 3 3-3"/></svg></div>
            <div class="plat-fcard-ttl">WhatsApp native</div>
            <div class="plat-fcard-desc">Reminders, Magic Links, and status updates delivered on WhatsApp — where Indian candidates and agencies actually respond.</div>
          </div>
        </div>

        <!-- Dashboard — right column, tabs embedded in titlebar -->
        <div class="plat-dash-wrap">
          <div class="dash">
            <div class="dash-titlebar plat-titlebar">
              <div class="dash-dots"><span class="dd-r"></span><span class="dd-y"></span><span class="dd-g"></span></div>
              <div class="dash-tb-right">HR Ops Platform</div>
            </div>

            <div class="app-grid" id="appGrid" style="position:relative;">
              <div class="dash-sb">
                <div class="dash-sb-top">
                  <div class="dash-sb-lbl">Viewing as</div>
                  <div class="dash-view-as">
                    <div class="dash-va-dot" id="vaDot"></div>
                    <div class="dash-va-name" id="vaName">Agency Portal</div>
                    <div class="dash-va-chip" id="vaChip">Submissions</div>
                  </div>
                </div>
                <div class="dash-sb-feed-wrap">
                  <div class="dash-sb-lbl">Live activity</div>
                  <div class="dash-sb-feed" id="sbFeed"></div>
                </div>
              </div>

              <div class="dash-cv">
                <div class="dash-cv-top">
                  <div class="dash-cv-l">
                    <div class="dash-cv-dot" id="cvDot"></div>
                    <div>
                      <div class="dash-cv-title" id="cvTitle">Agency Submissions</div>
                      <div class="dash-cv-sub" id="cvSub">TalentHub · 6 candidates</div>
                    </div>
                    <div class="dash-cv-tags" id="cvTags"></div>
                  </div>
                  <div class="dash-cv-r" id="cvBtns"></div>
                </div>
                <div class="dash-cv-body" id="cvBody"></div>
              </div>

              <div class="dash-np">
                <div class="dash-np-hd">
                  <div class="dash-np-ttl">Notifications</div>
                  <div class="dash-np-live"><div class="dash-blink"></div>Live</div>
                </div>
                <div class="dash-np-scroll" id="npScroll"></div>
              </div>

              <div class="dash-cur" id="curEl" style="display:none;left:100px;top:100px;">
                <div class="dash-cur-ring" id="curRing"></div>
                <svg class="dash-cur-svg" viewBox="0 0 20 22" fill="none">
                  <path d="M3.5 2.5l13.5 8.5-7.5 1.5L8 21 3.5 2.5z" fill="white" stroke="#060d18" stroke-width="1.4" stroke-linejoin="round"/>
                </svg>
              </div>

              <div class="dash-caption" id="caption"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

`

const HTML_PART2 = `<!-- MAGIC LINK + WORKFLOW SECTION (LIGHT) -->
<div class="section-light" id="workflow">
  <div class="wrap">
    <div class="workflow-layout">
      <div class="reveal-l">
        <div class="eyebrow eyebrow-dark"><div class="ey-line"></div>Magic Link + Workflow</div>
        <h2 class="h2 h2-ink">The process runs itself.<br><em>You just decide.</em></h2>
        <p class="lead lead-ink" style="margin-bottom:32px;">One URL. No app, no account creation. Candidate completes everything from their phone. WhatsApp reminders chase them so you don't have to.</p>
        <div class="ml-steps" id="mlSteps">

          <!-- Step 01 -->
          <div class="ml-step active" data-mlpanel="0">
            <div class="step-num-wrap"><div class="step-num-circle">01</div><div class="step-divider-line"></div></div>
            <div style="flex:1;">
              <div class="step-t">You generate a Magic Link</div>
              <div class="step-d">One click creates a candidate-specific, expiry-controlled URL. Works on any browser, any device. No account needed.</div>
              <div class="step-tag">Link ready in under a second</div>
              <!-- MOBILE INLINE PANEL 0 -->
              <div class="ml-step-inline-panel">
                <div class="wf-visual-panel" style="margin-top:16px;">
                  <div class="wf-vis-topbar">
                    <span style="background:#FF5F57;"></span><span style="background:#FFBD2E;"></span><span style="background:#28C840;"></span>
                    <div class="wf-vis-url">hrops.in/apply/jX7k9mP2qR · Expires 48h</div>
                  </div>
                  <div class="wf-anim">
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;padding:14px;background:rgba(196,154,60,.06);border:1px solid rgba(196,154,60,.15);border-radius:10px;">
                      <div style="width:36px;height:36px;background:var(--gold-bg);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </div>
                      <div><div style="font-size:12px;font-weight:700;color:var(--ink);">Magic Link generated</div><div style="font-size:10.5px;color:var(--ink3);">Senior Backend Engineer · Priya Sharma</div></div>
                    </div>
                    <div style="font-family:monospace;font-size:11px;color:var(--ink3);background:rgba(12,24,40,.05);border:1px solid rgba(12,24,40,.08);border-radius:8px;padding:11px 13px;margin-bottom:14px;">hrops.in/apply/jX7k9mP2qR</div>
                    <div class="ml-check-panel">
                      <div class="ml-cp-title">Assessment — Senior Backend Engineer</div>
                      <div class="ml-cp-sub">Powered by HR Ops · No account needed</div>
                      <div class="ml-cp-rows">
                        <div class="ml-cp-row"><span>Profile auto-filled from resume</span><span class="ml-pass">✓</span></div>
                        <div class="ml-cp-row"><span>Technical assessment submitted</span><span class="ml-pass">✓</span></div>
                        <div class="ml-cp-row"><span>Documents uploaded to Drive</span><span class="ml-pass">✓</span></div>
                        <div class="ml-cp-row"><span>Expected CTC confirmed</span><span class="ml-pass">✓</span></div>
                      </div>
                      <div class="ml-cp-success">✓ Complete. HR notified instantly.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 02 -->
          <div class="ml-step" data-mlpanel="1">
            <div class="step-num-wrap"><div class="step-num-circle">02</div><div class="step-divider-line"></div></div>
            <div style="flex:1;">
              <div class="step-t">Candidate receives it on WhatsApp</div>
              <div class="step-d">Taps, completes assessment, uploads documents. All from one URL. Response rate 3x higher than email alone.</div>
              <div class="step-tag">WhatsApp + Email delivered</div>
              <!-- MOBILE INLINE PANEL 1 -->
              <div class="ml-step-inline-panel">
                <div class="wf-visual-panel" style="margin-top:16px;">
                  <div class="wf-vis-topbar">
                    <span style="background:#FF5F57;"></span><span style="background:#FFBD2E;"></span><span style="background:#28C840;"></span>
                    <div class="wf-vis-url">WhatsApp · HR Ops Notifications</div>
                  </div>
                  <div class="wf-anim">
                    <div class="wa-card" style="margin-top:0;">
                      <div class="wa-hd">
                        <div class="wa-icon-box"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.302A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="white"/></svg></div>
                        <div class="wa-app-name">WhatsApp · HR Ops</div><div class="wa-time">just now</div>
                      </div>
                      <div class="wa-msg">Hi Priya 👋 Your assessment for Senior Backend Engineer at Acme is ready — takes 15 mins. hrops.in/apply/jX7k9mP2qR (expires 48h)</div>
                    </div>
                    <div style="margin-top:14px;background:rgba(12,24,40,.04);border-radius:10px;padding:14px;">
                      <div style="font-size:11px;font-weight:700;color:var(--ink);margin-bottom:10px;">Response rate comparison</div>
                      <div style="display:flex;flex-direction:column;gap:8px;">
                        <div>
                          <div style="display:flex;justify-content:space-between;font-size:10.5px;color:var(--ink3);margin-bottom:3px;"><span>WhatsApp + Magic Link</span><span style="font-weight:700;color:#0A7A4A">78%</span></div>
                          <div style="height:5px;background:rgba(12,24,40,.08);border-radius:100px;overflow:hidden;"><div style="width:78%;height:100%;background:var(--green);border-radius:100px;"></div></div>
                        </div>
                        <div>
                          <div style="display:flex;justify-content:space-between;font-size:10.5px;color:var(--ink3);margin-bottom:3px;"><span>Email only</span><span style="font-weight:700;color:var(--ink3)">24%</span></div>
                          <div style="height:5px;background:rgba(12,24,40,.08);border-radius:100px;overflow:hidden;"><div style="width:24%;height:100%;background:rgba(12,24,40,.25);border-radius:100px;"></div></div>
                        </div>
                      </div>
                    </div>
                    <div style="margin-top:12px;font-size:11px;color:var(--ink3);background:rgba(12,24,40,.04);border-radius:8px;padding:10px 12px;">
                      Auto-reminder sent if no response in 24h. Second reminder at 36h. Link expired at 48h and flagged for HR review.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 03 -->
          <div class="ml-step" data-mlpanel="2">
            <div class="step-num-wrap"><div class="step-num-circle">03</div></div>
            <div style="flex:1;">
              <div class="step-t">Dashboard updates in real time</div>
              <div class="step-d">As the candidate completes each step, your pipeline updates live. AI screens instantly. Calendar invite fires when shortlisted.</div>
              <div class="step-tag">Zero manual follow-up</div>
              <!-- MOBILE INLINE PANEL 2 -->
              <div class="ml-step-inline-panel">
                <div class="wf-visual-panel" style="margin-top:16px;">
                  <div class="wf-vis-topbar">
                    <span style="background:#FF5F57;"></span><span style="background:#FFBD2E;"></span><span style="background:#28C840;"></span>
                    <div class="wf-vis-url">HR Ops — Automated Candidate Journey</div>
                  </div>
                  <div class="wf-anim" style="padding:14px;">
                    <div class="flow-steps">
                      <div class="flow-step">
                        <div class="fs-icon-wrap"><div class="fs-icon fs-icon-blue"><svg viewBox="0 0 13 13"><path d="M1.5 7l3 3 7-7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
                        <div class="fs-content"><div class="fs-title" style="font-size:11px;">Application received</div><div class="fs-desc" style="font-size:10.5px;">AI screens resume in &lt;30s</div><div class="fs-badge fs-badge-blue" style="font-size:9px;">AI automated</div></div>
                        <div class="fs-time" style="font-size:9.5px;">Day 1 · 9:04am</div>
                      </div>
                      <div class="flow-step">
                        <div class="fs-icon-wrap"><div class="fs-icon fs-icon-green"><svg viewBox="0 0 13 13"><path d="M6.5 1v4M4 3l2.5 2.5L9 3" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><rect x="1" y="7" width="11" height="5.5" rx="1.2" stroke-width="1.6"/></svg></div></div>
                        <div class="fs-content"><div class="fs-title" style="font-size:11px;">Magic Link sent via WhatsApp</div><div class="fs-desc" style="font-size:10.5px;">Candidate completes from phone</div><div class="fs-badge fs-badge-green" style="font-size:9px;">WhatsApp delivered</div></div>
                        <div class="fs-time" style="font-size:9.5px;">Day 1 · 9:05am</div>
                      </div>
                      <div class="flow-step">
                        <div class="fs-icon-wrap"><div class="fs-icon fs-icon-amber"><svg viewBox="0 0 13 13"><rect x="1" y="2.5" width="11" height="9.5" rx="1.2" stroke-width="1.6"/><path d="M1 5.5h11M4 1v3M9 1v3" stroke-width="1.6" stroke-linecap="round"/></svg></div></div>
                        <div class="fs-content"><div class="fs-title" style="font-size:11px;">Interview auto-scheduled</div><div class="fs-desc" style="font-size:10.5px;">Calendar synced across Gmail, Outlook, Zoho</div><div class="fs-badge fs-badge-blue" style="font-size:9px;">Calendar synced</div></div>
                        <div class="fs-time" style="font-size:9.5px;">Day 3 · 2:15pm</div>
                      </div>
                      <div class="flow-step">
                        <div class="fs-icon-wrap"><div class="fs-icon fs-icon-gold"><svg viewBox="0 0 13 13"><path d="M1.5 7l3 3 7-7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
                        <div class="fs-content"><div class="fs-title" style="font-size:11px;">Offer accepted · ERP notified</div><div class="fs-desc" style="font-size:10.5px;">Employee record + commission payable auto-created</div><div class="fs-badge fs-badge-green" style="font-size:9px;">ERP synced</div></div>
                        <div class="fs-time" style="font-size:9.5px;">Day 14 · 11:30am</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="reveal-r">
        <!-- Panel 0: Magic Link URL -->
        <div id="ml-panel-0">
          <div class="wf-visual-panel">
            <div class="wf-vis-topbar">
              <span style="background:#FF5F57;"></span><span style="background:#FFBD2E;"></span><span style="background:#28C840;"></span>
              <div class="wf-vis-url">hrops.in/apply/jX7k9mP2qR · Expires 48h</div>
            </div>
            <div class="wf-anim">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;padding:14px;background:rgba(196,154,60,.06);border:1px solid rgba(196,154,60,.15);border-radius:10px;">
                <div style="width:36px;height:36px;background:var(--gold-bg);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div><div style="font-size:12px;font-weight:700;color:var(--ink);">Magic Link generated</div><div style="font-size:10.5px;color:var(--ink3);">Senior Backend Engineer · Priya Sharma</div></div>
              </div>
              <div style="font-family:monospace;font-size:11px;color:var(--ink3);background:rgba(12,24,40,.05);border:1px solid rgba(12,24,40,.08);border-radius:8px;padding:11px 13px;margin-bottom:14px;">hrops.in/apply/jX7k9mP2qR</div>
              <div class="ml-check-panel">
                <div class="ml-cp-title">Assessment — Senior Backend Engineer</div>
                <div class="ml-cp-sub">Powered by HR Ops · No account needed</div>
                <div class="ml-cp-rows">
                  <div class="ml-cp-row"><span>Profile auto-filled from resume</span><span class="ml-pass">✓</span></div>
                  <div class="ml-cp-row"><span>Technical assessment submitted</span><span class="ml-pass">✓</span></div>
                  <div class="ml-cp-row"><span>Documents uploaded to Drive</span><span class="ml-pass">✓</span></div>
                  <div class="ml-cp-row"><span>Expected CTC confirmed</span><span class="ml-pass">✓</span></div>
                </div>
                <div class="ml-cp-success">✓ Complete. HR notified instantly.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel 1: WhatsApp -->
        <div id="ml-panel-1" style="display:none;">
          <div class="wf-visual-panel">
            <div class="wf-vis-topbar">
              <span style="background:#FF5F57;"></span><span style="background:#FFBD2E;"></span><span style="background:#28C840;"></span>
              <div class="wf-vis-url">WhatsApp · HR Ops Notifications</div>
            </div>
            <div class="wf-anim">
              <div class="wa-card" style="margin-top:0;">
                <div class="wa-hd">
                  <div class="wa-icon-box"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.302A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="white"/></svg></div>
                  <div class="wa-app-name">WhatsApp · HR Ops</div><div class="wa-time">just now</div>
                </div>
                <div class="wa-msg">Hi Priya 👋 Your assessment for Senior Backend Engineer at Acme is ready — takes 15 mins. hrops.in/apply/jX7k9mP2qR (expires 48h)</div>
              </div>
              <div style="margin-top:14px;background:rgba(12,24,40,.04);border-radius:10px;padding:14px;">
                <div style="font-size:11px;font-weight:700;color:var(--ink);margin-bottom:10px;">Response rate comparison</div>
                <div style="display:flex;flex-direction:column;gap:8px;">
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:10.5px;color:var(--ink3);margin-bottom:3px;"><span>WhatsApp + Magic Link</span><span style="font-weight:700;color:#0A7A4A">78%</span></div>
                    <div style="height:5px;background:rgba(12,24,40,.08);border-radius:100px;overflow:hidden;"><div style="width:78%;height:100%;background:var(--green);border-radius:100px;"></div></div>
                  </div>
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:10.5px;color:var(--ink3);margin-bottom:3px;"><span>Email only</span><span style="font-weight:700;color:var(--ink3)">24%</span></div>
                    <div style="height:5px;background:rgba(12,24,40,.08);border-radius:100px;overflow:hidden;"><div style="width:24%;height:100%;background:rgba(12,24,40,.25);border-radius:100px;"></div></div>
                  </div>
                </div>
              </div>
              <div style="margin-top:12px;font-size:11px;color:var(--ink3);background:rgba(12,24,40,.04);border-radius:8px;padding:10px 12px;">
                Auto-reminder sent if no response in 24h. Second reminder at 36h. Link expired at 48h and flagged for HR review.
              </div>
            </div>
          </div>
        </div>

        <!-- Panel 2: Automated timeline -->
        <div id="ml-panel-2" style="display:none;">
          <div class="wf-visual-panel">
            <div class="wf-vis-topbar">
              <span style="background:#FF5F57;"></span><span style="background:#FFBD2E;"></span><span style="background:#28C840;"></span>
              <div class="wf-vis-url">HR Ops — Automated Candidate Journey</div>
            </div>
            <div class="wf-anim" style="padding:14px;">
              <div class="flow-steps">
                <div class="flow-step">
                  <div class="fs-icon-wrap"><div class="fs-icon fs-icon-blue"><svg viewBox="0 0 13 13"><path d="M1.5 7l3 3 7-7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
                  <div class="fs-content"><div class="fs-title" style="font-size:11px;">Application received</div><div class="fs-desc" style="font-size:10.5px;">AI screens resume in &lt;30s</div><div class="fs-badge fs-badge-blue" style="font-size:9px;">AI automated</div></div>
                  <div class="fs-time" style="font-size:9.5px;">Day 1 · 9:04am</div>
                </div>
                <div class="flow-step">
                  <div class="fs-icon-wrap"><div class="fs-icon fs-icon-green"><svg viewBox="0 0 13 13"><path d="M6.5 1v4M4 3l2.5 2.5L9 3" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><rect x="1" y="7" width="11" height="5.5" rx="1.2" stroke-width="1.6"/></svg></div></div>
                  <div class="fs-content"><div class="fs-title" style="font-size:11px;">Magic Link sent via WhatsApp</div><div class="fs-desc" style="font-size:10.5px;">Candidate completes from phone</div><div class="fs-badge fs-badge-green" style="font-size:9px;">WhatsApp delivered</div></div>
                  <div class="fs-time" style="font-size:9.5px;">Day 1 · 9:05am</div>
                </div>
                <div class="flow-step">
                  <div class="fs-icon-wrap"><div class="fs-icon fs-icon-amber"><svg viewBox="0 0 13 13"><rect x="1" y="2.5" width="11" height="9.5" rx="1.2" stroke-width="1.6"/><path d="M1 5.5h11M4 1v3M9 1v3" stroke-width="1.6" stroke-linecap="round"/></svg></div></div>
                  <div class="fs-content"><div class="fs-title" style="font-size:11px;">Interview auto-scheduled</div><div class="fs-desc" style="font-size:10.5px;">Calendar synced across Gmail, Outlook, Zoho</div><div class="fs-badge fs-badge-blue" style="font-size:9px;">Calendar synced</div></div>
                  <div class="fs-time" style="font-size:9.5px;">Day 3 · 2:15pm</div>
                </div>
                <div class="flow-step">
                  <div class="fs-icon-wrap"><div class="fs-icon fs-icon-gold"><svg viewBox="0 0 13 13"><path d="M1.5 7l3 3 7-7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
                  <div class="fs-content"><div class="fs-title" style="font-size:11px;">Offer accepted · ERP notified</div><div class="fs-desc" style="font-size:10.5px;">Employee record + commission payable auto-created</div><div class="fs-badge fs-badge-green" style="font-size:9px;">ERP synced</div></div>
                  <div class="fs-time" style="font-size:9.5px;">Day 14 · 11:30am</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`

const SCRIPT = `(function(){
  if(window.__hropsPlatformCleanup){try{window.__hropsPlatformCleanup();}catch(e){}}
  var running=false;

  var PERSONAS=[
    {id:'agency',label:'Agency Portal',dot:'#c8973a',chip:'Submissions',chipCls:'tgo',url:'hrops.in/agency',title:'Agency Submissions',sub:'TalentHub · 6 candidates uploaded',tags:[{t:'🔒 Salary hidden',c:'tr'}],btns:[{t:'Add CV'},{t:'Send to HR',gold:true,id:'btnSendHR'}]},
    {id:'hr',label:'HR Team',dot:'#2f6ef0',chip:'Pipeline',chipCls:'tb',url:'hrops.in/hr',title:'Senior Backend Engineer',sub:'Mumbai · ₹28–38L · AI screening active',tags:[{t:'AI On',c:'tg'},{t:'Pipeline',c:'tb'}],btns:[{t:'Export'},{t:'Share JD',gold:true,id:'btnShareJD'}]},
    {id:'cand',label:'Candidate',dot:'#16b374',chip:'Application',chipCls:'tg',url:'hrops.in/apply/jX7k',title:'Your Application',sub:'Priya Sharma · Senior Backend · Acme Payments',tags:[{t:'No login needed',c:'tg'}],btns:[{t:'View Status',gold:false}]},
    {id:'hiring',label:'Hiring Mgr',dot:'#8f36e8',chip:'Decisions',chipCls:'tp',url:'hrops.in/decisions',title:'Decision Panel',sub:'3 shortlisted · 1 recommended by AI',tags:[{t:'🔒 Scores hidden',c:'tp'}],btns:[{t:'Compare'},{t:'Approve Offer',gold:true,id:'btnApprove'}]},
  ];
  var FEEDS={
    agency:[{d:'#c8973a',t:'6 CVs uploaded for Senior Backend',tm:'now'},{d:'#445e7a',t:'Priya Sharma — flagged as top match',tm:'2m'},{d:'#c8973a',t:'Commission tracker updated',tm:'1h'},{d:'#445e7a',t:'New JD available from Acme Payments',tm:'3h'}],
    hr:[{d:'#2f6ef0',t:'Agency submission received — 6 CVs',tm:'now'},{d:'#16b374',t:'AI screening started automatically',tm:'1m'},{d:'#c8973a',t:'Priya Sharma — 92% JD match',tm:'3m'},{d:'#2f6ef0',t:'2 more candidates under review',tm:'8m'}],
    cand:[{d:'#16b374',t:'Magic Link received on WhatsApp',tm:'now'},{d:'#16b374',t:'Profile auto-filled from resume',tm:'2m'},{d:'#c8973a',t:'AI review complete — Proceed',tm:'5m'},{d:'#445e7a',t:'HR reviewing shortlist',tm:'10m'}],
    hiring:[{d:'#8f36e8',t:'3 candidates ready for review',tm:'now'},{d:'#16b374',t:'Priya Sharma — strongly recommended',tm:'30m'},{d:'#8f36e8',t:'Panel notes synced from interviews',tm:'2h'},{d:'#445e7a',t:'ERP standing by for approval',tm:'3h'}],
  };

  function agencyHTML(){return '<div class="dash-cv-inner"><div style="font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:1.3px;color:var(--dash-tx3);margin-bottom:8px;">Submitted candidates</div><div class="dash-row" id="aRow0"><div class="dash-av" style="width:26px;height:26px;background:#4b6bfb;">PS</div><div style="flex:1"><div class="dash-rn">Priya Sharma</div><div class="dash-rm">6 yrs · Go, Postgres · Bangalore</div></div><button class="dash-btn" id="btnShort" style="font-size:9.5px;padding:4px 9px;">Shortlist</button></div><div class="dash-row" id="aRow1"><div class="dash-av" style="width:26px;height:26px;background:#12b76a;">RV</div><div style="flex:1"><div class="dash-rn">Rahul Verma</div><div class="dash-rm">4 yrs · Node.js · Mumbai</div></div><div class="dash-tag tz">Pending</div></div><div class="dash-row" id="aRow2"><div class="dash-av" style="width:26px;height:26px;background:#f79009;">AM</div><div style="flex:1"><div class="dash-rn">Aarav Menon</div><div class="dash-rm">5 yrs · Java · Pune</div></div><div class="dash-tag tz">Pending</div></div><div class="dash-lock">🔒 AI scores &amp; salary — confidential, HR eyes only</div><div class="dash-comm"><div class="dash-comm-ttl">Commission Tracker</div><div class="dash-comm-r"><span style="color:var(--dash-tx3)">Priya Sharma · Senior Backend</span><span style="color:#c8973a;font-weight:700">₹84,000</span></div><div class="dash-comm-r"><span style="color:var(--dash-tx3)">Q1 total earned</span><span style="color:var(--dash-tx2);font-weight:700">₹2,46,000</span></div></div></div>';}

  function hrHTML(s){return '<div class="dash-cv-inner">'+(s?'<div class="dash-score-card"><div class="dash-sc-lbl">AI Screening — Priya Sharma · 3 models</div><div class="dash-br"><div class="dash-bn">JD Match</div><div class="dash-bt"><div class="dash-bf" style="width:92%;background:#c8973a;"></div></div><div class="dash-bv" style="color:#c8973a;">92%</div></div><div class="dash-br"><div class="dash-bn">Confidence</div><div class="dash-bt"><div class="dash-bf" style="width:87%;background:#16b374;"></div></div><div class="dash-bv" style="color:#16b374;">87%</div></div><div class="dash-br"><div class="dash-bn">Seniority</div><div class="dash-bt"><div class="dash-bf" style="width:78%;background:#4b87f8;"></div></div><div class="dash-bv" style="color:#4b87f8;">78%</div></div></div>':'')+
    '<div class="dash-row'+(s?' r-grn':'')+'" id="hrRow0"><div class="dash-av" style="width:26px;height:26px;background:#4b6bfb;">PS</div><div style="flex:1"><div class="dash-rn">Priya Sharma</div><div class="dash-rm">6 yrs · Go + Postgres</div></div><div class="dash-rscore" style="color:#c8973a;">92%</div><div class="dash-tag '+(s?'tg':'ta')+'" style="margin-left:4px;">'+(s?'Proceed ✓':'Reviewing')+'</div></div>'+
    '<div class="dash-row"><div class="dash-av" style="width:26px;height:26px;background:#12b76a;">RV</div><div style="flex:1"><div class="dash-rn">Rahul Verma</div><div class="dash-rm">4 yrs · Node.js</div></div><div class="dash-rscore" style="color:#4b87f8;">84%</div><div class="dash-tag tb" style="margin-left:4px;">Round 1</div></div>'+
    '<div class="dash-row"><div class="dash-av" style="width:26px;height:26px;background:#f79009;">AM</div><div style="flex:1"><div class="dash-rn">Aarav Menon</div><div class="dash-rm">5 yrs · Java</div></div><div class="dash-rscore" style="color:#f8a81c;">63%</div><div class="dash-tag ta" style="margin-left:4px;">Maybe</div></div>'+
    '<div class="dash-stats"><div class="dash-stat"><div class="dash-st-v" style="color:#4b87f8;">₹28L</div><div class="dash-st-l">Avg Offer</div></div><div class="dash-stat"><div class="dash-st-v" style="color:#16b374;">14d</div><div class="dash-st-l">Time-to-hire</div></div><div class="dash-stat"><div class="dash-st-v" style="color:#c8973a;">91%</div><div class="dash-st-l">AI Accuracy</div></div></div></div>';}

  function candHTML(upTo){
    var steps=[{icon:'📥',title:'Application received',desc:'Resume received via WhatsApp Magic Link. No account needed.'},{icon:'✍️',title:'Profile completed',desc:'Work history, CTC, docs — filled in 4 min from phone.'},{icon:'🔍',title:'AI screening done',desc:'3 models scored profile. JD match: 92%. Recommendation: Proceed.'},{icon:'👥',title:'HR reviewed & shortlisted',desc:'HR confirmed shortlist from AI scores. Interview round triggered.'},{icon:'📅',title:'Interview scheduled',desc:'Technical round set. Calendar invite sent via Gmail & WhatsApp.'}];
    var rows=steps.map(function(s,i){var st=i<upTo?'done':i===upTo?'active':'pend';var rc=st==='done'?'cs-done':st==='active'?'cs-active':'';var ic=st==='done'?'ic-done':st==='active'?'ic-act':'ic-pend';var badge=st==='done'?'<div class="dash-tag tg">Done ✓</div>':st==='active'?'<div class="dash-tag ta">In progress</div>':'<div class="dash-tag tz">Pending</div>';return '<div class="dash-cstep '+rc+'"><div class="dash-cs-icon '+ic+'">'+s.icon+'</div><div class="dash-cs-body"><div class="dash-cs-title">'+s.title+'</div><div class="dash-cs-desc">'+s.desc+'</div></div>'+badge+'</div>';}).join('');
    return '<div class="dash-cv-inner"><div class="dash-csteps">'+rows+'</div><div class="dash-magic-note">✓ No account needed · Magic Link · WhatsApp updates active</div></div>';}

  function hiringHTML(){return '<div class="dash-cv-inner"><div style="font-size:9px;color:var(--dash-tx3);margin-bottom:8px;">3 candidates — qualitative summaries only, no raw AI scores</div><div class="dash-hm-row" id="hmRow0"><div class="dash-hm-top"><div class="dash-av" style="width:26px;height:26px;background:#4b6bfb;">PS</div><div style="flex:1"><div style="font-size:11px;font-weight:600;color:var(--dash-tx)">Priya Sharma</div><div style="font-size:8.5px;color:var(--dash-tx3)">Sr. Backend · 6 yrs · Go + Postgres</div></div><div class="dash-tag tg">Recommended</div></div><div class="dash-hm-note">Strong fintech background, exact JD match. Interview panel consensus: strong hire.</div><div class="dash-hm-acts"><button class="dash-hm-btn dash-hm-app" id="btnHMApp">✓ Approve</button><button class="dash-hm-btn dash-hm-hld">Hold</button><button class="dash-hm-btn dash-hm-rej">✕ Decline</button></div></div><div class="dash-hm-row"><div class="dash-hm-top"><div class="dash-av" style="width:26px;height:26px;background:#12b76a;">RV</div><div style="flex:1"><div style="font-size:11px;font-weight:600;color:var(--dash-tx)">Rahul Verma</div><div style="font-size:8.5px;color:var(--dash-tx3)">Backend · 4 yrs · Node.js</div></div><div class="dash-tag tb">Good fit</div></div><div class="dash-hm-note">Solid fundamentals, good upside candidate.</div><div class="dash-hm-acts"><button class="dash-hm-btn dash-hm-app">✓ Approve</button><button class="dash-hm-btn dash-hm-hld">Hold</button><button class="dash-hm-btn dash-hm-rej">✕ Decline</button></div></div><div style="padding:7px 10px;border-radius:7px;background:rgba(143,54,232,.07);border:1px solid rgba(143,54,232,.15);font-size:9px;color:rgba(255,255,255,.3);">🔒 Raw AI scores hidden — qualitative summaries only</div></div>';}

  var $=function(id){return document.getElementById(id);};

  function renderTabs(activeId,doneIds){doneIds=doneIds||[];var el=$('ptabs');if(!el)return;el.innerHTML=PERSONAS.map(function(p){var isA=p.id===activeId,isD=doneIds.indexOf(p.id)>-1;var cls='ptab'+(isA?' t-active':isD?' t-done':'');var sty=isA?'background:'+p.dot+';border-color:'+p.dot+';':'';var pip=isD?'<div class="ptab-ok">✓</div>':'<span class="ptab-pip" style="background:'+p.dot+';opacity:'+(isA?1:.4)+';'+(isA?'box-shadow:0 0 6px '+p.dot+'88;':'')+'"></span>';return '<div class="'+cls+'" style="'+sty+'">'+pip+p.label+'</div>';}).join('');}

  function renderSidebar(id){var p=PERSONAS.filter(function(x){return x.id===id;})[0];var dot=$('vaDot');if(dot)dot.style.cssText='width:7px;height:7px;border-radius:50%;flex-shrink:0;background:'+p.dot+';box-shadow:0 0 6px '+p.dot+'88;';var nm=$('vaName');if(nm)nm.textContent=p.label;var ch=$('vaChip');if(ch){ch.textContent=p.chip;ch.className='dash-va-chip dash-tag '+p.chipCls;}var ut=$('urlTx');if(ut)ut.textContent=p.url;var feed=$('sbFeed');if(!feed)return;feed.innerHTML='';(FEEDS[id]||[]).forEach(function(f,i){var d=document.createElement('div');d.className='dash-fi';d.innerHTML='<div style="width:5px;height:5px;border-radius:50%;flex-shrink:0;margin-top:4px;background:'+f.d+'"></div><div><div class="dash-fi-tx">'+f.t+'</div><div class="dash-fi-t">'+f.tm+'</div></div>';feed.appendChild(d);setTimeout(function(){d.classList.add('fi-in');},i*120);});}

  function renderTopbar(id){var p=PERSONAS.filter(function(x){return x.id===id;})[0];var cd=$('cvDot');if(cd)cd.style.cssText='width:8px;height:8px;border-radius:50%;background:'+p.dot+';box-shadow:0 0 8px '+p.dot+'88;';var ct=$('cvTitle');if(ct)ct.textContent=p.title;var cs=$('cvSub');if(cs)cs.textContent=p.sub;var tg=$('cvTags');if(tg)tg.innerHTML=p.tags.map(function(t){return '<div class="dash-tag '+t.c+'">'+t.t+'</div>';}).join('');var cb=$('cvBtns');if(cb)cb.innerHTML=p.btns.map(function(b){return '<button class="dash-btn'+(b.gold?' dash-btn-gold':'')+'"'+(b.id?' id="'+b.id+'"':'')+'>'+b.t+'</button>';}).join('');}

  function setCanvas(html){var b=$('cvBody');if(!b)return;b.style.opacity='0';setTimeout(function(){b.innerHTML=html;animBars();b.style.opacity='1';},120);}
  function animBars(){document.querySelectorAll('.dash-bf').forEach(function(b){var w=b.getAttribute('data-w');if(!w){w=b.style.width;b.setAttribute('data-w',w);}b.style.transition='none';b.style.width='0%';requestAnimationFrame(function(){requestAnimationFrame(function(){b.style.transition='width 1.1s cubic-bezier(.22,1,.36,1)';b.style.width=w;});});});}
  function switchTo(id,done){renderSidebar(id);renderTopbar(id);}
  function clearNotifs(){var s=$('npScroll');if(s)s.innerHTML='';}
  function addNotif(icon,bg,title,sub){var s=$('npScroll');if(!s)return;var existing=s.querySelectorAll('.dash-nc-ttl');for(var i=0;i<existing.length;i++){if(existing[i].textContent===title)return;}while(s.children.length>=6){s.removeChild(s.lastChild);}var d=document.createElement('div');d.className='dash-nc';d.style.background=bg;d.innerHTML='<div class="dash-nc-row"><div class="dash-nc-ico" style="background:'+bg+';">'+icon+'</div><div class="dash-nc-body"><div class="dash-nc-ttl">'+title+'</div><div class="dash-nc-sub">'+sub+'</div></div></div><div class="dash-nc-time">just now</div>';s.insertBefore(d,s.firstChild);requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add('nc-in');});});}
  function showCur(){var c=$('curEl');if(c)c.style.display='block';}
  function hideCur(){var c=$('curEl');if(c)c.style.display='none';}
  function setCaption(txt){var c=$('caption');if(!c)return;if(!txt){c.classList.remove('cap-on');return;}c.textContent=txt;c.classList.add('cap-on');}
  function elPos(id){var grid=$('appGrid');if(!grid)return{x:200,y:200};var el=$(id);if(!el)return{x:200,y:200};var gr=grid.getBoundingClientRect(),r=el.getBoundingClientRect();return{x:r.left-gr.left+r.width*.5,y:r.top-gr.top+r.height*.5};}
  function moveCur(x,y,tip,ms){ms=ms||700;return new Promise(function(res){var cur=$('curEl');if(cur){cur.style.left=x+'px';cur.style.top=y+'px';}setTimeout(res,ms);});}
  function clickAt(x,y,tip){return new Promise(function(res){moveCur(x,y,tip,420).then(function(){var r=$('curRing');if(r){r.classList.remove('rp');void r.offsetWidth;r.classList.add('rp');}setTimeout(res,580);});});}
  function delay(ms){return new Promise(function(res){setTimeout(res,ms);});}

  async function runFlow(){
    if(running)return; running=true;
    clearNotifs(); hideCur();
    switchTo('agency',[]); setCanvas(agencyHTML());
    clearNotifs();
    addNotif('📋','rgba(200,151,58,.1)','6 CVs ready to submit','TalentHub · Senior Backend Engineer');
    setCaption('Step 1 of 4 — Agency Portal: Upload CVs & send to HR');
    showCur(); await delay(1000);
    var p=elPos('aRow0'); await moveCur(p.x-90,p.y-20,'',700); await moveCur(p.x-20,p.y,'',600); await delay(350);
    p=elPos('btnShort'); await moveCur(p.x,p.y,'',450); await clickAt(p.x,p.y,'');
    var sb=$('btnShort'); if(sb){sb.textContent='✓ Shortlisted';sb.className='dash-btn dash-btn-go';}
    $('aRow0')&&$('aRow0').classList.add('r-grn');
    addNotif('✅','rgba(22,179,116,.12)','Priya Sharma shortlisted','TalentHub · marked as top candidate'); await delay(1000);
    p=elPos('btnSendHR'); await moveCur(p.x-30,p.y-8,'',550); await moveCur(p.x,p.y,'',380); await clickAt(p.x,p.y,'');
    addNotif('📨','rgba(200,151,58,.12)','Shortlisted candidates sent to HR','Priya Sharma + 2 others → HR pipeline');
    setCaption('✓ Agency sent candidates to HR'); await delay(1800);
    switchTo('hr',['agency']); setCanvas(hrHTML(false)); clearNotifs();
    addNotif('📨','rgba(47,110,240,.12)','Agency submission received','TalentHub sent 6 CVs · AI screening starting');
    setCaption('Step 2 of 4 — HR Team: AI screening → review → share JD'); await delay(800);
    p=elPos('hrRow0'); await moveCur(p.x-90,p.y-20,'',650); await moveCur(p.x-20,p.y,'',500); await clickAt(p.x-20,p.y,'');
    setCanvas(hrHTML(true));
    addNotif('🤖','rgba(47,110,240,.12)','AI screening complete','Priya Sharma · 3 models · JD Match 92%');
    setCaption('AI automatically screened all agency CVs'); await delay(1400);
    p=elPos('hrRow0'); await moveCur(p.x+55,p.y,'',750); await delay(500);
    p=elPos('btnShareJD'); await moveCur(p.x-35,p.y,'',550); await moveCur(p.x,p.y,'',380); await clickAt(p.x,p.y,'');
    var sjd=$('btnShareJD'); if(sjd){sjd.textContent='✓ Sent!';sjd.style.background='#16b374';sjd.style.borderColor='#16b374';sjd.style.color='#080f1c';}
    addNotif('📩','rgba(22,179,116,.12)','Magic Link sent to Priya Sharma','WhatsApp · JD + application form · expires 48h');
    setCaption('✓ JD & Magic Link sent via WhatsApp — no email needed'); await delay(1900);
    switchTo('cand',['agency','hr']); setCanvas(candHTML(0)); clearNotifs();
    addNotif('📱','rgba(22,179,116,.12)','Magic Link received on WhatsApp','Tap to apply · No account needed');
    setCaption('Step 3 of 4 — Candidate: Apply via Magic Link → Interview'); await delay(900);
    var stepNotifs=[null,['✍️','rgba(22,179,116,.1)','Profile completed','Work history, CTC & docs submitted in 4 min'],['🤖','rgba(47,110,240,.1)','AI screening done','JD Match 92% · Recommendation: Proceed'],['👥','rgba(200,151,58,.1)','HR shortlisted you',"You're shortlisted for the technical interview round"],['📅','rgba(47,110,240,.1)','Interview scheduled','Technical Round · Thursday 3 PM · Calendar invite sent']];
    for(var step=1;step<=4;step++){
      setCanvas(candHTML(step));
      if(stepNotifs[step])addNotif.apply(null,stepNotifs[step]);
      var rows=document.querySelectorAll('.dash-cstep');
      if(rows[step]){var grid=$('appGrid').getBoundingClientRect();var r=rows[step].getBoundingClientRect();var cx=r.left-grid.left+r.width*.48;var cy=r.top-grid.top+r.height*.4;await moveCur(cx-55,cy,'',450);await moveCur(cx,cy,'',380);await clickAt(cx,cy,'');}
      await delay(step===3?1100:850);
    }
    setCaption('✓ Interview scheduled — candidate flow complete'); await delay(1500);
    switchTo('hiring',['agency','hr','cand']); setCanvas(hiringHTML()); clearNotifs();
    addNotif('👀','rgba(143,54,232,.12)','Review requested','3 shortlisted candidates await your decision');
    setCaption('Step 4 of 4 — Hiring Manager: Review & final approval'); await delay(900);
    p=elPos('hmRow0'); await moveCur(p.x-90,p.y-15,'',700); await moveCur(p.x-20,p.y,'',600);
    $('hmRow0')&&$('hmRow0').classList.add('hm-focus'); await delay(600);
    p=elPos('btnHMApp'); await moveCur(p.x-20,p.y-6,'',500); await moveCur(p.x,p.y,'',380); await clickAt(p.x,p.y,'');
    var appBtn=$('btnHMApp'); if(appBtn){appBtn.textContent='✓ Approved!';appBtn.classList.add('approved');}
    addNotif('🎉','rgba(22,179,116,.15)','Priya Sharma approved!','Offer letter drafting · ₹32L CTC · ERP notified');
    addNotif('📋','rgba(200,151,58,.12)','Offer letter generated','Pending candidate e-signature · Joining date TBD');
    setCaption('🎉 Priya Sharma approved — offer letter generated & sent!'); await delay(1500);
    renderTabs('hiring',['agency','hr','cand','hiring']);
    setCaption('Full hiring flow complete — Agency → HR → Candidate → Offer ✓');
    await delay(2800); hideCur(); setCaption('');
    await delay(1200);
    running=false; runFlow();
  }

  function initAI(){var aiTabs=document.querySelectorAll('.ai-tab');var aiPanels=document.querySelectorAll('.ai-panel');function act(tab){if(!tab)return;aiTabs.forEach(function(t){t.classList.remove('active');});aiPanels.forEach(function(p){p.classList.remove('active');});tab.classList.add('active');var pid=tab.getAttribute('data-panel');var panel=pid?document.getElementById('panel-'+pid):null;if(panel)panel.classList.add('active');}aiTabs.forEach(function(tab){tab.addEventListener('mouseenter',function(){act(tab);});tab.addEventListener('click',function(){act(tab);});});var a=document.querySelector('.ai-tab.active');if(a)act(a);}

  function initML(){
    var mlSteps=document.querySelectorAll('.ml-step');
    function isMobile(){return window.innerWidth<=900;}
    function act(step){
      if(!step)return;
      mlSteps.forEach(function(s){s.classList.remove('active');});
      step.classList.add('active');

      // Desktop: switch right-side panels
      [0,1,2].forEach(function(i){
        var pp=document.getElementById('ml-panel-'+i);
        if(pp)pp.style.display='none';
      });
      var pid=step.getAttribute('data-mlpanel');
      var panel=pid?document.getElementById('ml-panel-'+pid):null;
      if(panel)panel.style.display='block';

      // Mobile: show/hide inline panels
      document.querySelectorAll('.ml-step-inline-panel').forEach(function(ip){
        ip.style.display='none';
        ip.style.maxHeight='0';
        ip.style.overflow='hidden';
      });
      var inlinePanel=step.querySelector('.ml-step-inline-panel');
      if(inlinePanel && isMobile()){
        inlinePanel.style.display='block';
        inlinePanel.style.maxHeight='none';
        inlinePanel.style.overflow='visible';
      }
    }
    mlSteps.forEach(function(step){
      step.addEventListener('mouseenter',function(){act(step);});
      step.addEventListener('click',function(){act(step);});
      step.addEventListener('touchstart',function(){act(step);},{passive:true});
    });
    var a=document.querySelector('.ml-step.active');if(a)act(a);
  }

  var tries=0;
  function boot(){if(!$('appGrid')||!$('cvBody')){if(tries++<60){requestAnimationFrame(boot);}return;}switchTo('agency',[]);setCanvas(agencyHTML());addNotif('📋','rgba(200,151,58,.1)','Agency portal ready','TalentHub logged in · 6 CVs loaded');addNotif('🔔','rgba(47,110,240,.1)','New JD available','Senior Backend Engineer · Acme Payments · ₹28–38L');initAI();initML();setTimeout(runFlow,900);}

  window.__hropsPlatformCleanup=function(){running=false;};
  boot();
})();`

export default function Platform() {
  useEffect(() => {
    const prev = document.querySelector('script[data-hrops="platform"]')
    if (prev && prev.parentNode) prev.parentNode.removeChild(prev)
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.dataset.hrops = 'platform'
    script.text = SCRIPT
    requestAnimationFrame(() => { document.body.appendChild(script) })
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
      if ((window as any).__hropsPlatformCleanup) {
        try { (window as any).__hropsPlatformCleanup() } catch (e) { }
      }
    }
  }, [])
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: HTML_PART1 }} />
      <div className="section-mid" id="ai">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: 760 }}>
            <div className="eyebrow"><div className="ey-line"></div>AI Intelligence</div>
            <h2 className="h2">Not a score.<br /><em>A briefing.</em></h2>
            <p className="lead" style={{ marginBottom: '48px' }}>Three AI models, transparent reasoning, and a learning loop that trains on your company&#39;s actual decisions — not generic hiring data.</p>
          </div>
          <div className="aid-outer">
            <AIHiringDashboard />
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: HTML_PART2 }} />
    </>
  )
}
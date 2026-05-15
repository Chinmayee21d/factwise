'use client'
import { useEffect } from 'react'

const HTML = `<div class="section-light" id="workflow-builder" style="overflow:hidden;position:relative;">
  <div class="wrap" style="position:relative;z-index:1;padding-top:80px;padding-bottom:80px;">
    <div class="reveal" style="max-width:820px;margin-bottom:24px;">
      <div class="eyebrow eyebrow-dark"><div class="ey-line"></div>No-Code Workflow Builder</div>
      <h2 class="h2 h2-ink">Every role, its own pipeline.<br><em>Configured in minutes.</em></h2>
      <p class="lead lead-ink">Senior Developer gets five stages, conditional branching, a panel scorecard.<br>Intern gets one call and a fast offer. Same platform - drag, configure, done. No code, ever.</p>
    </div>

  <!-- Browser -->
  <div class="pb-browser">
    <div class="pb-titlebar">
      <div class="pb-traffic">
        <span style="background:#FF5F57"></span>
        <span style="background:#FFBD2E"></span>
        <span style="background:#28C840"></span>
      </div>
      <div class="pb-url-bar">
        <div class="pb-url-inner">
          <div class="pb-live-dot"></div>
          <span class="pb-url-text">hrops.in/builder</span>
        </div>
      </div>
      <div class="pb-app-label">Workflow Builder</div>
    </div>

    <div class="pb-app" id="pb-app">
      <!-- Left sidebar -->
      <div class="pb-sidebar">
        <div class="pb-sidebar-section">
          <div class="pb-sidebar-label">Pipelines</div>
          <div id="pipe-tabs"></div>
          <div class="pb-new-pipe-btn">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1v8M1 5h8" stroke="#56728F" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
            <span>New pipeline</span>
          </div>
        </div>
        <div class="pb-lib-section">
          <div class="pb-sidebar-label">Stage Library</div>
          <div id="lib-items"></div>
        </div>
      </div>

      <!-- Canvas -->
      <div class="pb-canvas" id="pb-canvas">
        <div class="pb-canvas-bg"></div>
        <div class="pb-canvas-glow" id="canvas-glow"></div>

        <div class="pb-canvas-topbar">
          <div class="pb-canvas-title-wrap">
            <div class="pb-canvas-dot" id="canvas-dot" style="color:var(--gold)"></div>
            <div style="min-width:0;overflow:hidden;">
              <div class="pb-canvas-title">
                <span id="canvas-title-text"></span>
                <span class="pb-cursor-blink" id="cursor-blink" style="display:none"></span>
              </div>
              <div class="pb-canvas-subtitle" id="canvas-subtitle"></div>
            </div>
          </div>
          <button class="pb-save-btn" id="save-btn">Save Pipeline</button>
        </div>

        <div class="pb-stage-area">
          <div class="pb-stage-wrap" id="stage-wrap"></div>
        </div>

        <!-- Settings panel -->
        <div class="pb-settings-panel" id="settings-panel">
          <div class="pb-settings-header" id="settings-header"></div>
          <div class="pb-settings-body" id="settings-body"></div>
        </div>

      </div>
      <!-- Cursor - inside .pb-app so position:absolute is relative to .pb-app -->
      <div class="pb-cursor" id="cursor" style="left:89px;top:159px;">
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M2 2l11 7-5 1.5-2.5 5.5L2 2z" fill="#EEF2FF" stroke="#0B1628" stroke-width="1.5"/>
        </svg>
      </div>
    </div>

    <!-- Saved indicator -->
    <div id="sv-bar" style="position:absolute;bottom:20px;right:24px;z-index:50;pointer-events:none;opacity:0;transform:translateY(10px);transition:opacity .45s cubic-bezier(.16,1,.3,1),transform .45s cubic-bezier(.16,1,.3,1);">
      <div style="background:var(--surface2);border:1px solid rgba(24,184,122,.35);border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:9px;box-shadow:0 8px 24px rgba(0,0,0,.4);">
        <div style="width:18px;height:18px;border-radius:50%;background:rgba(24,184,122,.12);border:1.5px solid rgba(24,184,122,.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="#18B87A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <span style="font-size:11px;font-weight:600;color:#18B87A;font-family:Geist,sans-serif;" id="sv-title">Pipeline saved</span>
      </div>
    </div>
  </div>

  <!-- Badge (hidden until complete) -->
  <div class="pb-badge-wrap" id="badge-wrap" style="display:none;">
    <div class="pb-nocode-badge">
      <div class="pb-badge-shimmer"></div>
      <div class="pb-badge-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5l1.5 3 3.3.5-2.4 2.3.6 3.3L8 9.2 5 10.6l.6-3.3L3.2 5l3.3-.5L8 1.5z" stroke="#C49A3C" stroke-width="1.3" stroke-linejoin="round"/>
        </svg>
      </div>
      <div>
        <div class="pb-badge-text-main">0 lines of code</div>
        <div class="pb-badge-text-sub">Any workflow. Any role. Configured in minutes.</div>
      </div>
      <div class="pb-badge-divider"></div>
      <div class="pb-badge-stat"><div class="pb-badge-stat-val">2</div><div class="pb-badge-stat-label">Pipelines built</div></div>
      <div class="pb-badge-stat"><div class="pb-badge-stat-val">8</div><div class="pb-badge-stat-label">Stages placed</div></div>
      <div class="pb-badge-stat"><div class="pb-badge-stat-val">8</div><div class="pb-badge-stat-label">Combinations</div></div>
    </div>
  </div>
  </div>
</div>

<style>
/* ============================================================
   PIPELINE BUILDER — All styles use pb- prefix to avoid conflicts
   ============================================================ */

/* -- Browser frame -- */
.pb-browser {
  background: var(--navy3);
  border: 1px solid var(--border2);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04);
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  opacity: 0;
  transform: translateY(28px) scale(0.985);
  transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
}
.pb-browser.pb-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.pb-titlebar {
  height: 40px;
  background: var(--navy2);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 10px;
  flex-shrink: 0;
}

.pb-traffic { display:flex;gap:6px; }
.pb-traffic span { width:11px;height:11px;border-radius:50%; }

.pb-url-bar {
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
}

.pb-url-inner {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 4px 14px;
  font-size: 11px;
  color: var(--text3);
  display: flex;
  align-items: center;
  gap: 7px;
  max-width: 220px;
  overflow: hidden;
}

.pb-url-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pb-live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--green);
  flex-shrink: 0;
  animation: pb-breathe 2.8s ease-in-out infinite;
  box-shadow: 0 0 5px var(--green);
}

.pb-app-label {
  font-size: 10.5px;
  color: var(--text3);
  white-space: nowrap;
  flex-shrink: 0;
}

/* -- App shell -- */
.pb-app {
  display: flex;
  flex-direction: row;
  height: 480px;
  position: relative;
  overflow: hidden;
}

/* -- Left sidebar -- */
.pb-sidebar {
  width: 170px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  background: var(--navy2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease;
}

.pb-sidebar-section {
  padding: 12px 10px 10px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.pb-sidebar-label {
  font-size: 9px;
  font-weight: 600;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 1.3px;
  margin-bottom: 7px;
}

/* Pipeline tabs */
.pb-pipe-tab {
  padding: 6px 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 3px;
  border: 1px solid transparent;
  transition: all .35s cubic-bezier(.16,1,.3,1);
  cursor: pointer;
}
.pb-pipe-tab.active { background:var(--surface2);border-color:var(--border2); }
.pb-pipe-tab-dot { width:6px;height:6px;border-radius:50%;flex-shrink:0; }
.pb-pipe-tab-name {
  font-size: 9.5px;
  font-weight: 600;
  color: var(--text2);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pb-pipe-tab.active .pb-pipe-tab-name { color: var(--text); }
.pb-pipe-tab-check {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity .3s;
}
.pb-pipe-tab-check.visible { opacity: 1; }

.pb-new-pipe-btn {
  padding: 5px 8px;
  border-radius: 8px;
  border: 1px dashed var(--border2);
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: .5;
  cursor: pointer;
  margin-top: 3px;
}
.pb-new-pipe-btn span { font-size: 9.5px; color: var(--text3); }

/* Stage library */
.pb-lib-section {
  padding: 10px 10px;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
}
.pb-lib-section::-webkit-scrollbar { display: none; }

.pb-lib-item {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 9px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  margin-bottom: 3px;
  transition: all .25s;
  cursor: grab;
}
.pb-lib-item.highlighted { border-color:rgba(196,154,60,.5);background:rgba(196,154,60,.08);transform:translateX(3px); }
.pb-lib-item.hl-blue    { border-color:rgba(52,112,240,.5);background:rgba(52,112,240,.08); }
.pb-lib-item.hl-purple  { border-color:rgba(124,58,237,.5);background:rgba(124,58,237,.08); }
.pb-lib-item.hl-green   { border-color:rgba(24,184,122,.5);background:rgba(24,184,122,.08); }
.pb-lib-item.dragging   { opacity: .3; }

.pb-lib-icon {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pb-lib-name {
  font-size: 9.5px;
  color: var(--text2);
  font-weight: 500;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pb-lib-item.highlighted .pb-lib-name,
.pb-lib-item.hl-blue .pb-lib-name,
.pb-lib-item.hl-purple .pb-lib-name,
.pb-lib-item.hl-green .pb-lib-name { color: var(--text); }

/* -- Canvas -- */
.pb-canvas {
  flex: 1;
  position: relative;
  overflow: hidden;
  min-width: 0;
}
.pb-canvas-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle,rgba(255,255,255,.042) 1px,transparent 1px);
  background-size: 26px 26px;
  background-position: 13px 13px;
  pointer-events: none;
}
.pb-canvas-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: background .6s;
}

/* Canvas topbar */
.pb-canvas-topbar {
  position: relative;
  z-index: 5;
  height: 48px;
  padding: 0 14px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-shrink: 0;
}
.pb-canvas-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
  overflow: hidden;
}
.pb-canvas-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 8px currentColor;
  animation: pb-breathe 3s ease-in-out infinite;
}
.pb-canvas-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -.2px;
}
.pb-canvas-subtitle {
  font-size: 9px;
  color: var(--text3);
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pb-cursor-blink {
  display: inline-block;
  width: 2px;
  height: 12px;
  background: var(--text);
  margin-left: 1px;
  animation: pb-blink .7s ease-in-out infinite;
  vertical-align: middle;
}

.pb-save-btn {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 10.5px;
  font-weight: 600;
  flex-shrink: 0;
  border: 1px solid var(--border2);
  color: var(--text2);
  background: transparent;
  cursor: pointer;
  transition: all .4s cubic-bezier(.16,1,.3,1);
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}
.pb-save-btn.saving { background:var(--gold);color:var(--navy);border-color:var(--gold);animation:pb-savePulse 1.1s ease; }
.pb-save-btn.saved  { background:rgba(24,184,122,.1);color:var(--green);border-color:rgba(24,184,122,.4); }

/* Stage area */
.pb-stage-area {
  position: relative;
  z-index: 4;
  padding: 16px 18px;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 48px);
  scrollbar-width: none;
}
.pb-stage-area::-webkit-scrollbar { display: none; }

.pb-stage-wrap {
  display: flex;
  flex-direction: column;
  width: 250px;
}

/* Canvas stage card */
.pb-c-stage {
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface);
  border: 1px solid var(--border2);
  box-shadow: 0 2px 8px rgba(0,0,0,.2);
  transition: all .38s cubic-bezier(.16,1,.3,1);
  position: relative;
  will-change: transform, box-shadow;
}
.pb-c-stage.selected {
  background: linear-gradient(135deg,var(--surface2),var(--surface));
  box-shadow: 0 8px 24px rgba(0,0,0,.35);
}
.pb-c-stage.dropping { animation: pb-stageDrop .4s cubic-bezier(.16,1,.3,1) both; }

.pb-stage-accent {
  position: absolute;
  top: 0;
  left: 10px;
  right: 10px;
  height: 1.5px;
  border-radius: 2px;
  opacity: .5;
  transition: opacity .3s;
}
.pb-c-stage.selected .pb-stage-accent { opacity: 1; }

.pb-stage-inner { display:flex;align-items:center;gap:8px; }
.pb-stage-icon {
  width: 26px;
  height: 26px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pb-stage-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pb-stage-badge {
  display: inline-block;
  font-size: 8.5px;
  font-weight: 600;
  padding: 1.5px 6px;
  border-radius: 100px;
  letter-spacing: .3px;
  margin-top: 3px;
}
.pb-stage-arrow-icon {
  width: 15px;
  height: 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: pb-selPulse 1.8s ease-in-out infinite;
}

/* Arrow between stages */
.pb-c-arrow { display:flex;flex-direction:column;align-items:center;padding:1px 0; }
.pb-c-arrow-line { width:1.5px;height:8px; }
.pb-c-arrow-head { width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;opacity:.5; }

/* Branch tag */
.pb-branch-tag {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 4px;
  animation: pb-fadeUp .5s cubic-bezier(.16,1,.3,1) both;
}
.pb-branch-line { width:12px;height:1.5px; }
.pb-branch-pill {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(224,56,79,.09);
  border: 1px solid rgba(224,56,79,.3);
  border-radius: 100px;
  padding: 2px 8px;
  overflow: hidden;
}
.pb-branch-dot { width:4px;height:4px;border-radius:50%;background:var(--red);flex-shrink:0; }
.pb-branch-text {
  font-size: 8.5px;
  color: var(--red);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}

/* Drop zone */
.pb-drop-zone {
  margin-top: 4px;
  padding: 10px;
  border-radius: 10px;
  border: 1.5px dashed rgba(196,154,60,.35);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pb-breathe 2.2s ease-in-out infinite;
}
.pb-drop-zone span { font-size:10px;color:var(--gold);opacity:.7; }

/* Settings panel */
.pb-settings-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
  background: var(--navy3);
  border-left: 1px solid var(--border2);
  transform: translateX(100%);
  transition: transform .48s cubic-bezier(.16,1,.3,1);
  overflow: hidden;
  z-index: 20;
  will-change: transform;
}
.pb-settings-panel.open { transform: translateX(0); }

.pb-settings-header { padding:12px 13px;border-bottom:1px solid var(--border); }
.pb-settings-header-row { display:flex;align-items:center;gap:7px; }
.pb-settings-icon { width:20px;height:20px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
.pb-settings-title { font-size:10px;font-weight:600;color:var(--text); }
.pb-settings-sub { font-size:9px;margin-top:1px; }
.pb-settings-body { padding:12px 13px;display:flex;flex-direction:column;gap:9px; }
.pb-settings-section-label { font-size:8.5px;color:var(--text3);text-transform:uppercase;letter-spacing:1.2px;margin-bottom:2px; }
.pb-setting-row { transition:opacity .45s cubic-bezier(.16,1,.3,1),transform .45s cubic-bezier(.16,1,.3,1); }
.pb-setting-row.hidden { opacity:.12;transform:translateX(10px); }
.pb-setting-key { font-size:8.5px;color:var(--text3);margin-bottom:3px; }
.pb-setting-val {
  padding: 5px 9px;
  border-radius: 7px;
  background: var(--surface2);
  border: 1px solid var(--border);
  font-size: 10px;
  color: var(--text2);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pb-setting-check {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgba(24,184,122,.1);
  border: 1px solid rgba(24,184,122,.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 5px;
  animation: pb-checkIn .3s cubic-bezier(.16,1,.3,1) both;
}

/* Cursor — hidden on touch devices, shown on desktop */
.pb-cursor {
  position: absolute;
  pointer-events: none;
  z-index: 100;
  transition: left .72s cubic-bezier(.25,.46,.45,.94), top .72s cubic-bezier(.25,.46,.45,.94);
  display: none; /* hidden by default, shown via JS on desktop */
  will-change: left, top;
}
.pb-cursor-ripple {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid var(--gold);
  animation: pb-cursorClick .5s ease-out both;
}

/* Badge */
.pb-badge-wrap {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding: 0 16px;
}
.pb-nocode-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--surface2);
  border: 1px solid var(--border2);
  border-radius: 100px;
  padding: 10px 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.04);
  position: relative;
  overflow: hidden;
  animation: pb-badgePop .75s cubic-bezier(.16,1,.3,1) both;
  flex-wrap: wrap;
  justify-content: center;
  transition: box-shadow .4s ease;
}
.pb-nocode-badge:hover {
  box-shadow: 0 12px 40px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.06), 0 0 24px rgba(196,154,60,.08);
}
.pb-badge-shimmer {
  position: absolute;
  inset: 0;
  border-radius: 100px;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.035),transparent);
  animation: pb-shimmer 4.5s ease-in-out infinite;
}
.pb-badge-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(196,154,60,.1);
  border: 1px solid rgba(196,154,60,.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pb-badge-text-main { font-size:13px;font-weight:600;color:var(--text); }
.pb-badge-text-sub  { font-size:10px;color:var(--text3);margin-top:1px; }
.pb-badge-divider   { width:1px;height:32px;background:var(--border2);flex-shrink:0; }
.pb-badge-stat { text-align:center;min-width:44px; }
.pb-badge-stat-val {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  font-family: 'Fraunces', serif;
  letter-spacing: -.5px;
}
.pb-badge-stat-label { font-size:8.5px;color:var(--text3);margin-top:1px;white-space:nowrap; }

/* ============================================================
   RESPONSIVE — Mobile-first pipeline builder
   ============================================================ */

/* Tablet: 640–899px — shrink sidebar, keep side-by-side */
@media (max-width: 899px) {
  .pb-browser { border-radius: 10px; }

  .pb-titlebar { height: 36px; padding: 0 12px; gap: 8px; }
  .pb-traffic span { width: 9px; height: 9px; }
  .pb-url-inner { padding: 3px 10px; font-size: 10px; }
  .pb-app-label { display: none; }

  .pb-app { height: 420px; }

  .pb-sidebar { width: 140px; }

  .pb-canvas-topbar { height: 42px; padding: 0 10px; }
  .pb-canvas-title { font-size: 11px; }
  .pb-canvas-subtitle { display: none; }
  .pb-save-btn { font-size: 9.5px; padding: 5px 9px; }

  .pb-stage-wrap { width: 210px; }
  .pb-stage-label { font-size: 10px; }

  .pb-settings-panel { width: 175px; }

  .pb-stage-area { height: calc(100% - 42px); }
}

/* Mobile: ≤ 639px — vertical stack layout */
@media (max-width: 639px) {
  .pb-browser { border-radius: 10px; }

  .pb-titlebar { height: 34px; padding: 0 10px; gap: 6px; }
  .pb-traffic span { width: 8px; height: 8px; }
  .pb-url-inner { padding: 2px 8px; font-size: 9.5px; max-width: 150px; }
  .pb-app-label { display: none; }

  /* Vertical stack: sidebar on top as compact bar */
  .pb-app {
    flex-direction: column;
    height: auto;
    min-height: 400px;
    overflow: visible;
  }

  /* Sidebar becomes a horizontal top strip */
  .pb-sidebar {
    width: 100%;
    flex-direction: row;
    align-items: stretch;
    border-right: none;
    border-bottom: 1px solid var(--border);
    height: auto;
    flex-shrink: 0;
    overflow: hidden;
  }

  .pb-sidebar-section {
    padding: 8px 10px;
    border-bottom: none;
    border-right: 1px solid var(--border);
    flex-shrink: 0;
    min-width: 0;
  }

  .pb-sidebar-label { font-size: 7.5px; letter-spacing: 1px; margin-bottom: 4px; }

  .pb-pipe-tab {
    padding: 4px 6px;
    margin-bottom: 2px;
    gap: 5px;
  }
  .pb-pipe-tab-name { font-size: 8.5px; max-width: 72px; }

  .pb-new-pipe-btn { padding: 3px 6px; margin-top: 2px; }
  .pb-new-pipe-btn span { font-size: 8px; }

  /* Stage library: horizontal scrollable row */
  .pb-lib-section {
    display: flex;
    flex-direction: row;
    flex: 1;
    gap: 5px;
    padding: 7px 8px;
    overflow-x: auto;
    overflow-y: hidden;
    align-items: center;
    scrollbar-width: none;
    min-width: 0;
  }
  .pb-lib-section::-webkit-scrollbar { display: none; }

  /* Lib label hidden in horizontal mode */
  .pb-lib-section .pb-sidebar-label { display: none; }

  #lib-items {
    display: flex;
    flex-direction: row;
    gap: 5px;
    flex-wrap: nowrap;
  }

  .pb-lib-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 6px 7px;
    min-width: 52px;
    max-width: 60px;
    flex-shrink: 0;
    gap: 4px;
    margin-bottom: 0;
    border-radius: 8px;
    transform: none !important; /* prevent translateX on mobile */
  }
  .pb-lib-icon { width: 20px; height: 20px; }
  .pb-lib-name {
    font-size: 7.5px;
    white-space: normal;
    line-height: 1.3;
    max-width: 56px;
    overflow: visible;
    text-overflow: unset;
  }

  /* Canvas fills width below sidebar */
  .pb-canvas {
    width: 100%;
    min-height: 300px;
    flex: none;
  }

  .pb-canvas-topbar {
    height: 38px;
    padding: 0 10px;
  }
  .pb-canvas-title { font-size: 10.5px; max-width: 160px; }
  .pb-save-btn { font-size: 9px; padding: 4px 8px; }

  .pb-stage-area {
    height: auto;
    min-height: 250px;
    padding: 12px 12px;
    overflow: visible;
  }

  .pb-stage-wrap { width: calc(100% - 8px); max-width: 280px; }
  .pb-stage-label { font-size: 10.5px; }
  .pb-stage-badge { font-size: 8px; }

  /* Settings panel: full-width slide from bottom on mobile */
  .pb-settings-panel {
    position: relative;
    width: 100%;
    top: auto;
    right: auto;
    bottom: auto;
    transform: none !important;
    border-left: none;
    border-top: 1px solid var(--border2);
    max-height: 0;
    overflow: hidden;
    transition: max-height .4s cubic-bezier(.16,1,.3,1);
  }
  .pb-settings-panel.open {
    transform: none !important;
    max-height: 280px;
  }

  /* Hide cursor on mobile entirely */
  .pb-cursor { display: none !important; }

  /* Badge responsive */
  .pb-nocode-badge {
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 16px;
    padding: 12px 16px;
    gap: 10px;
  }
  .pb-badge-divider { display: none; }
  .pb-badge-text-main { font-size: 12px; }
  .pb-badge-stat-val { font-size: 15px; }
}

/* Very small mobile: ≤ 400px */
@media (max-width: 400px) {
  .pb-nocode-badge { padding: 10px 12px; gap: 8px; }
  .pb-badge-text-sub { display: none; }
  .pb-badge-stat { min-width: 38px; }
  .pb-badge-stat-val { font-size: 14px; }
  .pb-badge-stat-label { font-size: 7.5px; }
}

/* Reduced motion: disable non-essential animations */
@media (prefers-reduced-motion: reduce) {
  .pb-browser { opacity: 1 !important; transform: none !important; transition: none !important; }
  .pb-c-stage { transition: border-color .2s, box-shadow .2s !important; }
  .pb-cursor { transition: none !important; }
  .pb-settings-panel { transition: transform .2s !important; }
  .pb-live-dot, .pb-canvas-dot { animation: none !important; }
  .pb-drop-zone { animation: none !important; }
  .pb-badge-shimmer { animation: none !important; }
}

/* ============================================================
   KEYFRAME ANIMATIONS
   ============================================================ */
@keyframes pb-blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes pb-stageDrop {
  0%{opacity:0;transform:translateY(-18px) scale(.92)}
  55%{transform:translateY(4px) scale(1.015)}
  78%{transform:translateY(-2px) scale(.998)}
  100%{opacity:1;transform:translateY(0) scale(1)}
}
@keyframes pb-fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
@keyframes pb-checkIn {
  0%{transform:scale(0) rotate(-45deg);opacity:0}
  65%{transform:scale(1.15) rotate(5deg);opacity:1}
  100%{transform:scale(1) rotate(0deg);opacity:1}
}
@keyframes pb-selPulse { 0%,100%{opacity:1} 50%{opacity:.55} }
@keyframes pb-savePulse {
  0%{transform:scale(1);box-shadow:0 0 0 0 rgba(196,154,60,.5)}
  50%{transform:scale(1.04);box-shadow:0 0 0 10px rgba(196,154,60,0)}
  100%{transform:scale(1);box-shadow:0 0 0 0 rgba(196,154,60,0)}
}
@keyframes pb-cursorClick { from{transform:scale(.4);opacity:.9} to{transform:scale(2.4);opacity:0} }
@keyframes pb-shimmer { 0%{transform:translateX(-120%)} 100%{transform:translateX(220%)} }
@keyframes pb-breathe { 0%,100%{opacity:1} 50%{opacity:.3} }
@keyframes pb-badgePop {
  0%{transform:scale(.78) translateY(10px);opacity:0}
  55%{transform:scale(1.04) translateY(-2px);opacity:1}
  75%{transform:scale(.98) translateY(1px)}
  100%{transform:scale(1) translateY(0);opacity:1}
}
</style>



<!-- ERP SECTION (DARK) -->
<div class="section-mid" id="erp">
  <div class="wrap">
    <div class="erp-outer">

      <!-- LEFT COLUMN: heading then points -->
      <div class="erp-left">
        <div class="erp-heading reveal-l" id="erpHeading">
          <div class="eyebrow"><div class="ey-line"></div>Back Office Integration</div>
          <h2 class="h2">When you hire,<br><em>your ERP already knows.</em></h2>
          <p class="lead" style="margin-bottom:0;">One trigger. One moment. When a candidate is marked hired, HR Ops fires a clean event downstream.</p>
        </div>
        <div class="erp-points-new reveal-l">
          <div class="erp-point-new">
            <div class="erp-point-icon epi-green">
              <svg viewBox="0 0 13 13"><circle cx="6.5" cy="4" r="2" stroke-width="1.7"/><path d="M1 11c0-2.5 2-4.5 5.5-4.5S12 8.5 12 11" stroke-width="1.7" stroke-linecap="round"/></svg>
            </div>
            <div class="erp-point-body">
              <div class="erp-point-title">Employee Record — Auto Created</div>
              <div class="erp-point-desc">Name, designation, department, joining date, CTC — created in your ERP automatically the moment hire is confirmed.</div>
              <span class="erp-point-badge epb-green">● Instant sync</span>
            </div>
          </div>
          <div class="erp-point-new">
            <div class="erp-point-icon epi-gold">
              <svg viewBox="0 0 13 13"><rect x="1" y="2.5" width="11" height="9" rx="1.2" stroke-width="1.7"/><path d="M4 2.5V1.5a1.5 1.5 0 013 0v1M4 6.5h5M4 8.5h3" stroke-width="1.7" stroke-linecap="round"/></svg>
            </div>
            <div class="erp-point-body">
              <div class="erp-point-title">Agency Commission — Auto Raised</div>
              <div class="erp-point-desc">If sourced via agency, commission payable entry raised against vendor record, matched to the signed agreement.</div>
              <span class="erp-point-badge epb-gold">● Vendor matched</span>
            </div>
          </div>
          <div class="erp-point-new">
            <div class="erp-point-icon epi-blue">
              <svg viewBox="0 0 13 13"><path d="M6.5 1.5v10M1.5 6.5h10" stroke-width="1.7" stroke-linecap="round"/></svg>
            </div>
            <div class="erp-point-body">
              <div class="erp-point-title">Zero Double Entry</div>
              <div class="erp-point-desc">Finance sees the hire the moment HR makes the decision. No manual re-entry, no lag, no errors.</div>
              <span class="erp-point-badge epb-blue">● Real-time</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: invisible spacer + 3D card -->
      <div class="erp-right">
        <div class="erp-right-spacer" id="erpSpacer"></div>
        <div class="erp-card-wrapper reveal-r">
          <div class="erp-card-3d" id="erpCard">
            <div class="erp-card-header">
              <div class="erp-card-title">Back Office Sync</div>
              <div class="panel-live"><div class="live-dot"></div>Auto-triggered on hire</div>
            </div>
            <div class="erp-card-body">
              <div class="erp-hire-box">
                <div class="erp-hire-icon"><svg viewBox="0 0 16 16"><path d="M2 8l4 4 8-8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                <div>
                  <div class="erp-hire-title">Hire confirmed - Priya Sharma</div>
                  <div class="erp-hire-sub">Joining: 1 Feb 2025 - CTC: Rs18L - via TalentHub</div>
                </div>
              </div>
              <div class="erp-arrow-row"><div class="erp-arrow-line"></div><div class="erp-arrow-text">⚡ 7 Triggers automatically</div><div class="erp-arrow-line"></div></div>
              <div class="erp-auto-flows">
                <div class="erp-flow-row">
                  <div class="erp-flow-icon erp-fi-green"><svg viewBox="0 0 12 12"><circle cx="6" cy="4" r="2" stroke-width="1.7"/><path d="M1 10.5c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke-width="1.7" stroke-linecap="round"/></svg></div>
                  <div class="erp-flow-text"><div class="erp-flow-title">Employee record created</div><div class="erp-flow-desc">Name, designation, dept, joining date, CTC structure</div></div>
                  <div class="erp-flow-auto">Auto</div>
                </div>
                <div class="erp-flow-row">
                  <div class="erp-flow-icon erp-fi-gold"><svg viewBox="0 0 12 12"><rect x="1" y="3" width="10" height="8" rx="1" stroke-width="1.7"/><path d="M4 3V2a2 2 0 014 0v1" stroke-width="1.7"/><path d="M4 7h4M4 9h2" stroke-width="1.7" stroke-linecap="round"/></svg></div>
                  <div class="erp-flow-text"><div class="erp-flow-title">Commission payable - Rs1.62L</div><div class="erp-flow-desc">Raised against TalentHub vendor record</div></div>
                  <div class="erp-flow-auto">Auto</div>
                </div>
              </div>
              <div class="erp-systems">
                <div class="erp-sys-chip">SAP S/4 HANA</div>
                <div class="erp-sys-chip">SAP Business One</div>
                <div class="erp-sys-chip">Oracle NetSuite</div>
                <div class="erp-sys-chip">Odoo / OpenERP</div>
                <div class="erp-sys-chip">Tally Prime</div>
                <div class="erp-sys-chip">Zoho Books</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>`

const SCRIPT = `(function() {
const RUN_ID = (window.__hropsPipelineRunId || 0) + 1;
window.__hropsPipelineRunId = RUN_ID;

// Detect if we're on a touch/mobile device
const isMobile = () => window.innerWidth <= 639;

// -- Data ---------------------------------------------------------------------
const COLORS = {
  gold:'#C49A3C', blue:'#3470F0', purple:'#7C3AED', green:'#18B87A',
  orange:'#EA580C', red:'#E0384F',
  goldBg:'rgba(196,154,60,.1)', blueBg:'rgba(52,112,240,.1)',
  purpleBg:'rgba(124,58,237,.1)', greenBg:'rgba(24,184,122,.1)',
  orangeBg:'rgba(234,88,12,.1)',
};

const ICONS = {
  screen: \`<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="1" y="2" width="14" height="10" rx="2"/><path d="M5 15h6M8 12v3"/></svg>\`,
  task:   \`<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 8l2.5 2.5 4-4"/></svg>\`,
  people: \`<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="6" cy="5" r="2"/><circle cx="11" cy="5" r="2"/><path d="M1 13c0-2.5 2.2-4.5 5-4.5M10 9c2.8 0 5 2 5 4.5"/></svg>\`,
  offer:  \`<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M5 7h6M5 10h4"/></svg>\`,
  shield: \`<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 2l5 2.5v4C13 11.5 10.8 14 8 14 5.2 14 3 11.5 3 8.5v-4L8 2z"/><path d="M5.5 8.5l2 2 3.5-4"/></svg>\`,
  check:  \`<svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 5l2.5 2.5 4-4"/></svg>\`,
  arrow:  \`<svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1l3 3 3-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>\`,
};

const LIBRARY = [
  {id:'ai_screen', label:'AI Resume Screen',    color:COLORS.gold,   bg:COLORS.goldBg,   icon:'screen'},
  {id:'assessment',label:'Technical Assessment',color:COLORS.blue,   bg:COLORS.blueBg,   icon:'task'  },
  {id:'interview', label:'Interview Round',      color:COLORS.purple, bg:COLORS.purpleBg, icon:'people'},
  {id:'offer',     label:'Offer Generation',     color:COLORS.green,  bg:COLORS.greenBg,  icon:'offer' },
  {id:'bg_check',  label:'Background Check',     color:COLORS.orange, bg:COLORS.orangeBg, icon:'shield'},
];

const PIPELINE_A = {
  name:'Senior Backend Engineer', tag:'IC4 - Complex - 5 stages', color:COLORS.gold,
  stages:[
    {libId:'ai_screen', label:'AI Resume Screen',     badge:'AI Automated',   badgeColor:COLORS.gold,
     settings:[['Pass threshold','Score = 70'],['Auto-decline','< 55 instant'],['Models','Gemini + GPT-4o']],
     branch:'Score < 55 ? Auto-decline'},
    {libId:'assessment',label:'Technical Assessment', badge:'Magic Link',      badgeColor:COLORS.blue,
     settings:[['Format','Magic Link - no login'],['Duration','90 minutes'],['Topics','Go - System Design - AWS']]},
    {libId:'interview', label:'System Design Round',  badge:'Panel - 2 people',badgeColor:COLORS.purple,
     settings:[['Interviewers','Arjun K + Deepa N'],['Duration','60 min'],['Scorecard','4 dimensions']]},
    {libId:'interview', label:'Culture & Leadership', badge:'1:1 Interview',   badgeColor:COLORS.purple,
     settings:[['Interviewer','Hiring Manager'],['Duration','45 min'],['Format','Structured']]},
    {libId:'offer',     label:'Offer Generation',     badge:'AI Automated',    badgeColor:COLORS.green,
     settings:[['Band','Rs22L - Rs28L CTC'],['Commission','9% - agency'],['Delivery','Magic Link']]},
  ],
};

const PIPELINE_B = {
  name:'Engineering Intern', tag:'Entry Level - Fast track - 3 stages', color:COLORS.blue,
  stages:[
    {libId:'ai_screen',label:'AI Resume Screen',  badge:'AI Automated',badgeColor:COLORS.gold,
     settings:[['Pass threshold','Score = 50'],['Focus','Potential > experience'],['Time','< 30 seconds']]},
    {libId:'interview',label:'Introductory Call', badge:'Single Round', badgeColor:COLORS.blue,
     settings:[['Interviewer','Any recruiter'],['Duration','30 min'],['Calendar','Auto-scheduled']]},
    {libId:'offer',    label:'Offer Generation',  badge:'AI Automated', badgeColor:COLORS.green,
     settings:[['Band','Rs8L - Rs12L CTC'],['Duration','6-month internship'],['Delivery','Magic Link']]},
  ],
};

// -- Timeline ------------------------------------------------------------------
// Mobile gets a faster timeline with fewer stages shown to keep animation clean
const PHASES_DESKTOP = [
  ['idle',1400],
  ['new_a',1800],
  ['drag_a0',1400],['drop_a0',900],['config_a0',4000],['close_a0',700],['branch_a0',1200],
  ['drag_a1',1300],['drop_a1',900],['config_a1',3800],['close_a1',700],
  ['drag_a2',1300],['drop_a2',900],['config_a2',3800],['close_a2',700],
  ['drag_a3',1300],['drop_a3',900],['config_a3',3400],['close_a3',700],
  ['drag_a4',1300],['drop_a4',900],['config_a4',3400],['close_a4',700],
  ['save_a',1600],['pause_a',2800],
  ['new_b',1600],
  ['drag_b0',1300],['drop_b0',900],['config_b0',3600],['close_b0',700],
  ['drag_b1',1300],['drop_b1',900],['config_b1',3400],['close_b1',700],
  ['drag_b2',1300],['drop_b2',900],['config_b2',3000],['close_b2',700],
  ['save_b',1600],
  ['complete',5000],
  ['fadeout',1400],
];

// Mobile: comfortable pace — readable without cursor
const PHASES_MOBILE = [
  ['idle',1100],
  ['new_a',1400],
  ['drag_a0',1100],['drop_a0',700],['config_a0',2800],['close_a0',500],['branch_a0',1000],
  ['drag_a1',1000],['drop_a1',700],['config_a1',2600],['close_a1',500],
  ['drag_a2',1000],['drop_a2',700],['config_a2',2600],['close_a2',500],
  ['drag_a3',1000],['drop_a3',700],['config_a3',2400],['close_a3',500],
  ['drag_a4',1000],['drop_a4',700],['config_a4',2400],['close_a4',500],
  ['save_a',1300],['pause_a',2200],
  ['new_b',1200],
  ['drag_b0',1000],['drop_b0',700],['config_b0',2600],['close_b0',500],
  ['drag_b1',1000],['drop_b1',700],['config_b1',2400],['close_b1',500],
  ['drag_b2',1000],['drop_b2',700],['config_b2',2000],['close_b2',500],
  ['save_b',1300],
  ['complete',4000],
  ['fadeout',1100],
];

function buildTimeline(phases) {
  const TL = [];
  let t = 0;
  for (const [id, dur] of phases) {
    TL.push({id, dur, start:t, end:t+dur});
    t += dur;
  }
  return { TL, LOOP_MS: t };
}

let currentTL = buildTimeline(isMobile() ? PHASES_MOBILE : PHASES_DESKTOP);
let TL = currentTL.TL;
let LOOP_MS = currentTL.LOOP_MS;

function getPhase(ms) {
  const m = ms % LOOP_MS;
  return TL.find(p => m >= p.start && m < p.end) || TL[0];
}
function pIdx(id) { return TL.findIndex(p => p.id === id); }

const $ = id => document.getElementById(id);

function makePipeTab(pipe, active, saved) {
  return \`<div class="pb-pipe-tab \${active?'active':''}">
    <div class="pb-pipe-tab-dot" style="background:\${pipe.color};box-shadow:0 0 6px \${pipe.color}88"></div>
    <div class="pb-pipe-tab-name">\${pipe.name}</div>
    <div class="pb-pipe-tab-check \${saved?'visible':''}" style="background:rgba(24,184,122,.1);border:1px solid rgba(24,184,122,.4);">
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#18B87A" stroke-width="1.6" stroke-linecap="round"><path d="M2 5l2.5 2.5 4-4"/></svg>
    </div>
  </div>\`;
}

function makeLibItem(item, highlightColor, dragging) {
  let cls = 'pb-lib-item';
  if (highlightColor === COLORS.gold)   cls += ' highlighted';
  else if (highlightColor === COLORS.blue)   cls += ' hl-blue';
  else if (highlightColor === COLORS.purple) cls += ' hl-purple';
  else if (highlightColor === COLORS.green)  cls += ' hl-green';
  if (dragging) cls += ' dragging';
  return \`<div class="\${cls}">
    <div class="pb-lib-icon" style="background:\${item.bg};border:1px solid \${item.color}28;color:\${item.color};">\${ICONS[item.icon]}</div>
    <div class="pb-lib-name">\${item.label}</div>
  </div>\`;
}

function makeStage(stage, selected, dropping, showBranch) {
  const lib = LIBRARY.find(l => l.id === stage.libId) || LIBRARY[0];
  const c = lib.color;
  return \`<div class="pb-c-stage \${selected?'selected':''} \${dropping?'dropping':''}"\${selected?\` style="border-color:\${c}55;box-shadow:0 0 0 3px \${c}14,0 8px 24px rgba(0,0,0,.35);"\`:''}>
    <div class="pb-stage-accent" style="background:linear-gradient(90deg,transparent,\${c}77,transparent);"></div>
    <div class="pb-stage-inner">
      <div class="pb-stage-icon" style="background:\${lib.bg};border:1px solid \${c}28;color:\${c};">\${ICONS[lib.icon]}</div>
      <div style="flex:1;min-width:0;">
        <div class="pb-stage-label">\${stage.label}</div>
        <div>
          <span class="pb-stage-badge" style="color:\${stage.badgeColor};background:\${stage.badgeColor}18;">\${stage.badge}</span>
          \${showBranch && stage.branch ? \`<span style="display:inline-flex;align-items:center;gap:3px;margin-left:5px;background:rgba(224,56,79,.07);border:1px solid rgba(224,56,79,.2);border-radius:100px;padding:1px 6px;vertical-align:middle;"><span style="width:3px;height:3px;border-radius:50%;background:#E0384F;flex-shrink:0;display:inline-block"></span><span style="font-size:8px;color:#E0384F;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100px;">\${stage.branch}</span></span>\` : ''}
        </div>
      </div>
      \${selected ? \`<div class="pb-stage-arrow-icon" style="background:\${c};"><svg width="7" height="7" viewBox="0 0 9 9" fill="none"><path d="M2 4.5h5M4.5 2l2.5 2.5-2.5 2.5" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>\` : ''}
    </div>
  </div>\`;
}

function makeArrow(color) {
  return \`<div class="pb-c-arrow">
    <div class="pb-c-arrow-line" style="background:\${color}50;"></div>
    <div class="pb-c-arrow-head" style="border-top:5px solid \${color}60;"></div>
  </div>\`;
}

function makeSettingsPanel(stage, filledCount) {
  if (!stage) return { header:'', body:'' };
  const lib = LIBRARY.find(l => l.id === stage.libId) || LIBRARY[0];
  const header = \`<div class="pb-settings-header-row">
    <div class="pb-settings-icon" style="background:\${lib.bg};border:1px solid \${lib.color}28;color:\${lib.color};">\${ICONS[lib.icon]}</div>
    <div>
      <div class="pb-settings-title">Configure Stage</div>
      <div class="pb-settings-sub" style="color:\${lib.color};">\${stage.label}</div>
    </div>
  </div>\`;
  let body = \`<div class="pb-settings-section-label">Configuration</div>\`;
  stage.settings.forEach((row, i) => {
    const filled = i < filledCount;
    body += \`<div class="pb-setting-row \${filled?'':'hidden'}">
      <div class="pb-setting-key">\${row[0]}</div>
      <div class="pb-setting-val">
        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">\${row[1]}</span>
        \${filled ? \`<div class="pb-setting-check">\${ICONS.check}</div>\` : ''}
      </div>
    </div>\`;
  });
  return { header, body };
}

let startTime = null;
let animFrame = null;

function render(now) {
  if (window.__hropsPipelineRunId !== RUN_ID) return;
  if (!startTime) startTime = now;
  const elapsed = now - startTime;

  // Rebuild timeline if viewport changes (e.g. device rotation)
  const mobile = isMobile();

  const phase = getPhase(elapsed);
  const phaseId = phase.id;
  const phaseMs = (elapsed % LOOP_MS) - phase.start;
  const curI = TL.indexOf(phase);

  const buildingB = curI >= pIdx('new_b');
  const activePipe = buildingB ? PIPELINE_B : PIPELINE_A;

  const isFading = phaseId === 'fadeout';
  const browserEl = document.querySelector('.pb-browser');
  if (browserEl) browserEl.style.opacity = isFading ? Math.max(0, 1 - phaseMs/800) : '1';
  const badgeEl = $('badge-wrap');

  const glowEl = $('canvas-glow');
  if (glowEl) glowEl.style.background = \`radial-gradient(ellipse at 25% 25%, \${activePipe.color}07 0%, transparent 55%)\`;

  const titleText = activePipe.name;
  const typing = phaseId === 'new_a' || phaseId === 'new_b';
  const titleVisible = curI >= pIdx('new_a');
  const typeLen = typing ? Math.floor((phaseMs / phase.dur) * titleText.length) : titleText.length;
  const titleEl = $('canvas-title-text');
  const blinkEl = $('cursor-blink');
  const dotEl = $('canvas-dot');
  const subtitleEl = $('canvas-subtitle');
  if (titleEl) titleEl.textContent = titleVisible ? titleText.slice(0, typeLen) : '';
  if (blinkEl) blinkEl.style.display = typing ? 'inline-block' : 'none';
  if (dotEl) { dotEl.style.color = activePipe.color; dotEl.style.background = activePipe.color; }
  if (subtitleEl) subtitleEl.textContent = activePipe.tag;

  const saveBtn = $('save-btn');
  const savingNow = phaseId === 'save_a' || phaseId === 'save_b';
  const aSaved = curI >= pIdx('save_a');
  const bSaved = curI >= pIdx('save_b');
  const currentSaved = buildingB ? bSaved : aSaved;
  if (saveBtn) {
    saveBtn.className = 'pb-save-btn' + (savingNow ? ' saving' : currentSaved ? ' saved' : '');
    saveBtn.innerHTML = currentSaved && !savingNow
      ? (ICONS.check + ' Saved')
      : savingNow ? 'Saving...' : 'Save Pipeline';
  }

  const tabsEl = $('pipe-tabs');
  if (tabsEl) {
    let tabs = '';
    if (curI >= pIdx('new_a')) tabs += makePipeTab(PIPELINE_A, !buildingB, aSaved);
    if (curI >= pIdx('new_b')) tabs += makePipeTab(PIPELINE_B, buildingB, bSaved);
    tabsEl.innerHTML = tabs;
  }

  const dropsA = ['drop_a0','drop_a1','drop_a2','drop_a3','drop_a4'];
  const dropsB = ['drop_b0','drop_b1','drop_b2'];
  const drops = buildingB ? dropsB : dropsA;
  const canvasStages = activePipe.stages.filter((_, i) => curI >= pIdx(drops[i]));
  const droppingIdx = drops.findIndex(d => phaseId === d);

  const configsA = ['config_a0','config_a1','config_a2','config_a3','config_a4'];
  const configsB = ['config_b0','config_b1','config_b2'];
  const configs = buildingB ? configsB : configsA;
  const configIdx = configs.findIndex(c => phaseId === c);
  const settingsOpen = configIdx >= 0;
  const closesA = ['close_a0','close_a1','close_a2','close_a3','close_a4'];
  const closesB = ['close_b0','close_b1','close_b2'];
  const closes = buildingB ? closesB : closesA;
  const closeIdx = closes.findIndex(c => phaseId === c);
  const selectedIdx = settingsOpen ? configIdx : closeIdx >= 0 ? closeIdx : -1;

  const stageForConfig = settingsOpen ? canvasStages[configIdx] : null;
  const maxRows = stageForConfig ? stageForConfig.settings.length : 3;
  const filledCount = settingsOpen
    ? Math.min(maxRows, Math.floor((phaseMs / phase.dur) * (maxRows + 0.8)))
    : 99;

  const branchVisible = curI >= pIdx('branch_a0') && !buildingB;

  const dragsA = ['drag_a0','drag_a1','drag_a2','drag_a3','drag_a4'];
  const dragsB = ['drag_b0','drag_b1','drag_b2'];
  const drags = buildingB ? dragsB : dragsA;
  const dragIdx = drags.findIndex(d => phaseId === d);
  const draggedStage = dragIdx >= 0 ? activePipe.stages[dragIdx] : null;
  const libHighlightId = draggedStage ? draggedStage.libId : null;
  const libHighlightColor = draggedStage ? (LIBRARY.find(l=>l.id===draggedStage.libId)||LIBRARY[0]).color : null;

  const libEl = $('lib-items');
  if (libEl) {
    libEl.innerHTML = LIBRARY.map(item => {
      const isHL = libHighlightId === item.id;
      const isDragging = isHL && dragIdx >= 0;
      return makeLibItem(item, isHL ? libHighlightColor : null, isDragging);
    }).join('');
  }

  const canvasClear = phaseId === 'new_b';
  const stageWrap = $('stage-wrap');
  if (stageWrap) {
    stageWrap.style.opacity = canvasClear ? '0' : '1';
    stageWrap.style.transition = 'opacity .25s ease';

    if (!canvasClear) {
      let stageHTML = '';
      canvasStages.forEach((stage, i) => {
        const lib = LIBRARY.find(l => l.id === stage.libId) || LIBRARY[0];
        stageHTML += makeStage(stage, selectedIdx === i, droppingIdx === i, branchVisible && i === 0);
        if (i < canvasStages.length - 1) stageHTML += makeArrow(lib.color);
      });
      if (dragIdx >= 0 && dragIdx >= canvasStages.length) {
        stageHTML += \`<div class="pb-drop-zone" style="\${canvasStages.length>0?'margin-top:4px':''}">
          <span>Drop to add stage</span>
        </div>\`;
      }
      stageWrap.innerHTML = stageHTML;
    }
  }

  // Settings panel — on mobile uses max-height CSS, on desktop uses transform
  const panel = $('settings-panel');
  const settingsHeaderEl = $('settings-header');
  const settingsBodyEl = $('settings-body');
  if (panel) {
    panel.classList.toggle('open', settingsOpen);
    const stageForPanel = settingsOpen ? canvasStages[configIdx] : (selectedIdx >= 0 ? canvasStages[selectedIdx] : null);
    if (stageForPanel && settingsHeaderEl && settingsBodyEl) {
      const {header, body} = makeSettingsPanel(stageForPanel, filledCount);
      settingsHeaderEl.innerHTML = header;
      settingsBodyEl.innerHTML = body;
    }
  }

  // ── CURSOR (desktop only) ──────────────────────────────────────────────────
  if (!mobile) {
    // midOf measures relative to the .pb-app bounding box
    function midOf(el) {
      const appEl = document.getElementById('pb-app');
      if (!el || !appEl) return null;
      const a = appEl.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return {
        x: r.left - a.left + r.width / 2,
        y: r.top  - a.top  + r.height / 2,
      };
    }

    const libEls    = document.querySelectorAll('#lib-items .pb-lib-item');
    const stageEls  = document.querySelectorAll('#stage-wrap .pb-c-stage');
    const saveEl    = document.getElementById('save-btn');
    const dropZoneEl= document.querySelector('.pb-drop-zone');

    let cx = -999, cy = -999, clicking = false;

    if (dragIdx >= 0) {
      const t2   = Math.min(1, phaseMs / phase.dur);
      const ease = t2 < 0.5 ? 2*t2*t2 : -1 + (4 - 2*t2)*t2;
      const lib  = LIBRARY.find(l => l.id === (draggedStage?.libId)) || LIBRARY[0];
      const libI = LIBRARY.indexOf(lib);
      const src  = midOf(libEls[libI]);
      const dstEl= dropZoneEl || stageEls[stageEls.length - 1];
      const dst  = midOf(dstEl);
      if (src && dst) {
        cx = src.x + (dst.x - src.x) * ease;
        cy = src.y + (dst.y - src.y) * ease;
        clicking = ease > 0.05 && ease < 0.97;
      }
    } else if (droppingIdx >= 0) {
      const p = midOf(stageEls[droppingIdx]);
      if (p) { cx = p.x; cy = p.y; clicking = true; }
    } else if (settingsOpen) {
      const p = midOf(stageEls[configIdx]);
      if (p) { cx = p.x; cy = p.y; }
    } else if (savingNow) {
      const p = midOf(saveEl);
      if (p) { cx = p.x; cy = p.y; clicking = true; }
    } else if (phaseId === 'pause_a') {
      const p = midOf(saveEl);
      if (p) { cx = p.x; cy = p.y; }
    }

    const cursorEl = $('cursor');
    if (cursorEl) {
      const shouldShow = cx !== -999 && curI >= pIdx('new_a') && !isFading && curI < pIdx('complete');
      cursorEl.style.display = shouldShow ? 'block' : 'none';
      if (shouldShow) {
        cursorEl.style.left = cx + 'px';
        cursorEl.style.top  = cy + 'px';
      }
      const existingRipple = cursorEl.querySelector('.pb-cursor-ripple');
      if (clicking && !existingRipple) {
        const ripple = document.createElement('div');
        ripple.className = 'pb-cursor-ripple';
        cursorEl.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
      } else if (!clicking && existingRipple) {
        existingRipple.remove();
      }
    }
  } else {
    // On mobile ensure cursor is hidden
    const cursorEl = $('cursor');
    if (cursorEl) cursorEl.style.display = 'none';
  }

  // Saved bar
  const svBar = $('sv-bar');
  if (svBar) {
    const showBar = phaseId === 'save_a' || phaseId === 'pause_a';
    svBar.style.opacity   = showBar ? '1' : '0';
    svBar.style.transform = showBar ? 'translateY(0)' : 'translateY(8px)';
  }

  // Badge
  const isComplete = curI >= pIdx('complete');
  if (badgeEl) badgeEl.style.display = isComplete ? 'flex' : 'none';

  if (window.__hropsPipelineRunId === RUN_ID) {
    animFrame = requestAnimationFrame(render);
  }
}

let started = false;
function startRender() {
  if (window.__hropsPipelineRunId !== RUN_ID) return;
  if (started) return;
  started = true;
  animFrame = requestAnimationFrame(render);
}

// Observe when browser scrolls into view
const observer = new IntersectionObserver(entries => {
  if (entries[0] && entries[0].isIntersecting) {
    observer.disconnect();
    if (browserEl) browserEl.classList.add('pb-visible');
    // Small delay before starting animation so entrance completes first
    setTimeout(startRender, 350);
  }
}, { threshold: 0.1 });

const browserEl = document.querySelector('#workflow-builder .pb-browser');
if (browserEl) observer.observe(browserEl);
setTimeout(startRender, 300);

})()`

export default function PipelineBuilder() {
  useEffect(() => {
    // Cleanup previous script
    const prev = document.querySelector('script[data-hrops="pipeline-builder"]')
    if (prev && prev.parentNode) prev.parentNode.removeChild(prev)

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.dataset.hrops = 'pipeline-builder'
    script.text = SCRIPT
    document.body.appendChild(script)

    // ERP spacer sync
    function syncErpSpacer() {
      const heading = document.getElementById('erpHeading')
      const spacer = document.getElementById('erpSpacer')
      if (heading && spacer) {
        spacer.style.height = (heading.offsetHeight + 36) + 'px'
      }
    }
    const t1 = setTimeout(syncErpSpacer, 100)
    const t2 = setTimeout(syncErpSpacer, 500)
    window.addEventListener('resize', syncErpSpacer)

    // ERP card 3D tilt
    function initErpCard() {
      const card = document.getElementById('erpCard')
      if (!card) return
      const wrapper = card.parentElement
      if (!wrapper) return
      wrapper.addEventListener('mousemove', function (e: MouseEvent) {
        const r = card.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
        card.style.transition = 'transform 0.08s ease-out'
        card.style.transform = 'rotateX(' + (dy * -8) + 'deg) rotateY(' + (dx * 8) + 'deg) translateY(-6px)'
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%')
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%')
      })
      wrapper.addEventListener('mouseleave', function () {
        card.style.transition = 'transform 0.55s cubic-bezier(.16,1,.3,1)'
        card.style.transform = 'rotateX(4deg) rotateY(-4deg)'
      })
    }
    const t3 = setTimeout(initErpCard, 200)

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      window.removeEventListener('resize', syncErpSpacer)
    }
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: HTML }} />
}
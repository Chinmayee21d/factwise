import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  navy: "#080f1e", navy2: "#0c1526", navy3: "#101d30",
  surf: "#14243c", surf2: "#192d48",
  b: "rgba(255,255,255,.06)", b2: "rgba(255,255,255,.11)",
  tx: "#e8eeff", tx2: "#94aac4", tx3: "#526880",
  gold: "#c49a3c", gBg: "rgba(196,154,60,.09)",
  grn: "#17b378", gnBg: "rgba(23,179,120,.09)",
  red: "#e0384f", rBg: "rgba(224,56,79,.08)",
  blu: "#3470f0", blBg: "rgba(52,112,240,.09)",
  pur: "#8a33e0",
};

const wait = ms => new Promise(r => setTimeout(r, ms));

function Pip({ col = C.grn, sz = 6 }) {
  return (
    <span style={{
      display: "inline-block", width: sz, height: sz, borderRadius: "50%",
      background: col, flexShrink: 0,
      boxShadow: `0 0 7px ${col}bb`,
      animation: "aidPulse 2.2s ease-in-out infinite",
    }} />
  );
}

function Av({ l, bg, s = 28 }) {
  return (
    <div style={{
      width: s, height: s, borderRadius: s * 0.28,
      background: bg, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: s * 0.33,
      fontWeight: 700, color: "#fff", flexShrink: 0, letterSpacing: .2,
    }}>{l}</div>
  );
}

function SBar({ pct, col, delay = 0, h = 3, show }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!show) { setW(0); return; }
    const t = setTimeout(() => setW(pct), delay + 60);
    return () => clearTimeout(t);
  }, [show, pct, delay]);
  return (
    <div style={{ height: h, borderRadius: 99, background: "rgba(255,255,255,.05)", overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 99, background: col, width: `${w}%`,
        transition: "width 1.2s cubic-bezier(.16,1,.3,1)",
        boxShadow: `0 0 6px ${col}55`,
      }} />
    </div>
  );
}

function Tag({ children, col, bg }) {
  return (
    <span style={{
      fontSize: 8.5, fontWeight: 600, padding: "2.5px 8px", borderRadius: 99,
      background: bg || "rgba(255,255,255,.05)",
      color: col || C.tx3,
      border: `1px solid ${col ? col + "44" : C.b}`,
      whiteSpace: "nowrap", letterSpacing: .15,
    }}>{children}</span>
  );
}

function Lbl({ children, mb = 8 }) {
  return (
    <div style={{
      fontSize: 8.5, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: 1.8, color: C.tx3, marginBottom: mb,
    }}>{children}</div>
  );
}

/* ── Cursor ── */
function Cursor({ x, y, vis, ring }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, pointerEvents: "none", zIndex: 500,
      transform: "translate(-3px,-2px)",
      transition: "left .55s cubic-bezier(.16,1,.3,1), top .55s cubic-bezier(.16,1,.3,1), opacity .3s",
      opacity: vis ? 1 : 0,
    }}>
      {ring && (
        <div style={{
          position: "absolute", top: -10, left: -10, width: 26, height: 26,
          borderRadius: "50%", border: `2px solid ${C.gold}`,
          animation: "aidRipple .55s ease-out forwards",
        }} />
      )}
      <svg width="18" height="21" viewBox="0 0 18 21" fill="none">
        <path d="M3 2L16 10.5L9 12L6.5 20L3 2Z" fill="white" stroke="#080f1e" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── IMPROVED Step bar — issue #4: dominant active step, numbered counter ── */
const STEPS = ["Create JD", "Scan Resume", "Rank Candidates", "Assess & Hire"];

function StepBar({ active }) {
  return (
    <div style={{ background: C.navy2, flexShrink: 0, borderBottom: `1px solid ${C.b}` }}>
      {/* Step labels */}
      <div style={{ display: "flex", alignItems: "stretch" }}>
        {STEPS.map((s, i) => {
          const done = i < active, isAct = i === active;
          return (
            <div key={i} style={{
              flex: isAct ? "0 0 auto" : "1 1 0",
              minWidth: isAct ? "auto" : 0,
              padding: isAct ? "9px 14px 7px" : "9px 6px 7px",
              textAlign: "center",
              fontSize: isAct ? 11.5 : 9,
              fontWeight: isAct ? 700 : done ? 500 : 400,
              color: isAct ? C.gold : done ? C.grn : C.tx3,
              transition: "all .5s cubic-bezier(.16,1,.3,1)",
              letterSpacing: isAct ? .2 : 0,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              borderRight: i < STEPS.length - 1 ? `1px solid ${C.b}` : "none",
              background: isAct ? "rgba(196,154,60,.05)" : "transparent",
            }}>
              {isAct ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 17, height: 17, borderRadius: "50%",
                    background: C.gold, color: "#080f1e",
                    fontSize: 9, fontWeight: 800, flexShrink: 0,
                  }}>{i + 1}</span>
                  {s}
                </span>
              ) : done ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <span style={{ color: C.grn, fontSize: 9 }}>✓</span>
                  {s}
                </span>
              ) : (
                <span style={{ opacity: .6 }}>{s}</span>
              )}
            </div>
          );
        })}
      </div>
      {/* Track */}
      <div style={{ position: "relative", height: 3, background: "rgba(255,255,255,.04)" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${(active / (STEPS.length - 1)) * 100}%`,
          background: `linear-gradient(90deg, ${C.grn}, ${C.gold})`,
          transition: "width .9s cubic-bezier(.16,1,.3,1)",
          boxShadow: `0 0 12px ${C.gold}66`,
        }} />
        {STEPS.map((_, i) => {
          const done = i < active, isAct = i === active;
          const lp = i === 0 ? 0 : i === STEPS.length - 1 ? 100 : (i / (STEPS.length - 1)) * 100;
          const col = isAct ? C.gold : done ? C.grn : "rgba(255,255,255,.18)";
          return (
            <div key={i} style={{
              position: "absolute", top: "50%", left: `${lp}%`,
              transform: "translate(-50%,-50%)",
              width: isAct ? 12 : done ? 10 : 7,
              height: isAct ? 12 : done ? 10 : 7,
              borderRadius: "50%",
              background: isAct || done ? col : C.navy2,
              border: `2px solid ${col}`,
              boxShadow: isAct ? `0 0 14px ${C.gold}, 0 0 5px ${C.gold}` : done ? `0 0 7px ${C.grn}88` : "none",
              transition: "all .5s cubic-bezier(.16,1,.3,1)",
              zIndex: 2,
            }} />
          );
        })}
      </div>
    </div>
  );
}

/* ── Sidebar ── */
const NAV = [
  { icon: "📋", label: "Creating JD" },
  { icon: "📄", label: "Resume Intake" },
  { icon: "🏆", label: "Candidates" },
  { icon: "🎯", label: "Assessments" },
];

function Sidebar({ active }) {
  return (
    <div style={{
      width: 124, borderRight: `1px solid ${C.b}`,
      background: C.navy2, display: "flex", flexDirection: "column", flexShrink: 0,
    }}>
      <div style={{ padding: "10px 11px 8px", borderBottom: `1px solid ${C.b}` }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: C.tx, letterSpacing: -.2 }}>HR Ops</div>
        <div style={{ fontSize: 8, color: C.tx3, marginTop: 1.5 }}>AI Hiring Platform</div>
      </div>
      <div style={{ padding: "7px 6px", flex: 1 }}>
        <div style={{
          fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5,
          color: C.tx3, padding: "0 6px", marginBottom: 5,
        }}>Workflow</div>
        {NAV.map((n, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "6px 7px",
            borderRadius: 8, marginBottom: 2,
            background: active === i ? C.gBg : "transparent",
            border: `1px solid ${active === i ? "rgba(196,154,60,.25)" : "transparent"}`,
            transition: "all .4s",
          }}>
            {/* Colored dot instead of emoji for better proportion (#11) */}
            <span style={{
              width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
              background: active === i ? C.gold : active > i ? C.grn : C.tx3,
              boxShadow: active === i ? `0 0 6px ${C.gold}88` : "none",
              transition: "all .4s",
            }} />
            <span style={{
              fontSize: 9, fontWeight: active === i ? 600 : 400,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              color: active === i ? C.gold : active > i ? C.grn : C.tx2,
              transition: "color .4s",
            }}>
              {active > i ? "✓ " : ""}{n.label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 11px", borderTop: `1px solid ${C.b}`, display: "flex", alignItems: "center", gap: 6 }}>
        <Pip col={C.grn} sz={5} />
        <span style={{ fontSize: 8, fontWeight: 600, color: C.grn }}>AI Active</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   PANEL 1 — JD BUILDER
════════════════════════════════════ */
const JD_FIELDS = [
  ["Role", "Senior Product Manager"], ["Location", "Mumbai, India"],
  ["Experience", "5–8 Years"], ["Compensation", "₹40–55 LPA"],
  ["Skills", "Product Strategy, SQL, Analytics, Fintech"],
  ["Reporting to", "VP of Product"],
];
const JD_REQS = [
  { r: "Product Management (5+ yrs)", pct: 96, col: C.gold },
  { r: "Fintech / Payments domain", pct: 91, col: C.grn },
  { r: "Data Analytics / SQL", pct: 86, col: C.blu },
  { r: "Stakeholder Management", pct: 89, col: C.grn },
  { r: "Agile / Scrum", pct: 82, col: C.blu },
];

function PanelJD({ typed, fieldsN, reqsN, showApprove, approved, approveRef }) {
  return (
    <div style={{ display: "flex", gap: 11, height: "100%", overflow: "hidden" }}>
      {/* Left */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9, overflow: "hidden" }}>
        <div style={{
          background: C.navy3, borderRadius: 10, padding: "10px 12px", flexShrink: 0,
          border: `1px solid ${typed.length ? "rgba(196,154,60,.5)" : C.b2}`,
          boxShadow: typed.length ? "0 0 0 3px rgba(196,154,60,.07)" : "none",
          transition: "border-color .4s, box-shadow .4s",
        }}>
          <Lbl mb={4}>AI Job Builder — Describe the role</Lbl>
          <div style={{
            fontSize: 12.5, fontWeight: 500, color: C.tx, minHeight: 20,
            display: "flex", alignItems: "center", lineHeight: 1.4,
          }}>
            {typed}
            {typed.length > 0 && typed !== "Hire Senior Product Manager" && (
              <span style={{
                display: "inline-block", width: 2, height: 14, background: C.gold,
                animation: "aidBlink .7s infinite", marginLeft: 2, flexShrink: 0, borderRadius: 1,
              }} />
            )}
          </div>
        </div>

        <div style={{
          background: C.navy3, border: `1px solid ${C.b2}`, borderRadius: 10,
          padding: "11px 13px", flex: 1, overflow: "hidden",
          opacity: fieldsN > 0 ? 1 : 0, transition: "opacity .6s",
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.tx, letterSpacing: -.3, marginBottom: 2 }}>
            Senior Product Manager
          </div>
          <div style={{ fontSize: 9, color: C.tx3, marginBottom: 10 }}>Acme Fintech · Full-time · Mumbai</div>
          {JD_FIELDS.slice(0, fieldsN).map(([k, v], i) => (
            <div key={i} style={{ display: "flex", gap: 9, marginBottom: 5, animation: "aidFadeUp .35s ease both" }}>
              <span style={{ fontSize: 8.5, color: C.tx3, width: 78, flexShrink: 0, paddingTop: 1 }}>{k}</span>
              <span style={{ fontSize: 9, fontWeight: 500, color: C.tx2, lineHeight: 1.45 }}>{v}</span>
            </div>
          ))}
          {fieldsN >= JD_FIELDS.length && (
            <div style={{ marginTop: 9, paddingTop: 9, borderTop: `1px solid ${C.b}`, display: "flex", flexWrap: "wrap", gap: 4 }}>
              {["Add B2B SaaS req?", "Include experimentation?", "Add team size?"].map((s, i) => (
                <div key={i} style={{
                  fontSize: 8.5, padding: "2.5px 9px", borderRadius: 99,
                  background: "rgba(196,154,60,.07)", border: "1px solid rgba(196,154,60,.25)",
                  color: C.gold, animation: `aidFadeUp .3s ${i * 80}ms ease both`,
                }}>💡 {s}</div>
              ))}
            </div>
          )}
          {approved && (
            <div style={{
              marginTop: 10, padding: "9px 11px", borderRadius: 9,
              background: C.gnBg, border: "1px solid rgba(23,179,120,.3)",
              display: "flex", alignItems: "center", gap: 8,
              animation: "aidFadeUp .45s ease both",
            }}>
              <Pip col={C.grn} sz={6} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: C.grn }}>Job Published</div>
                <div style={{ fontSize: 8.5, color: C.tx3, marginTop: 1 }}>AI scanning candidate pool…</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div style={{ width: "clamp(148px,20%,172px)", flexShrink: 0, display: "flex", flexDirection: "column", gap: 9 }}>
        <div style={{
          background: C.navy3, border: `1px solid ${C.b2}`, borderRadius: 10,
          padding: "11px 13px", flex: 1,
          opacity: reqsN > 0 ? 1 : 0, transition: "opacity .5s",
        }}>
          <Lbl>Requirements <span style={{ color: C.grn }}>· {reqsN} found</span></Lbl>
          {JD_REQS.slice(0, reqsN).map((r, i) => (
            <div key={i} style={{ marginBottom: 9, animation: "aidFadeUp .3s ease both" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, color: C.tx3, marginBottom: 3 }}>
                <span style={{ color: C.tx2 }}>{r.r}</span>
                <span style={{ fontWeight: 700, color: r.col }}>{r.pct}%</span>
              </div>
              <SBar pct={r.pct} col={r.col} delay={i * 100} h={3} show={reqsN > i} />
            </div>
          ))}
        </div>

        <div ref={approveRef} style={{
          background: approved ? C.grn : C.gold,
          borderRadius: 10, padding: "12px 0", textAlign: "center",
          fontSize: 11, fontWeight: 700, color: "#080f1e",
          boxShadow: `0 6px 28px rgba(${approved ? "23,179,120" : "196,154,60"},.45)`,
          transition: "all .35s", cursor: "pointer",
          opacity: showApprove ? 1 : 0,
          pointerEvents: showApprove ? "auto" : "none",
          letterSpacing: .2,
        }}>
          {approved ? "✓ JD Approved" : "Approve JD"}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   RESUME DOCUMENT — issue #9: smaller name font
════════════════════════════════════ */
function ResumeDoc({ scanY, scanOn, highlights }) {
  return (
    /* ResumeDoc is always inside a flex column — highlights go in the flow, not absolute */
    <div style={{
      background: "#f8faff", borderRadius: 10,
      height: "100%", overflow: "hidden", position: "relative",
      color: "#1a253a", fontFamily: "Georgia,serif",
      display: "flex", flexDirection: "column",
      boxShadow: "0 2px 0 #dde4f0, 0 6px 28px rgba(0,0,0,.28), 0 0 0 1px rgba(0,0,0,.1)",
    }}>
      {/* Scrollable content area */}
      <div style={{ flex: 1, overflow: "hidden", padding: "10px 12px", display: "flex", flexDirection: "column" }}>
        {/* Header — issue #9: name 11px not 14px */}
        <div style={{ borderBottom: "1.5px solid #c6d3e4", paddingBottom: 6, marginBottom: 7, flexShrink: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#0d1929", letterSpacing: -.3 }}>Rahul Sharma</div>
          <div style={{ fontSize: 8.5, color: "#3e5570", fontFamily: "system-ui,sans-serif", fontWeight: 500, marginTop: 1 }}>Senior Product Manager</div>
          <div style={{ fontSize: 7, color: "#7a94ac", marginTop: 1.5, fontFamily: "system-ui,sans-serif" }}>
            rahul.sharma@email.com · +91 98765 43210 · Mumbai
          </div>
        </div>
        {/* Body */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ marginBottom: 7 }}>
            <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.8, color: "#7a94ac", marginBottom: 4, fontFamily: "system-ui" }}>EXPERIENCE</div>
            {[
              { co: "Razorpay", role: "Senior PM – Payments", period: "2020–Present", bullets: ["Led UPI switch 0→1, reaching ₹2000Cr+ GMV", "Managed cross-functional team of 18", "Reduced payment failure rate by 34%"] },
              { co: "Flipkart", role: "Product Manager – Growth", period: "2018–2020", bullets: ["Owned checkout funnel; conversion +22%", "Launched Flipkart Pay Later, 1.2M activations"] },
            ].map((item, ii) => (
              <div key={ii} style={{ marginBottom: 5 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#0d1929" }}>{item.co}</span>
                  <span style={{ fontSize: 7, color: "#7a94ac", fontFamily: "system-ui" }}>{item.period}</span>
                </div>
                <div style={{ fontSize: 7.5, color: "#3e5570", fontStyle: "italic", marginBottom: 1.5 }}>{item.role}</div>
                {item.bullets.map((b, bi) => (
                  <div key={bi} style={{ fontSize: 7, color: "#2d3e55", paddingLeft: 6, marginBottom: 1.5, display: "flex", gap: 3, fontFamily: "system-ui" }}>
                    <span style={{ flexShrink: 0, color: "#7a94ac" }}>·</span>{b}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.8, color: "#7a94ac", marginBottom: 4, fontFamily: "system-ui" }}>SKILLS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {["SQL", "Product Analytics", "A/B Testing", "Roadmapping", "Agile", "Fintech", "Growth", "Stakeholder Mgmt"].map(t => (
                <span key={t} style={{ fontSize: 7, padding: "2px 5px", borderRadius: 99, background: "#eaf0fa", border: "1px solid #ccd8ec", color: "#3e5570", fontFamily: "system-ui" }}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.8, color: "#7a94ac", marginBottom: 4, fontFamily: "system-ui" }}>EDUCATION</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#0d1929" }}>IIT Bombay</div>
                <div style={{ fontSize: 7.5, color: "#3e5570", fontStyle: "italic" }}>MBA – Product & Technology</div>
              </div>
              <span style={{ fontSize: 7, color: "#7a94ac", fontFamily: "system-ui" }}>2016–2018</span>
            </div>
          </div>
        </div>
      </div>

      {/* issue #3: Highlight chips — pinned footer row, never overlapping text */}
      {highlights.length > 0 && (
        <div style={{
          flexShrink: 0, padding: "6px 10px",
          borderTop: "1.5px solid #dde6f2",
          display: "flex", flexWrap: "wrap", gap: 4,
          background: "#f2f6ff",
        }}>
          {highlights.map((h, i) => (
            <span key={i} style={{
              background: `rgba(${h.col === "grn" ? "23,179,120" : "196,154,60"},.12)`,
              border: `1px solid rgba(${h.col === "grn" ? "23,179,120" : "196,154,60"},.4)`,
              borderRadius: 5, padding: "2.5px 7px", fontSize: 7.5, fontWeight: 700,
              color: h.col === "grn" ? "#0e8a58" : "#9a7218",
              animation: `aidFadeUp .35s ${i * 60}ms ease both`,
              fontFamily: "system-ui",
            }}>
              {h.col === "grn" ? "✓" : "⚡"} {h.label}
            </span>
          ))}
        </div>
      )}

      {/* Laser scan */}
      {scanOn && (
        <>
          <div style={{
            position: "absolute", left: 0, right: 0, top: scanY, height: 2,
            background: `linear-gradient(90deg,transparent,${C.gold} 30%,${C.grn} 70%,transparent)`,
            boxShadow: `0 0 14px ${C.gold}, 0 0 28px rgba(196,154,60,.5)`,
            zIndex: 10, pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", left: 0, right: 0, top: Math.max(0, scanY - 30), height: 32,
            background: "linear-gradient(180deg,transparent,rgba(196,154,60,.04))",
            zIndex: 9, pointerEvents: "none",
          }} />
        </>
      )}
    </div>
  );
}

const POOL = [
  { i: "RS", name: "Rahul Sharma", role: "Sr. PM · 6 yrs · Razorpay", score: 94, col: "#17b378", v: "Proceed" },
  { i: "PN", name: "Priya Nair", role: "PM · 5 yrs · Flipkart", score: 89, col: "#3470f0", v: "Proceed" },
  { i: "AM", name: "Arjun Mehta", role: "PM · 4 yrs · Swiggy", score: 81, col: "#c49a3c", v: "Maybe" },
  { i: "KS", name: "Kiran Shah", role: "APM · 3 yrs · Paytm", score: 68, col: "#8a33e0", v: "Maybe" },
  { i: "SJ", name: "Sneha Joshi", role: "Business Analyst · 3 yrs", score: 45, col: "#e0384f", v: "Decline" },
];

/* ════════════════════════════════════
   PANEL 2 — RESUME INTAKE
════════════════════════════════════ */
function PanelResume({ subPhase, scanY, scanOn, highlights, extractN, matchScore, showPool }) {
  return (
    <div style={{ display: "flex", gap: 11, height: "100%", overflow: "hidden" }}>
      {/* Left */}
      <div style={{ width: "44%", maxWidth: 210, minWidth: 155, flexShrink: 0, height: "100%" }}>
        {subPhase === 0 && (
          <div style={{
            height: "100%", background: C.navy3,
            border: `2px dashed rgba(196,154,60,.28)`, borderRadius: 10,
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 9,
          }}>
            <span style={{ fontSize: 34 }}>📄</span>
            <div style={{ fontSize: 10, color: C.tx2, fontWeight: 500 }}>Rahul_Sharma_Resume.pdf</div>
            <div style={{ fontSize: 8.5, color: C.tx3 }}>Drag to ingest →</div>
          </div>
        )}
        {subPhase >= 1 && !showPool && (
          <div style={{ height: "100%", animation: subPhase === 1 ? "aidFadeUp .5s ease both" : "none" }}>
            <ResumeDoc scanY={scanY} scanOn={scanOn} highlights={highlights} />
          </div>
        )}
        {showPool && (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 5, animation: "aidFadeUp .4s ease both" }}>
            <Lbl>Candidate Pool · 5 profiles</Lbl>
            {POOL.map((c, i) => {
              const vCol = c.v === "Proceed" ? C.grn : c.v === "Maybe" ? C.gold : C.red;
              const vBg = c.v === "Proceed" ? C.gnBg : c.v === "Maybe" ? C.gBg : C.rBg;
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 7, padding: "6px 8px",
                  background: C.navy3, border: `1px solid ${C.b}`, borderRadius: 8,
                  animation: `aidFadeUp .35s ${i * 75}ms ease both`,
                }}>
                  <Av l={c.i} bg={c.col} s={22} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 9.5, fontWeight: 500, color: C.tx }}>{c.name}</div>
                    <div style={{ fontSize: 8, color: C.tx3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.role}</div>
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 99, background: vBg, color: vCol }}>{c.score}%</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Right */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
        {subPhase === 2 && (
          <div style={{
            background: C.navy3, border: "1px solid rgba(196,154,60,.3)",
            borderRadius: 10, padding: "9px 12px",
            display: "flex", alignItems: "center", gap: 9,
            animation: "aidFadeUp .4s ease both",
          }}>
            <div style={{ display: "flex", gap: 3.5 }}>
              {[0, 1, 2].map(j => (
                <div key={j} style={{ width: 4.5, height: 4.5, borderRadius: "50%", background: C.gold, animation: `aidDot 1.2s ${j * .18}s infinite` }} />
              ))}
            </div>
            <span style={{ fontSize: 9.5, fontWeight: 600, color: C.gold }}>AI laser scanning resume…</span>
          </div>
        )}

        {extractN > 0 && (
          <div style={{ background: C.navy3, border: `1px solid ${C.b2}`, borderRadius: 10, padding: "10px 12px", animation: "aidFadeUp .4s ease both" }}>
            <Lbl>Extracted from Resume</Lbl>
            {[["Name", "Rahul Sharma"], ["Exp", "6 Years"], ["Company", "Razorpay (current)"], ["Skills", "SQL · Analytics · Fintech"], ["Edu", "IIT Bombay · MBA"]].slice(0, extractN).map(([k, v], i) => (
              <div key={i} style={{ display: "flex", gap: 9, marginBottom: 5, animation: "aidFadeUp .3s ease both" }}>
                <span style={{ fontSize: 8.5, color: C.tx3, width: 50, flexShrink: 0, paddingTop: 1 }}>{k}</span>
                <span style={{ fontSize: 9.5, fontWeight: 500, color: C.tx2 }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        {matchScore > 0 && (
          <div style={{ background: C.navy3, border: `1px solid ${C.b2}`, borderRadius: 10, padding: "10px 12px", animation: "aidFadeUp .5s ease both" }}>
            {/* issue #12: match score with arc context */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <Lbl mb={0}>Match Score</Lbl>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{matchScore}%</div>
                <div style={{ fontSize: 8, color: C.tx3, marginTop: 1 }}>out of 100 · Strong fit</div>
              </div>
            </div>
            {[{ l: "Skills", p: 92, col: C.gold }, { l: "Experience", p: 100, col: C.grn }, { l: "Domain", p: 88, col: C.blu }].map((b, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, color: C.tx3, marginBottom: 3 }}>
                  <span>{b.l}</span><span style={{ fontWeight: 700, color: b.col }}>{b.p}%</span>
                </div>
                <SBar pct={b.p} col={b.col} delay={i * 150} h={3.5} show={matchScore > 0} />
              </div>
            ))}
          </div>
        )}

        {matchScore >= 92 && (
          <div style={{
            background: C.gnBg, border: "1px solid rgba(23,179,120,.3)",
            borderRadius: 10, padding: "10px 12px",
            display: "flex", alignItems: "center", gap: 9,
            animation: "aidFadeUp .45s ease both",
          }}>
            <Av l="RS" bg={C.grn} s={28} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: C.tx }}>Candidate profile created</div>
              <div style={{ fontSize: 8.5, color: C.tx3, marginTop: 1 }}>Rahul Sharma · Added to ranking pool</div>
            </div>
            <Tag col={C.grn} bg={C.gnBg}>92% match</Tag>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   PANEL 3 — CANDIDATE RANKING
════════════════════════════════════ */
function PanelCandidates({ loaded, hovIdx, panelIdx, showAssess, candRefs, assessRef }) {
  const sel = panelIdx >= 0 ? POOL[panelIdx] : null;
  const BD = sel ? [
    { l: "Skills Match", p: sel.score, col: C.gold },
    { l: "Experience", p: sel.score === 94 ? 100 : 90, col: C.grn },
    { l: "Location Fit", p: sel.score === 94 ? 85 : 92, col: C.blu },
    { l: "Culture Fit", p: sel.score === 94 ? 90 : 88, col: C.pur },
  ] : [];

  return (
    <div style={{ display: "flex", gap: 11, height: "100%", overflow: "hidden" }}>
      {/* List */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, overflow: "hidden" }}>
        <Lbl>Ranked by JD Match · {POOL.length} candidates</Lbl>
        {POOL.map((c, i) => {
          const vCol = c.v === "Proceed" ? C.grn : c.v === "Maybe" ? C.gold : C.red;
          const vBg = c.v === "Proceed" ? C.gnBg : c.v === "Maybe" ? C.gBg : C.rBg;
          const isHov = hovIdx === i, isSel = panelIdx === i;
          return (
            <div key={i}
              ref={el => { if (candRefs) candRefs.current[i] = el; }}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "8px 11px",
                background: isSel ? "rgba(196,154,60,.07)" : isHov ? "rgba(255,255,255,.025)" : C.navy3,
                border: `1px solid ${isSel ? "rgba(196,154,60,.3)" : isHov ? C.b2 : C.b}`,
                borderRadius: 9, transition: "all .3s",
                opacity: loaded ? 1 : 0,
                animation: loaded ? `aidFadeUp .4s ${i * 80}ms ease both` : "none",
                boxShadow: isSel ? "0 2px 14px rgba(196,154,60,.09)" : "none",
              }}>
              <div style={{ fontSize: 8.5, fontWeight: 600, color: C.tx3, width: 17, flexShrink: 0 }}>#{i + 1}</div>
              <Av l={c.i} bg={c.col} s={26} />
              <div style={{ flex: "1 1 0", minWidth: 0, overflow: "hidden" }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: C.tx, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                <div style={{ fontSize: 8, color: C.tx3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 1 }}>{c.role}</div>
              </div>
              <div style={{ flexShrink: 0, width: 52 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, marginBottom: 2.5 }}>
                  <span style={{ color: C.tx3 }}>Match</span>
                  <span style={{ fontWeight: 700, color: c.score > 80 ? C.grn : c.score > 60 ? C.gold : C.red }}>{c.score}%</span>
                </div>
                <SBar pct={c.score} col={c.score > 80 ? C.grn : c.score > 60 ? C.gold : C.red} delay={i * 150 + 200} h={3} show={loaded} />
              </div>
              <div style={{ flexShrink: 0 }}><Tag col={vCol} bg={vBg}>{c.v}</Tag></div>
            </div>
          );
        })}
      </div>

      {/* Side panel */}
      <div style={{
        width: panelIdx >= 0 ? 190 : 0, flexShrink: 0, overflow: "hidden",
        transition: "width .5s cubic-bezier(.16,1,.3,1)",
      }}>
        {sel && (
          <div style={{ width: 190, display: "flex", flexDirection: "column", gap: 8, animation: "aidFadeUp .4s ease both" }}>
            <div style={{ background: C.navy3, border: `1px solid ${C.b2}`, borderRadius: 10, padding: "11px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Av l={sel.i} bg={sel.col} s={28} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.tx }}>{sel.name}</div>
                  <div style={{ fontSize: 8.5, color: C.tx3, marginTop: 1.5 }}>{sel.role}</div>
                </div>
              </div>
              {/* issue #12: confidence with "out of 100" */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 8.5, color: C.tx3, marginBottom: 3.5 }}>
                <span>Confidence</span>
                <span style={{ fontWeight: 700, color: C.gold }}>{sel.score}%<span style={{ fontSize: 7.5, color: C.tx3, fontWeight: 400, marginLeft: 2 }}>/ 100</span></span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: "rgba(255,255,255,.05)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 99,
                  background: `linear-gradient(90deg,${C.gold},${C.grn})`,
                  width: `${sel.score}%`, transition: "width 1.2s cubic-bezier(.16,1,.3,1)",
                }} />
              </div>
            </div>

            <div style={{ background: C.navy3, border: `1px solid ${C.b2}`, borderRadius: 10, padding: "11px 12px" }}>
              <Lbl>Match Breakdown</Lbl>
              {BD.map((b, i) => (
                <div key={i} style={{ marginBottom: 7 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, color: C.tx3, marginBottom: 3 }}>
                    <span>{b.l}</span>
                    <span style={{ fontWeight: 700, color: b.col }}>{b.p}%</span>
                  </div>
                  <SBar pct={b.p} col={b.col} delay={i * 100} h={3} show={!!sel} />
                </div>
              ))}
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.b}` }}>
                {["Strong SQL background", "Product experimentation"].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8.5, color: C.tx2, marginBottom: 4 }}>
                    <Pip col={C.grn} sz={4} /> {s}
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8.5, color: C.gold, marginTop: 2 }}>
                  <Pip col={C.gold} sz={4} /> ⚠ Missing B2B SaaS
                </div>
              </div>
            </div>

            <div ref={assessRef} style={{
              background: showAssess ? C.grn : C.gold,
              borderRadius: 9, padding: "11px 0", textAlign: "center",
              fontSize: 11, fontWeight: 700, color: "#080f1e", cursor: "pointer",
              boxShadow: `0 5px 22px rgba(${showAssess ? "23,179,120" : "196,154,60"},.42)`,
              transition: "all .35s", animation: "aidFadeUp .4s ease both", letterSpacing: .2,
            }}>
              {showAssess ? "✓ Opening Assessment" : "View Assessment →"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   PANEL 4 — ASSESSMENT & HIRE
════════════════════════════════════ */
function PanelAssessment({ decision, modelUpdated, approveRef }) {
  const c = POOL[0];
  return (
    <div style={{ display: "flex", gap: 11, height: "100%", position: "relative", overflow: "hidden" }}>
      {/* Left */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
        <div style={{ background: C.navy3, border: `1px solid ${C.b2}`, borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Av l={c.i} bg={c.col} s={32} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.tx, letterSpacing: -.3 }}>{c.name}</div>
              <div style={{ fontSize: 9, color: C.tx3, marginTop: 1.5 }}>{c.role} · Final Assessment</div>
            </div>
            <Tag col={C.grn} bg={C.gnBg}>Recommended</Tag>
          </div>
        </div>

        {/* Score grid — issue #11: proportionate emoji size */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
          {[
            { icon: "💻", label: "SQL Test", score: 86, col: C.blu },
            { icon: "📊", label: "Product Case", score: 91, col: C.gold },
            { icon: "🗣", label: "Communication", score: 88, col: C.grn },
            { icon: "🎯", label: "Strategy", score: 93, col: C.pur },
          ].map((item, i) => (
            <div key={i} style={{
              background: C.surf, borderRadius: 9, padding: "10px 12px",
              animation: `aidFadeUp .4s ${i * 80}ms ease both`, border: `1px solid ${C.b}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                {/* issue #11: 11px emoji, not 14px */}
                <span style={{ fontSize: 11 }}>{item.icon}</span>
                <span style={{ fontSize: 9, color: C.tx3 }}>{item.label}</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: item.col, lineHeight: 1 }}>
                {item.score}<span style={{ fontSize: 9, color: C.tx3, fontWeight: 400 }}>/100</span>
              </div>
              <div style={{ marginTop: 5 }}>
                <SBar pct={item.score} col={item.col} delay={i * 120 + 200} h={3} show={true} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: C.navy3, border: `1px solid ${C.b2}`, borderRadius: 10, padding: "10px 12px", flex: 1 }}>
          <Lbl>Interview Panel Notes</Lbl>
          {[
            { who: "Panel 1", note: "Exceptional product instincts. Clear fintech expertise. Strong hire." },
            { who: "Panel 2", note: "Excellent stakeholder communication. Data-driven decisions throughout." },
          ].map((n, i) => (
            <div key={i} style={{
              background: C.surf, borderRadius: 7, padding: "8px 10px",
              fontSize: 9, color: C.tx2, lineHeight: 1.6, marginBottom: 6,
              animation: `aidFadeUp .4s ${i * 100}ms ease both`, border: `1px solid ${C.b}`,
            }}>
              <div style={{ fontWeight: 600, color: C.tx3, fontSize: 8, marginBottom: 2.5 }}>{n.who}</div>
              {n.note}
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div style={{ width: 152, flexShrink: 0, display: "flex", flexDirection: "column", gap: 9 }}>
        {/* issue #12: overall score with "out of 100" and arc visual */}
        <div style={{ background: C.navy3, border: `1px solid ${C.b2}`, borderRadius: 10, padding: "12px 13px", textAlign: "center" }}>
          <Lbl>Overall Score</Lbl>
          {/* Mini arc using CSS */}
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 72, height: 44, marginBottom: 4 }}>
            <svg width="72" height="44" viewBox="0 0 72 44" fill="none">
              <path d="M6 42 A 30 30 0 0 1 66 42" stroke="rgba(255,255,255,.07)" strokeWidth="5" strokeLinecap="round" />
              <path d="M6 42 A 30 30 0 0 1 66 42" stroke={C.gold} strokeWidth="5" strokeLinecap="round"
                strokeDasharray="94.2" strokeDashoffset="9.4"
                style={{ filter: `drop-shadow(0 0 4px ${C.gold}88)` }} />
            </svg>
            <div style={{ position: "absolute", bottom: 0, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.gold, lineHeight: 1 }}>90</div>
            </div>
          </div>
          <div style={{ fontSize: 8.5, color: C.tx3 }}>out of 100 · Top 5%</div>
        </div>

        <div style={{ background: "rgba(23,179,120,.07)", border: "1px solid rgba(23,179,120,.22)", borderRadius: 10, padding: "11px 12px" }}>
          <Lbl>AI Recommendation</Lbl>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.grn, marginBottom: 2 }}>Strong Hire</div>
          <div style={{ fontSize: 8.5, color: C.tx3, marginBottom: 8 }}>
            Confidence: <span style={{ fontWeight: 700, color: C.gold }}>93%</span>
          </div>
          <div style={{ height: 1, background: C.b, marginBottom: 8 }} />
          {["Exact JD fit", "Fintech veteran", "Top applicant"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8.5, color: C.tx2, marginBottom: 4.5 }}>
              <Pip col={C.grn} sz={4} /> {s}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8.5, color: C.gold, marginTop: 2.5 }}>
            <Pip col={C.gold} sz={4} /> Verify B2B SaaS
          </div>
        </div>

        {/* Approve */}
        <div ref={approveRef} style={{
          background: decision === "hire" ? C.grn : C.gold,
          borderRadius: 9, padding: "13px 0", textAlign: "center",
          fontSize: 11, fontWeight: 700, color: "#080f1e", cursor: "pointer",
          boxShadow: `0 6px 28px rgba(${decision === "hire" ? "23,179,120" : "196,154,60"},.45)`,
          transition: "all .35s", letterSpacing: .2,
        }}>
          {decision === "hire" ? "✓ Candidate Selected!" : "Approve Candidate"}
        </div>

        {/* issue #8: Reject removed — was broken/ghost, not part of demo flow */}
      </div>

      {/* Toast */}
      {modelUpdated && (
        <div style={{
          position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
          background: `linear-gradient(135deg,${C.navy3},${C.surf})`,
          border: "1px solid rgba(23,179,120,.5)", borderRadius: 12, padding: "11px 22px",
          display: "flex", alignItems: "center", gap: 11,
          boxShadow: "0 10px 40px rgba(0,0,0,.55), 0 0 32px rgba(23,179,120,.2)",
          animation: "aidToastUp .5s cubic-bezier(.16,1,.3,1) both",
          whiteSpace: "nowrap", zIndex: 50,
        }}>
          <Pip col={C.grn} sz={7} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.grn }}>Model Updated</div>
            <div style={{ fontSize: 8.5, color: C.tx3, marginTop: 2 }}>Hiring signal trained · Accuracy +0.4%</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════
   RIGHT — AI INSIGHTS RAIL
   issue #11: colored dot glyphs instead of 14px emoji
════════════════════════════════════ */
const INSIGHTS = [
  [
    { dot: C.gold, title: "AI Tip", body: "Adding B2B SaaS filter improves funnel quality" },
    { dot: C.blu, title: "5 Requirements", body: "Auto-extracted from role description" },
    { dot: C.pur, title: "Avg Hire Time", body: "PM roles filled in ~12 days with AI" },
  ],
  [
    { dot: C.gold, title: "Scan Complete", body: "17 data points extracted in 1.2 seconds" },
    { dot: C.grn, title: "92% Match", body: "Strong fit across all JD requirements" },
    { dot: C.blu, title: "Pool Update", body: "Candidate ranked #1 in active pool" },
  ],
  [
    { dot: C.gold, title: "#1 Ranked", body: "Rahul Sharma leads with 94% match score" },
    { dot: C.grn, title: "AI Insight", body: "Top 3 candidates all have fintech exp" },
    { dot: C.gold, title: "Gap Found", body: "Missing B2B SaaS in top candidate" },
  ],
  [
    { dot: C.grn, title: "Strong Hire", body: "93% AI confidence — ready for offer" },
    { dot: C.gold, title: "Top 5%", body: "Outscores 95% of assessed PM candidates" },
    { dot: C.pur, title: "Learning", body: "Decision will retrain company AI model" },
  ],
];
const AI_LABELS = ["Analyzing requirements…", "Scanning resume…", "Ranking candidates…", "Generating recommendation…"];

function InsightPanel({ step }) {
  return (
    <div style={{
      width: 142, flexShrink: 0,
      borderLeft: `1px solid ${C.b}`, background: C.navy2,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ padding: "10px 11px 8px", borderBottom: `1px solid ${C.b}` }}>
        <Lbl mb={0}>AI Insights</Lbl>
      </div>
      <div style={{ padding: "9px", display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
        {(INSIGHTS[step] || []).map((it, i) => (
          <div key={`${step}-${i}`} style={{
            background: C.navy3, border: `1px solid ${C.b}`,
            borderRadius: 8, padding: "8px 9px",
            animation: `aidFadeUp .4s ${i * 100}ms ease both`,
          }}>
            {/* issue #11: dot glyph instead of 14px emoji */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3.5 }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", background: it.dot, flexShrink: 0,
                boxShadow: `0 0 5px ${it.dot}88`,
              }} />
              <span style={{ fontSize: 9.5, fontWeight: 700, color: it.dot }}>{it.title}</span>
            </div>
            {/* issue #11: body text 9.5px for better proportion */}
            <div style={{ fontSize: 9, color: C.tx3, lineHeight: 1.55 }}>{it.body}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 11px", borderTop: `1px solid ${C.b}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ display: "flex", gap: 3 }}>
            {[0, 1, 2].map(j => (
              <div key={j} style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: C.gold, animation: `aidDot 1.4s ${j * .2}s infinite` }} />
            ))}
          </div>
          <span style={{ fontSize: 8.5, color: C.tx3, animation: "aidFadeInOut 3s infinite" }}>
            {AI_LABELS[step]}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── issue #7: Caption bar — more legible, visually separated ── */
function CaptionBar({ text }) {
  return (
    <div style={{
      minHeight: 36, display: "flex", alignItems: "center",
      gap: 9, borderTop: `1px solid ${C.b2}`,
      background: "rgba(8,15,28,.96)",
      backdropFilter: "blur(8px)",
      flexShrink: 0, padding: "0 16px",
    }}>
      {text && (
        <>
          <Pip col={C.gold} sz={5} />
          {/* issue #7: 12px, brighter tx2, distinct from chrome */}
          <span style={{ fontSize: 12, color: C.tx2, fontWeight: 500, letterSpacing: .1, lineHeight: 1.4 }}>{text}</span>
        </>
      )}
    </div>
  );
}

/* ════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════ */
export default function AIHiringDashboard() {
  const [step, setStep] = useState(0);
  const [caption, setCaption] = useState("");
  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);
  const [curVis, setCurVis] = useState(false);
  const [curRing, setCurRing] = useState(false);
  const [typed, setTyped] = useState("");
  const [fieldsN, setFieldsN] = useState(0);
  const [reqsN, setReqsN] = useState(0);
  const [showApprove, setShowApprove] = useState(false);
  const [jdApproved, setJdApproved] = useState(false);
  const [rPhase, setRPhase] = useState(0);
  const [scanY, setScanY] = useState(0);
  const [scanOn, setScanOn] = useState(false);
  const [highlights, setHighlights] = useState([]);
  const [extractN, setExtractN] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  const [showPool, setShowPool] = useState(false);
  const [cLoaded, setCLoaded] = useState(false);
  const [hovIdx, setHovIdx] = useState(-1);
  const [panelIdx, setPanelIdx] = useState(-1);
  const [showAssess, setShowAssess] = useState(false);
  const [decision, setDecision] = useState("");
  const [modelUpd, setModelUpd] = useState(false);


  const contentRef = useRef(null);
  const jdApproveRef = useRef(null);
  const candRefs = useRef([]);
  const assessBtnRef = useRef(null);
  const approveBtnRef = useRef(null);
  const running = useRef(false);

  const getPos = useCallback((elRef) => {
    if (!elRef?.current || !contentRef?.current) return null;
    const ctr = contentRef.current.getBoundingClientRect();
    const el = elRef.current.getBoundingClientRect();
    return { x: el.left - ctr.left + el.width / 2, y: el.top - ctr.top + el.height / 2 };
  }, []);

  const getRowPos = useCallback((idx) => {
    const el = candRefs.current[idx];
    if (!el || !contentRef?.current) return null;
    const ctr = contentRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { x: r.left - ctr.left + r.width * 0.38, y: r.top - ctr.top + r.height / 2 };
  }, []);

  const move = useCallback((x, y, ms = 520) =>
    new Promise(r => { setCx(x); setCy(y); setTimeout(r, ms); }), []);

  const moveToEl = useCallback(async (elRef, ms = 520, offX = 0, offY = 0) => {
    const pos = getPos(elRef);
    if (!pos) return { x: 200, y: 200 };
    await move(pos.x + offX, pos.y + offY, ms);
    return { x: pos.x + offX, y: pos.y + offY };
  }, [getPos, move]);

  const moveToRow = useCallback(async (idx, ms = 480) => {
    const pos = getRowPos(idx);
    if (!pos) return;
    await move(pos.x, pos.y, ms);
  }, [getRowPos, move]);

  const fireClick = useCallback(async () => {
    setCurRing(true); await wait(160); setCurRing(false); await wait(280);
  }, []);

  const clickEl = useCallback(async (elRef, ms = 420, offX = 0, offY = 0) => {
    await moveToEl(elRef, ms, offX, offY); await fireClick();
  }, [moveToEl, fireClick]);

  const typeWord = useCallback(async (full) => {
    for (let i = 1; i <= full.length; i++) {
      setTyped(full.slice(0, i));
      await wait(50 + Math.random() * 38);
    }
  }, []);

  const reset = useCallback(() => {
    setStep(0); setCaption(""); setCurVis(false); setCurRing(false);
    setTyped(""); setFieldsN(0); setReqsN(0); setShowApprove(false); setJdApproved(false);
    setRPhase(0); setScanY(0); setScanOn(false); setHighlights([]); setExtractN(0); setMatchScore(0); setShowPool(false);
    setCLoaded(false); setHovIdx(-1); setPanelIdx(-1); setShowAssess(false);
    setDecision(""); setModelUpd(false);
  }, []);

  const run = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    reset();
    await wait(700);

    /* ── STEP 0: Create JD ── */
    setStep(0); setCurVis(true);
    setCaption("Step 1 — Describe the role you want to hire");
    await move(120, 56, 900);
    await move(200, 52, 600);
    await fireClick();
    setCaption("Typing role description…");
    await typeWord("Hire Senior Product Manager");
    await wait(350);

    setCaption("AI generating job description…");
    await move(240, 160, 700);
    await wait(400);
    for (let f = 1; f <= 6; f++) { setFieldsN(f); await wait(170); }
    await wait(200);

    setCaption("Extracting requirements…");
    for (let r = 1; r <= 5; r++) { setReqsN(r); await wait(210); }
    await wait(400);

    setShowApprove(true);
    setCaption("Approving the generated job description…");
    await wait(400);
    await clickEl(jdApproveRef, 950);
    setJdApproved(true);
    setCaption("✓ JD Approved & Published · AI scanning candidate pool…");
    await wait(2400);

    /* ── STEP 1: Resume Intake ── */
    setStep(1); setRPhase(0);
    setCaption("Step 2 — Resume received from candidate pool");
    await move(100, 180, 900);
    await wait(400);

    setCaption("Dragging resume into the system…");
    await move(108, 55, 700);
    await wait(180);
    await move(108, 195, 680);
    await fireClick();
    setRPhase(1);
    await wait(600);

    setCaption("AI laser scanning resume — extracting data…");
    setScanOn(true);
    for (let y = 18; y <= 310; y += 5) { setScanY(y); await wait(18); }
    setScanOn(false);
    setRPhase(2);

    setHighlights([
      { label: "Rahul Sharma", col: "grn" },
      { label: "6 yrs exp", col: "gold" },
      { label: "SQL · Analytics", col: "grn" },
      { label: "Razorpay", col: "gold" },
    ]);
    setCaption("Key data highlighted — extracting fields…");
    await wait(500);

    for (let e = 1; e <= 5; e++) { setExtractN(e); await wait(220); }
    await wait(300);

    setCaption("Computing JD match score…");
    await move(310, 240, 700);
    await wait(300);
    setMatchScore(92);
    await wait(800);
    setCaption("✓ Match Score: 92% · Candidate profile created & added to pool");
    await wait(1900);

    setCaption("Viewing full candidate pool — all screened profiles…");
    setShowPool(true);
    await wait(2000);

    /* ── STEP 2: Rank Candidates ── */
    setStep(2); setCLoaded(false); setHovIdx(-1); setPanelIdx(-1); setShowAssess(false);
    setCaption("Step 3 — Candidates ranked by JD match score");
    await move(100, 200, 900);
    await wait(400);
    setCLoaded(true);
    await wait(1400);

    setCaption("Reviewing ranked candidates…");
    for (let i = 0; i < 5; i++) {
      const pos = getRowPos(i);
      if (pos) { setCx(pos.x); setCy(pos.y); }
      setHovIdx(i);
      await wait(480);
    }

    setCaption("Clicking top candidate — expanding JD match breakdown…");
    await moveToRow(0, 500);
    await fireClick();
    setPanelIdx(0); setHovIdx(0);
    await wait(1900);

    setCaption("Checking second ranked candidate…");
    await moveToRow(1, 580);
    await fireClick();
    setHovIdx(1); setPanelIdx(1);
    await wait(1300);

    await moveToRow(0, 520);
    await fireClick();
    setPanelIdx(0); setHovIdx(0);
    await wait(800);

    setCaption("Clicking View Assessment for top candidate…");
    await wait(350);
    await clickEl(assessBtnRef, 820);
    setShowAssess(true);
    setCaption("✓ Opening assessment report…");
    await wait(1200);

    /* ── STEP 3: Assess & Hire ── */
    setStep(3); setDecision(""); setModelUpd(false);
    setCaption("Step 4 — Reviewing full assessment report");
    await move(150, 200, 900);
    await wait(1600);

    setCaption("Reviewing test scores and interview notes…");
    await move(200, 240, 650);
    await move(200, 280, 500);
    await wait(700);

    setCaption("AI recommends Strong Hire — 93% confidence");
    await move(400, 220, 800);
    await wait(700);

    setCaption("Approving candidate…");
    await wait(250);
    await clickEl(approveBtnRef, 720);
    setDecision("hire");
    setCaption("✓ Rahul Sharma — Selected! Offer letter being drafted…");
    await wait(1000);

    setModelUpd(true);
    setCaption("🧠 Hiring decision trained into AI model · Accuracy improved");
    await wait(3500);

    setCurVis(false);
    setCaption("✓ Complete — JD → Resume Scan → Rank → Assess → Hired!");
    await wait(2800);

    running.current = false;
    setTimeout(() => run(), 1400);
  }, [reset, move, moveToEl, moveToRow, fireClick, clickEl, typeWord, getRowPos]);



  useEffect(() => {
    const t = setTimeout(() => run(), 600);
    return () => { clearTimeout(t); running.current = false; };
  }, [run]);

  return (
    <div id="aid" style={{ fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif", color: C.tx }}>
      <style>{`
        #aid * { box-sizing:border-box }
        #aid ::-webkit-scrollbar { display:none }
        @keyframes aidFadeUp    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes aidBlink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes aidPulse     { 0%,100%{opacity:1} 50%{opacity:.5} }
        @keyframes aidDot       { 0%,80%,100%{transform:scale(.55);opacity:.35} 40%{transform:scale(1);opacity:1} }
        @keyframes aidRipple    { from{opacity:.9;transform:scale(.4)} to{opacity:0;transform:scale(2.5)} }
        @keyframes aidToastUp   { from{opacity:0;transform:translateX(-50%) translateY(18px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        @keyframes aidFadeInOut { 0%,100%{opacity:.35} 50%{opacity:1} }
        @media(max-width:680px) { #aid .aid-sb, #aid .aid-ins { display:none !important } }
        @media(max-width:500px) { #aid .aid-h { height:320px !important } }
      `}</style>

      {/* Shell — no marginTop; parent section controls layout (#1/#2 fixed by removing auto-margin) */}
      <div style={{
        background: C.navy,
        border: `1px solid ${C.b2}`,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 48px 120px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04), inset 0 1px 0 rgba(255,255,255,.06)",
        position: "relative",
      }}>
        {/* Browser bar — issue #10: dots 12px, gap 8px */}
        <div style={{
          height: 40, background: C.navy2, borderBottom: `1px solid ${C.b}`,
          display: "flex", alignItems: "center", padding: "0 16px", gap: 11, flexShrink: 0,
        }}>
          <div style={{ display: "flex", gap: 8 }}>
            {["#FF5F57", "#FFBD2E", "#28C840"].map((col, i) => (
              <span key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: col, display: "block" }} />
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <div style={{
              background: C.surf, border: `1px solid ${C.b2}`, borderRadius: 7,
              padding: "3px 16px", fontSize: 9.5, color: C.tx3,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <Pip col={C.grn} sz={5} /> hrops.in/ai-intelligence
            </div>
          </div>
          <div style={{ fontSize: 9, color: C.tx3 }}>HR Ops Platform</div>
        </div>

        {/* App */}
        <div className="aid-h" style={{ display: "flex", height: 468 }}>
          <div className="aid-sb">
            <Sidebar active={step} />
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
            <StepBar active={step} />
            <div
              ref={contentRef}
              style={{ flex: 1, padding: "clamp(9px,1.2vw,14px)", position: "relative", overflow: "hidden" }}
            >
              <Cursor x={cx} y={cy} vis={curVis} ring={curRing} />

              {step === 0 && (
                <PanelJD
                  typed={typed} fieldsN={fieldsN} reqsN={reqsN}
                  showApprove={showApprove} approved={jdApproved}
                  approveRef={jdApproveRef}
                />
              )}
              {step === 1 && (
                <PanelResume
                  subPhase={rPhase} scanY={scanY} scanOn={scanOn}
                  highlights={highlights} extractN={extractN}
                  matchScore={matchScore} showPool={showPool}
                />
              )}
              {step === 2 && (
                <PanelCandidates
                  loaded={cLoaded} hovIdx={hovIdx}
                  panelIdx={panelIdx} showAssess={showAssess}
                  candRefs={candRefs} assessRef={assessBtnRef}
                />
              )}
              {step === 3 && (
                <PanelAssessment
                  decision={decision} modelUpdated={modelUpd}
                  approveRef={approveBtnRef}
                />
              )}
            </div>
          </div>

          <div className="aid-ins">
            <InsightPanel step={step} />
          </div>
        </div>

        {/* issue #7: improved caption bar */}
        <CaptionBar text={caption} />


      </div>
    </div>
  );
}
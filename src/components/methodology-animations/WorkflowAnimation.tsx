"use client";
import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, Clock, User, Plus, ChevronDown, AlertCircle, Grid3x3, Mail, Tag, GitBranch } from 'lucide-react';
import { cn } from "@/lib/utils";

const APPROVERS = [
  { id: "A1", name: "Priya M.", role: "Manager", color: "#3666ff", initials: "PM" },
  { id: "A2", name: "Rajan K.", role: "Finance", color: "#3666ff", initials: "RK" },
  { id: "A3", name: "Sara L.",  role: "CFO",     color: "#3666ff", initials: "SL" },
];

const CONDITIONS = [
  { label: "Amount > ₹50K", color: "#3666ff", bg: "rgba(54,102,255,0.1)" },
  { label: "Vendor: New",   color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
  { label: "Tag: Capex",    color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
];

const NOTIFICATIONS = [
  { icon: "mail",  text: "PO-4812 approved by Priya M.",   time: "just now",  color: "#00b884" },
  { icon: "alert", text: "RFQ-2291 needs Finance review",   time: "2 min ago", color: "#3666ff" },
  { icon: "check", text: "Audit log exported successfully", time: "5 min ago", color: "#3666ff" },
];

function Avatar({ initials, color, size = 28 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, color: "white",
      display: "grid", placeItems: "center",
      fontSize: size * 0.36, fontWeight: 700,
      flexShrink: 0, boxShadow: `0 0 0 2px white`,
    }}>{initials}</div>
  );
}

function NodeConnector({ active, color = "#3666ff" }: { active: boolean; color?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: 22, position: "relative" }}>
      <div style={{
        width: 2, flex: 1,
        background: active
          ? `linear-gradient(180deg, ${color} 0%, ${color}88 100%)`
          : "rgba(15,23,42,0.1)",
        transition: "background 0.6s ease",
        borderRadius: 99,
      }}/>
      {active && (
        <div style={{
          position: "absolute", bottom: 0,
          width: 6, height: 6, borderRadius: "50%",
          background: color,
          boxShadow: `0 0 8px ${color}`,
          animation: "pulseDot 1.4s ease-in-out infinite",
        }}/>
      )}
    </div>
  );
}

interface WFNodeProps {
  label: string;
  sub?: string;
  icon: React.ReactNode;
  color?: string;
  bg?: string;
  active: boolean;
  done: boolean;
  delay?: number;
  visible?: boolean;
  pulse?: boolean;
}

function WFNode({ label, sub, icon, color, bg, active, done, delay = 0, visible = true, pulse = false }: WFNodeProps) {
  const blue = "#3666ff";
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
      transition: `all 0.5s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      background: done
        ? "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
        : active
          ? "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
          : "white",
      border: `1px solid ${done ? "rgba(0,184,132,0.35)" : active ? `rgba(54,102,255,0.4)` : "rgba(15,23,42,0.08)"}`,
      borderRadius: 10,
      padding: "7px 9px",
      display: "flex", alignItems: "center", gap: 8,
      boxShadow: active || done
        ? `0 8px 24px -8px ${done ? "rgba(0,184,132,0.25)" : "rgba(54,102,255,0.25)"}`
        : "0 2px 8px -4px rgba(15,23,42,0.1)",
      flexShrink: 0,
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: 6, flexShrink: 0,
        background: done ? "rgba(0,184,132,0.12)" : bg || "rgba(54,102,255,0.1)",
        color: done ? "#00b884" : color || blue,
        display: "grid", placeItems: "center",
      }}>
        {done ? <CheckCircle2 className="w-3 h-3" /> : icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: done ? "#15803d" : "#0b1322", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</div>
        {sub && <div style={{ fontSize: 8.5, color: "#94a3b8", marginTop: 1 }}>{sub}</div>}
      </div>
      {pulse && active && (
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3666ff", boxShadow: "0 0 0 3px rgba(54,102,255,0.2)", animation: "pulseDot 1.4s ease-in-out infinite" }}/>
      )}
      {done && (
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00b884" }}/>
      )}
    </div>
  );
}

function CondBadge({ label, color, bg, visible, delay = 0 }: { label: string; color: string; bg: string; visible: boolean; delay?: number }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 999,
      background: bg, border: `1px solid ${color}44`,
      fontSize: 10, fontWeight: 700, color,
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.8)",
      transition: `all 0.4s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
    }}>
      <Tag className="w-2.5 h-2.5" /> {label}
    </div>
  );
}

function ApproverStep({ approver, status, delay = 0, visible = true }: { approver: typeof APPROVERS[0]; status: string; delay?: number; visible?: boolean }) {
  const isApproved = status === "approved";
  const isActive = status === "active";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "6px 10px",
      background: isApproved
        ? "linear-gradient(135deg, #f0fdf4 0%, #e8fef3 100%)"
        : isActive
          ? "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)"
          : "white",
      border: `1px solid ${isApproved ? "rgba(0,184,132,0.3)" : isActive ? "rgba(54,102,255,0.35)" : "rgba(15,23,42,0.07)"}`,
      borderRadius: 8,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-10px)",
      transition: `all 0.5s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      boxShadow: isActive ? "0 6px 16px -6px rgba(54,102,255,0.2)" : isApproved ? "0 6px 16px -6px rgba(0,184,132,0.2)" : "none",
    }}>
      <Avatar initials={approver.initials} color={isApproved ? "#00b884" : approver.color} size={24}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#0b1322" }}>{approver.name}</div>
        <div style={{ fontSize: 8.5, color: "#94a3b8" }}>{approver.role}</div>
      </div>
      <div style={{
        fontSize: 8.5, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
        background: isApproved ? "rgba(0,184,132,0.1)" : isActive ? "rgba(54,102,255,0.1)" : "#f1f5f9",
        color: isApproved ? "#00b884" : isActive ? "#3666ff" : "#94a3b8",
        whiteSpace: "nowrap",
      }}>
        {isApproved ? "Approved" : isActive ? "Pending" : "Waiting"}
      </div>
    </div>
  );
}

function AuditRow({ text, time, color, visible, delay = 0 }: { text: string; time: string; color: string; visible: boolean; delay?: number }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "7px 10px",
      background: "white",
      border: "1px solid rgba(15,23,42,0.06)",
      borderRadius: 8,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(10px)",
      transition: `all 0.45s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 6px ${color}` }}/>
      <span style={{ flex: 1, fontSize: 10, fontWeight: 500, color: "#334155" }}>{text}</span>
      <span style={{ fontSize: 9, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>{time}</span>
    </div>
  );
}

export default function WorkflowAnimation() {
  const [phase, setPhase] = useState(1);
  const [nodesVisible, setNodesVisible] = useState([false, false, false, false]);
  const [condsVisible, setCondsVisible] = useState([false, false, false]);
  const [branchActive, setBranchActive] = useState(false);
  const [approverStatus, setApproverStatus] = useState(["waiting", "waiting", "waiting"]);
  const [auditVisible, setAuditVisible] = useState([false, false, false]);
  const [statsVisible, setStatsVisible] = useState(false);
  const [connectorActive, setConnectorActive] = useState([false, false, false]);

  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    async function loop() {
      while (!cancelRef.current) {
        // PHASE 1 — Nodes drop in one by one
        setPhase(1);
        setNodesVisible([false, false, false, false]);
        setCondsVisible([false, false, false]);
        setBranchActive(false);
        setApproverStatus(["waiting", "waiting", "waiting"]);
        setAuditVisible([false, false, false]);
        setStatsVisible(false);
        setConnectorActive([false, false, false]);
        await sleep(300);

        for (let i = 0; i < 4; i++) {
          if (cancelRef.current) return;
          setNodesVisible(prev => { const n = [...prev]; n[i] = true; return n; });
          await sleep(380);
        }
        await sleep(600);

        // PHASE 2 — Conditions appear
        setPhase(2);
        for (let i = 0; i < 3; i++) {
          if (cancelRef.current) return;
          setCondsVisible(prev => { const n = [...prev]; n[i] = true; return n; });
          await sleep(280);
        }
        await sleep(700);

        // PHASE 3 — Branch activates
        setPhase(3);
        setBranchActive(true);
        await sleep(1000);

        // PHASE 4 — Approver chain lights up
        setPhase(4);
        setConnectorActive([true, false, false]);
        setApproverStatus(["active", "waiting", "waiting"]);
        await sleep(1400);
        setConnectorActive([true, true, false]);
        setApproverStatus(["approved", "active", "waiting"]);
        await sleep(1400);
        setConnectorActive([true, true, true]);
        setApproverStatus(["approved", "approved", "active"]);
        await sleep(1400);
        setApproverStatus(["approved", "approved", "approved"]);
        await sleep(800);

        // PHASE 5 — Audit trail
        setPhase(5);
        for (let i = 0; i < 3; i++) {
          if (cancelRef.current) return;
          setAuditVisible(prev => { const n = [...prev]; n[i] = true; return n; });
          await sleep(350);
        }
        await sleep(1200);

        // PHASE 6 — Stats
        setPhase(6);
        setStatsVisible(true);
        await sleep(4000);
      }
    }
    loop();
    return () => { cancelRef.current = true; };
  }, []);

  const blue = "#3666ff";
  const blueDark = "#1e40af";

  return (
    <>
      <style>{`
        @keyframes pulseDot { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.7; } }
        @keyframes livepulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }
      `}</style>

      <div style={{
        width: "100%", height: "100%",
        fontFamily: "'Inter', system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "12px",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      }}>
        <div style={{
          width: "100%", maxWidth: 720, height: 481,
          background: "white",
          borderRadius: 18,
          boxShadow: "0 30px 80px -30px rgba(15,23,42,0.25), 0 8px 24px -8px rgba(15,23,42,0.08)",
          border: "1px solid rgba(15,23,42,0.06)",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}>
          {/* Browser bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 12px", background: "#f7faf9", borderBottom: "1px solid rgba(15,23,42,0.05)" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["#ff5f56","#ffbd2e","#27c93f"].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>
              ))}
            </div>
            <div style={{
              flex: 1, maxWidth: 300, margin: "0 auto",
              background: "white", border: "1px solid rgba(15,23,42,0.08)",
              borderRadius: 6, padding: "4px 10px",
              fontSize: 11, color: "#64748b",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: blue, boxShadow: `0 0 8px ${blue}` }}/>
              factwise.io/approvals/configure
            </div>
            <div style={{ width: 46 }}/>
          </div>

          {/* Dashboard body */}
          <div style={{ display: "flex", minHeight: 0 }}>

            {/* Sidebar */}
            <div style={{
              width: 48, padding: "14px 0", background: "#fbfdfc",
              borderRight: "1px solid rgba(15,23,42,0.05)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
            }}>
              {[
                { icon: <GitBranch className="w-4 h-4" />, active: true },
                { icon: <Grid3x3 className="w-4 h-4" />,    active: false },
                { icon: <User className="w-4 h-4" />,    active: false },
                { icon: <Plus className="w-4 h-4" />,    accent: true },
              ].map((r, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: 8,
                  display: "grid", placeItems: "center",
                  color: r.active ? "white" : r.accent ? blueDark : "#64748b",
                  background: r.active
                    ? `linear-gradient(135deg, ${blueDark} 0%, ${blue} 100%)`
                    : r.accent ? "rgba(54,102,255,0.1)" : "transparent",
                  boxShadow: r.active ? `0 6px 14px rgba(54,102,255,0.35)` : "none",
                }}>{r.icon}</div>
              ))}
            </div>

            {/* Main content */}
            <div style={{ flex: 1, padding: "14px 16px 26px 16px", display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>

              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "-0.01em", color: "#0b1322" }}>Approval Workflows</div>
                  <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginTop: 2 }}>Configure · Audit · Control</div>
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "#f1f5f9", padding: "4px 9px", borderRadius: 999,
                  fontSize: 10, fontWeight: 600, color: "#475569",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: blue, boxShadow: `0 0 0 3px rgba(54,102,255,0.18)`, animation: "livepulse 1.6s ease-in-out infinite", display: "inline-block" }}/>
                  Live
                </div>
              </div>

              {/* 2-column layout */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1, minHeight: 0 }}>

                {/* LEFT: Workflow Builder */}
                <div style={{
                  background: "linear-gradient(180deg, #fbfdfc 0%, #f6faf8 100%)",
                  border: "1px solid rgba(15,23,42,0.06)",
                  borderRadius: 12, padding: 11,
                  display: "flex", flexDirection: "column", gap: 0,
                  overflow: "hidden",
                  minHeight: 0,
                  flex: 1,
                }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, flexShrink: 0 }}>
                    Workflow Builder
                  </div>
                  <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>

                  {/* START node */}
                  <WFNode
                    label="Start · RFQ Submitted"
                    sub="Trigger"
                    icon={<GitBranch className="w-3.5 h-3.5" />}
                    color={blue} bg="rgba(54,102,255,0.1)"
                    active={phase >= 1} done={phase >= 4}
                    visible={nodesVisible[0]}
                    delay={0}
                  />

                  {/* Conditions row */}
                  <div style={{ display: "flex", justifyContent: "center", padding: "4px 0 2px", flexShrink: 0 }}>
                    <NodeConnector active={phase >= 2} color={blue}/>
                  </div>

                  {/* Condition node */}
                  <div style={{
                    background: "white",
                    border: `1px dashed ${branchActive ? "rgba(54,102,255,0.5)" : "rgba(15,23,42,0.1)"}`,
                    borderRadius: 10, padding: "7px 9px",
                    opacity: nodesVisible[1] ? 1 : 0,
                    transform: nodesVisible[1] ? "translateY(0)" : "translateY(10px)",
                    transition: "all 0.5s cubic-bezier(.22,.61,.36,1) 380ms",
                    flexShrink: 0,
                  }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Conditions</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {CONDITIONS.map((c, i) => (
                        <CondBadge key={c.label} label={c.label} color={c.color} bg={c.bg} visible={condsVisible[i]} delay={i * 100}/>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", padding: "4px 0 2px", flexShrink: 0 }}>
                    <NodeConnector active={phase >= 3} color={blue}/>
                  </div>

                  {/* Approver chain node */}
                  <WFNode
                    label="Approval Chain"
                    sub="3 approvers · sequential"
                    icon={<User className="w-3.5 h-3.5" />}
                    color="#3666ff" bg="rgba(54,102,255,0.1)"
                    active={phase >= 3} done={phase >= 5}
                    visible={nodesVisible[2]}
                    pulse={true}
                    delay={760}
                  />

                  <div style={{ display: "flex", justifyContent: "center", padding: "4px 0 2px", flexShrink: 0 }}>
                    <NodeConnector active={phase >= 5} color="#00b884"/>
                  </div>

                  {/* Done node */}
                  <WFNode
                    label="Approved · Notify & Log"
                    sub="Audit trail created"
                    icon={<Mail className="w-3.5 h-3.5" />}
                    color="#00b884" bg="rgba(0,184,132,0.1)"
                    active={phase >= 5} done={phase >= 6}
                    visible={nodesVisible[3]}
                    delay={1140}
                  />
                  </div>
                </div>

                {/* RIGHT: Panel changes by phase */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>

                  {/* Approver chain */}
                  <div style={{
                    background: "white",
                    border: "1px solid rgba(15,23,42,0.07)",
                    borderRadius: 12, padding: 11,
                    flex: "none",
                  }}>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                      Approver Chain
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {APPROVERS.slice(0, 3).map((a, i) => (
                        <ApproverStep
                          key={a.id}
                          approver={a}
                          status={approverStatus[i]}
                          visible={nodesVisible[2]}
                          delay={i * 120}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Audit trail OR stats */}
                  <div style={{
                    background: "linear-gradient(180deg, #fbfdfc 0%, #f6faf8 100%)",
                    border: "1px solid rgba(15,23,42,0.06)",
                    borderRadius: 12, padding: 11,
                    flex: 1,
                    overflow: "hidden",
                    minHeight: 0,
                  }}>
                    {phase < 6 ? (
                      <>
                        <div style={{ fontSize: 9.5, fontWeight: 700, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                          Audit Trail
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 7, overflow: "auto", minHeight: 0 }}>
                          {NOTIFICATIONS.map((n, i) => (
                            <AuditRow
                              key={i}
                              text={n.text}
                              time={n.time}
                              color={n.color}
                              visible={auditVisible[i]}
                              delay={i * 100}
                            />
                          ))}
                          {!auditVisible[0] && (
                            <div style={{ color: "#cbd5e1", fontSize: 10, textAlign: "center", padding: "12px 0" }}>
                              Waiting for events…
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      /* Stats finale */
                      <div style={{
                        display: "flex", flexDirection: "column", gap: 10,
                        opacity: statsVisible ? 1 : 0,
                        transform: statsVisible ? "translateY(0)" : "translateY(8px)",
                        transition: "all 0.5s ease",
                      }}>
                        <div style={{ fontSize: 9.5, fontWeight: 700, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                          Impact
                        </div>
                        {[
                          { label: "Faster approvals", value: "3×", color: blue },
                          { label: "Setup time", value: "< 5 min", color: "#3666ff" },
                          { label: "Audit coverage", value: "100%", color: "#00b884" },
                        ].map(({ label, value, color }) => (
                          <div key={label} style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "6px 8px", background: "white",
                            border: "1px solid rgba(15,23,42,0.06)", borderRadius: 6,
                            fontSize: 9.5,
                          }}>
                            <span style={{ color: "#64748b", fontWeight: 500 }}>{label}</span>
                            <span style={{ fontWeight: 800, color }}>{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Caption bar */}
              <div style={{
                background: "rgba(11,19,34,0.85)",
                color: "white", backdropFilter: "blur(12px)",
                borderRadius: 8, padding: "7px 11px",
                fontSize: 10.5, fontWeight: 500, letterSpacing: "-0.005em",
                display: "flex", alignItems: "center", gap: 8,
                opacity: phase >= 1 ? 1 : 0,
                transform: phase >= 1 ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.4s ease",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: blue, boxShadow: `0 0 12px ${blue}`, flexShrink: 0 }}/>
                {phase === 1 && "Approval workflow nodes dropping in — no code required."}
                {phase === 2 && "Set branch conditions: by amount, vendor type, or item tag."}
                {phase === 3 && "Conditions activate — workflow branches automatically."}
                {phase === 4 && "Approval chain in motion — sequential or parallel."}
                {phase === 5 && "Approved. Full audit trail recorded automatically."}
                {phase === 6 && "3× faster approvals. 100% audit coverage. Zero IT tickets."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

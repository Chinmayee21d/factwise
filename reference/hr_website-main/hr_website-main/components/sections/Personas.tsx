"use client";

import { useEffect, useRef, useState } from "react";
import { APP_EMPLOYER_URL, APP_AGENCY_URL } from "@/lib/site-links";

interface TiltState {
  x: number;
  y: number;
  gx: number;
  gy: number;
}
const defaultTilt: TiltState = { x: 0, y: 0, gx: 50, gy: 50 };

const employerFeatures = [
  "AI screening — Proceed/Maybe/Decline with full briefing",
  "Visual pipeline builder — any topology, any entry point",
  "Panel variance flags — catch disagreements before they cost you",
  "NL analytics — ask your data in plain English",
];

const agencyFeatures = [
  "Private talent bench — your IP, never shared with clients",
  "7-signal ML matching across all clients simultaneously",
  "Commission auto-calculated — immutable first-submission timestamps",
  "White-label client portal + auto reporting",
];

function CheckIcon({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 8 8" width="9" height="9" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" stroke={stroke}>
      <polyline points="1.5,4 3,5.5 6.5,2" />
    </svg>
  );
}

export default function PersonaSection() {
  const employerRef = useRef<HTMLDivElement>(null);
  const agencyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [employerTilt, setEmployerTilt] = useState<TiltState>(defaultTilt);
  const [agencyTilt, setAgencyTilt] = useState<TiltState>(defaultTilt);
  const [employerHover, setEmployerHover] = useState(false);
  const [agencyHover, setAgencyHover] = useState(false);

  // Scroll-triggered visibility states
  const [headerVisible, setHeaderVisible] = useState(false);
  const [employerVisible, setEmployerVisible] = useState(false);
  const [agencyVisible, setAgencyVisible] = useState(false);
  const [featsVisible, setFeatsVisible] = useState(false);

  // IntersectionObserver for scroll-triggered entrance
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Staggered reveal sequence
          setTimeout(() => setHeaderVisible(true), 0);
          setTimeout(() => setEmployerVisible(true), 200);
          setTimeout(() => setAgencyVisible(true), 380);
          setTimeout(() => setFeatsVisible(true), 600);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent,
    ref: React.RefObject<HTMLDivElement>,
    setTilt: (t: TiltState) => void
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -6,   // tuned down from 18 → 6
      y: (x - 0.5) * 6,
      gx: x * 100,
      gy: y * 100,
    });
  };

  const resetTilt = (
    setTilt: (t: TiltState) => void,
    setHover: (v: boolean) => void
  ) => {
    setTilt(defaultTilt);
    setHover(false);
  };

  return (
    <section ref={sectionRef} className="persona-section section-light" id="personas">
      <div className="wrap">

        {/* Header */}
        <div
          className="ps-header section-title-center"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="eyebrow eyebrow-dark">
            <div className="ey-line" />
            Two distinct products
          </div>
          <h2 className="h2 h2-ink">
            Built for two kinds
            <br />
            <em>of hiring teams.</em>
          </h2>
          <p className="lead lead-ink">
            The homepage tells the shared story. The detail lives in the pages
            built specifically for you.
          </p>
        </div>

        {/* Cards */}
        <div className="ps-grid">

          {/* ── EMPLOYER ── */}
          <div
            ref={employerRef}
            className="ps-card ps-employer"
            style={{
              opacity: employerVisible ? 1 : 0,
              transform: employerHover
                ? `perspective(800px) rotateX(${employerTilt.x}deg) rotateY(${employerTilt.y}deg) translateZ(8px)`
                : employerVisible
                  ? "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
                  : "perspective(800px) translateY(32px)",
              transition: employerHover
                ? "box-shadow 0.35s ease, border-color 0.35s ease"
                : "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease",
              boxShadow: employerHover
                ? "0 40px 100px rgba(11,22,40,0.55), 0 0 0 1.5px rgba(52,112,240,0.6), 0 0 40px rgba(52,112,240,0.18)"
                : "0 24px 64px rgba(11,22,40,0.28), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
            onMouseMove={(e) => { handleMouseMove(e, employerRef, setEmployerTilt); setEmployerHover(true); }}
            onMouseLeave={() => resetTilt(setEmployerTilt, setEmployerHover)}
          >
            {/* Cursor spotlight */}
            <div
              className="ps-spotlight"
              style={{
                background: `radial-gradient(280px circle at ${employerTilt.gx}% ${employerTilt.gy}%, rgba(52,112,240,0.15), transparent 70%)`,
                opacity: employerHover ? 1 : 0,
              }}
            />

            {/* Ambient orb */}
            <div className="ps-orb ps-orb-employer" style={{ opacity: employerHover ? 1 : 0, transform: employerHover ? "scale(1.3)" : "scale(1)" }} />

            {/* Live badge */}
            <div
              className="ps-live-badge"
              style={{
                opacity: employerHover ? 1 : 0,
                transform: employerHover ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="ps-badge-dot" />
              Live AI
            </div>

            <div className="ps-card-inner">
              <div className="ps-tag ps-tag-blue">For Employers</div>
              <div
                className="ps-title ps-title-light"
                style={{ transform: employerHover ? "translateY(-3px)" : "none", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}
              >
                Stop screening
                <br />
                <em>resumes yourself.</em>
              </div>
              <p className="ps-desc ps-desc-light">
                AI screens every application before you arrive. Visual pipelines
                that match how you actually hire. Panel variance flags. Magic
                Link assessments. Everything automated.
              </p>
              <div className="ps-feats">
                {employerFeatures.map((text, i) => (
                  <div
                    key={i}
                    className="ps-feat ps-feat-light"
                    style={{
                      opacity: featsVisible ? 1 : 0,
                      transform: featsVisible ? "none" : "translateX(-14px)",
                      transition: `opacity 0.42s ease ${0.1 + i * 0.09}s, transform 0.42s ease ${0.1 + i * 0.09}s`,
                    }}
                  >
                    <div className="ps-check ps-check-blue">
                      <CheckIcon stroke="white" />
                    </div>
                    <span className="ps-feat-text ps-feat-text-light">{text}</span>
                  </div>
                ))}
              </div>
              <div className="ps-card-bottom">
                <a href={APP_EMPLOYER_URL} className="ps-demo-btn ps-demo-btn-blue" target="_blank" rel="noopener noreferrer">
                  View Employer Demo
                </a>
              </div>
            </div>
          </div>

          {/* ── AGENCY ── */}
          <div
            ref={agencyRef}
            className="ps-card ps-agency-new"
            style={{
              opacity: agencyVisible ? 1 : 0,
              transform: agencyHover
                ? `perspective(800px) rotateX(${agencyTilt.x}deg) rotateY(${agencyTilt.y}deg) translateZ(8px)`
                : agencyVisible
                  ? "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
                  : "perspective(800px) translateY(32px)",
              transition: agencyHover
                ? "box-shadow 0.35s ease, border-color 0.35s ease"
                : "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease",
              boxShadow: agencyHover
                ? "0 40px 100px rgba(11,22,40,0.55), 0 0 0 1.5px rgba(196,154,60,0.7), 0 0 40px rgba(196,154,60,0.2)"
                : "0 24px 64px rgba(11,22,40,0.28), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
            onMouseMove={(e) => { handleMouseMove(e, agencyRef, setAgencyTilt); setAgencyHover(true); }}
            onMouseLeave={() => resetTilt(setAgencyTilt, setAgencyHover)}
          >
            {/* Cursor spotlight */}
            <div
              className="ps-spotlight"
              style={{
                background: `radial-gradient(280px circle at ${agencyTilt.gx}% ${agencyTilt.gy}%, rgba(196,154,60,0.18), transparent 70%)`,
                opacity: agencyHover ? 1 : 0,
              }}
            />

            {/* Ambient orb */}
            <div className="ps-orb ps-orb-agency-new" style={{ opacity: agencyHover ? 1 : 0, transform: agencyHover ? "scale(1.3)" : "scale(1)" }} />

            <div className="ps-card-inner">
              <div className="ps-tag ps-tag-gold">For Agencies</div>
              <div
                className="ps-title ps-title-light"
                style={{ transform: agencyHover ? "translateY(-3px)" : "none", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}
              >
                Run your entire
                <br />
                <em>network intelligently.</em>
              </div>
              <p className="ps-desc ps-desc-light">
                Private talent bench. ML matching across every client. Commission
                auto-calculated. The last commission dispute you'll ever have.
              </p>
              <div className="ps-feats">
                {agencyFeatures.map((text, i) => (
                  <div
                    key={i}
                    className="ps-feat ps-feat-light"
                    style={{
                      opacity: featsVisible ? 1 : 0,
                      transform: featsVisible ? "none" : "translateX(-14px)",
                      transition: `opacity 0.42s ease ${0.18 + i * 0.09}s, transform 0.42s ease ${0.18 + i * 0.09}s`,
                    }}
                  >
                    <div className="ps-check ps-check-gold">
                      <CheckIcon stroke="white" />
                    </div>
                    <span className="ps-feat-text ps-feat-text-light">{text}</span>
                  </div>
                ))}
              </div>
              <div className="ps-card-bottom">
                <a href={APP_AGENCY_URL} className="ps-demo-btn ps-demo-btn-gold" target="_blank" rel="noopener noreferrer">
                  View Agency Demo
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scoped styles for new navy agency card + accent overrides */}
      <style>{`
        /* ── Agency card — now navy like employer ── */
        .ps-agency-new {
          background: #0e1d34;
          border-radius: 20px;
          padding: 28px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          min-height: 340px;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* ── Accent tags ── */
        .ps-tag-blue {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 14px;
          color: rgba(52, 112, 240, 0.75);
        }
        .ps-tag-gold {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 14px;
          color: rgba(196, 154, 60, 0.85);
        }

        /* ── Check circles ── */
        .ps-check-blue {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(52, 112, 240, 0.18);
          border: 1px solid rgba(52, 112, 240, 0.32);
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ps-check-gold {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink:0;
          background: rgba(196, 154, 60, 0.18);
          border: 1px solid rgba(196, 154, 60, 0.32);
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ps-agency-new:hover .ps-check-gold,
        .ps-employer:hover .ps-check-blue {
          transform: scale(1.18);
        }

        /* ── Agency orb ── */
        .ps-orb-agency-new {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(64px);
          transition: opacity 0.45s ease, transform 0.55s ease;
          z-index: 0;
          background: rgba(196, 154, 60, 0.18);
          bottom: -70px;
          left: -70px;
        }

        /* ── CTA buttons ── */
        .ps-demo-btn-blue {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.25s ease;
          background: transparent;
          color: rgba(52, 112, 240, 0.9);
          border: 1.5px solid rgba(52, 112, 240, 0.35);
        }
        .ps-demo-btn-blue:hover {
          background: rgba(52, 112, 240, 0.12);
          border-color: rgba(52, 112, 240, 0.7);
          color: #fff;
          transform: translateY(-1px);
        }
        .ps-demo-btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.25s ease;
          background: transparent;
          color: rgba(196, 154, 60, 0.9);
          border: 1.5px solid rgba(196, 154, 60, 0.35);
        }
        .ps-demo-btn-gold:hover {
          background: rgba(196, 154, 60, 0.12);
          border-color: rgba(196, 154, 60, 0.8);
          color: #fff;
          transform: translateY(-1px);
        }

        /* ── Employer orb uses blue accent ── */
        .ps-orb-employer {
          background: rgba(52, 112, 240, 0.2) !important;
        }

        /* ── Mobile: disable tilt, keep slide-up ── */
        @media (max-width: 700px) {
          .ps-agency-new {
            min-height: 0;
            padding: 24px 20px;
          }
        }
      `}</style>
    </section>
  );
}
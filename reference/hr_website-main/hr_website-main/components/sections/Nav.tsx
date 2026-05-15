'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

function Logo({ height = 30 }: { height?: number }) {
  const width = Math.round(height * (370 / 130))
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 370 130"
      aria-label="HR Ops"
      role="img"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <text y="105" x="8" fontSize="112"
        fontFamily="'Cormorant Garamond','Garamond','Georgia',serif"
        fontWeight="700" fontStyle="italic">
        <tspan fill="#C6A85E">HR</tspan>
        <tspan fill="#6B7A8D" fontWeight="300" dx="-6">OPS</tspan>
      </text>
    </svg>
  )
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/demo/employer', label: 'Employers' },
  { href: '/demo/agency', label: 'Agencies' },
  { href: '/#ai', label: 'AI Intelligence' },
  { href: '/#workflow', label: 'Workflow' },
  { href: '/#pricing', label: 'Pricing' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // ── Scroll: transparent → #112036 ──
    const nav = navRef.current
    const onScroll = () => {
      if (!nav) return
      if (window.scrollY > 10) {
        nav.classList.add('hn-scrolled')
      } else {
        nav.classList.remove('hn-scrolled')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // ── Drawer open/close ──
    const hamburger = hamburgerRef.current
    const drawer = drawerRef.current
    const overlay = overlayRef.current

    function open() {
      hamburger?.classList.add('hn-open')
      hamburger?.setAttribute('aria-expanded', 'true')
      drawer?.classList.add('hn-open')
      overlay?.classList.add('hn-open')
      document.body.style.overflow = 'hidden'
      drawer?.querySelectorAll<HTMLElement>('.hn-mlink').forEach((el, i) => {
        el.style.animationDelay = `${80 + i * 70}ms`
      })
    }

    function close() {
      hamburger?.classList.remove('hn-open')
      hamburger?.setAttribute('aria-expanded', 'false')
      drawer?.classList.remove('hn-open')
      overlay?.classList.remove('hn-open')
      document.body.style.overflow = ''
    }

    hamburger?.addEventListener('click', open)
    overlay?.addEventListener('click', close)
    document.getElementById('hn-close')?.addEventListener('click', close)
    drawer?.querySelectorAll('.hn-mlink').forEach(l => l.addEventListener('click', close))

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        #hn-nav, #hn-nav *, #hn-drawer, #hn-drawer * { box-sizing: border-box; }

        /* ══════════════════════════════════
           NAVBAR SHELL
        ══════════════════════════════════ */
        #hn-nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000; height: 64px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 0 48px;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background .45s ease, border-color .45s ease,
                      backdrop-filter .45s ease, -webkit-backdrop-filter .45s ease;
        }
        #hn-nav.hn-scrolled {
          background: rgba(17, 32, 54, 0.96);
          backdrop-filter: blur(24px) saturate(1.6);
          -webkit-backdrop-filter: blur(24px) saturate(1.6);
          border-bottom: 1px solid rgba(255,255,255,.07);
        }

        /* ── Logo ── */
        #hn-nav .hn-logo {
          grid-column: 1; justify-self: start;
          display: flex; align-items: center;
          text-decoration: none;
        }

        /* ══════════════════════════════════
           DESKTOP NAV LINKS
        ══════════════════════════════════ */
        #hn-nav .hn-links {
          grid-column: 2;
          display: flex; align-items: center; gap: 2px;
          list-style: none; margin: 0; padding: 0;
        }
        #hn-nav .hn-links li {
          list-style: none; margin: 0; padding: 0; position: relative;
        }
        #hn-nav .hn-links li a {
          display: block; position: relative;
          padding: 7px 18px;
          font-size: 13.5px; font-weight: 500;
          color: rgba(190,210,235,.72);
          text-decoration: none; white-space: nowrap;
          border-radius: 8px; overflow: hidden;
          transition: color .22s;
          font-family: 'Geist', sans-serif;
          letter-spacing: .01em;
          z-index: 0;
        }
        /* Warm pill fill */
        #hn-nav .hn-links li a::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(196,154,60,.07);
          border-radius: 8px;
          transform: scaleX(.55) scaleY(.6);
          opacity: 0;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1), opacity .22s;
        }
        /* Gold underline sweep */
        #hn-nav .hn-links li a::after {
          content: '';
          position: absolute;
          bottom: 5px; left: 18px; right: 18px;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #C49A3C 40%, transparent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform .32s cubic-bezier(.34,1.56,.64,1);
          border-radius: 2px;
        }
        #hn-nav .hn-links li a:hover { color: rgba(240,248,255,.98); }
        #hn-nav .hn-links li a:hover::before { transform: scaleX(1) scaleY(1); opacity: 1; }
        #hn-nav .hn-links li a:hover::after  { transform: scaleX(1); }

        /* ══════════════════════════════════
           DESKTOP CTAs
        ══════════════════════════════════ */
        #hn-nav .hn-ctas {
          grid-column: 3;
          display: flex; align-items: center;
          justify-content: flex-end; gap: 8px;
        }

        #hn-nav .hn-ghost {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center;
          padding: 7px 16px; font-size: 13px; font-weight: 500;
          color: rgba(200,215,235,.78);
          text-decoration: none; border-radius: 8px;
          border: 1px solid rgba(255,255,255,.12);
          background: transparent; white-space: nowrap; cursor: pointer;
          transition: color .25s, border-color .3s, background .25s, transform .2s;
          font-family: 'Geist', sans-serif;
        }
        #hn-nav .hn-ghost::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.07) 50%, transparent 80%);
          transform: translateX(-120%); transition: transform .5s ease;
        }
        #hn-nav .hn-ghost:hover {
          color: #fff; border-color: rgba(255,255,255,.28);
          background: rgba(255,255,255,.05); transform: translateY(-1px);
        }
        #hn-nav .hn-ghost:hover::before { transform: translateX(120%); }

        #hn-nav .hn-gold {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center;
          padding: 7px 18px; font-size: 13px; font-weight: 600;
          color: #0a101e; text-decoration: none; border-radius: 8px;
          background: #C49A3C; border: none;
          white-space: nowrap; cursor: pointer;
          transition: box-shadow .3s, transform .22s, background .2s;
          font-family: 'Geist', sans-serif;
          animation: hnGoldPulse 3.2s ease-in-out infinite;
        }
        #hn-nav .hn-gold::before {
          content: ''; position: absolute;
          top: 0; left: -80%; width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,.38), transparent);
          transform: skewX(-20deg); transition: left .55s ease;
        }
        #hn-nav .hn-gold:hover {
          background: #D4A84A;
          box-shadow: 0 0 0 1px rgba(196,154,60,.5), 0 0 26px rgba(196,154,60,.45), 0 4px 16px rgba(0,0,0,.3);
          transform: translateY(-2px); animation: none;
        }
        #hn-nav .hn-gold:hover::before { left: 135%; }
        #hn-nav .hn-gold:active { transform: translateY(0); }
        @keyframes hnGoldPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(196,154,60,.35); }
          50%      { box-shadow: 0 0 0 5px rgba(196,154,60,0); }
        }

        /* ══════════════════════════════════
           HAMBURGER
        ══════════════════════════════════ */
        #hn-nav .hn-ham {
          display: none;
          flex-direction: column; justify-content: center; align-items: center; gap: 5px;
          width: 40px; height: 40px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.1);
          cursor: pointer; border-radius: 8px;
          grid-column: 3; justify-self: end; padding: 0;
          transition: background .2s, border-color .2s;
        }
        #hn-nav .hn-ham:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.2); }
        .hn-bar {
          display: block; height: 1.5px;
          background: rgba(210,225,245,.9); border-radius: 2px;
          transform-origin: center;
          transition: transform .32s cubic-bezier(.16,1,.3,1), opacity .25s, width .25s;
        }
        .hn-bar-1 { width: 20px; }
        .hn-bar-2 { width: 13px; }
        .hn-bar-3 { width: 20px; }
        .hn-ham.hn-open .hn-bar-1 { transform: translateY(6.5px) rotate(45deg); }
        .hn-ham.hn-open .hn-bar-2 { opacity: 0; transform: scaleX(0); }
        .hn-ham.hn-open .hn-bar-3 { transform: translateY(-6.5px) rotate(-45deg); }

        /* ══════════════════════════════════
           OVERLAY
        ══════════════════════════════════ */
        .hn-overlay {
          display: none; position: fixed; inset: 0; z-index: 1098;
          background: rgba(4,8,18,.7);
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          opacity: 0; pointer-events: none; transition: opacity .3s;
        }
        .hn-overlay.hn-open { opacity: 1; pointer-events: auto; }

        /* ══════════════════════════════════
           MOBILE DRAWER
        ══════════════════════════════════ */
        #hn-drawer {
          display: none; position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(340px, 92vw); z-index: 1099;
          background: #0d1b31;
          border-left: 1px solid rgba(255,255,255,.07);
          box-shadow: -30px 0 90px rgba(0,0,0,.75);
          flex-direction: column; overflow: hidden;
          transform: translateX(105%); pointer-events: none;
          transition: transform .4s cubic-bezier(.16,1,.3,1);
        }
        #hn-drawer.hn-open { transform: translateX(0); pointer-events: auto; }

        /* Top gold glow */
        #hn-drawer::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 200px;
          background: radial-gradient(ellipse at 50% -10%, rgba(196,154,60,.1) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }

        /* ── Drawer header ── */
        .hn-dheader {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 22px 18px;
          border-bottom: 1px solid rgba(255,255,255,.06);
          flex-shrink: 0; position: relative; z-index: 1;
        }
        #hn-close {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 8px; color: rgba(200,215,235,.65);
          cursor: pointer;
          transition: background .2s, color .2s, border-color .2s, transform .2s;
          flex-shrink: 0;
        }
        #hn-close:hover {
          background: rgba(255,255,255,.1);
          border-color: rgba(255,255,255,.18);
          color: #fff; transform: rotate(90deg);
        }

        /* ── Nav links ── */
        .hn-mlinks {
          display: flex; flex-direction: column;
          padding: 28px 20px 16px;
          gap: 4px; flex-shrink: 0;
          position: relative; z-index: 1;
        }

        @keyframes hnLinkIn {
          from { opacity: 0; transform: translateY(12px) scale(.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .hn-mlink {
          display: flex; align-items: center; justify-content: center;
          padding: 15px 20px;
          font-size: 15.5px; font-weight: 500; letter-spacing: .01em;
          color: rgba(210,228,255,.68);
          text-decoration: none; border-radius: 11px;
          border: 1px solid transparent;
          opacity: 0; position: relative; overflow: hidden;
          transition: color .22s, border-color .25s, background .22s, transform .25s;
          font-family: 'Geist', sans-serif; text-align: center;
          cursor: pointer;
        }

        /* Shimmer sweep */
        .hn-mlink::before {
          content: '';
          position: absolute; top: 0; left: -80%; width: 50%; height: 100%;
          background: linear-gradient(110deg, transparent, rgba(196,154,60,.12), transparent);
          transform: skewX(-18deg);
          transition: left .5s ease;
          pointer-events: none;
        }

        /* Left gold indicator dot */
        .hn-mlink::after {
          content: '';
          position: absolute; left: 18px; top: 50%;
          transform: translateY(-50%) scale(0);
          width: 4px; height: 4px; border-radius: 50%;
          background: #C49A3C;
          transition: transform .28s cubic-bezier(.34,1.56,.64,1);
        }

        #hn-drawer.hn-open .hn-mlink {
          animation: hnLinkIn .4s ease forwards;
        }

        .hn-mlink:hover {
          color: rgba(240,250,255,.97);
          background: rgba(196,154,60,.07);
          border-color: rgba(196,154,60,.18);
          transform: translateX(4px);
        }
        .hn-mlink:hover::before { left: 130%; }
        .hn-mlink:hover::after  { transform: translateY(-50%) scale(1); }

        /* ── Divider ── */
        .hn-mdivider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent);
          margin: 10px 20px 22px;
          flex-shrink: 0; position: relative; z-index: 1;
        }

        /* ── CTA buttons ── */
        .hn-mctas {
          display: flex; flex-direction: column; gap: 10px;
          padding: 0 20px; flex-shrink: 0; position: relative; z-index: 1;
        }

        .hn-mcta-ghost {
          display: block; text-align: center;
          padding: 14px 18px; font-size: 14px; font-weight: 500;
          border-radius: 11px; color: rgba(210,228,255,.8);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.03);
          transition: color .25s, border-color .25s, background .25s, transform .2s;
          font-family: 'Geist', sans-serif; letter-spacing: .01em;
        }
        .hn-mcta-ghost:hover {
          color: #fff; border-color: rgba(255,255,255,.25);
          background: rgba(255,255,255,.06); transform: translateY(-1px);
        }

        .hn-mcta-gold {
          display: block; text-align: center; position: relative; overflow: hidden;
          padding: 14px 18px; font-size: 14px; font-weight: 700;
          border-radius: 11px; color: #0a101e;
          text-decoration: none; background: #C49A3C; border: none;
          transition: box-shadow .3s, transform .22s, background .2s;
          font-family: 'Geist', sans-serif; letter-spacing: .01em;
        }
        .hn-mcta-gold::before {
          content: ''; position: absolute;
          top: 0; left: -80%; width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,.4), transparent);
          transform: skewX(-20deg); transition: left .55s ease;
        }
        .hn-mcta-gold:hover {
          background: #D4A84A;
          box-shadow: 0 0 0 1px rgba(196,154,60,.45), 0 0 22px rgba(196,154,60,.35);
          transform: translateY(-1px);
        }
        .hn-mcta-gold:hover::before { left: 135%; }

        /* ── Tagline ── */
        .hn-mtagline {
          font-size: 10px; color: rgba(200,215,235,.2);
          text-align: center; letter-spacing: .1em; text-transform: uppercase;
          margin: 28px 20px 32px;
          font-family: 'Geist', sans-serif; flex-shrink: 0;
          position: relative; z-index: 1;
        }

        /* Bottom gold accent */
        .hn-drawer-accent {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(196,154,60,.55), transparent);
          pointer-events: none;
        }

        /* ══════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════ */
        @media (max-width: 900px) {
          #hn-nav { grid-template-columns: 1fr auto; padding: 0 18px; }
          #hn-nav .hn-links { display: none; }
          #hn-nav .hn-ctas  { display: none; }
          #hn-nav .hn-ham   { display: flex; }
          .hn-overlay       { display: block; }
          #hn-drawer        { display: flex; }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          #hn-nav { padding: 0 28px; }
          #hn-nav .hn-links li a { padding: 6px 13px; font-size: 12.5px; }
          #hn-nav .hn-ghost      { padding: 6px 13px; font-size: 12px; }
          #hn-nav .hn-gold       { padding: 6px 15px; font-size: 12px; }
        }
      `}} />

      {/* ── Navbar ── */}
      <nav id="hn-nav" ref={navRef} aria-label="Main navigation">
        <a href="/" className="hn-logo" aria-label="HR Ops home">
          <Logo height={30} />
        </a>

        <ul className="hn-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>

        <div className="hn-ctas">
          <Link href="/login" className="hn-ghost">Log in</Link>
          <Link href="/signup" className="hn-gold">Get started</Link>
        </div>

        <button ref={hamburgerRef} className="hn-ham"
          aria-label="Open navigation" aria-expanded="false" aria-controls="hn-drawer">
          <span className="hn-bar hn-bar-1" />
          <span className="hn-bar hn-bar-2" />
          <span className="hn-bar hn-bar-3" />
        </button>
      </nav>

      {/* Backdrop */}
      <div ref={overlayRef} className="hn-overlay" aria-hidden="true" />

      {/* Mobile drawer */}
      <div id="hn-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="hn-dheader">
          <a href="/" className="hn-logo" aria-label="HR Ops home">
            <Logo height={26} />
          </a>
          <button id="hn-close" aria-label="Close navigation">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="hn-mlinks" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hn-mlink">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hn-mdivider" />

        <div className="hn-mctas">
          <Link href="/login" className="hn-mcta-ghost">Log in</Link>
          <Link href="/signup" className="hn-mcta-gold">Get started</Link>
        </div>

        <p className="hn-mtagline">AI-powered hiring · Made in India</p>
        <div className="hn-drawer-accent" />
      </div>
    </>
  )
}
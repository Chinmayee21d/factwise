'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

type RevealType = 'fade' | 'split-chars' | 'split-words' | 'split-lines' | 'kinetic';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation start offset for translate-Y (px). Default 24. */
  y?: number;
  /** Delay before the tween starts (s). Default 0. */
  delay?: number;
  /** Tween duration (s). Default 0.7. */
  duration?: number;
  /** Stagger between elements (s). Default 0.035. */
  stagger?: number;
  /** Whether to animate only once. Default true (single play on scroll-in). */
  once?: boolean;
  /** ScrollTrigger start position. Default 'top 85%'. */
  start?: string;
  /** Reveal type. Default 'fade'. */
  type?: RevealType;
}

/**
 * ScrollReveal — single source of truth for on-scroll heading & content reveals.
 *
 * Behaviour guarantees:
 *  • Plays once when the element scrolls into view (no replay on scroll-back).
 *  • Waits for web-fonts before running SplitText so character measurements are correct.
 *  • Sets initial state synchronously to prevent the flash-of-visible-text.
 *  • Respects `prefers-reduced-motion`: shows content immediately, skips the tween.
 */
export default function ScrollReveal({
  children,
  className,
  y = 24,
  delay = 0,
  duration = 0.7,
  stagger = 0.035,
  once = true,
  start = 'top 85%',
  type = 'fade',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reduced-motion: don't animate, just show.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let split: SplitText | null = null;

    const run = () => {
      let targets: Element[] | HTMLCollection;

      if (type === 'fade') {
        targets = el.children;
      } else {
        const splitMode =
          type === 'split-chars' || type === 'kinetic'
            ? 'chars,words'
            : type === 'split-words'
              ? 'words'
              : 'lines';

        split = new SplitText(el, { type: splitMode });
        targets =
          type === 'split-chars' || type === 'kinetic'
            ? split.chars
            : type === 'split-words'
              ? split.words
              : split.lines;
      }

      // Lock initial state synchronously — prevents any flash before paint.
      gsap.set(targets, { y, opacity: 0, force3D: true });

      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        clearProps: 'transform,will-change',
        scrollTrigger: {
          trigger: el,
          start,
          once,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
          // invalidateOnRefresh lets the animation re-pin correctly after font swap.
          invalidateOnRefresh: true,
        },
      });
    };

    // Wait for fonts so SplitText measures characters with the final typography.
    const fonts = typeof document !== 'undefined' ? document.fonts : null;
    if (fonts && fonts.status !== 'loaded') {
      // Hide first to avoid flash with fallback-font text.
      gsap.set(el, { opacity: 0 });
      fonts.ready.then(() => {
        gsap.set(el, { opacity: 1 });
        run();
        ScrollTrigger.refresh();
      });
    } else {
      run();
    }

    return () => {
      split?.revert();
    };
  }, { scope: containerRef, dependencies: [type, once] });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  once?: boolean;
  type?: 'fade' | 'split-chars' | 'split-words' | 'split-lines' | 'kinetic';
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 30,
  stagger = 0.05,
  once = false,
  type = 'fade',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    if (type === 'fade') {
      gsap.fromTo(
        el.children,
        { y: y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          delay: delay,
          stagger: stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          },
        }
      );
    } else if (type === 'kinetic') {
      const split = new SplitText(el, { type: 'chars,words' });
      gsap.from(split.chars, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'circ.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: once ? 'play none none none' : 'restart pause resume reverse',
        },
      });
    } else {
      const split = new SplitText(el, {
        type: type === 'split-chars' ? 'chars,words' : (type === 'split-words' ? 'words' : 'lines'),
      });

      const targets = type === 'split-chars' ? split.chars : (type === 'split-words' ? split.words : split.lines);

      gsap.from(targets, {
        y: y,
        opacity: 0,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}


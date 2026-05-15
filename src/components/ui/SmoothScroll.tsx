'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';
  const smootherRef = useRef<any>(null);
  // Track whether we're on the client — avoids SSR/client HTML mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useGSAP(() => {
    if (!isClient || isAboutPage) return;

    let ScrollSmoother: any = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      ScrollSmoother = require('gsap/ScrollSmoother').ScrollSmoother;
      gsap.registerPlugin(ScrollSmoother);
    } catch {
      // Club plugin not available — native scroll is already working
      return;
    }

    try {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        effects: true,
        ignoreMobileResize: true,
      });
    } catch (e) {
      console.warn('ScrollSmoother failed, using native scroll.', e);
    }
  }, { scope: wrapperRef, dependencies: [isClient] });

  useEffect(() => {
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  // On server (and first client render before hydration): render children directly.
  // This ensures server HTML === initial client HTML → no hydration mismatch.
  if (!isClient || isAboutPage) {
    return <>{children}</>;
  }

  return (
    <div
      id="smooth-wrapper"
      ref={wrapperRef}
      style={{ overflow: 'hidden', width: '100%' }}
    >
      <div
        id="smooth-content"
        style={{ width: '100%', position: 'relative', willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
}

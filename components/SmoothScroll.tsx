'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Wraps the app in Lenis smooth-scroll physics — the buttery, slightly-eased
 * scroll feel (vs. the browser's native instant scroll). Mounted once in the
 * root layout so it applies site-wide, not just on /work.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

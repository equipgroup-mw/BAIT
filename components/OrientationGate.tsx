'use client';

import { useEffect, useState } from 'react';

export default function OrientationGate({ children }: { children: React.ReactNode }) {
  const [isPortraitTablet, setIsPortraitTablet] = useState(false);

  useEffect(() => {
    // Matches devices that are in portrait mode BUT have a width of at least 768px (Tablets/iPads)
    const mediaQuery = window.matchMedia('(min-width: 768px) and (orientation: portrait)');

    const checkOrientation = () => setIsPortraitTablet(mediaQuery.matches);
    
    checkOrientation();
    mediaQuery.addEventListener('change', checkOrientation);

    return () => mediaQuery.removeEventListener('change', checkOrientation);
  }, []);

  if (isPortraitTablet) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-turquoise p-8 text-center text-cream">
        <svg className="mb-6 h-16 w-16 animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        </svg>
        <h2 className="font-display text-3xl font-bold uppercase">Please Rotate</h2>
        <p className="mt-4 max-w-xs text-lg text-cream/80">
          We&rsquo;ve optimized this experience for landscape mode. Turn your device sideways to enter!
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import ArrowIcon from './ArrowIcon';
import Sticker from './Sticker';

// Three.js/WebGL can only run in the browser, never during Next.js's server render.
const HeroArrowScene = dynamic(() => import('./HeroArrowScene'), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-pattern-animated pt-24">
      {/* floating decorative arrows */}
      <ArrowIcon
        className="absolute left-[8%] top-[22%] h-8 w-8 animate-float opacity-70 md:h-12 md:w-12"
        style={{ ['--r' as any]: '-18deg' }}
        variant="dark-turq"
      />
      <ArrowIcon
        className="absolute left-[18%] top-[62%] h-6 w-6 animate-float opacity-60 md:h-9 md:w-9"
        style={{ ['--r' as any]: '10deg', animationDelay: '1.2s' }}
        variant="light-turq"
      />

      {/* Added relative to the grid container so the absolute arrow stays bound to this area */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-2 md:items-center md:px-10">
        
        {/* Only the text/copy fades and drifts on scroll — the 3D model (below) is
            deliberately left out of this fade so it stays fully visible. 
            Added md:self-start so the text doesn't try to center-align with the empty grid space. */}
        <motion.div style={{ opacity: fade, y: textY }} className="md:self-start">
          <Sticker color="green" rotate={-3}>Marketing &amp; Media Studio</Sticker>
          <h1 className="mt-6 font-display text-6xl font-bold uppercase leading-[0.92] text-cream sm:text-7xl lg:text-8xl">
            We turn
            <br />
            brand stories
            <br />
            into{' '}
            <span className="relative inline-block">
              <span className="text-outline">love</span>
            </span>
            <br />
            <span className="inline-block -rotate-2 bg-green px-4 text-turquoise">stories.</span>
          </h1>
        </motion.div>

        {/* 3D-arrow.glb — kept fully visible (no scroll-fade) so people can actually
            sit with it and interact instead of watching it disappear on scroll.

            Mobile/portrait (base classes): sits in normal document flow, right below
            the text, sized relative to viewport width and capped so it can never
            overflow a narrow screen.
            Tablet-landscape/desktop (md: classes): switches to the absolute, centered
            overlay behind the text — unchanged from before.

            MANUAL MOVEMENT INSTRUCTIONS:
            - Mobile position/size: adjust `mt-6` (gap below text) or the
              `h-[60vw] max-h-[420px] w-[60vw] max-w-[420px]` pair (bigger vw% / cap = bigger model).
            - Desktop position: md:top-[50%] → e.g. md:top-[20%] to move UP, md:top-[70%] to move DOWN.
              md:left-[50%] → shift left/right. md:w-[80vh] / md:h-screen → resize. */}
        <div className="relative mx-auto mt-6 aspect-square h-[60vw] w-[60vw] max-h-[420px] max-w-[420px] md:absolute md:top-[45%] md:left-[50%] md:z-[-1] md:mx-0 md:mt-0 md:h-screen md:w-[80vh] md:max-w-none md:max-h-none md:-translate-y-1/2">
          <HeroArrowScene scrollProgress={scrollYProgress} />
        </div>
      </div>


    </section>
  );
}
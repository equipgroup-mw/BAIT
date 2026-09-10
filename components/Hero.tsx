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
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-4 px-6 md:grid-cols-2 md:items-center md:gap-10 md:px-10">
        
        {/* Only the text/copy fades and drifts on scroll */}
        <motion.div style={{ opacity: fade, y: textY }} className="md:self-start">
          <Sticker color="green" rotate={-3}>Marketing &amp; Media Studio</Sticker>
          
          {/* 
            1. Base h5 uses 'font-body' (Manrope) 
            2. Inner spans switch to 'font-display' (Metropolitano Extrabold) 
          */}
          <h5 className="mt-6 font-body text-5xl font-bold lowercase leading-[0.92] text-cream sm:text-7xl lg:text-8xl">
            <span className="font-body">
              We turn
              <br />
              brand stories
              <br />
              into{' '}
            </span>
            <span className="relative inline-block">
              <span className="inline-block -rotate-2 bg-aqua px-4 font-display font-bold uppercase text-turquoise">love</span>
            </span>
            <br />
            <span className="inline-block -rotate-2 bg-green px-4 font-display font-bold uppercase text-turquoise">stories.</span>
          </h5>
        </motion.div>

        {/* 
          3D-arrow.glb 
          Mobile: Sized using `svh` (Small Viewport Height) so it scales up on longer phones,
          but shrinks on shorter phones so it ALWAYS fits on screen with the text.
          Desktop: Unchanged, absolute centered overlay.
        */}
        <div className="relative mx-auto mt-4 aspect-square h-[35svh] w-[35svh] max-h-[420px] max-w-[420px] md:absolute md:top-[45%] md:left-[50%] md:z-[-1] md:mx-0 md:mt-0 md:h-screen md:w-[80vh] md:max-w-none md:max-h-none md:-translate-y-1/2">
          <HeroArrowScene scrollProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
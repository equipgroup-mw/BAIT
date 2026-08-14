'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ArrowIcon from './ArrowIcon';
import Sticker from './Sticker';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.28]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-turquoise pt-24">
      <div className="dot-grid pointer-events-none absolute inset-0" />

      {/* floating decorative arrows */}
      <ArrowIcon
        className="absolute left-[8%] top-[22%] h-8 w-8 animate-float opacity-70 md:h-12 md:w-12"
        fill="#32B498"
        style={{ ['--r' as any]: '-18deg' }}
      />
      <ArrowIcon
        className="absolute left-[18%] top-[62%] h-6 w-6 animate-float opacity-60 md:h-9 md:w-9"
        fill="#72C2B9"
        style={{ ['--r' as any]: '10deg', animationDelay: '1.2s' }}
      />

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-2 md:items-center md:px-10">
        <motion.div style={{ y: textY }}>
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
          <p className="mt-8 max-w-md text-lg text-cream/80">
            Bold, authentic marketing that connects, performs, and pushes boundaries —
            for brands ready to show up and steal hearts.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/work"
              className="rounded-full bg-coral px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-turquoise transition hover:scale-105 hover:bg-white"
            >
              See our work
            </Link>
            <Link
              href="/#contact"
              className="font-display text-sm font-bold uppercase tracking-wide text-cream underline decoration-aqua decoration-2 underline-offset-8 transition hover:text-coral"
            >
              Start a project
            </Link>
          </div>
        </motion.div>

        <motion.div style={{ scale: imgScale, y: imgY }} className="relative mx-auto aspect-[4/5] w-full max-w-md">
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ clipPath: 'polygon(18% 0%, 100% 8%, 62% 44%, 82% 100%, 44% 90%, 34% 50%, 0% 66%)' }}
          >
            <Image src="/team/hero.jpg" alt="Clickbait creative studio at work" fill className="object-cover" priority sizes="(max-width: 768px) 90vw, 40vw" />
            <div className="absolute inset-0 bg-green/25 mix-blend-hard-light" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-xs font-bold uppercase tracking-widest text-cream/60"
      >
        Scroll
        <div className="mx-auto mt-2 h-8 w-px bg-cream/40" />
      </motion.div>
    </section>
  );
}

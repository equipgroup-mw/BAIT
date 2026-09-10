'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { services, type Service } from '@/lib/data';
import Sticker from './Sticker';
import ArrowIcon from './ArrowIcon';

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="services" className="relative bg-pattern-dark py-28 md:py-36 overscroll-contain">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-8">

          {/* Left Column: Sticky Header */}
          <div className="md:sticky md:top-32 md:h-fit">
            <Sticker color="coral" rotate={-3} className="w-fit">What we offer</Sticker>

            <div className="mt-6 flex flex-col gap-4 text-4xl font-bold leading-[0.95] text-cream sm:text-5xl md:text-6xl">
              <span className="font-body lowercase">
                Everything a
                <br />
                brand needs
                <br />
                to show up,
              </span>

              <span className="font-display text-turquoise uppercase w-fit -rotate-2 bg-green px-4 py-1 text-3xl sm:text-4xl md:text-5xl">
                stand out &amp; <br /> steal hearts.
              </span>
            </div>

            <p className="mt-8 max-w-sm text-lg text-cream/70">
              Four disciplines, one team, zero hand-offs between strategy and execution.
            </p>
          </div>

          {/* Right Column: The Stack Container */}
          {/* Bumped scroll distance per card so each one has real dwell time before flipping */}
          <div ref={containerRef} className="relative h-[900svh] md:h-[550svh]">
            <div
              className="sticky top-0 flex h-screen items-center justify-center overflow-hidden overscroll-none"
              style={{ perspective: '1800px' }}
            >
              {services.map((s, i) => (
                <ServiceCard
                  key={s.title}
                  service={s}
                  index={i}
                  total={services.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const segment = end - start;

  // 70% hold, 15% enter, 15% exit — gives a wide resting window per card
  const transFrac = 0.15;
  const enterEnd = start + segment * transFrac;
  const exitStart = end - segment * transFrac;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  // rotateX: 90deg = tipped forward/hidden, 0deg = flat/facing viewer, -90deg = tipped away/hidden
  let rotateInput: number[];
  let rotateOutput: number[];

  if (isFirst) {
    // Already flat on load — only needs an exit flip
    rotateInput = [start, exitStart, end];
    rotateOutput = [0, 0, -90];
  } else if (isLast) {
    // Only needs an entrance flip, then stays flat
    rotateInput = [start, enterEnd, end];
    rotateOutput = [90, 0, 0];
  } else {
    rotateInput = [start, enterEnd, exitStart, end];
    rotateOutput = [90, 0, 0, -90];
  }

  const rotateX = useTransform(progress, rotateInput, rotateOutput);

  // NEW: Fade the card completely out as it finishes flipping away
  // It stays at 1 until the exit phase, then drops to 0 right at the end.
  const opacity = useTransform(progress, [exitStart, end], [1, 0]);

  return (
    <div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[85svh] w-full"
      style={{ zIndex: index + 1, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          rotateX,
          opacity, // Applied opacity here
          transformPerspective: 1800,
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
        }}
        className="group flex h-full w-full origin-top flex-col overflow-hidden rounded-3xl border border-cream/10 bg-cream/[0.04] p-2 md:p-4"
      >
        {/* Top Half: Video Area */}
        <div className="relative h-[55%] w-full overflow-hidden rounded-2xl bg-turquoise/10">
          <video
            src={service.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />

          <ArrowIcon
            className="absolute -right-4 -top-4 h-16 w-16 opacity-0 transition duration-500 group-hover:-right-1 group-hover:-top-1 group-hover:opacity-100"
            variant="light-turq"
          />
        </div>

        {/* Bottom Half: Text Content */}
        <div className="flex h-[45%] flex-col justify-center p-8 md:p-12">
          {/* REMOVED: The numbers span that was here */}
          
          <h3 className="font-display text-4xl font-bold uppercase text-cream sm:text-5xl md:text-6xl">
            {service.title}
          </h3>

          <p className="mt-4 max-w-md text-lg text-cream/65 md:text-xl">
            {service.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
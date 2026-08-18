'use client';

import { useMemo, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import WorkCaseStudy from './WorkCaseStudy';

type Project = {
  title: string;
  category: string;
  year: string;
  image: string;
  slug: string;
  summary: string;
};

/** Builds a single S-curve path (in a 0–100 x 0–100 coordinate space) that
 *  threads through the vertical midpoint of each alternating project row. */
function buildConnectorPath(count: number) {
  const points = Array.from({ length: count }, (_, i) => ({
    x: i % 2 === 0 ? 28 : 72,
    y: ((i + 0.5) / count) * 100,
  }));

  let d = 'M 50 0 ';
  let prev = { x: 50, y: 0 };
  for (const p of points) {
    const midY = (prev.y + p.y) / 2;
    d += `C 50 ${midY}, ${p.x} ${midY}, ${p.x} ${p.y} `;
    prev = p;
  }
  const midY = (prev.y + 100) / 2;
  d += `C 50 ${midY}, 50 ${midY}, 50 100`;
  return d;
}

export default function WorkList({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathD = useMemo(() => buildConnectorPath(projects.length), [projects.length]);

  return (
    <div ref={containerRef} className="relative">
      {/* Curved connector thread — decorative, desktop only. Draws itself in as
          the list scrolls through view, echoing Trionn's SVG connector lines
          running down the middle of the alternating grid. */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d={pathD}
          fill="none"
          stroke="#00A8A8"
          strokeOpacity={0.35}
          strokeWidth={0.25}
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>

      {projects.map((p, i) => (
        <WorkCaseStudy
          key={p.slug}
          title={p.title}
          category={p.category}
          year={p.year}
          image={p.image}
          slug={p.slug}
          summary={p.summary}
          index={i}
          align={i % 2 === 0 ? 'left' : 'right'}
        />
      ))}
    </div>
  );
}

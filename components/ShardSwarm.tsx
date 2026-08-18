'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';

type Props = {
  /** 0→1 scroll progress of the parent case study entering the viewport. */
  progress: MotionValue<number>;
  /** Varies the shatter pattern per-project so rows don't all break the same way. */
  seed?: number;
};

const COLS = 4;
const ROWS = 3;
const TILES = COLS * ROWS;

/** Deterministic pseudo-random spread so the same project always shatters
 *  the same way, without pulling in a random dependency. */
function tileConfig(i: number, seed: number) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  // Direction each tile flies in: radially outward from the tile grid's
  // center, so the whole mosaic reads as one shape breaking apart rather
  // than random confetti.
  const dirX = (col + 0.5) / COLS - 0.5;
  const dirY = (row + 0.5) / ROWS - 0.5;
  const mag = Math.hypot(dirX, dirY) || 1;
  const jitter = ((i * 53 + seed * 29) % 100) / 100 - 0.5; // -0.5..0.5
  const distance = 340 + ((i * 37 + seed * 19) % 220);
  const dx = (dirX / mag) * distance + jitter * 60;
  const dy = (dirY / mag) * distance + jitter * 60;
  const rot = ((i * 67 + seed * 23) % 300) - 150;
  // Each tile starts its flight at a slightly different point in the scroll
  // so the break reads as a swarm scattering rather than one rigid grid
  // sliding apart in unison.
  const startOffset = (((i * 31 + seed * 11) % 40) / 100); // 0..0.39
  return { col, row, dx, dy, rot, startOffset };
}

/**
 * Covers the project image with the brand's arrow-shard artwork tiled into
 * a grid, then — driven by scroll — shatters it: each tile flies outward
 * and fades, revealing the actual project photo underneath. Built for the
 * moment a project scrolls into view, not a page-load animation.
 */
export default function ShardSwarm({ progress, seed = 0 }: Props) {
  // Only occupy the first slice of the case study's long enter/exit scroll
  // range, so the reveal is finished well before the project is centered
  // and being read.
  const fly = useTransform(progress, [0, 0.4], [0, 1], { clamp: true });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      style={{ ['--fly' as string]: fly }}
    >
      {Array.from({ length: TILES }, (_, i) => {
        const { col, row, dx, dy, rot, startOffset } = tileConfig(i, seed);
        const flightSpan = 1 - startOffset;
        // Per-tile local progress derived purely in CSS from the single
        // shared --fly variable, so this stays one motion value for the
        // whole swarm (cheap) while each tile still flies on its own
        // slightly staggered schedule.
        const local = `clamp(0, (var(--fly) - ${startOffset.toFixed(3)}) / ${flightSpan.toFixed(3)}, 1)`;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${(row / ROWS) * 100}%`,
              left: `${(col / COLS) * 100}%`,
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
              backgroundImage: 'url(/brand/Arrow-shard.png)',
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
              opacity: `calc(1 - ${local})`,
              transform: `translate(calc(${local} * ${dx.toFixed(0)}px), calc(${local} * ${dy.toFixed(0)}px)) rotate(calc(${local} * ${rot.toFixed(0)}deg))`,
            }}
          />
        );
      })}
    </motion.div>
  );
}

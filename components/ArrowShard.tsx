'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

type Props = {
  src?: string;
  alt: string;
  tint?: 'green' | 'none' | 'mono';
  className?: string;
  parallax?: boolean;
};

/**
 * Photo/graphic block with a gentle scroll-driven drift, used alongside the
 * real brand shard/arrow artwork rather than a code-drawn silhouette.
 */
export default function ArrowShard({ src, alt, tint = 'green', className = '', parallax = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], parallax ? [60, -60] : [0, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], parallax ? [-3, 1] : [0, 0]);

  const overlay =
    tint === 'green'
      ? 'bg-green mix-blend-hard-light opacity-90'
      : tint === 'mono'
      ? 'bg-turquoise mix-blend-luminosity'
      : '';

  const imageSrc = src || '/brand/Arrow-shard.png';

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{ y, rotate }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
      >
        <Image src={imageSrc} alt={alt} fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover" priority={tint === 'green' && !src} />
        {tint !== 'none' && <div className={`absolute inset-0 ${overlay}`} />}
      </motion.div>
    </div>
  );
}

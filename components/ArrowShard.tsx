'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  tint?: 'green' | 'none' | 'mono';
  className?: string;
  parallax?: boolean;
};

/**
 * The signature visual device of the site: a photograph cropped into the
 * brand's cursor-arrow silhouette, echoing the shard imagery used
 * throughout the Clickbait brand guidelines (Vision / Mission / Photography).
 * On scroll it drifts and rotates slightly, like Apple's product reveals.
 */
export default function ArrowShard({ src, alt, tint = 'green', className = '', parallax = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], parallax ? [80, -80] : [0, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], parallax ? [-6, 2] : [-4, -4]);

  const overlay =
    tint === 'green'
      ? 'bg-green mix-blend-hard-light opacity-90'
      : tint === 'mono'
      ? 'bg-turquoise mix-blend-luminosity'
      : '';

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{
          y,
          rotate,
          clipPath: 'polygon(15% 0%, 100% 12%, 58% 46%, 78% 100%, 40% 92%, 32% 52%, 0% 68%)',
        }}
        className="relative aspect-[4/5] w-full overflow-hidden"
      >
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover" />
        {tint !== 'none' && <div className={`absolute inset-0 ${overlay}`} />}
      </motion.div>
    </div>
  );
}

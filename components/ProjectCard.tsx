'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ArrowIcon from './ArrowIcon';

type Props = {
  title: string;
  category: string;
  year: string;
  image: string;
  slug: string;
  index: number;
};

export default function ProjectCard({ title, category, year, image, slug, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{ perspective: 1200 }}
    >
      <Link href={`/work#${slug}`} className="block" aria-label={`View ${title} case study`}>
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-turquoise"
        >
          <motion.div style={{ transform: 'translateZ(0px)' }} className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-turquoise via-turquoise/10 to-transparent opacity-90 transition group-hover:from-turquoise/95" />
          </motion.div>

          <div style={{ transform: 'translateZ(40px)' }} className="relative flex h-full flex-col justify-end p-7 md:p-9">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-aqua">
              {category} &middot; {year}
            </span>
            <h3 className="mt-2 flex items-center gap-3 font-display text-3xl font-bold uppercase text-cream md:text-4xl">
              {title}
              <ArrowIcon className="h-6 w-6 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" variant="default" />
            </h3>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

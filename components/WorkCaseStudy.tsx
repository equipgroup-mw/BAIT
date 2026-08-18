'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ArrowIcon from './ArrowIcon';
import ShardSwarm from './ShardSwarm';

type Props = {
  title: string;
  category: string;
  year: string;
  image: string;
  slug: string;
  summary: string;
  index: number;
  align: 'left' | 'right';
};

/**
 * One project row in the alternating split layout — media on one side, title
 * / tagline / "Explore project" link on the other, flipping sides by index.
 */
export default function WorkCaseStudy({ title, category, year, image, slug, summary, index, align }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.08]);

  return (
    <motion.article
      ref={ref}
      id={slug}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 scroll-mt-24 py-14 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Link href={`/work#${slug}`} className="group block" aria-label={`View ${title} case study`}>
          <div
            className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
              align === 'right' ? 'md:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-turquoise sm:aspect-[16/10] md:aspect-[4/3]">
              <motion.div style={{ scale: imgScale }} className="absolute inset-0">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority={index === 0}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-turquoise/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <ShardSwarm progress={scrollYProgress} seed={index} />
              <ArrowIcon
                className="absolute right-5 top-5 h-8 w-8 -translate-y-2 opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                variant="default"
              />
            </div>

            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-green">
                {category} &middot; {year}
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.95] text-turquoise sm:text-5xl">
                {title}
              </h2>
              <p className="mt-4 max-w-md text-lg text-turquoise/70">{summary}</p>
              <span className="mt-6 flex w-fit items-center gap-3 font-display text-sm font-bold uppercase tracking-wide text-turquoise underline decoration-coral decoration-2 underline-offset-8 transition group-hover:text-coral">
                Explore project
                <ArrowIcon
                  className="h-4 w-4 -translate-x-1 transition duration-300 ease-out group-hover:translate-x-0"
                  variant="default"
                />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.article>
  );
}

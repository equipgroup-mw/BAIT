'use client';

import { motion } from 'framer-motion';
import { services } from '@/lib/data';
import Sticker from './Sticker';
import ArrowIcon from './ArrowIcon';

export default function Services() {
  return (
    <section id="services" className="relative bg-turquoise py-28 md:py-36">
      <div className="dot-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-8">
          <div className="md:sticky md:top-32 md:h-fit">
            <Sticker color="coral" rotate={-3} className="w-fit">What we offer</Sticker>
            <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] text-cream sm:text-6xl">
              Everything a
              <br />
              brand needs
              <br />
              to <span className="text-green">show up.</span>
            </h2>
            <p className="mt-6 max-w-sm text-lg text-cream/70">
              Four disciplines, one team, zero hand-offs between strategy and execution.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.04] p-8 transition hover:border-green/50 hover:bg-cream/[0.07] md:p-10"
              >
                <ArrowIcon
                  className="absolute -right-4 -top-4 h-16 w-16 opacity-0 transition duration-500 group-hover:-right-1 group-hover:-top-1 group-hover:opacity-100"
                  fill="#32B498"
                />
                <span className="font-display text-xs font-bold uppercase tracking-widest text-aqua">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase text-cream sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-cream/65">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Sticker from './Sticker';

const values = [
  'Off-script is our comfort zone',
  'We like kindness',
  'Serving you is why we show up',
  'Obsessively thoughtful',
  'We move at the speed of thought',
  'Data fuels our wild ideas',
];

export default function Values() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Sticker color="dark" rotate={-2} className="w-fit">Core Values</Sticker>
            <p className="mt-4 max-w-sm text-lg text-turquoise/70">
              Your story matters to us. People first, always.
            </p>
          </div>
        </div>

        <ul className="mt-12 divide-y divide-turquoise/12 border-y border-turquoise/12">
          {values.map((v, i) => (
            <motion.li
              key={v}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex items-center justify-between gap-6 py-6 md:py-8"
            >
              <span className="font-display text-2xl font-bold uppercase leading-tight text-turquoise transition group-hover:text-green sm:text-3xl md:text-4xl">
                {v}
              </span>
              <span className="hidden font-display text-sm font-bold text-turquoise/30 md:block">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';
import Sticker from '@/components/Sticker';
import ArrowIcon from '@/components/ArrowIcon';

export const metadata: Metadata = {
  title: 'Work — Clickbait',
  description: 'A look at Clickbait\u2019s recent work across brand campaigns, storytelling, strategy, and photo & video.',
};

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-turquoise pb-16 pt-40 text-cream md:pb-20 md:pt-48">
        <div className="dot-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <Sticker color="coral" rotate={-3} className="w-fit">Our Work</Sticker>
          <h1 className="mt-6 max-w-3xl font-display text-6xl font-bold uppercase leading-[0.92] sm:text-7xl">
            A few stories
            <br />
            we&rsquo;re <span className="text-green">proud of.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg text-cream/75">
            Four projects, four different problems — each solved with the same mix of
            strategy, craft, and a little bit of nerve.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        {projects.map((p, i) => (
          <article
            key={p.slug}
            id={p.slug}
            className="scroll-mt-24 border-b border-turquoise/10 py-24 md:py-32"
          >
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <div
                className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 45vw"
                  />
                  <ArrowIcon className="absolute left-5 top-5 h-9 w-9" fill="#FF8A59" />
                </div>

                <div>
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-green">
                    {String(i + 1).padStart(2, '0')} &mdash; {p.category} &middot; {p.year}
                  </span>
                  <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
                    {p.title}
                  </h2>
                  <p className="mt-6 max-w-md text-lg text-turquoise/70">{p.summary}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-turquoise py-24 text-center text-cream">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Want to be story number five?
          </h2>
          <Link
            href="/#contact"
            className="mt-8 inline-block rounded-full bg-coral px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-turquoise transition hover:scale-105 hover:bg-green"
          >
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}

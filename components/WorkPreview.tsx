import Link from 'next/link';
import { projects } from '@/lib/data';
import ProjectCard from './ProjectCard';
import Sticker from './Sticker';

export default function WorkPreview() {
  return (
    <section className="bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Sticker color="coral" rotate={3} className="w-fit">Selected Work</Sticker>
            <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
              Stories we&rsquo;ve
              <br />
              already told.
            </h2>
            <p className="mt-4 max-w-md text-lg text-turquoise/70">
              50+ projects and counting. Here&rsquo;s a highlight of our favorites.
            </p>
          </div>
          <Link
            href="/work"
            className="font-display text-sm font-bold uppercase tracking-wide text-turquoise underline decoration-green decoration-2 underline-offset-8 transition hover:text-green"
          >
            View full portfolio &rarr;
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              title={p.title}
              category={p.category}
              year={p.year}
              image={p.image}
              slug={p.slug}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

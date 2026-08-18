import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/lib/data';
import Sticker from '@/components/Sticker';
import WorkList from '@/components/WorkList';

export const metadata: Metadata = {
  title: 'Work — Clickbait',
  description: 'A look at Clickbait\u2019s recent work across brand campaigns, storytelling, strategy, and photo & video.',
};

export default function WorkPage() {
  return (
    <>
      {/* ADDED: min-h-dynamic-screen to fill the screen */}
      <section className="relative overflow-hidden bg-pattern-animated pb-16 pt-40 text-cream md:pb-20 md:pt-48 min-h-dynamic-screen">
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <Sticker color="coral" rotate={-3} className="w-fit">Our Work</Sticker>
          <h1 className="mt-6 max-w-3xl font-display text-6xl font-bold uppercase leading-[0.92] sm:text-7xl">
            A few stories
            <br />
            we&rsquo;re <span className="text-green">proud of.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg text-cream/75">
            50+ projects and counting — here&rsquo;s a highlight of our favorites, each
            solved with the same mix of strategy, craft, and a little bit of nerve.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <WorkList projects={projects} />
      </section>

      {/* ADDED: min-h-dynamic-screen to fill the screen */}
      <section className="bg-pattern-animated py-24 text-center text-cream min-h-dynamic-screen">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Want to be our next story?
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
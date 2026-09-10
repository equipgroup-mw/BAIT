import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/lib/data';
import Sticker from '@/components/Sticker';
import TileGrid from '@/components/TileGrid';

export const metadata: Metadata = {
  title: 'Work — Clickbait',
  description: "A look at Clickbait's recent work across brand campaigns, storytelling, strategy, and photo & video.",
};

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-pattern-animated pb-16 pt-40 text-cream md:pb-20 md:pt-48 min-h-dynamic-screen">
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <Sticker color="coral" rotate={-3} className="w-fit">Our Work</Sticker>
          <h1 className="mt-6 max-w-3xl font-body text-6xl font-bold lowercase leading-[0.92] sm:text-7xl">
            The stories
            <br />
            we are 
            <br />
            <span className=" uppercase font-display inline-block -rotate-2 px-4 bg-green ">proud of.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg text-cream/75">
            50+ projects and counting. Here&rsquo;s a highlight of our favorites, each
            solved with the same mix of strategy, craft, and a little bit of nerve.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-12 md:mb-16">
            <Sticker color="coral" rotate={-3} className="w-fit">Portfolio</Sticker>
            <h2 className="mt-4 font-body text-4xl font-bold leading-tight sm:text-5xl">Our pride and joy</h2>
            <p className="mt-4 max-w-2xl text-lg text-turquoise/70">
              Live projects from across all our engagements. Click any tile to open the full case study in a new tab.
            </p>
          </div>
          <TileGrid projects={projects} />
        </div>
      </section>

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
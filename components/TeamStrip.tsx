import Image from 'next/image';
import Link from 'next/link';
import { team } from '@/lib/data';
import Sticker from './Sticker';

export default function TeamStrip() {
  return (
    <section className="bg-turquoise py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-14 md:grid-cols-[1fr_1.1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/brand/Arrow-pattern.png" alt="The Clickbait team" fill className="object-cover" sizes="(max-width: 768px) 90vw, 45vw" />
          </div>
          <div>
            <Sticker color="green" rotate={-3} className="w-fit">Who&rsquo;s behind it</Sticker>
            <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] text-cream sm:text-6xl">
              Three people.
              <br />
              One story per client.
            </h2>
            <p className="mt-6 max-w-md text-lg text-cream/70">
              A small team, on purpose — so nothing gets lost between the brief and
              what actually ships.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {team.map((m) => (
                <div key={m.slug} className="flex items-center gap-3 rounded-full bg-cream/[0.06] py-2 pl-2 pr-5">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-green/60">
                    <Image src={m.image} alt={m.name} fill className="object-cover" />
                  </div>
                  <span className="font-display text-sm font-bold uppercase text-cream">{m.name}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-10 inline-block rounded-full bg-green px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-turquoise transition hover:scale-105 hover:bg-coral"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

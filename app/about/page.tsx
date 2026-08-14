import type { Metadata } from 'next';
import Image from 'next/image';
import { team } from '@/lib/data';
import Sticker from '@/components/Sticker';
import ArrowIcon from '@/components/ArrowIcon';

export const metadata: Metadata = {
  title: 'About — Clickbait',
  description: 'Meet the three people behind Clickbait: Sophie, Max, and Haywood.',
};

const values = [
  'Off-script is our comfort zone',
  'We like kindness',
  'Serving you is why we show up',
  'Obsessively thoughtful',
];

export default function AboutPage() {
  return (
    <>
      {/* header */}
      <section className="relative overflow-hidden bg-pattern-dark pb-20 pt-40 text-cream md:pb-28 md:pt-48">
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <Sticker color="coral" rotate={-3} className="w-fit">About Us</Sticker>
          <h1 className="mt-6 max-w-3xl font-display text-6xl font-bold uppercase leading-[0.92] sm:text-7xl">
            A small studio,
            <br />
            built on <span className="text-green">purpose.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg text-cream/75">
            Clickbait is three people who&rsquo;d rather stay lean than get lost — a
            strategist, a filmmaker, and a designer, all in the same room as every idea.
          </p>
        </div>
      </section>

      {/* group photo — full-bleed, blending into green at the base */}
      <section className="relative h-[62vh] w-full overflow-hidden bg-green sm:h-[75vh] md:h-screen">
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
          }}
        >
          <Image
            src="/team/group.jpg"
            alt="Sophie, Max, and Haywood — the Clickbait team"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* individual breakdown */}
      <section className="bg-cream py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Sticker color="dark" rotate={2} className="w-fit">The People</Sticker>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold uppercase leading-[1.02] sm:text-5xl">
            Who&rsquo;s who, and what they actually do.
          </h2>

          <div className="mt-20 flex flex-col gap-24 md:gap-32">
            {team.map((member, i) => (
              <article
                key={member.slug}
                id={member.slug}
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="relative aspect-[4/3] w-full max-h-[65vh] overflow-hidden rounded-2xl sm:aspect-[5/4] md:aspect-[4/5] md:max-h-[560px]">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 45vw"
                  />
                  <ArrowIcon className="absolute right-5 top-5 h-9 w-9" variant="default" />
                </div>

                <div>
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-green">
                    0{i + 1} &mdash; {member.role}
                  </span>
                  <h3 className="mt-3 font-display text-5xl font-bold uppercase leading-none sm:text-6xl">
                    {member.name}
                  </h3>
                  <p className="mt-6 max-w-md text-lg text-turquoise/70">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* values recap */}
      <section className="bg-pattern-dark py-24 text-cream">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Sticker color="green" rotate={-2} className="w-fit">How we work</Sticker>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v} className="flex items-start gap-4 border-l-2 border-green/50 pl-5">
                <p className="font-display text-xl font-bold uppercase leading-snug sm:text-2xl">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

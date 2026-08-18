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
      {/* Reverted to original pt/pb alignment, kept min-h-dynamic-screen */}
      <section className="relative overflow-hidden bg-pattern-animated pb-20 pt-40 text-cream md:pb-28 md:pt-48 min-h-dynamic-screen">
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
      {/* Kept min-h-dynamic-screen so the photo fills the screen perfectly */}
      <section className="relative min-h-dynamic-screen w-full overflow-hidden bg-green">
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
          }}
        >
          {/* Mobile Image */}
          <Image
            src="/team/group-mobile.jpg"
            alt="Sophie, Max, and Haywood — the Clickbait team"
            fill
            className="object-cover md:hidden"
            priority
            sizes="100vw"
          />
          {/* Desktop Image */}
          <Image
            src="/team/group.jpg"
            alt="Sophie, Max, and Haywood — the Clickbait team"
            fill
            className="hidden object-cover md:block"
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
                  {/* Mobile gets its own crop (portrait-friendly framing) instead of
                      the desktop photo squeezed/cropped by object-cover. */}
                  <Image
                    src={member.mobileImage}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    className="object-cover md:hidden"
                    sizes="(max-width: 767px) 90vw, 0px" 
                  />
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    className="hidden object-cover md:block"
                    sizes="(min-width: 768px) 45vw, 0px"
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
      {/* Reverted to original py-24 alignment, kept min-h-dynamic-screen */}
      <section className="bg-pattern-animated py-24 text-cream min-h-dynamic-screen">
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
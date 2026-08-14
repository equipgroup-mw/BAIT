import ArrowShard from './ArrowShard';
import Sticker from './Sticker';

export default function VisionMission() {
  return (
    <section className="bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-20 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col justify-center">
            <Sticker color="green" rotate={-4} className="w-fit">Our Vision</Sticker>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.02] sm:text-5xl">
              To deliver bold, authentic marketing that tells stories.
            </h2>
            <p className="mt-6 max-w-sm text-lg text-turquoise/70">
              We tell stories that connect, perform, and push boundaries.
            </p>
          </div>
          <ArrowShard src="/team/sophie.jpg" alt="Strategy session in progress" tint="green" className="md:justify-self-end md:w-4/5" parallax={false} />
        </div>

        <div className="mt-24 grid gap-20 md:grid-cols-2 md:gap-8">
          <ArrowShard src="/team/max.jpg" alt="Creative direction in progress" tint="green" className="order-2 md:order-1 md:w-4/5" parallax={false} />
          <div className="order-1 flex flex-col justify-center md:order-2">
            <Sticker color="sand" rotate={3} className="w-fit">Our Mission</Sticker>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.02] sm:text-5xl">
              We help brands show up, stand out, and steal hearts.
            </h2>
            <p className="mt-6 max-w-sm text-lg text-turquoise/70">
              We blend smart strategy with killer creativity to craft content that
              actually connects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

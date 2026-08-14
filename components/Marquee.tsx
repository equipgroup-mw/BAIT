import ArrowIcon from './ArrowIcon';

const words = [
  'SOCIAL MEDIA',
  'CONTENT MARKETING',
  'PHOTO & VIDEO',
  'BRAND STRATEGY',
  'STORYTELLING',
];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y-2 border-turquoise bg-cream py-6">
      <div className="flex w-max animate-marquee items-center gap-10">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-3xl font-bold uppercase tracking-tight text-turquoise md:text-5xl">
              {w}
            </span>
            <ArrowIcon className="h-6 w-6 md:h-8 md:w-8" variant="default" />
          </span>
        ))}
      </div>
    </div>
  );
}

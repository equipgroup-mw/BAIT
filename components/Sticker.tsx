type Props = {
  children: React.ReactNode;
  color?: 'green' | 'coral' | 'sand' | 'cream' | 'dark';
  rotate?: number;
  className?: string;
};

const bg: Record<string, string> = {
  green: 'bg-green text-turquoise',
  coral: 'bg-coral text-turquoise',
  sand: 'bg-sand text-turquoise',
  cream: 'bg-cream text-turquoise',
  dark: 'bg-turquoise text-cream',
};

/** Tilted sticker/tag label — the brand's recurring "OUR VISION"-style badge. */
export default function Sticker({ children, color = 'green', rotate = -3, className = '' }: Props) {
  return (
    <span
      className={`inline-block px-4 py-1.5 font-display font-bold uppercase tracking-wide text-sm md:text-base ${bg[color]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

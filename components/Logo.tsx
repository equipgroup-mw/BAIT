type LogoProps = {
  variant?: 'light' | 'dark' | 'mono-light' | 'mono-dark';
  className?: string;
};

/**
 * Recreation of the Clickbait stacked wordmark: tilted "CLICK" tag over a
 * tilted "BAIT" tag, with the coral cursor-arrow kicking off the corner.
 */
export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const isMono = variant.startsWith('mono');
  const light = variant === 'light';
  const clickBg = isMono ? (variant === 'mono-light' ? '#ffffff' : '#003135') : '#ffffff';
  const clickText = isMono ? (variant === 'mono-light' ? '#003135' : '#ffffff') : '#003135';
  const baitBg = isMono ? (variant === 'mono-light' ? '#ffffff' : '#003135') : '#32B498';
  const baitText = isMono ? (variant === 'mono-light' ? '#003135' : '#ffffff') : '#003135';
  const arrow = isMono ? baitBg : '#FF8A59';

  return (
    <svg
      viewBox="0 0 220 100"
      className={className}
      role="img"
      aria-label="Clickbait"
    >
      <g transform="rotate(-4 110 50)">
        <rect x="14" y="14" width="176" height="40" fill={clickBg} />
        <text
          x="102"
          y="43"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight={700}
          fontSize="30"
          letterSpacing="1"
          fill={clickText}
        >
          CLICK
        </text>
      </g>
      <g transform="rotate(-4 110 50)">
        <rect x="58" y="52" width="118" height="34" fill={baitBg} />
        <text
          x="117"
          y="77"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight={700}
          fontSize="24"
          letterSpacing="1"
          fill={baitText}
        >
          BAIT
        </text>
      </g>
      <path d="M188 66 L206 74 L192 76 L196 90 Z" fill={arrow} />
    </svg>
  );
}

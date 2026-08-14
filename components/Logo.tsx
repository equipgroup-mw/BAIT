type LogoProps = {
  variant?: 'light' | 'dark' | 'mono-light' | 'mono-dark';
  className?: string;
};

/**
 * Logo image from the brand assets.
 */
export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const variantPath = variant === 'light' ? 'light' : variant === 'mono-light' ? 'mono-light' : variant === 'mono-dark' ? 'mono-dark' : 'dark';
  return (
    <img
      src={`/brand/Logo.png`}
      alt="Clickbait Logo"
      className={className}
      role="img"
    />
  );
}

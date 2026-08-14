type Props = {
  className?: string;
  fill?: string;
  style?: React.CSSProperties;
};

/** The brand's bold, stylized cursor-arrow icon. */
export default function ArrowIcon({ className = '', fill = '#FF8A59', style }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <path d="M8 4 L92 40 L54 50 L66 92 L44 100 L30 56 L4 78 Z" fill={fill} />
    </svg>
  );
}

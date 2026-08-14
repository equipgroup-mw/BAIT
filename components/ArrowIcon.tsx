type Props = {
  className?: string;
  fill?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'dark-turq' | 'light-turq';
};

/** The brand's bold, stylized cursor-arrow icon. */
export default function ArrowIcon({ className = '', fill = '#FF8A59', style, variant = 'default' }: Props) {
  const getSrc = () => {
    switch (variant) {
      case 'dark-turq':
        return '/brand/Arrow-icon-darkTurq.png';
      case 'light-turq':
        return '/brand/Arrow-icon-lightTurq.png';
      default:
        return '/brand/Arrow-icon-orange.png';
    }
  };

  return (
    <img
      src={getSrc()}
      alt="Arrow Icon"
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
}

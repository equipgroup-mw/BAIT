import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        turquoise: {
          DEFAULT: '#003135',
          dark: '#00191c',
        },
        green: {
          DEFAULT: '#32B498',
        },
        aqua: {
          DEFAULT: '#72C2B9',
        },
        coral: {
          DEFAULT: '#FF8A59',
        },
        cream: {
          DEFAULT: '#F6EBE2',
        },
        sand: {
          DEFAULT: '#D9B591',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      backgroundImage: {
        'arrow-grid':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cpath d='M8 4 L20 10 L14 12 L18 20 L14 22 L10 14 L4 18 Z' fill='%23ffffff' fill-opacity='0.06'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(var(--r,0deg))' },
          '50%': { transform: 'translateY(-14px) rotate(var(--r,0deg))' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

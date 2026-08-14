'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from './Logo';

const links = [
  { href: '/#services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

const TOP_THRESHOLD = 16;

export default function Nav() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < TOP_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        atTop
          ? 'translate-y-0 opacity-100 bg-transparent'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="w-28 md:w-32" aria-label="Clickbait home">
          <Logo className="w-full" />
        </Link>
        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="font-display text-sm font-bold uppercase tracking-wide text-cream/90 transition hover:text-coral"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          className="rounded-full bg-coral px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-turquoise transition hover:scale-105 hover:bg-white"
        >
          Let&rsquo;s talk
        </Link>
      </nav>
    </header>
  );
}

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

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-turquoise/80 backdrop-blur-lg shadow-lg shadow-black/10' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="w-28 md:w-32" aria-label="Clickbait home">
          <Logo variant="light" className="w-full" />
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

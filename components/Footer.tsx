import Link from 'next/link';
import Logo from './Logo';
import ArrowIcon from './ArrowIcon';

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-pattern-dark pt-24 text-cream">
      <div className="relative mx-auto max-w-7xl px-6 pb-14 md:px-10">
        <div className="grid gap-14 md:grid-cols-2 md:items-end">
          <div>
            <span className="font-display text-sm font-bold uppercase tracking-widest text-aqua">
              Got a story worth telling?
            </span>
            <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] md:text-7xl">
              Let&rsquo;s make
              <br />
              them <span className="text-coral">click.</span>
            </h2>
            <a
              href="mailto:info@clickbait.com"
              className="mt-8 inline-block rounded-full bg-green px-8 py-4 font-display text-base font-bold uppercase tracking-wide text-turquoise transition hover:scale-105 hover:bg-coral"
            >
              info@clickbait.com
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 md:justify-items-end md:text-right">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-widest text-aqua">Studio</p>
              <ul className="mt-3 space-y-2 text-sm text-cream/85">
                <li><Link href="/about" className="hover:text-coral">About</Link></li>
                <li><Link href="/work" className="hover:text-coral">Work</Link></li>
                <li><Link href="/#services" className="hover:text-coral">Services</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-widest text-aqua">Follow</p>
              <ul className="mt-3 space-y-2 text-sm text-cream/85">
                <li><a href="https://www.instagram.com/only_clickbait" className="hover:text-coral">Instagram</a></li>
                <li><a href="https://www.linkedin.com/company/only-clickbait/" className="hover:text-coral">LinkedIn</a></li>
                <li><a href="tel:+265885303239" className="hover:text-coral">+265 885 303 239</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-cream/15 pt-8 md:flex-row">
          <div className="w-28"><Logo variant="light" className="w-full" /></div>
          <p className="flex items-center gap-2 text-xs text-cream/60">
            <ArrowIcon className="h-3 w-3" variant="light-turq" />
            &copy; {new Date().getFullYear()} Clickbait. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import OrientationGate from '@/components/OrientationGate';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

// Using next/font/local to load your custom font from the components subfolder
const metropolitano = localFont({
  src: '../components/metropolitano.extrabold.ttf', // Adjust path if your tsconfig "components" alias points elsewhere
  weight: '800',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Clickbait — Bold, authentic marketing that tells stories.',
  description:
    'Clickbait is a marketing and media studio helping brands show up, stand out, and steal hearts through social, content, strategy, and photo & video.',
  metadataBase: new URL('https://clickbait.com'),
  openGraph: {
    title: 'Clickbait — We turn brand stories into love stories.',
    description: 'Social media, content marketing, strategy, and photo & video — from a studio built on bold, authentic storytelling.',
    images: ['/team/hero.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${metropolitano.variable}`}>
      <body className="bg-cream font-body text-turquoise antialiased">
        <SmoothScroll>
          {/* Wrap everything in OrientationGate so tablets in portrait mode get the rotate prompt */}
          <OrientationGate>
            <Nav />
            <main>{children}</main>
            <Footer />
          </OrientationGate>
        </SmoothScroll>
      </body>
    </html>
  );
}
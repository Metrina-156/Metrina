import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'METRINA |',
  description: 'Elite Web Developer Portfolio - Bespoke, technically sophisticated web experiences.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <CustomCursor />
        <SmoothScroll>
          <Navigation />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

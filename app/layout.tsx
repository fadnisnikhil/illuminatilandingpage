import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import './components/custom.css';
import AgeVerification from '../components/age-verification';
import Navigation from '../components/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Illuminati Energy Drink - Energize Your Mind',
  description: 'Discover Illuminati Energy Drink - the premium energy drink for those who seek enlightenment and peak performance.',
  keywords: 'energy drink, illuminati, performance, caffeine, focus, endurance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <AgeVerification />
        <Navigation />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
} 
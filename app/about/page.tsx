import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { RainbowGrid } from '@/components/gsap/RainbowGrid';
import { AboutHero } from './components/AboutHero';
import { JourneySection } from './components/JourneySection';
import { VenturesSection } from './components/VenturesSection';
import { LifeSection } from './components/LifeSection';
import { CreationSection } from './components/CreationSection';
import { NowSection } from './components/NowSection';

export const metadata: Metadata = {
  title: 'About | John Ellison — Systems Thinker, Artist, Spiritual Inquirer',
  description: 'From tech founder to regenerative visionary. 16 years building, 300+ founders supported, $18M+ raised. Now helping companies transform with AI.',
  openGraph: {
    type: 'website',
    url: 'https://john-ellison.com/about',
    title: 'About John Ellison — Systems Thinker, Artist, Spiritual Inquirer',
    description: 'From tech founder to regenerative visionary. 16 years building, 300+ founders supported, $18M+ raised.',
    images: ['https://john-ellison.com/og-image.jpg'],
  },
};

export default function AboutPage() {
  return (
    <>
      <RainbowGrid />
      <Navigation />

      <main className="relative z-10 pt-20">
        <AboutHero />
        <JourneySection />
        <LifeSection />
        <VenturesSection />
        <CreationSection />
        <NowSection />
      </main>

      <Footer />
    </>
  );
}

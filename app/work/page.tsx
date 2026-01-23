import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { RainbowGrid } from '@/components/gsap/RainbowGrid';
import { WorkHero } from './WorkHero';
import { ProjectsGrid } from './ProjectsGrid';
import { VenturesGrid } from './VenturesGrid';
import { AngelInvestingSection } from './AngelInvestingSection';

export const metadata: Metadata = {
  title: 'Work | John Ellison — Portfolio & Case Studies',
  description: 'Selected projects and ventures from 16 years of building products, scaling teams, and transforming organizations. From civic tech to climate finance.',
  openGraph: {
    type: 'website',
    url: 'https://john-ellison.com/work',
    title: 'Work | John Ellison — Portfolio & Case Studies',
    description: 'Selected projects and ventures from 16 years of building products, scaling teams, and transforming organizations.',
    images: ['https://john-ellison.com/og-image.jpg'],
  },
};

export default function WorkPage() {
  return (
    <>
      <RainbowGrid />
      <Navigation />

      <main className="relative z-10 pt-20">
        <WorkHero />
        <ProjectsGrid />
        <VenturesGrid />
        <AngelInvestingSection />
      </main>

      <Footer />
    </>
  );
}

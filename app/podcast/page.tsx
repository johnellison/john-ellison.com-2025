import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { RainbowGrid } from '@/components/gsap/RainbowGrid';
import { PodcastHero } from './PodcastHero';
import { PodcastContent } from './PodcastContent';

export const metadata: Metadata = {
  title: 'The John Ellison Show — Ancient Wisdom Meets Modern Technology',
  description: 'Exploring how we build regenerative futures through AI, Indigenous knowledge, and first principles thinking.',
  openGraph: {
    type: 'website',
    url: 'https://john-ellison.com/podcast',
    title: 'The John Ellison Show — Ancient Wisdom Meets Modern Technology',
    description: 'Exploring how we build regenerative futures through AI, Indigenous knowledge, and first principles thinking.',
    images: ['https://john-ellison.com/og-image.jpg'],
  },
};

export default function PodcastPage() {
  return (
    <>
      <RainbowGrid />
      <Navigation />

      <main className="relative z-10 pt-20">
        <PodcastHero />
        <PodcastContent />
      </main>

      <Footer />
    </>
  );
}

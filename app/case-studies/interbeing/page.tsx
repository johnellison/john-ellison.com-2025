import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { RainbowGrid } from '@/components/gsap/RainbowGrid';
import { InterbeingContent } from './InterbeingContent';

export const metadata: Metadata = {
  title: 'Interbeing Case Study | AI-Powered Habit Tracking Meets Planetary Impact',
  description: 'A case study on building an AI-powered habit tracker that connects personal behavior change to verified planetary impact in 2 weeks with $80.',
  openGraph: {
    type: 'website',
    url: 'https://john-ellison.com/case-studies/interbeing',
    title: 'Interbeing Case Study | John Ellison',
    description: 'AI-powered habit tracking meets planetary impact. Built in 2 weeks with $80.',
    images: ['https://john-ellison.com/images/interbeing-desert-mockup-16x9 Large.jpeg'],
  },
};

export default function InterbeingCaseStudy() {
  return (
    <>
      <RainbowGrid />
      <Navigation />

      <main className="relative z-10 pt-20">
        <InterbeingContent />
      </main>

      <Footer />
    </>
  );
}

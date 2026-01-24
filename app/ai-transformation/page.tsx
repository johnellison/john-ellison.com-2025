import type { Metadata } from 'next';
import { RainbowGrid } from '@/components/gsap/RainbowGrid';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ApproachSection } from './components/ApproachSection';
import { LandscapeSection } from './components/LandscapeSection';
import { PhasesSection } from './components/PhasesSection';
import { TeamSection } from './components/TeamSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { OutcomesSection } from './components/OutcomesSection';
import { AssessmentSection } from './components/AssessmentSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import ExitIntentPopup from '@/components/ExitIntentPopup';

export const metadata: Metadata = {
  title: 'AI Transformation — From AI Curiosity to Systems Deployed in 4-8 Weeks',
  description: 'We help real businesses actually adopt AI—not just prototype it. Strategy, governance, and deployed systems that get used. For companies $1M-$50M revenue, 10-200 employees.',
  keywords: 'AI transformation, AI adoption, AI strategy, AI governance, enterprise AI, AI consulting, AI implementation',
  authors: [{ name: 'John Ellison & Fatma Ghedira' }],
  openGraph: {
    type: 'website',
    url: 'https://john-ellison.com/ai-transformation',
    title: 'AI Transformation — From AI Curiosity to Deployed Systems in 4-8 Weeks',
    description: 'We help real businesses actually adopt AI—not just prototype it. Strategy, governance, and deployed systems that get used.',
    images: ['https://john-ellison.com/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Transformation — From AI Curiosity to Deployed Systems in 4-8 Weeks',
    description: 'We help real businesses actually adopt AI—not just prototype it. Strategy, governance, and deployed systems that get used.',
  },
};

export default function AITransformationPage() {
  return (
    <>
      <RainbowGrid />
      <main className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <ApproachSection />
        <LandscapeSection />
        <PhasesSection />
        <TeamSection />
        <CaseStudiesSection />
        <OutcomesSection />
        <AssessmentSection />
        <FAQSection />
        <CTASection />
      </main>

      {/* Exit Intent Popup for Whitepaper */}
      <ExitIntentPopup />
    </>
  );
}

import type { Metadata } from 'next';
import { RainbowGrid } from '@/components/gsap/RainbowGrid';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionOverviewSection } from './components/SolutionOverviewSection';
import { WorkflowTransformationSection } from './components/WorkflowTransformationSection';
import { PhasesSection } from './components/PhasesSection';
import { TeamSection } from './components/TeamSection';
import { AssessmentSection } from './components/AssessmentSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';

export const metadata: Metadata = {
  title: 'Executive AI Transformation — Reclaim 25+ Hours Per Week',
  description: 'Transform your personal productivity with AI. We rebuild your personal operating system with AI-powered workflows for email, calendar, meetings, and more. For executives and founders ready to multiply their impact.',
  keywords: 'executive AI, personal productivity AI, AI executive assistant, AI transformation, productivity automation, executive coaching, AI workflows',
  authors: [{ name: 'John Ellison' }],
  openGraph: {
    type: 'website',
    url: 'https://john-ellison.com/executive-ai-transformation',
    title: 'Executive AI Transformation — Reclaim 25+ Hours Per Week',
    description: 'Transform your personal productivity with AI. We rebuild your personal operating system with AI-powered workflows.',
    images: ['https://john-ellison.com/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive AI Transformation — Reclaim 25+ Hours Per Week',
    description: 'Transform your personal productivity with AI. We rebuild your personal operating system with AI-powered workflows.',
  },
};

export default function ExecutiveAITransformationPage() {
  return (
    <>
      <RainbowGrid />
      <main className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <SolutionOverviewSection />
        <WorkflowTransformationSection />
        <PhasesSection />
        <TeamSection />
        <AssessmentSection />
        <FAQSection />
        <CTASection />
      </main>
    </>
  );
}

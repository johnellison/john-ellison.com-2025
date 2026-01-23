'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import Link from 'next/link';

const metrics = [
  { value: '2 weeks', label: 'Timeline' },
  { value: '$80', label: 'Total Budget' },
  { value: 'AI + Impact', label: 'Core Innovation' },
];

const techStack = [
  { category: 'Frontend', items: 'React SPA, TailwindCSS' },
  { category: 'Backend', items: 'Express API' },
  { category: 'Database', items: 'Postgres (Neon), Drizzle ORM' },
  { category: 'AI', items: 'OpenAI API with custom RAG' },
  { category: 'Impact API', items: 'GreenSpark' },
  { category: 'Platform', items: 'Replit' },
];

const features = [
  {
    icon: '🤖',
    title: 'AI Behavioral Coaching',
    description: 'Personalized recommendations grounded in evidence-based Tiny Habits methodology',
  },
  {
    icon: '🌍',
    title: 'Verified Planetary Impact',
    description: 'Tree planting, plastic rescue, clean water, bee protection. See exact locations on map.',
  },
  {
    icon: '🏆',
    title: 'Personalized Achievements',
    description: 'Custom interface elements that adapt to user goals and celebrate milestones uniquely',
  },
  {
    icon: '💚',
    title: 'Emotional Wellbeing',
    description: 'Mood tracking correlated with behavior patterns over time',
  },
];

export function InterbeingContent() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    gsap.from('.hero-content', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from('.metric-card', {
      scrollTrigger: {
        trigger: '.metrics-grid',
        start: 'top 85%',
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });

    gsap.from('.content-section', {
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="hero-content text-center mb-12">
            {/* Back Link */}
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Work
            </Link>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] mb-6">
              <span className="type-sm text-white/60">Case Study</span>
            </div>

            {/* Title */}
            <h1 className="heading-hero mb-6">
              Interbeing: AI-Powered Habit Tracking{' '}
              <span className="text-gradient-prism">Meets Planetary Impact</span>
            </h1>

            {/* Subtitle */}
            <p className="type-lg text-white/60 max-w-2xl mx-auto mb-4">
              Solo Founder, Product Designer & Developer
            </p>
          </div>

          {/* Metrics */}
          <div className="metrics-grid grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="metric-card text-center p-6 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="type-2xl font-display font-bold text-gradient-prism mb-2">
                  {metric.value}
                </div>
                <div className="type-sm text-white/50 uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.1]">
            <Image
              src="/images/interbeing-desert-mockup-16x9 Large.jpeg"
              alt="Interbeing App Mockup"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="px-6 py-12 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* The Concept */}
          <div className="content-section mb-16">
            <h2 className="heading-section mb-6">The Concept</h2>
            <p className="type-lg text-white/70 leading-relaxed">
              An AI-powered habit tracker that connects personal behavior change to verified planetary
              impact—see exactly where your trees are planted, plastic is removed, or bees are protected
              on a map.
            </p>
          </div>

          {/* The Challenge */}
          <div className="content-section mb-16 p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
            <h2 className="heading-section mb-4">The Challenge</h2>
            <p className="type-base text-white/70">
              Traditional habit apps focus only on personal achievement. Users seeking environmental
              impact can&apos;t verify where their contributions go or see tangible results.
            </p>
          </div>

          {/* Technology Stack */}
          <div className="content-section mb-16">
            <h2 className="heading-section mb-6">Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.category}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <div className="type-sm text-purple-400 mb-1">{tech.category}</div>
                  <div className="type-base text-white/80">{tech.items}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Design & Development Process */}
          <div className="content-section mb-16">
            <h2 className="heading-section mb-8">Design & Development Process</h2>

            <div className="space-y-8">
              <div className="pl-6 border-l-2 border-purple-500/50">
                <h3 className="heading-card text-purple-400 mb-2">Phase 1: Brand Development & Product Design (1 day)</h3>
                <p className="type-base text-white/60">
                  Used ChatGPT for concept generation and Midjourney for visual inspiration. Built brand
                  identity and product specs in Figma, including complete visual identity, mobile-first
                  user flows, core screens, and personalized achievement system design.
                </p>
              </div>

              <div className="pl-6 border-l-2 border-purple-500/50">
                <h3 className="heading-card text-purple-400 mb-2">Phase 2: AI Coach Development (1 day)</h3>
                <p className="type-base text-white/60">
                  Built custom GPT clone trained on BJ Fogg&apos;s Tiny Habits principles using a simple RAG
                  implementation. The system queries a behavior design knowledge base before generating
                  personalized recommendations.
                </p>
              </div>

              <div className="pl-6 border-l-2 border-purple-500/50">
                <h3 className="heading-card text-purple-400 mb-2">Phase 3: Core Feature Development (2-3 days)</h3>
                <p className="type-base text-white/60">
                  Developed habit tracking with streak visualization, GreenSpark API integration for
                  verified impact, interactive map showing contribution locations, timeline of all impact
                  actions, daily emotion tracking, and personalized achievement system.
                </p>
              </div>

              <div className="pl-6 border-l-2 border-purple-500/50">
                <h3 className="heading-card text-purple-400 mb-2">Phase 4: Testing & Iteration (1-2 days)</h3>
                <p className="type-base text-white/60">
                  Personal testing, bug fixes, mobile optimization, and UI refinement based on usability issues.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="content-section mb-16">
            <h2 className="heading-section mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="heading-card text-white mb-2">{feature.title}</h3>
                  <p className="type-sm text-white/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results & Learnings */}
          <div className="content-section mb-16">
            <h2 className="heading-section mb-8">Results & Learnings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                <h3 className="heading-card text-green-400 mb-4">What Worked</h3>
                <ul className="space-y-2 type-sm text-white/70">
                  <li>• Rapid prototyping: Concept to functional prototype in 2 weeks</li>
                  <li>• Validated core hypothesis: Users want verified impact alongside habits</li>
                  <li>• Skill development: Learned modern dev workflows, AI integration</li>
                  <li>• AI-assisted development: Built features beyond previous technical ability</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                <h3 className="heading-card text-red-400 mb-4">What Didn&apos;t Work</h3>
                <ul className="space-y-2 type-sm text-white/70">
                  <li>• Never reached production readiness (no payment integration)</li>
                  <li>• Hit technical complexity ceiling without engineering support</li>
                  <li>• Replit hosting costs ($25/month) unsustainable for demo</li>
                  <li>• No monetization validation</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="heading-card text-white mb-4">Key Insights</h3>
              <p className="type-base text-white/70 mb-4">
                <strong className="text-white">Vibe coding is powerful for MVPs</strong> — Tools like Replit
                enable rapid hypothesis validation, but production applications require professional
                engineering, proper infrastructure, and scalable hosting.
              </p>
              <p className="type-base text-white/70">
                This project demonstrated that the barrier to building has dramatically lowered—a
                non-engineer can build a multi-faceted application integrating AI, APIs, and complex
                user flows in two weeks with $80.
              </p>
            </div>
          </div>

          {/* If I Built This Again */}
          <div className="content-section mb-16 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <h2 className="heading-section mb-4">If I Built This Again</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="type-base font-bold text-white mb-2">Technology:</h4>
                <p className="type-base text-white/70">Swift native iOS with Cursor/Claude Code</p>
              </div>
              <div>
                <h4 className="type-base font-bold text-white mb-2">Process:</h4>
                <ul className="type-sm text-white/70 space-y-1">
                  <li>• Comprehensive product spec upfront</li>
                  <li>• Strict MVP boundaries</li>
                  <li>• Plan production architecture from beginning</li>
                  <li>• Bring in senior engineer as coach</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Project Status */}
          <div className="content-section text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <p className="type-base text-white/70 mb-2">
              <strong className="text-white">Project Status:</strong> Demo/Portfolio Project
            </p>
            <p className="type-sm text-white/50">
              Demo available upon request in Replit environment
            </p>
          </div>

          {/* Back to Work CTA */}
          <div className="text-center mt-12">
            <Link href="/work" className="btn-secondary inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

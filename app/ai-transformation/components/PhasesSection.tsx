'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import Link from 'next/link';

const phases = [
  {
    number: 'Phase 1',
    title: 'AI Readiness & Strategy',
    duration: '1-2 weeks',
    price: '$10,000-$20,000',
    description:
      "Assess your organization's AI readiness, surface resistance, establish governance, and identify the highest-impact opportunities.",
    features: [
      'Organizational AI readiness assessment',
      'Leadership alignment + resistance surfacing',
      'Governance + policy scaffolding',
      'Opportunity mapping across workflows',
      'Technical feasibility review',
      'Change-management framing',
      'Build roadmap with prioritization',
      'Strategic recommendations report',
    ],
    cta: 'Start With Strategy',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    number: 'Phase 2',
    title: 'AI Product Sprint(s)',
    duration: '2-4 weeks',
    price: '$25,000-$50,000',
    description:
      'Build and deploy 1-2 real AI tools—internal or customer-facing—integrated into your existing stack with full enablement.',
    features: [
      '1-2 production AI tools built and deployed',
      'Integration into existing stack',
      'Team enablement and training',
      'Full documentation and handoff',
      'Iteration cycle based on usage',
      'Integration into daily operations',
      'Post-launch support period',
      'Stakeholder adoption sessions',
    ],
    cta: 'Ready to Build',
    gradient: 'from-blue-500 to-cyan-500',
  },
];

export function PhasesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate header elements
    gsap.from('.phases-label', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.from('.phases-title', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: 'power2.out',
    });

    gsap.from('.phases-text', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.out',
    });

    // Animate phase cards
    gsap.from('.phase-card', {
      scrollTrigger: {
        trigger: '.phase-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef as any} id="phases" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="phases-label inline-block text-sm font-medium tracking-widest text-gray-400 uppercase mb-4">
          Engagement Structure
        </span>
        <h2 className="phases-title text-3xl md:text-5xl font-bold mb-4">
          Two Phases. <span className="text-gradient-prism">Clear Outcomes</span>.
        </h2>
        <p className="phases-text text-lg text-gray-400 max-w-2xl mb-16">
          Phase 1 establishes readiness. Phase 2 builds and deploys. You can start with Phase 1
          only if you're early in your AI journey.
        </p>

        <div className="phase-grid grid md:grid-cols-2 gap-8">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="phase-card relative bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden"
            >
              {/* Top gradient border */}
              <div className={`h-1 w-full bg-gradient-to-r ${phase.gradient}`} />

              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <span className="inline-block text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">
                    {phase.number}
                  </span>
                  <h3 className="text-2xl font-bold mb-3">{phase.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-400 mb-4">
                    <span>{phase.duration}</span>
                    <span>{phase.price}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{phase.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {phase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-gray-300">
                      <span className="text-green-500 mt-1">&#10003;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="block w-full text-center bg-white text-black font-semibold py-4 px-6 rounded-full hover:bg-gray-200 transition-all duration-300"
                >
                  {phase.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

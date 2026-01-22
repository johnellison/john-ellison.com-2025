'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import Link from 'next/link';

const phases = [
  {
    number: 'Phase 1',
    title: 'Readiness & Strategy',
    image: '/images/ai-transformation/ai-readiness-strategy.png',
    description:
      "Assess your organization's AI readiness, surface resistance, establish governance, and identify the highest-impact opportunities.",
    features: [
      'Organizational AI readiness assessment',
      'Leadership alignment + resistance surfacing',
      'Governance + policy scaffolding',
      'Opportunity mapping across workflows',
      'Technical feasibility review',
      'Strategic recommendations report',
    ],
    cta: 'Take Free Assessment',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    number: 'Phase 2',
    title: 'Product Sprint',
    image: '/images/ai-transformation/john-ai-sprint-session.jpg',
    description:
      'In 2-4 weeks, we ship a real AI product with real data, tested by your users and deployed on your infrastructure. We also teach product teams how to deliver this methodology.',
    features: [
      'Design Sprint methodology',
      'AI-assisted development for rapid iteration',
      'Daily standups and weekly demos',
      'Fully moderated user testing',
      'Production-ready deployment',
      'Full documentation and handover',
    ],
    cta: 'Learn More',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: 'Phase 3',
    title: 'Adoption & Integration',
    image: '/images/ai-transformation/fatma-workshop-circle.webp',
    description:
      'Before we build, we align. During the build, we coach. After we ship, we integrate.',
    features: [
      'Stakeholder mapping and alignment',
      'Fear and resistance addressed proactively',
      'Role clarity in human-AI workflows',
      'Executive coaching and support',
      'Change management integration',
    ],
    cta: 'Learn More',
    gradient: 'from-purple-500 to-pink-500',
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
    <section ref={sectionRef as any} id="phases" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-900/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <span className="phases-label inline-block type-sm font-medium tracking-widest text-gray-400 uppercase mb-4">
          Engagement Structure
        </span>
        <h2 className="phases-title heading-section mb-10">
          Three <span className="text-gradient-prism">Distinct Phases</span>.
        </h2>
        <p className="phases-text type-lg text-gray-400 max-w-2xl mb-16 leading-relaxed">
          A complete transformation journey. From strategy to build to adoption.
        </p>

        <div className="phase-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="phase-card flex flex-col h-full bg-[#0a0a0f] rounded-2xl border border-gray-800 overflow-hidden group hover:border-gray-700 transition-all duration-300 shadow-2xl"
            >
              {/* Image Area */}
              <div className="relative h-56 overflow-hidden bg-gray-900 border-b border-white/5">
                <img
                  src={phase.image}
                  alt={phase.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle bottom fade only */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10 opacity-60" />

                {/* Phase Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-block px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold uppercase tracking-wider text-white">
                    {phase.number}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow relative z-20">

                {/* Content */}
                <div className="mb-6 pt-2">
                  <h3 className="heading-card mb-2 text-white group-hover:text-violet-400 transition-colors">
                    {phase.title}
                  </h3>

                  <p className="text-gray-300 type-base leading-relaxed mb-6 min-h-[5rem]">
                    {phase.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {phase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-gray-400 type-sm">
                      <span className={`text-${phase.gradient.split('-')[1]}-400 mt-1`}>✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto">
                  <Link
                    href="/contact"
                    className="block w-full py-4 px-6 text-center rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-wider"
                  >
                    {phase.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

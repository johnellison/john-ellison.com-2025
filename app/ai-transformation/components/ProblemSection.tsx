'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const problemCards = [
  {
    icon: '?',
    title: 'Stuck at Experimentation',
    description: "Most companies have done little more than deploy ChatGPT. They are late, confused, and stuck cycling through pilots that never become production systems.",
  },
  {
    icon: '!',
    title: 'Board Pressure, No Strategy',
    description: "Leadership is demanding an AI strategy, but the organization doesn't know where to start. They're skeptical of consultants selling hype without substance.",
  },
  {
    icon: 'X',
    title: 'Internal Resistance',
    description: 'Fear, confusion, and resistance block adoption. Without proper change management, even good AI tools get shelved or sabotaged.',
  },
  {
    icon: '0',
    title: 'No ROI, No Governance',
    description: 'Disconnected experiments with no measurable outcomes. No policies. No security framework. No clear ownership or accountability.',
  },
];

const icpOrganization = [
  '$1M-$50M annual revenue',
  '10-200 employees',
  'Operations-heavy business',
  'Service, agency, media, SaaS, or platform',
  'Already using Notion, Airtable, HubSpot, Zapier, or Google Workspace',
];

const icpSituation = [
  'AI-curious but late to adoption',
  'Board or leadership asking for AI strategy',
  'Concerned about governance and risk',
  'Want operational leverage, not AI theater',
  'Time-poor, outcome-driven',
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate the label
    gsap.from('.problem-label', {
      scrollTrigger: {
        trigger: '.problem-label',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Animate the title
    gsap.from('.problem-title', {
      scrollTrigger: {
        trigger: '.problem-title',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Animate the text
    gsap.from('.problem-text', {
      scrollTrigger: {
        trigger: '.problem-text',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Animate problem cards
    gsap.from('.problem-card', {
      scrollTrigger: {
        trigger: '.problem-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });

    // Animate ICP card
    gsap.from('.icp-card', {
      scrollTrigger: {
        trigger: '.icp-card',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} id="problem" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <span className="problem-label block font-sans type-sm font-medium tracking-widest uppercase text-violet-400 mb-4 text-center">
          The Problem
        </span>

        <h2 className="problem-title heading-section text-white text-center mb-6">
          <span className="text-gradient-prism">AI Adoption</span> is Failing Across Organizations
        </h2>

        <p className="problem-text type-lg text-white/60 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
          The problem is not building AI tools. The problem is that AI is not getting adopted inside organizations.
          Prototypes never ship. Tools never get used. There&apos;s no governance, no strategy, no integration into operations.
        </p>

        {/* Problem Cards Grid */}
        <div className="problem-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {problemCards.map((card, index) => (
            <div
              key={index}
              className="problem-card bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 transition-all duration-300 hover:border-violet-500/30 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 type-lg bg-gradient-to-br from-red-400/20 to-red-400/5 text-red-400">
                {card.icon}
              </div>
              <h3 className="heading-card text-white mb-3">
                {card.title}
              </h3>
              <p className="type-sm text-white/60 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* ICP Card */}
        <div className="icp-card bg-white/[0.02] border border-white/[0.06] rounded-[20px] p-12 mt-12">
          <h3 className="heading-card text-white mb-6">
            Is This You?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Your Organization Column */}
            <div className="icp-column">
              <h4 className="heading-subsection text-white mb-4">
                Your Organization
              </h4>
              <ul className="space-y-2">
                {icpOrganization.map((item, index) => (
                  <li
                    key={index}
                    className="type-sm text-white/70 pl-6 relative"
                  >
                    <span className="absolute left-0 text-violet-400 font-bold">&gt;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Your Situation Column */}
            <div className="icp-column">
              <h4 className="heading-subsection text-white mb-4">
                Your Situation
              </h4>
              <ul className="space-y-2">
                {icpSituation.map((item, index) => (
                  <li
                    key={index}
                    className="type-sm text-white/70 pl-6 relative"
                  >
                    <span className="absolute left-0 text-violet-400 font-bold">&gt;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

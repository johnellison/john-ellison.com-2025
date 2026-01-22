'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const outcomes = [
  {
    icon: '+',
    title: 'AI Systems That Get Used',
    description:
      'Deployed into daily operations, not stuck in pilot decks or demo folders.',
  },
  {
    icon: '//',
    title: '10–20% Increased Output Per Employee (On AI‑Augmented Work)',
    description:
      'Measurable productivity gains on the specific workflows where AI is integrated into daily work.',
  },
  {
    icon: '$',
    title: '8–15% Reduced Operating Costs in Targeted Functions',
    description:
      'Concrete cost savings in support, back-office, or operations where AI automation is deployed.',
  },
  {
    icon: '>>',
    title: '20–50% Faster Product Cycles',
    description:
      'Faster research, prototyping, and iteration—hours of work compressed into minutes, weeks into days.',
  },
  {
    icon: '*',
    title: 'New Capabilities',
    description:
      "Internal tooling and customer-facing features that simply weren't feasible before AI.",
  },
  {
    icon: '[]',
    title: 'Governance Clarity',
    description:
      'Clear AI usage policies, security frameworks, and accountability structures that satisfy leadership and regulators.',
  },
];


export function OutcomesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate header elements
    gsap.from('.outcomes-label', {
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

    gsap.from('.outcomes-title', {
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

    gsap.from('.outcomes-text', {
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

    // Animate outcome cards
    gsap.from('.outcome-card', {
      scrollTrigger: {
        trigger: '.outcomes-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef as any} id="outcomes" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="outcomes-label inline-block type-sm font-medium tracking-widest text-gray-400 uppercase mb-4">
          Outcomes
        </span>
        <h2 className="outcomes-title heading-section mb-10">
          <span className="text-gradient-prism">What You Get</span>
        </h2>
        <p className="outcomes-text type-lg text-gray-400 max-w-2xl mb-16 leading-relaxed">
          We measure success by adoption and usage—not by how impressive the demo looks.
        </p>

        <div className="outcomes-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="outcome-card bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-800 type-lg font-mono font-bold text-white mb-4 group-hover:bg-gray-700 transition-colors duration-300">
                {outcome.icon}
              </div>
              <h4 className="heading-card mb-2">{outcome.title}</h4>
              <p className="text-gray-400 type-base leading-relaxed">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

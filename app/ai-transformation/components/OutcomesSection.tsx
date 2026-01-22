'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const outcomes = [
  {
    icon: '+',
    title: 'AI Systems That Get Used',
    description: 'Not prototypes in a folder. Tools in daily production use.',
  },
  {
    icon: '//',
    title: 'Increased Output Per Employee',
    description: 'Measurable productivity gains, not vague promises.',
  },
  {
    icon: '$',
    title: 'Reduced Operational Cost',
    description: 'Concrete cost savings you can track and report.',
  },
  {
    icon: '>>',
    title: 'Faster Workflows',
    description: 'Hours become minutes. Days become hours.',
  },
  {
    icon: '*',
    title: 'New Capabilities',
    description: "Internal tooling and customer-facing features you couldn't build before.",
  },
  {
    icon: '[]',
    title: 'Governance Clarity',
    description: 'Policies, security frameworks, and accountability structures.',
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
        <span className="outcomes-label inline-block text-sm font-medium tracking-widest text-gray-400 uppercase mb-4">
          Outcomes
        </span>
        <h2 className="outcomes-title text-3xl md:text-5xl font-bold mb-4">
          <span className="text-gradient-prism">What You Get</span>
        </h2>
        <p className="outcomes-text text-lg text-gray-400 max-w-2xl mb-16">
          We measure success by adoption and usage—not by how impressive the demo looks.
        </p>

        <div className="outcomes-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="outcome-card bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-800 text-xl font-mono font-bold text-white mb-4 group-hover:bg-gray-700 transition-colors duration-300">
                {outcome.icon}
              </div>
              <h4 className="text-lg font-semibold mb-2">{outcome.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

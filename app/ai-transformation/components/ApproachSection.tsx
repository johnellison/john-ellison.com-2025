'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const differentiators = [
  {
    title: 'Not a Workshop',
    description:
      "We don't leave you with slides. We leave you with deployed systems, trained teams, and documented processes.",
  },
  {
    title: 'Not an Innovation Lab',
    description:
      "We build for operations, not experiments. If it won't be used daily, we don't build it.",
  },
  {
    title: 'Not Automation-Only',
    description:
      'Zapier and no-code can only take you so far. We build real AI systems—custom, production-grade, scalable.',
  },
  {
    title: 'Not Hype',
    description:
      "We won't tell you AI will change the world. We'll tell you exactly where it will—and won't—help your specific business.",
  },
  {
    title: 'Change Management Built-In',
    description:
      "Adoption doesn't happen by accident. We address resistance, train teams, and align stakeholders before, during, and after the build.",
  },
  {
    title: 'Governance First',
    description:
      'Policies, security frameworks, and accountability structures come before the first line of code.',
  },
];

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate label
    gsap.from('.approach-label', {
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

    // Animate title
    gsap.from('.approach-title', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Animate description
    gsap.from('.approach-description', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    });

    // Animate cards with stagger
    gsap.from('.diff-card', {
      scrollTrigger: {
        trigger: '.diff-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="approach"
      className="py-24 px-6 bg-[#050507]"
    >
      <div className="max-w-6xl mx-auto">
        <span className="approach-label inline-block text-sm font-medium text-violet-400 tracking-wider uppercase mb-4">
          Our Approach
        </span>

        <h2 className="approach-title text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Strategy, Governance, and Build
          </span>
          <span className="text-white">—Combined</span>
        </h2>

        <p className="approach-description text-lg md:text-xl text-white/70 max-w-3xl mb-16">
          We do not run AI workshops. We do not build prototypes that live in a
          demo folder. We deliver AI systems that get deployed and used—with the
          organizational readiness to make adoption stick.
        </p>

        <div className="diff-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="diff-card bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-violet-500/30 transition-all duration-300"
            >
              <h4 className="text-lg font-semibold text-white mb-3">
                {item.title}
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

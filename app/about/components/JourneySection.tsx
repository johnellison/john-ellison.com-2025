'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

const journeyPhases = [
  {
    phase: 'Builder',
    period: '2015–2021',
    identity: 'Founder & technologist',
    description: 'Built products, raised capital, scaled teams. Founded Peak Democracy (acquired by OpenGov) and Goody (sold). Learned the craft of turning vision into shipped software.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    phase: 'Evangelist',
    period: '2021–2023',
    identity: 'ReFi thought leader',
    description: 'Shaped the regenerative finance narrative. Co-founded ReFi DAO, grew Toucan Protocol, wrote the definitive "What is ReFi?" essay. Built movements, not just products.',
    color: 'from-green-500 to-emerald-400',
  },
  {
    phase: 'Seeker',
    period: '2024–2025',
    identity: 'Artist & spiritual inquirer',
    description: 'Stepped back to step forward. Released music as John Dass, walked 854km to Maha Kumbh Mela, explored the intersection of ancient wisdom and modern consciousness.',
    color: 'from-purple-500 to-violet-400',
  },
  {
    phase: 'Integrated',
    period: '2025+',
    identity: 'John Ellison + John Dass',
    description: 'Returned with synthesis. Technology in service of transformation. AI as a tool for human flourishing. Regeneration as economic, ecological, psychological, and spiritual principle.',
    color: 'from-amber-500 to-orange-400',
  },
];

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.journey-title', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from('.journey-card', {
      scrollTrigger: {
        trigger: '.journey-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="journey-title text-center mb-16">
          <p className="type-sm uppercase tracking-widest text-white/40 mb-4">The Journey</p>
          <h2 className="heading-section mb-4">From Ashes to Regeneration</h2>
          <p className="type-base text-white/60 max-w-2xl mx-auto">
            A decade of building, burning out, and being reborn. Each phase shaped
            who I am today—a technologist with soul, a seeker who ships.
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="journey-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {journeyPhases.map((phase, index) => (
            <div
              key={phase.phase}
              className="journey-card group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              {/* Phase indicator */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${phase.color}`} />
                <span className="type-xs text-white/40 uppercase tracking-wider">{phase.period}</span>
              </div>

              {/* Phase title */}
              <h3 className="heading-card mb-2 text-white group-hover:text-gradient-prism transition-all duration-300">
                {phase.phase}
              </h3>

              {/* Identity */}
              <p className="type-sm text-white/70 mb-3 font-medium">
                {phase.identity}
              </p>

              {/* Description */}
              <p className="type-sm text-white/50 leading-relaxed">
                {phase.description}
              </p>

              {/* Step number */}
              <div className="absolute top-4 right-4 text-4xl font-bold text-white/[0.04] font-display">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

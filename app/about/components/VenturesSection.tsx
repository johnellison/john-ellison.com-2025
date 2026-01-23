'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

const stats = [
  { value: '16+', label: 'Years Building' },
  { value: '300+', label: 'Founders Supported' },
  { value: '$18M+', label: 'Capital Raised' },
  { value: '2', label: 'Successful Exits' },
];

const ventures = [
  {
    name: 'Peak Democracy',
    role: 'Founder',
    outcome: 'Acquired by OpenGov',
    description: 'Civic tech platform empowering community engagement in local government decision-making.',
    period: '2016-2018',
  },
  {
    name: 'Goodery',
    role: 'Founder',
    outcome: 'Active',
    description: 'Circular economy grocery connecting local growers with consumers through weekly organic produce subscriptions.',
    period: '2020-Present',
  },
  {
    name: 'Toucan Protocol',
    role: 'Head of Growth',
    outcome: 'Series A',
    description: 'Carbon tokenization infrastructure bringing carbon credits on-chain for transparent climate action.',
    period: '2021-2022',
  },
  {
    name: 'ReFi DAO',
    role: 'Co-founder',
    outcome: '50+ Local Nodes',
    description: 'Global coordination network for regenerative finance, catalyzing the movement through community building.',
    period: '2022-2024',
  },
];

export function VenturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.ventures-title', {
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

    gsap.from('.stat-item', {
      scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });

    gsap.from('.venture-card', {
      scrollTrigger: {
        trigger: '.ventures-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="ventures-title text-center mb-16">
          <p className="type-sm uppercase tracking-widest text-white/40 mb-4">Professional Journey</p>
          <h2 className="heading-section mb-4">Built to Transform</h2>
          <p className="type-base text-white/60 max-w-2xl mx-auto">
            Two decades of shipping products, scaling teams, and building movements.
            BJ Fogg Behavior Design trained (Stanford). Pattern recognition across industries.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item text-center p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="type-2xl font-display font-bold text-gradient-prism mb-2">
                {stat.value}
              </div>
              <div className="type-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Ventures Grid */}
        <div className="ventures-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {ventures.map((venture) => (
            <div
              key={venture.name}
              className="venture-card group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="heading-card text-white group-hover:text-gradient-prism transition-all duration-300">
                    {venture.name}
                  </h3>
                  <p className="type-sm text-white/50">{venture.role}</p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-white/[0.08] text-white/60 border border-white/[0.1]">
                  {venture.outcome}
                </span>
              </div>
              <p className="type-sm text-white/60 mb-3 leading-relaxed">
                {venture.description}
              </p>
              <p className="type-xs text-white/30">{venture.period}</p>
            </div>
          ))}
        </div>

        {/* Notable Work Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
          <h4 className="heading-subsection text-white mb-2">Seminal Work</h4>
          <p className="type-base text-white/70 mb-3">
            <strong className="text-white">&ldquo;What is ReFi?&rdquo;</strong> — The definitive explainer
            that shaped the regenerative finance movement. Published on Mirror.xyz in 2022,
            widely cited in investor pitches, university curricula, and industry discourse.
          </p>
          <a
            href="https://je.mirror.xyz/S-dpms92hw6aiacUHoL3f_iAnLVDvbEUOXw7wpy7JaU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Read the essay
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

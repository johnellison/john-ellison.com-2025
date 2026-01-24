'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

const stats = [
  { value: 16, suffix: '+', label: 'Years Building' },
  { value: 300, suffix: '+', label: 'Founders Supported' },
  { value: 18, prefix: '$', suffix: 'M+', label: 'Capital Raised' },
  { value: 2, suffix: '', label: 'Successful Exits' },
];

const ventures = [
  {
    name: 'Peak Democracy',
    role: 'Product Manager',
    outcome: 'Acquired by OpenGov',
    description: 'Civic tech platform empowering community engagement in local government decision-making.',
    period: '2016-2018',
    image: '/images/open-town-hall-mockup.jpeg',
  },
  {
    name: 'Goodery',
    role: 'Founder',
    outcome: 'Acquired',
    description: 'Circular economy grocery connecting local growers with consumers through weekly organic produce subscriptions.',
    period: '2020-2022',
    image: '/images/Goodery-Wide-Light-Bg Large.jpeg',
  },
  {
    name: 'Toucan Protocol',
    role: 'Head of Growth',
    outcome: 'Series A',
    description: 'Carbon tokenization infrastructure bringing carbon credits on-chain for transparent climate action.',
    period: '2021-2022',
    image: '/images/toucan-collage.jpeg',
  },
  {
    name: 'ReFi DAO',
    role: 'Co-founder',
    outcome: '50+ Local Nodes',
    description: 'Global coordination network for regenerative finance, catalyzing the movement through community building.',
    period: '2022-2024',
    image: '/images/refi-dao-cover-image.jpg',
  },
];

export function VenturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0));
  const hasAnimated = useRef(false);

  // Counter animation using IntersectionObserver for reliability
  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            stats.forEach((stat, index) => {
              const obj = { value: 0 };
              gsap.to(obj, {
                value: stat.value,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                  setAnimatedValues(prev => {
                    const newValues = [...prev];
                    newValues[index] = Math.round(obj.value);
                    return newValues;
                  });
                },
              });
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

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
        <div ref={statsRef} className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-item text-center p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="type-2xl font-display font-bold text-gradient-prism mb-2">
                {stat.prefix || ''}{animatedValues[index]}{stat.suffix}
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
              className="venture-card group rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] card-glow-hover card-gradient-border transition-all duration-300 overflow-hidden"
            >
              {/* Venture Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={venture.image}
                  alt={venture.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-3 right-3 px-3 py-1 text-xs rounded-full bg-black/50 backdrop-blur-sm text-white/80 border border-white/[0.1]">
                  {venture.outcome}
                </span>
              </div>
              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="heading-card text-white group-hover:text-gradient-prism transition-all duration-300">
                      {venture.name}
                    </h3>
                    <p className="type-sm text-white/50">{venture.role}</p>
                  </div>
                </div>
                <p className="type-sm text-white/60 mb-3 leading-relaxed">
                  {venture.description}
                </p>
                <p className="type-xs text-white/30">{venture.period}</p>
              </div>
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

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

export function WorkHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.from('.work-hero-title', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      .from('.work-hero-desc', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4')
      .from('.stat-item', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.3');
  }, []);

  return (
    <section ref={heroRef} className="px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="work-hero-title heading-section mb-6">
            Selected{' '}
            <span className="text-gradient-prism">Work</span>
          </h1>
          <p className="work-hero-desc type-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            From civic tech to climate finance, from solo builds to 50+ person movements.
            Here are the projects and ventures that shaped my craft.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="type-xl font-display font-bold text-gradient-prism mb-1">
                {stat.value}
              </div>
              <div className="type-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

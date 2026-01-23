'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

const investments = [
  {
    name: 'Terraformation',
    description: 'Reforestation infrastructure company building the tools and systems to restore forests at scale.',
    href: 'https://www.terraformation.com/',
    image: '/images/terraformation-homepage.png',
    stage: 'Series A',
  },
  {
    name: 'Pikl',
    description: 'UK\'s leading sharing economy insurance specialist, providing coverage for hosts, drivers, and gig workers.',
    href: 'https://pikl.com',
    image: '/images/pikl-wide-panel.jpeg',
    stage: 'Series A+',
  },
  {
    name: 'Monzo',
    description: 'Digital-first bank with 10M+ customers, pioneering mobile banking in the UK.',
    href: 'https://monzo.com/',
    image: '/images/monzo-homepage.png',
    stage: 'Series F',
  },
];

export function AngelInvestingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.angel-title', {
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

    gsap.from('.angel-card', {
      scrollTrigger: {
        trigger: '.angel-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-16 pb-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="angel-title mb-12">
          <p className="type-sm uppercase tracking-widest text-white/40 mb-3">Angel Investing</p>
          <h2 className="heading-section mb-4">Portfolio Companies</h2>
          <p className="type-base text-white/60 max-w-2xl">
            Backing founders building towards a regenerative future.
            Focused on climate tech, fintech, and companies creating positive systemic change.
          </p>
        </div>

        {/* Investments Grid */}
        <div className="angel-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {investments.map((investment) => (
            <a
              key={investment.name}
              href={investment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="angel-card group rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={investment.image}
                  alt={investment.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                  {investment.stage}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="heading-card text-white group-hover:text-gradient-prism transition-all duration-300 mb-2">
                  {investment.name}
                </h3>
                <p className="type-sm text-white/60 leading-relaxed line-clamp-2">
                  {investment.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-white/40 group-hover:text-purple-400 transition-colors">
                  <span>Visit website</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

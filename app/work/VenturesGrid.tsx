'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

const ventures = [
  {
    name: 'Peak Democracy',
    role: 'Founder',
    outcome: 'Acquired by OpenGov',
    description: 'Civic tech platform empowering community engagement in local government decision-making.',
    period: '2016-2018',
    href: 'https://opengov.com',
    image: '/images/open-town-hall-mockup.jpeg',
  },
  {
    name: 'Goodery',
    role: 'Founder',
    outcome: 'Active',
    description: 'Circular economy grocery connecting local growers with consumers through weekly organic produce subscriptions.',
    period: '2020-Present',
    href: 'https://goodery.co.uk',
    image: '/images/Goodery-Wide-Light-Bg Large.jpeg',
  },
  {
    name: 'Pikl',
    role: 'Design Lead',
    outcome: 'Series A+',
    description: 'Led rebrand and website redesign for the UK\'s leading sharing economy insurance specialist, now on their way to Series B.',
    period: '2018-Present',
    href: 'https://pikl.com',
    image: '/images/pikl-wide-panel.jpeg',
  },
  {
    name: 'Pravos',
    role: 'Founder',
    outcome: 'Active',
    description: 'AI-first consulting practice helping companies transform with AI. Strategy, governance, and deployed systems.',
    period: '2025-Present',
    href: 'https://pravos.xyz',
    image: '/images/pravos-cover-image-large.jpeg',
  },
  {
    name: 'Vibrana',
    role: 'Co-founder',
    outcome: 'Active',
    description: 'Educational program teaching AI-native product development through 5-day intensives.',
    period: '2025-Present',
    href: 'https://vibrana.ai',
    image: '/images/vibrana-homepage.png',
  },
  {
    name: 'Saraven',
    role: 'Founder',
    outcome: 'Active',
    description: 'Unified content marketing engine helping podcasters and bloggers distribute across platforms.',
    period: '2025-Present',
    href: 'https://saraven.app',
    image: '/images/saraven-homepage.png',
  },
];

export function VenturesGrid() {
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

    gsap.from('.venture-card', {
      scrollTrigger: {
        trigger: '.ventures-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-16 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="ventures-title mb-12">
          <p className="type-sm uppercase tracking-widest text-white/40 mb-3">Ventures</p>
          <h2 className="heading-section">Companies & Projects</h2>
        </div>

        {/* Ventures Grid */}
        <div className="ventures-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventures.map((venture) => {
            const isExternal = venture.href !== null;
            const WrapperComponent = isExternal ? 'a' : 'div';
            const wrapperProps = isExternal
              ? {
                  href: venture.href,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
              : {};

            return (
              <WrapperComponent
                key={venture.name}
                {...wrapperProps}
                className={`venture-card group rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden transition-all duration-300 ${isExternal ? 'hover:border-white/[0.12] cursor-pointer' : ''}`}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={venture.image}
                    alt={venture.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full border backdrop-blur-sm ${
                    venture.outcome === 'Active'
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-black/40 text-white/80 border-white/20'
                  }`}>
                    {venture.outcome}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className={`heading-card text-white transition-all duration-300 ${isExternal ? 'group-hover:text-gradient-prism' : ''}`}>
                        {venture.name}
                      </h3>
                      <p className="type-sm text-white/50">{venture.role}</p>
                    </div>
                  </div>
                  <p className="type-sm text-white/60 leading-relaxed mb-3 line-clamp-2">
                    {venture.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="type-xs text-white/30">{venture.period}</p>
                    {isExternal && (
                      <svg
                        className="w-4 h-4 text-white/30 group-hover:text-purple-400 transition-colors"
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
                    )}
                  </div>
                </div>
              </WrapperComponent>
            );
          })}
        </div>
      </div>
    </section>
  );
}

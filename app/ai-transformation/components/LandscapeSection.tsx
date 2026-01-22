'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const comparisonCards = [
  {
    icon: '$',
    iconBg: 'rgba(255, 100, 100, 0.1)',
    iconColor: '#ff6b6b',
    title: 'Big Consulting Firms',
    subtitle: 'McKinsey, Deloitte, BCG',
    items: [
      { label: 'High Cost', description: 'Engagements start at $300k+' },
      { label: 'Misaligned Incentives', description: 'Selling hours, not outcomes' },
      { label: 'Junior Teams', description: 'Associates learning on your dime' },
      { label: 'Outcome', description: 'Great slides, no deployed systems' },
    ],
    isHighlighted: false,
  },
  {
    icon: '☁️',
    iconBg: 'rgba(100, 200, 255, 0.1)',
    iconColor: '#64c8ff',
    title: 'Cloud Vendor Tools',
    subtitle: 'Microsoft, AWS, Google',
    items: [
      { label: 'Vendor Lock-in', description: 'Designed to sell cloud credits' },
      { label: 'Tech-First Bias', description: 'Ignores organizational culture' },
      { label: 'Generic', description: 'One-size-fits-all frameworks' },
      { label: 'Outcome', description: 'Infrastructure usage, not business value' },
    ],
    isHighlighted: false,
  },
  {
    icon: '✓',
    iconBg: 'rgba(124, 58, 237, 0.2)',
    iconColor: '#a78bfa',
    title: 'The Specialized Approach',
    subtitle: 'Our Methodology',
    items: [
      { label: 'Outcome Focused', description: 'We ship deployed systems' },
      { label: 'Psychology Backed', description: 'Addressing resistance first' },
      { label: 'Vendor Neutral', description: 'Best-in-class tools for your needs' },
      { label: 'Data-Backed', description: 'Assessment correlated to ROI' },
    ],
    isHighlighted: true,
  },
];

export function LandscapeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate label
    gsap.from('.landscape-label', {
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
    gsap.from('.landscape-title', {
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
    gsap.from('.landscape-description', {
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
    gsap.from('.landscape-card', {
      scrollTrigger: {
        trigger: '.landscape-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="landscape"
      className="py-24 px-6 bg-[#050507]"
    >
      <div className="max-w-6xl mx-auto">
        <span className="landscape-label inline-block text-sm font-medium text-violet-400 tracking-wider uppercase mb-4">
          The Market
        </span>

        <h2 className="landscape-title text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
          Why Traditional{' '}
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Options Fail
          </span>
        </h2>

        <p className="landscape-description text-lg md:text-xl text-white/70 max-w-3xl mb-16">
          The AI adoption market is split between expensive generalists and
          generic free tools. Neither delivers the specialized focus required
          for operational transformation.
        </p>

        <div className="landscape-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisonCards.map((card, index) => (
            <div
              key={index}
              className={`landscape-card rounded-2xl p-6 transition-all duration-300 ${
                card.isHighlighted
                  ? 'bg-violet-500/[0.05] border-2 border-violet-500/50 hover:border-violet-400/70'
                  : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/20'
              }`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mb-4"
                style={{ background: card.iconBg, color: card.iconColor }}
              >
                {card.icon}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {card.title}
              </h3>

              <p className="text-white font-medium mb-4">{card.subtitle}</p>

              <ul className="space-y-3">
                {card.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm">
                    <span className="font-semibold text-white/90">
                      {item.label}:
                    </span>{' '}
                    <span className="text-white/60">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const comparisonCards = [
  {
    image: '/images/ai-transformation/market-big-consulting.png',
    icon: '$',
    iconBg: 'rgba(255, 100, 100, 0.1)',
    iconColor: '#ff6b6b',
    borderColor: 'rgba(255, 100, 100, 0.2)',
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
    image: '/images/ai-transformation/market-cloud-vendors.png',
    icon: '☁️',
    iconBg: 'rgba(100, 200, 255, 0.1)',
    iconColor: '#64c8ff',
    borderColor: 'rgba(100, 200, 255, 0.2)',
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
    image: '/images/ai-transformation/market-specialized-approach.png',
    icon: '✓',
    iconBg: 'rgba(124, 58, 237, 0.2)',
    iconColor: '#a78bfa',
    borderColor: 'rgba(124, 58, 237, 0.5)',
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
    gsap.fromTo('.landscape-card',
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.landscape-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="landscape"
      className="py-24 px-6 bg-[#050507] relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center md:text-left mb-16">
          <span className="landscape-label inline-block type-sm font-medium text-violet-400 tracking-wider uppercase mb-4">
            The Market
          </span>

          <h2 className="landscape-title heading-section mb-6 text-white max-w-3xl">
            Why Traditional{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Options Fail
            </span>
          </h2>

          <p className="landscape-description type-lg text-white/70 max-w-2xl leading-relaxed">
            The AI adoption market is split between expensive generalists and
            generic free tools. Neither delivers the specialized focus required
            for operational transformation.
          </p>
        </div>

        <div className="landscape-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {comparisonCards.map((card, index) => (
            <div
              key={index}
              className={`landscape-card group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${card.isHighlighted
                ? 'bg-violet-950/10 shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] translate-y-[-8px] border border-violet-500/30'
                : 'bg-[#0A0A0E] border border-white/5 hover:border-white/10'
                }`}
            >
              {/* Highlight Specific Effects (Rainbow Grid) */}
              {card.isHighlighted && (
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `
                         linear-gradient(90deg, rgba(124,58,237,0.1) 1px, transparent 1px),
                         linear-gradient(180deg, rgba(59,130,246,0.1) 1px, transparent 1px)
                       `,
                    backgroundSize: '30px 30px'
                  }}
                />
              )}

              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] to-transparent z-10" />
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Content Section */}
              <div className="p-6 pt-0 flex flex-col grow relative z-10">
                {/* Icon Badge - Moved here to overlap border */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center -mt-7 mb-6 font-bold text-2xl backdrop-blur-md border border-white/10 shadow-lg relative z-20"
                  style={{
                    background: '#1a1a1a',
                    color: card.iconColor,
                    borderColor: card.borderColor || 'rgba(255,255,255,0.1)'
                  }}
                >
                  {card.icon}
                </div>

                <h3 className="heading-card text-white mb-1 group-hover:text-violet-200 transition-colors">
                  {card.title}
                </h3>
                <p className="text-white/50 text-sm font-medium mb-6 uppercase tracking-wider">{card.subtitle}</p>

                <ul className="space-y-4 mt-auto">
                  {card.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm border-t border-white/5 pt-3 first:border-0 first:pt-0">
                      <div className="font-semibold text-white/90 mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-white/60 leading-snug">
                        {item.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlight Border Overlay */}
              {card.isHighlighted && (
                <div className="absolute inset-0 rounded-2xl border border-violet-500/20 pointer-events-none ring-1 ring-violet-500/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

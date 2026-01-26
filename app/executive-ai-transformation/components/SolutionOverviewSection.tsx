'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import { Zap, Bot, ClipboardCheck, Check } from 'lucide-react';
import Image from 'next/image';

const tiers = [
  {
    icon: Zap,
    name: 'Executive AI Transformation',
    subtitle: 'Full-Service Package',
    price: '$10k',
    priceNote: ' (starting at)',
    description: 'We rebuild your personal operating system with AI. Custom workflows, integrations, training, and 30-day hypercare.',
    features: [
      'Email triage & smart replies',
      'Calendar optimization',
      'Meeting summaries & action extraction',
      'Document creation in your voice',
      'Custom AI toolkit design',
      'Executive training & documentation',
      '30-day hypercare support',
    ],
    timeline: '4-8 weeks',
    cta: 'Book Discovery Call',
    ctaLink: 'https://calendar.app.google/wirgV6a4Vcz7cZAcA',
    gradient: 'from-violet-500 to-purple-500',
    image: '/images/ai-transformation/solution-transformation-v2.png',
  },
  {
    icon: Bot,
    name: '24/7 AI Executive Assistant',
    subtitle: 'Ongoing Support',
    price: '$500',
    priceNote: '/month',
    description: 'An AI assistant that actually works—monitored and augmented by humans. Connected to all your communication channels.',
    features: [
      'Email, Slack, WhatsApp, SMS, Discord',
      'Web search & flight check-ins',
      'Travel & expense management',
      'Daily human oversight',
      'Monthly optimization calls',
      '99.9% uptime, 4-hour urgent response',
    ],
    timeline: 'Start in 1 week',
    cta: 'Start Pilot Week',
    ctaLink: 'https://calendar.app.google/wirgV6a4Vcz7cZAcA',
    gradient: 'from-blue-500 to-cyan-500',
    highlight: false,
    image: '/images/ai-transformation/solution-assistant-v2.png',
  },
  {
    icon: ClipboardCheck,
    name: 'AI Readiness Assessment',
    subtitle: 'Free Diagnostic',
    price: 'Free',
    priceNote: '',
    description: '15 questions to discover your AI archetype, identify your biggest time drains, and get personalized recommendations.',
    features: [
      '4 dimensions analyzed',
      'Personal AI archetype mapping',
      'Time savings estimate',
      'Custom recommendations',
      'Instant results',
    ],
    timeline: '3 minutes',
    cta: 'Take Assessment',
    ctaLink: '#assessment',
    gradient: 'from-emerald-500 to-teal-500',
    highlight: false,
    image: '/images/ai-transformation/solution-assessment-v2.png',
  },
];

export function SolutionOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.solution-label', {
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

    gsap.from('.solution-title', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: 'power2.out',
    });

    gsap.fromTo('.solution-card',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.solution-grid',
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
    <section ref={sectionRef} id="solution" className="py-24 px-6 bg-[#050507]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="solution-label inline-block px-4 py-2 type-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20 mb-6">
            Three Ways to Transform
          </span>
          <h2 className="solution-title heading-section text-white mb-6">
            Choose Your <span className="text-gradient-prism">Path Forward</span>
          </h2>
          <p className="type-lg text-white/60 max-w-2xl mx-auto">
            Whether you want full transformation, ongoing support, or just clarity on where to start.
          </p>
        </div>

        <div className="solution-grid grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div
                key={index}
                className={`solution-card relative flex flex-col bg-white/[0.03] border rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.05] ${tier.highlight
                  ? 'border-violet-500/50 shadow-lg shadow-violet-500/10'
                  : 'border-white/[0.08] hover:border-white/20'
                  }`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500 z-20" />
                )}

                {/* Card Top Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent z-10 opacity-90`} />
                  <div className={`absolute inset-0 bg-${tier.highlight ? 'violet' : 'blue'}-900/20 mix-blend-overlay z-10`} />
                  <Image
                    src={tier.image}
                    alt={tier.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${tier.gradient} bg-opacity-20`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="heading-subsection text-white">{tier.name}</h3>
                      <p className="type-sm text-white/50">{tier.subtitle}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="type-2xl font-bold text-white">{tier.price}</span>
                    <span className="type-sm text-white/50 ml-1">{tier.priceNote}</span>
                  </div>

                  {/* Description */}
                  <p className="type-base text-white/60 mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                        <span className="type-sm text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Timeline */}
                  <div className="text-center py-3 bg-white/[0.03] rounded-lg mb-6">
                    <span className="type-xs text-white/40 uppercase tracking-wider">Timeline: </span>
                    <span className="type-sm text-white/70">{tier.timeline}</span>
                  </div>

                  {/* CTA */}
                  <a
                    href={tier.ctaLink}
                    target={tier.ctaLink.startsWith('http') ? '_blank' : undefined}
                    rel={tier.ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`block w-full py-4 px-6 text-center rounded-lg text-sm font-medium uppercase tracking-wider transition-all ${tier.highlight
                      ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:shadow-lg hover:shadow-violet-500/30'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                      }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

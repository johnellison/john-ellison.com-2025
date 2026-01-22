'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import Image from 'next/image';

const problemCards = [
  {
    icon: '?',
    title: 'Stuck at Experimentation',
    description: "Most companies have done little more than deploy ChatGPT. They are late, confused, and stuck cycling through pilots that never become production systems.",
    gradient: "from-blue-500/20 via-indigo-500/5 to-transparent",
    image: '/images/ai-transformation/stuck-at-experimentation.png',
  },
  {
    icon: '!',
    title: 'Board Pressure, No Strategy',
    description: "Leadership is demanding an AI strategy, but the organization doesn't know where to start. They're skeptical of consultants selling hype without substance.",
    gradient: "from-violet-500/20 via-purple-500/5 to-transparent",
    image: '/images/ai-transformation/board-pressure.png',
  },
  {
    icon: 'X',
    title: 'Internal Resistance',
    description: 'Fear, confusion, and resistance block adoption. Without proper change management, even good AI tools get shelved or sabotaged.',
    gradient: "from-fuchsia-500/20 via-pink-500/5 to-transparent",
    image: '/images/ai-transformation/internal-resistance.png',
  },
  {
    icon: '0',
    title: 'No ROI, No Governance',
    description: 'Disconnected experiments with no measurable outcomes. No policies. No security framework. No clear ownership or accountability.',
    gradient: "from-cyan-500/20 via-teal-500/5 to-transparent",
    image: '/images/ai-transformation/no-roi.png',
  },
];

const icpOrganization = [
  '$1M-$50M annual revenue',
  '10-200 employees',
  'Operations-heavy business',
  'Service, agency, media, SaaS, or platform',
  'Already using Notion, Airtable, HubSpot, Zapier, or Google Workspace',
];

const icpSituation = [
  'AI-curious but late to adoption',
  'Board or leadership asking for AI strategy',
  'Concerned about governance and risk',
  'Want operational leverage, not AI theater',
  'Time-poor, outcome-driven',
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate the label
    gsap.from('.problem-label', {
      scrollTrigger: {
        trigger: '.problem-label',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Animate the title
    gsap.from('.problem-title', {
      scrollTrigger: {
        trigger: '.problem-title',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Animate the text
    gsap.from('.problem-text', {
      scrollTrigger: {
        trigger: '.problem-text',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Animate problem cards
    gsap.from('.problem-card', {
      scrollTrigger: {
        trigger: '.problem-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Animate ICP card
    const icpTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.icp-card',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    icpTl.from('.icp-card', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
      .from('.icp-title', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.5')
      .from('.icp-divider', {
        scaleY: 0,
        transformOrigin: 'top center',
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }, '-=0.4')
      .from('.icp-column', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
      }, '-=0.6')
      .from('.icp-item', {
        x: -10,
        opacity: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power1.out'
      }, '-=0.4');
  }, []);

  return (
    <section ref={sectionRef} id="problem" className="py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <span className="problem-label block font-sans type-sm font-medium tracking-widest uppercase text-violet-400 mb-4 text-center">
          The Problem
        </span>

        <h2 className="problem-title heading-section text-white text-center mb-10">
          <span className="text-gradient-prism">AI Adoption</span> is Failing Across Organizations
        </h2>

        <p className="problem-text type-lg text-white/60 max-w-3xl mx-auto text-center mb-16 leading-relaxed">
          The problem is not building AI tools. The problem is that AI is not getting adopted inside organizations.
          Prototypes never ship. Tools never get used. There&apos;s no governance, no strategy, no integration into operations.
        </p>

        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col gap-6 lg:gap-8">
            {problemCards.filter((_, i) => i % 2 === 0).map((card, index) => (
              <div
                key={`col1-${index}`}
                className="problem-card group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80 mix-blend-overlay`} />
                </div>

                <div className="p-8 pt-0 relative">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center -mt-7 mb-6 text-2xl bg-[#1a1a1a] border border-white/10 text-violet-400 shadow-xl group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                    {card.icon}
                  </div>

                  <h3 className="heading-card text-white mb-3 group-hover:text-violet-200 transition-colors">
                    {card.title}
                  </h3>
                  <p className="type-base text-white/60 leading-relaxed group-hover:text-white/70 transition-colors">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 lg:gap-8 md:mt-16">
            {problemCards.filter((_, i) => i % 2 !== 0).map((card, index) => (
              <div
                key={`col2-${index}`}
                className="problem-card group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80 mix-blend-overlay`} />
                </div>

                <div className="p-8 pt-0 relative">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center -mt-7 mb-6 text-2xl bg-[#1a1a1a] border border-white/10 text-violet-400 shadow-xl group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                    {card.icon}
                  </div>

                  <h3 className="heading-card text-white mb-3 group-hover:text-violet-200 transition-colors">
                    {card.title}
                  </h3>
                  <p className="type-base text-white/60 leading-relaxed group-hover:text-white/70 transition-colors">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ICP Card */}
        <div className="icp-card relative mt-32 max-w-4xl mx-auto">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-violet-500/50" />

          <div className="relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] backdrop-blur-sm rounded-3xl p-8 md:p-12 overflow-hidden group hover:border-white/[0.12] transition-colors duration-500">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

            <h3 className="icp-title heading-card text-white text-center mb-12 relative z-10">
              Is This You?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
              <div className="icp-divider hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

              {/* Your Organization Column */}
              <div className="icp-column">
                <h4 className="font-sans text-sm font-medium tracking-widest uppercase text-violet-300 mb-6 text-center md:text-left">
                  Your Organization
                </h4>
                <ul className="flex flex-col gap-4">
                  {icpOrganization.map((item, index) => (
                    <li key={index} className="icp-item flex items-start gap-3 text-white/70 text-base leading-relaxed group/item">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)] group-hover/item:scale-125 transition-transform duration-300 shrink-0" />
                      <span className="group-hover/item:text-white transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Your Situation Column */}
              <div className="icp-column">
                <h4 className="font-sans text-sm font-medium tracking-widest uppercase text-violet-300 mb-6 text-center md:text-left">
                  Your Situation
                </h4>
                <ul className="flex flex-col gap-4">
                  {icpSituation.map((item, index) => (
                    <li key={index} className="icp-item flex items-start gap-3 text-white/70 text-base leading-relaxed group/item">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)] group-hover/item:scale-125 transition-transform duration-300 shrink-0" />
                      <span className="group-hover/item:text-white transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

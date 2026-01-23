'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const outcomes = [
  {
    icon: '+',
    title: 'AI Systems That Get Used',
    description:
      'Deployed into daily operations, not stuck in pilot decks or demo folders.',
    image: '/images/ai-transformation/outcomes-adoption-usage-v3.png',
    heightClass: 'h-64',
    gradient: "from-blue-500/20 via-indigo-500/5 to-transparent",
  },
  {
    icon: '//',
    title: '10–20% Increased Output',
    description:
      'Measurable productivity gains on the specific workflows where AI is integrated into daily work.',
    image: '/images/ai-transformation/outcomes-productivity-v4.png',
    heightClass: 'h-80',
    gradient: "from-violet-500/20 via-purple-500/5 to-transparent",
  },
  {
    icon: '$',
    title: 'Reduced Operating Costs',
    description:
      'Concrete cost savings in support, back-office, or operations where AI automation is deployed.',
    image: '/images/ai-transformation/outcomes-cost-reduction-v3.png',
    heightClass: 'h-56',
    gradient: "from-fuchsia-500/20 via-pink-500/5 to-transparent",
  },
  {
    icon: '>>',
    title: 'Faster Product Cycles',
    description:
      'Faster research, prototyping, and iteration—hours of work compressed into minutes, weeks into days.',
    image: '/images/ai-transformation/outcomes-faster-cycles-v3.png',
    heightClass: 'h-72',
    gradient: "from-cyan-500/20 via-teal-500/5 to-transparent",
  },
  {
    icon: '*',
    title: 'New Capabilities',
    description:
      "Internal tooling and customer-facing features that simply weren't feasible before AI.",
    image: '/images/ai-transformation/outcomes-new-capabilities-v4.png',
    heightClass: 'h-64',
    gradient: "from-blue-500/20 via-indigo-500/5 to-transparent",
  },
  {
    icon: '[]',
    title: 'Governance Clarity',
    description:
      'Clear AI usage policies, security frameworks, and accountability structures that satisfy leadership and regulators.',
    image: '/images/ai-transformation/outcomes-governance-v4.png',
    heightClass: 'h-48',
    gradient: "from-violet-500/20 via-purple-500/5 to-transparent",
  },
];


export function OutcomesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate header elements
    gsap.from('.outcomes-label', {
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

    gsap.from('.outcomes-title', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: 'power2.out',
    });

    gsap.from('.outcomes-text', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.out',
    });

    // Animate outcome cards
    gsap.from('.outcome-card', {
      scrollTrigger: {
        trigger: '.outcomes-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef as any} id="outcomes" className="py-24 px-6 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="outcomes-label inline-block type-sm font-medium tracking-widest text-violet-400 uppercase mb-4">
            Outcomes
          </span>
          <h2 className="outcomes-title heading-section mb-8">
            <span className="text-gradient-prism">Driven to Succeed</span>
          </h2>
          <p className="outcomes-text type-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We define multiple measures of success from adoption to efficiency and employee satisfaction. Together we navigate the delicate territory of AI, ensuring your organization thrives in the new era of agentic AI.
          </p>
        </div>

        <div className="outcomes-grid columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="outcome-card break-inside-avoid group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10"
            >
              <div className={`relative w-full ${outcome.heightClass} overflow-hidden`}>
                <Image
                  src={outcome.image}
                  alt={outcome.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${outcome.gradient} opacity-80 mix-blend-overlay`} />
              </div>

              <div className="p-8 pt-0 relative">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center -mt-7 mb-6 text-2xl bg-[#1a1a1a] border border-white/10 text-violet-400 shadow-xl group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                  {outcome.icon}
                </div>
                <h4 className="heading-card text-white mb-3 group-hover:text-violet-200 transition-colors">{outcome.title}</h4>
                <p className="text-white/60 type-base leading-relaxed group-hover:text-white/70 transition-colors">{outcome.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

type Differentiator = {
  title: string;
  description: string;
  image: string;
};

const differentiators: Differentiator[] = [
  {
    title: 'Governance First',
    description:
      'Policies, security frameworks, and accountability structures come before the first line of code. People need to feel safe before anything else.',
    image: '/images/ai-transformation/approach-governance-first.png',
  },
  {
    title: 'Ship Real Products',
    description:
      "We don't leave you with slides. We leave you with deployed systems, trained teams, and documented processes.",
    image: '/images/ai-transformation/approach-not-workshop.png',
  },
  {
    title: 'Build Daily Habits',
    description:
      "We build for operations, not pilots. Leveraging behavior science and organizational psychology, we build systems that easily integrate into daily routines.",
    image: '/images/ai-transformation/approach-not-innovation-lab.png',
  },
  {
    title: 'Human Workflows',
    description:
      'We understand the way people work and build AI systems around it to help people do what they do best and let machines do the rest.',
    image: '/images/ai-transformation/approach-not-automation-only.png',
  },
  {
    title: 'Pragmatic Optimism',
    description:
      "We won't tell you AI will change the world. We'll tell you exactly where it will and won't help your business with specific hypotheses and projected outcomes.",
    image: '/images/ai-transformation/approach-not-hype.png',
  },
  {
    title: 'Change Management',
    description:
      "Adoption doesn't happen by accident. We address resistance, train teams, and align stakeholders before, during, and after the build.",
    image: '/images/ai-transformation/approach-change-management.png',
  },

];

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate label
    gsap.from('.approach-label', {
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
    gsap.from('.approach-title', {
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
    gsap.from('.approach-description', {
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
    gsap.from('.diff-card', {
      scrollTrigger: {
        trigger: '.diff-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  const getLayoutClasses = (index: number) => {
    // Base: Mobile (Center)
    // MD: 2 Col (Spine - Left Col aligns Right, Right Col aligns Left)
    // LG: 3 Col (User Request - Left Col Right, Center Col Center, Right Col Left)

    switch (index) {
      case 0:
        return 'justify-center items-center md:items-end lg:items-end text-center md:text-right lg:text-right px-6 md:px-8';
      case 1:
        return 'justify-center items-center md:items-start lg:items-center text-center md:text-left lg:text-center px-6 md:px-8';
      case 2:
        return 'justify-center items-center md:items-end lg:items-start text-center md:text-right lg:text-left px-6 md:px-8';
      case 3:
        return 'justify-center items-center md:items-start lg:items-end text-center md:text-left lg:text-right px-6 md:px-8';
      case 4:
        return 'justify-center items-center md:items-end lg:items-center text-center md:text-right lg:text-center px-6 md:px-8';
      case 5:
        return 'justify-center items-center md:items-start lg:items-start text-center md:text-left lg:text-left px-6 md:px-8';
      default:
        return 'justify-center items-center text-center px-6';
    }
  };

  const getGradientClasses = (index: number) => {
    // Maps to the layout logic to ensure text contrast
    // Gradients:
    // Left-Dark (for text-left): bg-gradient-to-r from-black/90 via-black/50 to-transparent
    // Right-Dark (for text-right): bg-gradient-to-l from-black/90 via-black/50 to-transparent
    // Center-Dark (for text-center): bg-black/60

    const leftDark = 'bg-gradient-to-r from-black/90 via-black/50 to-transparent';
    const rightDark = 'bg-gradient-to-l from-black/90 via-black/50 to-transparent';
    const centerDark = 'bg-black/60';

    switch (index) {
      case 0: // MD: Right, LG: Right
        return `bg-black/60 md:${rightDark} lg:${rightDark}`;
      case 1: // MD: Left, LG: Center
        return `bg-black/60 md:${leftDark} lg:${centerDark}`;
      case 2: // MD: Right, LG: Left
        return `bg-black/60 md:${rightDark} lg:${leftDark}`;
      case 3: // MD: Left, LG: Right
        return `bg-black/60 md:${leftDark} lg:${rightDark}`;
      case 4: // MD: Right, LG: Center
        return `bg-black/60 md:${rightDark} lg:${centerDark}`;
      case 5: // MD: Left, LG: Left
        return `bg-black/60 md:${leftDark} lg:${leftDark}`;
      default:
        return centerDark;
    }
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="approach"
      className="py-24 px-6 bg-[#050507]"
    >
      <div className="max-w-6xl mx-auto">
        <span className="approach-label inline-block type-sm font-medium text-violet-400 tracking-wider uppercase mb-4">
          Our Approach
        </span>

        <h2 className="approach-title heading-section mb-10">
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Strategy, Governance, and Build.
          </span>
          <br />
          <span className="text-white">Combined</span>
        </h2>

        <p className="approach-description type-lg text-white/70 max-w-3xl mb-16 leading-relaxed">
          We deliver AI systems that get deployed and used—with the
          organizational readiness to make adoption stick. Our approach blends 16 years of startup experience, cutting-edge behavior science and organizational psychology.
        </p>

        <div className="diff-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="diff-card group relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/50 transition-colors duration-500"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${getGradientClasses(index)}`}
              />

              {/* Content Container */}
              <div className={`relative h-full w-full flex flex-col ${getLayoutClasses(index)}`}>
                <div className="max-w-[90%] md:max-w-full">
                  <h4 className="heading-card text-white mb-3 text-2xl font-bold tracking-tight drop-shadow-lg">
                    {item.title}
                  </h4>
                  <p className="text-white/90 type-base leading-relaxed font-medium drop-shadow-md">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

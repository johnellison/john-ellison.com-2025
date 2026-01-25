'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import { Mail, Brain, Puzzle, Clock } from 'lucide-react';

const problemCards = [
  {
    icon: Mail,
    title: 'Drowning in Email',
    description: 'Spending 2+ hours daily sorting through messages, drafting responses, and extracting action items. Your inbox runs your schedule.',
    gradient: 'from-blue-500/20 via-indigo-500/5 to-transparent',
  },
  {
    icon: Brain,
    title: 'AI-Curious but AI-Stuck',
    description: 'You know AI can help, but ChatGPT feels like a toy. You need real integration into your actual workflows, not another tab to check.',
    gradient: 'from-violet-500/20 via-purple-500/5 to-transparent',
  },
  {
    icon: Puzzle,
    title: 'Fragmented Tools',
    description: 'Slack, email, calendar, docs, CRM, project management—information scattered across a dozen apps. Context-switching is killing your deep work.',
    gradient: 'from-fuchsia-500/20 via-pink-500/5 to-transparent',
  },
  {
    icon: Clock,
    title: 'No Time to Optimize',
    description: 'You know you should systematize. But when? You\'re too busy firefighting to build the systems that would prevent the fires.',
    gradient: 'from-cyan-500/20 via-teal-500/5 to-transparent',
  },
];

const icpProfile = [
  'CEO, Founder, Managing Director, VP, or C-Suite',
  'Company size: 5-500 employees',
  'Already spending $2K-$10K/month on productivity',
  'Using Claude/ChatGPT but want "next level"',
  'Executive assistant quit or underperforming',
];

const icpTriggers = [
  'Spending 2+ hours daily on email/admin',
  'Board asking "what\'s your AI strategy?"',
  'Just heard competitor has AI-powered operation',
  'Feel like you\'re working harder, not smarter',
  'Missing strategic opportunities due to overload',
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

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

    gsap.fromTo('.problem-card',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.problem-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      }
    );

    const icpTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.icp-card',
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });

    icpTl.fromTo('.icp-card',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
      .fromTo('.icp-title',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo('.icp-column',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.icp-item',
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'power1.out' },
        '-=0.4'
      );
  }, []);

  return (
    <section ref={sectionRef} id="problem" className="py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <span className="problem-label block font-sans type-sm font-medium tracking-widest uppercase text-violet-400 mb-4 text-center">
          The Problem
        </span>

        <h2 className="problem-title heading-section text-white text-center mb-10">
          The Executive <span className="text-gradient-prism">Productivity Crisis</span>
        </h2>

        <p className="problem-text type-lg text-white/60 max-w-3xl mx-auto text-center mb-16 leading-relaxed">
          You didn&apos;t become an executive to manage email. Yet 40% of your day goes to last-minute issues and admin.
          Only 13% goes to strategy. AI can flip that ratio—if implemented correctly.
        </p>

        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {problemCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="problem-card group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="heading-card text-white mb-3 group-hover:text-violet-200 transition-colors">
                    {card.title}
                  </h3>
                  <p className="type-base text-white/60 leading-relaxed group-hover:text-white/70 transition-colors">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ICP Card */}
        <div className="icp-card relative mt-24 max-w-4xl mx-auto">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent to-violet-500/50" />

          <div className="relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] backdrop-blur-sm rounded-3xl p-8 md:p-12 overflow-hidden group hover:border-white/[0.12] transition-colors duration-500">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

            <h3 className="icp-title heading-card text-white text-center mb-12 relative z-10">
              Is This You?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

              {/* Your Profile Column */}
              <div className="icp-column">
                <h4 className="font-sans text-sm font-medium tracking-widest uppercase text-violet-300 mb-6 text-center md:text-left">
                  Your Profile
                </h4>
                <ul className="flex flex-col gap-4">
                  {icpProfile.map((item, index) => (
                    <li key={index} className="icp-item flex items-start gap-3 text-white/70 text-base leading-relaxed group/item">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)] group-hover/item:scale-125 transition-transform duration-300 shrink-0" />
                      <span className="group-hover/item:text-white transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trigger Events Column */}
              <div className="icp-column">
                <h4 className="font-sans text-sm font-medium tracking-widest uppercase text-violet-300 mb-6 text-center md:text-left">
                  Trigger Events
                </h4>
                <ul className="flex flex-col gap-4">
                  {icpTriggers.map((item, index) => (
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

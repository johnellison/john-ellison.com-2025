'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import { Search, Cog, Rocket, GraduationCap } from 'lucide-react';

const phases = [
  {
    number: 'Week 1',
    title: 'Discovery & Design',
    icon: Search,
    description: 'Deep dive into your current workflows, pain points, and priorities. We map your communication patterns and identify the highest-leverage opportunities.',
    features: [
      '90-minute executive deep-dive session',
      'Workflow audit across all tools',
      'Priority outcome definition',
      'Quick wins identification',
    ],
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    number: 'Week 2',
    title: 'System Architecture',
    icon: Cog,
    description: 'Design your custom AI toolkit and integration architecture. We plan the MCP connections, prompt engineering, and automation flows.',
    features: [
      'Custom AI toolkit design',
      'Integration architecture planning',
      'MCP server configuration',
      'Security and privacy review',
    ],
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    number: 'Weeks 3-5',
    title: 'Implementation Sprint',
    icon: Rocket,
    description: 'Build and deploy all your workflows. Daily testing with real data, iterative refinement based on your feedback.',
    features: [
      'Workflow implementation',
      'API integrations and automations',
      'Daily testing and iteration',
      'Real-time adjustments',
    ],
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    number: 'Week 6+',
    title: 'Training & Hypercare',
    icon: GraduationCap,
    description: 'Executive training on all systems, comprehensive documentation, and 30-day hypercare support to ensure everything sticks.',
    features: [
      'Executive training sessions',
      'Video documentation library',
      '30-day hypercare support',
      'Optimization recommendations',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
];

export function PhasesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.phases-label', {
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

    gsap.from('.phases-title', {
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

    gsap.from('.phase-card', {
      scrollTrigger: {
        trigger: '.phase-grid',
        start: 'top 85%',
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
    <section ref={sectionRef} id="phases" className="py-24 px-6 bg-[#050507] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-900/15 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="phases-label inline-block type-sm font-medium tracking-widest text-violet-400 uppercase mb-4">
            Transformation Timeline
          </span>
          <h2 className="phases-title heading-section text-white mb-6">
            Your <span className="text-gradient-prism">4-6 Week</span> Journey
          </h2>
          <p className="type-lg text-white/60 max-w-2xl mx-auto">
            A structured process that respects your time while delivering real results.
          </p>
        </div>

        <div className="phase-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <div
                key={index}
                className="phase-card flex flex-col bg-[#0a0a0f] rounded-2xl border border-white/[0.08] overflow-hidden group hover:border-white/20 transition-all duration-300"
              >
                <div className="p-8 flex-1">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${phase.gradient}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="type-xs uppercase tracking-wider text-violet-400 font-medium">{phase.number}</span>
                      <h3 className="heading-card text-white group-hover:text-violet-200 transition-colors">{phase.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="type-base text-white/60 mb-6 leading-relaxed">
                    {phase.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {phase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-white/70 type-sm">
                        <span className="text-violet-400 mt-1">&#10003;</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progress indicator */}
                <div className="h-1 w-full bg-white/5">
                  <div
                    className={`h-full bg-gradient-to-r ${phase.gradient}`}
                    style={{ width: `${((index + 1) / phases.length) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

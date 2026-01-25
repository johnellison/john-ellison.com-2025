'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.team-label', {
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

    gsap.from('.team-title', {
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

    gsap.from('.team-card', {
      scrollTrigger: {
        trigger: '.team-card',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="team"
      className="py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="team-label inline-block text-sm font-medium text-violet-400 tracking-wider uppercase mb-4">
            Your Guide
          </span>

          <h2 className="team-title heading-section mb-6 text-white">
            Part-time <span className="text-gradient-prism">CTO + AI Exec</span> for Hire
          </h2>
        </div>

        <div className="team-card bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 hover:bg-white/[0.05] hover:border-violet-500/30 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-violet-500/30">
                <Image
                  src="/john-e-wedding-headshot.webp"
                  alt="John Ellison"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1">
              <h3 className="heading-card text-white mb-1">John Ellison</h3>
              <span className="inline-block type-sm font-medium text-violet-400 mb-4">
                Product Strategy, AI & Behavior Design
              </span>

              <p className="text-white/70 type-base leading-relaxed mb-6">
                16 years building products. 300+ founders supported. Led growth at Toucan Protocol and managed product at OpenGov.
                Now I focus exclusively on helping executives leverage AI to multiply their personal productivity.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/[0.03] rounded-lg border border-white/5">
                  <div className="type-lg font-bold text-white">16+</div>
                  <div className="type-xs text-white/50">Years Building</div>
                </div>
                <div className="text-center p-3 bg-white/[0.03] rounded-lg border border-white/5">
                  <div className="type-lg font-bold text-white">300+</div>
                  <div className="type-xs text-white/50">Founders Helped</div>
                </div>
                <div className="text-center p-3 bg-white/[0.03] rounded-lg border border-white/5">
                  <div className="type-lg font-bold text-white">$18M+</div>
                  <div className="type-xs text-white/50">Raised</div>
                </div>
                <div className="text-center p-3 bg-white/[0.03] rounded-lg border border-white/5">
                  <div className="type-lg font-bold text-white">Stanford</div>
                  <div className="type-xs text-white/50">BJ Fogg Certified</div>
                </div>
              </div>
            </div>
          </div>

          {/* Specialization */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="type-sm text-white/50 mb-4">Specializing in:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Claude MCP Integrations',
                'AI Workflow Automation',
                'Executive Productivity Systems',
                'Behavior Design',
                'AI-Assisted Development',
                'Personal Knowledge Management',
              ].map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full type-xs text-violet-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

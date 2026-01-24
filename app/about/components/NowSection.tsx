'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';

export function NowSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.now-content', {
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
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="now-content text-center">
          {/* Section Header */}
          <p className="type-sm uppercase tracking-widest text-white/40 mb-4">What I&apos;m Doing Now</p>
          <h2 className="heading-section mb-8">The Integrated Return</h2>

          {/* Current Focus */}
          <div className="space-y-6 text-left md:text-center mb-12">
            <p className="type-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
              After a year of sabbatical, I&apos;ve returned to building—this time
              with <span className="text-white font-medium">AI Transformation</span> as my focus.
              Helping companies not just adopt AI tools, but truly transform how they work.
            </p>

            <p className="type-base text-white/60 leading-relaxed max-w-3xl mx-auto">
              I&apos;m building in public with AI, sharing what I learn on{' '}
              <a
                href="https://iamjohnellison.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                my Substack
              </a>
              . Real-time documentation of a regenerative entrepreneur&apos;s journey
              with Claude, vibe coding, and the frontier of human-AI collaboration.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai-transformation"
              className="btn-primary px-8 py-4 text-base"
            >
              Explore AI Transformation
            </Link>
            <Link
              href="/contact"
              className="btn-secondary px-8 py-4 text-base"
            >
              Work With Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

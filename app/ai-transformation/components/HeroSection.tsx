'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    tl.from('.hero-label', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
    .from('.hero-headline', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.5')
    .from('.hero-description', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.5')
    .from('.hero-cta-group', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.5');
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(124, 58, 237, 0.15) 0%, transparent 60%)'
        }}
      />

      <span className="hero-label font-sans text-sm font-medium tracking-widest uppercase text-violet-400 mb-4 z-10">
        From AI curious to AI-native
      </span>

      <h1 className="hero-headline font-display text-[clamp(2.75rem,5vw,4.25rem)] tracking-wider uppercase font-semibold text-white leading-tight mb-4 z-10">
        Transform your <span className="text-gradient-prism">business</span> with{' '}
        <span className="text-gradient-warm">AI</span>
      </h1>

      <p className="hero-description text-lg text-white/60 max-w-[60ch] mb-10 leading-relaxed z-10">
        I build custom AI products and integrate them into your organization, with the governance, training,
        and change management required for successful adoption.
      </p>

      <div className="hero-cta-group z-10">
        <a
          href="#assessment"
          className="group relative inline-flex items-center gap-2 text-white/95 font-medium text-sm tracking-wide uppercase px-6 py-3 border border-white/20 rounded-md transition-all duration-400 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_10px_40px_rgba(180,100,255,0.25),0_0_60px_rgba(100,200,255,0.15)]"
          style={{
            background: 'rgba(8, 8, 12, 0.6)',
          }}
        >
          Take AI Readiness Assessment
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-[18px] h-[18px]"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

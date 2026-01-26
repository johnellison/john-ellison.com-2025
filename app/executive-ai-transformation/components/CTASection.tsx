'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.cta-heading', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from('.cta-description', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.15,
      ease: 'power2.out',
    });

    gsap.from('.cta-buttons', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="cta"
      className="relative min-h-[80vh] py-32 px-6 flex flex-col justify-center items-center text-center"
    >
      {/* Radial gradient background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Floating Background Images - Similar to Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left Image - Fatma Circle */}
        <div className="absolute top-[10%] -left-[5%] md:left-[5%] w-[40vw] md:w-[25vw] max-w-[400px] aspect-square rounded-full overflow-hidden shadow-2xl border border-white/5 opacity-40 blur-[1px]">
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ai-transformation/fatma-workshop-circle.webp"
            alt="Facilitation Circle"
            className="w-full h-full object-cover grayscale-[30%]"
          />
        </div>

        {/* Right Image - John & Fatma Workshop */}
        <div className="absolute bottom-[10%] -right-[5%] md:right-[5%] w-[40vw] md:w-[25vw] max-w-[400px] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/5 opacity-40 rotate-[3deg] blur-[1px]">
          <div className="absolute inset-0 bg-violet-900/20 mix-blend-overlay z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ai-transformation/john-and-fatma-at-workshop.jpg"
            alt="Workshop Collaboration"
            className="w-full h-full object-cover grayscale-[30%]"
          />
        </div>
      </div>

      <h2 className="cta-heading relative heading-section text-white mb-4 max-w-[70%] md:max-w-none">
        Ready to Reclaim Your{' '}
        <span className="text-gradient-prism">Time?</span>
      </h2>

      <p className="cta-description relative type-lg text-white/60 mb-8 max-w-[60ch] mx-auto leading-relaxed">
        Take the free assessment to discover your AI archetype and get personalized recommendations.
        Or book a discovery call and we&apos;ll explore how AI can transform your productivity.
      </p>

      <div className="cta-buttons relative flex flex-wrap justify-center gap-4">
        {/* Primary CTA Button */}
        <a
          href="#assessment"
          className="btn-primary uppercase tracking-wide px-8 py-4"
        >
          Take Free Assessment
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        {/* Secondary CTA Button */}
        <Link
          href="https://calendar.app.google/wirgV6a4Vcz7cZAcA"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary uppercase tracking-wide px-8 py-4"
        >
          Book Discovery Call
        </Link>
      </div>
    </section>
  );
}

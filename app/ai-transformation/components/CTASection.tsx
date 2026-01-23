'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';
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

      <h2 className="cta-heading relative heading-section text-white mb-4 max-w-[70%] md:max-w-none">
        Ready to Harness The{' '}
        <span className="text-gradient-prism">Power of AI?</span>
      </h2>

      <p className="cta-description relative type-lg text-white/60 mb-8 max-w-[60ch] mx-auto leading-relaxed">
        Take the free AI readiness assessment or book a free strategy call and I'll happily hear about what challenges you're facing as an organization and see if there are any ways I can help.
      </p>

      <div className="cta-buttons relative flex flex-wrap justify-center gap-4">
        {/* Primary CTA Button */}
        <a
          href="#assessment"
          className="btn-primary uppercase tracking-wide px-8 py-4"
        >
          Take the Assessment
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
          Book a Strategy Call
        </Link>
      </div>
    </section>
  );
}

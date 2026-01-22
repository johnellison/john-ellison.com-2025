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

      <h2 className="cta-heading relative text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-4 max-w-[70%] md:max-w-none">
        Ready to Move Past{' '}
        <span className="text-gradient-prism">AI Experimentation</span>?
      </h2>

      <p className="cta-description relative text-lg text-white/60 mb-8 max-w-[60ch] mx-auto">
        Take the readiness assessment or book a strategy call. No sales pitch—a
        direct conversation about whether we can help.
      </p>

      <div className="cta-buttons relative flex flex-wrap justify-center gap-4">
        {/* Primary CTA Button */}
        <a
          href="#assessment"
          className="group relative inline-flex items-center gap-2 text-white/95 text-sm font-medium tracking-wide uppercase px-8 py-4 rounded-md bg-[rgba(8,8,12,0.9)] border border-white/15 overflow-hidden transition-all duration-400 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_10px_40px_rgba(180,100,255,0.25),0_0_60px_rgba(100,200,255,0.15)] z-[1] before:absolute before:inset-0 before:p-[2px] before:rounded-md before:bg-[linear-gradient(135deg,rgba(255,150,150,0.9),rgba(255,200,100,0.9),rgba(100,255,150,0.9),rgba(100,200,255,0.9),rgba(180,100,255,0.9),rgba(255,150,150,0.9))] before:opacity-0 before:transition-opacity before:duration-400 before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] hover:before:opacity-100 after:absolute after:inset-[2px] after:bg-[rgba(8,8,12,0.95)] after:rounded after:-z-10 after:transition-colors after:duration-300"
        >
          <span className="relative z-10">Take the Assessment</span>
          <svg
            className="relative z-10 w-5 h-5"
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
          href="/contact"
          className="inline-flex items-center gap-2 text-white/95 text-sm font-medium tracking-wide uppercase px-8 py-4 rounded-md bg-transparent border border-white/20 transition-all duration-400 hover:bg-white/5 hover:border-white/30 hover:-translate-y-0.5"
        >
          Book a Strategy Call
        </Link>
      </div>
    </section>
  );
}

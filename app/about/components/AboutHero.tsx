'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

export function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.from('.hero-image', {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    })
      .from('.hero-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.5')
      .from('.hero-tagline', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4')
      .from('.hero-subhead', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4');
  }, []);

  return (
    <section ref={heroRef} className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image with Prismatic Ring */}
        <div className="hero-image relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8">
          {/* Outer spinning prismatic ring */}
          <div className="absolute -inset-2 rounded-full bg-conic-prism animate-prismatic-spin opacity-60 blur-sm" />
          {/* Inner glow pulse */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-teal-500/30 animate-pulse" />
          {/* Main image container */}
          <div className="relative w-full h-full p-1 rounded-full bg-gradient-to-br from-red-300 via-purple-300 to-blue-300">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0c0c10] bg-black">
              <Image
                src="/john-e-wedding-headshot.webp"
                alt="John Ellison"
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="hero-eyebrow type-sm uppercase tracking-widest text-white/40 mb-4">
          Founder, angel investor & startup consultant
        </p>

        {/* Tagline */}
        <h1 className="hero-tagline heading-section mb-4">
          My name is <span className="text-gradient-prism">John Ellison</span>
        </h1>

        {/* Subhead */}
        <p className="hero-subhead type-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
          Working towards a regenerative future.
          <br className="hidden md:block" />
          Also an artist, musician, podcaster and filmmaker.
        </p>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Hero content animations
    const heroTl = gsap.timeline();
    heroTl
      .from('.hero-label', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' })
      .from('.hero-headline', { y: 40, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
      .from('.hero-subheadline', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .from('.hero-cta-group', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');

    // Desktop floating images
    if (window.innerWidth >= 1024) {
      // Initial fade-in and scale up
      gsap.from('.hero-image-desktop', {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Continuous floating animation with sine wave
      gsap.utils.toArray<HTMLElement>('.hero-image-desktop').forEach((img, i) => {
        gsap.to(img, {
          y: `${(i % 2 === 0 ? '-' : '+')}=15`,
          rotation: (i % 2 === 0 ? -1 : 1),
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5
        });
      });
    }

    // Mobile images fade in
    if (window.innerWidth < 1024) {
      gsap.from('.hero-image-mobile', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
    >
      {/* --- DESKTOP: FLOATING IMAGE CANVAS (LG+) --- */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
        {/* Global Desktop Overlay for darkening */}
        <div className="absolute inset-0 bg-[#0B0B0F]/40 z-10 mix-blend-multiply" />

        {/* Top Left - Workshop Session */}
        <div className="hero-image-desktop absolute top-[10%] left-[6%] w-[18vw] max-w-[260px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[-3deg]">
          <div className="absolute inset-0 bg-violet-900/15 mix-blend-overlay z-10" />
          <Image
            src="/images/john-ai-sprint-session.webp"
            alt="AI Workshop Session"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 20vw, 100vw"
            priority
          />
        </div>

        {/* Top Right - Speaking Engagement */}
        <div className="hero-image-desktop absolute top-[8%] right-[5%] w-[20vw] max-w-[300px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[3deg]">
          <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay z-10" />
          <Image
            src="/images/john-e-on-stage-celo-connect Large.webp"
            alt="Speaking on Stage"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 22vw, 100vw"
            priority
          />
        </div>

        {/* Bottom Left - ReFi DAO Project */}
        <div className="hero-image-desktop absolute bottom-[15%] left-[7%] w-[19vw] max-w-[280px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[2deg]">
          <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay z-10" />
          <Image
            src="/images/refi-dao-cover-image.jpg"
            alt="ReFi DAO Project"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 22vw, 100vw"
            priority
          />
        </div>

        {/* Bottom Right - Pravos */}
        <div className="hero-image-desktop absolute bottom-[18%] right-[6%] w-[17vw] max-w-[250px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[-2deg]">
          <div className="absolute inset-0 bg-blue-900/15 mix-blend-overlay z-10" />
          <Image
            src="/images/pravos-cover-image-large.jpeg"
            alt="Pravos"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 20vw, 100vw"
            priority
          />
        </div>

        {/* Far Left Edge - Executive Portrait */}
        <div className="hero-image-desktop absolute top-[45%] -left-[2%] w-[13vw] max-w-[190px] aspect-square rounded-full overflow-hidden shadow-2xl border border-white/5 blur-[1px] opacity-60">
          <div className="absolute inset-0 bg-violet-900/20 mix-blend-overlay z-10" />
          <Image
            src="/images/ai-transformation/john-ai-closeup.png"
            alt="John Ellison"
            fill
            className="object-cover grayscale-[20%]"
            sizes="(min-width: 1024px) 15vw, 100vw"
            priority
          />
        </div>

        {/* Far Right Edge - Workshop Facilitation */}
        <div className="hero-image-desktop absolute top-[48%] -right-[1%] w-[14vw] max-w-[200px] aspect-square rounded-full overflow-hidden shadow-2xl border border-white/5 blur-[1px] opacity-60">
          <div className="absolute inset-0 bg-indigo-900/15 mix-blend-overlay z-10" />
          <Image
            src="/images/ai-transformation/john-and-fatma-at-workshop Large.jpeg"
            alt="Workshop Facilitation"
            fill
            className="object-cover grayscale-[20%]"
            sizes="(min-width: 1024px) 15vw, 100vw"
            priority
          />
        </div>

        {/* Mid-Left - Goodery Project */}
        <div className="hero-image-desktop absolute top-[28%] left-[4%] w-[15vw] max-w-[220px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[-2deg] opacity-70">
          <div className="absolute inset-0 bg-violet-900/10 mix-blend-overlay z-10" />
          <Image
            src="/images/Goodery-Wide-Light-Bg Large.jpeg"
            alt="Goodery Project"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 18vw, 100vw"
            priority
          />
        </div>

        {/* Mid-Right - AI Strategy */}
        <div className="hero-image-desktop absolute top-[30%] right-[3%] w-[12vw] max-w-[180px] aspect-square rounded-full overflow-hidden shadow-2xl border border-white/5 rotate-[2deg] opacity-70">
          <div className="absolute inset-0 bg-blue-900/15 mix-blend-overlay z-10" />
          <Image
            src="/images/ai-transformation/john-strategy-session.png"
            alt="AI Strategy Session"
            fill
            className="object-cover grayscale-[15%]"
            sizes="(min-width: 1024px) 15vw, 100vw"
            priority
          />
        </div>
      </div>

      {/* --- MOBILE/TABLET: SIMPLIFIED GRID (< LG) --- */}
      <div className="lg:hidden absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/95 via-[#0B0B0F]/70 to-[#0B0B0F]/95 z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.35)_0%,transparent_65%)] z-20 mix-blend-screen" />

        {/* Simplified Grid - Less overwhelming on mobile */}
        <div className="grid grid-cols-2 gap-3 transform -rotate-6 scale-110 w-[110%] -ml-[5%] opacity-70">
          {/* Column 1 */}
          <div className="hero-image-mobile space-y-3 mt-12">
            <img
              src="/images/john-ai-sprint-session.webp"
              className="w-full rounded-lg grayscale-[15%]"
              alt=""
            />
            <img
              src="/images/refi-dao-cover-image.jpg"
              className="w-full rounded-lg grayscale-[15%]"
              alt=""
            />
          </div>
          {/* Column 2 */}
          <div className="hero-image-mobile space-y-3 mt-20">
            <img
              src="/images/john-e-on-stage-celo-connect Large.webp"
              className="w-full rounded-lg grayscale-[15%]"
              alt=""
            />
            <img
              src="/images/pravos-cover-image-large.jpeg"
              className="w-full rounded-lg grayscale-[15%]"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* --- CENTERED HERO CONTENT --- */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <span className="hero-label inline-block font-sans type-sm font-medium tracking-widest uppercase text-violet-400 mb-6 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md">
          AI-Powered Productivity
        </span>

        <h1 className="hero-headline font-display type-5xl tracking-wide uppercase font-bold text-white leading-[1.05] mb-8 max-w-5xl mx-auto">
          Transform How You Work{' '}
          <span className="text-gradient-prism">With AI</span>
        </h1>

        <p className="hero-subheadline type-xl text-white/70 max-w-[55ch] mx-auto mb-12 leading-relaxed">
          I help executives and organizations leverage AI to multiply productivity,
          automate workflows, and build intelligent systems that actually work.
        </p>

        <div className="hero-cta-group flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="btn-primary uppercase tracking-wide px-8 py-4 text-sm md:text-base shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_45px_rgba(124,58,237,0.5)] transition-shadow duration-300"
          >
            Explore Services
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] ml-2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="https://calendar.app.google/wirgV6a4Vcz7cZAcA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary uppercase tracking-wide px-8 py-4 text-sm md:text-base"
          >
            Book a Call
          </Link>
        </div>
      </div>

      {/* Background radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(124, 58, 237, 0.15) 0%, transparent 60%)'
        }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="type-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import Image from 'next/image';
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
      }, '-=0.6')
      .from('.hero-stat', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.5')
      .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4')
      .from('.hero-cta-group', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6');

    // Desktop floating images
    if (window.innerWidth >= 1024) {
      gsap.from('.hero-image-desktop', {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.utils.toArray<HTMLElement>('.hero-image-desktop').forEach((img, i) => {
        gsap.to(img, {
          y: `${(i % 2 === 0 ? '-' : '+')}=15`,
          rotation: (i % 2 === 0 ? -1 : 1),
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2
        });
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
    >
      {/* Desktop Images */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0B0B0F]/40 z-10 mix-blend-multiply" />

        {/* Top Left */}
        <div className="hero-image-desktop absolute top-[15%] left-[5%] w-[16vw] max-w-[240px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[-3deg]">
          <div className="absolute inset-0 bg-violet-900/10 mix-blend-overlay z-10" />
          <Image
            src="/images/ai-transformation/john-white-board-ai-square.jpg"
            alt="AI Strategy"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 20vw, 100vw"
            priority
          />
        </div>

        {/* Top Right */}
        <div className="hero-image-desktop absolute top-[12%] right-[8%] w-[18vw] max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[3deg]">
          <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay z-10" />
          <Image
            src="/images/ai-transformation/john-ellison-workshop-vertical.jpg"
            alt="Executive Workshop"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 20vw, 100vw"
            priority
          />
        </div>

        {/* Bottom Left */}
        <div className="hero-image-desktop absolute bottom-[18%] left-[10%] w-[14vw] max-w-[200px] aspect-square rounded-full overflow-hidden shadow-2xl border border-white/5">
          <Image
            src="/images/ai-transformation/john-and-osho-square.jpg"
            alt="Connection"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 15vw, 100vw"
            priority
          />
        </div>

        {/* Bottom Right */}
        <div className="hero-image-desktop absolute bottom-[15%] right-[5%] w-[20vw] max-w-[300px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[-2deg]">
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10" />
          <Image
            src="/images/ai-transformation/john-ai-sprint-session.jpg"
            alt="Sprint Session"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, 100vw"
            priority
          />
        </div>
      </div>

      {/* Mobile Background */}
      <div className="lg:hidden absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/95 via-[#0B0B0F]/70 to-[#0B0B0F]/95 z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(124,58,237,0.3)_0%,transparent_70%)] z-20 mix-blend-screen pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <span className="hero-label inline-block font-sans type-sm font-medium tracking-widest uppercase text-violet-400 mb-6 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md">
          For Executives & Founders
        </span>

        <h1 className="hero-headline font-display type-4xl tracking-wide uppercase font-bold text-white leading-[1.1] mb-8 max-w-4xl mx-auto drop-shadow-2xl">
          Reclaim <span className="text-gradient-prism">25+ Hours</span> Per Week{' '}
          <span className="text-gradient-warm block md:inline">With AI</span>
        </h1>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
          <div className="hero-stat text-center">
            <div className="type-2xl font-bold text-white">42%</div>
            <div className="type-xs text-white/50 uppercase tracking-wider">Executives blocked<br/>by admin tasks</div>
          </div>
          <div className="hero-stat text-center">
            <div className="type-2xl font-bold text-white">60%</div>
            <div className="type-xs text-white/50 uppercase tracking-wider">Time spent<br/>coordinating</div>
          </div>
          <div className="hero-stat text-center">
            <div className="type-2xl font-bold text-white">25-40</div>
            <div className="type-xs text-white/50 uppercase tracking-wider">Hours saved<br/>weekly with AI</div>
          </div>
        </div>

        <p className="hero-description type-lg text-white/70 max-w-[55ch] mb-10 leading-relaxed drop-shadow-lg">
          We rebuild your personal operating system with AI. Email triage, calendar optimization,
          meeting summaries, document creation—all customized to your workflow and voice.
        </p>

        <div className="hero-cta-group flex flex-col sm:flex-row gap-4">
          <a
            href="#assessment"
            className="btn-primary uppercase tracking-wide px-8 py-4 text-sm md:text-base shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_45px_rgba(124,58,237,0.5)] transition-shadow duration-300"
          >
            Take Free Assessment
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-[18px] h-[18px] ml-2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="https://calendar.app.google/wirgV6a4Vcz7cZAcA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary uppercase tracking-wide px-8 py-4 text-sm md:text-base"
          >
            Book Discovery Call
          </a>
        </div>
      </div>

      {/* Background radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(124, 58, 237, 0.2) 0%, transparent 70%)'
        }}
      />
    </section>
  );
}

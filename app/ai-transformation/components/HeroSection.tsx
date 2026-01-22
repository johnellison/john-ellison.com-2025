'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Text Animations (Existing, tweaked timings)
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
      .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6')
      .from('.hero-cta-group', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6');

    // Desktop Image Canvas Animation
    // Floating effect for images
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

      // Continuous floating motion
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

    // Mobile Masonry Fade In
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
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
    >
      {/* --- DESKTOP: IMAGE CANVAS (LG+) --- */}
      <div ref={visualsRef} className="hidden lg:block absolute inset-0 z-0 pointer-events-none">

        {/* Top Left - Speaking/Authority */}
        <div className="hero-image-desktop absolute top-[15%] left-[5%] w-[18vw] max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[-3deg]">
          <div className="absolute inset-0 bg-violet-900/10 mix-blend-overlay z-10" />
          <img
            src="/images/ai-transformation/john-ellison-workshop-vertical.jpg"
            alt="John presenting"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Left - Collaboration */}
        <div className="hero-image-desktop absolute bottom-[15%] left-[10%] w-[22vw] max-w-[340px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[2deg]">
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10" />
          <img
            src="/images/ai-transformation/john-and-fatma-at-workshop.jpg"
            alt="Workshop collaboration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Right - Strategy */}
        <div className="hero-image-desktop absolute top-[12%] right-[8%] w-[20vw] max-w-[300px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[3deg]">
          <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay z-10" />
          <img
            src="/images/ai-transformation/john-white-board-ai-square.jpg"
            alt="AI Strategy Board"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Right - Outcomes/Vibe */}
        <div className="hero-image-desktop absolute bottom-[18%] right-[5%] w-[18vw] max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-[-2deg]">
          <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay z-10" />
          <img
            src="/images/ai-transformation/john-ai-sprint-session.jpg"
            alt="Sprint Session"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Far Left Edge Element (Optional - purely decorative or another image) */}
        <div className="hero-image-desktop absolute top-[45%] -left-[2%] w-[12vw] max-w-[200px] aspect-square rounded-full overflow-hidden shadow-2xl border border-white/5 blur-sm opacity-60">
          <img
            src="/images/ai-transformation/john-and-osho-square.jpg"
            alt="Connection"
            className="w-full h-full object-cover grayscale opacity-50"
          />
        </div>

      </div>

      {/* --- MOBILE/TABLET: MASONRY GRID (< LG) --- */}
      <div className="lg:hidden absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#0B0B0F]/90 to-[#0B0B0F] z-10" /> {/* Dark Overlay */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 transform -rotate-6 scale-110 w-[120%] -ml-[10%]">
          <div className="hero-image-mobile space-y-2 mt-12">
            <img src="/images/ai-transformation/john-ellison-workshop-vertical.jpg" className="w-full rounded-lg opacity-60 grayscale-[30%]" alt="" />
            <img src="/images/ai-transformation/john-white-board-ai-square.jpg" className="w-full rounded-lg opacity-60 grayscale-[30%]" alt="" />
          </div>
          <div className="hero-image-mobile space-y-2">
            <img src="/images/ai-transformation/john-ai-sprint-session.jpg" className="w-full rounded-lg opacity-60 grayscale-[30%]" alt="" />
            <img src="/images/ai-transformation/john-and-fatma-at-workshop.jpg" className="w-full rounded-lg opacity-60 grayscale-[30%]" alt="" />
          </div>
          <div className="hero-image-mobile space-y-2 mt-8 hidden md:block">
            <img src="/images/ai-transformation/john-and-osho-square.jpg" className="w-full rounded-lg opacity-60 grayscale-[30%]" alt="" />
            <img src="/images/ai-transformation/john-ai-sprint-session.jpg" className="w-full rounded-lg opacity-60 grayscale-[30%]" alt="" />
          </div>
        </div>
      </div>


      {/* --- CENTERED CONTENT --- */}
      {/* Updated z-index to sit above images, text-shadow for extra legibility */}
      <div className="relative z-10 flex flex-col items-center">

        <span className="hero-label inline-block font-sans type-sm font-medium tracking-widest uppercase text-violet-400 mb-6 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md">
          From AI curious to AI-native
        </span>

        <h1 className="hero-headline font-display type-2xl md:text-6xl lg:text-7xl tracking-tight uppercase font-bold text-white leading-[1.1] mb-8 max-w-4xl mx-auto drop-shadow-2xl">
          Transform your <span className="text-gradient-prism">business</span> with{' '}
          <span className="text-gradient-warm block md:inline">AI</span>
        </h1>

        <p className="hero-description type-lg text-white/70 max-w-[50ch] mb-10 leading-relaxed drop-shadow-lg">
          I build custom AI products and integrate them into your organization, with the governance, training,
          and change management required for successful adoption.
        </p>

        <div className="hero-cta-group">
          <a
            href="#assessment"
            className="btn-primary uppercase tracking-wide px-8 py-4 text-sm md:text-base shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_45px_rgba(124,58,237,0.5)] transition-shadow duration-300"
          >
            Take AI Readiness Assessment
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
        </div>
      </div>

      {/* Background radial gradient cleanup */}
      <div
        className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(124, 58, 237, 0.2) 0%, transparent 70%)'
        }}
      />
    </section>
  );
}

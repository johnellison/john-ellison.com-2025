'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import Image from 'next/image';

export function RegenerativeVisionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate section label
    gsap.from('.vision-label', {
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

    // Animate headline
    gsap.from('.vision-headline', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.15,
      ease: 'power2.out',
    });

    // Animate text content with stagger
    gsap.from('.vision-text-item', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.3,
      ease: 'power2.out',
    });

    // Animate quote callout
    gsap.from('.vision-quote', {
      scrollTrigger: {
        trigger: '.vision-quote',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      scale: 0.98,
      duration: 1,
      ease: 'power2.out',
    });

    // Animate visual with scale
    gsap.from('.vision-visual', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      delay: 0.4,
      ease: 'power2.out',
    });

    // Animate floating orbs with parallax
    gsap.to('.vision-orb-1', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -80,
      ease: 'none',
    });

    gsap.to('.vision-orb-2', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -120,
      ease: 'none',
    });
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 px-6 overflow-hidden bg-[#050507]"
    >
      {/* Subtle background gradient - very minimal */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="vision-orb-1 absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="vision-orb-2 absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="vision-label inline-block type-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
            Beyond Productivity
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div>
            <h2 className="vision-headline font-display type-4xl text-white leading-tight mb-8">
              Technology in Service of{' '}
              <span className="text-gradient-prism">
                Life
              </span>
            </h2>

            <div className="space-y-6">
              <p className="vision-text-item type-lg text-white/80 leading-relaxed">
                AI transformation isn't just about optimizing your calendar. It's about freeing your time and energy for what truly matters—building regenerative systems that restore rather than extract.
              </p>

              <p className="vision-text-item type-base text-white/70 leading-relaxed">
                I co-founded <span className="text-teal-400 font-medium">ReFi DAO</span>, a global movement with 50+ local nodes and 300+ founders working to align finance with ecological and social regeneration. My work spans AI productivity <span className="text-white/90 italic">and</span> regenerative systems design.
              </p>

              <p className="vision-text-item type-base text-white/70 leading-relaxed">
                I led growth at <span className="text-teal-400 font-medium">Toucan Protocol</span>, helping tokenize $4B+ in carbon credits. I've explored ancient wisdom traditions through pilgrimage and spiritual inquiry, seeking to bridge timeless principles with modern technology.
              </p>

              <p className="vision-text-item type-lg text-white/90 font-medium leading-relaxed italic">
                The same AI that optimizes your calendar can help restore ecosystems. The question is: what will you build with your newfound time?
              </p>

              {/* Links */}
              <div className="vision-text-item flex flex-wrap gap-4 pt-4">
                <Link
                  href="/writing"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  Read My Writing
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="https://regenera.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  Explore Regenera
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Visual + Quote */}
          <div className="space-y-8">
            {/* Regenerative visual - Photo of community tree planting */}
            <div className="vision-visual relative">
              <div className="relative aspect-[4/3] max-w-md mx-auto rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/regen-community-planting.jpg"
                  alt="Community tree planting at regenerative village"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Quote Callout */}
            <div className="vision-quote relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
              {/* Quote mark decoration */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-violet-400">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="space-y-4">
                <p className="type-lg text-white/90 italic leading-relaxed">
                  "What is ReFi? It's the financial system we need for a regenerative civilization—one that values nature, community, and long-term thriving over short-term extraction."
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                  <a
                    href="https://mirror.xyz/johne.eth/g6LCOz4ydgqHhz0H-eLjQBFKr9DUqM8gN2YpHm4X5S8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-sm text-teal-400 hover:text-teal-300 transition-colors font-medium flex items-center gap-2"
                  >
                    Read the essay on Mirror
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Key insight badge */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 type-sm text-white/70">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-teal-400">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span className="font-medium">ReFi DAO: 50+ local nodes, 300+ founders worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

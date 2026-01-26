'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import Image from 'next/image';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate section label
    gsap.from('.about-label', {
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

    // Animate photo with scale
    gsap.from('.about-photo', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });

    // Animate bio content
    gsap.from('.about-bio-item', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.3,
      ease: 'power2.out',
    });

    // Animate journey tags
    gsap.from('.journey-tag', {
      scrollTrigger: {
        trigger: '.journey-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Animate credential badges
    gsap.from('.credential-badge', {
      scrollTrigger: {
        trigger: '.credentials-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(1.2)',
    });

    // Animate links
    gsap.from('.about-link', {
      scrollTrigger: {
        trigger: '.about-links',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 px-6 bg-[#050507]"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="text-center mb-16">
          <span className="about-label inline-block type-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
            Your Guide
          </span>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left: Photo with styled border */}
          <div className="about-photo relative mx-auto lg:mx-0">
            {/* Animated gradient ring */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-violet-500/40 via-blue-500/30 to-cyan-500/40 blur-xl opacity-60" />

            {/* Main photo container */}
            <div className="relative">
              {/* Decorative corner accents */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-violet-400/50 rounded-tl-2xl" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-400/50 rounded-br-2xl" />

              {/* Photo */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <Image
                  src="/john-e-wedding-headshot.webp"
                  alt="John Ellison"
                  fill
                  className="object-cover"
                  sizes="400px"
                  priority
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 px-4 py-2 rounded-xl bg-gradient-to-br from-violet-600/90 to-blue-600/90 backdrop-blur-md border border-white/20 shadow-xl">
                <div className="type-xs text-white/90 font-medium">16+ Years</div>
                <div className="type-xs text-white/70">Building Products</div>
              </div>
            </div>
          </div>

          {/* Right: Bio Content */}
          <div className="space-y-8">
            {/* Name and intro */}
            <div>
              <h2 className="about-bio-item font-display type-3xl text-white mb-4">
                John Ellison
              </h2>
              <p className="about-bio-item type-xl text-violet-300 font-medium mb-6">
                Builder, Evangelist, Seeker, Creator
              </p>
              <p className="about-bio-item type-lg text-white/80 leading-relaxed">
                I help executives and organizations harness AI to multiply productivity, while building regenerative systems that restore rather than extract.
              </p>
            </div>

            {/* The Journey - Identity Tags (moved above achievements) */}
            <div className="journey-section about-bio-item">
              <h3 className="type-lg font-semibold text-white/90 mb-4 font-display">The Journey</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="journey-tag group p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-violet-400">
                      <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.586V5L7 4z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="type-base font-semibold text-white">Builder</span>
                  </div>
                  <p className="type-xs text-white/60">16+ years crafting products</p>
                </div>

                <div className="journey-tag group p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-emerald-400">
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="type-base font-semibold text-white">Evangelist</span>
                  </div>
                  <p className="type-xs text-white/60">ReFi movement leader</p>
                </div>

                <div className="journey-tag group p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-amber-400">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="type-base font-semibold text-white">Seeker</span>
                  </div>
                  <p className="type-xs text-white/60">Spiritual inquiry & pilgrimage</p>
                </div>

                <div className="journey-tag group p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-pink-400">
                      <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="type-base font-semibold text-white">Creator</span>
                  </div>
                  <p className="type-xs text-white/60">Music as John Dass</p>
                </div>
              </div>
            </div>

            {/* Key achievements */}
            <div className="about-bio-item space-y-4">
              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 shrink-0" />
                  <div>
                    <span className="type-base text-white/90 font-medium">300+ founders supported</span>
                    <span className="type-sm text-white/60"> across AI transformation and regenerative systems</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 shrink-0" />
                  <div>
                    <span className="type-base text-white/90 font-medium">Led growth at Toucan Protocol</span>
                    <span className="type-sm text-white/60"> — $4B+ in carbon credits tokenized</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 shrink-0" />
                  <div>
                    <span className="type-base text-white/90 font-medium">Product at Peak Democracy</span>
                    <span className="type-sm text-white/60"> (acquired by OpenGov)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <div>
                    <span className="type-base text-white/90 font-medium">Co-founded ReFi DAO</span>
                    <span className="type-sm text-white/60"> — 50+ local nodes, 300+ founders worldwide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div className="credentials-section about-bio-item">
              <h3 className="type-lg font-semibold text-white/90 mb-4 font-display">Credentials</h3>
              <div className="flex flex-wrap gap-3">
                <div className="credential-badge px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full type-sm text-violet-300 font-medium">
                  Stanford BJ Fogg Certified
                </div>
                <div className="credential-badge px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full type-sm text-blue-300 font-medium">
                  Claude MCP Expert
                </div>
                <div className="credential-badge px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full type-sm text-emerald-300 font-medium">
                  ReFi Ecosystem Leader
                </div>
                <div className="credential-badge px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full type-sm text-cyan-300 font-medium">
                  Product Strategy Expert
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="about-links about-bio-item flex flex-wrap gap-4 pt-4">
              <Link
                href="/about"
                className="about-link inline-flex items-center gap-2 px-6 py-3 bg-violet-500/10 border border-violet-500/30 rounded-xl text-violet-300 hover:bg-violet-500/20 hover:border-violet-400/50 transition-all duration-300 type-base font-medium"
              >
                Read Full Story
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://open.spotify.com/artist/2t0aYkJc9v4YkHBKjYGWKJ"
                target="_blank"
                rel="noopener noreferrer"
                className="about-link inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 type-base font-medium"
              >
                Listen on Spotify
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@JohnEllison"
                target="_blank"
                rel="noopener noreferrer"
                className="about-link inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 hover:bg-red-500/20 hover:border-red-400/50 transition-all duration-300 type-base font-medium"
              >
                Watch on YouTube
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

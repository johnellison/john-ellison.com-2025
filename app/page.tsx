'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import {
  HeroSection,
  StatsSection,
  FeaturedWorkSection,
  WritingsSection,
  PodcastSection,
  RegenerativeVisionSection,
  AboutSection,
} from './components/home';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Problem section
    gsap.fromTo('.problem-card',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: { trigger: '.problem-section', start: 'top 80%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out'
      }
    );

    // Services section
    gsap.fromTo('.service-card',
      { y: 60, opacity: 0, scale: 0.98 },
      {
        scrollTrigger: { trigger: '.services-section', start: 'top 80%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out'
      }
    );

    // CTA section
    gsap.fromTo('.cta-content',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: '.cta-section', start: 'top 80%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 1, ease: 'power2.out'
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B0B0F]">
      {/* Hero Section */}
      <HeroSection />

      {/* Problem Section */}
      <section className="problem-section py-24 px-6 bg-[#050507]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block type-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4">
              The Challenge
            </span>
            <h2 className="heading-section text-white">
              AI Is Everywhere.<br />
              <span className="text-white/60">Results Are Rare.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Drowning in Admin',
                description: '42% of executives say admin tasks block their most important work.'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'AI-Curious, AI-Stuck',
                description: 'Only 32% of leaders feel confident they have skills to implement AI.'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                    <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    <path d="M8 6v12M16 6v12" strokeDasharray="2 2" />
                  </svg>
                ),
                title: 'Fragmented Tools',
                description: 'Workers spend 60% of time coordinating, only 13% on strategy.'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                title: 'No Time to Optimize',
                description: 'The people who most need AI are too busy to figure it out.'
              }
            ].map((card, index) => (
              <div
                key={index}
                className="problem-card group p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 group-hover:bg-violet-500/20 transition-colors">
                  {card.icon}
                </div>
                <h3 className="type-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="type-base text-white/60 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regenerative Vision Section */}
      <RegenerativeVisionSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Services Section */}
      <section className="services-section py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block type-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4">
              Services
            </span>
            <h2 className="heading-section text-white mb-4">
              Two Paths to <span className="text-gradient-prism">AI Transformation</span>
            </h2>
            <p className="type-lg text-white/60 max-w-[55ch] mx-auto">
              Whether you&apos;re transforming yourself or your organization, I have a solution designed for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Executive Service Card */}
            <div className="service-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-violet-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-violet-400">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="type-xs font-medium text-violet-400 uppercase tracking-wider">For Executives</span>
                </div>

                <h3 className="type-2xl font-bold text-white mb-4">
                  Executive AI Transformation
                </h3>

                <p className="type-base text-white/60 mb-6 leading-relaxed">
                  We rebuild your personal operating system with AI. Email triage, calendar optimization,
                  meeting summaries, document creation&mdash;all customized to your workflow.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {['Email Management', 'Calendar AI', 'Meeting Summaries', 'Document Creation'].map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full type-xs text-violet-300">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <div className="type-xs text-white/40 uppercase tracking-wider mb-1">Starting at</div>
                    <div className="type-xl font-bold text-white">$10,000</div>
                  </div>
                  <Link
                    href="/executive-ai-transformation"
                    className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors type-sm font-medium"
                  >
                    Learn More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Organization Service Card */}
            <div className="service-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-blue-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-blue-400">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="type-xs font-medium text-blue-400 uppercase tracking-wider">For Organizations</span>
                </div>

                <h3 className="type-2xl font-bold text-white mb-4">
                  Organizational AI Transformation
                </h3>

                <p className="type-base text-white/60 mb-6 leading-relaxed">
                  Comprehensive AI transformation for teams and companies. From assessment and strategy
                  to implementation and training&mdash;we build AI into your operations.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {['AI Readiness Assessment', 'Workflow Automation', 'Team Training', 'Custom Integrations'].map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full type-xs text-blue-300">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <div className="type-xs text-white/40 uppercase tracking-wider mb-1">Starting at</div>
                    <div className="type-xl font-bold text-white">$25,000</div>
                  </div>
                  <Link
                    href="/ai-transformation"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors type-sm font-medium"
                  >
                    Learn More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors type-base"
            >
              Compare all services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <FeaturedWorkSection />

      {/* Writings Section */}
      <WritingsSection />

      {/* Podcast Section */}
      <PodcastSection />

      {/* About Section */}
      <AboutSection />

      {/* CTA Section - Enhanced with floating imagery */}
      <section className="cta-section min-h-[75vh] py-32 px-6 relative overflow-hidden flex items-center bg-[#050507]">
        {/* Prismatic Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(124,58,237,0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(59,130,246,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 60%)'
          }}
        />

        {/* Floating Images - Desktop only */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {/* Top Left */}
          <div className="absolute top-[15%] left-[8%] w-[14vw] max-w-[200px] aspect-video rounded-xl overflow-hidden border border-white/10 opacity-40 rotate-[-3deg]">
            <Image
              src="/images/john-ai-sprint-session.webp"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          {/* Top Right */}
          <div className="absolute top-[20%] right-[6%] w-[12vw] max-w-[180px] aspect-square rounded-full overflow-hidden border border-white/10 opacity-40">
            <Image
              src="/images/ai-transformation/john-ai-closeup.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          {/* Bottom Left */}
          <div className="absolute bottom-[20%] left-[5%] w-[10vw] max-w-[150px] aspect-square rounded-full overflow-hidden border border-white/10 opacity-30">
            <Image
              src="/images/refi-dao-cover-image.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          {/* Bottom Right */}
          <div className="absolute bottom-[15%] right-[10%] w-[13vw] max-w-[190px] aspect-video rounded-xl overflow-hidden border border-white/10 opacity-40 rotate-[2deg]">
            <Image
              src="/images/ai-transformation/john-strategy-session.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="cta-content relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display type-4xl text-white leading-tight mb-6">
            Ready to <span className="text-gradient-prism">Transform</span>?
          </h2>
          <p className="type-lg text-white/60 mb-10 max-w-[45ch] mx-auto">
            Start with a free consultation to explore how AI can multiply your productivity and liberate you to fulfill your purpose as an individual and an organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://calendar.app.google/wirgV6a4Vcz7cZAcA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary uppercase tracking-wide px-8 py-4 text-sm md:text-base shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_45px_rgba(124,58,237,0.5)] transition-shadow duration-300"
            >
              Book Discovery Call
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/executive-ai-transformation#assessment"
              className="btn-secondary uppercase tracking-wide px-8 py-4 text-sm md:text-base"
            >
              Take Free Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

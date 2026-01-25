'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Hero animations
    const heroTl = gsap.timeline();
    heroTl
      .from('.hero-label', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' })
      .from('.hero-headline', { y: 40, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
      .from('.hero-description', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6');

    // Service cards
    gsap.fromTo('.service-card',
      { y: 60, opacity: 0 },
      {
        scrollTrigger: { trigger: '.services-grid', start: 'top 85%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out'
      }
    );

    // Comparison table
    gsap.fromTo('.comparison-section',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: '.comparison-section', start: 'top 85%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out'
      }
    );

    // CTA section
    gsap.fromTo('.cta-content',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: '.cta-section', start: 'top 85%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out'
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B0B0F]">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(124, 58, 237, 0.12) 0%, transparent 60%)'
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="hero-label inline-block font-sans type-sm font-medium tracking-widest uppercase text-violet-400 mb-6 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md">
            Services
          </span>

          <h1 className="hero-headline font-display type-4xl tracking-wide uppercase font-bold text-white leading-[1.1] mb-8">
            AI Transformation{' '}
            <span className="text-gradient-prism">Services</span>
          </h1>

          <p className="hero-description type-lg text-white/70 max-w-[55ch] mx-auto leading-relaxed">
            Whether you&apos;re an executive looking to reclaim your time or an organization
            ready to embed AI into operations, I have a solution designed for your needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="services-grid max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Executive AI Transformation */}
          <div className="service-card group relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-transparent">
            <div className="absolute top-0 right-0 px-4 py-2 bg-violet-500/20 rounded-bl-xl">
              <span className="type-xs font-medium text-violet-300 uppercase tracking-wider">For Individuals</span>
            </div>

            <div className="p-8 md:p-10">
              <div className="w-14 h-14 rounded-xl bg-violet-500/20 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-violet-400">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              <h2 className="type-2xl font-bold text-white mb-4">
                Executive AI Transformation
              </h2>

              <p className="type-base text-white/60 mb-8 leading-relaxed">
                Transform your personal operating system with AI. We customize every workflow to your
                voice, preferences, and business context&mdash;not generic prompts, but tailored automation.
              </p>

              {/* Tiers */}
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="type-base font-semibold text-white">Transformation Package</h3>
                    <span className="type-sm font-bold text-violet-400">$10K-$25K</span>
                  </div>
                  <p className="type-sm text-white/50">4-8 week engagement. Full workflow rebuild with 30-day hypercare.</p>
                </div>

                <div className="p-4 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="type-base font-semibold text-white">24/7 AI Assistant</h3>
                    <span className="type-sm font-bold text-violet-400">$500/mo</span>
                  </div>
                  <p className="type-sm text-white/50">Ongoing AI assistant with human oversight and continuous optimization.</p>
                </div>

                <div className="p-4 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="type-base font-semibold text-white">AI Readiness Assessment</h3>
                    <span className="type-sm font-bold text-emerald-400">Free</span>
                  </div>
                  <p className="type-sm text-white/50">15-question assessment with personalized archetype and recommendations.</p>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <p className="type-xs text-white/40 uppercase tracking-wider mb-3">What&apos;s Transformed</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Email Management',
                    'Calendar Optimization',
                    'Meeting Summaries',
                    'Document Creation',
                    'Team Communication',
                    'Business Intelligence'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      <span className="type-sm text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mb-8 pb-8 border-b border-white/10">
                <div>
                  <div className="type-xl font-bold text-white">25-40</div>
                  <div className="type-xs text-white/40">Hours saved/week</div>
                </div>
                <div>
                  <div className="type-xl font-bold text-white">4-8</div>
                  <div className="type-xs text-white/40">Week timeline</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/executive-ai-transformation"
                  className="btn-primary flex-1 justify-center uppercase tracking-wide px-6 py-3 text-sm"
                >
                  Learn More
                </Link>
                <Link
                  href="/executive-ai-transformation#assessment"
                  className="btn-secondary flex-1 justify-center uppercase tracking-wide px-6 py-3 text-sm"
                >
                  Take Assessment
                </Link>
              </div>
            </div>
          </div>

          {/* Organizational AI Transformation */}
          <div className="service-card group relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-transparent">
            <div className="absolute top-0 right-0 px-4 py-2 bg-blue-500/20 rounded-bl-xl">
              <span className="type-xs font-medium text-blue-300 uppercase tracking-wider">For Organizations</span>
            </div>

            <div className="p-8 md:p-10">
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-blue-400">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              <h2 className="type-2xl font-bold text-white mb-4">
                Organizational AI Transformation
              </h2>

              <p className="type-base text-white/60 mb-8 leading-relaxed">
                Comprehensive AI transformation for teams and companies. From readiness assessment
                to full implementation&mdash;we embed AI into your operations systematically.
              </p>

              {/* Phases */}
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="type-base font-semibold text-white">Discovery & Assessment</h3>
                    <span className="type-sm font-bold text-blue-400">Week 1-2</span>
                  </div>
                  <p className="type-sm text-white/50">AI readiness assessment, workflow audit, opportunity mapping.</p>
                </div>

                <div className="p-4 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="type-base font-semibold text-white">Strategy & Architecture</h3>
                    <span className="type-sm font-bold text-blue-400">Week 3-4</span>
                  </div>
                  <p className="type-sm text-white/50">Custom AI toolkit design, integration planning, governance framework.</p>
                </div>

                <div className="p-4 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="type-base font-semibold text-white">Implementation & Training</h3>
                    <span className="type-sm font-bold text-blue-400">Week 5-12</span>
                  </div>
                  <p className="type-sm text-white/50">Pilot deployment, team training, iterative rollout, optimization.</p>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <p className="type-xs text-white/40 uppercase tracking-wider mb-3">Capabilities</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'AI Readiness Assessment',
                    'Workflow Automation',
                    'Custom Integrations',
                    'Team Training',
                    'Change Management',
                    'Ongoing Support'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="type-sm text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mb-8 pb-8 border-b border-white/10">
                <div>
                  <div className="type-xl font-bold text-white">$1M-$50M</div>
                  <div className="type-xs text-white/40">Company size</div>
                </div>
                <div>
                  <div className="type-xl font-bold text-white">8-12</div>
                  <div className="type-xs text-white/40">Week engagement</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/ai-transformation"
                  className="btn-primary flex-1 justify-center uppercase tracking-wide px-6 py-3 text-sm bg-blue-600 hover:bg-blue-500"
                >
                  Learn More
                </Link>
                <Link
                  href="/ai-transformation#assessment"
                  className="btn-secondary flex-1 justify-center uppercase tracking-wide px-6 py-3 text-sm border-blue-500/30 hover:border-blue-500/50"
                >
                  Take Assessment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="comparison-section py-24 px-6 bg-[#050507]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-section text-white mb-4">
              Which Service Is Right for You?
            </h2>
            <p className="type-base text-white/60 max-w-[50ch] mx-auto">
              Both services leverage the same AI expertise&mdash;the difference is scope and focus.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-left type-sm text-white/40 uppercase tracking-wider font-medium">Dimension</th>
                  <th className="py-4 px-4 text-center type-sm text-violet-400 uppercase tracking-wider font-medium">Executive</th>
                  <th className="py-4 px-4 text-center type-sm text-blue-400 uppercase tracking-wider font-medium">Organization</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dimension: 'Focus', executive: 'Personal productivity', organization: 'Team/company operations' },
                  { dimension: 'Timeline', executive: '4-8 weeks', organization: '8-12 weeks' },
                  { dimension: 'Investment', executive: '$10K-$25K', organization: '$25K-$100K+' },
                  { dimension: 'Users', executive: '1 executive', organization: '5-50+ team members' },
                  { dimension: 'Workflows', executive: '6 core workflows', organization: 'Custom to business' },
                  { dimension: 'Training', executive: '1:1 sessions', organization: 'Team workshops' },
                  { dimension: 'Assessment', executive: 'Individual archetype', organization: '6-dimension org score' },
                  { dimension: 'Ongoing Option', executive: '$500/mo assistant', organization: 'Retainer packages' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 type-sm text-white/70">{row.dimension}</td>
                    <td className="py-4 px-4 text-center type-sm text-white">{row.executive}</td>
                    <td className="py-4 px-4 text-center type-sm text-white">{row.organization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 bg-white/[0.02] rounded-xl border border-white/[0.06]">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 shrink-0 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-emerald-400">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="type-base font-semibold text-white mb-1">Not sure which is right?</h3>
                <p className="type-sm text-white/60">
                  Book a free discovery call. We&apos;ll discuss your situation and recommend the best path forward&mdash;no
                  pressure, no commitment required.
                </p>
              </div>
              <Link
                href="https://calendar.app.google/wirgV6a4Vcz7cZAcA"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 btn-primary uppercase tracking-wide px-6 py-3 text-sm"
              >
                Book Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block type-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4">
              How It Works
            </span>
            <h2 className="heading-section text-white">
              Simple Process,{' '}
              <span className="text-gradient-prism">Profound Results</span>
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Discovery Call',
                description: 'We discuss your current situation, challenges, and goals. I ask questions to understand your unique context and determine if we\'re a good fit.'
              },
              {
                step: '02',
                title: 'Assessment & Proposal',
                description: 'Based on our conversation (and optionally, a formal assessment), I create a customized proposal with clear deliverables, timeline, and investment.'
              },
              {
                step: '03',
                title: 'Deep Dive & Design',
                description: 'We conduct a thorough workflow audit and design your custom AI architecture. Every recommendation is tailored to your specific needs.'
              },
              {
                step: '04',
                title: 'Implementation',
                description: 'I build and deploy your AI systems, integrating with your existing tools. You\'re involved throughout with regular check-ins and feedback loops.'
              },
              {
                step: '05',
                title: 'Training & Handover',
                description: 'Comprehensive training ensures you\'re confident with every system. Full documentation and 30-day hypercare support included.'
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <span className="type-sm font-bold text-violet-400">{item.step}</span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="type-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="type-base text-white/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-32 px-6 bg-[#050507] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 60%)'
          }}
        />

        <div className="cta-content relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display type-4xl text-white leading-tight mb-6">
            Ready to Get Started?
          </h2>
          <p className="type-lg text-white/60 mb-10 max-w-[45ch] mx-auto">
            The first step is always a conversation. Let&apos;s discuss your situation and find the right path forward.
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

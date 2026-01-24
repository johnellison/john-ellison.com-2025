'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import { BlogPostMetadata } from '@/types/blog';

interface WritingHeroProps {
  featuredPost?: BlogPostMetadata | null;
}

export function WritingHero({ featuredPost }: WritingHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.from('.writing-hero-content', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={heroRef} className="px-3 py-6 md:py-10">
      {/* New Blog Banner */}
      <Link
        href="/blog"
        className="block max-w-4xl mx-auto mb-8 py-2 px-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all group"
      >
        <div className="flex items-center justify-center gap-3 text-center">
          <span className="text-2xl">✨</span>
          <div>
            <span className="text-white font-medium">New!</span>{' '}
            <span className="text-gray-300">
              Check out the native blog at{' '}
              <span className="text-[#a78bfa] group-hover:underline font-medium">
                john-ellison.com/blog
              </span>
            </span>
          </div>
          <svg
            className="w-5 h-5 text-[#a78bfa] transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </Link>

      <div className="max-w-4xl mx-auto text-center writing-hero-content">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="type-sm text-white/60">Building in Public</span>
        </div>

        {/* Title */}
        <h1 className="heading-section mb-6">
          Writing &{' '}
          <span className="text-gradient-prism">Essays</span>
        </h1>

        {/* Description */}
        <p className="type-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Two publications exploring the intersection of technology and wisdom.
          Building in public with AI, and discovering what regeneration means for the planetary age.
        </p>

        {/* Subscribe CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://iamjohnellison.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-6 py-3 text-sm inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
            </svg>
            Subscribe to Building With AI
          </a>
          <a
            href="https://regenera.xyz/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-300 text-sm font-medium"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
            </svg>
            Subscribe to Regenera
          </a>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group relative block w-full text-left bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#a78bfa]/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10"
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-5/12 aspect-video md:aspect-auto min-h-[220px] md:min-h-[260px]">
                <Image
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold text-black bg-white/90 backdrop-blur-md rounded-full shadow-lg uppercase tracking-wide">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#a78bfa] text-xs font-bold uppercase tracking-wider">
                    {featuredPost.category?.replace(/-/g, ' ')}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/40 text-xs uppercase tracking-wider">
                    {featuredPost.readingTime}
                  </span>
                </div>
                <h3 className="font-display text-lg md:text-xl font-bold text-white mb-3 group-hover:text-[#a78bfa] transition-colors leading-tight">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-400 line-clamp-2 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-6 flex items-center text-sm font-bold text-white group-hover:text-[#a78bfa] transition-colors">
                  Read Essay
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}

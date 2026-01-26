'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import Link from 'next/link';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid: string;
  image: string | null;
}

interface RegeneraPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid: string;
  image: string | null;
}

export function WritingsSection() {
  const [substackPosts, setSubstackPosts] = useState<SubstackPost[]>([]);
  const [regeneraPosts, setRegeneraPosts] = useState<RegeneraPost[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const [substackRes, regeneraRes] = await Promise.all([
          fetch('/api/substack'),
          fetch('/api/regenera')
        ]);

        const [substackData, regeneraData] = await Promise.all([
          substackRes.json(),
          regeneraRes.json()
        ]);

        // Get 4 from Substack, 2 from Regenera to balance columns
        setSubstackPosts((substackData.posts || []).slice(0, 4));
        setRegeneraPosts((regeneraData.posts || []).slice(0, 2));
      } catch (err) {
        console.error('Failed to load writings:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || loading) return;

    // Animate section header
    gsap.fromTo('.writings-header',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }
    );

    // Animate cards with stagger
    gsap.fromTo('.writing-card',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
      }
    );
  }, [loading]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <section className="px-6 py-24 bg-[#050507]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="px-6 py-24 bg-[#050507]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="writings-header mb-12 text-center lg:text-left">
          <p className="type-sm uppercase tracking-widest text-white/40 mb-3">
            Writings
          </p>
          <h2 className="heading-section mb-4">
            Thoughts on AI, <span className="text-gradient-prism">Regeneration</span> & Wisdom
          </h2>
          <p className="type-base text-white/60 max-w-2xl mx-auto lg:mx-0">
            Essays exploring the intersection of ancient wisdom and modern technology,
            building with AI, and regenerative futures.
          </p>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Left Side - Substack (Larger, 2 posts) */}
          <div className="lg:col-span-7 space-y-6">
            {substackPosts.map((post) => (
              <a
                key={post.guid}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="writing-card group block rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  {post.image && (
                    <div className="relative md:w-[280px] aspect-[16/9] md:aspect-[4/3] overflow-hidden shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 type-xs uppercase tracking-wider">
                        Substack
                      </span>
                      <p className="type-xs text-white/40 uppercase tracking-wider">
                        {formatDate(post.pubDate)}
                      </p>
                    </div>

                    <h3 className="heading-subsection text-white mb-3 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="type-sm text-white/50 leading-relaxed line-clamp-2 mb-4">
                      {truncateText(post.description, 150)}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Right Side - Regenera (Smaller, 2 posts) */}
          <div className="lg:col-span-5 space-y-6">
            {regeneraPosts.map((post) => (
              <a
                key={post.guid}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="writing-card group block rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                {post.image && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 type-xs uppercase tracking-wider">
                      Regenera
                    </span>
                    <p className="type-xs text-white/40 uppercase tracking-wider">
                      {formatDate(post.pubDate)}
                    </p>
                  </div>

                  <h3 className="heading-subsection text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="type-sm text-white/50 leading-relaxed line-clamp-3 mb-4">
                    {truncateText(post.description, 120)}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span>Read more</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] border border-white/[0.1] text-white/90 hover:bg-white/[0.08] hover:border-white/[0.2] hover:text-white transition-all duration-300"
          >
            View all writings
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid: string;
  image: string | null;
}

export function PostsGrid() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/substack');
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setPosts(data.posts || []);
        }
      } catch (err) {
        setError('Failed to load posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || loading) return;

    gsap.from('.post-card', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, [loading, posts]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const truncateDescription = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  return (
    <section ref={sectionRef} className="px-6 py-12 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <p className="type-sm uppercase tracking-widest text-white/40 mb-3">Building with AI</p>
          <h2 className="heading-section mb-4">
            John&apos;s <span className="text-gradient-prism">Substack</span>
          </h2>
          <p className="type-base text-white/60 max-w-2xl">
            A regenerative entrepreneur&apos;s real-time journey of building in public with AI.
            Essays on vibe coding, Claude tutorials, and the frontier of human-AI collaboration.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="type-base text-white/60 mb-4">{error}</p>
            <a
              href="https://iamjohnellison.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Visit Substack Directly
            </a>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="type-base text-white/60 mb-4">No posts found</p>
            <a
              href="https://iamjohnellison.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Visit Substack
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <a
                key={post.guid}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="post-card group block rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
              >
                {/* Featured Image */}
                {post.image && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  {/* Date */}
                  <p className="type-xs text-white/40 mb-3 uppercase tracking-wider">
                    {formatDate(post.pubDate)}
                  </p>

                  {/* Title */}
                  <h3 className="heading-card text-white mb-3 group-hover:text-gradient-prism transition-all duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="type-sm text-white/50 leading-relaxed line-clamp-3">
                    {truncateDescription(post.description)}
                  </p>

                  {/* Read More */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span>Read on Substack</span>
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
        )}

        {/* View All CTA */}
        {!loading && posts.length > 0 && (
          <div className="text-center mt-12">
            <a
              href="https://iamjohnellison.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              View All Posts on Substack
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

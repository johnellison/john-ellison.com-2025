'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import Image from 'next/image';

interface PodcastEpisode {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  duration: string;
  guid: string;
  image: string | null;
}

// Platform links with SVG icons
const podcastLinks = [
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/show/yourshowid',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: 'Apple Podcasts',
    url: 'https://podcasts.apple.com/podcast/yourpodcast',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59-.312 1.16-.912 1.16h-.036c-.468 0-.876-.324-.96-.78-.36-1.854-1.116-3.186-2.34-4.14-1.548-1.206-3.42-1.53-5.016-1.194-3.672.768-6.12 3.996-6.12 7.704 0 3.168 1.92 6.228 5.028 7.476.648.264 1.368.42 2.076.42 1.236 0 2.532-.36 3.732-1.092.456-.276 1.044-.144 1.332.312.276.456.144 1.044-.312 1.332-1.548.948-3.252 1.404-4.92 1.404-.9 0-1.8-.18-2.652-.528-3.948-1.584-6.372-5.46-6.372-9.564 0-4.692 3.06-8.892 7.656-9.792.612-.12 1.224-.18 1.836-.18h-.36zm.12 5.04c.468 0 .936.036 1.404.12 3.252.576 5.496 3.612 5.016 6.888-.336 2.196-1.908 4.08-4.008 4.728-.624.192-1.26.3-1.896.3-2.088 0-4.08-.972-5.268-2.736-.276-.396-.18-.948.216-1.224s.948-.18 1.224.216c.888 1.32 2.376 2.04 3.9 2.04.456 0 .912-.072 1.356-.216 1.512-.468 2.628-1.824 2.868-3.396.348-2.34-1.26-4.5-3.588-4.908a4.399 4.399 0 00-1.008-.108c-1.296 0-2.532.528-3.456 1.476a4.32 4.32 0 00-.996 1.596c-.156.456-.648.72-1.116.564-.468-.156-.72-.648-.564-1.116a6.024 6.024 0 011.392-2.244c1.284-1.308 3.012-2.04 4.824-2.04h-.3v.06zm.444 4.056c1.02 0 1.848.828 1.848 1.848 0 .66-.36 1.248-.888 1.572v3.492c0 .528-.432.96-.96.96s-.96-.432-.96-.96V15.06a1.856 1.856 0 01-.888-1.572c0-1.02.828-1.848 1.848-1.848v.024z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@iamjohnellison',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export function PodcastSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [featuredEpisode, setFeaturedEpisode] = useState<PodcastEpisode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedEpisode() {
      try {
        const response = await fetch('/api/podcast');
        const data = await response.json();

        if (data.episodes && data.episodes.length > 0) {
          setFeaturedEpisode(data.episodes[0]);
        }
      } catch (err) {
        console.error('Failed to load podcast:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedEpisode();
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || loading) return;

    // Animate section header
    gsap.fromTo('.podcast-header',
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

    // Animate podcast card
    gsap.fromTo('.podcast-card',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }
    );

    // Animate subscribe buttons
    gsap.fromTo('.podcast-link',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
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
    if (!text || text.length <= maxLength) return text || '';
    return text.slice(0, maxLength).trim() + '...';
  };

  return (
    <section ref={sectionRef} className="px-6 py-24 bg-[#0B0B0F]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="podcast-header mb-12 text-center">
          <p className="type-sm uppercase tracking-widest text-white/40 mb-3">
            Podcast
          </p>
          <h2 className="heading-section mb-4">
            The <span className="text-gradient-prism">John Ellison</span> Show
          </h2>
          <p className="type-lg text-white/70 max-w-2xl mx-auto mb-2">
            Ancient Wisdom Meets Modern Technology
          </p>
          <p className="type-base text-white/60 max-w-2xl mx-auto">
            Weekly conversations exploring the intersection of AI, productivity, and living with intention.
          </p>
        </div>

        {/* Featured Episode Card - Like WritingHero format */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin" />
          </div>
        ) : featuredEpisode ? (
          <a
            href={featuredEpisode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="podcast-card group relative block w-full text-left bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-violet-500/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10"
          >
            <div className="flex flex-col md:flex-row">
              {/* Featured Image - Left side */}
              <div className="relative w-full md:w-5/12 aspect-video md:aspect-auto min-h-[220px] md:min-h-[280px]">
                {featuredEpisode.image ? (
                  <Image
                    src={featuredEpisode.image}
                    alt={featuredEpisode.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-purple-900/50 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white/20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold text-black bg-white/90 backdrop-blur-md rounded-full shadow-lg uppercase tracking-wide">
                    Latest Episode
                  </span>
                </div>
                {featuredEpisode.duration && (
                  <span className="absolute bottom-4 right-4 px-3 py-1 text-xs bg-black/60 backdrop-blur-sm text-white/90 rounded-full">
                    {featuredEpisode.duration}
                  </span>
                )}
              </div>

              {/* Content - Right side */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-violet-400 text-xs font-bold uppercase tracking-wider">
                    The John Ellison Show
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/40 text-xs uppercase tracking-wider">
                    {formatDate(featuredEpisode.pubDate)}
                  </span>
                </div>

                <h3 className="font-display text-lg md:text-xl font-bold text-white mb-4 group-hover:text-violet-400 transition-colors leading-tight line-clamp-2">
                  {featuredEpisode.title}
                </h3>

                <p className="text-white/60 line-clamp-3 leading-relaxed mb-6">
                  {truncateText(featuredEpisode.description, 200)}
                </p>

                <div className="flex items-center text-sm font-bold text-white group-hover:text-violet-400 transition-colors">
                  Listen Now
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
          </a>
        ) : (
          <Link
            href="/podcast"
            className="podcast-card group block rounded-3xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-fuchsia-500/10 border border-violet-500/20 hover:border-violet-400/40 transition-all duration-500 overflow-hidden p-8 text-center"
          >
            <h3 className="font-display type-2xl text-white mb-4">
              Explore the Podcast
            </h3>
            <p className="type-base text-white/60 mb-6">
              Weekly conversations on AI, productivity, and regenerative futures.
            </p>
            <span className="btn-primary inline-flex">
              View All Episodes
            </span>
          </Link>
        )}

        {/* Subscribe Buttons - Simple, minimal like PodcastHero */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 mb-6">
          {podcastLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="podcast-link btn-secondary px-4 py-2 inline-flex items-center gap-2 text-sm"
            >
              {link.icon}
              {link.name}
            </a>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/podcast"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors type-base"
          >
            View all episodes
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

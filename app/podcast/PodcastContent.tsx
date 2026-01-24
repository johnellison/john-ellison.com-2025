'use client';

import { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import Link from 'next/link';

interface PodcastEpisode {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  duration: string;
  guid: string;
  image: string | null;
}

function EpisodeGrid({
  episodes,
  loading,
  error,
  accentColor = 'purple',
  fallbackUrl,
  fallbackText,
}: {
  episodes: PodcastEpisode[];
  loading: boolean;
  error: string | null;
  accentColor?: 'purple' | 'emerald';
  fallbackUrl: string;
  fallbackText: string;
}) {
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

  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  const colorClasses = accentColor === 'emerald'
    ? {
      border: 'hover:border-emerald-500/30',
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      link: 'text-emerald-400 group-hover:text-emerald-300',
      spinner: 'border-t-emerald-500',
    }
    : {
      border: 'hover:border-purple-500/30',
      badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      link: 'text-purple-400 group-hover:text-purple-300',
      spinner: 'border-t-purple-500',
    };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className={`w-8 h-8 border-2 border-white/20 ${colorClasses.spinner} rounded-full animate-spin`} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="type-base text-white/60 mb-4">{error}</p>
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          {fallbackText}
        </a>
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="type-base text-white/60 mb-4">No episodes found</p>
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          {fallbackText}
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {episodes.slice(0, 6).map((episode) => (
        <a
          key={episode.guid}
          href={episode.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`episode-card group block rounded-2xl bg-white/[0.03] border border-white/[0.06] ${colorClasses.border} hover:bg-white/[0.05] transition-all duration-300 overflow-hidden`}
        >
          {/* Episode Image */}
          {episode.image && (
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={episode.image}
                alt={episode.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {episode.duration && (
                <span className={`absolute bottom-3 right-3 px-2 py-1 text-xs rounded-full ${colorClasses.badge}`}>
                  {episode.duration}
                </span>
              )}
            </div>
          )}

          <div className="p-5">
            {/* Date */}
            <p className="type-xs text-white/40 mb-2 uppercase tracking-wider">
              {formatDate(episode.pubDate)}
            </p>

            {/* Title */}
            <h3 className="heading-card text-white mb-2 group-hover:text-gradient-prism transition-all duration-300 line-clamp-2">
              {episode.title}
            </h3>

            {/* Description */}
            <p className="type-sm text-white/50 leading-relaxed line-clamp-2 mb-4">
              {truncateDescription(episode.description)}
            </p>

            {/* Listen Link */}
            <div className={`flex items-center gap-2 text-sm ${colorClasses.link} transition-colors`}>
              <span>Listen</span>
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
  );
}

export function PodcastContent() {
  const [johnElllisonEpisodes, setJohnEllisonEpisodes] = useState<PodcastEpisode[]>([]);
  const [refiEpisodes, setRefiEpisodes] = useState<PodcastEpisode[]>([]);
  const [johnEllisonLoading, setJohnEllisonLoading] = useState(true);
  const [refiLoading, setRefiLoading] = useState(true);
  const [johnEllisonError, setJohnEllisonError] = useState<string | null>(null);
  const [refiError, setRefiError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchJohnEllisonPodcast() {
      try {
        const response = await fetch('/api/podcast');
        const data = await response.json();

        if (data.error) {
          setJohnEllisonError(data.error);
        } else {
          setJohnEllisonEpisodes(data.episodes || []);
        }
      } catch (err) {
        setJohnEllisonError('Failed to load episodes');
        console.error(err);
      } finally {
        setJohnEllisonLoading(false);
      }
    }

    async function fetchRefiPodcast() {
      try {
        const response = await fetch('/api/refi-podcast');
        const data = await response.json();

        if (data.error) {
          setRefiError(data.error);
        } else {
          setRefiEpisodes(data.episodes || []);
        }
      } catch (err) {
        setRefiError('Failed to load episodes');
        console.error(err);
      } finally {
        setRefiLoading(false);
      }
    }

    fetchJohnEllisonPodcast();
    fetchRefiPodcast();
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.content-title', {
      scrollTrigger: {
        trigger: '.content-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from('.episode-card', {
      scrollTrigger: {
        trigger: '.episodes-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
    });
  }, [johnEllisonLoading, refiLoading]);

  return (
    <section ref={sectionRef} className="px-6 py-12 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* The John Ellison Show Section */}
        <div className="mb-20">


          <div className="episodes-grid">
            <EpisodeGrid
              episodes={johnElllisonEpisodes}
              loading={johnEllisonLoading}
              error={johnEllisonError}
              accentColor="purple"
              fallbackUrl="https://open.spotify.com/show/your-show-id"
              fallbackText="Listen on Spotify"
            />
          </div>

          {!johnEllisonLoading && johnElllisonEpisodes.length > 0 && (
            <div className="text-center mt-10">
              <a
                href="https://open.spotify.com/show/your-show-id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                View All Episodes
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

        {/* ReFi Podcast Section */}
        <div className="mb-16">
          <div className="content-title mb-10">
            <p className="type-sm uppercase tracking-widest text-white/40 mb-3">Regenerative Finance</p>
            <h2 className="heading-section mb-4">
              ReFi <span className="text-emerald-400">Podcast</span>
            </h2>
            <p className="type-base text-white/60 max-w-2xl">
              25+ episodes exploring how crypto can finance climate action at scale. Conversations with builders, thinkers, and change-makers in the regenerative finance movement.
            </p>
          </div>

          <div className="episodes-grid">
            <EpisodeGrid
              episodes={refiEpisodes}
              loading={refiLoading}
              error={refiError}
              accentColor="emerald"
              fallbackUrl="https://www.youtube.com/@iamjohnellison"
              fallbackText="View on YouTube"
            />
          </div>

          {!refiLoading && refiEpisodes.length > 0 && (
            <div className="text-center mt-10">
              <a
                href="https://www.youtube.com/@iamjohnellison"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-300"
              >
                View Full Archive on YouTube
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Guest CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-emerald-500/10 border border-purple-500/20 text-center">
          <h3 className="heading-card text-white mb-3">Interested in Being a Guest?</h3>
          <p className="type-base text-white/60 mb-6 max-w-xl mx-auto">
            I&apos;m always looking for fascinating conversations with builders, thinkers,
            and seekers working on regenerative futures.
          </p>
          <Link href="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

export function PodcastHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.from('.podcast-hero-content', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={heroRef} className="px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center podcast-hero-content">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] mb-6">
          <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
          </svg>
          <span className="type-sm text-white/60">Podcast</span>
        </div>

        {/* Title */}
        <h1 className="heading-section mb-6">
          The John Ellison{' '}
          <span className="text-gradient-prism">Show</span>
        </h1>

        {/* Tagline */}
        <p className="type-lg text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
          Where ancient wisdom meets modern technology for a regenerative future.
          Conversations exploring AI, Indigenous knowledge, and first principles thinking.
        </p>

        {/* Subscribe Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://open.spotify.com/show/yourshowid"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-6 py-3 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Spotify
          </a>
          <a
            href="https://podcasts.apple.com/podcast/yourpodcast"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-6 py-3 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59-.312 1.16-.912 1.16h-.036c-.468 0-.876-.324-.96-.78-.36-1.854-1.116-3.186-2.34-4.14-1.548-1.206-3.42-1.53-5.016-1.194-3.672.768-6.12 3.996-6.12 7.704 0 3.168 1.92 6.228 5.028 7.476.648.264 1.368.42 2.076.42 1.236 0 2.532-.36 3.732-1.092.456-.276 1.044-.144 1.332.312.276.456.144 1.044-.312 1.332-1.548.948-3.252 1.404-4.92 1.404-.9 0-1.8-.18-2.652-.528-3.948-1.584-6.372-5.46-6.372-9.564 0-4.692 3.06-8.892 7.656-9.792.612-.12 1.224-.18 1.836-.18h-.36zm.12 5.04c.468 0 .936.036 1.404.12 3.252.576 5.496 3.612 5.016 6.888-.336 2.196-1.908 4.08-4.008 4.728-.624.192-1.26.3-1.896.3-2.088 0-4.08-.972-5.268-2.736-.276-.396-.18-.948.216-1.224s.948-.18 1.224.216c.888 1.32 2.376 2.04 3.9 2.04.456 0 .912-.072 1.356-.216 1.512-.468 2.628-1.824 2.868-3.396.348-2.34-1.26-4.5-3.588-4.908a4.399 4.399 0 00-1.008-.108c-1.296 0-2.532.528-3.456 1.476a4.32 4.32 0 00-.996 1.596c-.156.456-.648.72-1.116.564-.468-.156-.72-.648-.564-1.116a6.024 6.024 0 011.392-2.244c1.284-1.308 3.012-2.04 4.824-2.04h-.3v.06zm.444 4.056c1.02 0 1.848.828 1.848 1.848 0 .66-.36 1.248-.888 1.572v3.492c0 .528-.432.96-.96.96s-.96-.432-.96-.96V15.06a1.856 1.856 0 01-.888-1.572c0-1.02.828-1.848 1.848-1.848v.024z"/>
            </svg>
            Apple Podcasts
          </a>
          <a
            href="https://www.youtube.com/@iamjohnellison"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-6 py-3 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

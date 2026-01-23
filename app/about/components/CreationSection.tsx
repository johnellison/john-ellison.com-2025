'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

export function CreationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.creation-title', {
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

    gsap.from('.creation-content', {
      scrollTrigger: {
        trigger: '.creation-content',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="creation-title text-center mb-16">
          <p className="type-sm uppercase tracking-widest text-white/40 mb-4">The Artist Side</p>
          <h2 className="heading-section mb-4">Music as John Dass</h2>
          <p className="type-base text-white/60 max-w-2xl mx-auto">
            During my sabbatical, I explored music as a form of spiritual inquiry.
            John Dass is the artist—vulnerable, seeking, expressing through sound what
            words cannot capture.
          </p>
        </div>

        {/* Content Grid */}
        <div className="creation-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Spotify Embeds */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] p-4">
              <iframe
                src="https://open.spotify.com/embed/track/5atQNylpQhUpElSz7rtOKH?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] p-4">
              <iframe
                src="https://open.spotify.com/embed/track/5kIJlwIbO8urbw8xJqCrIZ?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] p-4">
              <iframe
                src="https://open.spotify.com/embed/track/1U9MBYOIHzTBSfEUXL5ZFh?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
            <p className="text-center text-sm text-white/40">
              Listen on Spotify as John Dass
            </p>
          </div>

          {/* Documentary Section with YouTube Embed */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <h4 className="heading-subsection text-white mb-3">Documentary: Pilgrimage</h4>
              <p className="type-sm text-white/70 mb-4">
                854km sacred walk from Ujjain to the Ganges for Maha Kumbh Mela 2025.
                A hybrid documentary combining video, essay, and daily updates—exploring
                the integration of technology with ancient Hindu pilgrimage.
              </p>
              {/* YouTube Embed */}
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/SaXCou56Tyw"
                  title="Pilgrimage Documentary"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-xl"
                />
              </div>
              <a
                href="https://regenera.xyz/p/introducing-pilgrimage-an-interactive-documentary-series"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                Read the full series
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

const lifeAspects = [
  {
    title: 'Surfer',
    description: 'Finding flow in the ocean. The best ideas come between waves.',
    image: '/images/surfer-john.webp',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Musician',
    description: 'Recording as John Dass. Songs about transformation, vulnerability, and the sacred.',
    image: '/images/guitar-john.webp',
    color: 'from-purple-500 to-violet-400',
  },
  {
    title: 'Father',
    description: 'Loving life as a father of two incredible young boys.',
    image: '/images/emoji-john-jesse-reuben.jpg',
    color: 'from-green-500 to-emerald-400',
  },
];

export function LifeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.life-title', {
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

    gsap.from('.life-card', {
      scrollTrigger: {
        trigger: '.life-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
    });

    // Parallax effect on images
    gsap.utils.toArray('.life-card').forEach((card) => {
      const cardEl = card as HTMLElement;
      const image = cardEl.querySelector('.life-image');
      if (image) {
        gsap.to(image, {
          scrollTrigger: {
            trigger: cardEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: 30,
          ease: 'none',
        });
      }
    });

    // Quote container fade-in animation (simpler, more reliable)
    gsap.from('.quote-container', {
      scrollTrigger: {
        trigger: '.quote-container',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="life-title text-center mb-16">
          <p className="type-sm uppercase tracking-widest text-white/40 mb-4">The Whole Person</p>
          <h2 className="heading-section mb-4">Beyond the Work</h2>
          <p className="type-base text-white/60 max-w-2xl mx-auto">
            Father, husband, musician, surfer, seeker. Integrating ancient wisdom and modern technology.
            The through-line: Regeneration as the only viable option.
          </p>
        </div>

        {/* Life Cards */}
        <div className="life-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {lifeAspects.map((aspect) => (
            <div
              key={aspect.title}
              className="life-card group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={aspect.image}
                  alt={aspect.title}
                  fill
                  className="life-image object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Color Accent */}
                  <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${aspect.color} mb-4`} />

                  <h3 className="heading-card text-white mb-2 group-hover:text-gradient-prism transition-all duration-300">
                    {aspect.title}
                  </h3>
                  <p className="type-sm text-white/70 leading-relaxed">
                    {aspect.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="quote-container mt-20 py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-emerald-500/10 to-blue-500/5 rounded-3xl" />
          <blockquote className="relative text-center max-w-4xl mx-auto px-6">
            <p className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-white/90 leading-relaxed">
              &ldquo;We are not regenerating nature.
              <br />
              <span className="text-gradient-prism font-medium">We are nature regenerating itself.</span>&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

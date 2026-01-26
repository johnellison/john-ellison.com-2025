'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import Link from 'next/link';

interface Venture {
  name: string;
  role: string;
  period: string;
  description: string;
  image: string;
  link: string;
  outcome: string;
  outcomeColor: string;
}

const ventures: Venture[] = [
  {
    name: 'ReFi DAO',
    role: 'Co-founder',
    period: '2022-2024',
    description: 'Global coordination network for regenerative finance, catalyzing the movement through community building.',
    image: '/images/refi-dao-cover-image.jpg',
    link: 'https://refidao.com',
    outcome: '50+ Local Nodes',
    outcomeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    name: 'Toucan Protocol',
    role: 'Head of Growth',
    period: '2021-2022',
    description: 'Brought carbon credits on-chain, building infrastructure for transparent climate action.',
    image: '/images/toucan-collage.jpeg',
    link: 'https://toucan.earth',
    outcome: '$4B+ Carbon Tokenized',
    outcomeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    name: 'Pikl',
    role: 'Design Lead',
    period: '2018-Present',
    description: "UK's leading sharing economy insurance specialist. Series A+ on path to Series B.",
    image: '/images/pikl-wide-panel.jpeg',
    link: 'https://pikl.com',
    outcome: 'Series A+',
    outcomeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    name: 'Goodery',
    role: 'Founder',
    period: '2020-Present',
    description: 'Circular economy grocery connecting local growers with consumers through weekly organic produce subscriptions.',
    image: '/images/Goodery-Wide-Light-Bg Large.jpeg',
    link: 'https://goodery.co.uk',
    outcome: 'Active',
    outcomeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
  },
  {
    name: 'Peak Democracy',
    role: 'Product Manager',
    period: '2016-2018',
    description: 'Civic tech platform empowering community engagement in local government.',
    image: '/images/open-town-hall-mockup.jpeg',
    link: '/work',
    outcome: 'Acquired by OpenGov',
    outcomeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    name: 'Interbeing',
    role: 'Creator',
    period: '2024',
    description: 'AI-powered habit tracking meeting planetary impact. Built in 2 weeks with $80.',
    image: '/images/interbeing-desert-mockup-16x9 Large.jpeg',
    link: '/case-studies/interbeing',
    outcome: 'Shipped',
    outcomeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
];

export function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }
      );

      // Animate cards with stagger
      const cards = cardsRef.current?.querySelectorAll('.work-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );
      }

      // Animate CTA
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#050507]"
    >
      {/* Background decoration - subtle prismatic orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <p className="type-sm uppercase tracking-widest text-white/40 mb-3">
            Portfolio
          </p>
          <h2 className="heading-section mb-4">
            Featured Work
          </h2>
          <p className="type-base text-white/60 max-w-3xl mx-auto">
            16+ years building products across climate, fintech, and civic tech
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
        >
          {ventures.map((venture, index) => (
            <Link
              key={index}
              href={venture.link}
              target={venture.link.startsWith('http') ? '_blank' : undefined}
              rel={venture.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="work-card group relative bg-white/[0.03] backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.06] hover:border-violet-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <Image
                  src={venture.image}
                  alt={venture.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />

                {/* Role badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-white/10 rounded-full">
                  <span className="text-xs font-medium text-white/70">
                    {venture.role}
                  </span>
                </div>

                {/* Outcome badge */}
                <div className={`absolute bottom-4 right-4 px-3 py-1.5 backdrop-blur-sm border rounded-full ${venture.outcomeColor}`}>
                  <span className="text-xs font-semibold">
                    {venture.outcome}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="heading-subsection text-white group-hover:text-violet-400 transition-colors duration-300">
                    {venture.name}
                  </h3>
                  <span className="text-sm text-white/40 ml-2 whitespace-nowrap">
                    {venture.period}
                  </span>
                </div>

                <p className="text-white/50 text-sm md:text-base line-clamp-3 leading-relaxed">
                  {venture.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-4 flex items-center text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium mr-2">View project</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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

              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-violet-500/5" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <Link
            href="/work"
            className="btn-primary inline-flex items-center gap-3"
          >
            <span>View all work</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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

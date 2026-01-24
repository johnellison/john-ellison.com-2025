'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'Toucan Protocol',
    subtitle: 'Carbon Infrastructure',
    description: 'Brought carbon credits on-chain, building the infrastructure for transparent climate action. Led growth from 0 to $4B+ carbon tokenized.',
    image: '/images/toucan-collage.jpeg',
    href: '/case-studies/toucan',
    tags: ['Growth', 'Web3', 'Climate'],
    year: '2021-2022',
  },
  {
    title: 'Interbeing',
    subtitle: 'AI Companion App',
    description: 'Designed and built an AI companion app exploring the intersection of technology and spiritual practice. Built with Claude and React Native.',
    image: '/images/interbeing-desert-mockup-16x9 Large.jpeg',
    href: '/case-studies/interbeing',
    tags: ['AI', 'Mobile', 'Design'],
    year: '2024',
  },
  {
    title: 'ReFi DAO',
    subtitle: 'Global Movement',
    description: 'Co-founded the regenerative finance movement coordination layer. Grew to 50+ local nodes across 6 continents.',
    image: '/images/refi-dao-cover-image.jpg',
    href: 'https://refidao.com',
    external: true,
    tags: ['Community', 'Web3', 'Climate'],
    year: '2022-2024',
  },
];

export function ProjectsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.projects-title', {
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

    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-16 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="projects-title mb-12">
          <p className="type-sm uppercase tracking-widest text-white/40 mb-3">Case Studies</p>
          <h2 className="heading-section">Featured Projects</h2>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid space-y-8">
          {projects.map((project, index) => {
            const CardWrapper = project.external ? 'a' : Link;
            const cardProps = project.external
              ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
              : { href: project.href };

            return (
              <CardWrapper
                key={project.title}
                {...cardProps}
                className="project-card group block"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={`relative aspect-video rounded-xl overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-white/[0.08] text-white/60 border border-white/[0.1]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="heading-card text-white mb-1 group-hover:text-gradient-prism transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="type-sm text-white/50 mb-3">{project.subtitle}</p>

                    {/* Description */}
                    <p className="type-base text-white/60 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Year + CTA */}
                    <div className="flex items-center justify-between">
                      <span className="type-xs text-white/30">{project.year}</span>
                      <span className="flex items-center gap-2 text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
                        {project.external ? 'Visit Site' : 'View Case Study'}
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
                      </span>
                    </div>
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

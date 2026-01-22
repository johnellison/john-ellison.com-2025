'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const teamMembers = [
  {
    name: 'John Ellison',
    role: 'Strategy & Technical Lead',
    photo: '/john-e-wedding-headshot.webp',
    bio: '16 years building products. 300+ founders supported. $18M+ raised. Former design lead at major tech companies. Specializes in rapid AI product development using modern AI-assisted methodologies.',
    quote:
      '"I build AI systems that work technically and deliver measurable business outcomes."',
  },
  {
    name: 'Fatma Ghedira',
    role: 'Organizational Integration Lead',
    photo: '/fatma-headshot.jpeg',
    bio: 'Double Master\'s from Columbia University. 7+ years guiding teams at Snapchat, OneCycle, Google, and the World Economic Forum. Specializes in the "people side" of AI—overcoming resistance and designing organizational systems that actually adopt new technology.',
    quote:
      '"I ensure those systems get adopted—addressing resistance before it blocks progress."',
  },
];

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate label
    gsap.from('.team-label', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Animate title
    gsap.from('.team-title', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Animate cards with stagger
    gsap.from('.team-card', {
      scrollTrigger: {
        trigger: '.team-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="team"
      className="py-24 px-6 bg-[#050507]"
    >
      <div className="max-w-5xl mx-auto">
        <span className="team-label inline-block text-sm font-medium text-violet-400 tracking-wider uppercase mb-4">
          The Team
        </span>

        <h2 className="team-title heading-section mb-16 text-white">
          Two Disciplines. One{' '}
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Integrated Engagement
          </span>
          .
        </h2>

        <div className="team-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-violet-500/30">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <h3 className="heading-card text-white mb-1">
                {member.name}
              </h3>

              <span className="inline-block type-sm font-medium text-violet-400 mb-4">
                {member.role}
              </span>

              <p className="text-white/70 type-sm leading-relaxed mb-4">
                {member.bio}
              </p>

              <p className="text-white/50 type-sm italic border-l-2 border-violet-500/50 pl-4">
                {member.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

interface PrismaticDividerProps {
  className?: string;
}

export function PrismaticDivider({ className = '' }: PrismaticDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!dividerRef.current) return;

    // Animate the divider width from 0 to full on scroll
    gsap.fromTo(
      dividerRef.current,
      {
        scaleX: 0,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <div className={`relative py-8 ${className}`}>
      <div
        ref={dividerRef}
        className="prismatic-divider animated mx-auto max-w-4xl origin-center"
      />
    </div>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

const stats = [
  {
    value: 300,
    suffix: '+',
    label: 'Founders Supported',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    value: 16,
    suffix: '+',
    label: 'Years In Startups',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    value: 18,
    prefix: '$',
    suffix: 'M+',
    label: 'Raised',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    value: 14,
    suffix: '+',
    label: 'Hours Saved Weekly*',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  }
];

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Animate stat cards in
    gsap.fromTo('.stat-card',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.stats-section-inner',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );

    // Animate counters
    countersRef.current.forEach((counter, index) => {
      if (!counter) return;

      const stat = stats[index];
      const targetValue = stat.value;

      gsap.fromTo(counter,
        { innerText: 0 },
        {
          innerText: targetValue,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          onUpdate: function () {
            const currentValue = Math.round(this.targets()[0].innerText);
            counter.innerText = currentValue.toString();
          }
        }
      );
    });

    // Animate citation
    gsap.fromTo('.stats-citation',
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.stats-citation',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.4
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="stats-section py-24 px-6 bg-[#050507] relative overflow-hidden">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 60%)'
        }}
      />

      <div className="stats-section-inner relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 group-hover:bg-violet-500/20 transition-colors">
                  {stat.icon}
                </div>

                {/* Counter */}
                <div className="mb-2">
                  <div className="flex items-baseline justify-start">
                    {stat.prefix && (
                      <span className="type-2xl font-bold text-white mr-1">{stat.prefix}</span>
                    )}
                    <span
                      ref={(el) => { countersRef.current[index] = el; }}
                      className="type-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/80 group-hover:from-violet-200 group-hover:to-white transition-all duration-300"
                    >
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="type-2xl font-bold text-white ml-1">{stat.suffix}</span>
                    )}
                  </div>
                </div>

                {/* Label */}
                <div className="type-sm text-white/50 uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Citation */}
        <div className="stats-citation mt-8">
          <p className="type-xs text-white/30 text-center leading-relaxed max-w-4xl mx-auto">
            * Based on workflow analysis: email management (4-7 hrs), meeting coordination (3-5 hrs),
            document creation (2-4 hrs), calendar optimization (2-3 hrs).
            <span className="block mt-1">
              Sources: McKinsey Global Institute, BCG Henderson Institute, Harvard Business Review
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

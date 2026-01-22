'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Metric {
  target: number;
  suffix: string;
  label: string;
}

interface CaseStudy {
  image: string;
  badge: string;
  title: string;
  description: string;
  metrics: Metric[];
}

const caseStudies: CaseStudy[] = [
  {
    image: 'https://placehold.co/600x300/1a1a2e/3b82f6?text=Call+Center+AI',
    badge: 'Deployed',
    title: 'Call Center QA System',
    description:
      'AI-powered call quality and compliance analysis. Transcribes calls, scores against 13 dimensions, provides coaching recommendations. From 2% manual coverage to 100% automated coverage.',
    metrics: [
      { target: 100, suffix: '%', label: 'Coverage' },
      { target: 23, suffix: 'x', label: 'Cost Reduction' },
    ],
  },
  {
    image: 'https://placehold.co/600x300/1a1a2e/10b981?text=Knowledge+Hub',
    badge: 'Deployed',
    title: 'Knowledge Hub',
    description:
      'AI-powered knowledge platform with 1,400+ searchable FAQs. Agents find information in seconds instead of 3-5 minutes per call. Includes customer-facing AI chatbot.',
    metrics: [
      { target: 1400, suffix: '+', label: 'FAQs' },
      { target: 90, suffix: '%', label: 'Time Saved' },
    ],
  },
  {
    image: 'https://placehold.co/600x300/1a1a2e/f59e0b?text=Partner+Insights',
    badge: 'Deployed',
    title: 'Analytics Intelligence',
    description:
      'Full-stack analytics dashboard with 100,000 records. From manual spreadsheets to AI-powered competitive intelligence with risk scoring and automated business case generation.',
    metrics: [
      { target: 100, suffix: 'K', label: 'Records' },
      { target: 38, suffix: 'x', label: 'Faster' },
    ],
  },
];

function CounterAnimation({
  target,
  suffix,
  triggerRef,
}: {
  target: number;
  suffix: string;
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const animateCounter = useCallback(() => {
    if (!counterRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);

      if (counterRef.current) {
        counterRef.current.textContent = currentValue.toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [target, suffix]);

  useEffect(() => {
    if (!triggerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top 80%',
      onEnter: animateCounter,
    });

    return () => trigger.kill();
  }, [triggerRef, animateCounter]);

  return (
    <span ref={counterRef} className="type-xl font-bold">
      0{suffix}
    </span>
  );
}

export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate header elements
    gsap.from('.case-studies-label', {
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

    gsap.from('.case-studies-title', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: 'power2.out',
    });

    gsap.from('.case-studies-text', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.out',
    });

    // Animate case study cards
    gsap.from('.case-study-card', {
      scrollTrigger: {
        trigger: '.case-studies-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef as any} id="work" className="py-24 px-6 bg-gray-950/50">
      <div className="max-w-6xl mx-auto">
        <span className="case-studies-label inline-block type-sm font-medium tracking-widest text-gray-400 uppercase mb-4">
          Recent Work
        </span>
        <h2 className="case-studies-title heading-section mb-4">
          <span className="text-gradient-prism">Deployed Systems</span>. Measurable Outcomes.
        </h2>
        <p className="case-studies-text type-lg text-gray-400 max-w-2xl mb-16 leading-relaxed">
          Real AI systems built and deployed. These are not prototypes—they are production tools in
          daily use.
        </p>

        <div className="case-studies-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="case-study-card bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden group hover:border-gray-700 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/30">
                  {study.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{study.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  {study.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <CounterAnimation
                        target={metric.target}
                        suffix={metric.suffix}
                        triggerRef={{ current: cardRefs.current[index] }}
                      />
                      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Metric {
  target: number;
  suffix: string;
  label: string;
}

interface CaseStudy {
  image: string;
  title: string;
  description: string;
  metrics: Metric[];
}

const caseStudies: CaseStudy[] = [
  {
    image: '/images/ai-transformation/case-study-call-center.jpg',

    title: 'Call Center QA System',
    description:
      'AI-powered call quality and compliance analysis. Transcribes calls, scores against 13 dimensions, provides coaching recommendations. From 2% manual coverage to 100% automated coverage.',
    metrics: [
      { target: 100, suffix: '%', label: 'Coverage' },
      { target: 23, suffix: 'x', label: 'Cost Reduction' },
    ],
  },
  {
    image: '/images/ai-transformation/case-study-knowledge-hub.jpg',

    title: 'Knowledge Hub',
    description:
      'AI-powered knowledge platform with 1,400+ searchable FAQs. Agents find information in seconds instead of 3-5 minutes per call. Includes customer-facing AI chatbot.',
    metrics: [
      { target: 1400, suffix: '+', label: 'FAQs' },
      { target: 90, suffix: '%', label: 'Time Saved' },
    ],
  },
  {
    image: '/images/ai-transformation/case-study-analytics.jpg',

    title: 'Analytics Intelligence',
    description:
      'Full-stack analytics dashboard with 100,000 records. From manual spreadsheets to AI-powered competitive intelligence with risk scoring and automated business case generation.',
    metrics: [
      { target: 100, suffix: 'K', label: 'Records' },
      { target: 38, suffix: 'x', label: 'Faster' },
    ],
  },
];

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const scopeRef = useGSAP(
    () => {
      if (!counterRef.current) return;

      // Use a proxy object to handle the numerical value
      const proxy = { value: 0 };

      gsap.to(proxy, {
        value: target,
        duration: 2.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          if (counterRef.current) {
            // Update the DOM element with the rounded value + suffix
            counterRef.current.textContent = Math.ceil(proxy.value).toLocaleString() + suffix;
          }
        },
      });
    },
    [target, suffix]
  );

  return (
    <div
      ref={scopeRef as React.RefObject<HTMLDivElement>}
      className="stat-counter flex flex-col items-center justify-center p-4 bg-white/[0.03] rounded-xl border border-white/5 hover:border-violet-500/20 transition-colors duration-300"
    >
      {/* Starting with 0 to match server-side render and prevent hydration mismatch */}
      <span ref={counterRef} className="type-xl font-bold text-white mb-1 tabular-nums">
        0{suffix}
      </span>
      <span className="type-xs font-semibold uppercase tracking-widest text-violet-300/80 text-center">
        {label}
      </span>
    </div>
  );
}

export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

    // Animate case study cards with rainbow gradient on metrics
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

    // Animate metric cards with rainbow gradient background
    const colors = [
      { r: 255, g: 150, b: 150, name: 'pink' },
      { r: 255, g: 200, b: 100, name: 'gold' },
      { r: 100, g: 200, b: 255, name: 'cyan' },
      { r: 180, g: 150, b: 255, name: 'purple' },
    ];

    document.querySelectorAll('.stat-counter').forEach((element, index) => {
      const color = colors[index % colors.length];
      const colorState = { opacity: 0 };

      gsap.to(colorState, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: (element.closest('.case-study-card') ? Array.from(document.querySelectorAll('.case-study-card')).indexOf(element.closest('.case-study-card')!) * 0.15 : 0) + 0.6,
        scrollTrigger: {
          trigger: element.closest('.case-study-card') || element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          const opacity = Math.round(colorState.opacity * 15) / 100;
          (element as HTMLElement).style.background = `radial-gradient(ellipse at center, rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.15}) 0%, rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.05}) 70%, transparent 100%), linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)`;
          (element as HTMLElement).style.boxShadow = `0 0 ${Math.round(opacity * 20)}px rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.2}), inset 0 0 1px rgba(255,255,255,0.1)`;
        },
      });
    });
  }, []);

  return (
    <section ref={sectionRef as any} id="work" className="py-24 px-6 bg-gray-950/50">
      <div className="max-w-7xl mx-auto">
        <span className="case-studies-label inline-block type-sm font-medium tracking-widest text-gray-400 uppercase mb-4">
          Recent Work
        </span>
        <h2 className="case-studies-title heading-section mb-10">
          <span className="text-gradient-prism">Deployed Systems</span>.
          <br />
          Measurable Outcomes.
        </h2>
        <p className="case-studies-text type-lg text-gray-400 max-w-2xl mb-16 leading-relaxed">
          Real AI systems built and deployed. Governance frameworks, security, and accountability
          structures come before the first line of code. Innovation culture empowers teams to build
          and deploy AI systems with confidence.
        </p>

        <div className="case-studies-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="case-study-card flex flex-col h-full bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden group hover:border-violet-500/30 transition-all duration-300 shadow-2xl shadow-black/50"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60" />
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />

              </div>

              {/* Content flex container */}
              <div className="flex flex-col flex-grow p-8">
                <h3 className="heading-card mb-4 group-hover:text-white transition-colors">
                  {study.title}
                </h3>
                <p className="text-gray-400 type-base leading-relaxed mb-8 flex-grow">
                  {study.description}
                </p>

                {/* Metrics footer - Pushed to bottom */}
                <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-white/5">
                  {study.metrics.map((metric, metricIndex) => (
                    <StatCounter
                      key={metricIndex}
                      target={metric.target}
                      suffix={metric.suffix}
                      label={metric.label}
                    />
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

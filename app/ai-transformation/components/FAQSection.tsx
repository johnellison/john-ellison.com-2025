'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Do we need Phase 1 if we already have an AI strategy?',
    answer:
      'It depends on the quality of that strategy. If you have clear governance policies, stakeholder alignment, and identified high-impact opportunities with technical feasibility confirmed, you may be ready for Phase 2. We\'ll assess this in our initial call.',
  },
  {
    question: 'What if our team is resistant to AI?',
    answer:
      'That\'s exactly what Phase 1 addresses. We surface resistance early, understand its roots (fear of job loss, distrust of technology, past bad experiences), and build alignment before any building starts. Fatma specializes in this organizational psychology work.',
  },
  {
    question: 'How is this different from hiring an agency?',
    answer:
      'Agencies build for you, then leave. We build with you, transfer knowledge, ensure adoption, and provide the governance and change management that makes AI stick. You don\'t just get a product—you get the organizational capability to maintain and extend it.',
  },
  {
    question: 'What kinds of AI systems do you build?',
    answer:
      'Internal operations tools, customer-facing applications, workflow automation, document processing, knowledge management systems, analytics dashboards with AI insights—anything that delivers measurable business value. We focus on what will actually get used.',
  },
  {
    question: 'What\'s the typical timeline?',
    answer:
      'Phase 1 (AI Readiness & Strategy) takes 1-2 weeks. Phase 2 (AI Product Sprint) takes 2-4 weeks depending on complexity. Total engagement: 4-8 weeks from kickoff to deployed, adopted AI systems.',
  },
  {
    question: 'Do you work with companies outside the US?',
    answer:
      'Yes. We work remotely with companies globally. The methodology is designed for distributed collaboration, and we adjust meeting times to accommodate different time zones.',
  },
];

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.faq-label', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.from('.faq-title', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: 'power2.out',
    });

    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="faq"
      className="relative min-h-screen py-24 px-6 flex flex-col justify-center"
    >
      {/* Background gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/5 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto w-full">
        <span className="faq-label block text-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4">
          FAQ
        </span>
        <h2 className="faq-title text-2xl md:text-3xl font-medium text-white mb-12">
          Common Questions
        </h2>

        <div className="faq-list mt-12">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`faq-item border-b border-white/[0.08] ${
                index === 0 ? 'border-t' : ''
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full py-6 flex justify-between items-center text-left group cursor-pointer"
              >
                <span className="text-lg font-medium text-white group-hover:text-violet-400 transition-colors duration-200">
                  {item.question}
                </span>
                <span
                  className={`text-2xl text-violet-400 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  activeIndex === index
                    ? 'max-h-80 pb-6'
                    : 'max-h-0 pb-0'
                }`}
              >
                <p className="text-base text-white/60 leading-relaxed max-w-[70ch]">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

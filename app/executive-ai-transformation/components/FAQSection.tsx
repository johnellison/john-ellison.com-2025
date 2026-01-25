'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'How is this different from just using ChatGPT or Claude?',
    answer:
      'Consumer AI tools require you to context-switch, copy-paste, and prompt engineer every time. We integrate AI directly into your existing workflows—email, calendar, Slack—so automation happens automatically. Plus, we customize the AI to your voice, preferences, and specific business context.',
  },
  {
    question: 'What if I have a human executive assistant?',
    answer:
      'AI augments, not replaces. Your EA handles high-touch relationship work while AI handles the repetitive processing—triaging 300 emails so your EA handles the 30 that need human judgment. Many clients find their EA becomes more effective when freed from administrative burden.',
  },
  {
    question: 'How do you handle security and confidentiality?',
    answer:
      'All integrations use enterprise-grade OAuth/API authentication. Data is processed through encrypted channels and never stored beyond session needs. We work with your IT/security team to meet compliance requirements and can sign NDAs before any sensitive access.',
  },
  {
    question: 'What\'s the time commitment on my end?',
    answer:
      'Week 1: 90-minute discovery session. Weeks 2-5: 2-3 hours per week for testing and feedback. Week 6: 2-hour training session. After that, the system works for you. Ongoing assistant requires minimal input—just respond when it asks clarifying questions.',
  },
  {
    question: 'What if the AI makes a mistake?',
    answer:
      'For the Executive AI Transformation, all automations have human-in-the-loop checkpoints. The AI drafts, you approve. For the 24/7 Assistant, human oversight catches issues before they reach you. We start conservative and expand automation as trust builds.',
  },
  {
    question: 'Can I try before committing to the full package?',
    answer:
      'Yes. The 24/7 AI Executive Assistant starts with a Pilot Week—full onboarding and access for one week. If it\'s not delivering value, you can walk away. Most clients continue because they immediately feel the time savings.',
  },
  {
    question: 'What happens after the 30-day hypercare period?',
    answer:
      'You own everything we build. All documentation, prompts, and configurations are transferred to you. If you want ongoing optimization, you can add the 24/7 Assistant or book quarterly tune-up sessions. But the core system is yours to maintain.',
  },
  {
    question: 'Do you work with executives outside the tech industry?',
    answer:
      'Absolutely. Our clients include founders, managing directors, VPs, and C-suite executives across finance, healthcare, professional services, media, and SaaS. The workflows we optimize—email, calendar, meetings, documents—are universal executive challenges.',
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

    gsap.fromTo('.faq-item',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      }
    );
  }, []);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="faq"
      className="relative overflow-hidden py-24 px-6 bg-[#050507]"
    >
      {/* Background gradient */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-4/5 h-3/5 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto w-full">
        <span className="faq-label block type-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4">
          FAQ
        </span>
        <h2 className="faq-title heading-section text-white mb-12">
          Common Questions
        </h2>

        <div className="faq-list mt-12">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`faq-item border-b border-white/[0.08] ${index === 0 ? 'border-t' : ''}`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full py-6 flex justify-between items-center text-left group cursor-pointer"
              >
                <span className="type-base font-medium text-white group-hover:text-violet-400 transition-colors duration-200 pr-4">
                  {item.question}
                </span>
                <span
                  className={`type-lg text-violet-400 transition-transform duration-300 shrink-0 ${
                    activeIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  activeIndex === index ? 'max-h-80 pb-6' : 'max-h-0 pb-0'
                }`}
              >
                <p className="type-base text-white/60 leading-relaxed max-w-[70ch]">
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

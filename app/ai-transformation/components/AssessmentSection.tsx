'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import AssessmentForm from '../AssessmentForm';

export function AssessmentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.assessment-reveal', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
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
    <section
      ref={sectionRef as any}
      id="assessment"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="assessment-reveal inline-block px-4 py-2 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20 mb-6">
            Start Here
          </span>
          <h2 className="assessment-reveal text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-prism">AI Readiness Assessment</span>
          </h2>
          <p className="assessment-reveal text-lg text-gray-400 max-w-2xl mx-auto">
            Answer a few questions about your organization and receive an automated
            readiness report. This helps us understand your situation before we talk.
          </p>
        </div>

        {/* Assessment Tool Grid with Gradient Border */}
        <div className="assessment-reveal relative">
          {/* Gradient border effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-teal-500/50 rounded-2xl blur-sm opacity-60" />

          {/* Main content container */}
          <div className="relative bg-[#0a0a0f]/95 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Left side - What You'll Learn */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  What You'll Learn
                </h3>
                <p className="text-gray-400 mb-6">
                  This brief assessment evaluates your organization across key dimensions
                  that determine AI adoption success.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300">Current AI maturity level</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300">Organizational readiness indicators</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300">Key blockers to address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300">Recommended starting point</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300">Next steps specific to your situation</span>
                  </li>
                </ul>

                <p className="text-sm text-gray-500">
                  Takes 2-3 minutes. You'll receive your report immediately.
                </p>
              </div>

              {/* Right side - Assessment Form */}
              <div className="lg:col-span-3">
                <AssessmentForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

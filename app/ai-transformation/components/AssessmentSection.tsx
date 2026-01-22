'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import AssessmentForm from '../AssessmentForm';

export function AssessmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

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

  const handleAssessmentStart = () => {
    setHasStarted(true);
  };

  return (
    <section
      ref={sectionRef as any}
      id="assessment"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="assessment-reveal inline-block px-4 py-2 type-sm font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20 mb-6">
            Start Here
          </span>
          <h2 className="assessment-reveal heading-section mb-10">
            <span className="text-gradient-prism">AI Readiness Assessment</span>
          </h2>
          <p className="assessment-reveal type-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
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
            <div className={`grid gap-12 items-start transition-all duration-500 ${
              hasStarted ? 'lg:grid-cols-1' : 'lg:grid-cols-5'
            }`}>
              {/* Left side - What You'll Learn (fades out when started) */}
              <div className={`lg:col-span-2 transition-all duration-500 ${
                hasStarted
                  ? 'opacity-0 absolute pointer-events-none h-0 overflow-hidden'
                  : 'opacity-100'
              }`}>
                <h3 className="type-xl font-semibold text-white mb-4 leading-snug">
                  What You'll Learn
                </h3>
                <p className="text-gray-400 type-base mb-6 leading-relaxed">
                  This brief assessment evaluates your organization across key dimensions
                  that determine AI adoption success.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300 type-base">Current AI maturity level</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300 type-base">Organizational readiness indicators</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300 type-base">Key blockers to address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300 type-base">Recommended starting point</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-300 type-base">Next steps specific to your situation</span>
                  </li>
                </ul>

                <p className="type-xs text-gray-500">
                  Takes 2-3 minutes. You'll receive your report immediately.
                </p>
              </div>

              {/* Right side - Assessment Form (expands when started) */}
              <div className={`transition-all duration-500 ${
                hasStarted ? 'lg:col-span-1' : 'lg:col-span-3'
              }`}>
                <AssessmentForm onAssessmentStart={handleAssessmentStart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import { Mail, Calendar, FileText, Users, BarChart3, MessageSquare } from 'lucide-react';

const workflows = [
  {
    icon: Mail,
    title: 'Email Management',
    timeSaved: '8-10 hrs/week',
    before: 'Manually scanning hundreds of emails, drafting responses from scratch, missing important messages in the noise.',
    after: 'AI triages and prioritizes, drafts replies in your voice, extracts action items, and surfaces what matters most.',
    color: '#3b82f6',
  },
  {
    icon: Calendar,
    title: 'Calendar Management',
    timeSaved: '3-5 hrs/week',
    before: 'Endless back-and-forth scheduling, no buffer time between meetings, unprepared for calls.',
    after: 'Smart scheduling with preferences enforced, automatic meeting prep briefs, strategic buffer blocks protected.',
    color: '#8b5cf6',
  },
  {
    icon: FileText,
    title: 'Meeting Summaries',
    timeSaved: '5-8 hrs/week',
    before: 'Taking notes during calls, spending hours documenting decisions, action items falling through cracks.',
    after: 'Auto-transcription, AI-generated summaries, action items extracted and assigned, searchable meeting archive.',
    color: '#06b6d4',
  },
  {
    icon: Users,
    title: 'Document Creation',
    timeSaved: '4-6 hrs/week',
    before: 'Starting from blank pages, multiple revision cycles, inconsistent formatting and tone.',
    after: 'AI drafts from bullet points in your voice, templates adapted to context, first drafts in seconds.',
    color: '#f59e0b',
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence',
    timeSaved: '3-5 hrs/week',
    before: 'Manually pulling reports from multiple tools, missing patterns in data, reactive decision-making.',
    after: 'Unified dashboard, anomaly detection alerts, auto-generated weekly insights, proactive recommendations.',
    color: '#10b981',
  },
  {
    icon: MessageSquare,
    title: 'Team Communication',
    timeSaved: '2-4 hrs/week',
    before: 'Constant context-switching between channels, missing updates, notification overload.',
    after: 'Channel summaries, async response drafts, smart notification filtering, unified inbox view.',
    color: '#ec4899',
  },
];

export function WorkflowTransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.workflow-label', {
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

    gsap.from('.workflow-title', {
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

    gsap.from('.workflow-card', {
      scrollTrigger: {
        trigger: '.workflow-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });

    gsap.from('.total-card', {
      scrollTrigger: {
        trigger: '.total-card',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} id="workflows" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="workflow-label inline-block px-4 py-2 type-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20 mb-6">
            Workflows Transformed
          </span>
          <h2 className="workflow-title heading-section text-white mb-6">
            Where Your <span className="text-gradient-prism">Time Goes Back</span>
          </h2>
          <p className="type-lg text-white/60 max-w-2xl mx-auto">
            Six core workflows that steal your time. We rebuild each one with AI at the center.
          </p>
        </div>

        <div className="workflow-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow, index) => {
            const Icon = workflow.icon;
            return (
              <div
                key={index}
                className="workflow-card group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-xl"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: workflow.color }}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${workflow.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: workflow.color }} />
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${workflow.color}20`, color: workflow.color }}
                  >
                    {workflow.timeSaved}
                  </span>
                </div>

                <h3 className="heading-card text-white mb-4 group-hover:text-violet-200 transition-colors">
                  {workflow.title}
                </h3>

                {/* Before/After */}
                <div className="space-y-4">
                  <div>
                    <span className="type-xs uppercase tracking-wider text-red-400/80 font-medium">Before</span>
                    <p className="type-sm text-white/50 mt-1 leading-relaxed">{workflow.before}</p>
                  </div>
                  <div>
                    <span className="type-xs uppercase tracking-wider text-green-400/80 font-medium">After</span>
                    <p className="type-sm text-white/70 mt-1 leading-relaxed">{workflow.after}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Time Saved */}
        <div className="total-card mt-12 p-8 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl text-center">
          <p className="type-sm text-white/50 uppercase tracking-wider mb-2">Total Potential Time Saved</p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="type-4xl font-bold text-gradient-prism">25-40</span>
            <span className="type-xl text-white/70">hours/week</span>
          </div>
          <p className="type-base text-white/60 max-w-xl mx-auto">
            That&apos;s an extra 6-10 weeks of productive time per year, freed up for strategic thinking,
            relationship building, and the work only you can do.
          </p>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/gsap/use-gsap';
import { gsap } from '@/lib/gsap';
import { Mail, Calendar, FileText, Users, BarChart3, MessageSquare } from 'lucide-react';

// Research-backed workflow data with citations
// Ordered by potential savings (highest first for featured display)
const workflows = [
  // Featured workflows (highest savings) - displayed prominently
  {
    icon: Mail,
    title: 'Email Management',
    currentTime: 11, // McKinsey: 28% of 40hr week = 11.2 hrs
    potentialSavings: 4, // Conservative: ~35% reduction
    maxSavings: 7, // Optimistic with full automation
    source: 'McKinsey Global Institute',
    sourceDetail: '28% of workweek spent on email',
    before: 'Manually scanning hundreds of emails, drafting responses from scratch, missing important messages.',
    after: 'AI triages and prioritizes, drafts replies in your voice, extracts action items automatically.',
    color: '#3b82f6',
  },
  {
    icon: FileText,
    title: 'Meeting Follow-up',
    currentTime: 6, // Post-meeting documentation, action tracking
    potentialSavings: 3,
    maxSavings: 5,
    source: 'Harvard Business School',
    sourceDetail: '72% of CEO time in meetings',
    before: 'Taking notes during calls, documenting decisions, action items falling through cracks.',
    after: 'Auto-transcription, AI summaries, action items extracted and assigned automatically.',
    color: '#06b6d4',
  },
  // Secondary workflows
  {
    icon: Calendar,
    title: 'Calendar & Scheduling',
    currentTime: 5, // Estimated from meeting coordination research
    potentialSavings: 2,
    maxSavings: 4,
    source: 'Harvard Business Review',
    sourceDetail: 'Executives average 37 meetings/week',
    before: 'Endless back-and-forth scheduling, no buffer time, unprepared for calls.',
    after: 'Smart scheduling with preferences enforced, automatic meeting prep briefs.',
    color: '#8b5cf6',
  },
  {
    icon: BarChart3,
    title: 'Information Processing',
    currentTime: 5,
    potentialSavings: 2,
    maxSavings: 4,
    source: 'McKinsey',
    sourceDetail: '60% of time on coordination vs 13% strategy',
    before: 'Manually pulling reports, missing patterns in data, reactive decisions.',
    after: 'Unified dashboard, anomaly alerts, auto-generated insights.',
    color: '#10b981',
  },
  {
    icon: Users,
    title: 'Document Creation',
    currentTime: 4,
    potentialSavings: 2,
    maxSavings: 3,
    source: 'BCG 2024 Study',
    sourceDetail: 'GenAI saves 5+ hrs/week on knowledge work',
    before: 'Starting from blank pages, multiple revision cycles, inconsistent tone.',
    after: 'AI drafts from bullet points in your voice, templates adapted to context.',
    color: '#f59e0b',
  },
  {
    icon: MessageSquare,
    title: 'Team Communication',
    currentTime: 4,
    potentialSavings: 1,
    maxSavings: 3,
    source: 'Forrester 2024',
    sourceDetail: 'Communication remains top productivity challenge',
    before: 'Context-switching between channels, missing updates, notification overload.',
    after: 'Channel summaries, async response drafts, smart notification filtering.',
    color: '#ec4899',
  },
];

// Calculate totals
const totalCurrentTime = workflows.reduce((sum, w) => sum + w.currentTime, 0);
const totalPotentialSavings = workflows.reduce((sum, w) => sum + w.potentialSavings, 0);
const totalMaxSavings = workflows.reduce((sum, w) => sum + w.maxSavings, 0);

export function WorkflowTransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo('.workflow-header',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }
    );

    gsap.fromTo('.workflow-bar',
      { scaleX: 0, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.workflow-chart',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        transformOrigin: 'left center',
      }
    );

    gsap.fromTo('.workflow-card',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.workflow-grid',
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

    gsap.fromTo('.summary-card',
      { scale: 0.95, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.summary-card',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="workflows" className="py-24 px-6 bg-[#050507]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="workflow-header text-center mb-16">
          <span className="inline-block px-4 py-2 type-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20 mb-6">
            Research-Backed Time Analysis
          </span>
          <h2 className="heading-section text-white mb-6">
            Where Executive Time <span className="text-gradient-prism">Actually Goes</span>
          </h2>
          <p className="type-lg text-white/60 max-w-2xl mx-auto">
            Based on studies from McKinsey, Harvard, and BCG—here&apos;s where your time goes and how much AI can realistically save.
          </p>
        </div>

        {/* Visual Chart */}
        <div className="workflow-chart mb-16 p-6 md:p-8 bg-white/[0.02] border border-white/[0.08] rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="type-lg font-semibold text-white">Weekly Time Allocation</h3>
            <div className="flex items-center gap-6 type-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-white/30" />
                <span className="text-white/50">Current time spent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                <span className="text-white/50">Potential savings</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {workflows.map((workflow, index) => {
              const Icon = workflow.icon;
              const maxWidth = 14; // Max hours for scale (slightly above highest value of 11)
              const currentWidth = (workflow.currentTime / maxWidth) * 100;
              const savingsWidth = (workflow.potentialSavings / maxWidth) * 100;

              return (
                <div key={index} className="workflow-bar">
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${workflow.color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: workflow.color }} />
                    </div>
                    <span className="type-sm font-medium text-white min-w-[140px]">{workflow.title}</span>
                    <span className="type-xs text-white/40 hidden sm:block">{workflow.source}</span>
                  </div>

                  <div className="flex items-center gap-3 ml-12">
                    {/* Bar container */}
                    <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden relative">
                      {/* Current time bar */}
                      <div
                        className="absolute inset-y-0 left-0 bg-white/20 rounded-full"
                        style={{ width: `${currentWidth}%` }}
                      />
                      {/* Savings overlay */}
                      <div
                        className="absolute inset-y-0 bg-emerald-500/80 rounded-full"
                        style={{
                          left: `${currentWidth - savingsWidth}%`,
                          width: `${savingsWidth}%`
                        }}
                      />
                    </div>

                    {/* Numbers */}
                    <div className="flex items-center gap-2 shrink-0 min-w-[100px]">
                      <span className="type-sm text-white/60">{workflow.currentTime}h</span>
                      <span className="type-xs text-white/30">→</span>
                      <span className="type-sm text-emerald-400 font-medium">
                        -{workflow.potentialSavings}h
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart footer */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="type-xs text-white/40">
              * Savings estimates based on conservative interpretation of research. Individual results vary.
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="type-xs text-white/40 uppercase tracking-wider">Total weekly</div>
                <div className="type-lg font-bold text-white">{totalCurrentTime} hours</div>
              </div>
              <div className="text-right">
                <div className="type-xs text-white/40 uppercase tracking-wider">Typical savings</div>
                <div className="type-lg font-bold text-emerald-400">~{totalPotentialSavings} hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Cards - Masonry Layout */}
        <div className="workflow-grid mb-12">
          {/* Featured workflows (highest savings) - Full width cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {workflows.slice(0, 2).map((workflow, index) => {
              const Icon = workflow.icon;
              return (
                <div
                  key={index}
                  className="workflow-card group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-white/20"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${workflow.color}20` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: workflow.color }} />
                      </div>
                      <div>
                        <h3 className="type-xl font-bold text-white">
                          {workflow.title}
                        </h3>
                        <p className="type-xs text-white/40 italic">
                          {workflow.sourceDetail} — {workflow.source}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className="block px-3 py-1 rounded-lg text-sm font-bold mb-1"
                        style={{ backgroundColor: `${workflow.color}20`, color: workflow.color }}
                      >
                        {workflow.potentialSavings}-{workflow.maxSavings} hrs saved
                      </span>
                      <span className="type-xs text-white/30">of {workflow.currentTime} hrs/week</span>
                    </div>
                  </div>

                  {/* Before/After - Side by Side */}
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex-1 p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                      <span className="type-xs uppercase tracking-wider text-red-400 font-semibold flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                        Before
                      </span>
                      <p className="type-sm text-white/50 leading-relaxed">{workflow.before}</p>
                    </div>
                    <div className="flex-1 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                      <span className="type-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        After
                      </span>
                      <p className="type-sm text-white/70 leading-relaxed">{workflow.after}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secondary workflows - 2x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workflows.slice(2).map((workflow, index) => {
              const Icon = workflow.icon;
              return (
                <div
                  key={index + 2}
                  className="workflow-card group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-white/20"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${workflow.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: workflow.color }} />
                    </div>
                    <div className="text-right">
                      <span
                        className="block px-2 py-0.5 rounded text-xs font-semibold mb-1"
                        style={{ backgroundColor: `${workflow.color}20`, color: workflow.color }}
                      >
                        {workflow.potentialSavings}-{workflow.maxSavings} hrs saved
                      </span>
                      <span className="type-xs text-white/30">of {workflow.currentTime} hrs/week</span>
                    </div>
                  </div>

                  <h3 className="heading-card text-white mb-2">
                    {workflow.title}
                  </h3>

                  {/* Source citation */}
                  <p className="type-xs text-white/40 mb-4 italic">
                    {workflow.sourceDetail} — {workflow.source}
                  </p>

                  {/* Before/After - Side by Side Compact */}
                  <div className="flex gap-3">
                    <div className="flex-1 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                      <span className="type-xs uppercase tracking-wider text-red-400/80 font-medium block mb-1">Before</span>
                      <p className="type-xs text-white/50 leading-relaxed">{workflow.before}</p>
                    </div>
                    <div className="flex-1 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                      <span className="type-xs uppercase tracking-wider text-emerald-400/80 font-medium block mb-1">After</span>
                      <p className="type-xs text-white/70 leading-relaxed">{workflow.after}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Card */}
        <div className="summary-card p-8 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Conservative estimate */}
            <div className="text-center">
              <p className="type-xs text-white/50 uppercase tracking-wider mb-2">Typical Savings</p>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="type-3xl font-bold text-emerald-400">{totalPotentialSavings}+</span>
                <span className="type-lg text-white/70">hrs/week</span>
              </div>
              <p className="type-xs text-white/40">Based on BCG research</p>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-16 w-px bg-white/10 mx-auto" />

            {/* Maximum potential */}
            <div className="text-center">
              <p className="type-xs text-white/50 uppercase tracking-wider mb-2">Full Implementation</p>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="type-3xl font-bold text-violet-400">{totalMaxSavings}</span>
                <span className="type-lg text-white/70">hrs/week</span>
              </div>
              <p className="type-xs text-white/40">When all workflows optimized</p>
            </div>

            {/* Annual impact */}
            <div className="text-center md:col-span-3 pt-6 md:pt-0 md:border-t-0 border-t border-white/10">
              <p className="type-base text-white/60 max-w-xl mx-auto">
                That&apos;s <span className="text-white font-semibold">{Math.round(totalPotentialSavings * 50)} hours per year</span> freed up for strategic thinking,
                relationship building, and the work only you can do.
              </p>
            </div>
          </div>

          {/* Research sources */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="type-xs text-white/30 text-center">
              Sources: McKinsey Global Institute • Harvard Business School • BCG AI at Work 2024 • St. Louis Federal Reserve • Forrester Digital Employee Experience 2024
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

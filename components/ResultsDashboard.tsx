'use client';

import { AssessmentResult } from '@/types/assessment';
import MaturityRadar from './MaturityRadar';
import { Share2, ArrowRight, AlertTriangle, CheckCircle2, X, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface ResultsDashboardProps {
  result: AssessmentResult;
}

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  const { archetype, axisScores, dimensionScores, blockers, overallScore, recommendations, companyData } = result;
  const [showEmailSent, setShowEmailSent] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);

  // Disable smooth scrolling on this page for performance
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const handleShare = async () => {
    const shareText = `I'm a ${archetype.name} - AI Readiness Assessment. Score: ${overallScore}/100.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `AI Readiness: ${archetype.name}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#050507]">
        <div className="max-w-4xl mx-auto flex h-14 items-center justify-between px-4 md:px-6">
          <div className="type-sm font-medium text-white/70">AI Readiness Report</div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-1.5 type-sm hover:bg-white/5 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <Link
              href="/ai-transformation"
              className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 type-sm hover:bg-white/15 transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Close</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Email notification banner */}
      {showEmailSent && (
        <div className="bg-green-500/10 border-b border-green-500/20">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-green-400" />
              <span className="type-sm text-green-300">
                A copy of this report has been sent to {companyData.email}
              </span>
            </div>
            <button
              onClick={() => setShowEmailSent(false)}
              className="text-green-400 hover:text-green-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Hero: Archetype + Score */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="type-xs text-white/60">Your AI Archetype</span>
          </div>

          <h1
            className="heading-section mb-3"
            style={{ color: archetype.color }}
          >
            {archetype.name}
          </h1>

          <p className="type-lg text-white/60 mb-6 italic">
            "{archetype.hook}"
          </p>

          <p className="type-base text-white/70 max-w-2xl mx-auto mb-8">
            {archetype.description}
          </p>

          {/* Score display */}
          <div className="inline-flex items-baseline gap-1 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-4xl md:text-5xl font-bold text-white">{overallScore}</span>
            <span className="type-lg text-white/40">/100</span>
          </div>
        </div>

        {/* Axis Scores */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <span className="type-sm text-white/70">Strategic Vision</span>
              <span className="type-base font-semibold">{axisScores.vision}/100</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${axisScores.vision}%` }}
              />
            </div>
            <p className="type-xs text-white/50 mt-2">Leadership, Culture & Governance</p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <span className="type-sm text-white/70">Operational Capability</span>
              <span className="type-base font-semibold">{axisScores.ops}/100</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-violet-500"
                style={{ width: `${axisScores.ops}%` }}
              />
            </div>
            <p className="type-xs text-white/50 mt-2">Data, Technology & Talent</p>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="heading-subsection mb-6 text-center">Readiness Gap Analysis</h2>
          <div ref={chartRef} className="w-full max-w-md mx-auto">
            <MaturityRadar dimensionScores={dimensionScores} />
          </div>
          <p className="type-xs text-white/50 text-center mt-4">
            Your score (Purple) vs. Industry Benchmark (Gray)
          </p>
        </div>

        {/* Blockers */}
        {blockers.length > 0 && (
          <div className="mb-12">
            <h2 className="heading-subsection mb-6">Critical Blockers</h2>
            <div className="space-y-4">
              {blockers.map((blocker, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-red-500/20 bg-red-500/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="type-base font-semibold text-red-200 mb-1">{blocker.issue}</h3>
                      <p className="type-sm text-white/60 mb-3">{blocker.impact}</p>
                      <div className="flex flex-wrap gap-4 type-xs text-white/50">
                        <span>Est. Cost: {blocker.costRange}</span>
                        <span>Timeline: {blocker.timeline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mb-12">
            <h2 className="heading-subsection mb-6">Your Roadmap</h2>
            <div className="space-y-6">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="relative pl-8 border-l-2 border-white/10"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#050507] border-2 border-white/20 flex items-center justify-center">
                    <span className="type-xs font-bold text-white/60">{idx + 1}</span>
                  </div>

                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="type-xs font-medium uppercase tracking-wider text-indigo-400">
                        {rec.phase}
                      </span>
                      <span className="type-xs text-white/40">{rec.timeframe}</span>
                    </div>

                    <h3 className="type-base font-semibold mb-2">{rec.title}</h3>
                    <p className="type-sm text-white/60 mb-4">{rec.description}</p>

                    <ul className="space-y-2">
                      {rec.actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-2 type-sm text-white/70">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500/60 mt-0.5" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-500/20 text-center">
          <h2 className="heading-subsection mb-3">Ready to Transform?</h2>
          <p className="type-base text-indigo-200/80 mb-6 max-w-lg mx-auto">
            Book a strategy call to review your results and build your custom AI transformation roadmap.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 type-base font-semibold text-indigo-900 hover:bg-indigo-50 transition-colors"
          >
            Schedule Strategy Call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Footer spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
}

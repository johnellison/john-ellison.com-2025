'use client';

import { AssessmentResult } from '@/types/assessment';
import ArchetypeCard from './ArchetypeCard';
import MaturityRadar from './MaturityRadar';
import { Download, Share2, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useCurrentPng } from 'recharts-to-png';
import { useState } from 'react';

interface ResultsDashboardProps {
  result: AssessmentResult;
}

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  const { archetype, axisScores, dimensionScores, blockers, overallScore } = result;
  const [getPng, { ref: chartRef }] = useCurrentPng();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const chartImage = await getPng();
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report: result, chartImage }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AI-Readiness-Report-${result.companyData.name}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download report. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I'm a ${archetype.name} - AI Readiness Assessment`,
          text: `My organization is classified as a ${archetype.name}. Score: ${overallScore}/100.`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Copy this link to share: ' + window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#050507]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="font-bold">AI Transformation</div>
          <div className="flex gap-3">
            <button 
              onClick={handleShare}
              className="hidden sm:flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/5"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isDownloading ? 'Generating...' : 'Download Report'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          {/* Left: Archetype Card */}
          <div className="lg:sticky lg:top-24 h-fit">
            <ArchetypeCard archetype={archetype} overallScore={overallScore} />
            
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Your Axis Profile
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Strategic Vision</span>
                    <span className="font-bold">{axisScores.vision}/100</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div 
                      className="h-full rounded-full bg-blue-500 transition-all duration-1000" 
                      style={{ width: `${axisScores.vision}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Operational Capability</span>
                    <span className="font-bold">{axisScores.ops}/100</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div 
                      className="h-full rounded-full bg-violet-500 transition-all duration-1000" 
                      style={{ width: `${axisScores.ops}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Analysis & Radar */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-[#0c0c10] p-6 shadow-xl">
              <h3 className="mb-6 text-xl font-bold">Readiness Gap Analysis</h3>
              <div ref={chartRef} className="w-full">
                <MaturityRadar dimensionScores={dimensionScores} />
              </div>
              <p className="mt-4 text-center text-sm text-gray-400">
                Comparing your score (Purple) vs. Series B Average (Gray)
              </p>
            </div>

            {/* Critical Path */}
            <div>
              <h3 className="mb-6 text-2xl font-bold">Critical Path: Top Blockers</h3>
              <div className="space-y-4">
                {blockers.map((blocker, idx) => (
                  <div 
                    key={idx} 
                    className="group relative overflow-hidden rounded-xl border border-red-500/20 bg-red-500/5 p-5 transition-all hover:border-red-500/40"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-red-500/10 p-2 text-red-500">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-200">{blocker.issue}</h4>
                        <p className="mt-1 text-sm text-gray-400">Impact: {blocker.impact}</p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                          <span>Est. Cost: {blocker.costRange}</span>
                          <span>•</span>
                          <span>Timeline: {blocker.timeline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Roadmap */}
            <div>
              <h3 className="mb-6 text-2xl font-bold">Strategic Roadmap</h3>
              <div className="relative border-l border-white/10 pl-8 space-y-8">
                {result.recommendations.map((rec, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[39px] flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-[#0c0c10] text-xs font-bold text-gray-500">
                      {idx + 1}
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                          {rec.phase}
                        </span>
                        <span className="text-xs text-gray-500">{rec.timeframe}</span>
                      </div>
                      <h4 className="mb-2 text-lg font-bold">{rec.title}</h4>
                      <p className="mb-4 text-sm text-gray-400">{rec.description}</p>
                      <ul className="space-y-2">
                        {rec.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500/50 mt-0.5" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-r from-indigo-900/50 to-violet-900/50 p-8 text-center border border-indigo-500/20">
              <h3 className="mb-3 text-2xl font-bold">Ready to become an Apex Integrator?</h3>
              <p className="mb-8 text-indigo-200">
                Book a strategy call to review your results and build your custom roadmap.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-bold text-indigo-900 transition-transform hover:scale-105"
              >
                Schedule Strategy Call
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

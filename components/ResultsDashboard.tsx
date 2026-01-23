'use client';

import { AssessmentResult, CompanyInsights } from '@/types/assessment';
import MaturityRadar from './MaturityRadar';
import ArchetypeQuadrant from '@/app/ai-transformation/components/ArchetypeQuadrant';
import { Share2, ArrowRight, AlertTriangle, CheckCircle2, X, Mail, Globe, Download, CheckCircle, TrendingUp, Info, Search, Linkedin, XCircle, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateAssessmentPDF } from '@/lib/pdf-generator';

interface ResultsDashboardProps {
  result: AssessmentResult;
}

// Helper function to categorize maturity signals
function categorizeSignal(signal: string) {
  const lower = signal.toLowerCase();

  // Positive signals
  if (
    lower.includes('mentions ai') ||
    lower.includes('digital transformation') ||
    lower.includes('data-driven') ||
    lower.includes('machine learning') ||
    lower.includes('automation') ||
    lower.includes('analytics') ||
    lower.includes('cloud') ||
    lower.includes('modern')
  ) {
    return {
      icon: <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />,
      type: 'positive',
      bgColor: 'bg-green-500/5',
      borderColor: 'border-green-500/20',
    };
  }

  // Opportunity signals
  if (
    lower.includes('no mention') ||
    lower.includes('traditional') ||
    lower.includes('basic') ||
    lower.includes('limited') ||
    lower.includes('manual') ||
    lower.includes('legacy')
  ) {
    return {
      icon: <TrendingUp className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />,
      type: 'opportunity',
      bgColor: 'bg-yellow-500/5',
      borderColor: 'border-yellow-500/20',
    };
  }

  // Neutral/informational
  return {
    icon: <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />,
    type: 'info',
    bgColor: 'bg-blue-500/5',
    borderColor: 'border-blue-500/20',
  };
}

// Helper function to get company logo URL
function getCompanyLogoUrl(website: string, insights?: CompanyInsights) {
  // Try OG Image first
  if (insights?.metadata?.ogImage) {
    return insights.metadata.ogImage;
  }

  // Try favicon
  if (insights?.metadata?.favicon) {
    return insights.metadata.favicon;
  }

  // Fallback to Clearbit Logo API
  try {
    const domain = new URL(website).hostname;
    return `https://logo.clearbit.com/${domain}`;
  } catch {
    return null;
  }
}

// Calculate AI Transformation Opportunity (inverse of readiness - higher for lower scores)
function calculateTransformationOpportunity(overallScore: number): number {
  // Scale: Low readiness = high opportunity
  // Score 0-30: Opportunity 85-100
  // Score 30-50: Opportunity 70-85
  // Score 50-70: Opportunity 55-70
  // Score 70-100: Opportunity 40-55
  if (overallScore <= 30) {
    return Math.round(100 - (overallScore / 30) * 15);
  } else if (overallScore <= 50) {
    return Math.round(85 - ((overallScore - 30) / 20) * 15);
  } else if (overallScore <= 70) {
    return Math.round(70 - ((overallScore - 50) / 20) * 15);
  } else {
    return Math.round(55 - ((overallScore - 70) / 30) * 15);
  }
}

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  const { archetype, axisScores, dimensionScores, blockers, overallScore, recommendations, companyData, companyInsights, industryAnalysis } = result;
  const [showEmailSent, setShowEmailSent] = useState(true);
  const [logoError, setLogoError] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const transformationOpportunity = calculateTransformationOpportunity(overallScore);

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

  const handleDownloadPDF = () => {
    generateAssessmentPDF(result);
  };

  const logoUrl = getCompanyLogoUrl(companyData.website, companyInsights);

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#050507]">
        <div className="max-w-4xl mx-auto flex h-14 items-center justify-between px-4 md:px-6">
          <div className="type-sm font-medium text-white/70">AI Readiness Report</div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-1.5 type-sm hover:bg-white/5 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
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

        {/* Hero Section - Redesigned */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 items-start">
            {/* Left: Company Visual + Score + Archetype */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              {/* Company Logo/Favicon */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 p-3 flex items-center justify-center overflow-hidden">
                {logoUrl && !logoError ? (
                  <img
                    src={logoUrl}
                    alt={`${companyData.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="text-3xl font-bold text-white/60">
                    {companyData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Company Links */}
              <div className="flex flex-col gap-1.5 w-full">
                <a
                  href={companyData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300"
                >
                  <Globe className="w-3 h-3" />
                  Website
                </a>
                {companyData.linkedin && (
                  <a
                    href={companyData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300"
                  >
                    <Linkedin className="w-3 h-3" />
                    LinkedIn
                  </a>
                )}
              </div>

              {/* Score Display - Moved to left */}
              <div className="w-full p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="type-xs text-white/50 mb-1">AI Readiness Score</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{overallScore}</span>
                  <span className="type-sm text-white/40">/100</span>
                </div>
              </div>

              {/* Archetype Badge - Moved to left */}
              <div className="w-full p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="type-xs text-white/50 mb-1">AI Archetype</p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: archetype.color }}
                >
                  {archetype.name}
                </p>
                <p className="type-xs text-white/40 mt-1 italic">&ldquo;{archetype.hook}&rdquo;</p>
              </div>
            </div>

            {/* Right: Report Header + Executive Summary */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="type-xs text-white/60">AI Readiness Report</span>
                </div>
                <span className="type-xs text-white/40">•</span>
                <span className="type-xs text-white/40">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {companyData.name}
              </h1>

              {/* Executive Summary */}
              <div className="p-5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
                <h2 className="type-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Executive Summary
                </h2>
                {companyInsights?.company_summary ? (
                  <div className="space-y-3">
                    <p className="type-sm text-gray-300 leading-relaxed">
                      {companyInsights.company_summary}
                    </p>
                    <p className="type-sm text-gray-300 leading-relaxed">
                      With an AI Readiness Score of <strong className="text-white">{overallScore}/100</strong> and a{' '}
                      <strong style={{ color: archetype.color }}>{archetype.name}</strong> profile, {companyData.name} demonstrates{' '}
                      {overallScore >= 70
                        ? 'strong foundational capabilities for enterprise AI adoption. The organization is well-positioned to scale AI initiatives across departments.'
                        : overallScore >= 50
                        ? 'developing capabilities with clear opportunities for acceleration. Targeted investments in identified gap areas will unlock significant value.'
                        : 'early-stage AI readiness with substantial transformation opportunity. Strategic foundation-building will enable future AI initiatives.'
                      }
                    </p>
                    <p className="type-sm text-gray-300 leading-relaxed">
                      {companyInsights.tech_insights?.mentions_ai
                        ? 'Given the existing technology signals on your website, AI transformation can build on current digital investments.'
                        : 'The AI transformation opportunity score indicates significant potential for competitive differentiation through strategic AI adoption.'
                      }
                    </p>
                  </div>
                ) : (
                  <p className="type-sm text-gray-300 leading-relaxed">
                    {archetype.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quadrant + Scores Section */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-[340px_1fr] gap-8 items-start">
            {/* Left: Quadrant */}
            <div className="hidden lg:block">
              <ArchetypeQuadrant
                axisScores={axisScores}
                predictedArchetype={archetype}
                totalAnswered={999}
              />
            </div>

            {/* Right: Three Score Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="type-base text-white/80">Strategic Vision</span>
                  <span className="text-xl font-semibold">{axisScores.vision}/100</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${axisScores.vision}%` }}
                  />
                </div>
                <p className="type-sm text-white/50 mt-2">Leadership, Culture & Governance</p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="type-base text-white/80">Operational Capability</span>
                  <span className="text-xl font-semibold">{axisScores.ops}/100</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-violet-500"
                    style={{ width: `${axisScores.ops}%` }}
                  />
                </div>
                <p className="type-sm text-white/50 mt-2">Data, Technology & Talent</p>
              </div>

              {/* New: AI Transformation Opportunity */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                <div className="flex justify-between items-center mb-3">
                  <span className="type-base text-white/80 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    AI Transformation Opportunity
                  </span>
                  <span className="text-xl font-semibold text-emerald-400">{transformationOpportunity}/100</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    style={{ width: `${transformationOpportunity}%` }}
                  />
                </div>
                <p className="type-sm text-white/50 mt-2">
                  Economic value potential from AI transformation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile: Axis Scores */}
        <div className="lg:hidden grid grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="type-xs text-white/40 mb-1">Vision</p>
            <span className="text-xl font-semibold text-blue-400">{axisScores.vision}</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="type-xs text-white/40 mb-1">Ops</p>
            <span className="text-xl font-semibold text-violet-400">{axisScores.ops}</span>
          </div>
          <div className="col-span-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="type-xs text-white/40 mb-1">Opportunity</p>
            <span className="text-xl font-semibold text-emerald-400">{transformationOpportunity}</span>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="heading-subsection mb-6 text-center">Readiness Gap Analysis</h2>
          <div ref={chartRef} className="w-full max-w-md mx-auto">
            <MaturityRadar dimensionScores={dimensionScores} showColors={true} />
          </div>
          <p className="type-xs text-white/50 text-center mt-4">
            Your score (Purple gradient) vs. Industry Benchmark (Gray)
          </p>
        </div>

        {/* Dimension Scores Table */}
        <div className="mb-12">
          <h2 className="heading-subsection mb-6">Dimension Scores</h2>
          <div className="rounded-xl overflow-hidden border border-white/10">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 grid grid-cols-[1fr_120px_120px] gap-4">
              <span className="text-sm font-semibold text-white">Dimension</span>
              <span className="text-sm font-semibold text-white text-center">Score</span>
              <span className="text-sm font-semibold text-white text-center">Status</span>
            </div>
            {/* Table Rows */}
            <div className="divide-y divide-white/5">
              {dimensionScores.map((d, idx) => {
                const status = d.score >= 70 ? 'Strong' : d.score >= 50 ? 'Developing' : 'Needs Work';
                const statusColor = d.score >= 70 ? 'text-green-400' : d.score >= 50 ? 'text-yellow-400' : 'text-red-400';
                return (
                  <div
                    key={idx}
                    className={`px-6 py-4 grid grid-cols-[1fr_120px_120px] gap-4 items-center ${
                      idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                    }`}
                  >
                    <span className="text-sm text-white/90">{d.dimension}</span>
                    <span className="text-sm text-white/70 text-center">{d.score}/100</span>
                    <span className={`text-sm font-medium text-center ${statusColor}`}>{status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* What We Discovered Section - Rebalanced Layout */}
        {companyInsights && (
          <section className="mb-12">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-5 h-5 text-purple-400" />
                <h2 className="heading-subsection m-0">What We Discovered</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Technology + Confidence + Maturity Signals */}
                <div className="space-y-4">
                  {/* Technology Signals */}
                  {companyInsights.tech_insights && (
                    <div>
                      <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
                        Technology Profile
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {companyInsights.tech_insights.mentions_ai ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="type-sm text-white/70">
                            AI/ML mentioned on website
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {companyInsights.tech_insights.has_roadmap ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="type-sm text-white/70">
                            Technology roadmap visible
                          </span>
                        </div>
                      </div>

                      {companyInsights.tech_insights.ai_use_cases.length > 0 && (
                        <div className="mt-3">
                          <p className="type-xs text-white/40 mb-2">Detected AI Use Cases:</p>
                          <div className="flex flex-wrap gap-2">
                            {companyInsights.tech_insights.ai_use_cases.map((useCase, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-xs border border-blue-500/20"
                              >
                                {useCase}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Analysis Confidence - Moved to left */}
                  {companyInsights.readiness_clues && (
                    <div>
                      <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
                        Analysis Confidence
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                            style={{
                              width:
                                companyInsights.ai_maturity.confidence === 'high'
                                  ? '100%'
                                  : companyInsights.ai_maturity.confidence === 'medium'
                                  ? '66%'
                                  : '33%',
                            }}
                          />
                        </div>
                        <span className="type-xs text-white/60 capitalize min-w-[60px]">
                          {companyInsights.ai_maturity.confidence}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* AI Maturity Signals - Moved to left */}
                  {companyInsights.ai_maturity?.signals && companyInsights.ai_maturity.signals.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
                        AI Maturity Signals
                      </h3>
                      <div className="space-y-2">
                        {companyInsights.ai_maturity.signals.slice(0, 4).map((signal: string, i: number) => {
                          const category = categorizeSignal(signal);
                          return (
                            <div
                              key={i}
                              className={`flex items-start gap-2 p-2 rounded-lg ${category.bgColor} border ${category.borderColor}`}
                            >
                              {category.icon}
                              <p className="text-xs text-gray-300 leading-relaxed">
                                {signal}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Strengths + Gaps */}
                <div className="space-y-4">
                  {companyInsights.readiness_clues && (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
                          Predicted Strengths
                        </h3>
                        <ul className="space-y-2">
                          {companyInsights.readiness_clues.strengths.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2 type-sm text-green-300">
                              <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
                          Areas to Address
                        </h3>
                        <ul className="space-y-2">
                          {companyInsights.readiness_clues.gaps.map((gap, i) => (
                            <li key={i} className="flex items-start gap-2 type-sm text-yellow-300">
                              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                              {gap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {/* Leadership Team */}
                  {companyInsights.leadership_team && companyInsights.leadership_team.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
                        Leadership Team
                      </h3>
                      <div className="space-y-2">
                        {companyInsights.leadership_team.slice(0, 3).map((exec, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-2 bg-white/[0.02] rounded-lg border border-white/[0.06]"
                          >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-xs">
                              {exec.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="type-xs font-medium text-white truncate">{exec.name}</p>
                              <p className="type-xs text-white/50 truncate">{exec.title}</p>
                            </div>
                            {exec.linkedin && (
                              <a
                                href={exec.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300"
                              >
                                <Linkedin className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Industry-Specific Insights Section */}
        {industryAnalysis && (
          <section className="mb-12">
            <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl border border-indigo-500/20 p-6 md:p-8">
              <h2 className="heading-subsection mb-6 flex items-center gap-3">
                <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Industry-Specific Insights
              </h2>
              <div className="prose prose-invert prose-sm md:prose-base max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({children}) => <h2 className="text-xl font-bold text-white mb-4 mt-6">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-semibold text-white/90 mb-3 mt-4">{children}</h3>,
                    p: ({children}) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
                    strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                    ul: ({children}) => <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>,
                    li: ({children}) => <li className="text-gray-300">{children}</li>,
                  }}
                >
                  {industryAnalysis}
                </ReactMarkdown>
              </div>
            </div>
          </section>
        )}

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

        {/* Recommendations Roadmap */}
        {recommendations.length > 0 && (
          <div className="mb-12">
            <h2 className="heading-subsection mb-6">Your Roadmap</h2>
            <div className="space-y-8">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="relative pl-10 border-l-2 border-white/10"
                >
                  {/* Larger timeline dot */}
                  <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-[#050507] flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-white">{idx + 1}</span>
                  </div>

                  {/* Connecting line to next phase */}
                  {idx < recommendations.length - 1 && (
                    <div className="absolute left-0 top-10 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />
                  )}

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all">
                    {/* Phase header with timeline */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30">
                        <span className="text-sm font-semibold text-indigo-300">{rec.phase}</span>
                      </span>
                      <span className="text-sm text-white/40">{rec.timeframe}</span>
                    </div>

                    {/* Title and description */}
                    <h3 className="text-lg font-semibold text-white mb-2">{rec.title}</h3>
                    <p className="text-sm text-white/60 mb-4">{rec.description}</p>

                    {/* Action items */}
                    <ul className="space-y-2">
                      {rec.actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/70">
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
            href="https://calendar.app.google/wirgV6a4Vcz7cZAcA"
            target="_blank"
            rel="noopener noreferrer"
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

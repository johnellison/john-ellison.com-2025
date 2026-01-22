'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { DimensionScore, Archetype } from '@/types/assessment';
import { gsap } from '@/lib/gsap';

interface LiveRadarChartProps {
  dimensionScores: DimensionScore[];
  predictedArchetype: Archetype | null;
  currentDimensionId?: string;
  isAnalyzing?: boolean;
  companyInsights?: any;
  totalAnswered?: number;
}

// Short labels for radar chart
const DIMENSION_SHORT_NAMES: Record<string, string> = {
  'Leadership & Strategy': 'Leadership',
  'Data Readiness': 'Data',
  'Technology Infrastructure': 'Tech',
  'Talent & Capability': 'Talent',
  'Governance & Responsible AI': 'Governance',
  'Culture & Change Readiness': 'Culture',
};

// Dimension IDs to titles mapping
const DIMENSION_ID_TO_TITLE: Record<string, string> = {
  leadership: 'Leadership & Strategy',
  data: 'Data Readiness',
  technology: 'Technology Infrastructure',
  talent: 'Talent & Capability',
  governance: 'Governance & Responsible AI',
  culture: 'Culture & Change Readiness',
};

// Purple-to-blue gradient colors for dimensions
const DIMENSION_COLORS = [
  '#8b5cf6', // Leadership - Violet
  '#7c3aed', // Data - Purple
  '#6d28d9', // Technology - Deep Purple
  '#5b21b6', // Talent - Indigo
  '#4c1d95', // Governance - Blue Violet
  '#3b82f6', // Culture - Blue
];

export default function LiveRadarChart({
  dimensionScores,
  predictedArchetype,
  currentDimensionId,
  isAnalyzing = false,
  companyInsights,
  totalAnswered = 0,
}: LiveRadarChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [hasAnimatedInsights, setHasAnimatedInsights] = useState(false);

  // Transform data for Recharts
  const data = dimensionScores.map((d, index) => ({
    subject: DIMENSION_SHORT_NAMES[d.dimension] || d.dimension.split(' ')[0],
    fullName: d.dimension,
    score: d.score,
    benchmark: 65, // Series B benchmark
    fullMark: 100,
    color: DIMENSION_COLORS[index] || '#7c3aed',
  }));

  // Get archetype color or default purple
  const fillColor = predictedArchetype?.color || '#7c3aed';

  // Current dimension's full name for highlighting
  const currentDimensionTitle = currentDimensionId
    ? DIMENSION_ID_TO_TITLE[currentDimensionId]
    : null;

  // Check if we have company insights with AI maturity score
  const hasValidInsights = companyInsights && typeof companyInsights.ai_maturity?.score === 'number';
  const hasAnswered = totalAnswered > 0;

  // Animate when insights first arrive
  useEffect(() => {
    if (hasValidInsights && !hasAnimatedInsights && chartContainerRef.current) {
      setHasAnimatedInsights(true);
      gsap.from(chartContainerRef.current, {
        opacity: 0.5,
        scale: 0.95,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });
    }
  }, [hasValidInsights, hasAnimatedInsights]);

  return (
    <div className="bg-[#0c0c10] rounded-xl border border-white/10 p-4 relative overflow-hidden">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider">
          Maturity Profile
        </h3>
      </div>

      {/* Radar Chart Container */}
      <div ref={chartContainerRef} className="w-full h-[220px] relative">
        {/* Loading Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0c0c10]/80 backdrop-blur-sm rounded-xl">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 relative">
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 animate-spin" />
              </div>
              <p className="text-xs text-white/60">Analyzing website...</p>
            </div>
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <defs>
              <linearGradient id="liveRadarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#6d28d9" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <PolarGrid stroke="#334155" strokeOpacity={0.5} />
            <PolarAngleAxis
              dataKey="subject"
              tick={({ payload, x, y, textAnchor }) => {
                const isActive = currentDimensionTitle &&
                  DIMENSION_SHORT_NAMES[currentDimensionTitle] === payload.value;
                const index = data.findIndex(d => d.subject === payload.value);
                const dimColor = index >= 0 ? data[index].color : '#94a3b8';
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    fill={isActive ? dimColor : '#94a3b8'}
                    fontSize={11}
                    fontWeight={isActive ? 600 : 400}
                    className="transition-all duration-300"
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            {/* Benchmark line (dashed) */}
            <Radar
              name="Benchmark"
              dataKey="benchmark"
              stroke="#64748b"
              strokeDasharray="4 4"
              fill="none"
              strokeWidth={1}
            />
            {/* User scores */}
            <Radar
              name="Your Score"
              dataKey="score"
              stroke={hasAnswered ? 'url(#liveRadarGradient)' : fillColor}
              fill={hasAnswered ? 'url(#liveRadarGradient)' : fillColor}
              fillOpacity={0.3}
              strokeWidth={2}
              animationDuration={400}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-2 text-[10px]">
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: `${fillColor}50` }}
          />
          <span className="text-white/60">Your Score</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 border-t border-dashed border-slate-500" />
          <span className="text-white/40">Benchmark (65)</span>
        </div>
      </div>

      {/* Company Insights Mini-Display (below radar when insights arrive) */}
      {hasValidInsights && !hasAnswered && (
        <div className="mt-3 pt-3 border-t border-white/5 text-center">
          <p className="text-[10px] text-white/40 mb-1">Initial AI Maturity Estimate</p>
          <p className="text-sm font-semibold text-purple-400">
            {companyInsights.ai_maturity.score}/100
          </p>
        </div>
      )}
    </div>
  );
}

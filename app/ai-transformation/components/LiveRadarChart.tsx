'use client';

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { DimensionScore, Archetype } from '@/types/assessment';

interface LiveRadarChartProps {
  dimensionScores: DimensionScore[];
  predictedArchetype: Archetype | null;
  currentDimensionId?: string;
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

export default function LiveRadarChart({
  dimensionScores,
  predictedArchetype,
  currentDimensionId,
}: LiveRadarChartProps) {
  // Transform data for Recharts
  const data = dimensionScores.map((d) => ({
    subject: DIMENSION_SHORT_NAMES[d.dimension] || d.dimension.split(' ')[0],
    fullName: d.dimension,
    score: d.score,
    benchmark: 65, // Series B benchmark
    fullMark: 100,
  }));

  // Get archetype color or default purple
  const fillColor = predictedArchetype?.color || '#7c3aed';

  // Current dimension's full name for highlighting
  const currentDimensionTitle = currentDimensionId
    ? DIMENSION_ID_TO_TITLE[currentDimensionId]
    : null;

  return (
    <div className="bg-[#0c0c10] rounded-xl border border-white/10 p-4">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider">
          Maturity Profile
        </h3>
      </div>

      {/* Radar Chart */}
      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#334155" strokeOpacity={0.5} />
            <PolarAngleAxis
              dataKey="subject"
              tick={({ payload, x, y, textAnchor }) => {
                const isActive = currentDimensionTitle &&
                  DIMENSION_SHORT_NAMES[currentDimensionTitle] === payload.value;
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    fill={isActive ? fillColor : '#94a3b8'}
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
              stroke={fillColor}
              fill={fillColor}
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
    </div>
  );
}

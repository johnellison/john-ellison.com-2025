'use client';

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { DimensionScore } from '@/types/assessment';

// Purple-to-blue gradient colors for each dimension
const DIMENSION_COLORS = [
  '#8b5cf6', // Leadership - Violet
  '#7c3aed', // Data - Purple
  '#6d28d9', // Technology - Deep Purple
  '#5b21b6', // Talent - Indigo
  '#4c1d95', // Governance - Blue Violet
  '#3b82f6', // Culture - Blue
];

interface MaturityRadarProps {
  dimensionScores: DimensionScore[];
  showColors?: boolean;
}

export default function MaturityRadar({ dimensionScores, showColors = false }: MaturityRadarProps) {
  const data = dimensionScores.map((d, index) => ({
    subject: d.dimension.split(' ')[0], // Shorten name for chart
    A: d.score,
    B: 65, // Benchmark (Series A-C Average)
    fullMark: 100,
    color: DIMENSION_COLORS[index] || '#7c3aed',
  }));

  // Create a gradient ID for the colored version
  const gradientId = 'radarGradient';

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          {showColors && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#6d28d9" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          )}
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis
            dataKey="subject"
            tick={({ payload, x, y, textAnchor }) => {
              const index = data.findIndex(d => d.subject === payload.value);
              const color = showColors && index >= 0 ? data[index].color : '#94a3b8';
              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  fill={color}
                  fontSize={14}
                  fontWeight={showColors ? 600 : 500}
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
          <Radar
            name="Your Score"
            dataKey="A"
            stroke={showColors ? `url(#${gradientId})` : '#7c3aed'}
            fill={showColors ? `url(#${gradientId})` : '#7c3aed'}
            fillOpacity={showColors ? 0.4 : 0.6}
            strokeWidth={showColors ? 2 : 1}
          />
          <Radar
            name="Series B Benchmark"
            dataKey="B"
            stroke="#94a3b8"
            fill="#94a3b8"
            fillOpacity={0.1}
          />
          <Legend wrapperStyle={{ color: '#e2e8f0' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

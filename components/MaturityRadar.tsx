'use client';

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { DimensionScore } from '@/types/assessment';

interface MaturityRadarProps {
  dimensionScores: DimensionScore[];
}

export default function MaturityRadar({ dimensionScores }: MaturityRadarProps) {
  const data = dimensionScores.map(d => ({
    subject: d.dimension.split(' ')[0], // Shorten name for chart
    A: d.score,
    B: 65, // Benchmark (Series A-C Average)
    fullMark: 100,
  }));

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
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
            stroke="#7c3aed"
            fill="#7c3aed"
            fillOpacity={0.6}
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

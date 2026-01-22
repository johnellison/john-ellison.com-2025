'use client';

import { DimensionScore, Archetype, AxisScores } from '@/types/assessment';
import ArchetypeQuadrant from './ArchetypeQuadrant';
import LiveRadarChart from './LiveRadarChart';

interface AssessmentSidebarProps {
  dimensionScores: DimensionScore[];
  axisScores: AxisScores;
  predictedArchetype: Archetype | null;
  currentDimensionId?: string;
  totalAnswered: number;
}

export default function AssessmentSidebar({
  dimensionScores,
  axisScores,
  predictedArchetype,
  currentDimensionId,
  totalAnswered,
}: AssessmentSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Archetype Quadrant - Most prominent */}
      <ArchetypeQuadrant
        axisScores={axisScores}
        predictedArchetype={predictedArchetype}
        totalAnswered={totalAnswered}
      />

      {/* Live Radar Chart */}
      <LiveRadarChart
        dimensionScores={dimensionScores}
        predictedArchetype={predictedArchetype}
        currentDimensionId={currentDimensionId}
      />
    </div>
  );
}

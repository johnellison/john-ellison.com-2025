import { useMemo } from 'react';
import {
  IndividualDimensionScore,
  IndividualAxisScores,
  IndividualArchetype,
} from '@/types/assessment';
import {
  calculateIndividualAxisScores,
  determineIndividualArchetype,
} from '@/lib/scoring';

interface Dimension {
  id: string;
  title: string;
  questions: { id: string }[];
  weight: number;
}

interface UseIndividualAssessmentScoresResult {
  dimensionScores: IndividualDimensionScore[];
  axisScores: IndividualAxisScores;
  predictedArchetype: IndividualArchetype | null;
  totalAnswered: number;
  totalQuestions: number;
  dimensionProgress: Record<string, { answered: number; total: number }>;
}

export function useIndividualAssessmentScores(
  dimensions: Dimension[],
  answers: Record<string, number>
): UseIndividualAssessmentScoresResult {
  return useMemo(() => {
    // Calculate dimension scores
    const dimensionScores: IndividualDimensionScore[] = dimensions.map((dim) => {
      const questionScores = dim.questions
        .map((q) => answers[q.id])
        .filter((s): s is number => s !== undefined);

      const avgScore = questionScores.length > 0
        ? Math.round(questionScores.reduce((a, b) => a + b, 0) / questionScores.length)
        : 0;

      return {
        dimension: dim.title,
        score: avgScore,
        weight: dim.weight,
      };
    });

    // Calculate progress
    const dimensionProgress: Record<string, { answered: number; total: number }> = {};
    let totalAnswered = 0;
    let totalQuestions = 0;

    dimensions.forEach((dim) => {
      const answered = dim.questions.filter((q) => answers[q.id] !== undefined).length;
      dimensionProgress[dim.id] = {
        answered,
        total: dim.questions.length,
      };
      totalAnswered += answered;
      totalQuestions += dim.questions.length;
    });

    // Calculate axis scores
    const axisScores = calculateIndividualAxisScores(dimensionScores);

    // Determine archetype (only if we have enough data)
    const predictedArchetype = totalAnswered >= 3
      ? determineIndividualArchetype(axisScores)
      : null;

    return {
      dimensionScores,
      axisScores,
      predictedArchetype,
      totalAnswered,
      totalQuestions,
      dimensionProgress,
    };
  }, [dimensions, answers]);
}

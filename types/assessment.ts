export interface AssessmentAnswer {
  questionId: string;
  score: number;
}

export interface DimensionScore {
  dimension: string;
  score: number;
  weight: number;
}

export interface ReadinessLevel {
  level: string;
  color: string;
  timeline: string;
  successRate: string;
}

export type ArchetypeType = 
  | 'Apex Integrator'
  | 'Visionary Architect'
  | 'Tactical Powerhouse'
  | 'Calculated Scout';

export interface Archetype {
  name: ArchetypeType;
  title: string;
  description: string;
  hook: string;
  color: string;
}

export interface AxisScores {
  vision: number; // Y-Axis: Strategy, Culture, Governance
  ops: number;    // X-Axis: Data, Tech, Talent
}

export interface AssessmentResult {
  companyData: {
    name: string;
    website: string;
    linkedin: string;
    email: string;
  };
  dimensionScores: DimensionScore[];
  overallScore: number;
  readiness: ReadinessLevel;
  archetype: Archetype;
  axisScores: AxisScores;
  blockers: Blocker[];
  recommendations: Recommendation[];
}

export interface Blocker {
  dimension: string;
  issue: string;
  impact: string;
  costRange: string;
  timeline: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Recommendation {
  phase: string;
  title: string;
  description: string;
  actions: string[];
  timeframe: string;
}

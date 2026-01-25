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

export interface LeadershipMember {
  name: string;
  title: string;
  linkedin?: string;
}

export interface CompanyMetadata {
  employee_range?: string;
  founded_year?: string;
  headquarters?: string;
  favicon?: string;
  ogImage?: string;
  pageTitle?: string;
  pageDescription?: string;
}

export interface CompanyInsights {
  company_summary: string;
  metadata?: CompanyMetadata;
  ai_maturity: {
    score: number;
    signals: string[];
    confidence: string;
  };
  tech_insights: {
    has_roadmap: boolean;
    mentions_ai: boolean;
    ai_use_cases: string[];
  };
  readiness_clues: {
    likely_dimensions: string[];
    strengths: string[];
    gaps: string[];
  };
  leadership_team?: LeadershipMember[];
}

export interface AssessmentResult {
  companyData: {
    name: string;
    website: string;
    linkedin: string;
    email: string;
  };
  companyInsights?: CompanyInsights;
  industryAnalysis?: string;
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

// Individual Executive Assessment Types
export type IndividualArchetypeType =
  | 'AI Power User'
  | 'Strategic Delegator'
  | 'Curious Optimizer'
  | 'Cautious Observer';

export interface IndividualArchetype {
  name: IndividualArchetypeType;
  title: string;
  description: string;
  hook: string;
  color: string;
  recommended: string;
}

export interface IndividualAxisScores {
  readiness: number;  // Y-Axis: Personal AI Fluency + Implementation Readiness
  opportunity: number; // X-Axis: Workflow Complexity + Strategic Leverage
}

export interface IndividualDimensionScore {
  dimension: string;
  score: number;
  weight: number;
}

export interface IndividualAssessmentResult {
  userData: {
    name: string;
    email: string;
    title?: string;
    company?: string;
  };
  dimensionScores: IndividualDimensionScore[];
  overallScore: number;
  archetype: IndividualArchetype;
  axisScores: IndividualAxisScores;
  timeSavings: {
    weekly: number;
    monthly: number;
    annual: number;
  };
  recommendations: IndividualRecommendation[];
}

export interface IndividualRecommendation {
  tier: string;
  title: string;
  description: string;
  benefits: string[];
  price: string;
}

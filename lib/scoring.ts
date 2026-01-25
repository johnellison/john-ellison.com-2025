import {
  AssessmentAnswer,
  DimensionScore,
  ReadinessLevel,
  Blocker,
  Recommendation,
  Archetype,
  AxisScores,
  IndividualArchetype,
  IndividualAxisScores,
  IndividualDimensionScore,
  IndividualRecommendation
} from '@/types/assessment';

const ARCHETYPES: Record<string, Archetype> = {
  ApexIntegrator: {
    name: 'Apex Integrator',
    title: 'The Apex Integrator',
    description: 'You combine high strategic vision with robust operational capability. AI is becoming your competitive moat.',
    hook: 'We are the 1%. AI is our competitive moat.',
    color: '#7c3aed', // Violet
  },
  VisionaryArchitect: {
    name: 'Visionary Architect',
    title: 'The Visionary Architect',
    description: 'You have a clear strategic direction, but your operational foundation needs strengthening to execute that vision.',
    hook: 'We know exactly where we going.',
    color: '#3b82f6', // Blue
  },
  TacticalPowerhouse: {
    name: 'Tactical Powerhouse',
    title: 'The Tactical Powerhouse',
    description: 'You have strong technical muscles and data capability, but lack the unified strategic direction to maximize ROI.',
    hook: 'We are an execution machine.',
    color: '#f59e0b', // Amber
  },
  CalculatedScout: {
    name: 'Calculated Scout',
    title: 'The Calculated Scout',
    description: 'You are in the early stages, observing and planning. You prioritize prudence over speed.',
    hook: 'We measure twice, cut once.',
    color: '#64748b', // Slate
  }
};

export function calculateDimensionScore(
  answers: Record<string, number>,
  questionIds: string[]
): number {
  const dimensionAnswers = questionIds.map((id) => answers[id]);
  const validAnswers = dimensionAnswers.filter((a): a is number => a !== undefined);
  if (validAnswers.length === 0) return 0;
  const sum = validAnswers.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / validAnswers.length);
}

export function calculateAxisScores(dimensionScores: DimensionScore[]): AxisScores {
  const scores = dimensionScores.reduce((acc, dim) => ({
    ...acc,
    [dim.dimension]: dim.score
  }), {} as Record<string, number>);

  // Y-Axis: Strategic Vision (Leadership, Culture, Governance)
  const visionScore = Math.round(
    ((scores['Leadership & Strategy'] || 0) + 
     (scores['Culture & Change Readiness'] || 0) + 
     (scores['Governance & Responsible AI'] || 0)) / 3
  );

  // X-Axis: Operational Capability (Data, Tech, Talent)
  const opsScore = Math.round(
    ((scores['Data Readiness'] || 0) + 
     (scores['Technology Infrastructure'] || 0) + 
     (scores['Talent & Capability'] || 0)) / 3
  );

  return { vision: visionScore, ops: opsScore };
}

export function determineArchetype(axisScores: AxisScores): Archetype {
  const { vision, ops } = axisScores;
  const THRESHOLD = 50; // Midpoint

  if (vision >= THRESHOLD && ops >= THRESHOLD) return ARCHETYPES.ApexIntegrator;
  if (vision >= THRESHOLD && ops < THRESHOLD) return ARCHETYPES.VisionaryArchitect;
  if (vision < THRESHOLD && ops >= THRESHOLD) return ARCHETYPES.TacticalPowerhouse;
  return ARCHETYPES.CalculatedScout;
}

export function calculateOverallScore(dimensionScores: DimensionScore[]): number {
  const weightedSum = dimensionScores.reduce(
    (acc, dim) => acc + dim.score * dim.weight,
    0
  );
  return Math.round(weightedSum);
}

export function getReadinessLevel(score: number): ReadinessLevel {
  if (score < 20) {
    return {
      level: 'Not Ready',
      color: '#ef4444',
      timeline: '18-24 months',
      successRate: '15-20%',
    };
  }
  if (score < 40) {
    return {
      level: 'Early Stage',
      color: '#f97316',
      timeline: '12-18 months',
      successRate: '35-50%',
    };
  }
  if (score < 60) {
    return {
      level: 'Developing',
      color: '#eab308',
      timeline: '12-18 months',
      successRate: '60-75%',
    };
  }
  if (score < 80) {
    return {
      level: 'Ready to Accelerate',
      color: '#22c55e',
      timeline: '9-12 months',
      successRate: '75-85%',
    };
  }
  return {
    level: 'Advanced',
    color: '#3b82f6',
    timeline: '6-9 months',
    successRate: '85-95%',
  };
}

export function identifyBlockers(
  dimensionScores: DimensionScore[]
): Blocker[] {
  const blockers: Blocker[] = [];

  dimensionScores.forEach((dim) => {
    if (dim.score < 40) {
      if (dim.dimension === 'Data Readiness') {
        blockers.push({
          dimension: dim.dimension,
          issue: 'Poor data quality and governance',
          impact: '52-98% of organizations cite this as top blocker',
          costRange: '$300K-$2M',
          timeline: '12-24 months',
          priority: 'high',
        });
      } else if (dim.dimension === 'Technology Infrastructure') {
        blockers.push({
          dimension: dim.dimension,
          issue: 'Legacy system integration challenges',
          impact: '93% blocked by integration issues',
          costRange: '$150K-$500K',
          timeline: '6-12 months',
          priority: 'high',
        });
      } else if (dim.dimension === 'Talent & Capability') {
        blockers.push({
          dimension: dim.dimension,
          issue: 'Lack of internal AI expertise',
          impact: '52% lack talent and skills',
          costRange: '$150K-$500K',
          timeline: '6-12 months',
          priority: 'high',
        });
      }
    }

    if (dim.score < 60) {
      if (dim.dimension === 'Leadership & Strategy') {
        blockers.push({
          dimension: dim.dimension,
          issue: 'No clear AI strategy or executive sponsor',
          impact: 'Strategy gaps predict 70% slower progress',
          costRange: '$50K-$200K',
          timeline: '3-6 months',
          priority: 'medium',
        });
      } else if (dim.dimension === 'Culture & Change Readiness') {
        blockers.push({
          dimension: dim.dimension,
          issue: 'Employee resistance and fear of AI',
          impact: 'Adoption drops to 20-30% without addressing',
          costRange: '$50K-$200K',
          timeline: '6-12 months',
          priority: 'medium',
        });
      }
    }

    if (dim.score < 50) {
      if (dim.dimension === 'Governance & Responsible AI') {
        blockers.push({
          dimension: dim.dimension,
          issue: 'No AI governance framework',
          impact: 'Only 43% have governance policy',
          costRange: '$50K-$200K',
          timeline: '2-3 months',
          priority: 'medium',
        });
      }
    }
  });

  return blockers.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

export function generateRecommendations(
  overallScore: number,
  dimensionScores: DimensionScore[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (overallScore < 40) {
    // Early stage: 4 phases from foundation to adoption
    recommendations.push(
      {
        phase: 'Phase 1',
        title: 'AI Strategy & Governance Foundation',
        description: 'Build foundational strategy, assign executive sponsor, and create governance framework.',
        actions: [
          'Develop and document AI strategy with clear KPIs',
          'Appoint C-suite AI sponsor and steering committee',
          'Establish responsible AI policies and ethical guidelines',
          'Create data governance framework with ownership',
        ],
        timeframe: '',
      },
      {
        phase: 'Phase 2',
        title: 'Data & Infrastructure Readiness',
        description: 'Centralize data, improve quality monitoring, and build foundational infrastructure.',
        actions: [
          'Implement data catalog and metadata management',
          'Deploy automated data quality monitoring',
          'Create data warehouse/lakehouse for centralized access',
          'Establish cloud infrastructure and security foundations',
        ],
        timeframe: '',
      },
      {
        phase: 'Phase 3',
        title: 'AI Product Sprints',
        description: 'Run focused sprints to build and deploy initial AI use cases that demonstrate value.',
        actions: [
          'Identify 2-3 high-impact, low-complexity AI opportunities',
          'Run rapid prototyping sprints with cross-functional teams',
          'Build and deploy first production AI use case',
          'Measure ROI and document learnings',
        ],
        timeframe: '',
      },
      {
        phase: 'Phase 4',
        title: 'Adoption & Integration',
        description: 'Drive organization-wide AI adoption through training, change management, and scaling.',
        actions: [
          'Deploy AI literacy training across the organization',
          'Create internal AI champion and ambassador program',
          'Integrate AI tools into daily workflows',
          'Establish feedback loops for continuous improvement',
        ],
        timeframe: '',
      }
    );
  } else if (overallScore < 60) {
    // Developing stage: 4 phases focused on acceleration
    recommendations.push(
      {
        phase: 'Phase 1',
        title: 'Close Readiness Gaps',
        description: 'Address specific blockers and prepare for accelerated AI adoption.',
        actions: [
          'Prioritize and fix highest-impact blockers',
          'Strengthen data quality and governance gaps',
          'Deploy change management program',
          'Upskill teams with AI literacy training',
        ],
        timeframe: '',
      },
      {
        phase: 'Phase 2',
        title: 'AI Product Sprints',
        description: 'Run focused sprints to build and deploy AI use cases that demonstrate value.',
        actions: [
          'Identify and prioritize next 2-3 high-impact use cases',
          'Run rapid prototyping sprints with cross-functional teams',
          'Build first production use case with measurable ROI',
          'Create reusable AI components and patterns',
        ],
        timeframe: '',
      },
      {
        phase: 'Phase 3',
        title: 'Scale & Operationalize',
        description: 'Expand from initial use cases to multiple production deployments.',
        actions: [
          'Establish MLOps for production deployment and monitoring',
          'Scale from 1-2 use cases to 5-10 across departments',
          'Build internal AI champion program',
          'Create self-service AI tools for business users',
        ],
        timeframe: '',
      },
      {
        phase: 'Phase 4',
        title: 'Enterprise Integration',
        description: 'Embed AI capabilities into core business processes and culture.',
        actions: [
          'Integrate AI into strategic planning and decision-making',
          'Deploy organization-wide AI training programs',
          'Establish continuous improvement feedback loops',
          'Build AI-first culture with visible leadership modeling',
        ],
        timeframe: '',
      }
    );
  } else {
    // High maturity: 4 phases for enterprise scaling
    recommendations.push(
      {
        phase: 'Phase 1',
        title: 'AI Center of Excellence',
        description: 'Establish centralized AI capabilities and governance.',
        actions: [
          'Define AI CoE charter and operating model',
          'Recruit or designate AI leadership roles',
          'Set up AI governance framework',
        ],
        timeframe: '',
      },
      {
        phase: 'Phase 2',
        title: 'Cross-Functional Alignment',
        description: 'Create governance structure and stakeholder buy-in.',
        actions: [
          'Form AI governance council with cross-functional leaders',
          'Establish AI ethics and risk management policies',
          'Define success metrics and KPIs',
        ],
        timeframe: '',
      },
      {
        phase: 'Phase 3',
        title: 'Platform & Architecture',
        description: 'Build scalable AI infrastructure and tooling.',
        actions: [
          'Design AI platform architecture (MLOps, data pipelines)',
          'Select and implement AI/ML tooling stack',
          'Create reusable AI components library',
        ],
        timeframe: '',
      },
      {
        phase: 'Phase 4',
        title: 'Organization-Wide Scaling',
        description: 'Deploy change management and expand AI across departments.',
        actions: [
          'Launch AI training programs for all employees',
          'Scale from 3-5 to 10+ AI use cases',
          'Implement continuous improvement feedback loops',
        ],
        timeframe: '',
      }
    );
  }

  return recommendations;
}

// ============================================
// INDIVIDUAL EXECUTIVE ASSESSMENT SCORING
// ============================================

const INDIVIDUAL_ARCHETYPES: Record<string, IndividualArchetype> = {
  AIPowerUser: {
    name: 'AI Power User',
    title: 'The AI Power User',
    description: 'You have high AI fluency and significant opportunity to leverage AI for productivity gains. You\'re ready for the full transformation.',
    hook: 'I\'m ready to multiply my impact with AI.',
    color: '#7c3aed', // Violet
    recommended: 'Executive AI Transformation Package (Full) + 24/7 AI Executive Assistant',
  },
  StrategicDelegator: {
    name: 'Strategic Delegator',
    title: 'The Strategic Delegator',
    description: 'You have significant leverage potential but are still building AI fluency. Guided implementation with training will accelerate your results.',
    hook: 'I need AI to handle the tasks draining my focus.',
    color: '#3b82f6', // Blue
    recommended: 'Executive AI Transformation Package (Core) + training focus',
  },
  CuriousOptimizer: {
    name: 'Curious Optimizer',
    title: 'The Curious Optimizer',
    description: 'You\'re AI-savvy but your current workflows may not offer the highest leverage for AI assistance. Start with targeted automation.',
    hook: 'I want to find the right AI applications for my work.',
    color: '#f59e0b', // Amber
    recommended: '24/7 AI Executive Assistant or Executive AI Transformation (Core)',
  },
  CautiousObserver: {
    name: 'Cautious Observer',
    title: 'The Cautious Observer',
    description: 'You\'re in the early stages of AI exploration. A guided pilot will help you build confidence and identify quick wins.',
    hook: 'I want to understand AI before going all in.',
    color: '#64748b', // Slate
    recommended: 'Free resources + 24/7 AI Executive Assistant Pilot Week',
  }
};

export function calculateIndividualAxisScores(dimensionScores: IndividualDimensionScore[]): IndividualAxisScores {
  const scores = dimensionScores.reduce((acc, dim) => ({
    ...acc,
    [dim.dimension]: dim.score
  }), {} as Record<string, number>);

  // Y-Axis: AI Readiness (Personal AI Fluency 30% + Implementation Readiness 20%)
  const fluencyScore = scores['Personal AI Fluency'] || 0;
  const readinessScore = scores['Implementation Readiness'] || 0;
  const readiness = Math.round((fluencyScore * 0.6) + (readinessScore * 0.4));

  // X-Axis: Opportunity Size (Workflow Complexity 25% + Strategic Leverage 25%)
  const workflowScore = scores['Workflow Complexity'] || 0;
  const leverageScore = scores['Strategic Leverage Potential'] || 0;
  const opportunity = Math.round((workflowScore * 0.5) + (leverageScore * 0.5));

  return { readiness, opportunity };
}

export function determineIndividualArchetype(axisScores: IndividualAxisScores): IndividualArchetype {
  const { readiness, opportunity } = axisScores;
  const THRESHOLD = 50; // Midpoint

  if (readiness >= THRESHOLD && opportunity >= THRESHOLD) return INDIVIDUAL_ARCHETYPES.AIPowerUser;
  if (readiness < THRESHOLD && opportunity >= THRESHOLD) return INDIVIDUAL_ARCHETYPES.StrategicDelegator;
  if (readiness >= THRESHOLD && opportunity < THRESHOLD) return INDIVIDUAL_ARCHETYPES.CuriousOptimizer;
  return INDIVIDUAL_ARCHETYPES.CautiousObserver;
}

export function calculateIndividualOverallScore(dimensionScores: IndividualDimensionScore[]): number {
  const weightedSum = dimensionScores.reduce(
    (acc, dim) => acc + dim.score * dim.weight,
    0
  );
  return Math.round(weightedSum);
}

export function estimateTimeSavings(
  overallScore: number,
  workflowComplexityScore: number
): { weekly: number; monthly: number; annual: number } {
  // Base time savings (hours/week) based on overall score
  // Scores 0-100 map to 10-40 hours saved
  const baseWeekly = Math.round(10 + (overallScore / 100) * 30);

  // Adjust based on workflow complexity - higher complexity = more time to save
  const complexityMultiplier = 0.8 + (workflowComplexityScore / 100) * 0.4;
  const weekly = Math.round(baseWeekly * complexityMultiplier);

  return {
    weekly,
    monthly: weekly * 4,
    annual: weekly * 52
  };
}

export function generateIndividualRecommendations(
  archetype: IndividualArchetype,
  overallScore: number
): IndividualRecommendation[] {
  const recommendations: IndividualRecommendation[] = [];

  switch (archetype.name) {
    case 'AI Power User':
      recommendations.push(
        {
          tier: 'Recommended',
          title: 'Executive AI Transformation (Full)',
          description: 'Complete overhaul of your personal productivity system with AI integration across all workflows.',
          benefits: [
            'Email triage and smart replies (8-10 hrs/week saved)',
            'Calendar optimization and meeting prep (3-5 hrs/week)',
            'Document creation with your voice (4-6 hrs/week)',
            'Team communication automation (2-4 hrs/week)',
            'Business intelligence dashboards (3-5 hrs/week)',
          ],
          price: '$15,000-$20,000',
        },
        {
          tier: 'Add-On',
          title: '24/7 AI Executive Assistant',
          description: 'Human-monitored AI assistant connected to all your communication channels.',
          benefits: [
            'Connected to email, Slack, WhatsApp, SMS',
            'Web search, travel management, expense tracking',
            'Daily human oversight and monthly optimization',
            '99.9% uptime, 4-hour urgent response',
          ],
          price: '$500/month',
        }
      );
      break;

    case 'Strategic Delegator':
      recommendations.push(
        {
          tier: 'Recommended',
          title: 'Executive AI Transformation (Core)',
          description: 'Focus on the highest-impact workflows with guided training to build your AI fluency.',
          benefits: [
            'Email management automation (8-10 hrs/week)',
            'Calendar and scheduling optimization (3-5 hrs/week)',
            'Document drafting assistance (4-6 hrs/week)',
            'Personalized AI training sessions',
            '30-day hypercare support',
          ],
          price: '$10,000-$15,000',
        },
        {
          tier: 'Optional',
          title: '24/7 AI Executive Assistant',
          description: 'Start with the assistant to build comfort before deeper integration.',
          benefits: [
            'Low-risk way to experience AI assistance',
            'Human oversight ensures quality',
            'Gradual workflow expansion',
          ],
          price: '$500/month',
        }
      );
      break;

    case 'Curious Optimizer':
      recommendations.push(
        {
          tier: 'Recommended',
          title: '24/7 AI Executive Assistant',
          description: 'Perfect for AI-savvy executives who want assistance without the setup overhead.',
          benefits: [
            'Immediate productivity boost',
            'No technical setup required',
            'Human quality assurance',
            'Flexible month-to-month',
          ],
          price: '$500/month',
        },
        {
          tier: 'Alternative',
          title: 'Executive AI Transformation (Core)',
          description: 'If you identify higher-leverage workflows, the Core package delivers targeted results.',
          benefits: [
            'Focused on 3 highest-impact workflows',
            'Custom AI toolkit design',
            'Training and documentation',
          ],
          price: '$10,000',
        }
      );
      break;

    case 'Cautious Observer':
      recommendations.push(
        {
          tier: 'Recommended',
          title: 'AI Executive Assistant Pilot Week',
          description: 'Try the 24/7 AI Assistant for one week with full onboarding support.',
          benefits: [
            '90-minute onboarding session',
            'API/OAuth setup assistance',
            'Full access to all features',
            'Transition to monthly if satisfied',
          ],
          price: 'Included with first quarter',
        },
        {
          tier: 'Free Resources',
          title: 'AI Productivity Guide',
          description: 'Build your understanding before investing with our free resources.',
          benefits: [
            'Executive AI productivity playbook',
            'Tool comparison guide',
            'Implementation checklist',
            'Monthly insights newsletter',
          ],
          price: 'Free',
        }
      );
      break;
  }

  return recommendations;
}

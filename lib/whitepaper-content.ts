// Whitepaper content structured for PDF generation
// Source: /docs/white-paper-ai-transformation-optimism-reality.md

export interface WhitepaperMeta {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  version: string;
}

export interface StatisticItem {
  value: string;
  label: string;
  source?: string;
}

export interface TableRow {
  [key: string]: string;
}

export interface ChartData {
  id: string;
  type: 'funnel' | 'bar' | 'table' | 'comparison';
  title: string;
  data: Record<string, unknown>[];
  designNotes: string;
}

export interface Section {
  id: string;
  number: string;
  title: string;
  pages: string;
  content: string[];
  tables?: { title: string; headers: string[]; rows: TableRow[] }[];
  charts?: ChartData[];
  callouts?: { type: 'stat' | 'quote' | 'warning'; content: string; source?: string }[];
}

// === METADATA ===
export const whitepaperMeta: WhitepaperMeta = {
  title: 'AI Transformation',
  subtitle: 'Optimism vs. Reality',
  author: 'John Ellison',
  date: 'January 2026',
  version: '1.0',
};

// === KEY STATISTICS ===
export const keyStatistics: StatisticItem[] = [
  { value: '$4.4T', label: 'Potential productivity gains from AI', source: 'McKinsey 2025' },
  { value: '5%', label: 'Of AI pilots advance to production', source: 'MIT 2025' },
  { value: '70-85%', label: 'Of AI initiatives fail to meet expected outcomes', source: 'NTT Data, Gartner' },
  { value: '6%', label: 'Of enterprises qualify as "AI high performers"', source: 'McKinsey 2025' },
  { value: '5%+', label: 'EBIT impact achieved by high performers', source: 'McKinsey 2025' },
  { value: '74%', label: 'Of AI agents achieve ROI within first year', source: 'McKinsey 2025' },
  { value: '52%', label: 'Cite data quality as primary blocker', source: 'PEX Network' },
  { value: '40%', label: 'Timeline reduction with clean, accessible data', source: 'Agenix Hub' },
];

// === EXECUTIVE SUMMARY ===
export const executiveSummary = {
  title: 'Executive Summary',
  opportunity: {
    headline: 'The Opportunity',
    stats: '$4.4 trillion in productivity gains',
    details: 'Early deployments delivering 14-74% productivity increases and ROI reaching 200%+ in optimized use cases.',
  },
  reality: {
    headline: 'The Reality',
    stats: 'Only 5% of enterprise AI pilots advance to production',
    details: 'Between 70-95% of AI initiatives fail to meet expected outcomes, with most stalling in pilot purgatory after 12-18 months of investment.',
  },
  divide: {
    headline: 'The Divide',
    stats: '6% of enterprises are "AI high performers"',
    details: 'High performers are redesigning workflows, transforming their business model, and capturing 5%+ EBIT impact from AI. The remaining 94% remain mired in experimentation.',
  },
  questions: [
    'What is actually working? Which use cases deliver measurable ROI, and what timelines should leaders expect?',
    'Why do initiatives fail? What barriers consistently derail AI programs, and what do successful organizations do differently?',
    'What operating models drive scale? How should enterprises structure governance, teams, and workflows to move from pilots to production?',
    "What's the roadmap? A practical, phase-based approach to assess readiness, prioritize high-impact use cases, and execute with discipline.",
  ],
};

// === MATURITY MODEL TABLE ===
export const maturityModelTable = {
  title: 'AI Maturity Model Matrix',
  headers: ['Dimension', 'Nascent (1)', 'Emerging (2)', 'Developing (3)', 'Advanced (4)', 'Optimized (5)'],
  rows: [
    {
      dimension: 'Strategy',
      nascent: 'Ad hoc exploration',
      emerging: 'Pilot programs identified',
      developing: 'Business case defined',
      advanced: 'Aligned roadmap',
      optimized: 'Transformation north star',
    },
    {
      dimension: 'Data',
      nascent: 'Fragmented silos',
      emerging: 'Partial integration',
      developing: 'Quality standards emerging',
      advanced: 'Governed architecture',
      optimized: 'Real-time, lineaged, auditable',
    },
    {
      dimension: 'Talent',
      nascent: 'Few AI specialists',
      emerging: 'Team forming',
      developing: 'Training programs launched',
      advanced: 'Centers of Excellence',
      optimized: 'Embedded AI literacy',
    },
    {
      dimension: 'Governance',
      nascent: 'None',
      emerging: 'Reactive policies',
      developing: 'Frameworks drafted',
      advanced: 'Embedded controls',
      optimized: 'Autonomous with oversight',
    },
    {
      dimension: 'Technology',
      nascent: 'Manual tooling',
      emerging: 'Select platforms',
      developing: 'Integrated stack',
      advanced: 'Scalable infrastructure',
      optimized: 'Agentic autonomous systems',
    },
    {
      dimension: 'Outcomes',
      nascent: 'Learning only',
      emerging: 'Pilots showing promise',
      developing: 'Early use cases in production',
      advanced: '1-3% EBIT impact',
      optimized: '5%+ EBIT impact',
    },
  ],
};

// === CASE STUDIES TABLE ===
export const caseStudiesTable = {
  title: 'Documented Case Studies (Third-Party Validated)',
  headers: ['Company', 'Industry', 'Use Case', 'Outcome', 'Timeline'],
  rows: [
    {
      company: 'Flash.co',
      industry: 'FinTech',
      useCase: 'AI data automation & model development',
      outcome: '210% ROI, 3.5-month payback; 45% acceleration in model cycles',
      timeline: '3.5 months',
    },
    {
      company: 'IBM Enterprise',
      industry: 'Multiple',
      useCase: 'AI agent deployment + process automation',
      outcome: '176% ROI over 3 years; 40% improvement in agent accuracy',
      timeline: '36 months',
    },
    {
      company: 'KLM (via BCG)',
      industry: 'Airlines',
      useCase: 'Operations AI & performance optimization',
      outcome: '20-30% reduction in nonperformance costs',
      timeline: '6-12 months',
    },
    {
      company: 'Supplier Negotiation',
      industry: 'Manufacturing',
      useCase: 'AI-powered procurement',
      outcome: '40% cost savings (early-pay discounts 15%, benchmarking 20%, risk 5%)',
      timeline: '3-6 months',
    },
    {
      company: 'Supply Chain (ELEKS)',
      industry: 'Retail',
      useCase: 'AI demand forecasting & optimization',
      outcome: '5.76% avg monthly cost savings, 50% delivery time reduction',
      timeline: '2-4 months',
    },
  ],
};

// === INDUSTRY ROI DATA ===
export const industryROIData = {
  title: 'Industry-Specific ROI Ranges (McKinsey H2 2024)',
  data: [
    { function: 'Strategy/Finance', revenueIncrease: 70, above10Percent: 11 },
    { function: 'Supply Chain', revenueIncrease: 67, above10Percent: 19 },
    { function: 'Marketing/Sales', revenueIncrease: 66, above10Percent: 8 },
    { function: 'Service Operations', revenueIncrease: 63, above10Percent: 18 },
    { function: 'Software Engineering', revenueIncrease: 57, above10Percent: 12 },
  ],
};

// === PILOT TO PRODUCTION FUNNEL ===
export const funnelData = {
  title: 'Pilot-to-Production Funnel',
  stages: [
    { stage: 'Explore AI tools', percentage: 80, description: 'Organizations exploring AI' },
    { stage: 'Evaluate solutions', percentage: 60, description: 'Evaluating enterprise solutions' },
    { stage: 'Launch pilots', percentage: 20, description: 'Active pilot programs' },
    { stage: 'Production with impact', percentage: 5, description: 'Measurable business impact' },
  ],
  dropOffRates: [
    { from: 'Explore', to: 'Evaluate', loss: 25 },
    { from: 'Evaluate', to: 'Pilots', loss: 67 },
    { from: 'Pilots', to: 'Production', loss: 75 },
  ],
};

// === TOP BARRIERS TABLE ===
export const barriersTable = {
  title: 'Top 10 AI Adoption Barriers',
  headers: ['Rank', 'Barrier', '% Affected', 'Root Cause', 'Impact'],
  rows: [
    {
      rank: '1',
      barrier: 'Data quality & availability',
      affected: '52%',
      rootCause: 'Siloed data; poor governance; inadequate cleaning',
      impact: 'Unreliable predictions; loss of stakeholder trust',
    },
    {
      rank: '2',
      barrier: 'Lack of internal expertise',
      affected: '49%',
      rootCause: 'Insufficient talent; poor onboarding; rapid skill obsolescence',
      impact: 'Delayed projects; dependency on external consultants',
    },
    {
      rank: '3',
      barrier: 'Regulatory/legal concerns',
      affected: '31%',
      rootCause: 'Unclear liability; compliance burden; model explainability gaps',
      impact: 'Projects frozen; fines up to 35M or 7% revenue',
    },
    {
      rank: '4',
      barrier: 'Resistance to change',
      affected: '30%',
      rootCause: 'Job security fears; trust in AI; change fatigue',
      impact: 'Poor adoption; underutilization of deployed AI',
    },
    {
      rank: '5',
      barrier: 'Workflow integration failure',
      affected: '~50%',
      rootCause: 'AI not embedded in daily tools; requires behavior change',
      impact: '"Demo purgatory"—never operationalized',
    },
    {
      rank: '6',
      barrier: 'Poor AI governance',
      affected: '92%',
      rootCause: 'Governance treated as afterthought, not design requirement',
      impact: 'Bias, audit failures, unexpected production failures',
    },
    {
      rank: '7',
      barrier: 'Model quality issues',
      affected: 'Widespread',
      rootCause: 'Hallucinations; evaluation gaps; no production monitoring',
      impact: 'User distrust; business decision errors',
    },
    {
      rank: '8',
      barrier: 'ROI measurement failure',
      affected: '~60%',
      rootCause: 'No baseline defined pre-implementation',
      impact: 'Stakeholder skepticism; difficulty justifying investment',
    },
    {
      rank: '9',
      barrier: 'Build vs. buy missteps',
      affected: '2x failure rate',
      rootCause: 'Underestimation of complexity; lack of MLOps rigor',
      impact: 'Timeline slippage; cost overruns; abandoned projects',
    },
    {
      rank: '10',
      barrier: 'Organizational silos',
      affected: '~40%',
      rootCause: 'No central governance; redundant tooling; poor data sharing',
      impact: 'Duplicated work; vendor sprawl; inability to scale',
    },
  ],
};

// === TIMELINE COMPARISON TABLE ===
export const timelineComparisonTable = {
  title: 'AI Deployment Timeline Comparison',
  headers: ['Milestone', 'Traditional Enterprise', 'Mid-Market (Fast-Track)', 'With Agentic Platform'],
  rows: [
    {
      milestone: 'Discovery & Assessment',
      traditional: '8-12 weeks',
      midMarket: '4-8 weeks',
      agentic: '2-4 weeks',
    },
    {
      milestone: 'Pilot Launch (first use case)',
      traditional: '12-16 weeks',
      midMarket: '8-12 weeks',
      agentic: '4-8 weeks',
    },
    {
      milestone: 'First Productivity Gains Visible',
      traditional: '3-4 months',
      midMarket: '2-3 months',
      agentic: '2-3 months',
    },
    {
      milestone: 'Pilot to Production (transition)',
      traditional: '3-6 months',
      midMarket: '1-2 months',
      agentic: '2-4 weeks',
    },
    {
      milestone: 'Production Deployment (full)',
      traditional: '18-24 months',
      midMarket: '9-18 months',
      agentic: '2-4 months',
    },
    {
      milestone: 'Scale to 3+ use cases',
      traditional: '24-36 months',
      midMarket: '18-24 months',
      agentic: '4-8 months',
    },
    {
      milestone: 'Enterprise-wide transformation',
      traditional: '3-5 years',
      midMarket: '18-36 months',
      agentic: '6-12 months',
    },
  ],
};

// === MYTH VS TRUTH TABLE ===
export const mythVsTruthTable = {
  title: 'AI Transformation: Myth vs. Truth',
  rows: [
    {
      myth: '"Better AI models solve the failure problem"',
      truth: "The problem isn't the model; it's the learning gap. Generic tools work for individuals, not enterprises. Success requires embedding AI into workflows and creating feedback loops.",
    },
    {
      myth: '"We need to build custom AI to win"',
      truth: 'Off-the-shelf models + managed platforms reduce risk by 40% and compress timelines by 50%. Custom development should be reserved for competitive moats.',
    },
    {
      myth: '"AI adoption is a tech problem"',
      truth: '30% tech, 70% change management + governance + workflow design. Treat it as organizational transformation, not software deployment.',
    },
    {
      myth: '"We should wait for better models"',
      truth: "Models are good enough now. What's missing: data, workflow integration, governance, change management. Don't wait. Start now.",
    },
    {
      myth: '"Data quality can be fixed later"',
      truth: 'Data issues are the #1 blocker (52% cite it). Fix data quality before pilots, not after. Budget 4-8 weeks upfront.',
    },
    {
      myth: '"ROI will be obvious once deployed"',
      truth: 'Define baselines and success metrics before launch. Measure leading indicators monthly and lagging indicators quarterly.',
    },
  ],
};

// === PRODUCTIVITY IMPACTS ===
export const productivityImpacts = {
  title: 'Quantified Productivity Impacts',
  categories: [
    {
      category: 'General Knowledge Work',
      impacts: [
        { metric: '40%', description: 'Productivity boost (self-reported by AI users)' },
        { metric: '25.1%', description: 'Faster task completion with 40%+ quality improvement' },
        { metric: '5.4%', description: 'Of work hours saved (~1.1% workforce productivity increase)' },
      ],
    },
    {
      category: 'Customer Service',
      impacts: [
        { metric: '14-15%', description: 'Productivity increase in customer support agents' },
        { metric: '34%', description: 'Productivity gains for less experienced agents' },
      ],
    },
    {
      category: 'Sales & Revenue',
      impacts: [
        { metric: '47%', description: 'Higher productivity for AI-assisted sales professionals' },
        { metric: '83%', description: 'Of AI-enabled sales teams saw revenue growth' },
        { metric: '78%', description: 'Shorter deal cycles' },
      ],
    },
    {
      category: 'Cost Reduction',
      impacts: [
        { metric: '30%', description: 'Customer service operational cost reduction' },
        { metric: '37%', description: 'Marketing cost reduction' },
        { metric: '40%', description: 'Finance/Compliance cost reduction' },
        { metric: '32%', description: 'Manufacturing cost savings' },
      ],
    },
  ],
};

// === USE CASE TIERS ===
export const useCaseTiers = {
  title: 'Use Case Prioritization by Timeline',
  tiers: [
    {
      tier: 'High-Velocity Wins',
      timeline: 'Weeks 1-3',
      examples: [
        'FAQ automation & customer self-service',
        'Email/document classification & routing',
        'Routine report generation',
        'Meeting summaries & action item extraction',
      ],
    },
    {
      tier: 'Quick Wins',
      timeline: 'Months 1-3',
      examples: [
        'Customer service agent assist (proven 14% productivity)',
        'Demand forecasting (supply chain optimization)',
        'Compliance document review',
        'First-level customer support automation',
      ],
    },
    {
      tier: 'Medium-Term Value',
      timeline: 'Months 3-6',
      examples: [
        'Complex document processing (contracts, claims)',
        'Predictive maintenance (manufacturing)',
        'Personalization engines (retail, media)',
        'Supply chain network optimization',
      ],
    },
    {
      tier: 'Strategic/Transformational',
      timeline: 'Months 6-18+',
      examples: [
        'Core process automation (end-to-end workflows)',
        'New product lines powered by AI',
        'Autonomous agent fleets managing operations',
        'Industry-specific foundation models',
      ],
    },
  ],
};

// === 7 PILLAR READINESS FRAMEWORK ===
export const readinessFramework = {
  title: 'AI Readiness Assessment Framework',
  pillars: [
    {
      number: 1,
      name: 'Strategic Alignment & Vision',
      description: 'Clear C-suite mandate for AI as strategic lever (not cost-cutting tool)',
      keyMetric: 'High performers 3x more likely to have strong executive ownership',
    },
    {
      number: 2,
      name: 'Data Foundations',
      description: 'Clean, accessible, governable data in central repository',
      keyMetric: 'Organizations with clean data reduce timelines by 40%',
    },
    {
      number: 3,
      name: 'Technology Infrastructure',
      description: 'Cloud-native or hybrid deployment capability with MLOps pipelines',
      keyMetric: 'API-based vs on-prem cost tradeoffs',
    },
    {
      number: 4,
      name: 'Talent & Skills',
      description: 'Data engineers, ML practitioners, domain experts, change champions',
      keyMetric: 'Strong talent strategies correlate with 3x higher value realization',
    },
    {
      number: 5,
      name: 'Governance & Operating Model',
      description: 'AI Center of Excellence with hub-and-spoke structure',
      keyMetric: 'Only 6% of orgs have strong governance embedded at start',
    },
    {
      number: 6,
      name: 'Ethics, Trust & Responsible AI',
      description: 'Bias detection, explainability standards, audit trails',
      keyMetric: 'Bias detection in place for only 35% despite 68% concern',
    },
    {
      number: 7,
      name: 'Use Case ID & Prioritization',
      description: 'Structured process for identifying high-impact opportunities',
      keyMetric: 'ICE scoring: Impact x Confidence / Effort',
    },
  ],
};

// === 8 CRITICAL SUCCESS FACTORS ===
export const criticalSuccessFactors = [
  {
    number: 1,
    title: 'Workflow Redesign (Not Automation)',
    description: 'Fundamental rethinking of how work gets done, not bolting AI onto rigid processes.',
    impact: 'Organizations redesigning workflows are nearly 3x more likely to capture value.',
  },
  {
    number: 2,
    title: 'Executive Ownership',
    description: 'C-suite actively championing AI, not delegating to IT.',
    impact: 'High performers 3x more likely to report strong leadership commitment.',
  },
  {
    number: 3,
    title: 'Ambitious Goals',
    description: 'Treating AI as transformation lever (not efficiency tool).',
    impact: 'High performers 3x more likely to pursue transformative change.',
  },
  {
    number: 4,
    title: 'Data Readiness',
    description: 'Clean, accessible, governed data is non-negotiable.',
    impact: 'Organizations with mature data infrastructure reduce timelines by 40%.',
  },
  {
    number: 5,
    title: 'Embedded Governance',
    description: 'Governance integrated into design, not retrofitted post-deployment.',
    impact: 'Organizations with embedded controls avoid regulatory penalties and model failures.',
  },
  {
    number: 6,
    title: 'Rapid Iteration',
    description: 'Agentic platforms accelerating production timelines from 18 months to weeks.',
    impact: 'Speed compounds advantage.',
  },
  {
    number: 7,
    title: 'Cross-Functional Collaboration',
    description: 'Strong CoE with clear ownership; teams aligned on business objectives.',
    impact: 'Hub-and-spoke model enables scaling across business units.',
  },
  {
    number: 8,
    title: 'Continuous Learning',
    description: 'Organizations that capture feedback, retrain models, and iterate.',
    impact: '2-3x better long-term outcomes than one-shot deployments.',
  },
];

// === PHASED IMPLEMENTATION ROADMAP ===
export const implementationRoadmap = {
  title: '5-Phase Implementation Roadmap',
  phases: [
    {
      phase: 1,
      name: 'Discover & Assess',
      timeline: 'Weeks 1-8',
      activities: [
        'Conduct AI readiness audit across seven pillars',
        'Interview 30-50 business leaders to understand pain points',
        'Map current state maturity and identify quick wins',
      ],
      deliverable: 'AI Readiness Report with gap analysis and prioritized initiatives',
    },
    {
      phase: 2,
      name: 'Prioritize Use Cases',
      timeline: 'Weeks 5-12',
      activities: [
        'Evaluate 20-30 candidate use cases on Impact, Feasibility, Risk',
        'Apply ICE scoring: Impact x Confidence / Effort',
        'Select 2-3 pilot use cases for quick wins',
      ],
      deliverable: 'Prioritized AI roadmap with 18-month horizon',
    },
    {
      phase: 3,
      name: 'Prototype & Proof',
      timeline: 'Weeks 8-20',
      activities: [
        'Build minimum viable prototype for Pilot #1',
        'Establish baseline metrics and success criteria',
        'Run 4-8 week pilot with real users and real data',
      ],
      deliverable: 'Pilot results, lessons learned, go/no-go decision',
    },
    {
      phase: 4,
      name: 'Productionize',
      timeline: 'Weeks 16-32',
      activities: [
        'Harden solution for production: MLOps, monitoring, governance',
        'Implement model risk management (version control, bias testing)',
        'Conduct security review and regulatory sign-off',
      ],
      deliverable: 'Production deployment with ongoing monitoring',
    },
    {
      phase: 5,
      name: 'Scale',
      timeline: 'Months 6-18',
      activities: [
        'Roll out to additional functions/geographies',
        'Build reusable components and playbooks',
        'Expand to Pilot #2, #3 (medium-complexity use cases)',
      ],
      deliverable: 'Enterprise-wide AI platform supporting 3-5 production use cases',
    },
  ],
};

// === HIGH PERFORMER PROFILE ===
export const highPerformerProfile = {
  title: 'High Performer Profile (6% of Enterprises)',
  characteristics: [
    '3x more likely to have strong C-suite ownership and commitment',
    'Redesign workflows fundamentally (not just add AI to existing processes)',
    'Set growth/innovation as primary AI objectives (not just cost reduction)',
    'Deploy in 2+ business functions simultaneously',
    '3x further advanced with AI agents',
    '3x more likely to define human-validation processes for model outputs',
    'Allocate 20%+ of digital budget to AI',
  ],
  outcomes: [
    '5%+ EBIT impact from AI (vs. <1% for median)',
    '74% achieve ROI within year 1',
    '39% see productivity double',
    'Expanding into new markets; acquiring competitors with AI advantage',
  ],
};

// === AI READINESS DIAGNOSTIC ===
export const readinessDiagnostic = {
  title: 'AI Readiness Diagnostic (Self-Assessment)',
  dimensions: [
    {
      name: 'Strategic Alignment',
      questions: [
        'Clear C-suite mandate for AI transformation?',
        'Explicit business outcomes defined?',
        'AI investment as % of digital budget?',
      ],
    },
    {
      name: 'Data Readiness',
      questions: [
        '% of critical business data consolidated in accessible repository?',
        'Data quality standards defined and enforced?',
        'Data lineage and metadata tracked?',
      ],
    },
    {
      name: 'Technology',
      questions: [
        'MLOps platform in place?',
        'Cloud or hybrid infrastructure capable of scale?',
        'Security/compliance tooling integrated?',
      ],
    },
    {
      name: 'Talent & Skills',
      questions: [
        'Data engineers and ML practitioners on staff?',
        'Change champions embedded in business units?',
        "Leadership's AI literacy?",
      ],
    },
    {
      name: 'Governance & Risk',
      questions: [
        'AI governance policy documented and enforced?',
        'Bias detection and mitigation processes?',
        'Regulatory compliance framework?',
      ],
    },
    {
      name: 'Use Case Pipeline',
      questions: [
        'High-impact use cases identified and prioritized?',
        'Pilot program in progress?',
        'Business ownership clear for each use case?',
      ],
    },
    {
      name: 'Organization & Change',
      questions: [
        'Change management plan documented?',
        'Employee AI trust / adoption readiness?',
        'Workforce reskilling program in place?',
      ],
    },
  ],
  scoringGuide: [
    { range: '0-30%', level: 'Foundation required', recommendation: '6-12 month build-out before pilots' },
    { range: '31-50%', level: 'Emerging', recommendation: 'Selective pilots possible (with risk mitigation)' },
    { range: '51-70%', level: 'Developing', recommendation: 'Production-ready for 1-2 use cases' },
    { range: '71-85%', level: 'Advanced', recommendation: 'Portfolio of use cases scaling' },
    { range: '86-100%', level: 'Optimized', recommendation: 'Continuous innovation and enterprise transformation' },
  ],
};

// === GOVERNANCE CHECKLIST ===
export const governanceChecklist = {
  title: 'Pre-Deployment Governance Checklist',
  categories: [
    {
      category: 'Data & Model Risk',
      items: [
        'Data sourced and validated for accuracy, recency, and freedom from bias',
        'Model trained on representative data (demographics, geographies, edge cases)',
        'Bias testing completed (disparate impact analysis for protected groups)',
        'Model explainability validated (can business explain why decision X was made)',
        'Model documentation complete (architecture, training data, performance benchmarks)',
        'Monitoring in place (accuracy drift, fairness drift, data drift detection)',
      ],
    },
    {
      category: 'Security & Privacy',
      items: [
        'Model protected against prompt injection, adversarial inputs, poisoning',
        'Data encrypted at rest and in transit',
        'Access controls restrict model/data access by role and function',
        'Audit logs capture who accessed what, when',
        'Data retention policy defined (especially for training data)',
      ],
    },
    {
      category: 'Regulatory & Compliance',
      items: [
        'Legal review completed (liability, IP ownership, data usage rights)',
        'EU AI Act compliance assessed (if applicable)',
        'GDPR compliance validated (right to explanation, data minimization)',
        'Sector-specific regulations addressed (HIPAA, SOX, AML, etc.)',
        'Insurance/indemnification in place for third-party models',
      ],
    },
    {
      category: 'Operational & Change Management',
      items: [
        'Business owner assigned with clear accountability',
        'SLAs defined (uptime, latency, accuracy thresholds)',
        'Escalation path clear (what happens if model fails)',
        'User training completed; adoption plan tracked',
        'Rollback plan documented (how to revert if issues arise)',
      ],
    },
  ],
};

// === RECOMMENDATIONS BY SCORE ===
export const recommendationsByScore = [
  {
    scoreRange: '<50%',
    priority: 'Build data foundations and talent capability (6-12 months)',
    quickWins: 'Autopilot internal processes (email, expense reports, routine approvals)',
    defer: 'Enterprise-scale AI until data and governance ready',
  },
  {
    scoreRange: '50-75%',
    priority: 'Scale 2-3 high-impact pilots to production (9-18 months)',
    quickWins: 'Customer service agent assist, demand forecasting, compliance automation',
    parallel: 'Embed AI governance; build CoE; upskill talent',
  },
  {
    scoreRange: '>75%',
    priority: 'Transition from experimentation to transformation (18-36 months)',
    agenda: 'Redesign workflows; build autonomous agent fleet; explore new business models',
    outcome: '5%+ EBIT impact; competitive moat in your industry',
  },
];

// === REFERENCES ===
export const references = [
  { source: 'McKinsey', title: 'The State of AI: Global Survey 2025', details: '1,993 respondents, 105 countries' },
  { source: 'Microsoft AI Economy Institute', title: 'Global AI Adoption in 2025', details: 'Population-level adoption data' },
  { source: 'MIT', title: 'The GenAI Divide: State of AI in Business 2025', details: '150 interviews, 350 employees, 300 deployments' },
  { source: 'Fortune/MIT', title: '95% of generative AI pilots failing', details: 'August 2025' },
  { source: 'Loris.ai', title: 'MIT Study: 95% of AI Projects Fail', details: 'Funnel analysis: 80-60-20-5%' },
  { source: 'Nucleus Research', title: 'ROI case study: Google AI at Flash.co', details: '210% ROI, 3.5-month payback' },
  { source: 'PEX Network', title: 'Data quality & availability top AI adoption barriers', details: '200+ respondents' },
  { source: 'Quinnox', title: 'Data Governance for AI in 2025', details: 'Bias, lineage, governance gaps' },
  { source: 'Naitive', title: 'AI Governance in Digital Transformation', details: '92% lack frameworks; 40% failure predictions' },
  { source: 'Regulativ', title: 'EU AI Act, NIST RMF, ISO 42001', details: 'Comprehensive framework guide' },
];

// === TABLE OF CONTENTS ===
export const tableOfContents = [
  { section: 'Executive Summary', pages: '3-4' },
  { section: '1. Framing AI Transformation', pages: '5-8' },
  { section: '2. The Promise: What AI Can Unlock', pages: '9-14' },
  { section: '3. The Reality: Why Most Initiatives Fail', pages: '15-21' },
  { section: '4. Operating Models & Governance', pages: '22-27' },
  { section: '5. Implementation Roadmap', pages: '28-31' },
  { section: '6. Case Studies: High Performers vs. Laggards', pages: '32-34' },
  { section: '7. Critical Success Factors', pages: '35-36' },
  { section: '8. AI Readiness Diagnostic', pages: '37-38' },
  { section: '9. Governance Checklist', pages: '39' },
  { section: '10. Conclusion & Call to Action', pages: '40' },
];

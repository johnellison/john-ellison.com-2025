'use client';

import { useState } from 'react';
import ResultsDashboard from '@/components/ResultsDashboard';
import { AssessmentResult } from '@/types/assessment';

const QUESTIONS = {
  leadership: [
    {
      id: 'l1',
      question: 'Does your organization have a named executive sponsor or Chief AI Officer?',
      options: [
        { label: 'Yes, with C-suite visibility', score: 100 },
        { label: 'Yes, but lower in organization', score: 70 },
        { label: 'Emerging role; not yet formalized', score: 40 },
        { label: 'No executive ownership', score: 0 },
      ],
    },
    {
      id: 'l2',
      question: 'Is your AI strategy formally documented and approved by the C-suite?',
      options: [
        { label: 'Yes, with 3-year budget commitment', score: 100 },
        { label: 'Yes, but budget approved annually', score: 70 },
        { label: 'In draft; not yet approved', score: 40 },
        { label: 'No formal strategy', score: 0 },
      ],
    },
    {
      id: 'l3',
      question: 'Beyond "cost reduction," how are AI success metrics defined?',
      options: [
        { label: 'User adoption, outcome improvement, ROI—all quantified', score: 100 },
        { label: 'Mix of qualitative and quantitative metrics', score: 70 },
        { label: 'Primary focus on cost reduction', score: 40 },
        { label: 'No success metrics defined', score: 0 },
      ],
    },
    {
      id: 'l4',
      question: 'What % of your C-suite/leadership team actively use AI tools in their own work?',
      options: [
        { label: '75%+', score: 100 },
        { label: '50-75%', score: 70 },
        { label: '25-50%', score: 40 },
        { label: '<25% or unknown', score: 0 },
      ],
    },
    {
      id: 'l5',
      question: 'How is AI integrated into your strategic planning process?',
      options: [
        { label: 'Core to annual strategy; discussed quarterly', score: 100 },
        { label: 'Discussed in strategic review; integrated into some initiatives', score: 70 },
        { label: 'Pilot projects; not yet strategic', score: 40 },
        { label: 'Not part of strategic planning', score: 0 },
      ],
    },
    {
      id: 'l6',
      question: 'What is your organization\'s AI budget for the next 12 months?',
      options: [
        { label: '3-5% of IT budget or dedicated line item', score: 100 },
        { label: '1-3% of IT budget', score: 70 },
        { label: '<1% or project-based', score: 40 },
        { label: 'Minimal/undecided', score: 0 },
      ],
    },
    {
      id: 'l7',
      question: 'How aligned is AI strategy with overall business goals?',
      options: [
        { label: 'Deeply aligned; AI enables specific competitive advantages', score: 100 },
        { label: 'Aligned; supports strategic objectives', score: 70 },
        { label: 'Loosely aligned; opportunistic', score: 40 },
        { label: 'Unclear connection', score: 0 },
      ],
    },
  ],
  data: [
    {
      id: 'd1',
      question: 'What percentage of your enterprise data is documented in a data catalog?',
      options: [
        { label: '80%+', score: 100 },
        { label: '50-80%', score: 70 },
        { label: '20-50%', score: 40 },
        { label: '<20% or none', score: 0 },
      ],
    },
    {
      id: 'd2',
      question: 'How would you rate your organization\'s overall data quality?',
      options: [
        { label: '80%+ data accurate/complete; automated quality monitoring', score: 100 },
        { label: '60-80% quality; some monitoring', score: 70 },
        { label: '40-60% quality; manual spot checks', score: 40 },
        { label: '<40% or unknown', score: 0 },
      ],
    },
    {
      id: 'd3',
      question: 'Is your data centralized (data warehouse/lake) or siloed?',
      options: [
        { label: 'Centralized in cloud data warehouse/lake', score: 100 },
        { label: 'Majority centralized; some silos remain', score: 70 },
        { label: 'Mix of centralized and siloed', score: 40 },
        { label: 'Primarily siloed across legacy systems', score: 0 },
      ],
    },
    {
      id: 'd4',
      question: 'Is data ownership clearly assigned (Chief Data Officer, data stewards)?',
      options: [
        { label: 'Yes, formal governance roles and responsibilities', score: 100 },
        { label: 'Partially; some ownership assigned', score: 70 },
        { label: 'Emerging; not yet formalized', score: 40 },
        { label: 'No clear ownership', score: 0 },
      ],
    },
    {
      id: 'd5',
      question: 'How long does it typically take to get access to needed data?',
      options: [
        { label: '<1 day; self-service; documented', score: 100 },
        { label: '1-3 days; some friction', score: 70 },
        { label: '1-2 weeks; significant bureaucracy', score: 40 },
        { label: '>2 weeks or very difficult', score: 0 },
      ],
    },
    {
      id: 'd6',
      question: 'Do you have automated data quality monitoring and alerting?',
      options: [
        { label: 'Yes, for all critical data', score: 100 },
        { label: 'Yes, for most critical data', score: 70 },
        { label: 'Manual spot checks only', score: 40 },
        { label: 'No monitoring', score: 0 },
      ],
    },
    {
      id: 'd7',
      question: 'How is your organization\'s data governance maturity for regulatory compliance?',
      options: [
        { label: 'Mature framework; documented and enforced', score: 100 },
        { label: 'Framework in place; inconsistently enforced', score: 70 },
        { label: 'Emerging framework; gaps remain', score: 40 },
        { label: 'Minimal/no governance', score: 0 },
      ],
    },
    {
      id: 'd8',
      question: 'What % of your team\'s time do analysts spend cleaning/preparing data vs. analysis?',
      options: [
        { label: '<20% on cleaning; 80%+ on analysis', score: 100 },
        { label: '20-40% on cleaning', score: 70 },
        { label: '40-60% on cleaning', score: 40 },
        { label: '>60% on cleaning', score: 0 },
      ],
    },
  ],
  technology: [
    {
      id: 't1',
      question: 'What is your organization\'s primary cloud platform maturity?',
      options: [
        { label: 'Primary workloads on cloud (AWS/Azure/GCP); mature', score: 100 },
        { label: 'Significant workloads on cloud; maturing', score: 70 },
        { label: 'Pilot cloud projects; mostly on-premise', score: 40 },
        { label: 'Primarily on-premise; limited cloud', score: 0 },
      ],
    },
    {
      id: 't2',
      question: 'Do you have established CI/CD pipelines with automated testing?',
      options: [
        { label: 'Yes, mature; most deployments automated', score: 100 },
        { label: 'Partially; some projects have CI/CD', score: 70 },
        { label: 'Emerging; manual deployments still common', score: 40 },
        { label: 'Primarily manual deployments', score: 0 },
      ],
    },
    {
      id: 't3',
      question: 'Which ML/AI platform have you adopted or are evaluating?',
      options: [
        { label: 'Established platform (Databricks, Vertex AI, SageMaker, etc.)', score: 100 },
        { label: 'Some platform tooling; not yet standardized', score: 70 },
        { label: 'Evaluating options; no standardization', score: 40 },
        { label: 'No dedicated AI/ML platform', score: 0 },
      ],
    },
    {
      id: 't4',
      question: 'How does your infrastructure handle data security and access controls?',
      options: [
        { label: 'Role-based access, encryption, audit trails; mature', score: 100 },
        { label: 'Access controls and encryption in place', score: 70 },
        { label: 'Basic security; gaps exist', score: 40 },
        { label: 'Minimal security controls', score: 0 },
      ],
    },
    {
      id: 't5',
      question: 'How many integrations exist between your AI/ML systems and operational systems?',
      options: [
        { label: '5+ production AI integrations; APIs well-designed', score: 100 },
        { label: '3-4 integrations; some friction', score: 70 },
        { label: '1-2 integrations or pilots only', score: 40 },
        { label: 'No production AI integrations yet', score: 0 },
      ],
    },
    {
      id: 't6',
      question: 'What is your infrastructure readiness for scaling AI (containerization, orchestration)?',
      options: [
        { label: 'Kubernetes/containerization mature; ready to scale', score: 100 },
        { label: 'Containers in use; some orchestration', score: 70 },
        { label: 'Exploring containerization', score: 40 },
        { label: 'Traditional VMs only; not container-ready', score: 0 },
      ],
    },
  ],
  talent: [
    {
      id: 'ta1',
      question: 'Does your organization have in-house data science/ML engineering capability?',
      options: [
        { label: 'Mature team (5+ FTE); mix of seniority', score: 100 },
        { label: 'Solid team (2-4 FTE); mostly mid-level', score: 70 },
        { label: '1 FTE or junior-heavy team', score: 40 },
        { label: 'No in-house capability; fully external', score: 0 },
      ],
    },
    {
      id: 'ta2',
      question: 'How many employees have completed AI/ML training in the past 12 months?',
      options: [
        { label: '20%+ of workforce', score: 100 },
        { label: '10-20%', score: 70 },
        { label: '5-10%', score: 40 },
        { label: '<5%', score: 0 },
      ],
    },
    {
      id: 'ta3',
      question: 'Do you have a Chief Data Officer, Chief AI Officer, or equivalent leadership?',
      options: [
        { label: 'Yes, dedicated role; executive sponsor', score: 100 },
        { label: 'Yes, but part-time or recent hire', score: 70 },
        { label: 'Emerging role; not yet formalized', score: 40 },
        { label: 'No such role', score: 0 },
      ],
    },
    {
      id: 'ta4',
      question: 'How well do business stakeholders understand AI capabilities and limitations?',
      options: [
        { label: 'Strong understanding; realistic expectations', score: 100 },
        { label: 'Good understanding; mostly realistic', score: 70 },
        { label: 'Basic understanding; some misconceptions', score: 40 },
        { label: 'Limited understanding; many misconceptions', score: 0 },
      ],
    },
    {
      id: 'ta5',
      question: 'What is your annual data scientist/ML engineer turnover rate?',
      options: [
        { label: '<10% (competitive retention)', score: 100 },
        { label: '10-20% (industry average)', score: 70 },
        { label: '20-30% (above industry)', score: 40 },
        { label: '>30% (high churn)', score: 0 },
      ],
    },
    {
      id: 'ta6',
      question: 'How does your AI talent acquisition pace compare to organizational needs?',
      options: [
        { label: 'Proactive hiring; meeting demand', score: 100 },
        { label: 'Hiring ongoing; meeting 70-80% of demand', score: 70 },
        { label: 'Challenges hiring; 50-70% of positions filled', score: 40 },
        { label: 'Significant hiring gaps; talent unavailable', score: 0 },
      ],
    },
    {
      id: 'ta7',
      question: 'Do you have structured career development pathways for data science/AI roles?',
      options: [
        { label: 'Yes, clear progression and reskilling programs', score: 100 },
        { label: 'Emerging pathways; inconsistent', score: 70 },
        { label: 'Ad-hoc development', score: 40 },
        { label: 'No structured pathways', score: 0 },
      ],
    },
  ],
  governance: [
    {
      id: 'g1',
      question: 'Does your organization have a documented AI governance policy or framework?',
      options: [
        { label: 'Yes, comprehensive; covers development, deployment, monitoring', score: 100 },
        { label: 'Yes, but basic; some gaps', score: 70 },
        { label: 'In development; not yet approved', score: 40 },
        { label: 'No formal governance', score: 0 },
      ],
    },
    {
      id: 'g2',
      question: 'Are bias testing and fairness assessments automated for high-risk models?',
      options: [
        { label: 'Yes, all high-risk models tested; automated', score: 100 },
        { label: 'Most high-risk models tested; some automation', score: 70 },
        { label: 'Manual testing only; inconsistent', score: 40 },
        { label: 'No bias testing', score: 0 },
      ],
    },
    {
      id: 'g3',
      question: 'Can you explain how your organization\'s AI models make specific decisions?',
      options: [
        { label: 'Yes, all models documented; explainability standards defined', score: 100 },
        { label: 'Most models explainable; some black-box models exist', score: 70 },
        { label: 'Limited explainability; documentation gaps', score: 40 },
        { label: 'Models not explainable; unclear how they work', score: 0 },
      ],
    },
    {
      id: 'g4',
      question: 'Do you have audit trails and documentation for all AI-generated decisions?',
      options: [
        { label: 'Yes, complete audit trails; logged and monitored', score: 100 },
        { label: 'Partially; high-risk decisions logged', score: 70 },
        { label: 'Inconsistent; some documentation gaps', score: 40 },
        { label: 'No audit trails', score: 0 },
      ],
    },
    {
      id: 'g5',
      question: 'How prepared is your organization for regulatory compliance in AI (GDPR, CCPA, EU AI Act)?',
      options: [
        { label: 'Mature compliance framework; audit-ready', score: 100 },
        { label: 'Compliance strategy in place; mostly ready', score: 70 },
        { label: 'Emerging compliance efforts; gaps remain', score: 40 },
        { label: 'Minimal compliance preparation', score: 0 },
      ],
    },
  ],
  culture: [
    {
      id: 'c1',
      question: 'How do employees perceive AI in your organization?',
      options: [
        { label: 'Positive; seen as augmentation and opportunity', score: 100 },
        { label: 'Mostly positive; some concerns', score: 70 },
        { label: 'Mixed sentiment; significant skepticism', score: 40 },
        { label: 'Negative; fear and resistance', score: 0 },
      ],
    },
    {
      id: 'c2',
      question: 'Do employees believe their jobs are at risk due to AI?',
      options: [
        { label: 'No; leadership messaging clear about reskilling', score: 100 },
        { label: 'Minority concerns; mostly addressed', score: 70 },
        { label: 'Significant concerns; not fully addressed', score: 40 },
        { label: 'Yes; widespread job displacement fears', score: 0 },
      ],
    },
    {
      id: 'c3',
      question: 'Do leaders visibly model AI adoption in their own work?',
      options: [
        { label: 'Yes; 75%+ of leaders actively use AI', score: 100 },
        { label: 'Many leaders use AI; visible but not universal', score: 70 },
        { label: 'Some leaders use AI; not widely visible', score: 40 },
        { label: 'Limited visible leader adoption', score: 0 },
      ],
    },
    {
      id: 'c4',
      question: 'How would you characterize your organizational culture around innovation?',
      options: [
        { label: 'Strong; failure is acceptable learning', score: 100 },
        { label: 'Good; experimentation encouraged', score: 70 },
        { label: 'Mixed; some innovation; risk-averse in places', score: 40 },
        { label: 'Conservative; risk-averse; limited experimentation', score: 0 },
      ],
    },
    {
      id: 'c5',
      question: 'Is there psychological safety for employees to admit knowledge gaps about AI?',
      options: [
        { label: 'Yes; strong psychological safety', score: 100 },
        { label: 'Mostly; some safe spaces', score: 70 },
        { label: 'Limited; some fear of judgment', score: 40 },
        { label: 'Low; fear of judgment common', score: 0 },
      ],
    },
  ],
};

const DIMENSIONS = [
  { id: 'leadership', title: 'Leadership & Strategy', questions: QUESTIONS.leadership, weight: 0.2 },
  { id: 'data', title: 'Data Readiness', questions: QUESTIONS.data, weight: 0.25 },
  { id: 'technology', title: 'Technology Infrastructure', questions: QUESTIONS.technology, weight: 0.15 },
  { id: 'talent', title: 'Talent & Capability', questions: QUESTIONS.talent, weight: 0.15 },
  { id: 'governance', title: 'Governance & Responsible AI', questions: QUESTIONS.governance, weight: 0.1 },
  { id: 'culture', title: 'Culture & Change Readiness', questions: QUESTIONS.culture, weight: 0.15 },
];

const STEPS = [
  { id: 'company', title: 'Company Information' },
  { id: 'leadership', title: 'Leadership & Strategy' },
  { id: 'data', title: 'Data Readiness' },
  { id: 'technology', title: 'Technology Infrastructure' },
  { id: 'talent', title: 'Talent & Capability' },
  { id: 'governance', title: 'Governance & Responsible AI' },
  { id: 'culture', title: 'Culture & Change Readiness' },
];

export default function AITransformationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [companyData, setCompanyData] = useState({
    name: '',
    website: '',
    linkedin: '',
    email: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [companyInsights, setCompanyInsights] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [report, setReport] = useState<AssessmentResult | null>(null);
  const basePath = (() => {
    if (process.env.NEXT_PUBLIC_BASE_PATH) {
      return process.env.NEXT_PUBLIC_BASE_PATH;
    }

    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/ai-readiness')) {
      return '/ai-readiness';
    }

    return '';
  })();

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      setIsAnalyzing(true);
      try {
        const response = await fetch(`${basePath}/api/analyze-company`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ website: companyData.website, linkedin: companyData.linkedin }),
        });

        const result = await response.json();
        if (result.success && result.insights) {
          setCompanyInsights(result.insights);
          setCurrentStep(1);
        }
      } catch (error) {
        console.error('Analysis error:', error);
        setCurrentStep(1);
      } finally {
        setIsAnalyzing(false);
      }
    } else if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${basePath}/api/assessments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyData, answers, companyInsights }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result?.error || 'Failed to submit assessment.');
        return;
      }

      if (!result.report) {
        alert('Assessment submitted, but no report was returned.');
        return;
      }

      // Set report to trigger dashboard view
      setReport(result.report);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Assessment submission error:', error);
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (report) {
    return <ResultsDashboard result={report} />;
  }

  const isStepComplete = (stepId: string) => {
    if (stepId === 'company') {
      return companyData.name && companyData.website && companyData.email;
    }
    const dimension = DIMENSIONS.find((d) => d.id === stepId);
    if (!dimension) return false;
    const dimensionAnswers = dimension.questions.map((q) => answers[q.id]);
    return dimensionAnswers.every((a) => a !== undefined);
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <div className="form-step active">
          <div className="form-step-header">
            <span className="form-step-number">Step 1 of {STEPS.length}</span>
            <h2 className="form-step-title">{STEPS[0].title}</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Company Name *</label>
            <input
              type="text"
              className="form-input"
              value={companyData.name}
              onChange={(e) => setCompanyData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Your company name"
              disabled={isAnalyzing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Website URL *</label>
            <input
              type="url"
              className="form-input"
              value={companyData.website}
              onChange={(e) => setCompanyData((prev) => ({ ...prev, website: e.target.value }))}
              placeholder="https://yourcompany.com"
              disabled={isAnalyzing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">LinkedIn Company Page</label>
            <input
              type="url"
              className="form-input"
              value={companyData.linkedin}
              onChange={(e) => setCompanyData((prev) => ({ ...prev, linkedin: e.target.value }))}
              placeholder="https://linkedin.com/company/yourcompany"
              disabled={isAnalyzing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className="form-input"
              value={companyData.email}
              onChange={(e) => setCompanyData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="you@yourcompany.com"
              disabled={isAnalyzing}
            />
          </div>

          {companyInsights && (
            <div className="company-insights">
              <h3>AI Analysis Insights</h3>
              {companyInsights.company_summary && (
                <p className="insight-summary">
                  <strong>Company Summary:</strong> {companyInsights.company_summary}
                </p>
              )}
              {companyInsights.ai_maturity && (
                <div className="insight-box">
                  <h4>Estimated AI Maturity: {companyInsights.ai_maturity.score}/100</h4>
                  <p>Confidence: {companyInsights.ai_maturity.confidence}</p>
                  {companyInsights.ai_maturity.signals && (
                    <ul>
                      {companyInsights.ai_maturity.signals.map((signal: string, idx: number) => (
                        <li key={idx}>• {signal}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {companyInsights.tech_insights && (
                <div className="insight-box">
                  <h4>Technology Insights</h4>
                  <ul>
                    <li>AI Roadmap: {companyInsights.tech_insights.has_roadmap ? 'Yes' : 'No'}</li>
                    <li>AI Mentions: {companyInsights.tech_insights.mentions_ai ? 'Yes' : 'No'}</li>
                    {companyInsights.tech_insights.ai_use_cases && companyInsights.tech_insights.ai_use_cases.length > 0 && (
                      <li>Potential Use Cases: {companyInsights.tech_insights.ai_use_cases.join(', ')}</li>
                    )}
                  </ul>
                </div>
              )}
              {companyInsights.readiness_clues && (
                <div className="insight-box">
                  <h4>Readiness Clues</h4>
                  <p>Likely strong in: {companyInsights.readiness_clues.likely_dimensions.join(', ')}</p>
                  <p>Strengths: {companyInsights.readiness_clues.strengths.join(', ')}</p>
                  <p>Identified Gaps: {companyInsights.readiness_clues.gaps.join(', ')}</p>
                </div>
              )}
            </div>
          )}

          <p className="form-hint">
            We'll analyze your website and LinkedIn to understand your company's AI maturity and provide personalized recommendations.
          </p>
        </div>
      );
    }

    const currentDimension = DIMENSIONS[currentStep - 1];
    if (currentDimension) {
      return (
        <div className="form-step active">
          <div className="form-step-header">
            <span className="form-step-number">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <h2 className="form-step-title">{currentDimension.title}</h2>
            <p className="form-step-description">
              Rate your organization on each question. Select the option that best describes your current state.
            </p>
          </div>

          {currentDimension.questions.map((question, idx) => (
            <div key={question.id} className="form-group">
              <label className="form-label">
                {idx + 1}. {question.question}
              </label>
              <div className="form-radio-group">
                {question.options.map((option) => (
                  <label key={option.label} className="form-radio-label">
                    <input
                      type="radio"
                      name={question.id}
                      checked={answers[question.id] === option.score}
                      onChange={() => handleAnswer(question.id, option.score)}
                    />
                    <span className="form-radio-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="assessment-form-container">
      {/* Stats Header */}
      <div className="assessment-stats flex justify-center gap-6 md:gap-10 mb-8 pb-6 border-b border-white/10">
        <div className="stat-item text-center">
          <div className="stat-value text-xl font-bold text-white">40</div>
          <div className="stat-label text-xs uppercase tracking-wider text-gray-500">Questions</div>
        </div>
        <div className="stat-item text-center">
          <div className="stat-value text-xl font-bold text-white">6</div>
          <div className="stat-label text-xs uppercase tracking-wider text-gray-500">Dimensions</div>
        </div>
        <div className="stat-item text-center">
          <div className="stat-value text-xl font-bold text-white">10</div>
          <div className="stat-label text-xs uppercase tracking-wider text-gray-500">Minutes</div>
        </div>
      </div>

      {/* Form Content */}
      <div className="assessment-form bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6">
        {renderStep()}

        <div className="form-nav mt-6 flex justify-between">
          <button
            className="form-btn form-btn-prev px-5 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          {isAnalyzing ? (
            <button className="form-btn form-btn-next px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm" disabled>
              <span className="spinner"></span>
              Analyzing...
            </button>
          ) : currentStep < STEPS.length - 1 ? (
            <button
              className="form-btn form-btn-next px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              onClick={handleNext}
              disabled={!isStepComplete(STEPS[currentStep].id)}
            >
              Next
            </button>
          ) : (
            <button
              className="form-btn form-btn-submit btn-primary px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              onClick={handleSubmit}
              disabled={!isStepComplete(STEPS[currentStep].id) || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Get Your Report'}
            </button>
          )}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="progress-bar mt-6 flex justify-center gap-2">
        {STEPS.map((step, idx) => (
          <div
            key={step.id}
            className={`progress-dot h-2 w-2 rounded-full transition-all duration-300 ${
              idx === currentStep ? 'bg-purple-500 w-6' : idx < currentStep ? 'bg-purple-500/50' : 'bg-white/10'
            }`}
            title={step.title}
          />
        ))}
      </div>

      <style jsx>{`
        .company-insights {
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(124, 58, 237, 0.1);
          border-radius: 0.75rem;
          border-left: 3px solid rgb(168, 85, 247);
        }

        .company-insights h3 {
          font-size: 1rem;
          font-weight: 500;
          color: white;
          margin: 0 0 0.75rem 0;
        }

        .insight-summary {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .insight-box {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
          padding: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .insight-box h4 {
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          margin: 0 0 0.5rem 0;
        }

        .insight-box p,
        .insight-box ul {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          line-height: 1.5;
        }

        .insight-box li {
          padding-left: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .form-step-header {
          margin-bottom: 1.25rem;
        }

        .form-step-number {
          font-size: 0.75rem;
          color: rgba(168, 85, 247, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-step-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          margin: 0.25rem 0 0;
        }

        .form-step-description {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 0.5rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: white;
          font-size: 0.875rem;
          transition: border-color 0.2s, background-color 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: rgba(168, 85, 247, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .form-radio-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-radio-label {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          padding: 0.625rem 0.875rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s, border-color 0.2s;
        }

        .form-radio-label:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .form-radio-label:has(input:checked) {
          background: rgba(168, 85, 247, 0.1);
          border-color: rgba(168, 85, 247, 0.3);
        }

        .form-radio-label input {
          margin-top: 0.125rem;
          accent-color: rgb(168, 85, 247);
        }

        .form-radio-text {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.4;
        }

        .form-hint {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}

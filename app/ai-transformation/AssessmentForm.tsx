'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AssessmentResult } from '@/types/assessment';
import FlowAssessment from './components/FlowAssessment';
import AssessmentSidebar from './components/AssessmentSidebar';
import { useAssessmentScores } from './hooks/useAssessmentScores';
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react';

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

interface AssessmentFormProps {
  onAssessmentStart?: () => void;
}

export default function AITransformationPage({ onAssessmentStart }: AssessmentFormProps = {}) {
  const router = useRouter();
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
  const [basePath, setBasePath] = useState(process.env.NEXT_PUBLIC_BASE_PATH || '');
  const [currentDimensionId, setCurrentDimensionId] = useState<string>('leadership');

  // Calculate live scores for the sidebar visualization
  const {
    dimensionScores,
    axisScores,
    predictedArchetype,
    totalAnswered,
    totalQuestions,
    dimensionProgress,
  } = useAssessmentScores(DIMENSIONS, answers);

  // Handle dimension changes from FlowAssessment
  const handleDimensionChange = useCallback((dimensionId: string) => {
    setCurrentDimensionId(dimensionId);
  }, []);

  useEffect(() => {
    // Only check pathname on client after hydration
    if (!process.env.NEXT_PUBLIC_BASE_PATH && window.location.pathname.startsWith('/ai-readiness')) {
      setBasePath('/ai-readiness');
    }
  }, []);

  // Derive website and company name from email domain
  const deriveFromEmail = (email: string) => {
    const domain = email.split('@')[1];
    if (domain && !domain.includes('gmail') && !domain.includes('yahoo') && !domain.includes('hotmail') && !domain.includes('outlook') && !domain.includes('icloud')) {
      const companyName = domain.split('.')[0];
      // Capitalize first letter of company name
      const formattedName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
      return {
        website: `https://${domain}`,
        name: formattedName,
      };
    }
    return { website: '', name: '' };
  };

  // Auto-fill website and company name when email changes
  const [manuallyEdited, setManuallyEdited] = useState({ website: false, name: false });

  useEffect(() => {
    if (companyData.email) {
      const derived = deriveFromEmail(companyData.email);
      setCompanyData((prev) => ({
        ...prev,
        website: manuallyEdited.website ? prev.website : derived.website,
        name: manuallyEdited.name ? prev.name : derived.name,
      }));
    }
  }, [companyData.email, manuallyEdited]);

  const handleAnswer = useCallback((questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  }, []);

  // Handle flow assessment completion - must be before any conditional returns
  const handleFlowComplete = useCallback(async () => {
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

      // Store report in localStorage for the results page
      localStorage.setItem('assessmentReport', JSON.stringify(result.report));
      setReport(result.report);
    } catch (error) {
      console.error('Assessment submission error:', error);
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [basePath, companyData, answers, companyInsights]);

  const handleNext = async () => {
    if (currentStep === 0) {
      // Save lead immediately (capture email early)
      fetch(`${basePath}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: companyData.email,
          companyName: companyData.name,
          linkedin: companyData.linkedin,
        }),
      }).catch((error) => console.error('Lead capture error:', error));

      // Start company analysis in background (non-blocking)
      setIsAnalyzing(true);
      const websiteToAnalyze = companyData.website || deriveFromEmail(companyData.email).website;

      fetch(`${basePath}/api/analyze-company`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website: websiteToAnalyze, linkedin: companyData.linkedin }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success && result.insights) {
            setCompanyInsights(result.insights);
            // Update lead with company insights
            fetch(`${basePath}/api/leads`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: companyData.email,
                companyName: companyData.name,
                linkedin: companyData.linkedin,
                companyInsights: result.insights,
              }),
            }).catch((error) => console.error('Lead update error:', error));
          } else if (result.error) {
            console.warn('Company analysis skipped:', result.error);
          }
        })
        .catch((error) => {
          console.error('Analysis error:', error);
        })
        .finally(() => {
          setIsAnalyzing(false);
        });

      // Immediately advance to next step
      setCurrentStep(1);
      onAssessmentStart?.();
    } else if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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

  // Show completion screen when report is ready
  if (report) {
    return (
      <div className="assessment-form-container max-w-xl mx-auto">
        <div className="assessment-form bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 text-center">
          {/* Success indicator */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>

          {/* Archetype reveal */}
          <p className="type-xs text-white/50 uppercase tracking-wider mb-2">Your AI Archetype</p>
          <h2
            className="heading-subsection mb-3"
            style={{ color: report.archetype.color }}
          >
            {report.archetype.name}
          </h2>
          <p className="type-base text-white/60 italic mb-6">"{report.archetype.hook}"</p>

          {/* Score */}
          <div className="inline-flex items-baseline gap-1 px-5 py-2 rounded-xl bg-white/5 border border-white/10 mb-8">
            <span className="text-3xl font-bold text-white">{report.overallScore}</span>
            <span className="type-base text-white/40">/100</span>
          </div>

          {/* Email notification */}
          <div className="flex items-center justify-center gap-2 text-white/50 mb-8">
            <Mail className="w-4 h-4" />
            <span className="type-sm">Report sent to {companyData.email}</span>
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push('/ai-transformation/results')}
            className="btn-primary inline-flex items-center gap-2"
          >
            View Full Report
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const isStepComplete = (stepId: string) => {
    if (stepId === 'company') {
      // Only email is required - website derived from email domain
      return companyData.email && companyData.email.includes('@');
    }
    const dimension = DIMENSIONS.find((d) => d.id === stepId);
    if (!dimension) return false;
    const dimensionAnswers = dimension.questions.map((q) => answers[q.id]);
    return dimensionAnswers.every((a) => a !== undefined);
  };

  const renderIntroStep = () => {
    return (
      <div className="form-step active">
        <div className="form-step-header mb-5">
          <span className="block type-xs text-purple-400/80 uppercase tracking-wider mb-1">Let's Get Started</span>
          <h2 className="heading-subsection text-white m-0">{STEPS[0].title}</h2>
          <p className="type-sm text-white/60 mt-2 leading-relaxed">
            Enter your work email and we'll automatically analyze your company's AI readiness.
          </p>
        </div>

        <div className="form-group mb-5">
          <label className="form-label block type-sm font-medium text-white/90 mb-2">Work Email *</label>
          <input
            type="email"
            className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white type-sm transition-colors focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08] placeholder:text-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
            value={companyData.email}
            onChange={(e) => setCompanyData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="you@yourcompany.com"
            disabled={isAnalyzing}
          />
        </div>

        {/* Auto-detected fields */}
        {(companyData.name || companyData.website) && (
          <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg mb-5">
            <p className="type-xs text-white/50 uppercase tracking-wider mb-3">Auto-detected from your email</p>

            {companyData.name && (
              <div className="flex items-center justify-between mb-2">
                <span className="type-sm text-white/70">Company</span>
                <input
                  type="text"
                  className="bg-transparent type-sm text-white text-right border-none focus:outline-none focus:ring-0 w-auto"
                  value={companyData.name}
                  onChange={(e) => {
                    setManuallyEdited((prev) => ({ ...prev, name: true }));
                    setCompanyData((prev) => ({ ...prev, name: e.target.value }));
                  }}
                />
              </div>
            )}

            {companyData.website && (
              <div className="flex items-center justify-between">
                <span className="type-sm text-white/70">Website</span>
                <input
                  type="text"
                  className="bg-transparent type-sm text-white text-right border-none focus:outline-none focus:ring-0 w-auto max-w-[200px]"
                  value={companyData.website}
                  onChange={(e) => {
                    setManuallyEdited((prev) => ({ ...prev, website: true }));
                    setCompanyData((prev) => ({ ...prev, website: e.target.value }));
                  }}
                />
              </div>
            )}
          </div>
        )}

        <p className="type-xs text-white/50 mt-4">
          We'll analyze your website to understand your company's current AI maturity and provide personalized recommendations.
        </p>
      </div>
    );
  };

  // If we're past the intro step, show the flow assessment with sidebar
  if (currentStep > 0) {
    return (
      <div className="assessment-form-container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8">
          {/* LEFT: Visualization Sidebar (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <AssessmentSidebar
                dimensionScores={dimensionScores}
                axisScores={axisScores}
                predictedArchetype={predictedArchetype}
                currentDimensionId={currentDimensionId}
                totalAnswered={totalAnswered}
              />
            </div>
          </div>

          {/* RIGHT: Assessment Form */}
          <div className="assessment-form bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8">
            {/* Mobile: Mini archetype badge */}
            {totalAnswered >= 3 && predictedArchetype && (
              <div className="lg:hidden mb-6 flex items-center justify-between p-3 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: predictedArchetype.color }}
                  />
                  <span className="text-xs text-white/60">Emerging as</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: predictedArchetype.color }}
                  >
                    {predictedArchetype.name}
                  </span>
                </div>
                <div className="text-xs text-white/40">
                  {totalAnswered}/{totalQuestions}
                </div>
              </div>
            )}

            <FlowAssessment
              dimensions={DIMENSIONS}
              answers={answers}
              onAnswer={handleAnswer}
              onComplete={handleFlowComplete}
              onDimensionChange={handleDimensionChange}
              companyInsights={companyInsights}
              isAnalyzing={isAnalyzing}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    );
  }

  // Intro step
  return (
    <div className="assessment-form-container max-w-xl mx-auto">
      {/* Stats Header */}
      <div className="assessment-stats flex justify-center gap-6 md:gap-10 mb-8 pb-6 border-b border-white/10">
        <div className="stat-item text-center">
          <div className="stat-value type-lg font-bold text-white">40</div>
          <div className="stat-label type-xs uppercase tracking-wider text-gray-500">Questions</div>
        </div>
        <div className="stat-item text-center">
          <div className="stat-value type-lg font-bold text-white">6</div>
          <div className="stat-label type-xs uppercase tracking-wider text-gray-500">Dimensions</div>
        </div>
        <div className="stat-item text-center">
          <div className="stat-value type-lg font-bold text-white">10</div>
          <div className="stat-label type-xs uppercase tracking-wider text-gray-500">Minutes</div>
        </div>
      </div>

      {/* Intro Form */}
      <div className="assessment-form bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6">
        {renderIntroStep()}

        <div className="form-nav mt-6 flex justify-end">
          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={!isStepComplete(STEPS[0].id)}
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

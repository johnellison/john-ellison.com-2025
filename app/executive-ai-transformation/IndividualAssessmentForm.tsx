'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { IndividualAssessmentResult } from '@/types/assessment';
import IndividualArchetypeQuadrant from './components/IndividualArchetypeQuadrant';
import { useIndividualAssessmentScores } from './hooks/useIndividualAssessmentScores';
import { ArrowRight, Mail, CheckCircle2, Calendar, Clock } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';

// 15 Questions across 4 dimensions
const QUESTIONS = {
  fluency: [
    {
      id: 'f1',
      question: 'How often do you use AI tools (ChatGPT, Claude, Copilot, etc.) in your work?',
      options: [
        { label: 'Daily—it\'s part of my workflow', score: 100 },
        { label: 'Weekly—for specific tasks', score: 70 },
        { label: 'Occasionally—when I remember', score: 40 },
        { label: 'Rarely or never', score: 0 },
      ],
    },
    {
      id: 'f2',
      question: 'What\'s your typical experience when using AI tools?',
      options: [
        { label: 'Consistently useful—saves me significant time', score: 100 },
        { label: 'Hit or miss—sometimes helpful', score: 70 },
        { label: 'Frustrating—often not what I need', score: 40 },
        { label: 'Haven\'t used them enough to say', score: 0 },
      ],
    },
    {
      id: 'f3',
      question: 'Have you customized or trained any AI tool with your preferences or context?',
      options: [
        { label: 'Yes—I have custom prompts/GPTs/workflows', score: 100 },
        { label: 'I\'ve tried but haven\'t stuck with it', score: 70 },
        { label: 'No, but I\'m interested', score: 40 },
        { label: 'No, and I\'m skeptical it would help', score: 0 },
      ],
    },
    {
      id: 'f4',
      question: 'How would you rate your understanding of what AI can and cannot do well?',
      options: [
        { label: 'Strong—I know where AI excels and fails', score: 100 },
        { label: 'Good—I have a general sense', score: 70 },
        { label: 'Basic—still learning', score: 40 },
        { label: 'Limited—it\'s mostly a black box', score: 0 },
      ],
    },
  ],
  workflow: [
    {
      id: 'w1',
      question: 'How many emails do you receive per day on average?',
      options: [
        { label: '100+ emails', score: 100 },
        { label: '50-100 emails', score: 70 },
        { label: '20-50 emails', score: 40 },
        { label: 'Under 20 emails', score: 20 },
      ],
    },
    {
      id: 'w2',
      question: 'How many communication channels do you actively monitor?',
      options: [
        { label: '5+ (email, Slack, WhatsApp, SMS, etc.)', score: 100 },
        { label: '3-4 channels', score: 70 },
        { label: '2 channels', score: 40 },
        { label: 'Just email', score: 20 },
      ],
    },
    {
      id: 'w3',
      question: 'What\'s your current delegation/support situation?',
      options: [
        { label: 'No assistant—I handle everything myself', score: 100 },
        { label: 'Part-time or shared assistant', score: 70 },
        { label: 'Full-time EA but still overwhelmed', score: 50 },
        { label: 'Full team support—well covered', score: 20 },
      ],
    },
    {
      id: 'w4',
      question: 'How many software tools do you use in a typical week?',
      options: [
        { label: '10+ tools', score: 100 },
        { label: '6-10 tools', score: 70 },
        { label: '3-5 tools', score: 40 },
        { label: '1-2 tools', score: 20 },
      ],
    },
  ],
  leverage: [
    {
      id: 'l1',
      question: 'What percentage of your time goes to admin/coordination vs. strategic work?',
      options: [
        { label: '60%+ on admin—I\'m barely strategic', score: 100 },
        { label: '40-60% admin—struggling to balance', score: 70 },
        { label: '20-40% admin—manageable', score: 40 },
        { label: 'Under 20% admin—mostly strategic', score: 20 },
      ],
    },
    {
      id: 'l2',
      question: 'How often do you miss important decisions or opportunities due to information overload?',
      options: [
        { label: 'Frequently—things fall through the cracks', score: 100 },
        { label: 'Sometimes—it happens monthly', score: 70 },
        { label: 'Rarely—maybe once a quarter', score: 40 },
        { label: 'Never—I\'m on top of everything', score: 0 },
      ],
    },
    {
      id: 'l3',
      question: 'If you had 10 more hours per week, could you generate significantly more value?',
      options: [
        { label: 'Absolutely—I have high-impact work waiting', score: 100 },
        { label: 'Probably—there are opportunities I\'m missing', score: 70 },
        { label: 'Maybe—not sure what I\'d do', score: 40 },
        { label: 'No—I\'m already working on the right things', score: 0 },
      ],
    },
    {
      id: 'l4',
      question: 'How much of your repetitive work could theoretically be automated?',
      options: [
        { label: '50%+ of my time is automatable', score: 100 },
        { label: '30-50% could be automated', score: 70 },
        { label: '10-30% could be automated', score: 40 },
        { label: 'Most of my work requires human judgment', score: 20 },
      ],
    },
  ],
  readiness: [
    {
      id: 'r1',
      question: 'How much time can you commit to learning/implementing new systems in the next 60 days?',
      options: [
        { label: '10+ hours total—I\'ll make time', score: 100 },
        { label: '5-10 hours—some availability', score: 70 },
        { label: '2-5 hours—limited bandwidth', score: 40 },
        { label: 'Minimal—completely overwhelmed', score: 0 },
      ],
    },
    {
      id: 'r2',
      question: 'What\'s your budget comfort level for productivity tools/services?',
      options: [
        { label: '$500+/month or $10K+ one-time investment', score: 100 },
        { label: '$200-500/month range', score: 70 },
        { label: '$50-200/month', score: 40 },
        { label: 'Prefer free or minimal cost', score: 0 },
      ],
    },
    {
      id: 'r3',
      question: 'How do you typically respond to new tools and workflow changes?',
      options: [
        { label: 'Excited—I love optimizing my systems', score: 100 },
        { label: 'Open—willing if there\'s clear benefit', score: 70 },
        { label: 'Cautious—need to see it working first', score: 40 },
        { label: 'Resistant—my current system works fine', score: 0 },
      ],
    },
  ],
};

const DIMENSIONS = [
  { id: 'fluency', title: 'Personal AI Fluency', questions: QUESTIONS.fluency, weight: 0.3 },
  { id: 'workflow', title: 'Workflow Complexity', questions: QUESTIONS.workflow, weight: 0.25 },
  { id: 'leverage', title: 'Strategic Leverage Potential', questions: QUESTIONS.leverage, weight: 0.25 },
  { id: 'readiness', title: 'Implementation Readiness', questions: QUESTIONS.readiness, weight: 0.2 },
];

// Dimension colors
const DIMENSION_COLORS = [
  { color: '#8b5cf6', name: 'violet' },     // Fluency
  { color: '#3b82f6', name: 'blue' },       // Workflow
  { color: '#10b981', name: 'emerald' },    // Leverage
  { color: '#f59e0b', name: 'amber' },      // Readiness
];

interface IndividualAssessmentFormProps {
  onAssessmentStart?: () => void;
}

export default function IndividualAssessmentForm({ onAssessmentStart }: IndividualAssessmentFormProps = {}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1+ = questions
  const [currentDimension, setCurrentDimension] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    title: '',
  });
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const isProcessingRef = useRef(false);
  const hasCompletedRef = useRef(false);

  const {
    dimensionScores,
    axisScores,
    predictedArchetype,
    totalAnswered,
    totalQuestions,
  } = useIndividualAssessmentScores(DIMENSIONS, answers);

  const currentColor = DIMENSION_COLORS[currentDimension] || DIMENSION_COLORS[0];

  // Calculate estimated time savings
  const estimatedWeeklySavings = Math.round(15 + (totalAnswered / totalQuestions) * 20);

  // GSAP animation for completion
  useEffect(() => {
    if (isComplete && !isSubmitting) {
      const tl = gsap.timeline();
      tl.from('.results-reveal', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }
  }, [isComplete, isSubmitting]);

  const handleComplete = useCallback(async () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setIsSubmitting(true);

    try {
      // In a real implementation, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
    } catch (error) {
      console.error('Assessment submission error:', error);
      setIsSubmitting(false);
    }
  }, []);

  const advance = useCallback(() => {
    if (isComplete) return;

    setDirection('forward');
    setIsTransitioning(true);

    setTimeout(() => {
      const dim = DIMENSIONS[currentDimension];

      if (currentQuestion < dim.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else if (currentDimension < DIMENSIONS.length - 1) {
        setCurrentDimension((prev) => prev + 1);
        setCurrentQuestion(0);
      } else {
        setIsComplete(true);
        handleComplete();
      }

      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  }, [currentDimension, currentQuestion, isComplete, handleComplete]);

  const handleAnswer = useCallback((questionId: string, score: number) => {
    if (isComplete || isProcessingRef.current) return;
    isProcessingRef.current = true;

    setAnswers((prev) => ({ ...prev, [questionId]: score }));

    // Auto-advance after short delay
    setTimeout(() => {
      advance();
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 250);
    }, 300);
  }, [isComplete, advance]);

  const goBack = useCallback(() => {
    if (isComplete) {
      setIsComplete(false);
      const lastDim = DIMENSIONS[DIMENSIONS.length - 1];
      setCurrentDimension(DIMENSIONS.length - 1);
      setCurrentQuestion(lastDim.questions.length - 1);
      return;
    }

    setDirection('backward');
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion((prev) => prev - 1);
      } else if (currentDimension > 0) {
        const prevDim = DIMENSIONS[currentDimension - 1];
        setCurrentDimension((prev) => prev - 1);
        setCurrentQuestion(prevDim.questions.length - 1);
      } else if (currentStep > 0) {
        setCurrentStep(0);
      }

      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  }, [currentDimension, currentQuestion, currentStep, isComplete]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete || isSubmitting || isProcessingRef.current || currentStep === 0) return;

      const dim = DIMENSIONS[currentDimension];
      const question = dim?.questions[currentQuestion];
      if (!question) return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        if (index < question.options.length) {
          handleAnswer(question.id, question.options[index].score);
        }
      }

      if (e.key === '9') {
        e.preventDefault();
        isProcessingRef.current = true;
        advance();
        setTimeout(() => {
          isProcessingRef.current = false;
        }, 400);
      }

      if (e.key === 'Backspace' || e.key === 'Escape') {
        if (currentQuestion > 0 || currentDimension > 0) {
          e.preventDefault();
          goBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete, isSubmitting, currentStep, currentDimension, currentQuestion, handleAnswer, advance, goBack]);

  const handleStart = () => {
    setCurrentStep(1);
    onAssessmentStart?.();
  };

  const getAnimationClass = () => {
    if (!isTransitioning) return 'opacity-100 translate-y-0';
    return direction === 'forward'
      ? 'opacity-0 translate-y-4'
      : 'opacity-0 -translate-y-4';
  };

  // Intro step
  if (currentStep === 0) {
    return (
      <div className="assessment-form-container max-w-xl mx-auto">
        {/* Stats Header */}
        <div className="assessment-stats flex justify-center gap-6 md:gap-10 mb-8 pb-6 border-b border-white/10">
          <div className="stat-item text-center">
            <div className="stat-value type-lg font-bold text-white">15</div>
            <div className="stat-label type-xs uppercase tracking-wider text-gray-500">Questions</div>
          </div>
          <div className="stat-item text-center">
            <div className="stat-value type-lg font-bold text-white">4</div>
            <div className="stat-label type-xs uppercase tracking-wider text-gray-500">Dimensions</div>
          </div>
          <div className="stat-item text-center">
            <div className="stat-value type-lg font-bold text-white">3</div>
            <div className="stat-label type-xs uppercase tracking-wider text-gray-500">Minutes</div>
          </div>
        </div>

        {/* Intro Form */}
        <div className="assessment-form bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6">
          <div className="form-step-header mb-5">
            <span className="block type-xs text-purple-400/80 uppercase tracking-wider mb-1">Let&apos;s Get Started</span>
            <h2 className="heading-subsection text-white m-0">Your Information</h2>
            <p className="type-sm text-white/60 mt-2 leading-relaxed">
              Enter your email to receive your personalized AI readiness report.
            </p>
          </div>

          <div className="form-group mb-5">
            <label className="form-label block type-sm font-medium text-white/90 mb-2">Work Email *</label>
            <input
              type="email"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white type-sm transition-colors focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08] placeholder:text-white/40"
              value={userData.email}
              onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="you@company.com"
            />
          </div>

          <div className="form-group mb-5">
            <label className="form-label block type-sm font-medium text-white/90 mb-2">Your Name</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white type-sm transition-colors focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08] placeholder:text-white/40"
              value={userData.name}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Your name"
            />
          </div>

          <div className="form-group mb-5">
            <label className="form-label block type-sm font-medium text-white/90 mb-2">Title (Optional)</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white type-sm transition-colors focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08] placeholder:text-white/40"
              value={userData.title}
              onChange={(e) => setUserData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="CEO, Founder, VP, etc."
            />
          </div>

          <div className="form-nav mt-6 flex justify-end">
            <button
              className="btn-primary"
              onClick={handleStart}
              disabled={!userData.email || !userData.email.includes('@')}
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Submitting state
  if (isComplete && isSubmitting) {
    return (
      <div className="assessment-form-container max-w-6xl mx-auto px-4">
        <div className="min-h-[400px] flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-white/10" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Analyzing Your Profile</h2>
            <p className="type-sm text-white/60 max-w-sm mx-auto">
              Determining your AI archetype and calculating personalized recommendations...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Results state
  if (isComplete && !isSubmitting && predictedArchetype) {
    return (
      <div className="assessment-form-container max-w-6xl mx-auto px-4">
        <div className="completion-screen">
          {/* Header with success indicator */}
          <div className="results-reveal text-center mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="type-sm text-green-300">Assessment Complete</span>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8">
            {/* LEFT: Quadrant (desktop only) */}
            <div className="hidden lg:block results-reveal">
              <IndividualArchetypeQuadrant
                axisScores={axisScores}
                predictedArchetype={predictedArchetype}
                totalAnswered={999}
              />
            </div>

            {/* RIGHT: Results Summary */}
            <div className="results-reveal bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8">
              {/* Archetype reveal */}
              <p className="type-xs text-white/50 uppercase tracking-wider mb-2">Your AI Archetype</p>
              <h2
                className="heading-subsection mb-3"
                style={{ color: predictedArchetype.color }}
              >
                {predictedArchetype.name}
              </h2>
              <p className="type-lg text-white/60 italic mb-6">&ldquo;{predictedArchetype.hook}&rdquo;</p>

              {/* Description */}
              <p className="type-base text-white/70 mb-6 leading-relaxed">
                {predictedArchetype.description}
              </p>

              {/* Time Savings Estimate */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-violet-400" />
                  <div>
                    <p className="type-xs text-white/50 uppercase tracking-wider">Estimated Time Savings</p>
                    <p className="type-xl font-bold text-white">
                      {estimatedWeeklySavings}-{estimatedWeeklySavings + 10} hours/week
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="mb-6">
                <p className="type-xs text-white/50 uppercase tracking-wider mb-2">Recommended Starting Point</p>
                <p className="type-base text-violet-300">{predictedArchetype.recommended}</p>
              </div>

              {/* Scores display */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[100px] p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="type-xs text-white/40 mb-1">AI Readiness</p>
                  <span className="text-2xl font-semibold text-blue-400">{axisScores.readiness}</span>
                </div>
                <div className="flex-1 min-w-[100px] p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="type-xs text-white/40 mb-1">Opportunity</p>
                  <span className="text-2xl font-semibold text-violet-400">{axisScores.opportunity}</span>
                </div>
              </div>

              {/* Email notification */}
              <div className="flex items-center gap-2 text-white/50 mb-8 p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="type-sm">Full report sent to {userData.email}</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="https://calendar.app.google/wirgV6a4Vcz7cZAcA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2 flex-1"
                >
                  <Calendar className="w-4 h-4" />
                  Book Discovery Call
                </Link>
                <a
                  href="#solution"
                  className="btn-secondary inline-flex items-center justify-center gap-2 flex-1"
                >
                  View Packages
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile: Mini quadrant */}
          <div className="lg:hidden mt-6 grid grid-cols-2 gap-4 results-reveal">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="type-xs text-white/40 mb-1">Readiness</p>
              <span className="text-2xl font-semibold text-blue-400">{axisScores.readiness}</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="type-xs text-white/40 mb-1">Opportunity</p>
              <span className="text-2xl font-semibold text-violet-400">{axisScores.opportunity}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question flow
  const dim = DIMENSIONS[currentDimension];
  const question = dim?.questions[currentQuestion];

  return (
    <div className="assessment-form-container max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8">
        {/* LEFT: Quadrant (desktop only) */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <IndividualArchetypeQuadrant
              axisScores={axisScores}
              predictedArchetype={predictedArchetype}
              totalAnswered={totalAnswered}
            />
          </div>
        </div>

        {/* RIGHT: Question Form */}
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

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span
                className="type-xs font-medium uppercase tracking-wider transition-colors duration-300"
                style={{ color: currentColor.color }}
              >
                {dim?.title}
              </span>
              <span className="type-xs text-white/50">
                {totalAnswered} of {totalQuestions}
              </span>
            </div>

            {/* Segmented progress bar */}
            <div className="flex gap-1">
              {DIMENSIONS.map((d, dimIdx) => {
                const dimAnswered = d.questions.filter((q) => answers[q.id] !== undefined).length;
                const dimProgress = (dimAnswered / d.questions.length) * 100;
                const isActive = dimIdx === currentDimension && !isComplete;
                const color = DIMENSION_COLORS[dimIdx];

                return (
                  <div
                    key={d.id}
                    className={`flex-1 h-1.5 rounded-full overflow-hidden transition-all duration-300 ${
                      isActive ? 'ring-1 ring-offset-1 ring-offset-transparent' : ''
                    }`}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      ['--tw-ring-color' as string]: isActive ? color.color : 'transparent',
                    }}
                  >
                    <div
                      className="h-full transition-all duration-500 ease-out"
                      style={{
                        width: `${dimProgress}%`,
                        backgroundColor: color.color,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question */}
          {question && (
            <div className={`transition-all duration-300 ease-out ${getAnimationClass()}`}>
              <div className="py-4">
                <div className="mb-6">
                  <span className="type-xs text-white/40 uppercase tracking-wider">
                    Question {currentQuestion + 1} of {dim.questions.length}
                  </span>
                </div>

                <h2 className="type-lg font-medium text-white mb-5 leading-relaxed">
                  {question.question}
                </h2>

                <div className="space-y-3">
                  {question.options.map((option, idx) => {
                    const isSelected = answers[question.id] === option.score;

                    return (
                      <button
                        key={option.label}
                        onClick={() => handleAnswer(question.id, option.score)}
                        className={`
                          w-full text-left px-4 py-3 rounded-lg border transition-all duration-200
                          flex items-center gap-3 group
                          ${isSelected
                            ? 'border-opacity-50 ring-1 ring-opacity-30'
                            : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/20'
                          }
                        `}
                        style={isSelected ? {
                          backgroundColor: `${currentColor.color}20`,
                          borderColor: `${currentColor.color}80`,
                          boxShadow: `0 0 0 1px ${currentColor.color}30`,
                        } : {}}
                      >
                        <span
                          className="w-6 h-6 rounded flex items-center justify-center type-xs font-medium transition-colors shrink-0"
                          style={isSelected ? {
                            backgroundColor: currentColor.color,
                            color: 'white',
                          } : {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.6)',
                          }}
                        >
                          {idx + 1}
                        </span>
                        <span className={`flex-1 type-sm ${isSelected ? 'text-white' : 'text-white/80'}`}>
                          {option.label}
                        </span>
                        {isSelected && (
                          <svg
                            className="w-4 h-4 shrink-0"
                            style={{ color: currentColor.color }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="type-xs text-white/40 mt-6 text-center">
                  Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">1</kbd>-<kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">4</kbd> to select
                  <span className="mx-2 text-white/20">·</span>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">9</kbd> to skip
                </p>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-auto">
            <button
              onClick={goBack}
              disabled={currentDimension === 0 && currentQuestion === 0}
              className="type-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {question && answers[question.id] !== undefined && (
              <button
                onClick={advance}
                className="type-sm hover:opacity-80 transition-colors flex items-center gap-2"
                style={{ color: currentColor.color }}
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface Question {
  id: string;
  question: string;
  options: { label: string; score: number }[];
}

interface Dimension {
  id: string;
  title: string;
  questions: Question[];
  weight: number;
}

interface FlowAssessmentProps {
  dimensions: Dimension[];
  answers: Record<string, number>;
  onAnswer: (questionId: string, score: number) => void;
  onComplete: () => void;
  onDimensionChange?: (dimensionId: string, dimensionIndex: number) => void;
  companyInsights: any;
  isAnalyzing: boolean;
  isSubmitting?: boolean;
}

// Purple-to-blue gradient colors for each dimension (brand-aligned)
const DIMENSION_COLORS = [
  { color: '#8b5cf6', name: 'violet' },       // Leadership - Violet
  { color: '#7c3aed', name: 'purple' },       // Data - Purple
  { color: '#6d28d9', name: 'deep-purple' },  // Technology - Deep Purple
  { color: '#5b21b6', name: 'indigo' },       // Talent - Indigo
  { color: '#4c1d95', name: 'blue-violet' },  // Governance - Blue Violet
  { color: '#3b82f6', name: 'blue' },         // Culture - Blue
];

// Helper to check if a gap message is valid/useful
function isValidGap(gap: unknown): gap is string {
  if (!gap || typeof gap !== "string" || gap.length < 5) return false;
  const lower = gap.toLowerCase();
  return !lower.includes("no content") &&
    !lower.includes("not available") &&
    !lower.includes("unable to") &&
    !lower.includes("could not") &&
    !lower.includes("cannot analyze");
}


export default function FlowAssessment({
  dimensions,
  answers,
  onAnswer,
  onComplete,
  onDimensionChange,
  companyInsights,
  isAnalyzing,
  isSubmitting = false,
}: FlowAssessmentProps) {
  // Start directly on first question (no section intros)
  const [currentDimension, setCurrentDimension] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);
  const isProcessingRef = useRef(false); // Debounce rapid key presses

  // Get current dimension color
  const currentColor = DIMENSION_COLORS[currentDimension] || DIMENSION_COLORS[0];

  // Notify parent of dimension changes
  useEffect(() => {
    if (onDimensionChange && !isComplete) {
      const dim = dimensions[currentDimension];
      if (dim) {
        onDimensionChange(dim.id, currentDimension);
      }
    }
  }, [currentDimension, dimensions, onDimensionChange, isComplete]);

  // Calculate total progress
  const getTotalProgress = useCallback(() => {
    const totalQuestions = dimensions.reduce((sum, d) => sum + d.questions.length, 0);
    let answered = 0;
    for (const dim of dimensions) {
      for (const q of dim.questions) {
        if (answers[q.id] !== undefined) answered++;
      }
    }
    return { answered, total: totalQuestions, percentage: (answered / totalQuestions) * 100 };
  }, [dimensions, answers]);

  // Get current question info
  const getCurrentInfo = useCallback(() => {
    if (isComplete) return null;

    const dim = dimensions[currentDimension];
    const question = dim?.questions[currentQuestion];
    if (!dim || !question) return null;

    const questionNumberInDimension = currentQuestion + 1;
    const totalInDimension = dim.questions.length;

    // Calculate global question number
    let globalNumber = 0;
    for (let i = 0; i < currentDimension; i++) {
      globalNumber += dimensions[i].questions.length;
    }
    globalNumber += currentQuestion + 1;

    return {
      dimension: dim,
      question,
      questionNumberInDimension,
      totalInDimension,
      globalNumber,
      totalQuestions: dimensions.reduce((sum, d) => sum + d.questions.length, 0),
    };
  }, [currentDimension, currentQuestion, dimensions, isComplete]);

  // Handle answer selection with auto-advance (debounced to prevent rapid key presses)
  const handleAnswer = useCallback((score: number) => {
    if (isComplete || isProcessingRef.current) return;

    const info = getCurrentInfo();
    if (!info) return;

    // Lock to prevent rapid key presses from triggering multiple advances
    isProcessingRef.current = true;

    onAnswer(info.question.id, score);

    // Auto-advance after short delay
    setTimeout(() => {
      advance();
      // Unlock after advance completes
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 250);
    }, 300);
  }, [isComplete, getCurrentInfo, onAnswer]);

  // Advance to next question
  const advance = useCallback(() => {
    if (isComplete) return;

    setDirection('forward');
    setIsTransitioning(true);

    setTimeout(() => {
      const dim = dimensions[currentDimension];

      if (currentQuestion < dim.questions.length - 1) {
        // More questions in this section
        setCurrentQuestion(prev => prev + 1);
      } else if (currentDimension < dimensions.length - 1) {
        // Move to next section
        setCurrentDimension(prev => prev + 1);
        setCurrentQuestion(0);
      } else {
        // Assessment complete
        setIsComplete(true);
      }

      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  }, [currentDimension, currentQuestion, dimensions, isComplete]);

  // Go back to previous question
  const goBack = useCallback(() => {
    if (isComplete) {
      // Go back from complete state
      setIsComplete(false);
      const lastDim = dimensions[dimensions.length - 1];
      setCurrentDimension(dimensions.length - 1);
      setCurrentQuestion(lastDim.questions.length - 1);
      return;
    }

    setDirection('backward');
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion(prev => prev - 1);
      } else if (currentDimension > 0) {
        const prevDim = dimensions[currentDimension - 1];
        setCurrentDimension(prev => prev - 1);
        setCurrentQuestion(prevDim.questions.length - 1);
      }

      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  }, [currentDimension, currentQuestion, dimensions, isComplete]);

  // Skip current question (press 9)
  const skipQuestion = useCallback(() => {
    if (isComplete) return;
    advance();
  }, [isComplete, advance]);

  // Keyboard navigation (with debounce protection)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block all keyboard input while processing or complete
      if (isComplete || isSubmitting || isProcessingRef.current) return;

      const info = getCurrentInfo();
      if (!info) return;

      // Number keys 1-4 to select answer
      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault(); // Prevent any default behavior
        const index = parseInt(e.key) - 1;
        if (index < info.question.options.length) {
          handleAnswer(info.question.options[index].score);
        }
      }

      // 9 to skip (also debounced)
      if (e.key === '9') {
        e.preventDefault();
        isProcessingRef.current = true;
        skipQuestion();
        setTimeout(() => {
          isProcessingRef.current = false;
        }, 400);
      }

      // Backspace/Escape to go back
      if (e.key === 'Backspace' || e.key === 'Escape') {
        if (currentQuestion > 0 || currentDimension > 0) {
          e.preventDefault();
          goBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete, isSubmitting, getCurrentInfo, handleAnswer, skipQuestion, goBack, currentQuestion, currentDimension]);

  // Handle complete - only call onComplete once
  useEffect(() => {
    if (isComplete && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
    }
  }, [isComplete, onComplete]);

  const progress = getTotalProgress();
  const currentInfo = getCurrentInfo();

  // Animation classes
  const getAnimationClass = () => {
    if (!isTransitioning) return 'opacity-100 translate-y-0';
    return direction === 'forward'
      ? 'opacity-0 translate-y-4'
      : 'opacity-0 -translate-y-4';
  };

  // Check if we have valid company insights to display
  const hasValidInsights = companyInsights && typeof companyInsights.ai_maturity?.score === "number";
  const validGap = hasValidInsights && isValidGap(companyInsights.readiness_clues?.gaps?.[0])
    ? companyInsights.readiness_clues.gaps[0]
    : null;

  // Show submitting state
  if (isComplete && isSubmitting) {
    return (
      <div ref={containerRef} className="flow-assessment min-h-[400px] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full border-4 border-white/10" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Analyzing Your Responses</h2>
          <p className="type-sm text-white/60 max-w-sm mx-auto">
            Calculating your AI readiness score and generating personalized recommendations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flow-assessment min-h-[400px] flex flex-col">
      {/* Progress Bar Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span
            className="type-xs font-medium uppercase tracking-wider transition-colors duration-300"
            style={{ color: currentColor.color }}
          >
            {currentInfo ? currentInfo.dimension.title : 'Assessment Complete'}
          </span>
          <span className="type-xs text-white/50">
            {progress.answered} of {progress.total}
          </span>
        </div>

        {/* Prismatic segmented progress bar */}
        <div className="flex gap-1">
          {dimensions.map((dim, dimIdx) => {
            const dimAnswered = dim.questions.filter(q => answers[q.id] !== undefined).length;
            const dimProgress = (dimAnswered / dim.questions.length) * 100;
            const isActive = dimIdx === currentDimension && !isComplete;
            const color = DIMENSION_COLORS[dimIdx];

            return (
              <div
                key={dim.id}
                className={`flex-1 h-1.5 rounded-full overflow-hidden transition-all duration-300 ${
                  isActive ? 'ring-1 ring-offset-1 ring-offset-transparent' : ''
                }`}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  ['--tw-ring-color' as string]: isActive ? color.color : 'transparent'
                }}
              >
                <div
                  className="h-full transition-all duration-500 ease-out"
                  style={{
                    width: `${dimProgress}%`,
                    backgroundColor: color.color
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className={`transition-all duration-300 ease-out ${getAnimationClass()}`}>

          {/* Question */}
          {currentInfo && (
            <div className="py-4">
              <div className="mb-6">
                <span className="type-xs text-white/40 uppercase tracking-wider">
                  Question {currentInfo.questionNumberInDimension} of {currentInfo.totalInDimension}
                </span>
              </div>

              <h2 className="type-lg font-medium text-white mb-5 leading-relaxed">
                {currentInfo.question.question}
              </h2>

              <div className="space-y-3">
                {currentInfo.question.options.map((option, idx) => {
                  const isSelected = answers[currentInfo.question.id] === option.score;

                  return (
                    <button
                      key={option.label}
                      onClick={() => handleAnswer(option.score)}
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
                        boxShadow: `0 0 0 1px ${currentColor.color}30`
                      } : {}}
                    >
                      <span
                        className={`
                          w-6 h-6 rounded flex items-center justify-center type-xs font-medium
                          transition-colors shrink-0
                        `}
                        style={isSelected ? {
                          backgroundColor: currentColor.color,
                          color: 'white'
                        } : {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.6)'
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
          )}

        </div>
      </div>

      {/* Navigation Footer */}
      {currentInfo && (
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

          {answers[currentInfo.question.id] !== undefined && (
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
      )}

      {/* Company Insights Mini-Panel (shows during questions when valid insights exist) */}
      {currentInfo && hasValidInsights && (
        <div
          className="mt-6 p-4 rounded-xl border border-white/5"
          style={{ backgroundColor: `${currentColor.color}08` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${currentColor.color}20` }}
            >
              <span className="type-lg font-bold" style={{ color: currentColor.color }}>
                {companyInsights.ai_maturity.score}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="type-xs text-white/50 truncate">
                Est. AI Maturity from website analysis
              </p>
              {validGap && (
                <p className="type-xs text-orange-400/80 truncate">
                  Focus: {validGap}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

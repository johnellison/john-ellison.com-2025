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
  companyInsights: any;
  isAnalyzing: boolean;
}

type FlowState =
  | { type: 'section-intro'; dimensionIndex: number }
  | { type: 'question'; dimensionIndex: number; questionIndex: number }
  | { type: 'section-complete'; dimensionIndex: number }
  | { type: 'complete' };

export default function FlowAssessment({
  dimensions,
  answers,
  onAnswer,
  onComplete,
  companyInsights,
  isAnalyzing,
}: FlowAssessmentProps) {
  const [flowState, setFlowState] = useState<FlowState>({ type: 'section-intro', dimensionIndex: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (flowState.type === 'question') {
      const dim = dimensions[flowState.dimensionIndex];
      const question = dim.questions[flowState.questionIndex];
      const questionNumberInDimension = flowState.questionIndex + 1;
      const totalInDimension = dim.questions.length;

      // Calculate global question number
      let globalNumber = 0;
      for (let i = 0; i < flowState.dimensionIndex; i++) {
        globalNumber += dimensions[i].questions.length;
      }
      globalNumber += flowState.questionIndex + 1;

      return {
        dimension: dim,
        question,
        questionNumberInDimension,
        totalInDimension,
        globalNumber,
        totalQuestions: dimensions.reduce((sum, d) => sum + d.questions.length, 0),
      };
    }
    return null;
  }, [flowState, dimensions]);

  // Handle answer selection with auto-advance
  const handleAnswer = useCallback((score: number) => {
    if (flowState.type !== 'question') return;

    const info = getCurrentInfo();
    if (!info) return;

    onAnswer(info.question.id, score);

    // Auto-advance after short delay
    setTimeout(() => {
      advance();
    }, 300);
  }, [flowState, getCurrentInfo, onAnswer]);

  // Advance to next state
  const advance = useCallback(() => {
    setDirection('forward');
    setIsTransitioning(true);

    setTimeout(() => {
      setFlowState(prev => {
        if (prev.type === 'section-intro') {
          return { type: 'question', dimensionIndex: prev.dimensionIndex, questionIndex: 0 };
        }

        if (prev.type === 'question') {
          const dim = dimensions[prev.dimensionIndex];
          if (prev.questionIndex < dim.questions.length - 1) {
            return { type: 'question', dimensionIndex: prev.dimensionIndex, questionIndex: prev.questionIndex + 1 };
          }
          return { type: 'section-complete', dimensionIndex: prev.dimensionIndex };
        }

        if (prev.type === 'section-complete') {
          if (prev.dimensionIndex < dimensions.length - 1) {
            return { type: 'section-intro', dimensionIndex: prev.dimensionIndex + 1 };
          }
          return { type: 'complete' };
        }

        return prev;
      });

      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  }, [dimensions]);

  // Go back to previous state
  const goBack = useCallback(() => {
    setDirection('backward');
    setIsTransitioning(true);

    setTimeout(() => {
      setFlowState(prev => {
        if (prev.type === 'section-intro' && prev.dimensionIndex > 0) {
          return { type: 'section-complete', dimensionIndex: prev.dimensionIndex - 1 };
        }

        if (prev.type === 'question') {
          if (prev.questionIndex > 0) {
            return { type: 'question', dimensionIndex: prev.dimensionIndex, questionIndex: prev.questionIndex - 1 };
          }
          return { type: 'section-intro', dimensionIndex: prev.dimensionIndex };
        }

        if (prev.type === 'section-complete') {
          const dim = dimensions[prev.dimensionIndex];
          return { type: 'question', dimensionIndex: prev.dimensionIndex, questionIndex: dim.questions.length - 1 };
        }

        if (prev.type === 'complete') {
          return { type: 'section-complete', dimensionIndex: dimensions.length - 1 };
        }

        return prev;
      });

      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  }, [dimensions]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (flowState.type === 'question') {
        const info = getCurrentInfo();
        if (!info) return;

        // Number keys 1-4 to select answer
        if (['1', '2', '3', '4'].includes(e.key)) {
          const index = parseInt(e.key) - 1;
          if (index < info.question.options.length) {
            handleAnswer(info.question.options[index].score);
          }
        }
      }

      // Enter to advance on intro/complete screens
      if (e.key === 'Enter' && (flowState.type === 'section-intro' || flowState.type === 'section-complete')) {
        advance();
      }

      // Backspace/Escape to go back
      if ((e.key === 'Backspace' || e.key === 'Escape') && flowState.type !== 'section-intro') {
        if (flowState.type !== 'section-intro' || (flowState as any).dimensionIndex > 0) {
          goBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flowState, getCurrentInfo, handleAnswer, advance, goBack]);

  // Handle complete
  useEffect(() => {
    if (flowState.type === 'complete') {
      onComplete();
    }
  }, [flowState, onComplete]);

  const progress = getTotalProgress();
  const currentInfo = getCurrentInfo();

  // Animation classes
  const getAnimationClass = () => {
    if (!isTransitioning) return 'opacity-100 translate-y-0';
    return direction === 'forward'
      ? 'opacity-0 translate-y-4'
      : 'opacity-0 -translate-y-4';
  };

  return (
    <div ref={containerRef} className="flow-assessment min-h-[400px] flex flex-col">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-white/50 uppercase tracking-wider">
            {flowState.type === 'question' && currentInfo
              ? `${currentInfo.dimension.title}`
              : flowState.type === 'section-intro'
              ? dimensions[flowState.dimensionIndex].title
              : flowState.type === 'section-complete'
              ? `${dimensions[flowState.dimensionIndex].title} Complete`
              : 'Assessment Complete'
            }
          </span>
          <span className="text-xs text-white/50">
            {progress.answered} of {progress.total} questions
          </span>
        </div>

        {/* Segmented progress bar */}
        <div className="flex gap-1">
          {dimensions.map((dim, dimIdx) => {
            const dimAnswered = dim.questions.filter(q => answers[q.id] !== undefined).length;
            const dimProgress = (dimAnswered / dim.questions.length) * 100;
            const isActive = flowState.type === 'section-intro'
              ? dimIdx === flowState.dimensionIndex
              : flowState.type === 'question' || flowState.type === 'section-complete'
              ? dimIdx === (flowState as any).dimensionIndex
              : false;

            return (
              <div
                key={dim.id}
                className={`flex-1 h-1.5 rounded-full overflow-hidden transition-all duration-300 ${
                  isActive ? 'ring-1 ring-purple-500/50' : ''
                }`}
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
                  style={{ width: `${dimProgress}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className={`transition-all duration-300 ease-out ${getAnimationClass()}`}>

          {/* Section Intro */}
          {flowState.type === 'section-intro' && (
            <div className="text-center py-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                <span className="text-[10px] font-medium text-purple-400 uppercase tracking-wider">
                  Section {flowState.dimensionIndex + 1} of {dimensions.length}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                {dimensions[flowState.dimensionIndex].title}
              </h2>

              <p className="text-sm text-white/60 mb-6 max-w-md mx-auto">
                {dimensions[flowState.dimensionIndex].questions.length} questions about your organization's {dimensions[flowState.dimensionIndex].title.toLowerCase()}.
              </p>

              <button
                onClick={advance}
                className="btn-primary px-6 py-2.5"
              >
                Begin Section
              </button>

              <p className="text-xs text-white/40 mt-4">
                Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">Enter</kbd> to continue
              </p>
            </div>
          )}

          {/* Question */}
          {flowState.type === 'question' && currentInfo && (
            <div className="py-4">
              <div className="mb-6">
                <span className="text-xs text-white/40 uppercase tracking-wider">
                  Question {currentInfo.questionNumberInDimension} of {currentInfo.totalInDimension}
                </span>
              </div>

              <h2 className="text-base md:text-lg font-medium text-white mb-6 leading-relaxed">
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
                          ? 'bg-purple-500/20 border-purple-500/50 ring-1 ring-purple-500/30'
                          : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/20'
                        }
                      `}
                    >
                      <span className={`
                        w-6 h-6 rounded flex items-center justify-center text-xs font-medium
                        transition-colors shrink-0
                        ${isSelected
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-white/60 group-hover:bg-white/15'
                        }
                      `}>
                        {idx + 1}
                      </span>
                      <span className={`flex-1 text-sm ${isSelected ? 'text-white' : 'text-white/80'}`}>
                        {option.label}
                      </span>
                      {isSelected && (
                        <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-white/40 mt-6 text-center">
                Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">1</kbd>-<kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">4</kbd> to select
              </p>
            </div>
          )}

          {/* Section Complete */}
          {flowState.type === 'section-complete' && (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-lg font-semibold text-white mb-1">
                {dimensions[flowState.dimensionIndex].title}
              </h2>
              <p className="text-green-400 text-sm mb-4">Section Complete</p>

              {flowState.dimensionIndex < dimensions.length - 1 ? (
                <>
                  <p className="text-sm text-white/60 mb-4">
                    Next up: <span className="text-white">{dimensions[flowState.dimensionIndex + 1].title}</span>
                  </p>
                  <button
                    onClick={advance}
                    className="btn-primary px-6 py-2.5"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-white/60 mb-4">
                    You've completed all sections!
                  </p>
                  <button
                    onClick={advance}
                    className="btn-primary px-6 py-2.5"
                  >
                    Get Your Results
                  </button>
                </>
              )}

              <p className="text-xs text-white/40 mt-4">
                Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">Enter</kbd> to continue
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      {flowState.type === 'question' && (
        <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-auto">
          <button
            onClick={goBack}
            className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {currentInfo && answers[currentInfo.question.id] !== undefined && (
            <button
              onClick={advance}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
            >
              Skip to next
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Company Insights Mini-Panel (shows during questions) */}
      {flowState.type === 'question' && companyInsights && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <span className="text-lg font-bold text-purple-400">
                {companyInsights.ai_maturity?.score || '?'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/50 truncate">
                Est. AI Maturity from website analysis
              </p>
              {companyInsights.readiness_clues?.gaps?.[0] && (
                <p className="text-xs text-orange-400/80 truncate">
                  Focus: {companyInsights.readiness_clues.gaps[0]}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator for analysis */}
      {isAnalyzing && (
        <div className="mt-6 p-4 bg-purple-500/5 rounded-xl border border-purple-500/10 flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <span className="text-xs text-white/60">Analyzing your company in the background...</span>
        </div>
      )}
    </div>
  );
}

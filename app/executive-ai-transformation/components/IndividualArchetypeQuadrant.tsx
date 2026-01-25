'use client';

import { IndividualArchetype, IndividualAxisScores } from '@/types/assessment';

interface IndividualArchetypeQuadrantProps {
  axisScores: IndividualAxisScores;
  predictedArchetype: IndividualArchetype | null;
  totalAnswered: number;
}

// Archetype definitions for the quadrants
const QUADRANTS = {
  topRight: {
    name: 'AI Power User' as const,
    hook: 'Ready to multiply my impact',
    color: '#7c3aed',
  },
  bottomRight: {
    name: 'Strategic Delegator' as const,
    hook: 'Need AI for the tasks draining focus',
    color: '#3b82f6',
  },
  topLeft: {
    name: 'Curious Optimizer' as const,
    hook: 'Finding the right AI applications',
    color: '#f59e0b',
  },
  bottomLeft: {
    name: 'Cautious Observer' as const,
    hook: 'Understanding AI before going all in',
    color: '#64748b',
  },
};

export default function IndividualArchetypeQuadrant({
  axisScores,
  predictedArchetype,
  totalAnswered,
}: IndividualArchetypeQuadrantProps) {
  const { readiness, opportunity } = axisScores;
  const THRESHOLD = 50;

  // Determine which quadrant is active
  // Y-Axis: AI Readiness (up = high), X-Axis: Opportunity (right = high)
  const activeQuadrant = readiness >= THRESHOLD && opportunity >= THRESHOLD
    ? 'topRight'      // High Readiness + High Opportunity = AI Power User
    : readiness < THRESHOLD && opportunity >= THRESHOLD
    ? 'bottomRight'   // Low Readiness + High Opportunity = Strategic Delegator
    : readiness >= THRESHOLD && opportunity < THRESHOLD
    ? 'topLeft'       // High Readiness + Low Opportunity = Curious Optimizer
    : 'bottomLeft';   // Low Readiness + Low Opportunity = Cautious Observer

  // Calculate dot position (0-100 scale mapped to grid)
  const dotX = Math.max(5, Math.min(95, opportunity));
  const dotY = Math.max(5, Math.min(95, 100 - readiness)); // Invert Y since CSS Y goes down

  const hasEnoughData = totalAnswered >= 3;

  return (
    <div className="bg-[#0c0c10] rounded-xl border border-white/10 p-4 overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">
          Your AI Archetype
        </h3>
        {hasEnoughData && predictedArchetype ? (
          <div className="flex items-center gap-2">
            <span
              className="text-lg font-semibold"
              style={{ color: predictedArchetype.color }}
            >
              {predictedArchetype.name}
            </span>
            <span className="text-[10px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
              Emerging
            </span>
          </div>
        ) : (
          <p className="text-sm text-white/40">Answer more questions...</p>
        )}
      </div>

      {/* Quadrant Grid */}
      <div className="relative aspect-square w-full max-w-[280px] mx-auto">
        {/* Grid background */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[1px] bg-white/5 rounded-lg overflow-hidden">
          {/* Top Left - Curious Optimizer */}
          <div
            className={`relative transition-all duration-400 ${
              activeQuadrant === 'topLeft' && hasEnoughData ? 'scale-[1.02]' : ''
            }`}
            style={{
              backgroundColor: activeQuadrant === 'topLeft' && hasEnoughData
                ? `${QUADRANTS.topLeft.color}15`
                : 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="absolute inset-0 p-2 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] md:text-xs font-medium text-white/60 mb-0.5">Curious</span>
              <span className="text-[11px] md:text-xs text-white/50">Optimizer</span>
            </div>
            {activeQuadrant === 'topLeft' && hasEnoughData && (
              <div
                className="absolute inset-0 rounded-tl-lg animate-pulse"
                style={{
                  boxShadow: `inset 0 0 20px ${QUADRANTS.topLeft.color}20`,
                }}
              />
            )}
          </div>

          {/* Top Right - AI Power User */}
          <div
            className={`relative transition-all duration-400 ${
              activeQuadrant === 'topRight' && hasEnoughData ? 'scale-[1.02]' : ''
            }`}
            style={{
              backgroundColor: activeQuadrant === 'topRight' && hasEnoughData
                ? `${QUADRANTS.topRight.color}15`
                : 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="absolute inset-0 p-2 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] md:text-xs font-medium text-white/60 mb-0.5">AI Power</span>
              <span className="text-[11px] md:text-xs text-white/50">User</span>
            </div>
            {activeQuadrant === 'topRight' && hasEnoughData && (
              <div
                className="absolute inset-0 rounded-tr-lg animate-pulse"
                style={{
                  boxShadow: `inset 0 0 20px ${QUADRANTS.topRight.color}20`,
                }}
              />
            )}
          </div>

          {/* Bottom Left - Cautious Observer */}
          <div
            className={`relative transition-all duration-400 ${
              activeQuadrant === 'bottomLeft' && hasEnoughData ? 'scale-[1.02]' : ''
            }`}
            style={{
              backgroundColor: activeQuadrant === 'bottomLeft' && hasEnoughData
                ? `${QUADRANTS.bottomLeft.color}15`
                : 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="absolute inset-0 p-2 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] md:text-xs font-medium text-white/60 mb-0.5">Cautious</span>
              <span className="text-[11px] md:text-xs text-white/50">Observer</span>
            </div>
            {activeQuadrant === 'bottomLeft' && hasEnoughData && (
              <div
                className="absolute inset-0 rounded-bl-lg animate-pulse"
                style={{
                  boxShadow: `inset 0 0 20px ${QUADRANTS.bottomLeft.color}20`,
                }}
              />
            )}
          </div>

          {/* Bottom Right - Strategic Delegator */}
          <div
            className={`relative transition-all duration-400 ${
              activeQuadrant === 'bottomRight' && hasEnoughData ? 'scale-[1.02]' : ''
            }`}
            style={{
              backgroundColor: activeQuadrant === 'bottomRight' && hasEnoughData
                ? `${QUADRANTS.bottomRight.color}15`
                : 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="absolute inset-0 p-2 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] md:text-xs font-medium text-white/60 mb-0.5">Strategic</span>
              <span className="text-[11px] md:text-xs text-white/50">Delegator</span>
            </div>
            {activeQuadrant === 'bottomRight' && hasEnoughData && (
              <div
                className="absolute inset-0 rounded-br-lg animate-pulse"
                style={{
                  boxShadow: `inset 0 0 20px ${QUADRANTS.bottomRight.color}20`,
                }}
              />
            )}
          </div>
        </div>

        {/* Crosshairs at 50/50 */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical line at 50% opportunity */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white/10"
            style={{ left: '50%' }}
          />
          {/* Horizontal line at 50% readiness */}
          <div
            className="absolute left-0 right-0 h-px bg-white/10"
            style={{ top: '50%' }}
          />
        </div>

        {/* Position dot */}
        {hasEnoughData && (
          <div
            className="absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-out"
            style={{
              left: `${dotX}%`,
              top: `${dotY}%`,
              backgroundColor: 'white',
              boxShadow: predictedArchetype
                ? `0 0 12px 4px ${predictedArchetype.color}, 0 0 24px 8px ${predictedArchetype.color}40`
                : '0 0 12px 4px rgba(255,255,255,0.5)',
            }}
          >
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                backgroundColor: predictedArchetype?.color || 'white',
                opacity: 0.4,
              }}
            />
          </div>
        )}

        {/* Axis Labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-white/50">
          <span>Low Opp.</span>
          <span>High Opp.</span>
        </div>
        <div className="absolute -left-1 top-0 bottom-0 flex flex-col justify-between text-xs text-white/50 transform -translate-x-full pr-2">
          <span className="transform -rotate-90 origin-right translate-y-6">High Ready</span>
          <span className="transform -rotate-90 origin-right -translate-y-6">Low Ready</span>
        </div>
      </div>

      {/* Score Display */}
      {hasEnoughData && (
        <div className="mt-6 flex justify-center gap-6 text-center">
          <div>
            <span className="text-xs text-white/40 block mb-1">Readiness</span>
            <span className="text-lg font-semibold text-white">{readiness}</span>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <span className="text-xs text-white/40 block mb-1">Opportunity</span>
            <span className="text-lg font-semibold text-white">{opportunity}</span>
          </div>
        </div>
      )}

      {/* Archetype Hook */}
      {hasEnoughData && predictedArchetype && (
        <p
          className="mt-4 text-center text-xs italic"
          style={{ color: `${predictedArchetype.color}80` }}
        >
          &quot;{predictedArchetype.hook}&quot;
        </p>
      )}
    </div>
  );
}

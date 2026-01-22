'use client';

import { Archetype, AxisScores } from '@/types/assessment';

interface ArchetypeQuadrantProps {
  axisScores: AxisScores;
  predictedArchetype: Archetype | null;
  totalAnswered: number;
}

// Archetype definitions for the quadrants
const QUADRANTS = {
  topRight: {
    name: 'Apex Integrator' as const,
    hook: 'AI is our competitive moat',
    color: '#7c3aed',
  },
  topLeft: {
    name: 'Visionary Architect' as const,
    hook: 'We know where we\'re going',
    color: '#3b82f6',
  },
  bottomRight: {
    name: 'Tactical Powerhouse' as const,
    hook: 'We are an execution machine',
    color: '#f59e0b',
  },
  bottomLeft: {
    name: 'Calculated Scout' as const,
    hook: 'We measure twice, cut once',
    color: '#64748b',
  },
};

export default function ArchetypeQuadrant({
  axisScores,
  predictedArchetype,
  totalAnswered,
}: ArchetypeQuadrantProps) {
  const { vision, ops } = axisScores;
  const THRESHOLD = 50;

  // Determine which quadrant is active
  const activeQuadrant = vision >= THRESHOLD && ops >= THRESHOLD
    ? 'topRight'
    : vision >= THRESHOLD && ops < THRESHOLD
    ? 'topLeft'
    : vision < THRESHOLD && ops >= THRESHOLD
    ? 'bottomRight'
    : 'bottomLeft';

  // Calculate dot position (0-100 scale mapped to grid)
  // Clamp between 5-95 to keep dot visible within bounds
  const dotX = Math.max(5, Math.min(95, ops));
  const dotY = Math.max(5, Math.min(95, 100 - vision)); // Invert Y since CSS Y goes down

  const hasEnoughData = totalAnswered >= 3;

  return (
    <div className="bg-[#0c0c10] rounded-xl border border-white/10 p-4 overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">
          AI Archetype
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
              Predicted
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
          {/* Top Left - Visionary Architect */}
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
              <span className="text-[10px] font-medium text-white/40 mb-0.5">Visionary</span>
              <span className="text-[10px] text-white/40">Architect</span>
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

          {/* Top Right - Apex Integrator */}
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
              <span className="text-[10px] font-medium text-white/40 mb-0.5">Apex</span>
              <span className="text-[10px] text-white/40">Integrator</span>
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

          {/* Bottom Left - Calculated Scout */}
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
              <span className="text-[10px] font-medium text-white/40 mb-0.5">Calculated</span>
              <span className="text-[10px] text-white/40">Scout</span>
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

          {/* Bottom Right - Tactical Powerhouse */}
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
              <span className="text-[10px] font-medium text-white/40 mb-0.5">Tactical</span>
              <span className="text-[10px] text-white/40">Powerhouse</span>
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
          {/* Vertical line at 50% ops */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white/10"
            style={{ left: '50%' }}
          />
          {/* Horizontal line at 50% vision */}
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
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-white/30">
          <span>Low Ops</span>
          <span>High Ops</span>
        </div>
        <div className="absolute -left-1 top-0 bottom-0 flex flex-col justify-between text-[10px] text-white/30 transform -translate-x-full pr-1">
          <span className="transform -rotate-90 origin-right translate-y-4">High Vision</span>
          <span className="transform -rotate-90 origin-right -translate-y-4">Low Vision</span>
        </div>
      </div>

      {/* Score Display */}
      {hasEnoughData && (
        <div className="mt-6 flex justify-center gap-6 text-center">
          <div>
            <span className="text-xs text-white/40 block mb-1">Vision</span>
            <span className="text-lg font-semibold text-white">{vision}</span>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <span className="text-xs text-white/40 block mb-1">Ops</span>
            <span className="text-lg font-semibold text-white">{ops}</span>
          </div>
        </div>
      )}

      {/* Archetype Hook */}
      {hasEnoughData && predictedArchetype && (
        <p
          className="mt-4 text-center text-xs italic"
          style={{ color: `${predictedArchetype.color}80` }}
        >
          "{predictedArchetype.hook}"
        </p>
      )}
    </div>
  );
}

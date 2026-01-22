import { Archetype } from '@/types/assessment';
import { CheckCircle, Zap, TrendingUp, Shield } from 'lucide-react';

interface ArchetypeCardProps {
  archetype: Archetype;
  overallScore: number;
}

export default function ArchetypeCard({ archetype, overallScore }: ArchetypeCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0c0c10] border border-white/10 p-6 md:p-8 shadow-2xl">
      {/* Background Glow */}
      <div 
        className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: archetype.color }}
      />
      
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            2026 Certified Archetype
          </span>
          <div className="flex items-center gap-1 text-yellow-500">
            <span className="text-sm font-bold">{overallScore}/100</span>
          </div>
        </div>

        <h2 className="mb-2 text-3xl md:text-4xl font-bold text-white tracking-tight">
          {archetype.name}
        </h2>
        
        <p className="mb-6 text-lg font-medium" style={{ color: archetype.color }}>
          "{archetype.hook}"
        </p>

        <div className="mb-8 rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/5">
          <p className="text-gray-300 leading-relaxed">
            {archetype.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-yellow-400 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-white">Power Move</h4>
              <p className="text-xs text-gray-400">Leverage your ops strength</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-400 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-white">Risk Factor</h4>
              <p className="text-xs text-gray-400">Strategic blindspots</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

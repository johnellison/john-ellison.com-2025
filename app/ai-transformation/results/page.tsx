'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResultsDashboard from '@/components/ResultsDashboard';
import { AssessmentResult } from '@/types/assessment';

export default function ResultsPage() {
  const [report, setReport] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get report from localStorage
    const stored = localStorage.getItem('assessmentReport');
    if (stored) {
      try {
        setReport(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse report:', e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#050507] flex flex-col items-center justify-center text-white px-4">
        <h1 className="heading-subsection mb-4">No Report Found</h1>
        <p className="type-base text-white/60 mb-8 text-center max-w-md">
          It looks like you haven't completed an assessment yet, or your results have expired.
        </p>
        <button
          onClick={() => router.push('/ai-transformation')}
          className="btn-primary"
        >
          Take the Assessment
        </button>
      </div>
    );
  }

  return <ResultsDashboard result={report} />;
}

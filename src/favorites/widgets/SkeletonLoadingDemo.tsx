import { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, RefreshCw, FileText, Calendar, Tag } from 'lucide-react';

const SkeletonLoadingDemo = () => {
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reload = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLoading(true);
    timerRef.current = setTimeout(() => setLoading(false), 2000);
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLoading(false);
  }, []);

  // cleanup
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-gray-400">Reload triggers a 2-second loading state</p>
        <div className="flex gap-2">
          <button
            onClick={reload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Reload
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {loading ? (
        // Skeleton state
        <div className="rounded-xl border-2 border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gray-200 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 rounded bg-gray-200 animate-pulse w-2/3" />
              <div className="h-3 rounded bg-gray-200 animate-pulse w-1/3" />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-3 rounded bg-gray-200 animate-pulse w-full" />
            <div className="h-3 rounded bg-gray-200 animate-pulse w-full" />
            <div className="h-3 rounded bg-gray-200 animate-pulse w-4/5" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-6 w-24 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </div>
      ) : (
        // Loaded content
        <div className="rounded-xl border-2 border-gray-200 p-5 animate-pmt-reveal">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-base font-black text-gray-900">Design System Audit</p>
              <p className="text-xs text-gray-500">Research Report · 2026</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            This audit evaluates component consistency, accessibility coverage, and documentation completeness
            across the product. Findings are prioritized by impact and effort to guide remediation.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold">
              <Tag className="w-3 h-3" /> Components
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold">
              <Calendar className="w-3 h-3" /> Q4 Review
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold">
              <FileText className="w-3 h-3" /> 12 pages
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkeletonLoadingDemo;

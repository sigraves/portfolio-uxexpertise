import { useState, useCallback } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, SkipForward, Check, Search, Bell, BarChart3, Settings } from 'lucide-react';

interface TourStep {
  title: string;
  desc: string;
  target: string; // label of mock element
  icon: typeof Search;
  color: string;
  position: 'top' | 'bottom';
}

const steps: TourStep[] = [
  { title: 'Search', desc: 'Find anything fast. Press / to focus search from anywhere.', target: 'Search bar', icon: Search, color: '#0ea5e9', position: 'bottom' },
  { title: 'Notifications', desc: 'Stay on top of updates. The bell shows unread counts.', target: 'Bell icon', icon: Bell, color: '#f97316', position: 'bottom' },
  { title: 'Analytics', desc: 'Track engagement and conversion in real time.', target: 'Stats panel', icon: BarChart3, color: '#059669', position: 'top' },
  { title: 'Settings', desc: 'Customize your workspace, theme, and preferences here.', target: 'Settings gear', icon: Settings, color: '#8B5CF6', position: 'top' },
];

const GuidedOnboardingDemo = () => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const next = useCallback(() => {
    if (step < steps.length - 1) setStep(step + 1);
    else setCompleted(true);
  }, [step]);

  const back = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);
  const skip = useCallback(() => setCompleted(true), []);
  const reset = useCallback(() => {
    setStep(0);
    setCompleted(false);
  }, []);

  if (completed) {
    return (
      <div className="text-center py-6 animate-pmt-reveal">
        <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-teal-600" />
        </div>
        <p className="text-lg font-black text-gray-900 mb-1">You're all set! 🎉</p>
        <p className="text-sm text-gray-500 mb-5">You completed the onboarding tour.</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart Tour
        </button>
      </div>
    );
  }

  const current = steps[step];
  const Icon = current.icon;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">Step {step + 1} of {steps.length}</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart
        </button>
      </div>

      {/* Mock UI */}
      <div className="relative rounded-xl border-2 border-gray-200 bg-gray-50 p-4 overflow-visible">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gray-200" />
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border-2 transition-all ${step === 0 ? 'border-sky-400 shadow-md' : 'border-gray-200'}`}
            >
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-400">Search…</span>
              {step === 0 && <span className="absolute -inset-1 rounded-lg border-2 border-sky-400 animate-pulse pointer-events-none" />}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`relative w-8 h-8 rounded-lg bg-white border-2 flex items-center justify-center transition-all ${step === 1 ? 'border-orange-400 shadow-md' : 'border-gray-200'}`}>
              <Bell className="w-4 h-4 text-gray-500" />
              {step === 1 && <span className="absolute -inset-1 rounded-lg border-2 border-orange-400 animate-pulse pointer-events-none" />}
            </div>
            <div className={`relative w-8 h-8 rounded-lg bg-white border-2 flex items-center justify-center transition-all ${step === 3 ? 'border-violet-400 shadow-md' : 'border-gray-200'}`}>
              <Settings className="w-4 h-4 text-gray-500" />
              {step === 3 && <span className="absolute -inset-1 rounded-lg border-2 border-violet-400 animate-pulse pointer-events-none" />}
            </div>
          </div>
        </div>
        {/* Stats panel */}
        <div className={`relative rounded-lg bg-white border-2 p-3 transition-all ${step === 2 ? 'border-emerald-400 shadow-md' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            <div className="h-2.5 w-20 rounded bg-gray-200" />
          </div>
          <div className="flex items-end gap-1 h-10">
            {[40, 65, 50, 80, 55].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gray-200" style={{ height: `${h}%` }} />
            ))}
          </div>
          {step === 2 && <span className="absolute -inset-1 rounded-lg border-2 border-emerald-400 animate-pulse pointer-events-none" />}
        </div>

        {/* Tooltip */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-64 rounded-xl bg-gray-900 p-4 shadow-xl z-10 animate-pmt-reveal"
          style={current.position === 'bottom' ? { top: 'calc(100% + 12px)' } : { bottom: 'calc(100% + 12px)' }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${current.color}30` }}>
              <Icon className="w-4.5 h-4.5" style={{ color: current.color }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-black text-white">{current.title}</p>
              <p className="text-xs text-gray-300 leading-relaxed mt-0.5">{current.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 my-5">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            aria-label={`Go to step ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === step ? 'w-6 bg-teal-600' : i < step ? 'w-2 bg-teal-400' : 'w-2 bg-gray-300'}`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={skip}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <SkipForward className="w-3.5 h-3.5" /> Skip
        </button>
        <div className="flex gap-2">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back
          </button>
          <button
            onClick={next}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
          >
            {step === steps.length - 1 ? (
              <><Check className="w-3.5 h-3.5" /> Finish</>
            ) : (
              <>Next <ChevronRight className="w-3.5 h-3.5" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidedOnboardingDemo;

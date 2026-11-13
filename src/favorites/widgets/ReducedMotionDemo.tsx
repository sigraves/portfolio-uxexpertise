import { useState } from 'react';
import { RotateCcw, Wind, Pause } from 'lucide-react';

const ReducedMotionDemo = () => {
  const [reduced, setReduced] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const dataAttr = reduced ? 'true' : 'false';

  return (
    <div data-reduced-motion={dataAttr}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <button
          onClick={() => setReduced((v) => !v)}
          aria-pressed={reduced}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          style={{ backgroundColor: reduced ? '#0ea5e915' : '#f3f4f6', color: reduced ? '#0284c7' : '#6b7280', border: `2px solid ${reduced ? '#0ea5e9' : '#e5e7eb'}` }}
        >
          {reduced ? <Wind className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          {reduced ? 'Reduced motion: ON' : 'Reduced motion: OFF'}
        </button>
        <button onClick={() => { setReduced(false); setPanelOpen(false); }} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-4 px-3 py-2 rounded-lg bg-sky-50 border border-sky-100" aria-live="polite">
        {reduced
          ? 'Motion is simplified: balls drop instantly, spinners show a static indicator, panels appear without sliding.'
          : 'Full motion is enabled. Toggle reduced motion to see animations collapse to instant state changes.'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* bouncing ball */}
        <div className="rounded-xl border-2 border-gray-100 p-3 flex flex-col items-center justify-end h-36 bg-gray-50/50">
          <div className="rm-ball" style={reduced ? { transform: 'translateY(60px)' } : undefined} />
          <p className="text-[10px] font-bold text-gray-400 mt-2">Bouncing ball</p>
        </div>

        {/* spinner */}
        <div className="rounded-xl border-2 border-gray-100 p-3 flex flex-col items-center justify-center h-36 bg-gray-50/50">
          {reduced ? (
            <div className="w-8 h-8 rounded-full border-4 border-teal-200 border-t-teal-600" />
          ) : (
            <div className="rm-spinner" />
          )}
          <p className="text-[10px] font-bold text-gray-400 mt-2">Loading spinner</p>
        </div>

        {/* sliding panel */}
        <div className="rounded-xl border-2 border-gray-100 p-3 flex flex-col items-center justify-center h-36 bg-gray-50/50 relative overflow-hidden">
          <button
            onClick={() => setPanelOpen((v) => !v)}
            className="text-xs font-bold text-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded px-2 py-1"
          >
            {panelOpen ? 'Hide panel' : 'Show panel'}
          </button>
          <div className={`rm-panel ${panelOpen ? 'rm-panel-open' : ''}`} style={reduced ? { transition: 'none' } : undefined}>
            <p className="text-[10px] font-bold text-white">Sliding panel</p>
          </div>
          <p className="text-[10px] font-bold text-gray-400 mt-2">Sliding panel</p>
        </div>
      </div>

      <style>{`
        @keyframes rm-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(60px)} }
        .rm-ball { width:20px;height:20px;border-radius:9999px;background:#0ea5e9;animation:rm-bounce 1s ease-in-out infinite; }
        [data-reduced-motion="true"] .rm-ball { animation:none; }
        @keyframes rm-spin { to { transform:rotate(360deg) } }
        .rm-spinner { width:32px;height:32px;border-radius:9999px;border:4px solid #d1fae5;border-top-color:#0d9488;animation:rm-spin 0.8s linear infinite; }
        .rm-panel { position:absolute;top:0;left:0;right:0;background:#0d9488;padding:6px 10px;transform:translateY(-100%);transition:transform 0.4s ease;border-radius:6px 6px 0 0; }
        .rm-panel-open { transform:translateY(0); }
        [data-reduced-motion="true"] .rm-panel { transition:none; }
        @media (prefers-reduced-motion: reduce) {
          .rm-ball { animation:none;transform:translateY(60px); }
          .rm-spinner { animation:none; }
          .rm-panel { transition:none; }
        }
      `}</style>
    </div>
  );
};

export default ReducedMotionDemo;

import { useState, useCallback } from 'react';
import { Play, ChevronLeft, ChevronRight, MousePointerClick, Flag, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

interface Frame {
  label: string;
  status: 'success' | 'struggle';
  cursor: { x: number; y: number };
  target: { x: number; y: number; label: string };
  mock: 'search' | 'results' | 'detail' | 'cart';
  note: string;
}

const frames: Frame[] = [
  { label: 'Lands on homepage', status: 'success', cursor: { x: 50, y: 50 }, target: { x: 50, y: 12, label: 'Search bar' }, mock: 'search', note: 'User locates the search bar quickly. Good visual hierarchy guides the eye.' },
  { label: 'Searches for a product', status: 'success', cursor: { x: 50, y: 12 }, target: { x: 20, y: 40, label: 'First result' }, mock: 'results', note: 'Typing a query returns relevant results. Auto-complete reduces effort.' },
  { label: 'Tries to add to cart', status: 'struggle', cursor: { x: 20, y: 40 }, target: { x: 78, y: 88, label: 'Add to cart' }, mock: 'detail', note: 'The Add to Cart button is below the fold. User scrolls past it twice before finding it.' },
  { label: 'Proceeds to checkout', status: 'struggle', cursor: { x: 78, y: 88 }, target: { x: 88, y: 14, label: 'Checkout' }, mock: 'cart', note: 'Checkout link is buried in a menu. User hovers several items before discovering it.' },
];

const mocks: Record<Frame['mock'], React.ReactNode> = {
  search: <div className="h-6 rounded border-2 border-teal-400 bg-teal-50 flex items-center px-2 text-[9px] text-teal-700 font-bold">Search products...</div>,
  results: (
    <div className="space-y-1.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2 h-8 rounded bg-gray-50 px-2">
          <div className="w-6 h-6 rounded bg-gray-200" />
          <div className="flex-1 h-2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  ),
  detail: (
    <div className="space-y-1.5">
      <div className="h-16 rounded bg-gray-50" />
      <div className="h-2 rounded bg-gray-200 w-3/4" />
      <div className="h-2 rounded bg-gray-200 w-1/2" />
      <div className="h-6 rounded bg-gray-200 w-1/3" />
    </div>
  ),
  cart: (
    <div className="space-y-1.5">
      <div className="h-2 rounded bg-gray-200 w-1/3" />
      <div className="h-12 rounded bg-gray-50" />
      <div className="h-6 rounded bg-teal-100 w-1/4" />
    </div>
  ),
};

const UsabilitySimulatorDemo = () => {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  const step = useCallback((dir: number) => {
    setIdx((p) => Math.max(0, Math.min(p + dir, frames.length - 1)));
    setShowFlag(false);
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    setIdx(0);
    setShowFlag(false);
    setPlaying(true);
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      if (i >= frames.length) { clearInterval(timer); setPlaying(false); setIdx(frames.length - 1); }
      else setIdx(i);
    }, 1300);
  }, []);

  const frame = frames[idx];
  const StatusIcon = frame.status === 'success' ? CheckCircle2 : AlertCircle;
  const color = frame.status === 'success' ? '#059669' : '#dc2626';

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={play} disabled={playing} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors disabled:opacity-50">
          <Play className="w-3.5 h-3.5" /> {playing ? 'Playing...' : 'Play Test'}
        </button>
        <div className="flex items-center gap-1.5">
          <button onClick={() => step(-1)} disabled={idx === 0} aria-label="Previous frame" className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-40">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-xs font-bold text-gray-500 w-14 text-center">{idx + 1} / {frames.length}</span>
          <button onClick={() => step(1)} disabled={idx === frames.length - 1} aria-label="Next frame" className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-40">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="relative rounded-xl border-2 border-gray-200 bg-white overflow-hidden mb-3" style={{ height: '200px' }} role="img" aria-label={`Frame: ${frame.label}`}>
        <div className="absolute top-0 inset-x-0 h-7 bg-gray-100 flex items-center px-2 gap-1">
          <div className="w-2 h-2 rounded-full bg-gray-300" /><div className="w-2 h-2 rounded-full bg-gray-300" /><div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="flex-1 h-3 rounded bg-gray-200 ml-2" />
        </div>
        <div className="absolute inset-0 pt-8 p-3">{mocks[frame.mock]}</div>
        <div className="absolute w-5 h-5 rounded-full border-2 border-dashed flex items-center justify-center pointer-events-none" style={{ left: `${frame.target.x}%`, top: `${frame.target.y}%`, transform: 'translate(-50%, -50%)', borderColor: color }}>
          <span className="text-[8px] font-black" style={{ color }}>T</span>
        </div>
        <div className="absolute transition-all duration-700 ease-in-out pointer-events-none" style={{ left: `${frame.cursor.x}%`, top: `${frame.cursor.y}%`, transform: 'translate(-50%, -50%)' }}>
          <MousePointerClick className="w-5 h-5 text-gray-700 fill-white" />
        </div>
        {frame.status === 'struggle' && (
          <button onClick={() => setShowFlag((v) => !v)} aria-label="View flagged moment" className="absolute top-1 right-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: color }}>
            <Flag className="w-2.5 h-2.5" /> Flag
          </button>
        )}
      </div>

      <div className="rounded-xl p-3 animate-pmt-reveal" style={{ backgroundColor: `${color}08`, border: `2px solid ${color}25` }}>
        <div className="flex items-center gap-2 mb-1">
          <StatusIcon className="w-4 h-4" style={{ color }} />
          <span className="text-sm font-bold text-gray-900">{frame.label}</span>
          <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={{ backgroundColor: `${color}15`, color }}>{frame.status}</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {showFlag ? frame.note : `Target: ${frame.target.label}. ${frame.status === 'struggle' ? 'Click the Flag to see what went wrong.' : 'Smooth interaction.'}`}
        </p>
      </div>

      {playing && (
        <button onClick={() => setPlaying(false)} className="mt-2 inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600">
          <RotateCcw className="w-3 h-3" /> Stop playback
        </button>
      )}
    </div>
  );
};

export default UsabilitySimulatorDemo;

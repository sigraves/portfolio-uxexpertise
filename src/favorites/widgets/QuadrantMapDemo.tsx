import { useState, useCallback } from 'react';
import { RotateCcw, MousePointer2 } from 'lucide-react';

type Cat = 'feature' | 'issue';

interface Point {
  id: string;
  label: string;
  x: number; // 0-100
  y: number; // 0-100
  cat: Cat;
}

const points: Point[] = [
  { id: 'P1', label: 'Onboarding Flow', x: 22, y: 78, cat: 'feature' },
  { id: 'P2', label: 'Search Relevance', x: 68, y: 62, cat: 'issue' },
  { id: 'P3', label: 'Dark Mode', x: 45, y: 35, cat: 'feature' },
  { id: 'P4', label: 'Slow Checkout', x: 80, y: 84, cat: 'issue' },
  { id: 'P5', label: 'Mobile Nav', x: 35, y: 88, cat: 'issue' },
  { id: 'P6', label: 'Live Chat', x: 88, y: 28, cat: 'feature' },
  { id: 'P7', label: 'Empty States', x: 15, y: 45, cat: 'issue' },
  { id: 'P8', label: 'Dashboard Widgets', x: 58, y: 18, cat: 'feature' },
];

const catMeta: Record<Cat, { label: string; color: string; bg: string }> = {
  feature: { label: 'Features', color: '#8b5cf6', bg: '#8b5cf620' },
  issue: { label: 'Issues', color: '#f97316', bg: '#f9731620' },
};

type Filter = 'all' | Cat;

const QuadrantMapDemo = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const reset = useCallback(() => {
    setFilter('all');
    setSelected(null);
    setHover(null);
  }, []);

  const visible = points.filter((p) => filter === 'all' || p.cat === filter);
  const active = points.find((p) => p.id === (hover ?? selected));

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-1.5" role="group" aria-label="Filter by category">
          {(['all', 'feature', 'issue'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                filter === f ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All' : catMeta[f as Cat].label}
            </button>
          ))}
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 bg-gray-50 rounded-xl p-6 min-h-[260px]">
          {/* axes */}
          <div className="absolute left-6 top-4 bottom-8 w-0.5 bg-gray-300" />
          <div className="absolute left-6 right-4 bottom-8 h-0.5 bg-gray-300" />
          {/* axis labels */}
          <span className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-gray-400 origin-center">Y →</span>
          <span className="absolute right-2 bottom-1 text-[10px] font-bold text-gray-400">X →</span>
          <span className="absolute left-7 bottom-9 text-[9px] font-semibold text-gray-300">0</span>

          {/* points */}
          {visible.map((p) => {
            const meta = catMeta[p.cat];
            const isActive = (hover ?? selected) === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
                onMouseEnter={() => setHover(p.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(p.id)}
                onBlur={() => setHover(null)}
                aria-label={`${p.label}: X ${p.x}, Y ${p.y}`}
                aria-pressed={selected === p.id}
                className="absolute rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                style={{
                  left: `calc(${(p.x / 100) * 94 + 6}% - ${isActive ? 10 : 7}px)`,
                  top: `calc(${(1 - p.y / 100) * 82 + 8}% - ${isActive ? 10 : 7}px)`,
                  width: isActive ? 20 : 14,
                  height: isActive ? 20 : 14,
                  backgroundColor: meta.color,
                  border: '2px solid #fff',
                  boxShadow: isActive ? `0 0 0 3px ${meta.color}50` : `0 1px 3px ${meta.color}40`,
                  // focus ring color
                  ['--tw-ring-color' as string]: meta.color,
                }}
              />
            );
          })}

          {active && (
            <div
              className="absolute z-10 px-2.5 py-1.5 rounded-lg bg-gray-800 text-white text-[11px] font-bold pointer-events-none whitespace-nowrap shadow-lg"
              style={{
                left: `calc(${(active.x / 100) * 94 + 6}% + 14px)`,
                top: `calc(${(1 - active.y / 100) * 82 + 8}% - 22px)`,
              }}
            >
              {active.label}
            </div>
          )}
        </div>

        {/* detail panel */}
        <div className="sm:w-44 flex-shrink-0">
          {active ? (
            <div className="rounded-xl p-3" style={{ backgroundColor: catMeta[active.cat].bg, border: `2px solid ${catMeta[active.cat].color}30` }}>
              <div className="flex items-center gap-1.5 mb-2">
                <MousePointer2 className="w-3.5 h-3.5" style={{ color: catMeta[active.cat].color }} />
                <span className="text-xs font-bold text-gray-700">{active.id}</span>
              </div>
              <p className="text-sm font-bold text-gray-800 mb-2">{active.label}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">Category</span>
                  <span className="font-bold capitalize" style={{ color: catMeta[active.cat].color }}>{active.cat}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">X axis</span>
                  <span className="font-bold text-gray-700">{active.x}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">Y axis</span>
                  <span className="font-bold text-gray-700">{active.y}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl p-3 bg-gray-50 border-2 border-dashed border-gray-200 text-center">
              <p className="text-[11px] text-gray-400">Click or focus a point to see its details.</p>
            </div>
          )}
          <div className="flex flex-col gap-1.5 mt-3">
            {(Object.keys(catMeta) as Cat[]).map((c) => (
              <div key={c} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: catMeta[c].color }} />
                {catMeta[c].label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuadrantMapDemo;

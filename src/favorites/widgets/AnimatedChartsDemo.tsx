import { useState, useCallback } from 'react';
import { BarChart3, LineChart, Donut, RotateCcw, Sparkles } from 'lucide-react';

type ChartType = 'bar' | 'line' | 'donut';

const data = [
  { label: 'Mon', value: 42 }, { label: 'Tue', value: 68 }, { label: 'Wed', value: 55 },
  { label: 'Thu', value: 90 }, { label: 'Fri', value: 73 },
];

const types: { id: ChartType; label: string; icon: typeof BarChart3 }[] = [
  { id: 'bar', label: 'Bar', icon: BarChart3 },
  { id: 'line', label: 'Line', icon: LineChart },
  { id: 'donut', label: 'Donut', icon: Donut },
];

const V = '#8b5cf6';
const VH = '#7c3aed';

const AnimatedChartsDemo = () => {
  const [type, setType] = useState<ChartType>('bar');
  const [drawn, setDrawn] = useState(false);
  const [tick, setTick] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const animate = useCallback(() => {
    setDrawn(false);
    setHover(null);
    window.setTimeout(() => { setTick((t) => t + 1); setDrawn(true); }, 30);
  }, []);

  const reset = useCallback(() => { setDrawn(false); setHover(null); }, []);
  const clearHover = () => setHover(null);

  const total = data.reduce((s, d) => s + d.value, 0);
  const max = Math.max(...data.map((d) => d.value));
  const R = 60, C = 2 * Math.PI * R, W = 280, H = 160;
  const pts = data.map((d, i) => {
    const x = 24 + (i * (W - 48)) / (data.length - 1);
    const y = H - 16 - ((H - 40) * d.value) / max;
    return `${x},${y}`;
  }).join(' ');

  const tabBtn = (active: boolean) =>
    `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
      active ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-1.5" role="tablist" aria-label="Chart type">
          {types.map((t) => { const Icon = t.icon; return (
            <button key={t.id} role="tab" aria-selected={type === t.id}
              onClick={() => { setType(t.id); setDrawn(false); setHover(null); }}
              className={tabBtn(type === t.id)}>
              <Icon className="w-3.5 h-3.5" /> {t.label}
            </button>); })}
        </div>
        <div className="flex gap-2">
          <button onClick={animate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors">
            <Sparkles className="w-3.5 h-3.5" /> Animate
          </button>
          <button onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 min-h-[200px] flex items-center justify-center">
        {type === 'bar' && (
          <div className="flex items-end justify-around gap-3 w-full max-w-xs h-40 relative" key={tick}>
            {data.map((d, i) => (
              <div key={d.label} className="flex-1 flex flex-col items-center justify-end h-full">
                <div role="img" tabIndex={0} aria-label={`${d.label}: ${d.value}`}
                  onMouseEnter={() => setHover(i)} onMouseLeave={clearHover}
                  onFocus={() => setHover(i)} onBlur={clearHover}
                  className="w-full rounded-t-md transition-all duration-700 ease-out cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  style={{ height: drawn ? `${(d.value / max) * 100}%` : '0%', backgroundColor: hover === i ? VH : V }} />
                {hover === i && (
                  <div className="absolute top-1 px-2 py-1 bg-gray-800 text-white text-[10px] font-bold rounded shadow-lg z-10 pointer-events-none">{d.value}</div>
                )}
                <span className="text-[10px] text-gray-400 mt-1 font-semibold">{d.label}</span>
              </div>
            ))}
          </div>
        )}

        {type === 'line' && (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm h-40" key={tick}>
            <line x1="24" y1={H - 16} x2={W - 24} y2={H - 16} stroke="#e5e7eb" strokeWidth="1" />
            {data.map((d, i) => {
              const x = 24 + (i * (W - 48)) / (data.length - 1);
              const y = H - 16 - ((H - 40) * d.value) / max;
              return (
                <g key={d.label}>
                  <circle cx={x} cy={drawn ? y : H - 16} r={hover === i ? 5 : 4}
                    fill={hover === i ? VH : V}
                    onMouseEnter={() => setHover(i)} onMouseLeave={clearHover}
                    className="transition-all duration-700 ease-out" style={{ transitionDelay: `${i * 120}ms` }} />
                  <text x={x} y={H - 4} textAnchor="middle" className="fill-gray-400" style={{ fontSize: 9 }}>{d.label}</text>
                  {hover === i && (
                    <text x={x} y={y - 10} textAnchor="middle" className="fill-gray-800 font-bold" style={{ fontSize: 11 }}>{d.value}</text>
                  )}
                </g>);
            })}
            <polyline points={pts} fill="none" stroke={V} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: drawn ? 0 : 1, transition: 'stroke-dashoffset 1.2s ease-out' }} />
          </svg>
        )}

        {type === 'donut' && (
          <div className="relative" key={tick}>
            <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
              {data.map((d, i) => {
                const frac = d.value / total;
                const offset = data.slice(0, i).reduce((s, x) => s + x.value / total, 0) * C;
                return (
                  <circle key={d.label} cx="80" cy="80" r={R} fill="none"
                    stroke={hover === i ? VH : V} strokeWidth="18"
                    strokeDasharray={`${drawn ? frac * C : 0} ${C}`} strokeDashoffset={-offset}
                    onMouseEnter={() => setHover(i)} onMouseLeave={clearHover}
                    className="transition-all duration-700 ease-out cursor-pointer" style={{ transitionDelay: `${i * 120}ms` }} />);
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-gray-800">{hover !== null ? data[hover].value : total}</span>
              <span className="text-[10px] text-gray-400 font-semibold">{hover !== null ? data[hover].label : 'Total'}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {data.map((d, i) => (
                <button key={d.label} onMouseEnter={() => setHover(i)} onMouseLeave={clearHover}
                  onFocus={() => setHover(i)} onBlur={clearHover}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: hover === i ? VH : V }} />{d.label}
                </button>))}
            </div>
          </div>
        )}
      </div>
      {!drawn && <p className="text-center text-xs text-gray-400 italic mt-3">Press Animate to draw the chart from zero.</p>}
    </div>
  );
};

export default AnimatedChartsDemo;

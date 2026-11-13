import { useState, useCallback } from 'react';
import { RotateCcw, Zap, Gem, DollarSign } from 'lucide-react';

const keys = ['speed', 'quality', 'cost'] as const;
type Key = (typeof keys)[number];

const meta: Record<Key, { label: string; color: string; icon: typeof Zap }> = {
  speed: { label: 'Speed', color: '#f97316', icon: Zap },
  quality: { label: 'Quality', color: '#6366F1', icon: Gem },
  cost: { label: 'Cost', color: '#14B8A6', icon: DollarSign },
};

const START: Record<Key, number> = { speed: 33, quality: 34, cost: 33 };

const TradeOffSimulatorDemo = () => {
  const [vals, setVals] = useState<Record<Key, number>>(START);

  const adjust = useCallback((key: Key, newVal: number) => {
    setVals((prev) => {
      const others = keys.filter((k) => k !== key);
      const remaining = 100 - newVal;
      const otherSum = others.reduce((s, k) => s + prev[k], 0) || 1;
      const first = Math.round((remaining * prev[others[0]]) / otherSum);
      return {
        ...prev,
        [key]: newVal,
        [others[0]]: first,
        [others[1]]: remaining - first,
      };
    });
  }, []);

  const reset = useCallback(() => setVals(START), []);

  const total = vals.speed + vals.quality + vals.cost || 1;
  // Barycentric coordinates inside the triangle
  const px = (vals.speed * 100 + vals.quality * 20 + vals.cost * 180) / total;
  const py = (vals.speed * 20 + vals.quality * 160 + vals.cost * 160) / total;
  const dominant = keys.reduce((a, b) => (vals[b] > vals[a] ? b : a));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          Balance leans toward{' '}
          <span className="font-bold" style={{ color: meta[dominant].color }}>
            {meta[dominant].label}
          </span>
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 items-center">
        {/* Balance triangle */}
        <svg
          viewBox="0 0 200 185"
          className="w-44 h-40 flex-shrink-0"
          role="img"
          aria-label={`Trade-off balance: Speed ${vals.speed}, Quality ${vals.quality}, Cost ${vals.cost}`}
        >
          <polygon points="100,25 25,160 175,160" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="2" />
          <text x="100" y="16" textAnchor="middle" fontSize="10" fill="#f97316" fontWeight="bold">Speed</text>
          <text x="18" y="178" textAnchor="middle" fontSize="10" fill="#6366F1" fontWeight="bold">Quality</text>
          <text x="182" y="178" textAnchor="middle" fontSize="10" fill="#14B8A6" fontWeight="bold">Cost</text>
          <circle cx={px} cy={py} r="8" fill={meta[dominant].color} stroke="white" strokeWidth="2.5">
            <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Sliders */}
        <div className="flex-1 w-full space-y-3">
          {keys.map((k) => {
            const Icon = meta[k].icon;
            return (
              <div key={k}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" style={{ color: meta[k].color }} />
                    {meta[k].label}
                  </span>
                  <span className="text-xs font-black text-gray-800 tabular-nums">{vals[k]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={vals[k]}
                  onChange={(e) => adjust(k, Number(e.target.value))}
                  className="w-full cursor-pointer"
                  style={{ accentColor: meta[k].color }}
                  aria-label={`${meta[k].label} value`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-[11px] text-gray-400 mt-3 italic">
        Increase one constraint and the others give way — the total always sums to ~100.
      </p>
    </div>
  );
};

export default TradeOffSimulatorDemo;

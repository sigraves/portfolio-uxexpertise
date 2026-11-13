import { useState, useCallback } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

interface Option {
  id: string;
  name: string;
  color: string;
}
interface Criterion {
  id: string;
  name: string;
}

const options: Option[] = [
  { id: 'A', name: 'Build in-house', color: '#6366F1' },
  { id: 'B', name: 'Buy SaaS tool', color: '#f97316' },
  { id: 'C', name: 'Use open-source', color: '#14B8A6' },
];

const criteria: Criterion[] = [
  { id: 'C1', name: 'Cost' },
  { id: 'C2', name: 'Speed to launch' },
  { id: 'C3', name: 'Scalability' },
];

const defaultWeights = { C1: 40, C2: 35, C3: 25 };
const defaultScores = {
  A: { C1: 2, C2: 4, C3: 5 },
  B: { C1: 3, C2: 5, C3: 3 },
  C: { C1: 5, C2: 3, C3: 4 },
};

const WeightedMatrixDemo = () => {
  const [weights, setWeights] = useState<Record<string, number>>(defaultWeights);
  const [scores, setScores] = useState<Record<string, Record<string, number>>>(defaultScores);

  const setWeight = useCallback((cid: string, v: number) => {
    setWeights((w) => ({ ...w, [cid]: v }));
  }, []);

  const setScore = useCallback((oid: string, cid: string, v: number) => {
    setScores((s) => ({ ...s, [oid]: { ...s[oid], [cid]: v } }));
  }, []);

  const reset = useCallback(() => {
    setWeights(defaultWeights);
    setScores(defaultScores);
  }, []);

  const totals = options.map((o) => ({
    id: o.id,
    total: criteria.reduce((sum, c) => sum + (weights[c.id] / 100) * (scores[o.id][c.id] ?? 1), 0),
  }));
  const bestId = totals.reduce((a, b) => (b.total > a.total ? b : a)).id;
  const maxPossible = (criteria.reduce((s, c) => s + weights[c.id], 0) / 100) * 5 || 1;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          Best:{' '}
          <span className="font-bold" style={{ color: options.find((o) => o.id === bestId)!.color }}>
            {options.find((o) => o.id === bestId)!.name}
          </span>
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full text-sm border-collapse min-w-[440px]">
          <thead>
            <tr>
              <th className="text-left text-xs font-bold text-gray-400 p-2 w-32">Option</th>
              {criteria.map((c) => (
                <th key={c.id} className="p-2 min-w-[120px] align-top">
                  <p className="text-xs font-bold text-gray-700 mb-1.5">{c.name}</p>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={weights[c.id]}
                      onChange={(e) => setWeight(c.id, Number(e.target.value))}
                      className="w-full accent-indigo-500"
                      aria-label={`${c.name} weight`}
                    />
                    <span className="text-[10px] font-bold text-gray-500 w-9 text-right">{weights[c.id]}%</span>
                  </div>
                </th>
              ))}
              <th className="text-xs font-bold text-gray-700 p-2 min-w-[90px] text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {options.map((o) => {
              const t = totals.find((x) => x.id === o.id)!.total;
              const isBest = o.id === bestId;
              return (
                <tr key={o.id} className={isBest ? 'bg-teal-50/70' : ''}>
                  <td className="p-2">
                    <span className="text-xs font-bold flex items-center gap-1" style={{ color: o.color }}>
                      {o.name}
                      {isBest && <Trophy className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                    </span>
                  </td>
                  {criteria.map((c) => (
                    <td key={c.id} className="p-2 text-center">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={scores[o.id][c.id]}
                        onChange={(e) =>
                          setScore(o.id, c.id, Math.max(1, Math.min(5, Number(e.target.value) || 1)))
                        }
                        className="w-12 text-center rounded-lg border border-gray-200 px-1 py-1 text-xs font-bold text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        aria-label={`${o.name} score for ${c.name}`}
                      />
                    </td>
                  ))}
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden min-w-[40px]">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${Math.min(100, (t / maxPossible) * 100)}%`, backgroundColor: o.color }}
                        />
                      </div>
                      <span className="text-xs font-black text-gray-800 w-10 text-right">{t.toFixed(2)}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-gray-400 mt-3 italic">
        Adjust the weight sliders to change criteria importance, then score each option 1–5.
      </p>
    </div>
  );
};

export default WeightedMatrixDemo;

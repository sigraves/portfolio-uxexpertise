import { useState, useCallback } from 'react';
import { RotateCcw, User } from 'lucide-react';

type QuadId = 'HH' | 'HL' | 'LH' | 'LL';

interface Stakeholder {
  id: string;
  name: string;
}

const stakeholders: Stakeholder[] = [
  { id: 'S1', name: 'CEO' },
  { id: 'S2', name: 'Product Lead' },
  { id: 'S3', name: 'Engineering' },
  { id: 'S4', name: 'Marketing' },
  { id: 'S5', name: 'Customer Support' },
  { id: 'S6', name: 'Legal' },
];

const quads: Record<QuadId, { label: string; strategy: string; color: string; bg: string }> = {
  HH: { label: 'Manage Closely', strategy: 'Engage regularly & co-create decisions.', color: '#be185d', bg: '#be185d0D' },
  HL: { label: 'Keep Satisfied', strategy: 'Keep informed with concise executive summaries.', color: '#f97316', bg: '#f973160D' },
  LH: { label: 'Keep Informed', strategy: 'Update via newsletters & demo sessions.', color: '#0ea5e9', bg: '#0ea5e90D' },
  LL: { label: 'Monitor', strategy: 'Watch passively with minimal effort.', color: '#14B8A6', bg: '#14B8A60D' },
};

// Grid reading order: top-left, top-right, bottom-left, bottom-right
// Interest: low (left) -> high (right). Influence: high (top) -> low (bottom).
const quadOrder: QuadId[] = ['HL', 'HH', 'LL', 'LH'];

const StakeholderMapDemo = () => {
  const [placements, setPlacements] = useState<{ id: string; quad: QuadId }[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const isPlaced = (id: string) => placements.some((p) => p.id === id);

  const place = useCallback((id: string, quad: QuadId) => {
    setPlacements((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      return [...filtered, { id, quad }];
    });
    setSelected(null);
  }, []);

  const reset = useCallback(() => {
    setPlacements([]);
    setSelected(null);
  }, []);

  const trayItems = stakeholders.filter((s) => !isPlaced(s.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          {placements.length} of {stakeholders.length} placed
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {trayItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {trayItems.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              aria-pressed={selected === s.id}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border-2 transition-all ${
                selected === s.id
                  ? 'border-teal-500 ring-2 ring-teal-400/40 bg-teal-50 text-teal-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-teal-400'
              }`}
            >
              <User className="w-3 h-3" /> {s.name}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-3 mb-2">
        <div className="flex flex-col items-center justify-between py-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 [writing-mode:vertical-rl] rotate-180">
            High Influence
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 [writing-mode:vertical-rl] rotate-180">
            Low Influence
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Low Interest</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">High Interest</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quadOrder.map((qId) => {
              const q = quads[qId];
              const placed = placements.filter((p) => p.quad === qId);
              return (
                <div
                  key={qId}
                  onClick={() => selected && place(selected, qId)}
                  onKeyDown={(e) => {
                    if (selected && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      place(selected, qId);
                    }
                  }}
                  role={selected ? 'button' : undefined}
                  tabIndex={selected ? 0 : undefined}
                  className="rounded-xl p-3 min-h-[110px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                  style={{ backgroundColor: q.bg, border: `2px solid ${q.color}25` }}
                >
                  <p className="text-xs font-black mb-0.5" style={{ color: q.color }}>{q.label}</p>
                  <p className="text-[10px] text-gray-400 mb-2 leading-snug">{q.strategy}</p>
                  <div className="flex flex-wrap gap-1">
                    {placed.map((p) => {
                      const s = stakeholders.find((st) => st.id === p.id)!;
                      return (
                        <span
                          key={p.id}
                          className="inline-flex items-center gap-1 rounded-full bg-white border px-2 py-0.5 text-[10px] font-bold text-gray-700"
                          style={{ borderColor: `${q.color}40` }}
                        >
                          <User className="w-2.5 h-2.5" style={{ color: q.color }} /> {s.name}
                        </span>
                      );
                    })}
                  </div>
                  {placed.length === 0 && <p className="text-[9px] text-gray-300 italic mt-1">Click to place</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {selected && (
        <p className="text-xs text-gray-400 italic mt-2">Click a quadrant to place the selected stakeholder.</p>
      )}
    </div>
  );
};

export default StakeholderMapDemo;

import { useState, useCallback } from 'react';
import { RotateCcw, GripVertical } from 'lucide-react';

type QuadrantId = 'Q1' | 'Q2' | 'Q3' | 'Q4';

interface Opportunity {
  id: string;
  title: string;
  short: string;
  correctQuadrant: QuadrantId;
}

const opportunities: Opportunity[] = [
  { id: 'O1', title: 'Fix Login Errors', short: 'Users hit confusing error messages on login.', correctQuadrant: 'Q1' },
  { id: 'O2', title: 'Add Onboarding Tour', short: 'New users need guidance to get started.', correctQuadrant: 'Q1' },
  { id: 'O3', title: 'Redesign Homepage', short: 'Full visual overhaul of the landing page.', correctQuadrant: 'Q4' },
  { id: 'O4', title: 'Accessibility Audit', short: 'Comprehensive WCAG remediation effort.', correctQuadrant: 'Q2' },
  { id: 'O5', title: 'Update FAQ Copy', short: 'Rewrite a few help articles for clarity.', correctQuadrant: 'Q3' },
];

const quadrants: Record<QuadrantId, { label: string; subtitle: string; color: string; bg: string }> = {
  Q1: { label: 'Quick Wins', subtitle: 'High Impact · Low Effort', color: '#059669', bg: '#0596690D' },
  Q2: { label: 'Major Projects', subtitle: 'High Impact · High Effort', color: '#f97316', bg: '#f973160D' },
  Q3: { label: 'Fill-Ins', subtitle: 'Low Impact · Low Effort', color: '#0ea5e9', bg: '#0ea5e90D' },
  Q4: { label: 'Reconsider', subtitle: 'Low Impact · High Effort', color: '#be185d', bg: '#be185d0D' },
};

const quadrantOrder: QuadrantId[] = ['Q1', 'Q2', 'Q3', 'Q4'];

const ImpactEffortMatrixDemo = () => {
  const [placements, setPlacements] = useState<{ id: string; quadrant: QuadrantId }[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const isPlaced = (id: string) => placements.some((p) => p.id === id);
  const allPlaced = placements.length === opportunities.length;

  const place = useCallback((id: string, quadrant: QuadrantId) => {
    setPlacements((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      return [...filtered, { id, quadrant }];
    });
    setSelected(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, quadrant: QuadrantId) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain') || draggedId;
      if (id) place(id, quadrant);
      setDraggedId(null);
    },
    [draggedId, place]
  );

  const reset = useCallback(() => {
    setPlacements([]);
    setSelected(null);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          {placements.length} of {opportunities.length} placed
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Unplaced cards */}
      {placements.length < opportunities.length && (
        <div className="flex flex-wrap gap-2 mb-4">
          {opportunities.filter((o) => !isPlaced(o.id)).map((o) => (
            <div
              key={o.id}
              draggable
              onDragStart={(e) => {
                setDraggedId(o.id);
                e.dataTransfer.setData('text/plain', o.id);
              }}
              onDragEnd={() => setDraggedId(null)}
              onClick={() => setSelected(selected === o.id ? null : o.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelected(selected === o.id ? null : o.id);
                }
              }}
              aria-pressed={selected === o.id}
              className={`rounded-lg px-3 py-2 bg-white border-2 cursor-grab active:cursor-grabbing transition-all ${
                selected === o.id ? 'border-teal-500 ring-2 ring-teal-400/40' : 'border-gray-200 hover:border-teal-400'
              } ${draggedId === o.id ? 'opacity-40' : ''}`}
            >
              <div className="flex items-center gap-2">
                <GripVertical className="w-3 h-3 text-gray-300" />
                <span className="text-xs font-bold text-gray-700">{o.title}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Matrix */}
      <div className="flex gap-3 mb-2">
        <div className="flex flex-col items-center justify-between py-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 [writing-mode:vertical-rl] rotate-180">High Impact</span>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 [writing-mode:vertical-rl] rotate-180">Low Impact</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Low Effort</span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">High Effort</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quadrantOrder.map((qId) => {
              const q = quadrants[qId];
              const placed = placements.filter((p) => p.quadrant === qId);
              return (
                <div
                  key={qId}
                  onDrop={(e) => handleDrop(e, qId)}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => selected && place(selected, qId)}
                  onKeyDown={(e) => {
                    if (selected && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      place(selected, qId);
                    }
                  }}
                  role={selected ? 'button' : undefined}
                  tabIndex={selected ? 0 : undefined}
                  className="rounded-xl p-3 min-h-[120px] transition-all"
                  style={{ backgroundColor: q.bg, border: `2px solid ${q.color}25` }}
                >
                  <p className="text-xs font-bold mb-1" style={{ color: q.color }}>{q.label}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{q.subtitle}</p>
                  <div className="space-y-1">
                    {placed.map((p) => {
                      const o = opportunities.find((op) => op.id === p.id)!;
                      const correct = o.correctQuadrant === qId;
                      return (
                        <div
                          key={p.id}
                          className="rounded bg-white border px-2 py-1 flex items-center gap-1"
                          style={{ borderColor: `${q.color}30` }}
                        >
                          <span className="text-[10px] font-bold text-gray-700 flex-1">{o.title}</span>
                          {allPlaced && !correct && (
                            <span className="text-[8px] font-bold text-amber-600">\u2717</span>
                          )}
                          {allPlaced && correct && (
                            <span className="text-[8px] font-bold text-teal-600">\u2713</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {placed.length === 0 && (
                    <p className="text-[9px] text-gray-300 italic mt-1">Drop here</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {selected && (
        <p className="text-xs text-gray-400 italic mt-2">Tap a quadrant to place the selected card.</p>
      )}
    </div>
  );
};

export default ImpactEffortMatrixDemo;

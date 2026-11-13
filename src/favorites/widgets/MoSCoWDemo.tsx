import { useState, useCallback } from 'react';
import { RotateCcw, GripVertical } from 'lucide-react';

type BucketId = 'must' | 'should' | 'could' | 'wont' | 'tray';

interface Req {
  id: string;
  title: string;
}

const reqs: Req[] = [
  { id: 'R1', title: 'User authentication' },
  { id: 'R2', title: 'Dashboard analytics' },
  { id: 'R3', title: 'Profile settings' },
  { id: 'R4', title: 'Dark theme' },
  { id: 'R5', title: 'Social sharing' },
  { id: 'R6', title: 'API access' },
  { id: 'R7', title: 'Offline mode' },
  { id: 'R8', title: 'Multi-language' },
];

const buckets = [
  { id: 'must', label: 'Must', color: '#be185d', bg: '#be185d0D' },
  { id: 'should', label: 'Should', color: '#f97316', bg: '#f973160D' },
  { id: 'could', label: 'Could', color: '#0ea5e9', bg: '#0ea5e90D' },
  { id: 'wont', label: "Won't", color: '#6B7280', bg: '#6B72800D' },
] as const;

const trayState = (): Record<string, BucketId> =>
  Object.fromEntries(reqs.map((r) => [r.id, 'tray']));

const MoSCoWDemo = () => {
  const [placements, setPlacements] = useState<Record<string, BucketId>>(trayState);
  const [selected, setSelected] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const move = useCallback((id: string, col: BucketId) => {
    setPlacements((p) => ({ ...p, [id]: col }));
    setSelected(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, col: BucketId) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain') || draggedId || '';
      if (id) move(id, col);
      setDraggedId(null);
    },
    [draggedId, move]
  );

  const reset = useCallback(() => {
    setPlacements(trayState());
    setSelected(null);
  }, []);

  const trayItems = reqs.filter((r) => placements[r.id] === 'tray');

  const renderCard = (req: Req) => (
    <div
      key={req.id}
      draggable
      onDragStart={(e) => {
        setDraggedId(req.id);
        e.dataTransfer.setData('text/plain', req.id);
      }}
      onDragEnd={() => setDraggedId(null)}
      onClick={() => setSelected(selected === req.id ? null : req.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelected(selected === req.id ? null : req.id);
        }
      }}
      aria-pressed={selected === req.id}
      className={`rounded-lg px-3 py-2 bg-white border-2 cursor-grab active:cursor-grabbing transition-all ${
        selected === req.id ? 'border-pink-500 ring-2 ring-pink-400/40' : 'border-gray-200 hover:border-pink-400'
      } ${draggedId === req.id ? 'opacity-40' : ''}`}
    >
      <div className="flex items-center gap-2">
        <GripVertical className="w-3 h-3 text-gray-300" />
        <span className="text-xs font-bold text-gray-700">{req.title}</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          {reqs.length - trayItems.length} of {reqs.length} sorted
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {trayItems.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Unsorted Requirements</p>
          <div className="flex flex-wrap gap-2 rounded-xl p-3 bg-gray-50 border-2 border-dashed border-gray-200">
            {trayItems.map(renderCard)}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {buckets.map((col) => {
          const colItems = reqs.filter((r) => placements[r.id] === col.id);
          return (
            <div
              key={col.id}
              onDrop={(e) => handleDrop(e, col.id)}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => selected && move(selected, col.id)}
              onKeyDown={(e) => {
                if (selected && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  move(selected, col.id);
                }
              }}
              role={selected ? 'button' : undefined}
              tabIndex={selected ? 0 : undefined}
              className="rounded-xl p-3 min-h-[130px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              style={{ backgroundColor: col.bg, border: `2px solid ${col.color}25` }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-black uppercase tracking-wide" style={{ color: col.color }}>
                  {col.label}
                </p>
                <span className="text-[10px] font-black text-gray-400 bg-white rounded-full px-2 py-0.5">
                  {colItems.length}
                </span>
              </div>
              <div className="space-y-1.5">
                {colItems.map(renderCard)}
              </div>
              {colItems.length === 0 && <p className="text-[10px] text-gray-300 italic mt-1">Drop or tap here</p>}
            </div>
          );
        })}
      </div>
      {selected && (
        <p className="text-xs text-gray-400 italic mt-2">Tap a bucket to assign the selected requirement.</p>
      )}
    </div>
  );
};

export default MoSCoWDemo;

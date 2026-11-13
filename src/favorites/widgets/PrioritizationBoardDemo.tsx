import { useState, useCallback } from 'react';
import { RotateCcw, GripVertical } from 'lucide-react';

type ColumnId = 'must' | 'should' | 'could' | 'tray';

interface Item {
  id: string;
  title: string;
}

const items: Item[] = [
  { id: 'I1', title: 'Fix checkout flow' },
  { id: 'I2', title: 'Add search filters' },
  { id: 'I3', title: 'Redesign dashboard' },
  { id: 'I4', title: 'Email notifications' },
  { id: 'I5', title: 'Dark mode' },
  { id: 'I6', title: 'Export to CSV' },
];

const columns: { id: 'must' | 'should' | 'could'; label: string; color: string; bg: string }[] = [
  { id: 'must', label: 'Must Do', color: '#be185d', bg: '#be185d0D' },
  { id: 'should', label: 'Should Do', color: '#f97316', bg: '#f973160D' },
  { id: 'could', label: 'Could Do', color: '#0ea5e9', bg: '#0ea5e90D' },
];

const trayState = (): Record<string, ColumnId> =>
  Object.fromEntries(items.map((i) => [i.id, 'tray']));

const PrioritizationBoardDemo = () => {
  const [placements, setPlacements] = useState<Record<string, ColumnId>>(trayState);
  const [selected, setSelected] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const move = useCallback((id: string, col: ColumnId) => {
    setPlacements((p) => ({ ...p, [id]: col }));
    setSelected(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, col: ColumnId) => {
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

  const trayItems = items.filter((i) => placements[i.id] === 'tray');

  const renderCard = (item: Item) => (
    <div
      key={item.id}
      draggable
      onDragStart={(e) => {
        setDraggedId(item.id);
        e.dataTransfer.setData('text/plain', item.id);
      }}
      onDragEnd={() => setDraggedId(null)}
      onClick={() => setSelected(selected === item.id ? null : item.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelected(selected === item.id ? null : item.id);
        }
      }}
      aria-pressed={selected === item.id}
      className={`rounded-lg px-3 py-2 bg-white border-2 cursor-grab active:cursor-grabbing transition-all ${
        selected === item.id ? 'border-pink-500 ring-2 ring-pink-400/40' : 'border-gray-200 hover:border-pink-400'
      } ${draggedId === item.id ? 'opacity-40' : ''}`}
    >
      <div className="flex items-center gap-2">
        <GripVertical className="w-3 h-3 text-gray-300" />
        <span className="text-xs font-bold text-gray-700">{item.title}</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          {items.length - trayItems.length} of {items.length} prioritized
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
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Unsorted Tray</p>
          <div className="flex flex-wrap gap-2 rounded-xl p-3 bg-gray-50 border-2 border-dashed border-gray-200">
            {trayItems.map(renderCard)}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {columns.map((col) => {
          const colItems = items.filter((i) => placements[i.id] === col.id);
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
              className="rounded-xl p-3 min-h-[140px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              style={{ backgroundColor: col.bg, border: `2px solid ${col.color}25` }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold" style={{ color: col.color }}>{col.label}</p>
                <span className="text-xs font-black text-gray-400 bg-white rounded-full px-2 py-0.5">{colItems.length}</span>
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
        <p className="text-xs text-gray-400 italic mt-2">Tap a column to move the selected card.</p>
      )}
    </div>
  );
};

export default PrioritizationBoardDemo;

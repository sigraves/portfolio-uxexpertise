import { useState, useCallback } from 'react';
import { RotateCcw, GripVertical, Inbox } from 'lucide-react';

interface Topic {
  id: string;
  label: string;
}

interface Category {
  id: string;
  label: string;
  color: string;
}

const topics: Topic[] = [
  { id: 't1', label: 'Pricing' },
  { id: 't2', label: 'Getting Started' },
  { id: 't3', label: 'Account Settings' },
  { id: 't4', label: 'Billing History' },
  { id: 't5', label: 'FAQ' },
  { id: 't6', label: 'Contact Support' },
];

const categories: Category[] = [
  { id: 'c1', label: 'Account', color: '#0ea5e9' },
  { id: 'c2', label: 'Help & Support', color: '#f97316' },
  { id: 'c3', label: 'Billing', color: '#059669' },
];

const CardSortingDemo = () => {
  const [placements, setPlacements] = useState<Record<string, string>>({}); // topicId -> categoryId
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const place = useCallback((topicId: string, catId: string) => {
    setPlacements((prev) => ({ ...prev, [topicId]: catId }));
  }, []);

  const unplace = useCallback((topicId: string) => {
    setPlacements((prev) => {
      const next = { ...prev };
      delete next[topicId];
      return next;
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, catId: string) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain') || draggedId;
      if (id) place(id, catId);
      setDraggedId(null);
    },
    [draggedId, place]
  );

  const reset = useCallback(() => setPlacements({}), []);

  const trayCards = topics.filter((t) => !placements[t.id]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-400">
          {Object.keys(placements).length} of {topics.length} sorted
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Tray */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-gray-400">
          <Inbox className="w-3.5 h-3.5" /> Unsorted Cards
        </div>
        <div className="flex flex-wrap gap-2 min-h-[44px] rounded-xl bg-gray-50 p-2.5">
          {trayCards.length === 0 && (
            <p className="text-xs text-gray-300 italic self-center">All cards sorted</p>
          )}
          {trayCards.map((t) => (
            <div
              key={t.id}
              draggable
              onDragStart={(e) => {
                setDraggedId(t.id);
                e.dataTransfer.setData('text/plain', t.id);
              }}
              onDragEnd={() => setDraggedId(null)}
              onClick={() => {
                // tap-to-cycle to first category with space
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  place(t.id, categories[0].id);
                }
              }}
              className={`rounded-lg px-3 py-2 bg-white border-2 border-gray-200 cursor-grab active:cursor-grabbing transition-all hover:border-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                draggedId === t.id ? 'opacity-40' : ''
              }`}
            >
              <div className="flex items-center gap-1.5">
                <GripVertical className="w-3 h-3 text-gray-300" />
                <span className="text-xs font-bold text-gray-700">{t.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {categories.map((cat) => {
          const cards = topics.filter((t) => placements[t.id] === cat.id);
          return (
            <div
              key={cat.id}
              onDrop={(e) => handleDrop(e, cat.id)}
              onDragOver={(e) => e.preventDefault()}
              className="rounded-xl p-3 min-h-[120px]"
              style={{ backgroundColor: `${cat.color}08`, border: `2px dashed ${cat.color}40` }}
            >
              <div
                className="rounded-lg px-2.5 py-1.5 mb-2 text-xs font-black text-white"
                style={{ backgroundColor: cat.color }}
              >
                {cat.label}
              </div>
              <div className="space-y-1.5">
                {cards.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-lg bg-white border px-2.5 py-1.5 flex items-center justify-between group"
                    style={{ borderColor: `${cat.color}30` }}
                  >
                    <span className="text-xs font-bold text-gray-700">{t.label}</span>
                    <button
                      onClick={() => unplace(t.id)}
                      aria-label={`Return ${t.label} to tray`}
                      className="text-gray-300 hover:text-gray-600 text-sm leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {cards.length === 0 && (
                  <p className="text-[10px] text-gray-300 italic">Drop cards here</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-gray-400 italic mt-2">Drag cards into categories, or focus a card and press Enter to place it.</p>
    </div>
  );
};

export default CardSortingDemo;

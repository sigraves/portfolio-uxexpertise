import { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, Trash2, Undo2, X } from 'lucide-react';

interface ListItem {
  id: number;
  label: string;
  meta: string;
  color: string;
}

const initialItems: ListItem[] = [
  { id: 1, label: 'User Research Plan', meta: 'Updated 2h ago', color: '#059669' },
  { id: 2, label: 'Journey Map v3', meta: 'Updated yesterday', color: '#f97316' },
  { id: 3, label: 'Persona Card — Maya', meta: 'Updated 3d ago', color: '#0ea5e9' },
  { id: 4, label: 'Usability Test Notes', meta: 'Updated 1w ago', color: '#8B5CF6' },
  { id: 5, label: 'Heuristic Checklist', meta: 'Updated 2w ago', color: '#ec4899' },
];

interface UndoState {
  item: ListItem;
  index: number;
  remaining: number;
}

const UNDO_MS = 5000;
const TICK = 100;

const UndoInteractionsDemo = () => {
  const [items, setItems] = useState<ListItem[]>(initialItems);
  const [undo, setUndo] = useState<UndoState | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const deleteItem = useCallback(
    (id: number) => {
      clearTimer();
      setItems((prev) => {
        const index = prev.findIndex((i) => i.id === id);
        if (index === -1) return prev;
        const item = prev[index];
        // start countdown
        setUndo({ item, index, remaining: UNDO_MS });
        return prev.filter((i) => i.id !== id);
      });
    },
    [clearTimer]
  );

  const restoreItem = useCallback(() => {
    clearTimer();
    setUndo((current) => {
      if (current) {
        setItems((prev) => {
          const next = [...prev];
          next.splice(current.index, 0, current.item);
          return next;
        });
      }
      return null;
    });
  }, [clearTimer]);

  const dismissToast = useCallback(() => {
    clearTimer();
    setUndo(null);
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setItems(initialItems);
    setUndo(null);
  }, [clearTimer]);

  // countdown ticker
  useEffect(() => {
    if (!undo) return;
    timerRef.current = setInterval(() => {
      setUndo((prev) => {
        if (!prev) return null;
        const next = prev.remaining - TICK;
        if (next <= 0) {
          clearTimer();
          return null; // deletion becomes permanent
        }
        return { ...prev, remaining: next };
      });
    }, TICK);
    return clearTimer;
  }, [undo?.item.id, clearTimer]); // re-run only when a new undo starts

  // cleanup on unmount
  useEffect(() => clearTimer, [clearTimer]);

  const pct = undo ? (undo.remaining / UNDO_MS) * 100 : 0;
  const secs = undo ? Math.ceil(undo.remaining / 1000) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">Delete an item → undo within 5s</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-gray-400 italic text-center py-6">All items deleted.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 bg-white transition-all"
            >
              <div className="w-2 h-9 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{item.label}</p>
                <p className="text-xs text-gray-400">{item.meta}</p>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                aria-label={`Delete ${item.label}`}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Undo toast */}
      {undo && (
        <div className="mt-4 rounded-xl bg-gray-900 p-4 shadow-lg animate-pmt-reveal">
          <div className="flex items-center gap-3">
            <Undo2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
            <p className="text-sm font-bold text-white flex-1">
              Deleted <span className="text-teal-300">"{undo.item.label}"</span>
            </p>
            <button
              onClick={dismissToast}
              aria-label="Dismiss"
              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-300" />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={restoreItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-900 bg-teal-400 hover:bg-teal-300 transition-colors"
            >
              <Undo2 className="w-3.5 h-3.5" /> Undo
            </button>
            <span className="text-xs text-gray-400 tabular-nums">{secs}s left</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/15 overflow-hidden">
              <div className="h-full bg-teal-400 transition-all duration-100 ease-linear" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UndoInteractionsDemo;

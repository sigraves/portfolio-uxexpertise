import { useState, useCallback } from 'react';
import { RotateCcw, Check } from 'lucide-react';

interface Piece {
  id: string;
  label: string;
  color: string;
}

const PIECES: Piece[] = [
  { id: 'a', label: 'Discover', color: '#059669' },
  { id: 'b', label: 'Define', color: '#f97316' },
  { id: 'c', label: 'Ideate', color: '#0ea5e9' },
  { id: 'd', label: 'Prototype', color: '#8B5CF6' },
];

const shuffled = () => [...PIECES].sort(() => Math.random() - 0.5);

const DragPuzzleDemo = () => {
  const [pieces, setPieces] = useState<Piece[]>(shuffled);
  const [placements, setPlacements] = useState<Record<string, string>>({}); // slotId -> pieceId
  const [selected, setSelected] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const allCorrect = PIECES.every((p) => placements[p.id] === p.id);

  const tryPlace = useCallback(
    (pieceId: string, slotId: string) => {
      if (placements[slotId] && placements[slotId] !== pieceId) return;
      if (pieceId !== slotId) {
        // wrong placement: clear any existing placement of this piece and bounce back
        setPlacements((prev) => {
          const next = { ...prev };
          Object.keys(next).forEach((k) => {
            if (next[k] === pieceId) delete next[k];
          });
          return next;
        });
        setSelected(null);
        return;
      }
      setPlacements((prev) => {
        const next = { ...prev };
        // remove piece from any other slot
        Object.keys(next).forEach((k) => {
          if (next[k] === pieceId) delete next[k];
        });
        next[slotId] = pieceId;
        return next;
      });
      setSelected(null);
    },
    [placements]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, slotId: string) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain') || draggedId;
      if (id) tryPlace(id, slotId);
      setDraggedId(null);
    },
    [draggedId, tryPlace]
  );

  const reset = useCallback(() => {
    setPieces(shuffled());
    setPlacements({});
    setSelected(null);
    setDraggedId(null);
  }, []);

  const placedIds = new Set(Object.values(placements));
  const tray = pieces.filter((p) => !placedIds.has(p.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          {Object.keys(placements).length} of {PIECES.length} placed
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Slots */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {PIECES.map((slot) => {
          const placedPieceId = placements[slot.id];
          const correct = placedPieceId === slot.id;
          const piece = PIECES.find((p) => p.id === placedPieceId);
          return (
            <div
              key={slot.id}
              onDrop={(e) => handleDrop(e, slot.id)}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => {
                if (selected) tryPlace(selected, slot.id);
              }}
              role="button"
              tabIndex={0}
              aria-label={`Slot ${slot.label}${piece ? `, contains ${piece.label}` : ', empty'}`}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && selected) {
                  e.preventDefault();
                  tryPlace(selected, slot.id);
                }
              }}
              className={`rounded-xl min-h-[80px] p-3 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                correct ? '' : 'border-2 border-dashed'
              }`}
              style={
                correct
                  ? { backgroundColor: `${slot.color}15`, borderColor: slot.color }
                  : { backgroundColor: `${slot.color}08`, borderColor: `${slot.color}40` }
              }
            >
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: slot.color }}>
                {slot.label}
              </span>
              {piece ? (
                <span
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white ${
                    correct ? 'animate-badge-pop' : ''
                  }`}
                  style={{ backgroundColor: slot.color }}
                >
                  {correct && <Check className="w-3 h-3" />} {piece.label}
                </span>
              ) : (
                <span className="text-[10px] text-gray-300 italic">Drop or tap here</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Tray */}
      <div className="flex flex-wrap gap-2 min-h-[44px] rounded-xl bg-gray-50 p-2.5">
        {tray.length === 0 && <p className="text-xs text-gray-300 italic self-center">All pieces placed</p>}
        {tray.map((p) => (
          <div
            key={p.id}
            draggable
            onDragStart={(e) => {
              setDraggedId(p.id);
              e.dataTransfer.setData('text/plain', p.id);
            }}
            onDragEnd={() => setDraggedId(null)}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
            role="button"
            tabIndex={0}
            aria-pressed={selected === p.id}
            aria-label={`${p.label} piece${selected === p.id ? ' (selected)' : ''}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelected(selected === p.id ? null : p.id);
              }
            }}
            className={`rounded-lg px-3 py-2 bg-white border-2 text-xs font-bold cursor-grab active:cursor-grabbing transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
              selected === p.id ? 'ring-2 ring-amber-500' : ''
            } ${draggedId === p.id ? 'opacity-40' : ''}`}
            style={{ borderColor: `${p.color}50`, color: p.color }}
          >
            {p.label}
          </div>
        ))}
      </div>

      {allCorrect && (
        <p className="mt-4 text-center text-sm font-black text-emerald-600 animate-badge-pop">
          Puzzle complete! All pieces snapped into place.
        </p>
      )}
      <p className="text-[10px] text-gray-400 italic mt-2">Drag pieces or tap to select, then tap a slot.</p>
    </div>
  );
};

export default DragPuzzleDemo;

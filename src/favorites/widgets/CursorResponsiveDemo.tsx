import { useState, useCallback, useRef } from 'react';
import { RotateCcw } from 'lucide-react';

interface Shape { id: number; color: string; baseX: number; baseY: number; factor: number; size: number; }

const SHAPES: Shape[] = [
  { id: 0, color: '#0ea5e9', baseX: 50, baseY: 50, factor: 0.5, size: 56 },
  { id: 1, color: '#ec4899', baseX: 70, baseY: 40, factor: 0.9, size: 40 },
  { id: 2, color: '#f97316', baseX: 30, baseY: 60, factor: 0.7, size: 48 },
  { id: 3, color: '#8b5cf6', baseX: 50, baseY: 25, factor: 1.2, size: 32 },
];

interface Ripple { id: number; x: number; y: number; }

const CursorResponsiveDemo = () => {
  const areaRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [usingKeys, setUsingKeys] = useState(false);
  const keyPos = useRef<{ x: number; y: number }>({ x: 50, y: 50 });

  const updateFromPointer = useCallback((e: React.PointerEvent) => {
    const el = areaRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x: px, y: py });
  }, []);

  const onLeave = useCallback(() => setPos(null), []);

  const onClick = useCallback((e: React.MouseEvent) => {
    const el = areaRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((rp) => rp.id !== id)), 700);
  }, []);

  const onKey = useCallback((e: React.KeyboardEvent) => {
    const step = 4;
    let moved = false;
    if (e.key === 'ArrowLeft') { keyPos.current.x = Math.max(0, keyPos.current.x - step); moved = true; }
    if (e.key === 'ArrowRight') { keyPos.current.x = Math.min(100, keyPos.current.x + step); moved = true; }
    if (e.key === 'ArrowUp') { keyPos.current.y = Math.max(0, keyPos.current.y - step); moved = true; }
    if (e.key === 'ArrowDown') { keyPos.current.y = Math.min(100, keyPos.current.y + step); moved = true; }
    if (moved) { e.preventDefault(); setUsingKeys(true); setPos({ ...keyPos.current }); }
  }, []);

  const reset = useCallback(() => {
    setPos(null); setRipples([]); setUsingKeys(false);
    keyPos.current = { x: 50, y: 50 };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">Move cursor for parallax · Click for ripple · Arrow keys on mobile</p>
        <button onClick={reset} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div
        ref={areaRef}
        className="relative h-72 rounded-xl border-2 border-gray-100 bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden touch-none"
        onPointerMove={updateFromPointer}
        onPointerLeave={onLeave}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={onKey}
        role="img"
        aria-label="Cursor parallax canvas. Move the cursor to shift shapes."
      >
        {/* ripple layer */}
        {ripples.map((rp) => (
          <span
            key={rp.id}
            className="absolute rounded-full border-2 border-sky-400 pointer-events-none"
            style={{ left: rp.x, top: rp.y, width: 8, height: 8, transform: 'translate(-50%,-50%)', animation: 'cursor-ripple 0.7s ease-out forwards' }}
          />
        ))}

        {SHAPES.map((s) => {
          let dx = 0, dy = 0;
          if (pos) {
            const ddx = pos.x - s.baseX;
            const ddy = pos.y - s.baseY;
            dx = ddx * s.factor * 0.3;
            dy = ddy * s.factor * 0.3;
          }
          return (
            <div
              key={s.id}
              className="absolute rounded-full shadow-lg transition-transform duration-150 ease-out"
              style={{
                left: `${s.baseX}%`, top: `${s.baseY}%`,
                width: s.size, height: s.size,
                backgroundColor: s.color,
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`,
                opacity: pos ? 0.9 : 0.55,
              }}
            />
          );
        })}

        {pos && (
          <div className="absolute w-3 h-3 rounded-full bg-gray-800/70 pointer-events-none" style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%,-50%)' }} />
        )}

        {usingKeys && (
          <p className="absolute bottom-2 left-2 text-[10px] font-bold text-gray-500 bg-white/80 px-2 py-0.5 rounded">Keyboard cursor active</p>
        )}
      </div>
      <style>{`@keyframes cursor-ripple { to { width: 160px; height: 160px; opacity: 0; } }`}</style>
    </div>
  );
};

export default CursorResponsiveDemo;

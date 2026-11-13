import { useState, useCallback, useRef } from 'react';
import { RotateCcw, ArrowUp, ArrowRight } from 'lucide-react';

const FACES: { label: string; bg: string; color: string; transform: string }[] = [
  { label: 'Front', bg: '#0ea5e9', color: '#fff', transform: 'rotateY(0deg) translateZ(80px)' },
  { label: 'Back', bg: '#8b5cf6', color: '#fff', transform: 'rotateY(180deg) translateZ(80px)' },
  { label: 'Right', bg: '#f97316', color: '#fff', transform: 'rotateY(90deg) translateZ(80px)' },
  { label: 'Left', bg: '#ec4899', color: '#fff', transform: 'rotateY(-90deg) translateZ(80px)' },
  { label: 'Top', bg: '#10b981', color: '#fff', transform: 'rotateX(90deg) translateZ(80px)' },
  { label: 'Bottom', bg: '#eab308', color: '#fff', transform: 'rotateX(-90deg) translateZ(80px)' },
];

const CSS3DDemo = () => {
  const [rot, setRot] = useState({ x: -20, y: 25, scale: 1 });
  const drag = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, rx: rot.x, ry: rot.y };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }, [rot]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current) return;
    setRot((p) => ({
      ...p,
      y: drag.current!.ry + (e.clientX - drag.current!.x) * 0.5,
      x: drag.current!.rx - (e.clientY - drag.current!.y) * 0.5,
    }));
  }, []);

  const onPointerUp = useCallback(() => { drag.current = null; }, []);

  const preset = (kind: 'x' | 'y' | 'scale' | 'reset') => {
    if (kind === 'reset') return setRot({ x: -20, y: 25, scale: 1 });
    if (kind === 'scale') return setRot((p) => ({ ...p, scale: p.scale >= 1.5 ? 1 : 1.5 }));
    if (kind === 'x') return setRot((p) => ({ ...p, x: p.x + 45 }));
    return setRot((p) => ({ ...p, y: p.y + 45 }));
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); setRot((p) => ({ ...p, y: p.y - 15 })); }
    if (e.key === 'ArrowRight') { e.preventDefault(); setRot((p) => ({ ...p, y: p.y + 15 })); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setRot((p) => ({ ...p, x: p.x - 15 })); }
    if (e.key === 'ArrowDown') { e.preventDefault(); setRot((p) => ({ ...p, x: p.x + 15 })); }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        <button onClick={() => preset('x')} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors">
          <ArrowUp className="w-3 h-3" /> Rotate X
        </button>
        <button onClick={() => preset('y')} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors">
          <ArrowRight className="w-3 h-3" /> Rotate Y
        </button>
        <button onClick={() => preset('scale')} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors">
          Scale {rot.scale > 1 ? 'Down' : 'Up'}
        </button>
        <button onClick={() => preset('reset')} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div
        className="relative h-72 rounded-xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center overflow-hidden touch-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        tabIndex={0}
        onKeyDown={onKey}
        role="img"
        aria-label={`3D cube. Rotation X ${Math.round(rot.x)} degrees, Y ${Math.round(rot.y)} degrees, scale ${rot.scale.toFixed(1)}. Use arrow keys to rotate.`}
      >
        <div
          className="absolute transition-transform duration-200"
          style={{ transformStyle: 'preserve-3d', transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale(${rot.scale})` }}
        >
          {FACES.map((f) => (
            <div
              key={f.label}
              className="absolute flex items-center justify-center shadow-lg border border-white/20"
              style={{
                width: 160, height: 160, left: -80, top: -80,
                background: f.bg, color: f.color, transform: f.transform,
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="text-center">
                <p className="text-2xl font-black">{f.label}</p>
                <p className="text-[10px] opacity-70 font-bold uppercase tracking-wider">face</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">Drag to rotate · Arrow keys to nudge · Scale Up zooms</p>
    </div>
  );
};

export default CSS3DDemo;

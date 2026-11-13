import { useState, useCallback, useRef } from 'react';
import { ArrowLeftRight } from 'lucide-react';

const BeforeAfterSliderDemo = () => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      updateFromClientX(e.clientX);
    },
    [updateFromClientX]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updateFromClientX(e.clientX);
    },
    [updateFromClientX]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 5));
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-3 text-xs font-bold text-gray-400">
        <span className="inline-flex items-center gap-1">
          <ArrowLeftRight className="w-3.5 h-3.5" /> Drag the divider or use arrow keys
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 select-none"
      >
        {/* After (full, bottom layer) */}
        <div className="absolute inset-0 bg-white p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-200" />
            </div>
            <div className="h-4 w-20 rounded-full bg-emerald-100" />
          </div>
          <div className="grid grid-cols-3 gap-2 flex-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg bg-emerald-50 p-2 flex flex-col">
                <div className="h-2 w-10 rounded-full bg-emerald-300 mb-1.5" />
                <div className="h-1.5 w-full rounded-full bg-emerald-200 mb-1" />
                <div className="h-1.5 w-3/4 rounded-full bg-emerald-200" />
                <div className="mt-auto h-5 rounded-md bg-emerald-500 flex items-center justify-center">
                  <div className="h-1.5 w-8 rounded-full bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before (clipped to left of divider) */}
        <div
          className="absolute inset-0 bg-white p-4 flex flex-col"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-red-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-red-100" />
            </div>
            <div className="h-4 w-20 rounded-full bg-gray-200" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="h-6 rounded bg-gray-100 flex items-center px-2">
              <div className="h-1.5 w-32 rounded-full bg-gray-300" />
            </div>
            <div className="h-6 rounded bg-gray-100 flex items-center px-2">
              <div className="h-1.5 w-24 rounded-full bg-gray-300" />
            </div>
            <div className="h-6 rounded bg-gray-100 flex items-center px-2">
              <div className="h-1.5 w-28 rounded-full bg-gray-300" />
            </div>
            <div className="mt-auto h-8 rounded bg-red-200 flex items-center justify-center">
              <div className="h-2 w-16 rounded-full bg-red-400" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-red-500 text-white text-[10px] font-bold z-10">Before</span>
        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold z-10">After</span>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] z-20"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label="Comparison divider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% before shown`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onKeyDown={onKey}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border-2 border-gray-200 flex items-center justify-center cursor-ew-resize hover:border-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 touch-none"
          >
            <ArrowLeftRight className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Mobile / keyboard range */}
      <div className="mt-3">
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(+e.target.value)}
          aria-label="Reveal position"
          className="w-full accent-blue-500 h-2 cursor-pointer sm:hidden"
        />
      </div>
    </div>
  );
};

export default BeforeAfterSliderDemo;

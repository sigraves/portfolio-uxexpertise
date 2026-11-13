import { useState, useCallback } from 'react';
import { RotateCcw, Shuffle } from 'lucide-react';

const COLS = 7;
const ROWS = 5;
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const gen = (): number[][] =>
  Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => Math.floor(Math.random() * 101))
  );

type Scale = 'sequential' | 'diverging';

// teal sequential: light -> dark teal
const seq = (v: number) => {
  const t = v / 100;
  const r = Math.round(240 - 224 * t);
  const g = Math.round(253 - 199 * t);
  const b = Math.round(250 - 180 * t);
  return `rgb(${r},${g},${b})`;
};

// diverging: blue (low) -> white (mid) -> red (high)
const div = (v: number) => {
  if (v <= 50) {
    const t = v / 50; // 0..1
    const r = Math.round(239 + (255 - 239) * t);
    const g = Math.round(246 + (255 - 246) * t);
    const b = Math.round(255 + (255 - 255) * t);
    return `rgb(${r},${g},${b})`;
  }
  const t = (v - 50) / 50; // 0..1
  const r = Math.round(255 + (239 - 255) * t);
  const g = Math.round(255 + (68 - 255) * t);
  const b = Math.round(255 + (68 - 255) * t);
  return `rgb(${r},${g},${b})`;
};

const HeatmapDemo = () => {
  const [grid, setGrid] = useState<number[][]>(gen);
  const [scale, setScale] = useState<Scale>('sequential');
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);

  const color = scale === 'sequential' ? seq : div;

  const randomize = useCallback(() => setGrid(gen()), []);
  const reset = useCallback(() => {
    setGrid(gen());
    setScale('sequential');
    setHover(null);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-1.5" role="group" aria-label="Color scale">
          {(['sequential', 'diverging'] as Scale[]).map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              aria-pressed={scale === s}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                scale === s ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={randomize}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-600 bg-teal-50 hover:bg-teal-100 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" /> Randomize
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex gap-1">
          {/* row labels */}
          <div className="flex flex-col gap-1 pr-1">
            {Array.from({ length: ROWS }).map((_, r) => (
              <div key={r} className="h-9 flex items-center text-[10px] font-bold text-gray-400 w-5">
                W{r + 1}
              </div>
            ))}
          </div>
          {/* grid */}
          <div className="flex-1">
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
              {grid.flatMap((row, r) =>
                row.map((v, c) => {
                  const active = hover?.r === r && hover?.c === c;
                  return (
                    <button
                      key={`${r}-${c}`}
                      onMouseEnter={() => setHover({ r, c })}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover({ r, c })}
                      onBlur={() => setHover(null)}
                      aria-label={`${days[c]} week ${r + 1}: value ${v}`}
                      className={`h-9 rounded-md transition-all duration-200 ${active ? 'ring-2 ring-gray-800 ring-offset-1 scale-105' : ''}`}
                      style={{ backgroundColor: color(v) }}
                    />
                  );
                })
              )}
            </div>
            {/* day labels */}
            <div className="grid gap-1 mt-1" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
              {days.map((d) => (
                <span key={d} className="text-[10px] text-center font-semibold text-gray-400">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* legend */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-[10px] font-semibold text-gray-400">0</span>
          <div className="flex-1 h-2.5 rounded-full" style={{ background: scale === 'sequential' ? 'linear-gradient(to right, #f0fdfa, #0d9488)' : 'linear-gradient(to right, #5b8def, #ffffff, #e4444f)' }} />
          <span className="text-[10px] font-semibold text-gray-400">100</span>
        </div>
      </div>

      {hover && (
        <div className="mt-3 text-center">
          <span className="inline-block px-3 py-1.5 rounded-lg bg-gray-800 text-white text-xs font-bold">
            {days[hover.c]} · Week {hover.r + 1} → <span className="text-teal-300">{grid[hover.r][hover.c]}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default HeatmapDemo;

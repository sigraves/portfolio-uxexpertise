import { useState, useCallback } from 'react';
import { RotateCcw, Layers, Eye } from 'lucide-react';

const dims = ['Usability', 'Performance', 'Aesthetics', 'Accessibility', 'Trust'];

const presets: Record<number, number[]> = {
  // dataset A
  0: [70, 50, 85, 40, 65],
  // dataset B
  1: [55, 80, 45, 75, 50],
};

const colors = ['#8b5cf6', '#f97316'];

const RadarChartDemo = () => {
  const [a, setA] = useState<number[]>(presets[0]);
  const [b, setB] = useState<number[]>(presets[1]);
  const [overlay, setOverlay] = useState(false);

  const cx = 130;
  const cy = 130;
  const R = 95;

  const point = useCallback(
    (val: number, i: number, scale = 100) => {
      const angle = (Math.PI * 2 * i) / dims.length - Math.PI / 2;
      const r = (val / scale) * R;
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
    },
    [cx, cy, R]
  );

  const poly = (vals: number[]) => vals.map((v, i) => point(v, i).join(',')).join(' ');

  const axes = dims.map((_, i) => point(100, i));
  const rings = [25, 50, 75, 100];

  const reset = useCallback(() => {
    setA(presets[0]);
    setB(presets[1]);
    setOverlay(false);
  }, []);

  const labelPos = (i: number) => {
    const [x, y] = point(118, i);
    return { x, y };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <button
          onClick={() => setOverlay(!overlay)}
          aria-pressed={overlay}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors bg-violet-50 text-violet-600 hover:bg-violet-100"
        >
          <Layers className="w-3.5 h-3.5" /> {overlay ? 'Single' : 'Compare'}
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <svg viewBox="0 0 260 260" className="w-full max-w-[260px] flex-shrink-0">
          {rings.map((r) => (
            <polygon
              key={r}
              points={dims.map((_, i) => point(r, i).join(',')).join(' ')}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          {axes.map(([x, y], i) => (
            <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e5e7eb" strokeWidth="1" />
          ))}
          {overlay && (
            <polygon
              points={poly(b)}
              fill={colors[1]}
              fillOpacity={0.18}
              stroke={colors[1]}
              strokeWidth="2"
              className="transition-all duration-300"
            />
          )}
          <polygon
            points={poly(a)}
            fill={colors[0]}
            fillOpacity={0.25}
            stroke={colors[0]}
            strokeWidth="2"
            className="transition-all duration-300"
          />
          {a.map((v, i) => {
            const [x, y] = point(v, i);
            return <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke={colors[0]} strokeWidth="2" className="transition-all duration-300" />;
          })}
          {overlay &&
            b.map((v, i) => {
              const [x, y] = point(v, i);
              return <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke={colors[1]} strokeWidth="2" className="transition-all duration-300" />;
            })}
          {dims.map((d, i) => {
            const p = labelPos(i);
            return (
              <text
                key={d}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-600 font-semibold"
                style={{ fontSize: 9 }}
              >
                {d}
              </text>
            );
          })}
        </svg>

        <div className="flex-1 w-full space-y-2.5">
          {dims.map((d, i) => (
            <div key={d}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-gray-600">{d}</span>
                <span className="text-xs font-extrabold text-violet-600">{a[i]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={a[i]}
                onChange={(e) => setA((p) => p.map((v, idx) => (idx === i ? +e.target.value : v)))}
                aria-label={`${d} value`}
                className="w-full accent-violet-600 h-1.5 cursor-pointer"
              />
            </div>
          ))}
          {overlay && (
            <div className="flex items-center gap-3 pt-2 text-[11px] font-bold">
              <span className="inline-flex items-center gap-1 text-violet-600">
                <span className="w-3 h-3 rounded-sm" style={{ background: colors[0] }} /> Dataset A
              </span>
              <span className="inline-flex items-center gap-1 text-orange-500">
                <Eye className="w-3 h-3" /> <span className="w-3 h-3 rounded-sm" style={{ background: colors[1] }} /> Dataset B
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RadarChartDemo;

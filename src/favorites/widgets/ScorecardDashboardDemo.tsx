import { useState, useCallback } from 'react';
import { TrendingUp, TrendingDown, Minus, RotateCcw } from 'lucide-react';

type Status = 'green' | 'yellow' | 'red';

interface Metric {
  id: string;
  label: string;
  value: number;
  target: number;
  max: number;
  unit: string;
  trend: string;
  trendDir: 'up' | 'down' | 'flat';
  status: Status;
}

const metrics: Metric[] = [
  { id: 'success', label: 'Task Success Rate', value: 87, target: 90, max: 100, unit: '%', trend: 'Up 6% from last sprint. Onboarding fixes drove the gain.', trendDir: 'up', status: 'yellow' },
  { id: 'time', label: 'Time on Task', value: 42, target: 50, max: 100, unit: 's', trend: 'Down 8s — streamlined checkout removed two steps.', trendDir: 'down', status: 'green' },
  { id: 'satisfaction', label: 'Satisfaction', value: 78, target: 75, max: 100, unit: '/100', trend: 'Up 4 points after the visual refresh shipped.', trendDir: 'up', status: 'green' },
  { id: 'error', label: 'Error Rate', value: 12, target: 5, max: 40, unit: '%', trend: 'Above target. Form validation gaps still cause drops.', trendDir: 'down', status: 'red' },
];

const statusColor: Record<Status, string> = {
  green: '#059669',
  yellow: '#f59e0b',
  red: '#dc2626',
};
const statusBg: Record<Status, string> = {
  green: '#05966912',
  yellow: '#f59e0b12',
  red: '#dc262612',
};

const TrendIcon = ({ dir }: { dir: Metric['trendDir'] }) => {
  if (dir === 'up') return <TrendingUp className="w-3.5 h-3.5" />;
  if (dir === 'down') return <TrendingDown className="w-3.5 h-3.5" />;
  return <Minus className="w-3.5 h-3.5" />;
};

// Semicircle gauge: arc from 180° (left) to 0° (right), top half.
const arcPath = (cx: number, cy: number, r: number, pct: number) => {
  const angle = Math.PI * (1 - pct); // PI -> 0
  const x = cx + r * Math.cos(angle);
  const y = cy - r * Math.sin(angle);
  const large = pct > 0.5 ? 1 : 0;
  return `M ${cx - r} ${cy} A ${r} ${r} 0 ${large} 1 ${x} ${y}`;
};

const ScorecardDashboardDemo = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const reset = useCallback(() => {
    setExpanded(null);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => {
          const isOpen = expanded === m.id;
          const pct = Math.min(1, m.value / m.max);
          const color = statusColor[m.status];
          const cx = 50;
          const cy = 48;
          const r = 38;
          return (
            <div
              key={m.id}
              className="rounded-xl border p-3 transition-all"
              style={{ borderColor: `${color}30`, backgroundColor: statusBg[m.status] }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : m.id)}
                aria-expanded={isOpen}
                className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg"
              >
                <div className="flex flex-col items-center">
                  <svg viewBox="0 0 100 56" className="w-full max-w-[110px]">
                    <path d={arcPath(cx, cy, r, 1)} fill="none" stroke="#e5e7eb" strokeWidth="7" strokeLinecap="round" />
                    <path
                      d={arcPath(cx, cy, r, pct)}
                      fill="none"
                      stroke={color}
                      strokeWidth="7"
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                    <text x={cx} y={cy - 6} textAnchor="middle" className="font-extrabold" style={{ fontSize: 17, fill: '#1f2937' }}>
                      {m.value}
                    </text>
                    <text x={cx} y={cy + 6} textAnchor="middle" style={{ fontSize: 7, fill: '#9ca3af' }}>
                      {m.unit}
                    </text>
                  </svg>
                  <p className="text-xs font-bold text-gray-700 text-center leading-tight mt-0.5">{m.label}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold" style={{ color }}>
                      <TrendIcon dir={m.trendDir} /> {m.status}
                    </span>
                    <span className="text-[10px] text-gray-400">tgt {m.target}{m.unit}</span>
                  </div>
                </div>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="text-[11px] text-gray-600 leading-relaxed bg-white/60 rounded-lg p-2">
                    {m.trend}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScorecardDashboardDemo;

import { useState, useCallback } from 'react';
import { RotateCcw, MapPin, CheckCircle2 } from 'lucide-react';

type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
type Filter = 'all' | Quarter;

interface Milestone {
  id: string;
  quarter: Quarter;
  date: string;
  title: string;
  deliverables: string[];
  color: string;
}

const milestones: Milestone[] = [
  { id: 'M1', quarter: 'Q1', date: 'Jan 15', title: 'Discovery & Research', deliverables: ['User interviews', 'Competitive analysis', 'Problem statement'], color: '#0ea5e9' },
  { id: 'M2', quarter: 'Q1', date: 'Mar 1', title: 'Design System', deliverables: ['Component library', 'Design tokens', 'Accessibility audit'], color: '#6366F1' },
  { id: 'M3', quarter: 'Q2', date: 'May 20', title: 'Beta Launch', deliverables: ['Core feature set', 'Onboarding flow', 'Analytics setup'], color: '#14B8A6' },
  { id: 'M4', quarter: 'Q3', date: 'Aug 10', title: 'Public Release', deliverables: ['Marketing site', 'Pricing plans', 'Support docs'], color: '#f97316' },
  { id: 'M5', quarter: 'Q4', date: 'Nov 5', title: 'Scale & Optimize', deliverables: ['Performance tuning', 'Enterprise features', 'Mobile apps'], color: '#be185d' },
];

const quarters: Quarter[] = ['Q1', 'Q2', 'Q3', 'Q4'];

const InteractiveRoadmapDemo = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string>('M1');

  const visible = filter === 'all' ? milestones : milestones.filter((m) => m.quarter === filter);
  const current = visible.find((m) => m.id === selectedId) ?? visible[0];

  const reset = useCallback(() => {
    setFilter('all');
    setSelectedId('M1');
  }, []);

  const chip = (active: boolean) =>
    `px-2.5 py-1 rounded-lg text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
      active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
    }`;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setFilter('all')} className={chip(filter === 'all')} aria-pressed={filter === 'all'}>
            All
          </button>
          {quarters.map((q) => (
            <button
              key={q}
              onClick={() => setFilter(q)}
              className={chip(filter === q)}
              aria-pressed={filter === q}
            >
              {q}
            </button>
          ))}
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Timeline */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <div className="relative flex items-start justify-between min-w-[440px] gap-1 px-3 pt-1">
          <div className="absolute top-5 left-3 right-3 h-0.5 bg-gray-200" aria-hidden="true" />
          {visible.map((m) => {
            const isSel = m.id === current?.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                aria-pressed={isSel}
                aria-label={`${m.title}, ${m.date}, ${m.quarter}`}
                className="relative z-10 flex flex-col items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[9px] font-black border-4 border-white transition-transform"
                  style={{
                    backgroundColor: m.color,
                    transform: isSel ? 'scale(1.18)' : 'scale(1)',
                    boxShadow: isSel ? `0 0 0 3px ${m.color}` : 'none',
                  }}
                >
                  {m.quarter}
                </span>
                <span
                  className={`text-[10px] font-bold text-center w-16 leading-tight ${
                    isSel ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {m.date}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      {current && (
        <div
          className="mt-4 rounded-xl p-4 border-2"
          style={{ borderColor: `${current.color}40`, backgroundColor: `${current.color}08` }}
          aria-live="polite"
        >
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: current.color }} />
            <p className="text-sm font-bold" style={{ color: current.color }}>
              {current.title}
            </p>
            <span className="text-[10px] font-bold text-gray-400 ml-auto">
              {current.date} · {current.quarter}
            </span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Deliverables</p>
          <ul className="space-y-1.5">
            {current.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-2 text-xs text-gray-700">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: current.color }} />
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InteractiveRoadmapDemo;

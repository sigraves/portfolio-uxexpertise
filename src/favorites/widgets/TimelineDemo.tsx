import { useState, useCallback } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

type EventType = 'Research' | 'Design' | 'Launch';

interface Milestone {
  id: number;
  date: string;
  title: string;
  desc: string;
  type: EventType;
}

const milestones: Milestone[] = [
  { id: 1, date: 'Jan 2024', title: 'User Interviews', desc: 'Conducted 24 in-depth interviews to map pain points across the checkout journey.', type: 'Research' },
  { id: 2, date: 'Feb 2024', title: 'Survey & Data', desc: 'Launched a quantitative survey reaching 1,200 users to validate qualitative themes.', type: 'Research' },
  { id: 3, date: 'Mar 2024', title: 'Wireframes', desc: 'Sketched low-fidelity wireframes for the new flow and reviewed them with stakeholders.', type: 'Design' },
  { id: 4, date: 'May 2024', title: 'Prototype Test', desc: 'Ran moderated usability tests on the interactive prototype with 12 participants.', type: 'Design' },
  { id: 5, date: 'Jul 2024', title: 'Beta Release', desc: 'Shipped a closed beta to 500 users and collected real-world feedback and telemetry.', type: 'Launch' },
  { id: 6, date: 'Sep 2024', title: 'GA Launch', desc: 'Rolled out the redesigned experience to all users with a 32% conversion lift.', type: 'Launch' },
];

const typeColor: Record<EventType, string> = {
  Research: '#0ea5e9',
  Design: '#f97316',
  Launch: '#059669',
};

type Filter = 'all' | EventType;

const TimelineDemo = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [active, setActive] = useState<number>(milestones[0].id);

  const reset = useCallback(() => {
    setFilter('all');
    setActive(milestones[0].id);
  }, []);

  const visible = milestones.filter((m) => filter === 'all' || m.type === filter);
  const current = milestones.find((m) => m.id === active);

  const go = useCallback(
    (dir: number) => {
      const vis = milestones.filter((m) => filter === 'all' || m.type === filter);
      const idx = vis.findIndex((m) => m.id === active);
      if (idx === -1) {
        if (vis.length) setActive(vis[0].id);
        return;
      }
      const next = vis[Math.min(vis.length - 1, Math.max(0, idx + dir))];
      setActive(next.id);
    },
    [filter, active]
  );

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
    },
    [go]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <div className="flex gap-1.5 flex-wrap" role="group" aria-label="Filter by event type">
          {(['all', 'Research', 'Design', 'Launch'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filter === f ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All Events' : f}
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

      {/* timeline */}
      <div className="relative px-2 pb-2" onKeyDown={onKey}>
        <div className="absolute left-2 right-2 top-3 h-0.5 bg-gray-200" />
        <div
          className="absolute left-2 top-3 h-0.5 bg-sky-500 transition-all duration-300"
          style={{ width: `calc(${visible.length ? ((visible.findIndex((m) => m.id === active) + 1) / visible.length) * 100 : 0}% - 8px)` }}
        />
        <div className="relative flex justify-between items-start">
          {visible.map((m) => {
            const isActive = m.id === active;
            const color = typeColor[m.type];
            return (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                aria-pressed={isActive}
                aria-label={`${m.date}: ${m.title}, ${m.type}`}
                className="flex flex-col items-center group pt-0 focus:outline-none"
                style={{ flex: '1 1 0', minWidth: 0 }}
              >
                <span
                  className={`rounded-full border-2 transition-all duration-200 ${
                    isActive ? 'w-6 h-6 -mt-1' : 'w-4 h-4 mt-0 group-hover:w-5 group-hover:h-5'
                  } focus-visible:ring-2 focus-visible:ring-sky-400`}
                  style={{
                    backgroundColor: isActive ? color : '#fff',
                    borderColor: color,
                    boxShadow: isActive ? `0 0 0 3px ${color}30` : 'none',
                  }}
                />
                <span className="text-[9px] font-bold text-gray-400 mt-1.5 text-center leading-tight hidden sm:block">{m.date}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* detail */}
      {current && (filter === 'all' || current.type === filter) ? (
        <div className="mt-4 rounded-xl p-4 bg-gray-50 border-l-4" style={{ borderColor: typeColor[current.type] }}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white" style={{ background: typeColor[current.type] }}>
                {current.type}
              </span>
              <span className="text-xs font-bold text-gray-400">{current.date}</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => go(-1)}
                aria-label="Previous milestone"
                className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next milestone"
                className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          <h4 className="text-sm font-extrabold text-gray-800 mb-1">{current.title}</h4>
          <p className="text-xs text-gray-600 leading-relaxed">{current.desc}</p>
        </div>
      ) : (
        <div className="mt-4 rounded-xl p-4 bg-gray-50 border-2 border-dashed border-gray-200 text-center">
          <p className="text-xs text-gray-400">No milestone selected for this filter.</p>
        </div>
      )}
    </div>
  );
};

export default TimelineDemo;

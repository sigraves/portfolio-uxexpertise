import { useState, useCallback } from 'react';
import { StickyNote, X, Mic, ClipboardList, BarChart3 } from 'lucide-react';

type Method = 'interview' | 'survey' | 'analytics';
type Theme = 'Onboarding' | 'Navigation' | 'Trust';

interface Insight {
  id: number;
  text: string;
  method: Method;
  theme: Theme;
  evidence: string;
}

const methodConfig: Record<Method, { color: string; bg: string; label: string; icon: typeof Mic }> = {
  interview: { color: '#0d9488', bg: '#0d948815', label: 'Interview', icon: Mic },
  survey: { color: '#2563eb', bg: '#2563eb15', label: 'Survey', icon: ClipboardList },
  analytics: { color: '#7c3aed', bg: '#7c3aed15', label: 'Analytics', icon: BarChart3 },
};

const insights: Insight[] = [
  { id: 1, text: 'New users skip the tour because it covers too much at once.', method: 'interview', theme: 'Onboarding', evidence: '5 of 8 participants abandoned the tour within 10 seconds. Quote: "I will figure it out myself."' },
  { id: 2, text: 'The getting-started checklist increases activation by 32%.', method: 'analytics', theme: 'Onboarding', evidence: 'Users who complete 3+ checklist items have a 32% higher day-7 retention rate (n=4,212).' },
  { id: 3, text: 'People look for search in the top-right, not the center.', method: 'survey', theme: 'Navigation', evidence: '71% of 340 respondents expect search top-right; 22% looked there first before scanning.' },
  { id: 4, text: 'Breadcrumbs are ignored — users rely on the back button.', method: 'analytics', theme: 'Navigation', evidence: 'Breadcrumb click-through is 3.1%; back-button usage on sub-pages is 61%.' },
  { id: 5, text: 'No price shown upfront makes users assume it is a scam.', method: 'interview', theme: 'Trust', evidence: '3 participants explicitly said "hidden pricing feels shady" during moderated sessions.' },
  { id: 6, text: 'Trust badges near the CTA lift conversion by 14%.', method: 'analytics', theme: 'Trust', evidence: 'A/B test: variant with security badges converted 14% better over a 3-week period.' },
  { id: 7, text: 'Onboarding tooltips interrupt the flow too aggressively.', method: 'survey', theme: 'Onboarding', evidence: '48% rated tooltips "annoying"; qualitative comments cite poor timing.' },
  { id: 8, text: 'The mobile menu is hard to discover — low tap rate.', method: 'analytics', theme: 'Navigation', evidence: 'Hamburger menu tap rate is 12% on mobile; users scroll to find links instead.' },
];

const themes: (Theme | 'All')[] = ['All', 'Onboarding', 'Navigation', 'Trust'];

const InsightWallDemo = () => {
  const [filter, setFilter] = useState<Theme | 'All'>('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const toggle = useCallback((id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const filtered = filter === 'All' ? insights : insights.filter((i) => i.theme === filter);
  const selected = insights.find((i) => i.id === selectedId);
  const SelMethod = selected ? methodConfig[selected.method] : null;

  return (
    <div>
      {/* Theme tabs */}
      <div className="flex items-center gap-1.5 mb-4 flex-wrap">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            aria-pressed={filter === t}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filter === t ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sticky notes */}
        <div className="grid grid-cols-2 gap-2.5">
          {filtered.map((note) => {
            const cfg = methodConfig[note.method];
            const Icon = cfg.icon;
            const isActive = selectedId === note.id;
            return (
              <button
                key={note.id}
                onClick={() => toggle(note.id)}
                aria-pressed={isActive}
                className="text-left rounded-lg p-3 transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                style={{
                  backgroundColor: cfg.bg,
                  border: `2px solid ${cfg.color}30`,
                  transform: `rotate(${note.id % 2 ? 1 : -1}deg)`,
                }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <StickyNote className="w-3.5 h-3.5" style={{ color: cfg.color }} />
                  <span className="text-[9px] font-black uppercase tracking-wide" style={{ color: cfg.color }}>
                    {cfg.label}
                  </span>
                </div>
                <p className="text-xs text-gray-700 leading-snug font-medium">{note.text}</p>
                <p className="text-[9px] text-gray-400 mt-1.5 font-bold">{note.theme}</p>
              </button>
            );
          })}
        </div>

        {/* Evidence panel */}
        <div className="rounded-xl border-2 border-gray-200 bg-white p-4 min-h-[260px]">
          {selected && SelMethod ? (
            <div className="animate-pmt-reveal">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: SelMethod.bg }}
                  >
                    <SelMethod.icon className="w-4 h-4" style={{ color: SelMethod.color }} />
                  </div>
                  <span
                    className="text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: SelMethod.bg, color: SelMethod.color }}
                  >
                    {SelMethod.label}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  aria-label="Close evidence"
                  className="text-gray-300 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm font-bold text-gray-900 mb-2">{selected.text}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Supporting Evidence</p>
              <p className="text-xs text-gray-600 leading-relaxed">{selected.evidence}</p>
              <p className="text-[10px] text-gray-400 mt-3 font-bold">Theme: {selected.theme}</p>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <StickyNote className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-400">Click a sticky note to see its supporting evidence</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightWallDemo;

import { useState, useCallback } from 'react';
import { AlertTriangle, Info, CheckCircle2, Filter } from 'lucide-react';

type Severity = 'high' | 'medium' | 'low';

interface Hotspot {
  id: number;
  x: number;
  y: number;
  severity: Severity;
  concern: string;
  rationale: string;
  recommendation: string;
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    x: 15,
    y: 20,
    severity: 'high',
    concern: 'No search functionality',
    rationale: 'Users arriving with a specific goal cannot find content efficiently and must rely on manual scrolling.',
    recommendation: 'Add a prominent search bar in the header with autocomplete suggestions.',
  },
  {
    id: 2,
    x: 70,
    y: 15,
    severity: 'medium',
    concern: 'Low-contrast call-to-action button',
    rationale: 'The primary CTA uses a light gray button that blends into the background, reducing click-through.',
    recommendation: 'Increase button contrast to meet WCAG AA (4.5:1) and use a bold accent color.',
  },
  {
    id: 3,
    x: 45,
    y: 50,
    severity: 'high',
    concern: 'Form fields lack labels',
    rationale: 'Placeholder text disappears on focus, leaving users without context when filling in the form.',
    recommendation: 'Add persistent visible labels above each field and associate them with htmlFor.',
  },
  {
    id: 4,
    x: 80,
    y: 65,
    severity: 'low',
    concern: 'Inconsistent button border radius',
    rationale: 'Buttons use different corner radii across the page, creating a fragmented visual identity.',
    recommendation: 'Standardize all interactive buttons to a single border-radius token.',
  },
  {
    id: 5,
    x: 25,
    y: 75,
    severity: 'medium',
    concern: 'No breadcrumb navigation',
    rationale: 'Users who drill into sub-pages lose context and cannot easily return to a higher level.',
    recommendation: 'Add breadcrumb trails showing the user\u2019s path from the homepage.',
  },
];

const severityConfig: Record<Severity, { color: string; bg: string; icon: typeof AlertTriangle; label: string }> = {
  high: { color: '#dc2626', bg: '#dc262615', icon: AlertTriangle, label: 'High Priority' },
  medium: { color: '#f97316', bg: '#f9731615', icon: Info, label: 'Medium Priority' },
  low: { color: '#059669', bg: '#05966915', icon: CheckCircle2, label: 'Low Priority' },
};

const PrioritizationHotspotsDemo = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [filter, setFilter] = useState<Severity | 'all'>('all');

  const toggleHotspot = useCallback((id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const filteredHotspots = filter === 'all' ? hotspots : hotspots.filter((h) => h.severity === filter);
  const activeHotspot = hotspots.find((h) => h.id === activeId);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Filter className="w-4 h-4 text-gray-400" />
        <span className="text-xs font-bold text-gray-500">Filter:</span>
        {(['all', 'high', 'medium', 'low'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
              filter === f ? 'text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
            style={filter === f ? { backgroundColor: f === 'all' ? '#64748b' : severityConfig[f].color } : {}}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Mockup */}
        <div
          className="relative rounded-xl border-2 border-gray-200 bg-white overflow-hidden"
          style={{ minHeight: '320px' }}
        >
          {/* Fake website mockup */}
          <div className="absolute inset-0 p-4">
            <div className="h-8 rounded bg-gray-100 mb-3 flex items-center px-3">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-2" />
              <div className="flex-1 h-3 rounded bg-gray-200" />
            </div>
            <div className="h-4 rounded bg-teal-50 mb-2" />
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="h-16 rounded bg-gray-50" />
              <div className="h-16 rounded bg-gray-50" />
              <div className="h-16 rounded bg-gray-50" />
            </div>
            <div className="h-24 rounded bg-gray-50 mb-2" />
            <div className="h-12 rounded bg-gray-50" />
          </div>

          {/* Hotspots */}
          {filteredHotspots.map((h) => {
            const cfg = severityConfig[h.severity];
            const Icon = cfg.icon;
            const isActive = activeId === h.id;
            return (
              <button
                key={h.id}
                onClick={() => toggleHotspot(h.id)}
                style={{ left: `${h.x}%`, top: `${h.y}%`, backgroundColor: cfg.color }}
                aria-label={`Hotspot ${h.id}: ${cfg.label} - ${h.concern}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-lg transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1 ${
                  isActive ? 'scale-125 ring-2 ring-white' : ''
                }`}
              >
                {h.id}
                {isActive && (
                  <Icon className="w-3 h-3 absolute -top-1 -right-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Finding detail */}
        <div className="rounded-xl border-2 border-gray-200 bg-white p-4 min-h-[320px]">
          {activeHotspot ? (
            <div className="animate-pmt-reveal">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center"
                  style={{ backgroundColor: severityConfig[activeHotspot.severity].color }}
                >
                  {activeHotspot.id}
                </div>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: severityConfig[activeHotspot.severity].bg,
                    color: severityConfig[activeHotspot.severity].color,
                  }}
                >
                  {severityConfig[activeHotspot.severity].label}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900 mb-2">{activeHotspot.concern}</p>
              <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
                <p><span className="font-bold text-gray-700">Rationale:</span> {activeHotspot.rationale}</p>
                <p><span className="font-bold text-gray-700">Recommendation:</span> {activeHotspot.recommendation}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Info className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-400">Click a numbered hotspot to reveal the finding</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrioritizationHotspotsDemo;

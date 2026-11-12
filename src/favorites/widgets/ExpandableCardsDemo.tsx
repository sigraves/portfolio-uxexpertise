import { useState, useCallback } from 'react';
import { ChevronDown, X, Layers, Search, Zap } from 'lucide-react';

interface CardData {
  id: number;
  title: string;
  summary: string;
  detail: string;
  color: string;
  icon: typeof Layers;
}

const cards: CardData[] = [
  {
    id: 1,
    title: 'User Interviews',
    summary: 'Talk to real users about their goals and frustrations.',
    detail: 'Structured interviews uncover needs users can\u2019t articulate. Use open-ended questions, practice active listening, and synthesize themes across multiple participants. Aim for 5\u20138 interviews per persona segment.',
    color: '#059669',
    icon: Search,
  },
  {
    id: 2,
    title: 'Rapid Prototyping',
    summary: 'Build, test, and iterate in hours, not weeks.',
    detail: 'Low-fidelity prototypes test core flows before any code is written. Start with paper sketches, move to clickable wireframes, and validate with 3\u20135 users. Each iteration should answer a specific question.',
    color: '#f97316',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Design Systems',
    summary: 'Reusable components that scale across products.',
    detail: 'A design system codifies patterns, tokens, and components so teams move faster with consistency. Document usage guidelines, accessibility requirements, and edge cases for every component.',
    color: '#0ea5e9',
    icon: Layers,
  },
];

const ExpandableCardsDemo = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [overlayId, setOverlayId] = useState<number | null>(null);

  const toggleExpand = useCallback((id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const card = cards.find((c) => c.id === overlayId);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {cards.map((c) => {
          const isExpanded = expandedId === c.id;
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              aria-expanded={isExpanded}
              onClick={() => toggleExpand(c.id)}
              className="text-left rounded-xl p-4 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              style={{
                border: `2px solid ${c.color}25`,
                backgroundColor: isExpanded ? `${c.color}08` : '#FFFFFF',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${c.color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: c.color }} />
                </div>
                <p className="text-sm font-bold text-gray-900">{c.title}</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{c.summary}</p>
              <div
                className={`grid transition-all duration-300 ${isExpanded ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-600 leading-relaxed">{c.detail}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold" style={{ color: c.color }}>
                  {isExpanded ? 'Collapse' : 'Expand'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  style={{ color: c.color }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-400 mb-3">Or try the overlay variation:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {cards.map((c) => (
            <button
              key={c.id}
              onClick={() => setOverlayId(c.id)}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              style={{ backgroundColor: c.color }}
            >
              {c.title} Detail
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {card && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-pmt-reveal"
          onClick={() => setOverlayId(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${card.title} detail`}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <card.icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <p className="text-lg font-black text-gray-900">{card.title}</p>
              </div>
              <button
                onClick={() => setOverlayId(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Close detail overlay"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">{card.summary}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{card.detail}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableCardsDemo;

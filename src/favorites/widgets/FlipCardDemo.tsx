import { useState, useCallback } from 'react';
import { Shuffle, RotateCcw, Layers, Search, Lightbulb, Target } from 'lucide-react';

interface CardData {
  id: number;
  front: { icon: typeof Layers; label: string; color: string };
  back: { text: string; color: string };
}

const initialCards: CardData[] = [
  {
    id: 1,
    front: { icon: Search, label: 'Discover', color: '#059669' },
    back: { text: 'Research uncovers what users need but can\u2019t always articulate.', color: '#059669' },
  },
  {
    id: 2,
    front: { icon: Lightbulb, label: 'Define', color: '#f97316' },
    back: { text: 'Synthesize findings into clear, actionable problem statements.', color: '#f97316' },
  },
  {
    id: 3,
    front: { icon: Target, label: 'Decide', color: '#0ea5e9' },
    back: { text: 'Prioritize what matters most using evidence, not opinions.', color: '#0ea5e9' },
  },
];

const FlipCardDemo = () => {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggleFlip = useCallback((id: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const shuffle = useCallback(() => {
    setCards((prev) => [...prev].sort(() => Math.random() - 0.5));
    setFlipped(new Set());
  }, []);

  const reset = useCallback(() => {
    setCards(initialCards);
    setFlipped(new Set());
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={shuffle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" /> Shuffle
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
        <p className="text-xs text-gray-400">Click or press Enter to flip</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => {
          const isFlipped = flipped.has(card.id);
          const Icon = card.front.icon;
          return (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              aria-label={`${card.front.label} card. ${isFlipped ? 'Showing back.' : 'Press Enter to flip.'}`}
              aria-pressed={isFlipped}
              onClick={() => toggleFlip(card.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFlip(card.id);
                }
              }}
              className={`card-3d cursor-pointer rounded-2xl h-48 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 ${isFlipped ? 'card-flipped' : ''}`}
            >
              <div className="card-inner rounded-2xl">
                <div
                  className="card-face card-front flex flex-col items-center justify-center gap-3 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${card.front.color}15, ${card.front.color}30)` }}
                >
                  <Icon className="w-10 h-10" style={{ color: card.front.color }} />
                  <p className="text-lg font-black" style={{ color: card.front.color }}>
                    {card.front.label}
                  </p>
                </div>
                <div
                  className="card-face card-back flex items-center justify-center p-4 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${card.back.color}25, ${card.back.color}45)` }}
                >
                  <p className="text-sm font-bold text-center leading-relaxed" style={{ color: card.back.color }}>
                    {card.back.text}
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

export default FlipCardDemo;

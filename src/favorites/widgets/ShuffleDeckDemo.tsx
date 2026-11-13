import { useState, useCallback } from 'react';
import { Shuffle, RotateCcw, Layers } from 'lucide-react';

interface Principle {
  id: number;
  name: string;
  example: string;
  color: string;
}

const PRINCIPLES: Principle[] = [
  { id: 1, name: 'Hick\u2019s Law', example: 'Fewer menu choices means faster decisions.', color: '#059669' },
  { id: 2, name: 'Fitts\u2019s Law', example: 'Bigger, closer targets are easier to tap.', color: '#f97316' },
  { id: 3, name: 'Jakob\u2019s Law', example: 'Users expect your site to work like others.', color: '#0ea5e9' },
  { id: 4, name: 'Miller\u2019s Law', example: 'People hold about 7±2 items in memory.', color: '#8B5CF6' },
  { id: 5, name: 'Proximity', example: 'Group related items close together.', color: '#ec4899' },
  { id: 6, name: 'Feedback', example: 'Confirm every action with a visible response.', color: '#14B8A6' },
  { id: 7, name: 'Affordance', example: 'A raised button looks pressable.', color: '#be185d' },
  { id: 8, name: 'Consistency', example: 'Same icon means the same action everywhere.', color: '#6366F1' },
];

const shuffled = () => [...PRINCIPLES].sort(() => Math.random() - 0.5);

const ShuffleDeckDemo = () => {
  const [deck, setDeck] = useState<Principle[]>(shuffled);
  const [drawn, setDrawn] = useState<Principle[]>([]);
  const [flipped, setFlipped] = useState(false);

  const remaining = deck.length;
  const current = drawn[drawn.length - 1] ?? null;

  const draw = useCallback(() => {
    setFlipped(false);
    // brief delay so the flip resets before the new card animates in
    setTimeout(() => {
      setDeck((d) => {
        if (d.length === 0) return d;
        const [next, ...rest] = d;
        setDrawn((prev) => [...prev, next]);
        setFlipped(true);
        return rest;
      });
    }, 60);
  }, []);

  const shuffle = useCallback(() => {
    setDeck(shuffled());
    setDrawn([]);
    setFlipped(false);
  }, []);

  const reset = useCallback(() => {
    setDeck(shuffled());
    setDrawn([]);
    setFlipped(false);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={shuffle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Shuffle className="w-3.5 h-3.5" /> Shuffle
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
        <p className="text-xs font-bold text-gray-500">{remaining} remaining</p>
      </div>

      {/* Deck area */}
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-xs h-52 mb-4">
          {/* Deck stack visualization */}
          {remaining > 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute w-48 h-64 rounded-2xl border-2 bg-white"
                  style={{
                    borderColor: '#0ea5e920',
                    transform: `translateY(${i * 4}px) translateX(${i * 3}px)`,
                    opacity: 0.6 - i * 0.18,
                    zIndex: 0,
                  }}
                />
              ))}
            </div>
          )}

          {/* Drawn card */}
          {current ? (
            <div
              key={current.id}
              role="region"
              aria-label={`${current.name} card`}
              className={`card-3d absolute inset-0 flex items-center justify-center ${flipped ? 'card-flipped' : ''} animate-card-draw`}
              style={{ zIndex: 1 }}
            >
              <div className="card-inner rounded-2xl w-48 h-64">
                <div
                  className="card-face card-front flex flex-col items-center justify-center gap-3 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${current.color}20, ${current.color}40)` }}
                >
                  <Layers className="w-8 h-8" style={{ color: current.color }} />
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: current.color }}>
                    Card {drawn.length}
                  </p>
                  <p className="text-lg font-black text-center px-3" style={{ color: current.color }}>
                    {current.name}
                  </p>
                </div>
                <div
                  className="card-face card-back flex items-center justify-center p-5 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${current.color}30, ${current.color}55)` }}
                >
                  <p className="text-sm font-bold text-center leading-relaxed text-white">{current.example}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs text-gray-400 italic">Deck shuffled — press Draw</p>
            </div>
          )}
        </div>

        <button
          onClick={draw}
          disabled={remaining === 0 && !current}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          {remaining === 0 ? 'All Drawn' : 'Draw Card'}
        </button>
        <p className="text-[10px] text-gray-400 italic mt-2">
          {current ? 'Card flips to reveal the example.' : 'Shuffle randomizes the 8 principle cards.'}
        </p>
      </div>
    </div>
  );
};

export default ShuffleDeckDemo;

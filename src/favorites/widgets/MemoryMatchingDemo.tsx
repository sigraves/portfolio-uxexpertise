import { useState, useCallback, useEffect } from 'react';
import { RotateCcw, Check } from 'lucide-react';

interface Pair {
  term: string;
  definition: string;
  color: string;
}

const PAIRS: Pair[] = [
  { term: 'Affordance', definition: 'A clue to how an object should be used', color: '#059669' },
  { term: 'Heuristic', definition: 'A rule-of-thumb for usable design', color: '#f97316' },
  { term: 'Mental Model', definition: 'What a user believes about a system', color: '#0ea5e9' },
  { term: 'Wayfinding', definition: 'How people orient & navigate a space', color: '#8B5CF6' },
];

interface Card {
  uid: number;
  pairId: number;
  text: string;
  color: string;
}

const buildDeck = (): Card[] => {
  const cards: Card[] = [];
  PAIRS.forEach((p, i) => {
    cards.push({ uid: i * 2, pairId: i, text: p.term, color: p.color });
    cards.push({ uid: i * 2 + 1, pairId: i, text: p.definition, color: p.color });
  });
  return cards.sort(() => Math.random() - 0.5);
};

const MemoryMatchingDemo = () => {
  const [deck, setDeck] = useState<Card[]>(buildDeck);
  const [flipped, setFlipped] = useState<number[]>([]); // uids currently face-up (not matched)
  const [matched, setMatched] = useState<Set<number>>(new Set()); // pairIds matched
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const won = matched.size === PAIRS.length;

  const flip = useCallback(
    (uid: number) => {
      if (locked || won) return;
      const card = deck.find((c) => c.uid === uid);
      if (!card) return;
      if (flipped.includes(uid)) return;
      if (matched.has(card.pairId)) return;

      const nextFlipped = [...flipped, uid];
      setFlipped(nextFlipped);

      if (nextFlipped.length === 2) {
        setMoves((m) => m + 1);
        setLocked(true);
        const [a, b] = nextFlipped.map((id) => deck.find((c) => c.uid === id)!);
        if (a.pairId === b.pairId) {
          setTimeout(() => {
            setMatched((prev) => new Set(prev).add(a.pairId));
            setFlipped([]);
            setLocked(false);
          }, 600);
        } else {
          setTimeout(() => {
            setFlipped([]);
            setLocked(false);
          }, 1100);
        }
      }
    },
    [deck, flipped, locked, matched, won]
  );

  const reset = useCallback(() => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLocked(false);
  }, []);

  useEffect(() => () => setLocked(false), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4 text-xs font-bold text-gray-500">
          <span>Moves: <span className="text-gray-900">{moves}</span></span>
          <span>Pairs: <span className="text-gray-900">{matched.size}/{PAIRS.length}</span></span>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2.5 mb-4">
        {deck.map((card) => {
          const isUp = flipped.includes(card.uid) || matched.has(card.pairId);
          const isMatched = matched.has(card.pairId);
          return (
            <div
              key={card.uid}
              role="button"
              tabIndex={0}
              aria-label={isUp ? card.text : 'Face-down card'}
              aria-pressed={isUp}
              onClick={() => flip(card.uid)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  flip(card.uid);
                }
              }}
              className={`card-3d cursor-pointer h-24 sm:h-28 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl ${isUp ? 'card-flipped' : ''}`}
            >
              <div className="card-inner rounded-xl">
                {/* Back (face-down) */}
                <div className="card-face card-front flex items-center justify-center rounded-xl bg-slate-700 shadow-md">
                  <span className="text-white/40 text-2xl font-black">?</span>
                </div>
                {/* Front (face-up) */}
                <div
                  className="card-face card-back flex items-center justify-center p-2 rounded-xl shadow-md text-center"
                  style={{ background: `linear-gradient(135deg, ${card.color}20, ${card.color}45)` }}
                >
                  <div className="flex flex-col items-center gap-1">
                    {isMatched && <Check className="w-3.5 h-3.5" style={{ color: card.color }} />}
                    <p className="text-[11px] font-bold leading-tight" style={{ color: card.color }}>
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {won ? (
        <p className="text-center text-sm font-black text-emerald-600 animate-badge-pop">
          Complete! All {PAIRS.length} pairs found in {moves} moves.
        </p>
      ) : (
        <p className="text-[10px] text-gray-400 italic text-center">
          Flip two cards. Match a term with its definition.
        </p>
      )}
    </div>
  );
};

export default MemoryMatchingDemo;

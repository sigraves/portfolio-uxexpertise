import React from 'react';
import type { Deck } from './types';

interface Props {
  deck: Deck;
  onClick: () => void;
  index: number;
}

const DeckStack = React.forwardRef<HTMLButtonElement, Props>(({ deck, onClick, index }, ref) => {
  const stackLayers = 4;

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="group relative focus:outline-none focus:z-30 text-left animate-deck-rise"
      style={{ animationDelay: `${index * 0.15}s` }}
      aria-label={`Draw from the ${deck.name} deck — ${deck.subtitle}`}
    >
      {/* Stacked card backs */}
      {Array.from({ length: stackLayers }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-xl transition-all duration-500 group-hover:translate-y-1"
          style={{
            top: `${i * 3}px`,
            left: `${i * 2}px`,
            right: `${-i * 2}px`,
            bottom: `${-i * 3}px`,
            background: `linear-gradient(135deg, ${deck.color}${i === 0 ? '' : 'cc'}, ${deck.color}${i === 0 ? 'dd' : '99'})`,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: i === 0 ? '0 12px 30px -8px rgba(0,0,0,0.5)' : 'none',
            zIndex: stackLayers - i,
          }}
          aria-hidden="true"
        >
          {i === 0 && (
            <div className="absolute inset-2 rounded-lg border border-white/15" />
          )}
        </div>
      ))}

      {/* Front card back design */}
      <div
        className="relative rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[200px] sm:min-h-[220px] transition-transform duration-500 group-hover:-translate-y-2"
        style={{
          background: `linear-gradient(145deg, ${deck.color}, ${deck.color}cc)`,
          border: '2px solid rgba(255,255,255,0.15)',
          zIndex: stackLayers + 1,
        }}
      >
        {/* Decorative inner border */}
        <div className="absolute inset-2 rounded-lg border-2 border-white/15" aria-hidden="true" />

        {/* Shimmer effect on hover */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
              animation: 'card-shimmer 2s ease-in-out infinite',
            }}
          />
        </div>

        <div className="relative z-10">
          <div
            className="text-4xl mb-3 transition-transform duration-500 group-hover:scale-125"
            style={{ color: 'rgba(255,255,255,0.85)' }}
            aria-hidden="true"
          >
            {deck.symbol}
          </div>
          <h3 className="text-lg font-black text-white tracking-wider mb-1">
            {deck.name}
          </h3>
          <p className="text-xs font-medium text-white/70 uppercase tracking-widest">
            {deck.subtitle}
          </p>
          <p className="text-xs text-white/60 mt-3 leading-relaxed max-w-[200px] mx-auto hidden sm:block">
            {deck.cards.length} cards
          </p>
        </div>

        {/* Hover prompt */}
        <div className="absolute bottom-3 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
            Draw a Card →
          </span>
        </div>
      </div>
    </button>
  );
});

DeckStack.displayName = 'DeckStack';

export default DeckStack;

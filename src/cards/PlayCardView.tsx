import React, { useState, forwardRef } from 'react';
import { RotateCw, Check, X, Lightbulb, Sparkles } from 'lucide-react';
import type { PlayCard as PlayCardType } from './types';
import { suitSymbolMap, suitColorMap } from './types';

interface Props {
  card: PlayCardType;
  index: number;
  onClose: () => void;
}

const PlayCardView = forwardRef<HTMLDivElement, Props>(({ card, index, onClose }, ref) => {
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [revealedAnswer, setRevealedAnswer] = useState(false);

  const symbol = suitSymbolMap[card.suit];
  const suitColor = suitColorMap[card.suit];
  const isChooseCard = card.kind === 'choose' && card.options;

  const handleAnswerSelect = (letter: string) => {
    if (revealedAnswer) return;
    setSelectedAnswer(letter);
  };

  const handleRevealAnswers = () => {
    setRevealedAnswer(true);
  };

  const handleFlip = () => {
    // For choose cards, require answer selection before flipping
    if (isChooseCard && !revealedAnswer && !selectedAnswer) {
      return;
    }
    setFlipped(!flipped);
  };

  const canFlip = !isChooseCard || revealedAnswer || selectedAnswer !== null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`${card.rank} of ${card.suit} — ${card.title}`}
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md my-auto animate-card-draw">
        {/* Card container with 3D perspective */}
        <div className={`card-3d ${flipped ? 'card-flipped' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="card-inner" style={{ minHeight: '540px', height: 'min(70vh, 640px)' }}>

            {/* ── FRONT FACE ── */}
            <div
              className="card-face flex flex-col"
              style={{
                background: 'linear-gradient(145deg, #fefce8, #fef3c7)',
                border: `2px solid ${suitColor}30`,
                boxShadow: `0 20px 60px -10px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.5)`,
              }}
            >
              {/* Card top corner */}
              <div className="flex items-start justify-between p-4 pb-2">
                <div className="flex flex-col items-center leading-none">
                  <span className="text-xl font-black" style={{ color: suitColor }}>{card.rank}</span>
                  <span className="text-lg" style={{ color: suitColor }}>{symbol}</span>
                </div>
                <div className="flex flex-col items-center leading-none transform rotate-180">
                  <span className="text-xl font-black" style={{ color: suitColor }}>{card.rank}</span>
                  <span className="text-lg" style={{ color: suitColor }}>{symbol}</span>
                </div>
              </div>

              {/* Card body */}
              <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6 text-center">
                <div
                  className="text-5xl mb-4 animate-suit-pulse"
                  style={{ color: suitColor }}
                  aria-hidden="true"
                >
                  {symbol}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {card.title}
                </h3>

                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {card.scenario}
                </p>

                <div
                  className="w-full rounded-lg p-3 mb-4"
                  style={{ background: `${suitColor}10`, borderLeft: `3px solid ${suitColor}` }}
                >
                  <p className="text-sm font-semibold text-gray-900 italic">
                    {card.question}
                  </p>
                </div>

                {/* Answer options for choose cards */}
                {isChooseCard && (
                  <div className="w-full space-y-2 mb-4">
                    {card.options!.map((opt) => {
                      const isSelected = selectedAnswer === opt.letter;
                      const showResult = revealedAnswer && (isSelected || opt.correct);
                      const showWrong = revealedAnswer && isSelected && !opt.correct;
                      return (
                        <button
                          key={opt.letter}
                          onClick={() => handleAnswerSelect(opt.letter)}
                          disabled={revealedAnswer}
                          className={`w-full text-left rounded-lg border-2 p-3 transition-all duration-200 flex items-start gap-3 ${
                            showResult && opt.correct
                              ? 'border-green-500 bg-green-50'
                              : showWrong
                                ? 'border-red-400 bg-red-50'
                                : isSelected
                                  ? 'border-gray-800 bg-gray-100'
                                  : 'border-gray-200 bg-white hover:border-gray-400'
                          } ${revealedAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{
                              background: showResult && opt.correct ? '#22c55e' : showWrong ? '#ef4444' : suitColor,
                              color: 'white',
                            }}
                          >
                            {showResult && opt.correct ? <Check className="w-3.5 h-3.5" /> : showWrong ? <X className="w-3.5 h-3.5" /> : opt.letter}
                          </span>
                          <span className="text-sm text-gray-700 leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Action area */}
                <div className="w-full flex flex-col items-center gap-2 mt-auto">
                  {isChooseCard && selectedAnswer && !revealedAnswer && (
                    <button
                      onClick={handleRevealAnswers}
                      className="w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-all"
                      style={{ background: suitColor }}
                    >
                      Reveal Answer
                    </button>
                  )}
                  {canFlip && (
                    <button
                      onClick={handleFlip}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <RotateCw className="w-4 h-4" />
                      {isChooseCard && !revealedAnswer ? 'Flip to see reasoning' : 'Flip to see my reasoning'}
                    </button>
                  )}
                  {!canFlip && (
                    <p className="text-xs text-gray-400 italic">
                      {isChooseCard ? 'Choose an answer to continue' : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── BACK FACE ── */}
            <div
              className="card-face card-back flex flex-col"
              style={{
                background: `linear-gradient(145deg, ${suitColor}, ${suitColor}dd)`,
                boxShadow: `0 20px 60px -10px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.15)`,
              }}
            >
              {/* Decorative border */}
              <div className="absolute inset-3 rounded-lg border-2 border-white/15" aria-hidden="true" />

              {/* Card top corner */}
              <div className="flex items-start justify-between p-4 pb-2 relative z-10">
                <div className="flex flex-col items-center leading-none">
                  <span className="text-xl font-black text-white/80">{card.rank}</span>
                  <span className="text-lg text-white/80">{symbol}</span>
                </div>
                <div className="flex flex-col items-center leading-none transform rotate-180">
                  <span className="text-xl font-black text-white/80">{card.rank}</span>
                  <span className="text-lg text-white/80">{symbol}</span>
                </div>
              </div>

              {/* Back body */}
              <div className="flex-1 flex flex-col px-6 pb-6 relative z-10">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2 text-white/25" aria-hidden="true">{symbol}</div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15">
                    <Lightbulb className="w-3.5 h-3.5 text-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">My Reasoning</span>
                  </div>
                </div>

                {/* Choose card result banner */}
                {isChooseCard && revealedAnswer && selectedAnswer && (
                  <div className="mb-3 rounded-lg p-3 text-center" style={{
                    background: card.options!.find(o => o.letter === selectedAnswer)?.correct
                      ? 'rgba(34, 197, 94, 0.25)'
                      : 'rgba(239, 68, 68, 0.25)',
                  }}>
                    <p className="text-sm font-bold text-white">
                      {card.options!.find(o => o.letter === selectedAnswer)?.correct
                        ? 'Correct!'
                        : 'Not quite — but the reasoning is what matters.'}
                    </p>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto rounded-lg bg-white/10 p-4 mb-4">
                  <p className="text-sm text-white leading-relaxed">
                    {card.reasoning}
                  </p>
                </div>

                <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-white/70 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-white/90 leading-relaxed italic">
                      {card.principle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleFlip}
                  className="mt-3 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                  Flip back
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-gray-800 flex items-center justify-center font-bold text-lg shadow-lg hover:scale-110 transition-transform z-20"
          aria-label="Close card"
        >
          ×
        </button>

        {/* Card counter */}
        <div className="text-center mt-4 text-white/40 text-xs font-medium">
          Card {index + 1} · {card.rank}{symbol}
        </div>
      </div>
    </div>
  );
});

PlayCardView.displayName = 'PlayCardView';

export default PlayCardView;

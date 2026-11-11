import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { RotateCw, Check, X, Lightbulb, Sparkles, ArrowRight, Construction } from 'lucide-react';
import type { PlayCard as PlayCardType } from './types';
import { suitSymbolMap, suitColorMap } from './types';

interface Props {
  card: PlayCardType;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const PlayCardView = forwardRef<HTMLDivElement, Props>(({ card, index, total, onClose, onPrev, onNext }, ref) => {
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [showProjectNotice, setShowProjectNotice] = useState(false);

  const symbol = suitSymbolMap[card.suit];
  const suitColor = suitColorMap[card.suit];
  const isChooseCard = card.kind === 'choose' && card.options;
  const canFlip = !isChooseCard || revealedAnswer || selectedAnswer !== null;

  // Reset state when card changes
  useEffect(() => {
    setFlipped(false);
    setSelectedAnswer(null);
    setRevealedAnswer(false);
    setShowProjectNotice(false);
  }, [card.id]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight' && index < total - 1) {
        e.preventDefault();
        onNext();
      }
    },
    [index, total, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleAnswerSelect = (letter: string) => {
    if (revealedAnswer) return;
    setSelectedAnswer(letter);
  };

  const handleRevealAnswers = () => {
    setRevealedAnswer(true);
  };

  const handleFlip = () => {
    if (isChooseCard && !revealedAnswer && !selectedAnswer) return;
    setFlipped(true);
  };

  const handleFlipBack = () => {
    setFlipped(false);
  };

  const handleExploreProject = () => {
    setShowProjectNotice(true);
  };

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-3 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`${card.rank} of ${card.suit} — ${card.title}`}
    >
      {/* Backdrop — clicking closes, does NOT flip */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card wrapper */}
      <div className="relative z-10 w-full max-w-md my-auto animate-card-draw">
        {/* 3D flip container */}
        <div className={`card-3d ${flipped ? 'card-flipped' : ''}`}>
          <div
            className="card-inner"
            style={{ height: 'min(82vh, 680px)', minHeight: '500px' }}
          >

            {/* ════════════════════════════════════════
                FRONT FACE — Deck-colored card back
                ════════════════════════════════════════ */}
            <div
              className="card-face flex flex-col"
              style={{
                background: `linear-gradient(145deg, ${suitColor}, ${suitColor}dd)`,
                boxShadow: `0 20px 60px -10px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.15)`,
                borderRadius: '14px',
              }}
            >
              {/* Decorative inner border */}
              <div className="absolute inset-2.5 rounded-lg border-2 border-white/15" aria-hidden="true" />

              {/* Corner rank/suit */}
              <div className="flex items-start justify-between p-4 pb-2 relative z-10">
                <div className="flex flex-col items-center leading-none">
                  <span className="text-xl font-black text-white/90">{card.rank}</span>
                  <span className="text-lg text-white/90">{symbol}</span>
                </div>
                <div className="flex flex-col items-center leading-none transform rotate-180">
                  <span className="text-xl font-black text-white/90">{card.rank}</span>
                  <span className="text-lg text-white/90">{symbol}</span>
                </div>
              </div>

              {/* Front body — scenario preview */}
              <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6 relative z-10 text-center">
                <div
                  className="text-5xl mb-5 animate-suit-pulse text-white/30"
                  aria-hidden="true"
                >
                  {symbol}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {card.title}
                </h3>

                <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-[260px]">
                  {card.scenario}
                </p>

                <div className="w-full rounded-lg p-3 mb-2 bg-white/10 border-l-2 border-white/30">
                  <p className="text-sm font-semibold text-white italic">
                    {card.question}
                  </p>
                </div>

                {/* Hint */}
                <p className="text-xs text-white/40 mt-4">
                  {isChooseCard ? 'Choose an answer, then flip to see my reasoning' : 'Flip to see my reasoning'}
                </p>
              </div>

              {/* Flip button */}
              <div className="px-6 pb-5 relative z-10">
                <button
                  onClick={handleFlip}
                  disabled={!canFlip}
                  className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                    canFlip
                      ? 'bg-white text-gray-900 hover:bg-white/90 cursor-pointer'
                      : 'bg-white/20 text-white/50 cursor-not-allowed'
                  }`}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <RotateCw className="w-4 h-4" />
                    Flip Card
                  </span>
                </button>
                {!canFlip && (
                  <p className="text-center text-xs text-white/40 mt-2">
                    Select an answer first
                  </p>
                )}
              </div>
            </div>

            {/* ════════════════════════════════════════
                BACK FACE — Pure white, deck-color accents
                ════════════════════════════════════════ */}
            <div
              className="card-face card-back flex flex-col"
              style={{
                background: '#FFFFFF',
                boxShadow: `0 20px 60px -10px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.05)`,
                borderRadius: '14px',
                border: `2px solid ${suitColor}30`,
              }}
            >
              {/* Corner rank/suit — deck color accent */}
              <div className="flex items-start justify-between p-4 pb-2 flex-shrink-0">
                <div className="flex flex-col items-center leading-none">
                  <span className="text-xl font-black" style={{ color: suitColor }}>{card.rank}</span>
                  <span className="text-lg" style={{ color: suitColor }}>{symbol}</span>
                </div>
                <div className="flex flex-col items-center leading-none transform rotate-180">
                  <span className="text-xl font-black" style={{ color: suitColor }}>{card.rank}</span>
                  <span className="text-lg" style={{ color: suitColor }}>{symbol}</span>
                </div>
              </div>

              {/* Scrollable content area */}
              <div className="flex-1 overflow-y-auto px-5 pb-3">
                {/* Section label */}
                <div className="text-center mb-3 flex-shrink-0">
                  <div
                    className="text-3xl mb-1.5"
                    style={{ color: suitColor, opacity: 0.2 }}
                    aria-hidden="true"
                  >
                    {symbol}
                  </div>
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                    style={{ background: `${suitColor}12` }}
                  >
                    <Lightbulb className="w-3.5 h-3.5" style={{ color: suitColor }} />
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: suitColor }}
                    >
                      My Reasoning
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight text-center">
                  {card.title}
                </h3>

                {/* Question reminder */}
                <div
                  className="rounded-lg p-3 mb-3"
                  style={{ background: `${suitColor}08`, borderLeft: `3px solid ${suitColor}` }}
                >
                  <p className="text-xs text-gray-500 mb-1 font-medium">
                    {card.question}
                  </p>
                </div>

                {/* Choose card answer options */}
                {isChooseCard && (
                  <div className="space-y-2 mb-3">
                    {card.options!.map((opt) => {
                      const isSelected = selectedAnswer === opt.letter;
                      const showCorrect = revealedAnswer && opt.correct;
                      const showWrong = revealedAnswer && isSelected && !opt.correct;
                      return (
                        <button
                          key={opt.letter}
                          onClick={() => handleAnswerSelect(opt.letter)}
                          disabled={revealedAnswer}
                          className={`w-full text-left rounded-lg border-2 p-2.5 transition-all duration-200 flex items-start gap-2.5 ${
                            showCorrect
                              ? 'border-green-500 bg-green-50'
                              : showWrong
                                ? 'border-red-400 bg-red-50'
                                : isSelected
                                  ? 'border-gray-700 bg-gray-50'
                                  : 'border-gray-200 bg-white hover:border-gray-400'
                          } ${revealedAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          <span
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{
                              background: showCorrect ? '#22c55e' : showWrong ? '#ef4444' : suitColor,
                            }}
                          >
                            {showCorrect ? <Check className="w-3 h-3" /> : showWrong ? <X className="w-3 h-3" /> : opt.letter}
                          </span>
                          <span className="text-xs text-gray-700 leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Reveal answer button for choose cards */}
                {isChooseCard && selectedAnswer && !revealedAnswer && (
                  <button
                    onClick={handleRevealAnswers}
                    className="w-full py-2.5 rounded-lg font-semibold text-white text-sm mb-3 transition-all hover:opacity-90"
                    style={{ background: suitColor }}
                  >
                    Reveal Answer
                  </button>
                )}

                {/* Result banner for choose cards */}
                {isChooseCard && revealedAnswer && selectedAnswer && (
                  <div
                    className="mb-3 rounded-lg p-2.5 text-center"
                    style={{
                      background: card.options!.find((o) => o.letter === selectedAnswer)?.correct
                        ? 'rgba(34, 197, 94, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                    }}
                  >
                    <p
                      className="text-sm font-bold"
                      style={{
                        color: card.options!.find((o) => o.letter === selectedAnswer)?.correct
                          ? '#16a34a'
                          : '#dc2626',
                      }}
                    >
                      {card.options!.find((o) => o.letter === selectedAnswer)?.correct
                        ? 'Correct!'
                        : 'Not quite — but the reasoning is what matters.'}
                    </p>
                  </div>
                )}

                {/* Reasoning — dark text on white */}
                <div className="rounded-lg p-3 mb-3 bg-gray-50 border border-gray-100">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {card.reasoning}
                  </p>
                </div>

                {/* Principle — deck color accent */}
                <div
                  className="rounded-lg p-3 mb-3"
                  style={{ background: `${suitColor}08`, border: `1px solid ${suitColor}20` }}
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: suitColor }} />
                    <p className="text-xs text-gray-700 leading-relaxed italic">
                      {card.principle}
                    </p>
                  </div>
                </div>

                {/* Illustrative scenario disclaimer */}
                <p className="text-xs text-gray-400 text-center mb-2 italic">
                  Illustrative scenario — not from a specific client engagement.
                </p>
              </div>

              {/* Bottom action bar — always visible */}
              <div className="flex-shrink-0 border-t border-gray-100 px-4 py-3 flex items-center gap-2">
                {/* Flip Back */}
                <button
                  onClick={handleFlipBack}
                  className="flex-1 py-2.5 rounded-lg font-semibold text-sm border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: `${suitColor}40`, color: suitColor }}
                >
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5" />
                    Flip Back
                  </span>
                </button>

                {/* Explore Project */}
                <button
                  onClick={handleExploreProject}
                  className="flex-1 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90"
                  style={{ background: suitColor }}
                >
                  <span className="inline-flex items-center justify-center gap-1.5">
                    Explore Project
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-white text-gray-800 flex items-center justify-center font-bold text-xl shadow-lg hover:scale-110 transition-transform z-20"
          aria-label="Close card"
        >
          ×
        </button>

        {/* Project placeholder notice */}
        {showProjectNotice && (
          <div className="mt-3 rounded-lg bg-white border border-gray-200 p-4 animate-pmt-reveal shadow-lg">
            <div className="flex items-start gap-3">
              <Construction className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">
                  {card.projectRef || 'Case study coming soon'}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  This card will eventually link to the full case study. The project page is not yet
                  available. Check back soon, or contact Sandra to learn more.
                </p>
                <button
                  onClick={() => setShowProjectNotice(false)}
                  className="mt-2 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card counter + keyboard hints */}
        <div className="text-center mt-3 text-gray-500 text-xs font-medium">
          Card {index + 1} of {total} · {card.rank}{symbol}
          <span className="hidden sm:inline text-gray-400 ml-2">
            · ← → to navigate · Esc to close
          </span>
        </div>
      </div>
    </div>
  );
});

PlayCardView.displayName = 'PlayCardView';

export default PlayCardView;

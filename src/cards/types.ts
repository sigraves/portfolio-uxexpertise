export type Suit = 'diamonds' | 'hearts' | 'clubs' | 'spades';

export type CardKind = 'challenge' | 'choose' | 'reveal';

export interface AnswerOption {
  letter: string;
  text: string;
  correct: boolean;
}

export interface PlayCard {
  id: string;
  suit: Suit;
  rank: string;
  kind: CardKind;
  title: string;
  scenario: string;
  question: string;
  /** For 'choose' cards: selectable answers */
  options?: AnswerOption[];
  /** For 'challenge' and 'reveal' cards: direct reasoning */
  reasoning: string;
  principle: string;
  /** Placeholder for future real project link */
  projectRef?: string;
}

export interface Deck {
  suit: Suit;
  name: string;
  subtitle: string;
  color: string;
  colorRgb: string;
  symbol: string;
  accentClass: string;
  description: string;
  cards: PlayCard[];
}

export const suitSymbolMap: Record<Suit, string> = {
  diamonds: '♦',
  hearts: '♥',
  clubs: '♣',
  spades: '♠',
};

export const suitColorMap: Record<Suit, string> = {
  diamonds: '#dc2626',
  hearts: '#ea580c',
  clubs: '#0f766e',
  spades: '#1e293b',
};

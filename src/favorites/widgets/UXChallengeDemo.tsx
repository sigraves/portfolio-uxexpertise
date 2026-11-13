import { useState, useCallback } from 'react';
import { RotateCcw, Check, X, Trophy } from 'lucide-react';

interface Question {
  id: number;
  scenario: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    scenario: 'A form has 12 required fields. What improves completion most?',
    options: ['Put all fields on one page', 'Group fields into logical sections', 'Remove labels to save space', 'Make every field optional'],
    correct: 1,
    explanation: 'Grouping related fields into sections reduces cognitive load and makes long forms feel manageable.',
  },
  {
    id: 2,
    scenario: 'A user taps a button but nothing visibly happens for 2 seconds. Best fix?',
    options: ['Show a loading spinner immediately', 'Remove the button', 'Add more buttons', 'Do nothing — it loads fine'],
    correct: 0,
    explanation: 'Immediate feedback (a spinner) reassures the user their action registered, reducing uncertainty.',
  },
  {
    id: 3,
    scenario: 'Where should the primary action button go in a dialog?',
    options: ['Top-left, hidden', 'Bottom-right, visually dominant', 'Centered, low contrast', 'Random position each time'],
    correct: 1,
    explanation: 'The primary action should be visually dominant and placed where users expect it (bottom-right in LTR layouts).',
  },
  {
    id: 4,
    scenario: 'An error message reads "Error 4023". How should it be rewritten?',
    options: ['Keep the code, users will Google it', '"Something went wrong. Please check your email and try again."', 'Hide errors from users entirely', 'Show a red screen with no text'],
    correct: 1,
    explanation: 'Plain-language errors explain what happened and how to fix it, instead of showing cryptic codes.',
  },
  {
    id: 5,
    scenario: 'A mobile nav has 9 items. What follows best practice?',
    options: ['Show all 9 in a row', 'Use a hamburger menu with grouped sections', 'Remove navigation entirely', 'Use tiny 8px text to fit them'],
    correct: 1,
    explanation: 'A collapsible menu with logical groupings keeps navigation discoverable without overwhelming a small screen.',
  },
];

const UXChallengeDemo = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const q = QUESTIONS[index];
  const isLast = index === QUESTIONS.length - 1;
  const finished = index >= QUESTIONS.length;

  const choose = useCallback(
    (i: number) => {
      if (answered) return;
      setSelected(i);
      setAnswered(true);
      if (i === q.correct) setScore((s) => s + 1);
    },
    [answered, q.correct]
  );

  const next = useCallback(() => {
    if (isLast) {
      setIndex(QUESTIONS.length);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  }, [isLast]);

  const restart = useCallback(() => {
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
  }, []);

  if (finished) {
    return (
      <div className="text-center py-6 animate-pmt-reveal">
        <Trophy className="w-12 h-12 mx-auto mb-3 text-amber-500" />
        <p className="text-2xl font-black text-gray-900">
          {score} / {QUESTIONS.length}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {score === QUESTIONS.length ? 'Perfect score!' : score >= 3 ? 'Nice work!' : 'Keep practicing!'}
        </p>
        <button
          onClick={restart}
          className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <RotateCcw className="w-4 h-4" /> Restart
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-gray-500">
          Question {index + 1} of {QUESTIONS.length}
        </p>
        <p className="text-xs font-bold text-teal-600">Score: {score}</p>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5 mb-5">
        {QUESTIONS.map((qq, i) => (
          <div
            key={qq.id}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-teal-600' : 'w-1.5 bg-gray-200'}`}
          />
        ))}
      </div>

      <p className="text-sm font-bold text-gray-900 mb-4 leading-relaxed">{q.scenario}</p>

      <div className="space-y-2 mb-4">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isSelected = i === selected;
          let cls = 'border-gray-200 bg-white text-gray-700 hover:border-teal-400';
          if (answered) {
            if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 text-emerald-800';
            else if (isSelected) cls = 'border-rose-400 bg-rose-50 text-rose-700';
            else cls = 'border-gray-200 bg-white text-gray-400';
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={answered}
              aria-pressed={isSelected}
              className={`w-full text-left rounded-xl border-2 px-3.5 py-2.5 text-sm font-bold transition-all flex items-center justify-between gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${cls}`}
            >
              <span>{opt}</span>
              {answered && isCorrect && <Check className="w-4 h-4 flex-shrink-0" />}
              {answered && isSelected && !isCorrect && <X className="w-4 h-4 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 mb-4 animate-pmt-reveal">
          <p className="text-xs font-bold text-gray-500 mb-1">
            {selected === q.correct ? 'Correct!' : 'Not quite.'}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">{q.explanation}</p>
        </div>
      )}

      <button
        onClick={next}
        disabled={!answered}
        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        {isLast ? 'See Results' : 'Next Question'}
      </button>
    </div>
  );
};

export default UXChallengeDemo;

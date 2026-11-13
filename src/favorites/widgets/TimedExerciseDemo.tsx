import { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, Timer, Play, Check, X } from 'lucide-react';

interface SortItem {
  id: number;
  label: string;
  category: 'A' | 'B';
}

const ITEMS: SortItem[] = [
  { id: 1, label: 'Login button', category: 'A' },
  { id: 2, label: 'Privacy policy', category: 'B' },
  { id: 3, label: 'Add to cart', category: 'A' },
  { id: 4, label: 'Terms of service', category: 'B' },
  { id: 5, label: 'Sign up form', category: 'A' },
  { id: 6, label: 'Cookie banner', category: 'B' },
];

const DURATION = 30;
const shuffled = () => [...ITEMS].sort(() => Math.random() - 0.5);

const TimedExerciseDemo = () => {
  const [queue, setQueue] = useState<SortItem[]>(shuffled);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => stop(), [stop]);

  const start = useCallback(() => {
    setQueue(shuffled());
    setIndex(0);
    setCorrect(0);
    setTimeLeft(DURATION);
    setPhase('running');
    stop();
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          setPhase('done');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [stop]);

  const answer = useCallback(
    (cat: 'A' | 'B') => {
      if (phase !== 'running') return;
      const item = queue[index];
      if (item && item.category === cat) setCorrect((c) => c + 1);
      if (index + 1 >= queue.length) {
        stop();
        setPhase('done');
      } else {
        setIndex((i) => i + 1);
      }
    },
    [phase, queue, index, stop]
  );

  const reset = useCallback(() => {
    stop();
    setQueue(shuffled());
    setIndex(0);
    setCorrect(0);
    setTimeLeft(DURATION);
    setPhase('idle');
  }, [stop]);

  const item = queue[index];
  const progress = (timeLeft / DURATION) * 100;
  const answeredCount = phase === 'done' ? queue.length : index;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-gray-500">
          Sort by intent: <span className="text-sky-600">A = Action</span> · <span className="text-orange-600">B = Legal</span>
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Timer + progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <Timer className="w-3.5 h-3.5" /> Time
          </span>
          <span
            className={`text-sm font-black tabular-nums ${timeLeft <= 5 && phase === 'running' ? 'text-rose-600' : 'text-gray-900'}`}
            aria-live="polite"
          >
            {timeLeft}s
          </span>
        </div>
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              timeLeft <= 5 ? 'bg-rose-500' : 'bg-sky-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {phase === 'idle' && (
        <div className="text-center py-6">
          <p className="text-sm text-gray-600 mb-4">
            You have {DURATION} seconds to sort {ITEMS.length} items into two categories.
          </p>
          <button
            onClick={start}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Play className="w-4 h-4" /> Start Exercise
          </button>
        </div>
      )}

      {phase === 'running' && item && (
        <div className="text-center animate-pmt-reveal" key={item.id}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
            Item {index + 1} of {queue.length}
          </p>
          <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5 mb-4">
            <p className="text-lg font-black text-gray-900">{item.label}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => answer('A')}
              className="rounded-xl px-4 py-3 text-sm font-black text-white bg-sky-600 hover:bg-sky-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              Category A
              <span className="block text-[10px] font-bold opacity-80">Action</span>
            </button>
            <button
              onClick={() => answer('B')}
              className="rounded-xl px-4 py-3 text-sm font-black text-white bg-orange-500 hover:bg-orange-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              Category B
              <span className="block text-[10px] font-bold opacity-80">Legal</span>
            </button>
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div className="text-center py-4 animate-pmt-reveal">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 mb-3">
            {correct >= queue.length / 2 ? <Check className="w-7 h-7 text-emerald-600" /> : <X className="w-7 h-7 text-rose-500" />}
          </div>
          <p className="text-2xl font-black text-gray-900">
            {correct} / {queue.length}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {timeLeft === 0 && answeredCount < queue.length ? "Time's up!" : 'All sorted!'}
          </p>
          <button
            onClick={start}
            className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TimedExerciseDemo;

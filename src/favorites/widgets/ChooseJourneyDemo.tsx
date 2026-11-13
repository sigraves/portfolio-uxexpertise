import { useState, useCallback } from 'react';
import { RotateCcw, ArrowLeft, Compass } from 'lucide-react';

interface Step {
  id: string;
  prompt: string;
  options: { label: string; next: string }[];
  isEnding?: boolean;
  ending?: string;
}

const STEPS: Record<string, Step> = {
  start: {
    id: 'start',
    prompt: 'A new user lands on your app for the first time. What do you show them?',
    options: [
      { label: 'A guided tour of key features', next: 'tour' },
      { label: 'An empty state with a single CTA', next: 'empty' },
      { label: 'A registration wall first', next: 'wall' },
    ],
  },
  tour: {
    id: 'tour',
    prompt: 'The tour covers 5 features. Users seem to be skipping it. What now?',
    options: [
      { label: 'Shorten to one tooltip', next: 'tooltip' },
      { label: 'Make the tour required to continue', next: 'forced' },
    ],
  },
  empty: {
    id: 'empty',
    prompt: 'The empty state invites one action. Some users hesitate. What do you add?',
    options: [
      { label: 'A sample project pre-loaded', next: 'sample' },
      { label: 'A short explainer video', next: 'video' },
      { label: 'Nothing — keep it minimal', next: 'minimal' },
    ],
  },
  wall: {
    id: 'wall',
    prompt: 'Many users bounce at the registration wall. How do you respond?',
    options: [
      { label: 'Allow exploring first, sign up later', next: 'freemium' },
      { label: 'Add social proof above the wall', next: 'proof' },
    ],
  },
  // Endings
  tooltip: {
    id: 'tooltip',
    prompt: '',
    options: [],
    isEnding: true,
    ending: 'Friction-First Ending: One contextual tooltip respects the user\u2019s time — completion rose, but some discoverability was lost.',
  },
  forced: {
    id: 'forced',
    prompt: '',
    options: [],
    isEnding: true,
    ending: 'Control Ending: Forcing the tour lifted feature awareness but cut sign-ups 30% — power replaced permission.',
  },
  sample: {
    id: 'sample',
    prompt: '',
    options: [],
    isEnding: true,
    ending: 'Show-Don\u2019t-Tell Ending: A pre-loaded sample let users feel value instantly — activation climbed 45%.',
  },
  video: {
    id: 'video',
    prompt: '',
    options: [],
    isEnding: true,
    ending: 'Narrative Ending: A 30-second video built understanding, though impatient users still skipped it.',
  },
  minimal: {
    id: 'minimal',
    prompt: '',
    options: [],
    isEnding: true,
    ending: 'Minimalist Ending: Restraint rewarded confident users but left others lost — a clear audience fit matters.',
  },
  freemium: {
    id: 'freemium',
    prompt: '',
    options: [],
    isEnding: true,
    ending: 'Trust-First Ending: Letting users explore before signing up restored conversion — trust beat friction.',
  },
  proof: {
    id: 'proof',
    prompt: '',
    options: [],
    isEnding: true,
    ending: 'Social-Proof Ending: Testimonials above the wall eased anxiety — sign-ups recovered and confidence grew.',
  },
};

const TOTAL_STEPS = 4;

const ChooseJourneyDemo = () => {
  const [path, setPath] = useState<string[]>(['start']);
  const [revealed, setRevealed] = useState(false);

  const current = STEPS[path[path.length - 1]];
  const stepNum = path.length;

  const choose = useCallback((next: string) => {
    setPath((p) => [...p, next]);
    setRevealed(false);
  }, []);

  const back = useCallback(() => {
    setPath((p) => (p.length > 1 ? p.slice(0, -1) : p));
    setRevealed(false);
  }, []);

  const restart = useCallback(() => {
    setPath(['start']);
    setRevealed(false);
  }, []);

  const revealEnding = useCallback(() => setRevealed(true), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-gray-500">
          Step {Math.min(stepNum, TOTAL_STEPS)} of {TOTAL_STEPS}
        </p>
        <button
          onClick={restart}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart
        </button>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-1.5 mb-5">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${i < stepNum ? 'w-6 bg-teal-600' : 'w-1.5 bg-gray-200'}`}
          />
        ))}
      </div>

      {current.isEnding ? (
        <div className="text-center py-4 animate-pmt-reveal">
          <Compass className="w-10 h-10 mx-auto mb-3 text-teal-600" />
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Your Ending</p>
          {revealed ? (
            <p className="text-sm font-bold text-gray-800 leading-relaxed px-2 animate-pmt-reveal">
              {current.ending}
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">You’ve reached a decision point. Reveal where it leads.</p>
              <button
                onClick={revealEnding}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                Reveal Ending
              </button>
            </>
          )}
          {revealed && (
            <button
              onClick={restart}
              className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <RotateCcw className="w-4 h-4" /> Start Again
            </button>
          )}
        </div>
      ) : (
        <div className="animate-pmt-reveal" key={current.id}>
          <p className="text-sm font-bold text-gray-900 mb-4 leading-relaxed">{current.prompt}</p>
          <div className="space-y-2">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => choose(opt.next)}
                className="w-full text-left rounded-xl border-2 border-gray-200 bg-white px-3.5 py-3 text-sm font-bold text-gray-700 hover:border-teal-400 hover:bg-teal-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {path.length > 1 && !current.isEnding && (
        <button
          onClick={back}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg px-2 py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      )}
      {path.length > 1 && current.isEnding && revealed && (
        <button
          onClick={back}
          className="mt-3 mx-auto block inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg px-2 py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Revisit last choice
        </button>
      )}
    </div>
  );
};

export default ChooseJourneyDemo;

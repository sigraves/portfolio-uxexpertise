import { useState, useCallback } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';

interface TreeNode {
  id: string;
  label: string;
  color: string;
  choices?: { label: string; nextId: string }[];
  outcome?: string;
}

const tree: Record<string, TreeNode> = {
  R: { id: 'R', label: 'Build a new feature or fix existing ones?', color: '#6366F1', choices: [
    { label: 'Build a new feature', nextId: 'N1' },
    { label: 'Fix existing ones', nextId: 'N2' },
  ]},
  N1: { id: 'N1', label: 'Which audience is the priority?', color: '#0ea5e9', choices: [
    { label: 'Power users', nextId: 'N3' },
    { label: 'New users', nextId: 'N4' },
  ]},
  N2: { id: 'N2', label: "What's the focus?", color: '#f97316', choices: [
    { label: 'Critical bugs', nextId: 'N5' },
    { label: 'Polish & UX', nextId: 'N6' },
  ]},
  N3: { id: 'N3', label: 'What timeline?', color: '#14B8A6', choices: [
    { label: 'Ship this quarter', nextId: 'L1' },
    { label: 'Research first', nextId: 'L2' },
  ]},
  N4: { id: 'N4', label: 'How should we onboard?', color: '#14B8A6', choices: [
    { label: 'Guided tour', nextId: 'L3' },
    { label: 'Self-serve docs', nextId: 'L4' },
  ]},
  N5: { id: 'N5', label: 'Release strategy?', color: '#ec4899', choices: [
    { label: 'Hotfix now', nextId: 'L5' },
    { label: 'Batch next release', nextId: 'L6' },
  ]},
  N6: { id: 'N6', label: 'What kind of polish?', color: '#ec4899', choices: [
    { label: 'Visual refresh', nextId: 'L7' },
    { label: 'Microinteractions', nextId: 'L8' },
  ]},
  L1: { id: 'L1', label: 'Ship a flagship power-user feature this quarter.', color: '#059669', outcome: 'High impact, tight scope. Commit now and sequence delivery fast.' },
  L2: { id: 'L2', label: 'Run a 2-week discovery sprint first.', color: '#059669', outcome: 'De-risk before building. Validate the real power-user need.' },
  L3: { id: 'L3', label: 'Build an interactive guided tour.', color: '#059669', outcome: 'Reduces time-to-value for new sign-ups measurably.' },
  L4: { id: 'L4', label: 'Expand self-serve docs & search.', color: '#059669', outcome: 'Scales onboarding without ongoing engineering overhead.' },
  L5: { id: 'L5', label: 'Push a hotfix immediately.', color: '#059669', outcome: 'Stops the bleeding fast. Notify affected users proactively.' },
  L6: { id: 'L6', label: 'Batch fixes into the next release.', color: '#059669', outcome: 'Lower risk, but communicate the timeline clearly.' },
  L7: { id: 'L7', label: 'Refresh the visual design system.', color: '#059669', outcome: 'Lifts perceived quality across the whole product.' },
  L8: { id: 'L8', label: 'Add delight via microinteractions.', color: '#059669', outcome: 'Small effort, noticeable polish and personality wins.' },
};

const DecisionTreeDemo = () => {
  const [path, setPath] = useState<string[]>(['R']);
  const current = tree[path[path.length - 1]];
  const isLeaf = !current.choices;

  const choose = useCallback((nextId: string) => {
    setPath((p) => [...p, nextId]);
  }, []);

  const reset = useCallback(() => setPath(['R']), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          Level {path.length - 1} of 3 · {isLeaf ? 'Outcome reached' : 'Choose a branch'}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Path taken */}
      <div className="flex flex-col mb-4" aria-label="Decision path">
        {path.map((id, i) => {
          const node = tree[id];
          const isCurrent = i === path.length - 1;
          return (
            <div key={id} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                  style={{ backgroundColor: node.color, boxShadow: isCurrent ? `0 0 0 3px ${node.color}40` : 'none' }}
                >
                  {i + 1}
                </div>
                {i < path.length - 1 && (
                  <div className="w-0.5 min-h-[20px] my-1 flex-1 bg-gray-200" />
                )}
              </div>
              <div className={`pt-1.5 pb-4 ${isCurrent ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                <p className="text-sm leading-snug">{node.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Choices or outcome */}
      {isLeaf ? (
        <div className="rounded-xl p-4 bg-teal-50 border-2 border-teal-200">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <p className="text-sm font-bold text-teal-700">Recommendation</p>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">{current.outcome}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {current.choices!.map((c) => (
            <button
              key={c.nextId}
              onClick={() => choose(c.nextId)}
              className="text-left rounded-xl px-4 py-3 bg-white border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <span className="text-sm font-semibold text-gray-700">{c.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DecisionTreeDemo;

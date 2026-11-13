import { useState, useCallback } from 'react';
import { Sparkles, Users, Lock, RefreshCw, Bookmark, Check } from 'lucide-react';

const PROBLEMS = [
  'Users abandon checkout before paying',
  'New users can\u2019t find the search bar',
  'Support tickets repeat the same question',
  'Notifications overwhelm the inbox',
  'Settings feel hidden and hard to find',
  'People forget how to use the app after a week',
];

const USER_TYPES = [
  'First-time visitor, no account',
  'Power user with 3 years of history',
  'Mobile-only user on a slow connection',
  'Older adult who avoids new technology',
  'Distracted parent using one hand',
  'Blind user navigating with a screen reader',
];

const CONSTRAINTS = [
  'No new backend APIs allowed',
  'Must launch in two weeks',
  'Only the existing color palette',
  'Has to work offline',
  'Budget for zero new images',
  'One engineer, part-time',
];

const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const RandomChallengeDemo = () => {
  const [problem, setProblem] = useState(PROBLEMS[0]);
  const [userType, setUserType] = useState(USER_TYPES[0]);
  const [constraint, setConstraint] = useState(CONSTRAINTS[0]);
  const [saved, setSaved] = useState(false);

  const generate = useCallback(() => {
    setProblem(rand(PROBLEMS));
    setUserType(rand(USER_TYPES));
    setConstraint(rand(CONSTRAINTS));
    setSaved(false);
  }, []);

  const save = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }, []);

  const cards = [
    { icon: Sparkles, label: 'Problem', value: problem, color: '#f97316' },
    { icon: Users, label: 'User Type', value: userType, color: '#0ea5e9' },
    { icon: Lock, label: 'Constraint', value: constraint, color: '#8B5CF6' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-bold text-gray-500">Design Challenge Generator</p>
        <button
          onClick={generate}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Generate
        </button>
      </div>

      <div className="space-y-3 mb-5">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="rounded-xl border-2 p-3.5 animate-pmt-reveal"
              style={{ borderColor: `${c.color}40`, background: `${c.color}08` }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="w-4 h-4" style={{ color: c.color }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c.color }}>
                  {c.label}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-800 leading-snug">{c.value}</p>
            </div>
          );
        })}
      </div>

      <div className="relative">
        <button
          onClick={save}
          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <Bookmark className="w-4 h-4" /> Save Challenge
        </button>

        {saved && (
          <div
            role="status"
            aria-live="polite"
            className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg animate-badge-pop"
          >
            <Check className="w-3.5 h-3.5" /> Challenge saved!
          </div>
        )}
      </div>
      <p className="text-[10px] text-gray-400 italic mt-3 text-center">
        Combine a problem, user, and constraint for an instant design prompt.
      </p>
    </div>
  );
};

export default RandomChallengeDemo;

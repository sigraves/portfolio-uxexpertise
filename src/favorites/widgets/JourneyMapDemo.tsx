import { useState, useCallback } from 'react';
import { Heart, Frown, Smile, Meh, Activity } from 'lucide-react';

interface Stage {
  id: number;
  label: string;
  color: string;
  emotion: number; // 0 (frustrated) - 100 (happy)
  actions: string;
  emotions: string;
  painPoints: string;
}

const stages: Stage[] = [
  {
    id: 1,
    label: 'Discover',
    color: '#0ea5e9',
    emotion: 70,
    actions: 'Searches for a solution, reads reviews, compares options.',
    emotions: 'Curious and optimistic — excited about finding something new.',
    painPoints: 'Too many choices; hard to tell which option is trustworthy.',
  },
  {
    id: 2,
    label: 'Sign Up',
    color: '#f97316',
    emotion: 45,
    actions: 'Creates an account, fills in profile details, verifies email.',
    emotions: 'Slightly impatient — wants to get to the value quickly.',
    painPoints: 'Long form with redundant fields; email verification is slow.',
  },
  {
    id: 3,
    label: 'Onboard',
    color: '#dc2626',
    emotion: 25,
    actions: 'Follows setup wizard, watches tutorial, tries first task.',
    emotions: 'Frustrated and confused — unclear where to start.',
    painPoints: 'Tutorial skips key steps; jargon-heavy instructions.',
  },
  {
    id: 4,
    label: 'Use',
    color: '#059669',
    emotion: 60,
    actions: 'Completes core tasks, explores features, invites teammates.',
    emotions: 'Relieved and productive — finally getting value.',
    painPoints: 'Some advanced features are hidden; no undo on actions.',
  },
  {
    id: 5,
    label: 'Advocate',
    color: '#8B5CF6',
    emotion: 85,
    actions: 'Shares with friends, leaves a review, upgrades plan.',
    emotions: 'Delighted and loyal — wants others to have the same experience.',
    painPoints: 'Referral process is clunky; no easy way to share a link.',
  },
];

const emotionIcon = (level: number) => {
  if (level >= 70) return Smile;
  if (level >= 45) return Meh;
  return Frown;
};

// Map emotion (0-100) to SVG y coordinate (high emotion = top = low y)
const emotionPoints = stages
  .map((s, i) => {
    const x = 20 + i * 70;
    const y = 90 - (s.emotion / 100) * 70;
    return `${x},${y}`;
  })
  .join(' ');

const JourneyMapDemo = () => {
  const [activeId, setActiveId] = useState(1);

  const select = useCallback((id: number) => setActiveId(id), []);

  const active = stages.find((s) => s.id === activeId)!;
  const EmotionIcon = emotionIcon(active.emotion);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select(id);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveId((prev) => Math.min(prev + 1, stages.length));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveId((prev) => Math.max(prev - 1, 1));
      }
    },
    [select]
  );

  return (
    <div>
      {/* Emotion curve */}
      <div className="mb-4 rounded-xl bg-gray-50 p-3">
        <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-gray-400">
          <Activity className="w-3.5 h-3.5" /> Emotion Curve
        </div>
        <svg viewBox="0 0 300 100" className="w-full h-20" preserveAspectRatio="none">
          {/* baseline */}
          <line x1="10" y1="55" x2="290" y2="55" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
          <polyline points={emotionPoints} fill="none" stroke="#64748b" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {stages.map((s, i) => {
            const x = 20 + i * 70;
            const y = 90 - (s.emotion / 100) * 70;
            const isActive = s.id === activeId;
            return (
              <circle
                key={s.id}
                cx={x}
                cy={y}
                r={isActive ? 6 : 4}
                fill={s.color}
                stroke="#fff"
                strokeWidth="2"
                className="transition-all"
              />
            );
          })}
        </svg>
        <div className="flex justify-between text-[9px] text-gray-400 mt-1 px-1">
          <span>Happy</span>
          <span>Frustrated</span>
        </div>
      </div>

      {/* Stage buttons */}
      <div className="flex items-center gap-1.5 mb-4" role="tablist" aria-label="Journey stages">
        {stages.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(s.id)}
              onKeyDown={(e) => handleKeyDown(e, s.id)}
              className="flex-1 rounded-lg px-2 py-2 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              style={{
                backgroundColor: isActive ? s.color : `${s.color}10`,
                color: isActive ? '#fff' : s.color,
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Stage detail */}
      <div
        className="rounded-xl p-4 animate-pmt-reveal"
        style={{ backgroundColor: `${active.color}08`, border: `2px solid ${active.color}20` }}
        role="tabpanel"
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${active.color}15` }}
          >
            <EmotionIcon className="w-4 h-4" style={{ color: active.color }} />
          </div>
          <span className="text-sm font-black text-gray-900">{active.label}</span>
          <span
            className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${active.color}15`, color: active.color }}
          >
            {active.emotion}/100
          </span>
        </div>
        <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
          <p><span className="font-bold text-gray-700">Actions:</span> {active.actions}</p>
          <p><span className="font-bold text-gray-700">Emotions:</span> {active.emotions}</p>
          <p className="flex items-start gap-1">
            <Heart className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-rose-500" />
            <span><span className="font-bold text-gray-700">Pain points:</span> {active.painPoints}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JourneyMapDemo;

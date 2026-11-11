import React, { useState } from 'react';
import { MessageSquare, Eye, GitBranch, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ── DISCOVER — Problem Peeling ────────────────────────────── */

const discoverLayers: {
  label: string;
  text: string;
  note: string;
  icon: LucideIcon;
}[] = [
  {
    label: 'Surface Complaint',
    text: '"The app is too slow."',
    note: 'What users say on the surface',
    icon: MessageSquare,
  },
  {
    label: 'Observed Behavior',
    text: 'Users abandon tasks before completing them.',
    note: 'What we observe in testing',
    icon: Eye,
  },
  {
    label: 'Structural Issue',
    text: "Navigation doesn't match how users think about their work.",
    note: 'What the data reveals',
    icon: GitBranch,
  },
  {
    label: 'Root Cause',
    text: 'The product was organized around internal departments — not user goals.',
    note: 'Where strategic design begins',
    icon: Target,
  },
];

const DiscoverExperience = () => {
  const [current, setCurrent] = useState(0);
  const isRoot = current === discoverLayers.length - 1;

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-400">
        Click through the layers. Real problems hide beneath surface complaints.
      </p>

      <div className="relative min-h-[260px]">
        {discoverLayers.map((layer, i) => {
          const Icon = layer.icon;
          const visible = i === current;
          const past = i < current;
          return (
            <div
              key={i}
              className={`absolute inset-0 rounded-2xl border-2 p-6 transition-all duration-500 ${
                visible
                  ? 'opacity-100 translate-y-0 z-10'
                  : past
                    ? 'opacity-0 -translate-y-8 pointer-events-none'
                    : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
              style={{
                borderColor: visible ? 'rgba(6, 182, 212, 0.4)' : 'transparent',
                background: visible ? 'rgba(6, 182, 212, 0.05)' : 'transparent',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  Layer {i + 1}: {layer.label}
                </span>
              </div>
              <p className="text-lg md:text-xl font-bold text-white mb-3 leading-snug">
                {layer.text}
              </p>
              <p className="text-sm text-slate-400">{layer.note}</p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        {!isRoot ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold hover:bg-cyan-500/30 transition-colors"
          >
            Dig Deeper →
          </button>
        ) : (
          <div className="px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold">
            Root cause uncovered
          </div>
        )}
        {current > 0 && (
          <button
            onClick={() => setCurrent(0)}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            Start over
          </button>
        )}
      </div>
    </div>
  );
};

/* ── INTERPRET — Insight Synthesis ─────────────────────────── */

const researchQuotes: { text: string; cluster: number }[] = [
  { text: 'I just want to find what I need quickly', cluster: 0 },
  { text: 'There are too many steps', cluster: 0 },
  { text: "I don't understand the language they use", cluster: 1 },
  { text: "Labels don't match what I call things", cluster: 1 },
  { text: 'I end up calling support instead', cluster: 2 },
  { text: 'I gave up after 10 minutes', cluster: 2 },
];

const themeClusters: { name: string; insight: string }[] = [
  { name: 'Efficiency Gap', insight: 'Users need faster, more direct paths to complete tasks.' },
  { name: 'Language Barrier', insight: "Product vocabulary doesn't match user mental models." },
  { name: 'Recovery Failure', insight: "When users struggle, there's no easy way back on track." },
];

const InterpretExperience = () => {
  const [phase, setPhase] = useState<'scattered' | 'synthesized'>('scattered');

  if (phase === 'scattered') {
    return (
      <div className="space-y-5">
        <p className="text-sm text-slate-400">
          Six raw research quotes. Click "Find Patterns" to see them cluster into themes.
        </p>
        <div className="flex flex-wrap gap-3 py-4">
          {researchQuotes.map((q, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-3 max-w-[220px]"
              style={{ transform: `rotate(${(i % 3 - 1) * 1.5}deg)` }}
            >
              <p className="text-sm text-slate-300 italic">"{q.text}"</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setPhase('synthesized')}
          className="px-6 py-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold hover:bg-amber-500/30 transition-colors"
        >
          Find Patterns →
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {themeClusters.map((cluster, i) => (
          <div
            key={i}
            className="animate-ts-reveal rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Theme {i + 1}
              </span>
              <p className="text-base font-bold text-white mt-1">{cluster.name}</p>
            </div>
            <div className="space-y-2 mb-3">
              {researchQuotes
                .filter((q) => q.cluster === i)
                .map((q, j) => (
                  <div
                    key={j}
                    className="rounded-lg border border-amber-500/20 bg-amber-500/[0.04] p-2.5"
                  >
                    <p className="text-xs text-slate-300 italic">"{q.text}"</p>
                  </div>
                ))}
            </div>
            <div className="border-t border-amber-500/20 pt-3">
              <p className="text-xs font-semibold text-amber-300 mb-1">Insight</p>
              <p className="text-xs text-white leading-relaxed">{cluster.insight}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setPhase('scattered')}
        className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
      >
        ← Scatter Again
      </button>
    </div>
  );
};

/* ── DECIDE — Trade-Off Explorer ───────────────────────────── */

const DecideExperience = () => {
  const [userValue, setUserValue] = useState(60);
  const [businessImpact, setBusinessImpact] = useState(70);
  const [effort, setEffort] = useState(40);

  const getRecommendation = (): { title: string; text: string } => {
    const total = userValue + businessImpact;
    if (effort > 70)
      return {
        title: 'Phase the Work',
        text: 'High effort means risk. Start with quick wins, then tackle the deeper structural changes in a second phase.',
      };
    if (total > 130 && effort < 50)
      return {
        title: 'Prioritize Immediately',
        text: 'High value, low effort — this is a quick win. Move it to the top of the roadmap.',
      };
    if (userValue > businessImpact + 20)
      return {
        title: 'Lead with User-Centered Redesign',
        text: 'User value outweighs business impact. Focus on solving the user problem first — business benefits will follow.',
      };
    if (businessImpact > userValue + 20)
      return {
        title: 'Align with Business Strategy',
        text: 'Business impact is the driver. Ensure the solution also addresses user needs to avoid short-term gains with long-term pain.',
      };
    return {
      title: 'Balanced Approach',
      text: 'Value and impact are aligned. Pursue this initiative with a cross-functional team.',
    };
  };

  const rec = getRecommendation();
  const balance = userValue - businessImpact;

  const sliders: { label: string; value: number; set: (v: number) => void }[] = [
    { label: 'User Value', value: userValue, set: setUserValue },
    { label: 'Business Impact', value: businessImpact, set: setBusinessImpact },
    { label: 'Implementation Effort', value: effort, set: setEffort },
  ];

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-400">
        Adjust the sliders. Watch how the recommendation shifts with each trade-off.
      </p>

      <div className="space-y-4">
        {sliders.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">{s.label}</span>
              <span className="text-sm font-bold text-blue-400">{s.value}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10"
              style={{ accentColor: '#3b82f6' }}
              aria-label={s.label}
            />
          </div>
        ))}
      </div>

      <div className="relative h-8 rounded-full bg-white/5 overflow-hidden">
        <div
          className="absolute top-0 bottom-0 transition-all duration-300"
          style={{
            left: balance < 0 ? `${50 + balance / 2}%` : '50%',
            right: balance > 0 ? `${50 - balance / 2}%` : '50%',
            background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
          {balance === 0
            ? 'Balanced'
            : balance > 0
              ? 'User Leaning'
              : 'Business Leaning'}
        </div>
      </div>

      <div className="rounded-xl border border-blue-500/30 bg-blue-500/[0.06] p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
          Recommendation
        </p>
        <p className="text-lg font-bold text-white mb-2">{rec.title}</p>
        <p className="text-sm text-slate-300 leading-relaxed">{rec.text}</p>
      </div>
    </div>
  );
};

/* ── INFLUENCE — Stakeholder Ripple ────────────────────────── */

const stakeholders: { name: string; action: string; delay: number }[] = [
  { name: 'Product Team', action: 'Redesigns the user flow based on research insights.', delay: 0.2 },
  { name: 'Engineering', action: 'Rebuilds navigation to match user mental models.', delay: 0.5 },
  { name: 'Leadership', action: 'Approves the roadmap shift toward user-centered design.', delay: 0.8 },
  { name: 'Support Team', action: 'Updates help docs and reduces incoming support tickets.', delay: 1.1 },
];

const InfluenceExperience = () => {
  const [activated, setActivated] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-400">
        Click "Share Insight" to watch an insight ripple through an organization.
      </p>

      <div className="flex justify-center">
        <div className="relative">
          <div
            className="w-28 h-28 rounded-full flex flex-col items-center justify-center text-center transition-all duration-500"
            style={{
              background: activated ? 'rgba(249, 115, 22, 0.25)' : 'rgba(249, 115, 22, 0.1)',
              border: `2px solid ${activated ? '#f97316' : 'rgba(249, 115, 22, 0.25)'}`,
              boxShadow: activated ? '0 0 40px rgba(249, 115, 22, 0.3)' : 'none',
            }}
          >
            <span className="text-sm font-bold text-orange-300 leading-tight">Research</span>
            <span className="text-sm font-bold text-orange-300 leading-tight">Insight</span>
          </div>
          {activated && (
            <>
              <div
                className="absolute inset-0 rounded-full border-2 border-orange-500/40"
                style={{ animation: 'ts-ripple 2s ease-out infinite' }}
              />
              <div
                className="absolute inset-0 rounded-full border-2 border-orange-500/20"
                style={{ animation: 'ts-ripple 2s ease-out infinite 0.7s' }}
              />
            </>
          )}
        </div>
      </div>

      {activated && (
        <div className="flex justify-center">
          <div className="text-orange-500/40 text-xl animate-ts-reveal">↓</div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {stakeholders.map((s, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className="text-left rounded-xl border p-4 transition-all duration-500"
            style={{
              background: activated ? 'rgba(249, 115, 22, 0.1)' : 'rgba(255,255,255,0.02)',
              borderColor: activated ? 'rgba(249, 115, 22, 0.3)' : 'rgba(255,255,255,0.08)',
              opacity: activated ? 1 : 0.4,
              transitionDelay: activated ? `${s.delay}s` : '0s',
              transform: selected === i ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <p className="text-sm font-bold text-slate-200 mb-1">{s.name}</p>
            <p
              className="text-xs text-slate-400 overflow-hidden transition-all duration-300"
              style={{
                opacity: selected === i ? 1 : 0,
                maxHeight: selected === i ? 60 : 0,
              }}
            >
              {s.action}
            </p>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            setActivated(true);
            setSelected(null);
          }}
          disabled={activated}
          className="px-6 py-3 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-300 font-semibold hover:bg-orange-500/30 transition-colors disabled:opacity-50"
        >
          {activated ? 'Insight Shared' : 'Share Insight →'}
        </button>
        {activated && (
          <button
            onClick={() => {
              setActivated(false);
              setSelected(null);
            }}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

/* ── Export ────────────────────────────────────────────────── */

export {
  DiscoverExperience,
  InterpretExperience,
  DecideExperience,
  InfluenceExperience,
};

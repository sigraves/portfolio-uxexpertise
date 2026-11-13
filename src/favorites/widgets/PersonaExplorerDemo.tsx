import { useState, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

interface Persona {
  id: number;
  name: string;
  title: string;
  color: string;
  avatar: string;
  demographics: string;
  goals: string[];
  frustrations: string[];
  quote: string;
}

const personas: Persona[] = [
  {
    id: 1,
    name: 'Sarah',
    title: 'The Busy Mom',
    color: '#ec4899',
    avatar: 'S',
    demographics: '34 years old · Working parent · 2 kids · Shops on mobile',
    goals: ['Save time on everyday tasks', 'Find reliable products quickly', 'Stay within budget'],
    frustrations: ['Too many steps to checkout', 'Tiny tap targets on mobile', 'Slow loading pages'],
    quote: 'I just need it to work the first time — I do not have minutes to spare.',
  },
  {
    id: 2,
    name: 'Alex',
    title: 'The Tech Lead',
    color: '#6366F1',
    avatar: 'A',
    demographics: '41 years old · Engineering manager · Power user · Desktop-first',
    goals: ['Configure advanced settings', 'Integrate with existing tools', 'See actionable analytics'],
    frustrations: ['Hand-holding wizards that cannot be skipped', 'No keyboard shortcuts', 'Opaque error messages'],
    quote: 'Give me the raw data and let me decide. I do not need a guided tour.',
  },
  {
    id: 3,
    name: 'Maya',
    title: 'The New User',
    color: '#14B8A6',
    avatar: 'M',
    demographics: '23 years old · Recent graduate · Cautious adopter · Mixed devices',
    goals: ['Understand what the product does', 'Learn without feeling judged', 'Build confidence gradually'],
    frustrations: ['No clear starting point', 'Fear of making an irreversible mistake', 'Jargon I have never heard'],
    quote: 'I want to explore without breaking something. A little guidance goes a long way.',
  },
];

const PersonaExplorerDemo = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + personas.length) % personas.length);
  }, []);

  const select = useCallback((i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }, [index]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
    },
    [go]
  );

  const p = personas[index];

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0} className="focus:outline-none">
      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {personas.map((per, i) => (
          <button
            key={per.id}
            onClick={() => select(i)}
            aria-label={`${per.name} ${per.title}`}
            aria-current={i === index}
            className="h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            style={{
              width: i === index ? 24 : 10,
              backgroundColor: i === index ? per.color : '#d1d5db',
            }}
          />
        ))}
      </div>

      {/* Persona card */}
      <div
        key={p.id}
        className="rounded-xl p-5 animate-pmt-reveal"
        style={{ backgroundColor: `${p.color}08`, border: `2px solid ${p.color}20` }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-black flex-shrink-0"
            style={{ backgroundColor: p.color }}
          >
            {p.avatar}
          </div>
          <div>
            <p className="text-base font-black text-gray-900">{p.name}</p>
            <p className="text-xs font-bold" style={{ color: p.color }}>{p.title}</p>
          </div>
          <User className="w-4 h-4 ml-auto text-gray-300" />
        </div>

        <p className="text-xs text-gray-500 mb-3 italic">{p.demographics}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Goals</p>
            <ul className="space-y-1">
              {p.goals.map((g) => (
                <li key={g} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Frustrations</p>
            <ul className="space-y-1">
              {p.frustrations.map((f) => (
                <li key={f} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-300" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="rounded-lg p-3 flex items-start gap-2"
          style={{ backgroundColor: `${p.color}10` }}
        >
          <Quote className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: p.color }} />
          <p className="text-xs italic text-gray-700 leading-relaxed">{p.quote}</p>
        </div>
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous persona"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <span className="text-xs text-gray-400 font-bold">
          {index + 1} / {personas.length}
        </span>
        <button
          onClick={() => go(1)}
          aria-label="Next persona"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PersonaExplorerDemo;

import React, { useState } from 'react';
import { ChevronDown, FlaskConical, Compass, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const rules: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FlaskConical,
    title: 'Evidence before opinion',
    body: 'I ground every recommendation in data — interviews, analytics, usability tests — so decisions are defensible, not debatable.',
  },
  {
    icon: Compass,
    title: 'Context before solution',
    body: 'I understand the people, the process, and the constraints before recommending a path forward. Solutions that ignore context create new problems.',
  },
  {
    icon: Users,
    title: 'Collaboration before handoff',
    body: 'I bring stakeholders into the research process early and often, so findings are understood, owned, and acted upon — not delivered in a vacuum.',
  },
];

const ResearchPhilosophy = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-4 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-4 text-left group rounded-2xl px-6 py-5 border-2 border-orange-300 bg-white hover:border-orange-500 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 rounded-full bg-orange-400 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-bold leading-snug text-gray-900">Research Philosophy</h2>
              <p className="text-sm mt-0.5 text-gray-500 font-medium">I follow three simple rules, no matter who I'm working for.</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 shrink-0 text-orange-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        {open && (
          <div className="mt-3 grid md:grid-cols-3 gap-4">
            {rules.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="inline-flex p-2.5 rounded-xl bg-orange-50 mb-4">
                  <Icon className="w-5 h-5 text-orange-500" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResearchPhilosophy;

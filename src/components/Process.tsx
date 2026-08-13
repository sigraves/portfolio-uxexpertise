import React from 'react';
import { Search, Layers, RotateCcw, ChevronRight } from 'lucide-react';

const phases = [
  {
    icon: <Search className="w-7 h-7" />,
    color: 'bg-blue-600',
    border: 'border-blue-100',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    title: 'Analytics before interviews',
    subtitle: 'Data runs first — before any user contact — to generate behavioral hypotheses from evidence, not assumptions. This prevents anchoring the interview guide on researcher intuition.',
  },
  {
    icon: <Layers className="w-7 h-7" />,
    color: 'bg-orange-500',
    border: 'border-orange-100',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    title: 'Competitive analysis in parallel',
    subtitle: 'Analogous research runs alongside interviews — not after — so stimulus materials are ready to test whether recognized patterns actually resonate with this specific audience.',
  },
  {
    icon: <RotateCcw className="w-7 h-7" />,
    color: 'bg-teal-600',
    border: 'border-teal-100',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    title: 'Workshops after findings are formed',
    subtitle: 'Stakeholders see data, not raw opinions. Business constraints apply to findings rather than shape them — turning workshops into prioritization sessions, not opinion-gathering.',
  },
];

const Process = () => {
  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How I <span className="text-blue-600">Sequence</span> Research
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Most research fails at the sequencing step, not the analysis step. These three principles define how I structure every engagement.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-4 max-w-4xl mx-auto">
          {phases.map((phase, i) => (
            <React.Fragment key={phase.title}>
              <div className={`flex-1 ${phase.bg} border ${phase.border} rounded-2xl p-8 flex flex-col items-center text-center gap-4`}>
                <div className={`${phase.color} text-white p-4 rounded-2xl`} aria-hidden="true">
                  {phase.icon}
                </div>
                <h3 className={`font-bold text-lg ${phase.text}`}>{phase.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{phase.subtitle}</p>
              </div>
              {i < phases.length - 1 && (
                <div className="flex items-center justify-center md:self-center" aria-hidden="true">
                  <ChevronRight className="w-6 h-6 text-gray-300 hidden md:block" />
                  <ChevronRight className="w-6 h-6 text-gray-300 rotate-90 md:hidden" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm mt-8 max-w-xl mx-auto">
          Sequencing is a research decision, not a scheduling convenience. The order in which methods run determines the validity of what you find.
        </p>
      </div>
    </section>
  );
};

export default Process;

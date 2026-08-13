import React from 'react';
import { Search, Target, Cpu, Users } from 'lucide-react';

const cards = [
  {
    icon: Search,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    title: 'Research & Discovery',
    skills: [
      'Stakeholder Interviews',
      'Journey Mapping',
      'Mixed-Methods Research',
      'Workshop Facilitation',
      'Usability Testing',
    ],
  },
  {
    icon: Target,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    title: 'Experience Strategy',
    skills: [
      'Service Design',
      'Information Architecture',
      'Governance',
      'Customer Experience',
      'Process Improvement',
    ],
  },
  {
    icon: Cpu,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    title: 'Human-Centered AI',
    skills: [
      'AI-Assisted Research',
      'Generative AI',
      'Knowledge Management',
      'Prompt Engineering',
      'Workflow Optimization',
    ],
  },
  {
    icon: Users,
    color: 'text-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    title: 'Leadership',
    skills: [
      'Executive Communication',
      'Cross-functional Collaboration',
      'Mentoring',
      'Facilitation',
      'Change Management',
    ],
  },
];

const ExpertiseCards = () => {
  return (
    <section id="expertise" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">

        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Areas of Expertise</h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ icon: Icon, color, bg, border, title, skills }) => (
            <div key={title} className={`${bg} border ${border} rounded-2xl p-6`}>
              <div className="mb-5">
                <Icon className={`w-6 h-6 ${color}`} aria-hidden="true" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-base">{title}</h3>
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li key={skill} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExpertiseCards;

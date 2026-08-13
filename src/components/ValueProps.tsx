import React from 'react';
import { Search, TrendingUp, Cpu } from 'lucide-react';

const items = [
  {
    icon: Search,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    title: 'Research',
    body: 'I uncover what people need through stakeholder interviews, journey mapping, workshops, usability studies, and mixed-method research.',
  },
  {
    icon: TrendingUp,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    title: 'Strategy',
    body: 'I translate research into recommendations that improve services, simplify processes, strengthen governance, and support better business decisions.',
  },
  {
    icon: Cpu,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    title: 'Human-Centered AI',
    body: 'I use Generative AI to accelerate research synthesis, improve knowledge management, and support better decision-making while ensuring human expertise remains central to every solution.',
  },
];

const ValueProps = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">How I Create Value</h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map(({ icon: Icon, color, bg, border, title, body }) => (
            <div key={title} className={`${bg} border ${border} rounded-2xl p-8`}>
              <div className={`inline-flex p-3 rounded-xl ${bg} mb-5`}>
                <Icon className={`w-7 h-7 ${color}`} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ValueProps;

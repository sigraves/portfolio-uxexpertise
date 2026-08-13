import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const caseStudies = [
  {
    href: '/waru',
    year: '2022–2026',
    category: 'Experience Strategy • Organizational Transformation',
    title: 'WarU',
    description:
      'Helping transform complex learning ecosystems through UX research, experience strategy, governance, and instructional design support—connecting user needs, business goals, and learning objectives to create clearer, scalable learning experiences.',
    borderColor: 'border-l-[#8B1A3A]',
    hoverBorder: 'hover:border-[#8B1A3A]/40',
    hoverShadow: 'hover:shadow-[0_4px_24px_0_rgba(139,26,58,0.12)]',
    btnBg: 'bg-[#8B1A3A] hover:bg-[#721530]',
  },
  {
    href: '/energy',
    year: '2024–2025',
    category: 'UX Research • Product Strategy • Customer Experience',
    title: 'Energy Provider',
    description:
      'An NDA-safe consulting engagement demonstrating how UX research uncovered customer behaviors, informed product strategy, and transformed a transactional experience into one that encouraged engagement, trust, and meaningful behavior change.',
    borderColor: 'border-l-emerald-600',
    hoverBorder: 'hover:border-emerald-200',
    hoverShadow: 'hover:shadow-[0_4px_24px_0_rgba(5,150,105,0.12)]',
    btnBg: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    href: '/utsa',
    year: '2020–2022',
    category: 'Mentorship • UX Education • Human-Centered Design',
    title: 'Trilogy Education at UTSA',
    description:
      'Developing future UX professionals by teaching UX research, design thinking, and problem-solving while helping students build confidence and transition into successful UX careers.',
    borderColor: 'border-l-orange-500',
    hoverBorder: 'hover:border-orange-200',
    hoverShadow: 'hover:shadow-[0_4px_24px_0_rgba(249,115,22,0.12)]',
    btnBg: 'bg-orange-500 hover:bg-orange-600',
  },
];

const FeaturedCaseStudies = () => {
  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">

        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Work</h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full mb-5" />
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
            Explore how research, strategy, and human-centered design solved three very different complex problems&mdash;from organizational transformation and product strategy to developing future UX professionals.
          </p>
        </div>

        <div className="space-y-6">
          {caseStudies.map(({ href, year, category, title, description, borderColor, hoverBorder, hoverShadow, btnBg }) => (
            <article
              key={href}
              className={`bg-white rounded-2xl border border-gray-100 border-l-8 ${borderColor} shadow-sm ${hoverBorder} ${hoverShadow} transition-all duration-200 p-10`}
            >
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-xs font-semibold border rounded-full px-3 py-1 border-gray-200 bg-gray-50 text-gray-600">
                  {year}
                </span>
                <span className="text-xs text-gray-400 font-medium">{category}</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">{title}</h3>
              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-3xl">{description}</p>

              <Link
                to={href}
                className={`inline-flex items-center gap-2 ${btnBg} text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md`}
              >
                Explore Case Study
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCaseStudies;

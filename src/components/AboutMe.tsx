import React from 'react';
import { MapPin } from 'lucide-react';

const stats = [
  { value: '20+', label: 'Years', color: 'text-blue-600', bg: 'bg-blue-50' },
  { value: '6', label: 'AI Workshops', color: 'text-orange-600', bg: 'bg-orange-50' },
  { value: '35%', label: 'Course Completion Lift', color: 'text-green-600', bg: 'bg-green-50' },
  { value: '30%+', label: 'Design Cycle Reduction', color: 'text-gray-700', bg: 'bg-gray-100' },
];

const AboutMe = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">

        {/* Heading visible on mobile only */}
        <div className="lg:hidden mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            More Than <span className="text-blue-600">UX</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Photo + stats */}
          <div className="flex flex-col items-center gap-8">
            <div className="relative w-72 h-72">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://img-c.udemycdn.com/user/200_H/2686564_c086_15.jpg"
                  alt="Sandra Graves — Senior UX Research & Design Strategist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-orange-500/20 rounded-2xl -z-10"></div>
              <div className="absolute -top-3 -left-3 w-16 h-16 bg-blue-600/15 rounded-2xl -z-10"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              {stats.map((s) => (
                <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
                  <div className={`text-4xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-gray-600 text-sm font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <div className="hidden lg:block">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                More Than <span className="text-blue-600">UX</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full"></div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              Organizations rarely struggle because they lack ideas.
              They struggle because they lack clarity.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Throughout my career, I've helped teams uncover hidden challenges, understand the
              people behind the process, and transform research into actionable strategies.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Whether leading enterprise UX research, mentoring future UX professionals, or
              exploring how Human-Centered AI can support better decisions, my focus remains
              the same:
            </p>

            <p className="text-gray-800 text-lg font-semibold leading-relaxed">
              Helping organizations solve meaningful problems.
            </p>

            <div className="flex items-center gap-2 text-gray-500 pt-2">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">Living in San Antonio, TX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

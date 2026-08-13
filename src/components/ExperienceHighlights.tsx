import React from 'react';
import { ArrowRight, Shield, BookOpen } from 'lucide-react';

const experiences = [
  {
    icon: Shield,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    accentColor: 'border-l-blue-600',
    role: 'Lead UX Designer & Researcher',
    org: 'WarU | Department of War',
    body: 'Leading enterprise UX research, experience strategy, governance, journey mapping, service design, accessibility, and organizational transformation for internal government initiatives.',
    href: '/waru',
    cta: 'Learn More',
  },
  {
    icon: BookOpen,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-50',
    accentColor: 'border-l-orange-500',
    role: 'UX/UI FED Design Instructor',
    org: 'Trilogy Education at UTSA',
    body: 'Teaching and mentoring future UX professionals through user research, accessibility, usability, design thinking, and real-world problem solving.',
    href: '/utsa',
    cta: 'Learn More',
  },
];

const ExperienceHighlights = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">

        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Experience Highlights</h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {experiences.map(({ icon: Icon, iconColor, iconBg, accentColor, role, org, body, href, cta }) => (
            <div
              key={role}
              className={`bg-white rounded-2xl border-l-4 ${accentColor} shadow-sm hover:shadow-md transition-shadow duration-200 p-8 flex flex-col`}
            >
              <div className={`inline-flex p-3 rounded-xl ${iconBg} mb-6 self-start`}>
                <Icon className={`w-7 h-7 ${iconColor}`} aria-hidden="true" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{role}</h3>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">{org}</p>
                <p className="text-gray-600 leading-relaxed">{body}</p>
              </div>

              <a
                href={href}
                className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-200 group"
              >
                {cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceHighlights;

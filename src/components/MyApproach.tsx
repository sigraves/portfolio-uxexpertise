import React from 'react';

const MyApproach = () => {
  return (
    <section id="approach" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6 max-w-4xl">

        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">My Approach</h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full" />
        </div>

        <div className="space-y-8">
          <p className="text-2xl md:text-3xl font-semibold text-slate-100 leading-snug">
            I don't start with solutions.
            <br />
            I start with questions.
          </p>

          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            Every engagement begins by understanding the people, the process, and the problem
            before recommending a path forward.
          </p>

          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            Whether I'm interviewing stakeholders, facilitating workshops, mapping journeys, or
            exploring how AI can improve an experience, my goal is always the same:
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-6 py-2">
            <p className="text-xl md:text-2xl font-semibold text-orange-300 leading-snug">
              Help organizations make better decisions through evidence, collaboration, and
              thoughtful design.
            </p>
          </blockquote>
        </div>

      </div>
    </section>
  );
};

export default MyApproach;

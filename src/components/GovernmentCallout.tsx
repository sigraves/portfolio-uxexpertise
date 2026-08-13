import React from 'react';
import { Lock } from 'lucide-react';

const GovernmentCallout = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="border border-gray-200 rounded-2xl bg-white p-10 flex flex-col md:flex-row gap-8 items-start">

          <div className="shrink-0">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <Lock className="w-5 h-5 text-slate-600" aria-hidden="true" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Working in Government</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Much of my recent work supports enterprise government initiatives operating under
              confidentiality agreements.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              While I cannot share proprietary systems or internal deliverables, I can share my
              research approach, methodologies, and the outcomes my work has helped organizations
              achieve.
            </p>
            <p className="text-gray-600 leading-relaxed">
              I welcome the opportunity to discuss my experience in greater detail during an
              interview.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GovernmentCallout;

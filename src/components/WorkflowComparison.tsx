import React from 'react';
import { ExternalLink } from 'lucide-react';

const WorkflowComparison = () => {
  return (
    <section className="py-4 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-5 border-2 border-orange-300 bg-white shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 rounded-full bg-orange-400 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-bold leading-snug text-gray-900">Internal vs. Customer Workflows</h2>
              <p className="text-sm mt-0.5 text-gray-500 font-medium">How my research approach shifts depending on who the end user is.</p>
            </div>
          </div>
          <a
            href="https://drive.google.com/file/d/1BU9jxdNbsTAWFO3OK37NL1HaFoxMrK-q/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-150 shrink-0"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            View
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkflowComparison;

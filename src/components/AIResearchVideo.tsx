import React from 'react';
import { PlayCircle } from 'lucide-react';

const VIDEO_URL = 'https://youtu.be/o-oAIpeMJiA';

const AIResearchVideo = () => {
  return (
    <section className="py-4 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="rounded-2xl px-6 py-5 border-2 border-orange-300 bg-white shadow-md transition-all duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-1 h-10 rounded-full bg-orange-400 shrink-0 hidden sm:block" aria-hidden="true" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold leading-snug text-gray-900">
                AI Won't Replace Researchers
              </h2>
              <p className="text-sm mt-0.5 text-gray-500 font-medium">
                AI accelerates the work, humans create the impact.
              </p>
            </div>
            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-bold text-base hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-md whitespace-nowrap sm:self-center"
            >
              <PlayCircle className="w-5 h-5" aria-hidden="true" />
              Watch Video
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIResearchVideo;

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Quadrant } from './types';
import {
  DiscoverExperience,
  InterpretExperience,
  DecideExperience,
  InfluenceExperience,
} from './QuadrantExperiences';

interface Props {
  quadrant: Quadrant;
  onClose: () => void;
}

const QuadrantDetail = ({ quadrant, onClose }: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const renderExperience = () => {
    switch (quadrant.id) {
      case 'discover':
        return <DiscoverExperience />;
      case 'interpret':
        return <InterpretExperience />;
      case 'decide':
        return <DecideExperience />;
      case 'influence':
        return <InfluenceExperience />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`${quadrant.name} — ${quadrant.tagline}`}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-3xl my-auto rounded-2xl border bg-[#111726] animate-ts-reveal"
        style={{ borderColor: `${quadrant.color}40` }}
      >
        <div
          className="h-1.5 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${quadrant.color}, transparent)` }}
        />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg hover:bg-white/10 transition-colors z-20"
          aria-label="Close panel"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="p-6 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-4xl md:text-5xl font-black"
              style={{ color: quadrant.color, opacity: 0.3 }}
            >
              {quadrant.number}
            </span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {quadrant.name}
              </h2>
              <p className="text-sm text-slate-400">{quadrant.tagline}</p>
            </div>
          </div>

          <div
            className="mb-8 rounded-xl p-4"
            style={{
              background: `${quadrant.color}10`,
              borderLeft: `3px solid ${quadrant.color}`,
            }}
          >
            <p className="text-base md:text-lg font-semibold text-white italic">
              "{quadrant.question}"
            </p>
          </div>

          {renderExperience()}

          <div className="mt-8 rounded-xl border border-dashed border-white/10 p-6 text-center">
            <p className="text-sm font-semibold text-slate-400 mb-1">
              Company Project Experience
            </p>
            <p className="text-xs text-slate-500">
              This quadrant will feature an interactive project from a selected company. Coming
              soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuadrantDetail;

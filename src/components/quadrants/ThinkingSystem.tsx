import React, { useState } from 'react';
import { quadrants } from './types';
import type { Quadrant } from './types';
import QuadrantDetail from './QuadrantDetail';

const lineTargets: Record<Quadrant['position'], { x: number; y: number }> = {
  'top-left': { x: 25, y: 25 },
  'top-right': { x: 75, y: 25 },
  'bottom-left': { x: 25, y: 75 },
  'bottom-right': { x: 75, y: 75 },
};

const particles = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: `${15 + Math.random() * 70}%`,
  delay: `${Math.random() * 12}s`,
  duration: `${18 + Math.random() * 12}s`,
  size: `${2 + Math.random() * 2}px`,
}));

const ThinkingSystem = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeQuadrant = quadrants.find((q) => q.id === activeId) ?? null;
  const hoveredQuadrant = quadrants.find((q) => q.id === hoveredId) ?? null;

  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#0a0e1a]"
      aria-label="Thinking System — Four phases of strategic UX thinking"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white/10"
            style={{
              left: p.left,
              bottom: '-10px',
              width: p.size,
              height: p.size,
              animation: `ts-float-particle ${p.duration} linear infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block"
        aria-hidden="true"
      >
        {quadrants.map((q) => {
          const target = lineTargets[q.position];
          const isActive = hoveredId === q.id;
          return (
            <line
              key={q.id}
              x1={50}
              y1={50}
              x2={target.x}
              y2={target.y}
              stroke={q.color}
              strokeWidth={isActive ? 1.5 : 0.8}
              strokeOpacity={isActive ? 0.5 : 0.12}
              strokeDasharray="3 6"
              vectorEffect="non-scaling-stroke"
              className="transition-all duration-500"
              style={isActive ? { animation: 'ts-flow-dash 1.5s linear infinite' } : undefined}
            />
          );
        })}
      </svg>

      <div className="md:hidden text-center pt-24 pb-4 px-6">
        <p className="text-lg font-bold text-white">Explore How I Think</p>
        <p className="text-sm text-slate-500 mt-1">Four phases. One connected system.</p>
      </div>

      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:min-h-[calc(100vh-4rem)]">
        {quadrants.map((q) => {
          const Icon = q.icon;
          return (
            <button
              key={q.id}
              onClick={() => setActiveId(q.id)}
              onMouseEnter={() => setHoveredId(q.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(q.id)}
              onBlur={() => setHoveredId(null)}
              className="group relative overflow-hidden border border-white/[0.06] transition-all duration-500 cursor-pointer focus:outline-none focus:z-30 text-left"
              aria-label={`Explore ${q.name}: ${q.tagline}`}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(${q.colorRgb}, 0.1), transparent 70%)`,
                }}
              />

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 80px rgba(${q.colorRgb}, 0.08)` }}
              />

              <div className="relative z-10 p-6 md:p-12 h-full flex flex-col justify-between min-h-[200px] md:min-h-[300px]">
                <div className="flex items-start justify-between">
                  <span
                    className="text-5xl md:text-7xl font-black transition-all duration-500 group-hover:scale-110 opacity-[0.06] group-hover:opacity-20"
                    style={{ color: q.color }}
                  >
                    {q.number}
                  </span>
                  <Icon
                    className="w-7 h-7 md:w-8 md:h-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 opacity-20 group-hover:opacity-90"
                    style={{ color: q.color }}
                  />
                </div>

                <div>
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight text-slate-100 mb-1.5 md:mb-2 transition-transform duration-500 group-hover:translate-x-1">
                    {q.name}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400">{q.tagline}</p>
                  <p
                    className="text-xs md:text-sm mt-2 md:mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 transition-all duration-500 font-medium"
                    style={{ color: q.color }}
                  >
                    {q.question}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex">
        <div
          className="relative w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-[#0a0e1a] border-2 flex flex-col items-center justify-center text-center transition-all duration-500"
          style={{
            borderColor: hoveredQuadrant ? hoveredQuadrant.color : 'rgba(255,255,255,0.1)',
            boxShadow: hoveredQuadrant
              ? `0 0 40px rgba(${hoveredQuadrant.colorRgb}, 0.25)`
              : '0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full animate-ts-pulse"
            style={{
              boxShadow: hoveredQuadrant
                ? `0 0 30px rgba(${hoveredQuadrant.colorRgb}, 0.2)`
                : '0 0 15px rgba(255,255,255,0.05)',
            }}
          />
          <p className="text-[10px] lg:text-xs font-bold text-white tracking-wide leading-tight">
            Explore
          </p>
          <p className="text-[10px] lg:text-xs font-bold text-white tracking-wide leading-tight">
            How I Think
          </p>
          <p className="text-[8px] lg:text-[10px] text-slate-500 mt-1 leading-tight">
            Four phases
          </p>
        </div>
      </div>

      {activeQuadrant && (
        <QuadrantDetail quadrant={activeQuadrant} onClose={() => setActiveId(null)} />
      )}
    </section>
  );
};

export default ThinkingSystem;

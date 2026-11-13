import { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';

interface Scene { id: number; title: string; desc: string; color: string; emoji: string; }

const SCENES: Scene[] = [
  { id: 0, title: 'Awaken', desc: 'A spark of curiosity begins the journey. Everything starts with a single question.', color: '#0ea5e9', emoji: '✦' },
  { id: 1, title: 'Explore', desc: 'Branching paths reveal possibilities. Each choice opens new territory to discover.', color: '#f97316', emoji: '◆' },
  { id: 2, title: 'Connect', desc: 'Pieces link into patterns. The scattered fragments start forming a coherent whole.', color: '#8b5cf6', emoji: '❖' },
  { id: 3, title: 'Resolve', desc: 'Understanding crystallizes. The journey concludes with clarity and insight gained.', color: '#10b981', emoji: '★' },
];

const ScrollStorytellingDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const el = scrollRef.current; if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      setProgress(p);
      const idx = Math.min(SCENES.length - 1, Math.round(p * (SCENES.length - 1)));
      setActive(idx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const jumpTo = useCallback((i: number) => {
    const el = scrollRef.current; if (!el) return;
    const target = sceneRefs.current[i]; if (!target) return;
    el.scrollTo({ top: target.offsetTop - 8, behavior: 'smooth' });
  }, []);

  const reset = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex gap-3">
      {/* progress rail */}
      <div className="flex flex-col items-center pt-2" role="tablist" aria-label="Story scenes">
        <div className="flex-1 w-1 rounded-full bg-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bg-teal-500 transition-all duration-150" style={{ height: `${progress * 100}%` }} />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => jumpTo(i)}
              aria-label={`Scene ${i + 1}: ${s.title}`}
              aria-selected={active === i}
              role="tab"
              className="w-3 h-3 rounded-full border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              style={{
                backgroundColor: active === i ? s.color : '#fff',
                borderColor: s.color,
                transform: active === i ? 'scale(1.25)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* scroll area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500">Scene {active + 1} of {SCENES.length} · scroll down</p>
          <button onClick={reset} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div
          ref={scrollRef}
          className="h-80 overflow-y-auto rounded-xl border-2 border-gray-100 snap-y snap-mandatory focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          tabIndex={0}
          aria-label="Scroll story. Use arrow keys or scroll to progress through scenes."
        >
          {SCENES.map((s, i) => {
            const inView = i <= active;
            return (
              <section
                key={s.id}
                ref={(el) => { sceneRefs.current[i] = el; }}
                className="snap-start h-80 flex flex-col items-center justify-center px-6 text-center transition-colors duration-500"
                style={{ background: `linear-gradient(135deg, ${s.color}12, ${s.color}28)` }}
              >
                <div
                  className="text-5xl mb-4 transition-all duration-700"
                  style={{
                    transform: inView ? 'scale(1) rotate(0deg)' : 'scale(0.4) rotate(-25deg)',
                    opacity: inView ? 1 : 0,
                    color: s.color,
                  }}
                >
                  {s.emoji}
                </div>
                <h3 className="text-xl font-black mb-2" style={{ color: s.color }}>
                  {s.title}
                </h3>
                <p className="text-sm text-gray-700 max-w-xs leading-relaxed font-medium transition-all duration-700 delay-100" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(12px)' }}>
                  {s.desc}
                </p>
                <div className="mt-4 h-1 rounded-full overflow-hidden bg-white/50 w-24">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: inView ? '100%' : '0%', backgroundColor: s.color }} />
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollStorytellingDemo;

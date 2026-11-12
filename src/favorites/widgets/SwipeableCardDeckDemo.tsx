import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideCard {
  id: number;
  title: string;
  body: string;
  color: string;
}

const slides: SlideCard[] = [
  { id: 1, title: 'Empathize', body: 'Understand your users through interviews, observation, and immersion in their context. The goal is to see the world through their eyes.', color: '#059669' },
  { id: 2, title: 'Define', body: 'Synthesize research into a clear problem statement. What do users need? What barriers stand in their way?', color: '#f97316' },
  { id: 3, title: 'Ideate', body: 'Generate a wide range of ideas without judgment. Quantity first, quality later. Wild ideas often spark practical solutions.', color: '#0ea5e9' },
  { id: 4, title: 'Prototype', body: 'Build tangible representations of your best ideas. Prototypes can be paper sketches or interactive wireframes \u2014 just enough to test.', color: '#8B5CF6' },
  { id: 5, title: 'Test', body: 'Put prototypes in front of real users. Observe, listen, and iterate. Testing validates assumptions and reveals what you missed.', color: '#ec4899' },
];

const SwipeableCardDeckDemo = () => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const next = useCallback(() => setIndex((prev) => (prev + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((prev) => (prev - 1 + slides.length) % slides.length), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    },
    [next, prev]
  );

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setTouchStart(null);
  };

  const slide = slides[index];

  return (
    <div
      className="flex flex-col items-center"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Swipeable card deck. Use arrow keys to navigate."
    >
      <div
        className="relative w-full max-w-sm"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Stack effect */}
        {slides.slice(index + 1, index + 3).map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 rounded-2xl bg-white border-2"
            style={{
              borderColor: `${s.color}20`,
              transform: `translateY(${(i + 1) * 6}px) scale(${1 - (i + 1) * 0.03})`,
              opacity: 0.5 - i * 0.15,
              zIndex: 0,
            }}
          />
        ))}

        {/* Active card */}
        <div
          className="relative rounded-2xl p-8 min-h-[240px] flex flex-col items-center justify-center text-center shadow-lg transition-all duration-300 animate-pmt-reveal"
          style={{
            background: `linear-gradient(135deg, ${slide.color}15, ${slide.color}30)`,
            border: `2px solid ${slide.color}40`,
            zIndex: 1,
          }}
          aria-live="polite"
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: slide.color }}>
            Step {index + 1} of {slides.length}
          </p>
          <p className="text-2xl font-black text-gray-900 mb-3">{slide.title}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{slide.body}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={prev}
          aria-label="Previous card"
          className="p-2 rounded-full bg-white border-2 border-gray-200 hover:border-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to card ${i + 1}: ${s.title}`}
              aria-current={i === index}
              className={`rounded-full transition-all ${
                i === index ? 'w-6 h-2' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              style={i === index ? { backgroundColor: s.color } : {}}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next card"
          className="p-2 rounded-full bg-white border-2 border-gray-200 hover:border-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-3">Swipe or use arrow keys</p>
    </div>
  );
};

export default SwipeableCardDeckDemo;

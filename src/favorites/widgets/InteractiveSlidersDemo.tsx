import { useState, useCallback } from 'react';
import { RotateCcw, Type, Square, Maximize2 } from 'lucide-react';

interface SliderConfig {
  key: 'fontSize' | 'padding' | 'radius';
  label: string;
  icon: typeof Type;
  min: number;
  max: number;
  unit: string;
}

const sliders: SliderConfig[] = [
  { key: 'fontSize', label: 'Font Size', icon: Type, min: 12, max: 24, unit: 'px' },
  { key: 'padding', label: 'Padding', icon: Square, min: 8, max: 32, unit: 'px' },
  { key: 'radius', label: 'Border Radius', icon: Maximize2, min: 0, max: 20, unit: 'px' },
];

const defaults = { fontSize: 16, padding: 16, radius: 8 };

type Values = typeof defaults;

const InteractiveSlidersDemo = () => {
  const [values, setValues] = useState<Values>(defaults);

  const update = useCallback((key: keyof Values, v: number) => {
    setValues((prev) => ({ ...prev, [key]: v }));
  }, []);

  const reset = useCallback(() => setValues(defaults), []);
  const resetOne = useCallback((key: keyof Values) => setValues((prev) => ({ ...prev, [key]: defaults[key] })), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-gray-400">Double-click a slider to reset it</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset All
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Controls */}
        <div className="space-y-5">
          {sliders.map((s) => {
            const Icon = s.icon;
            const v = values[s.key];
            const pct = ((v - s.min) / (s.max - s.min)) * 100;
            return (
              <div key={s.key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600">
                    <Icon className="w-3.5 h-3.5" /> {s.label}
                  </span>
                  <span className="text-xs font-black text-teal-600 tabular-nums">{v}{s.unit}</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={v}
                  onChange={(e) => update(s.key, Number(e.target.value))}
                  onDoubleClick={() => resetOne(s.key)}
                  aria-label={s.label}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  style={{
                    background: `linear-gradient(to right, #0d9488 ${pct}%, #E5E7EB ${pct}%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Live preview */}
        <div className="flex items-center justify-center rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 p-4">
          <div
            className="bg-white shadow-md text-gray-800 transition-all duration-150"
            style={{
              fontSize: `${values.fontSize}px`,
              padding: `${values.padding}px`,
              borderRadius: `${values.radius}px`,
            }}
          >
            <p className="font-black leading-tight">Live Preview</p>
            <p className="leading-relaxed opacity-70" style={{ fontSize: `${Math.max(10, values.fontSize - 3)}px` }}>
              This card reflects every slider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSlidersDemo;

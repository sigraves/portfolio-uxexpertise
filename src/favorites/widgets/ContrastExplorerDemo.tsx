import { useState, useCallback, useMemo } from 'react';
import { RotateCcw, Check, X } from 'lucide-react';

const hexToRgb = (hex: string) => {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
};

const relLum = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const f = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const ratio = (fg: string, bg: string) => {
  const l1 = relLum(fg);
  const l2 = relLum(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
};

const PRESETS: { name: string; fg: string; bg: string }[] = [
  { name: 'Dark on Light', fg: '#1f2937', bg: '#f9fafb' },
  { name: 'White on Blue', fg: '#ffffff', bg: '#2563eb' },
  { name: 'Gray on Gray', fg: '#9ca3af', bg: '#f3f4f6' },
  { name: 'Yellow on White', fg: '#eab308', bg: '#ffffff' },
  { name: 'White on Red', fg: '#ffffff', bg: '#dc2626' },
];

const ContrastExplorerDemo = () => {
  const [fg, setFg] = useState('#1f2937');
  const [bg, setBg] = useState('#f9fafb');

  const r = useMemo(() => ratio(fg, bg), [fg, bg]);
  const rStr = r.toFixed(2);
  const aa = r >= 4.5;
  const aaa = r >= 7;
  const aaLarge = r >= 3;

  const reset = useCallback(() => { setFg('#1f2937'); setBg('#f9fafb'); }, []);

  const Badge = ({ pass, label }: { pass: boolean; label: string }) => (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black ${pass ? 'bg-teal-100 text-teal-700' : 'bg-rose-100 text-rose-700'}`}>
      {pass ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      {label}
    </span>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">Pick colors or try a preset</p>
        <button onClick={reset} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* controls */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} aria-label="Foreground text color" className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer bg-white p-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-700">Foreground</p>
              <p className="text-[10px] font-mono text-gray-400 uppercase">{fg}</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} aria-label="Background color" className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer bg-white p-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-700">Background</p>
              <p className="text-[10px] font-mono text-gray-400 uppercase">{bg}</p>
            </div>
          </label>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => { setFg(p.fg); setBg(p.bg); }}
                className="px-2 py-1 rounded-md text-[10px] font-bold border-2 border-gray-200 hover:border-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                style={{ color: p.fg, backgroundColor: p.bg, borderColor: '#e5e7eb' }}
                aria-label={`Preset ${p.name}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* results */}
        <div className="space-y-3">
          <div className="rounded-xl p-4 border-2 border-gray-100" style={{ backgroundColor: bg, color: fg }} role="img" aria-label={`Text preview with contrast ratio ${rStr} to 1`}>
            <p className="text-lg font-black">The quick brown fox</p>
            <p className="text-sm font-bold">jumps over the lazy dog</p>
            <p className="text-xs mt-1 opacity-80">Small text requires 4.5:1 · Large text requires 3:1</p>
          </div>

          <div className="rounded-xl border-2 border-gray-100 p-3">
            <p className="text-2xl font-black text-gray-900">{rStr}<span className="text-sm text-gray-400">:1</span></p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <Badge pass={aa} label="AA (4.5:1)" />
              <Badge pass={aaa} label="AAA (7:1)" />
              <Badge pass={aaLarge} label="AA Large (3:1)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrastExplorerDemo;

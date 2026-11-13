import { useState, useCallback } from 'react';
import { RotateCcw, Users, Percent, DollarSign, TrendingUp } from 'lucide-react';

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

interface Slider {
  key: 'traffic' | 'conv' | 'price';
  label: string;
  icon: typeof Users;
  min: number;
  max: number;
  step: number;
  unit: string;
  fmt: (v: number) => string;
}

const sliders: Slider[] = [
  { key: 'traffic', label: 'Traffic', icon: Users, min: 0, max: 10000, step: 50, unit: 'visits', fmt: (v) => v.toLocaleString() },
  { key: 'conv', label: 'Conversion Rate', icon: Percent, min: 0, max: 10, step: 0.1, unit: '%', fmt: (v) => `${v.toFixed(1)}%` },
  { key: 'price', label: 'Price', icon: DollarSign, min: 0, max: 100, step: 1, unit: '$', fmt: (v) => `$${v}` },
];

const defaults = { traffic: 2000, conv: 3, price: 25 };

const WhatIfSimulatorDemo = () => {
  const [traffic, setTraffic] = useState(defaults.traffic);
  const [conv, setConv] = useState(defaults.conv);
  const [price, setPrice] = useState(defaults.price);

  const revenue = Math.round(traffic * (conv / 100) * price);
  const maxRev = 10000 * (10 / 100) * 100;
  const revPct = clamp((revenue / maxRev) * 100, 0, 100);

  const vals: Record<Slider['key'], number> = { traffic, conv, price };
  const setters: Record<Slider['key'], (n: number) => void> = {
    traffic: setTraffic,
    conv: setConv,
    price: setPrice,
  };

  const reset = useCallback(() => {
    setTraffic(defaults.traffic);
    setConv(defaults.conv);
    setPrice(defaults.price);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="space-y-4 mb-5">
        {sliders.map((s) => {
          const Icon = s.icon;
          const v = vals[s.key];
          return (
            <div key={s.key}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600">
                  <Icon className="w-3.5 h-3.5 text-teal-600" /> {s.label}
                </span>
                <span className="text-sm font-extrabold text-teal-700 tabular-nums">{s.fmt(v)}</span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={v}
                onChange={(e) => setters[s.key](+e.target.value)}
                aria-label={s.label}
                aria-valuetext={s.fmt(v)}
                className="w-full accent-teal-600 h-2 cursor-pointer"
              />
            </div>
          );
        })}
      </div>

      {/* Result */}
      <div className="rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-5 text-center border border-teal-100">
        <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">Projected Revenue</p>
        <div className="text-4xl font-extrabold text-teal-700 tabular-nums">
          ${revenue.toLocaleString()}
        </div>
        <p className="text-[11px] text-gray-400 mt-1">
          {traffic.toLocaleString()} visits × {conv.toFixed(1)}% × ${price}
        </p>

        {/* Bar visualization */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] font-semibold text-gray-400 mb-1">
            <span>0</span>
            <span>$1,000,000 max</span>
          </div>
          <div className="h-3 rounded-full bg-teal-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 ease-out flex items-center justify-end pr-1"
              style={{ width: `${revPct}%` }}
            >
              {revPct > 8 && <TrendingUp className="w-3 h-3 text-white" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIfSimulatorDemo;

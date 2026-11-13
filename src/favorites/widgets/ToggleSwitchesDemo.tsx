import { useState, useCallback } from 'react';
import { RotateCcw, Moon, Bell, Save, BarChart3 } from 'lucide-react';

interface ToggleItem {
  key: 'darkMode' | 'notifications' | 'autoSave' | 'analytics';
  label: string;
  desc: string;
  icon: typeof Moon;
  color: string;
}

const items: ToggleItem[] = [
  { key: 'darkMode', label: 'Dark Mode', desc: 'Use a dark color scheme', icon: Moon, color: '#8B5CF6' },
  { key: 'notifications', label: 'Notifications', desc: 'Push alerts to your device', icon: Bell, color: '#f97316' },
  { key: 'autoSave', label: 'Auto-Save', desc: 'Save changes automatically', icon: Save, color: '#0ea5e9' },
  { key: 'analytics', label: 'Analytics', desc: 'Share usage to improve the app', icon: BarChart3, color: '#059669' },
];

type Settings = Record<ToggleItem['key'], boolean>;
const defaults: Settings = { darkMode: false, notifications: false, autoSave: false, analytics: false };

const ToggleSwitchesDemo = () => {
  const [settings, setSettings] = useState<Settings>({ ...defaults });

  const toggle = useCallback((key: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const reset = useCallback(() => setSettings({ ...defaults }), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">Click or press Enter to toggle</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset All
        </button>
      </div>

      <div className="space-y-2 mb-5">
        {items.map((item) => {
          const Icon = item.icon;
          const on = settings[item.key];
          return (
            <div
              key={item.key}
              className="flex items-center justify-between p-3 rounded-xl border-2 transition-colors"
              style={{ borderColor: on ? `${item.color}40` : '#E5E7EB', background: on ? `${item.color}08` : '#fff' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
              <button
                role="switch"
                aria-checked={on}
                aria-label={item.label}
                onClick={() => toggle(item.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(item.key);
                  }
                }}
                className="relative w-12 h-6.5 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 flex-shrink-0"
                style={{ backgroundColor: on ? item.color : '#d1d5db', width: '46px', height: '26px' }}
              >
                <span
                  className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300"
                  style={{ transform: on ? 'translateX(20px)' : 'translateX(0)' }}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* JSON summary */}
      <div className="rounded-xl bg-gray-900 p-4 overflow-x-auto">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Current State</p>
        <pre className="text-xs text-teal-300 font-mono leading-relaxed">
{`{
  "darkMode": ${settings.darkMode},
  "notifications": ${settings.notifications},
  "autoSave": ${settings.autoSave},
  "analytics": ${settings.analytics}
}`}
        </pre>
      </div>
    </div>
  );
};

export default ToggleSwitchesDemo;

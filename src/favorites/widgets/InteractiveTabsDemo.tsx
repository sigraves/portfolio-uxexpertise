import { useState, useCallback } from 'react';
import { BarChart3, Users, Zap, Shield } from 'lucide-react';

type Orientation = 'horizontal' | 'vertical' | 'icons';

interface TabItem {
  id: string;
  label: string;
  icon: typeof BarChart3;
  color: string;
  content: string;
}

const tabs: TabItem[] = [
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    color: '#059669',
    content: 'Track engagement metrics, conversion funnels, and user behavior patterns to identify what works and where users drop off. Data-driven decisions replace guesswork.',
  },
  {
    id: 'users',
    label: 'User Research',
    icon: Users,
    color: '#f97316',
    content: 'Conduct interviews, surveys, and usability tests to understand user needs, goals, and pain points. Qualitative insights reveal the why behind the numbers.',
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: Zap,
    color: '#0ea5e9',
    content: 'Monitor page load times, interaction latency, and Core Web Vitals. Fast experiences keep users engaged and reduce abandonment at critical moments.',
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    color: '#8B5CF6',
    content: 'Implement authentication, authorization, and data protection. Security is not a feature \u2014 it is the foundation of trust between users and your product.',
  },
];

const InteractiveTabsDemo = () => {
  const [orientation, setOrientation] = useState<Orientation>('horizontal');
  const [activeTab, setActiveTab] = useState(0);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveTab((prev) => (prev + 1) % tabs.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
      }
    },
    []
  );

  const active = tabs[activeTab];
  const ActiveIcon = active.icon;

  const isVertical = orientation === 'vertical';
  const isIcons = orientation === 'icons';

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {(['horizontal', 'vertical', 'icons'] as const).map((o) => (
          <button
            key={o}
            onClick={() => setOrientation(o)}
            aria-pressed={orientation === o}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
              orientation === o ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {o}
          </button>
        ))}
      </div>

      <div className={`flex ${isVertical ? 'flex-row' : 'flex-col'} gap-0`}>
        {/* Tab list */}
        <div
          role="tablist"
          aria-orientation={isVertical ? 'vertical' : 'horizontal'}
          onKeyDown={handleKeyDown}
          className={`flex ${isVertical ? 'flex-col' : 'flex-row'} gap-1 ${isVertical ? 'mr-3' : 'mb-0'}`}
        >
          {tabs.map((tab, i) => {
            const TabIcon = tab.icon;
            const isActive = i === activeTab;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isActive ? 'text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'
                } ${isIcons ? 'justify-center' : ''}`}
                style={isActive ? { backgroundColor: tab.color } : {}}
                aria-label={tab.label}
              >
                <TabIcon className="w-4 h-4 flex-shrink-0" />
                {!isIcons && <span>{tab.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Tab panel */}
        <div
          role="tabpanel"
          aria-labelledby={active.id}
          className="flex-1 rounded-xl p-6 animate-pmt-reveal"
          style={{ backgroundColor: `${active.color}08`, border: `2px solid ${active.color}20` }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${active.color}15` }}
            >
              <ActiveIcon className="w-6 h-6" style={{ color: active.color }} />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900 mb-1">{active.label}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{active.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTabsDemo;

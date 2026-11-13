import type { LucideIcon } from 'lucide-react';

interface WidgetPreviewProps {
  widgetId: string;
  color: string;
  icon: LucideIcon;
}

/**
 * Renders a small animated SVG/CSS visual preview unique to each widget.
 * Subtle motion that respects reduced-motion via CSS media query.
 */
const WidgetPreview = ({ widgetId, color, icon: Icon }: WidgetPreviewProps) => {
  const preview = previews[widgetId] || defaultPreview;
  return preview(color, Icon);
};

type PreviewFn = (color: string, Icon: LucideIcon) => React.ReactNode;

const defaultPreview: PreviewFn = (color, Icon) => (
  <Icon className="w-10 h-10" style={{ color }} />
);

const previews: Record<string, PreviewFn> = {
  'flip-cards': (color) => (
    <div className="preview-flip-card" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="preview-flip-inner">
        <div className="preview-flip-face" style={{ background: `${color}30` }} />
        <div className="preview-flip-back" style={{ background: `${color}50` }} />
      </div>
    </div>
  ),
  'accordions': (color) => (
    <div className="flex flex-col gap-1.5 w-16" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="preview-acc-bar preview-acc-open" style={{ background: `${color}40` }} />
      <div className="preview-acc-bar" style={{ background: `${color}20` }} />
      <div className="preview-acc-bar" style={{ background: `${color}20` }} />
    </div>
  ),
  'prioritization-hotspots': (color) => (
    <div className="relative w-16 h-12 rounded-lg" style={{ background: `${color}15`, '--pv-color': color } as React.CSSProperties}>
      <div className="preview-hotspot" style={{ left: '20%', top: '30%', background: color }} />
      <div className="preview-hotspot" style={{ left: '60%', top: '50%', background: color, animationDelay: '0.3s' }} />
      <div className="preview-hotspot" style={{ left: '40%', top: '70%', background: color, animationDelay: '0.6s' }} />
    </div>
  ),
  'interactive-tabs': (color) => (
    <div className="flex flex-col gap-1 w-16" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="flex gap-1">
        <div className="preview-tab-active" style={{ background: color }} />
        <div className="h-1.5 flex-1 rounded" style={{ background: `${color}20` }} />
        <div className="h-1.5 flex-1 rounded" style={{ background: `${color}20` }} />
      </div>
      <div className="h-6 rounded" style={{ background: `${color}10` }} />
    </div>
  ),
  'expandable-cards': (color) => (
    <div className="flex gap-1 w-16" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="preview-expand-card" style={{ background: `${color}30` }} />
      <div className="preview-expand-card" style={{ background: `${color}20`, animationDelay: '0.5s' }} />
    </div>
  ),
  'swipeable-card-deck': (color) => (
    <div className="relative w-12 h-10" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="absolute inset-0 rounded-lg preview-deck-1" style={{ background: `${color}20` }} />
      <div className="absolute inset-0 rounded-lg preview-deck-2" style={{ background: `${color}30` }} />
      <div className="absolute inset-0 rounded-lg preview-deck-3" style={{ background: `${color}40` }} />
    </div>
  ),
  'comparison-cards': (color) => (
    <div className="flex gap-1 w-16" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="h-10 flex-1 rounded-lg border-2" style={{ borderColor: color, background: `${color}10` }} />
      <div className="h-10 flex-1 rounded-lg border-2" style={{ borderColor: `${color}40`, background: `${color}05` }} />
    </div>
  ),
  'impact-effort-matrix': (color) => (
    <div className="grid grid-cols-2 gap-0.5 w-12 h-12 rounded-lg overflow-hidden" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="preview-quad" style={{ background: `${color}30` }} />
      <div className="preview-quad" style={{ background: `${color}15`, animationDelay: '0.2s' }} />
      <div className="preview-quad" style={{ background: `${color}15`, animationDelay: '0.4s' }} />
      <div className="preview-quad" style={{ background: `${color}30`, animationDelay: '0.6s' }} />
    </div>
  ),
  'decision-trees': (color) => (
    <svg width="48" height="40" viewBox="0 0 48 40">
      <line x1="24" y1="6" x2="10" y2="30" stroke={color} strokeWidth="1.5" className="preview-stroke" />
      <line x1="24" y1="6" x2="38" y2="30" stroke={color} strokeWidth="1.5" className="preview-stroke" style={{ animationDelay: '0.3s' }} />
      <circle cx="24" cy="6" r="4" fill={color} className="preview-node" />
      <circle cx="10" cy="30" r="4" fill={color} fillOpacity="0.4" className="preview-node" style={{ animationDelay: '0.5s' }} />
      <circle cx="38" cy="30" r="4" fill={color} fillOpacity="0.4" className="preview-node" style={{ animationDelay: '0.7s' }} />
    </svg>
  ),
  'prioritization-board': (color) => (
    <div className="flex gap-1 w-16 h-10" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="flex-1 rounded flex flex-col gap-0.5 p-0.5" style={{ background: `${color}10` }}>
        <div className="h-2 rounded preview-board-item" style={{ background: `${color}50` }} />
      </div>
      <div className="flex-1 rounded flex flex-col gap-0.5 p-0.5" style={{ background: `${color}10` }}>
        <div className="h-2 rounded preview-board-item" style={{ background: `${color}30`, animationDelay: '0.3s' }} />
        <div className="h-2 rounded preview-board-item" style={{ background: `${color}30`, animationDelay: '0.6s' }} />
      </div>
      <div className="flex-1 rounded" style={{ background: `${color}10` }} />
    </div>
  ),
  'weighted-matrix': (color) => (
    <div className="grid grid-cols-3 gap-0.5 w-12 h-10" style={{ '--pv-color': color } as React.CSSProperties}>
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <div key={i} className="rounded-sm preview-cell" style={{ background: `${color}${i % 2 ? '40' : '20'}`, animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  ),
  'moscow': (color) => (
    <div className="flex flex-col gap-0.5 w-14" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="h-1.5 rounded preview-moscow-bar" style={{ background: color, width: '100%' }} />
      <div className="h-1.5 rounded preview-moscow-bar" style={{ background: `${color}80`, width: '75%', animationDelay: '0.2s' }} />
      <div className="h-1.5 rounded preview-moscow-bar" style={{ background: `${color}50`, width: '50%', animationDelay: '0.4s' }} />
      <div className="h-1.5 rounded preview-moscow-bar" style={{ background: `${color}25`, width: '30%', animationDelay: '0.6s' }} />
    </div>
  ),
  'stakeholder-map': (color) => (
    <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-12 h-12" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="rounded relative" style={{ background: `${color}10` }}>
        <div className="absolute w-2 h-2 rounded-full preview-node" style={{ background: color, top: '30%', left: '30%' }} />
      </div>
      <div className="rounded relative" style={{ background: `${color}10` }}>
        <div className="absolute w-2 h-2 rounded-full preview-node" style={{ background: color, top: '50%', left: '50%', animationDelay: '0.3s' }} />
      </div>
      <div className="rounded" style={{ background: `${color}10` }} />
      <div className="rounded relative" style={{ background: `${color}10` }}>
        <div className="absolute w-2 h-2 rounded-full preview-node" style={{ background: color, top: '40%', left: '60%', animationDelay: '0.6s' }} />
      </div>
    </div>
  ),
  'trade-off-simulator': (color) => (
    <svg width="44" height="36" viewBox="0 0 44 36">
      <line x1="6" y1="30" x2="38" y2="30" stroke={`${color}40`} strokeWidth="1" />
      <line x1="6" y1="6" x2="6" y2="30" stroke={`${color}40`} strokeWidth="1" />
      <circle cx="14" cy="22" r="3" fill={color} className="preview-node" />
      <circle cx="30" cy="12" r="3" fill={color} fillOpacity="0.5" className="preview-node" style={{ animationDelay: '0.3s' }} />
    </svg>
  ),
  'interactive-roadmap': (color) => (
    <div className="flex items-center w-16 h-6" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <div className="flex-1 h-0.5" style={{ background: `${color}40` }} />
      <div className="w-2 h-2 rounded-full preview-node" style={{ background: color }} />
      <div className="flex-1 h-0.5" style={{ background: `${color}40` }} />
      <div className="w-2 h-2 rounded-full preview-node" style={{ background: color, animationDelay: '0.3s' }} />
      <div className="flex-1 h-0.5" style={{ background: `${color}40` }} />
      <div className="w-2 h-2 rounded-full preview-node" style={{ background: color, animationDelay: '0.6s' }} />
    </div>
  ),
  'journey-map': (color) => (
    <svg width="56" height="28" viewBox="0 0 56 28">
      <polyline points="4,20 16,8 28,16 40,6 52,14" fill="none" stroke={color} strokeWidth="1.5" className="preview-stroke" />
      <circle cx="4" cy="20" r="2.5" fill={color} />
      <circle cx="16" cy="8" r="2.5" fill={color} fillOpacity="0.6" className="preview-node" style={{ animationDelay: '0.2s' }} />
      <circle cx="28" cy="16" r="2.5" fill={color} fillOpacity="0.6" className="preview-node" style={{ animationDelay: '0.4s' }} />
      <circle cx="40" cy="6" r="2.5" fill={color} fillOpacity="0.6" className="preview-node" style={{ animationDelay: '0.6s' }} />
      <circle cx="52" cy="14" r="2.5" fill={color} fillOpacity="0.6" className="preview-node" style={{ animationDelay: '0.8s' }} />
    </svg>
  ),
  'persona-explorer': (color) => (
    <div className="flex gap-1" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="w-6 h-10 rounded-lg preview-persona" style={{ background: `${color}40` }} />
      <div className="w-6 h-10 rounded-lg preview-persona" style={{ background: `${color}20`, animationDelay: '0.5s' }} />
    </div>
  ),
  'card-sorting': (color) => (
    <div className="grid grid-cols-2 gap-0.5 w-12 h-10" style={{ '--pv-color': color } as React.CSSProperties}>
      {[0,1,2,3].map(i => (
        <div key={i} className="rounded preview-sort-card" style={{ background: `${color}${i % 2 ? '30' : '15'}`, animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  ),
  'site-map': (color) => (
    <svg width="40" height="32" viewBox="0 0 40 32">
      <rect x="14" y="2" width="12" height="5" rx="2" fill={color} fillOpacity="0.6" />
      <line x1="20" y1="7" x2="8" y2="16" stroke={`${color}60`} strokeWidth="1" />
      <line x1="20" y1="7" x2="20" y2="16" stroke={`${color}60`} strokeWidth="1" />
      <line x1="20" y1="7" x2="32" y2="16" stroke={`${color}60`} strokeWidth="1" />
      <rect x="2" y="16" width="10" height="4" rx="2" fill={color} fillOpacity="0.4" className="preview-node" />
      <rect x="15" y="16" width="10" height="4" rx="2" fill={color} fillOpacity="0.4" className="preview-node" style={{ animationDelay: '0.2s' }} />
      <rect x="28" y="16" width="10" height="4" rx="2" fill={color} fillOpacity="0.4" className="preview-node" style={{ animationDelay: '0.4s' }} />
    </svg>
  ),
  'usability-simulator': (color) => (
    <div className="relative w-12 h-10 rounded-lg border-2 overflow-hidden" style={{ borderColor: `${color}30`, '--pv-color': color } as React.CSSProperties}>
      <div className="absolute top-1 left-1 right-1 h-1 rounded" style={{ background: `${color}20` }} />
      <div className="absolute top-4 left-1 w-2 h-2 rounded-full preview-cursor" style={{ background: color }} />
    </div>
  ),
  'insight-wall': (color) => (
    <div className="grid grid-cols-3 gap-0.5 w-14 h-10" style={{ '--pv-color': color } as React.CSSProperties}>
      {[0,1,2,3,4,5].map(i => (
        <div key={i} className="rounded-sm preview-sticky" style={{ background: `${color}${['30','20','40','20','30','40'][i]}`, transform: `rotate(${i % 2 ? 2 : -2}deg)`, animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  ),
  'service-blueprint': (color) => (
    <div className="flex flex-col gap-0.5 w-14 h-10 justify-center" style={{ '--pv-color': color } as React.CSSProperties}>
      {[0,1,2,3].map(row => (
        <div key={row} className="flex gap-0.5">
          {[0,1,2].map(col => (
            <div key={col} className="w-3 h-1.5 rounded-sm" style={{ background: `${color}${(row + col) % 2 ? '30' : '15'}` }} />
          ))}
        </div>
      ))}
    </div>
  ),
  'flow-builder': (color) => (
    <svg width="48" height="24" viewBox="0 0 48 24">
      <rect x="2" y="9" width="10" height="6" rx="3" fill={color} fillOpacity="0.6" />
      <line x1="12" y1="12" x2="20" y2="12" stroke={color} strokeWidth="1.5" className="preview-stroke" />
      <rect x="20" y="9" width="10" height="6" rx="3" fill={color} fillOpacity="0.4" className="preview-node" style={{ animationDelay: '0.2s' }} />
      <line x1="30" y1="12" x2="38" y2="12" stroke={color} strokeWidth="1.5" className="preview-stroke" style={{ animationDelay: '0.4s' }} />
      <rect x="38" y="9" width="8" height="6" rx="3" fill={color} fillOpacity="0.3" className="preview-node" style={{ animationDelay: '0.6s' }} />
    </svg>
  ),
  'animated-charts': (color) => (
    <div className="flex items-end gap-1 h-10" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="w-2.5 rounded-t preview-bar" style={{ background: color, height: '40%' }} />
      <div className="w-2.5 rounded-t preview-bar" style={{ background: color, height: '70%', animationDelay: '0.1s' }} />
      <div className="w-2.5 rounded-t preview-bar" style={{ background: color, height: '50%', animationDelay: '0.2s' }} />
      <div className="w-2.5 rounded-t preview-bar" style={{ background: color, height: '90%', animationDelay: '0.3s' }} />
      <div className="w-2.5 rounded-t preview-bar" style={{ background: color, height: '60%', animationDelay: '0.4s' }} />
    </div>
  ),
  'radar-chart': (color) => (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <polygon points="20,4 34,14 28,32 12,32 6,14" fill="none" stroke={`${color}30`} strokeWidth="1" />
      <polygon points="20,10 28,16 24,28 16,28 12,16" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" className="preview-stroke" />
    </svg>
  ),
  'heatmap': (color) => (
    <div className="grid grid-cols-5 gap-0.5 w-14 h-10" style={{ '--pv-color': color } as React.CSSProperties}>
      {[0,1,2,3,4,5,6,7,8,9].map(i => (
        <div key={i} className="rounded-sm" style={{ background: `${color}${['10','20','40','15','25','35','10','20','30','40'][i]}` }} />
      ))}
    </div>
  ),
  'what-if-simulator': (color) => (
    <div className="flex flex-col gap-1 w-14" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="h-1.5 rounded-full relative overflow-hidden" style={{ background: `${color}20` }}>
        <div className="absolute h-full w-1/2 rounded-full preview-slider-thumb" style={{ background: color, right: 0 }} />
      </div>
      <div className="h-1.5 rounded-full relative overflow-hidden" style={{ background: `${color}20` }}>
        <div className="absolute h-full w-1/3 rounded-full preview-slider-thumb" style={{ background: color, right: 0, animationDelay: '0.3s' }} />
      </div>
    </div>
  ),
  'before-after-slider': (color) => (
    <div className="relative w-14 h-10 rounded-lg overflow-hidden" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="absolute inset-0" style={{ background: `${color}10` }} />
      <div className="absolute top-0 bottom-0 left-0 w-1/2" style={{ background: `${color}30` }} />
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 preview-divider" style={{ background: color }} />
    </div>
  ),
  'scorecard-dashboard': (color) => (
    <div className="flex gap-1" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="w-5 h-5 rounded-full border-2 preview-gauge" style={{ borderColor: color, borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
      <div className="w-5 h-5 rounded-full border-2 preview-gauge" style={{ borderColor: color, borderBottomColor: `${color}40`, borderLeftColor: `${color}40`, animationDelay: '0.3s' }} />
    </div>
  ),
  'quadrant-map': (color) => (
    <div className="relative w-12 h-10" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5" style={{ background: `${color}20` }} />
      <div className="absolute top-1/2 left-0 right-0 h-0.5" style={{ background: `${color}20` }} />
      <div className="absolute w-2 h-2 rounded-full preview-node" style={{ background: color, top: '20%', left: '20%' }} />
      <div className="absolute w-2 h-2 rounded-full preview-node" style={{ background: color, top: '60%', left: '70%', animationDelay: '0.3s' }} />
      <div className="absolute w-2 h-2 rounded-full preview-node" style={{ background: color, top: '70%', left: '30%', animationDelay: '0.6s' }} />
    </div>
  ),
  'timeline': (color) => (
    <div className="relative w-16 h-8 flex items-center" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="absolute left-0 right-0 h-0.5" style={{ background: `${color}40` }} />
      <div className="relative w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <div className="relative w-2.5 h-2.5 rounded-full flex-shrink-0 ml-auto preview-node" style={{ background: color }} />
      <div className="relative w-2.5 h-2.5 rounded-full flex-shrink-0 ml-auto preview-node" style={{ background: color, animationDelay: '0.3s' }} />
    </div>
  ),
  'shuffle-deck': (color, Icon) => (
    <Icon className="w-8 h-8 preview-pulse" style={{ color }} />
  ),
  'drag-puzzle': (color) => (
    <div className="grid grid-cols-3 gap-0.5 w-10 h-10" style={{ '--pv-color': color } as React.CSSProperties}>
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <div key={i} className="rounded-sm" style={{ background: i === 4 ? 'transparent' : `${color}${i % 2 ? '30' : '15'}`, borderRadius: i === 0 ? '4px 0 0 0' : i === 8 ? '0 0 4px 0' : '0' }} />
      ))}
    </div>
  ),
  'ux-challenge': (color, Icon) => (
    <Icon className="w-8 h-8 preview-pulse" style={{ color }} />
  ),
  'timed-exercise': (color, Icon) => (
    <Icon className="w-8 h-8 preview-spin-slow" style={{ color }} />
  ),
  'random-challenge': (color, Icon) => (
    <Icon className="w-8 h-8 preview-pulse" style={{ color }} />
  ),
  'memory-matching': (color) => (
    <div className="grid grid-cols-4 gap-0.5 w-12 h-10" style={{ '--pv-color': color } as React.CSSProperties}>
      {[0,1,2,3,4,5,6,7].map(i => (
        <div key={i} className="rounded-sm preview-mem-card" style={{ background: `${color}${i % 2 ? '30' : '15'}`, animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  ),
  'choose-journey': (color) => (
    <svg width="44" height="32" viewBox="0 0 44 32">
      <circle cx="22" cy="6" r="4" fill={color} />
      <line x1="22" y1="10" x2="10" y2="22" stroke={color} strokeWidth="1.5" />
      <line x1="22" y1="10" x2="34" y2="22" stroke={color} strokeWidth="1.5" />
      <circle cx="10" cy="26" r="3" fill={color} fillOpacity="0.4" className="preview-node" />
      <circle cx="34" cy="26" r="3" fill={color} fillOpacity="0.4" className="preview-node" style={{ animationDelay: '0.3s' }} />
    </svg>
  ),
  'multi-step-wizard': (color) => (
    <div className="flex items-center w-16" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <div className="w-3 h-0.5" style={{ background: color }} />
      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <div className="w-3 h-0.5" style={{ background: `${color}30` }} />
      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: `${color}30` }} />
      <div className="w-3 h-0.5" style={{ background: `${color}30` }} />
      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: `${color}30` }} />
    </div>
  ),
  'conditional-forms': (color) => (
    <div className="flex flex-col gap-0.5 w-14" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="h-1.5 rounded" style={{ background: `${color}40` }} />
      <div className="h-1.5 rounded preview-appear" style={{ background: `${color}25`, width: '80%' }} />
      <div className="h-1.5 rounded preview-appear" style={{ background: `${color}20`, width: '60%', animationDelay: '0.3s' }} />
    </div>
  ),
  'interactive-sliders': (color) => (
    <div className="flex flex-col gap-1 w-14" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="h-1 rounded-full relative" style={{ background: `${color}20` }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full preview-slider-thumb" style={{ background: color }} />
      </div>
      <div className="h-1 rounded-full relative" style={{ background: `${color}20` }}>
        <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full preview-slider-thumb" style={{ background: color, left: '40%', animationDelay: '0.3s' }} />
      </div>
    </div>
  ),
  'toggle-switches': (color) => (
    <div className="flex gap-1.5" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="w-6 h-3.5 rounded-full p-0.5 flex justify-end" style={{ background: color }}>
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>
      <div className="w-6 h-3.5 rounded-full p-0.5 flex justify-start" style={{ background: `${color}25` }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      </div>
    </div>
  ),
  'command-palette': (color) => (
    <div className="rounded-lg border-2 px-2 py-1.5 flex items-center gap-1.5 w-16" style={{ borderColor: `${color}30`, '--pv-color': color } as React.CSSProperties}>
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <div className="flex-1 h-1.5 rounded" style={{ background: `${color}20` }} />
    </div>
  ),
  'autocomplete': (color) => (
    <div className="relative w-14" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="h-3 rounded border-2 px-1 flex items-center" style={{ borderColor: `${color}30` }}>
        <div className="h-1 w-3 rounded" style={{ background: color }} />
      </div>
      <div className="absolute top-4 left-0 right-0 rounded shadow-sm border-2 overflow-hidden" style={{ borderColor: `${color}20` }}>
        <div className="h-1.5 rounded m-0.5" style={{ background: `${color}30` }} />
        <div className="h-1.5 rounded m-0.5" style={{ background: `${color}10` }} />
      </div>
    </div>
  ),
  'inline-validation': (color) => (
    <div className="flex flex-col gap-0.5 w-14" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="h-2 rounded border-2 flex items-center justify-end px-0.5" style={{ borderColor: color }}>
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      </div>
      <div className="h-2 rounded border-2 flex items-center px-0.5" style={{ borderColor: `${color}20` }}>
        <div className="h-1 w-6 rounded" style={{ background: `${color}20` }} />
      </div>
    </div>
  ),
  'toast-notifications': (color) => (
    <div className="flex flex-col gap-0.5 w-14" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="h-3 rounded-lg preview-toast" style={{ background: `${color}30` }} />
      <div className="h-3 rounded-lg preview-toast" style={{ background: `${color}20`, animationDelay: '0.5s', marginLeft: '8px' }} />
    </div>
  ),
  'modal-dialogs': (color) => (
    <div className="relative w-12 h-10 rounded-lg" style={{ background: `${color}10`, '--pv-color': color } as React.CSSProperties}>
      <div className="absolute inset-2 rounded-lg border-2 preview-modal-pop" style={{ borderColor: `${color}40`, background: '#fff' }} />
    </div>
  ),
  'undo-interactions': (color, Icon) => (
    <Icon className="w-8 h-8 preview-pulse" style={{ color }} />
  ),
  'skeleton-loading': (color) => (
    <div className="flex flex-col gap-0.5 w-14" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="h-1.5 rounded preview-skeleton" style={{ background: `${color}20`, width: '80%' }} />
      <div className="h-1.5 rounded preview-skeleton" style={{ background: `${color}20`, width: '100%' }} />
      <div className="h-1.5 rounded preview-skeleton" style={{ background: `${color}20`, width: '60%' }} />
    </div>
  ),
  'guided-onboarding': (color) => (
    <div className="relative w-12 h-8 rounded-lg border-2" style={{ borderColor: `${color}20`, '--pv-color': color } as React.CSSProperties}>
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white preview-pulse" style={{ background: color }} />
    </div>
  ),
  'node-network': (color) => (
    <svg width="44" height="36" viewBox="0 0 44 36">
      <line x1="22" y1="6" x2="8" y2="28" stroke={`${color}40`} strokeWidth="1" />
      <line x1="22" y1="6" x2="22" y2="28" stroke={`${color}40`} strokeWidth="1" />
      <line x1="22" y1="6" x2="36" y2="28" stroke={`${color}40`} strokeWidth="1" />
      <circle cx="22" cy="6" r="4" fill={color} className="preview-node" />
      <circle cx="8" cy="28" r="3" fill={color} fillOpacity="0.5" className="preview-node" style={{ animationDelay: '0.2s' }} />
      <circle cx="22" cy="28" r="3" fill={color} fillOpacity="0.5" className="preview-node" style={{ animationDelay: '0.4s' }} />
      <circle cx="36" cy="28" r="3" fill={color} fillOpacity="0.5" className="preview-node" style={{ animationDelay: '0.6s' }} />
    </svg>
  ),
  'css-3d': (color) => (
    <div className="preview-cube" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="preview-cube-face preview-cube-front" style={{ background: `${color}40` }} />
      <div className="preview-cube-face preview-cube-top" style={{ background: `${color}60` }} />
      <div className="preview-cube-face preview-cube-right" style={{ background: `${color}25` }} />
    </div>
  ),
  'cursor-responsive': (color) => (
    <div className="relative w-12 h-10 rounded-lg" style={{ background: `${color}08`, '--pv-color': color } as React.CSSProperties}>
      <div className="absolute w-3 h-3 rounded-full preview-cursor-orbit" style={{ background: `${color}40`, border: `1px solid ${color}` }} />
    </div>
  ),
  'scroll-storytelling': (color) => (
    <div className="flex flex-col gap-0.5 w-10" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="h-2 rounded preview-scroll-scene" style={{ background: `${color}40` }} />
      <div className="h-2 rounded preview-scroll-scene" style={{ background: `${color}25`, animationDelay: '0.3s' }} />
      <div className="h-2 rounded preview-scroll-scene" style={{ background: `${color}15`, animationDelay: '0.6s' }} />
    </div>
  ),
  'workflow-builder': (color) => (
    <svg width="48" height="24" viewBox="0 0 48 24">
      <rect x="2" y="4" width="8" height="6" rx="2" fill={color} fillOpacity="0.5" />
      <line x1="10" y1="7" x2="18" y2="7" stroke={color} strokeWidth="1" strokeDasharray="2,2" className="preview-stroke" />
      <rect x="18" y="4" width="8" height="6" rx="2" fill={color} fillOpacity="0.4" className="preview-node" />
      <line x1="26" y1="7" x2="34" y2="7" stroke={color} strokeWidth="1" strokeDasharray="2,2" className="preview-stroke" style={{ animationDelay: '0.3s' }} />
      <rect x="34" y="4" width="8" height="6" rx="2" fill={color} fillOpacity="0.3" className="preview-node" style={{ animationDelay: '0.5s' }} />
      <rect x="18" y="14" width="8" height="6" rx="2" fill={color} fillOpacity="0.25" className="preview-node" style={{ animationDelay: '0.7s' }} />
    </svg>
  ),
  'keyboard-nav-lab': (color, Icon) => (
    <Icon className="w-8 h-8 preview-pulse" style={{ color }} />
  ),
  'contrast-explorer': (color) => (
    <div className="flex w-14 h-10 rounded-lg overflow-hidden" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="flex-1 flex items-center justify-center">
        <span className="text-[8px] font-black" style={{ color: '#fff' }}>A</span>
      </div>
      <div className="flex-1 flex items-center justify-center" style={{ background: '#fff' }}>
        <span className="text-[8px] font-black" style={{ color: `${color}` }}>A</span>
      </div>
    </div>
  ),
  'accessible-form-lab': (color) => (
    <div className="flex flex-col gap-0.5 w-14" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="h-1 rounded" style={{ background: `${color}40` }} />
      <div className="h-2 rounded border-2" style={{ borderColor: color }} />
      <div className="h-1 rounded" style={{ background: `${color}30`, width: '60%' }} />
    </div>
  ),
  'reduced-motion-explorer': (color, Icon) => (
    <Icon className="w-8 h-8 preview-pulse" style={{ color }} />
  ),
  'accessible-interaction-comparison': (color) => (
    <div className="flex gap-1 w-14" style={{ '--pv-color': color } as React.CSSProperties}>
      <div className="flex-1 h-8 rounded-lg border-2 border-dashed" style={{ borderColor: `${color}30` }} />
      <div className="flex-1 h-8 rounded-lg border-2" style={{ borderColor: color, background: `${color}10` }} />
    </div>
  ),
};

export default WidgetPreview;

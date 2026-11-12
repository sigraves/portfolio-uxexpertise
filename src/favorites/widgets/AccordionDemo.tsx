import { useState, useCallback } from 'react';
import { ChevronDown, Plus, Minus, Compass, Map, Anchor } from 'lucide-react';

interface AccordionItem {
  id: number;
  title: string;
  icon: typeof Compass;
  color: string;
  body: string;
}

const items: AccordionItem[] = [
  {
    id: 1,
    title: 'Understanding Your Users',
    icon: Compass,
    color: '#059669',
    body: 'Start with research. Interviews, surveys, and contextual inquiry reveal the goals, pain points, and mental models that should drive every design decision.',
  },
  {
    id: 2,
    title: 'Mapping the Journey',
    icon: Map,
    color: '#f97316',
    body: 'Journey maps connect user actions, emotions, and touchpoints across time. They expose gaps between expectation and reality, highlighting where the experience breaks down.',
  },
  {
    id: 3,
    title: 'Anchoring in Evidence',
    icon: Anchor,
    color: '#0ea5e9',
    body: 'Every recommendation should trace back to data. Whether quantitative analytics or qualitative themes, evidence builds credibility and prevents opinion-driven design.',
  },
];

type Mode = 'single' | 'multiple';

const AccordionDemo = () => {
  const [mode, setMode] = useState<Mode>('single');
  const [open, setOpen] = useState<Set<number>>(new Set([1]));

  const toggle = useCallback(
    (id: number) => {
      setOpen((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (mode === 'single') next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [mode]
  );

  const expandAll = useCallback(() => {
    setMode('multiple');
    setOpen(new Set(items.map((i) => i.id)));
  }, []);

  const collapseAll = useCallback(() => setOpen(new Set()), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMode('single');
              setOpen(new Set([1]));
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              mode === 'single' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            Single Open
          </button>
          <button
            onClick={() => setMode('multiple')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              mode === 'multiple' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            Multiple Open
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-teal-600 bg-teal-50 hover:bg-teal-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Expand All
          </button>
          <button
            onClick={collapseAll}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" /> Collapse All
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const isOpen = open.has(item.id);
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden border-2"
              style={{ borderColor: `${item.color}25` }}
            >
              <button
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`acc-panel-${item.id}`}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <span className="text-sm font-bold text-gray-800 flex-1">{item.title}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  style={{ color: item.color }}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <div id={`acc-panel-${item.id}`} className="px-4 pb-4 pl-15">
                    <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionDemo;

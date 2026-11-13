export type CategoryId =
  | 'cards-content'
  | 'ux-strategy'
  | 'ux-research'
  | 'data-viz'
  | 'playful'
  | 'forms-feedback'
  | 'advanced'
  | 'accessibility';

export interface Category {
  id: CategoryId;
  label: string;
  color: string;
  icon: string;
}

export interface WidgetMeta {
  id: string;
  name: string;
  category: CategoryId;
  icon: string;
  whyEngage: string;
  howItWorks: string[];
  uxValue: string;
  whenToUse: string;
  accessibility: string;
  variations: string;
  code: string;
}

export const categories: Category[] = [
  { id: 'cards-content', label: 'Cards & Content', color: '#059669', icon: 'Layers' },
  { id: 'ux-strategy', label: 'UX Strategy & Decisions', color: '#f97316', icon: 'Target' },
  { id: 'ux-research', label: 'UX Research & Discovery', color: '#0ea5e9', icon: 'Search' },
  { id: 'data-viz', label: 'Data Visualization', color: '#8B5CF6', icon: 'BarChart3' },
  { id: 'playful', label: 'Playful Interactions', color: '#ec4899', icon: 'Sparkles' },
  { id: 'forms-feedback', label: 'Forms & Feedback', color: '#14B8A6', icon: 'CheckSquare' },
  { id: 'advanced', label: 'Advanced Experiences', color: '#6366F1', icon: 'Zap' },
  { id: 'accessibility', label: 'Accessibility', color: '#be185d', icon: 'Accessibility' },
];

import { additionalWidgets } from './additionalWidgets';

export const widgets: WidgetMeta[] = [
  {
    id: 'flip-cards',
    name: 'Flip Cards',
    category: 'cards-content',
    icon: 'RotateCw',
    whyEngage:
      'Turn a card to discover hidden insights, answers, or a different perspective.',
    howItWorks: [
      'Click a card or press Enter to flip it between front and back.',
      'Use the Shuffle button to randomize the card order.',
      'Press Reset to return all cards to their front face.',
    ],
    uxValue:
      'Progressive disclosure and active learning — users reveal information on demand rather than being overwhelmed upfront.',
    whenToUse:
      'Flashcards, Q&A pairs, before/after comparisons, feature reveals, or any scenario where hiding then revealing creates engagement.',
    accessibility:
      'Keyboard accessible (Enter to flip, Tab to navigate). Focus indicators on each card. Respects prefers-reduced-motion by disabling the 3D rotation.',
    variations: 'Horizontal flip, vertical flip, and shuffleable deck mode.',
    code: `const FlipCard = ({ front, back }: { front: string; back: string }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
      className="card-3d"
    >
      <div className={flipped ? 'card-flipped' : ''}>
        <div className="card-face card-front">{front}</div>
        <div className="card-face card-back">{back}</div>
      </div>
    </div>
  );
};`,
  },
  {
    id: 'accordions',
    name: 'Accordions',
    category: 'cards-content',
    icon: 'ChevronDown',
    whyEngage:
      'Explore information at your own pace without being overwhelmed by everything at once.',
    howItWorks: [
      'Click a panel header or press Enter to expand or collapse it.',
      'In single-open mode, opening one panel closes the others.',
      'Use Expand All or Collapse All to control every panel at once.',
    ],
    uxValue:
      'Reduces cognitive load and supports scanning by letting users control how much detail they see.',
    whenToUse:
      'FAQs, long-form documentation, settings panels, or any content that benefits from progressive disclosure.',
    accessibility:
      'Keyboard navigable with Enter/Space toggling. aria-expanded and aria-controls connect headers to their panels. Focus indicators visible.',
    variations: 'Single-open, multiple-open, and nested accordions.',
    code: `const Accordion = ({ items }: { items: {title: string; body: string}[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  return items.map((item, i) => (
    <div key={i}>
      <button
        aria-expanded={open === i}
        onClick={() => setOpen(open === i ? null : i)}
      >
        {item.title}
      </button>
      {open === i && <div>{item.body}</div>}
    </div>
  ));
};`,
  },
  {
    id: 'prioritization-hotspots',
    name: 'Prioritization Hotspots',
    category: 'cards-content',
    icon: 'Target',
    whyEngage:
      'Select points of interest to uncover usability concerns, opportunities, and design priorities.',
    howItWorks: [
      'Click a numbered hotspot on the mockup to reveal its finding.',
      'Use the severity filter to show only High, Medium, or Low priority items.',
      'Each finding shows the concern, severity, rationale, and recommended improvement.',
    ],
    uxValue:
      'Makes evaluation findings easier to explore and prioritize by connecting visual context to actionable insights.',
    whenToUse:
      'Heuristic evaluation reports, usability audit presentations, or stakeholder reviews of interface issues.',
    accessibility:
      'Keyboard navigable hotspots with Enter to activate. Filter buttons are toggles with aria-pressed. Focus indicators on all interactive elements.',
    variations: 'Severity-filtered view and full unfiltered view.',
    code: `const Hotspot = ({ x, y, severity, finding }: HotspotProps) => {
  const [active, setActive] = useState(false);
  return (
    <button
      style={{ left: \`\${x}%\`, top: \`\${y}%\` }}
      onClick={() => setActive(!active)}
      className="absolute rounded-full"
    >
      {active && <div className="tooltip">{finding}</div>}
    </button>
  );
};`,
  },
  {
    id: 'interactive-tabs',
    name: 'Interactive Tabs',
    category: 'cards-content',
    icon: 'PanelTop',
    whyEngage:
      'Switch between related views and discover different information without leaving the page.',
    howItWorks: [
      'Click a tab or use arrow keys to switch between panels.',
      'The content area updates instantly to show the selected tab\u2019s information.',
      'Try horizontal, vertical, and icon-only variations.',
    ],
    uxValue:
      'Organizes related information in a compact space, reducing navigation while keeping content discoverable.',
    whenToUse:
      'Product feature comparisons, dashboard panels, settings sections, or categorized content within a single page.',
    accessibility:
      'ARIA tablist pattern with arrow-key navigation, aria-selected, and roving tabindex. Panel content announced via aria-labelledby.',
    variations: 'Horizontal tabs, vertical tabs, and icon-based tabs.',
    code: `const Tabs = ({ tabs }: { tabs: {label: string; content: string}[] }) => {
  const [active, setActive] = useState(0);
  return (
    <div role="tablist">
      {tabs.map((tab, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={active === i}
          onClick={() => setActive(i)}
        >
          {tab.label}
        </button>
      ))}
      <div role="tabpanel">{tabs[active].content}</div>
    </div>
  );
};`,
  },
  {
    id: 'expandable-cards',
    name: 'Expandable Cards',
    category: 'cards-content',
    icon: 'Expand',
    whyEngage:
      'Start with the essentials, then reveal deeper details whenever curiosity strikes.',
    howItWorks: [
      'Click a card to expand it inline, revealing additional content.',
      'Click again to collapse it back to the summary view.',
      'Try the overlay variation, which opens an expanded detail panel.',
    ],
    uxValue:
      'Balances information density with discoverability — users see summaries first and dive deeper on demand.',
    whenToUse:
      'Product grids, feature lists, search results, or any layout where cards need to support both scanning and deep dives.',
    accessibility:
      'Cards are buttons with aria-expanded state. Overlay variation traps focus and closes on Escape. Keyboard activation via Enter/Space.',
    variations: 'Inline expansion and expanded detail overlay.',
    code: `const ExpandableCard = ({ title, summary, detail }: CardProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <button
      aria-expanded={expanded}
      onClick={() => setExpanded(!expanded)}
    >
      <h4>{title}</h4>
      <p>{summary}</p>
      {expanded && <p>{detail}</p>}
    </button>
  );
};`,
  },
  {
    id: 'swipeable-card-deck',
    name: 'Swipeable Card Deck',
    category: 'cards-content',
    icon: 'GalleryHorizontalEnd',
    whyEngage:
      'Browse ideas one card at a time, making exploration feel simple and focused.',
    howItWorks: [
      'Use the Previous and Next buttons or arrow keys to move between cards.',
      'On touch devices, swipe left or right to navigate.',
      'The position indicator shows which card you\u2019re on out of the total.',
    ],
    uxValue:
      'Supports focused, sequential exploration by presenting one item at a time with clear navigation.',
    whenToUse:
      'Onboarding flows, story viewers, product galleries, or guided experiences where pacing matters.',
    accessibility:
      'Keyboard navigation with Left/Right arrows. Buttons have descriptive aria-labels. Position announced via aria-live region. Respects reduced-motion preferences.',
    variations: 'Button navigation and swipe gesture navigation.',
    code: `const CardDeck = ({ cards }: { cards: string[] }) => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % cards.length);
  const prev = () => setIndex((index - 1 + cards.length) % cards.length);
  return (
    <div>
      <div>{cards[index]}</div>
      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </div>
  );
};`,
  },
  {
    id: 'comparison-cards',
    name: 'Interactive Comparison Cards',
    category: 'cards-content',
    icon: 'Columns2',
    whyEngage:
      'Compare alternatives side by side and discover which solution better meets your needs.',
    howItWorks: [
      'Click a card to select it and highlight its features.',
      'Selected cards show a colored border and checkmarks on included features.',
      'Press Reset to clear all selections and start over.',
    ],
    uxValue:
      'Supports informed decisions by making differences between options immediately visible and comparable.',
    whenToUse:
      'Pricing tiers, product comparisons, plan selectors, or any scenario where users choose between options.',
    accessibility:
      'Cards are selectable buttons with aria-pressed state. Feature lists use semantic markup. Reset button clears all selections. Keyboard accessible.',
    variations: 'Single-select comparison and multi-select comparison.',
    code: `const ComparisonCard = ({ plan, features }: PlanProps) => {
  const [selected, setSelected] = useState(false);
  return (
    <button
      aria-pressed={selected}
      onClick={() => setSelected(!selected)}
    >
      <h4>{plan}</h4>
      <ul>{features.map(f => <li key={f}>{f}</li>)}</ul>
    </button>
  );
};`,
  },
  {
    id: 'impact-effort-matrix',
    name: 'Impact vs. Effort Matrix',
    category: 'ux-strategy',
    icon: 'LayoutGrid',
    whyEngage:
      'Discover which ideas offer the greatest potential value relative to the work required.',
    howItWorks: [
      'Drag opportunity cards onto the four-quadrant matrix.',
      'On mobile, tap a card to select it, then tap a quadrant to place it.',
      'The matrix sorts items into Quick Wins, Major Projects, Fill-Ins, and Reconsider.',
    ],
    uxValue:
      'Prioritization framework that visualizes the trade-off between value and cost, helping teams make evidence-based decisions.',
    whenToUse:
      'Roadmap planning, feature prioritization workshops, backlog grooming, or any decision involving competing initiatives.',
    accessibility:
      'Keyboard accessible with Tab to navigate, Enter to select and place. Quadrants have descriptive aria-labels. Drag-and-drop for desktop, tap-to-place for mobile.',
    variations: 'Drag-and-drop mode and tap-to-place mode.',
    code: `const Matrix = ({ items }: { items: MatrixItem[] }) => {
  const [placed, setPlaced] = useState<Placement[]>([]);
  const handleDrop = (id: string, quadrant: string) => {
    setPlaced([...placed.filter(p => p.id !== id), { id, quadrant }]);
  };
  return (
    <div className="grid grid-cols-2">
      {['Q1','Q2','Q3','Q4'].map(q => (
        <div key={q} onDrop={(e) => handleDrop(e.dataTransfer.getData('text'), q)}>
          {placed.filter(p => p.quadrant === q).map(p => p.id)}
        </div>
      ))}
    </div>
  );
};`,
  },
  ...additionalWidgets,
];

export const getWidgetById = (id: string): WidgetMeta | undefined =>
  widgets.find((w) => w.id === id);

export const getCategoryById = (id: CategoryId): Category | undefined =>
  categories.find((c) => c.id === id);

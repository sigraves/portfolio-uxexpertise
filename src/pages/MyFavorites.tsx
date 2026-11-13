import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ArrowLeft,
  X,
  Code,
  Check,
  Layers,
  Target,
  Compass,
  BarChart3,
  Sparkles,
  CheckSquare,
  Zap,
  Accessibility,
  RotateCw,
  ChevronDown,
  PanelTop,
  Expand,
  GalleryHorizontalEnd,
  Columns2,
  LayoutGrid,
  GitBranch,
  KanbanSquare,
  Table,
  ListChecks,
  Network,
  Scale,
  Map,
  Route,
  UserCircle,
  FolderTree,
  MonitorPlay,
  StickyNote,
  Workflow,
  Hexagon,
  Grid3x3,
  SlidersHorizontal,
  MoveHorizontal,
  Gauge,
  CalendarClock,
  Shuffle,
  Puzzle,
  Swords,
  Timer,
  Dices,
  Brain,
  ListTodo,
  ToggleLeft,
  Terminal,
  SearchCheck,
  BadgeCheck,
  Bell,
  Undo2,
  Loader,
  GraduationCap,
  Share2,
  Box,
  MousePointer2,
  ScrollText,
  Keyboard,
  Eye,
  Wind,
  FormInput,
  Sparkle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FourQuadrant from '../components/FourQuadrant';
import { widgets, categories, getWidgetById, getCategoryById } from '../favorites/widgetData';
import type { CategoryId } from '../favorites/widgetData';
import { widgetDemos } from '../favorites/widgets';
import WidgetPreview from '../favorites/WidgetPreview';

const widgetIconMap: Record<string, LucideIcon> = {
  Layers,
  Target,
  Search,
  BarChart3,
  Sparkles,
  CheckSquare,
  Zap,
  Accessibility,
  RotateCw,
  ChevronDown,
  PanelTop,
  Expand,
  GalleryHorizontalEnd,
  Columns2,
  LayoutGrid,
  GitBranch,
  KanbanSquare,
  Table,
  ListChecks,
  Network,
  Scale,
  Map,
  Route,
  UserCircle,
  FolderTree,
  MonitorPlay,
  StickyNote,
  Workflow,
  Hexagon,
  Grid3x3,
  SlidersHorizontal,
  MoveHorizontal,
  Gauge,
  CalendarClock,
  Shuffle,
  Puzzle,
  Swords,
  Timer,
  Dices,
  Brain,
  Compass,
  ListTodo,
  ToggleLeft,
  Terminal,
  SearchCheck,
  BadgeCheck,
  Bell,
  Undo2,
  Loader,
  GraduationCap,
  Share2,
  Box,
  MousePointer2,
  ScrollText,
  Keyboard,
  Eye,
  Wind,
  FormInput,
  Sparkle,
};

const getWidgetIcon = (iconName: string): LucideIcon => widgetIconMap[iconName] || Sparkle;

const FAVS_KEY = 'uxexpertise-favorites';

const loadFavorites = (): Set<string> => {
  try {
    const stored = localStorage.getItem(FAVS_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

const saveFavorites = (favs: Set<string>) => {
  try {
    localStorage.setItem(FAVS_KEY, JSON.stringify(Array.from(favs)));
  } catch {
    // ignore
  }
};

const MyFavorites = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all' | 'favorites'>('all');
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFavs(loadFavorites());
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveFavorites(next);
      return next;
    });
  }, []);

  const filteredWidgets = useMemo(() => {
    return widgets.filter((w) => {
      const matchesSearch =
        !search ||
        w.name.toLowerCase().includes(search.toLowerCase()) ||
        w.whyEngage.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'all' ||
        (activeCategory === 'favorites' && favs.has(w.id)) ||
        w.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, favs]);

  const selectedWidget = selectedWidgetId ? getWidgetById(selectedWidgetId) : null;
  const DemoComponent = selectedWidgetId ? widgetDemos[selectedWidgetId] : null;

  useEffect(() => {
    document.title = selectedWidget
      ? `${selectedWidget.name} — My Favorites — UXExpertise`
      : 'My Favorites — UXExpertise';
  }, [selectedWidget]);

  // Detail view
  if (selectedWidget) {
    const cat = getCategoryById(selectedWidget.category)!;
    const isFav = favs.has(selectedWidget.id);
    const WidgetIcon = getWidgetIcon(selectedWidget.icon);
    return (
      <div className="min-h-screen bg-[#E9FAF3] text-gray-800">
        <NavBar />
        <main className="pt-20 pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedWidgetId(null)}
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </button>

          {/* Widget header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                <WidgetIcon className="w-6 h-6" style={{ color: cat.color }} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">{selectedWidget.name}</h1>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: cat.color }}>
                  {cat.label}
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(selectedWidget.id)}
              aria-pressed={isFav}
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
              className="p-3 rounded-xl border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              style={{
                borderColor: isFav ? '#ec4899' : '#E5E7EB',
                backgroundColor: isFav ? '#fce7f3' : '#FFFFFF',
              }}
            >
              <Heart
                className="w-5 h-5 transition-colors"
                style={{ color: isFav ? '#ec4899' : '#D1D5DB' }}
                fill={isFav ? '#ec4899' : 'none'}
              />
            </button>
          </div>

          {/* 1. Live Demo */}
          <Section number="1" title="Live Demo" color={cat.color}>
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6">
              {DemoComponent ? (
                <DemoComponent />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <WidgetIcon className="w-12 h-12 mb-3" style={{ color: cat.color }} />
                  <p className="text-sm font-bold text-gray-700 mb-1">Interactive demo coming soon</p>
                  <p className="text-xs text-gray-400 max-w-sm">
                    The full interactive demonstration for {selectedWidget.name} is being built.
                    The metadata, code, and all other sections are available below.
                  </p>
                </div>
              )}
            </div>
          </Section>

          {/* 2. Why Users Engage */}
          <Section number="2" title="Why Users Engage" color={cat.color}>
            <p className="text-sm text-gray-600 leading-relaxed">{selectedWidget.whyEngage}</p>
          </Section>

          {/* 3. How It Works */}
          <Section number="3" title="How It Works" color={cat.color}>
            <ol className="space-y-2">
              {selectedWidget.howItWorks.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
                    style={{ backgroundColor: cat.color }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </Section>

          {/* 4. UX Value */}
          <Section number="4" title="UX Value" color={cat.color}>
            <p className="text-sm text-gray-600 leading-relaxed">{selectedWidget.uxValue}</p>
          </Section>

          {/* 5. When to Use It */}
          <Section number="5" title="When to Use It" color={cat.color}>
            <p className="text-sm text-gray-600 leading-relaxed">{selectedWidget.whenToUse}</p>
          </Section>

          {/* 6. Accessibility */}
          <Section number="6" title="Accessibility" color={cat.color}>
            <p className="text-sm text-gray-600 leading-relaxed">{selectedWidget.accessibility}</p>
          </Section>

          {/* 7. Variations */}
          <Section number="7" title="Variations" color={cat.color}>
            <p className="text-sm text-gray-600 leading-relaxed">{selectedWidget.variations}</p>
          </Section>

          {/* 8. Copy Code */}
          <Section number="8" title="Copy Code" color={cat.color}>
            <div className="relative rounded-xl bg-gray-900 p-4 overflow-x-auto">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(selectedWidget.code);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Code className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <pre className="text-xs text-gray-300 font-mono leading-relaxed">
                <code>{selectedWidget.code}</code>
              </pre>
            </div>
          </Section>

          {/* 9. Favorite */}
          <Section number="9" title="Favorite" color={cat.color}>
            <button
              onClick={() => toggleFavorite(selectedWidget.id)}
              aria-pressed={isFav}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              style={{
                backgroundColor: isFav ? '#fce7f3' : '#FFFFFF',
                border: `2px solid ${isFav ? '#ec4899' : '#E5E7EB'}`,
                color: isFav ? '#ec4899' : '#6B7280',
              }}
            >
              <Heart className="w-4 h-4" fill={isFav ? '#ec4899' : 'none'} />
              {isFav ? 'Saved to Favorites' : 'Add to Favorites'}
            </button>
          </Section>

          <button
            onClick={() => setSelectedWidgetId(null)}
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors mt-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // Gallery view
  const totalCount = widgets.length;
  const showingCount = filteredWidgets.length;

  return (
    <div className="min-h-screen bg-[#E9FAF3] text-gray-800">
      <NavBar />
      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to UXExpertise
        </button>

        {/* Header */}
        <div className="text-center mb-8 animate-pmt-reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FourQuadrant size={28} />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">My Favorites</h1>
          <p className="text-base text-teal-600 font-bold mt-2">
            Explore. Interact. Evaluate. Reuse.
          </p>
          <p className="text-sm text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            A personal collection of interactive experiences that demonstrate how thoughtful design can turn
            information into exploration, decisions, discovery, and meaningful engagement.
          </p>
        </div>

        {/* Widget count */}
        <p className="text-center text-sm font-bold text-gray-500 mb-6">
          {activeCategory === 'all' && !search
            ? `${totalCount} Interactive Experiences`
            : `${showingCount} of ${totalCount} experiences`}
        </p>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search widgets by name or description..."
            aria-label="Search widgets"
            className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 bg-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <FilterChip
            label="All"
            active={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            color="#64748b"
          />
          <FilterChip
            label={`Favorites (${favs.size})`}
            active={activeCategory === 'favorites'}
            onClick={() => setActiveCategory('favorites')}
            color="#ec4899"
            icon={<Heart className="w-3 h-3" fill="#ec4899" />}
          />
          {categories.map((cat) => {
            const catIcon = getWidgetIcon(cat.icon);
            return (
              <FilterChip
                key={cat.id}
                label={cat.label}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                color={cat.color}
                icon={<catIcon className="w-3 h-3" />}
              />
            );
          })}
        </div>

        {/* Gallery grid */}
        {filteredWidgets.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">
              {activeCategory === 'favorites'
                ? 'No favorites yet. Tap the heart on any widget to save it here.'
                : 'No widgets match your search.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWidgets.map((w) => {
              const cat = getCategoryById(w.category)!;
              const WidgetIcon = getWidgetIcon(w.icon);
              const isFav = favs.has(w.id);
              return (
                <div
                  key={w.id}
                  className="group rounded-2xl bg-white border-2 border-gray-200 p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 animate-pmt-reveal"
                >
                  {/* Animated visual preview */}
                  <div
                    className="w-full h-24 rounded-xl flex items-center justify-center mb-4 overflow-hidden transition-transform group-hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg, ${cat.color}10, ${cat.color}25)` }}
                  >
                    <WidgetPreview widgetId={w.id} color={cat.color} icon={WidgetIcon} />
                  </div>

                  {/* Category badge */}
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                  >
                    {cat.label}
                  </span>

                  {/* Name */}
                  <h3 className="text-lg font-black text-gray-900 mt-2 mb-1">{w.name}</h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{w.whyEngage}</p>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedWidgetId(w.id);
                        window.scrollTo(0, 0);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                      style={{ backgroundColor: cat.color }}
                    >
                      Try It
                    </button>
                    <button
                      onClick={() => toggleFavorite(w.id)}
                      aria-pressed={isFav}
                      aria-label={isFav ? `Remove ${w.name} from favorites` : `Add ${w.name} to favorites`}
                      className="p-2 rounded-lg transition-all hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      <Heart
                        className="w-5 h-5 transition-colors"
                        style={{ color: isFav ? '#ec4899' : '#D1D5DB' }}
                        fill={isFav ? '#ec4899' : 'none'}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

const FilterChip = ({
  label,
  active,
  onClick,
  color,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
  icon?: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
      active ? 'text-white' : 'bg-white text-gray-500 border-2 border-gray-200 hover:border-gray-300'
    }`}
    style={active ? { backgroundColor: color } : {}}
  >
    {icon}
    {label}
  </button>
);

const Section = ({
  number,
  title,
  color,
  children,
}: {
  number: string;
  title: string;
  color: string;
  children: React.ReactNode;
}) => (
  <section className="mb-6">
    <div className="flex items-center gap-2 mb-2">
      <span
        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
        style={{ backgroundColor: color }}
      >
        {number}
      </span>
      <h2 className="text-base font-black text-gray-900">{title}</h2>
    </div>
    <div className="pl-9">{children}</div>
  </section>
);

export default MyFavorites;

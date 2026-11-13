import { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, Search, X, Check, Plus } from 'lucide-react';

const suggestions = [
  'Affordance',
  'Accessibility',
  'Breadcrumb',
  'Card Sorting',
  'Dark Pattern',
  'Design System',
  'Empathy Map',
  'Fitts\'s Law',
  'Heuristic Evaluation',
  'Information Architecture',
  'Journey Map',
  'KPI',
  'Mental Model',
  'Persona',
  'Progressive Disclosure',
  'Wireframe',
];

const AutocompleteDemo = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [selected, setSelected] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? suggestions.filter(
        (s) => s.toLowerCase().includes(query.toLowerCase()) && !selected.includes(s)
      )
    : [];

  const pick = useCallback((term: string) => {
    setSelected((prev) => (prev.includes(term) ? prev : [...prev, term]));
    setQuery('');
    setOpen(false);
    setActive(-1);
    inputRef.current?.focus();
  }, []);

  const remove = useCallback((term: string) => {
    setSelected((prev) => prev.filter((s) => s !== term));
  }, []);

  const reset = useCallback(() => {
    setQuery('');
    setOpen(false);
    setSelected([]);
    setActive(-1);
  }, []);

  // keep active in range
  useEffect(() => {
    setActive((a) => (a >= filtered.length ? -1 : a));
  }, [filtered.length]);

  // scroll active into view
  useEffect(() => {
    if (active < 0) return;
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[active]) pick(filtered[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">Type to search UX terms</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={onKey}
          placeholder="Search a UX term, e.g. persona…"
          className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-gray-200 text-sm focus:outline-none focus:border-teal-400 transition-colors"
        />

        {/* Dropdown */}
        {open && filtered.length > 0 && (
          <div
            ref={listRef}
            className="absolute z-10 left-0 right-0 mt-1 rounded-xl border-2 border-gray-200 bg-white shadow-xl overflow-hidden animate-pmt-reveal"
          >
            {filtered.map((term, i) => (
              <button
                key={term}
                data-idx={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(term)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
                  i === active ? 'bg-teal-50' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-bold text-gray-800">{term}</span>
                {i === active && <Plus className="w-4 h-4 text-teal-600" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected tags */}
      <div className="mt-5">
        <p className="text-xs font-bold text-gray-600 mb-2">
          Selected terms {selected.length > 0 && <span className="text-gray-400">({selected.length})</span>}
        </p>
        {selected.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No terms selected yet. Pick from the dropdown to add.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selected.map((term) => (
              <span
                key={term}
                className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold animate-pmt-reveal"
              >
                <Check className="w-3 h-3" /> {term}
                <button
                  onClick={() => remove(term)}
                  aria-label={`Remove ${term}`}
                  className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-teal-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutocompleteDemo;

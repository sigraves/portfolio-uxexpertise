import { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, Search, CornerDownLeft, ArrowUp, ArrowDown, Command } from 'lucide-react';

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: typeof Search;
}

const commands: Command[] = [
  { id: 'new', label: 'New File', hint: 'Create', icon: Search },
  { id: 'open', label: 'Open Project', hint: 'File', icon: CornerDownLeft },
  { id: 'save', label: 'Save All', hint: 'File', icon: CornerDownLeft },
  { id: 'theme', label: 'Toggle Theme', hint: 'View', icon: Search },
  { id: 'search', label: 'Find in Files', hint: 'Edit', icon: Search },
  { id: 'terminal', label: 'Open Terminal', hint: 'Tools', icon: Command },
  { id: 'format', label: 'Format Document', hint: 'Edit', icon: CornerDownLeft },
  { id: 'settings', label: 'Open Settings', hint: 'Preferences', icon: Search },
];

const CommandPaletteDemo = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  const run = useCallback((cmd: Command) => {
    setToast(`Ran: ${cmd.label}`);
    setOpen(false);
    setQuery('');
    setActive(0);
  }, []);

  // toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  // focus input when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // keep active in range
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  // scroll active into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[active]) run(filtered[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <Search className="w-4 h-4" /> Open
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/20 text-xs font-mono">
            <Command className="w-3 h-3" />K
          </kbd>
        </button>
        <button
          onClick={() => {
            setToast(null);
            setQuery('');
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      <p className="text-xs text-gray-400">
        Use <ArrowUp className="inline w-3 h-3" /><ArrowDown className="inline w-3 h-3" /> to navigate, <CornerDownLeft className="inline w-3 h-3" /> to run, <kbd className="font-mono">Esc</kbd> to close.
      </p>

      {/* Palette overlay */}
      {open && (
        <div
          className="mt-4 rounded-xl border-2 border-gray-200 bg-white shadow-xl overflow-hidden animate-pmt-reveal"
          onKeyDown={onKey}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              placeholder="Type a command…"
              className="flex-1 text-sm focus:outline-none"
              aria-label="Search commands"
            />
            <kbd className="text-[10px] font-mono text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">ESC</kbd>
          </div>
          <div ref={listRef} className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No matching commands</p>
            ) : (
              filtered.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    data-idx={i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => run(cmd)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === active ? 'bg-teal-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${i === active ? 'text-teal-600' : 'text-gray-400'}`} />
                    <span className="text-sm font-bold text-gray-800 flex-1">{cmd.label}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{cmd.hint}</span>
                    {i === active && <CornerDownLeft className="w-3.5 h-3.5 text-teal-600" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-bold animate-pmt-reveal">
          <CornerDownLeft className="w-4 h-4 text-teal-400" /> {toast}
        </div>
      )}
    </div>
  );
};

export default CommandPaletteDemo;

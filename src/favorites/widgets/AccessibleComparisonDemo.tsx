import { useState, useCallback, useRef, useEffect } from 'react';
import { RotateCcw, Eye, EyeOff, ChevronDown, Check, AlertTriangle } from 'lucide-react';

const OPTIONS = ['Edit profile', 'Account settings', 'Notifications', 'Privacy', 'Help & support', 'Sign out'];

const NOTES = [
  { bad: 'Built with <div>s — not focusable, no keyboard interaction.', good: 'A real <button> receives focus and responds to Enter/Space.', wcag: 'WCAG 2.1.1 Keyboard' },
  { bad: 'No ARIA state. Screen readers cannot tell if the menu is open.', good: 'aria-expanded & aria-controls expose open/closed state.', wcag: 'WCAG 4.1.2 Name, Role, Value' },
  { bad: 'Options are divs you can only reach with a mouse.', good: 'Arrow keys move between options, Esc closes, Enter selects.', wcag: 'WCAG 2.1.1 Keyboard' },
];

const AccessibleComparisonDemo = () => {
  const [mode, setMode] = useState<'accessible' | 'inaccessible'>('accessible');
  const [annotate, setAnnotate] = useState(false);
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const optRefs = useRef<(HTMLLIElement | null)[]>([]);

  // accessible dropdown keyboard nav
  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusIdx((i) => Math.min(i + 1, OPTIONS.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocusIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); btnRef.current?.focus(); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(false); btnRef.current?.focus(); }
  };

  useEffect(() => {
    if (open && mode === 'accessible') optRefs.current[focusIdx]?.focus();
  }, [open, focusIdx, mode]);

  const reset = useCallback(() => { setMode('accessible'); setOpen(false); setAnnotate(false); setFocusIdx(0); }, []);

  const Note = ({ i }: { i: number }) => {
    if (!annotate) return null;
    const n = NOTES[i];
    return (
      <div className="mt-1 text-[10px] leading-snug rounded-md px-2 py-1 bg-amber-50 border border-amber-200 text-amber-800">
        <p><span className="font-black">Bad:</span> {n.bad}</p>
        <p><span className="font-black">Good:</span> {n.good}</p>
        <p className="opacity-70 mt-0.5">{n.wcag}</p>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex gap-1.5">
          <button onClick={() => setMode('accessible')} aria-pressed={mode === 'accessible'} className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${mode === 'accessible' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500'}`}>Accessible</button>
          <button onClick={() => setMode('inaccessible')} aria-pressed={mode === 'inaccessible'} className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${mode === 'inaccessible' ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-500'}`}>Inaccessible</button>
        </div>
        <div className="flex gap-1.5">
          <button onClick={() => setAnnotate((v) => !v)} aria-pressed={annotate} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
            {annotate ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            {annotate ? 'Notes on' : 'Notes'}
          </button>
          <button onClick={reset} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      <div className={`rounded-xl border-2 p-4 ${mode === 'accessible' ? 'border-teal-200 bg-teal-50/30' : 'border-rose-200 bg-rose-50/30'}`}>
        <p className={`text-[10px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${mode === 'accessible' ? 'text-teal-600' : 'text-rose-500'}`}>
          {mode === 'accessible' ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
          {mode === 'accessible' ? 'Accessible — keyboard + ARIA' : 'Inaccessible — mouse only'}
        </p>

        {mode === 'accessible' ? (
          <div className="relative inline-block">
            <button
              ref={btnRef}
              onClick={() => { setOpen((v) => !v); setFocusIdx(0); }}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-controls="acc-listbox"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-gray-300 text-sm font-bold bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              Menu <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <ul id="acc-listbox" role="listbox" className="absolute top-full left-0 mt-1 w-44 rounded-lg border-2 border-gray-200 bg-white shadow-lg z-10 py-1" onKeyDown={onListKey}>
                {OPTIONS.map((opt, i) => (
                  <li
                    key={opt}
                    ref={(el) => { optRefs.current[i] = el; }}
                    role="option"
                    aria-selected={focusIdx === i}
                    tabIndex={-1}
                    onClick={() => { setOpen(false); btnRef.current?.focus(); }}
                    className={`px-3 py-1.5 text-sm cursor-pointer ${focusIdx === i ? 'bg-teal-50 text-teal-700 font-bold' : 'text-gray-700'}`}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-[10px] text-gray-400 mt-2">Arrow keys to move · Esc to close · Enter to select</p>
          </div>
        ) : (
          <div className="relative inline-block">
            <div
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-gray-300 text-sm font-bold bg-white cursor-pointer select-none"
            >
              Menu <ChevronDown className={`w-4 h-4 ${open ? 'rotate-180' : ''}`} />
            </div>
            {open && (
              <div className="absolute top-full left-0 mt-1 w-44 rounded-lg border-2 border-gray-200 bg-white shadow-lg z-10 py-1">
                {OPTIONS.map((opt) => (
                  <div key={opt} onClick={() => setOpen(false)} className="px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-100 text-gray-700">
                    {opt}
                  </div>
                ))}
              </div>
            )}
            <p className="text-[10px] text-rose-400 mt-2">Try reaching this with Tab — you can't.</p>
          </div>
        )}

        <div className="mt-3 space-y-1">
          <Note i={0} /><Note i={1} /><Note i={2} />
        </div>
      </div>
    </div>
  );
};

export default AccessibleComparisonDemo;

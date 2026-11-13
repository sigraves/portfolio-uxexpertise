import { useState, useCallback, useEffect, useRef } from 'react';
import { Home, Search, Bell, User, ToggleLeft, ToggleRight, Keyboard } from 'lucide-react';

const KeyboardNavLabDemo = () => {
  const [enhanced, setEnhanced] = useState(false);
  const [tabCount, setTabCount] = useState(0);
  const [focused, setFocused] = useState('None');
  const rootRef = useRef<HTMLDivElement>(null);

  const onFocusIn = useCallback((e: FocusEvent) => {
    const el = e.target as HTMLElement;
    const label = el.getAttribute('aria-label') || el.textContent?.trim() || el.tagName.toLowerCase();
    setFocused(label.slice(0, 28));
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') setTabCount((c) => c + 1);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.addEventListener('focusin', onFocusIn);
    root.addEventListener('keydown', onKeyDown);
    return () => {
      root.removeEventListener('focusin', onFocusIn);
      root.removeEventListener('keydown', onKeyDown);
    };
  }, [onFocusIn, onKeyDown]);

  const reset = useCallback(() => { setTabCount(0); setFocused('None'); }, []);

  return (
    <div ref={rootRef}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <button
          onClick={() => setEnhanced((v) => !v)}
          aria-pressed={enhanced}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          style={{ backgroundColor: enhanced ? '#0ea5e915' : '#f3f4f6', color: enhanced ? '#0284c7' : '#6b7280', border: `2px solid ${enhanced ? '#0ea5e9' : '#e5e7eb'}` }}
        >
          {enhanced ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
          {enhanced ? 'Enhanced focus' : 'Default focus'}
        </button>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-gray-500">Tab count: <span className="font-black text-gray-900">{tabCount}</span></span>
          <button onClick={reset} className="text-gray-400 hover:text-gray-600 font-bold underline">reset</button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-sky-50 border border-sky-100">
        <Keyboard className="w-4 h-4 text-sky-600 flex-shrink-0" />
        <p className="text-xs text-sky-800">Press <kbd className="font-mono font-bold">Tab</kbd> / <kbd className="font-mono font-bold">Shift+Tab</kbd> to move focus, <kbd className="font-mono font-bold">Enter</kbd> to activate.</p>
      </div>

      <div className="flex items-center gap-2 mb-3 text-xs">
        <span className="text-gray-400 font-bold">Focused:</span>
        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold" aria-live="polite">{focused}</span>
      </div>

      {/* mock UI */}
      <div className={`rounded-xl border-2 p-3 transition-all ${enhanced ? 'border-sky-200' : 'border-gray-200'}`}>
        <nav className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
          <span className="text-sm font-black text-gray-900 flex items-center gap-1.5"><Home className="w-4 h-4" /> Logo</span>
          <a href="#" aria-label="Home" className={`ml-auto px-2.5 py-1 text-xs font-bold rounded transition-all ${enhanced ? 'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2' : 'focus:outline-none'}`}>Home</a>
          <a href="#" aria-label="Search" className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${enhanced ? 'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2' : 'focus:outline-none'}`}><Search className="w-3.5 h-3.5" /></a>
          <button aria-label="Notifications" className={`p-1.5 rounded transition-all ${enhanced ? 'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2' : 'focus:outline-none'}`}><Bell className="w-3.5 h-3.5" /></button>
          <button aria-label="Profile" className={`p-1.5 rounded transition-all ${enhanced ? 'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2' : 'focus:outline-none'}`}><User className="w-3.5 h-3.5" /></button>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="kn-first" className={`block text-xs font-bold mb-1 ${enhanced ? 'text-gray-700' : 'sr-only'}`}>First name</label>
            <input id="kn-first" type="text" placeholder="First name" aria-label={enhanced ? undefined : 'First name'} className={`w-full px-2.5 py-1.5 rounded-lg border-2 text-xs ${enhanced ? 'border-gray-200 focus:outline-none focus:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-500' : 'border-gray-200 focus:outline-none'}`} />
          </div>
          <div>
            <label htmlFor="kn-email" className={`block text-xs font-bold mb-1 ${enhanced ? 'text-gray-700' : 'sr-only'}`}>Email</label>
            <input id="kn-email" type="email" placeholder="Email" aria-label={enhanced ? undefined : 'Email'} className={`w-full px-2.5 py-1.5 rounded-lg border-2 text-xs ${enhanced ? 'border-gray-200 focus:outline-none focus:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-500' : 'border-gray-200 focus:outline-none'}`} />
          </div>
        </div>

        <button className={`mt-3 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 transition-all ${enhanced ? 'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2' : 'focus:outline-none'}`}>Subscribe</button>
      </div>
    </div>
  );
};

export default KeyboardNavLabDemo;

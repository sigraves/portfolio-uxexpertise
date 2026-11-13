import { useState, useCallback } from 'react';
import { RotateCcw, Eye, EyeOff, Check, AlertTriangle } from 'lucide-react';

const FIELDS = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', errorHint: 'Please enter your name.' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', errorHint: 'Enter a valid email address.' },
  { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Write a message…', errorHint: 'Message cannot be empty.' },
];

const NOTES: Record<string, { inaccessible: string; accessible: string; wcag: string }> = {
  label: { inaccessible: 'No <label>. Users — especially screen-reader users — cannot tell what each field is for.', accessible: 'A <label> is wired with htmlFor so clicking it focuses the field and screen readers announce it.', wcag: 'WCAG 1.3.1 Info & Relationships' },
  desc: { inaccessible: 'Error messages are visual only, in red text with no programmatic link to the field.', accessible: 'aria-describedby connects each field to its hint/error so it is announced on focus.', wcag: 'WCAG 3.3.1 Error Identification' },
  required: { inaccessible: 'Required is shown with a red asterisk only — invisible to assistive tech.', accessible: 'aria-required="true" conveys the requirement programmatically.', wcag: 'WCAG 3.3.2 Labels or Instructions' },
};

const AccessibleFormLabDemo = () => {
  const [annotate, setAnnotate] = useState(false);
  const [vals, setVals] = useState<Record<string, string>>({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const onChange = useCallback((id: string, v: string) => setVals((p) => ({ ...p, [id]: v })), []);
  const onBlur = useCallback((id: string) => setTouched((p) => ({ ...p, [id]: true })), []);
  const reset = useCallback(() => { setVals({ name: '', email: '', message: '' }); setTouched({}); }, []);

  const errorFor = (id: string) => (touched[id] && !vals[id] ? FIELDS.find((f) => f.id === id)!.errorHint : '');

  const Note = ({ kind }: { kind: keyof typeof NOTES }) => {
    if (!annotate) return null;
    const n = NOTES[kind];
    return (
      <div className="mt-1.5 text-[10px] leading-snug rounded-md px-2 py-1 bg-amber-50 border border-amber-200 text-amber-800">
        <p><span className="font-black">Fix:</span> {n.accessible}</p>
        <p className="opacity-70 mt-0.5">{n.wcag}</p>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <button
          onClick={() => setAnnotate((v) => !v)}
          aria-pressed={annotate}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          style={{ backgroundColor: annotate ? '#fef3c715' : '#f3f4f6', color: annotate ? '#b45309' : '#6b7280', border: `2px solid ${annotate ? '#f59e0b' : '#e5e7eb'}` }}
        >
          {annotate ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          {annotate ? 'Annotations on' : 'Show annotations'}
        </button>
        <button onClick={reset} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Inaccessible */}
        <div className="rounded-xl border-2 border-rose-200 bg-rose-50/30 p-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-rose-500 mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Inaccessible</p>
          <div className="space-y-3">
            {FIELDS.map((f) => (
              <div key={f.id}>
                {f.type === 'textarea' ? (
                  <textarea placeholder={f.placeholder} value={vals[f.id]} onChange={(e) => onChange(f.id, e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border-2 border-gray-200 text-xs focus:outline-none" rows={2} />
                ) : (
                  <input type={f.type} placeholder={f.placeholder} value={vals[f.id]} onChange={(e) => onChange(f.id, e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border-2 border-gray-200 text-xs focus:outline-none" />
                )}
                {errorFor(f.id) && <p className="text-[10px] text-rose-600 mt-0.5">* {errorFor(f.id)}</p>}
                <Note kind="label" />
              </div>
            ))}
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gray-700 focus:outline-none">Submit</button>
          </div>
        </div>

        {/* Accessible */}
        <div className="rounded-xl border-2 border-teal-200 bg-teal-50/30 p-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-teal-600 mb-2 flex items-center gap-1"><Check className="w-3 h-3" /> Accessible</p>
          <div className="space-y-3">
            {FIELDS.map((f) => {
              const err = errorFor(f.id);
              const hintId = `${f.id}-hint`;
              const errId = `${f.id}-err`;
              return (
                <div key={f.id}>
                  <label htmlFor={`acc-${f.id}`} className="block text-xs font-bold text-gray-700 mb-1">
                    {f.label} <span className="text-rose-500" aria-hidden="true">*</span>
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea id={`acc-${f.id}`} placeholder={f.placeholder} value={vals[f.id]} onChange={(e) => onChange(f.id, e.target.value)} onBlur={() => onBlur(f.id)} aria-required="true" aria-describedby={err ? errId : hintId} aria-invalid={!!err} className="w-full px-2.5 py-1.5 rounded-lg border-2 border-gray-200 text-xs focus:outline-none focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500" rows={2} />
                  ) : (
                    <input id={`acc-${f.id}`} type={f.type} placeholder={f.placeholder} value={vals[f.id]} onChange={(e) => onChange(f.id, e.target.value)} onBlur={() => onBlur(f.id)} aria-required="true" aria-describedby={err ? errId : hintId} aria-invalid={!!err} className="w-full px-2.5 py-1.5 rounded-lg border-2 border-gray-200 text-xs focus:outline-none focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500" />
                  )}
                  {err ? (
                    <p id={errId} role="alert" className="text-[10px] text-rose-600 mt-0.5 font-bold">{err}</p>
                  ) : (
                    <p id={hintId} className="text-[10px] text-gray-400 mt-0.5">{f.type === 'email' ? 'We never share your email.' : 'Required field.'}</p>
                  )}
                  <Note kind="desc" />
                </div>
              );
            })}
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibleFormLabDemo;

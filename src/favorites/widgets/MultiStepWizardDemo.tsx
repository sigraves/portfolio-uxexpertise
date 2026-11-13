import { useState, useCallback } from 'react';
import { RotateCcw, ChevronRight, ChevronLeft, User, Mail, Check, Sparkles } from 'lucide-react';

const steps = ['Account', 'Preferences', 'Review'] as const;
type Pref = 'daily' | 'weekly' | 'monthly';
interface FormState { name: string; email: string; pref: Pref }
const initialState: FormState = { name: '', email: '', pref: 'daily' };

const prefs: { id: Pref; label: string; desc: string }[] = [
  { id: 'daily', label: 'Daily', desc: 'A digest every morning' },
  { id: 'weekly', label: 'Weekly', desc: 'A summary each Monday' },
  { id: 'monthly', label: 'Monthly', desc: 'One email per month' },
];

const TextField = ({ label, icon: Icon, value, onChange, placeholder, error }: {
  label: string; icon: typeof User; value: string; onChange: (v: string) => void; placeholder: string; error?: string;
}) => (
  <div>
    <label className="block text-xs font-bold text-gray-600 mb-1.5">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-invalid={!!error}
        className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 text-sm focus:outline-none focus:border-teal-400 transition-colors"
        style={{ borderColor: error ? '#ef4444' : '#E5E7EB' }}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const MultiStepWizardDemo = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const validateStep = useCallback((s: number, f: FormState): Record<string, string> => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!f.name.trim()) e.name = 'Name is required';
      if (!f.email.trim()) e.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email';
    }
    return e;
  }, []);

  const next = useCallback(() => {
    const e = validateStep(step, form);
    setErrors(e);
    if (Object.keys(e).length === 0 && step < steps.length - 1) setStep(step + 1);
  }, [step, form, validateStep]);

  const back = useCallback(() => { setErrors({}); if (step > 0) setStep(step - 1); }, [step]);
  const reset = useCallback(() => { setStep(0); setForm(initialState); setErrors({}); setDone(false); }, []);
  const set = (k: keyof FormState, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: '' }));
  };

  if (done) {
    return (
      <div className="text-center py-8 animate-pmt-reveal">
        <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-teal-600" />
        </div>
        <p className="text-lg font-black text-gray-900 mb-1">Submission complete!</p>
        <p className="text-sm text-gray-500 mb-5">Your preferences have been saved.</p>
        <button onClick={reset} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
          <RotateCcw className="w-3.5 h-3.5" /> Start Over
        </button>
      </div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i <= step ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </span>
              <span className={`text-xs font-bold ${i <= step ? 'text-gray-800' : 'text-gray-400'} hidden sm:inline`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full bg-teal-600 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="min-h-[150px] animate-pmt-reveal">
        {step === 0 && (
          <div className="space-y-4">
            <TextField label="Full Name" icon={User} value={form.name} onChange={(v) => set('name', v)} placeholder="Jane Designer" error={errors.name} />
            <TextField label="Email" icon={Mail} value={form.email} onChange={(v) => set('email', v)} placeholder="jane@design.com" error={errors.email} />
          </div>
        )}
        {step === 1 && (
          <div>
            <p className="text-sm font-bold text-gray-800 mb-3">How often do you want updates?</p>
            <div className="space-y-2">
              {prefs.map((opt) => (
                <label key={opt.id} className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50" style={{ borderColor: form.pref === opt.id ? '#0d9488' : '#E5E7EB' }}>
                  <input type="radio" name="pref" checked={form.pref === opt.id} onChange={() => set('pref', opt.id)} className="accent-teal-600" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="rounded-xl bg-gray-50 p-4 border-2 border-gray-200">
            <p className="text-sm font-black text-gray-900 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" /> Please review your details
            </p>
            <dl className="space-y-2 text-sm">
              {[['Name', form.name || '—'], ['Email', form.email || '—'], ['Update frequency', <span key="p" className="capitalize">{form.pref}</span>] as [string, React.ReactNode]].map(([k, v]) => (
                <div key={k as string} className="flex justify-between gap-4">
                  <dt className="text-gray-500">{k}</dt>
                  <dd className="font-bold text-gray-800">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          <ChevronLeft className="w-3.5 h-3.5" /> Back
        </button>
        {step < steps.length - 1 ? (
          <button onClick={next} className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors">
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button onClick={() => setDone(true)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors">
            <Check className="w-3.5 h-3.5" /> Submit
          </button>
        )}
        <button onClick={reset} aria-label="Reset wizard" className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors">
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
    </div>
  );
};

export default MultiStepWizardDemo;

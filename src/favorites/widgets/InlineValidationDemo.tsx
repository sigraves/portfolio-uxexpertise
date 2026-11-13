import { useState, useCallback } from 'react';
import { RotateCcw, Mail, Lock, User, Check, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface FieldState {
  value: string;
  touched: boolean;
}

const initial: Record<'email' | 'password' | 'username', FieldState> = {
  email: { value: '', touched: false },
  password: { value: '', touched: false },
  username: { value: '', touched: false },
};

const validators: Record<string, (v: string) => string | null> = {
  email: (v) => (!v ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email' : null),
  password: (v) => (!v ? 'Password is required' : v.length < 8 ? 'Min 8 characters' : null),
  username: (v) => (!v ? 'Username is required' : v.length < 3 ? 'Min 3 characters' : !/^[a-zA-Z0-9]+$/.test(v) ? 'Letters and numbers only' : null),
};

const fields: { key: 'email' | 'password' | 'username'; label: string; icon: typeof Mail; placeholder: string; type?: string }[] = [
  { key: 'email', label: 'Email', icon: Mail, placeholder: 'you@design.com' },
  { key: 'password', label: 'Password', icon: Lock, placeholder: 'At least 8 characters', type: 'password' },
  { key: 'username', label: 'Username', icon: User, placeholder: 'Letters and numbers, min 3' },
];

const InlineValidationDemo = () => {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback((key: keyof typeof initial, value: string) => {
    setForm((prev) => ({ ...prev, [key]: { value, touched: prev[key].touched } }));
  }, []);

  const blur = useCallback((key: keyof typeof initial) => {
    setForm((prev) => ({ ...prev, [key]: { ...prev[key], touched: true } }));
  }, []);

  const reset = useCallback(() => {
    setForm(initial);
    setSubmitted(false);
  }, []);

  const errors: Record<string, string | null> = {};
  Object.keys(validators).forEach((k) => {
    errors[k] = validators[k](form[k as keyof typeof initial].value);
  });
  const allValid = Object.values(errors).every((e) => e === null);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-gray-400">Validation runs when you leave a field</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((f) => {
          const state = form[f.key];
          const err = validators[f.key](state.value);
          const showError = state.touched && err !== null;
          const valid = state.touched && err === null;
          const Icon = f.icon;
          return (
            <div key={f.key}>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">{f.label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={f.type || 'text'}
                  value={state.value}
                  onChange={(e) => update(f.key, e.target.value)}
                  onBlur={() => blur(f.key)}
                  placeholder={f.placeholder}
                  aria-invalid={showError}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg border-2 text-sm focus:outline-none transition-colors ${
                    showError ? 'border-red-400 focus:border-red-400' : valid ? 'border-teal-400 focus:border-teal-400' : 'border-gray-200 focus:border-teal-400'
                  }`}
                />
                {valid && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />}
                {showError && <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />}
              </div>
              {showError && <p className="text-xs text-red-500 mt-1">{err}</p>}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allValid}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Check className="w-3.5 h-3.5" /> Create Account
        </button>
        {submitted && allValid && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 animate-pmt-reveal">
            <Sparkles className="w-3.5 h-3.5" /> Account created successfully!
          </span>
        )}
        {!allValid && !submitted && (
          <span className="text-xs text-gray-400">Fix all fields to enable submit</span>
        )}
      </div>
    </div>
  );
};

export default InlineValidationDemo;

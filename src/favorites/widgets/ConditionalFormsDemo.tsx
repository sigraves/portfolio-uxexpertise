import { useState, useCallback } from 'react';
import { RotateCcw, User, Building2, Hash, MessageSquare, Check } from 'lucide-react';

type UserType = 'new' | 'existing' | '';
type Feedback = 'bug' | 'feature' | 'praise' | '';

interface FormState {
  userType: UserType;
  name: string;
  company: string;
  accountId: string;
  feedback: Feedback;
}

const initialState: FormState = {
  userType: '',
  name: '',
  company: '',
  accountId: '',
  feedback: '',
};

const ConditionalFormsDemo = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setSubmitted(false);
    },
    []
  );

  const reset = useCallback(() => {
    setForm(initialState);
    setSubmitted(false);
  }, []);

  const isComplete =
    form.userType === 'new'
      ? form.name.trim() && form.company.trim()
      : form.userType === 'existing'
        ? form.accountId.trim() && form.feedback
        : false;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">Fields adapt to your answer</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Question 1 */}
      <fieldset className="mb-5">
        <legend className="text-sm font-bold text-gray-800 mb-3">Are you a new or existing user?</legend>
        <div className="grid grid-cols-2 gap-3">
          <label
            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-sm"
            style={{ borderColor: form.userType === 'new' ? '#0d9488' : '#E5E7EB', background: form.userType === 'new' ? '#f0fdfa' : '#fff' }}
          >
            <input type="radio" name="userType" className="sr-only" checked={form.userType === 'new'} onChange={() => update('userType', 'new')} />
            <User className="w-6 h-6" style={{ color: form.userType === 'new' ? '#0d9488' : '#9ca3af' }} />
            <span className="text-sm font-bold text-gray-800">New User</span>
          </label>
          <label
            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-sm"
            style={{ borderColor: form.userType === 'existing' ? '#0d9488' : '#E5E7EB', background: form.userType === 'existing' ? '#f0fdfa' : '#fff' }}
          >
            <input type="radio" name="userType" className="sr-only" checked={form.userType === 'existing'} onChange={() => update('userType', 'existing')} />
            <Building2 className="w-6 h-6" style={{ color: form.userType === 'existing' ? '#0d9488' : '#9ca3af' }} />
            <span className="text-sm font-bold text-gray-800">Existing User</span>
          </label>
        </div>
      </fieldset>

      {/* Conditional fields */}
      {form.userType === 'new' && (
        <div className="space-y-4 animate-pmt-reveal">
          <Field label="Full Name" icon={User}>
            <input
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Your name"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-gray-200 text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </Field>
          <Field label="Company" icon={Building2}>
            <input
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="Where you work"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-gray-200 text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </Field>
        </div>
      )}

      {form.userType === 'existing' && (
        <div className="space-y-4 animate-pmt-reveal">
          <Field label="Account ID" icon={Hash}>
            <input
              value={form.accountId}
              onChange={(e) => update('accountId', e.target.value)}
              placeholder="e.g. ACC-10245"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-gray-200 text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </Field>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Feedback Type</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={form.feedback}
                onChange={(e) => update('feedback', e.target.value as Feedback)}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-gray-200 text-sm focus:outline-none focus:border-teal-400 transition-colors appearance-none bg-white"
              >
                <option value="">Select a type…</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="praise">Praise / Kudos</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      {form.userType && (
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => setSubmitted(true)}
            disabled={!isComplete}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Check className="w-3.5 h-3.5" /> Submit
          </button>
          {submitted && (
            <span className="text-xs font-bold text-teal-600 animate-pmt-reveal">Thanks — your response was recorded!</span>
          )}
          {!isComplete && !submitted && (
            <span className="text-xs text-gray-400">Fill in all fields to submit</span>
          )}
        </div>
      )}
    </div>
  );
};

const Field = ({ label, icon: Icon, children }: { label: string; icon: typeof User; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-bold text-gray-600 mb-1.5">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      {children}
    </div>
  </div>
);

export default ConditionalFormsDemo;

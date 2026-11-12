import { useState, useCallback } from 'react';
import { Check, RotateCcw } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  color: string;
  features: { label: string; included: boolean }[];
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0/mo',
    color: '#0ea5e9',
    features: [
      { label: 'Up to 3 projects', included: true },
      { label: 'Basic analytics', included: true },
      { label: 'Community support', included: true },
      { label: 'Custom branding', included: false },
      { label: 'Team collaboration', included: false },
      { label: 'Advanced security', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$29/mo',
    color: '#059669',
    features: [
      { label: 'Unlimited projects', included: true },
      { label: 'Advanced analytics', included: true },
      { label: 'Priority support', included: true },
      { label: 'Custom branding', included: true },
      { label: 'Team collaboration', included: true },
      { label: 'Advanced security', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99/mo',
    color: '#f97316',
    features: [
      { label: 'Unlimited projects', included: true },
      { label: 'Advanced analytics', included: true },
      { label: 'Dedicated support', included: true },
      { label: 'Custom branding', included: true },
      { label: 'Team collaboration', included: true },
      { label: 'Advanced security', included: true },
    ],
  },
];

const ComparisonCardsDemo = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const reset = useCallback(() => setSelected(new Set()), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          {selected.size > 0
            ? `${selected.size} plan${selected.size > 1 ? 's' : ''} selected for comparison`
            : 'Click cards to select and compare'}
        </p>
        {selected.size > 0 && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isSelected = selected.has(plan.id);
          return (
            <button
              key={plan.id}
              aria-pressed={isSelected}
              onClick={() => toggle(plan.id)}
              className="text-left rounded-2xl p-5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              style={{
                border: `2px solid ${isSelected ? plan.color : '#E5E7EB'}`,
                backgroundColor: isSelected ? `${plan.color}08` : '#FFFFFF',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isSelected ? `0 4px 14px ${plan.color}30` : 'none',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-black" style={{ color: plan.color }}>
                  {plan.name}
                </p>
                {isSelected && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: plan.color }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-2xl font-black text-gray-900 mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-2 text-xs">
                    {f.included ? (
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                    ) : (
                      <span className="w-4 h-4 flex-shrink-0 rounded-full border-2 border-gray-200" />
                    )}
                    <span className={f.included ? 'text-gray-700 font-medium' : 'text-gray-400'}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {selected.size >= 2 && (
        <div className="mt-4 rounded-xl p-4 bg-teal-50 border-2 border-teal-200 animate-pmt-reveal">
          <p className="text-sm font-bold text-teal-700 mb-1">Comparison Summary</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            {Array.from(selected).map((id) => plans.find((p) => p.id === id)!.name).join(' vs ')} \u2014
            {' '}
            {plans.find((p) => p.id === Array.from(selected)[0])!.features.length -
              plans.find((p) => p.id === Array.from(selected)[selected.size - 1])!.features.filter((f) => f.included).length > 0
              ? 'The higher tier includes more features.'
              : 'Both plans offer similar feature sets.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparisonCardsDemo;

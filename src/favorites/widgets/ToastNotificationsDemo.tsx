import { useState, useCallback, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X, RotateCcw } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

const config: Record<ToastType, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  success: { icon: CheckCircle2, color: '#059669', bg: '#ecfdf5', label: 'Success' },
  error: { icon: XCircle, color: '#dc2626', bg: '#fef2f2', label: 'Error' },
  warning: { icon: AlertTriangle, color: '#d97706', bg: '#fffbeb', label: 'Warning' },
  info: { icon: Info, color: '#0ea5e9', bg: '#f0f9ff', label: 'Info' },
};

const messages: Record<ToastType, string> = {
  success: 'Your changes were saved.',
  error: 'Something went wrong.',
  warning: 'Your session expires soon.',
  info: 'A new version is available.',
};

let counter = 0;

const ToastNotificationsDemo = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[id];
    }
  }, []);

  const push = useCallback(
    (type: ToastType) => {
      const id = ++counter;
      const toast: Toast = { id, type, message: messages[type] };
      // max 3 visible: drop oldest
      setToasts((prev) => [...prev, toast].slice(-3));
      timers.current[id] = setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const reset = useCallback(() => {
    Object.values(timers.current).forEach(clearTimeout);
    timers.current = {};
    setToasts([]);
  }, []);

  // cleanup on unmount
  useEffect(() => {
    const t = timers.current;
    return () => {
      Object.values(t).forEach(clearTimeout);
    };
  }, []);

  const types: ToastType[] = ['success', 'error', 'warning', 'info'];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-gray-400">Auto-dismiss after 4s · max 3</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {types.map((type) => {
          const c = config[type];
          const Icon = c.icon;
          return (
            <button
              key={type}
              onClick={() => push(type)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              style={{ borderColor: `${c.color}30`, background: c.bg }}
            >
              <Icon className="w-5 h-5" style={{ color: c.color }} />
              <span className="text-xs font-bold" style={{ color: c.color }}>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Toast stack */}
      <div className="mt-6 flex flex-col gap-2 items-end min-h-[40px]">
        {toasts.map((t) => {
          const c = config[t.type];
          const Icon = c.icon;
          return (
            <div
              key={t.id}
              className="w-full sm:w-72 flex items-center gap-3 px-4 py-3 rounded-xl border-2 shadow-md animate-pmt-reveal"
              style={{ borderColor: `${c.color}30`, background: c.bg }}
              role="status"
            >
              <Icon className="w-5 h-5 flex-shrink-0" style={{ color: c.color }} />
              <p className="text-sm font-bold text-gray-800 flex-1">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss toast"
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors flex-shrink-0"
              >
                <X className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>
          );
        })}
        {toasts.length === 0 && (
          <p className="text-xs text-gray-400 italic w-full text-right">No active notifications.</p>
        )}
      </div>
    </div>
  );
};

export default ToastNotificationsDemo;

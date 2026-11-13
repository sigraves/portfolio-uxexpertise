import { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCcw, AlertTriangle, FileText, X, Check } from 'lucide-react';

type ModalType = 'confirm' | 'form' | '';

const ModalDialogsDemo = () => {
  const [open, setOpen] = useState<ModalType>('');
  const [confirmResult, setConfirmResult] = useState<string | null>(null);
  const [formValue, setFormValue] = useState('');
  const [formResult, setFormResult] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => {
    setOpen('');
    setTimeout(() => triggerRef.current?.focus(), 30);
  }, []);

  const reset = useCallback(() => {
    setConfirmResult(null); setFormResult(null); setFormValue(''); setOpen('');
  }, []);

  // trap focus + escape + focus first element
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>('button, input, [tabindex]');
    focusable[0]?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
      if (e.key === 'Tab' && focusable.length > 0) {
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, closeModal]);

  const Btn = ({ onClick, variant, children, disabled }: { onClick: () => void; variant: 'ghost' | 'danger' | 'primary'; children: React.ReactNode; disabled?: boolean }) => {
    const styles = {
      ghost: 'text-gray-600 bg-gray-100 hover:bg-gray-200',
      danger: 'text-white bg-red-600 hover:bg-red-700',
      primary: 'text-white bg-sky-600 hover:bg-sky-700',
    }[variant];
    return (
      <button onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${styles}`}>
        {children}
      </button>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-gray-400">Esc or backdrop click closes · focus is trapped</p>
        <button onClick={reset} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button ref={triggerRef} onClick={() => setOpen('confirm')} className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-amber-200 bg-amber-50 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          <span className="text-sm font-bold text-amber-700">Confirmation</span>
          <span className="text-xs text-amber-600/70">Delete item dialog</span>
        </button>
        <button onClick={() => setOpen('form')} className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-sky-200 bg-sky-50 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
          <FileText className="w-6 h-6 text-sky-600" />
          <span className="text-sm font-bold text-sky-700">Form Dialog</span>
          <span className="text-xs text-sky-600/70">Create a project</span>
        </button>
      </div>

      <div className="mt-5 space-y-2">
        {confirmResult && (
          <p className="text-xs font-bold text-gray-700 animate-pmt-reveal">
            Confirmation: <span className={confirmResult === 'deleted' ? 'text-red-500' : 'text-teal-600'}>{confirmResult === 'deleted' ? 'Item deleted' : 'Cancelled'}</span>
          </p>
        )}
        {formResult && (
          <p className="text-xs font-bold text-teal-600 animate-pmt-reveal inline-flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Project "{formResult}" created
          </p>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-pmt-reveal" onClick={closeModal}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={open === 'confirm' ? 'Confirm deletion' : 'Create project'} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6 animate-pmt-reveal">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${open === 'confirm' ? 'bg-red-100' : 'bg-sky-100'}`}>
                  {open === 'confirm' ? <AlertTriangle className="w-5 h-5 text-red-600" /> : <FileText className="w-5 h-5 text-sky-600" />}
                </div>
                <h3 className="text-base font-black text-gray-900">{open === 'confirm' ? 'Delete this item?' : 'Create a Project'}</h3>
              </div>
              <button onClick={closeModal} aria-label="Close" className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {open === 'confirm' ? (
              <>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">This action cannot be undone. The item and all its contents will be permanently removed.</p>
                <div className="flex gap-2 justify-end">
                  <Btn onClick={closeModal} variant="ghost">Cancel</Btn>
                  <Btn onClick={() => { setConfirmResult('deleted'); closeModal(); }} variant="danger">Delete</Btn>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">Give your new project a name.</p>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Project name" className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 text-sm focus:outline-none focus:border-sky-400 transition-colors mb-5" />
                <div className="flex gap-2 justify-end">
                  <Btn onClick={closeModal} variant="ghost">Cancel</Btn>
                  <Btn onClick={() => { if (formValue.trim()) { setFormResult(formValue.trim()); setFormValue(''); closeModal(); } }} variant="primary" disabled={!formValue.trim()}>Create</Btn>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalDialogsDemo;

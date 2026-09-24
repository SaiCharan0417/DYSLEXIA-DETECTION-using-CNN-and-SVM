import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, WarningTriangle, InfoCircle, Xmark } from 'iconoir-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, transform: "translateY(12px) scale(0.95)" }}
              animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
              exit={{ opacity: 0, transform: "translateY(8px) scale(0.95)" }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className={`pointer-events-auto p-4 rounded-xl shadow-lg border flex items-center justify-between gap-3 text-sm font-body ${
                toast.type === 'success'
                  ? 'bg-surface-container-lowest text-on-surface border-secondary/40 shadow-secondary/10'
                  : toast.type === 'error'
                  ? 'bg-surface-container-lowest text-on-surface border-error/40 shadow-error/10'
                  : 'bg-surface-container-lowest text-on-surface border-outline-variant/40'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {toast.type === 'success' && <CheckCircle size={18} className="text-secondary shrink-0" />}
                {toast.type === 'error' && <WarningTriangle size={18} className="text-error shrink-0" />}
                {toast.type === 'info' && <InfoCircle size={18} className="text-secondary shrink-0" />}
                <span className="text-xs font-medium leading-relaxed truncate">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-md transition-colors cursor-pointer"
              >
                <Xmark size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return { addToast: () => {} };
  }
  return context;
};

'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './Icon';

type ToastFn = (message: string) => void;
const ToastContext = createContext<ToastFn>(() => {});

/** `const toast = useToast(); toast('Saved')` — one live-region toast at the bottom of the page. */
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const toast = useCallback<ToastFn>((m) => {
    setMessage(m);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2600);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={`toast${visible ? ' is-visible' : ''}`} id="toast" role="status" aria-live="polite">
        <Icon name="check" />
        <span id="toast-text">{message}</span>
      </div>
    </ToastContext.Provider>
  );
}

'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

interface DropdownProps {
  /** Content of the trigger button. */
  trigger: ReactNode;
  children: ReactNode;
  /** Class for the trigger button (e.g. "dd-trigger", "search-cat", "nav-link"). */
  triggerClassName?: string;
  /** Open the panel towards the inline end (right in LTR, left in RTL). */
  alignEnd?: boolean;
  triggerLabel?: string;
  role?: 'listbox' | 'menu';
  className?: string;
}

/**
 * Click-to-open menu. Closes on outside click, Escape, or after any item inside is activated.
 * Items are plain buttons/links passed as children.
 */
export function Dropdown({
  trigger, children, triggerClassName = 'dd-trigger', alignEnd, triggerLabel, role, className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={`dd${open ? ' is-open' : ''}${className ? ` ${className}` : ''}`}>
      <button
        type="button"
        className={triggerClassName}
        aria-haspopup={role ?? 'true'}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={triggerLabel}
        onClick={() => setOpen((o) => !o)}
      >
        {trigger}
      </button>
      <div
        id={panelId}
        className={`dd-panel${alignEnd ? ' dd-panel--right' : ''}`}
        role={role}
        onClick={(e) => {
          // Close after choosing an item (buttons or links), not when clicking panel padding.
          if ((e.target as HTMLElement).closest('button, a')) setOpen(false);
        }}
      >
        {children}
      </div>
    </div>
  );
}

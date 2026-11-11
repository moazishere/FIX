'use client';

import type { ReactNode } from 'react';
import { useToast } from './Toast';

/** A control for a page/feature that doesn't exist yet: shows a short note instead of a dead `#` link. */
export function NoteLink({
  note, className, children, ariaLabel,
}: { note: string; className?: string; children: ReactNode; ariaLabel?: string }) {
  const toast = useToast();
  return (
    <button type="button" className={className} aria-label={ariaLabel} onClick={() => toast(note)}>
      {children}
    </button>
  );
}

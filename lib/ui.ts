'use client';

import { create } from 'zustand';

export type SheetView = 'cart' | 'saved';

/** Transient interface state (never persisted). */
interface UiState {
  sheetOpen: boolean;
  sheetView: SheetView;
  drawerOpen: boolean;
  openSheet: (view: SheetView) => void;
  closeSheet: () => void;
  setSheetView: (view: SheetView) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useUi = create<UiState>()((set) => ({
  sheetOpen: false,
  sheetView: 'cart',
  drawerOpen: false,
  openSheet: (sheetView) => set({ sheetOpen: true, sheetView }),
  closeSheet: () => set({ sheetOpen: false }),
  setSheetView: (sheetView) => set({ sheetView }),
  openDrawer: () => set({ drawerOpen: true }),
  closeDrawer: () => set({ drawerOpen: false }),
}));

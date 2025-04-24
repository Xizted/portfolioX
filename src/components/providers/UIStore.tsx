'use client';

import { createUIStore, UIState } from '@/store/useUI';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type UIStoreApi = ReturnType<typeof createUIStore>;

export const UIStoreContext = createContext<UIStoreApi>({} as UIStoreApi);

export interface UIStoreProviderProps {
  children: React.ReactNode;
}

export const UIStoreProvider = ({ children }: UIStoreProviderProps) => {
  const storeRef = useRef<UIStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createUIStore();
  }

  return (
    <UIStoreContext.Provider value={storeRef.current}>
      {children}
    </UIStoreContext.Provider>
  );
};

export const useUIStore = <T,>(selector: (store: UIState) => T) => {
  const uIStoreContext = useContext(UIStoreContext);

  if (!uIStoreContext) {
    throw new Error('useUIStore must be used within a UIStoreProvider');
  }

  return useStore(uIStoreContext, selector);
};

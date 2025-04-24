import { createStore } from 'zustand/vanilla';

export interface SidebarState {
  isOpen: boolean;
}

export interface SidebarActions {
  toggleSidebar: () => void;
}

export type SidebarStore = SidebarState & SidebarActions;

export interface UIState {
  sidebar: SidebarStore;
}

export const defaultSidebarState: SidebarStore = {
  isOpen: false,
  toggleSidebar: () => {
    defaultSidebarState.isOpen = !defaultSidebarState.isOpen;
  },
};

export const defaultInitState: UIState = {
  sidebar: defaultSidebarState,
};

export const createUIStore = (initState = defaultInitState) =>
  createStore<UIState>((set) => ({
    ...initState,
    sidebar: {
      ...initState.sidebar,
      toggleSidebar: () => {
        set((state) => ({
          sidebar: {
            ...state.sidebar,
            isOpen: !state.sidebar.isOpen,
          },
        }));
      },
    },
  }));

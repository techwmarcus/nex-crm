import { create } from 'zustand';
import { User } from '../types';
import { mockUser } from '../services/mockData';

type AppState = {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  login: () => void;
  logout: () => void;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: mockUser, // Auto-login for prototype
  isAuthenticated: true, 
  theme: 'light',
  sidebarOpen: true,
  login: () => set({ user: mockUser, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

import { create } from 'zustand';
import { User } from '../types';
import { mockUser } from '../services/mockData';

type AppState = {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  login: (user: User, token?: string | null) => void;
  logout: () => void;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: mockUser, // Auto-login for prototype
  isAuthenticated: true,
  accessToken: null,
  theme: 'light',
  sidebarOpen: true,
  login: (user, token) => set({ user, isAuthenticated: true, accessToken: token }),
  logout: () => set({ user: null, isAuthenticated: false, accessToken: null }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

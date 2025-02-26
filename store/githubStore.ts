import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GitHubStore {
  token: string | null;
  gistId: string | null;
  setToken: (token: string) => void;
  setGistId: (id: string) => void;
  clearGitHubData: () => void;
}

export const useGitHubStore = create(
  persist<GitHubStore>(
    (set) => ({
      token: null,
      gistId: null,
      setToken: (token) => set({ token }),
      setGistId: (id) => set({ gistId: id }),
      clearGitHubData: () => set({ token: null, gistId: null }),
    }),
    {
      name: 'github-auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);


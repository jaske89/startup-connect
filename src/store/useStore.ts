import { create } from 'zustand';
import type { Startup, User, Contribution } from '../types';

interface Store {
  startups: Startup[];
  users: User[];
  contributions: Contribution[];
  addStartup: (startup: Startup) => void;
  addContribution: (contribution: Contribution) => void;
  updateContributionStatus: (id: string, status: 'accepted' | 'rejected') => void;
}

export const useStore = create<Store>((set) => ({
  startups: [],
  users: [],
  contributions: [],
  addStartup: (startup) =>
    set((state) => ({ startups: [...state.startups, startup] })),
  addContribution: (contribution) =>
    set((state) => ({ contributions: [...state.contributions, contribution] })),
  updateContributionStatus: (id, status) =>
    set((state) => ({
      contributions: state.contributions.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
      users: state.users.map((user) => {
        if (user.contributions.some((c) => c.id === id && status === 'accepted')) {
          return { ...user, tokens: user.tokens + 1 };
        }
        return user;
      }),
    })),
}));
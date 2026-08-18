import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        setCredentials: (user, token) => {
          if (token) localStorage.setItem('token', token);
          set({ user, token, isAuthenticated: true });
        },
        logout: () => {
          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthenticated: false });
        },
        updateUser: (updatedFields) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...updatedFields } : null,
          })),
      }),
      { name: 'auth-storage' }
    ),
    { name: 'AuthStore' }
  )
);
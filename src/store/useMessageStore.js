import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useMessageStore = create(
  devtools(
    persist(
      (set) => ({
        activeMessage: null,
        supportInfo: null,

        setActiveMessage: (message) => set({ activeMessage: message }),
        setSupportInfo: (info) => set({ supportInfo: info }),
        clearActiveMessage: () => set({ activeMessage: null }),
      }),
      { name: 'message-storage' }
    ),
    { name: 'MessageStore' }
  )
);
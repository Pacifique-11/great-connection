import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useSubscriptionStore = create(
  devtools(
    persist(
      (set) => ({
        subscribedEmail: null,
        setSubscribedEmail: (email) => set({ subscribedEmail: email }),
        clearSubscription: () => set({ subscribedEmail: null }),
      }),
      { name: 'subscription-storage' }
    ),
    { name: 'SubscriptionStore' }
  )
);
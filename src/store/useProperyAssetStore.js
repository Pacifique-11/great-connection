import { create } from 'zustand';

export const useStore = create((set, get) => ({
  properties: [],
  assets: [],
  searchResults: null,
  query: '',
  isLoading: false,

  // Set search query and trigger fetch automatically
  setQuery: async (query) => {
    set({ query });
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      set({ searchResults: null, isLoading: false });
      return;
    }

    set({ isLoading: true });
    try {
      const res = await fetch(`https://greatconnectionltd.onrender.com/api/search?q=${encodeURIComponent(trimmedQuery)}`);
      const data = await res.json();
      set({ searchResults: data, isLoading: false });
    } catch (error) {
      console.error('Search error:', error);
      set({ searchResults: [], isLoading: false });
    }
  },

  // Fetch initial default data
  fetchInitialData: async () => {
    set({ isLoading: true });
    try {
      const [propRes, assetRes] = await Promise.all([
        fetch('https://greatconnectionltd.onrender.com/api/properties').catch(() => null),
        fetch('https://greatconnectionltd.onrender.com/api/assets').catch(() => null)
      ]);

      let properties = [];
      let assets = [];

      if (propRes && propRes.ok) {
        const propData = await propRes.json();
        properties = Array.isArray(propData) ? propData : propData.properties || propData.data || [];
      }

      if (assetRes && assetRes.ok) {
        const assetData = await assetRes.json();
        assets = Array.isArray(assetData) ? assetData : assetData.assets || assetData.data || [];
      }

      set({ properties, assets, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch initial home data:', error);
      set({ isLoading: false });
    }
  },
}));
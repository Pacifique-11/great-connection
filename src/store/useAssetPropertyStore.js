import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useAssetPropertyStore = create(
  devtools(
    persist(
      (set) => ({
        activeCategory: 'properties',
        filterParams: {
          search: '',
          status: '',
          type: '',
          minPrice: '',
          maxPrice: '',
          location: '',
          sortBy: 'createdAt:desc',
        },
        selectedItem: null,

        setActiveCategory: (category) => set({ activeCategory: category }),
        setFilterParams: (newParams) =>
          set((state) => ({
            filterParams: { ...state.filterParams, ...newParams },
          })),
        resetFilters: () =>
          set({
            filterParams: {
              search: '',
              status: '',
              type: '',
              minPrice: '',
              maxPrice: '',
              location: '',
              sortBy: 'createdAt:desc',
            },
          }),
        setSelectedItem: (item) => set({ selectedItem: item }),
      }),
      { name: 'asset-property-storage' }
    ),
    { name: 'AssetPropertyStore' }
  )
);
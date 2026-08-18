import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '../services/axiosClient';

// ==========================================
// 1. CLOTHES HOOKS
// ==========================================
export const useClothes = () => {
  return useQuery({
    queryKey: ['clothes'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/clothes');
      return data;
    },
  });
};

export const useCreateClothes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosClient.post('/clothes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clothes'] }),
  });
};

// ==========================================
// 2. LANDS HOOKS
// ==========================================
export const useLands = () => {
  return useQuery({
    queryKey: ['lands'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/lands');
      return data;
    },
  });
};

export const useCreateLand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosClient.post('/lands', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lands'] }),
  });
};

// ==========================================
// 3. DASHBOARD STATS HOOKS
// ==========================================
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/dashboard-stats');
            return data;
    },
  });
};

// ==========================================
// 4. REQUEST PROPERTY & SUPPLY PROPERTY HOOKS
// ==========================================
export const useRequestProperties = () => {
  return useQuery({
    queryKey: ['requestProperties'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/requests');
      return data;
    },
  });
};

export const useSupplyProperties = () => {
  return useQuery({
    queryKey: ['supplyProperties'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/supplies');
      return data;
    },
  });
};

export const useApproveSupply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosClient.put(`/supplies/${id}/approve`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['supplyProperties'] }),
  });
};

// ==========================================
// 5. SUBSCRIPTION HOOKS
// ==========================================
export const useSubscribe = () => {
  return useMutation({
    mutationFn: async (emailData) => {
      const { data } = await axiosClient.post('/subscribe', emailData);
      return data;
    },
  });
};

export const useDeleteSubscription = () => {
  return useMutation({
    mutationFn: async (emailData) => {
      const { data } = await axiosClient.delete('/deleteSubscribe', { data: emailData });
      
      return data;
    },
  });
};

// ==========================================
// 6. SUPPORT & FAQ HOOKS
// ==========================================
export const useFAQs = () => {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/faqs');
      return data;
    },
  });
};

export const useAddFAQ = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (faqData) => {
      const { data } = await axiosClient.post('/faqs', faqData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faqs'] }),
  });
};

// ==========================================
// 7. SETTINGS HOOKS
// ==========================================
export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/settings');
      return data;
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settingsData) => {
      const { data } = await axiosClient.put('/settings', settingsData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  });
};

// ==========================================
// 8. GLOBAL SEARCH HOOKS
// ==========================================
export const useGlobalSearch = (searchQuery) => {
  return useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      const { data } = await axiosClient.get('/search', { params: { q: searchQuery } });
      return data;
    },
    enabled: Boolean(searchQuery && searchQuery.trim().length > 0),
  });
};
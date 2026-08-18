import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '../services/axiosClient';
import { useAuthStore } from '../store/useAuthStore';

// ==========================================
// 1. PROPERTIES & ASSETS HOOKS
// ==========================================
export const useProperties = (filters) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      const { data } = await axiosClient.get('/get-properties', { params: filters });
      return data;
    },
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosClient.post('/create-property', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['properties'] }),
  });
};

// ==========================================
// 2. MOTORS HOOKS
// ==========================================
export const useMotors = (params) => {
  return useQuery({
    queryKey: ['motors', params],
    queryFn: async () => {
      const { data } = await axiosClient.get('/motors', { params });
      return data;
    },
  });
};

export const useCreateMotor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (motorData) => {
      const { data } = await axiosClient.post('/motors', motorData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['motors'] }),
  });
};

// ==========================================
// 3. CLOTHES & LANDS HOOKS
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

export const useLands = () => {
  return useQuery({
    queryKey: ['lands'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/lands');
      return data;
    },
  });
};

// ==========================================
// 4. AUTH MUTATIONS & USER HOOKS
// ==========================================
export const useLogin = () => {
  const { setCredentials } = useAuthStore();
  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await axiosClient.post('/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      if (data?.user) {
        setCredentials(data.user, data.token);
      }
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axiosClient.post('/signup', userData);
      return data;
    },
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/profile');
      return data;
    },
  });
};

// ==========================================
// 5. MESSAGES & CONTACT HOOKS
// ==========================================
export const useMessages = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/messages');
      return data;
    },
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: async (messageData) => {
      const { data } = await axiosClient.post('/create-message', messageData);
      return data;
    },
  });
};

// ==========================================
// 6. DASHBOARD, SUBSCRIPTIONS & SEARCH
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

export const useSubscribe = () => {
  return useMutation({
    mutationFn: async (emailData) => {
      const { data } = await axiosClient.post('/subscribe', emailData);
      return data;
    },
  });
};

export const useGlobalSearch = (query) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const { data } = await axiosClient.get('/search', { params: { q: query } });
      return data;
    },
    enabled: Boolean(query && query.trim().length > 0),
  });
};
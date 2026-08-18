import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '../services/assetService';
import { userService } from '../services/userService';
import { contactMessageService } from '../services/contactMessageService';

// --- MOTORS HOOKS ---
export const useMotors = (params) => useQuery({
  queryKey: ['motors', params],
  queryFn: () => assetService.motors.getAll(params),
});

export const useCreateMotor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => assetService.motors.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['motors'] }),
  });
};

// --- USER PROFILE HOOKS ---
export const useUserProfile = () => useQuery({
  queryKey: ['userProfile'],
  queryFn: () => userService.getProfile(),
});

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => userService.updateProfile(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['userProfile'] }),
  });
};

// --- MESSAGING & CONTACT HOOKS ---
export const useMessages = () => useQuery({
  queryKey: ['messages'],
  queryFn: () => contactMessageService.getAllMessages(),
});

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (data) => contactMessageService.createMessage(data),
  });
};
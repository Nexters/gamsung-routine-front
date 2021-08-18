import api from '~/utils/api';
import { useCommonSWR } from '~/utils/swr';

export const useUserData = (userId: string): any => {
  return useCommonSWR(`/v1/user/${userId}`);
};

export const patchPushNotification = async () => {
  return await api.patch('/v1/auth/push-notification');
};

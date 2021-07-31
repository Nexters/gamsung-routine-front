import { useCommonSWR } from '~/utils/swr';

export const useUserData = (userId: string): any => {
  return useCommonSWR(`/v1/user/${userId}`);
};

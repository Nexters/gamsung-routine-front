import { SWR, useCommonSWR } from '~/utils/swr';

export const useUserData = (userId: string): SWR<any> => {
  return useCommonSWR(`user/${userId}`);
};

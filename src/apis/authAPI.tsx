import { useCommonSWR } from '~/utils/swr';

export const useUserProfileData = () => {
  return useCommonSWR<{
    data: {
      id: string;
      name: string;
      profileImageUrl: string;
    };
  }>('/profile');
};

import { useHeaderSWR } from '~/utils/swr';

export const useUserProfileData = () => {
  return useHeaderSWR<{
    data: {
      id: string;
      name: string;
      profileImageUrl: string;
    };
  }>('/v1/profile');
};

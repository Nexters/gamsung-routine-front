import { useHeaderSWR } from '~/utils/swr';

export const useUserProfileData = () => {
  return useHeaderSWR<{
    id: string;
    name: string;
    profileImageUrl: string;
    pushNotification: boolean;
    thumbnailImageUrl: string;
  }>('/v1/profile');
};

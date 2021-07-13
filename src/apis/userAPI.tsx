import useSWR from 'swr';

import api from '~/utils/api';

export const useUserData = (userId: string) => {
  const getUserData = useSWR(['getUserData', userId], (_, userId) =>
    api
      .get(`user/${userId}`)
      .then((res) => res.data)
      .catch((error) => console.warn(error)),
  );

  return { getUserData };
};

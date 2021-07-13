import useSWR, { SWRResponse } from 'swr';

import api from './api';

export interface SWR<T> extends SWRResponse<T, string | Error> {
  data?: T;
  error?: string;
}

const fetcher = (url: string) => {
  return api
    .get(url)
    .then((res) => res.data)
    .catch((error) => console.warn(error));
};

// const postFetcher = (url: string) => {
//   return api
//     .post(url)
//     .then((res) => res.data)
//     .catch((error) => console.warn(error));
// };

export const useCommonSWR = (url: string | null) => {
  return useSWR(url, fetcher);
};

import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import API from './api';

function fetcher<T>(url: string): Promise<any> {
  return API.get<AxiosResponse<T>>(url, {}, {}).then((res) => {
    return res;
  });
  // .catch((error) => console.log('error', error));
}

export function useCommonSWR<T>(url: string | null) {
  return useSWR<T>(url, fetcher);
}

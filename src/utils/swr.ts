import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import API from './api';

function fetcher<T>(url: string): Promise<any> {
  return API.get<AxiosResponse<T>>(url, {}, {}).then((res) => {
    return res;
  });
}
function headerFetcher<T>(url: string): Promise<any> {
  return API.get<AxiosResponse<T>>(url).then((res) => {
    if (res.data) {
      return res.data;
    }
    return res;
  });
}

export function useCommonSWR<T>(url: string | null) {
  return useSWR<T>(url, fetcher);
}

export function useHeaderSWR<T>(url: string | null) {
  return useSWR<T>(url, headerFetcher);
}

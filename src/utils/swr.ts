import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import API from './api';

function fetcher<T>(url: string): Promise<any> {
  return API.get<AxiosResponse<T>>(url, {}, {}).then((res) => {
    if (res.data) {
      return res.data;
    }
    return res;
  });
}
function headerFetcher<T>(url: string): Promise<any> {
  return API.get<AxiosResponse<T>>(url).then((res) => {
    if (res.data || (res.data as any) === false) {
      return res.data;
    }
    return res;
  });
}
function headerPatchFetcher<T>(url: string): Promise<any> {
  return API.patch<AxiosResponse<T>>(url).then((res) => {
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

export function useHeaderPatchSWR<T>(url: string | null) {
  return useSWR<T>(url, headerPatchFetcher);
}

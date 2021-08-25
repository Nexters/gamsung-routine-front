import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import API from './api';

import IndicatorStore from '~/stores/IndicatorStore';

function fetcher<T>(url: string): Promise<any> {
  IndicatorStore.up();
  return API.get<AxiosResponse<T>>(url, {}, {})
    .then((res) => {
      if (res.data) {
        return res.data;
      }
      return res;
    })
    .finally(() => {
      IndicatorStore.down();
    });
}
function headerFetcher<T>(url: string): Promise<any> {
  IndicatorStore.up();
  return API.get<AxiosResponse<T>>(url)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
      return res;
    })
    .finally(() => {
      IndicatorStore.down();
    });
}

export function useCommonSWR<T>(url: string | null) {
  return useSWR<T>(url, fetcher);
}

export function useHeaderSWR<T>(url: string | null) {
  return useSWR<T>(url, headerFetcher);
}

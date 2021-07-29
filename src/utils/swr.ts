import useSWR from 'swr';

import API from './api';

function fetcher<T>(url: string) {
  return API.get<T>(url).then((res) => res.data);
}

export function useCommonSWR<T>(url: string | null) {
  return useSWR<T>(url, fetcher);
}

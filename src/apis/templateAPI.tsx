import { SWRResponse } from 'swr';

import { Category } from '~/models/Category';
import { Template } from '~/models/Template';
import { useCommonSWR } from '~/utils/swr';

export const useGetCategory = (): SWRResponse<Category[], any> => {
  return useCommonSWR(`/v1/category`);
};
export const useTemplates = (categoryId: number): SWRResponse<Template[], any> => {
  const url = categoryId ? `/v1/category/${categoryId}/template` : null;
  return useCommonSWR(url);
};

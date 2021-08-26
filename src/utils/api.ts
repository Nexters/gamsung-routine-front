import axios, { AxiosError, AxiosResponse } from 'axios';

import AuthStore from '~/stores/AuthStore';
import IndicatorStore from '~/stores/IndicatorStore';

export type APIMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const getCommonHeaders = async () => {
  const token = AuthStore.token;

  if (token == null) {
    return undefined;
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

// TODO : data, opt type 지정
class API {
  // XXX : _ prefix를 계속 사용할지 고민
  private static _instance: API;
  private static HOSTNAME = 'https://gamsung-routine.herokuapp.com';
  private static PREFIX = '/api';

  axiosInstance = axios.create();

  private async request<T>(method: APIMethod, url: string, data: any, opt: any): Promise<T> {
    IndicatorStore.up();
    return this.axiosInstance({
      url: API.HOSTNAME + API.PREFIX + url,
      method,
      headers: opt.headers,
      data: method !== 'GET' ? data : undefined,
      params: method === 'GET' ? data : undefined,
      timeout: opt.timeout || 10 * 1000,
      responseType: 'json',
    })
      .then(async (result: AxiosResponse<any>) => {
        if (result) {
          const data: T = result.data;

          return Promise.resolve(data);
        }
        // 성공에 걸리지 못하면 실패
        return Promise.reject('결과가 올바르지 않습니다.');
      })
      .catch(async (result: AxiosError<any> | string) => {
        if (typeof result === 'string') {
          return Promise.reject(result);
        }
        const data = result && result.response ? result.response.data : null;
        return Promise.reject(data ? data.statusMessage || data.message || data.error || data.errorMessage : null);
      })
      .finally(() => {
        IndicatorStore.down();
      });
  }

  public async get<T = any>(url: string, data?: any, config?: any) {
    return this.request<T>(
      'GET',
      url,
      data,
      config || {
        params: data,
        headers: await getCommonHeaders(),
      },
    );
  }

  public async post<T = any>(url: string, data?: any, config?: any) {
    return this.request<T>(
      'POST',
      url,
      data,
      config || {
        headers: await getCommonHeaders(),
      },
    );
  }

  public async patch<T = any>(url: string, data?: any, config?: any) {
    return this.request<T>(
      'PATCH',
      url,
      data,
      config || {
        headers: await getCommonHeaders(),
      },
    );
  }

  public async put<T = any>(url: string, data?: any, config?: any) {
    return this.request<T>(
      'PUT',
      url,
      data,
      config || {
        headers: await getCommonHeaders(),
      },
    );
  }

  public async delete<T = any>(url: string, data?: any, config?: any) {
    return this.request<T>(
      'DELETE',
      url,
      data,
      config || {
        params: data,
        headers: await getCommonHeaders(),
      },
    );
  }

  public static notSupported(): never {
    throw new Error('지원하지 않는 기능입니다');
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new API();
    }
    return this._instance;
  }
}

export default API.instance();

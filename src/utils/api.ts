import axios from 'axios';

import AuthStore from '~/stores/AuthStore';

const getCommonHeaders = async () => {
  const token = AuthStore.token;

  if (token == null) {
    return undefined;
  }

  return {
    Authorization: `Bearer ${JSON.parse(token)}`,
  };
};

// TODO : data, opt type 지정
class API {
  // XXX : _ prefix를 계속 사용할지 고민
  private static _instance: API;
  call = axios.create({
    baseURL: 'https://gamsung-routine.herokuapp.com/api/v1',
  });

  public async get<T = any>(url: string, data?: any, config?: any) {
    return this.call.get<T>(
      url,
      config
        ? { ...config, params: data }
        : {
            params: data,
            headers: await getCommonHeaders(),
          },
    );
  }

  public async post<T = any>(url: string, data?: any, config?: any) {
    return this.call.post<T>(
      url,
      data,
      config || {
        headers: await getCommonHeaders(),
      },
    );
  }

  public async put<T = any>(url: string, data?: any, config?: any) {
    return this.call.put<T>(
      url,
      data,
      config || {
        headers: await getCommonHeaders(),
      },
    );
  }

  public async delete<T = any>(url: string, data?: any, config?: any) {
    return this.call.delete<T>(
      url,
      config
        ? { ...config, params: data }
        : {
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

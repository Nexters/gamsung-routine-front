import axios from 'axios';

// TODO : data, opt type 지정
class API {
  // XXX : _ prefix를 계속 사용할지 고민
  private static _instance: API;
  call = axios.create({
    baseURL: '',
  });

  public async get<T = any>(url: string, data?: any, opt?: any): Promise<T> {
    // TODO : date 값을 쿼리스트링으로 만들기
    return this.call.post(url, opt);
  }

  public async post<T = any>(url: string, data?: any, opt?: any): Promise<T> {
    return this.call.post(url, data, opt);
  }

  public async put<T = any>(url: string, data?: any, opt?: any): Promise<T> {
    return this.call.put(url, data, opt);
  }

  public async delete<T = any>(url: string, opt?: any): Promise<T> {
    return this.call.delete(url, opt);
  }

  public static notSupported(): any {
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

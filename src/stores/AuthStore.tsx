import { observable, action, makeObservable } from 'mobx';

class AuthStore {
  // XXX : _ prefix를 계속 사용할지 고민
  private static _instance: AuthStore;

  constructor() {
    makeObservable(this, {
      token: observable,
      login: action,
    });
  }

  token?: string = undefined;

  login = (token: string) => {
    this.token = token;
  };

  public static instance() {
    if (!this._instance) {
      this._instance = new AuthStore();
    }
    return this._instance;
  }
}

export default AuthStore.instance();

import { observable, action, makeObservable } from 'mobx';

class AuthStore {
  private static _instance: AuthStore;
  constructor() {
    makeObservable(this, {
      token: observable,
      login: action,
    });
  }

  token: string | null = null;

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

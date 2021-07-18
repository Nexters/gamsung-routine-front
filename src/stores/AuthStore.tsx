import { observable, action, makeObservable } from 'mobx';

import { User } from '~/models/User';

class AuthStore {
  // XXX : _ prefix를 계속 사용할지 고민
  private static _instance: AuthStore;

  constructor() {
    makeObservable(this, {
      token: observable,
      nickname: observable,
      profileImageUrl: observable,
      login: action,
    });
  }

  token?: string = undefined;
  nickname?: string = undefined;
  profileImageUrl?: string = undefined;

  login = (user: User) => {
    this.token = user.token;
    this.nickname = user.nickname;
    this.profileImageUrl = user.profileImageUrl;
  };

  public static instance() {
    if (!this._instance) {
      this._instance = new AuthStore();
    }
    return this._instance;
  }
}

export default AuthStore.instance();

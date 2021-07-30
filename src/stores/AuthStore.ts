import AsyncStorage from '@react-native-community/async-storage';
import { observable, action, makeObservable, computed } from 'mobx';

import { User } from '~/models/User';

class AuthStore {
  // XXX : _ prefix를 계속 사용할지 고민
  private static _instance: AuthStore;

  constructor() {
    makeObservable(this, {
      token: observable,
      nickname: observable,
      profileImageUrl: observable,
      isLoggedIn: computed,
      login: action,
    });
  }

  token?: string = undefined;
  nickname?: string = undefined;
  profileImageUrl?: string = undefined;

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  login = (user: User) => {
    this.token = user.token;
    this.nickname = user.nickname;
    this.profileImageUrl = user.profileImageUrl;
    try {
      AsyncStorage.setItem('token', this.token);
    } catch (error) {
      console.error(error);
    }
  };

  public static instance() {
    if (!this._instance) {
      this._instance = new AuthStore();
    }
    return this._instance;
  }
}

export default AuthStore.instance();

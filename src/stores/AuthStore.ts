import AsyncStorage from '@react-native-community/async-storage';
import { KakaoOAuthToken } from '@react-native-seoul/kakao-login';
import { observable, action, makeObservable, computed } from 'mobx';

import api from '~/utils/api';

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

  login = async (token: KakaoOAuthToken) => {
    const {
      data: {
        data: { accessToken },
      },
    } = await api.post<{
      data: {
        accessToken: string;
      };
    }>('/auth/sign-in/kakao', {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });

    this.token = accessToken;

    await AsyncStorage.setItem('token', accessToken);
    await this.updateProfile();
  };

  private updateProfile = async () => {
    const {
      data: {
        data: { name, profileImageUrl },
      },
    } = await api.get('/profile');

    this.nickname = name;
    this.profileImageUrl = profileImageUrl;
  };

  public static instance() {
    if (!this._instance) {
      this._instance = new AuthStore();
    }
    return this._instance;
  }
}

export default AuthStore.instance();

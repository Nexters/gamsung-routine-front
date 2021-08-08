import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { login } from '@react-native-seoul/kakao-login';
import { observable, action, makeObservable, computed } from 'mobx';

import api from '~/utils/api';

class AuthStore {
  // XXX : _ prefix를 계속 사용할지 고민
  private static _instance: AuthStore;

  token?: string = '';

  constructor() {
    makeObservable(this, {
      token: observable,
      isLoggedIn: computed,
      checkLogin: action,
      login: action,
      logout: action,
    });
  }

  get isLoggedIn() {
    return !!this.token;
  }

  async checkLogin() {
    this.token = this.token || (await AsyncStorage.getItem('token')) || '';
  }

  login = async () => {
    try {
      const token = await login();

      const fcmToken = await messaging().getToken();
      try {
        const {
          data: { accessToken },
        } = await api.post<{
          data: {
            accessToken: string;
          };
        }>(
          '/v1/auth/sign-in/kakao',
          {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            pushToken: fcmToken,
          },
          {},
        );
        this.token = accessToken;
      } catch (error) {
        console.log('error', error);
      }

      AsyncStorage.setItem('token', this.token || '');
    } catch (error) {
      // TODO: 토스트 표시
      console.error(error);
    }
  };

  logout = async () => {
    try {
      await AsyncStorage.clear();
      this.token = '';
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

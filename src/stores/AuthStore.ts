import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { login } from '@react-native-seoul/kakao-login';
import { observable, action, makeObservable, computed } from 'mobx';

import api from '~/utils/api';
import { showToast } from '~/utils/showToast';

class AuthStore {
  // XXX : _ prefix를 계속 사용할지 고민
  private static _instance: AuthStore;

  token?: string = '';
  // 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJLQUtBTyAxODExNzg1NzYyIiwiaWF0IjoxNjI4ODY5NjQ1LCJleHAiOjE3MTUxODMyNDV9.JH-6odNnUuBMb9muUpIqqeMicKoLNWrTFjfOxMKsNsTDsOklgch5aq-S5mvcMb0f';

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
      console.error(error);
      showToast('로그인에 실패했습니다.');
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

import AsyncStorage from '@react-native-community/async-storage';
import { login } from '@react-native-seoul/kakao-login';
import { observable, action, makeObservable, computed } from 'mobx';

import api from '~/utils/api';
import messaging from "@react-native-firebase/messaging";

class AuthStore {
  // XXX : _ prefix를 계속 사용할지 고민
  private static _instance: AuthStore;

  token?: string = '';

  constructor() {
    makeObservable(this, {
      token: observable,
      isLoggedIn: computed,
      login: action,
    });
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  login = async () => {
    try {
      const token = await login();
      const fcmToken = await messaging().getToken();

      const {
        data: {
          data: { accessToken },
        },
      } = await api.postWithoutHeader<{
        data: {
          accessToken: string;
        };
      }>('/auth/sign-in/kakao', {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        pushToken: fcmToken,
      });

      this.token = accessToken;

      await AsyncStorage.setItem('token', accessToken);
    } catch (error) {
      // TODO: 토스트 표시
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

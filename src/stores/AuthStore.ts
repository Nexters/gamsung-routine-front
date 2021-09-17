import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { login } from '@react-native-seoul/kakao-login';
import { action, computed, makeObservable, observable } from 'mobx';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import IndicatorStore from '~/stores/IndicatorStore';
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

  login = async (target: string, navigation: any) => {
    if (IndicatorStore.count !== 0) {
      return;
    }
    try {
      IndicatorStore.up();
      const fcmToken = await messaging().getToken();

      try {
        if (target === 'kakao') {
          const token = await login();
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
        }
        if (target === 'apple') {
          // Generate secure, random values for state and nonce
          const rawNonce = uuid();
          const state = uuid();

          // Configure the request
          appleAuthAndroid.configure({
            // The Service ID you registered with Apple
            clientId: 'com.routine.gamsung2',

            // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
            // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
            redirectUri: 'https://moti.company/apiDocs/',

            // The type of response requested - code, id_token, or both.
            responseType: appleAuthAndroid.ResponseType.ALL,

            // The amount of user information requested from Apple.
            scope: appleAuthAndroid.Scope.ALL,

            // Random nonce value that will be SHA256 hashed before sending to Apple.
            nonce: rawNonce,

            // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
            state,
          });

          // Open the browser window for user sign in
          const response = await appleAuthAndroid.signIn();
          console.log({ response });

          // Send the authorization code to your backend for verification
        }
      } catch (error) {
        console.log('error', error);
      }

      AsyncStorage.setItem('token', this.token || '');
      navigation.replace('Home');
      IndicatorStore.down();
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

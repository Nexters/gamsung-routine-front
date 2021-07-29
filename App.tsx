import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';

import MainNavigator from '~/navigations/MainNavigator';
import AuthStore from '~/stores/AuthStore';

const App = () => {
  // 아이폰 권한 허용 관련
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();
  }, []);

  // 백그라운드 상태일 때 푸시 알림
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // 앱 접속 중인 상태일 때 푸시 알림
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('fcmToken : ', fcmToken);
  };

  const getUser = async () => {
    try {
      const getToken = await AsyncStorage.getItem('token');
      if (getToken !== null) {
        AuthStore.token = JSON.parse(getToken);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getFcmToken();
  }, []);

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;

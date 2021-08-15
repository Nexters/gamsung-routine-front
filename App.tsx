import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';

import MainNavigator from '~/navigations/MainNavigator';
import IndicatorStore from '~/stores/IndicatorStore';
import { BackgroundColor } from '~/utils/color';

const App = observer(() => {
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

  return (
    <>
      {IndicatorStore.count > 0 && (
        <ActivityIndicator
          size="large"
          style={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backgroundColor: BackgroundColor.DEPTH2_D,
            opacity: 0.7,
            zIndex: 1,
          }}
        />
      )}
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
});

export default App;

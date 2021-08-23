import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions, Linking } from 'react-native';

import MainNavigator from '~/navigations/MainNavigator';
import IndicatorStore from '~/stores/IndicatorStore';
import { BackgroundColor } from '~/utils/color';

const config = {
  screens: {
    Intro: 'intro',
    Home: 'home',
    TemplateList: 'TemplateList',
    EditTask: 'EditTask',
    InviteIntro: 'InviteIntro',
  },
};

const linking: LinkingOptions = {
  prefixes: ['bonkae-master://', 'https://bonkae.page.link', 'http://bonkae.page.link'],
  async getInitialURL(): Promise<string | null> {
    const url = await Linking.getInitialURL();
    const dynamicLinkUrl = await dynamicLinks().getInitialLink();

    if (dynamicLinkUrl) {
      const links = dynamicLinkUrl.url.split('/');
      const deepLink = links[links.length - 2];
      const taskId = links[links.length - 1];

      if (deepLink === 'tasks') {
        return `bonkae-master://InviteIntro?taskId=${taskId}`;
      }
    }

    if (url) {
      const links = url.split('?');
      const taskIdObject = links[links.length - 1].split('=');
      const taskId = taskIdObject[taskIdObject.length - 1];

      return `bonkae-master://InviteIntro?taskId=${taskId}`;
    }
    return null;
  },
  subscribe(listener: (deeplink: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);
    Linking.addEventListener('url', onReceiveURL);
    const handleDynamicLink = (dynamicLink: FirebaseDynamicLinksTypes.DynamicLink) => {
      listener(dynamicLink.url);
    };
    const unsubscribeToDynamicLinks = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      unsubscribeToDynamicLinks();
      Linking.removeEventListener('url', onReceiveURL);
    };
  },
  config: config,
};

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
          color="#0000ff"
          size="large"
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backgroundColor: BackgroundColor.DEPTH2_D,
            opacity: 0.7,
            top: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
      <NavigationContainer linking={linking}>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
});

export default App;

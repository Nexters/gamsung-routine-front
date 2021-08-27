import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useLayoutEffect } from 'react';
import { Linking } from 'react-native';

import { useUserProfileData } from '~/apis/authAPI';
import { patchPushNotification } from '~/apis/userAPI';
import Header from '~/components/Header';
import SettingView from '~/components/SettingView';
import { RootStackParamList } from '~/navigations/types';
import AuthStore from '~/stores/AuthStore';
import { BackgroundColor, SurfaceColor } from '~/utils/color';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Setting = ({ navigation }: Props) => {
  const { data: profile } = useUserProfileData();
  const [isOn, setIsOn] = useState(false);

  useLayoutEffect(() => {
    setIsOn(!!profile?.pushNotification);
  }, [profile?.pushNotification]);

  const handleLogoutButtonClick = async () => {
    await AuthStore.logout();
    navigation.replace('Login');
  };

  const handleLinkButtonClick = async (type: 'notice' | 'terms') => {
    if (type === 'notice') {
      await Linking.openURL('https://www.notion.so/hushershe/f787649fd3f3441d841aaef5427f85cf');
    } else if (type === 'terms') {
      await Linking.openURL('https://google.com');
    }
  };

  const handleSwitchClick = async () => {
    setIsOn((prev) => !prev);
    try {
      await patchPushNotification();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header navigation={navigation} goBackButton={true} title="앱 설정" backgroundColor={BackgroundColor.DEPTH1_L} />
      <SettingStyled>
        <SettingView
          isOn={isOn}
          onLogoutButtonClick={handleLogoutButtonClick}
          onLinkButtonClick={handleLinkButtonClick}
          onSwitchClick={handleSwitchClick}
        />
      </SettingStyled>
    </>
  );
};

const SettingStyled = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: ${SurfaceColor.DEPTH1_L};
`;

export default Setting;

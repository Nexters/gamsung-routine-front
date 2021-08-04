import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Linking, TouchableOpacity } from 'react-native';

import CustomText from '~/components/CustomText';
import { FoldableSwitch } from '~/components/FoldableSwitch';
import Icon from '~/components/Icon';
import { RootStackParamList } from '~/navigations/types';
import AuthStore from '~/stores/AuthStore';
import { IconColor, SurfaceColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Setting = ({ navigation }: Props) => {
  const userEmail = 'test.com';
  const [isOn, setIsOn] = useState(false);

  const handleLogoutButtonClick = async () => {
    await AuthStore.logout();
    navigation.replace('Login');
  };

  const handleLinkButtonClick = async (type: 'notice' | 'terms') => {
    if (type === 'notice') {
      await Linking.openURL('https://naver.com');
    } else if (type === 'terms') {
      await Linking.openURL('https://google.com');
    }
  };

  return (
    <SettingStyled>
      <SettingItem>
        <CustomText font={FontType.BOLD_CAPTION} color={TextColor.HIGHLIGHT}>
          계정
        </CustomText>
        <SettingInfoItem>
          <UserEmail>
            <Icon type="KAKAO" />
            <CustomText font={FontType.REGULAR_BODY_01} color={IconColor.PRIMARY_L}>
              {'  ' + userEmail}
            </CustomText>
          </UserEmail>
        </SettingInfoItem>
        <SettingInfoItem>
          <LogoutButton onPress={handleLogoutButtonClick}>
            <CustomText font={FontType.REGULAR_BODY_01} color={IconColor.PRIMARY_L}>
              로그아웃
            </CustomText>
          </LogoutButton>
        </SettingInfoItem>
      </SettingItem>
      <SettingItem>
        <CustomText font={FontType.BOLD_CAPTION} color={TextColor.HIGHLIGHT}>
          정보
        </CustomText>
        <SettingInfoItem>
          <TouchableOpacity onPress={() => handleLinkButtonClick('notice')}>
            <CustomText font={FontType.REGULAR_BODY_01} color={IconColor.PRIMARY_L}>
              공지사항
            </CustomText>
          </TouchableOpacity>
          <Icon type="ARROW_RIGHT" />
        </SettingInfoItem>
        <SettingInfoItem>
          <TouchableOpacity onPress={() => handleLinkButtonClick('terms')}>
            <CustomText font={FontType.REGULAR_BODY_01} color={IconColor.PRIMARY_L}>
              약관 및 정책
            </CustomText>
          </TouchableOpacity>
          <Icon type="ARROW_RIGHT" />
        </SettingInfoItem>
      </SettingItem>
      <SettingItem>
        <CustomText font={FontType.BOLD_CAPTION} color={TextColor.HIGHLIGHT}>
          알림
        </CustomText>
        <SettingInfoItem>
          <CustomText font={FontType.REGULAR_BODY_01} color={IconColor.PRIMARY_L}>
            푸시 알림
          </CustomText>
          <FoldableSwitch isOn={isOn} onToggle={setIsOn} />
        </SettingInfoItem>
      </SettingItem>
    </SettingStyled>
  );
};

const SettingStyled = styled.View`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: ${SurfaceColor.DEPTH1_L};
`;

const SettingItem = styled.View`
  margin: 30px 0;
`;

const SettingInfoItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserEmail = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LogoutButton = styled.TouchableOpacity``;

export default observer(Setting);

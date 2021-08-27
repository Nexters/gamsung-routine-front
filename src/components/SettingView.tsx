import styled from '@emotion/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useUserProfileData } from '~/apis/authAPI';
import CustomText from '~/components/CustomText';
import { FoldableSwitch } from '~/components/FoldableSwitch';
import Icon from '~/components/Icon';
import Loading from '~/components/Loading';
import { loading } from '~/hocs/loading';
import IndicatorStore from '~/stores/IndicatorStore';
import { IconColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  isOn: boolean;
  onLogoutButtonClick: () => void;
  onLinkButtonClick: (type: 'notice' | 'terms') => void;
  onSwitchClick: () => void;
}

const SettingView = ({ isOn, onLogoutButtonClick, onLinkButtonClick, onSwitchClick }: Props) => {
  const { data: profile } = useUserProfileData();

  const handleLogoutButtonClick = () => {
    onLogoutButtonClick();
  };

  const handleLinkButtonClick = (type: 'notice' | 'terms') => {
    onLinkButtonClick(type);
  };

  const handleSwitchClick = () => {
    onSwitchClick();
  };

  return (
    <>
      <SettingItem>
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.HIGHLIGHT}>
          계정
        </CustomText>
        <SettingInfoItem>
          <UserEmail>
            <Icon type="KAKAO" />
            <CustomText font={FontType.REGULAR_BODY_01} color={IconColor.PRIMARY_L} marginLeft={8}>
              {profile?.name}
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
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.HIGHLIGHT}>
          정보
        </CustomText>
        <SettingInfoItem>
          <TouchableOpacity onPress={() => handleLinkButtonClick('notice')}>
            <CustomText font={FontType.REGULAR_BODY_01} color={IconColor.PRIMARY_L}>
              이용방법 및 공지사항
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
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.HIGHLIGHT}>
          알림
        </CustomText>
        <SettingInfoItem>
          <CustomText font={FontType.REGULAR_BODY_01} color={IconColor.PRIMARY_L}>
            푸시 알림
          </CustomText>
          <FoldableSwitch isOn={isOn} onToggle={handleSwitchClick} />
        </SettingInfoItem>
      </SettingItem>
    </>
  );
};

const SettingItem = styled.View`
  margin: 30px 0;
`;

const SettingInfoItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const UserEmail = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LogoutButton = styled.TouchableOpacity``;

export default loading(SettingView, () => IndicatorStore.count > 0, <Loading />);

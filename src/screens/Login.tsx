import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import CustomText from '~/components/CustomText';
import { RootStackParamList } from '~/navigations/types';
import AuthStore from '~/stores/AuthStore';
import { GraphicColor, TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

export interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Login = ({ navigation }: HomeScreenProps) => {
  const onLogin = async () => {
    await AuthStore.login();
    navigation.replace('Home');
  };

  return (
    <LoginStyled>
      <KakaoLoginButton onPress={onLogin}>
        <KakaoLoginIcon source={require('~/assets/icons/icon_kakao_login.png')} />
        <CustomText font={FontType.BOLD_LARGE} color={TextColor.PRIMARY_L} align={Align.CENTER}>
          카카오 로그인 하기
        </CustomText>
      </KakaoLoginButton>
    </LoginStyled>
  );
};

const LoginStyled = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #5f4bf2;
  padding: 56px 20px;
`;

const KakaoLoginButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${GraphicColor.YELLOW};
  padding: 12px 0;
  margin-top: auto;
  margin-bottom: 0;
  border-radius: 8px;
`;

const KakaoLoginIcon = styled.Image`
  width: 17px;
  height: 16px;
  margin-right: 8px;
`;

export default Login;

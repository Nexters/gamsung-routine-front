import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import CustomText from '~/components/CustomText';
import { RootStackParamList } from '~/navigations/types';
import AuthStore from '~/stores/AuthStore';
import { GraphicColor, SurfaceColor, TextColor } from '~/utils/color';
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
      <OnBoardingView />
      <KakaoLoginButton onPress={onLogin}>
        <KakaoLoginIcon source={require('~/assets/icons/icon_kakao_login.png')} />
        <CustomText font={FontType.BOLD_LARGE} color={TextColor.PRIMARY_L} align={Align.CENTER}>
          카카오 로그인 하기
        </CustomText>
      </KakaoLoginButton>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>임시 버튼 로그인 없이 일단 넘어갓</Text>
      </TouchableOpacity>
    </LoginStyled>
  );
};

const LoginStyled = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${SurfaceColor.DEPTH1_L};
`;

const OnBoardingView = styled.View`
  width: 68%;
  height: 250px;
  margin-top: 80px;
  background-color: ${SurfaceColor.DEPTH2_L};
  border-radius: 40px;
`;

const KakaoLoginButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 88%;
  background-color: ${GraphicColor.YELLOW};
  padding: 12px 0;
  margin-bottom: 80px;
  border-radius: 8px;
`;

const KakaoLoginIcon = styled.Image`
  width: 17px;
  height: 16px;
  margin-right: 8px;
`;

export default Login;

import styled from '@emotion/native';
import { getProfile as getKakaoProfile, login } from '@react-native-seoul/kakao-login';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import CustomText from '~/components/CustomText';
import { User } from '~/models/User';
import { RootStackParamList } from '~/navigations/types';
import AuthStore from '~/stores/AuthStore';
import { TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

export interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Login = ({ navigation }: HomeScreenProps) => {
  const onLogin = async () => {
    try {
      const token = await login();
      const profile = await getKakaoProfile();
      const user: User = {
        token: token.accessToken,
        nickname: profile.nickname,
        profileImageUrl: profile.profileImageUrl,
      };
      AuthStore.login(user);
      navigation.replace('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginStyled>
      <OnBoardingView />
      <KakaoLoginButton onPress={onLogin}>
        <KakaoLoginIcon source={require('~/assets/icons/icon_kakao_login.png')} />
        <CustomText font={FontType.BOLD_LARGE} color={TextColor.PRIMARY} align={Align.CENTER}>
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
  background-color: #fff;
`;

const OnBoardingView = styled.View`
  width: 68%;
  height: 250px;
  margin-top: 80px;
  background-color: #f2f2f4;
  border-radius: 40px;
`;

const KakaoLoginButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 88%;
  background-color: #ffca42;
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

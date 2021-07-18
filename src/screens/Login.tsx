import styled from '@emotion/native';
import { login, getProfile as getKakaoProfile } from '@react-native-seoul/kakao-login';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import CustomText from '~/components/CustomText';
import { User } from '~/models/User';
import { RootStackParamList } from '~/navigations/types';
import AuthStore from '~/stores/AuthStore';

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
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginStyled>
      <KakaoLoginButton onPress={onLogin}>
        <CustomText>카카오 로그인</CustomText>
      </KakaoLoginButton>
    </LoginStyled>
  );
};

const LoginStyled = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const KakaoLoginButton = styled.TouchableOpacity`
  background-color: #f3f3f3;
  padding: 15px 30px;
  border-radius: 10px;
`;

export default Login;

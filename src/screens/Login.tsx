import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import introKimBonKae3 from '~/assets/images/intro_kim_bonkae_3.svg';
import introSubTitle from '~/assets/images/intro_sub_title.svg';
import loginTitle from '~/assets/images/login_title.svg';
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
      <View
        style={{
          position: 'absolute',
          top: 220,
          zIndex: 1000,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SvgXml xml={introSubTitle} />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 210,
          zIndex: 100,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SvgXml xml={loginTitle} />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 210,
          zIndex: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SvgXml xml={introKimBonKae3} />
      </View>
      <View />
      <View style={{ paddingLeft: 20, paddingRight: 20, width: '100%' }}>
        <KakaoLoginButton onPress={onLogin}>
          <KakaoLoginIcon source={require('~/assets/icons/icon_kakao_login.png')} />
          <CustomText font={FontType.BOLD_LARGE} color={TextColor.PRIMARY_L} align={Align.CENTER}>
            카카오 로그인 하기
          </CustomText>
        </KakaoLoginButton>
      </View>
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
  padding: 12px 20px;
  margin: auto 0 0;
  border-radius: 8px;
`;

const KakaoLoginIcon = styled.Image`
  width: 17px;
  height: 16px;
  margin-right: 8px;
`;

export default Login;

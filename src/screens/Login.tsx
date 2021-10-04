import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, Linking } from 'react-native';
import { SvgXml } from 'react-native-svg';

import introKimBonKae3 from '~/assets/images/intro_kim_bonkae_3.svg';
import introSubTitle from '~/assets/images/intro_sub_title.svg';
import loginTitle from '~/assets/images/login_title.svg';
import CustomText from '~/components/CustomText';
import { RootStackParamList } from '~/navigations/types';
import AuthStore from '~/stores/AuthStore';
import IndicatorStore from '~/stores/IndicatorStore';
import { BackgroundColor, GraphicColor, TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

export interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Login = ({ navigation }: HomeScreenProps) => {
  const onLogin = async () => {
    if (IndicatorStore.count === 0) {
      await AuthStore.login();
      navigation.replace('Home');
    }
  };

  const handleLinkButtonClick = async (type: 'terms' | 'privacy') => {
    if (type === 'terms') {
      await Linking.openURL('https://steep-woolen-661.notion.site/fb395cc475bc4b2e8ea4e334c55386fb');
    } else if (type === 'privacy') {
      await Linking.openURL('https://steep-woolen-661.notion.site/d05646281359447291c2bdef4b3eb9e1');
    }
  };

  return (
    <>
      <TopStatusBarStyled backgroundColor={BackgroundColor.HIGHLIGHTER} />
      <StatusBar barStyle="light-content" backgroundColor={BackgroundColor.HIGHLIGHTER} />
      <LoginStyled>
        <LoginView>
          <IntroSubTitleStyled
            style={{
              zIndex: 1000,
            }}>
            <SvgXml xml={introSubTitle} />
          </IntroSubTitleStyled>
          <LoginTitleStyled
            style={{
              zIndex: 100,
            }}>
            <SvgXml xml={loginTitle} />
          </LoginTitleStyled>
          <IntroKimBonKae3Styled
            style={{
              zIndex: 10,
            }}>
            <SvgXml xml={introKimBonKae3} />
          </IntroKimBonKae3Styled>
        </LoginView>
        <LoginButtonStyled>
          <CustomText
            font={FontType.REGULAR_CAPTION}
            color={TextColor.PRIMARY_D}
            align={Align.CENTER}
            marginBottom={20}>
            계정이 만들어지면 본캐마스터의{'\n'}
            <CustomText
              font={FontType.BOLD_CAPTION}
              color={TextColor.PRIMARY_D}
              align={Align.CENTER}
              textDecorationLine="underline"
              onPress={() => handleLinkButtonClick('privacy')}>
              개인정보수집방침
            </CustomText>
            과{' '}
            <CustomText
              font={FontType.BOLD_CAPTION}
              color={TextColor.PRIMARY_D}
              align={Align.CENTER}
              textDecorationLine="underline"
              onPress={() => handleLinkButtonClick('terms')}>
              이용약관
            </CustomText>
            에 동의합니다.
          </CustomText>
          <KakaoLoginButton onPress={onLogin}>
            <KakaoLoginIcon source={require('~/assets/icons/icon_kakao_login.png')} />
            <CustomText font={FontType.BOLD_LARGE} color={TextColor.PRIMARY_L} align={Align.CENTER}>
              카카오 로그인 하기
            </CustomText>
          </KakaoLoginButton>
        </LoginButtonStyled>
      </LoginStyled>
    </>
  );
};

const TopStatusBarStyled = styled.SafeAreaView<{ backgroundColor: string }>`
  flex: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const LoginStyled = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${BackgroundColor.HIGHLIGHTER};
  padding: 56px 20px;
`;

const LoginView = styled.View`
  flex: 1;
  width: 100%;
  height: auto;
  position: relative;
`;

const IntroSubTitleStyled = styled.View`
  position: absolute;
  top: 16%;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LoginTitleStyled = styled.View`
  position: absolute;
  top: 6%;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const IntroKimBonKae3Styled = styled.View`
  position: absolute;
  top: 33%;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LoginButtonStyled = styled.View`
  position: absolute;
  bottom: 50px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  z-index: 10000;
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

import styled from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';

import CustomText from './CustomText';

import onboarding1 from '~/assets/lottie/onboarding1.json';
import onboarding2 from '~/assets/lottie/onboarding2.json';
import onboarding3 from '~/assets/lottie/onboarding3.json';
import SkipButton from '~/components/SkipButton';
import { IconColor, SurfaceColor, TextColor, BackgroundColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

const Onboarding2 = () => {
  const [phase, setPhase] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const fn = async () => {
      const value = await AsyncStorage.getItem('onboarding2');
      setShow(!value);
    };
    fn();
  }, []);

  if (!show || phase >= 3) {
    return null;
  }

  return (
    <>
      <Onboarding2Styled>
        <SkipButton onClose={() => setShow(false)} />
        <Onboarding2View
          onPress={async () => {
            if (phase < 2) {
              return setPhase((prev) => prev + 1);
            }
            AsyncStorage.setItem('onboarding2', 'true');
            setShow(false);
          }}>
          <Onboarding2Box>
            <CircleView>
              {Array(3)
                .fill(0)
                .map((_, i) => {
                  return <Circle key={i} isCurrent={phase === i} />;
                })}
            </CircleView>
            <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.SECONDARY_L} align={Align.CENTER}>
              {getText(phase)}
            </CustomText>
            <LottieView
              style={{
                width: '100%',
                marginTop: 10,
              }}
              source={getLottie(phase)}
              autoPlay
              loop
            />
          </Onboarding2Box>
        </Onboarding2View>
      </Onboarding2Styled>
      <View
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: BackgroundColor.DEPTH2_D,
          opacity: 0.7,
          zIndex: 1,
        }}
      />
    </>
  );
};

interface AnimationObject {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: any[];
  layers: any[];
}

const getText = (phase: number) => {
  const textList = [
    <>
      테스크를 <CustomText font={FontType.BOLD_BODY_02}>직접 추가</CustomText>하거나{'\n'}
      <CustomText font={FontType.BOLD_BODY_02}>템플릿에서 테스크를 선택</CustomText>해보세요
    </>,
    <>
      <CustomText font={FontType.BOLD_BODY_02}>루틴</CustomText>에서 테스크를 선택해 수행하고{'\n'}
      <CustomText font={FontType.BOLD_BODY_02}>리포트</CustomText>에서 주별 성과를 확인하세요
    </>,
    <>
      <CustomText font={FontType.BOLD_BODY_02}>테스크의 더보기</CustomText>의 수정페이지에서{'\n'}
      <CustomText font={FontType.BOLD_BODY_02}>친구들을 초대</CustomText>할 수 있어요
    </>,
  ];
  return textList[phase];
};

const getLottie = (phase: number) => {
  const phaseList = [onboarding1, onboarding2, onboarding3];
  return (phaseList[phase] as AnimationObject) || onboarding1;
};

const Onboarding2Styled = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;

const Onboarding2View = styled.TouchableWithoutFeedback`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
  justify-content: center;
  align-items: center;
`;

const Onboarding2Box = styled.View`
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: ${SurfaceColor.DEPTH1_L};
  border-radius: 20px;
  padding: 40px;
`;

const CircleView = styled.View`
  width: 100%;
  height: 5px;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 36px;
`;

const Circle = styled.View<{ isCurrent: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${({ isCurrent }) => (isCurrent ? IconColor.TERTIARY_D : SurfaceColor.DEPTH2_L)};
  margin: 0 4px;
`;

export default Onboarding2;

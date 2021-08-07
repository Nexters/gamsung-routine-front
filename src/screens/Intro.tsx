import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import CustomText from '~/components/CustomText';
import { Slider } from '~/components/Slider';
import { SpeechBubble } from '~/components/SpeechBubble';
import { RootStackParamList } from '~/navigations/types';
import { BackgroundColor, TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Intro: React.FC<NavigationProps> = ({ navigation }) => {
  const [page, setPage] = useState({ page: 0 }); // 강제로 변경 이벤트를 넣기 위해 객체로 넣음

  const handleNextPage = (page: number) => {
    setPage({ page: page });
  };

  const handleSkipClick = () => {
    navigation.push('Login');
  };

  return (
    <IntroFrame>
      <SkipButton onPress={handleSkipClick}>
        <CustomText font={FontType.REGULAR_LARGE} color={TextColor.PRIMARY_D}>
          Skip
        </CustomText>
      </SkipButton>
      <Slider nextPage={page}>
        <PageA onNextPage={handleNextPage} />
        <PageB onNextPage={handleNextPage} />
        <PageC onNextPage={handleNextPage} />
        <PageD navigation={navigation} />
      </Slider>
    </IntroFrame>
  );
};

const PageA: React.FC<{ onNextPage: (page: number) => void }> = observer(({ onNextPage }) => {
  const handleNextPage = () => {
    onNextPage(1);
  };

  // TODO 배경색 #5f4bf2 추가
  return (
    <PageFrame backgroundColor="#5f4bf2">
      <PageABottomBackground>
        <PageAStartButton onPress={handleNextPage}>
          <CustomText font={FontType.BOLD_LARGE} color={TextColor.PRIMARY_D} align={Align.CENTER}>
            시작하기
          </CustomText>
        </PageAStartButton>
      </PageABottomBackground>
    </PageFrame>
  );
});

const PageB: React.FC<{ onNextPage: (page: number) => void }> = observer(({ onNextPage }) => {
  const handleNextPage = () => {
    onNextPage(2);
  };

  return (
    <PageFrame backgroundColor={BackgroundColor.DEPTH2_D}>
      <SpeechBubbleWrap>
        <SpeechBubble
          text={`작심삼일 김본캐는\n오늘도 습관을 지키지 못해 흥청망청\n시간을 보내다 잠들어 버리는데..`}
          onConfirmClick={handleNextPage}
        />
      </SpeechBubbleWrap>
    </PageFrame>
  );
});

const PageC: React.FC<{ onNextPage: (page: number) => void }> = observer(({ onNextPage }) => {
  const handleNextPage = () => {
    onNextPage(3);
  };

  return (
    <PageFrame backgroundColor={BackgroundColor.DEPTH2_D}>
      <SpeechBubbleWrap>
        <SpeechBubble
          text={`김본캐 : 오잉..? 여긴 어디지..?\n외딴 섬 같은데..`}
          onConfirmClick={handleNextPage}
          speaker="김본캐"
        />
      </SpeechBubbleWrap>
    </PageFrame>
  );
});

const PageD: React.FC<NavigationProps> = observer(({ navigation }) => {
  const handleNextPage = () => {
    navigation.push('Login');
  };

  return (
    <PageFrame backgroundColor={BackgroundColor.DEPTH2_D}>
      <SpeechBubbleWrap>
        <SpeechBubble
          text={`어서오게, 게으름뱅이여. 나는 그대의\n다짐들을 방해하는 미루미라고 하네.`}
          onConfirmClick={handleNextPage}
          speaker="???"
        />
      </SpeechBubbleWrap>
    </PageFrame>
  );
});

const IntroFrame = styled.View`
  width: 100%;
  height: 100%;
`;

const SkipButton = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  right: 24px;
  background-color: transparent;
  z-index: 10;
`;

const PageFrame = styled.View<{ backgroundColor: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex-direction: column;
`;

const PageABottomBackground = styled.View`
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  margin-top: auto;
  padding: 0 20px;
  background-color: #9294ff;
`;

const PageAStartButton = styled(TouchableOpacity)`
  width: 100%;
  height: 56px;
  background-color: #3f4042;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

const SpeechBubbleWrap = styled.View`
  margin: auto 20px 45px;
`;

export default observer(Intro);

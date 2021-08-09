import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import introHouse from '~/assets/images/intro_house.svg';
import introHouse2 from '~/assets/images/intro_house_2.svg';
import introKimBonKae2 from '~/assets/images/intro_kim_bonkae_2.svg';
import introMainKimBonKae1 from '~/assets/images/intro_main_kim_bonkae_1.svg';
import introMainTitle from '~/assets/images/intro_main_title.svg';
import introMonster1 from '~/assets/images/intro_monster_1.svg';
import introMonster2 from '~/assets/images/intro_monster_2.svg';
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

  return (
    <IntroFrame>
      <Slider nextPage={page} navigation={navigation}>
        <PageA onNextPage={handleNextPage} />
        <PageB onNextPage={handleNextPage} />
        <PageC onNextPage={handleNextPage} />
        <PageD onNextPage={handleNextPage} />
        <PageE onNextPage={handleNextPage} />
        <PageF onNextPage={handleNextPage} />
        <PageG navigation={navigation} />
      </Slider>
    </IntroFrame>
  );
};

const PageA: React.FC<{ onNextPage: (page: number) => void }> = observer(({ onNextPage }) => {
  const handleNextPage = () => {
    onNextPage(1);
  };

  return (
    <PageFrame backgroundColor={BackgroundColor.HIGHLIGHTER}>
      <View
        style={{
          position: 'absolute',
          bottom: 400,
          zIndex: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SvgXml xml={introMainTitle} />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 180,
          zIndex: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SvgXml xml={introMainKimBonKae1} />
      </View>
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
      <View
        style={{
          position: 'absolute',
          bottom: 320,
          zIndex: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SvgXml xml={introHouse} />
      </View>
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
      <View
        style={{
          position: 'absolute',
          bottom: 365,
          zIndex: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SvgXml xml={introHouse2} />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 200,
          right: 20,
          zIndex: 10,
        }}>
        <SvgXml xml={introKimBonKae2} />
      </View>
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

const PageD: React.FC<{ onNextPage: (page: number) => void }> = observer(({ onNextPage }) => {
  const handleNextPage = () => {
    onNextPage(4);
  };

  return (
    <PageFrame backgroundColor={BackgroundColor.DEPTH2_D}>
      <View
        style={{
          position: 'absolute',
          bottom: 277,
          zIndex: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SvgXml xml={introMonster1} />
      </View>
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

const PageE: React.FC<{ onNextPage: (page: number) => void }> = observer(({ onNextPage }) => {
  const handleNextPage = () => {
    onNextPage(5);
  };

  return (
    <PageFrame backgroundColor={BackgroundColor.DEPTH2_D}>
      <View
        style={{
          position: 'absolute',
          bottom: 365,
          zIndex: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SvgXml xml={introHouse2} />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 210,
          right: 40,
          zIndex: 10,
        }}>
        <SvgXml xml={introMonster2} />
      </View>
      <SpeechBubbleWrap>
        <SpeechBubble
          text={`이곳은 '미뤄왔섬'이라네.\n그대가 이제까지 다짐을 수없이 미뤄왔기 때문에 이곳에 유배되었다네.`}
          onConfirmClick={handleNextPage}
          speaker="미루미"
        />
      </SpeechBubbleWrap>
    </PageFrame>
  );
});

const PageF: React.FC<{ onNextPage: (page: number) => void }> = observer(({ onNextPage }) => {
  const handleNextPage = () => {
    onNextPage(6);
  };

  return (
    <PageFrame backgroundColor={BackgroundColor.DEPTH2_D}>
      <View
        style={{
          position: 'absolute',
          bottom: 365,
          zIndex: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SvgXml xml={introHouse2} />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 200,
          right: 20,
          zIndex: 10,
        }}>
        <SvgXml xml={introKimBonKae2} />
      </View>
      <SpeechBubbleWrap>
        <SpeechBubble
          text={`헉, 유배라뇨.\n저는 집에 갈 수 없는건가요?`}
          onConfirmClick={handleNextPage}
          speaker="미루미"
        />
      </SpeechBubbleWrap>
    </PageFrame>
  );
});

const PageG: React.FC<NavigationProps> = observer(({ navigation }) => {
  const handleNextPage = () => {
    navigation.push('Login');
  };

  return (
    <PageFrame backgroundColor={BackgroundColor.DEPTH2_D}>
      <View
        style={{
          position: 'absolute',
          bottom: 277,
          zIndex: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SvgXml xml={introMonster1} />
      </View>
      <SpeechBubbleWrap>
        <SpeechBubble
          text={`그대가 이 섬을 벗어나는 방법은\n단 하나! 루틴을 잘 지켜서 미루미 몬스터들을 없애는거라네.`}
          onConfirmClick={handleNextPage}
          speaker="미루미"
        />
      </SpeechBubbleWrap>
    </PageFrame>
  );
});

const IntroFrame = styled.SafeAreaView`
  width: 100%;
  height: 100%;
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

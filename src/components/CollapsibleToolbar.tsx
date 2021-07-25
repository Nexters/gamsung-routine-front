import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { SafeAreaView, View, Animated, Text, Dimensions } from 'react-native';

import CustomText from './CustomText';

import { BackgroundColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

const HEADER_EXPANDED_HEIGHT = 215;
const HEADER_COLLAPSED_HEIGHT = 56;

const TITLE_EXPANDED_HEIGHT = 24;
const TITLE_COLLAPSED_HEIGHT = 16;
const { width: SCREEN_WIDTH } = Dimensions.get('screen');

interface Props {
  title: string;
  children: React.ReactNode;
}

export const CollapsibleToolbar = observer((props: Props) => {
  const [scrollY] = useState(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerSlide = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0, HEADER_COLLAPSED_HEIGHT - HEADER_EXPANDED_HEIGHT],
    extrapolate: 'clamp',
  });

  const backgroundSlide = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const headerTitleSlide = scrollY.interpolate({
    inputRange: [
      0,
      (HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT) / 2,
      HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT,
    ],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  const headerTitleSize = scrollY.interpolate({
    inputRange: [
      0,
      (HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT) / 2,
      HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT,
    ],
    outputRange: [1, 1, 0.8],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0.5, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={{ width: '100%', flex: 1 }}>
      <Animated.ScrollView
        style={{
          flex: 1,
        }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        scrollEventThrottle={16}>
        <Animated.View>{props.children}</Animated.View>
      </Animated.ScrollView>
      <Header style={{ height: HEADER_EXPANDED_HEIGHT, transform: [{ translateY: headerSlide }] }}>
        <Background
          style={{
            height: HEADER_EXPANDED_HEIGHT,
            transform: [{ translateY: backgroundSlide }],
          }}>
          <View style={{ position: 'absolute', bottom: 0, left: 20 }}>
            <Text style={{ color: 'white' }}>ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ</Text>
          </View>
        </Background>
        <Action style={{ transform: [{ scale: headerTitleSize }] }}>
          <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
            <Text style={{ color: 'white' }}>{props.title}</Text>
          </View>
        </Action>
      </Header>
      <AppBar>
        <LeftHeaderItem>
          <CustomText color={TextColor.WHITE} font={FontType.BOLD_TITLE_02}>{`<`}</CustomText>
        </LeftHeaderItem>
        <RightHeaderItem>
          <CustomText color={TextColor.WHITE} font={FontType.BOLD_LARGE}>
            전체 담기
          </CustomText>
        </RightHeaderItem>
      </AppBar>
    </SafeAreaView>
  );
});

const LeftHeaderItem = styled(Animated.View)`
  position: absolute;
  left: 20px;
  top: 15px;
`;

const RightHeaderItem = styled(Animated.View)`
  position: absolute;
  right: 20px;
  top: 15px;
`;

const Container = styled(Animated.View)`
  flex: 1;
  width: 100%;
`;

const AppBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 24px;
  justify-content: space-between;
  background-color: transparent;
`;

const Header = styled(Animated.View)`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
`;

const Background = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${BackgroundColor.SECONDARY};
`;

const Action = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  padding: 0 40px;
  color: white;
`;

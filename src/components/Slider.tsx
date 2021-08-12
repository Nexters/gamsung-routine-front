import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';

import SkipButton from './SkipButton';

import { RootStackParamList } from '~/navigations/types';
import { IconColor } from '~/utils/color';

interface Props {
  page?: number;
  navigation: StackNavigationProp<RootStackParamList>;
  children?: React.ReactNode;
}

export const Slider: React.FC<Props> = observer(({ navigation, children, page = 0 }) => {
  const scrollRef = useRef<ScrollView>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const deviceWidth = useMemo(() => {
    return Dimensions.get('window').width;
  }, []);

  const [childComponents] = useState(() =>
    React.Children.toArray(children).map((child, index) => (
      <PageStyled width={deviceWidth} key={index}>
        {child}
      </PageStyled>
    )),
  );

  const handleCurrentChange = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextCurrent: number = Math.floor(e.nativeEvent.contentOffset.x / Math.floor(deviceWidth));
    if (nextCurrent < 0) {
      return;
    }
    setCurrentPage(nextCurrent);
  };

  const handleIndicatorClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleSkipClick = () => {
    navigation.replace('Login');
  };

  useEffect(() => {
    setTotalPage(childComponents.length);
  }, [childComponents]);

  useEffect(() => {
    setCurrentPage(page);
    handleIndicatorClick(page);
  }, [page]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ x: deviceWidth * currentPage });
  }, [deviceWidth, currentPage]);

  return (
    <SliderFrame>
      <Indicator totalPage={totalPage} selectedPage={currentPage} onIndicatorClick={handleIndicatorClick} />
      <SkipButton navigation={navigation} />
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={handleCurrentChange}>
        {childComponents}
      </ScrollView>
    </SliderFrame>
  );
});

const Indicator: React.FC<{ totalPage: number; selectedPage: number; onIndicatorClick?: (page: number) => void }> =
  observer(({ totalPage, selectedPage, onIndicatorClick }) => {
    const handleIndicatorClick = (page: number) => () => {
      onIndicatorClick?.(page);
    };

    return (
      <IndicatorStyled>
        {Array.from({ length: totalPage }).map((_, page) => (
          <IndicatorDot selected={page === selectedPage} key={page} onPress={handleIndicatorClick(page)} />
        ))}
      </IndicatorStyled>
    );
  });

const SliderFrame = styled.View`
  width: 100%;
  height: 100%;
`;

const PageStyled = styled.View<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const IndicatorStyled = styled.View`
  position: absolute;
  flex-direction: row;
  left: 24px;
  top: 30px;
  z-index: 10;
`;

const IndicatorDot = styled.TouchableOpacity<{ selected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 4px;
  background-color: ${({ selected }) => (selected ? IconColor.PRIMARY_D : IconColor.TERTIARY_D)};
`;

import styled from '@emotion/native';
import React, { useRef, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'react-native-svg';

import CustomText from './CustomText';

import { WheelItem } from '~/models/WheelItem';

interface Props {
  items: WheelItem[];
  height?: number;
  onClick?: (id: number) => void;
  initHeight?: number;
  onScrollEndDrag?: (id: number) => void;
}

export const WheelPicker = ({ items, height, onClick, initHeight = 0, onScrollEndDrag }: Props) => {
  const ref = useRef<ScrollView>(null);
  const handleItemClick = (id: number) => () => {
    onClick?.(id);
  };

  useEffect(() => {
    ref.current?.scrollTo({ animated: false, y: initHeight });
  });

  return (
    <WheelPickerStyled height={height}>
      <LinearGradient />
      <ScrollView
        onScrollEndDrag={(e) => {
          const y = e.nativeEvent.targetContentOffset?.y || 0;
          const h = height || 0;
          const index = y / h;
          if (items[index]) {
            onScrollEndDrag?.(items[index].id);
          }
        }}
        ref={ref}
        nestedScrollEnabled
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}>
        {items.map((it) => (
          <PickerItemStyled key={it.id} onPress={handleItemClick(it.id)}>
            <CustomText>{it.name}</CustomText>
          </PickerItemStyled>
        ))}
      </ScrollView>
    </WheelPickerStyled>
  );
};

const WheelPickerStyled = styled.View<{ height?: number }>`
  height: ${({ height }) => `${height ?? 96}px`};
`;

const PickerItemStyled = styled.TouchableOpacity`
  width: 100%;
  height: 36px;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

import styled from '@emotion/native';
import React, { useRef, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'react-native-svg';

import CustomText from './CustomText';

import { WheelItem } from '~/models/WheelItem';
import { ActionColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  color?: TextColor;
  items: WheelItem[];
  height?: number;
  onClick?: (id: number) => void;
  initHeight?: number;
  onScrollEndDrag?: (id: number) => void;
  selectedItems?: number;
}

export const WheelPicker = ({
  items,
  height,
  onClick,
  initHeight = 0,
  onScrollEndDrag,
  color,
  selectedItems,
}: Props) => {
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
        onMomentumScrollEnd={(e) => {
          const y = e.nativeEvent.contentOffset?.y || 0;
          const h = height || 0;
          const index = Math.round(y / h);
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
          <PickerItemStyled key={it.id} onPress={handleItemClick(it.id)} selected={selectedItems === it.id}>
            <CustomText font={FontType.MEDIUM_BODY_02} color={color}>
              {it.name}
            </CustomText>
          </PickerItemStyled>
        ))}
      </ScrollView>
    </WheelPickerStyled>
  );
};

const WheelPickerStyled = styled.View<{ height?: number }>`
  height: ${({ height }) => `${height ?? 96}px`};
`;

const PickerItemStyled = styled.TouchableOpacity<{ selected: boolean }>`
  width: 100%;
  height: 36px;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-color: ${({ selected }) => selected && ActionColor.BG};
  border-radius: 6px;
`;

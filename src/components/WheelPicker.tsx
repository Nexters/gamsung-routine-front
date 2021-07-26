import styled from '@emotion/native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'react-native-svg';

import CustomText from './CustomText';

import { WheelItem } from '~/models/WheelItem';

interface Props {
  items: WheelItem[];
  height?: number;
  onClick?: (id: number) => void;
}

export const WheelPicker = ({ items, height, onClick }: Props) => {
  const handleItemClick = (id: number) => () => {
    onClick?.(id);
  };

  return (
    <WheelPickerStyled height={height}>
      <LinearGradient />
      <ScrollView nestedScrollEnabled scrollEventThrottle={1} showsVerticalScrollIndicator={false}>
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

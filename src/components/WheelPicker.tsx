import styled from '@emotion/native';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'react-native-svg';
import { WheelItem } from '~/models/WheelItem';

interface Props {
  items: WheelItem[];
  onClick?: (id: number | string) => void;
}

export const WheelPicker = (props: Props) => {
  const handleItemClick = (id: string | number) => () => {
    console.log('click', id);
    props.onClick?.(id);
  };

  return (
    <WheelPickerStyled>
      <LinearGradient></LinearGradient>
      <ScrollView nestedScrollEnabled scrollEventThrottle={1} showsVerticalScrollIndicator={false}>
        {props.items.map((it) => (
          <PickerItemStyled key={it.id} onPress={handleItemClick(it.id)}>
            <Text>{it.name}</Text>
          </PickerItemStyled>
        ))}
      </ScrollView>
    </WheelPickerStyled>
  );
};

const WheelPickerStyled = styled.View<{ height?: number }>`
  height: ${({ height }) => height ?? '96px'};
`;

const PickerItemStyled = styled.TouchableOpacity`
  width: 100%;
  height: 36px;
  align-items: center;
  align-content: center;
`;

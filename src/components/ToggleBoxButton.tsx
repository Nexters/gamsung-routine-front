import styled from '@emotion/native';
import React, { useEffect, useState } from 'react';

import CustomText from './CustomText';

import { BackgroundColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  onText: string;
  offText: string;
  isOn?: boolean;
  onToggleClick?: (value: boolean) => void;
}

export const ToggleBoxButton = (props: Props) => {
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    setIsOn(props?.isOn ?? true);
  }, [props.isOn]);

  const handleToggleClick = (value: boolean) => () => {
    setIsOn(value);
    props.onToggleClick?.(value);
  };

  return (
    <ToggleBoxButtonStyled>
      <ButtonStyled onPress={handleToggleClick(true)} selected={isOn}>
        <CustomText font={FontType.MEDIUM_BODY_02} color={isOn ? TextColor.WHITE : TextColor.MAIN} align={'center'}>
          {props.onText}
        </CustomText>
      </ButtonStyled>
      <ButtonStyled onPress={handleToggleClick(false)} selected={!isOn}>
        <CustomText font={FontType.MEDIUM_BODY_02} color={!isOn ? TextColor.WHITE : TextColor.MAIN} align={'center'}>
          {props.offText}
        </CustomText>
      </ButtonStyled>
    </ToggleBoxButtonStyled>
  );
};

const ToggleBoxButtonStyled = styled.View`
  width: 108px;
  height: 36px;
  padding: 2px;
  border-radius: 6px;
  background-color: ${BackgroundColor.ELEVATED};
  flex-direction: row;
`;

const ButtonStyled = styled.TouchableOpacity<{ selected: boolean }>`
  width: 51px;
  height: 32px;
  background-color: ${({ selected }) => (selected ? '#5F4BF2' : '#F2F2F4')};
  flex: 1;
  border-radius: 6px;
  align-content: center;
  justify-content: center;
`;

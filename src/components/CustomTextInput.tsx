import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React from 'react';

import { TextColor } from '~/utils/color';
import { Align, Font, FontType } from '~/utils/font';

interface Props {
  font?: FontType;
  color?: TextColor;
  align?: Align;
  placeHolder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
}

const CustomTextInput = ({
  font = FontType.MEDIUM_LARGE,
  color = TextColor.PRIMARY_L,
  align = Align.LEFT,
  value = '',
  placeHolder = '',
  onChangeText,
}: Props) => {
  const style = Font.getStyle(font);

  const handleChange = (value: string) => {
    onChangeText?.(value);
  };

  return (
    <CustomTextInputStyled
      family={Font.getFamily(style.weight)}
      size={style.size}
      weight={style.weight}
      color={color}
      align={align}
      onChangeText={handleChange}
      value={value}
      placeholder={placeHolder}
      placeholderTextColor={TextColor.INACTIVE_L}
    />
  );
};

const CustomTextInputStyled = styled.TextInput<{
  family: string;
  size: number;
  weight: number;
  color: TextColor;
  align: Align;
}>`
  font-family: ${({ family }) => family};
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
  line-height: ${({ size }) => `${size * 1.6}px`};
  text-align: ${({ align }) => align};
  width: 100%;
`;

export default observer(CustomTextInput);

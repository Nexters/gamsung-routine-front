import styled from '@emotion/native';
import React from 'react';
import { TextColor } from '~/utils/color';
import { Align, Font, FontType } from '~/utils/font';

interface Props {
  children: React.ReactNode;
  font?: FontType;
  color?: TextColor;
  align?: Align;
}

const CustomText = ({
  children,
  font = FontType.MEDIUM_LARGE,
  color = TextColor.PRIMARY,
  align = Align.LEFT,
}: Props) => {
  const style = Font.getStyle(font);
  return (
    <CustomTextStyled size={style.size} weight={style.weight} color={color} align={align}>
      {children}
    </CustomTextStyled>
  );
};

const CustomTextStyled = styled.Text<{ size: number; weight: number; color: TextColor; align: Align }>`
  font-family: 'Pretendard';
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
  line-height: ${({ size }) => `${size * 1.6}px`};
  text-align: ${({ align }) => align};
`;

export default CustomText;

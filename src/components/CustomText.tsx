import styled from '@emotion/native';
import React from 'react';
import { TextColor } from '~/utils/color';

interface Props {
  children: React.ReactNode;
  size?: 32 | 24 | 22 | 20 | 18 | 16 | 14 | 12;
  weight?: 'bold' | 'medium' | 'regular';
  color?: TextColor;
  align?: 'left' | 'right' | 'center';
}

const CustomText = ({ children, size, weight, color, align }: Props) => {
  return (
    <CustomTextStyled size={size} weight={weight} color={color} align={align}>
      {children}
    </CustomTextStyled>
  );
};

const CustomTextStyled = styled.Text<{ size?: number; weight?: string; color?: TextColor; align?: string }>`
  font-family: 'Pretendard';
  font-size: ${({ size }) => (size ?? 14) + 'px'};
  font-weight: ${({ weight }) => (weight === 'bold' ? 700 : weight === 'medium' ? 600 : 400) + ''};
  color: ${({ color }) => color};
  line-height: ${({ size }) => (size ?? 14) * 1.6 + 'px'};
  text-align: ${({ align }) => align ?? 'left'};
`;

export default CustomText;

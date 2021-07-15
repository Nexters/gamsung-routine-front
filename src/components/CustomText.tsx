import styled from '@emotion/native';
import React from 'react';

interface Props {
  children: React.ReactNode;
  size?: 32 | 24 | 22 | 20 | 18 | 16 | 14 | 12;
  weight?: 'bold' | 'medium' | 'regular';
  color?:
    | 'primary'
    | 'secondary'
    | 'disable'
    | 'red'
    | 'yellow'
    | 'puple100'
    | 'puple90'
    | 'puple80'
    | 'puple70'
    | 'puple60'
    | 'puple50'
    | 'puple40'
    | 'puple30'
    | 'puple20'
    | 'puple10'
    | 'white';
  align?: 'left' | 'right' | 'center';
}

const CustomText = ({ children, size, weight, color, align }: Props) => {
  return (
    <CustomTextStyled size={size} weight={weight} color={color} align={align}>
      {children}
    </CustomTextStyled>
  );
};

const CustomTextStyled = styled.Text<{ size?: number; weight?: string; color?: string; align?: string }>`
  font-family: 'Pretendard';
  font-size: ${({ size }) => (size ? size : 14) + 'px'};
  font-weight: ${({ weight }) => (weight === 'bold' ? 700 : weight === 'medium' ? 600 : 400) + ''};
  color: ${({ color }) =>
    color === 'white'
      ? '#fff'
      : color === 'puple100'
      ? '#20185c'
      : color === 'puple90'
      ? '#312589'
      : color === 'puple80'
      ? '#4131b7'
      : color === 'puple70'
      ? '#4937ce'
      : color === 'puple60'
      ? '#513de5'
      : color === 'puple50'
      ? '#7464ea'
      : color === 'puple40'
      ? '#a89ef2'
      : color === 'puple30'
      ? '#cbc5f7'
      : color === 'puple20'
      ? '#dcd8fa'
      : color === 'puple10'
      ? '#eeecfc'
      : color === 'yellow'
      ? '#ffbd13'
      : color === 'red'
      ? '#e82d13'
      : color === 'disable'
      ? '#d7d9dd'
      : color === 'secondary'
      ? '#6b6d72'
      : '#333436'};
  line-height: ${({ size }) => (size ? size : 14) * 1.6 + 'px'};
  text-align: ${({ align }) => (align ? align : 'left')};
`;

export default CustomText;

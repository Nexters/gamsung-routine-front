import styled from '@emotion/native';
import React from 'react';

import { TextColor } from '~/utils/color';
import { Align, Font, FontType } from '~/utils/font';

interface Props {
  children: React.ReactNode;
  font?: FontType;
  color?: TextColor;
  align?: Align;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  numberOfLines?: number;
}

const CustomText = ({
  children,
  font = FontType.MEDIUM_LARGE,
  color = TextColor.PRIMARY_L,
  align = Align.LEFT,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  numberOfLines,
}: Props) => {
  const style = Font.getStyle(font);
  return (
    <CustomTextStyled
      family={Font.getFamily(style.weight)}
      size={style.size}
      weight={style.weight}
      color={color}
      align={align}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      numberOfLines={numberOfLines}>
      {children}
    </CustomTextStyled>
  );
};

const CustomTextStyled = styled.Text<{
  family: string;
  size: number;
  weight: number;
  color: TextColor;
  align: Align;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
}>`
  font-family: ${({ family }) => family};
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
  line-height: ${({ size }) => `${size * 1.6}px`};
  text-align: ${({ align }) => align};
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
  margin-left: ${({ marginLeft }) => `${marginLeft}px`};
  margin-right: ${({ marginRight }) => `${marginRight}px`};
`;

export default CustomText;

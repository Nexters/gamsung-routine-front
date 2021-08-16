import styled from '@emotion/native';
import React from 'react';

import { BackgroundColor } from '~/utils/color';

interface Props {
  children: React.ReactNode;
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: string;
}

export const CollapsibleCard = ({
  children,
  marginBottom,
  marginTop,
  backgroundColor = BackgroundColor.DEPTH1_L,
}: Props) => {
  return (
    <CollapsibleCardStyled
      marginTop={marginTop || 0}
      marginBottom={marginBottom || 0}
      backgroundColor={backgroundColor}>
      {children}
    </CollapsibleCardStyled>
  );
};

const CollapsibleCardStyled = styled.View<{ marginTop: number; marginBottom: number; backgroundColor: string }>`
  flex-direction: column;
  min-height: 56px;
  width: 100%;
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 20px;
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
`;

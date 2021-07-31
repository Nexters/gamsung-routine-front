import styled from '@emotion/native';
import React from 'react';

import { BackgroundColor } from '~/utils/color';

interface Props {
  children: React.ReactNode;
  marginTop?: number;
  marginBottom?: number;
}

export const CollapsibleCard = ({ children, marginBottom, marginTop }: Props) => {
  return (
    <CollapsibleCardStyled marginTop={marginTop || 0} marginBottom={marginBottom || 0}>
      {children}
    </CollapsibleCardStyled>
  );
};

const CollapsibleCardStyled = styled.View<{ marginTop: number; marginBottom: number }>`
  flex-direction: column;
  min-height: 56px;
  width: 100%;
  border-radius: 8px;
  background-color: ${BackgroundColor.DEPTH1_L};
  padding: 16px;
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
`;

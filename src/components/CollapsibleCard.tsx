import { View } from 'react-native';
import React from 'react';
import styled from '@emotion/native';

interface Props {
  children: React.ReactNode;
  marginTop?: number;
  marginBottom?: number;
}

export const CollapsibleCard = (props: Props) => {
  return (
    <CollapsibleCardStyled marginTop={props?.marginTop ?? 0} marginBottom={props?.marginBottom ?? 0}>
      {props.children}
    </CollapsibleCardStyled>
  );
};

const CollapsibleCardStyled = styled.View<{ marginTop: number; marginBottom: number }>`
  display: flex;
  flex-direction: column;
  min-height: 56px;
  width: 100%;
  border-radius: 8px;
  background-color: white;
  padding: 16px;
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;

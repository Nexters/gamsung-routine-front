import styled from '@emotion/native';
import React from 'react';
import { Text } from 'react-native';

interface Props {
  count: number;
}

const RoundBall = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(81, 61, 229, 1);
  justify-content: center;
  align-items: center;
  margin-left: 4px;
`;

export const RoundedCount = (props: Props) => {
  return (
    <RoundBall>
      <Text style={{ color: 'white' }}>{props.count}</Text>
    </RoundBall>
  );
};
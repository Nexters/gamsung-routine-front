import styled from '@emotion/native';
import React from 'react';

const RoundBall = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(81, 61, 229, 1);
  justify-content: center;
  align-items: center;
  margin-left: 4px;
`;

const RoundBallText = styled.Text`
  color: #fff;
`;

interface Props {
  count: number;
}

export const RoundedCount = (props: Props) => {
  return (
    <RoundBall>
      <RoundBallText>{props.count}</RoundBallText>
    </RoundBall>
  );
};

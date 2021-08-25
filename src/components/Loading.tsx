import styled from '@emotion/native';
import React from 'react';

import { ActionColor } from '~/utils/color';

interface Props {
  color?: ActionColor;
}

const Loading = ({ color = ActionColor.ACTIVE }: Props) => {
  return <LoadingStyled color={color} size="large" />;
};

const LoadingStyled = styled.ActivityIndicator`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
`;

export default Loading;

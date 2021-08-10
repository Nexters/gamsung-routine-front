import styled from '@emotion/native';
import React from 'react';

import { BackgroundColor, BorderColor } from '~/utils/color';

interface Props {
  imageUrl?: string | null;
}

export const UserProfileImage: React.FC<Props> = ({ imageUrl = null }) => {
  return <UserProfileImageStyled imageUrl={imageUrl} />;
};

const UserProfileImageStyled = styled.View<{ imageUrl: string | null }>`
  width: 32px;
  height: 32px;
  border-radius: 24px;
  border-width: 2px;
  border-color: ${BorderColor.DEPTH2_L};
  background: ${({ imageUrl }) => imageUrl ?? BackgroundColor.DEPTH1_D};
`;

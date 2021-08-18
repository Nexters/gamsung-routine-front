import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React from 'react';

import CustomText from '~/components/CustomText';
import { UserProfileImage } from '~/components/UserProfileImage';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  id: number;
  name: string;
  profileImageUrl?: string;
  leader?: boolean;
  disable?: boolean;
}

export const FriendBox: React.FC<Props> = observer(
  ({ id, name, profileImageUrl = null, leader = false, disable = false }) => {
    return (
      <FriendBoxFrame>
        <LeftArea>
          <UserProfileImage imageUrl={profileImageUrl} />
          <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_L} marginLeft={10}>
            {name}
          </CustomText>
        </LeftArea>
        <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.HIGHLIGHT}>
          {leader ? '파티장' : !disable && '파티원 삭제'}
        </CustomText>
      </FriendBoxFrame>
    );
  },
);

const FriendBoxFrame = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LeftArea = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';

import { CollapsibleCard } from './CollapsibleCard';
import CustomText from './CustomText';
import { FriendBox } from './FriendBox';

import { Friend } from '~/models/Friend';
import { BackgroundColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  friends: Friend[];
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: BackgroundColor;
  disable?: boolean;
}

export const FriendInviteCard: React.FC<Props> = observer(
  ({ marginTop, marginBottom, friends, backgroundColor = BackgroundColor.DEPTH1_L, disable = false }) => {
    return (
      <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom} backgroundColor={backgroundColor}>
        {friends.length > 0 && (
          <>
            <TextWrap>
              <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_L} marginRight={4}>
                파티원
              </CustomText>
              <CustomText font={FontType.BOLD_BODY_02} color={TextColor.HIGHLIGHT}>
                {friends.length}
              </CustomText>
            </TextWrap>
            {friends.map((friend, index) => (
              <React.Fragment key={friend.id}>
                <FriendBox id={friend.id} name={friend.name} leader={friend.leader} disable={disable} />
                {friends.length > index + 1 && <View style={{ padding: 5 }} />}
              </React.Fragment>
            ))}
          </>
        )}
      </CollapsibleCard>
    );
  },
);

const TextWrap = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

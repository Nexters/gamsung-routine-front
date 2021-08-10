import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { CollapsibleCard } from './CollapsibleCard';
import CustomText from './CustomText';
import { FoldableContainer } from './FoldableContainer';
import { FriendBox } from './FriendBox';
import Icon from './Icon';

import { Friend } from '~/models/Friend';
import { BorderColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  friends: Friend[];
  marginTop?: number;
  marginBottom?: number;
}

export const FriendInviteCard: React.FC<Props> = observer(({ marginTop, marginBottom, friends }) => {
  return (
    <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
      <FoldableContainer type="NONE" label="파티원 추가하기" isOpen={false}>
        <TouchableOpacity>
          <Icon type="KAKAO" />
        </TouchableOpacity>
      </FoldableContainer>
      {friends.length > 0 && (
        <>
          <DividerStyled />
          <TextWrap>
            <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_L}>
              파티원
            </CustomText>
            <CustomText font={FontType.BOLD_BODY_02} color={TextColor.HIGHLIGHT}>
              {friends.length}
            </CustomText>
          </TextWrap>
          {friends.map((friend) => (
            <>
              <FriendBox key={friend.id} id={friend.id} name={friend.name} />
              <View style={{ padding: 5 }} />
            </>
          ))}
        </>
      )}
    </CollapsibleCard>
  );
});

const DividerStyled = styled.View`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: ${BorderColor.DEPTH2_L};
`;

const TextWrap = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

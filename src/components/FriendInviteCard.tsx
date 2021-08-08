import { observer } from 'mobx-react';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { CollapsibleCard } from './CollapsibleCard';
import { FoldableContainer } from './FoldableContainer';
import Icon from './Icon';

import { Friend } from '~/models/Friend';

interface Props {
  friend: Friend[];
  marginTop?: number;
  marginBottom?: number;
}

export const FriendInviteCard: React.FC<Props> = observer(({ marginTop, marginBottom, friend }) => {
  return (
    <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom}>
      <FoldableContainer type="NONE" label="파티원 추가하기" isOpen={false}>
        <TouchableOpacity>
          <Icon type="KAKAO" />
        </TouchableOpacity>
      </FoldableContainer>
    </CollapsibleCard>
  );
});

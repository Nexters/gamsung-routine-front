import styled from '@emotion/native';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { CollapsibleCard } from './CollapsibleCard';
import CustomModal from './CustomModal';
import CustomText from './CustomText';
import { FoldableContainer } from './FoldableContainer';
import { FriendBox } from './FriendBox';
import Icon from './Icon';

import useModal from '~/hooks/useModal';
import { Friend } from '~/models/Friend';
import { BackgroundColor, TextColor, BorderColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  friends: Friend[];
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: BackgroundColor;
  disable?: boolean;
  onInviteClick?: () => void;
  onDeleteFriendClick?: (friendId: string, taskId: string) => void;
}

export const FriendInviteCard: React.FC<Props> = observer(
  ({
    marginTop,
    marginBottom,
    friends,
    backgroundColor = BackgroundColor.DEPTH1_L,
    disable = false,
    onInviteClick,
    onDeleteFriendClick,
  }) => {
    const [friendId, setFriendId] = useState<string | null>(null);
    const [taskId, setTaskId] = useState<string | null>(null);
    const { isVisible: isModalVisible, openModal, closeModal } = useModal();

    const handleInviteClick = () => {
      onInviteClick?.();
    };

    const handleDeleteFriendClick = (friendId: string, taskId: string) => {
      if (disable) {
        return;
      }
      setFriendId(friendId);
      setTaskId(taskId);
      openModal();
    };

    const handlePopupDeleteClick = async () => {
      if (!friendId || !taskId) {
        return;
      }
      await onDeleteFriendClick?.(friendId, taskId);
      closeModal();
    };

    const handlePopupCancelClick = () => {
      setFriendId(null);
      setTaskId(null);
      closeModal();
    };

    return (
      <>
        <CollapsibleCard marginTop={marginTop} marginBottom={marginBottom} backgroundColor={backgroundColor}>
          <FoldableContainer type="NONE" label="파티원 추가하기" isOpen={false}>
            <TouchableOpacity onPress={handleInviteClick}>
              <Icon type="KAKAO" />
            </TouchableOpacity>
          </FoldableContainer>
          {friends.length > 0 && (
            <>
              <DividerStyled />
              <TextWrap>
                <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_L} marginRight={4}>
                  파티원
                </CustomText>
                <CustomText font={FontType.BOLD_BODY_02} color={TextColor.HIGHLIGHT}>
                  {friends.length}
                </CustomText>
              </TextWrap>
              {friends.map((friend, index) => (
                <React.Fragment key={friend.profileId}>
                  <FriendBox
                    id={friend.profileId}
                    taskId={friend.taskId}
                    profileImageUrl={friend.profileImageUrl}
                    name={friend.name}
                    leader={friend.leader}
                    disable={disable}
                    onDeleteClick={handleDeleteFriendClick}
                  />
                  {friends.length > index + 1 && <View style={{ padding: 5 }} />}
                </React.Fragment>
              ))}
            </>
          )}
        </CollapsibleCard>
        <CustomModal
          isVisible={isModalVisible}
          onClose={closeModal}
          content="파티원을 삭제하시겠어요?"
          subContent="앞으로 같이 테스크를 수행할 수 없어요."
          leftButtonText="취소"
          onLeftButtonClick={handlePopupCancelClick}
          rightButtonText="삭제하기"
          onRightButtonClick={handlePopupDeleteClick}
        />
      </>
    );
  },
);

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

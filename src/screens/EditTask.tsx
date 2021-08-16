import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';

import { useUserProfileData } from '~/apis/authAPI';
import CustomModal from '~/components/CustomModal';
import CustomText from '~/components/CustomText';
import EdisTaskView from '~/components/EditTaskView';
import useModal from '~/hooks/useModal';
import useModalContent from '~/hooks/useModalContent';
import { RootStackParamList } from '~/navigations/types';
import { EditTaskStore } from '~/stores/EditTaskStore';
import { ActionColor, GraphicColor, TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import { showToast } from '~/utils/showToast';

interface EditTaskScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'EditTask'>;
}

const EditTask = ({ route, navigation }: EditTaskScreenProps) => {
  const { templateTask, taskId } = route.params;
  const { isVisible: isModalVisible, openModal, closeModal } = useModal();
  const {
    modalContent,
    setModalContent,
    modalSubContent,
    setModalSubContent,
    modalLeftButtonText,
    setModalLeftButtonText,
    modalRightButtonText,
    setModalRightButtonText,
  } = useModalContent();

  const {
    data: { id },
  } = useUserProfileData();

  const [modalType, setModalType] = useState<'DELETE' | 'SAVE'>('SAVE');

  const [vm] = useState<EditTaskStore>(new EditTaskStore(taskId, templateTask));

  const handleDaySelect = (id: number) => {
    vm.onSelectDay(id);
  };

  const handleEditSubmitClick = async () => {
    setModalContent('테스크 추가가 완료되었어요.');
    setModalSubContent('미루미를 없애기 위한\n테스크를 계속 추가하시겠어요?');
    setModalLeftButtonText('내 테스크 보기');
    setModalRightButtonText('계속 추가하기');
    setModalType('SAVE');

    if (id) {
      await vm.onSave(id);
      openModal();
    }
  };

  const handleLeftButtonClick = () => {
    switch (modalType) {
      case 'SAVE': {
        handleShowMyTaskButtonClick();
        return;
      }
      case 'DELETE': {
        closeModal();
        return;
      }
    }
  };

  const handleRightButtonClick = async () => {
    switch (modalType) {
      case 'SAVE': {
        handleKeepAddingButtonClick();
        return;
      }
      case 'DELETE': {
        await vm.onTaskEnd();
        closeModal();
        navigation.pop();
        showToast('테스크가 종료되었어요.');
        return;
      }
    }
  };

  const handleShowMyTaskButtonClick = () => {
    navigation.pop(3);
    closeModal();
    showToast('테스크 담기가 완료되었어요.');
  };

  const handleKeepAddingButtonClick = () => {
    navigation.pop(2);
    closeModal();
  };

  const handleCountOfDay = (countOfDay: number) => {
    vm.onChangeCountOfDay(countOfDay);
  };

  const handleChangeTaskName = (name: string) => {
    if (!vm.editableTitle) {
      return;
    }
    vm.onChangeTaskName(name);
  };

  const handleChangeTimeData = useCallback(
    (id: number, hour: number, minute: number) => {
      vm.onChangeTimeSettingData(id, hour, minute);
    },
    [vm],
  );

  const handleChangeAlarm = (isAlarm: boolean) => {
    vm.onChangeAlarm(isAlarm);
  };

  const handleEndTaskClick = () => {
    setModalContent('테스크를 종료하시겠어요?');
    setModalSubContent('테스크를 종료하면 되돌리실 수 없어요!');
    setModalLeftButtonText('취소');
    setModalRightButtonText('삭제하기');
    setModalType('DELETE');

    openModal();
  };

  return (
    <>
      <EditTaskStyled>
        <EdisTaskView
          vm={vm}
          onChangeTaskName={handleChangeTaskName}
          onDaySelect={handleDaySelect}
          onCountOfDay={handleCountOfDay}
          onChangeTimeData={handleChangeTimeData}
          onChangeAlarm={handleChangeAlarm}
          onEndTaskClick={handleEndTaskClick}
        />
        <EditSubmitButton onPress={handleEditSubmitClick} disabled={!vm.isValidSave}>
          <CustomText font={FontType.BOLD_LARGE} color={TextColor.PRIMARY_D} align={Align.CENTER}>
            {vm.isEditMode ? '수정하기' : '추가하기'}
          </CustomText>
        </EditSubmitButton>
      </EditTaskStyled>
      <CustomModal
        isVisible={isModalVisible}
        onClose={closeModal}
        content={modalContent}
        subContent={modalSubContent}
        leftButtonText={modalLeftButtonText}
        onLeftButtonClick={handleLeftButtonClick}
        rightButtonText={modalRightButtonText}
        onRightButtonClick={handleRightButtonClick}
        backgroundOpacity={0.8}>
        {modalType === 'SAVE' && (
          <FriendInviteView>
            <KakaoInviteButton>
              <KakaoIcon source={require('~/assets/icons/icon_kakao_login.png')} />
              <CustomText font={FontType.BOLD_LARGE} color={TextColor.PRIMARY_L} align={Align.CENTER}>
                테스크 파티원 초대하기
              </CustomText>
            </KakaoInviteButton>
            <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY_D} align={Align.CENTER}>
              나중에 테스크 수정을 통해서도 초대가 가능해요.
            </CustomText>
          </FriendInviteView>
        )}
      </CustomModal>
    </>
  );
};

const EditTaskStyled = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const EditSubmitButton = styled.TouchableOpacity<{ disabled: boolean }>`
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled }) => (disabled ? ActionColor.INACTIVE : ActionColor.ACTIVE)};
  border-radius: 8px;
  padding: 12px 0;
  left: 20px;
  right: 20px;
  position: absolute;
  bottom: 34px;
`;

const FriendInviteView = styled.View`
  position: absolute;
  bottom: 50px;
  left: 37px;
  right: 37px;
`;

const KakaoInviteButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${GraphicColor.YELLOW};
  padding: 12px 0;
  margin-top: auto;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const KakaoIcon = styled.Image`
  width: 17px;
  height: 16px;
  margin-right: 8px;
`;

export default observer(EditTask);

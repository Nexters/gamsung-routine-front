import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import CustomModal from './CustomModal';

import CustomText from '~/components/CustomText';
import useModal from '~/hooks/useModal';
import useModalContent from '~/hooks/useModalContent';
import { RootStackParamList } from '~/navigations/types';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  taskId: string;
  navigation: StackNavigationProp<RootStackParamList>;
}

const TaskDetailPopup = ({ taskId, navigation }: Props) => {
  const { isVisible: isModalVisible, openModal, closeModal } = useModal();

  const { modalContent, setModalContent, modalSubContent, setModalSubContent } = useModalContent();

  const handleCancelButtonClick = () => {
    console.log(taskId, ' : cancel');
  };

  const handleDelayButtonClick = () => {
    console.log(taskId, ' : delay');
  };

  const handleEditButtonClick = () => {
    navigation.navigate('EditTask', { templateTask: null, taskId: Number(taskId) });
  };

  const handleDeleteButtonClick = () => {
    console.log(taskId, ' : delete');
    setModalContent('태스크를 종료하시겠어요?');
    setModalSubContent('태스크를 종료하면 되돌릴 수 없어요!');
    openModal();
  };

  return (
    <TaskDetailPopupStyled source={require('~/assets/images/popup_task_detail.png')} resizeMode="cover">
      <TaskDetailPopupButton onPress={handleCancelButtonClick}>
        <TaskDetailPopupButtonImage source={require('~/assets/images/button_cancel.png')} />
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY_L}>
          취소
        </CustomText>
      </TaskDetailPopupButton>
      <TaskDetailPopupButton onPress={handleDelayButtonClick}>
        <TaskDetailPopupButtonImage source={require('~/assets/images/button_delay.png')} />
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY_L}>
          미루기
        </CustomText>
      </TaskDetailPopupButton>
      <TaskDetailPopupButton onPress={handleEditButtonClick}>
        <TaskDetailPopupButtonImage source={require('~/assets/images/button_edit.png')} />
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY_L}>
          수정
        </CustomText>
      </TaskDetailPopupButton>
      <TaskDetailPopupButton onPress={handleDeleteButtonClick}>
        <TaskDetailPopupButtonImage source={require('~/assets/images/button_delete.png')} />
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY_L}>
          삭제
        </CustomText>
      </TaskDetailPopupButton>
      <CustomModal
        isVisible={isModalVisible}
        onClose={closeModal}
        content={modalContent}
        subContent={modalSubContent}
        leftButtonText="취소"
        onLeftButtonClick={() => {
          setModalContent('');
          setModalSubContent('');
          closeModal();
        }}
        rightButtonText="확인"
        onRightButtonClick={() => {
          closeModal();
        }}
      />
    </TaskDetailPopupStyled>
  );
};

const TaskDetailPopupStyled = styled.ImageBackground`
  width: 260px;
  height: 87px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 60px;
  right: -10px;
  padding-top: 2px;
  z-index: 100;
`;

const TaskDetailPopupButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: 0 12px;
`;

const TaskDetailPopupButtonImage = styled.Image`
  margin-bottom: 3px;
`;

export default TaskDetailPopup;

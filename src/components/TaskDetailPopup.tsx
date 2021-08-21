import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React from 'react';

import CustomModal from './CustomModal';

import { RoutineAPI, useMonthlyTasks } from '~/apis/routinAPI';
import CustomText from '~/components/CustomText';
import useModal from '~/hooks/useModal';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore, { RADIO_TYPE } from '~/stores/CalendarStore';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';
import { showToast } from '~/utils/showToast';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  taskId: string;
  isDelay: boolean;
  completedCount: number;
}

const TaskDetailPopup = observer(({ navigation, taskId, isDelay, completedCount }: Props) => {
  const { data, error, revalidate } = useMonthlyTasks({
    month: CalendarStore.month.toString(),
    year: CalendarStore.tempYear.toString(),
  });

  const { isVisible: isModalVisible, openModal, closeModal } = useModal();

  const handleCancelButtonClick = async () => {
    try {
      await RoutineAPI.instance().backTask(taskId, CalendarStore.focusDay.format('YYYYMMDD'));
      revalidate();
      closeModal();
    } catch (e) {
      showToast(e);
    }
  };

  const handleDelayButtonClick = () => {
    console.log(taskId, ' : delay');
  };

  const handleEditButtonClick = () => {
    navigation.navigate('EditTask', { templateTask: null, taskId: taskId });
  };

  const handleDeleteButtonClick = () => {
    openModal();
  };

  const handleModalDeleteClick = () => {
    RoutineAPI.instance().deleteTask(taskId);
    closeModal();
  };

  const handleModalCancelClick = () => {
    closeModal();
  };

  return (
    <TaskDetailPopupStyled
      check={(completedCount === 0 && !isDelay) || CalendarStore.radio === RADIO_TYPE.리포트}
      source={
        (completedCount === 0 && !isDelay) || CalendarStore.radio === RADIO_TYPE.리포트
          ? require('~/assets/images/popup_task_detail_2.png')
          : require('~/assets/images/popup_task_detail_3.png')
      }
      resizeMode="cover">
      {CalendarStore.radio === RADIO_TYPE.루틴 && completedCount > 0 && (
        <TaskDetailPopupButton onPress={handleCancelButtonClick}>
          <TaskDetailPopupButtonImage source={require('~/assets/images/button_cancel.png')} />
          <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY_L}>
            되돌리기
          </CustomText>
        </TaskDetailPopupButton>
      )}
      {CalendarStore.radio === RADIO_TYPE.루틴 && completedCount === 0 && isDelay && (
        <TaskDetailPopupButton onPress={handleDelayButtonClick}>
          <TaskDetailPopupButtonImage source={require('~/assets/images/button_delay.png')} />
          <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY_L}>
            미루기
          </CustomText>
        </TaskDetailPopupButton>
      )}
      <TaskDetailPopupButton onPress={handleEditButtonClick}>
        <TaskDetailPopupButtonImage source={require('~/assets/images/button_edit.png')} />
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY_L}>
          수정
        </CustomText>
      </TaskDetailPopupButton>
      <TaskDetailPopupButton onPress={handleDeleteButtonClick}>
        <TaskDetailPopupButtonImage source={require('~/assets/images/button_delete.png')} />
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY_L}>
          종료
        </CustomText>
      </TaskDetailPopupButton>
      <CustomModal
        isVisible={isModalVisible}
        onClose={closeModal}
        content="태스크를 종료하시겠어요?"
        subContent="태스크를 종료하면 되돌릴 수 없어요!"
        leftButtonText="취소"
        onLeftButtonClick={handleModalDeleteClick}
        rightButtonText="확인"
        onRightButtonClick={handleModalCancelClick}
      />
    </TaskDetailPopupStyled>
  );
});

const TaskDetailPopupStyled = styled.ImageBackground<{ check: boolean }>`
  width: ${({ check }) => (check ? 150 : 205) + 'px'};
  height: 85px;
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

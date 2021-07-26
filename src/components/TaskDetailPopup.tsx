import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import CustomText from '~/components/CustomText';
import { RootStackParamList } from '~/navigations/types';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  id: number;
  navigation: StackNavigationProp<RootStackParamList>;
}

const TaskDetailPopup = ({ id, navigation }: Props) => {
  const handleCancelButtonClick = () => {
    console.log(id, ' : cancel');
  };

  const handleDelayButtonClick = () => {
    console.log(id, ' : delay');
  };

  const handleEditButtonClick = () => {
    console.log(id, ' : edit');
    navigation.navigate('EditTask', { taskId: id });
  };

  const handleDeleteButtonClick = () => {
    console.log(id, ' : delete');
  };

  return (
    <TaskDetailPopupStyled source={require('~/assets/images/popup_task_detail.png')} resizeMode="cover">
      <TaskDetailPopupButton onPress={handleCancelButtonClick}>
        <TaskDetailPopupButtonImage source={require('~/assets/images/button_cancel.png')} />
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY}>
          취소
        </CustomText>
      </TaskDetailPopupButton>
      <TaskDetailPopupButton onPress={handleDelayButtonClick}>
        <TaskDetailPopupButtonImage source={require('~/assets/images/button_delay.png')} />
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY}>
          미루기
        </CustomText>
      </TaskDetailPopupButton>
      <TaskDetailPopupButton onPress={handleEditButtonClick}>
        <TaskDetailPopupButtonImage source={require('~/assets/images/button_edit.png')} />
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY}>
          수정
        </CustomText>
      </TaskDetailPopupButton>
      <TaskDetailPopupButton onPress={handleDeleteButtonClick}>
        <TaskDetailPopupButtonImage source={require('~/assets/images/button_delete.png')} />
        <CustomText font={FontType.MEDIUM_CAPTION} color={TextColor.PRIMARY}>
          삭제
        </CustomText>
      </TaskDetailPopupButton>
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

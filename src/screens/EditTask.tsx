import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import React from 'react';

import CustomModal from '~/components/CustomModal';
import CustomText from '~/components/CustomText';
import useModal from '~/hooks/useModal';
import { RootStackParamList } from '~/navigations/types';
import { TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

interface EditTaskScreenProps {
  route: RouteProp<RootStackParamList, 'EditTask'>;
}

const EditTask = ({ route }: EditTaskScreenProps) => {
  const { taskId } = route.params;
  const { isVisible: isModalVisible, openModal, closeModal } = useModal();

  console.log(taskId);

  const handleEditSubmitClick = () => {
    openModal();
  };

  const handleShowMyTaskButtonClick = () => {
    console.log('show task');
    closeModal();
  };

  const handleKeepAddingButtonClick = () => {
    console.log('keep adding');
    closeModal();
  };

  return (
    <>
      <EditTaskStyled>
        <EditTaskView>
          <EditSettingView>
            <TitleSettingView>
              <CustomText font={FontType.BOLD_TITLE_01} color={TextColor.PRIMARY}>
                아침 명상하기
              </CustomText>
            </TitleSettingView>
            <TimeSettingView>
              <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY}>
                시간 설정
              </CustomText>
            </TimeSettingView>
            <AddSettingView>
              <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY}>
                부가 설정
              </CustomText>
            </AddSettingView>
          </EditSettingView>
          <EditSubmitButton onPress={() => handleEditSubmitClick()}>
            <CustomText font={FontType.BOLD_LARGE} color={TextColor.WHITE} align={Align.CENTER}>
              추가하기
            </CustomText>
          </EditSubmitButton>
        </EditTaskView>
      </EditTaskStyled>
      <CustomModal
        isVisible={isModalVisible}
        onClose={closeModal}
        content={'테스크 추가가\n완료되었습니다.'}
        leftButtonText="내 테스크 보기"
        onLeftButtonClick={handleShowMyTaskButtonClick}
        rightButtonText="계속 추가하기"
        onRightButtonClick={handleKeepAddingButtonClick}
      />
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

const EditTaskView = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
`;

const EditSettingView = styled.View`
  margin-top: 26px;
`;

const TitleSettingView = styled.View``;

const TimeSettingView = styled.View`
  padding-top: 40px;
`;

const AddSettingView = styled.View`
  padding-top: 40px;
`;

const EditSubmitButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #513de5;
  border-radius: 8px;
  padding: 12px 0;
`;

export default EditTask;

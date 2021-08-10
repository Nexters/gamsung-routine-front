import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';

import { useUserProfileData } from '~/apis/authAPI';
import { AlarmSettingCard } from '~/components/AlarmSettingCard';
import CustomModal from '~/components/CustomModal';
import CustomText from '~/components/CustomText';
import CustomTextInput from '~/components/CustomTextInput';
import { DailyLoopCard } from '~/components/DailyLoopCard';
import { FriendInviteCard } from '~/components/FriendInviteCard';
import { TimeSettingCard } from '~/components/TimeSettingCard';
import { WeekLoopCard } from '~/components/WeekLoopCard';
import useModal from '~/hooks/useModal';
import useModalContent from '~/hooks/useModalContent';
import { RootStackParamList } from '~/navigations/types';
import { EditTaskStore } from '~/stores/EditTaskStore';
import { ActionColor, TextColor } from '~/utils/color';
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

  const handleRightButtonClick = () => {
    switch (modalType) {
      case 'SAVE': {
        handleKeepAddingButtonClick();
        return;
      }
      case 'DELETE': {
        vm.onTaskEnd();
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
  };

  return (
    <>
      <EditTaskStyled>
        <ScrollView style={{ width: '100%', height: '100%', marginBottom: 100 }}>
          <EditTaskView>
            <EditSettingView>
              <TitleSettingView>
                {vm.editableTitle ? (
                  <CustomTextInput
                    onChangeText={handleChangeTaskName}
                    value={vm.taskName}
                    placeHolder="태스크 명을 입력해주세요."
                    font={FontType.BOLD_TITLE_01}
                    color={TextColor.PRIMARY_L}
                  />
                ) : (
                  <CustomText font={FontType.BOLD_TITLE_01} color={TextColor.PRIMARY_L}>
                    {vm.taskName}
                  </CustomText>
                )}
              </TitleSettingView>
              <TimeSettingView>
                <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY_L} marginBottom={8}>
                  시간 설정
                </CustomText>
                <WeekLoopCard days={vm.days} onDayPress={handleDaySelect} marginTop={8} />
                <DailyLoopCard marginTop={16} onSelectCountOfDay={handleCountOfDay} />
                <TimeSettingCard
                  marginTop={16}
                  timeSettingData={vm.times}
                  onChangeTimeSettingData={handleChangeTimeData}
                />
              </TimeSettingView>
              <AddSettingView>
                <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY_L} marginBottom={8}>
                  부가 설정
                </CustomText>
                <AlarmSettingCard onChangeAlarm={handleChangeAlarm} marginTop={8} />
              </AddSettingView>
              {vm.isEditMode && (
                <>
                  <AddPartyView>
                    <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY_L}>
                      파티원 설정
                    </CustomText>
                    <FriendInviteCard
                      friends={[
                        { id: 1, name: '김헌진' },
                        { id: 2, name: '김헌진' },
                      ]}
                      marginTop={16}
                    />
                  </AddPartyView>
                  <FinishTaskTextButton onPress={handleEndTaskClick}>
                    <CustomText font={FontType.MEDIUM_BODY_02} color={TextColor.RED}>
                      테스크 종료
                    </CustomText>
                  </FinishTaskTextButton>
                </>
              )}
            </EditSettingView>
          </EditTaskView>
        </ScrollView>
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

const AddPartyView = styled.View`
  padding-top: 40px;
`;

const FinishTaskTextButton = styled.TouchableOpacity`
  padding-top: 40px;
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

export default observer(EditTask);

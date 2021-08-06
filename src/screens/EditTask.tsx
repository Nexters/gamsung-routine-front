import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';

import { EditTaskVM } from './vm/editTaskVM';

import { AlarmSettingCard } from '~/components/AlarmSettingCard';
import CustomModal from '~/components/CustomModal';
import CustomText from '~/components/CustomText';
import CustomTextInput from '~/components/CustomTextInput';
import { DailyLoopCard } from '~/components/DailyLoopCard';
import { TimeSettingCard } from '~/components/TimeSettingCard';
import { WeekLoopCard } from '~/components/WeekLoopCard';
import useModal from '~/hooks/useModal';
import { RootStackParamList } from '~/navigations/types';
import { ActionColor, TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';

interface EditTaskScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'EditTask'>;
}

const EditTask = ({ route, navigation }: EditTaskScreenProps) => {
  const { taskId, taskName } = route.params;
  const { isVisible: isModalVisible, openModal, closeModal } = useModal();

  const [vm] = useState(new EditTaskVM(taskId?.toString() ?? null, taskName ?? ''));

  const handleDaySelect = (id: number) => {
    vm.onSelectDay(id);
  };

  const handleEditSubmitClick = () => {
    vm.onSave();
    openModal();
  };

  const handleShowMyTaskButtonClick = () => {
    navigation.pop(3);
    closeModal();
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

  return (
    <>
      <EditTaskStyled>
        <ScrollView style={{ width: '100%', height: '100%', marginBottom: 70 }}>
          <EditTaskView>
            <EditSettingView>
              <TitleSettingView>
                {vm.editableTitle ? (
                  <CustomTextInput
                    onChangeText={handleChangeTaskName}
                    value={vm.taskName}
                    placeHolder="태스크 명을 입력해주세요."
                    font={FontType.BOLD_TITLE_01}
                  />
                ) : (
                  <CustomText font={FontType.BOLD_TITLE_01} color={TextColor.PRIMARY_L}>
                    {vm.taskName}
                  </CustomText>
                )}
              </TitleSettingView>
              <TimeSettingView>
                <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY_L}>
                  시간 설정
                </CustomText>
                <WeekLoopCard days={vm.days} onDayPress={handleDaySelect} />
                <DailyLoopCard marginTop={16} onSelectCountOfDay={handleCountOfDay} />
                <TimeSettingCard
                  marginTop={16}
                  timeSettingData={vm.times}
                  onChangeTimeSettingData={handleChangeTimeData}
                />
              </TimeSettingView>
              <AddSettingView>
                <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY_L}>
                  부가 설정
                </CustomText>
                <AlarmSettingCard onChangeAlarm={handleChangeAlarm} />
              </AddSettingView>
            </EditSettingView>
          </EditTaskView>
        </ScrollView>
        <EditSubmitButton onPress={handleEditSubmitClick}>
          <CustomText font={FontType.BOLD_LARGE} color={TextColor.PRIMARY_D} align={Align.CENTER}>
            추가하기
          </CustomText>
        </EditSubmitButton>
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
  justify-content: center;
  align-items: center;
  background-color: ${ActionColor.ACTIVE};
  border-radius: 8px;
  padding: 12px 0;
  left: 20px;
  right: 20px;
  position: absolute;
  bottom: 34px;
`;

export default observer(EditTask);

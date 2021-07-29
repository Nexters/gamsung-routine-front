import styled from '@emotion/native';
import { RouteProp, StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { AlarmSettingCard } from '~/components/AlarmSettingCard';

import CustomModal from '~/components/CustomModal';
import CustomText from '~/components/CustomText';
import { DailyLoopCard } from '~/components/DailyLoopCard';
import { TimeSettingCard } from '~/components/TimeSettingCard';
import { WeekLoopCard } from '~/components/WeekLoopCard';
import useModal from '~/hooks/useModal';
import { RootStackParamList } from '~/navigations/types';
import { TextColor } from '~/utils/color';
import { Align, FontType } from '~/utils/font';
import { EditTaskVM } from './vm/editTaskVM';

interface EditTaskScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'EditTask'>;
}

const EditTask = ({ route, navigation }: EditTaskScreenProps) => {
  const { taskId, taskName } = route.params;
  const { isVisible: isModalVisible, openModal, closeModal } = useModal();

  const [vm] = useState(new EditTaskVM(taskId, taskName));

  const handleDaySelect = (id: number) => {
    vm.onSelectDay(id);
  };

  const handleEditSubmitClick = () => {
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

  return (
    <>
      <EditTaskStyled>
        <ScrollView style={{ width: '100%', height: '100%' }}>
          <EditTaskView>
            <EditSettingView>
              <TitleSettingView>
                <CustomText font={FontType.BOLD_TITLE_01} color={TextColor.PRIMARY}>
                  {vm.taskName}
                </CustomText>
              </TitleSettingView>
              <TimeSettingView>
                <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY}>
                  시간 설정
                </CustomText>
                <WeekLoopCard days={vm.day} onDayPress={handleDaySelect} />
                <DailyLoopCard marginTop={16} onSelectCountOfDay={handleCountOfDay} />
                <TimeSettingCard marginTop={16} timeSettingData={vm.timeSettingData} />
              </TimeSettingView>
              <AddSettingView>
                <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY}>
                  부가 설정
                </CustomText>
                <AlarmSettingCard />
              </AddSettingView>
            </EditSettingView>
            <EditSubmitButton onPress={() => handleEditSubmitClick()}>
              <CustomText font={FontType.BOLD_LARGE} color={TextColor.WHITE} align={Align.CENTER}>
                추가하기
              </CustomText>
            </EditSubmitButton>
          </EditTaskView>
        </ScrollView>
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
  margin-top: 34px;
  margin-bottom: 34px;
`;

export default observer(EditTask);

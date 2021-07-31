import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { useUserProfileData } from '~/apis/authAPI';
import Calendar from '~/components/Calendar';
import CustomText from '~/components/CustomText';
import Icon from '~/components/Icon';
import TaskListView from '~/components/TaskListView';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore from '~/stores/CalendarStore';
import HomeStore from '~/stores/HomeStore';
import { ActionColor, BackgroundColor, SurfaceColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

export interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Home = ({ navigation }: HomeScreenProps) => {
  const totalPercent = 30;

  const { data, error } = useUserProfileData();
  console.log('useUserProfileData', data?.data.name, error);

  const [isVisiblePopup, setIsVisiblePopup] = useState<number | null>(null);

  const handleToggleTask = (id: number) => {
    setIsVisiblePopup(null);
    HomeStore.actionTask(id);
  };

  const handlePopupClick = (id: number | null) => {
    setIsVisiblePopup(isVisiblePopup === id ? null : id);
  };

  return (
    <>
      <TopStatusBarStyled backgroundColor={BackgroundColor.DEPTH2_D} />
      <StatusBar barStyle="light-content" />
      <HomeStyled>
        <Calendar />
        <HomeView>
          <TaskView>
            <DropView onPress={() => CalendarStore.changeIsWeek(!CalendarStore.isWeek)}>
              {CalendarStore.isWeek ? <Icon type={'DROP'} /> : <Icon type={'TAKE'} />}
            </DropView>
            <TaskTitleView>
              <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_L}>
                내 하루 테스크{' '}
                <CustomText font={FontType.BOLD_BODY_02} color={TextColor.HIGHLIGHT}>
                  {HomeStore.taskList.length}
                </CustomText>
              </CustomText>
              <CustomText font={FontType.BOLD_BODY_02} color={TextColor.PRIMARY_L}>
                {totalPercent}% 달성
              </CustomText>
            </TaskTitleView>
            <TaskListView
              navigation={navigation}
              taskList={HomeStore.taskList}
              onToggleTask={handleToggleTask}
              isVisiblePopup={isVisiblePopup}
              onPopupClick={handlePopupClick}
            />
          </TaskView>
        </HomeView>
        <AddTaskButton
          onPress={() => {
            setIsVisiblePopup(null);
            navigation.navigate('TemplateList');
          }}>
          <Icon type={'PLUS'} />
        </AddTaskButton>
      </HomeStyled>
    </>
  );
};

const TopStatusBarStyled = styled.SafeAreaView<{ backgroundColor: string }>`
  flex: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const HomeStyled = styled.SafeAreaView`
  flex: 1;
  background-color: ${SurfaceColor.DEPTH2_L};
`;

const HomeView = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: auto;
  background-color: ${BackgroundColor.DEPTH2_D};
`;

const TaskView = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 20px;
  background-color: ${SurfaceColor.DEPTH2_L};
  border-radius: 20px 20px 0 0;
`;

const DropView = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

const TaskTitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const AddTaskButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 24px;
  bottom: 30px;
  background-color: ${ActionColor.ACTIVE};
  border-radius: 64px;
  z-index: 5;
`;

export default observer(Home);

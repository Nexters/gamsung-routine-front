import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { useUserProfileData } from '~/apis/authAPI';
import { useMonthlyTasks } from '~/apis/routinAPI';
import Calendar from '~/components/Calendar';
import CustomText from '~/components/CustomText';
import Icon from '~/components/Icon';
import TaskListView from '~/components/TaskListView';
import { Task } from '~/models/Task';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore, { RADIO_TYPE } from '~/stores/CalendarStore';
import HomeStore from '~/stores/HomeStore';
import { ActionColor, BackgroundColor, SurfaceColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

export interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Home = ({ navigation }: HomeScreenProps) => {
  const { data, error } = useUserProfileData();
  console.log('useUserProfileData', data, error);

  const { data: TaskList } = useMonthlyTasks({
    profileId: '1',
    month: CalendarStore.month.toString(),
    year: CalendarStore.tempYear.toString(),
  });

  const [isVisiblePopup, setIsVisiblePopup] = useState<string | null>(null);

  const handlePopupClick = (id: string | null) => {
    setIsVisiblePopup(isVisiblePopup === id ? null : id);
  };

  let routine = [] as Task[];
  let percent = 0;
  if (CalendarStore.radio === RADIO_TYPE.루틴) {
    const today = CalendarStore.focusDay.format('YYYYMMDD');
    routine = TaskList?.dailyRoutines[today] || [];
    const total = routine.reduce(
      (prev, curr) => {
        return {
          completeCount: prev.completeCount + curr.completeCount,
          timesOfDay: prev.timesOfDay + curr.timesOfDay,
        };
      },
      {
        completeCount: 0,
        timesOfDay: 0,
      },
    );
    percent = ((total.completeCount || 0) / (total.timesOfDay || 0) || 0) * 100;
  } else {
    const isSun = CalendarStore.focusDay.format('ddd') === 'Sun';
    const today = CalendarStore.focusDay.add(isSun ? -1 : 0, 'day').day(1);
    const temp = [
      ...(TaskList?.dailyRoutines[today.add(0, 'day').format('YYYYMMDD')] || []),
      ...(TaskList?.dailyRoutines[today.add(1, 'day').format('YYYYMMDD')] || []),
      ...(TaskList?.dailyRoutines[today.add(2, 'day').format('YYYYMMDD')] || []),
      ...(TaskList?.dailyRoutines[today.add(3, 'day').format('YYYYMMDD')] || []),
      ...(TaskList?.dailyRoutines[today.add(4, 'day').format('YYYYMMDD')] || []),
      ...(TaskList?.dailyRoutines[today.add(5, 'day').format('YYYYMMDD')] || []),
      ...(TaskList?.dailyRoutines[today.add(6, 'day').format('YYYYMMDD')] || []),
    ];
    const total = temp.reduce(
      (prev, curr) => {
        return {
          completeCount: prev.completeCount + curr.completeCount,
          timesOfDay: prev.timesOfDay + curr.timesOfDay,
        };
      },
      {
        completeCount: 0,
        timesOfDay: 0,
      },
    );
    percent = ((total?.completeCount || 0) / (total?.timesOfDay || 0) || 0) * 100;
    routine = temp.reduce((unique, item, currentIndex) => {
      const index = temp.findIndex((t) => {
        return t.id === item.id;
      });
      if (currentIndex === index) {
        return [...unique, item];
      }
      return [];
    }, [] as Task[]);
  }

  const handleToggleTask = (id: string) => {
    setIsVisiblePopup(null);
    if (!routine) {
      return;
    }
    const task = routine?.find((t) => {
      return id === t.id;
    });
    if (!task) {
      return;
    }
    HomeStore.actionTask(task);
  };

  return (
    <>
      <TopStatusBarStyled backgroundColor={BackgroundColor.DEPTH2_D} />
      <StatusBar barStyle="light-content" />
      <HomeStyled>
        <Calendar navigation={navigation} />
        <HomeView>
          <TaskView>
            <DropView onPress={() => CalendarStore.changeIsWeek(!CalendarStore.isWeek)}>
              {CalendarStore.isWeek ? <Icon type={'DROP'} /> : <Icon type={'TAKE'} />}
            </DropView>
            <TaskTitleView>
              <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_L}>
                내 하루 테스크{' '}
                <CustomText font={FontType.BOLD_BODY_02} color={TextColor.HIGHLIGHT}>
                  {routine?.length || 0}
                </CustomText>
              </CustomText>
              <CustomText font={FontType.BOLD_BODY_02} color={TextColor.PRIMARY_L}>
                {percent}% 달성
              </CustomText>
            </TaskTitleView>
            <TaskListView
              navigation={navigation}
              taskList={routine || []}
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

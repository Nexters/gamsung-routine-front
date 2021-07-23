import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import Calendar from '~/components/Calendar';
import CustomText from '~/components/CustomText';
import TaskListView from '~/components/TaskListView';
import { RootStackParamList } from '~/navigations/types';
import { BackgroundColor, TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

export interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Home = ({ navigation }: HomeScreenProps) => {
  const totalPercent = 30;
  const [taskList, setTaskList] = useState(() => {
    return Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      title: `My Task ${index + 1}`,
      timesOfWeek: 3,
      timesOfDay: 1,
      percent: 15,
      todayOfWeek: {
        count: 3,
        endTasks: ['1'],
      },
      dayOfWeek: [
        {
          count: 3,
          endTasks: ['1', '2'],
        },
        {
          count: 2,
          endTasks: ['1', '2'],
        },
        {
          count: 6,
          endTasks: ['1', '2', '3', '4', '5'],
        },
        {
          count: 8,
          endTasks: ['1'],
        },
        {
          count: 3,
          endTasks: [],
        },
        {
          count: 2,
          endTasks: ['1'],
        },
        {
          count: 0,
          endTasks: [],
        },
      ],
    }));
  });

  const [isVisiblePopup, setIsVisiblePopup] = useState<number | null>(null);

  const handleToggleTask = (id: number) => {
    setIsVisiblePopup(null);
    setTaskList((oldTaskList) =>
      oldTaskList.filter((task, _) => {
        if (task.id === id) {
          task.todayOfWeek.endTasks.length > 0 &&
            task.todayOfWeek.count > task.todayOfWeek.endTasks.length &&
            task.todayOfWeek.endTasks.push('3');
        }
        return task;
      }),
    );
  };

  const handlePopupClick = (id: number | null) => {
    setIsVisiblePopup(isVisiblePopup === id ? null : id);
  };

  return (
    <>
      <TopStatusBarStyled backgroundColor={BackgroundColor.SECONDARY} />
      <StatusBar barStyle="light-content" />
      <HomeStyled>
        <Calendar />
        <HomeView>
          <TaskView>
            <DropView>
              <DropIcon source={require('~/assets/icons/icon_drop.png')} />
            </DropView>
            <TaskTitleView>
              <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.SECONDARY}>
                내 하루 테스크{' '}
                <CustomText font={FontType.BOLD_BODY_02} color={TextColor.MAIN}>
                  {taskList.length}
                </CustomText>
              </CustomText>
              <CustomText font={FontType.BOLD_BODY_02} color={TextColor.PRIMARY}>
                {totalPercent}% 달성
              </CustomText>
            </TaskTitleView>
            <TaskListView
              taskList={taskList}
              onToggleTask={handleToggleTask}
              isVisiblePopup={isVisiblePopup}
              onPopupClick={handlePopupClick}
            />
          </TaskView>
        </HomeView>
        <AddTaskButton
          onPress={() => {
            setIsVisiblePopup(null);
            navigation.navigate('AddTask');
          }}>
          <CustomText color={TextColor.WHITE} font={FontType.REGULAR_HEAD_01}>
            +
          </CustomText>
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
  background-color: #f2f2f4;
`;

const HomeView = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: auto;
  background-color: #292c34;
`;

const TaskView = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 20px;
  background-color: #f2f2f4;
  border-radius: 20px 20px 0 0;
`;

const DropView = styled.View`
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

const DropIcon = styled.Image`
  width: 14px;
  height: 6px;
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
  background-color: #513de5;
  border-radius: 64px;
  z-index: 5;
`;

export default Home;

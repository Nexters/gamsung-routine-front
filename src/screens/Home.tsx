import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import { RoutineAPI, useMonthlyTasks } from '~/apis/routinAPI';
import castle from '~/assets/lottie/castle.json';
import crown from '~/assets/lottie/crown.json';
import Calendar from '~/components/Calendar';
import CustomModal from '~/components/CustomModal';
import Icon from '~/components/Icon';
import Onboarding2 from '~/components/Onboarding2';
import TaskView from '~/components/TaskView';
import useModal from '~/hooks/useModal';
import { Task } from '~/models/Task';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore, { RADIO_TYPE } from '~/stores/CalendarStore';
import { ActionColor, BackgroundColor, SurfaceColor } from '~/utils/color';
import { showToast } from '~/utils/showToast';

export interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Home = ({ navigation }: HomeScreenProps) => {
  const { data: TaskList, revalidate } = useMonthlyTasks({
    month: CalendarStore.month.toString(),
    year: CalendarStore.tempYear.toString(),
  });

  const { isVisible: isModalVisible, openModal, closeModal } = useModal();
  const [endTaskDay, setEndTaskDay] = useState(false);

  const [visiblePopup, setVisiblePopup] = useState<string | null>(null);

  const handlePopupClick = (id: string | null) => {
    setVisiblePopup(visiblePopup === id ? null : id);
  };

  let routine = [] as Task[];
  let percent = 0;
  if (CalendarStore.radio === RADIO_TYPE.루틴) {
    const today = CalendarStore.focusDay.format('YYYYMMDD');
    routine = TaskList?.dailyRoutines[today] || [];

    const total = routine.reduce(
      (prev, curr) => {
        return {
          completeCount: prev.completeCount + curr.completedDateList.length,
          timesOfDay: prev.timesOfDay + curr.timesOfDay,
        };
      },
      {
        completeCount: 0,
        timesOfDay: 0,
      },
    );

    percent = ((total.completeCount || 0) / (total.timesOfDay || 0) || 0) * 100;

    // RADIO_TYPE.리포트 일 때
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
          completeCount: prev.completeCount + curr.completedDateList.length,
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
        return t.taskId === item.taskId;
      });
      if (currentIndex === index) {
        return [...unique, item];
      }
      return unique;
    }, [] as Task[]);
  }

  const handleToggleTask = async (taskId: string) => {
    setVisiblePopup(null);
    if (!routine) {
      return;
    }
    try {
      const focusDay = CalendarStore.focusDay.format('YYYYMMDD');
      await RoutineAPI.instance().completeTask(taskId, focusDay);

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
          if (curr.taskId !== taskId) {
            return prev;
          }
          return {
            completeCount: prev.completeCount + curr.completedDateList.length,
            timesOfDay: prev.timesOfDay + curr.timesOfDay,
          };
        },
        {
          completeCount: 0,
          timesOfDay: 0,
        },
      );
      percent = (((total?.completeCount || 0) + 1) / (total?.timesOfDay || 0) || 0) * 100;
      if (percent === 100) {
        setEndTaskDay(false);
        openModal();
      } else {
        routine.map((task) => {
          if (task.taskId === taskId && task.timesOfDay === (task.completedDateList?.length || 0) + 1) {
            setEndTaskDay(true);
            openModal();
          }
        });
      }

      revalidate();
    } catch (e) {
      showToast(e);
    }
  };

  return (
    <>
      <Onboarding2 />
      <TopStatusBarStyled backgroundColor={BackgroundColor.DEPTH2_D} />
      <StatusBar barStyle="light-content" backgroundColor={BackgroundColor.DEPTH2_D} />
      <HomeStyled>
        <GestureRecognizer
          style={{ backgroundColor: 'red', flex: 1 }}
          onSwipeUp={() => {
            CalendarStore.changeIsWeek(true);
          }}
          onSwipeDown={() => {
            CalendarStore.changeIsWeek(false);
          }}>
          <HomeWithoutStyled onPress={() => setVisiblePopup(null)}>
            <HomeView>
              <Calendar navigation={navigation} />
              <TaskViewStyled>
                <DropView
                  onPress={() => {
                    CalendarStore.changeIsWeek(!CalendarStore.isWeek);
                    setVisiblePopup(null);
                  }}>
                  {CalendarStore.isWeek ? <Icon type={'DROP'} /> : <Icon type={'TAKE'} />}
                </DropView>
                <TaskView
                  navigation={navigation}
                  routine={routine}
                  percent={percent}
                  onToggleTask={handleToggleTask}
                  visiblePopup={visiblePopup}
                  onPopupClick={handlePopupClick}
                />
              </TaskViewStyled>
            </HomeView>
          </HomeWithoutStyled>
        </GestureRecognizer>
        <AddTaskButton
          onPress={() => {
            setVisiblePopup(null);
            navigation.navigate('TemplateList');
          }}>
          <Icon type={'PLUS'} />
        </AddTaskButton>
      </HomeStyled>
      <CustomModal
        isVisible={isModalVisible}
        onClose={closeModal}
        subContent={
          endTaskDay ? `오늘 테스크를 ${'\n'} 모두 달성했어요!` : `이 테스크를 이번주에 ${'\n'} 모두 달성했어요!`
        }
        noneTitle={true}
        modalImage={
          endTaskDay ? (
            <LottieView style={{ width: 120, height: 100 }} source={crown} autoPlay loop />
          ) : (
            <LottieView style={{ width: 120, height: 100 }} source={castle} autoPlay loop />
          )
        }
        rightButtonText="확인"
        onRightButtonClick={() => closeModal()}
      />
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

const HomeWithoutStyled = styled.TouchableWithoutFeedback`
  flex: 1;
`;

const HomeView = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: auto;
  background-color: ${BackgroundColor.DEPTH2_D};
`;

const TaskViewStyled = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 20px;
  background-color: ${SurfaceColor.DEPTH2_L};
  border-radius: 20px 20px 0 0;
`;

const DropView = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 25px;
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

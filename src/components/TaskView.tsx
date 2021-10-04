import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import CustomText from '~/components/CustomText';
import Loading from '~/components/Loading';
import TaskListView from '~/components/TaskListView';
import { loading } from '~/hocs/loading';
import { Task } from '~/models/Task';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore from '~/stores/CalendarStore';
import IndicatorStore from '~/stores/IndicatorStore';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  routine: Task[];
  percent: number;
  onToggleTask: (taskId: string) => void;
  visiblePopup: string | null;
  onPopupClick: (id: string | null) => void;
  dailyRoutines: {
    [key: string]: Task[];
  } | null;
  revalidate: () => Promise<boolean>;
}

const TaskView = ({
  navigation,
  routine,
  percent,
  onToggleTask,
  visiblePopup,
  onPopupClick,
  dailyRoutines,
  revalidate,
}: Props) => {
  const handleToggleTask = (taskId: string) => {
    onToggleTask(taskId);
  };

  const handlePopupClick = (id: string | null) => {
    onPopupClick(id);
  };

  return (
    <>
      <TaskTitleView>
        <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_L}>
          {`${CalendarStore.focusDay.format('M월 D일')} 테스크 `}
        </CustomText>
        <CustomText font={FontType.BOLD_BODY_02} color={TextColor.HIGHLIGHT}>
          {routine?.length || 0}
        </CustomText>
        <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_L}>
          개의 달성률{' '}
        </CustomText>
        <CustomText font={FontType.BOLD_BODY_02} color={TextColor.HIGHLIGHT}>
          {percent.toFixed(0)}
        </CustomText>
        <CustomText font={FontType.REGULAR_BODY_02} color={TextColor.PRIMARY_L}>
          % 입니다.
        </CustomText>
      </TaskTitleView>
      <TaskListView
        navigation={navigation}
        taskList={routine || []}
        onToggleTask={handleToggleTask}
        visiblePopup={visiblePopup}
        onPopupClick={handlePopupClick}
        dailyRoutines={dailyRoutines}
        revalidate={revalidate}
      />
    </>
  );
};

const TaskTitleView = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export default loading(TaskView, () => IndicatorStore.count > 0, <Loading />);

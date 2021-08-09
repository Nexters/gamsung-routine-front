import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';

import CustomText from './CustomText';

import TaskListItem from '~/components/TaskListItem';
import { Task } from '~/models/Task';
import { RootStackParamList } from '~/navigations/types';
import CalendarStore from '~/stores/CalendarStore';
import { Align, FontType } from '~/utils/font';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  taskList: Task[];
  onToggleTask: (id: string) => void;
  isVisiblePopup: string | null;
  onPopupClick: (id: string) => void;
}

const TaskListView = ({ taskList, onToggleTask, isVisiblePopup, onPopupClick, navigation }: Props) => {
  const handleMoreButtonClick = (id: string) => {
    onPopupClick(id);
  };

  return (
    <>
      {taskList.length > 0 && (
        <TaskListViewStyled>
          {taskList.map((task, index) => {
            return (
              // TODO: delay (미뤄진 상태인지에 대한 여부), isDelay (미룰 수 있는지에 대한 여부) 값 연동 필요
              <TaskListItem
                navigation={navigation}
                layerIndex={index}
                totalCount={taskList?.length}
                key={index}
                taskId={task.taskId}
                title={task.title}
                timesOfWeek={task.timesOfWeek}
                timesOfDay={task.timesOfDay}
                completedDateList={task.completedDateList}
                days={task.days}
                delay={false}
                isDelay={true}
                percent={(task.completeCount || 0) / (task.timesOfDay || 0) || 0}
                share={false}
                shareCount={3}
                shareFinishedCount={0}
                sharePeople={['1', '2', '3']}
                sharePercent={30}
                onTaskItemClick={(id: string) => onToggleTask(id)}
                isVisiblePopup={isVisiblePopup}
                onMoreButtonClick={handleMoreButtonClick}
              />
            );
          })}
        </TaskListViewStyled>
      )}
      {taskList.length === 0 && (
        <EmptyView>
          {CalendarStore.isWeek && (
            <View style={{ width: 200, height: 200, backgroundColor: 'red', marginBottom: 8 }} />
          )}
          <CustomText font={FontType.BOLD_LARGE} align={Align.CENTER}>
            루틴이 없어요{'\n'}테스크를 추가해보세요.
          </CustomText>
        </EmptyView>
      )}
    </>
  );
};

const TaskListViewStyled = styled.ScrollView`
  margin-top: 20px;
`;

const EmptyView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default observer(TaskListView);

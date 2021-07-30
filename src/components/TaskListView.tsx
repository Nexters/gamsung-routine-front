import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import CustomText from './CustomText';

import TaskListItem from '~/components/TaskListItem';
import { Task } from '~/models/Task';
import { RootStackParamList } from '~/navigations/types';
import { Align, FontType } from '~/utils/font';
import { observer } from 'mobx-react';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  taskList: Task[];
  onToggleTask: (id: number) => void;
  isVisiblePopup: number | null;
  onPopupClick: (id: number) => void;
}

const TaskListView = ({ taskList, onToggleTask, isVisiblePopup, onPopupClick, navigation }: Props) => {
  const handleMoreButtonClick = (id: number) => {
    onPopupClick(id);
  };

  return (
    <>
      {taskList.length > 0 && (
        <TaskListViewStyled>
          {taskList.map((task, index) => {
            return (
              <TaskListItem
                navigation={navigation}
                layerIndex={index}
                totalCount={taskList?.length}
                key={index}
                id={task.id}
                title={task.title}
                timesOfWeek={task.timesOfWeek}
                timesOfDay={task.timesOfDay}
                percent={task.percent}
                todayOfWeek={task.todayOfWeek}
                dayOfWeek={task.dayOfWeek}
                share
                shareCount={3}
                shareFinishedCount={1}
                sharePeople={['1', '2', '3']}
                sharePercent={30}
                onTaskItemClick={(id) => onToggleTask(id)}
                isVisiblePopup={isVisiblePopup}
                onMoreButtonClick={handleMoreButtonClick}
              />
            );
          })}
        </TaskListViewStyled>
      )}
      {taskList.length === 0 && (
        <EmptyView>
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

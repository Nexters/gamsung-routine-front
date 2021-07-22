import styled from '@emotion/native';
import React from 'react';

import CustomText from '~/components/CustomText';
import TaskListItem from '~/components/TaskListItem';
import { Task } from '~/models/Task';
import { FontType, Align } from '~/utils/font';

interface Props {
  taskList: Task[];
  onToggleTask: (id: number) => void;
  isVisiblePopup: number | null;
  onPopupClick: (id: number) => void;
}

const TaskListView = ({ taskList, onToggleTask, isVisiblePopup, onPopupClick }: Props) => {
  const handleMoreButtonClick = (id: number) => {
    onPopupClick?.(id);
  };

  return (
    <TaskListViewStyled>
      {taskList.length > 0 ? (
        taskList.map((task, index) => {
          return (
            <TaskListItem
              layerIndex={index}
              totalCount={taskList?.length}
              key={index}
              listType="week"
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
        })
      ) : (
        <EmptyView>
          <EmptyImage source={require('~/assets/images/empty_monster.png')} />
          <CustomText font={FontType.BOLD_TITLE_02} align={Align.CENTER}>
            루틴이 없어요.{'\n'}루틴을 추가해요.
          </CustomText>
        </EmptyView>
      )}
    </TaskListViewStyled>
  );
};

const TaskListViewStyled = styled.ScrollView`
  margin-top: 20px;
  flex: 1;
`;

const EmptyView = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

const EmptyImage = styled.Image`
  width: 173px;
  height: 98px;
  margin-bottom: 30px;
`;

export default TaskListView;

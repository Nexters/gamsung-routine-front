import styled from '@emotion/native';
import React from 'react';

import CustomText from '~/components/CustomText';
import TaskListItem from '~/components/TaskListItem';
import { TaskType } from '~/screens/AddTask';
import { FontType, Align } from '~/utils/font';

interface Props {
  taskList: TaskType[];
  selectedTasks: TaskType[];
  onToggleTask: (task: TaskType) => void;
}

const TaskListView = (props: Props) => {
  const { taskList, selectedTasks, onToggleTask } = props;

  return (
    <TaskListViewStyled>
      {taskList.length > 0 ? (
        taskList.map((task, index) => {
          const has = selectedTasks.some((selectedTask) => {
            return selectedTask.id === task.id;
          });
          return (
            <TaskListItem
              listType="day"
              taskName={task.taskName}
              has={has}
              share
              shareCount={3}
              shareFinishedCount={1}
              sharePeople={['1', '2', '3']}
              sharePercent={30}
              onTaskItemClick={() => onToggleTask(task)}
              key={index}
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
  padding: 20px 0;
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

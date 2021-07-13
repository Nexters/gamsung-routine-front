import styled from '@emotion/native';
import React from 'react';

import TaskListItem from '~/components/TaskListItem';
import { TaskType } from '~/screens/AddTask';

const TaskListViewStyled = styled.ScrollView`
  padding-bottom: 20px;
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

const EmptyText = styled.Text`
  color: #292c34;
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
`;

interface Props {
  taskList: TaskType[];
  selectedTasks: TaskType[];
  onToggleTask: (task: TaskType) => void;
}

const TaskListView = (props: Props) => {
  const { taskList, selectedTasks, onToggleTask } = props;

  return (
    <TaskListViewStyled>
      {taskList.length ? (
        taskList.map((task, index) => {
          const has = selectedTasks.some((selectedTask) => {
            return selectedTask.id === task.id;
          });
          return <TaskListItem has={has} taskName={task.taskName} onPress={() => onToggleTask(task)} key={index} />;
        })
      ) : (
        <EmptyView>
          <EmptyImage source={require('~/assets/images/empty_monster.png')} />
          <EmptyText>루틴이 없어요.{'\n'}루틴을 추가해요.</EmptyText>
        </EmptyView>
      )}
    </TaskListViewStyled>
  );
};

export default TaskListView;

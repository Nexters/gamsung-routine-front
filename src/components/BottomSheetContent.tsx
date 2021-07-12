import styled from '@emotion/native';
import React, { useMemo } from 'react';

import { ContentScrollView, TaskType } from '../screens/AddTask';

import { RoundedCount } from './RoundedCount';
import { Task } from './Task';

const BottomSheetTitle = styled.View`
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Bar = styled.View`
  width: 60px;
  height: 4px;
  margin: 8px auto 20px;
  background: #d7d9dd;
  border-radius: 20px;
`;

const BottomSheetContentView = styled.View`
  background-color: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid #d7d9dd;
  border-radius: 8px;
`;

const BottomText = styled.Text`
  font-size: 18;
  font-weight: 700;
`;

interface Props {
  selectedTasks: TaskType[];
  onPress: (task: TaskType) => void;
}

export const BottomSheetContent = (props: Props) => {
  const { selectedTasks, onPress } = props;

  const count = useMemo(() => selectedTasks.length, [selectedTasks]);

  return (
    <BottomSheetContentView>
      <Bar />
      <BottomSheetTitle>
        <BottomText>내가 선택한 태스크</BottomText>
        <RoundedCount count={count} />
      </BottomSheetTitle>
      <ContentScrollView>
        {selectedTasks.map((task, index) => {
          return <Task selected={true} key={index} taskName={task.taskName} onClick={() => onPress(task)} />;
        })}
      </ContentScrollView>
    </BottomSheetContentView>
  );
};

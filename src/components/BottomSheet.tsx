import styled from '@emotion/native';
import React, { useMemo } from 'react';

import AddTaskItem from '~/components/AddTaskItem';
import { TaskType } from '~/screens/AddTask';

interface Props {
  selectedTasks: TaskType[];
  onPress: (task: TaskType) => void;
}

const BottomSheet = (props: Props) => {
  const { selectedTasks, onPress } = props;

  const count = useMemo(() => selectedTasks.length, [selectedTasks]);

  return (
    <BottomSheetView>
      <Bar />
      <BottomSheetTitle>
        <BottomText>내가 선택한 태스크</BottomText>
        <BottomSheetCount>
          <BottomSheetCountText>{count}</BottomSheetCountText>
        </BottomSheetCount>
      </BottomSheetTitle>
      <ContentScrollView>
        {selectedTasks.map((task, index) => {
          return <AddTaskItem selected={true} key={index} taskName={task.taskName} onClick={() => onPress(task)} />;
        })}
      </ContentScrollView>
    </BottomSheetView>
  );
};

const ContentScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

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

const BottomSheetView = styled.View`
  background-color: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid #d7d9dd;
  border-radius: 8px;
`;

const BottomText = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;

const BottomSheetCount = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(81, 61, 229, 1);
  justify-content: center;
  align-items: center;
  margin-left: 4px;
`;

const BottomSheetCountText = styled.Text`
  color: #fff;
`;

export default BottomSheet;

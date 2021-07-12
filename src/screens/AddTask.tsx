import styled from '@emotion/native';
import React, { useMemo, useState } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';

import { BottomSheetContent } from '~/components/BottomSheetContent';
import { Task } from '~/components/Task';
import { NavigationProp } from '~/navigations';

export type TaskType = {
  id: number;
  taskName: string;
};

export const ContentScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const AddTaskStyled = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f4;
`;

export const AddTask = ({ navigation }: NavigationProp) => {
  const sheetRef = React.useRef(null);
  const [selectedTasks, setSelectedTasks] = useState<TaskType[]>([]);

  const onPress = (selectedTask: TaskType) => {
    setSelectedTasks((oldSelectedTasks) => {
      const has = oldSelectedTasks.some((task) => {
        return task.id === selectedTask.id;
      });
      if (has) {
        return oldSelectedTasks.filter((task) => {
          return task.id !== selectedTask.id;
        });
      }
      return [...oldSelectedTasks, selectedTask];
    });
  };

  const tempTasks = useMemo(() => {
    return Array.from({ length: 20 }, (_, index) => ({
      id: index,
      taskName: `task${index}`,
    }));
  }, []);

  return (
    <AddTaskStyled>
      <ContentScrollView>
        {tempTasks.map((task, index) => {
          const has = selectedTasks.some((selectedTask) => {
            return selectedTask.id === task.id;
          });
          return <Task selected={has} taskName={task.taskName} onClick={() => onPress(task)} key={index} />;
        })}
      </ContentScrollView>
      <BottomSheet
        ref={sheetRef}
        initialSnap={2}
        snapPoints={['85%', '15%', '15%']}
        borderRadius={8}
        renderContent={() => <BottomSheetContent selectedTasks={selectedTasks} onPress={onPress} />}
        enabledInnerScrolling
      />
    </AddTaskStyled>
  );
};

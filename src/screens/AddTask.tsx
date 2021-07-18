import styled from '@emotion/native';
import React, { useState } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';

import AddTaskItem from '~/components/AddTaskItem';
import BottomSheetContent from '~/components/BottomSheet';
import { Task } from '~/models/Task';
import { AddTaskVM } from '~/screens/addTaskVM';
import { observer } from 'mobx-react';
import { BackgroundColor } from '~/utils/color';
import { SelectCategoryWithTemplate } from '~/components/SelectCategoryWithTemplate';

const AddTask = observer(() => {
  const sheetRef = React.useRef(null);
  const [vm] = useState<AddTaskVM>(new AddTaskVM());
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const onPress = (selectedTask: Task) => {
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

  return (
    <AddTaskStyled>
      {vm.selectedTemplateId === null ? (
        <SelectCategoryWithTemplate vm={vm} />
      ) : (
        <ContentScrollView>
          {vm.templates
            .find((it) => it.id === vm.selectedTemplateId)
            ?.tasks.map((task) => {
              return (
                <AddTaskItem
                  key={task.id}
                  taskName={task.taskName}
                  onClick={() => console.log(`${task.taskName} click`)}
                />
              );
            })}
        </ContentScrollView>
      )}

      {/* 이제 이 페이지에서 사용하지 않는 컴포넌트인데, 혹시 다른 페이지에서 카피해 갈 때 참고용으로 쓰기 위해 임시로 남겨둠 */}
      {false && (
        <BottomSheet
          ref={sheetRef}
          initialSnap={2}
          snapPoints={['85%', '15%', '15%']}
          borderRadius={8}
          renderContent={() => <BottomSheetContent selectedTasks={selectedTasks} onPress={onPress} />}
          enabledInnerScrolling
        />
      )}
    </AddTaskStyled>
  );
});

const ContentScrollView = styled.ScrollView`
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
  background-color: ${BackgroundColor.PRIMARY};
`;

export default AddTask;

import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import AddTaskItem from '~/components/AddTaskItem';
import { CollapsibleToolbar } from '~/components/CollapsibleToolbar';
import { SelectCategoryWithTemplate } from '~/components/SelectCategoryWithTemplate';
import { RootStackParamList } from '~/navigations/types';
import { AddTaskVM } from '~/screens/vm/addTaskVM';
import { BackgroundColor } from '~/utils/color';

export interface AddTaskScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const AddTask = observer(({ navigation }: AddTaskScreenProps) => {
  const [vm] = useState<AddTaskVM>(new AddTaskVM());

  return (
    <AddTaskStyled>
      {vm.selectedTemplateId === null ? (
        <SelectCategoryWithTemplate vm={vm} />
      ) : (
        <>
          <CollapsibleToolbar title={vm.templates.find((it) => it.id === vm.selectedTemplateId)?.title ?? ''}>
            <ContentScrollView>
              {vm.templates
                .find((it) => it.id === vm.selectedTemplateId)
                ?.tasks.map((task) => {
                  return (
                    <AddTaskItem
                      key={task.id}
                      taskName={task.taskName}
                      onClick={() => {
                        console.log(`${task.taskName} click`);
                        navigation.navigate('EditTask', { taskId: task.id });
                      }}
                    />
                  );
                })}
            </ContentScrollView>
          </CollapsibleToolbar>
        </>
      )}
    </AddTaskStyled>
  );
});

const ContentScrollView = styled.View`
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

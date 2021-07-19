import styled from '@emotion/native';
import React, { useState } from 'react';

import AddTaskItem from '~/components/AddTaskItem';
import { observer } from 'mobx-react';
import { BackgroundColor } from '~/utils/color';
import { SelectCategoryWithTemplate } from '~/components/SelectCategoryWithTemplate';
import { AddTaskVM } from '~/screens/vm/addTaskVM';

const AddTask = observer(() => {
  const [vm] = useState<AddTaskVM>(new AddTaskVM());

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

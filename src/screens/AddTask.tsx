import styled from '@emotion/native';
import React, { useState } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';

import AddTaskItem from '~/components/AddTaskItem';
import BottomSheetContent from '~/components/BottomSheet';
import { Task } from '~/models/Task';
import { observer } from 'mobx-react';
import { BackgroundColor } from '~/utils/color';
import { SelectCategoryWithTemplate } from '~/components/SelectCategoryWithTemplate';
import { AddTaskVM } from '~/screens/vm/addTaskVM';
import { CollapsibleToolbar } from '~/components/CollapsibleToolbar';

const AddTask = observer(() => {
  const [vm] = useState<AddTaskVM>(new AddTaskVM());

  return (
    <AddTaskStyled>
      {vm.selectedTemplateId === null ? (
        <SelectCategoryWithTemplate vm={vm} />
      ) : (
        <>
          <CollapsibleToolbar
              title={vm.templates.find((it) => it.id === vm.selectedTemplateId)?.title ?? ''}
          >
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

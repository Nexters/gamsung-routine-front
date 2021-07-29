import React from 'react';
import { observer } from 'mobx-react';
import styled from '@emotion/native';
import AddTaskItem from '~/components/AddTaskItem';
import { CollapsibleToolbar } from '~/components/CollapsibleToolbar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '~/navigations/types';
import { BackgroundColor, GraphicColor } from '~/utils/color';
import { RouteProp } from '@react-navigation/native';
import { useState } from 'react';
import { useCallback } from 'react';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'TaskList'>;
}

export const TaskList: React.FC<Props> = observer(({ navigation, route }) => {
  const [vm] = useState(route.params.vm);

  const handleBackpressClick = useCallback(() => {
    navigation.pop();
  }, []);

  return (
    <Frame>
      <CollapsibleToolbar
        title={vm.templates.find((it) => it.id === vm.selectedTemplateId)?.title ?? ''}
        onBackpressClick={handleBackpressClick}
        backgroundColor={route.params.headerColor}>
        <ContentScrollView>
          {vm.templates
            .find((it) => it.id === vm.selectedTemplateId)
            ?.tasks.map((task) => {
              return (
                <AddTaskItem
                  key={task.id}
                  taskName={task.taskName}
                  onClick={() => {
                    navigation.navigate('EditTask', { taskId: task.id, taskName: task.taskName });
                  }}
                />
              );
            })}
        </ContentScrollView>
      </CollapsibleToolbar>
    </Frame>
  );
});

const Frame = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${BackgroundColor.PRIMARY};
`;

const ContentScrollView = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';

import AddTaskItem from '~/components/AddTaskItem';
import { CollapsibleToolbar } from '~/components/CollapsibleToolbar';
import { RootStackParamList } from '~/navigations/types';
import { BackgroundColor } from '~/utils/color';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'TaskList'>;
}

export const TaskList: React.FC<Props> = observer(({ navigation, route }) => {
  const { template, headerColor } = route.params;

  const handleBackpressClick = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return (
    <Frame>
      <CollapsibleToolbar title={template.name} onBackpressClick={handleBackpressClick} backgroundColor={headerColor}>
        <ContentScrollView style={{ marginTop: 230 }}>
          {template.tasks.map((task) => (
            <AddTaskItem
              key={task.id}
              taskName={task.name}
              onClick={() => {
                navigation.navigate('EditTask', { templateTask: task, taskId: null });
              }}
            />
          ))}
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
  background-color: ${BackgroundColor.DEPTH2_L};
`;

const ContentScrollView = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

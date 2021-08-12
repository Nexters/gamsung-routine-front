import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';

import AddTaskItem from '~/components/AddTaskItem';
import { CollapsibleToolbar } from '~/components/CollapsibleToolbar';
import CustomModal from '~/components/CustomModal';
import useModal from '~/hooks/useModal';
import { RootStackParamList } from '~/navigations/types';
import { BackgroundColor } from '~/utils/color';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'TaskList'>;
}

export const TaskList: React.FC<Props> = observer(({ navigation, route }) => {
  const { template, headerColor } = route.params;
  const { isVisible: isModalVisible, openModal, closeModal } = useModal();

  const handleBackpressClick = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const handleAddAllTaskClick = () => {
    openModal();
  };

  const handleModalAllTaskItemClick = () => {
    console.log('모두 담기 api 연결');
  };

  return (
    <>
      <Frame>
        <CollapsibleToolbar
          title={template.name}
          description={template.description}
          onBackpressClick={handleBackpressClick}
          backgroundColor={headerColor}
          onAddAllTaskClick={handleAddAllTaskClick}>
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
      <CustomModal
        isVisible={isModalVisible}
        onClose={closeModal}
        content="테스크 전체 담기를 하시겠어요?"
        subContent="세부 내역은 수정할 수 없습니다."
        leftButtonText="취소"
        onLeftButtonClick={() => closeModal()}
        rightButtonText="전체담기"
        onRightButtonClick={handleModalAllTaskItemClick}
      />
    </>
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

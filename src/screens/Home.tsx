import styled from '@emotion/native';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import Complete from '~/components/Complete';
import TaskListView from '~/components/TaskListView';
import Week from '~/components/Week';
import { HomeScreenProps } from '~/navigations';

const Home = ({ navigation, route }: HomeScreenProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<{ id: number; taskName: string }[]>([]);

  const taskList = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      taskName: `task${index + 1}`,
    }));
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleToggleTask = (selectedTask: { id: number; taskName: string }) => {
    setSelectedTasks((oldSelectedTasks) => {
      const has = oldSelectedTasks.some((task) => {
        return task.id === selectedTask.id;
      });
      if (has) {
        return oldSelectedTasks.filter((task) => {
          return task.id !== selectedTask.id;
        });
      }
      toggleModal();
      return [...oldSelectedTasks, selectedTask];
    });
  };

  return (
    <HomeStyled>
      <HomeView>
        <Complete percent={(selectedTasks.length / taskList.length) * 100} />
        <Week />
        <TaskView>
          <TaskViewTitle>내 하루 테스크 {taskList.length}</TaskViewTitle>
          <TaskListView taskList={taskList} selectedTasks={selectedTasks} onToggleTask={handleToggleTask} />
        </TaskView>
      </HomeView>
      <AddTaskButton onPress={() => navigation.navigate('AddTask')}>
        <AddTaskButtonText>+</AddTaskButtonText>
      </AddTaskButton>
      <Modal
        isVisible={isModalVisible}
        style={{
          width: '100%',
          margin: 0,
          backgroundColor: 'rgba(25,25,25,0.8)',
          justifyContent: 'center',
          alignContent: 'center',
        }}
        backdropOpacity={0}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}>
        <View>
          <ClearModalView onPress={toggleModal}>
            <ClearModalImage source={require('~/assets/images/success_monster.png')} />
            <ClearModalText>테스크 완료</ClearModalText>
          </ClearModalView>
        </View>
      </Modal>
    </HomeStyled>
  );
};

const HomeStyled = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const HomeView = styled.View`
  flex: 1;
  width: 100%;
  height: auto;
  background-color: #292c34;
`;

const TaskView = styled.View`
  justify-content: space-between;
  padding: 20px;
  background-color: #f2f2f4;
  border-radius: 20px 20px 0 0;
  z-index: 2;
  display: flex;
  flex: 1;
`;

const TaskViewTitle = styled.Text`
  font-size: 12px;
  color: #4f5461;
  margin-bottom: 20px;
`;

const AddTaskButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 41%;
  bottom: 30px;
  background-color: #513de5;
  border-radius: 64px;
  z-index: 5;
`;

const AddTaskButtonText = styled.Text`
  color: #fff;
  font-size: 30px;
  font-weight: normal;
`;

const ClearModalView = styled.TouchableOpacity`
  margin-left: 60px;
  margin-right: 60px;
  margin-bottom: 16px;
  background-color: #fff;
  padding-top: 24px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 40px;
  justify-content: center;
  align-content: center;
  border-radius: 20px;
`;

const ClearModalText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const ClearModalImage = styled.Image`
  width: 195px;
  height: 128px;
`;

export default Home;

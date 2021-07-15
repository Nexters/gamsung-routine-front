import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';

import Complete from '~/components/Complete';
import CustomText from '~/components/CustomText';
import TaskListView from '~/components/TaskListView';
import Week from '~/components/Week';
import { Task } from '~/models/Task';
import { RootStackParamList } from '~/navigations/types';
import { TextColor } from '~/utils/color';
import { FontType } from '~/utils/font';

export interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Home = ({ navigation }: HomeScreenProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const taskList = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      taskName: `task${index + 1}`,
    }));
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleToggleTask = (selectedTask: Task) => {
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
          <CustomText font={FontType.REGULAR_CAPTION} color={TextColor.SECONDARY}>
            내 하루 테스크 {taskList.length}
          </CustomText>
          <TaskListView taskList={taskList} selectedTasks={selectedTasks} onToggleTask={handleToggleTask} />
        </TaskView>
      </HomeView>
      <AddTaskButton onPress={() => navigation.navigate('AddTask')}>
        <CustomText color={TextColor.WHITE} font={FontType.REGULAR_HEAD_01}>
          +
        </CustomText>
      </AddTaskButton>
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
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  z-index: 2;
  display: flex;
  flex: 1;
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

export default Home;

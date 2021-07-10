import React, {useMemo, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp} from '../../App';
import Modal from 'react-native-modal';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-navigation';
import {TaskMy} from '../components/TaskMy';
import Week from '../components/Week';
import Complete from '../components/Complete';

const MyTask = ({navigation}: NavigationProp) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [selectedTasks, setSelectedTasks] = useState<
    {id: number; taskName: string}[]
  >([]);

  const onPress = (selectedTask: {id: number; taskName: string}) => {
    setSelectedTasks(oldSelectedTasks => {
      const has = oldSelectedTasks.some(task => {
        return task.id === selectedTask.id;
      });
      if (has) {
        return oldSelectedTasks.filter(task => {
          return task.id !== selectedTask.id;
        });
      }
      toggleModal();
      return [...oldSelectedTasks, selectedTask];
    });
  };

  const renderTasks = useMemo(() => {
    return Array.from({length: 8}, (_, index) => ({
      id: index,
      taskName: `task${index}`,
    }));
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <HomeStyled>
        <Complete />
        <Week />
        <TaskView>
          <TaskViewTitle>내 하루 테스크 {renderTasks.length}</TaskViewTitle>
          <TaskViewList>
            {renderTasks.map((task, index) => {
              const has = selectedTasks.some(selectedTask => {
                return selectedTask.id === task.id;
              });
              return (
                <TaskMy
                  has={has}
                  taskName={task.taskName}
                  onPress={() => onPress(task)}
                  key={index}
                />
              );
            })}
          </TaskViewList>
        </TaskView>
      </HomeStyled>
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
          <TouchableOpacity
            style={{
              marginLeft: 60,
              marginRight: 60,
              marginBottom: 16,
              backgroundColor: 'white',
              paddingTop: 24,
              paddingLeft: 32,
              paddingRight: 32,
              paddingBottom: 40,
              justifyContent: 'center',
              alignContent: 'center',
              borderRadius: 20,
            }}
            onPress={toggleModal}>
            <Image
              style={{width: 195, height: 128}}
              source={require('../assets/success_monster.png')}
            />
            <Text
              style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
              테스크 완료
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const HomeStyled = styled.View`
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
`;

const TaskViewTitle = styled.Text`
  font-size: 12px;
  color: #4f5461;
`;

const TaskViewList = styled.ScrollView`
  padding: 20px 0;
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

export default MyTask;

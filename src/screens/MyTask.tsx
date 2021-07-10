import React, {useMemo, useState} from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-navigation';
import {Task} from '../components/Task';

const MyTask = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(0);

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
      setId(selectedTask.id);
      return [...oldSelectedTasks, selectedTask];
    });
  };

  const renderTasks = useMemo(() => {
    return Array.from({length: 30}, (_, index) => ({
      id: index,
      taskName: `task${index}`,
    }));
  }, []);
  return (
    <SafeAreaView style={{marginTop: 32}}>
      <ScrollView>
        {renderTasks.map(task => {
          const has = selectedTasks.some(selectedTask => {
            return selectedTask.id === task.id;
          });
          return (
            <Task
              has={has}
              taskName={task.taskName}
              onClick={() => onPress(task)}
            />
          );
        })}
      </ScrollView>
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
          <Button title="Close modal" onPress={toggleModal} />
          <Text style={{color: 'white', textAlign: 'center'}}>
            {id} 수행했네?!
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyTask;

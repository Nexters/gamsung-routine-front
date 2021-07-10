import React, {useMemo, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-navigation';
import {TaskMy} from '../components/TaskMy';

const MyTask = () => {
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
    return Array.from({length: 30}, (_, index) => ({
      id: index,
      taskName: `task${index}`,
    }));
  }, []);
  return (
    <SafeAreaView style={{marginTop: 32}}>
      <ScrollView style={{margin: 20}}>
        <Text style={{marginBottom: 8}}>
          내 하루 테스크 {renderTasks.length}
        </Text>
        {renderTasks.map(task => {
          const has = selectedTasks.some(selectedTask => {
            return selectedTask.id === task.id;
          });
          return (
            <TaskMy
              has={has}
              taskName={task.taskName}
              onPress={() => onPress(task)}
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

export default MyTask;

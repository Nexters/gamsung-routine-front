import React, {useMemo, useState} from 'react';
import {Button, Image, SafeAreaView, ScrollView, Text, View,} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {NavigationProp} from '../../App';
import {Task} from '../components/Task';

export const AddTask = ({navigation}: NavigationProp) => {
  const sheetRef = React.useRef(null);

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
      return [...oldSelectedTasks, selectedTask];
    });
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}>
      <Text>Swipe down to close</Text>
      <Text>내가 선택한 태스크</Text>
      {selectedTasks.map((task, index) => {
        return (
          <Task
            has={true}
            key={index}
            taskName={task.taskName}
            onClick={() => onPress(task)}
          />
        );
      })}
    </View>
  );

  const renderTasks = useMemo(() => {
    return Array.from({length: 20}, (_, index) => ({
      id: index,
      taskName: `task${index}`,
    }));
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'yellow',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>
          캘리가 처음이라면
        </Text>
        <Text>캘리가 처음이신가요?</Text>
        <Image source={require('../assets/temp.png')} />
        <Text>모두 선택하기</Text>
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

      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Home')}
      />
      <BottomSheet
        ref={sheetRef}
        initialSnap={2}
        snapPoints={['85%', '10%', '10%']}
        borderRadius={10}
        renderContent={renderContent}
      />
    </SafeAreaView>
  );
};

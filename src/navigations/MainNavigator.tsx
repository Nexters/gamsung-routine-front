import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AddTaskSubmitButton from '~/components/AddTaskSubmitButton';
import { RootStackParamList, AddTaskScreenProps } from '~/navigations/types';
import AddTask from '~/screens/AddTask';
import Home from '~/screens/Home';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={({ navigation }: AddTaskScreenProps) => {
          return {
            title: '테스크 선택',
            headerBackTitle: ' ',
            headerRight: () => <AddTaskSubmitButton navigation={navigation} />,
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

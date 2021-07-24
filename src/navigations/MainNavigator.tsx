import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AddTaskSubmitButton, { AddTaskScreenProps } from '~/components/AddTaskSubmitButton';
import { RootStackParamList } from '~/navigations/types';
import AddTask from '~/screens/AddTask';
import Home from '~/screens/Home';
import Login from '~/screens/Login';
import AuthStore from '~/stores/AuthStore';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      {!AuthStore.isLoggedIn && <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />}
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="AddTask" component={AddTask} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

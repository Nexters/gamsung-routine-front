import styled from '@emotion/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { RootStackParamList } from '~/navigations/types';
import { AddTask } from '~/screens/AddTask';
import Home from '~/screens/Home';

const AddTaskSubmitButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

const AddTaskSubmitButtonText = styled.Text`
  color: rgba(81, 61, 229, 1);
`;

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen
        name="AddTask"
        options={({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => {
          return {
            title: '테스크 선택',
            headerBackTitle: ' ',
            headerRight: () => (
              <AddTaskSubmitButton
                onPress={() => {
                  navigation.navigate('Home');
                }}>
                <AddTaskSubmitButtonText>완료</AddTaskSubmitButtonText>
              </AddTaskSubmitButton>
            ),
          };
        }}
        component={AddTask}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

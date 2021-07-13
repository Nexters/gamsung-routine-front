import styled from '@emotion/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { RootStackParamList } from '~/navigations/types';
import AddTask from '~/screens/AddTask';
import Home from '~/screens/Home';

const AddTaskSubmitButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

const AddTaskSubmitButtonText = styled.Text`
  color: rgba(81, 61, 229, 1);
`;

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
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
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

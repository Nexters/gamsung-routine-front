import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import {Home} from './src/screens/Home';
import {AddTask} from './src/screens/AddTask';
import {Button} from 'react-native';
import MyTask from './src/screens/MyTask';

const Stack = createStackNavigator();

type RootStackParamList = {
  Home: undefined;
  AddTask: undefined;
  MyTask: undefined;
};

export interface NavigationProp {
  navigation: StackNavigationProp<RootStackParamList>;
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="AddTask"
          options={({
            navigation,
          }: {
            navigation: StackNavigationProp<RootStackParamList>;
          }) => {
            return {
              title: '테스크 선택',
              headerBackTitle: ' ',
              headerRight: () => (
                <Button
                  title="생성완료"
                  onPress={() => {
                    navigation.navigate('MyTask');
                  }}
                />
              ),
            };
          }}
          component={AddTask}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MyTask"
          component={MyTask}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

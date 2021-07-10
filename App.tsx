import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import Home from './src/screens/Home';
import {AddTask} from './src/screens/AddTask';
import {Text, TouchableOpacity} from 'react-native';
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Home');
                  }}
                  style={{marginRight: 10}}>
                  <Text
                    style={{
                      color: 'rgba(81, 61, 229, 1)',
                    }}>
                    완료
                  </Text>
                </TouchableOpacity>
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

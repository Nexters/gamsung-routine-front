import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp,} from '@react-navigation/stack';
import React from 'react';
import {Home} from "./src/screens/Home";
import {AddTask} from "./src/screens/AddTask";

const Stack = createStackNavigator();

type RootStackParamList = {
    Home: undefined;
    AddTask: undefined;
};

export interface NavigationProp {
    navigation: StackNavigationProp<RootStackParamList>;
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddTask" component={AddTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




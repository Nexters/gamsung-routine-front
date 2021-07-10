import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home3"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen name="AddTask" component={AddTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const Home = () => {
  return (
    <View
      style={{flex: 1, width: '100%', height: '100%', backgroundColor: 'red'}}>
      <Text>!!!Home1</Text>
      <Text>!!!Home1</Text>
      <Text>!!!Home1</Text>
      <Text>!!!Home1</Text>
      <Text>!!!Home1</Text>
      <Text>!!!Home1</Text>
      <TouchableOpacity>
        <Text>버튼!!!!</Text>
      </TouchableOpacity>
    </View>
  );
};
const AddTask = () => {
  return <Text>AddTask</Text>;
};

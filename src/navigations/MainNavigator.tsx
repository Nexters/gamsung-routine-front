import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import CustomText from '~/components/CustomText';
import Icon, { IconType } from '~/components/Icon';
import { RootStackParamList } from '~/navigations/types';
import AddTask from '~/screens/AddTask';
import EditTask from '~/screens/EditTask';
import Home from '~/screens/Home';
import Login from '~/screens/Login';
import { TaskList } from '~/screens/TaskList';
import { TemplateList } from '~/screens/TemplateList';
import AuthStore from '~/stores/AuthStore';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      {!AuthStore.isLoggedIn && <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />}
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="AddTask" component={AddTask} options={{ headerShown: false }} />
      <Stack.Screen name="TaskList" component={TaskList} options={{ headerShown: false }} />
      <Stack.Screen
        name="TemplateList"
        component={TemplateList}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.navigate('EditTask');
              }}>
              <Icon type={IconType.ADD} />
            </TouchableOpacity>
          ),
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => {
                  navigation.pop();
                }}>
                <CustomText>닫기</CustomText>
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTask}
        initialParams={{ taskId: null }}
        options={() => {
          return {
            title: ' ',
            headerBackTitle: ' ',
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

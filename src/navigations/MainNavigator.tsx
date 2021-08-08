import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import CustomText from '~/components/CustomText';
import Icon from '~/components/Icon';
import { RootStackParamList } from '~/navigations/types';
import EditTask from '~/screens/EditTask';
import Home from '~/screens/Home';
import Intro from '~/screens/Intro';
import Login from '~/screens/Login';
import Setting from '~/screens/Setting';
import { TaskList } from '~/screens/TaskList';
import { TemplateList } from '~/screens/TemplateList';
import AuthStore from '~/stores/AuthStore';
import { BackgroundColor } from '~/utils/color';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await AuthStore.checkLogin();
      setLoading(false);
    })();
  });
  if (loading) {
    // TODO : 스플래시 추가
    return null;
  }
  return (
    <Stack.Navigator>
      {!AuthStore.isLoggedIn && (
        <>
          <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </>
      )}
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
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
              <Icon type={'ADD'} />
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
        initialParams={{ templateTask: null, taskId: null }}
        options={() => {
          return {
            title: ' ',
            headerBackTitle: ' ',
            headerStyle: {
              backgroundColor: BackgroundColor.DEPTH2_L,
            },
          };
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={() => {
          return {
            title: '앱 설정',
            headerBackTitle: ' ',
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default observer(MainNavigator);

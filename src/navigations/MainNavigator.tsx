import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { RootStackParamList } from '~/navigations/types';
import EditTask from '~/screens/EditTask';
import Home from '~/screens/Home';
import Intro from '~/screens/Intro';
import InviteAccept from '~/screens/InviteAccept';
import InviteDetail from '~/screens/InviteDetail';
import InviteIntro from '~/screens/InviteIntro';
import Login from '~/screens/Login';
import Setting from '~/screens/Setting';
import { TaskList } from '~/screens/TaskList';
import { TemplateList } from '~/screens/TemplateList';
import AuthStore from '~/stores/AuthStore';

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
      {AuthStore.isLoggedIn && (
        <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="TaskList" component={TaskList} options={{ headerShown: false }} />
          <Stack.Screen name="TemplateList" component={TemplateList} options={{ headerShown: false }} />
          <Stack.Screen
            name="EditTask"
            component={EditTask}
            initialParams={{ templateTask: null, taskId: null }}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
          <Stack.Screen name="InviteIntro" component={InviteIntro} options={{ headerShown: false }} />
          <Stack.Screen
            name="InviteAccept"
            component={InviteAccept}
            initialParams={{ task: undefined }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InviteDetail"
            component={InviteDetail}
            initialParams={{ taskId: undefined }}
            options={{ headerShown: false }}
          />
        </>
      )}
      <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default observer(MainNavigator);

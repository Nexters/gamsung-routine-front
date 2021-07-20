import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';

import MainNavigator from '~/navigations/MainNavigator';
import AuthStore from '~/stores/AuthStore';

const App = () => {
  const getUser = async () => {
    try {
      const getToken = await AsyncStorage.getItem('token');
      if (getToken !== null) {
        AuthStore.token = JSON.parse(getToken);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;

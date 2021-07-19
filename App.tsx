import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';

import MainNavigator from '~/navigations/MainNavigator';
import AuthStore from '~/stores/AuthStore';

const App = () => {
  const getUser = () => {
    try {
      const token = AsyncStorage.getItem('token');
      if (token !== null) {
        AuthStore.updateLoginState(true);
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

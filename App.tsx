import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import MainNavigator from '~/navigations/MainNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;

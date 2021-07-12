import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import MainNavigator from '~/navigations/MainNavigator';

export * from './types';

const Navigator = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Navigator;

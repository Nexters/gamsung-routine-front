import React from 'react';
import {Button, SafeAreaView} from 'react-native';
import {NavigationProp} from '../../App';

export const Home = ({navigation}: NavigationProp) => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="+" onPress={() => navigation.navigate('AddTask')} />
    </SafeAreaView>
  );
};

import styled from '@emotion/native';
import React from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const MainView = styled.View`
  width: 100%;
  height: 100%;
  background: yellowgreen;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  <StatusBar barStyle={isDarkMode ? 'dark-content' : 'dark-content'} />;

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        children={<Text>aaa</Text>}
        backgroundColor="#61dafb"
        hidden={true}
      />
      <MainView>
        <Text>routine</Text>
      </MainView>
    </SafeAreaView>
  );
};

export default App;

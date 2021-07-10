import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {NavigationProp} from '../../App';
import styled from '@emotion/native';
import CalenderView from '../components/CalenderView';

const EmptyText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

const EmptyImage = styled.Image`
  width: 80px;
  height: 80px;
  margin: 0 auto 48px;
`;

export const Home = ({navigation}: NavigationProp) => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
      <CalenderView />
      <Text>내 하루 테스크 0</Text>
      <View style={{justifyContent: 'center', alignContent: 'center'}}>
        <EmptyImage source={require('../assets/empty_monster.png')} />
        <EmptyText>루틴이 없어요.</EmptyText>
        <EmptyText>루틴을 추가해요.</EmptyText>
      </View>
      <Button title="+" onPress={() => navigation.navigate('AddTask')} />
    </SafeAreaView>
  );
};

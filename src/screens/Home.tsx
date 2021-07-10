import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {NavigationProp} from '../../App';
import styled from "@emotion/native";

const EmptyText = styled.Text`
    font-weight: bold;
    font-size: 20px;
`

const EmptyImage = styled.Image`
    flex-direction: column;    
`

export const Home = ({navigation}: NavigationProp) => {
  return (
    <SafeAreaView
      style={{flex: 1}}>
        <Text>내 하루 테스크 0</Text>
        <EmptyImage source={require("../assets/empty_monster.png")}/>
        <EmptyText>루틴이 없어요.</EmptyText>
        <EmptyText>루틴을 추가해요.</EmptyText>
        <Button title="+" onPress={() => navigation.navigate('AddTask')} />
    </SafeAreaView>
  );
};

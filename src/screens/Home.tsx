import styled from '@emotion/native';
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import { NavigationProp } from '../../App';
import Complete from '../components/Complete';
import Week from '../components/Week';

const taskList = [];

const Home = ({ navigation }: NavigationProp) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HomeStyled>
        {taskList.length !== 0 && <Complete />}
        <Week />
        <TaskView>
          <TaskViewTitle>내 하루 테스크 {taskList.length}</TaskViewTitle>
          <TaskViewList>
            {taskList.length ? (
              <View>
                <Text>있음</Text>
              </View>
            ) : (
              <EmptyView>
                <EmptyImage source={require('../assets/empty_monster.png')} />
                <EmptyText>루틴이 없어요.{'\n'}루틴을 추가해요.</EmptyText>
              </EmptyView>
            )}
          </TaskViewList>
        </TaskView>
      </HomeStyled>
      <AddTaskButton onPress={() => navigation.navigate('AddTask')}>
        <AddTaskButtonText>+</AddTaskButtonText>
      </AddTaskButton>
    </SafeAreaView>
  );
};

const HomeStyled = styled.View`
  width: 100%;
  height: auto;
  background-color: #292c34;
`;

const TaskView = styled.View`
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  z-index: 2;
`;

const TaskViewTitle = styled.Text`
  font-size: 12px;
  color: #4f5461;
`;

const TaskViewList = styled.ScrollView``;

const EmptyView = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 180px;
`;

const EmptyImage = styled.Image`
  width: 173px;
  height: 98px;
  margin-bottom: 30px;
`;

const EmptyText = styled.Text`
  color: #292c34;
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
`;

const AddTaskButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 41%;
  bottom: 30px;
  background-color: #513de5;
  border-radius: 64px;
  z-index: 5;
`;

const AddTaskButtonText = styled.Text`
  color: #fff;
  font-size: 30px;
  font-weight: normal;
`;

export default Home;

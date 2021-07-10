import React from 'react';
import {Text} from 'react-native';
import {NavigationProp} from '../../App';
import styled from '@emotion/native';
import Week from '../components/Week';

const taskList = [];

const Home = ({navigation}: NavigationProp) => {
  return (
    <HomeStyled>
      <WeekView>
        <Week />
      </WeekView>
      <TaskView>
        <TaskViewTitle>내 하루 테스크 {taskList.length}</TaskViewTitle>
        <TaskViewList>
          {taskList.length ? (
            <Text>있음</Text>
          ) : (
            <EmptyView>
              <EmptyImage source={require('../assets/empty_monster.png')} />
              <EmptyText>루틴이 없어요.{'\n'}루틴을 추가해요.</EmptyText>
            </EmptyView>
          )}
        </TaskViewList>
        <AddTaskButton onPress={() => navigation.navigate('AddTask')}>
          <AddTaskButtonText>+</AddTaskButtonText>
        </AddTaskButton>
      </TaskView>
    </HomeStyled>
  );
};

const HomeStyled = styled.SafeAreaView`
  justify-content: space-between;
  background-color: #292c34;
`;

const WeekView = styled.View`
  width: 100%;
  height: 15%;
  z-index: 1;
`;

const TaskView = styled.View`
  width: 100%;
  height: 85%;
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

const TaskViewList = styled.View`
  justify-content: center;
  align-items: center;
`;

const EmptyView = styled.View`
  justify-content: center;
  align-items: center;
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
  margin: 0 auto;
  background-color: #513de5;
  border-radius: 64px;
`;

const AddTaskButtonText = styled.Text`
  color: #fff;
  font-size: 30px;
  font-weight: normal;
`;

export default Home;
